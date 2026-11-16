// Turn every still-missing organisation into a pending ingest, using only URLs
// that came from the curated source lists. No guessed domains.
//
// Usage: node scripts/build-all-sources.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

const coverage = read("data/coverage.json");
const awesome = read("data/sources/awesome.json").systems;
const have = new Set(fs.readdirSync(path.join(ROOT, "systems")));
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
const blocked = new Set((read("data/blocked.json").blocked || []).map((b) => b.slug));

const missing = (coverage.union.entries || []).filter((e) => !e.covered);

const awesomeByOrg = new Map();
for (const a of awesome) {
  for (const key of [norm(a.org), ...(a.aliases || []).map(norm)]) {
    if (!awesomeByOrg.has(key)) awesomeByOrg.set(key, a);
  }
}

const repos = [];
const sites = [];
const seenRepo = new Set();
const seenSite = new Set();

for (const e of missing) {
  const a = awesomeByOrg.get(norm(e.org));
  const slug = norm(e.org);
  if (!slug || have.has(slug) || blocked.has(slug)) continue;

  if (e.repo && !seenRepo.has(slug)) {
    seenRepo.add(slug);
    repos.push({
      repo: e.repo,
      slug,
      org: e.org,
      name: [...new Set(e.systems.map((s) => s.name))][0] || e.org,
    });
  } else if (a?.homepage && !seenSite.has(slug)) {
    seenSite.add(slug);
    sites.push({
      url: a.homepage,
      slug,
      org: e.org,
      name: [...new Set(e.systems.map((s) => s.name))][0] || e.org,
    });
  }
}

fs.writeFileSync(
  path.join(ROOT, "data/repo-sources.json"),
  JSON.stringify({ note: "All missing organisations with a curated public repo.", sources: repos }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(ROOT, "data/site-sources.json"),
  JSON.stringify({ note: "All missing organisations with a curated homepage.", sources: sites }, null, 2) + "\n"
);

console.log(`missing organisations: ${missing.length}`);
console.log(`pending repos:         ${repos.length}`);
console.log(`pending sites:         ${sites.length}`);
console.log(`no curated URL:        ${missing.length - repos.length - sites.length}`);

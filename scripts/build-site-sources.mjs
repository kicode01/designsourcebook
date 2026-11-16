// Build a list of live sites to read, using only URLs we already hold.
//
// Guessing domains would be fast and wrong: a 200 from the wrong company means
// ingesting someone else's palette. Every URL here comes from the parsed
// awesome-design-systems table, so the link was curated by a human.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

const awesome = read("data/sources/awesome.json").systems;
const coverage = read("data/coverage.json");
const have = new Set(fs.readdirSync(path.join(ROOT, "systems")));

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");

// Orgs that are still missing and have no npm package and no repo.
const docsOnly = (coverage.union.entries || []).filter((e) => !e.covered && !e.npm && !e.repo);
const docsByKey = new Map();
for (const e of docsOnly) docsByKey.set(norm(e.org), e);

const out = [];
const seen = new Set();

for (const a of awesome) {
  if (!a.homepage) continue;
  const candidates = [norm(a.org), ...(a.aliases || []).map(norm)];
  const hit = candidates.map((c) => docsByKey.get(c)).find(Boolean);
  if (!hit) continue;

  const slug = norm(hit.org);
  if (seen.has(slug) || have.has(slug)) continue;
  seen.add(slug);

  out.push({
    url: a.homepage,
    slug,
    org: hit.org,
    name: [...new Set(hit.systems.map((s) => s.name))][0] || a.name,
  });
}

const payload = {
  note: "Docs-only organisations whose homepage URL is curated in data/sources/awesome.json. Read with scripts/ingest-site.mjs.",
  sources: out,
};

fs.writeFileSync(path.join(ROOT, "data/site-sources.json"), JSON.stringify(payload, null, 2) + "\n", "utf8");

console.log(`docs-only organisations: ${docsOnly.length}`);
console.log(`with a curated URL:      ${out.length}`);
console.log(`\u2192 data/site-sources.json`);
for (const s of out.slice(0, 12)) console.log(`   ${s.org.padEnd(22)} ${s.url}`);

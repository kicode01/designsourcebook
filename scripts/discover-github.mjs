// Discover design-system repositories on GitHub and rank them by whether they
// actually contain tokens.
//
// Honest scope: GitHub search returns at most 1,000 results per query, so no
// single sweep sees "all of GitHub". What this does is run many overlapping
// queries, dedupe, then *probe each candidate's file tree* — because a repo
// tagged `design-system` is usually a component library with no tokens at all,
// and cloning it would be wasted work.
//
// Usage: node scripts/discover-github.mjs [--pages 3] [--probe 150]

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { normOrg as norm } from "../lib/registry.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const TOKEN = execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
const H = { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github+json", "User-Agent": "sourcebook" };

const arg = (f, d) => {
  const i = process.argv.indexOf(`--${f}`);
  return i === -1 ? d : Number(process.argv[i + 1]);
};

const PAGES = arg("pages", 3);
const PROBE = arg("probe", 150);

const QUERIES = [
  "topic:design-system",
  "topic:design-systems",
  "topic:design-tokens",
  "topic:design-system-tokens",
  "topic:component-library design system",
  "topic:pattern-library",
  "topic:ui-kit design system",
  "design system in:name",
  "design system in:description",
  "design tokens in:name,description",
  "topic:storybook design system",
  "topic:css-framework design",
];

// A repo is only a candidate if it *is* a design system, not merely a repo that
// mentions one. Without this, every large AI/editor project that name-drops
// "design tokens" in its README outranks the real thing on stars.
const RELEVANT =
  /design[\s-]?system|design language|component library|ui kit|pattern library|design tokens|style ?guide|component primitives/i;
const RELEVANT_TOPICS = /design-system|design-tokens|component-library|ui-kit|pattern-library|styleguide|design-system-tokens/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: H });
    if (res.status === 403 || res.status === 429) {
      const reset = Number(res.headers.get("x-ratelimit-reset") || 0) * 1000;
      const wait = Math.max(2000, Math.min(60000, reset - Date.now()));
      process.stderr.write(`rate limited, waiting ${Math.round(wait / 1000)}s\n`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
  }
  throw new Error(`gave up: ${url}`);
}

// ------------------------------------------------------------------ search

const found = new Map();
const queryStats = [];

for (const q of QUERIES) {
  const full = `${q} stars:>=40 archived:false fork:false`;
  let total = 0;
  let got = 0;

  for (let page = 1; page <= PAGES; page++) {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(full)}&sort=stars&order=desc&per_page=100&page=${page}`;
    let data;
    try {
      data = await get(url);
    } catch (err) {
      process.stderr.write(`query failed: ${q} — ${err.message}\n`);
      break;
    }
    total = data.total_count;
    for (const r of data.items) {
      got++;
      if (found.has(r.full_name)) continue;
      found.set(r.full_name, {
        full_name: r.full_name,
        name: r.name,
        owner: r.owner.login,
        stars: r.stargazers_count,
        description: r.description || "",
        topics: r.topics || [],
        homepage: r.homepage || "",
        pushed: r.pushed_at,
        license: r.license?.spdx_id || null,
        archived: r.archived,
      });
    }
    if (data.items.length < 100) break;
    await sleep(2100); // search API is 30 requests/minute
  }

  queryStats.push({ query: q, total, fetched: got });
  console.log(`  ${String(total).padStart(6)} total · ${String(got).padStart(3)} read   ${q}`);
  await sleep(2100);
}

console.log(`\nunique repositories: ${found.size}`);

// ----------------------------------------------------------- known / owned

const systems = fs
  .readdirSync(path.join(ROOT, "systems"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => JSON.parse(fs.readFileSync(path.join(ROOT, "systems", d.name, "manifest.json"), "utf8")));

const ownedNames = new Set();
for (const s of systems) {
  ownedNames.add(norm(s.name));
  ownedNames.add(norm(s.displayName || ""));
  if (s.org) ownedNames.add(norm(s.org));
}

const sourceNames = new Set();
for (const f of fs.readdirSync(path.join(ROOT, "data/sources")).filter((x) => x.endsWith(".json"))) {
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, "data/sources", f), "utf8"));
  for (const e of d.systems) {
    sourceNames.add(norm(e.org));
    sourceNames.add(norm(e.name));
  }
}

// --------------------------------------------------------------- tree probe

// "token" also means auth token, and "theme" also means editor theme. Only
// count paths that look like design tokens.
const STRONG =
  /(^|\/)(tokens?|design-tokens|theme|themes|colors?|colours?|palette)(\/|$)|\.?tokens?\.(json|css|scss|ts|js)$|design-tokens/i;
const WEAK = /(token|theme|colou?r|palette)/i;
const NEG = /auth|oauth|jwt|csrf|session|tokenizer|access-token|refresh-token|api-token|sanitiz|i18n|locale/i;
const CODE = /\.(json|css|scss|ts|js|mjs)$/i;

const candidates = [...found.values()]
  .filter(
    (r) =>
      RELEVANT.test(`${r.name} ${r.description}`) ||
      (r.topics || []).some((t) => RELEVANT_TOPICS.test(t))
  )
  .map((r) => ({
    ...r,
    owned: ownedNames.has(norm(r.name)) || ownedNames.has(norm(r.owner)),
    known: sourceNames.has(norm(r.name)) || sourceNames.has(norm(r.owner)),
  }))
  .sort((a, b) => b.stars - a.stars);

const toProbe = candidates.filter((r) => !r.owned).slice(0, PROBE);
console.log(`relevant repositories: ${candidates.length} (probing ${toProbe.length})\n`);

let probed = 0;
for (const r of toProbe) {
  try {
    const tree = await get(`https://api.github.com/repos/${r.full_name}/git/trees/HEAD?recursive=1`);
    const paths = (tree.tree || []).map((t) => t.path);
    const usable = paths.filter(
      (p) =>
        CODE.test(p) &&
        !/test|spec|story|__|docs?\//i.test(p) &&
        (STRONG.test(p) || (WEAK.test(p) && !NEG.test(p)))
    );
    r.tokenFiles = usable.length;
    r.tokenSample = usable.filter((p) => STRONG.test(p)).slice(0, 4);
    r.files = paths.length;
    r.truncated = Boolean(tree.truncated);
  } catch {
    r.tokenFiles = -1;
  }
  probed++;
  if (probed % 25 === 0) process.stderr.write(`  ${probed}/${toProbe.length}\n`);
  await sleep(120);
}

const ingestable = candidates.filter((r) => r.tokenFiles > 0).sort((a, b) => b.tokenFiles - a.tokenFiles);
const noTokens = candidates.filter((r) => r.tokenFiles === 0);

console.log(`  with token files:   ${ingestable.length}`);
console.log(`  no token files:     ${noTokens.length}`);
console.log(`  tree unavailable:   ${candidates.filter((r) => r.tokenFiles === -1).length}`);
console.log(`  already in registry: ${candidates.filter((r) => r.owned).length}`);

console.log("\ntop unowned candidates by token-file count:");
for (const r of ingestable.filter((x) => !x.owned).slice(0, 18)) {
  console.log(`  ${String(r.tokenFiles).padStart(4)} files  ${String(r.stars).padStart(6)}★  ${r.full_name.slice(0, 46).padEnd(46)} ${(r.topics[0] || "").slice(0, 18)}`);
}

const out = {
  generated: new Date().toISOString(),
  scope: {
    note: "GitHub search caps each query at 1000 results; totals below are what the API reports, not what was read.",
    queries: queryStats,
    uniqueRepos: found.size,
    probed: toProbe.length,
  },
  candidates: candidates.map((r) => ({
    full_name: r.full_name,
    stars: r.stars,
    description: r.description.slice(0, 160),
    topics: r.topics,
    license: r.license,
    tokenFiles: r.tokenFiles ?? null,
    tokenSample: r.tokenSample || [],
    owned: r.owned,
    known: r.known,
    pushed: r.pushed,
  })),
};

fs.writeFileSync(path.join(ROOT, "data/discovered-github.json"), JSON.stringify(out, null, 2) + "\n", "utf8");
console.log("\n\u2192 data/discovered-github.json");

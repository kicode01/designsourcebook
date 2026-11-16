// Materialise the docs-only organisations as explicit registry entries.
//
// Leaving 89 organisations as a number in a report makes them easy to forget.
// Giving each one an entry — with its system names and source lists, but with
// no invented tokens — puts them in the same inventory as everything else and
// makes the gap visible instead of abstract.
//
// These are NOT covered systems. provenance is "listed", tokens are empty, and
// the catalog renders them as "not sourced".
//
// Usage: node scripts/add-listed.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildFrontMatter } from "../lib/fm.mjs";
import { buildPreview } from "../lib/preview.mjs";
import { lint } from "../lib/lint.mjs";
import { emitDtcg } from "../lib/emit.mjs";
import { normOrg, normKey } from "../lib/registry.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

const coverage = read("data/coverage.json");
const docsOnly = (coverage.union.entries || []).filter((e) => !e.covered && !e.npm && !e.repo);

const have = new Set(fs.readdirSync(path.join(ROOT, "systems")));
const sourcesDir = path.join(ROOT, "data/sources");
const sourceFiles = fs.readdirSync(sourcesDir).filter((f) => f.endsWith(".json"));

let added = 0;
let skipped = 0;

for (const e of docsOnly) {
  let slug = normKey(e.org);
  if (!slug) {
    skipped++;
    continue;
  }
  if (have.has(slug)) {
    skipped++;
    continue;
  }

  // Pull every name this org is listed under, and which lists said so.
  const names = new Set(e.systems.map((s) => s.name));
  const lists = new Set(e.systems.map((s) => s.sourceId || s.source));
  let homepage = "";
  for (const f of sourceFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(sourcesDir, f), "utf8"));
    const id = path.basename(f, ".json");
    for (const entry of data.systems || []) {
      const keys = [entry.org, entry.name, ...(entry.aliases || [])].filter(Boolean).map(normOrg);
      if (!keys.includes(normOrg(e.org))) continue;
      if (entry.name) names.add(entry.name);
      if (entry.homepage && !homepage) homepage = entry.homepage;
      lists.add(id);
    }
  }

  const specificNames = [...names].filter((n) => !/^design system(\s+2\.0)?$/i.test(n));
  const rawShort = [...names].sort((a, b) => a.length - b.length)[0] || "Design System";
  const displayName =
    specificNames.sort((a, b) => a.length - b.length)[0] ||
    (rawShort.toLowerCase().startsWith(e.org.toLowerCase()) ? rawShort : `${e.org} ${rawShort}`);
  const listNames = [...lists].sort();
  const note = `${displayName} is published by ${e.org}, but no npm package or public repository was found in the curated source lists. No tokens are claimed here.`;

  const fm = { version: "alpha", name: displayName, description: note };
  const markdown =
    buildFrontMatter(fm) +
    [
      `# ${displayName}`,
      "",
      "## Overview",
      "",
      note,
      "",
      "## Availability",
      "",
      `Listed by: ${listNames.join(", ")}.`,
      "",
      "No colour, type or component tokens are available from a machine-readable source. This entry is an inventory record, not a reconstruction — inventing values here would misrepresent the system.",
      "",
    ].join("\n");

  const report = lint(markdown, { name: slug });
  const preview = buildPreview({ colors: {}, typography: {}, components: {}, prose: { overview: note } });

  const manifest = {
    name: slug,
    displayName,
    description: note,
    style: "Documentation only",
    category: e.org,
    org: e.org,
    theme: "unknown",
    tags: ["listed", "docs-only", normKey(e.org)],
    homepage,
    license: "unknown",
    provenance: "listed",
    provenanceNote: `Appears in ${listNames.join(", ")}. No machine-readable tokens found.`,
    source: { lists: listNames },
    spec: "design.md@alpha",
    frameworks: [],
    listedNames: [...names].sort(),
    tokens: { colors: 0, typography: 0, components: 0 },
    checks: { errors: report.counts.errors, warnings: report.counts.warnings, verified: false },
    files: { design: "DESIGN.md", tokens: "tokens.json" },
  };

  const dir = path.join(ROOT, "systems", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "DESIGN.md"), markdown, "utf8");
  fs.writeFileSync(path.join(dir, "tokens.json"), emitDtcg(markdown), "utf8");
  fs.writeFileSync(path.join(dir, "preview.json"), JSON.stringify(preview, null, 2) + "\n", "utf8");
  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");
  have.add(slug);
  added++;
}

console.log(`docs-only organisations: ${docsOnly.length}`);
console.log(`listed entries added:    ${added}`);
console.log(`skipped (already held):  ${skipped}`);

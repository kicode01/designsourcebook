// Parse alexpate/awesome-design-systems into a source list.
//
// This list is the only one of the three that carries structured metadata:
// four boolean columns (Components / Voice & Tone / Designers Kit / Source) plus
// a repo link. Parsing it beats transcribing it, because the upstream README
// changes and a parser can be re-run.
//
// Usage: node scripts/parse-awesome.mjs <path-to-cloned-repo>

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const repo = process.argv[2];
if (!repo) {
  console.error("Usage: node scripts/parse-awesome.mjs <path-to-cloned-repo>");
  process.exit(1);
}

const readme = fs.readFileSync(path.join(repo, "README.md"), "utf8");

// Cells are checked for emptiness rather than for a specific tick glyph: the
// README's mark is not the emoji codepoint you get by typing one.
const rows = readme
  .split(/\r?\n/)
  .filter((l) => /^\|\s*\[/.test(l))
  .map((line) =>
    line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim())
  )
  .filter((cells) => cells.length >= 5);

const link = (cell) => {
  const m = /\[([^\]]*)\]\((https?:\/\/[^)]+)\)/.exec(cell);
  return m ? { label: m[1], url: m[2] } : null;
};

const repoHost = (url) => {
  if (!url) return null;
  if (/github\.com/i.test(url)) return "github";
  if (/bitbucket\.org/i.test(url)) return "bitbucket";
  if (/gitlab\.com/i.test(url)) return "gitlab";
  return "web";
};

const SUFFIX =
  /\s*[\(\-–]\s*(design system|design language|style ?guide|pattern library|ui kit|ui framework|design guidelines|ui)\s*\)?$/i;

const MULTI_WORD_ORGS = [
  [/^red hat\b/i, "Red Hat"],
  [/^hewlett packard\b/i, "Hewlett Packard"],
  [/^city of boston\b/i, "City of Boston"],
  [/^french government\b/i, "French Government"],
  [/^new york state\b/i, "NYS"],
  [/^west midlands network\b/i, "West Midlands Network"],
  [/^british gas\b/i, "British Gas"],
  [/^just eat takeaway(?:\.com)?\b/i, "Just Eat Takeaway"],
  [/^u\.s\. web\b/i, "U.S. Web"],
  [/^u\.s\. cms\.gov\b/i, "CMS"],
  [/^bbc gel\b/i, "BBC"],
  [/^alaska airlines\b/i, "Alaska Airlines"],
  [/^appear here\b/i, "Appear Here"],
  [/^bolt design system\b/i, "Pega Digital"],
  [/^duet$/i, "LocalTapiola"],
];

function extractOrg(name, paren, stripped) {
  for (const [re, org] of MULTI_WORD_ORGS) {
    if (re.test(name) || re.test(stripped)) return org;
  }
  if (/:\s*/.test(name)) {
    const [left] = name.split(/:\s*/);
    if (/^pharos$/i.test(left.trim())) return "JSTOR";
    return left.trim();
  }
  if (paren && !/^global experience language$/i.test(paren[1].trim())) {
    return paren[1].trim();
  }
  const firstWord = stripped.split(/\s+/)[0].replace(/[:.]$/, "").replace(/'s$/i, "");
  return firstWord || stripped;
}

const systems = [];
const seen = new Set();

for (const cells of rows) {
  const nameCell = cells[0];
  const entry = link(nameCell);
  if (!entry) continue;

  const name = entry.label.trim();
  const key = name.toLowerCase();
  if (seen.has(key)) continue;
  seen.add(key);

  const sourceLink = link(cells[4] || "");
  const repoUrl = sourceLink ? sourceLink.url : null;

  // The parenthesised part is usually the org ("Backpack (Skyscanner)"), but
  // sometimes the product ("BBC GEL (Global Experience Language)"). Try both.
  const paren = /\(([^)]+)\)/.exec(name);
  const bare = name.replace(/\s*\([^)]*\)\s*$/, "").trim();
  const stripped = bare.replace(SUFFIX, "").trim();
  const org = extractOrg(name, paren, stripped);

  const aliases = [...new Set([name, bare, stripped, paren ? paren[1].trim() : null].filter(Boolean))];

  systems.push({
    org,
    name,
    aliases,
    homepage: entry.url,
    repo: repoUrl,
    repoHost: repoHost(repoUrl),
    components: Boolean(cells[1]),
    voice: Boolean(cells[2]),
    kit: Boolean(cells[3]),
  });
}

const out = {
  source: "awesome-design-systems (alexpate)",
  captured: new Date().toISOString().slice(0, 10),
  note: "Parsed from the upstream README table. Flags: components / voice & tone / designers kit / public source.",
  systems,
};

fs.mkdirSync(path.join(ROOT, "data/sources"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "data/sources/awesome.json"), JSON.stringify(out, null, 2) + "\n", "utf8");

const withRepo = systems.filter((s) => s.repo).length;
const byHost = systems.reduce((acc, s) => {
  if (s.repoHost) acc[s.repoHost] = (acc[s.repoHost] || 0) + 1;
  return acc;
}, {});

console.log(`parsed ${systems.length} systems from ${path.basename(repo)}`);
console.log(`  with public repo: ${withRepo} (${Object.entries(byHost).map(([k, v]) => `${k} ${v}`).join(", ")})`);
console.log(`  components: ${systems.filter((s) => s.components).length} · voice: ${systems.filter((s) => s.voice).length} · kit: ${systems.filter((s) => s.kit).length}`);

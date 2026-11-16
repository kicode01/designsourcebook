// Produce the "what can't we get" list, from data rather than memory.
//
// Three different things get called "can't get", and conflating them hides the
// real problem:
//   1. ATTEMPTED AND FAILED  — we tried, it did not work, here is why
//   2. NO MACHINE-READABLE SOURCE — docs only, needs a human
//   3. NOT YET ATTEMPTED — reachable, just not done
//
// Usage: node scripts/report-blocked.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const readJson = (p, fallback) => {
  const f = path.join(ROOT, p);
  if (!fs.existsSync(f)) return fallback;
  return JSON.parse(fs.readFileSync(f, "utf8"));
};

const blocked = readJson("data/blocked.json", { blocked: [] }).blocked || [];
const coverage = readJson("data/coverage.json", { union: { entries: [] } });
const entries = coverage.union?.entries || [];

const blockedOrgs = new Set(blocked.map((b) => b.org.toLowerCase()));

const missing = entries.filter((e) => !e.covered);

// 2. docs only — no package, no repo
const docsOnly = missing.filter((e) => !e.npm && !e.repo && !blockedOrgs.has(e.org.toLowerCase()));
// 3. reachable but not attempted
const notAttempted = missing.filter((e) => (e.npm || e.repo) && !blockedOrgs.has(e.org.toLowerCase()));

const pad = (s, n) => String(s).padEnd(n);
const lines = [];

lines.push("# What we can't get");
lines.push("");
lines.push(`Generated ${new Date().toISOString().slice(0, 10)} from \`data/blocked.json\` and \`data/coverage.json\`.`);
lines.push("");

lines.push("## 1. Attempted and failed");
lines.push("");
lines.push(`**${blocked.length}** systems. These were ingested and rejected — not skipped.`);
lines.push("");
lines.push("| System | Org | Source | Reason |");
lines.push("|---|---|---|---|");
for (const b of blocked) {
  const src = String(b.source).replace(/^https?:\/\/(www\.)?/, "");
  lines.push(`| ${b.name} | ${b.org} | \`${src}\` | ${b.reason} |`);
}
lines.push("");

lines.push("## 2. No machine-readable source");
lines.push("");
lines.push(`**${docsOnly.length}** organisations publish documentation and nothing else — no npm package, no public repo. These need a human reading the site.`);
lines.push("");
for (const e of docsOnly) {
  const names = [...new Set(e.systems.map((s) => s.name))].join(", ");
  lines.push(`- **${e.org}** — ${names}`);
}
lines.push("");

lines.push("## 3. Not yet attempted");
lines.push("");
const viaNpm = notAttempted.filter((e) => e.npm);
const viaRepo = notAttempted.filter((e) => !e.npm && e.repo);
lines.push(`**${notAttempted.length}** organisations are reachable but not done: ${viaNpm.length} via a verified npm package, ${viaRepo.length} via a public repo.`);
lines.push("");
lines.push("### Via npm package");
lines.push("");
for (const e of viaNpm) lines.push(`- **${e.org}** — \`${e.npm}\``);
lines.push("");
lines.push("### Via public repository only");
lines.push("");
for (const e of viaRepo) lines.push(`- **${e.org}** — ${[...new Set(e.systems.map((s) => s.name))].join(", ")}`);
lines.push("");

const md = lines.join("\n");
fs.writeFileSync(path.join(ROOT, "data/blocked-report.md"), md + "\n", "utf8");

// ---------------------------------------------------------------- console

console.log("WHAT WE CAN'T GET\n");
console.log(`1. attempted and failed:      ${String(blocked.length).padStart(3)}`);
for (const b of blocked) {
  console.log(`     ${pad(b.name, 28)} ${pad(b.org, 20)} ${b.reason.slice(0, 62)}`);
}
console.log(`\n2. no machine-readable source: ${String(docsOnly.length).padStart(3)}  (docs only, needs a human)`);
console.log(`3. not yet attempted:          ${String(notAttempted.length).padStart(3)}  (${viaNpm.length} npm, ${viaRepo.length} repo)`);
console.log(`\n\u2192 data/blocked-report.md`);

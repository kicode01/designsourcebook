// Ingest every published-token source listed in data/published-sources.json.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const { sources } = JSON.parse(fs.readFileSync(path.join(ROOT, "data/published-sources.json"), "utf8"));
const only = process.argv.slice(2);

const results = [];
for (const s of sources) {
  if (only.length && !only.includes(s.slug)) continue;
  try {
    const args = [
      path.join(HERE, "ingest-npm.mjs"),
      s.pkg,
      "--slug", s.slug,
      "--org", s.org,
      "--name", s.name,
      "--note", s.note,
    ];
    if (s.extra && s.extra.length) args.push("--extra", s.extra.join(","));

    const out = execFileSync(process.execPath, args, {
      encoding: "utf8",
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    results.push({ ok: true, slug: s.slug, line: out.split(/\r?\n/).pop() });
    console.log(`  ok   ${out.split(/\r?\n/).pop()}`);
  } catch (err) {
    const msg = (err.stderr || err.message || "").toString().split(/\r?\n/).filter(Boolean).pop() || "failed";
    results.push({ ok: false, slug: s.slug, error: msg });
    console.log(`  FAIL ${s.slug.padEnd(14)} ${msg}`);
  }
}

const ok = results.filter((r) => r.ok).length;
console.log(`\n${ok}/${results.length} ingested`);

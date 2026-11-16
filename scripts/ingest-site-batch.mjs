// Read every live site in data/site-sources.json.
// Usage: node scripts/ingest-site-batch.mjs [slug...]

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const { sources } = JSON.parse(fs.readFileSync(path.join(ROOT, "data/site-sources.json"), "utf8"));
const only = process.argv.slice(2);

let ok = 0;
let tried = 0;
for (const s of sources) {
  if (only.length && !only.includes(s.slug)) continue;
  tried++;
  const args = [path.join(HERE, "ingest-site.mjs"), s.url, "--slug", s.slug, "--org", s.org, "--name", s.name];
  try {
    const out = execFileSync(process.execPath, args, {
      encoding: "utf8",
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 120_000,
    }).trim();
    ok++;
    console.log(`  ok   ${out.split(/\r?\n/).pop()}`);
  } catch (err) {
    const msg = String(err.stderr || err.message).split(/\r?\n/).filter(Boolean).pop() || "failed";
    console.log(`  FAIL ${s.slug.padEnd(16)} ${msg.slice(0, 78)}`);
  }
}

console.log(`\n${ok}/${tried} sites read`);

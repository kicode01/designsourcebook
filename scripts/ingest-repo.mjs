// Ingest a design system from a public git repository.
//
// 89 organisations in the source lists have a public repo and no npm package.
// This is the driver that reaches them: shallow clone, harvest the same way as
// the npm driver, build the same entry. Same rules, different door.
//
// Usage:
//   node scripts/ingest-repo.mjs https://github.com/moroshko/basis --slug basis --org Basis --name Basis
//   node scripts/ingest-repo.mjs https://github.com/x/y --slug z --org O --name N --subdir packages/tokens

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { collectTokens, buildSystem, writeSystem, recordFailure, formatTitle } from "../lib/ingest.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

function arg(flag, fallback = undefined) {
  const i = process.argv.indexOf(`--${flag}`);
  if (i === -1) return fallback;
  return process.argv[i + 1];
}

function clone(url, dest) {
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  // core.longpaths: Windows caps paths at 260 chars and deep repos fail to
  // check out ("unable to create file ..."). That is an environment limit, not
  // a reason a design system is unavailable.
  execFileSync("git", ["-c", "core.longpaths=true", "clone", "--depth", "1", "--quiet", url, dest], {
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 180_000,
  });
  return dest;
}

function main() {
  let url = process.argv[2];
  if (!url || url.startsWith("--")) {
    console.error("Usage: node scripts/ingest-repo.mjs <git-url> --slug <slug> --org <org> --name <name> [--subdir p]");
    process.exit(1);
  }

  let subdir = arg("subdir", "");
  const treeMatch = /^(https:\/\/github\.com\/[^/]+\/[^/]+)\/tree\/[^/]+\/(.+?)\/?$/.exec(url);
  if (treeMatch) {
    url = treeMatch[1];
    if (!subdir) subdir = treeMatch[2];
  }

  const slug = arg("slug", path.basename(url, ".git").replace(/[^a-z0-9]+/gi, "-").toLowerCase());
  const org = arg("org", "");
  const name = arg("name", slug);
  const note = arg("note", `${formatTitle(org, name)} — tokens read from ${url}.`);

  const work = path.join(os.tmpdir(), "sourcebook-repo", slug);
  let root;
  try {
    root = clone(url, work);
  } catch (err) {
    // git prints the real error first and hints last; taking the last line
    // records "and retry with 'git restore ...'" instead of the cause.
    const lines = String(err.stderr || err.message).split("\n").map((l) => l.trim()).filter(Boolean);
    const msg = lines.find((l) => /^(fatal|error):/i.test(l)) || lines[0] || "clone failed";
    console.error(`clone failed: ${msg}`);
    recordFailure(ROOT, { slug, name, org, source: url, reason: `clone failed: ${msg}`, kind: "repo" });
    process.exit(1);
  }

  if (subdir) {
    const sub = path.join(root, subdir);
    if (!fs.existsSync(sub)) {
      const why = `subdir not found: ${subdir}`;
      console.error(why);
      recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "repo" });
      process.exit(1);
    }
    root = sub;
  }

  const { colors, types, components, harvested, usedFiles } = collectTokens(root);

  if (!Object.keys(colors).length) {
    const why = "no colour tokens found in the repository";
    console.error(`${why}: ${url}`);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "repo" });
    process.exit(2);
  }

  const built = buildSystem({
    slug,
    name,
    org,
    note,
    colors,
    types,
    components,
    license: "see repository",
    homepage: url.replace(/\.git$/, ""),
    repo: url.replace(/\.git$/, ""),
    provenance: "published",
    sourceNote: `Tokens read from the repository ${url}${subdir ? ` (${subdir})` : ""} — ${usedFiles} token files, ${harvested} colours harvested, ${Object.keys(colors).length} selected.`,
  });

  if (built.preview.palette.length < 12) {
    const why = `only ${built.preview.palette.length} colour tokens extracted — below the 12 needed to represent a system`;
    console.error(`${why}: ${url}`);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "repo" });
    process.exit(3);
  }

  writeSystem(ROOT, slug, built);

  console.log(
    `${slug.padEnd(13)} ${String(harvested).padStart(4)}\u2192${String(built.preview.palette.length).padStart(3)} colors \u00b7 ${String(built.preview.type.length).padStart(2)} type \u00b7 ${built.report.counts.errors}e/${built.report.counts.warnings}w`
  );
}

main();

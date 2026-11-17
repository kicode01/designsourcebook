// Ingest a design system from its published npm token package.
//
// Harvesting lives in lib/ingest.mjs so the repo driver shares it.
//
// Usage:
//   node scripts/ingest-npm.mjs @radix-ui/colors --slug radix --org WorkOS --name Radix
//   node scripts/ingest-batch.mjs

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { collectTokens, selectColors, buildSystem, writeSystem, recordFailure, formatTitle } from "../lib/ingest.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

function unpack(pkg, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const args = ["pack", pkg, "--pack-destination", dest.replace(/\\/g, "/"), "--silent"];
  const out = (
    process.platform === "win32"
      ? execFileSync("cmd.exe", ["/c", "npm.cmd", ...args], {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
        })
      : execFileSync("npm", args, {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
        })
  ).trim();
  const tgz = path.join(dest, out.split(/\r?\n/).pop());
  // Extract from inside dest using a bare filename: GNU tar reads "C:/x" as
  // host:path and tries to open an rsh connection to host "C".
  execFileSync("tar", ["-xzf", path.basename(tgz)], { cwd: dest, stdio: "ignore" });
  return path.join(dest, "package");
}

function arg(flag, fallback = undefined) {
  const i = process.argv.indexOf(`--${flag}`);
  if (i === -1) return fallback;
  return process.argv[i + 1];
}

function main() {
  const pkg = process.argv[2];
  if (!pkg || pkg.startsWith("--")) {
    console.error("Usage: node scripts/ingest-npm.mjs <package> --slug <slug> --org <org> --name <name> [--extra pkg2]");
    process.exit(1);
  }

  const slug = arg("slug", pkg.replace(/^@[^/]+\//, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase());
  const org = arg("org", "");
  const name = arg("name", slug);
  const rawNote = arg("note", "");
  const note = rawNote && rawNote !== "undefined" ? rawNote : `${formatTitle(org, name)} — tokens imported from ${pkg}.`;
  const extras = (arg("extra", "") || "").split(",").map((s) => s.trim()).filter(Boolean);

  let colors = {};
  let types = {};
  let components = {};
  let icons = null;
  let harvested = 0;
  let usedFiles = 0;
  let version = "unknown";
  let meta = {};

  for (const [i, p] of [pkg, ...extras].entries()) {
    const work = path.join(os.tmpdir(), "sourcebook-ingest", `${slug}-${i}`);
    fs.rmSync(work, { recursive: true, force: true });

    let root;
    try {
      root = unpack(p, work);
    } catch (err) {
      console.error(`pack failed for ${p}: ${String(err.message).split("\n")[0]}`);
      recordFailure(ROOT, {
        slug,
        name,
        org,
        source: p,
        reason: `pack failed: ${String(err.message).split("\n")[0]}`,
        kind: "npm",
      });
      process.exit(1);
    }

    const pkgJsonPath = path.join(root, "package.json");
    const m = fs.existsSync(pkgJsonPath) ? JSON.parse(fs.readFileSync(pkgJsonPath, "utf8")) : {};
    if (i === 0) {
      meta = m;
      version = m.version || "unknown";
    }

    const got = collectTokens(root);
    colors = { ...colors, ...got.colors };
    types = { ...types, ...got.types };
    components = { ...components, ...got.components };
    if (!icons && got.icons) icons = got.icons;
    harvested += got.harvested;
    usedFiles += got.usedFiles;
  }

  if (!Object.keys(colors).length) {
    const why = 'no colour tokens found in the package';
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: pkg, reason: why, kind: 'npm' });
    process.exit(2);
  }

  // Re-select after merging extras: two capped sets can still be too many.
  colors = selectColors(colors);

  const built = buildSystem({
    slug,
    name,
    org,
    note,
    colors,
    types,
    components,
    icons,
    pkg,
    version,
    license: meta.license || "see package",
    homepage: meta.homepage || "",
    provenance: "published",
    sourceNote: `Tokens imported from ${pkg}@${version}${extras.length ? " + " + extras.join(", ") : ""} (${usedFiles} token files, ${harvested} colours harvested, ${Object.keys(colors).length} selected). The package publishes no prose documentation, so the prose sections are generated.`,
  });

  // A two-colour "Carbon" is worse than no Carbon: it misrepresents the system.
  if (built.preview.palette.length < 12) {
    const why = `only ${built.preview.palette.length} colour tokens extracted \u2014 below the 12 needed to represent a system`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: pkg, reason: why, kind: 'npm' });
    process.exit(3);
  }

  writeSystem(ROOT, slug, built);

  console.log(
    `${slug.padEnd(13)} ${String(harvested).padStart(4)}\u2192${String(built.preview.palette.length).padStart(3)} colors \u00b7 ${String(built.preview.type.length).padStart(2)} type \u00b7 ${built.report.counts.errors}e/${built.report.counts.warnings}w`
  );
}

main();

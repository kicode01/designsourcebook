// Ingest a design system by reading the CSS of its live site.
//
// This is the last resort and the literal answer to "reverse engineer it": for
// the 132 organisations that publish documentation and nothing else, there is no
// package and no repo — but there is a website, and a website ships stylesheets.
//
// Provenance is recorded as "observed", because a live stylesheet is a snapshot
// of a deployment, not a published token package. The URL and capture date are
// kept so the reading can be re-checked.
//
// Usage:
//   node scripts/ingest-site.mjs https://brand.aalto.fi/ --slug aalto --org "Aalto University" --name "Aalto University"

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectTokens, buildSystem, writeSystem, recordFailure } from "../lib/ingest.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const arg = (f, d) => {
  const i = process.argv.indexOf(`--${f}`);
  return i === -1 ? d : process.argv[i + 1];
};

const MAX_CSS = Number(arg("max", 6));
const UA = "Mozilla/5.0 (compatible; sourcebook/0.1; +https://github.com/)";

async function getText(url, timeout = 20000) {
  const res = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(timeout) });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.text();
}

function resolve(base, href) {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

async function main() {
  const url = process.argv[2];
  if (!url || url.startsWith("--")) {
    console.error("Usage: node scripts/ingest-site.mjs <url> --slug <slug> --org <org> --name <name>");
    process.exit(1);
  }

  const slug = arg("slug", new URL(url).hostname.replace(/^www\./, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase());
  const org = arg("org", "");
  const name = arg("name", slug);

  let html;
  try {
    html = await getText(url);
  } catch (err) {
    const why = `could not fetch the page: ${err.message}`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "site" });
    process.exit(1);
  }

  const work = path.join(os.tmpdir(), "sourcebook-site", slug);
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(work, { recursive: true });

  // Inline styles first — a single-page app often has its whole palette there.
  let wrote = 0;
  const inline = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]);
  for (const [i, css] of inline.entries()) {
    if (css.length < 40) continue;
    fs.writeFileSync(path.join(work, `inline-${i}.css`), css, "utf8");
    wrote++;
  }

  const hrefs = [...html.matchAll(/<link[^>]+href=["']([^"']+)["']/gi)]
    .map((m) => m[1])
    .filter((h) => /\.css(\?|#|$)/i.test(h))
    .map((h) => resolve(url, h))
    .filter(Boolean);

  const seen = new Set();
  for (const href of hrefs) {
    if (wrote >= MAX_CSS + inline.length) break;
    if (seen.has(href)) continue;
    seen.add(href);
    try {
      const css = await getText(href);
      if (!css || css.length < 100) continue;
      fs.writeFileSync(path.join(work, `sheet-${wrote}.css`), css.slice(0, 4_000_000), "utf8");
      wrote++;
    } catch {
      /* one unreachable stylesheet is not a failure */
    }
  }

  if (!wrote) {
    const why = "no stylesheets found on the page";
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "site" });
    process.exit(2);
  }

  const { colors, types, components, harvested, usedFiles } = collectTokens(work);

  if (!Object.keys(colors).length) {
    const why = `no colour values in ${wrote} stylesheets`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "site" });
    process.exit(2);
  }

  const host = new URL(url).hostname;

  // A 200 does not prove we landed on the right company. Record whether the page
  // actually names the organisation, so a wrong URL shows up as a warning on the
  // entry instead of silently importing someone else's palette.
  const words = `${org} ${name}`
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 4 && !/^(design|system|guide|style|library|pattern|language)$/.test(w));
  const haystack = `${html} ${host}`.toLowerCase();
  const named = words.some((w) => haystack.includes(w));

  const built = buildSystem({
    slug,
    name,
    org,
    note: `${org ? org + " " : ""}${name} — read from ${host}'s live stylesheets, not a published token package.`,
    colors,
    types,
    components,
    license: "all rights reserved",
    homepage: url,
    provenance: "observed",
    sourceNote: `Colours read from ${url} and its ${usedFiles} stylesheets on ${new Date().toISOString().slice(0, 10)}. A live site is a deployment snapshot, not a published token package — values can change without notice. Page names the organisation: ${named ? "yes" : "NO — verify this URL"}.`,
  });

  if (built.preview.palette.length < 12) {
    const why = `only ${built.preview.palette.length} colour tokens extracted — below the 12 needed to represent a system`;
    console.error(why);
    recordFailure(ROOT, { slug, name, org, source: url, reason: why, kind: "site" });
    process.exit(3);
  }

  writeSystem(ROOT, slug, built);
  console.log(
    `${slug.padEnd(14)} ${String(harvested).padStart(4)}\u2192${String(built.preview.palette.length).padStart(3)} colors \u00b7 ${String(built.preview.type.length).padStart(2)} type \u00b7 ${String(Object.keys(components).length).padStart(2)} comp \u00b7 ${wrote} sheets`
  );
}

main();

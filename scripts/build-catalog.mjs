// Build a self-contained catalog page from the registry.
// Reads systems/*/manifest.json + preview.json, inlines everything into one HTML
// file so it opens from disk with no server and no build step.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { splitFrontMatter } from "../lib/fm.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SYSTEMS = path.join(ROOT, "systems");
const OUT_DIR = path.join(ROOT, "catalog");

const template = fs.readFileSync(path.join(HERE, "catalog-template.html"), "utf8");

const systems = fs
  .readdirSync(SYSTEMS, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => {
    const dir = path.join(SYSTEMS, d.name);
    const manifestPath = path.join(dir, "manifest.json");
    const previewPath = path.join(dir, "preview.json");
    if (!fs.existsSync(manifestPath) || !fs.existsSync(previewPath)) return null;

    const m = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const p = JSON.parse(fs.readFileSync(previewPath, "utf8"));
    const designPath = path.join(dir, "DESIGN.md");
    const fm = fs.existsSync(designPath) ? splitFrontMatter(fs.readFileSync(designPath, "utf8")).data : {};

    return {
      slug: m.name,
      name: m.displayName || m.name,
      provenance: m.provenance || "observed",
      org: m.org || "",
      listedNames: m.listedNames || [],
      lists: m.source?.lists || [],
      style: m.style || "",
      category: m.category || "",
      theme: m.theme || "dark",
      tags: m.tags || [],
      license: m.license || "unknown",
      homepage: m.homepage || m.source?.url || null,
      repo: m.source?.repo || null,
      package: m.source?.package || null,
      stars: m.popularity?.stars || 0,
      forks: m.popularity?.forks || 0,
      npmDownloads: m.popularity?.npmDownloads || 0,
      popularityRank: m.popularity?.rank || 999,
      popularityScore: m.popularity?.score || 0,
      isDesignSystemRepo: Boolean(m.popularity?.isDesignSystemRepo),
      enterpriseRank: m.popularity?.enterpriseRank || null,
      frameworks: m.popularity?.frameworks || [],
      verified: Boolean(m.checks?.verified),
      warnings: m.checks?.warnings || 0,
      canvas: p.canvas,
      surface: p.surface,
      text: p.text,
      muted: p.muted,
      brand: p.brand,
      border: p.border,
      radius: p.radius,
      rounded: fm.rounded || undefined,
      spacing: fm.spacing || undefined,
      palette: p.palette,
      type: p.type,
      components: p.components,
      icons: p.icons || undefined,
      overview: p.overview,
      dos: p.dos,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

const json = JSON.stringify(systems).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

// Coverage travels with the page so the catalog can answer "do we have X?"
// without a second tool.
let coverage = { sources: [], union: { entries: [] } };
const coveragePath = path.join(ROOT, "data/coverage.json");
if (fs.existsSync(coveragePath)) coverage = JSON.parse(fs.readFileSync(coveragePath, "utf8"));

const covJson = JSON.stringify({
  sources: coverage.sources || [],
  union: coverage.union || { entries: [] },
})
  .replace(/</g, "\\u003c")
  .replace(/\u2028/g, "\\u2028")
  .replace(/\u2029/g, "\\u2029");

let iconPacks = {};
const iconPacksPath = path.join(ROOT, "data/icon-packs.json");
if (fs.existsSync(iconPacksPath)) iconPacks = JSON.parse(fs.readFileSync(iconPacksPath, "utf8"));
const packsJson = JSON.stringify(iconPacks).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

const html = template
  .replace("/*__DATA__*/ []", json)
  .replace("/*__COVERAGE__*/ {}", covJson)
  .replace("/*__ICON_PACKS__*/ {}", packsJson);

fs.mkdirSync(OUT_DIR, { recursive: true });
const webBrandDir = path.join(ROOT, "assets/brand/web");
if (fs.existsSync(webBrandDir)) {
  for (const file of [
    "favicon.ico",
    "favicon.svg",
    "apple-touch-icon.png",
    "icon-192.png",
    "icon-512.png",
    "maskable-512.png",
    "site.webmanifest",
  ]) {
    const src = path.join(webBrandDir, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(OUT_DIR, file));
  }
}
const alloPkgDir = path.join(ROOT, "node_modules/allo-font");
const alloWebfontsSrc = path.join(alloPkgDir, "fonts/webfonts");
const fontsOut = path.join(OUT_DIR, "fonts");
const webfontsOut = path.join(fontsOut, "webfonts");
if (fs.existsSync(alloWebfontsSrc)) {
  fs.mkdirSync(webfontsOut, { recursive: true });
  for (const file of [
    "AlloVariable.woff2",
    "Allo-ThinOblique.woff2",
    "Allo-ExtraLightOblique.woff2",
    "Allo-LightOblique.woff2",
    "Allo-Oblique.woff2",
    "Allo-MediumOblique.woff2",
    "Allo-SemiBoldOblique.woff2",
    "Allo-BoldOblique.woff2",
    "Allo-ExtraBoldOblique.woff2",
    "Allo-BlackOblique.woff2",
  ]) {
    const src = path.join(alloWebfontsSrc, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(webfontsOut, file));
  }
  const oflSrc = path.join(alloPkgDir, "OFL.txt");
  if (fs.existsSync(oflSrc)) fs.copyFileSync(oflSrc, path.join(fontsOut, "OFL.txt"));
}

function buildAlloFontCss() {
  const dir = fs.existsSync(alloWebfontsSrc) ? alloWebfontsSrc : webfontsOut;
  const faces = [
    { file: "AlloVariable.woff2", weight: "100 900", style: "normal" },
    { file: "Allo-Oblique.woff2", weight: "100 500", style: "italic" },
    { file: "Allo-BoldOblique.woff2", weight: "600 900", style: "italic" },
  ];
  return faces
    .map(({ file, weight, style }) => {
      const fp = path.join(dir, file);
      const src = fs.existsSync(fp)
        ? `url('data:font/woff2;base64,${fs.readFileSync(fp).toString("base64")}') format('woff2')`
        : `url('./fonts/webfonts/${file}') format('woff2')`;
      return `@font-face{font-family:'Allo';src:${src};font-weight:${weight};font-style:${style};font-display:swap}`;
    })
    .join("\n  ");
}

const htmlWithFonts = html.replace("/*__ALLO_FONT_CSS__*/", buildAlloFontCss());

const studioDist = path.join(ROOT, "studio/app/dist");
if (fs.existsSync(studioDist)) {
  const studioOut = path.join(OUT_DIR, "studio");
  fs.rmSync(studioOut, { recursive: true, force: true });
  fs.cpSync(studioDist, studioOut, { recursive: true });
}
const dest = path.join(OUT_DIR, "index.html");
for (let i = 0; i < 8; i++) {
  try {
    fs.writeFileSync(dest, htmlWithFonts, "utf8");
    break;
  } catch (err) {
    if (i === 7) throw err;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }
}

const kb = (fs.statSync(dest).size / 1024).toFixed(0);
const withComps = systems.filter((s) => s.components.length > 0).length;
const totalComps = systems.reduce((n, s) => n + s.components.length, 0);

console.log(`Built ${path.relative(ROOT, dest)} — ${systems.length} systems, ${kb} KB`);
console.log(`  ${withComps} systems have documented components (${totalComps} tokens total)`);
console.log(`  ${systems.filter((s) => s.theme === "dark").length} dark · ${systems.filter((s) => s.theme === "light").length} light`);

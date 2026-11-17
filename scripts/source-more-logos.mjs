// Source additional verified vector brand logos from upstream curated repositories
// (`gilbarbara/logos`, `svgl`, and `thesvg` brands collection) with strict multi-layer deduplication:
//   1) Canonical ID + normalized brand root + explicit alias groups + upstream aliases
//   2) Variant suffix collapse (-light/-dark/-mono/-grayscale/-wordmark/-vertical/-icon)
//   3) ViewBox-normalized structural SVG geometry hash (`computeGeomHash`)
//   4) Vector craft gate (no rasters/<filter>/<style>, visible on light ground, clean anchor budget)

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import {
  sanitizeLogoSvg,
  computeGeomHash,
  measureLogoSvg,
  classifyLogoMetadata,
} from "./lib/logo-anatomy.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXTRA_LOGOS_PATH = path.join(ROOT, "data/extra-logos.json");
const BASE_LIB_DIR = path.join(os.homedir(), ".gemini/config/skills/logo-design/assets/library");

const VARIANT_SUFFIX_RE =
  /-(?:icon|dark|light|mono|monochrome|grayscale|greyscale|gray|grey|outline|outlined|filled|fill|solid|app-icon|wordmark|lettermark|horizontal|horiz|vertical|vert|stacked|badge|symbol|mark|logo|alt|old|new|v2|v3|beta|legacy|black|white|color|colour|inverted|square|round|rounded|circle|202[0-9]|201[0-9]|digital)$/gi;

const ALIAS_GROUPS = [
  ["aws", "amazonwebservices"],
  ["gcp", "googlecloud", "googlecloudplatform"],
  ["x", "twitter", "xtwitter"],
  ["vscode", "visualstudiocode"],
  ["nextjs", "next"],
  ["nodejs", "node"],
  ["vuejs", "vue"],
  ["angularjs", "angular"],
  ["reactjs", "react"],
  ["tailwindcss", "tailwind"],
  ["postgresql", "postgres"],
  ["mongodb", "mongo"],
  ["typescript", "ts"],
  ["javascript", "js"],
  ["microsoftazure", "azure"],
  ["microsoft", "ms"],
  ["huggingface", "hf"],
  ["openai", "chatgpt"],
];

const ALIAS_CANON_MAP = new Map();
for (const grp of ALIAS_GROUPS) {
  const canon = grp[0];
  for (const g of grp) ALIAS_CANON_MAP.set(g, canon);
}

function canonicalRoot(str) {
  let s = String(str || "").toLowerCase().trim();
  for (let i = 0; i < 3; i++) s = s.replace(VARIANT_SUFFIX_RE, "");
  s = s.replace(/(?:dotai|dotcom|dotio|dotorg|dotdev|dotapp|dotco|dotnet|dotgg)$/g, "");
  const norm = s.replace(/[^a-z0-9]/g, "");
  return ALIAS_CANON_MAP.get(norm) || norm;
}

function toSlug(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isInvisibleOnWhite(metrics) {
  if (!metrics.colors.length) return false;
  return metrics.color_families.every((f) => f === "white");
}

function passesCraftGate(metrics, svgText, { maxAnchors = 360, maxShapes = 55, maxBytes = 24000 } = {}) {
  if (svgText.length > maxBytes) return "bytes";
  if (metrics.has_filter) return "filter";
  if (metrics.shapes < 1 || metrics.shapes > maxShapes) return "shapes";
  if (metrics.anchors < 3 || metrics.anchors > maxAnchors) return "anchors";
  if (!metrics.width || !metrics.height || metrics.aspect > 12 || metrics.aspect < 0.12) return "aspect";
  if (isInvisibleOnWhite(metrics)) return "white-only";
  return null;
}

async function fetchRetry(url, type = "json", tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return type === "json" ? await res.json() : await res.text();
    } catch (err) {
      if (i === tries - 1) return null;
      await new Promise((r) => setTimeout(r, 300 * (i + 1)));
    }
  }
  return null;
}

async function mapConcurrent(items, concurrency, fn) {
  const results = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const cur = idx++;
      results[cur] = await fn(items[cur], cur);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

async function main() {
  if (!fs.existsSync(path.join(BASE_LIB_DIR, "catalog.json"))) {
    throw new Error(`Base logo library missing at ${BASE_LIB_DIR}`);
  }
  const baseCatalog = JSON.parse(fs.readFileSync(path.join(BASE_LIB_DIR, "catalog.json"), "utf8"));
  const baseSvgDir = path.join(BASE_LIB_DIR, "svg");

  const seenIds = new Set();
  const seenBrands = new Map(); // canonicalRoot -> { id, fromBase, aspect }
  const seenGeom = new Set();

  for (const item of baseCatalog) {
    const id = item.file.replace(/\.svg$/i, "").toLowerCase();
    seenIds.add(id);
    const root = canonicalRoot(item.brand || id);
    if (root && !seenBrands.has(root)) seenBrands.set(root, { id, fromBase: true, aspect: item.aspect || 1 });
    const fp = path.join(baseSvgDir, item.file);
    if (fs.existsSync(fp)) {
      const cleaned = sanitizeLogoSvg(fs.readFileSync(fp, "utf8"));
      if (cleaned) seenGeom.add(computeGeomHash(cleaned));
    }
  }
  console.log(`Loaded ${baseCatalog.length} base logos (${seenBrands.size} canonical brands, ${seenGeom.size} geom hashes).`);

  const rejected = { dupBrand: 0, dupGeom: 0, dupSubVariant: 0, badSvg: 0, craftGate: 0, fetchMiss: 0 };
  const extraItems = [];

  const [gbList, svglList, tsMeta, tsIconsJson] = await Promise.all([
    fetchRetry("https://raw.githubusercontent.com/gilbarbara/logos/main/logos.json"),
    fetchRetry("https://api.svgl.app"),
    fetchRetry("https://raw.githubusercontent.com/glincker/thesvg/main/src/data/icons.json"),
    fetchRetry("https://cdn.jsdelivr.net/npm/@iconify-json/thesvg-color/icons.json"),
  ]);

  // ------------------------------------------------------------------
  // Tier 1: gilbarbara/logos delta (process main files BEFORE -icon!)
  // ------------------------------------------------------------------
  const gbCandidates = [];
  for (const entry of gbList || []) {
    const sortedFiles = [...(entry.files || [])].sort((a, b) => {
      const aIcon = a.endsWith("-icon.svg") ? 1 : 0;
      const bIcon = b.endsWith("-icon.svg") ? 1 : 0;
      return aIcon - bIcon || a.localeCompare(b);
    });
    for (const file of sortedFiles) {
      const id = file.replace(/\.svg$/i, "").toLowerCase();
      if (seenIds.has(id)) continue;
      if (/-(?:vertical|wordmark|horizontal|grayscale|mono)$/i.test(id)) {
        rejected.dupSubVariant++;
        continue;
      }
      gbCandidates.push({
        id,
        file,
        name: entry.name || id,
        isIcon: id.endsWith("-icon"),
        brand: id.endsWith("-icon") ? id.slice(0, -5) : id,
        root: canonicalRoot(id),
      });
    }
  }
  // Ensure mains across the entire list precede -icon variants
  gbCandidates.sort((a, b) => Number(a.isIcon) - Number(b.isIcon) || a.id.localeCompare(b.id));

  const gbSvgPool = new Map();
  const gbPreFiltered = [];
  for (const c of gbCandidates) {
    if (!c.root || seenIds.has(c.id)) { rejected.dupBrand++; continue; }
    const owner = seenBrands.get(c.root);
    if (owner) {
      // Never attach -icon onto a brand that was already in the 1432 base catalog
      if (!c.isIcon || owner.fromBase) {
        rejected.dupBrand++;
        continue;
      }
    }
    gbPreFiltered.push(c);
  }

  console.log(`Fetching ${gbPreFiltered.length} Tier 1 (gilbarbara/logos) SVGs...`);
  const gbFetched = await mapConcurrent(gbPreFiltered, 16, async (c) => {
    const raw = await fetchRetry(`https://raw.githubusercontent.com/gilbarbara/logos/main/logos/${c.file}`, "text");
    return { ...c, raw };
  });

  const gbAddedById = new Map();
  let gbKept = 0;
  for (const item of gbFetched) {
    if (!item.raw) { rejected.fetchMiss++; continue; }
    const svg = sanitizeLogoSvg(item.raw);
    if (!svg) { rejected.badSvg++; continue; }
    const metrics = measureLogoSvg(svg);
    const gateFail = passesCraftGate(metrics, svg, { maxAnchors: 380, maxShapes: 60, maxBytes: 26000 });
    if (gateFail) { rejected.craftGate++; continue; }
    const gh = computeGeomHash(svg);
    if (seenGeom.has(gh)) { rejected.dupGeom++; continue; }

    // If -icon matches a newly added main in Tier 1, keep it ONLY if main is wide (>=1.35) & icon is compact (<1.35)
    if (item.isIcon) {
      const mainItem = gbAddedById.get(item.brand);
      if (mainItem && (mainItem.aspect < 1.35 || metrics.aspect >= 1.35)) {
        rejected.dupSubVariant++;
        continue;
      }
    } else if (seenBrands.has(item.root)) {
      rejected.dupBrand++;
      continue;
    }

    seenIds.add(item.id);
    seenGeom.add(gh);
    if (!seenBrands.has(item.root)) {
      seenBrands.set(item.root, { id: item.id, fromBase: false, aspect: metrics.aspect });
    }
    const cls = classifyLogoMetadata({
      id: item.id,
      variant: item.isIcon ? "icon" : "main",
      metrics,
      categories: [],
      title: item.name,
    });
    const rec = {
      id: item.id,
      brand: item.brand,
      variant: item.isIcon ? "icon" : "main",
      pair: null,
      ...metrics,
      ...cls,
      svg,
    };
    gbAddedById.set(item.id, rec);
    extraItems.push(rec);
    gbKept++;
  }
  // Link symmetrical pairs within Tier 1
  for (const rec of gbAddedById.values()) {
    if (rec.variant === "icon" && gbAddedById.has(rec.brand)) {
      const m = gbAddedById.get(rec.brand);
      rec.pair = `${m.id}.svg`;
      m.pair = `${rec.id}.svg`;
    }
  }
  console.log(`Tier 1 (gilbarbara/logos): kept ${gbKept}`);

  // ------------------------------------------------------------------
  // Tier 2: api.svgl.app (modern AI / design / devtool marks)
  // ------------------------------------------------------------------
  const svglCandidates = [];
  for (const item of svglList || []) {
    const slug = toSlug(item.title);
    const root = canonicalRoot(slug);
    if (!slug || !root || seenIds.has(slug) || seenBrands.has(root)) {
      rejected.dupBrand++;
      continue;
    }
    const url = typeof item.route === "string" ? item.route : (item.route?.light || item.route?.dark);
    if (!url) continue;
    // Reserve brand immediately to prevent duplicate entries inside svgl (e.g. Pi, Radius)
    seenIds.add(slug);
    seenBrands.set(root, { id: slug, fromBase: false, aspect: 1 });
    svglCandidates.push({
      id: slug,
      brand: slug,
      title: item.title,
      categories: Array.isArray(item.category) ? item.category : [item.category].filter(Boolean),
      url,
      root,
    });
  }

  console.log(`Fetching ${svglCandidates.length} Tier 2 (svgl) SVGs...`);
  const svglFetched = await mapConcurrent(svglCandidates, 14, async (c) => {
    const raw = await fetchRetry(c.url, "text");
    return { ...c, raw };
  });

  let svglKept = 0;
  for (const item of svglFetched) {
    if (!item.raw) {
      rejected.fetchMiss++;
      continue;
    }
    const svg = sanitizeLogoSvg(item.raw);
    if (!svg) { rejected.badSvg++; continue; }
    const metrics = measureLogoSvg(svg);
    const gateFail = passesCraftGate(metrics, svg, { maxAnchors: 380, maxShapes: 60, maxBytes: 26000 });
    if (gateFail) { rejected.craftGate++; continue; }
    const gh = computeGeomHash(svg);
    if (seenGeom.has(gh)) { rejected.dupGeom++; continue; }
    seenGeom.add(gh);
    const cls = classifyLogoMetadata({
      id: item.id,
      variant: "main",
      metrics,
      categories: item.categories,
      title: item.title,
    });
    extraItems.push({
      id: item.id,
      brand: item.brand,
      variant: "main",
      pair: null,
      ...metrics,
      ...cls,
      svg,
    });
    svglKept++;
  }
  console.log(`Tier 2 (svgl): kept ${svglKept}`);

  // ------------------------------------------------------------------
  // Tier 3: glincker/thesvg (`collection === 'brands'` ONLY)
  // ------------------------------------------------------------------
  const icMap = tsIconsJson?.icons || {};
  let tsKept = 0;
  for (const x of tsMeta || []) {
    if (x.collection !== "brands") continue;
    const slug = toSlug(x.slug);
    if (!slug) continue;
    if (/-(?:dark|grayscale|greyscale|mono|monochrome|wordmark|vertical|horizontal|old|legacy|app-icon|black|white)$/i.test(slug)) {
      rejected.dupSubVariant++;
      continue;
    }
    const keys = [slug, x.slug, x.title, ...(x.aliases || [])].map(canonicalRoot).filter(Boolean);
    if (!keys.length || seenIds.has(slug) || keys.some((k) => seenBrands.has(k))) {
      rejected.dupBrand++;
      continue;
    }
    const ic = icMap[x.slug] || icMap[`${x.slug}-light`] || icMap[`${x.slug}-color`];
    if (!ic?.body) { rejected.badSvg++; continue; }
    const w = ic.width || tsIconsJson.width || 24;
    const h = ic.height || tsIconsJson.height || 24;
    const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${ic.body}</svg>`;
    const svg = sanitizeLogoSvg(rawSvg);
    if (!svg) { rejected.badSvg++; continue; }
    const metrics = measureLogoSvg(svg);
    const gateFail = passesCraftGate(metrics, svg, { maxAnchors: 320, maxShapes: 45, maxBytes: 18500 });
    if (gateFail) { rejected.craftGate++; continue; }
    const gh = computeGeomHash(svg);
    if (seenGeom.has(gh)) { rejected.dupGeom++; continue; }

    seenGeom.add(gh);
    seenIds.add(slug);
    for (const k of keys) seenBrands.set(k, { id: slug, fromBase: false, aspect: metrics.aspect });

    const cls = classifyLogoMetadata({
      id: slug,
      variant: "main",
      metrics,
      categories: x.categories || [],
      title: x.title || slug,
    });
    extraItems.push({
      id: slug,
      brand: slug,
      variant: "main",
      pair: null,
      ...metrics,
      ...cls,
      svg,
    });
    tsKept++;
  }
  console.log(`Tier 3 (thesvg brands): kept ${tsKept}`);

  // Strip internal-only temporary helper fields before persisting
  const cleanedItems = extraItems.map(({ circles, rects, hasStrokeOnly, hasOpacity, ...rest }) => rest);
  cleanedItems.sort((a, b) => a.id.localeCompare(b.id));

  const payload = {
    generatedAt: new Date().toISOString(),
    counts: {
      baseCatalog: baseCatalog.length,
      addedGilbarbara: gbKept,
      addedSvgl: svglKept,
      addedThesvg: tsKept,
      addedTotal: cleanedItems.length,
      grandTotal: baseCatalog.length + cleanedItems.length,
    },
    rejected,
    items: cleanedItems,
  };
  fs.writeFileSync(EXTRA_LOGOS_PATH, JSON.stringify(payload), "utf8");
  const sizeMb = (fs.statSync(EXTRA_LOGOS_PATH).size / (1024 * 1024)).toFixed(2);
  console.log(`\nWrote ${EXTRA_LOGOS_PATH} (${sizeMb} MB):`, payload.counts);
  console.log("Rejected summary:", rejected);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

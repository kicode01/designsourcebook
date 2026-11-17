// Expand and deduplicate `data/icon-packs.json`:
// 1. Enriches existing verified UI icon packs with additional non-redundant radial & core slots.
// 2. Adds verified distinct official UI icon packs (both @iconify-json/* and native npm packs).
// 3. Rejects redundant pack aliases (>= 35% normalized geometry overlap) and duplicate glyphs.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKS_PATH = path.join(ROOT, "data/icon-packs.json");

export const SLOTS = [
  // Original 12 slots
  "home", "search", "plus", "check", "close", "arrow-right", "chevron-down", "settings", "bell", "user", "folder", "code",
  // Additional 16 radial, geometric & core UI slots
  "sun", "moon", "star", "clock", "compass", "globe", "heart", "shield", "zap", "layers", "lock", "eye", "trash", "edit", "download", "calendar",
];

const SLOT_ALIASES = {
  home: ["home", "house", "home-2", "home-line", "home-outline", "home-alt", "homepage"],
  search: ["search", "magnifying-glass", "search-line", "magnifier", "find", "loupe"],
  plus: ["plus", "add", "add-line", "plus-line", "add-outline"],
  check: ["check", "checkmark", "tick", "done", "check-line", "check-outline"],
  close: ["close", "x", "multiply", "xmark", "dismiss", "times", "close-line", "cross"],
  "arrow-right": ["arrow-right", "arrow-forward", "arrow-right-line", "right-arrow"],
  "chevron-down": ["chevron-down", "caret-down", "angle-down", "arrow-down-s-line", "expand-more", "chevron-down-small"],
  settings: ["settings", "setting", "cog", "gear", "settings-line", "preferences"],
  bell: ["bell", "notification", "notifications", "alarm", "notification-line", "alert"],
  user: ["user", "person", "account", "profile", "user-line", "avatar", "account-outline"],
  folder: ["folder", "directory", "folder-line", "folder-outline", "folder-closed"],
  code: ["code", "code-2", "code-s-slash-line", "brackets", "terminal", "code-outline"],
  sun: ["sun", "brightness", "sunny", "wb-sunny", "light-mode", "sun-line", "sun-outline"],
  moon: ["moon", "night", "dark-mode", "bedtime", "clear-night", "moon-line", "moon-outline"],
  star: ["star", "favorite", "star-line", "star-outline", "bookmark-star"],
  clock: ["clock", "time", "watch", "timer", "access-time", "time-line", "history", "clock-outline"],
  compass: ["compass", "explore", "discover", "compass-line", "compass-outline", "safari"],
  globe: ["globe", "world", "earth", "language", "public", "global-line", "planet", "web", "globe-outline"],
  heart: ["heart", "like", "love", "heart-line", "heart-outline", "favorite-border"],
  shield: ["shield", "security", "protect", "shield-line", "shield-outline", "verified-user"],
  zap: ["zap", "bolt", "flash", "lightning", "lightning-bolt", "flashlight-line", "flash-outline"],
  layers: ["layers", "stack", "stack-line", "layers-2", "layers-outline", "square-3-stack-3d"],
  lock: ["lock", "locked", "padlock", "lock-line", "lock-closed", "lock-outline"],
  eye: ["eye", "view", "show", "visibility", "eye-line", "eye-outline"],
  trash: ["trash", "delete", "bin", "trash-2", "delete-bin-line", "delete-outline", "garbage"],
  edit: ["edit", "pencil", "pen", "write", "pencil-line", "edit-line", "edit-2", "create"],
  download: ["download", "download-line", "download-2-line", "arrow-down-tray", "cloud-download", "download-outline"],
  calendar: ["calendar", "date", "event", "calendar-line", "calendar-days", "calendar-outline", "today"],
};

// Map existing 57 pack IDs to verified upstream Iconify collections for missing slots enrichment ONLY
const EXISTING_ENRICH_ICONIFY = {
  antd: { iconify: "@iconify-json/ant-design", grid: 24, filter: (k) => k.endsWith("-outlined") },
  bootstrap: { iconify: "@iconify-json/bi", grid: 16 },
  carbon: { iconify: "@iconify-json/carbon", grid: 32 },
  clarity: { iconify: "@iconify-json/clarity", grid: 36, filter: (k) => k.endsWith("-line") },
  feather: { iconify: "@iconify-json/feather", grid: 24 },
  flowbite: { iconify: "@iconify-json/flowbite", grid: 24, filter: (k) => k.endsWith("-outline") },
  fluent: { iconify: "@iconify-json/fluent", grid: 20, filter: (k) => /20-regular$/.test(k) },
  foundation: { iconify: "@iconify-json/foundation", grid: 100 },
  gitlab: { iconify: "@iconify-json/pajamas", grid: 16 },
  grommet: { iconify: "@iconify-json/grommet-icons", grid: 24 },
  heroicons: { iconify: "@iconify-json/heroicons", grid: 24, filter: (k) => !k.endsWith("-solid") && !k.includes("-16-") && !k.includes("-20-") },
  lucide: { iconify: "@iconify-json/lucide", grid: 24 },
  material: { iconify: "@iconify-json/ic", grid: 24, filter: (k) => k.startsWith("baseline-") },
  "material-symbols": { iconify: "@iconify-json/material-symbols", grid: 24, filter: (k) => k.endsWith("-outline") },
  octicons: { iconify: "@iconify-json/octicon", grid: 16, filter: (k) => k.endsWith("-16") },
  phosphor: { iconify: "@iconify-json/ph", grid: 24, filter: (k) => !/-(?:bold|duotone|fill|light|thin)$/.test(k) },
  radix: { iconify: "@iconify-json/radix-icons", grid: 15 },
  siemens: { iconify: "@iconify-json/ix", grid: 24 },
  tabler: { iconify: "@iconify-json/tabler", grid: 24, filter: (k) => !k.endsWith("-filled") },
  tdesign: { iconify: "@iconify-json/tdesign", grid: 24, filter: (k) => !k.endsWith("-filled") },
  vaadin: { iconify: "@iconify-json/vaadin", grid: 16 },
};

// Candidate NEW distinct official icon packs (zero intentional aliases)
const NEW_ICONIFY_PACKS = [
  { id: "remixicon", pkg: "remixicon", iconify: "@iconify-json/ri", filter: (k) => k.endsWith("-line") },
  { id: "iconoir", pkg: "iconoir", iconify: "@iconify-json/iconoir" },
  { id: "ionicons", pkg: "ionicons", iconify: "@iconify-json/ion", filter: (k) => k.endsWith("-outline") },
  { id: "solar", pkg: "@iconify-json/solar", iconify: "@iconify-json/solar", filter: (k) => k.endsWith("-linear") || k.endsWith("-outline") },
  { id: "mingcute", pkg: "mingcute_icon", iconify: "@iconify-json/mingcute", filter: (k) => k.endsWith("-line") },
  { id: "hugeicons", pkg: "@hugeicons/react", iconify: "@iconify-json/hugeicons" },
  { id: "eva", pkg: "eva-icons", iconify: "@iconify-json/eva", filter: (k) => k.endsWith("-outline") },
  { id: "akar", pkg: "akar-icons", iconify: "@iconify-json/akar-icons" },
  { id: "boxicons", pkg: "boxicons", iconify: "@iconify-json/bx" },
  { id: "pixelarticons", pkg: "pixelarticons", iconify: "@iconify-json/pixelarticons" },
  { id: "majesticons", pkg: "majesticons", iconify: "@iconify-json/majesticons", filter: (k) => k.endsWith("-line") },
  { id: "humbleicons", pkg: "humbleicons", iconify: "@iconify-json/humbleicons" },
  { id: "teenyicons", pkg: "teenyicons", iconify: "@iconify-json/teenyicons", filter: (k) => k.endsWith("-outline") },
  { id: "mynaui", pkg: "@mynaui/icons", iconify: "@iconify-json/mynaui", filter: (k) => !k.endsWith("-solid") },
  { id: "circum", pkg: "circum-icons", iconify: "@iconify-json/circum" },
  { id: "gg", pkg: "css.gg", iconify: "@iconify-json/gg" },
  { id: "iconpark", pkg: "@icon-park/svg", iconify: "@iconify-json/icon-park-outline" },
  { id: "fontawesome", pkg: "@fortawesome/fontawesome-free", iconify: "@iconify-json/fa6-solid" },
  { id: "gravity-ui", pkg: "@gravity-ui/icons", iconify: "@iconify-json/gravity-ui" },
  { id: "codicon", pkg: "@vscode/codicons", iconify: "@iconify-json/codicon" },
  { id: "prime", pkg: "primeicons", iconify: "@iconify-json/prime" },
  { id: "jam", pkg: "jam-icons", iconify: "@iconify-json/jam", filter: (k) => !k.endsWith("-f") },
  { id: "basil", pkg: "@iconify-json/basil", iconify: "@iconify-json/basil", filter: (k) => k.endsWith("-outline") },
  { id: "proicons", pkg: "@iconify-json/proicons", iconify: "@iconify-json/proicons" },
  { id: "zondicons", pkg: "zondicons", iconify: "@iconify-json/zondicons" },
  { id: "typcn", pkg: "typicons.font", iconify: "@iconify-json/typcn" },
  { id: "garden", pkg: "@zendeskgarden/svg-icons", iconify: "@iconify-json/garden", filter: (k) => k.includes("-stroke-16") || k.includes("-16") },
  { id: "f7", pkg: "framework7-icons", iconify: "@iconify-json/f7" },
  { id: "ooui", pkg: "oojs-ui", iconify: "@iconify-json/ooui" },
  { id: "ep", pkg: "@element-plus/icons-svg", iconify: "@iconify-json/ep" },
  { id: "uil", pkg: "@iconscout/unicons", iconify: "@iconify-json/uil" },
  { id: "weui", pkg: "weui-icon", iconify: "@iconify-json/weui", filter: (k) => k.endsWith("-outlined") },
  { id: "gridicons", pkg: "gridicons", iconify: "@iconify-json/gridicons" },
  { id: "charm", pkg: "charm-icons", iconify: "@iconify-json/charm" },
  { id: "system-uicons", pkg: "system-uicons", iconify: "@iconify-json/system-uicons" },
  { id: "wordpress", pkg: "@wordpress/icons", iconify: "@iconify-json/wordpress" },
  { id: "nrk", pkg: "@nrk/core-icons", iconify: "@iconify-json/nrk" },
  { id: "mdi", pkg: "@mdi/svg", iconify: "@iconify-json/mdi" },
];

async function fetchRetry(url, type = "json", tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return type === "json" ? await res.json() : await res.text();
    } catch (e) {
      if (i === tries - 1) throw e;
      await new Promise((r) => setTimeout(r, 350 * (i + 1)));
    }
  }
  return null;
}

const SAFE_TAGS = new Set(["path", "circle", "rect", "line", "polyline", "polygon", "ellipse"]);
const ALLOWED_ATTRS = new Set([
  "d", "cx", "cy", "r", "rx", "ry", "x", "y", "x1", "y1", "x2", "y2",
  "width", "height", "points", "fill", "stroke", "stroke-width",
  "stroke-linecap", "stroke-linejoin", "fill-rule", "clip-rule", "opacity",
]);

function sanitizeBody(body, maxLen = 1200) {
  if (!body || /<(?:script|foreignObject|image|text|filter)\b/i.test(body)) return null;
  const cleaned = [];
  const tagRe = /<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*?)\s*\/?>/gi;
  let m;
  while ((m = tagRe.exec(body))) {
    const tag = m[1].toLowerCase();
    if (!SAFE_TAGS.has(tag)) continue;
    const attrs = [];
    const attrRe = /([a-zA-Z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
    let a;
    while ((a = attrRe.exec(m[2]))) {
      const k = a[1].toLowerCase();
      const v = (a[2] ?? a[3] ?? "").trim();
      if (!ALLOWED_ATTRS.has(k)) continue;
      if (/url\(|expression|javascript:/i.test(v)) continue;
      attrs.push(`${k}="${v.replace(/"/g, "")}"`);
    }
    if (attrs.length) cleaned.push(`<${tag} ${attrs.join(" ")}/>`);
    if (cleaned.length >= 16) break;
  }
  const out = cleaned.join("");
  return out && out.length <= maxLen ? out : null;
}

function normGeomHash(body, grid = 24) {
  const scale = grid > 0 ? 24 / grid : 1;
  const norm = String(body || "")
    .toLowerCase()
    .replace(/\b(?:stroke|fill|stroke-width|stroke-linecap|stroke-linejoin|fill-rule|clip-rule|opacity)="[^"]*"/g, "")
    .replace(/-?\d+(?:\.\d+)?/g, (n) => String(Math.round(parseFloat(n) * scale * 2) / 2))
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9.<>/=" -]/g, "")
    .trim();
  return crypto.createHash("sha1").update(norm).digest("hex").slice(0, 16);
}

function inferStyleFromBody(rawBody, sanitizedBody = rawBody) {
  const gMatch = /<g\b([^>]*)>/i.exec(rawBody);
  const gAttrs = gMatch ? gMatch[1] : "";
  const hasGroupStroke = /\bstroke=/i.test(gAttrs) && !/stroke=["']?none/i.test(gAttrs);
  const hasBodyStroke = /\bstroke=/i.test(sanitizedBody) && !/stroke=["']?none/i.test(sanitizedBody);
  const hasGroupNoneFill = /\bfill=["']?none["']?/i.test(gAttrs);
  const hasExplicitFill = /\bfill=["'](?!none)[^"']+["']/i.test(sanitizedBody);
  const isStroke = (hasGroupStroke || hasBodyStroke) && (hasGroupNoneFill || !hasExplicitFill);
  const srcForStroke = `${gAttrs} ${sanitizedBody}`;
  const swMatch = /stroke-width=["']?(\d+(?:\.\d+)?)/i.exec(srcForStroke);
  const lcMatch = /stroke-linecap=["']?(round|square|butt)/i.exec(srcForStroke);
  const ljMatch = /stroke-linejoin=["']?(round|miter|bevel)/i.exec(srcForStroke);
  return {
    fill: isStroke ? "none" : "currentColor",
    ...(isStroke ? {
      stroke: true,
      strokeWidth: swMatch ? Number(swMatch[1]) : 1.5,
      strokeLinecap: lcMatch ? lcMatch[1] : "round",
      strokeLinejoin: ljMatch ? ljMatch[1] : "round",
    } : {}),
  };
}

function matchIconifyKey(keys, aliases, preferredFilter) {
  const pool = preferredFilter ? keys.filter(preferredFilter) : keys;
  const check = (arr) => {
    for (const alias of aliases) {
      const exact = arr.find((k) => k === alias || k === `${alias}-line` || k === `${alias}-outline` || k === `${alias}-outlined` || k === `${alias}-linear` || k === `${alias}-stroke-16` || k === `${alias}-16` || k === `baseline-${alias}` || k === `${alias}-1-line` || k === `${alias}-2-line` || k === `${alias}-3-line`);
      if (exact) return exact;
    }
    for (const alias of aliases) {
      const re = new RegExp(`(?:^|[-:])${alias}(?:$|-(?:line|outline|outlined|linear|regular|stroke|solid|16|20|24|fill|high|low|1|2))`, "i");
      const hit = arr.find((k) => re.test(k) && !/off|slash|broken|error|warning|plus|minus|add|remove|lock|unlock|check|close|circle|box|square/i.test(k.replace(alias, "")));
      if (hit) return hit;
    }
    return null;
  };
  return check(pool) || (preferredFilter ? check(keys) : null);
}

function parseRawSvg(rawText, slot, name, fallbackGrid = 24) {
  const m = /<svg\b([^>]*)>([\s\S]*?)<\/svg>/i.exec(rawText);
  if (!m) return null;
  const attrs = m[1];
  const rawBody = m[2];
  const vb = /viewBox=["']\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*["']/i.exec(attrs);
  const wAttr = /\bwidth=["']?(\d+(?:\.\d+)?)/i.exec(attrs);
  const grid = vb ? Math.round(Number(vb[3])) : (wAttr ? Math.round(Number(wAttr[1])) : fallbackGrid);
  if (!grid || grid < 12) return null;
  const viewBox = vb ? `${vb[1]} ${vb[2]} ${vb[3]} ${vb[4]}` : `0 0 ${grid} ${grid}`;
  const isStroke = /fill=["']?none/i.test(attrs) || (/\bstroke=/i.test(attrs + rawBody) && !/fill=["'](?!none)/i.test(attrs));
  const sw = /stroke-width=["']?(\d+(?:\.\d+)?)/i.exec(attrs + rawBody);
  const lc = /stroke-linecap=["']?(round|square|butt)/i.exec(attrs + rawBody);
  const lj = /stroke-linejoin=["']?(round|miter|bevel)/i.exec(attrs + rawBody);
  const normBody = rawBody
    .replace(/\b(fill|stroke)=["'](?:#000(?:000)?|#1[0-9a-f]{5}|black|currentColor)["']/gi, '$1="currentColor"')
    .replace(/\s+/g, " ");
  const body = sanitizeBody(normBody);
  if (!body) return null;
  return {
    slot,
    name,
    viewBox,
    grid,
    fill: isStroke ? "none" : "currentColor",
    ...(isStroke ? {
      stroke: true,
      strokeWidth: sw ? Number(sw[1]) : 1.5,
      strokeLinecap: lc ? lc[1].toLowerCase() : "round",
      strokeLinejoin: lj ? lj[1].toLowerCase() : "round",
    } : {}),
    body,
  };
}

// Fetch native npm packs directly
async function fetchNpmLatestVersion(pkg) {
  const reg = await fetchRetry(`https://registry.npmjs.org/${encodeURIComponent(pkg).replace(/^%40/, "@")}/latest`).catch(() => null);
  if (reg?.version) return reg.version;
  const jsd = await fetchRetry(`https://data.jsdelivr.net/v1/package/npm/${pkg}`).catch(() => null);
  return jsd?.tags?.latest || jsd?.versions?.[0] || null;
}

async function fetchWisePack() {
  const ver = await fetchNpmLatestVersion("@transferwise/icons");
  if (!ver) return null;
  const iconsJson = await fetchRetry(`https://cdn.jsdelivr.net/npm/@transferwise/icons@${ver}/build/icons.json`);
  if (!iconsJson) return null;
  const keys = Object.keys(iconsJson).filter((k) => !k.endsWith("-fill"));
  const glyphs = [];
  const seen = new Set();
  await Promise.all(SLOTS.map(async (slot) => {
    const key = matchIconifyKey(keys, SLOT_ALIASES[slot]);
    if (!key) return;
    const rel = iconsJson[key]?.svgFiles?.[key]?.replace(/^\.\//, "");
    if (!rel) return;
    const svgText = await fetchRetry(`https://cdn.jsdelivr.net/npm/@transferwise/icons@${ver}/build/${rel}`, "text").catch(() => null);
    if (!svgText) return;
    const g = parseRawSvg(svgText, slot, key, 24);
    if (!g) return;
    const h = normGeomHash(g.body, g.grid);
    if (seen.has(h)) return;
    seen.add(h);
    glyphs.push(g);
  }));
  return { package: "@transferwise/icons", version: ver, grid: 24, glyphs };
}

async function fetchVisaPack() {
  const ver = await fetchNpmLatestVersion("@visa/nova-icons-svg");
  if (!ver) return null;
  const flat = await fetchRetry(`https://data.jsdelivr.net/v1/package/npm/@visa/nova-icons-svg@${ver}/flat`).catch(() => null);
  const svgs = (flat?.files || []).map((f) => f.name).filter((f) => f.endsWith("-low.svg") || f.endsWith("-high.svg"));
  const byName = new Map();
  for (const fp of svgs) {
    const base = path.basename(fp, ".svg").replace(/-(?:high|low|tiny)$/, "");
    if (!byName.has(base) || fp.endsWith("-low.svg")) byName.set(base, fp);
  }
  const keys = [...byName.keys()];
  const glyphs = [];
  const seen = new Set();
  await Promise.all(SLOTS.map(async (slot) => {
    const hit = matchIconifyKey(keys, SLOT_ALIASES[slot]);
    if (!hit) return;
    const svgText = await fetchRetry(`https://cdn.jsdelivr.net/npm/@visa/nova-icons-svg@${ver}${byName.get(hit)}`, "text").catch(() => null);
    if (!svgText) return;
    const g = parseRawSvg(svgText, slot, hit, 24);
    if (!g) return;
    const h = normGeomHash(g.body, g.grid);
    if (seen.has(h)) return;
    seen.add(h);
    glyphs.push(g);
  }));
  return { package: "@visa/nova-icons-svg", version: ver, grid: 24, glyphs };
}

async function fetchRaycastPack() {
  const ver = await fetchNpmLatestVersion("@raycast/icons");
  if (!ver) return null;
  const esm = await fetchRetry(`https://cdn.jsdelivr.net/npm/@raycast/icons@${ver}/dist/icons.esm.js`, "text").catch(() => null);
  if (!esm) return null;
  const icons = {};
  const blockRe = /var\s+Svg([A-Za-z0-9]+)\s*=\s*function[^\{]+\{([\s\S]*?)\};/g;
  let bm;
  while ((bm = blockRe.exec(esm))) {
    const rawName = bm[1].replace(/Svg$/, "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    const fnBody = bm[2];
    const vbM = /viewBox:\s*"([^"]+)"/.exec(fnBody);
    const elems = [];
    const elRe = /createElement\("(path|circle|rect|line|polyline|polygon)"\s*,\s*\{([^}]+)\}/g;
    let em;
    while ((em = elRe.exec(fnBody))) {
      const tag = em[1];
      const attrPairs = [];
      const kvRe = /"?([a-zA-Z0-9-]+)"?\s*:\s*"([^"]+)"/g;
      let km;
      while ((km = kvRe.exec(em[2]))) {
        const k = km[1].replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
        const v = km[2] === "currentColor" ? "currentColor" : km[2];
        if (ALLOWED_ATTRS.has(k)) attrPairs.push(`${k}="${v}"`);
      }
      if (attrPairs.length) elems.push(`<${tag} ${attrPairs.join(" ")}/>`);
    }
    const cleanBody = sanitizeBody(elems.join(""));
    if (cleanBody) icons[rawName] = { body: cleanBody, viewBox: vbM ? vbM[1] : "0 0 16 16" };
  }
  const keys = Object.keys(icons);
  const glyphs = [];
  const seen = new Set();
  for (const slot of SLOTS) {
    const aliases = { ...SLOT_ALIASES, settings: ["gear", "cog"], close: ["xmark", "x-mark-circle"], search: ["magnifying-glass"], edit: ["pencil"], home: ["house"] }[slot] || SLOT_ALIASES[slot];
    const hit = matchIconifyKey(keys, aliases);
    if (!hit) continue;
    const item = icons[hit];
    const h = normGeomHash(item.body, 16);
    if (seen.has(h)) continue;
    seen.add(h);
    const isStroke = /\bstroke="/i.test(item.body);
    glyphs.push({
      slot, name: hit, viewBox: item.viewBox, grid: 16,
      fill: isStroke ? "none" : "currentColor",
      ...(isStroke ? { stroke: true, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } : {}),
      body: item.body,
    });
  }
  return { package: "@raycast/icons", version: ver, grid: 16, glyphs };
}

async function main() {
  const existing = JSON.parse(fs.readFileSync(PACKS_PATH, "utf8"));
  console.log(`Starting from ${Object.keys(existing).length} packs, ${Object.values(existing).reduce((n, p) => n + p.glyphs.length, 0)} glyphs.`);

  // Index existing package names & existing normalized path hashes
  const seenPackages = new Set(Object.values(existing).map((p) => String(p.package || "").toLowerCase()));
  const existingHashesByPack = new Map();
  const globalHashes = new Map();

  for (const [pid, pk] of Object.entries(existing)) {
    const pSet = new Set();
    for (const g of pk.glyphs || []) {
      const h = normGeomHash(g.body, g.grid || pk.grid || 24);
      pSet.add(h);
      if (!globalHashes.has(h)) globalHashes.set(h, new Set());
      globalHashes.get(h).add(pid);
    }
    existingHashesByPack.set(pid, pSet);
  }

  // Step 1: Enrich existing packs with missing slots from their verified upstream @iconify-json mirrors
  let enrichedCount = 0;
  for (const [pid, cfg] of Object.entries(EXISTING_ENRICH_ICONIFY)) {
    const pk = existing[pid];
    if (!pk) continue;
    const haveSlots = new Set(pk.glyphs.map((g) => g.slot));
    const missingSlots = SLOTS.filter((s) => !haveSlots.has(s));
    if (!missingSlots.length) continue;

    const data = await fetchRetry(`https://cdn.jsdelivr.net/npm/${cfg.iconify}/icons.json`).catch(() => null);
    if (!data?.icons) continue;
    const keys = Object.keys(data.icons);
    const pHashes = existingHashesByPack.get(pid);
    const sampleExisting = pk.glyphs[0];
    const pkGrid = pk.grid || cfg.grid || 24;
    const defW = data.width || pkGrid;
    const defH = data.height || pkGrid;

    for (const slot of missingSlots) {
      const hit = matchIconifyKey(keys, SLOT_ALIASES[slot], cfg.filter);
      if (!hit) continue;
      const ic = data.icons[hit];
      const w = ic.width || defW;
      const h = ic.height || defH;
      const body = sanitizeBody(ic.body);
      if (!body) continue;
      const gh = normGeomHash(body, w);
      if (pHashes.has(gh)) continue; // Avoid redundant duplicate shape within same pack
      pHashes.add(gh);
      if (!globalHashes.has(gh)) globalHashes.set(gh, new Set());
      globalHashes.get(gh).add(pid);

      const style = sampleExisting?.stroke ? {
        fill: "none",
        stroke: true,
        strokeWidth: sampleExisting.strokeWidth || 1.5,
        strokeLinecap: sampleExisting.strokeLinecap || "round",
        strokeLinejoin: sampleExisting.strokeLinejoin || "round",
      } : inferStyleFromBody(ic.body, body);

      pk.glyphs.push({
        slot,
        name: hit,
        viewBox: `0 0 ${w} ${h}`,
        grid: w,
        ...style,
        body,
      });
      enrichedCount++;
    }
  }
  console.log(`Enriched existing packs with +${enrichedCount} new non-redundant glyphs.`);

  // Step 2: Add genuinely distinct NEW official UI icon packs (blocking >=35% geometry overlap)
  let addedPacks = 0;
  let addedGlyphs = 0;
  const rejected = [];

  async function considerNewPack(id, builderFn, pkgName) {
    if (existing[id]) return;
    if (seenPackages.has(pkgName.toLowerCase())) {
      rejected.push({ id, reason: `duplicate package ${pkgName}` });
      return;
    }
    let candidate = null;
    try {
      candidate = await builderFn();
    } catch (err) {
      rejected.push({ id, reason: `fetch error: ${err?.message || err}` });
      return;
    }
    if (!candidate || candidate.glyphs.length < 14) {
      rejected.push({ id, reason: `insufficient matched slots (${candidate?.glyphs?.length || 0})` });
      return;
    }
    // Check overlap against EVERY existing pack individually AND globally
    const perPackHits = {};
    for (const g of candidate.glyphs) {
      const gh = normGeomHash(g.body, g.grid || candidate.grid);
      const owners = globalHashes.get(gh);
      if (owners) {
        for (const o of owners) perPackHits[o] = (perPackHits[o] || 0) + 1;
      }
    }
    const topOverlap = Object.entries(perPackHits).sort((a, b) => b[1] - a[1])[0];
    const maxRatio = topOverlap ? topOverlap[1] / candidate.glyphs.length : 0;
    if (maxRatio >= 0.35) {
      rejected.push({ id, reason: `redundant geometry: ${(maxRatio * 100).toFixed(0)}% overlap with ${topOverlap[0]}` });
      return;
    }

    existing[id] = candidate;
    seenPackages.add(candidate.package.toLowerCase());
    for (const g of candidate.glyphs) {
      const gh = normGeomHash(g.body, g.grid || candidate.grid);
      if (!globalHashes.has(gh)) globalHashes.set(gh, new Set());
      globalHashes.get(gh).add(id);
    }
    addedPacks++;
    addedGlyphs += candidate.glyphs.length;
    console.log(`  + added pack "${id}" (${candidate.package}@${candidate.version}, ${candidate.grid}px, ${candidate.glyphs.length} glyphs, overlap=${(maxRatio * 100).toFixed(0)}%)`);
  }

  for (const cfg of NEW_ICONIFY_PACKS) {
    await considerNewPack(cfg.id, async () => {
      const pkgMeta = await fetchRetry(`https://cdn.jsdelivr.net/npm/${cfg.iconify}/package.json`).catch(() => null);
      const data = await fetchRetry(`https://cdn.jsdelivr.net/npm/${cfg.iconify}/icons.json`).catch(() => null);
      if (!data?.icons) return null;
      const keys = Object.keys(data.icons);
      const defW = data.width || 24;
      const defH = data.height || 24;
      const glyphs = [];
      const seen = new Set();
      for (const slot of SLOTS) {
        const hit = matchIconifyKey(keys, SLOT_ALIASES[slot], cfg.filter);
        if (!hit) continue;
        const ic = data.icons[hit];
        const w = ic.width || defW;
        const h = ic.height || defH;
        const body = sanitizeBody(ic.body);
        if (!body) continue;
        const gh = normGeomHash(body, w);
        if (seen.has(gh)) continue;
        seen.add(gh);
        glyphs.push({
          slot,
          name: hit,
          viewBox: `0 0 ${w} ${h}`,
          grid: w,
          ...inferStyleFromBody(ic.body, body),
          body,
        });
      }
      return { package: cfg.pkg, version: pkgMeta?.version || "latest", grid: defW, glyphs };
    }, cfg.pkg);
  }

  // Native npm packs
  await considerNewPack("wise", fetchWisePack, "@transferwise/icons");
  await considerNewPack("visa", fetchVisaPack, "@visa/nova-icons-svg");
  await considerNewPack("raycast", fetchRaycastPack, "@raycast/icons");

  // Sort packs alphabetically & normalize counts
  const sorted = Object.fromEntries(Object.entries(existing).sort((a, b) => a[0].localeCompare(b[0])));
  fs.writeFileSync(PACKS_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8");

  const finalPackCount = Object.keys(sorted).length;
  const finalGlyphCount = Object.values(sorted).reduce((n, p) => n + p.glyphs.length, 0);
  const sizeKb = (fs.statSync(PACKS_PATH).size / 1024).toFixed(1);
  console.log(`\nDone! Rejected ${rejected.length}:`, rejected);
  console.log(`Final data/icon-packs.json: ${finalPackCount} packs, ${finalGlyphCount} unique glyphs (${sizeKb} KB).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Harvest verified real SVG icon glyphs directly from official npm packages
// (and GitHub raw SVG sources) into data/icon-packs.json.
// Zero fabrication: every glyph stored comes verbatim from an official release.
//
// Usage: node scripts/fetch-icon-packs.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sanitizePrimitives } from "../lib/icons.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const OUT = path.join(ROOT, "data/icon-packs.json");
const UA = "Mozilla/5.0 (compatible; designsourcebook/0.1; +https://github.com/)";

const SLOTS = [
  { key: "home", names: ["home", "house", "house-door", "home-1", "home-2"] },
  { key: "search", names: ["search", "magnifying-glass", "magnifyingglass", "magnifier", "find", "search-md"] },
  { key: "plus", names: ["plus", "add", "plus-lg", "plus-16", "add-16"] },
  { key: "check", names: ["check", "checkmark", "check-lg", "tick", "done"] },
  { key: "close", names: ["x", "close", "dismiss", "times", "xmark", "cross-2", "cross", "cross-1", "clear", "x-lg"] },
  { key: "arrow-right", names: ["arrow-right", "arrowright", "arrow--right", "arrow_forward", "east", "arrow-forward"] },
  { key: "chevron-down", names: ["chevron-down", "chevrondown", "chevron--down", "caret-down", "expand_more", "keyboard_arrow_down", "down"] },
  { key: "settings", names: ["settings", "gear", "cog", "setting", "adjustments-horizontal", "sliders", "gear-16"] },
  { key: "bell", names: ["bell", "notification", "notifications", "alarm"] },
  { key: "user", names: ["user", "person", "account", "profile", "user-profile"] },
  { key: "folder", names: ["folder", "file-directory", "directory"] },
  { key: "code", names: ["code", "code-bracket", "xml"] },
];

function matchPathForAliases(files, pathPattern, aliases, { stripCategoryPrefix = false } = {}) {
  const normalized = files.filter((f) => pathPattern.test(f));
  for (const a of aliases) {
    const exactBase = a.toLowerCase();
    const found = normalized.find((f) => {
      let base = path.posix.basename(f, ".svg").toLowerCase()
        .replace(/_(?:20|24)_(?:regular|filled)$/, "")
        .replace(/-(?:16|20|24)$/, "")
        .replace(/-(?:bold|regular|fill|line|outline)$/, "")
        .replace(/icon$/, "");
      if (stripCategoryPrefix) base = base.replace(/^(?:action|navigation|category|communication|messaging|misc|form|file)-/, "");
      const kebab = base.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").toLowerCase();
      return base === exactBase || kebab === exactBase || base === exactBase.replace(/-/g, "");
    });
    if (found) return found;
  }
  return null;
}

function normalizeSvgColors(body) {
  return body
    .replace(/\s*<path\b[^>]*\bd=["']M0 0h24v24H0z["'][^>]*\/?>/gi, "")
    .replace(/\b(stroke|fill)=["'](?:#000(?:000)?|black|#1[0-9a-f]{5}|currentColor)["']/gi, '$1="currentColor"');
}

function parseSvgMarkup(raw, realName) {
  const head = /<svg\b([^>]*)>([\s\S]*?)<\/svg>/i.exec(raw);
  if (!head) return null;
  const attrs = head[1];
  const body = sanitizePrimitives(normalizeSvgColors(head[2]), { maxElements: 20, maxLength: 1600 });
  if (!body) return null;

  const vb = /viewBox\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1]?.trim() || "0 0 24 24";
  const vbParts = vb.split(/\s+/).map(Number);
  const grid = vbParts.length >= 4 && Number.isFinite(vbParts[2]) ? Math.round(vbParts[2]) : 24;

  // Preserve the exact root painting contract so solid, outline, and child-stroked SVGs never double-stroke.
  const rootFill = /\bfill\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1]?.trim() || "currentColor";
  const rootHasStroke = /\bstroke\s*=\s*["']currentColor["']/i.test(attrs);
  const sw = Number(/\bstroke-width\s*=\s*["']?(\d+(?:\.\d+)?)/i.exec(attrs)?.[1] || 0);
  const lc = /\bstroke-linecap\s*=\s*["']?(round|square|butt)/i.exec(attrs)?.[1]?.toLowerCase() || null;
  const lj = /\bstroke-linejoin\s*=\s*["']?(round|miter|bevel)/i.exec(attrs)?.[1]?.toLowerCase() || null;

  return {
    name: realName,
    viewBox: vb,
    grid,
    fill: rootFill === "none" ? "none" : "currentColor",
    ...(rootHasStroke ? { stroke: true } : {}),
    ...(rootHasStroke && sw ? { strokeWidth: sw } : {}),
    ...(rootHasStroke && lc ? { strokeLinecap: lc } : {}),
    ...(rootHasStroke && lj ? { strokeLinejoin: lj } : {}),
    body,
  };
}

const NPM_PACKS = [
  { id: "lucide", pkg: "lucide-static", pat: /^\/icons\/[^/]+\.svg$/i },
  { id: "octicons", pkg: "@primer/octicons", pat: /^\/build\/svg\/[^/]+-16\.svg$/i },
  { id: "carbon", pkg: "@carbon/icons", pat: /^\/svg\/32\/[^/]+\.svg$/i, displayGrid: 16 },
  { id: "bootstrap", pkg: "bootstrap-icons", pat: /^\/icons\/[^/]+\.svg$/i },
  { id: "heroicons", pkg: "heroicons", pat: /^\/24\/outline\/[^/]+\.svg$/i },
  { id: "tabler", pkg: "@tabler/icons", pat: /^\/icons\/outline\/[^/]+\.svg$/i },
  { id: "phosphor", pkg: "@phosphor-icons/core", pat: /^\/assets\/regular\/[^/]+\.svg$/i, displayGrid: 24 },
  { id: "polaris", pkg: "@shopify/polaris-icons", pat: /^\/dist\/svg\/[^/]+Icon\.svg$/i },
  { id: "fluent", pkg: "@fluentui/svg-icons", pat: /^\/icons\/[^/]+_20_regular\.svg$/i },
  { id: "material", pkg: "@material-design-icons/svg", pat: /^\/outlined\/[^/]+\.svg$/i },
  { id: "flight", pkg: "@hashicorp/flight-icons", pat: /^\/svg\/[^/]+-16\.svg$/i },
  { id: "gitlab", pkg: "@gitlab/svgs", pat: /^\/dist\/sprite_icons\/[^/]+\.svg$/i },
  { id: "stacks", pkg: "@stackoverflow/stacks-icons", pat: /^\/dist\/lib\/Icon\/[^/]+\.svg$/i },
  { id: "flowbite", pkg: "flowbite-icons", pat: /^\/src\/outline\/.+\.svg$/i },
  { id: "antd", pkg: "@ant-design/icons-svg", pat: /^\/inline-svg\/outlined\/[^/]+\.svg$/i, displayGrid: 16 },
  { id: "feather", pkg: "feather-icons", pat: /^\/dist\/icons\/[^/]+\.svg$/i },
  { id: "grommet", pkg: "grommet-icons", pat: /^\/img\/[^/]+\.svg$/i },
  { id: "duet", pkg: "@duetds/icons", pat: /^\/lib\/assets\/[^/]+\.svg$/i, stripCategoryPrefix: true },
  { id: "siemens", pkg: "@siemens/ix-icons", pat: /^\/dist\/ix-icons\/svg\/[^/]+\.svg$/i, displayGrid: 24 },
  { id: "vitamin", pkg: "@vtmn/icons", pat: /^\/dist\/vitamix\/svg\/[^/]+-line\.svg$/i },
  { id: "dhis2", pkg: "@dhis2/ui-icons", pat: /^\/build\/cjs\/svg\/[^/]+-24\.svg$/i },
];

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(10000) });
  if (!res.ok) return null;
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(8000) });
  if (!res.ok) return null;
  return res.text();
}

async function buildNpmPack(spec) {
  const meta = await fetchJson(`https://registry.npmjs.org/${encodeURIComponent(spec.pkg)}/latest`);
  if (!meta?.version) return null;
  const flat = await fetchJson(`https://data.jsdelivr.com/v1/package/npm/${spec.pkg}@${meta.version}/flat`);
  const files = (flat?.files || []).map((f) => f.name);
  if (!files.length) return null;

  const glyphs = [];
  await Promise.all(
    SLOTS.map(async (slot, idx) => {
      const chosen = matchPathForAliases(files, spec.pat, slot.names, { stripCategoryPrefix: Boolean(spec.stripCategoryPrefix) });
      if (!chosen) return;
      const svgText = await fetchText(`https://cdn.jsdelivr.net/npm/${spec.pkg}@${meta.version}${chosen}`).catch(() => null);
      if (!svgText) return;
      const rawName = path.posix.basename(chosen, ".svg");
      const parsed = parseSvgMarkup(svgText, rawName);
      if (parsed) glyphs[idx] = { slot: slot.key, ...parsed };
    })
  );
  const compact = glyphs.filter(Boolean);
  if (compact.length < 4) return null;
  const grid = spec.displayGrid || compact[0].grid || 24;
  return { package: spec.pkg, version: meta.version, grid, glyphs: compact };
}

async function buildBlueprintPack() {
  const meta = await fetchJson(`https://registry.npmjs.org/${encodeURIComponent("@blueprintjs/icons")}/latest`);
  if (!meta?.version) return null;
  const bpMap = [
    ["home", "home"], ["search", "search"], ["plus", "plus"], ["check", "tick"],
    ["close", "cross"], ["arrow-right", "arrow-right"], ["chevron-down", "chevron-down"],
    ["settings", "cog"], ["bell", "notifications"], ["user", "person"], ["folder", "folder-close"], ["code", "code"],
  ];
  const glyphs = [];
  await Promise.all(
    bpMap.map(async ([slotKey, bpName], idx) => {
      const code = await fetchText(`https://cdn.jsdelivr.net/npm/@blueprintjs/icons@${meta.version}/lib/esm/generated/16px/paths/${bpName}.js`).catch(() => null);
      if (!code) return;
      const ds = [...code.matchAll(/"(M[^"]{10,})"/g)].map((m) => `<path d="${m[1]}"/>`);
      if (!ds.length) return;
      glyphs[idx] = { slot: slotKey, name: bpName, viewBox: "0 0 16 16", fill: "currentColor", body: ds.join("") };
    })
  );
  const compact = glyphs.filter(Boolean);
  return compact.length >= 4 ? { package: "@blueprintjs/icons", version: meta.version, grid: 16, glyphs: compact } : null;
}

async function buildRadixPack() {
  const radixMap = [
    ["home", "home"], ["search", "magnifying-glass"], ["plus", "plus"], ["check", "check"],
    ["close", "cross-2"], ["arrow-right", "arrow-right"], ["chevron-down", "chevron-down"],
    ["settings", "gear"], ["bell", "bell"], ["user", "person"], ["folder", "file"], ["code", "code"],
  ];
  const glyphs = [];
  await Promise.all(
    radixMap.map(async ([slotKey, rxName], idx) => {
      const svgText = await fetchText(`https://raw.githubusercontent.com/radix-ui/icons/main/packages/radix-icons/icons/${rxName}.svg`).catch(() => null);
      if (!svgText) return;
      const parsed = parseSvgMarkup(svgText, rxName);
      if (parsed) glyphs[idx] = { slot: slotKey, ...parsed };
    })
  );
  const compact = glyphs.filter(Boolean);
  return compact.length >= 4 ? { package: "@radix-ui/react-icons", version: "github:radix-ui/icons", grid: 15, glyphs: compact } : null;
}

async function main() {
  const packs = {};
  const BATCH = 6;
  for (let i = 0; i < NPM_PACKS.length; i += BATCH) {
    const slice = NPM_PACKS.slice(i, i + BATCH);
    await Promise.all(
      slice.map(async (spec) => {
        const res = await buildNpmPack(spec).catch(() => null);
        if (res) {
          packs[spec.id] = res;
          console.log(`+ ${spec.id.padEnd(12)} (${res.package}@${res.version}) -> ${res.glyphs.length}/12 glyphs (${res.grid}px)`);
        } else {
          console.log(`- ${spec.id.padEnd(12)} skipped/failed`);
        }
      })
    );
  }
  const [bp, rx] = await Promise.all([buildBlueprintPack().catch(() => null), buildRadixPack().catch(() => null)]);
  if (bp) {
    packs.blueprint = bp;
    console.log(`+ ${"blueprint".padEnd(12)} (${bp.package}@${bp.version}) -> ${bp.glyphs.length}/12 glyphs`);
  }
  if (rx) {
    packs.radix = rx;
    console.log(`+ ${"radix".padEnd(12)} (${rx.package}) -> ${rx.glyphs.length}/12 glyphs`);
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(packs, null, 2) + "\n", "utf8");
  const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
  console.log(`Wrote ${Object.keys(packs).length} verified official icon packs to data/icon-packs.json (${kb} KB).`);
}

main();

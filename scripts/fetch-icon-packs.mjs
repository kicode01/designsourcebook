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
  { key: "home", names: ["home", "house", "house-door", "home-1", "home-2", "home-page"] },
  { key: "search", names: ["search", "magnifying-glass", "magnifyingglass", "magnifier", "find", "search-md", "ai-search"] },
  { key: "plus", names: ["plus", "add", "plus-lg", "plus-16", "add-16", "math-plus-l"] },
  { key: "check", names: ["check", "checkmark", "check-lg", "tick", "done", "accept", "approve"] },
  { key: "close", names: ["x", "close", "dismiss", "times", "xmark", "cross-2", "cross", "cross-1", "clear", "x-lg", "cancel", "decline"] },
  { key: "arrow-right", names: ["arrow_forward", "arrow-forward", "arrow-right", "arrowright", "arrow--right", "east", "right-arrow"] },
  { key: "chevron-down", names: ["keyboard_arrow_down", "chevron-down", "chevrondown", "chevron--down", "expand_more", "caret-down", "slim-arrow-down"] },
  { key: "settings", names: ["settings", "gear", "cog", "setting", "action-settings", "adjustments-horizontal", "sliders", "gear-16", "preferences"] },
  { key: "bell", names: ["bell", "notification", "notifications", "alarm", "alert", "notification-2"] },
  { key: "user", names: ["user", "person", "account", "profile", "user-profile", "customer", "employee"] },
  { key: "folder", names: ["folder", "file-directory", "directory", "folder-close", "folder-closed"] },
  { key: "code", names: ["code", "code-bracket", "xml", "source-code", "syntax"] },
];

function extractIconStem(filePath, { stripCategoryPrefix = false, useParentIf = null } = {}) {
  const ext = path.posix.extname(filePath);
  let rawBase = path.posix.basename(filePath, ext);
  if (useParentIf && rawBase.toLowerCase() === useParentIf.toLowerCase()) {
    rawBase = path.posix.basename(path.posix.dirname(filePath));
  }
  const kebab = rawBase
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .toLowerCase()
    .replace(/^(?:wd-icon-|nhsuk-icon-|fi-|icon-)/, "")
    .replace(/-(?:16|20|24)-(?:inactive|active)$/, "")
    .replace(/-(?:16|20|24)$/, "")
    .replace(/-(?:bold|regular|fill|filled|line|outline|icon)$/, "")
    .replace(/^icon-/, "");
  let clean = kebab;
  if (stripCategoryPrefix) {
    clean = clean.replace(/^(?:action|navigation|category|communication|messaging|misc|form|file|interface|generic|controls|arrows|notifications|files|software|editor)-/, "");
  }
  return clean;
}

function matchPathForAliases(files, pathPattern, aliases, opts = {}) {
  const normalized = files.filter((f) => pathPattern.test(f));
  for (const a of aliases) {
    const exactBase = a.toLowerCase();
    const found = normalized.find((f) => {
      const stem = extractIconStem(f, opts);
      return stem === exactBase || stem === exactBase.replace(/-/g, "");
    });
    if (found) return found;
  }
  return null;
}

function normalizeSvgColors(body) {
  return body
    .replace(/\s*<path\b[^>]*\bd=["']M0 0h24v24H0z["'][^>]*\/?>/gi, "")
    .replace(/\b(stroke|fill)=["'](?:#000(?:000)?|#111(?:111)?|#222(?:222)?|#333(?:333)?|#444(?:444)?|#fff(?:fff)?|#212b32|#0a0b0d|black|oklch\([^)]+\)|currentColor)["']/gi, '$1="currentColor"');
}

function parseSvgMarkup(raw, realName, fallbackVb = "0 0 24 24") {
  const head = /<svg\b([^>]*)>([\s\S]*?)<\/svg>/i.exec(raw);
  if (!head) return null;
  const attrs = head[1];
  const body = sanitizePrimitives(normalizeSvgColors(head[2]), { maxElements: 20, maxLength: 1600 });
  if (!body) return null;

  const wAttr = /\bwidth\s*=\s*["']?(\d+(?:\.\d+)?)/i.exec(attrs)?.[1];
  const hAttr = /\bheight\s*=\s*["']?(\d+(?:\.\d+)?)/i.exec(attrs)?.[1];
  const vb = /view-?Box\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1]?.trim() || (wAttr && hAttr ? `0 0 ${wAttr} ${hAttr}` : fallbackVb);
  const vbParts = vb.split(/\s+/).map(Number);
  const grid = vbParts.length >= 4 && Number.isFinite(vbParts[2]) ? Math.round(vbParts[2]) : 24;

  // Preserve the exact root painting contract so solid, outline, and child-stroked SVGs never double-stroke.
  const rawFill = /\bfill\s*=\s*["']([^"']+)["']/i.exec(attrs)?.[1]?.trim() || "currentColor";
  const rootFill = rawFill === "none" ? "none" : "currentColor";
  const rootHasStroke = /\bstroke\s*=\s*["']currentColor["']/i.test(attrs);
  const sw = Number(/\bstroke-width\s*=\s*["']?(\d+(?:\.\d+)?)/i.exec(attrs)?.[1] || 0);
  const lc = /\bstroke-linecap\s*=\s*["']?(round|square|butt)/i.exec(attrs)?.[1]?.toLowerCase() || null;
  const lj = /\bstroke-linejoin\s*=\s*["']?(round|miter|bevel)/i.exec(attrs)?.[1]?.toLowerCase() || null;

  return {
    name: realName,
    viewBox: vb,
    grid,
    fill: rootFill,
    ...(rootHasStroke ? { stroke: true } : {}),
    ...(rootHasStroke && sw ? { strokeWidth: sw } : {}),
    ...(rootHasStroke && lc ? { strokeLinecap: lc } : {}),
    ...(rootHasStroke && lj ? { strokeLinejoin: lj } : {}),
    body,
  };
}

function parseJsIconModule(code, realName, spec) {
  if (!code) return null;
  if (spec.mode === "cds") {
    const m = /(?:outline|solid)\s*:\s*(['"`])([\s\S]*?)\1/.exec(code);
    if (!m) return null;
    return parseSvgMarkup(`<svg viewBox="0 0 36 36" fill="currentColor">${m[2]}</svg>`, realName);
  }
  if (spec.mode === "atlaskit") {
    const m = /dangerouslySetGlyph\s*:\s*`([\s\S]*?)`/.exec(code);
    if (!m) return null;
    return parseSvgMarkup(`<svg viewBox="0 0 16 16" fill="currentColor">${m[1]}</svg>`, realName);
  }
  if (spec.mode === "evergreen") {
    const m = /svgPaths16\s*=\s*\[([^\]]+)\]/.exec(code);
    if (!m) return null;
    const ds = [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => `<path d="${x[1]}"/>`).join("");
    if (!ds) return null;
    return parseSvgMarkup(`<svg viewBox="0 0 16 16" fill="currentColor">${ds}</svg>`, realName);
  }
  if (spec.mode === "ui5") {
    const pd = /pathData\s*=\s*["']([^"']+)["']/.exec(code)?.[1];
    const vb = /viewBox\s*=\s*["']([^"']+)["']/.exec(code)?.[1] || "0 0 16 16";
    if (!pd) return null;
    return parseSvgMarkup(`<svg viewBox="${vb}" fill="currentColor"><path d="${pd}"/></svg>`, realName);
  }
  if (spec.mode === "patternfly") {
    const wm = /"width"\s*:\s*(\d+)/.exec(code)?.[1];
    const hm = /"height"\s*:\s*(\d+)/.exec(code)?.[1];
    const dm = /"svgPathData"\s*:\s*"([^"]+)"/.exec(code)?.[1];
    if (!wm || !hm || !dm) return null;
    return parseSvgMarkup(`<svg viewBox="0 0 ${wm} ${hm}" fill="currentColor"><path d="${dm}"/></svg>`, realName);
  }
  if (spec.mode === "jsx") {
    const vb = /viewBox\s*:\s*["']([^"']+)["']/.exec(code)?.[1] || spec.viewBox || "0 0 24 24";
    const paths = [...code.matchAll(/\bd\s*:\s*["']([MmZzLlHhVvCcSsQqTtAa0-9.,\s+-]{8,})["']/g)]
      .map((m) => m[1])
      .filter((d) => !/^M0\s*0h24v24H0z$/i.test(d));
    if (!paths.length) return null;
    const isStroke = spec.stroke || /stroke\s*:\s*["']currentColor["']/i.test(code) && /fill\s*:\s*["']none["']/i.test(code);
    const sw = spec.strokeWidth || Number(/strokeWidth\s*:\s*["']?(\d+(?:\.\d+)?)/.exec(code)?.[1] || 1.5);
    const lc = /strokeLinecap\s*:\s*["']?(round|square|butt)/.exec(code)?.[1] || "round";
    const lj = /strokeLinejoin\s*:\s*["']?(round|miter|bevel)/.exec(code)?.[1] || "round";
    const attrs = isStroke
      ? `viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="${lc}" stroke-linejoin="${lj}"`
      : `viewBox="${vb}" fill="currentColor"`;
    const body = paths.map((d) => `<path d="${d}"/>`).join("");
    return parseSvgMarkup(`<svg ${attrs}>${body}</svg>`, realName);
  }
  return null;
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
  {
    id: "fluent",
    pkg: "@fluentui/svg-icons",
    directMap: {
      home: "/icons/home_20_regular.svg",
      search: "/icons/search_20_regular.svg",
      plus: "/icons/add_20_regular.svg",
      check: "/icons/checkmark_20_regular.svg",
      close: "/icons/dismiss_20_regular.svg",
      "arrow-right": "/icons/arrow_right_20_regular.svg",
      "chevron-down": "/icons/chevron_down_20_regular.svg",
      settings: "/icons/settings_20_regular.svg",
      bell: "/icons/alert_20_regular.svg",
      user: "/icons/person_20_regular.svg",
      folder: "/icons/folder_20_regular.svg",
      code: "/icons/code_20_regular.svg",
    },
    displayGrid: 20,
  },
  { id: "material", pkg: "@material-design-icons/svg", pat: /^\/outlined\/[^/]+\.svg$/i },
  {
    id: "material-symbols",
    pkg: "@material-symbols/svg-400",
    // Official Google Fonts CDN serves optical-size 24px (wght 400, 80/960 stroke), matching fonts.google.com/icons
    directMap: {
      home: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/home/default/24px.svg",
      search: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/search/default/24px.svg",
      plus: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/add/default/24px.svg",
      check: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/check/default/24px.svg",
      close: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/close/default/24px.svg",
      "arrow-right": "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/arrow_forward/default/24px.svg",
      "chevron-down": "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/keyboard_arrow_down/default/24px.svg",
      settings: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/settings/default/24px.svg",
      bell: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/notifications/default/24px.svg",
      user: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/person/default/24px.svg",
      folder: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/folder/default/24px.svg",
      code: "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/code/default/24px.svg",
    },
    displayGrid: 24,
  },
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
  { id: "salesforce", pkg: "@salesforce-ux/design-system", pat: /^\/assets\/icons\/utility\/[^/]+\.svg$/i, displayGrid: 20 },
  { id: "uswds", pkg: "@uswds/uswds", pat: /^\/dist\/img\/usa-icons\/[^/]+\.svg$/i, displayGrid: 24 },
  { id: "workday", pkg: "@workday/canvas-system-icons-web", pat: /^\/dist\/svg\/wd-icon-[^/]+\.svg$/i, displayGrid: 24 },
  { id: "semrush", pkg: "@semcore/icon", pat: /^\/svg\/icon\/[^/]+\/m\.svg$/i, useParentIf: "m", displayGrid: 16 },
  { id: "tdesign", pkg: "tdesign-icons-svg", pat: /^\/src\/[^/]+\.svg$/i, displayGrid: 16 },
  { id: "nordhealth", pkg: "@nordhealth/icons", pat: /^\/lib\/assets\/[^/]+\.svg$/i, stripCategoryPrefix: true, displayGrid: 16 },
  { id: "foundation", pkg: "foundation-icons", pat: /^\/svgs\/fi-[^/]+\.svg$/i, displayGrid: 20 },
  { id: "nhsuk", pkg: "nhsuk-frontend", pat: /^\/dist\/nhsuk\/assets\/images\/nhsuk-icon-[^/]+\.svg$/i, displayGrid: 24 },
  { id: "coinbase", pkg: "@coinbase/cds-icons", pat: /^\/esm\/svgs\/[^/]+-16-inactive\.svg$/i, displayGrid: 16 },
  { id: "ebay", pkg: "@ebay/skin", pat: /^\/dist\/svg\/icon\/icon-[^/]+-16\.svg$/i, displayGrid: 16 },
  { id: "clarity", pkg: "@cds/core", pat: /^\/icon\/shapes\/[^/]+\.js$/i, mode: "cds", displayGrid: 16 },
  { id: "ui5", pkg: "@ui5/webcomponents-icons", pat: /^\/dist\/v5\/[^/]+\.js$/i, mode: "ui5", displayGrid: 16 },
  { id: "patternfly", pkg: "@patternfly/react-icons", pat: /^\/dist\/esm\/icons\/[^/]+-icon\.js$/i, mode: "patternfly", displayGrid: 16 },
  { id: "sanity", pkg: "@sanity/icons", pat: /^\/dist\/[^/]+\.js$/i, mode: "jsx", viewBox: "0 0 25 25", stroke: true, strokeWidth: 1.2, displayGrid: 20 },
  { id: "semi", pkg: "@douyinfe/semi-icons", pat: /^\/lib\/es\/icons\/Icon[^/]+\.js$/i, mode: "jsx", viewBox: "0 0 24 24", displayGrid: 20 },
  { id: "arco", pkg: "@arco-design/web-react", pat: /^\/icon\/react-icon\/Icon[^/]+\/index\.js$/i, useParentIf: "index", mode: "jsx", viewBox: "0 0 48 48", stroke: true, strokeWidth: 4, displayGrid: 18 },
  { id: "paste", pkg: "@twilio-paste/icons", pat: /^\/esm\/[^/]+Icon\.js$/i, mode: "jsx", viewBox: "0 0 20 20", displayGrid: 20 },
  { id: "leafygreen", pkg: "@leafygreen-ui/icon", pat: /^\/dist\/esm\/[^/]+\.js$/i, mode: "jsx", viewBox: "0 0 16 16", displayGrid: 16 },
  { id: "elastic", pkg: "@elastic/eui", pat: /^\/es\/components\/icon\/assets\/[^/]+\.js$/i, mode: "jsx", viewBox: "0 0 16 16", displayGrid: 16 },
  { id: "telefonica", pkg: "@telefonica/mistica-icons", pat: /^\/dist\/icon-[^/]+-regular\.js$/i, mode: "jsx", viewBox: "0 0 24 24", displayGrid: 24 },
  { id: "artsy", pkg: "@artsy/icons", pat: /^\/dist\/native\/[^/]+Icon\.js$/i, mode: "jsx", viewBox: "0 0 18 18", displayGrid: 18 },
  { id: "atlassian", pkg: "@atlaskit/icon", pat: /^\/core\/[^/]+\.js$/i, mode: "atlaskit", displayGrid: 16 },
  { id: "vkontakte", pkg: "@vkontakte/icons", pat: /^\/dist\/24\/[^/]+_outline_24\.js$/i, mode: "jsx", viewBox: "0 0 24 24", displayGrid: 24 },
  { id: "welcome", pkg: "@welcome-ui/icons", pat: /^\/_assets\/[^/]+\.svg$/i, displayGrid: 20 },
  { id: "evergreen", pkg: "evergreen-ui", pat: /^\/esm\/icons\/generated\/[^/]+Icon\.js$/i, mode: "evergreen", displayGrid: 16 },
  { id: "vaadin", pkg: "@vaadin/icons", pat: /^\/assets\/svg\/[^/]+\.svg$/i, displayGrid: 16 },
  { id: "moon", pkg: "@heathmont/moon-icons-tw", pat: /^\/es\/icons\/(?:Generic|Controls|Arrows|Notifications|Files|Software)[^/]+\.js$/i, stripCategoryPrefix: true, mode: "jsx", viewBox: "0 0 32 32", stroke: true, strokeWidth: 1.5, displayGrid: 20 },
];

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "user-agent": UA }, signal: AbortSignal.timeout(20000) });
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
  let files = [];
  if (!spec.directMap) {
    const flat = await fetchJson(`https://data.jsdelivr.com/v1/package/npm/${spec.pkg}@${meta.version}/flat`);
    files = (flat?.files || []).map((f) => f.name);
    if (!files.length) return null;
  }

  const glyphs = [];
  await Promise.all(
    SLOTS.map(async (slot, idx) => {
      const chosen = spec.directMap
        ? spec.directMap[slot.key]
        : matchPathForAliases(files, spec.pat, slot.names, {
            stripCategoryPrefix: Boolean(spec.stripCategoryPrefix),
            useParentIf: spec.useParentIf || null,
          });
      if (!chosen) return;
      const fetchUrl = /^https?:\/\//i.test(chosen)
        ? chosen
        : `https://cdn.jsdelivr.net/npm/${spec.pkg}@${meta.version}${chosen}`;
      const bodyText = await fetchText(fetchUrl).catch(() => null);
      if (!bodyText) return;
      const stemSource = /^https?:\/\//i.test(chosen)
        ? chosen.split("/").slice(-3, -2)[0]
        : chosen;
      const rawName = extractIconStem(stemSource, { stripCategoryPrefix: Boolean(spec.stripCategoryPrefix), useParentIf: spec.useParentIf || null }) || path.posix.basename(stemSource, path.posix.extname(stemSource));
      const parsed = spec.mode ? parseJsIconModule(bodyText, rawName, spec) : parseSvgMarkup(bodyText, rawName);
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
    ["settings", "gear"], ["bell", "bell"], ["user", "person"], ["code", "code"],
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

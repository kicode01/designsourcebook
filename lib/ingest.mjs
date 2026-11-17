// Shared ingestion core: turn a directory of token files into a registry entry.
//
// Two drivers feed this — an npm tarball and a git clone — because the harvest
// problem is identical once the files are on disk. Keeping it in one place means
// a rule that fixes one source fixes both.

import fs from "node:fs";
import path from "node:path";
import { buildFrontMatter } from "./fm.mjs";
import { lint } from "./lint.mjs";
import { emitDtcg } from "./emit.mjs";
import { buildPreview, themeOfCanvas, isOpaque } from "./preview.mjs";
import { parseColor, saturation, relativeLuminance } from "./color.mjs";
import { extractCssComponents } from "./css-components.mjs";
import { normOrg } from "./registry.mjs";
import { detectIconFromPackageJson, inspectSvgSnippets } from "./icons.mjs";

export const COLOR_RE = /^(#[0-9a-f]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))$/i;
export const MAX_COLORS = 90;

const GENERIC = new Set([
  "value", "$value", "sets", "desktop", "mobile", "tablet", "theme", "themes", "global",
  "$type", "$extensions", "$description", "name", "var", "uuid", "description", "attributes",
  "light", "dark", "onlight", "ondark", "default", "base", "mode",
]);

export function prettify(raw) {
  const s = String(raw)
    .replace(/^--/, "")
    .replace(/--/g, "-")
    .replace(/^\$/, "")
    .replace(/^(pf|cds|fluent|slds|usa|govuk|primer|p|ds|t)-/i, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s.slice(0, 52);
}

export function isColor(v) {
  // `${opacity}` and other template placeholders are not colours — harvesting
  // them produces broken token references that fail lint downstream.
  if (typeof v !== "string" || /[${}]/.test(v)) return false;
  const t = v.trim();
  return COLOR_RE.test(t) && parseColor(t) !== null;
}

export function cleanFontSize(raw) {
  if (typeof raw !== "string") return null;
  let s = raw.replace(/\s*!(?:default|global|important)\s*$/i, "").replace(/\s+/g, " ").trim();
  if (!s || /[\r\n;{}()$`\\]/.test(s) && !/^clamp\([^)]+\)$|^rem\(\s*\d+(?:\.\d+)?px\s*\)$/i.test(s)) return null;
  const remFn = /^rem\(\s*(\d+(?:\.\d+)?)px\s*\)$/i.exec(s);
  if (remFn) {
    const px = Number(remFn[1]);
    return px > 0 ? `${parseFloat((px / 16).toFixed(4))}rem` : null;
  }
  if (/^\.?[0-9]+(?:\.[0-9]+)?(?:px|rem|em|pt|%)$/i.test(s)) {
    return parseFloat(s) > 0 ? s : null;
  }
  if (/^clamp\([^${};]+\)$/i.test(s) && !/\bvar\(/i.test(s)) return s;
  return null;
}

export function cleanFontFamily(raw) {
  if (typeof raw !== "string") return null;
  let s = raw
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\\(["'])/g, "$1")
    .replace(/\s*!(?:default|global|important)\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!s || s.length > 200) return null;
  if (/^(inherit|initial|unset|revert|none|normal|auto|fallback|swap|optional|block|null|false|true|undefined|\d+(?:\.\d+)?(?:px|rem|em|%)?)$/i.test(s)) return null;
  if (/[${};\\]|(?:var|theme|calc|clamp|url|local)\s*\(/i.test(s)) return null;
  if (/(?:^|[\s,"'])(?:[a-z0-9_-]*icons?|fontawesome|material-icons|octicons|codicons|glyphs?)(?:$|[\s,"'])/i.test(s)) return null;
  if ((s.startsWith('"') && s.endsWith('"') && s.indexOf('"', 1) === s.length - 1) ||
      (s.startsWith("'") && s.endsWith("'") && s.indexOf("'", 1) === s.length - 1)) {
    s = s.slice(1, -1).trim();
  }
  const parts = s
    .split(",")
    .map((p) => p.trim().replace(/^['"]+|['"]+$/g, "").trim())
    .filter((p) => p && !/^\d+$/.test(p));
  if (!parts.length) return null;
  return parts
    .map((p) => (/^[a-z0-9-]+$/i.test(p) ? p : `"${p}"`))
    .join(", ");
}

export function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Documentation, examples, fixtures and demo apps carry invented values —
      // #ff0000 assigned to "text-red" is a placeholder, not a design token.
      // `syntax` holds code-highlighting themes, which are editor chrome.
      if (/^(node_modules|\.git|coverage|__tests__|__mocks__|test|tests|vendor|docs|doc|website|showcase|demo|demos|examples?|playground|stories|\.storybook|fixtures|e2e|cypress|syntax|sandbox)$/.test(entry.name)) continue;
      walk(full, acc);
    } else {
      acc.push(full);
    }
  }
  return acc;
}

export function scoreFile(rel) {
  let s = 0;
  if (/token/i.test(rel)) s += 4;
  if (/typo|font/i.test(rel)) s += 3;
  if (/theme/i.test(rel)) s += 2;
  if (/colou?r|palette/i.test(rel)) s += 2;
  if (/primitive|semantic|global|core|variable/i.test(rel)) s += 1;
  if (/test|spec|fixture|example|demo|storybook|mock|sample|__/i.test(rel)) s -= 6;
  if (/\.d\.ts$/.test(rel)) s -= 8;
  return s;
}

// ---------------------------------------------------------------- harvest

const FONT_KEY_RE =
  /(?:^|-|_)(?:font(?:-|_)*(?:family|families|sans|serif|mono|monospace|display|brand|code|stack|base|body|heading|headline)|typeface)(?:-|_|$)/i;
const FONT_NON_FAMILY_RE = /(?:size|weight|style|line|height|spacing|tracking|scale|feature|variant|axes|optical|stretch|synthesis)/i;

const REAL_FONT_VALUE_RE =
  /(?:,|\b(?:sans-serif|serif|monospace|system-ui|ui-sans-serif|ui-serif|ui-monospace|-apple-system|BlinkMacSystemFont|Segoe|Roboto|Inter|Arial|Helvetica|Menlo|Consolas|Courier|Ubuntu|Open Sans|Lato|Source|Noto|Fira|IBM|Plex|Public Sans|RedHat|Red Hat|Overpass|Gotham|Proxima|Circular|Avenir|Futura|Verdana|Tahoma|Georgia|Times|Calibri|Cambria|Optima|Palatino|Baskerville|Garamond|Trebuchet|Lucida|SF Pro|SF Mono|PingFang|Hiragino|Microsoft|Meiryo|Malgun|Plus Jakarta|DM Sans|DM Mono|Work Sans|Nunito|Poppins|Rubik|Montserrat|Raleway|Oswald|Merriweather|Lora|Playfair|Titillium|Cabin|Barlow|Mulish|Karla|Manrope|Outfit|Figtree|Geist|JetBrains|Space Grotesk|Space Mono|Chakra|Atkinson|Lexend|Sora|Mona|Hubot|Cal Sans|Satoshi|Roobert|Sohne|Diatype|Matter|Walsheim|Aeonik|Graphik|Metric|Frutiger|Transport|Ember|Clean|Charlie|Shopify|Oracle|Scania|Nordhealth|Mistral|Anthropic|Coinbase|Spotify|Uber|Airbnb|Netflix|Stripe|Linear|Vercel)\b)/i;

const JS_FONT_KEY_RE =
  /(?:^(?:sans|sansSerif|sans-serif|serif|mono|monospace)$|(?:^|[-_])(?:font[-_]*(?:family|families|sans|serif|mono|monospace|display|brand|code|stack|base|body|heading|headline)|typeface)(?:[-_]|$)|(?:font(?:Family|Families|Sans|Serif|Mono|Monospace|Display|Brand|Code|Stack|Base|Body|Heading|Headline)|typeface|FontFamily|FontSans|FontMono|FontSerif|FontStack))/;

function isPlausibleFontFamily(raw) {
  const cf = cleanFontFamily(raw);
  if (!cf) return null;
  if (!REAL_FONT_VALUE_RE.test(cf) && !/^[A-Z][a-zA-Z0-9]+(?:\s+[A-Z][a-zA-Z0-9]+)+$/.test(cf.replace(/["']/g, ""))) {
    return null;
  }
  return cf;
}

function harvestJson(node, hint, colors, types, depth = 0) {
  if (depth > 14 || node === null || typeof node !== "object") return;

  if (Array.isArray(node)) {
    node.forEach((v) => harvestJson(v, hint, colors, types, depth + 1));
    return;
  }

  const rawLeaf =
    typeof node.$value === "string"
      ? node.$value
      : typeof node.value === "string"
      ? node.value
      : Array.isArray(node.$value) && node.$value.every((x) => typeof x === "string")
      ? node.$value.join(", ")
      : Array.isArray(node.value) && node.value.every((x) => typeof x === "string")
      ? node.value.join(", ")
      : null;

  if (rawLeaf !== null) {
    const name = prettify(hint);
    if (name && !/^(metadata|meta|id|version)$/.test(name)) {
      if ((node.$type === "color" || !node.$type) && isColor(rawLeaf) && !colors[name]) {
        colors[name] = rawLeaf.trim();
      }
      if (
        node.$type === "fontFamily" ||
        node.$type === "font-family" ||
        (FONT_KEY_RE.test(hint) && !FONT_NON_FAMILY_RE.test(hint) && !isColor(rawLeaf))
      ) {
        const cf = node.$type ? cleanFontFamily(rawLeaf) : isPlausibleFontFamily(rawLeaf);
        if (cf) types[name] = { ...(types[name] || {}), fontFamily: cf };
      }
      if ((node.$type === "dimension" || !node.$type) && /font-?size/i.test(hint)) {
        const cs = cleanFontSize(rawLeaf);
        if (cs) types[name] = { ...(types[name] || {}), fontSize: cs };
      }
    }
  }

  if (node.$type === "typography" && node.$value && typeof node.$value === "object") {
    const name = prettify(hint);
    const v = node.$value;
    if (name) {
      const t = {};
      const rawFam = Array.isArray(v.fontFamily) ? v.fontFamily.join(", ") : v.fontFamily;
      const cf = typeof rawFam === "string" ? cleanFontFamily(rawFam) : null;
      if (cf) t.fontFamily = cf;
      const rawSize =
        typeof v.fontSize === "object" && v.fontSize ? `${v.fontSize.value}${v.fontSize.unit || "px"}` : v.fontSize;
      const cs = typeof rawSize === "string" ? cleanFontSize(rawSize) : typeof rawSize === "number" && rawSize > 0 ? `${rawSize}px` : null;
      if (cs) t.fontSize = cs;
      if (v.fontWeight !== undefined && v.fontWeight !== null) t.fontWeight = v.fontWeight;
      if (typeof v.lineHeight === "number" && Number.isFinite(v.lineHeight)) t.lineHeight = v.lineHeight;
      if (Object.keys(t).length) types[name] = t;
    }
  }

  const size = node.fontSize ?? node["font-size"];
  const fam = node.fontFamily ?? node["font-family"];
  if (size !== undefined || fam !== undefined) {
    const name = prettify(hint) || "type";
    if (!/^(metadata|meta|id|version)$/.test(name)) {
      const sizeStr = typeof size === "object" && size ? size.value ?? size.$value : size;
      const famStr = Array.isArray(fam) ? fam.join(", ") : typeof fam === "object" && fam ? fam.value ?? fam.$value : fam;
      const t = { ...(types[name] || {}) };
      if (typeof sizeStr === "string") {
        const cs = cleanFontSize(sizeStr);
        if (cs) t.fontSize = cs;
      } else if (typeof size === "number" && size > 0) {
        t.fontSize = `${size}px`;
      }
      if (typeof famStr === "string") {
        const cf = cleanFontFamily(famStr);
        if (cf) t.fontFamily = cf;
      }
      if (t.fontSize || t.fontFamily) types[name] = t;
    }
  }

  for (const [k, v] of Object.entries(node)) {
    const nextHint = GENERIC.has(k) ? hint : `${hint ? hint + "-" : ""}${k}`;
    if (typeof v === "string") {
      if (isColor(v)) {
        const name = prettify(GENERIC.has(k) ? hint : k);
        if (name && !colors[name]) colors[name] = v.trim();
      } else if (FONT_KEY_RE.test(nextHint) && !FONT_NON_FAMILY_RE.test(nextHint)) {
        const name = prettify(GENERIC.has(k) ? hint : k);
        const cf = isPlausibleFontFamily(v);
        if (name && cf && !types[name]) types[name] = { fontFamily: cf };
      } else if (/font-?size/i.test(nextHint) && !/adjust|print/i.test(nextHint)) {
        const name = prettify(GENERIC.has(k) ? hint : k);
        const cs = cleanFontSize(v);
        if (name && cs) types[name] = { ...(types[name] || {}), fontSize: cs };
      }
    } else if (v && typeof v === "object") {
      harvestJson(v, GENERIC.has(k) ? hint : k, colors, types, depth + 1);
    }
  }
}

function harvestJs(text, rel, colors, types) {
  // Panda CSS and vanilla-extract wrap every token as `{ value: "#hex" }`. That
  // makes the key generic, so the pair looks like `value: "#hex"` and gets
  // skipped. Unwrap it first and the real key survives. Formatters add a
  // trailing comma, which must not defeat the match.
  text = text.replace(/\{\s*value\s*:\s*(['"`])(#[0-9a-f]{3,8})\1\s*,?\s*\}/gi, "$1$2$1");

  const pairRe =
    /["']?name["']?\s*:\s*["']([^"']{2,120})["'][\s\S]{0,240}?["']?value["']?\s*:\s*(["'])((?:(?!\2)[^\\]|\\.){2,240})\2/g;
  let m;
  while ((m = pairRe.exec(text))) {
    const val = m[3].replace(/\\(["'])/g, "$1").trim();
    if (isColor(val)) {
      const name = prettify(m[1]);
      if (name && !colors[name]) colors[name] = val;
    } else if (/font-?size/i.test(m[1])) {
      const cs = cleanFontSize(val);
      const name = prettify(m[1]);
      if (name && cs) types[name] = { ...(types[name] || {}), fontSize: cs };
    } else if (FONT_KEY_RE.test(m[1]) && !FONT_NON_FAMILY_RE.test(m[1])) {
      const cf = cleanFontFamily(val);
      const name = prettify(m[1]);
      if (name && cf && !types[name]) types[name] = { fontFamily: cf };
    }
  }

  if (/^t[_-]/.test(path.basename(rel))) {
    const hex = /["'`](#[0-9a-f]{6}|#[0-9a-f]{3})["'`]/i.exec(text);
    if (hex) {
      const name = prettify(path.basename(rel).replace(/\.(js|mjs|cjs|ts)$/i, ""));
      if (name && !colors[name]) colors[name] = hex[1];
    }
  }

  const constRe = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*["'`](#[0-9a-f]{3,8}|rgba?\([^)]*\))["'`]/gi;
  while ((m = constRe.exec(text))) {
    const name = prettify(m[1]);
    if (name && !colors[name]) colors[name] = m[2].trim();
  }

  // Scales are nested one level: `blue: { "500": "#3182ce" }`. This runs first so
  // the hue survives — a flat key match would claim `"500"` and collapse every
  // scale into a token named after its step.
  const blockRe = /([A-Za-z_$][\w$]*)\s*:\s*\{([^{}]*)\}/g;
  let b;
  while ((b = blockRe.exec(text))) {
    const parent = b[1];
    if (GENERIC.has(parent.toLowerCase())) continue;
    const innerRe = /["']?([A-Za-z0-9_$][\w$-]{0,40})["']?\s*:\s*["'`](#[0-9a-f]{3,8}|rgba?\([^)]*\))["'`]/gi;
    let m2;
    while ((m2 = innerRe.exec(b[2]))) {
      const name = prettify(`${parent}-${m2[1]}`);
      if (name && !colors[name]) colors[name] = m2[2].trim();
    }
  }

  const objRe = /["']?([A-Za-z0-9_$][\w$-]{0,40})["']?\s*:\s*["'`](#[0-9a-f]{3,8}|rgba?\([^)]*\))["'`]/gi;
  while ((m = objRe.exec(text))) {
    if (GENERIC.has(m[1].toLowerCase())) continue;
    if (/^\d+$/.test(m[1])) continue; // a bare step number has no meaning alone
    const name = prettify(m[1]);
    if (name && !colors[name]) colors[name] = m[2].trim();
  }

  // Extract explicit font-family and font-size tokens from JS/TS token objects & exports
  const jsFontRe = /(?:(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=|["']?([A-Za-z0-9_$][\w$-]{2,60})["']?\s*:)\s*(['"`])((?:(?!\3)[^\r\n\\]|\\.){3,220})\3/g;
  while ((m = jsFontRe.exec(text))) {
    const key = m[1] || m[2];
    const val = m[4].trim();
    if (!key || GENERIC.has(key.toLowerCase())) continue;
    if (JS_FONT_KEY_RE.test(key) && !FONT_NON_FAMILY_RE.test(key) && !isColor(val)) {
      const cf = isPlausibleFontFamily(val);
      const name = prettify(key);
      if (name && cf && !types[name]) types[name] = { fontFamily: cf };
    } else if (/(?:font[-_]?size|fontSize|FontSize)/i.test(key) && !/adjust|print|auto/i.test(key)) {
      const cs = cleanFontSize(val);
      const name = prettify(key);
      if (name && cs) types[name] = { ...(types[name] || {}), fontSize: cs };
    }
  }
}

const COLOR_VAR_NAME = /(color|bg|background|fg|foreground|surface|text|border|brand|accent|fill|stroke|ink|tint|shade|canvas)/i;

function harvestCss(text, colors, types) {
  // Minified CSS drops the semicolon on the last declaration before `}`, so a
  // `;`-only terminator silently misses half of every compiled stylesheet.
  const cssVars = {};
  const re = /--([a-z0-9-]+)\s*:\s*([^;{}]+)[;}]/gi;
  let m;
  while ((m = re.exec(text))) {
    let value = m[2].replace(/\s*!important\s*$/i, "").trim();
    cssVars[`--${m[1]}`] = value;
    const ld = /^light-dark\(\s*([^,]+?)\s*,\s*([^)]+)\s*\)$/i.exec(value);
    if (ld && isColor(ld[1])) value = ld[1].trim();
    if (isColor(value)) {
      const name = prettify(m[1]);
      if (name && !colors[name]) colors[name] = value;
    } else if (COLOR_VAR_NAME.test(m[1])) {
      const rgbTrip = /^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/.exec(value);
      if (rgbTrip && rgbTrip.slice(1).every((n) => Number(n) <= 255)) {
        const name = prettify(m[1]);
        if (name && !colors[name]) colors[name] = `rgb(${rgbTrip[1]}, ${rgbTrip[2]}, ${rgbTrip[3]})`;
      }
    }
    if (/font-?size/i.test(m[1])) {
      const cs = cleanFontSize(value);
      const name = prettify(m[1]);
      if (name && cs) types[name] = { ...(types[name] || {}), fontSize: cs };
    }
  }
  const resolveLocal = (v, d = 0) =>
    d > 4 || !v.includes("var(")
      ? v
      : v.replace(/var\(\s*(--[a-z0-9-]+)\s*(?:,\s*([^)]*))?\)/gi, (orig, k, fb) =>
          cssVars[k] ? resolveLocal(cssVars[k], d + 1) : fb ? fb.trim() : orig
        );

  const famRe = /--([a-z0-9_-]*(?:font(?:-|_)*family|typeface|font(?:-|_)*(?:sans|serif|mono|monospace|display|brand|code|stack|base|body|heading))[a-z0-9_-]*)\s*:\s*([^;{}]+)[;}]/gi;
  while ((m = famRe.exec(text))) {
    if (FONT_NON_FAMILY_RE.test(m[1])) continue;
    const name = prettify(m[1]);
    const cf = cleanFontFamily(resolveLocal(m[2]));
    if (name && cf && !types[name]) types[name] = { fontFamily: cf };
  }

  for (const [varName, rawVal] of Object.entries(cssVars)) {
    if (!/typescale/i.test(varName) || /-(tracking|axes|weight|size|line-height|font)$/i.test(varName)) continue;
    const resolved = resolveLocal(rawVal);
    const sh = /^(?:(\d{3})\s+)?(\d+(?:\.\d+)?(?:px|rem|em))\s*(?:\/\s*(\d+(?:\.\d+)?(?:px|rem|em)?))?\s+(.+)$/i.exec(resolved);
    if (!sh) continue;
    const tName = prettify(varName);
    const cs = cleanFontSize(sh[2]);
    const cf = cleanFontFamily(sh[4]);
    if (!tName || !cs || types[tName]) continue;
    const tok = { fontSize: cs };
    if (cf) tok.fontFamily = cf;
    if (sh[1]) tok.fontWeight = Number(sh[1]);
    if (sh[3]) {
      const lh = Number(sh[3]);
      tok.lineHeight = Number.isFinite(lh) ? lh : sh[3];
    }
    types[tName] = tok;
  }

  // Extract typography from direct semantic rules (e.g. `body`, `h1`, `.nhsuk-heading-xl`)
  // when a stylesheet doesn't declare `--var-font-size` custom properties.
  const ruleRe = /(?:^|[}\s])((?:html|body|h[1-6]|\.[a-z0-9_-]*(?:heading|display|title|subtitle|body|caption|lead)[a-z0-9_-]*))\s*\{([^{}]+)\}/gi;
  while ((m = ruleRe.exec(text))) {
    const rawSel = m[1].replace(/^\./, "");
    const tName = prettify(rawSel);
    if (!tName || types[tName]) continue;
    const body = m[2];
    const fsM = /(?:^|;)\s*font-size\s*:\s*([^;}]+)/i.exec(body);
    const ffM = /(?:^|;)\s*font-family\s*:\s*([^;}]+)/i.exec(body);
    const fwM = /(?:^|;)\s*font-weight\s*:\s*([^;}]+)/i.exec(body);
    const lhM = /(?:^|;)\s*line-height\s*:\s*([^;}]+)/i.exec(body);
    const tok = {};
    if (ffM) {
      const cf = cleanFontFamily(ffM[1]);
      if (cf) tok.fontFamily = cf;
    }
    if (fsM) {
      const cs = cleanFontSize(fsM[1]);
      if (cs) tok.fontSize = cs;
    }
    if (!tok.fontSize && !tok.fontFamily) continue;
    if (fwM) {
      const w = Number(fwM[1].replace(/!important/i, "").trim());
      if (Number.isFinite(w) && w >= 100 && w <= 950) tok.fontWeight = w;
    }
    if (lhM) {
      const lStr = lhM[1].replace(/!important/i, "").trim();
      if (/^\d+(?:\.\d+)?(?:px|rem|em)?$/.test(lStr)) tok.lineHeight = Number(lStr) || lStr;
    }
    types[tName] = tok;
  }
}

// SCSS variables and map entries: `$brand: #0057b8;` and `('blue-60v': #1a4480,)`.
// USWDS and most government systems express their palette as a map, not as
// individual variables, which is why they looked empty.
const CSS_PROPS = /^(color|background|background-color|border|border-color|fill|stroke|outline|box-shadow|shadow)$/i;

function normalizeScssColor(v) {
  const s = String(v || "").trim();
  const hslSub = /^hsla?\(\s*([^,]+),\s*([^,]+),\s*(\d+(?:\.\d+)?)%\s*-\s*(\d+(?:\.\d+)?)%(.*)\)$/i.exec(s);
  if (hslSub) {
    const l = Math.max(0, Math.min(100, Number(hslSub[3]) - Number(hslSub[4])));
    const candidate = `${s.slice(0, s.indexOf("("))}(${hslSub[1]}, ${hslSub[2]}, ${l}%${hslSub[5]})`;
    if (isColor(candidate)) return candidate;
  }
  return isColor(s) ? s : null;
}

function harvestScss(text, colors, types) {
  // Single-line declarations only (`[^\r\n;]+`), otherwise multiline SCSS maps
  // like `$font-sizes: (\n xs: 12px\n);` get captured raw into YAML.
  const varRe = /^[ \t]*\$([a-z0-9-_]+)[ \t]*:[ \t]*([^\r\n;]+);/gim;
  let m;
  while ((m = varRe.exec(text))) {
    const value = m[2].replace(/\s*!(?:default|global|important)\s*$/i, "").trim();
    const sc = normalizeScssColor(value);
    if (sc) {
      const name = prettify(m[1]);
      if (name && !colors[name]) colors[name] = sc;
    } else if (/font-?size/i.test(m[1])) {
      const cs = cleanFontSize(value);
      const name = prettify(m[1]);
      if (name && cs) types[name] = { ...(types[name] || {}), fontSize: cs };
    } else if (FONT_KEY_RE.test(m[1]) && !FONT_NON_FAMILY_RE.test(m[1])) {
      const cf = isPlausibleFontFamily(value);
      const name = prettify(m[1]);
      if (name && cf && !types[name]) types[name] = { fontFamily: cf };
    }
  }

  // Multiline SCSS font stacks (e.g. Bootstrap/Boosted `$font-family-sans-serif:\n system-ui, ... !default;`)
  const multiFontRe = /^[ \t]*\$([a-z0-9-_]+)[ \t]*:[ \t]*([^;{}()$]{4,320});/gim;
  while ((m = multiFontRe.exec(text))) {
    if (!FONT_KEY_RE.test(m[1]) || FONT_NON_FAMILY_RE.test(m[1])) continue;
    const name = prettify(m[1]);
    if (!name || types[name]) continue;
    const cf = isPlausibleFontFamily(m[2].replace(/\s+/g, " "));
    if (cf) types[name] = { fontFamily: cf };
  }

  const mapRe = /["']?([a-z0-9][a-z0-9-_]*?)["']?\s*:\s*(#[0-9a-f]{3,8})\b/gi;
  while ((m = mapRe.exec(text))) {
    if (CSS_PROPS.test(m[1])) continue;
    const name = prettify(m[1]);
    if (name && !colors[name]) colors[name] = m[2];
  }

  harvestCss(text, colors, types);
}

// A package can ship 1,100 colours. A catalog entry needs the ones that carry
// meaning, plus a spread of the scales — not the whole dump.
export function selectColors(colors, max = MAX_COLORS) {
  const entries = Object.entries(colors);
  if (entries.length <= max) return Object.fromEntries(entries);

  const semanticRe =
    /(background|surface|text|border|brand|accent|primary|secondary|danger|error|success|warning|info|neutral|focus|link|disabled)/;

  const semantic = entries.filter(([k]) => semanticRe.test(k));
  const rest = entries.filter(([k]) => !semanticRe.test(k));

  const out = {};
  const take = (list, limit) => {
    if (!list.length || limit <= 0) return;
    const step = Math.max(1, Math.floor(list.length / limit));
    for (let i = 0; i < list.length && Object.keys(out).length < max; i += step) out[list[i][0]] = list[i][1];
  };

  take(semantic, Math.floor(max * 0.66));
  take(rest, max - Object.keys(out).length);
  for (const [k, v] of entries) {
    if (Object.keys(out).length >= max) break;
    if (!(k in out)) out[k] = v;
  }
  return out;
}

export function pickPrimary(colors) {
  const entries = Object.entries(colors).filter(([, v]) => isOpaque(v));
  const isVivid = (v) => {
    const c = parseColor(v);
    if (!c) return false;
    const lum = relativeLuminance(c);
    return saturation(c) >= 0.15 && lum >= 0.015 && lum <= 0.88;
  };
  const byName = (re, vividOnly = false) => entries.find(([k, v]) => re.test(k) && (!vividOnly || isVivid(v)));
  const scored = entries
    .map(([k, v]) => {
      const c = parseColor(v);
      const sat = (c && saturation(c)) || 0;
      // Prefer a vivid mid-tone: a saturated near-black is not a brand colour.
      const midness = 1 - Math.min(1, Math.abs(relativeLuminance(c || [0, 0, 0]) - 0.45) * 1.6);
      return { k, v, s: sat * midness };
    })
    .filter((x) => x.s > 0.2)
    .sort((a, b) => b.s - a.s);

  const vividNamed =
    byName(/(^|-)brand(-|$)/, true) ||
    byName(/(^|-)accent(-\d+)?$/, true) ||
    entries.find(
      ([k, v]) =>
        /primary/.test(k) &&
        !/^(text|bg|background|border|light)[-_]|(^|-)(text|bg|border)-/.test(k) &&
        isVivid(v)
    ) ||
    byName(/blue-500|blue-600|interactive/, true);
  if (vividNamed) return vividNamed;
  if (scored[0]) return [scored[0].k, scored[0].v];
  return (
    byName(/(^|-)brand(-|$)/) ||
    byName(/(^|-)accent(-\d+)?$/) ||
    entries.find(([k]) => /primary/.test(k) && !/^(text|bg|background|border|light)[-_]|(^|-)(text|bg|border)-/.test(k)) ||
    null
  );
}

// ------------------------------------------------------------ collect

export function collectTokens(root, { maxFiles = 4000 } = {}) {
  const colors = {};
  const types = {};
  let usedFiles = 0;

  const allFiles = walk(root);
  const files = allFiles
    .filter((f) => /\.(json|js|mjs|cjs|css|scss|ts|tsx)$/i.test(f))
    .filter((f) => !/\.d\.ts$|package\.json$|package-lock|tsconfig|\.(stories|test|spec|mock|fixture)\./i.test(f))
    // .tsx is usually a component, full of one-off colours. Only read it when
    // the path itself says tokens/theme — that is where TSX token files live.
    .filter((f) => !/\.tsx$/i.test(f) || scoreFile(path.relative(root, f)) >= 2)
    .filter((f) => {
      const size = fs.statSync(f).size;
      if (/\.json$/i.test(f)) return size < 8_000_000;
      if (/\.(js|mjs|cjs|ts|tsx)$/i.test(f)) return size < 3_000_000;
      return size < 900_000;
    })
    .map((f) => ({ f, rel: path.relative(root, f), score: scoreFile(path.relative(root, f)) }))
    .filter(({ f }) => {
      if (!/\.(js|mjs|cjs|ts|tsx)$/i.test(f)) return true;
      const head = fs.readFileSync(f, "utf8").slice(0, 4000);
      return !head.split("\n").some((l) => l.length > 1500);
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxFiles);

  for (const { f, rel } of files) {
    if (Object.keys(colors).length > 1200 && !/typo|font|\.css$|\.scss$/i.test(rel)) continue;
    let text;
    try {
      text = fs.readFileSync(f, "utf8");
    } catch {
      continue;
    }
    const before = Object.keys(colors).length;
    if (/\.scss$/i.test(f)) harvestScss(text, colors, types);
    else if (/\.css$/i.test(f)) harvestCss(text, colors, types);
    else if (/\.(js|mjs|cjs|ts|tsx)$/i.test(f)) harvestJs(text, rel, colors, types);
    else {
      try {
        harvestJson(JSON.parse(text), "", colors, types);
      } catch {
        continue;
      }
    }
    if (Object.keys(colors).length > before) usedFiles++;
  }

  const harvested = Object.keys(colors).length;

  // Defensive sweep at the boundary: no harvested value may contain a template
  // placeholder. Templates resolve to different colours at runtime, so keeping
  // one guarantees a broken token reference in DESIGN.md.
  for (const [k, v] of Object.entries(colors)) {
    if (/\$|\{|\}/.test(v)) delete colors[k];
  }

  // `amber-10` (solid) and `amber-a10` (the same step as alpha): the twin adds
  // nothing and skews surface detection.
  const isAlphaTwin = (k) => {
    const m = /^(.*)-a(\d+)$/.exec(k);
    return Boolean(m && colors[`${m[1]}-${m[2]}`]);
  };
  const deduped = Object.fromEntries(Object.entries(colors).filter(([k]) => !isAlphaTwin(k)));
  const opaque = Object.fromEntries(Object.entries(deduped).filter(([, v]) => isOpaque(v)));
  const base = Object.keys(opaque).length >= 20 ? opaque : deduped;
  const finalColors = selectColors(base);

  // DTCG aliases cannot resolve outside their package; drop the property rather
  // than emit a broken reference.
  const REF = /^\{[^}]+\}$/;
  for (const k of Object.keys(finalColors)) if (REF.test(finalColors[k])) delete finalColors[k];

  // Repos sometimes ship a code-editor theme alongside the design system. Indent
  // guides and selection highlights are real values, but they are editor
  // furniture rather than surfaces, and they make the palette look like noise.
  const NOISE = /^(editor|syntax|terminal|scrollbar|minimap|bracket)[-_]|indent-guide|selection-highlight/;
  for (const k of Object.keys(finalColors)) if (NOISE.test(k)) delete finalColors[k];
  for (const [k, t] of Object.entries(types)) {
    for (const p of Object.keys(t)) if (typeof t[p] === "string" && REF.test(t[p])) delete t[p];
    if (!t.fontSize && !t.fontFamily) delete types[k];
  }

  // Recover component styling from the stylesheets the library ships. This is
  // reading, not guessing: `.govuk-button` has a real background, radius and
  // padding in the compiled CSS even when no component tokens are published.
  // Deliberately scanned from the full file list, not the capped one — compiled
  // stylesheets are often larger than the token-file size limit.
  const cssFiles = allFiles
    .filter((f) => /\.css$/i.test(f) && !/\.test\.css$/i.test(f))
    .map((f) => ({ f, size: fs.statSync(f).size }))
    .filter(({ size }) => size < 12_000_000)
    .sort((a, b) => b.size - a.size)
    .slice(0, 24);

  let components = {};
  for (const { f } of cssFiles) {
    try {
      const got = extractCssComponents(fs.readFileSync(f, "utf8"));
      for (const [k, v] of Object.entries(got)) if (!components[k]) components[k] = v;
    } catch {
      /* a stylesheet we cannot parse is not a failure */
    }
  }

  let icons = null;
  const pkgFiles = allFiles.filter((f) => path.basename(f) === "package.json").slice(0, 12);
  for (const pf of pkgFiles) {
    try {
      const m = JSON.parse(fs.readFileSync(pf, "utf8"));
      const found = detectIconFromPackageJson(m);
      if (found) {
        icons = found;
        break;
      }
    } catch {
      /* ignore invalid package.json */
    }
  }
  const svgFiles = allFiles
    .filter((f) => /\.svg$/i.test(f) && !/logo|brandmark|banner|hero|illustrat/i.test(f))
    .filter((f) => {
      try { return fs.statSync(f).size < 6000; } catch { return false; }
    })
    .slice(0, 24)
    .map((f) => {
      try { return { name: path.basename(f, ".svg"), svg: fs.readFileSync(f, "utf8") }; } catch { return null; }
    })
    .filter(Boolean);
  const measured = inspectSvgSnippets(svgFiles);
  if (measured) {
    icons = icons
      ? { ...icons, samples: measured.samples, ...(measured.strokeWidth ? { strokeWidth: measured.strokeWidth } : {}), ...(measured.grid ? { grid: measured.grid } : {}) }
      : { library: "Repository SVGs", package: null, ...measured, source: "repo" };
  }

  return { colors: finalColors, types, components, icons, harvested, usedFiles, scanned: files.length };
}

// -------------------------------------------------------------- build

const TAG_HINTS = [
  [/\benterprise\b/i, "enterprise"],
  [/\bgovernment|federal|public service|gov\b/i, "government"],
  [/\bopen-source|open source\b/i, "open-source"],
  [/\bcolour system|color system\b/i, "color-system"],
  [/\bconsole|platform\b/i, "platform"],
  [/\bcomponent primitives|unstyled\b/i, "primitives"],
  [/\badmin\b/i, "admin"],
];

function deriveTags(note, org, theme, provenance = "published") {
  const tags = new Set([provenance === "observed" ? "observed" : "published"]);
  if (theme) tags.add(theme);
  if (org) tags.add(prettify(org));
  for (const [re, tag] of TAG_HINTS) if (re.test(note || "")) tags.add(tag);
  return [...tags].filter(Boolean);
}

export function formatTitle(org, name) {
  const o = String(org || "").trim();
  const n = String(name || "").trim();
  if (!o) return n;
  if (!n) return o;
  if (n.toLowerCase().startsWith(o.toLowerCase())) return n;
  return `${o} ${n}`;
}

export function buildSystem({ slug, name, org, note, colors, types, components = {}, icons = null, pkg, version, license, homepage, repo, provenance = "published", sourceNote = "" }) {
  const primary = pickPrimary(colors);
  if (primary) colors.primary = primary[1];
  const cleanNote =
    note && String(note).trim() && String(note).trim() !== "undefined"
      ? String(note).trim()
      : `${formatTitle(org, name || slug)} — ${provenance === "observed" ? "tokens read from live site." : "published design tokens."}`;

  // Only the spec's component properties belong in DESIGN.md; `kind`, `key` and
  // `selector` are provenance for the catalog, not schema.
  const SPEC_PROPS = ["backgroundColor", "textColor", "typography", "rounded", "padding", "size", "height", "width"];
  const specComponents = {};
  for (const [k, v] of Object.entries(components)) {
    const slim = {};
    for (const p of SPEC_PROPS) if (v[p] !== undefined) slim[p] = v[p];
    if (Object.keys(slim).length) specComponents[k] = slim;
  }

  const preview = buildPreview({ colors, typography: types, components, icons, prose: { overview: cleanNote } });

  const fm = { version: "alpha", name: name || slug, description: cleanNote };
  if (Object.keys(colors).length) fm.colors = colors;
  if (Object.keys(types).length) fm.typography = types;
  if (preview.icons) {
    const { samples: _drop, ...yamlIcons } = preview.icons;
    fm.icons = yamlIcons;
  }
  if (Object.keys(specComponents).length) fm.components = specComponents;

  const families = [...new Set(Object.values(types).map((t) => t.fontFamily).filter(Boolean))];
  const originLine =
    provenance === "observed"
      ? `Tokens were read from ${homepage || "the live site"}, not from a published token package: ${Object.keys(colors).length} colour tokens and ${Object.keys(types).length} type tokens.`
      : `Tokens were read from ${pkg ? `\`${pkg}@${version}\`` : "the project's own repository"}, not from a marketing site: ${Object.keys(colors).length} colour tokens and ${Object.keys(types).length} type tokens.`;

  const body = [
    `# ${name}`,
    "",
    "## Overview",
    "",
    cleanNote,
    "",
    originLine,
    "",
    "## Colors",
    "",
    `${Object.keys(colors).length} colour tokens selected from the token files, weighted toward semantic roles.`,
    "",
    "## Typography",
    "",
    families.length
      ? `Families declared in the source: ${families.map((f) => `\`${f}\``).join(", ")}.`
      : "No resolvable type tokens were extracted. The type scale is omitted rather than invented.",
    "",
    ...(preview.icons
      ? [
          "### Iconography",
          "",
          `Icons follow ${preview.icons.library}${preview.icons.package ? ` (\`${preview.icons.package}\`)` : ""} on a ${preview.icons.grid}px grid (${preview.icons.style}, stroke ${preview.icons.strokeWidth}px, ${preview.icons.strokeLinecap} caps).`,
          "",
        ]
      : []),
    ...(Object.keys(specComponents).length
      ? [
          "## Components",
          "",
          `${Object.keys(specComponents).length} components recovered by reading the compiled stylesheet — real background, radius, padding, border and type values, not values invented to fill a gap. The system does not publish component tokens, so these come from its own CSS rules.`,
          "",
        ]
      : []),
  ].join("\n");

  const markdown = `${buildFrontMatter(fm)}\n${body}`;
  const report = lint(markdown, { name: slug });
  const theme = themeOfCanvas(preview.canvas);

  const manifest = {
    name: slug,
    displayName: name,
    description: cleanNote,
    style: cleanNote,
    category: org || "Published",
    org,
    theme,
    tags: deriveTags(cleanNote, org, theme, provenance),
    homepage: homepage || "",
    license: license || "see source",
    provenance,
    provenanceNote: sourceNote,
    source: provenance === "observed" ? { url: homepage || null } : pkg ? { package: pkg, version } : { repo: repo || null },
    spec: "design.md@alpha",
    frameworks: ["tailwind-v4", "css-vars", "dtcg"],
    tokens: { colors: preview.palette.length, typography: preview.type.length, components: Object.keys(specComponents).length },
    checks: { errors: report.counts.errors, warnings: report.counts.warnings, verified: report.verified },
    files: { design: "DESIGN.md", tokens: "tokens.json" },
  };

  return { markdown, report, preview, manifest };
}

export function writeSystem(root, slug, built) {
  const dir = path.join(root, "systems", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "DESIGN.md"), built.markdown, "utf8");
  fs.writeFileSync(path.join(dir, "tokens.json"), emitDtcg(built.markdown), "utf8");
  fs.writeFileSync(path.join(dir, "preview.json"), JSON.stringify(built.preview, null, 2) + "\n", "utf8");
  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(built.manifest, null, 2) + "\n", "utf8");
  clearFailure(root, slug);
  clearListedDuplicate(root, built.manifest.org, slug);
  return dir;
}

// A listed inventory record for the same organisation must not survive beside
// the real entry — that would show the same system twice, once as "not sourced".
function clearListedDuplicate(root, org, keepSlug) {
  const key = normOrg(org);
  if (!key) return;
  for (const name of fs.readdirSync(path.join(root, "systems"))) {
    if (name === keepSlug) continue;
    const manifest = path.join(root, "systems", name, "manifest.json");
    if (!fs.existsSync(manifest)) continue;
    let m;
    try {
      m = JSON.parse(fs.readFileSync(manifest, "utf8"));
    } catch {
      continue;
    }
    if (m.provenance !== "listed") continue;
    const theirs = normOrg(m.org);
    const matchesName = (m.listedNames || []).some((ln) => normOrg(ln) === key);
    if (theirs === key || matchesName) {
      fs.rmSync(path.join(root, "systems", name), { recursive: true, force: true });
    }
  }
}

// A system that later succeeds must not stay on the blocked list.
export function clearFailure(root, slug) {
  const file = path.join(root, "data/blocked.json");
  if (!fs.existsSync(file)) return;
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return;
  }
  const before = (data.blocked || []).length;
  data.blocked = (data.blocked || []).filter((x) => x.slug !== slug);
  if (data.blocked.length === before) return;
  data.updated = new Date().toISOString();
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

// Failures used to live only in terminal scrollback. Persisting them makes the
// "what can't we get" list a query instead of a memory exercise.
export function recordFailure(root, { slug, name, org, source, reason, kind }) {
  const file = path.join(root, "data/blocked.json");
  let data = { updated: null, blocked: [] };
  if (fs.existsSync(file)) {
    try {
      data = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
      /* start clean */
    }
  }
  data.blocked = (data.blocked || []).filter((x) => x.slug !== slug);
  data.blocked.push({
    slug,
    name: name || slug,
    org: org || "",
    source,
    kind: kind || "unknown",
    reason,
    at: new Date().toISOString().slice(0, 10),
  });
  data.blocked.sort((a, b) => a.slug.localeCompare(b.slug));
  data.updated = new Date().toISOString();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

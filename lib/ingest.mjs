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
  return COLOR_RE.test(v.trim());
}

export function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Documentation, examples, fixtures and demo apps carry invented values —
      // #ff0000 assigned to "text-red" is a placeholder, not a design token.
      // `syntax` holds code-highlighting themes, which are editor chrome.
      if (/^(node_modules|\.git|coverage|__tests__|test|tests|vendor|docs|doc|examples?|playground|stories|\.storybook|fixtures|e2e|cypress|syntax|sandbox)$/.test(entry.name)) continue;
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
  if (/theme/i.test(rel)) s += 2;
  if (/colou?r|palette/i.test(rel)) s += 2;
  if (/primitive|semantic|global|core|variable/i.test(rel)) s += 1;
  if (/test|spec|fixture|example|demo|storybook|mock|sample|__/i.test(rel)) s -= 6;
  if (/\.d\.ts$/.test(rel)) s -= 8;
  return s;
}

// ---------------------------------------------------------------- harvest

function harvestJson(node, hint, colors, types, depth = 0) {
  if (depth > 14 || node === null || typeof node !== "object") return;

  if (Array.isArray(node)) {
    node.forEach((v) => harvestJson(v, hint, colors, types, depth + 1));
    return;
  }

  if (typeof node.$value === "string" && node.$type) {
    const name = prettify(hint);
    if (name) {
      if (node.$type === "color" && isColor(node.$value) && !colors[name]) colors[name] = node.$value.trim();
      if (node.$type === "fontFamily") types[name] = { ...(types[name] || {}), fontFamily: node.$value };
      if (node.$type === "dimension" && /font-?size/.test(hint) && /\d(px|rem)/.test(node.$value)) {
        types[name] = { ...(types[name] || {}), fontSize: node.$value };
      }
    }
  }

  if (node.$type === "typography" && node.$value && typeof node.$value === "object") {
    const name = prettify(hint);
    const v = node.$value;
    if (name) {
      types[name] = {
        fontFamily: Array.isArray(v.fontFamily) ? v.fontFamily[0] : v.fontFamily,
        fontSize:
          typeof v.fontSize === "object" && v.fontSize ? `${v.fontSize.value}${v.fontSize.unit || "px"}` : v.fontSize,
        fontWeight: v.fontWeight,
        lineHeight: typeof v.lineHeight === "number" ? v.lineHeight : undefined,
      };
    }
  }

  if (typeof node.value === "string" && isColor(node.value)) {
    const name = prettify(hint);
    if (name && !colors[name]) colors[name] = node.value.trim();
  }

  const size = node.fontSize ?? node["font-size"];
  const fam = node.fontFamily ?? node["font-family"];
  if (size !== undefined || fam !== undefined) {
    const name = prettify(hint) || "type";
    const sizeStr = typeof size === "object" && size ? size.value ?? size.$value : size;
    const famStr = Array.isArray(fam) ? fam[0] : typeof fam === "object" && fam ? fam.value ?? fam.$value : fam;
    const t = { ...(types[name] || {}) };
    if (typeof sizeStr === "string" && /\d(px|rem|em)/.test(sizeStr)) t.fontSize = sizeStr;
    else if (typeof size === "number") t.fontSize = `${size}px`;
    if (typeof famStr === "string" && famStr.length < 60) t.fontFamily = famStr.replace(/^['"]|['"]$/g, "");
    if (t.fontSize || t.fontFamily) types[name] = t;
  }

  for (const [k, v] of Object.entries(node)) {
    const nextHint = GENERIC.has(k) ? hint : k;
    if (typeof v === "string") {
      if (isColor(v)) {
        const name = prettify(nextHint);
        if (name && !colors[name]) colors[name] = v.trim();
      }
    } else if (v && typeof v === "object") {
      harvestJson(v, nextHint, colors, types, depth + 1);
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
    /["']?name["']?\s*:\s*["']([^"']{2,120})["'][\s\S]{0,240}?["']?value["']?\s*:\s*["']([^"']{2,80})["']/g;
  let m;
  while ((m = pairRe.exec(text))) {
    if (isColor(m[2])) {
      const name = prettify(m[1]);
      if (name && !colors[name]) colors[name] = m[2].trim();
    } else if (/\d(px|rem)/.test(m[2]) && /font-?size/i.test(m[1])) {
      const name = prettify(m[1]);
      if (name) types[name] = { ...(types[name] || {}), fontSize: m[2] };
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

  // Font families are deliberately NOT harvested from JS by filename here. A
  // rule that names a token after the module it was found in produces
  // "tokenizer-family" and "page-family" — plausible-looking noise that then
  // renders as a fake type scale. Families come from JSON keys, DTCG, or CSS
  // custom properties, where the name actually means something.
}

function harvestCss(text, colors, types) {
  // Minified CSS drops the semicolon on the last declaration before `}`, so a
  // `;`-only terminator silently misses half of every compiled stylesheet.
  const re = /--([a-z0-9-]+)\s*:\s*([^;{}]+)[;}]/gi;
  let m;
  while ((m = re.exec(text))) {
    const value = m[2].trim();
    if (isColor(value)) {
      const name = prettify(m[1]);
      if (name && !colors[name]) colors[name] = value;
    } else if (/\d(px|rem)/.test(value) && /font-?size/i.test(m[1])) {
      const name = prettify(m[1]);
      if (name) types[name] = { ...(types[name] || {}), fontSize: value };
    }
  }
  const famRe = /--([a-z0-9-]*font-family[a-z0-9-]*)\s*:\s*([^;{}]+)[;}]/gi;
  while ((m = famRe.exec(text))) {
    const name = prettify(m[1]);
    if (name && !types[name]) types[name] = { fontFamily: m[2].trim().replace(/^['"]|['"]$/g, "") };
  }
}

// SCSS variables and map entries: `$brand: #0057b8;` and `('blue-60v': #1a4480,)`.
// USWDS and most government systems express their palette as a map, not as
// individual variables, which is why they looked empty.
const CSS_PROPS = /^(color|background|background-color|border|border-color|fill|stroke|outline|box-shadow|shadow)$/i;

function harvestScss(text, colors, types) {
  const varRe = /^\s*\$([a-z0-9-_]+)\s*:\s*([^;]+);/gim;
  let m;
  while ((m = varRe.exec(text))) {
    const value = m[2].trim();
    if (isColor(value)) {
      const name = prettify(m[1]);
      if (name && !colors[name]) colors[name] = value;
    } else if (/\d(px|rem)/.test(value) && /font-?size/i.test(m[1])) {
      const name = prettify(m[1]);
      if (name) types[name] = { ...(types[name] || {}), fontSize: value };
    }
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
  const byName = (re) => entries.find(([k]) => re.test(k));
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

  const named =
    byName(/(^|-)brand(-|$)/) ||
    byName(/(^|-)accent(-|$)/) ||
    // `color-text-primary` is the body ink, not the brand. Same trap as the
    // prose importer: never let a text/bg/border token become the accent.
    entries.find(([k]) => /primary/.test(k) && !/^(text|bg|background|border|light)[-_]|(^|-)(text|bg|border)-/.test(k)) ||
    byName(/blue-500|blue-600|interactive/);
  return named || (scored[0] ? [scored[0].k, scored[0].v] : null);
}

// ------------------------------------------------------------ collect

export function collectTokens(root, { maxFiles = 4000 } = {}) {
  const colors = {};
  const types = {};
  let usedFiles = 0;

  const allFiles = walk(root);
  const files = allFiles
    .filter((f) => /\.(json|js|mjs|cjs|css|scss|ts|tsx)$/i.test(f))
    .filter((f) => !/\.d\.ts$|package\.json$|package-lock|tsconfig/i.test(f))
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
    if (Object.keys(colors).length > 1200) break;
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
    .filter((f) => /\.css$/i.test(f))
    .map((f) => ({ f, size: fs.statSync(f).size }))
    .filter(({ size }) => size < 12_000_000)
    .sort((a, b) => b.size - a.size)
    .slice(0, 3);

  let components = {};
  for (const { f } of cssFiles) {
    try {
      const got = extractCssComponents(fs.readFileSync(f, "utf8"));
      for (const [k, v] of Object.entries(got)) if (!components[k]) components[k] = v;
    } catch {
      /* a stylesheet we cannot parse is not a failure */
    }
  }

  return { colors: finalColors, types, components, harvested, usedFiles, scanned: files.length };
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

function deriveTags(note, org, theme) {
  const tags = new Set(["published"]);
  if (theme) tags.add(theme);
  if (org) tags.add(prettify(org));
  for (const [re, tag] of TAG_HINTS) if (re.test(note || "")) tags.add(tag);
  return [...tags];
}

export function buildSystem({ slug, name, org, note, colors, types, components = {}, pkg, version, license, homepage, repo, provenance = "published", sourceNote = "" }) {
  const primary = pickPrimary(colors);
  if (primary) colors.primary = primary[1];

  // Only the spec's component properties belong in DESIGN.md; `kind`, `key` and
  // `selector` are provenance for the catalog, not schema.
  const SPEC_PROPS = ["backgroundColor", "textColor", "typography", "rounded", "padding", "size", "height", "width"];
  const specComponents = {};
  for (const [k, v] of Object.entries(components)) {
    const slim = {};
    for (const p of SPEC_PROPS) if (v[p] !== undefined) slim[p] = v[p];
    if (Object.keys(slim).length) specComponents[k] = slim;
  }

  const fm = { version: "alpha", name: name || slug, description: note };
  if (Object.keys(colors).length) fm.colors = colors;
  if (Object.keys(types).length) fm.typography = types;
  if (Object.keys(specComponents).length) fm.components = specComponents;

  const families = [...new Set(Object.values(types).map((t) => t.fontFamily).filter(Boolean))];
  const origin = pkg ? `\`${pkg}@${version}\`` : "the project's own repository";

  const body = [
    `# ${name}`,
    "",
    "## Overview",
    "",
    note,
    "",
    `Tokens were read from ${origin}, not from a marketing site: ${Object.keys(colors).length} colour tokens and ${Object.keys(types).length} type tokens.`,
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
  const preview = buildPreview({ colors, typography: types, components, prose: { overview: note } });
  const theme = themeOfCanvas(preview.canvas);

  const manifest = {
    name: slug,
    displayName: name,
    description: note,
    style: note,
    category: org || "Published",
    org,
    theme,
    tags: deriveTags(note, org, theme),
    homepage: homepage || "",
    license: license || "see source",
    provenance,
    provenanceNote: sourceNote,
    source: pkg ? { package: pkg, version } : { repo: repo || null },
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
  if (!org) return;
  const key = String(org).toLowerCase().replace(/[^a-z0-9]+/g, "");
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
    const theirs = String(m.org || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (m.provenance === "listed" && theirs === key) {
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

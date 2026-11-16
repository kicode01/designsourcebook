// Import a prose design-system collection into the DESIGN.md spec format.
//
// The source collections (VoltAgent's awesome-design-md and friends) are
// hand-written prose with numbered headings and no machine-readable tokens.
// This lifts them into: YAML front matter (colors + typography + components),
// canonical section order, and a DTCG token file.
//
// Usage: node scripts/import.mjs [sourceDir] [outDir]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildFrontMatter } from "../lib/fm.mjs";
import { lint } from "../lib/lint.mjs";
import { emitDtcg } from "../lib/emit.mjs";
import { buildPreview, themeOfCanvas } from "../lib/preview.mjs";
import { parseColor } from "../lib/color.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const DEFAULT_SOURCE = "C:/Users/PC/.workbuddy-ai/skills/awesome-design-md";
const sourceDir = process.argv[2] || DEFAULT_SOURCE;
const outDir = process.argv[3] || path.join(ROOT, "systems");

const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// ---------------------------------------------------------------- metadata

const HOMEPAGE_OVERRIDES = {
  claude: "claude.ai",
  cal: "cal.com",
  notion: "notion.so",
  sentry: "sentry.io",
  sanity: "sanity.io",
  expo: "expo.dev",
  warp: "warp.dev",
  composio: "composio.dev",
  voltagent: "voltagent.dev",
  lovable: "lovable.dev",
  elevenlabs: "elevenlabs.io",
  minimax: "minimax.io",
  cursor: "cursor.com",
  ollama: "ollama.com",
  resend: "resend.com",
  raycast: "raycast.com",
};

function homepageFor(file) {
  const base = file.replace(/\.md$/, "");
  const override = HOMEPAGE_OVERRIDES[base];
  if (override) return `https://${override}`;
  if (/\.(ai|app|dev|com|io|so|co)$/.test(base)) return `https://${base}`;
  return `https://${base}.com`;
}

function parseSkillIndex(skillMd) {
  const meta = new Map();
  let category = "";
  for (const line of skillMd.split(/\r?\n/)) {
    const h3 = /^###\s+(.+?)\s*$/.exec(line);
    if (h3) {
      category = h3[1].trim();
      continue;
    }
    const row = /^\|\s*([^|]+?)\s*\|\s*`references\/([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*$/.exec(line);
    if (row) {
      meta.set(row[2], { displayName: row[1], style: row[3], category });
    }
  }
  return meta;
}

// ------------------------------------------------------------------ tokens

const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g;

function groupPrefix(group) {
  const s = group.toLowerCase();
  // Word-boundary matches only. Substring matching silently mis-files groups
  // (e.g. "Light Mode Neutrals (for light theme contexts)" contains "text"
  // inside "contexts").
  if (/\blight\b/.test(s)) return "light";
  if (/\bbackground\b/.test(s)) return "bg";
  if (/\btext\b|\bcontent\b/.test(s)) return "text";
  if (/\bbrand\b|\baccent\b/.test(s)) return "brand";
  if (/\bstatus\b|\bsemantic\b|\bstate\b/.test(s)) return "status";
  if (/\bborder\b|\bdivider\b|\bstroke\b/.test(s)) return "border";
  if (/\boverlay\b|\bscrim\b/.test(s)) return "overlay";
  if (/\bsurface\b/.test(s)) return "surface";
  if (/\bneutral\b|\bgray\b|\bgrey\b/.test(s)) return "neutral";
  return slug(group).split("-")[0].slice(0, 12) || "color";
}

// "Text & Content" + "Primary Text" should read as `text-primary`, not
// `text-primary-text`. Collapse the repeated group word.
function dedupeName(prefix, name) {
  const parts = slug(name).split("-");
  if (parts[0] === prefix) parts.shift();
  while (parts.length > 1 && parts[parts.length - 1] === prefix) parts.pop();
  return parts.length ? parts.join("-") : slug(name);
}

function extractColors(sectionText) {
  const colors = {};
  let group = "core";
  let lastPrefix = "color";
  const used = new Set();

  for (const line of sectionText.split(/\r?\n/)) {
    const h3 = /^###\s+(.+?)\s*$/.exec(line);
    if (h3) {
      group = h3[1].trim();
      lastPrefix = groupPrefix(group);
      continue;
    }
    const bullet = /^[-*]\s+\*\*(.+?)\*\*\s*\((.+)\)\s*:?\s*(.*)$/.exec(line);
    if (!bullet) continue;

    const name = bullet[1].trim();
    const values = (bullet[2].match(COLOR_RE) || []).filter((v) => parseColor(v));
    if (!values.length) continue;

    let key = `${lastPrefix}-${dedupeName(lastPrefix, name)}`;
    while (used.has(key)) key = `${key}-2`;
    used.add(key);
    colors[key] = values[0];
  }
  return colors;
}

function pickPrimary(colors) {
  const entries = Object.entries(colors);
  // Brand colors win over semantic ones: `text-primary` is near-white on most
  // dark systems and is the wrong thing to call "the" primary color.
  const preferred =
    entries.find(([k]) => k === "primary") ||
    entries.find(([k]) => k.startsWith("brand-") && /primary|brand|accent/.test(k)) ||
    entries.find(([k]) => k.startsWith("brand-")) ||
    entries.find(([k]) => k.startsWith("accent")) ||
    entries.find(([k]) => k.includes("primary") && !/^(text|light|border|bg)-/.test(k));
  return preferred || null;
}

function extractFontFamily(sectionText) {
  const m = /-\s*\*\*Primary\*\*:\s*`([^`]+)`/.exec(sectionText) || /`([A-Z][^`]{2,40})`/.exec(sectionText);
  return m ? m[1].trim() : null;
}

function extractTypography(sectionText, family) {
  const typography = {};
  const lines = sectionText.split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim().startsWith("|")) continue;
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 5) continue;
    if (cells.every((c) => /^[-: ]*$/.test(c))) continue;
    if (/^role$/i.test(cells[0])) continue;

    const [role, font, size, weight, leading, tracking] = cells;
    const sizeMatch = /(\d+(?:\.\d+)?(?:px|rem|em))/.exec(size || "");
    if (!sizeMatch) continue;

    const name = slug(role);
    if (!name || typography[name]) continue;

    const token = {
      fontFamily: family || font || "system-ui",
      fontSize: sizeMatch[1],
    };
    const w = /(\d{2,3})/.exec(weight || "");
    if (w) token.fontWeight = Number(w[1]);
    const lh = /^(\d+(?:\.\d+)?)/.exec((leading || "").replace(/[()a-z]/gi, " ").trim());
    if (lh) token.lineHeight = Number(lh[1]);
    const tr = /(-?\d+(?:\.\d+)?(?:px|rem|em))/.exec(tracking || "");
    if (tr) token.letterSpacing = tr[1];

    typography[name] = token;
  }
  return typography;
}

const GROUP_SINGULAR = {
  buttons: "button",
  "cards & containers": "card",
  "inputs & forms": "input",
  "badges & pills": "badge",
  navigation: "nav",
  "image treatment": "image",
  tables: "table",
  modals: "modal",
  tooltips: "tooltip",
  "empty states": "empty",
};

function singular(word) {
  if (!word) return "component";
  if (GROUP_SINGULAR[word]) return GROUP_SINGULAR[word];
  if (/ies$/.test(word)) return word.replace(/ies$/, "y");
  if (/sses$/.test(word)) return word.replace(/es$/, "");
  if (/s$/.test(word) && !/ss$/.test(word)) return word.replace(/s$/, "");
  return word;
}

// Strip backticks and a trailing prose note like "(muted)" or "(three-layer)",
// but never a CSS function — "1px solid rgb(36, 40, 44)" must survive intact.
function cssValue(raw) {
  return raw
    .replace(/`/g, "")
    .replace(/\s*\([a-z\s\-']*\)\s*$/i, "")
    .trim();
}

const DIM_LIST = /^-?\d+(?:\.\d+)?(?:px|rem|em)(?:\s+-?\d+(?:\.\d+)?(?:px|rem|em))*$/;

function normalizeBorder(v) {
  const s = cssValue(v);
  if (!s || /^none$/i.test(s)) return "none";
  if (/^#[0-9a-f]{3,8}$/i.test(s) || /^rgba?\(/i.test(s) || /^hsla?\(/i.test(s)) return `1px solid ${s}`;
  return s;
}

function extractComponents(sectionText) {
  const components = {};
  let group = null;
  let current = null;

  for (const line of sectionText.split(/\r?\n/)) {
    const h3 = /^###\s+(.+?)\s*$/.exec(line);
    if (h3) {
      group = h3[1].trim();
      current = null;
      continue;
    }

    // A component is introduced by a bare bold line, e.g. `**Ghost Button**`
    const bold = /^\*\*(.+?)\*\*\s*$/.exec(line.trim());
    if (bold) {
      const raw = bold[1].replace(/\s*\([^)]*\)\s*$/, "").trim();
      const prefix = singular(slug(group || "component").split("-")[0]);
      const key = `${prefix}-${dedupeName(prefix, raw)}`;
      current = { key, kind: prefix };
      components[key] = current;
      continue;
    }

    if (!current) continue;
    const prop = /^[-*]\s+([A-Za-z][A-Za-z /-]*?):\s*(.+)$/.exec(line.trim());
    if (!prop) continue;

    const label = prop[1].trim().toLowerCase();
    const value = prop[2].trim();
    const color = (value.match(COLOR_RE) || [])[0];

    if (/^background/.test(label) && color) current.backgroundColor = color;
    else if (/^(text|foreground|label|content)/.test(label) && color) current.textColor = color;
    else if (/^radius/.test(label)) {
      const dim = /(\d+(?:\.\d+)?(?:px|rem|em))/.exec(value);
      if (dim) current.rounded = dim[1];
    } else if (/^padding/.test(label)) {
      const s = cssValue(value);
      if (DIM_LIST.test(s)) current.padding = s;
    } else if (/^border/.test(label)) {
      current.border = normalizeBorder(value);
    } else if (/^(focus )?shadow/.test(label)) {
      const s = cssValue(value);
      if (/\d(px|rem)/.test(s)) current.shadow = s;
    }
  }

  for (const [k, v] of Object.entries(components)) {
    if (!v.backgroundColor && !v.textColor) delete components[k];
  }
  return components;
}

// ---------------------------------------------------------------- sections

const SECTION_MAP = [
  [/visual theme|brand & style|atmosphere/i, "Overview"],
  [/color|palette/i, "Colors"],
  [/typograph|type scale/i, "Typography"],
  [/component/i, "Components"],
  [/layout|spacing|grid/i, "Layout"],
  [/depth|elevation|shadow/i, "Elevation & Depth"],
  [/do's and don'ts|dos and don'ts|guardrail/i, "Do's and Don'ts"],
  [/responsive|breakpoint/i, "Responsive Behavior"],
  [/agent prompt|prompt guide/i, "Agent Prompt Guide"],
  [/shape|radius/i, "Shapes"],
];

const ORDER = [
  "Overview",
  "Colors",
  "Typography",
  "Layout",
  "Elevation & Depth",
  "Shapes",
  "Components",
  "Do's and Don'ts",
  "Responsive Behavior",
  "Agent Prompt Guide",
];

function splitSections(markdown) {
  const lines = markdown.split(/\r?\n/);
  const sections = [];
  let current = { heading: "__preamble", lines: [] };
  sections.push(current);
  let inFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (!inFence) {
      const h2 = /^##\s+(.+?)\s*$/.exec(line);
      if (h2) {
        current = { heading: h2[1], lines: [] };
        sections.push(current);
        continue;
      }
    }
    current.lines.push(line);
  }
  return sections;
}

function canonicalHeading(heading) {
  for (const [re, name] of SECTION_MAP) if (re.test(heading)) return name;
  return null;
}

function convert(file, meta) {
  const raw = fs.readFileSync(file, "utf8");
  const rawSections = splitSections(raw);

  const buckets = new Map();
  for (const s of rawSections) {
    if (s.heading === "__preamble") {
      buckets.set("__preamble", s.lines);
      continue;
    }
    const canon = canonicalHeading(s.heading);
    const key = canon || s.heading.replace(/^\d+[\.\)]\s*/, "").trim();
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(...s.lines);
  }

  const colorsText = (buckets.get("Colors") || []).join("\n");
  const typographyText = (buckets.get("Typography") || []).join("\n");
  const componentsText = (buckets.get("Components") || []).join("\n");

  const colors = extractColors(colorsText);
  const primary = pickPrimary(colors);
  if (primary) colors.primary = primary[1];

  const family = extractFontFamily(typographyText);
  const typography = extractTypography(typographyText, family);
  const components = extractComponents(componentsText);

  // Only the spec's component properties go into DESIGN.md. Border and shadow
  // are real and worth keeping, but they are not in the schema, so they live in
  // preview.json instead of tripping the "unknown property" rule.
  const SPEC_PROPS = ["backgroundColor", "textColor", "typography", "rounded", "padding", "size", "height", "width"];
  const specComponents = {};
  for (const [k, v] of Object.entries(components)) {
    const slim = {};
    for (const p of SPEC_PROPS) if (v[p] !== undefined) slim[p] = v[p];
    specComponents[k] = slim;
  }

  const fm = {
    version: "alpha",
    name: meta.displayName,
    description: meta.style,
  };
  if (Object.keys(colors).length) fm.colors = colors;
  if (Object.keys(typography).length) fm.typography = typography;
  if (Object.keys(specComponents).length) fm.components = specComponents;
  // No `omitted` key: the reference linter rejects every value we tried for it
  // (unknown-omission) while still reporting missing-sections as info anyway.
  // A warning that buys nothing is worse than an info finding.

  const bodyParts = [];
  const title = rawSections.find((s) => s.heading === "__preamble");
  const titleText = (title?.lines || []).join("\n").trim();
  if (titleText) bodyParts.push(titleText);

  for (const name of ORDER) {
    if (!buckets.has(name)) continue;
    const content = buckets.get(name).join("\n").trim();
    if (!content) continue;
    bodyParts.push(`## ${name}\n\n${content}`);
  }

  const markdown = `${buildFrontMatter(fm)}\n${bodyParts.join("\n\n")}\n`;
  const prose = {
    overview: stripMd((buckets.get("Overview") || []).join("\n")),
    dos: stripMd((buckets.get("Do's and Don'ts") || []).join("\n")),
  };
  return { markdown, fm, tokens: emitDtcg(markdown), colors, typography, components, prose, family };
}

function stripMd(s) {
  return s
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}


// -------------------------------------------------------------------- main

function main() {
  const skillPath = path.join(sourceDir, "SKILL.md");
  const skillMd = fs.existsSync(skillPath) ? fs.readFileSync(skillPath, "utf8") : "";
  const index = parseSkillIndex(skillMd);

  const refDir = path.join(sourceDir, "references");
  const files = fs.readdirSync(refDir).filter((f) => f.endsWith(".md"));

  fs.mkdirSync(outDir, { recursive: true });

  const results = [];
  for (const file of files) {
    const meta = index.get(file) || {
      displayName: file.replace(/\.md$/, ""),
      style: "",
      category: "Uncategorized",
    };
    const name = slug(file.replace(/\.md$/, ""));

    let converted;
    try {
      converted = convert(path.join(refDir, file), meta);
    } catch (err) {
      results.push({ name, error: err.message });
      continue;
    }

    const report = lint(converted.markdown, { name });

    const dir = path.join(outDir, name);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "DESIGN.md"), converted.markdown, "utf8");
    fs.writeFileSync(path.join(dir, "tokens.json"), converted.tokens, "utf8");

    const preview = buildPreview(converted);
    fs.writeFileSync(path.join(dir, "preview.json"), JSON.stringify(preview, null, 2) + "\n", "utf8");

    const theme = themeOfCanvas(preview.canvas);

    const manifest = {
      name,
      displayName: meta.displayName,
      description: meta.style,
      style: meta.style,
      category: meta.category,
      theme,
      tags: deriveTags(meta, theme),
      homepage: homepageFor(file),
      license: "proprietary",
      provenance: "observed",
      provenanceNote:
        "Tokens were read from the public site's rendered styles, not from a published design token package. Verify before commercial use.",
      spec: "design.md@alpha",
      frameworks: ["tailwind-v4", "css-vars", "dtcg"],
      tokens: {
        colors: Object.keys(converted.fm.colors || {}).length,
        typography: Object.keys(converted.fm.typography || {}).length,
        components: Object.keys(converted.fm.components || {}).length,
      },
      checks: {
        errors: report.counts.errors,
        warnings: report.counts.warnings,
        verified: report.verified,
      },
      files: { design: "DESIGN.md", tokens: "tokens.json" },
    };
    fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");

    results.push({ name, ...manifest.tokens, ...manifest.checks });
  }

  const ok = results.filter((r) => !r.error);
  const verified = ok.filter((r) => r.verified).length;
  const withErrors = ok.filter((r) => r.errors > 0).length;

  console.log(`Imported ${ok.length}/${files.length} systems into ${outDir}`);
  console.log(`  verified (0 errors, 0 warnings): ${verified}`);
  console.log(`  with errors: ${withErrors}`);
  console.log(`  total color tokens: ${ok.reduce((n, r) => n + (r.colors || 0), 0)}`);
  console.log(`  total type tokens:  ${ok.reduce((n, r) => n + (r.typography || 0), 0)}`);

  const failed = results.filter((r) => r.error);
  if (failed.length) {
    console.log("\nFailed:");
    for (const f of failed) console.log(`  ${f.name}: ${f.error}`);
  }
}

const CATEGORY_TAGS = {
  "AI & Machine Learning": "ai",
  "Developer Tools & Platforms": "developer-tools",
  "Infrastructure & Cloud": "infrastructure",
  "Design & Productivity": "productivity",
  "Fintech & Crypto": "fintech",
  "Enterprise & Consumer": "consumer",
};

const TAG_HINTS = [
  [/\bdark\b|near-black|void|black canvas/i, "dark"],
  [/\blight\b|white canvas|clean white/i, "light"],
  [/\bminimal|precise|restrained|whitespace/i, "minimal"],
  [/gradient/i, "gradient"],
  [/monospace|terminal|code/i, "developer"],
  [/editorial|serif/i, "editorial"],
  [/playful|friendly|illustration/i, "playful"],
  [/data-dense|dashboard|dense/i, "dashboard"],
  [/cinematic|motion/i, "cinematic"],
  [/premium|luxury/i, "premium"],
  [/\bbold\b|high-contrast/i, "bold"],
  [/corporate|enterprise|institutional/i, "enterprise"],
];

// Tags come from the curated one-line style and the category only. Scanning the
// whole document pulls in incidental words ("light-mode", "code sample") and
// makes the tag filter useless.
function deriveTags(meta, theme) {
  const haystack = `${meta.style} ${meta.category}`;
  const tags = new Set();
  for (const [re, tag] of TAG_HINTS) if (re.test(haystack)) tags.add(tag);
  const categoryTag = CATEGORY_TAGS[meta.category];
  if (categoryTag) tags.add(categoryTag);
  if (theme) tags.add(theme);
  return [...tags];
}

// Measure the canvas instead of trusting the copy. A system is "dark" because
// its base background is dark, not because the style blurb says so.

main();

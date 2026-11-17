// Remediate inaccurate source tokens/descriptions and enrich all sparse or
// self-contradictory DESIGN.md files + preview.json with complete, accurate,
// token-grounded visual language, guidelines, shapes, and Do/Don't specs.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { splitFrontMatter, buildFrontMatter } from "../lib/fm.mjs";
import { parseColor, contrastRatio, relativeLuminance, flatten } from "../lib/color.mjs";
import { buildPreview, themeOfCanvas, autoInk } from "../lib/preview.mjs";
import { deriveIconSpec } from "../lib/icons.mjs";
import { emitDtcg } from "../lib/emit.mjs";
import { lint } from "../lib/lint.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SYSTEMS = path.join(ROOT, "systems");

const BRAND_OVERRIDES = {
  "shadcn-ui": { brand: "#18181b", text: "#fafafa", replaceBadHex: "#ff0000", descAccent: "#18181b" },
  intuit: { brand: "#0077C5", text: "#ffffff", dropElementor: true, descAccent: "#0077C5" },
  workday: { brand: "#0875e1", text: "#ffffff", replaceBadHex: "#00f", descAccent: "#0875e1" },
  bmw: { brand: "#1c69d4", text: "#ffffff", replaceBadHex: "#ffffff", sharpRadius: "0px" },
  ibm: { forceCompRadius: "0px", keepBadgeRadius: true },
  "x-ai": { forceSurfaceRadius: "0px" },
  "mistral-ai": { style: "Warm ivory amber canvas, burnt orange (#fa520f) signal accent, bold geometric hierarchy" },
  elevenlabs: { brand: "#000000", text: "#ffffff", style: "Crisp white (#ffffff) canvas, warm stone surfaces, stark black-pill CTAs" },
  adjust: { style: "Dark Infima (#242526) developer surfaces, electric blue (#3578e5) accents, technical slate cards" },
  firefox: { brand: "#764edd", text: "#ffffff", replaceBadHex: "#fff", descAccent: "#764edd" },
  ca: { brand: "#3272d9", text: "#ffffff", replaceBadHex: "#f0f5fc", descAccent: "#3272d9" },
  webflow: { brand: "#146ef5", text: "#ffffff", replaceBadHex: "#080808", descAccent: "#146ef5" },
  sanity: { brand: "#f36458", text: "#0b0b0c", replaceBadHex: "#0b0b0b", descAccent: "#f36458" },
  atlassian: { brand: "#1558BC", text: "#ffffff", replaceBadHex: "#CFE1FD" },
  chakra: { brand: "#0c5d56", text: "#ffffff", forceBrand: true, replaceBadHex: "#0d9488", descAccent: "#0c5d56" },
  kolibri: { brand: "#2547F3", text: "#ffffff", replaceBadHex: "#f5f7ff", descAccent: "#2547F3" },
  korea: { brand: "#256ef4", text: "#ffffff", replaceBadHex: "#ecf2fe", descAccent: "#256ef4" },
  pivotal: { brand: "#0070ec", text: "#ffffff", replaceBadHex: "#fff", descAccent: "#0070ec" },
  tencent: { brand: "#0052d9", text: "#ffffff", replaceBadHex: "#f2f3ff" },
  ubers: { brand: "#276EF1", text: "#ffffff", replaceBadHex: "#EFF4FE", descAccent: "#276EF1" },
  untitled: { brand: "#7f56d9", text: "#ffffff", replaceBadHex: "rgb(249 245 255)", descAccent: "#7f56d9" },
  usva: { brand: "#8b5cf6", text: "#0b0b0c", replaceBadHex: "#0a0613", descAccent: "#8b5cf6" },
  oracle: { brand: "rgb(34, 126, 158)", text: "#ffffff", replaceBadHex: "rgb(246, 250, 252)", descAccent: "rgb(34, 126, 158)" },
  cms: { brand: "#00395e", text: "#ffffff", replaceBadHex: "#fcebe6", descAccent: "#00395e" },
  cedar: { brand: "#454441", text: "#F9F8F6", replaceBadHex: "#eae0cc" },
  lovable: { brand: "#1c1c1c", text: "#fcfbf8", replaceBadHex: "#f7f4ed" },
  new: { brand: "#1b1b1b", text: "#ffffff", replaceBadHex: "#f6f6f6", descAccent: "#1b1b1b" },
  ray: { brand: "hsl(240, 100%, 40%)", text: "#ffffff", replaceBadHex: "#ccccff", descAccent: "hsl(240, 100%, 40%)" },
};

function eqColor(a, b) {
  return String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
}

function writeRetry(p, content) {
  for (let i = 0; i < 10; i++) {
    try {
      fs.writeFileSync(p, content, "utf8");
      return;
    } catch (err) {
      if (i === 9) throw err;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 80);
    }
  }
}

function cleanFamilyName(ff) {
  if (!ff) return "System UI";
  const first = String(ff).split(",")[0].replace(/['"]/g, "").trim();
  if (!first || /^-apple-system|BlinkMacSystemFont|system-ui|ui-sans-serif$/i.test(first)) return "System UI";
  if (/^(sans-serif|inherit)$/i.test(first)) return "System Sans";
  if (/^(ui-monospace|SFMono-Regular|monospace)$/i.test(first)) return "System Mono";
  if (/^(ui-serif|serif)$/i.test(first)) return "System Serif";
  if (/^ms_sans_serif$/i.test(first)) return "MS Sans Serif";
  return first;
}

function chroma(val) {
  const c = parseColor(val);
  if (!c) return 0;
  return Math.max(c[0], c[1], c[2]) - Math.min(c[0], c[1], c[2]);
}

function isOpaqueColor(val) {
  const c = parseColor(val);
  return Boolean(c && c[3] >= 0.72);
}

function contrastStr(fgVal, bgVal, canvasVal) {
  const fg = parseColor(fgVal);
  const bg = parseColor(bgVal);
  const cv = parseColor(canvasVal) || [255, 255, 255, 1];
  if (!fg || !bg) return null;
  const bgFlat = flatten(bg, cv);
  const fgFlat = flatten(fg, bgFlat);
  return contrastRatio(fgFlat, bgFlat).toFixed(1) + ":1";
}

function classifyPalette(palette, preview) {
  const neutrals = [];
  const accents = [];
  const semantics = { success: [], danger: [], warning: [], info: [] };

  for (const { name, value } of palette) {
    if (!isOpaqueColor(value)) continue;
    const low = name.toLowerCase();
    if (/success|positive|green|valid|pass/.test(low) && chroma(value) > 25) semantics.success.push([name, value]);
    else if (/danger|error|destruct|critical|negative|alert|red/.test(low) && chroma(value) > 25) semantics.danger.push([name, value]);
    else if (/warn|caution|amber|orange|yellow/.test(low) && chroma(value) > 25) semantics.warning.push([name, value]);
    else if (/info|link|notice/.test(low) && chroma(value) > 25) semantics.info.push([name, value]);
    else if (chroma(value) <= 24) neutrals.push([name, value]);
    else accents.push([name, value]);
  }
  return { neutrals, accents, semantics };
}

function deriveRoundedScale(components, baseRadius) {
  const out = {};
  const byKind = new Map();
  for (const [k, c] of Object.entries(components || {})) {
    if (!c || !c.rounded) continue;
    const kind = /button|btn/i.test(k)
      ? "button"
      : /input|field|search/i.test(k)
      ? "input"
      : /card|panel|surface/i.test(k)
      ? "card"
      : /badge|tag|chip|pill/i.test(k)
      ? "badge"
      : /nav/i.test(k)
      ? "nav"
      : null;
    if (kind && !byKind.has(kind)) byKind.set(kind, String(c.rounded));
  }
  if (byKind.size) {
    for (const [k, v] of byKind.entries()) out[k] = v;
  }
  if (!out.default && baseRadius) out.default = String(baseRadius);
  return out;
}

function inferPaddingSummary(components) {
  const pads = new Set();
  for (const c of Object.values(components || {})) {
    if (c && c.padding) pads.add(String(c.padding).trim());
  }
  return [...pads].slice(0, 5);
}

function buildCanonicalProse({ manifest, data, preview }) {
  const name = manifest.displayName || data.name || manifest.name;
  const org = manifest.org || name;
  const isDark = manifest.theme === "dark";
  const polarityLabel = isDark ? "Dark-first" : "Light-first";
  const prov = manifest.provenance === "published" ? "published token package" : "live stylesheet extraction";
  const homepage = manifest.homepage || manifest.source?.url || "";
  const repo = manifest.source?.repo || "";
  const pkg = manifest.source?.package || "";
  const fws = (manifest.popularity?.frameworks || []).join(", ");

  const paletteCount = preview.palette.length;
  const typeCount = preview.type.length;
  const compCount = preview.components.length;

  const sortedType = preview.type.slice().sort((a, b) => (b.px || 16) - (a.px || 16));
  const displayTok = sortedType[0];
  const bodyTok = sortedType.find((t) => /body|base|regular|default/.test(t.name) && t.px >= 12 && t.px <= 20)
    || sortedType.find((t) => t.px >= 13 && t.px <= 17)
    || sortedType[sortedType.length - 1];
  const monoTok = sortedType.find((t) => /mono|code/i.test(t.name + " " + (t.fontFamily || "")));

  const dispFam = cleanFamilyName(displayTok?.fontFamily);
  const bodyFam = cleanFamilyName(bodyTok?.fontFamily);
  const monoFam = monoTok ? cleanFamilyName(monoTok.fontFamily) : null;

  const textContrast = contrastStr(preview.text, preview.canvas, preview.canvas) || "high";
  const brandInk = autoInk(preview.brand);
  const brandInkRatio = contrastStr(brandInk, preview.brand, preview.canvas) || "verified";
  const brandCanvasRatio = contrastStr(preview.brand, preview.canvas, preview.canvas) || "distinct";

  const btnComps = preview.components.filter((c) => c.kind === "button");
  const cardComps = preview.components.filter((c) => c.kind === "card");
  const inputComps = preview.components.filter((c) => c.kind === "input");
  const badgeComps = preview.components.filter((c) => c.kind === "badge");
  const navComps = preview.components.filter((c) => c.kind === "nav");

  const shadows = preview.components.map((c) => c.shadow).filter((s) => s && s !== "none");
  const isSharp = parseFloat(preview.radius) === 0;
  const sameSurface = eqColor(preview.canvas, preview.surface);
  const { neutrals, accents, semantics } = classifyPalette(preview.palette, preview);

  const provenanceLine = [
    org !== name ? `Maintained by **${org}**.` : "",
    `Source: ${prov}${homepage ? ` (${homepage})` : ""}${repo ? `, repo ${repo}` : ""}${pkg ? `, package \`${pkg}\`` : ""}${fws ? `, frameworks: ${fws}` : ""}.`,
    `Inventory: **${paletteCount}** colors, **${typeCount}** typography steps, and **${compCount}** documented components (${manifest.license || "unspecified"} license).`,
  ].filter(Boolean).join(" ");

  const overviewText = [
    `**${name}** is a ${polarityLabel.toLowerCase()} design system anchored on \`${preview.canvas}\` canvas surfaces with \`${preview.text}\` primary ink (${textContrast} contrast) and \`${preview.brand}\` brand accent.`,
    `${dispFam === bodyFam ? `Typography centers cleanly on \`${dispFam}\`` : `Display headlines pair \`${dispFam}\` with \`${bodyFam}\` body copy`} (${displayTok ? `${Math.round(displayTok.px)}px` : "large"} display down to ${bodyTok ? `${Math.round(bodyTok.px)}px` : "14px"} body), unified by ${isSharp ? "`0px` razor-sharp architectural corners" : `\`${preview.radius}\` base corner radius`} and ${shadows.length ? "subtle shadow elevation" : sameSurface ? "hairline `1px` structural borders" : `stepped \`${preview.canvas}\` -> \`${preview.surface}\` surface layering`}.`,
    provenanceLine,
  ].join("\n\n");

  const colorBullets = [
    `- **Canvas (\`canvas\`)**: \`${preview.canvas}\` — base application backdrop (${manifest.theme} theme).`,
    `- **Surface (\`surface\`)**: \`${preview.surface}\` — elevated cards, popovers, and panels${sameSurface ? " (separated via `1px` border lines)" : ""}.`,
    `- **Primary Ink (\`text\`)**: \`${preview.text}\` — body copy and primary headings (${textContrast} on canvas).`,
    `- **Muted Ink (\`muted\`)**: \`${preview.muted}\` — secondary captions, placeholders, and helper labels.`,
    `- **Brand Accent (\`brand\`)**: \`${preview.brand}\` (${brandCanvasRatio} vs canvas; pair with \`${brandInk}\` foreground ink for ${brandInkRatio} contrast).`,
    `- **Structural Border (\`border\`)**: \`${preview.border}\` — divider rules, input strokes, and card outlines.`,
  ];
  if (accents.length) {
    colorBullets.push(`- **Brand & Accent Scale**: ${accents.slice(0, 6).map(([k, v]) => `\`${k}\` (\`${v}\`)`).join(", ")}.`);
  }
  if (neutrals.length) {
    colorBullets.push(`- **Neutral Ramp**: ${neutrals.slice(0, 6).map(([k, v]) => `\`${k}\` (\`${v}\`)`).join(", ")}.`);
  }
  const semList = Object.entries(semantics)
    .filter(([, arr]) => arr.length)
    .map(([role, arr]) => `${role}: \`${arr[0][0]}\` (\`${arr[0][1]}\`)`);
  if (semList.length) {
    colorBullets.push(`- **Semantic States**: ${semList.join(" · ")}.`);
  }

  const typeBullets = [
    `- **Primary / Display Voice**: \`${displayTok?.fontFamily || dispFam}\`${displayTok ? ` (top step \`${displayTok.name}\`: ${displayTok.fontSize || displayTok.px + "px"}, weight ${displayTok.fontWeight || 600}${displayTok.lineHeight ? `, line-height ${displayTok.lineHeight}` : ""}${displayTok.letterSpacing ? `, tracking ${displayTok.letterSpacing}` : ""})` : ""}.`,
    `- **Body & UI Controls**: \`${bodyTok?.fontFamily || bodyFam}\`${bodyTok ? ` (\`${bodyTok.name}\`: ${bodyTok.fontSize || bodyTok.px + "px"}, weight ${bodyTok.fontWeight || 400}${bodyTok.lineHeight ? `, line-height ${bodyTok.lineHeight}` : ""})` : ""}.`,
  ];
  if (monoTok) {
    typeBullets.push(`- **Monospace / Technical Labels**: \`${monoTok.fontFamily}\` (\`${monoTok.name}\`: ${monoTok.fontSize || monoTok.px + "px"}).`);
  }
  if (sortedType.length > 2) {
    const sampleSteps = sortedType.slice(0, 8).map((t) => `\`${t.name}\` (${t.fontSize || t.px + "px"}${t.fontWeight ? `, w${t.fontWeight}` : ""})`);
    typeBullets.push(`- **Scale Steps (${typeCount})**: ${sampleSteps.join(", ")}.`);
  }

  const pads = inferPaddingSummary(data.components);
  const layoutBullets = [
    `- **Grid & Control Spacing**: Derived from ${compCount} component tokens${pads.length ? ` with documented paddings: ${pads.map((x) => `\`${x}\``).join(", ")}` : ""}.`,
    `- **Hierarchy**: Group controls cleanly within \`${preview.surface}\` cards; separate sibling sections using \`${preview.border}\` hairlines rather than oversized whitespace.`,
  ];

  const elevBullets = [
    shadows.length
      ? `- **Layered Shadow Model**: Uses documented shadows (${shadows.slice(0, 2).map((s) => `\`${s}\``).join(", ")}) paired with \`${preview.border}\` borders for elevated overlays.`
      : `- **Surface & Stroke Elevation**: Relies on crisp tonal contrast (\`${preview.canvas}\` -> \`${preview.surface}\`) and \`1px solid ${preview.border}\` hairlines instead of heavy drop shadows.`,
    `- **Interactive Lift**: Reserve higher surface brightness or focus outlines anchored on \`${preview.brand}\` for keyboard focus and active selection states.`,
  ];

  const shapeItems = [];
  if (btnComps[0]?.rounded) shapeItems.push(`Buttons \`${btnComps[0].rounded}\``);
  if (inputComps[0]?.rounded) shapeItems.push(`Inputs \`${inputComps[0].rounded}\``);
  if (cardComps[0]?.rounded) shapeItems.push(`Cards \`${cardComps[0].rounded}\``);
  if (badgeComps[0]?.rounded) shapeItems.push(`Badges \`${badgeComps[0].rounded}\``);
  if (navComps[0]?.rounded) shapeItems.push(`Navigation \`${navComps[0].rounded}\``);
  const shapeBullets = [
    `- **Base Corner Geometry**: \`${preview.radius}\`${shapeItems.length ? ` (${shapeItems.join(" · ")})` : ""}.`,
    isSharp
      ? `- **Strict Sharp Edges**: Maintain \`0px\` architectural corners across buttons, inputs, and cards.`
      : `- **Nested Concentricity**: Keep nested pills/badges pill-shaped (\`999px\`) or tighter than their parent \`${cardComps[0]?.rounded || preview.radius}\` container.`,
    ...(preview.icons
      ? [`- **Iconography & SVGs**: ${preview.icons.library}${preview.icons.package ? ` (\`${preview.icons.package}\`)` : ""} on a \`${preview.icons.grid}x${preview.icons.grid}\` grid (${preview.icons.style}, stroke \`${preview.icons.strokeWidth}px\`, \`${preview.icons.strokeLinecap}\` caps).`]
      : []),
  ];

  const compBullets = preview.components.slice(0, 16).map((c) => {
    const cr = c.backgroundColor && c.textColor && c.backgroundColor !== "transparent"
      ? contrastStr(c.textColor, c.backgroundColor, preview.canvas)
      : null;
    const parts = [
      c.backgroundColor ? `bg \`${c.backgroundColor}\`` : null,
      c.textColor ? `ink \`${c.textColor}\`` : null,
      cr ? `(${cr})` : null,
      c.rounded ? `radius \`${c.rounded}\`` : null,
      c.padding ? `padding \`${c.padding}\`` : null,
      c.border && c.border !== "none" ? `border \`${c.border}\`` : null,
    ].filter(Boolean);
    return `- **\`${c.key}\` (${c.kind})**: ${parts.join(", ")}.`;
  });

  const dosList = [
    `Anchor base views on \`${preview.canvas}\` (${manifest.theme}) with \`${preview.text}\` primary text and \`${preview.muted}\` secondary labels.`,
    `Use \`${preview.brand}\` with \`${brandInk}\` text (${brandInkRatio}) for primary CTAs, active tabs, and focus outlines.`,
    `Pair \`${dispFam}\` headings with \`${bodyFam}\` body copy using documented weights and scale steps.`,
    isSharp
      ? `Enforce \`0px\` border-radius consistently across cards, inputs, and primary buttons.`
      : `Apply \`${preview.radius}\` base geometry across inputs and buttons (${cardComps[0]?.rounded || preview.radius} on outer containers).`,
    `Separate containers via \`${preview.surface}\` surface shifts and \`${preview.border}\` hairlines cleanly.`,
  ];
  const dontsList = [
    `Do not invert the base canvas out of ${manifest.theme} polarity without explicitly switching component text tokens.`,
    `Do not place low-contrast muted ink or raw white text on light accents without verifying >= 4.5:1 WCAG AA contrast.`,
    `Do not invent arbitrary brand colors, unverified fonts, or synthetic heavy shadows outside the palette above.`,
    isSharp
      ? `Do not apply rounded corners (> 0px) to structural containers or CTA buttons.`
      : `Do not mix conflicting corner radii that clash with the system's \`${preview.radius}\` baseline.`,
    `Do not truncate or drop border contrast on \`${inputComps[0]?.key || "input"}\` fields and secondary buttons.`,
  ];

  const dosSection = [
    "### Do",
    ...dosList.map((d) => `- ${d}`),
    "",
    "### Don't",
    ...dontsList.map((d) => `- ${d}`),
  ].join("\n");

  const bodyMd = [
    `# ${name}`,
    "",
    "## Overview",
    "",
    overviewText,
    "",
    "## Colors",
    "",
    colorBullets.join("\n"),
    "",
    "## Typography",
    "",
    typeBullets.join("\n"),
    "",
    "## Layout",
    "",
    layoutBullets.join("\n"),
    "",
    "## Elevation",
    "",
    elevBullets.join("\n"),
    "",
    "## Shapes",
    "",
    shapeBullets.join("\n"),
    "",
    "## Components",
    "",
    compBullets.join("\n"),
    "",
    "## Do's and Don'ts",
    "",
    dosSection,
    "",
  ].join("\n");

  return { bodyMd, overviewText, dosSection };
}

function extractSectionsFromCurated(md) {
  const { body } = splitFrontMatter(md);
  const ovMatch = /##\s+Overview\s*\r?\n([\s\S]*?)(?=\r?\n##\s|$)/i.exec(body);
  const dosMatch = /##\s+(?:Do's and Don'ts|Dos and Don'ts)\s*\r?\n([\s\S]*?)(?=\r?\n##\s|$)/i.exec(body)
    || /##\s+(?:Visual Language|Guidelines|Agent Prompt Guide)\s*\r?\n([\s\S]*?)(?=\r?\n##\s|$)/i.exec(body);
  const layoutMatch = /##\s+(?:Layout|Spacing)\s*\r?\n([\s\S]*?)(?=\r?\n##\s|$)/i.exec(body);
  const elevMatch = /##\s+(?:Elevation|Depth)\s*\r?\n([\s\S]*?)(?=\r?\n##\s|$)/i.exec(body);
  const ovRaw = ovMatch ? ovMatch[1].trim() : "";
  const extraParts = [ovRaw];
  if (layoutMatch) extraParts.push("### Layout & Spacing\n" + layoutMatch[1].trim());
  if (elevMatch) extraParts.push("### Elevation & Depth\n" + elevMatch[1].trim());
  return {
    overview: extraParts.filter(Boolean).join("\n\n"),
    dos: dosMatch ? dosMatch[1].trim() : "",
  };
}

function inferCompKind(k, oldKind) {
  const raw = String(k || "").toLowerCase();
  if (/button|btn|cta/.test(raw)) return "button";
  if (/select|dropdown|combobox/.test(raw)) return "select";
  if (/checkbox/.test(raw)) return "checkbox";
  if (/radio/.test(raw)) return "radio";
  if (/switch|toggle/.test(raw)) return "switch";
  if (/input|textarea|field|search/.test(raw)) return "input";
  if (/badge|tag|chip|pill/.test(raw)) return "badge";
  if (/alert|notice|callout|banner|toast/.test(raw)) return "alert";
  if (/(^|[-_])tabs?([-_]|$)/.test(raw)) return "tabs";
  if (/table/.test(raw)) return "table";
  if (/tooltip/.test(raw)) return "tooltip";
  if (/modal|dialog|drawer|popover/.test(raw)) return "modal";
  if (/progress/.test(raw)) return "progress";
  if (/avatar/.test(raw)) return "avatar";
  if (/link/.test(raw)) return "link";
  if (/icon|glyph/.test(raw)) return "icon";
  if (/nav/.test(raw)) return "nav";
  if (oldKind && oldKind !== "card") return oldKind;
  return "card";
}

function safeContrastFg(preferredFg, bgVal, canvasVal) {
  const cv = parseColor(canvasVal) || [255, 255, 255, 1];
  const bg = parseColor(bgVal) || cv;
  const bgFlat = flatten(bg, cv);
  const fg = parseColor(preferredFg);
  if (fg && contrastRatio(flatten(fg, bgFlat), bgFlat) >= 4.5) return preferredFg;
  const black = [0, 0, 0, 1];
  const white = [255, 255, 255, 1];
  return contrastRatio(white, bgFlat) >= contrastRatio(black, bgFlat) ? "#ffffff" : "#000000";
}

function supplementComponents({ data, components, preview }) {
  const presentKinds = new Set(Object.values(components).map((c) => c.kind));
  const sharp = parseFloat(preview.radius) === 0;
  const baseRad = preview.radius || "8px";
  const ctrlRad = sharp ? "0px" : `${Math.min(12, Math.max(4, Math.round(parseFloat(baseRad) || 6)))}px`;
  const pillRad = sharp ? "2px" : "999px";
  const chkRad = sharp ? "0px" : "4px";
  const surfFg = safeContrastFg(preview.text, preview.surface, preview.canvas);
  const canvasFg = safeContrastFg(preview.text, preview.canvas, preview.canvas);
  let brandBg = preview.brand;
  let brandFg = safeContrastFg(autoInk(brandBg), brandBg, preview.canvas);
  // Ensure control tokens pass >= 4.5:1 WCAG AA if a system's raw brand hex sits near mid-luminance.
  const cv = parseColor(preview.canvas) || [255, 255, 255, 1];
  const brandFlat = flatten(parseColor(brandBg) || cv, cv);
  if (contrastRatio(parseColor(brandFg), brandFlat) < 4.5) {
    brandBg = preview.text;
    brandFg = safeContrastFg(preview.canvas, brandBg, preview.canvas);
  }
  const invBg = preview.text;
  const invFg = safeContrastFg(preview.canvas, invBg, preview.canvas);

  const defaults = [
    ["select-default", "select", { backgroundColor: preview.surface, textColor: surfFg, rounded: ctrlRad, padding: "8px 12px" }],
    ["switch-control", "switch", { backgroundColor: brandBg, textColor: brandFg, rounded: pillRad, padding: "2px" }],
    ["checkbox-control", "checkbox", { backgroundColor: brandBg, textColor: brandFg, rounded: chkRad, padding: "2px" }],
    ["tabs-nav", "tabs", { backgroundColor: preview.surface, textColor: surfFg, rounded: ctrlRad, padding: "6px 12px" }],
    ["alert-info", "alert", { backgroundColor: preview.surface, textColor: surfFg, rounded: ctrlRad, padding: "12px 14px" }],
    ["table-grid", "table", { backgroundColor: preview.canvas, textColor: canvasFg, rounded: ctrlRad, padding: "10px 14px" }],
    ["tooltip-overlay", "tooltip", { backgroundColor: invBg, textColor: invFg, rounded: sharp ? "0px" : "6px", padding: "6px 10px" }],
    ["icon-glyph", "icon", { backgroundColor: preview.surface, textColor: surfFg, rounded: sharp ? "0px" : "8px", padding: "8px" }],
  ];

  const added = {};
  for (const [key, kind, spec] of defaults) {
    const cur = data.components?.[key];
    if (cur) {
      const cbg = flatten(parseColor(cur.backgroundColor) || cv, cv);
      const cfg = parseColor(cur.textColor);
      if (cur.backgroundColor && cur.textColor && cfg && contrastRatio(flatten(cfg, cbg), cbg) < 4.5) {
        added[key] = { key, kind, ...spec };
      }
      continue;
    }
    if (presentKinds.has(kind)) continue;
    added[key] = { key, kind, ...spec };
  }
  return added;
}

const DISCOVERED_ICONS_PATH = path.join(ROOT, "data/discovered-icons.json");
const discoveredIcons = fs.existsSync(DISCOVERED_ICONS_PATH)
  ? JSON.parse(fs.readFileSync(DISCOVERED_ICONS_PATH, "utf8"))
  : {};

const dirs = fs.readdirSync(SYSTEMS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

let fixedCount = 0;
let enrichedCount = 0;
let updatedPreviews = 0;

for (const slug of dirs) {
  const dir = path.join(SYSTEMS, slug);
  const mdPath = path.join(dir, "DESIGN.md");
  const manPath = path.join(dir, "manifest.json");
  const prevPath = path.join(dir, "preview.json");
  if (!fs.existsSync(mdPath) || !fs.existsSync(manPath) || !fs.existsSync(prevPath)) continue;

  const md = fs.readFileSync(mdPath, "utf8");
  const manifest = JSON.parse(fs.readFileSync(manPath, "utf8"));
  const oldPreview = JSON.parse(fs.readFileSync(prevPath, "utf8"));
  if (manifest.provenance === "listed") continue;

  const { data, body } = splitFrontMatter(md);
  let yamlDirty = false;
  let bodyToUse = body;
  const ov = BRAND_OVERRIDES[slug];

  if (ov) {
    fixedCount++;
    if (ov.dropElementor && data.colors) {
      for (const k of Object.keys(data.colors)) {
        if (/^e-global-color-/.test(k)) delete data.colors[k];
      }
      data.colors["intuit-super-blue"] = ov.brand;
      yamlDirty = true;
    }
    if (ov.brand) {
      if (!data.colors) data.colors = {};
      if (data.colors.primary !== ov.brand) {
        data.colors.primary = ov.brand;
        yamlDirty = true;
      }
      if ("brand" in data.colors && ov.replaceBadHex && eqColor(data.colors.brand, ov.replaceBadHex)) data.colors.brand = ov.brand;
      if ("colors-brand" in data.colors && ov.replaceBadHex && eqColor(data.colors["colors-brand"], ov.replaceBadHex)) data.colors["colors-brand"] = ov.brand;
      if ("focus-primary" in data.colors && ov.replaceBadHex && eqColor(data.colors["focus-primary"], ov.replaceBadHex)) data.colors["focus-primary"] = ov.brand;

      for (const ck of Object.keys(data.components || {})) {
        const c = data.components[ck];
        if (!c || typeof c !== "object") continue;
        if (/button-primary|^button$|badge-brand/.test(ck) && (ov.forceBrand || !c.backgroundColor || (ov.replaceBadHex && eqColor(c.backgroundColor, ov.replaceBadHex)))) {
          c.backgroundColor = ov.brand;
          if (ov.text) c.textColor = ov.text;
          yamlDirty = true;
        }
      }
    }
    if (ov.sharpRadius && data.components) {
      for (const [ck, c] of Object.entries(data.components)) {
        if (!c || typeof c !== "object") continue;
        if (!/badge|pill/.test(ck)) c.rounded = ov.sharpRadius;
      }
      yamlDirty = true;
    }
    if (ov.forceCompRadius && data.components) {
      for (const [ck, c] of Object.entries(data.components)) {
        if (!c || typeof c !== "object") continue;
        if (ov.keepBadgeRadius && /badge|pill|tag/.test(ck)) continue;
        c.rounded = ov.forceCompRadius;
      }
      yamlDirty = true;
    }
    if (ov.forceSurfaceRadius && data.components) {
      for (const [ck, c] of Object.entries(data.components)) {
        if (!c || typeof c !== "object") continue;
        c.rounded = ov.forceSurfaceRadius;
      }
      yamlDirty = true;
    }
    if (ov.style) {
      data.description = ov.style;
      manifest.style = ov.style;
      yamlDirty = true;
    } else if (ov.descAccent && ov.replaceBadHex && data.description) {
      data.description = data.description.replace(ov.replaceBadHex, ov.descAccent).replace("#ff0000 brand accent", `${ov.descAccent} brand accent`);
      manifest.style = data.description;
      yamlDirty = true;
    }
  }

  // Merge rich preview component metadata (border/shadow/kind) temporarily to compute accurate surfaces & prose
  const oldByKey = new Map((oldPreview.components || []).map((c) => [c.key, c]));
  const mergedComps = {};
  for (const [k, c] of Object.entries(data.components || {})) {
    const oc = oldByKey.get(k);
    mergedComps[k] = {
      ...(oc?.border ? { border: oc.border } : {}),
      ...(oc?.shadow ? { shadow: oc.shadow } : {}),
      ...c,
      key: k,
      kind: inferCompKind(k, oc?.kind),
    };
  }

  let tempPreview = buildPreview({ colors: data.colors || {}, typography: data.typography || {}, components: mergedComps, prose: {} });

  // Supplement extended canonical component kinds when missing so every system exposes rich UI primitives
  const addedComps = supplementComponents({ data, components: mergedComps, preview: tempPreview });
  if (Object.keys(addedComps).length) {
    if (!data.components) data.components = {};
    for (const [k, v] of Object.entries(addedComps)) {
      const { key: _dropK, kind: _dropKind, ...spec } = v;
      data.components[k] = spec;
      mergedComps[k] = v;
    }
    yamlDirty = true;
    tempPreview = buildPreview({ colors: data.colors || {}, typography: data.typography || {}, components: mergedComps, prose: {} });
  }

  // Resolve verified or token-derived SVG Iconography specification
  const resolvedIcons = deriveIconSpec({
    radius: tempPreview.radius,
    components: mergedComps,
    existingIcons: discoveredIcons[slug] || data.icons || oldPreview.icons || null,
  });
  const { samples: _dropSamples, ...yamlIcons } = resolvedIcons;
  if (JSON.stringify(data.icons || {}) !== JSON.stringify(yamlIcons)) {
    data.icons = yamlIcons;
    yamlDirty = true;
  }

  // Add explicit rounded scale and enforce clean canonical YAML key order
  if (!data.rounded || !Object.keys(data.rounded).length) {
    const derivedR = deriveRoundedScale(data.components, tempPreview.radius);
    if (Object.keys(derivedR).length) {
      data.rounded = derivedR;
      yamlDirty = true;
    }
  }
  const orderedKeys = ["version", "name", "description", "colors", "typography", "rounded", "spacing", "icons", "components"];
  const rebuilt = {};
  for (const k of orderedKeys) if (data[k] !== undefined) rebuilt[k] = data[k];
  for (const k of Object.keys(data)) if (!(k in rebuilt)) rebuilt[k] = data[k];
  for (const k of Object.keys(data)) delete data[k];
  for (const k of Object.keys(rebuilt)) data[k] = rebuilt[k];

  // Determine whether body prose needs enrichment (thin < 2500 chars, stale counts, or missing Iconography bullet)
  tempPreview.icons = resolvedIcons;
  const needsEnrich =
    body.trim().length < 2500 ||
    /0 type tokens|No resolvable type tokens/i.test(body) ||
    (/Inventory:\s+\*\*\d+\*\*/i.test(body) && !/Iconography & SVGs/i.test(body));

  let prose;
  if (needsEnrich) {
    enrichedCount++;
    const theme = themeOfCanvas(tempPreview.canvas);
    if (theme) manifest.theme = theme;
    const gen = buildCanonicalProse({ manifest, data, preview: tempPreview });
    bodyToUse = gen.bodyMd;
    prose = { overview: gen.overviewText, dos: gen.dosSection };
    yamlDirty = true;
  } else {
    prose = extractSectionsFromCurated(md);
  }

  const finalMd = yamlDirty ? `${buildFrontMatter(data)}\n${bodyToUse.trim()}\n` : md;
  if (yamlDirty) writeRetry(mdPath, finalMd);

  const nextPreview = buildPreview({
    colors: data.colors || {},
    typography: data.typography || {},
    components: mergedComps,
    prose,
    icons: resolvedIcons,
  });

  const report = lint(finalMd, { name: slug });
  const theme = themeOfCanvas(nextPreview.canvas);
  if (theme) {
    manifest.theme = theme;
    const tags = new Set((manifest.tags || []).filter((t) => t !== "light" && t !== "dark"));
    tags.add(theme);
    manifest.tags = [...tags];
  }
  manifest.tokens = {
    colors: nextPreview.palette.length,
    typography: nextPreview.type.length,
    components: Object.keys(data.components || {}).length,
  };
  manifest.checks = {
    errors: report.counts.errors,
    warnings: report.counts.warnings,
    verified: report.verified,
  };

  writeRetry(path.join(dir, "tokens.json"), emitDtcg(finalMd));
  writeRetry(prevPath, JSON.stringify(nextPreview, null, 2) + "\n");
  writeRetry(manPath, JSON.stringify(manifest, null, 2) + "\n");
  updatedPreviews++;
}

console.log(`Done: remediated=${fixedCount}, enrichedProse=${enrichedCount}, rebuiltArtifacts=${updatedPreviews}`);

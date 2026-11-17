// Emitters: turn parsed DESIGN.md tokens into something a project can actually use.

import { splitFrontMatter } from "./fm.mjs";
import { resolveSurfaces, autoInk } from "./preview.mjs";
import { parseColor, contrastRatio, flatten } from "./color.mjs";

const kebab = (s) => String(s).replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();

const stripBang = (v) => String(v || "").replace(/\s*!(?:default|global|important)\s*$/i, "").trim();

function parseDim(raw) {
  if (typeof raw === "number" && Number.isFinite(raw)) return { value: raw, unit: "px" };
  const s = stripBang(raw);
  const m = /^(-?(?:\d+(?:\.\d+)?|\.\d+))\s*([a-z%]*)$/i.exec(s);
  if (!m) return null;
  const value = Number(m[1]);
  if (!Number.isFinite(value)) return null;
  return { value, unit: m[2] || "px" };
}

export function emitTailwindV4(markdown) {
  const { data } = splitFrontMatter(markdown);
  const out = ["@theme {"];

  const colors = data.colors || {};
  if (Object.keys(colors).length) {
    out.push("  /* colors */");
    for (const [k, v] of Object.entries(colors)) out.push(`  --color-${kebab(k)}: ${v};`);
  }

  const typography = data.typography || {};
  const families = new Set();
  if (Object.keys(typography).length) {
    out.push("");
    out.push("  /* type scale */");
    for (const [k, t] of Object.entries(typography)) {
      const name = kebab(k);
      if (t && typeof t === "object") {
        if (t.fontFamily && !/^var\(|^theme\(/i.test(String(t.fontFamily).trim())) families.add(t.fontFamily);
        if (t.fontSize) out.push(`  --text-${name}: ${stripBang(t.fontSize)};`);
        if (t.lineHeight !== undefined) out.push(`  --text-${name}--line-height: ${stripBang(t.lineHeight)};`);
        if (t.letterSpacing !== undefined) out.push(`  --text-${name}--letter-spacing: ${stripBang(t.letterSpacing)};`);
        if (t.fontWeight !== undefined) out.push(`  --text-${name}--font-weight: ${stripBang(t.fontWeight)};`);
      }
    }
  }

  if (families.size) {
    out.push("");
    out.push("  /* fonts */");
    const [primary] = [...families];
    out.push(`  --font-sans: ${quoteFamily(primary)};`);
  }

  const rounded = data.rounded || {};
  if (Object.keys(rounded).length) {
    out.push("");
    out.push("  /* radius */");
    for (const [k, v] of Object.entries(rounded)) out.push(`  --radius-${kebab(k)}: ${v};`);
  }

  const spacing = data.spacing || {};
  if (Object.keys(spacing).length) {
    out.push("");
    out.push("  /* spacing */");
    for (const [k, v] of Object.entries(spacing)) out.push(`  --spacing-${kebab(k)}: ${v};`);
  }

  out.push("}");
  return out.join("\n") + "\n";
}

export function emitCssVars(markdown) {
  const { data } = splitFrontMatter(markdown);
  const out = [":root {"];

  for (const [k, v] of Object.entries(data.colors || {})) out.push(`  --ds-color-${kebab(k)}: ${v};`);

  const typography = data.typography || {};
  const families = new Set();
  for (const [k, t] of Object.entries(typography)) {
    if (!t || typeof t !== "object") continue;
    const name = kebab(k);
    if (t.fontFamily && !/^var\(|^theme\(/i.test(String(t.fontFamily).trim())) families.add(t.fontFamily);
    if (t.fontSize) out.push(`  --ds-text-${name}-size: ${stripBang(t.fontSize)};`);
    if (t.fontWeight !== undefined) out.push(`  --ds-text-${name}-weight: ${stripBang(t.fontWeight)};`);
    if (t.lineHeight !== undefined) out.push(`  --ds-text-${name}-leading: ${stripBang(t.lineHeight)};`);
    if (t.letterSpacing !== undefined) out.push(`  --ds-text-${name}-tracking: ${stripBang(t.letterSpacing)};`);
  }
  if (families.size) out.push(`  --ds-font-sans: ${quoteFamily([...families][0])};`);

  for (const [k, v] of Object.entries(data.rounded || {})) out.push(`  --ds-radius-${kebab(k)}: ${v};`);
  for (const [k, v] of Object.entries(data.spacing || {})) out.push(`  --ds-space-${kebab(k)}: ${v};`);
  if (data.icons && typeof data.icons === "object") {
    if (data.icons.grid) out.push(`  --ds-icon-grid: ${data.icons.grid}px;`);
    if (data.icons.strokeWidth !== undefined) out.push(`  --ds-icon-stroke-width: ${data.icons.strokeWidth};`);
    if (data.icons.strokeLinecap) out.push(`  --ds-icon-linecap: ${data.icons.strokeLinecap};`);
    if (data.icons.strokeLinejoin) out.push(`  --ds-icon-linejoin: ${data.icons.strokeLinejoin};`);
  }

  for (const [k, c] of Object.entries(data.components || {})) {
    if (!c || typeof c !== "object") continue;
    const name = kebab(k);
    if (c.backgroundColor) out.push(`  --ds-comp-${name}-bg: ${stripBang(c.backgroundColor)};`);
    if (c.textColor) out.push(`  --ds-comp-${name}-text: ${stripBang(c.textColor)};`);
    if (c.borderColor) out.push(`  --ds-comp-${name}-border: ${stripBang(c.borderColor)};`);
    if (c.rounded) out.push(`  --ds-comp-${name}-radius: ${stripBang(c.rounded)};`);
    if (c.padding) out.push(`  --ds-comp-${name}-padding: ${stripBang(c.padding)};`);
    if (c.fontSize) out.push(`  --ds-comp-${name}-size: ${stripBang(c.fontSize)};`);
    if (c.fontWeight !== undefined) out.push(`  --ds-comp-${name}-weight: ${stripBang(c.fontWeight)};`);
  }

  out.push("}");
  return out.join("\n") + "\n";
}

export function emitDtcg(markdown) {
  const { data } = splitFrontMatter(markdown);
  const root = {};

  const colors = data.colors || {};
  if (Object.keys(colors).length) {
    root.color = {};
    for (const [k, v] of Object.entries(colors)) root.color[kebab(k)] = { $value: v, $type: "color" };
  }

  const typography = data.typography || {};
  if (Object.keys(typography).length) {
    const outType = {};
    for (const [k, t] of Object.entries(typography)) {
      if (!t || typeof t !== "object") continue;
      const value = {};
      if (t.fontFamily) {
        const clean = String(t.fontFamily).replace(/\s+/g, " ").trim();
        if (clean && !/^var\(|^theme\(/i.test(clean)) value.fontFamily = [clean];
      }
      const fsDim = t.fontSize !== undefined ? parseDim(t.fontSize) : null;
      if (fsDim) value.fontSize = fsDim;
      if (t.fontWeight !== undefined) {
        const fw = Number(stripBang(t.fontWeight));
        if (Number.isFinite(fw)) value.fontWeight = fw;
        else if (typeof t.fontWeight === "string" && /^[a-z-]+$/i.test(t.fontWeight.trim())) value.fontWeight = t.fontWeight.trim();
      }
      if (t.lineHeight !== undefined) {
        const lh = Number(stripBang(t.lineHeight));
        if (Number.isFinite(lh)) value.lineHeight = lh;
      }
      const lsDim = t.letterSpacing !== undefined ? parseDim(t.letterSpacing) : null;
      if (lsDim) value.letterSpacing = lsDim;
      if (Object.keys(value).length) outType[kebab(k)] = { $value: value, $type: "typography" };
    }
    if (Object.keys(outType).length) root.typography = outType;
  }

  const dim = (obj, type) => {
    const o = {};
    for (const [k, v] of Object.entries(obj || {})) {
      if (typeof v === "number" && Number.isFinite(v)) o[kebab(k)] = { $value: v, $type: "number" };
      else {
        const d = parseDim(v);
        if (d) o[kebab(k)] = { $value: d, $type: type };
      }
    }
    return o;
  };
  if (Object.keys(data.rounded || {}).length) {
    const r = dim(data.rounded, "dimension");
    if (Object.keys(r).length) root.radius = r;
  }
  if (Object.keys(data.spacing || {}).length) {
    const sp = dim(data.spacing, "dimension");
    if (Object.keys(sp).length) root.spacing = sp;
  }

  return JSON.stringify(root, null, 2) + "\n";
}

function quoteFamily(f) {
  if (!f) return "system-ui";
  const parts = String(f)
    .replace(/\s+/g, " ")
    .split(",")
    .map((p) => p.trim().replace(/^['"]+|['"]+$/g, ""))
    .filter(Boolean)
    .map((p) => (/^(sans-serif|serif|monospace|system-ui|ui-monospace|ui-sans-serif|ui-serif|cursive|fantasy|emoji|math|fangsong|-apple-system|BlinkMacSystemFont)$/i.test(p) ? p : `"${p}"`));
  return parts.length ? parts.join(", ") : "system-ui";
}

function mergeComponents(data, preview) {
  const byKey = new Map((preview?.components || []).map((c) => [c.key, c]));
  const out = {};
  for (const [k, raw] of Object.entries(data.components || {})) {
    if (!raw || typeof raw !== "object") continue;
    const p = byKey.get(k);
    out[k] = {
      ...(p || {}),
      ...raw,
      kind: p?.kind || k.split("-")[0] || "component",
    };
  }
  return out;
}

function resolveSurfaceTokens(data, preview) {
  if (preview?.canvas) {
    return {
      canvas: preview.canvas,
      surface: preview.surface,
      text: preview.text,
      muted: preview.muted,
      brand: preview.brand,
      border: preview.border,
      radius: preview.radius,
    };
  }
  return resolveSurfaces(data.colors || {}, data.components || {});
}

function contrastNote(fgRaw, bgRaw, canvasRaw) {
  const fg = parseColor(fgRaw), bg = parseColor(bgRaw), cv = parseColor(canvasRaw) || [255, 255, 255, 1];
  if (!fg || !bg) return "";
  const bgFlat = flatten(bg, cv);
  const fgFlat = flatten(fg, bgFlat);
  return `${contrastRatio(fgFlat, bgFlat).toFixed(1)}:1`;
}

function summarizeSystemContext(data, preview, manifest) {
  const surfaces = resolveSurfaceTokens(data, preview);
  const comps = mergeComponents(data, preview);
  const types = Object.entries(data.typography || {});
  const shadows = Object.values(comps).map((c) => c.shadow).filter((s) => s && s !== "none");
  const paddings = [...new Set(Object.values(comps).map((c) => c.padding).filter(Boolean))].slice(0, 6);
  const brandInk = autoInk(surfaces.brand);
  return {
    name: manifest?.displayName || data.name || manifest?.name || "Design System",
    surfaces,
    brandInk,
    textContrast: contrastNote(surfaces.text, surfaces.canvas, surfaces.canvas),
    brandContrast: contrastNote(brandInk, surfaces.brand, surfaces.canvas),
    elevation: shadows.length
      ? `shadow-layered (${shadows[0]}) with border fallback`
      : `flat surface separation (${surfaces.canvas} -> ${surfaces.surface}) + 1px border (${surfaces.border})`,
    paddings,
    comps,
    types,
  };
}

export function emitJson(markdown, { preview = null, manifest = null } = {}) {
  const { data, body } = splitFrontMatter(markdown);
  const ctx = summarizeSystemContext(data, preview, manifest);
  const bundle = {
    name: ctx.name,
    slug: manifest?.name || "",
    org: manifest?.org || undefined,
    category: manifest?.category || undefined,
    theme: manifest?.theme || preview?.theme || undefined,
    provenance: manifest?.provenance || undefined,
    license: manifest?.license || undefined,
    homepage: manifest?.homepage || manifest?.source?.url || undefined,
    repo: manifest?.source?.repo || undefined,
    package: manifest?.source?.package || undefined,
    frameworks: manifest?.popularity?.frameworks || undefined,
    stars: manifest?.popularity?.stars || undefined,
    npmDownloads: manifest?.popularity?.npmDownloads || undefined,
    description: data.description || manifest?.description || manifest?.style || "",
    surfaces: {
      ...ctx.surfaces,
      onBrandInk: ctx.brandInk,
      textCanvasContrast: ctx.textContrast || undefined,
      brandInkContrast: ctx.brandContrast || undefined,
    },
    elevation: ctx.elevation,
    paddings: ctx.paddings,
    colors: data.colors || {},
    typography: data.typography || {},
    rounded: data.rounded || {},
    spacing: data.spacing || {},
    icons: preview?.icons || data.icons || undefined,
    components: ctx.comps,
    guidelines: {
      overview: preview?.overview || "",
      dos: preview?.dos || "",
    },
    notes: body.trim(),
  };
  return JSON.stringify(bundle, null, 2) + "\n";
}

export function emitPrompt(markdown, { preview = null, manifest = null } = {}) {
  const { data, body } = splitFrontMatter(markdown);
  const ctx = summarizeSystemContext(data, preview, manifest);
  const colors = Object.entries(data.colors || {});
  const types = ctx.types;
  const radii = Object.entries(data.rounded || {});
  const spacing = Object.entries(data.spacing || {});
  const comps = Object.entries(ctx.comps);

  const fws = (manifest?.popularity?.frameworks || []).join(", ");
  const out = [
    `Apply the **${ctx.name}** design system (\`${manifest?.slug || manifest?.name || ""}\`) verbatim using ONLY the verified tokens and architectural guidelines below.`,
    "",
    `## Identity & Architecture Summary`,
    manifest?.org ? `- Organization: ${manifest.org}${manifest?.category && manifest.category !== manifest.org ? ` · Category: ${manifest.category}` : ""}` : "",
    `- Theme Polarity: ${manifest?.theme || preview?.theme || "unknown"} (${manifest?.provenance || "verified"}, ${manifest?.license || "unspecified"} license)`,
    manifest?.homepage || manifest?.source?.url ? `- Homepage: ${manifest?.homepage || manifest?.source?.url}` : "",
    manifest?.source?.repo ? `- Repository: ${manifest.source.repo}` : "",
    manifest?.source?.package ? `- Package: \`${manifest.source.package}\`${fws ? ` · Frameworks: ${fws}` : ""}` : (fws ? `- Frameworks: ${fws}` : ""),
    `- Summary: ${manifest?.style || data.description || ""}`,
    "",
    `## Surfaces, Contrast & Elevation`,
    `- Canvas (\`canvas\`): \`${ctx.surfaces.canvas}\``,
    `- Surface (\`surface\`): \`${ctx.surfaces.surface}\``,
    `- Primary Ink (\`text\`): \`${ctx.surfaces.text}\`${ctx.textContrast ? ` (${ctx.textContrast} contrast on canvas)` : ""}`,
    `- Muted Ink (\`muted\`): \`${ctx.surfaces.muted}\``,
    `- Brand Accent (\`brand\`): \`${ctx.surfaces.brand}\` (recommended label ink: \`${ctx.brandInk}\`${ctx.brandContrast ? `, ${ctx.brandContrast}` : ""})`,
    `- Structural Border (\`border\`): \`${ctx.surfaces.border}\``,
    `- Base Corner Radius (\`radius\`): \`${ctx.surfaces.radius}\``,
    `- Elevation Model: ${ctx.elevation}`,
  ].filter(Boolean);

  if (colors.length) {
    out.push("", `## Colors (${colors.length})`);
    for (const [k, v] of colors) out.push(`- \`${k}\`: \`${v}\``);
  }
  if (types.length) {
    out.push("", `## Typography (${types.length})`);
    for (const [k, t] of types) {
      if (!t || typeof t !== "object") continue;
      const spec = [
        t.fontFamily ? `font: ${t.fontFamily}` : "",
        t.fontSize ? `size: ${t.fontSize}` : "",
        t.fontWeight !== undefined ? `weight: ${t.fontWeight}` : "",
        t.lineHeight !== undefined ? `line-height: ${t.lineHeight}` : "",
        t.letterSpacing !== undefined ? `tracking: ${t.letterSpacing}` : "",
      ].filter(Boolean).join(" · ");
      out.push(`- \`${k}\`: ${spec}`);
    }
  }
  if (radii.length || ctx.paddings.length) {
    out.push("", "## Geometry & Spacing");
    for (const [k, v] of radii) out.push(`- radius.\`${k}\`: \`${v}\``);
    for (const [k, v] of spacing) out.push(`- spacing.\`${k}\`: \`${v}\``);
    if (!spacing.length && ctx.paddings.length) {
      out.push(`- Component paddings observed: ${ctx.paddings.map((p) => `\`${p}\``).join(", ")}`);
    }
  }
  if (comps.length) {
    out.push("", `## Components (${comps.length})`);
    for (const [k, c] of comps) {
      const cr = c.backgroundColor && c.textColor && c.backgroundColor !== "transparent"
        ? contrastNote(c.textColor, c.backgroundColor, ctx.surfaces.canvas)
        : "";
      const props = [
        c.backgroundColor ? `bg=${c.backgroundColor}` : "",
        c.textColor ? `text=${c.textColor}` : "",
        cr ? `contrast=${cr}` : "",
        c.border && c.border !== "none" ? `border=${c.border}` : c.borderColor ? `borderColor=${c.borderColor}` : "",
        c.rounded ? `radius=${c.rounded}` : "",
        c.padding ? `padding=${c.padding}` : "",
        c.shadow ? `shadow=${c.shadow}` : "",
        c.fontSize ? `size=${c.fontSize}` : "",
        c.fontWeight !== undefined ? `weight=${c.fontWeight}` : "",
      ].filter(Boolean).join(", ");
      out.push(`- \`${k}\` (${c.kind || "component"}): ${props || "inherits palette"}`);
    }
  }
  const iconSpec = preview?.icons || data.icons;
  if (iconSpec && typeof iconSpec === "object") {
    out.push("", "## Iconography & SVG Specification");
    out.push(`- Library / Ecosystem: ${iconSpec.library || "Inline System SVGs"}${iconSpec.package ? ` (\`npm install ${iconSpec.package}\`)` : " (inline SVG glyphs matching system geometry)"}${iconSpec.source ? ` [${iconSpec.source}]` : ""}`);
    out.push(`- Grid & Sizing: \`${iconSpec.grid || 24}x${iconSpec.grid || 24}\` base viewBox (\`16px\` compact UI, \`20px\` default controls, \`24px\` navigation)`);
    out.push(`- Stroke & Geometry: \`${iconSpec.style || "outline"}\` glyphs, \`stroke-width="${iconSpec.strokeWidth ?? 1.5}"\`, \`stroke-linecap="${iconSpec.strokeLinecap || "round"}"\`, \`stroke-linejoin="${iconSpec.strokeLinejoin || "round"}"\``);
    out.push(`- Color Tokens: Inherit \`currentColor\` (\`${ctx.surfaces.text}\` primary icons, \`${ctx.surfaces.muted}\` secondary controls, \`${ctx.surfaces.brand}\` active/accent states)`);
  }
  const cleanedBody = body ? body.replace(/^\s*#\s+[^\n]+\n*/m, "").trim() : "";
  if (cleanedBody) {
    out.push("", "## Visual Language & Guidelines", cleanedBody);
  }
  out.push(
    "",
    "## Agent Implementation Contract",
    `- Preserve \`${ctx.surfaces.canvas}\` (${manifest?.theme || "verified"}) base polarity and \`${ctx.surfaces.text}\` / \`${ctx.surfaces.muted}\` text hierarchy across all views.`,
    `- Reserve \`${ctx.surfaces.brand}\` (with \`${ctx.brandInk}\` text) for primary CTAs, active controls, and keyboard focus states.`,
    `- Enforce \`${ctx.surfaces.radius}\` baseline corner geometry (and exact per-component radii listed above) instead of arbitrary rounding.`,
    "- Use ONLY documented colors, fonts, shadows, and paddings from this specification; keep every text/control pair >= 4.5:1 WCAG AA contrast."
  );
  return out.join("\n") + "\n";
}

export const EMITTERS = {
  "tailwind-v4": { ext: "css", run: emitTailwindV4 },
  "css-vars": { ext: "css", run: emitCssVars },
  dtcg: { ext: "json", run: emitDtcg },
  prompt: { ext: "md", run: emitPrompt },
  json: { ext: "json", run: emitJson },
};

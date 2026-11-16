// Emitters: turn parsed DESIGN.md tokens into something a project can actually use.

import { splitFrontMatter } from "./fm.mjs";

const kebab = (s) => String(s).replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();

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
        if (t.fontFamily) families.add(t.fontFamily);
        if (t.fontSize) out.push(`  --text-${name}: ${t.fontSize};`);
        if (t.lineHeight !== undefined) out.push(`  --text-${name}--line-height: ${t.lineHeight};`);
        if (t.letterSpacing !== undefined) out.push(`  --text-${name}--letter-spacing: ${t.letterSpacing};`);
        if (t.fontWeight !== undefined) out.push(`  --text-${name}--font-weight: ${t.fontWeight};`);
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
    if (t.fontFamily) families.add(t.fontFamily);
    if (t.fontSize) out.push(`  --ds-text-${name}-size: ${t.fontSize};`);
    if (t.fontWeight !== undefined) out.push(`  --ds-text-${name}-weight: ${t.fontWeight};`);
    if (t.lineHeight !== undefined) out.push(`  --ds-text-${name}-leading: ${t.lineHeight};`);
    if (t.letterSpacing !== undefined) out.push(`  --ds-text-${name}-tracking: ${t.letterSpacing};`);
  }
  if (families.size) out.push(`  --ds-font-sans: ${quoteFamily([...families][0])};`);

  for (const [k, v] of Object.entries(data.rounded || {})) out.push(`  --ds-radius-${kebab(k)}: ${v};`);
  for (const [k, v] of Object.entries(data.spacing || {})) out.push(`  --ds-space-${kebab(k)}: ${v};`);

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
    root.typography = {};
    for (const [k, t] of Object.entries(typography)) {
      if (!t || typeof t !== "object") continue;
      const value = {};
      if (t.fontFamily) value.fontFamily = [t.fontFamily];
      if (t.fontSize) value.fontSize = { value: parseFloat(t.fontSize), unit: String(t.fontSize).replace(/[\d.\-]/g, "") || "px" };
      if (t.fontWeight !== undefined) value.fontWeight = Number(t.fontWeight);
      if (t.lineHeight !== undefined) value.lineHeight = Number(t.lineHeight);
      if (t.letterSpacing !== undefined)
        value.letterSpacing = {
          value: parseFloat(t.letterSpacing),
          unit: String(t.letterSpacing).replace(/[\d.\-]/g, "") || "px",
        };
      root.typography[kebab(k)] = { $value: value, $type: "typography" };
    }
  }

  const dim = (obj, type) => {
    const o = {};
    for (const [k, v] of Object.entries(obj || {})) {
      if (typeof v === "number") o[kebab(k)] = { $value: v, $type: "number" };
      else
        o[kebab(k)] = {
          $value: { value: parseFloat(v), unit: String(v).replace(/[\d.\-]/g, "") || "px" },
          $type: type,
        };
    }
    return o;
  };
  if (Object.keys(data.rounded || {}).length) root.radius = dim(data.rounded, "dimension");
  if (Object.keys(data.spacing || {}).length) root.spacing = dim(data.spacing, "dimension");

  return JSON.stringify(root, null, 2) + "\n";
}

function quoteFamily(f) {
  if (!f) return "system-ui";
  const parts = String(f)
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => (/^[a-zA-Z0-9-]+$/.test(p) && !/^(sans-serif|serif|monospace|system-ui|ui-monospace)$/.test(p) ? `"${p}"` : p));
  return parts.join(", ");
}

export const EMITTERS = {
  "tailwind-v4": { ext: "css", run: emitTailwindV4 },
  "css-vars": { ext: "css", run: emitCssVars },
  dtcg: { ext: "json", run: emitDtcg },
};

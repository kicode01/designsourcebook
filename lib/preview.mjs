// Shared: turn a set of colour/typography/component tokens into everything the
// catalog needs to draw a system. Used by both importers (prose and published).

import { parseColor, relativeLuminance, contrastRatio } from "./color.mjs";

const DARK_INK = "#0b0b0c";
const LIGHT_INK = "#f7f7f8";

export function autoInk(bgValue) {
  const c = parseColor(bgValue);
  if (!c) return LIGHT_INK;
  return relativeLuminance(c) < 0.35 ? LIGHT_INK : DARK_INK;
}

export function themeOfCanvas(canvasValue) {
  const c = parseColor(canvasValue);
  if (!c) return null;
  return relativeLuminance(c) < 0.18 ? "dark" : "light";
}

export function truncate(s, n) {
  if (!s || s.length <= n) return s || "";
  const cut = s.slice(0, n);
  const space = cut.lastIndexOf(" ");
  return (space > n * 0.6 ? cut.slice(0, space) : cut).trim() + "\u2026";
}

// Resolve which token is the page canvas.
// Never "the first colour": on a system without bg-* tokens that is the brand
// accent, which paints the whole preview coral. Prefer explicit background
// tokens, then any surface token, then the most extreme luminance in the palette.
// Alpha-scale swatches (Radix ships a full 4%-opacity ramp) are real tokens but
// they are invisible as surfaces. Never let one become the canvas or the brand.
export function isOpaque(value) {
  const c = parseColor(value);
  return Boolean(c) && (c[3] === undefined || c[3] >= 0.99);
}

export function resolveSurfaces(colors) {
  const all = Object.keys(colors || {});
  if (!all.length) return { canvasKey: null, surfaceKey: null, canvas: "#ffffff", surface: "#ffffff" };

  const solid = all.filter((k) => isOpaque(colors[k]));
  const keys = solid.length >= 4 ? solid : all;

  const bgKeys = keys.filter((k) => /^(bg|background)[-_]/.test(k));
  const surfaceKeys = keys.filter((k) => /^(surface|canvas|paper|base)[-_]/.test(k));

  let canvasKey = bgKeys[0] || surfaceKeys[0] || null;
  if (!canvasKey) {
    // No background token to go on: take the most extreme luminance, and on a
    // tie prefer the lighter one. Palette-only systems (Artsy, Radix) ship both
    // #000 and #FFF at equal distance from mid-grey, and black wins by accident
    // otherwise.
    let best = null;
    let bestDist = -1;
    let bestLum = -1;
    for (const k of keys) {
      const c = parseColor(colors[k]);
      if (!c) continue;
      const lum = relativeLuminance(c);
      const d = Math.abs(lum - 0.5);
      if (d > bestDist + 1e-9 || (Math.abs(d - bestDist) <= 1e-9 && lum > bestLum)) {
        bestDist = d;
        bestLum = lum;
        best = k;
      }
    }
    canvasKey = best;
  }

  const surfaceKey = bgKeys[1] || surfaceKeys.find((k) => k !== canvasKey) || canvasKey;
  return {
    canvasKey,
    surfaceKey,
    canvas: colors[canvasKey] || "#ffffff",
    surface: colors[surfaceKey] || colors[canvasKey] || "#ffffff",
  };
}

export function buildPreview({ colors, typography, components, prose }) {
  const keys = Object.keys(colors || {});
  const solid = keys.filter((k) => isOpaque(colors[k]));
  const pickFrom = solid.length >= 4 ? solid : keys;
  const first = (re) => pickFrom.find((k) => re.test(k));
  const { canvas, surface } = resolveSurfaces(colors);

  const textKeys = pickFrom.filter((k) => k.startsWith("text-"));

  // Body ink must actually be readable on the canvas. Taking the first text-*
  // token is wrong for systems whose first entry is `text-inverse` — Aalto ended
  // up with white text on a white page.
  const inkOn = (v, min) => {
    const c = parseColor(v);
    const bg = parseColor(canvas);
    if (!c || !bg) return false;
    return contrastRatio(c, bg) >= min;
  };
  const orderedText = ["text-primary", "text-body", "text-default", ...textKeys];
  const text = orderedText.map((k) => colors[k]).find((v) => v && inkOn(v, 4.5)) || autoInk(canvas);
  const muted =
    [colors["text-secondary"], colors["text-tertiary"], ...textKeys.map((k) => colors[k])].find(
      (v) => v && v !== text && inkOn(v, 2.6)
    ) || text;

  const borderKey = first(/^border[-_]/);
  const border = borderKey ? colors[borderKey] : `color-mix(in srgb, ${text} 14%, transparent)`;

  const brand = colors.primary || (first(/^brand[-_]/) && colors[first(/^brand[-_]/)]) || text;

  const radiusVotes = {};
  for (const c of Object.values(components || {})) if (c.rounded) radiusVotes[c.rounded] = (radiusVotes[c.rounded] || 0) + 1;
  const radius = Object.entries(radiusVotes).sort((a, b) => b[1] - a[1])[0]?.[0] || "8px";

  const type = Object.entries(typography || {})
    .map(([name, t]) => {
      const raw = String(t.fontSize || "");
      // rem/em are relative to 16px here. Without this, "2.625rem" sorts as
      // 2.625 and the type scale renders in the wrong order at the wrong size.
      const num = parseFloat(raw);
      const px = !Number.isFinite(num) ? 16 : /rem|em$/.test(raw) ? num * 16 : num;
      return {
        name,
        fontFamily: t.fontFamily || "system-ui",
        fontSize: t.fontSize,
        px,
        fontWeight: t.fontWeight,
        lineHeight: t.lineHeight,
        letterSpacing: t.letterSpacing,
      };
    })
    .sort((a, b) => b.px - a.px);

  return {
    canvas,
    surface,
    text,
    muted,
    brand,
    border,
    radius,
    ink: autoInk(canvas),
    palette: keys.map((k) => ({ name: k, value: colors[k] })),
    type,
    components: Object.values(components || {}).map((c) => ({
      key: c.key,
      kind: c.kind,
      backgroundColor: c.backgroundColor,
      textColor: c.textColor,
      rounded: c.rounded,
      padding: c.padding,
      border: c.border,
      shadow: c.shadow,
    })),
    overview: truncate(prose?.overview, 900),
    dos: truncate(prose?.dos, 900),
  };
}

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

export function resolveSurfaces(colors, components = {}) {
  const all = Object.keys(colors || {});
  if (!all.length) return { canvasKey: null, surfaceKey: null, canvas: "#ffffff", surface: "#ffffff" };

  const solid = all.filter((k) => isOpaque(colors[k]));
  const keys = solid.length >= 4 ? solid : all;

  const NOISE_KEY =
    /(^|-)(button|btn|badge|tag|chip|pill|input|card|nav|navbar|banner|cta|link|tooltip|modal|avatar|tab|progress|checkbox|radio|switch|slider|table|icon|spinner|searchguide|popover|tagdata|box|border|stroke|divider|text|fg|foreground|shadow|danger|error|warn|warning|success|info|accent|brand|disabled|hover|pressed|active|focus|selected|emphasis|inverse|backdrop|overlay|scrim|recommendation|education|green|purple|pink|red|orange|yellow|blue|teal)(-|$)/i;
  const DEFAULT_SURFACE_HINT = /(canvas|page|body|default|main|card|elevated|panel|subtle|secondary|muted|surface)/i;

  const isCleanCanvas = (k) => !NOISE_KEY.test(k);
  const directBg = keys.filter((k) => /^(bg|background)[-_]/.test(k) && isCleanCanvas(k));
  const directSurf = keys.filter((k) => /^(surface|canvas|paper)[-_]/.test(k) && isCleanCanvas(k));
  const scopedBg = keys.filter(
    (k) => /(^|-)(bg|background|surface|canvas)-(canvas|page|body|default|main|app|base)$/.test(k) && isCleanCanvas(k)
  );

  const bgKeys = directBg.length ? directBg : scopedBg;
  const surfaceKeys = directSurf;

  let canvasKey =
    bgKeys.find((k) => /(canvas|page|body|default|main|pure-white|white|black|app)$/.test(k)) ||
    bgKeys[0] ||
    surfaceKeys.find((k) => /(canvas|page|body|default|main|app)$/.test(k)) ||
    surfaceKeys[0] ||
    null;
  if (!canvasKey) {
    // Infer canvas polarity from transparent/backgroundless components when available:
    // dark text on a transparent surface implies a light canvas, and vice versa.
    let lightVotes = 0;
    let darkVotes = 0;
    for (const [ck, comp] of Object.entries(components || {})) {
      if (!comp || typeof comp !== "object") continue;
      if (/-on-(dark|light)$/i.test(ck)) continue;
      const bg = comp.backgroundColor;
      if (bg && String(bg).toLowerCase() !== "transparent") continue;
      const fg = parseColor(comp.textColor);
      if (!fg) continue;
      const lum = relativeLuminance(fg);
      if (lum < 0.25) lightVotes++;
      else if (lum > 0.7) darkVotes++;
    }
    const wantPolarity = lightVotes > darkVotes ? "light" : darkVotes > lightVotes ? "dark" : null;

    // No background token to go on: take the most extreme luminance, and on a
    // tie prefer the lighter one. Palette-only systems (Artsy, Radix) ship both
    // #000 and #FFF at equal distance from mid-grey, and black wins by accident
    // otherwise.
    const NON_SURFACE = /^(text|fg|foreground|border|stroke|divider|shadow|status|error|danger|warning|success|info|overlay)[-_]/;
    const candidates = keys.filter((k) => !NON_SURFACE.test(k));
    const basePool = candidates.length ? candidates : keys;
    const polarized = wantPolarity
      ? basePool.filter((k) => {
          const c = parseColor(colors[k]);
          return c && (wantPolarity === "light" ? relativeLuminance(c) > 0.5 : relativeLuminance(c) < 0.5);
        })
      : [];
    const pool = polarized.length ? polarized : basePool;

    let best = null;
    let bestDist = -1;
    let bestLum = -1;
    for (const k of pool) {
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

  const canvasLum = parseColor(colors[canvasKey]) ? relativeLuminance(parseColor(colors[canvasKey])) : 0.5;
  const surfacePool = [...bgKeys, ...surfaceKeys].filter((k) => k !== canvasKey && DEFAULT_SURFACE_HINT.test(k));
  const fallbackPool = [...bgKeys, ...surfaceKeys].filter((k) => k !== canvasKey);
  const pickSurf = (list) =>
    list.find((k) => {
      const c = parseColor(colors[k]);
      return c && Math.abs(relativeLuminance(c) - canvasLum) < 0.45;
    }) || list[0];
  const surfaceKey = pickSurf(surfacePool) || pickSurf(fallbackPool) || canvasKey;
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
  const { canvas, surface } = resolveSurfaces(colors, components);

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
  for (const [k, c] of Object.entries(components || {})) {
    if (!c || !c.rounded) continue;
    if (/badge|pill|tag|chip|indicator|avatar|circle/i.test(`${k} ${c.kind || ""}`)) continue;
    const r = String(c.rounded).trim();
    if (/^(100%|50%|9999?px)$/i.test(r) && !/button|btn/i.test(`${k} ${c.kind || ""}`)) continue;
    if (/\s/.test(r)) continue;
    radiusVotes[r] = (radiusVotes[r] || 0) + 1;
  }
  const radius = Object.entries(radiusVotes).sort((a, b) => b[1] - a[1])[0]?.[0] || "8px";

  const isIconFont = (f) =>
    /(?:^|[\s,"'])(?:[a-z0-9_-]*icons?|fontawesome|material-icons|octicons|codicons|glyphs?)(?:$|[\s,"'])/i.test(String(f || ""));
  const famEntries = Object.entries(typography || {})
    .filter(([, t]) => t && typeof t === "object" && t.fontFamily && t.fontFamily !== "system-ui" && !isIconFont(t.fontFamily));

  const bodyFamEntry =
    famEntries.find(([k, t]) => /(body|sans|base|default|primary|plain|regular|text|main)/i.test(k) && !/(mono|code|display|heading|headline|title)/i.test(`${k} ${t.fontFamily}`)) ||
    famEntries.find(([k, t]) => !/(mono|code|courier|consolas|menlo|display|heading|headline)/i.test(`${k} ${t.fontFamily}`)) ||
    famEntries.find(([k, t]) => !/(mono|code|courier|consolas|menlo)/i.test(`${k} ${t.fontFamily}`)) ||
    famEntries.find(([k]) => !/(mono|code|console|pre|kbd)/i.test(k));
  const bodyFam = bodyFamEntry ? bodyFamEntry[1].fontFamily : "system-ui";

  const headingFamEntry =
    famEntries.find(([k, t]) => /(display|heading|headline|title|brand|expressive|hero|^h[1-6]\b)/i.test(k) && !/(mono|code)/i.test(`${k} ${t.fontFamily}`)) ||
    null;
  const headingFam = headingFamEntry ? headingFamEntry[1].fontFamily : bodyFam;

  const monoFamEntry =
    famEntries.find(([k, t]) => /(mono|code|console|pre)/i.test(`${k} ${t.fontFamily}`)) ||
    null;
  const monoFam = monoFamEntry ? monoFamEntry[1].fontFamily : bodyFam;

  const type = Object.entries(typography || {})
    .filter(([, t]) => t && typeof t === "object" && !isIconFont(t.fontFamily))
    .map(([name, t]) => {
      const raw = String(t.fontSize || "");
      const clampM = /^clamp\([^,]+,[^,]+,\s*([^)]+)\)$/.exec(raw.trim());
      const scalar = clampM ? clampM[1].trim() : raw.trim();
      // rem/em/%/pt are relative to 16px here. Without this, "2.625rem" sorts as
      // 2.625 and "100%" sorts as 100px.
      const num = parseFloat(scalar);
      const px = !Number.isFinite(num)
        ? 16
        : /rem|em$/i.test(scalar)
        ? num * 16
        : /%$/.test(scalar)
        ? (num / 100) * 16
        : /pt$/i.test(scalar)
        ? Math.round(num * 1.333)
        : num;
      const ownFam = t.fontFamily && t.fontFamily !== "system-ui" ? t.fontFamily : null;
      const inheritedFam = /(mono|code|pre|kbd)/i.test(name)
        ? monoFam
        : /(display|heading|headline|title|hero|^h[1-6]\b)/i.test(name)
        ? headingFam
        : bodyFam;
      return {
        name,
        fontFamily: ownFam || inheritedFam,
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

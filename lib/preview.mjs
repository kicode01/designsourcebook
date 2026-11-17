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
  const para = cut.lastIndexOf("\n\n");
  if (para > n * 0.5) return cut.slice(0, para).trim();
  const sentence = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(".\n"));
  if (sentence > n * 0.45) return cut.slice(0, sentence + 1).trim();
  const space = cut.lastIndexOf(" ");
  return (space > n * 0.6 ? cut.slice(0, space) : cut).trim();
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

function rgbChroma(value) {
  const c = Array.isArray(value) ? value : parseColor(value);
  if (!c) return 999;
  return Math.max(c[0], c[1], c[2]) - Math.min(c[0], c[1], c[2]);
}

export function resolveSurfaces(colors, components = {}) {
  const all = Object.keys(colors || {});
  if (!all.length) return { canvasKey: null, surfaceKey: null, canvas: "#ffffff", surface: "#ffffff" };

  const solid = all.filter((k) => isOpaque(colors[k]));
  const keys = solid.length >= 4 ? solid : all;

  const NOISE_KEY =
    /(^|[-_])(button|btn|badge|tag|chip|pill|input|card|nav|navbar|banner|cta|link|tooltip|modal|avatar|tab|progress|checkbox|radio|switch|slider|table|icon|spinner|searchguide|popover|tagdata|box|border|stroke|divider|text|font|fg|foreground|shadow|danger|error|warn|warning|success|info|accent|brand|disabled|hover|pressed|active|focus|selected|emphasis|inverse|inverted|backdrop|overlay|scrim|recommendation|education|contrast|critical|destructive|negative|positive|highlight|promo|callout|toast|notification|chart|series|green|purple|pink|red|orange|yellow|blue|teal|indigo|violet|amber|lime|emerald|cyan|magenta|coral|rose|dark-card|dark-surface|surface-dark|pagefind)(-|$)/i;
  const DEFAULT_SURFACE_HINT = /(canvas|page|body|default|main|card|paper|elevated|panel|subtle|secondary|muted|surface|alt|container|layer)/i;

  const isCleanCanvas = (k) => !NOISE_KEY.test(k) && !/^background-(color|colour|hex)$/i.test(k);
  const directBg = keys.filter((k) => /^(bg|background)[-_]/.test(k) && isCleanCanvas(k));
  const directSurf = keys.filter((k) => /^(surface|canvas|paper)[-_]/.test(k) && isCleanCanvas(k));
  const scopedBg = keys.filter(
    (k) => /(^|[-_])(bg|background|surface|canvas|page)[-_](canvas|page|body|default|main|app|base|paper|ivory|parchment|white|black)$/.test(k) && isCleanCanvas(k)
  );
  const isNeutralExtreme = (val, maxCh = 28) => {
    const c = parseColor(val);
    if (!c || rgbChroma(c) > maxCh) return false;
    const l = relativeLuminance(c);
    return l <= 0.12 || l >= 0.78;
  };
  const bgKeys = directBg.length ? directBg : scopedBg;
  const surfaceKeys = directSurf;

  const neutralBgKeys = bgKeys.filter((k) => isNeutralExtreme(colors[k], 12)).length
    ? bgKeys.filter((k) => isNeutralExtreme(colors[k], 12))
    : bgKeys.filter((k) => isNeutralExtreme(colors[k], 28));
  const neutralSurfKeys = surfaceKeys.filter((k) => isNeutralExtreme(colors[k], 12)).length
    ? surfaceKeys.filter((k) => isNeutralExtreme(colors[k], 12))
    : surfaceKeys.filter((k) => isNeutralExtreme(colors[k], 28));

  let canvasKey =
    neutralBgKeys.find((k) => /(canvas|page|body|default|main|pure-white|white|black|app)$/.test(k)) ||
    neutralBgKeys.find((k) => !/dark-theme/i.test(k)) ||
    neutralBgKeys[0] ||
    neutralSurfKeys.find((k) => /(canvas|page|body|default|main|paper|app)$/.test(k)) ||
    neutralSurfKeys[0] ||
    null;

  if (!canvasKey) {
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

    const pureNeutralExtreme = keys.filter((k) => isCleanCanvas(k) && isNeutralExtreme(colors[k], 12));
    const cleanNeutralExtreme = keys.filter((k) => isCleanCanvas(k) && isNeutralExtreme(colors[k], 28));
    const anyNeutralExtreme = keys.filter((k) => isNeutralExtreme(colors[k], 18));
    const cleanLowChroma = keys.filter((k) => isCleanCanvas(k) && rgbChroma(colors[k]) <= 34);
    const polarMatch = (poolList) =>
      wantPolarity
        ? poolList.filter((k) => {
            const c = parseColor(colors[k]);
            return c && (wantPolarity === "light" ? relativeLuminance(c) > 0.5 : relativeLuminance(c) < 0.5);
          })
        : [];
    const basePool = pureNeutralExtreme.length
      ? pureNeutralExtreme
      : cleanNeutralExtreme.length
      ? cleanNeutralExtreme
      : anyNeutralExtreme.length
      ? anyNeutralExtreme
      : cleanLowChroma.length
      ? cleanLowChroma
      : keys;
    const polarized = polarMatch(basePool).length
      ? polarMatch(basePool)
      : polarMatch(anyNeutralExtreme).length
      ? polarMatch(anyNeutralExtreme)
      : [];
    const pool = polarized.length ? polarized : basePool;

    let best = null;
    let bestDist = -1;
    let bestLum = -1;
    // Prefer light canvas when both light (lum >= 0.82) and dark neutrals exist and no polarity vote forces dark
    const hasLightNeutral = pool.some((k) => {
      const c = parseColor(colors[k]);
      return c && relativeLuminance(c) >= 0.82;
    });
    const effPool =
      !wantPolarity && hasLightNeutral
        ? pool.filter((k) => {
            const c = parseColor(colors[k]);
            return c && relativeLuminance(c) >= 0.82;
          })
        : pool;
    for (const k of effPool) {
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

  let canvasVal = colors[canvasKey] || "#ffffff";
  const canvasLumRaw = parseColor(canvasVal) ? relativeLuminance(parseColor(canvasVal)) : 0.9;
  if (rgbChroma(canvasVal) > 45 || (canvasLumRaw > 0.14 && canvasLumRaw < 0.72)) {
    canvasVal = "#ffffff";
  }
  const canvasLum = parseColor(canvasVal) ? relativeLuminance(parseColor(canvasVal)) : 0.9;
  const isLightCanvas = canvasLum >= 0.35;

  const samePolarityNeutral = (list) =>
    list.filter((k) => {
      if (k === canvasKey) return false;
      if (NOISE_KEY.test(k)) return false;
      if (isLightCanvas && /dark-theme|surface-dark|bg-dark/i.test(k)) return false;
      if (!isLightCanvas && /light-theme|surface-light|bg-light/i.test(k)) return false;
      const c = parseColor(colors[k]);
      if (!c || rgbChroma(c) > 22) return false;
      const l = relativeLuminance(c);
      const cr = contrastRatio(c, parseColor(canvasVal));
      if (cr > (isLightCanvas ? 1.3 : 2.1)) return false;
      return isLightCanvas ? l >= 0.85 : l <= 0.08;
    });

  const allSurfCandidates = samePolarityNeutral([...bgKeys, ...surfaceKeys]);
  const fallbackSurfCandidates = allSurfCandidates.length
    ? allSurfCandidates
    : samePolarityNeutral(keys.filter((k) => isCleanCanvas(k)));
  const hintedSurf = fallbackSurfCandidates.filter((k) => DEFAULT_SURFACE_HINT.test(k));
  const surfaceKey = hintedSurf[0] || fallbackSurfCandidates[0] || canvasKey;
  const surfaceVal = surfaceKey && colors[surfaceKey] && rgbChroma(colors[surfaceKey]) <= 28 ? colors[surfaceKey] : canvasVal;

  return {
    canvasKey,
    surfaceKey,
    canvas: canvasVal,
    surface: surfaceVal,
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

  const canvasParsed = parseColor(canvas) || [255, 255, 255, 1];
  const borderCandidates = pickFrom.filter((k) => {
    if (!/(^|[-_])(border|divider|line)([-_]|$)/i.test(k)) return false;
    if (/(danger|error|warn|warning|success|info|critical|destructive|focus|brand|accent|active|selected|red|orange|yellow|green|blue|purple|pink)/i.test(k)) return false;
    const c = parseColor(colors[k]);
    if (!c || rgbChroma(c) > 32) return false;
    const cr = contrastRatio(c, canvasParsed);
    return cr >= 1.08 && cr <= 2.8;
  });
  const borderKey =
    borderCandidates.find((k) => /(default|subtle|muted|neutral|gray|grey|primary|sand|light|base)/i.test(k)) ||
    borderCandidates[0] ||
    null;
  const border = borderKey ? colors[borderKey] : `color-mix(in srgb, ${text} 14%, transparent)`;

  const canvasC = parseColor(canvas) || [255, 255, 255, 1];
  const goodBrand = (v) => {
    const c = parseColor(v);
    if (!c || (c[3] !== undefined && c[3] < 0.72)) return false;
    const cr = contrastRatio(c, canvasC);
    return cr >= 1.28 || (rgbChroma(c) >= 60 && cr >= 1.18);
  };
  const notWash = (v) => {
    const c = parseColor(v);
    if (!c) return false;
    const cr = contrastRatio(c, canvasC);
    return cr >= 1.8 || rgbChroma(c) >= 60;
  };
  const rawPrimary = colors.primary;
  const namedBrandKey = pickFrom.find(
    (k) =>
      /(^|[-_])(brand|accent|cta|primary)([-_]|$)/i.test(k) &&
      !/(tint|subtlest|soft|lightest|light-blue|hover|focus|ring|surface|bg|background|border|shadow|disabled|experimental-do-not-use|inverse|50|100|10|20|25)$/i.test(k) &&
      goodBrand(colors[k]) &&
      contrastRatio(parseColor(colors[k]), canvasC) >= 2.0
  );
  const contrastBtnBg = Object.values(components || {})
    .filter((c) => c && c.kind === "button" && c.backgroundColor && !/transparent/i.test(c.backgroundColor) && goodBrand(c.backgroundColor))
    .sort((a, b) => rgbChroma(b.backgroundColor) - rgbChroma(a.backgroundColor))[0]?.backgroundColor;
  const brand =
    (rawPrimary && goodBrand(rawPrimary) && notWash(rawPrimary) ? rawPrimary : null) ||
    namedBrandKey ||
    (first(/^brand[-_]/) && goodBrand(colors[first(/^brand[-_]/)]) ? colors[first(/^brand[-_]/)] : null) ||
    (rawPrimary && goodBrand(rawPrimary) ? rawPrimary : null) ||
    contrastBtnBg ||
    text;

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
    overview: truncate(prose?.overview, 4000),
    dos: truncate(prose?.dos, 4000),
  };
}

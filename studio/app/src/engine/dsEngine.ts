/**
 * Deterministic Design System Math & Token Compiler (Zero AI).
 *
 * Implements sRGB <-> Linear RGB <-> Oklab <-> OKLCH perceptual color space,
 * 11-step tailwind-style ramps, WCAG 2.2 luminance contrast + APCA (Lc),
 * color-vision deficiency projection, modular typography + fluid clamp(),
 * concentric radii, elevation shadows, and multi-format exporters.
 */

export interface OklchColor {
  l: number; // 0..1
  c: number; // 0..0.4
  h: number; // 0..360
}

export type HarmonyMode = 'complementary' | 'split' | 'triadic' | 'analogous' | 'tetradic' | 'monochrome';
export type ElevationStyle = 'flat' | 'layered' | 'brutalist' | 'glass';
export type CvdMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface DesignSystemDoc {
  name: string;
  tagline: string;
  handle: string;
  seedSlug: string | null;
  polarity: 'dark' | 'light';
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  neutralTemp: number; // -1 cool .. +1 warm
  harmony: HarmonyMode;
  displayFont: string;
  bodyFont: string;
  monoFont: string;
  baseFontPx: number;
  typeRatio: number;
  baseSpacePx: number;
  baseRadiusPx: number;
  elevationStyle: ElevationStyle;
  elevationStrength: number; // 0..1
}

export interface RampStop {
  step: number;
  hex: string;
  oklch: string;
  onLightContrast: number;
  onDarkContrast: number;
}

export interface CompiledSystem {
  ramps: {
    primary: RampStop[];
    secondary: RampStop[];
    accent: RampStop[];
    neutral: RampStop[];
    success: RampStop[];
    warning: RampStop[];
    danger: RampStop[];
  };
  semantic: {
    canvas: string;
    surface: string;
    surfaceAlt: string;
    ink: string;
    muted: string;
    border: string;
    borderStrong: string;
    brand: string;
    brandFg: string;
    secondary: string;
    secondaryFg: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
    shadowSm: string;
    shadowMd: string;
    shadowLg: string;
  };
  typeScale: {
    token: string;
    px: number;
    rem: number;
    clampCss: string;
    lineHeight: number;
    trackingEm: number;
    weight: number;
  }[];
  spacingScale: { token: string; px: number; rem: number }[];
  radii: { none: string; sm: string; md: string; lg: string; xl: string; pill: string; innerNested: string };
  audits: {
    pair: string;
    fg: string;
    bg: string;
    wcag: number;
    apca: number;
    aaPass: boolean;
    aaaPass: boolean;
  }[];
}

export const FONT_OPTIONS = [
  { label: 'Geist', stack: "'Geist', 'Inter', system-ui, sans-serif" },
  { label: 'Inter', stack: "'Inter', system-ui, sans-serif" },
  { label: 'IBM Plex Sans', stack: "'IBM Plex Sans', system-ui, sans-serif" },
  { label: 'Plus Jakarta Sans', stack: "'Plus Jakarta Sans', system-ui, sans-serif" },
  { label: 'Source Serif 4', stack: "'Source Serif 4', Georgia, serif" },
  { label: 'System Sans', stack: "system-ui, -apple-system, 'Segoe UI', sans-serif" },
];

export const MONO_OPTIONS = [
  { label: 'JetBrains Mono', stack: "'JetBrains Mono', ui-monospace, monospace" },
  { label: 'IBM Plex Mono', stack: "'IBM Plex Mono', ui-monospace, monospace" },
  { label: 'System Mono', stack: "ui-monospace, SFMono-Regular, Menlo, monospace" },
];

export const TYPE_RATIOS = [
  { label: 'Minor Second (1.067)', value: 1.067 },
  { label: 'Major Second (1.125)', value: 1.125 },
  { label: 'Minor Third (1.200)', value: 1.2 },
  { label: 'Major Third (1.250)', value: 1.25 },
  { label: 'Perfect Fourth (1.333)', value: 1.333 },
  { label: 'Aug. Fourth (1.414)', value: 1.414 },
  { label: 'Perfect Fifth (1.500)', value: 1.5 },
  { label: 'Golden Ratio (1.618)', value: 1.618 },
];

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

export function normalizeHex(raw: string): string {
  const s = (raw || '').trim();
  const m3 = /^#?([0-9a-f]{3})$/i.exec(s);
  if (m3) {
    return '#' + m3[1].split('').map((c) => c + c).join('').toLowerCase();
  }
  const m6 = /^#?([0-9a-f]{6})/i.exec(s);
  if (m6) return '#' + m6[1].toLowerCase();
  return '#2563eb';
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = normalizeHex(hex).slice(1);
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const to2 = (v: number) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0');
  return `#${to2(r)}${to2(g)}${to2(b)}`;
}

function srgbToLin(c255: number): number {
  const c = clamp(c255 / 255, 0, 1);
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linToSrgb(c: number): number {
  const x = clamp(c, 0, 1);
  const v = x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
  return clamp(Math.round(v * 255), 0, 255);
}

export function hexToOklch(hex: string): OklchColor {
  const [r8, g8, b8] = hexToRgb(hex);
  const r = srgbToLin(r8);
  const g = srgbToLin(g8);
  const b = srgbToLin(b8);

  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bk = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  const C = Math.hypot(a, bk);
  let H = (Math.atan2(bk, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { l: L, c: C, h: Number.isFinite(H) ? H : 0 };
}

function oklchToLinearRgb(l: number, c: number, h: number): [number, number, number] {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  return [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];
}

function inGamut([r, g, b]: [number, number, number]): boolean {
  return r >= -0.0005 && r <= 1.0005 && g >= -0.0005 && g <= 1.0005 && b >= -0.0005 && b <= 1.0005;
}

export function oklchToHex(l: number, c: number, h: number): string {
  const L = clamp(l, 0, 1);
  // Gamut map by binary-searching maximum in-gamut chroma at target (L, h)
  let hi = Math.max(0, c);
  let lo = 0;
  let lin = oklchToLinearRgb(L, hi, h);
  if (!inGamut(lin)) {
    for (let i = 0; i < 14; i++) {
      const mid = (lo + hi) * 0.5;
      if (inGamut(oklchToLinearRgb(L, mid, h))) lo = mid;
      else hi = mid;
    }
    lin = oklchToLinearRgb(L, lo, h);
  }
  return rgbToHex(linToSrgb(lin[0]), linToSrgb(lin[1]), linToSrgb(lin[2]));
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(srgbToLin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function wcagContrast(fgHex: string, bgHex: string): number {
  const l1 = relativeLuminance(fgHex);
  const l2 = relativeLuminance(bgHex);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return Number(((hi + 0.05) / (lo + 0.05)).toFixed(2));
}

/** APCA W3 Lc contrast approximation (-108..+106 absolute perceptual contrast). */
export function apcaContrast(fgHex: string, bgHex: string): number {
  const y = (hex: string) => {
    const [r, g, b] = hexToRgb(hex).map((v) => Math.pow(clamp(v / 255, 0, 1), 2.4));
    const lum = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
    return lum > 0.022 ? lum : lum + Math.pow(0.022 - lum, 1.414);
  };
  const yt = y(fgHex);
  const yb = y(bgHex);
  if (Math.abs(yb - yt) < 0.0005) return 0;
  const sapc = yb > yt
    ? (Math.pow(yb, 0.56) - Math.pow(yt, 0.57)) * 1.14
    : (Math.pow(yb, 0.65) - Math.pow(yt, 0.62)) * 1.14;
  const lc = Math.abs(sapc) < 0.1 ? 0 : sapc > 0 ? (sapc - 0.027) * 100 : (sapc + 0.027) * 100;
  return Number(Math.abs(lc).toFixed(1));
}

export function solveReadableOnBg(candidateHex: string, bgHex: string, minWcag = 4.5): string {
  if (wcagContrast(candidateHex, bgHex) >= minWcag) return candidateHex;
  const { c, h } = hexToOklch(candidateHex);
  const bgLum = relativeLuminance(bgHex);
  const goLight = bgLum < 0.36;
  let lo = goLight ? 0.55 : 0.08;
  let hi = goLight ? 0.99 : 0.52;
  let best = goLight ? '#fafafa' : '#09090b';
  for (let i = 0; i < 16; i++) {
    const mid = (lo + hi) * 0.5;
    const hex = oklchToHex(mid, c * 0.85, h);
    const cr = wcagContrast(hex, bgHex);
    if (cr >= minWcag) {
      best = hex;
      if (goLight) hi = mid;
      else lo = mid;
    } else {
      if (goLight) lo = mid;
      else hi = mid;
    }
  }
  return wcagContrast(best, bgHex) >= minWcag ? best : goLight ? '#fafafa' : '#09090b';
}

export function harmonyPair(primaryHex: string, mode: HarmonyMode): { secondary: string; accent: string } {
  const { l, c, h } = hexToOklch(primaryHex);
  const normH = (deg: number) => ((deg % 360) + 360) % 360;
  const ch = Math.max(c, 0.11);
  switch (mode) {
    case 'complementary':
      return { secondary: oklchToHex(l, ch * 0.9, normH(h + 180)), accent: oklchToHex(clamp(l + 0.06, 0.48, 0.76), ch * 0.85, normH(h + 150)) };
    case 'split':
      return { secondary: oklchToHex(l, ch * 0.92, normH(h + 150)), accent: oklchToHex(l, ch * 0.92, normH(h + 210)) };
    case 'triadic':
      return { secondary: oklchToHex(l, ch * 0.95, normH(h + 120)), accent: oklchToHex(l, ch * 0.95, normH(h + 240)) };
    case 'analogous':
      return { secondary: oklchToHex(clamp(l + 0.04, 0.42, 0.74), ch * 0.9, normH(h + 28)), accent: oklchToHex(clamp(l - 0.04, 0.4, 0.72), ch * 0.9, normH(h - 28)) };
    case 'tetradic':
      return { secondary: oklchToHex(l, ch * 0.9, normH(h + 90)), accent: oklchToHex(l, ch * 0.9, normH(h + 270)) };
    case 'monochrome':
      return { secondary: oklchToHex(clamp(l + 0.14, 0.45, 0.85), c * 0.55, h), accent: oklchToHex(clamp(l - 0.14, 0.25, 0.7), c * 0.75, h) };
  }
}

const RAMP_STEPS: [number, number, number][] = [
  [50, 0.975, 0.14],
  [100, 0.942, 0.26],
  [200, 0.885, 0.46],
  [300, 0.805, 0.68],
  [400, 0.715, 0.88],
  [500, 0.625, 1.0],
  [600, 0.545, 0.98],
  [700, 0.46, 0.88],
  [800, 0.375, 0.72],
  [900, 0.295, 0.52],
  [950, 0.205, 0.36],
];

export function generateRamp(baseHex: string, neutralLock = false, neutralTemp = 0): RampStop[] {
  const { c, h } = hexToOklch(baseHex);
  const baseC = neutralLock ? Math.abs(neutralTemp) * 0.016 : Math.max(c, 0.09);
  const useH = neutralLock ? (neutralTemp < 0 ? 250 : 65) : h;

  return RAMP_STEPS.map(([step, l, cMult]) => {
    const hex = oklchToHex(l, baseC * cMult, useH);
    const real = hexToOklch(hex);
    return {
      step,
      hex,
      oklch: `oklch(${(real.l * 100).toFixed(1)}% ${real.c.toFixed(3)} ${Math.round(real.h)})`,
      onLightContrast: wcagContrast(hex, '#ffffff'),
      onDarkContrast: wcagContrast(hex, '#09090b'),
    };
  });
}

export function compileDesignSystem(doc: DesignSystemDoc): CompiledSystem {
  const ramps = {
    primary: generateRamp(doc.primaryHex),
    secondary: generateRamp(doc.secondaryHex),
    accent: generateRamp(doc.accentHex),
    neutral: generateRamp('#71717a', true, doc.neutralTemp),
    success: generateRamp('#10b981'),
    warning: generateRamp('#f59e0b'),
    danger: generateRamp('#ef4444'),
  };

  const isDark = doc.polarity === 'dark';
  const n = (step: number) => ramps.neutral.find((s) => s.step === step)!.hex;
  const p = (step: number) => ramps.primary.find((s) => s.step === step)!.hex;
  const sec = (step: number) => ramps.secondary.find((s) => s.step === step)!.hex;

  const canvas = isDark ? oklchToHex(0.14, Math.abs(doc.neutralTemp) * 0.012, doc.neutralTemp < 0 ? 250 : 65) : '#ffffff';
  const surface = isDark ? oklchToHex(0.18, Math.abs(doc.neutralTemp) * 0.014, doc.neutralTemp < 0 ? 250 : 65) : n(50);
  const surfaceAlt = isDark ? oklchToHex(0.22, Math.abs(doc.neutralTemp) * 0.015, doc.neutralTemp < 0 ? 250 : 65) : n(100);
  const ink = isDark ? '#fafafa' : '#09090b';
  const muted = solveReadableOnBg(isDark ? n(400) : n(600), canvas, 4.5);
  const border = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(9,9,11,0.09)';
  const borderStrong = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(9,9,11,0.18)';

  const brand = solveReadableOnBg(doc.primaryHex, canvas, 3.0);
  const brandFg = relativeLuminance(brand) > 0.35 ? '#09090b' : '#ffffff';
  const secondary = solveReadableOnBg(doc.secondaryHex, canvas, 3.0);
  const secondaryFg = relativeLuminance(secondary) > 0.35 ? '#09090b' : '#ffffff';
  const accent = solveReadableOnBg(sec(500), canvas, 3.0);

  const st = doc.elevationStrength;
  const shadowColor = isDark ? `rgba(0,0,0,${(0.55 * st).toFixed(2)})` : `rgba(9,9,11,${(0.12 * st).toFixed(2)})`;
  let shadowSm = 'none';
  let shadowMd = 'none';
  let shadowLg = 'none';
  if (doc.elevationStyle === 'layered') {
    shadowSm = `0 1px 2px ${shadowColor}`;
    shadowMd = `0 4px 12px -2px ${shadowColor}, 0 1px 3px ${shadowColor}`;
    shadowLg = `0 16px 36px -8px ${shadowColor}, 0 4px 10px ${shadowColor}`;
  } else if (doc.elevationStyle === 'brutalist') {
    const col = isDark ? borderStrong : '#09090b';
    shadowSm = `2px 2px 0 0 ${col}`;
    shadowMd = `4px 4px 0 0 ${col}`;
    shadowLg = `6px 6px 0 0 ${col}`;
  } else if (doc.elevationStyle === 'glass') {
    shadowSm = `inset 0 1px 0 rgba(255,255,255,0.12)`;
    shadowMd = `inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 28px ${shadowColor}`;
    shadowLg = `inset 0 1px 0 rgba(255,255,255,0.18), 0 20px 44px ${shadowColor}`;
  }

  const r = doc.typeRatio;
  const b = doc.baseFontPx;
  const steps = [
    { token: 'display', pow: 4, lh: 1.05, tr: -0.035, w: 700 },
    { token: 'h1', pow: 3, lh: 1.1, tr: -0.028, w: 700 },
    { token: 'h2', pow: 2, lh: 1.18, tr: -0.02, w: 650 },
    { token: 'h3', pow: 1, lh: 1.28, tr: -0.012, w: 600 },
    { token: 'body', pow: 0, lh: 1.55, tr: 0, w: 400 },
    { token: 'sm', pow: -0.75, lh: 1.48, tr: 0.005, w: 450 },
    { token: 'xs', pow: -1.5, lh: 1.4, tr: 0.018, w: 500 },
  ];
  const typeScale = steps.map((s) => {
    const px = Number((b * Math.pow(r, s.pow)).toFixed(1));
    const minPx = Number(Math.max(11, px * 0.82).toFixed(1));
    const rem = Number((px / 16).toFixed(3));
    return {
      token: s.token,
      px,
      rem,
      clampCss: `clamp(${(minPx / 16).toFixed(3)}rem, ${(minPx * 0.55).toFixed(1)}px + ${(px * 0.14).toFixed(2)}vw, ${rem}rem)`,
      lineHeight: s.lh,
      trackingEm: s.tr,
      weight: s.w,
    };
  });

  const sp = doc.baseSpacePx;
  const spacingScale = [
    ['1', 0.5],
    ['2', 1],
    ['3', 1.5],
    ['4', 2],
    ['6', 3],
    ['8', 4],
    ['10', 5],
    ['12', 6],
    ['16', 8],
  ].map(([k, mult]) => {
    const px = Math.round(sp * Number(mult));
    return { token: String(k), px, rem: Number((px / 16).toFixed(3)) };
  });

  const br = doc.baseRadiusPx;
  const pad = Math.round(sp * 1.5);
  const radii = {
    none: '0px',
    sm: `${Math.max(0, Math.round(br * 0.5))}px`,
    md: `${br}px`,
    lg: `${Math.round(br * 1.5)}px`,
    xl: `${Math.round(br * 2)}px`,
    pill: '999px',
    innerNested: `${Math.max(0, Math.round(br * 1.5) - pad)}px`,
  };

  const rawAudits = [
    ['Primary Ink / Canvas', ink, canvas],
    ['Muted Ink / Canvas', muted, canvas],
    ['Primary Ink / Surface', ink, surface],
    ['Brand CTA Label / Brand', brandFg, brand],
    ['Brand Accent / Canvas', brand, canvas],
    ['Secondary Label / Secondary', secondaryFg, secondary],
  ] as const;

  const audits = rawAudits.map(([pair, fg, bg]) => {
    const wcag = wcagContrast(fg, bg);
    const apca = apcaContrast(fg, bg);
    return { pair, fg, bg, wcag, apca, aaPass: wcag >= 4.5, aaaPass: wcag >= 7.0 };
  });

  return {
    ramps,
    semantic: {
      canvas,
      surface,
      surfaceAlt,
      ink,
      muted,
      border,
      borderStrong,
      brand,
      brandFg,
      secondary,
      secondaryFg,
      accent,
      success: p(500) === '#10b981' ? '#10b981' : ramps.success[5].hex,
      warning: ramps.warning[5].hex,
      danger: ramps.danger[5].hex,
      shadowSm,
      shadowMd,
      shadowLg,
    },
    typeScale,
    spacingScale,
    radii,
    audits,
  };
}

export function applyCvdSimulation(hex: string, mode: CvdMode): string {
  if (mode === 'normal') return hex;
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  let m: number[];
  if (mode === 'protanopia') m = [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758];
  else if (mode === 'deuteranopia') m = [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7];
  else if (mode === 'tritanopia') m = [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525];
  else {
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return rgbToHex(lum * 255, lum * 255, lum * 255);
  }
  return rgbToHex((r * m[0] + g * m[1] + b * m[2]) * 255, (r * m[3] + g * m[4] + b * m[5]) * 255, (r * m[6] + g * m[7] + b * m[8]) * 255);
}

export function seedSystemFromCatalog(raw: Record<string, unknown>): Partial<DesignSystemDoc> {
  const brand = normalizeHex(String(raw.brand || '#2563eb'));
  const pal = Array.isArray(raw.palette) ? (raw.palette as { value?: string }[]) : [];
  const second = pal.find((p) => p.value && normalizeHex(p.value) !== brand)?.value;
  const third = pal.find((p) => p.value && normalizeHex(p.value) !== brand && normalizeHex(p.value) !== normalizeHex(second || ''))?.value;
  const derived = harmonyPair(brand, 'split');
  const radiusNum = parseFloat(String(raw.radius || '8'));
  const typeArr = Array.isArray(raw.type) ? (raw.type as { fontFamily?: string }[]) : [];
  const firstFont = typeArr[0]?.fontFamily ? String(typeArr[0].fontFamily).split(',')[0].replace(/['"]/g, '').trim() : 'Inter';
  const fontMatch = FONT_OPTIONS.find((f) => f.label.toLowerCase().includes(firstFont.toLowerCase()))?.stack || `'${firstFont}', 'Inter', system-ui, sans-serif`;

  return {
    name: String(raw.name || 'Custom System'),
    tagline: String(raw.style || 'Systematic tokens grounded in verified optical ratios'),
    handle: '@' + String(raw.slug || 'system').replace(/[^a-z0-9]/gi, '').toLowerCase(),
    seedSlug: String(raw.slug || ''),
    polarity: raw.theme === 'light' ? 'light' : 'dark',
    primaryHex: brand,
    secondaryHex: second ? normalizeHex(second) : derived.secondary,
    accentHex: third ? normalizeHex(third) : derived.accent,
    displayFont: fontMatch,
    bodyFont: fontMatch,
    baseRadiusPx: Number.isFinite(radiusNum) ? clamp(Math.round(radiusNum), 0, 24) : 8,
  };
}

export function exportDesignSystem(doc: DesignSystemDoc, compiled: CompiledSystem, format: 'css' | 'tailwind' | 'dtcg' | 'designmd'): string {
  const { semantic, ramps, typeScale, spacingScale, radii } = compiled;
  if (format === 'css') {
    const lines = [
      `/* ${doc.name} — Design Sourcebook Deterministic Tokens */`,
      `:root {`,
      `  --ds-canvas: ${semantic.canvas};`,
      `  --ds-surface: ${semantic.surface};`,
      `  --ds-surface-alt: ${semantic.surfaceAlt};`,
      `  --ds-ink: ${semantic.ink};`,
      `  --ds-muted: ${semantic.muted};`,
      `  --ds-border: ${semantic.border};`,
      `  --ds-brand: ${semantic.brand};`,
      `  --ds-brand-fg: ${semantic.brandFg};`,
      `  --ds-secondary: ${semantic.secondary};`,
      `  --ds-accent: ${semantic.accent};`,
      `  --ds-font-display: ${doc.displayFont};`,
      `  --ds-font-body: ${doc.bodyFont};`,
      `  --ds-font-mono: ${doc.monoFont};`,
      `  --ds-radius-sm: ${radii.sm};`,
      `  --ds-radius-md: ${radii.md};`,
      `  --ds-radius-lg: ${radii.lg};`,
      `  --ds-radius-inner: ${radii.innerNested};`,
      `  --ds-shadow-md: ${semantic.shadowMd};`,
    ];
    for (const [name, list] of Object.entries(ramps)) {
      for (const s of list) lines.push(`  --ds-${name}-${s.step}: ${s.hex};`);
    }
    for (const t of typeScale) lines.push(`  --ds-text-${t.token}: ${t.clampCss};`);
    for (const sp of spacingScale) lines.push(`  --ds-space-${sp.token}: ${sp.px}px;`);
    lines.push('}');
    return lines.join('\n');
  }
  if (format === 'tailwind') {
    const lines = [`@import "tailwindcss";`, `@theme {`];
    for (const [name, list] of Object.entries(ramps)) {
      for (const s of list) lines.push(`  --color-${name}-${s.step}: ${s.hex};`);
    }
    lines.push(`  --color-canvas: ${semantic.canvas};`);
    lines.push(`  --color-surface: ${semantic.surface};`);
    lines.push(`  --color-ink: ${semantic.ink};`);
    lines.push(`  --color-muted: ${semantic.muted};`);
    lines.push(`  --font-display: ${doc.displayFont};`);
    lines.push(`  --font-sans: ${doc.bodyFont};`);
    lines.push(`  --font-mono: ${doc.monoFont};`);
    lines.push(`  --radius-sm: ${radii.sm};`);
    lines.push(`  --radius-md: ${radii.md};`);
    lines.push(`  --radius-lg: ${radii.lg};`);
    lines.push('}');
    return lines.join('\n');
  }
  if (format === 'dtcg') {
    const colorObj: Record<string, unknown> = {
      canvas: { $value: semantic.canvas, $type: 'color' },
      surface: { $value: semantic.surface, $type: 'color' },
      ink: { $value: semantic.ink, $type: 'color' },
      muted: { $value: semantic.muted, $type: 'color' },
      brand: { $value: semantic.brand, $type: 'color' },
    };
    for (const [name, list] of Object.entries(ramps)) {
      colorObj[name] = Object.fromEntries(list.map((s) => [s.step, { $value: s.hex, $type: 'color', $description: s.oklch }]));
    }
    return JSON.stringify(
      {
        $schema: 'https://tr.designtokens.org/format/',
        name: doc.name,
        color: colorObj,
        typography: Object.fromEntries(typeScale.map((t) => [t.token, { $value: `${t.px}px`, $type: 'dimension' }])),
        spacing: Object.fromEntries(spacingScale.map((s) => [s.token, { $value: `${s.px}px`, $type: 'dimension' }])),
        radius: Object.fromEntries(Object.entries(radii).map(([k, v]) => [k, { $value: v, $type: 'dimension' }])),
      },
      null,
      2,
    );
  }
  return [
    `# ${doc.name}`,
    ``,
    `> ${doc.tagline}${doc.seedSlug ? ` (seeded from \`${doc.seedSlug}\`)` : ''}`,
    ``,
    `## Surfaces & Polarity (${doc.polarity})`,
    `- Canvas: \`${semantic.canvas}\``,
    `- Surface: \`${semantic.surface}\``,
    `- Primary Ink: \`${semantic.ink}\``,
    `- Muted Ink: \`${semantic.muted}\``,
    `- Primary Brand: \`${semantic.brand}\` (on-brand text: \`${semantic.brandFg}\`)`,
    ``,
    `## Typography (Ratio ${doc.typeRatio})`,
    `- Display: \`${doc.displayFont}\``,
    `- Body: \`${doc.bodyFont}\``,
    `- Mono: \`${doc.monoFont}\``,
    ...typeScale.map((t) => `- \`${t.token}\`: \`${t.px}px\` (\`${t.clampCss}\`) · weight ${t.weight} · lh ${t.lineHeight}`),
    ``,
    `## Geometry & Spacing`,
    `- Grid base: \`${doc.baseSpacePx}px\``,
    `- Radius base: \`${doc.baseRadiusPx}px\` · nested inner radius: \`${radii.innerNested}\``,
    `- Elevation (${doc.elevationStyle}): \`${semantic.shadowMd}\``,
  ].join('\n');
}

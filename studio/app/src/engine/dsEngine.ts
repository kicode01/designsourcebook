/**
 * Deterministic Design System Math & Token Compiler (Zero AI).
 *
 * Implements sRGB <-> Linear RGB <-> Oklab <-> OKLCH perceptual color space,
 * 11-step Radix-role ramps with true achromatic protection, dual-polarity
 * semantic tokens, WCAG 2.2 + APCA (Lc) contrast verification & matrix,
 * CVD vision simulation, Utopia fluid clamp() typography, concentric radii,
 * elevation shadows, motion curves, curated archetypes, and 7 code exporters.
 */

export interface OklchColor {
  l: number; // 0..1
  c: number; // 0..0.4
  h: number; // 0..360
}

export type HarmonyMode = 'complementary' | 'split' | 'triadic' | 'analogous' | 'tetradic' | 'monochrome';
export type ElevationStyle = 'flat' | 'layered' | 'brutalist' | 'glass';
export type CvdMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
export type SurfaceContrastMode = 'subtle' | 'balanced' | 'high';
export type DensityMode = 'compact' | 'comfortable' | 'spacious';
export type ExportFormatId = 'css' | 'shadcn' | 'tailwind' | 'dtcg' | 'figma' | 'ts' | 'designmd';

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
  successHex?: string;
  warningHex?: string;
  dangerHex?: string;
  infoHex?: string;
  chromaBoost?: number; // 0.4..1.4
  surfaceContrast?: SurfaceContrastMode;
  density?: DensityMode;
  borderWidthPx?: number;
  headingWeight?: number;
  bodyLineHeight?: number;
  fluidMinVw?: number;
  fluidMaxVw?: number;
  fluidStrength?: number; // 0..1
}

export interface RampStop {
  step: number;
  role: string;
  hex: string;
  rgb: string;
  alphaHex: string;
  oklch: string;
  onLightContrast: number;
  onDarkContrast: number;
}

export interface SemanticTokens {
  canvas: string;
  surface: string;
  surfaceAlt: string;
  surfaceElevated: string;
  ink: string;
  muted: string;
  border: string;
  borderStrong: string;
  ring: string;
  brand: string;
  brandFg: string;
  secondary: string;
  secondaryFg: string;
  accent: string;
  accentFg: string;
  success: string;
  successFg: string;
  warning: string;
  warningFg: string;
  danger: string;
  dangerFg: string;
  info: string;
  infoFg: string;
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowXl: string;
  controlHeightSm: string;
  controlHeightMd: string;
  controlHeightLg: string;
  borderWidth: string;
  densityMult: number;
}

export interface TypeScaleStep {
  token: string;
  px: number;
  minPx: number;
  rem: number;
  clampCss: string;
  lineHeight: number;
  trackingEm: number;
  weight: number;
  measureCh: string;
}

export interface ContrastAuditItem {
  pair: string;
  fg: string;
  bg: string;
  wcag: number;
  apca: number;
  aaPass: boolean;
  aaaPass: boolean;
}

export interface ContrastMatrixCell {
  fgName: string;
  bgName: string;
  fg: string;
  bg: string;
  wcag: number;
  apca: number;
  aaLarge: boolean;
  aaPass: boolean;
  aaaPass: boolean;
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
    info: RampStop[];
  };
  semantic: SemanticTokens;
  semanticOpposite: SemanticTokens;
  typeScale: TypeScaleStep[];
  spacingScale: { token: string; px: number; rem: number }[];
  radii: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    pill: string;
    innerNested: string;
  };
  motion: {
    fast: string;
    normal: string;
    slow: string;
    easeOut: string;
    easeInOut: string;
    spring: string;
  };
  audits: ContrastAuditItem[];
  contrastMatrix: ContrastMatrixCell[];
}

export interface AlloFontPreset {
  id: string;
  label: string;
  meta: string;
  stack: string;
  variation: string;
  features: string;
  ligatures?: 'normal' | 'no-contextual';
}

export interface SystemArchetype {
  id: string;
  label: string;
  description: string;
  patch: Partial<DesignSystemDoc>;
}

export const ALLO_STACK = "'Allo', system-ui, sans-serif";

export const FONT_OPTIONS: AlloFontPreset[] = [
  {
    id: 'allo-precision',
    label: 'Allo Precision',
    meta: 'ROND 28',
    stack: ALLO_STACK,
    variation: '"ROND" 28',
    features: '"calt" 1, "liga" 1, "case" 1',
  },
  {
    id: 'allo-balanced',
    label: 'Allo Balanced',
    meta: 'ROND 45',
    stack: ALLO_STACK,
    variation: '"ROND" 45',
    features: '"calt" 1, "liga" 1',
  },
  {
    id: 'allo-friendly',
    label: 'Allo Friendly',
    meta: 'ROND 50',
    stack: ALLO_STACK,
    variation: '"ROND" 50',
    features: '"calt" 1, "liga" 1',
  },
  {
    id: 'allo-sharp',
    label: 'Allo Sharp',
    meta: 'ROND 0',
    stack: ALLO_STACK,
    variation: '"ROND" 0',
    features: '"calt" 1, "liga" 1',
  },
  {
    id: 'allo-round',
    label: 'Allo Round',
    meta: 'ROND 85',
    stack: ALLO_STACK,
    variation: '"ROND" 85',
    features: '"calt" 1, "liga" 1, "ss03" 1',
  },
  {
    id: 'allo-ss01',
    label: 'Allo Single-Story a',
    meta: 'ss01',
    stack: ALLO_STACK,
    variation: '"ROND" 45',
    features: '"ss01" 1, "calt" 1, "liga" 1',
  },
];

export const MONO_OPTIONS: AlloFontPreset[] = [
  {
    id: 'allo-code',
    label: 'Allo Code',
    meta: 'ss02',
    stack: ALLO_STACK,
    variation: '"ROND" 22',
    features: '"tnum" 1, "ss02" 1',
    ligatures: 'no-contextual',
  },
  {
    id: 'allo-tabular',
    label: 'Allo Tabular',
    meta: 'tnum',
    stack: ALLO_STACK,
    variation: '"ROND" 36',
    features: '"tnum" 1, "case" 1',
    ligatures: 'no-contextual',
  },
  {
    id: 'allo-dotted',
    label: 'Allo Dotted Zero',
    meta: 'cv05',
    stack: ALLO_STACK,
    variation: '"ROND" 22',
    features: '"tnum" 1, "cv01" 1, "cv03" 1, "cv04" 1, "cv05" 1',
    ligatures: 'no-contextual',
  },
];

export const SYSTEM_ARCHETYPES: SystemArchetype[] = [
  {
    id: 'obsidian-saas',
    label: 'Obsidian SaaS',
    description: 'Precision dark developer workbench with cool slate surfaces and crisp layered depth',
    patch: {
      name: 'Northwind Obsidian',
      tagline: 'Systematic instruments engineered on verified tokens',
      handle: '@northwind',
      seedSlug: null,
      polarity: 'dark',
      primaryHex: '#0ea5e9',
      secondaryHex: '#6366f1',
      accentHex: '#10b981',
      neutralTemp: -0.25,
      harmony: 'split',
      displayFont: 'allo-precision',
      bodyFont: 'allo-balanced',
      monoFont: 'allo-code',
      baseFontPx: 16,
      typeRatio: 1.25,
      baseSpacePx: 8,
      baseRadiusPx: 8,
      elevationStyle: 'layered',
      elevationStrength: 0.75,
      surfaceContrast: 'balanced',
      density: 'comfortable',
      borderWidthPx: 1,
      chromaBoost: 1,
    },
  },
  {
    id: 'swiss-editorial',
    label: 'Swiss Editorial',
    description: 'High-discipline light grid with razor 0px geometry and crimson signal accent',
    patch: {
      name: 'Helvetia Grid',
      tagline: 'Architectural typography anchored on mathematical grid ratios',
      handle: '@helvetia',
      seedSlug: null,
      polarity: 'light',
      primaryHex: '#e11d48',
      secondaryHex: '#18181b',
      accentHex: '#f59e0b',
      neutralTemp: 0,
      harmony: 'monochrome',
      displayFont: 'allo-sharp',
      bodyFont: 'allo-precision',
      monoFont: 'allo-tabular',
      baseFontPx: 16,
      typeRatio: 1.333,
      baseSpacePx: 8,
      baseRadiusPx: 0,
      elevationStyle: 'flat',
      elevationStrength: 0.3,
      surfaceContrast: 'high',
      density: 'comfortable',
      borderWidthPx: 1,
      chromaBoost: 1,
    },
  },
  {
    id: 'warm-consumer',
    label: 'Warm Consumer',
    description: 'Approachable coral marketplace aesthetic with tactile pill radii and warm neutrals',
    patch: {
      name: 'Solstice Market',
      tagline: 'Human-centric interfaces crafted with warm perceptual color',
      handle: '@solstice',
      seedSlug: null,
      polarity: 'light',
      primaryHex: '#ff385c',
      secondaryHex: '#f97316',
      accentHex: '#8b5cf6',
      neutralTemp: 0.35,
      harmony: 'analogous',
      displayFont: 'allo-friendly',
      bodyFont: 'allo-balanced',
      monoFont: 'allo-code',
      baseFontPx: 16,
      typeRatio: 1.25,
      baseSpacePx: 8,
      baseRadiusPx: 14,
      elevationStyle: 'layered',
      elevationStrength: 0.65,
      surfaceContrast: 'subtle',
      density: 'spacious',
      borderWidthPx: 1,
      chromaBoost: 1,
    },
  },
  {
    id: 'neo-brutalist',
    label: 'Neo-Brutalist',
    description: 'Bold 2px strokes, hard offset shadows, and electric violet + acid gold contrast',
    patch: {
      name: 'Volt Brutal',
      tagline: 'Unapologetic structural edges and zero-blur offset geometry',
      handle: '@volt',
      seedSlug: null,
      polarity: 'light',
      primaryHex: '#7c3aed',
      secondaryHex: '#eab308',
      accentHex: '#10b981',
      neutralTemp: 0,
      harmony: 'triadic',
      displayFont: 'allo-sharp',
      bodyFont: 'allo-precision',
      monoFont: 'allo-dotted',
      baseFontPx: 16,
      typeRatio: 1.25,
      baseSpacePx: 8,
      baseRadiusPx: 4,
      elevationStyle: 'brutalist',
      elevationStrength: 0.9,
      surfaceContrast: 'high',
      density: 'comfortable',
      borderWidthPx: 2,
      chromaBoost: 1.1,
    },
  },
  {
    id: 'frosted-spatial',
    label: 'Frosted Glass',
    description: 'Luminous spatial dark surfaces with specular rim highlights and generous roundness',
    patch: {
      name: 'Aether Glass',
      tagline: 'Depth-layered surfaces tuned for spatial refraction and glow',
      handle: '@aether',
      seedSlug: null,
      polarity: 'dark',
      primaryHex: '#38bdf8',
      secondaryHex: '#a855f7',
      accentHex: '#ec4899',
      neutralTemp: -0.3,
      harmony: 'analogous',
      displayFont: 'allo-round',
      bodyFont: 'allo-friendly',
      monoFont: 'allo-code',
      baseFontPx: 16,
      typeRatio: 1.2,
      baseSpacePx: 8,
      baseRadiusPx: 16,
      elevationStyle: 'glass',
      elevationStrength: 0.85,
      surfaceContrast: 'balanced',
      density: 'comfortable',
      borderWidthPx: 1,
      chromaBoost: 1.05,
    },
  },
  {
    id: 'high-contrast',
    label: 'High-Contrast',
    description: 'Compact enterprise telemetry tokens optimized for WCAG AAA scannability',
    patch: {
      name: 'Axiom Enterprise',
      tagline: 'Dense, accessible instrument surfaces engineered for clarity',
      handle: '@axiom',
      seedSlug: null,
      polarity: 'dark',
      primaryHex: '#22c55e',
      secondaryHex: '#3b82f6',
      accentHex: '#eab308',
      neutralTemp: -0.1,
      harmony: 'split',
      displayFont: 'allo-precision',
      bodyFont: 'allo-precision',
      monoFont: 'allo-dotted',
      baseFontPx: 15,
      typeRatio: 1.2,
      baseSpacePx: 6,
      baseRadiusPx: 6,
      elevationStyle: 'flat',
      elevationStrength: 0.5,
      surfaceContrast: 'high',
      density: 'compact',
      borderWidthPx: 1,
      chromaBoost: 1,
    },
  },
];

export function resolveFontOption(value: string | undefined, role: 'display' | 'body' | 'mono'): AlloFontPreset {
  const pool = role === 'mono' ? MONO_OPTIONS : FONT_OPTIONS;
  const match = pool.find((o) => o.id === value);
  if (match) return match;
  if (role === 'display') return FONT_OPTIONS[0];
  if (role === 'body') return FONT_OPTIONS[1];
  return MONO_OPTIONS[0];
}

export function fontStyleFor(
  value: string | undefined,
  role: 'display' | 'body' | 'mono',
): {
  fontFamily: string;
  fontOpticalSizing: 'auto';
  fontVariationSettings: string;
  fontFeatureSettings: string;
  fontVariantLigatures?: 'normal' | 'no-contextual';
  fontVariantNumeric?: 'tabular-nums';
} {
  const opt = resolveFontOption(value, role);
  return {
    fontFamily: opt.stack,
    fontOpticalSizing: 'auto',
    fontVariationSettings: opt.variation,
    fontFeatureSettings: opt.features,
    ...(opt.ligatures ? { fontVariantLigatures: opt.ligatures } : {}),
    ...(role === 'mono' ? { fontVariantNumeric: 'tabular-nums' } : {}),
  };
}

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

export function isValidHexInput(raw: string): boolean {
  const s = (raw || '').trim();
  return /^#?(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(s);
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

export function pickReadableFg(bgHex: string): string {
  const onWhite = wcagContrast('#ffffff', bgHex);
  const onDark = wcagContrast('#09090b', bgHex);
  return onDark >= onWhite ? '#09090b' : '#ffffff';
}

export function solveReadableOnBg(candidateHex: string, bgHex: string, minWcag = 4.5): string {
  if (wcagContrast(candidateHex, bgHex) >= minWcag) return candidateHex;
  const { c, h } = hexToOklch(candidateHex);
  const bgLum = relativeLuminance(bgHex);
  const goLight = bgLum < 0.36;
  let lo = goLight ? 0.55 : 0.06;
  let hi = goLight ? 0.99 : 0.54;
  let best = goLight ? '#fafafa' : '#09090b';
  for (let i = 0; i < 16; i++) {
    const mid = (lo + hi) * 0.5;
    const hex = oklchToHex(mid, c * 0.88, h);
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
  const isAchromatic = c < 0.015;
  if (isAchromatic) {
    const baseL = clamp(l, 0.25, 0.72);
    return {
      secondary: oklchToHex(clamp(baseL + 0.16, 0.3, 0.82), 0, 0),
      accent: oklchToHex(clamp(baseL - 0.14, 0.18, 0.65), 0, 0),
    };
  }
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

const RAMP_STEPS: [number, number, number, string][] = [
  [50, 0.975, 0.14, 'App Canvas Tint'],
  [100, 0.942, 0.26, 'Subtle Surface'],
  [200, 0.885, 0.46, 'UI Element Bg'],
  [300, 0.805, 0.68, 'Hovered UI Bg'],
  [400, 0.715, 0.88, 'Active / Subtle Border'],
  [500, 0.625, 1.0, 'Solid Fill'],
  [600, 0.545, 0.98, 'Solid Hover'],
  [700, 0.46, 0.88, 'High-Contrast Fill'],
  [800, 0.375, 0.72, 'Subtle Text / Icon'],
  [900, 0.295, 0.52, 'Primary Text'],
  [950, 0.205, 0.36, 'Deep Ink'],
];

export function generateRamp(baseHex: string, neutralLock = false, neutralTemp = 0, chromaBoost = 1): RampStop[] {
  const { c, h } = hexToOklch(baseHex);
  const boost = clamp(chromaBoost, 0.4, 1.4);
  const isAchromatic = !neutralLock && c < 0.015;
  const baseC = neutralLock
    ? Math.abs(neutralTemp) * 0.016
    : isAchromatic
      ? c * boost
      : clamp(Math.max(c, 0.085) * boost, 0, 0.34);
  const useH = neutralLock ? (neutralTemp < 0 ? 250 : 65) : h;

  return RAMP_STEPS.map(([step, l, cMult, role]) => {
    const hex = oklchToHex(l, baseC * cMult, useH);
    const real = hexToOklch(hex);
    const [r8, g8, b8] = hexToRgb(hex);
    return {
      step,
      role,
      hex,
      rgb: `rgb(${r8}, ${g8}, ${b8})`,
      alphaHex: `${hex}24`,
      oklch: `oklch(${(real.l * 100).toFixed(1)}% ${real.c.toFixed(3)} ${Math.round(real.h)})`,
      onLightContrast: wcagContrast(hex, '#ffffff'),
      onDarkContrast: wcagContrast(hex, '#09090b'),
    };
  });
}

export function computeConcentricRadius(outerPx: number, paddingPx: number): number {
  return Math.max(0, Math.round(outerPx - paddingPx));
}

export function interpolateFluidPx(
  step: Pick<TypeScaleStep, 'px' | 'minPx'>,
  viewportPx: number,
  minVw = 360,
  maxVw = 1440,
): number {
  const t = clamp((viewportPx - minVw) / Math.max(1, maxVw - minVw), 0, 1);
  return Number((step.minPx + (step.px - step.minPx) * t).toFixed(1));
}

function buildSemanticForPolarity(
  polarity: 'dark' | 'light',
  doc: DesignSystemDoc,
  ramps: CompiledSystem['ramps'],
): SemanticTokens {
  const isDark = polarity === 'dark';
  const contrastMode: SurfaceContrastMode = doc.surfaceContrast || 'balanced';
  const densityMode: DensityMode = doc.density || 'comfortable';
  const densityMult = densityMode === 'compact' ? 0.82 : densityMode === 'spacious' ? 1.2 : 1.0;

  const n = (step: number) => ramps.neutral.find((s) => s.step === step)!.hex;
  const sec = (step: number) => ramps.secondary.find((s) => s.step === step)!.hex;
  const acc = (step: number) => ramps.accent.find((s) => s.step === step)!.hex;

  const neutralHue = doc.neutralTemp < 0 ? 250 : 65;
  const neutralChroma = Math.abs(doc.neutralTemp) * 0.014;

  const darkL =
    contrastMode === 'high'
      ? { canvas: 0.1, surface: 0.15, surfaceAlt: 0.21, elevated: 0.25 }
      : contrastMode === 'subtle'
        ? { canvas: 0.155, surface: 0.185, surfaceAlt: 0.215, elevated: 0.245 }
        : { canvas: 0.135, surface: 0.175, surfaceAlt: 0.22, elevated: 0.255 };

  const canvas = isDark
    ? oklchToHex(darkL.canvas, neutralChroma, neutralHue)
    : contrastMode === 'subtle'
      ? '#fcfcfd'
      : '#ffffff';
  const surface = isDark
    ? oklchToHex(darkL.surface, neutralChroma * 1.1, neutralHue)
    : contrastMode === 'high'
      ? n(100)
      : n(50);
  const surfaceAlt = isDark
    ? oklchToHex(darkL.surfaceAlt, neutralChroma * 1.15, neutralHue)
    : contrastMode === 'high'
      ? n(200)
      : n(100);
  const surfaceElevated = isDark
    ? oklchToHex(darkL.elevated, neutralChroma * 1.2, neutralHue)
    : '#ffffff';

  const ink = isDark ? '#fafafa' : '#09090b';
  const mutedMin = contrastMode === 'high' ? 6.2 : 4.6;
  const muted = solveReadableOnBg(isDark ? n(400) : n(600), canvas, mutedMin);

  const borderAlpha = contrastMode === 'high' ? 0.18 : contrastMode === 'subtle' ? 0.07 : 0.1;
  const borderStrongAlpha = contrastMode === 'high' ? 0.34 : contrastMode === 'subtle' ? 0.14 : 0.2;
  const border = isDark ? `rgba(255,255,255,${borderAlpha})` : `rgba(9,9,11,${borderAlpha})`;
  const borderStrong = isDark ? `rgba(255,255,255,${borderStrongAlpha})` : `rgba(9,9,11,${borderStrongAlpha})`;

  const minBrandContrast = contrastMode === 'high' ? 4.5 : 3.2;
  const brand = solveReadableOnBg(doc.primaryHex, canvas, minBrandContrast);
  const brandFg = pickReadableFg(brand);
  const secondary = solveReadableOnBg(doc.secondaryHex, canvas, minBrandContrast);
  const secondaryFg = pickReadableFg(secondary);
  const accentSource = doc.accentHex || acc(500) || sec(500);
  const accent = solveReadableOnBg(accentSource, canvas, minBrandContrast);
  const accentFg = pickReadableFg(accent);
  const ring = solveReadableOnBg(brand, canvas, 3.0);

  const success = solveReadableOnBg(ramps.success[5].hex, canvas, 3.1);
  const warning = solveReadableOnBg(ramps.warning[5].hex, canvas, 3.1);
  const danger = solveReadableOnBg(ramps.danger[5].hex, canvas, 3.1);
  const info = solveReadableOnBg(ramps.info[5].hex, canvas, 3.1);

  const st = doc.elevationStrength;
  const shadowColor = isDark ? `rgba(0,0,0,${(0.55 * st).toFixed(2)})` : `rgba(9,9,11,${(0.11 * st).toFixed(2)})`;
  let shadowSm = 'none';
  let shadowMd = 'none';
  let shadowLg = 'none';
  let shadowXl = 'none';

  if (doc.elevationStyle === 'layered') {
    shadowSm = `0 1px 2px ${shadowColor}`;
    shadowMd = `0 4px 12px -2px ${shadowColor}, 0 1px 3px ${shadowColor}`;
    shadowLg = `0 16px 36px -8px ${shadowColor}, 0 4px 10px ${shadowColor}`;
    shadowXl = `0 24px 52px -12px ${shadowColor}, 0 8px 18px ${shadowColor}`;
  } else if (doc.elevationStyle === 'brutalist') {
    const col = isDark ? '#fafafa' : '#09090b';
    shadowSm = `2px 2px 0 0 ${col}`;
    shadowMd = `4px 4px 0 0 ${col}`;
    shadowLg = `6px 6px 0 0 ${col}`;
    shadowXl = `8px 8px 0 0 ${col}`;
  } else if (doc.elevationStyle === 'glass') {
    const sheen = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.75)';
    shadowSm = `inset 0 1px 0 ${sheen}, 0 2px 6px ${shadowColor}`;
    shadowMd = `inset 0 1px 0 ${sheen}, 0 8px 28px ${shadowColor}`;
    shadowLg = `inset 0 1px 0 ${sheen}, 0 20px 44px ${shadowColor}`;
    shadowXl = `inset 0 1px 0 ${sheen}, 0 28px 60px ${shadowColor}`;
  }

  return {
    canvas,
    surface,
    surfaceAlt,
    surfaceElevated,
    ink,
    muted,
    border,
    borderStrong,
    ring,
    brand,
    brandFg,
    secondary,
    secondaryFg,
    accent,
    accentFg,
    success,
    successFg: pickReadableFg(success),
    warning,
    warningFg: pickReadableFg(warning),
    danger,
    dangerFg: pickReadableFg(danger),
    info,
    infoFg: pickReadableFg(info),
    shadowSm,
    shadowMd,
    shadowLg,
    shadowXl,
    controlHeightSm: `${Math.round(28 * densityMult)}px`,
    controlHeightMd: `${Math.round(36 * densityMult)}px`,
    controlHeightLg: `${Math.round(44 * densityMult)}px`,
    borderWidth: `${clamp(doc.borderWidthPx ?? 1, 1, 3)}px`,
    densityMult,
  };
}

export function compileDesignSystem(doc: DesignSystemDoc): CompiledSystem {
  const boost = doc.chromaBoost ?? 1;
  const ramps = {
    primary: generateRamp(doc.primaryHex, false, 0, boost),
    secondary: generateRamp(doc.secondaryHex, false, 0, boost),
    accent: generateRamp(doc.accentHex, false, 0, boost),
    neutral: generateRamp('#71717a', true, doc.neutralTemp),
    success: generateRamp(doc.successHex || '#10b981'),
    warning: generateRamp(doc.warningHex || '#f59e0b'),
    danger: generateRamp(doc.dangerHex || '#ef4444'),
    info: generateRamp(doc.infoHex || '#3b82f6'),
  };

  const semantic = buildSemanticForPolarity(doc.polarity, doc, ramps);
  const semanticOpposite = buildSemanticForPolarity(doc.polarity === 'dark' ? 'light' : 'dark', doc, ramps);

  const r = doc.typeRatio;
  const b = doc.baseFontPx;
  const hWeight = doc.headingWeight ?? 700;
  const bodyLh = doc.bodyLineHeight ?? 1.55;
  const minVw = doc.fluidMinVw ?? 360;
  const maxVw = doc.fluidMaxVw ?? 1440;
  const fluidStrength = clamp(doc.fluidStrength ?? 1, 0, 1);

  const steps = [
    { token: 'display', pow: 4, lh: 1.05, tr: -0.035, w: hWeight, measure: '20ch' },
    { token: 'h1', pow: 3, lh: 1.1, tr: -0.028, w: hWeight, measure: '26ch' },
    { token: 'h2', pow: 2, lh: 1.18, tr: -0.02, w: Math.max(500, hWeight - 50), measure: '36ch' },
    { token: 'h3', pow: 1, lh: 1.28, tr: -0.012, w: 600, measure: '48ch' },
    { token: 'h4', pow: 0.5, lh: 1.35, tr: -0.008, w: 600, measure: '55ch' },
    { token: 'body-lg', pow: 0.25, lh: clamp(bodyLh - 0.05, 1.35, 1.75), tr: 0, w: 400, measure: '62ch' },
    { token: 'body', pow: 0, lh: bodyLh, tr: 0, w: 400, measure: '65ch' },
    { token: 'sm', pow: -0.75, lh: clamp(bodyLh - 0.07, 1.3, 1.7), tr: 0.005, w: 450, measure: '70ch' },
    { token: 'xs', pow: -1.5, lh: 1.4, tr: 0.018, w: 500, measure: '75ch' },
  ];

  const typeScale: TypeScaleStep[] = steps.map((s) => {
    const px = Number((b * Math.pow(r, s.pow)).toFixed(1));
    const shrinkFactor = 1 - 0.22 * fluidStrength;
    const minPx = Number(Math.max(11, px * (s.pow > 0 ? shrinkFactor : 1 - 0.08 * fluidStrength)).toFixed(1));
    const rem = Number((px / 16).toFixed(3));
    const minRem = Number((minPx / 16).toFixed(3));
    const slope = ((px - minPx) / Math.max(1, maxVw - minVw)) * 100;
    const interceptRem = Number(((minPx - (slope / 100) * minVw) / 16).toFixed(3));
    const clampCss =
      Math.abs(px - minPx) < 0.2
        ? `${rem}rem`
        : `clamp(${minRem}rem, ${interceptRem}rem + ${slope.toFixed(2)}vw, ${rem}rem)`;
    return {
      token: s.token,
      px,
      minPx,
      rem,
      clampCss,
      lineHeight: Number(s.lh.toFixed(2)),
      trackingEm: s.tr,
      weight: s.w,
      measureCh: s.measure,
    };
  });

  const sp = Math.round(doc.baseSpacePx * semantic.densityMult);
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
    const px = Math.max(2, Math.round(sp * Number(mult)));
    return { token: String(k), px, rem: Number((px / 16).toFixed(3)) };
  });

  const br = doc.baseRadiusPx;
  const pad = Math.round(doc.baseSpacePx * 1.5);
  const outerLg = Math.round(br * 1.5);
  const radii = {
    none: '0px',
    xs: `${Math.max(0, Math.round(br * 0.25))}px`,
    sm: `${Math.max(0, Math.round(br * 0.5))}px`,
    md: `${br}px`,
    lg: `${outerLg}px`,
    xl: `${Math.round(br * 2)}px`,
    '2xl': `${Math.round(br * 3)}px`,
    pill: '999px',
    innerNested: `${computeConcentricRadius(outerLg, pad)}px`,
  };

  const motion = {
    fast: '120ms',
    normal: '200ms',
    slow: '320ms',
    easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  const rawAudits = [
    ['Primary Ink / Canvas', semantic.ink, semantic.canvas],
    ['Muted Ink / Canvas', semantic.muted, semantic.canvas],
    ['Primary Ink / Surface', semantic.ink, semantic.surface],
    ['Brand CTA Label / Brand', semantic.brandFg, semantic.brand],
    ['Brand Accent / Canvas', semantic.brand, semantic.canvas],
    ['Secondary Label / Secondary', semantic.secondaryFg, semantic.secondary],
    ['Accent Label / Accent', semantic.accentFg, semantic.accent],
    ['Success / Canvas', semantic.success, semantic.canvas],
    ['Danger / Canvas', semantic.danger, semantic.canvas],
  ] as const;

  const audits: ContrastAuditItem[] = rawAudits.map(([pair, fg, bg]) => {
    const wcag = wcagContrast(fg, bg);
    const apca = apcaContrast(fg, bg);
    return { pair, fg, bg, wcag, apca, aaPass: wcag >= 4.5, aaaPass: wcag >= 7.0 };
  });

  const matrixFgs: [string, string][] = [
    ['Ink', semantic.ink],
    ['Muted', semantic.muted],
    ['Brand', semantic.brand],
    ['Brand Fg', semantic.brandFg],
    ['Secondary', semantic.secondary],
    ['Accent', semantic.accent],
    ['Success', semantic.success],
    ['Warning', semantic.warning],
    ['Danger', semantic.danger],
    ['Info', semantic.info],
  ];

  const matrixBgs: [string, string][] = [
    ['Canvas', semantic.canvas],
    ['Surface', semantic.surface],
    ['Surface Alt', semantic.surfaceAlt],
    ['Brand', semantic.brand],
    ['Secondary', semantic.secondary],
  ];

  const contrastMatrix: ContrastMatrixCell[] = [];
  for (const [fgName, fg] of matrixFgs) {
    for (const [bgName, bg] of matrixBgs) {
      const wcag = wcagContrast(fg, bg);
      const apca = apcaContrast(fg, bg);
      contrastMatrix.push({
        fgName,
        bgName,
        fg,
        bg,
        wcag,
        apca,
        aaLarge: wcag >= 3.0,
        aaPass: wcag >= 4.5,
        aaaPass: wcag >= 7.0,
      });
    }
  }

  return {
    ramps,
    semantic,
    semanticOpposite,
    typeScale,
    spacingScale,
    radii,
    motion,
    audits,
    contrastMatrix,
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
  const brandOklch = hexToOklch(brand);
  const pal = Array.isArray(raw.palette) ? (raw.palette as { value?: string }[]) : [];

  const chromaticPicks: string[] = [];
  const neutralPicks: string[] = [];
  for (const item of pal) {
    if (!item?.value) continue;
    const h = normalizeHex(item.value);
    if (h === brand) continue;
    const o = hexToOklch(h);
    if (o.c >= 0.035 && o.l >= 0.14 && o.l <= 0.92) {
      if (!chromaticPicks.includes(h)) chromaticPicks.push(h);
    } else if (o.l >= 0.12 && o.l <= 0.94) {
      if (!neutralPicks.includes(h)) neutralPicks.push(h);
    }
  }

  const isBrandAchromatic = brandOklch.c < 0.015;
  const derived = harmonyPair(brand, isBrandAchromatic ? 'monochrome' : 'split');

  let secondaryHex: string;
  let accentHex: string;
  let harmony: HarmonyMode = isBrandAchromatic && chromaticPicks.length === 0 ? 'monochrome' : 'split';

  if (isBrandAchromatic) {
    if (chromaticPicks.length >= 2) {
      secondaryHex = chromaticPicks[0];
      accentHex = chromaticPicks[1];
      harmony = 'analogous';
    } else if (chromaticPicks.length === 1) {
      secondaryHex = neutralPicks[0] || '#52525b';
      accentHex = chromaticPicks[0];
      harmony = 'monochrome';
    } else {
      secondaryHex = neutralPicks[0] || '#52525b';
      accentHex = neutralPicks[1] || '#71717a';
      harmony = 'monochrome';
    }
  } else {
    secondaryHex = chromaticPicks[0] || neutralPicks[0] || derived.secondary;
    accentHex = chromaticPicks[1] || derived.accent;
  }

  const radiusNum = parseFloat(String(raw.radius || '8'));
  const styleText = String(raw.style || '').toLowerCase();
  const displayPreset =
    Number.isFinite(radiusNum) && radiusNum <= 2
      ? 'allo-sharp'
      : Number.isFinite(radiusNum) && radiusNum >= 14
        ? 'allo-round'
        : /playful|friendly|warm|pill|soft/.test(styleText)
          ? 'allo-friendly'
          : 'allo-precision';
  const bodyPreset =
    Number.isFinite(radiusNum) && radiusNum <= 2
      ? 'allo-precision'
      : Number.isFinite(radiusNum) && radiusNum >= 14
        ? 'allo-friendly'
        : 'allo-balanced';

  return {
    name: String(raw.name || 'Custom System'),
    tagline: String(raw.style || 'Systematic tokens grounded in verified optical ratios'),
    handle: '@' + String(raw.slug || 'system').replace(/[^a-z0-9]/gi, '').toLowerCase(),
    seedSlug: String(raw.slug || ''),
    polarity: raw.theme === 'light' ? 'light' : 'dark',
    primaryHex: brand,
    secondaryHex,
    accentHex,
    harmony,
    displayFont: displayPreset,
    bodyFont: bodyPreset,
    monoFont: 'allo-code',
    baseRadiusPx: Number.isFinite(radiusNum) ? clamp(Math.round(radiusNum), 0, 24) : 8,
  };
}

export function randomizeDesignSystem(polarity?: 'dark' | 'light'): Partial<DesignSystemDoc> {
  const hue = Math.floor(Math.random() * 360);
  const chroma = 0.14 + Math.random() * 0.1;
  const light = 0.52 + Math.random() * 0.14;
  const primaryHex = oklchToHex(light, chroma, hue);
  const modes: HarmonyMode[] = ['split', 'triadic', 'analogous', 'complementary', 'tetradic'];
  const harmony = modes[Math.floor(Math.random() * modes.length)];
  const { secondary, accent } = harmonyPair(primaryHex, harmony);
  const displayFonts = ['allo-precision', 'allo-sharp', 'allo-friendly', 'allo-round'];
  const elevations: ElevationStyle[] = ['layered', 'flat', 'glass', 'brutalist'];
  const radiiOptions = [0, 4, 6, 8, 12, 16];
  const elevationStyle = elevations[Math.floor(Math.random() * elevations.length)];

  return {
    seedSlug: null,
    polarity: polarity ?? (Math.random() > 0.4 ? 'dark' : 'light'),
    primaryHex,
    secondaryHex: secondary,
    accentHex: accent,
    harmony,
    neutralTemp: Number(((Math.random() - 0.5) * 0.8).toFixed(2)),
    displayFont: displayFonts[Math.floor(Math.random() * displayFonts.length)],
    baseRadiusPx: radiiOptions[Math.floor(Math.random() * radiiOptions.length)],
    elevationStyle,
    borderWidthPx: elevationStyle === 'brutalist' ? 2 : 1,
  };
}

export function exportDesignSystem(doc: DesignSystemDoc, compiled: CompiledSystem, format: ExportFormatId): string {
  const { semantic, semanticOpposite, ramps, typeScale, spacingScale, radii, motion } = compiled;
  const lightSem = doc.polarity === 'light' ? semantic : semanticOpposite;
  const darkSem = doc.polarity === 'dark' ? semantic : semanticOpposite;
  const displayOpt = resolveFontOption(doc.displayFont, 'display');
  const bodyOpt = resolveFontOption(doc.bodyFont, 'body');
  const monoOpt = resolveFontOption(doc.monoFont, 'mono');

  if (format === 'css') {
    const semLines = (s: SemanticTokens) => [
      `  --ds-canvas: ${s.canvas};`,
      `  --ds-surface: ${s.surface};`,
      `  --ds-surface-alt: ${s.surfaceAlt};`,
      `  --ds-surface-elevated: ${s.surfaceElevated};`,
      `  --ds-ink: ${s.ink};`,
      `  --ds-muted: ${s.muted};`,
      `  --ds-border: ${s.border};`,
      `  --ds-border-strong: ${s.borderStrong};`,
      `  --ds-ring: ${s.ring};`,
      `  --ds-brand: ${s.brand};`,
      `  --ds-brand-fg: ${s.brandFg};`,
      `  --ds-secondary: ${s.secondary};`,
      `  --ds-secondary-fg: ${s.secondaryFg};`,
      `  --ds-accent: ${s.accent};`,
      `  --ds-accent-fg: ${s.accentFg};`,
      `  --ds-success: ${s.success};`,
      `  --ds-warning: ${s.warning};`,
      `  --ds-danger: ${s.danger};`,
      `  --ds-info: ${s.info};`,
      `  --ds-shadow-sm: ${s.shadowSm};`,
      `  --ds-shadow-md: ${s.shadowMd};`,
      `  --ds-shadow-lg: ${s.shadowLg};`,
    ];

    const lines = [
      `/* ${doc.name} — Design Sourcebook Dual-Polarity Tokens */`,
      `:root {`,
      ...semLines(lightSem),
      `  --ds-font-display: ${displayOpt.stack};`,
      `  --ds-font-body: ${bodyOpt.stack};`,
      `  --ds-font-mono: ${monoOpt.stack};`,
      `  --ds-font-display-settings: ${displayOpt.variation};`,
      `  --ds-font-body-settings: ${bodyOpt.variation};`,
      `  --ds-font-mono-settings: ${monoOpt.variation};`,
      `  --ds-border-width: ${semantic.borderWidth};`,
      `  --ds-control-sm: ${semantic.controlHeightSm};`,
      `  --ds-control-md: ${semantic.controlHeightMd};`,
      `  --ds-control-lg: ${semantic.controlHeightLg};`,
      `  --ds-radius-xs: ${radii.xs};`,
      `  --ds-radius-sm: ${radii.sm};`,
      `  --ds-radius-md: ${radii.md};`,
      `  --ds-radius-lg: ${radii.lg};`,
      `  --ds-radius-xl: ${radii.xl};`,
      `  --ds-radius-inner: ${radii.innerNested};`,
      `  --ds-duration-fast: ${motion.fast};`,
      `  --ds-duration-normal: ${motion.normal};`,
      `  --ds-duration-slow: ${motion.slow};`,
      `  --ds-ease-out: ${motion.easeOut};`,
      `  --ds-ease-spring: ${motion.spring};`,
    ];
    for (const [name, list] of Object.entries(ramps)) {
      for (const s of list) lines.push(`  --ds-${name}-${s.step}: ${s.hex};`);
    }
    for (const t of typeScale) lines.push(`  --ds-text-${t.token}: ${t.clampCss};`);
    for (const sp of spacingScale) lines.push(`  --ds-space-${sp.token}: ${sp.px}px;`);
    lines.push('}', '', '.dark, [data-theme="dark"] {', ...semLines(darkSem), '}');
    return lines.join('\n');
  }

  if (format === 'shadcn') {
    const emitShadcn = (s: SemanticTokens) => [
      `  --background: ${s.canvas};`,
      `  --foreground: ${s.ink};`,
      `  --card: ${s.surface};`,
      `  --card-foreground: ${s.ink};`,
      `  --popover: ${s.surfaceElevated};`,
      `  --popover-foreground: ${s.ink};`,
      `  --primary: ${s.brand};`,
      `  --primary-foreground: ${s.brandFg};`,
      `  --secondary: ${s.surfaceAlt};`,
      `  --secondary-foreground: ${s.ink};`,
      `  --muted: ${s.surfaceAlt};`,
      `  --muted-foreground: ${s.muted};`,
      `  --accent: ${s.accent};`,
      `  --accent-foreground: ${s.accentFg};`,
      `  --destructive: ${s.danger};`,
      `  --destructive-foreground: ${s.dangerFg};`,
      `  --border: ${s.border};`,
      `  --input: ${s.borderStrong};`,
      `  --ring: ${s.ring};`,
      `  --chart-1: ${s.brand};`,
      `  --chart-2: ${s.secondary};`,
      `  --chart-3: ${s.accent};`,
      `  --chart-4: ${s.warning};`,
      `  --chart-5: ${s.info};`,
    ];
    return [
      `/* ${doc.name} — shadcn/ui Compatible Theme Variables */`,
      `:root {`,
      `  --radius: ${radii.md};`,
      ...emitShadcn(lightSem),
      `}`,
      ``,
      `.dark {`,
      ...emitShadcn(darkSem),
      `}`,
    ].join('\n');
  }

  if (format === 'tailwind') {
    const lines = [`/* ${doc.name} — Tailwind CSS v4 @theme */`, `@import "tailwindcss";`, `@theme {`];
    for (const [name, list] of Object.entries(ramps)) {
      for (const s of list) lines.push(`  --color-${name}-${s.step}: ${s.hex};`);
    }
    lines.push(
      `  --color-canvas: ${semantic.canvas};`,
      `  --color-surface: ${semantic.surface};`,
      `  --color-surface-alt: ${semantic.surfaceAlt};`,
      `  --color-ink: ${semantic.ink};`,
      `  --color-muted: ${semantic.muted};`,
      `  --color-brand: ${semantic.brand};`,
      `  --color-secondary: ${semantic.secondary};`,
      `  --color-accent: ${semantic.accent};`,
      `  --font-display: ${displayOpt.stack};`,
      `  --font-sans: ${bodyOpt.stack};`,
      `  --font-mono: ${monoOpt.stack};`,
      `  --radius-xs: ${radii.xs};`,
      `  --radius-sm: ${radii.sm};`,
      `  --radius-md: ${radii.md};`,
      `  --radius-lg: ${radii.lg};`,
      `  --radius-xl: ${radii.xl};`,
      `  --shadow-sm: ${semantic.shadowSm};`,
      `  --shadow-md: ${semantic.shadowMd};`,
      `  --shadow-lg: ${semantic.shadowLg};`,
      `  --ease-out: ${motion.easeOut};`,
      `  --ease-spring: ${motion.spring};`,
    );
    for (const t of typeScale) lines.push(`  --text-${t.token}: ${t.clampCss};`);
    for (const sp of spacingScale) lines.push(`  --spacing-${sp.token}: ${sp.px}px;`);
    lines.push('}');
    return lines.join('\n');
  }

  if (format === 'dtcg') {
    const colorObj: Record<string, unknown> = {
      semantic: {
        light: {
          canvas: { $value: lightSem.canvas, $type: 'color' },
          surface: { $value: lightSem.surface, $type: 'color' },
          ink: { $value: lightSem.ink, $type: 'color' },
          muted: { $value: lightSem.muted, $type: 'color' },
          brand: { $value: lightSem.brand, $type: 'color' },
          secondary: { $value: lightSem.secondary, $type: 'color' },
          accent: { $value: lightSem.accent, $type: 'color' },
        },
        dark: {
          canvas: { $value: darkSem.canvas, $type: 'color' },
          surface: { $value: darkSem.surface, $type: 'color' },
          ink: { $value: darkSem.ink, $type: 'color' },
          muted: { $value: darkSem.muted, $type: 'color' },
          brand: { $value: darkSem.brand, $type: 'color' },
          secondary: { $value: darkSem.secondary, $type: 'color' },
          accent: { $value: darkSem.accent, $type: 'color' },
        },
      },
    };
    for (const [name, list] of Object.entries(ramps)) {
      colorObj[name] = Object.fromEntries(list.map((s) => [s.step, { $value: s.hex, $type: 'color', $description: `${s.role} · ${s.oklch}` }]));
    }
    return JSON.stringify(
      {
        $schema: 'https://tr.designtokens.org/format/',
        name: doc.name,
        color: colorObj,
        typography: Object.fromEntries(
          typeScale.map((t) => [
            t.token,
            {
              $type: 'typography',
              $value: {
                fontFamily: t.token === 'display' || t.token.startsWith('h') ? displayOpt.stack : bodyOpt.stack,
                fontSize: `${t.px}px`,
                fontWeight: t.weight,
                lineHeight: t.lineHeight,
                letterSpacing: `${t.trackingEm}em`,
              },
            },
          ]),
        ),
        spacing: Object.fromEntries(spacingScale.map((s) => [s.token, { $value: `${s.px}px`, $type: 'dimension' }])),
        radius: Object.fromEntries(Object.entries(radii).map(([k, v]) => [k, { $value: v, $type: 'dimension' }])),
        motion: {
          fast: { $value: motion.fast, $type: 'duration' },
          normal: { $value: motion.normal, $type: 'duration' },
          slow: { $value: motion.slow, $type: 'duration' },
          easeOut: { $value: motion.easeOut, $type: 'cubicBezier' },
        },
      },
      null,
      2,
    );
  }

  if (format === 'figma') {
    const modeSet = (s: SemanticTokens) => ({
      canvas: { value: s.canvas, type: 'color' },
      surface: { value: s.surface, type: 'color' },
      surfaceAlt: { value: s.surfaceAlt, type: 'color' },
      ink: { value: s.ink, type: 'color' },
      muted: { value: s.muted, type: 'color' },
      border: { value: s.border, type: 'color' },
      brand: { value: s.brand, type: 'color' },
      brandFg: { value: s.brandFg, type: 'color' },
      secondary: { value: s.secondary, type: 'color' },
      accent: { value: s.accent, type: 'color' },
      success: { value: s.success, type: 'color' },
      warning: { value: s.warning, type: 'color' },
      danger: { value: s.danger, type: 'color' },
    });
    const primitives = Object.fromEntries(
      Object.entries(ramps).map(([k, list]) => [
        k,
        Object.fromEntries(list.map((s) => [String(s.step), { value: s.hex, type: 'color', description: s.role }])),
      ]),
    );
    return JSON.stringify(
      {
        $metadata: { tokenSetOrder: ['primitives', 'semantic/light', 'semantic/dark'] },
        primitives: {
          color: primitives,
          radius: Object.fromEntries(Object.entries(radii).map(([k, v]) => [k, { value: v, type: 'borderRadius' }])),
          spacing: Object.fromEntries(spacingScale.map((s) => [s.token, { value: `${s.px}px`, type: 'spacing' }])),
        },
        'semantic/light': modeSet(lightSem),
        'semantic/dark': modeSet(darkSem),
      },
      null,
      2,
    );
  }

  if (format === 'ts') {
    const obj = {
      name: doc.name,
      polarity: doc.polarity,
      modes: { light: lightSem, dark: darkSem },
      ramps: Object.fromEntries(
        Object.entries(ramps).map(([name, list]) => [name, Object.fromEntries(list.map((s) => [s.step, s.hex]))]),
      ),
      typography: Object.fromEntries(typeScale.map((t) => [t.token, { px: t.px, clamp: t.clampCss, lineHeight: t.lineHeight, weight: t.weight }])),
      spacing: Object.fromEntries(spacingScale.map((s) => [s.token, `${s.px}px`])),
      radii,
      motion,
    };
    return `// ${doc.name} — Typed Design System Tokens\nexport const theme = ${JSON.stringify(obj, null, 2)} as const;\n\nexport type DesignTheme = typeof theme;\n`;
  }

  return [
    `---`,
    `name: ${doc.name}`,
    `polarity: ${doc.polarity}`,
    `primary: "${semantic.brand}"`,
    `radius: "${radii.md}"`,
    `elevation: ${doc.elevationStyle}`,
    `---`,
    ``,
    `# ${doc.name}`,
    ``,
    `> ${doc.tagline}${doc.seedSlug ? ` (seeded from \`${doc.seedSlug}\`)` : ''}`,
    ``,
    `## Dual-Polarity Surfaces & Semantic Tokens`,
    `| Token | Light Mode | Dark Mode |`,
    `| --- | --- | --- |`,
    `| Canvas | \`${lightSem.canvas}\` | \`${darkSem.canvas}\` |`,
    `| Surface | \`${lightSem.surface}\` | \`${darkSem.surface}\` |`,
    `| Surface Alt | \`${lightSem.surfaceAlt}\` | \`${darkSem.surfaceAlt}\` |`,
    `| Primary Ink | \`${lightSem.ink}\` | \`${darkSem.ink}\` |`,
    `| Muted Ink | \`${lightSem.muted}\` | \`${darkSem.muted}\` |`,
    `| Primary Brand | \`${lightSem.brand}\` (fg \`${lightSem.brandFg}\`) | \`${darkSem.brand}\` (fg \`${darkSem.brandFg}\`) |`,
    `| Secondary | \`${lightSem.secondary}\` | \`${darkSem.secondary}\` |`,
    `| Accent | \`${lightSem.accent}\` | \`${darkSem.accent}\` |`,
    ``,
    `## OKLCH Color Ramps (50 → 950)`,
    ...Object.entries(ramps).map(([name, list]) => `- **${name}**: ${list.map((s) => `${s.step} \`${s.hex}\``).join(' · ')}`),
    ``,
    `## Fluid Typography (Ratio ${doc.typeRatio})`,
    `- Display: \`${displayOpt.stack}\` (${displayOpt.label} · ${displayOpt.variation})`,
    `- Body: \`${bodyOpt.stack}\` (${bodyOpt.label} · ${bodyOpt.variation})`,
    `- Mono: \`${monoOpt.stack}\` (${monoOpt.label} · ${monoOpt.variation})`,
    ...typeScale.map((t) => `- \`${t.token}\`: \`${t.minPx}px → ${t.px}px\` (\`${t.clampCss}\`) · weight ${t.weight} · lh ${t.lineHeight} · measure ${t.measureCh}`),
    ``,
    `## Geometry, Density & Elevation`,
    `- Density: \`${doc.density || 'comfortable'}\` · Base unit: \`${doc.baseSpacePx}px\` · Border width: \`${semantic.borderWidth}\``,
    `- Radii: sm \`${radii.sm}\` · md \`${radii.md}\` · lg \`${radii.lg}\` · nested inner \`${radii.innerNested}\``,
    `- Elevation (${doc.elevationStyle}): \`${semantic.shadowMd}\``,
    ``,
    `## Do & Don't`,
    `- **Do** keep text/control contrast at >= 4.5:1 WCAG AA (currently ${compiled.audits.filter((a) => a.aaPass).length}/${compiled.audits.length} core pairs passing).`,
    `- **Do** pair nested cards with \`${radii.innerNested}\` concentric inner corner radius inside \`${radii.lg}\` outer containers.`,
    `- **Don't** mix unverified shadows or break the \`${doc.baseSpacePx}px\` spacing cadence.`,
  ].join('\n');
}

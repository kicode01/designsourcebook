import { pickReadableFg, wcagContrast } from '../../engine/dsEngine';
import { adaptSvgPaintForSurface } from '../../engine/svgPaint';

export type TileKind =
  | 'wordmark'
  | 'mark'
  | 'lockup'
  | 'clearspace'
  | 'palette'
  | 'colorprop'
  | 'type'
  | 'pattern'
  | 'social'
  | 'appicon'
  | 'ui'
  | 'ogcard'
  | 'bizcard'
  | 'voice'
  | 'misuse'
  | 'photo';

export type PatternStyle =
  | 'dots'
  | 'codex'
  | 'grid'
  | 'rings'
  | 'isometric'
  | 'waves'
  | 'crosshatch'
  | 'bauhaus';

export type SurfaceFx = 'flat' | 'blueprint' | 'grain' | 'brutalist' | 'glass';
export type PhotoFx = 'natural' | 'duotone' | 'mono' | 'halftone' | 'warm';
export type BoardLayoutId = 'swiss-3x2' | 'hero-bento' | 'editorial' | 'showcase-8' | 'masthead-split';
export type BoardAspect = '1:1' | '16:10' | '4:5';
export type TilePolarity = 'auto' | 'surface' | 'accent' | 'invert' | 'glass';

export interface Tile {
  id: string;
  kind: TileKind;
  label: string;
  span?: 1 | 2;
  rowSpan?: 1 | 2;
  polarity?: TilePolarity;
}

export interface BrandVoiceSpec {
  pillars: [string, string, string];
  weAre: string;
  weAreNot: string;
  ctaText: string;
  domain: string;
  category: string;
  foundedYear: string;
}

export interface Brand {
  name: string;
  tagline: string;
  accent: string;
  secondary: string;
  background: string;
  ink: string;
  displayFont: string;
  bodyFont: string;
  radiusPx: number;
  palette: string[];
  handle: string;
  pattern: PatternStyle;
  surfaceFx: SurfaceFx;
  photoFx: PhotoFx;
  layoutId: BoardLayoutId;
  aspect: BoardAspect;
  proportion: [number, number, number]; // e.g. [60, 30, 10]
  voice: BrandVoiceSpec;
}

export interface BrandArchetype {
  id: string;
  label: string;
  subtitle: string;
  brandPatch: Partial<Brand>;
  tiles?: Tile[];
}

export const TILE_KINDS: { id: TileKind; label: string; category: 'core' | 'system' | 'touchpoint' }[] = [
  { id: 'wordmark', label: 'Wordmark', category: 'core' },
  { id: 'mark', label: 'Logo Mark', category: 'core' },
  { id: 'lockup', label: 'Lockup Trio', category: 'core' },
  { id: 'clearspace', label: 'Clearspace 1X', category: 'core' },
  { id: 'palette', label: 'Palette', category: 'system' },
  { id: 'colorprop', label: '60·30·10 Ratio', category: 'system' },
  { id: 'type', label: 'Typography', category: 'system' },
  { id: 'pattern', label: 'Pattern', category: 'system' },
  { id: 'ui', label: 'UI Tokens', category: 'system' },
  { id: 'voice', label: 'Voice Pillars', category: 'system' },
  { id: 'misuse', label: 'Guardrails', category: 'system' },
  { id: 'appicon', label: 'App Icons', category: 'touchpoint' },
  { id: 'social', label: 'Social', category: 'touchpoint' },
  { id: 'ogcard', label: 'OG Card', category: 'touchpoint' },
  { id: 'bizcard', label: 'Business Card', category: 'touchpoint' },
  { id: 'photo', label: 'Art Photo', category: 'touchpoint' },
];

export const BOARD_LAYOUTS: {
  id: BoardLayoutId;
  label: string;
  cols: number;
  rows: number;
  defaultTiles: Tile[];
}[] = [
  {
    id: 'swiss-3x2',
    label: 'Swiss 3×2',
    cols: 3,
    rows: 2,
    defaultTiles: [
      { id: 't1', kind: 'wordmark', label: 'Wordmark', span: 1, polarity: 'auto' },
      { id: 't2', kind: 'mark', label: 'Mark', span: 1, polarity: 'auto' },
      { id: 't3', kind: 'palette', label: 'Palette', span: 1, polarity: 'auto' },
      { id: 't4', kind: 'type', label: 'Typography', span: 1, polarity: 'auto' },
      { id: 't5', kind: 'pattern', label: 'BrandFx Pattern', span: 1, polarity: 'auto' },
      { id: 't6', kind: 'appicon', label: 'Favicon & App', span: 1, polarity: 'auto' },
    ],
  },
  {
    id: 'hero-bento',
    label: 'Hero Bento',
    cols: 3,
    rows: 2,
    defaultTiles: [
      { id: 't1', kind: 'wordmark', label: 'Flagship Identity', span: 2, polarity: 'auto' },
      { id: 't2', kind: 'mark', label: 'Symbol', span: 1, polarity: 'accent' },
      { id: 't3', kind: 'palette', label: 'Color Tokens', span: 1, polarity: 'auto' },
      { id: 't4', kind: 'type', label: 'Type Specimen', span: 1, polarity: 'auto' },
      { id: 't5', kind: 'appicon', label: 'Launcher & Badge', span: 1, polarity: 'auto' },
    ],
  },
  {
    id: 'editorial',
    label: 'Editorial Grid',
    cols: 3,
    rows: 2,
    defaultTiles: [
      { id: 't1', kind: 'mark', label: 'Primary Emblem', span: 1, polarity: 'accent' },
      { id: 't2', kind: 'lockup', label: 'Lockup System', span: 2, polarity: 'auto' },
      { id: 't3', kind: 'colorprop', label: '60·30·10 Balance', span: 1, polarity: 'auto' },
      { id: 't4', kind: 'type', label: 'Editorial Type', span: 1, polarity: 'auto' },
      { id: 't5', kind: 'bizcard', label: 'Executive Pass', span: 1, polarity: 'invert' },
    ],
  },
  {
    id: 'showcase-8',
    label: '8-Tile Poster',
    cols: 4,
    rows: 2,
    defaultTiles: [
      { id: 't1', kind: 'wordmark', label: 'Wordmark', span: 1, polarity: 'auto' },
      { id: 't2', kind: 'mark', label: 'Symbol', span: 1, polarity: 'accent' },
      { id: 't3', kind: 'palette', label: 'Palette', span: 1, polarity: 'auto' },
      { id: 't4', kind: 'type', label: 'Typography', span: 1, polarity: 'auto' },
      { id: 't5', kind: 'clearspace', label: 'Clearspace 1X', span: 1, polarity: 'auto' },
      { id: 't6', kind: 'pattern', label: 'BrandFx', span: 1, polarity: 'auto' },
      { id: 't7', kind: 'ui', label: 'UI Components', span: 1, polarity: 'auto' },
      { id: 't8', kind: 'appicon', label: 'App Icons', span: 1, polarity: 'auto' },
    ],
  },
  {
    id: 'masthead-split',
    label: 'Masthead Split',
    cols: 3,
    rows: 2,
    defaultTiles: [
      { id: 't1', kind: 'ogcard', label: 'Masthead & Open Graph', span: 2, polarity: 'auto' },
      { id: 't2', kind: 'voice', label: 'Voice Pillars', span: 1, polarity: 'auto' },
      { id: 't3', kind: 'palette', label: 'Chromatic Scale', span: 1, polarity: 'auto' },
      { id: 't4', kind: 'clearspace', label: 'Clearspace Spec', span: 1, polarity: 'auto' },
      { id: 't5', kind: 'social', label: 'Verified Handle', span: 1, polarity: 'auto' },
    ],
  },
];

export const BRAND_ARCHETYPES: BrandArchetype[] = [
  {
    id: 'northwind-obsidian',
    label: 'Northwind Obsidian',
    subtitle: 'Precision developer cloud & deterministic infrastructure',
    brandPatch: {
      name: 'Northwind',
      tagline: 'Systematic instruments engineered on verified tokens',
      handle: '@northwind',
      accent: '#0ea5e9',
      secondary: '#6366f1',
      background: '#09090b',
      ink: '#fafafa',
      displayFont: 'allo-precision',
      bodyFont: 'allo-balanced',
      radiusPx: 10,
      palette: ['#0ea5e9', '#6366f1', '#10b981', '#fafafa'],
      pattern: 'codex',
      surfaceFx: 'blueprint',
      proportion: [60, 30, 10],
      voice: {
        pillars: ['Deterministic', 'Architectural', 'Zero-Fluff'],
        weAre: 'Exact, high-contrast, technical, verifiable',
        weAreNot: 'Vague, ornamental, hyperbolic, cluttered',
        ctaText: 'Deploy Cluster',
        domain: 'northwind.dev',
        category: 'Developer Infrastructure',
        foundedYear: '2026',
      },
    },
  },
  {
    id: 'helvetia-press',
    label: 'Helvetia Grid',
    subtitle: 'Swiss architectural monograph & editorial journal',
    brandPatch: {
      name: 'Helvetia',
      tagline: 'Architectural typography anchored on mathematical grid ratios',
      handle: '@helvetia',
      accent: '#e11d48',
      secondary: '#18181b',
      background: '#fafafa',
      ink: '#09090b',
      displayFont: 'allo-sharp',
      bodyFont: 'allo-precision',
      radiusPx: 0,
      palette: ['#e11d48', '#09090b', '#71717a', '#f4f4f5'],
      pattern: 'grid',
      surfaceFx: 'brutalist',
      proportion: [70, 20, 10],
      voice: {
        pillars: ['Objective', 'Grid-First', 'Timeless'],
        weAre: 'Structured, Swiss-international, razor-sharp',
        weAreNot: 'Trendy, noisy, rounded, decorative',
        ctaText: 'Read Issue 14',
        domain: 'helvetia.press',
        category: 'Editorial & Architecture',
        foundedYear: '1957',
      },
    },
  },
  {
    id: 'solstice-consumer',
    label: 'Solstice Market',
    subtitle: 'Warm tactile consumer commerce & hospitality',
    brandPatch: {
      name: 'Solstice',
      tagline: 'Human-centric objects crafted with warm perceptual color',
      handle: '@solstice',
      accent: '#ff385c',
      secondary: '#f97316',
      background: '#fffdf9',
      ink: '#1c1917',
      displayFont: 'allo-rounded',
      bodyFont: 'allo-humanist',
      radiusPx: 18,
      palette: ['#ff385c', '#f97316', '#8b5cf6', '#1c1917'],
      pattern: 'dots',
      surfaceFx: 'grain',
      proportion: [65, 25, 10],
      voice: {
        pillars: ['Warm', 'Tactile', 'Inviting'],
        weAre: 'Generous, crafted, optimistic, human',
        weAreNot: 'Sterile, corporate, cold, bureaucratic',
        ctaText: 'Explore Collection',
        domain: 'solstice.co',
        category: 'Consumer & Lifestyle',
        foundedYear: '2024',
      },
    },
  },
  {
    id: 'aether-biotech',
    label: 'Aether Genomics',
    subtitle: 'Clinical computational biology & molecular foundry',
    brandPatch: {
      name: 'Aether Bio',
      tagline: 'Programmable protein synthesis at atomic resolution',
      handle: '@aetherbio',
      accent: '#10b981',
      secondary: '#06b6d4',
      background: '#06110e',
      ink: '#ecfdf5',
      displayFont: 'allo-precision',
      bodyFont: 'allo-balanced',
      radiusPx: 12,
      palette: ['#10b981', '#06b6d4', '#3b82f6', '#ecfdf5'],
      pattern: 'isometric',
      surfaceFx: 'blueprint',
      proportion: [60, 28, 12],
      voice: {
        pillars: ['Empirical', 'Life-First', 'Luminous'],
        weAre: 'Peer-reviewed, crystalline, rigorous, frontier',
        weAreNot: 'Sci-fi cliché, opaque, speculative',
        ctaText: 'Open Sequence Lab',
        domain: 'aether.bio',
        category: 'Computational Biology',
        foundedYear: '2025',
      },
    },
  },
  {
    id: 'kinetix-fintech',
    label: 'Kinetix Treasury',
    subtitle: 'Institutional real-time settlement & global liquidity',
    brandPatch: {
      name: 'Kinetix',
      tagline: 'Programmable institutional treasury with sub-second finality',
      handle: '@kinetix',
      accent: '#3b82f6',
      secondary: '#38bdf8',
      background: '#080c14',
      ink: '#f8fafc',
      displayFont: 'allo-editorial',
      bodyFont: 'allo-precision',
      radiusPx: 8,
      palette: ['#3b82f6', '#38bdf8', '#f59e0b', '#f8fafc'],
      pattern: 'waves',
      surfaceFx: 'flat',
      proportion: [60, 30, 10],
      voice: {
        pillars: ['Sovereign', 'Auditable', 'Instant'],
        weAre: 'Institutional, composed, transparent, resilient',
        weAreNot: 'Gamified, volatile, casual',
        ctaText: 'Initialize Vault',
        domain: 'kinetix.fi',
        category: 'Financial Infrastructure',
        foundedYear: '2023',
      },
    },
  },
  {
    id: 'monolith-atelier',
    label: 'Monolith Atelier',
    subtitle: 'Bespoke industrial hardware & acoustic instruments',
    brandPatch: {
      name: 'Monolith',
      tagline: 'Machined aluminum acoustics & tactile studio instruments',
      handle: '@monolith',
      accent: '#f59e0b',
      secondary: '#a1a1aa',
      background: '#0c0a09',
      ink: '#fafaf9',
      displayFont: 'allo-sharp',
      bodyFont: 'allo-balanced',
      radiusPx: 4,
      palette: ['#f59e0b', '#d6d3d1', '#78716c', '#fafaf9'],
      pattern: 'rings',
      surfaceFx: 'grain',
      proportion: [70, 22, 8],
      voice: {
        pillars: ['Machined', 'Monolithic', 'Acoustic'],
        weAre: 'Uncompromising, anodized, tactile, enduring',
        weAreNot: 'Disposable, plastic, ephemeral',
        ctaText: 'Configure Unit 01',
        domain: 'monolith.audio',
        category: 'Hardware & Acoustics',
        foundedYear: '2022',
      },
    },
  },
];

export function buildPatternStyle(
  pattern: PatternStyle,
  accentHex: string,
  inkHex: string,
): { backgroundImage: string; backgroundSize: string } {
  switch (pattern) {
    case 'dots':
      return {
        backgroundImage: `radial-gradient(circle, ${accentHex} 1.4px, transparent 1.8px)`,
        backgroundSize: '18px 18px',
      };
    case 'codex':
      return {
        backgroundImage: `repeating-linear-gradient(-18deg, ${accentHex}38 0 6px, transparent 6px 18px)`,
        backgroundSize: '24px 24px',
      };
    case 'grid':
      return {
        backgroundImage: `linear-gradient(${accentHex}2e 1px, transparent 1px), linear-gradient(90deg, ${accentHex}2e 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      };
    case 'rings':
      return {
        backgroundImage: `repeating-radial-gradient(circle at 50% 50%, ${accentHex}40 0 1.2px, transparent 1.2px 13px)`,
        backgroundSize: '100% 100%',
      };
    case 'isometric':
      return {
        backgroundImage: `linear-gradient(30deg, ${accentHex}26 12%, transparent 12.5%, transparent 87%, ${accentHex}26 87.5%, ${accentHex}26), linear-gradient(150deg, ${accentHex}26 12%, transparent 12.5%, transparent 87%, ${accentHex}26 87.5%, ${accentHex}26), linear-gradient(60deg, ${inkHex}14 25%, transparent 25.5%, transparent 75%, ${inkHex}14 75%, ${inkHex}14)`,
        backgroundSize: '28px 48px',
      };
    case 'waves':
      return {
        backgroundImage: `repeating-radial-gradient(circle at 0 100%, transparent 0, transparent 9px, ${accentHex}36 9px, ${accentHex}36 10.5px)`,
        backgroundSize: '28px 28px',
      };
    case 'crosshatch':
      return {
        backgroundImage: `repeating-linear-gradient(45deg, ${accentHex}2b 0 1px, transparent 1px 12px), repeating-linear-gradient(-45deg, ${accentHex}2b 0 1px, transparent 1px 12px)`,
        backgroundSize: '18px 18px',
      };
    case 'bauhaus':
      return {
        backgroundImage: `radial-gradient(circle at 100% 0%, ${accentHex}3d 0 34%, transparent 35%), radial-gradient(circle at 0% 100%, ${inkHex}18 0 34%, transparent 35%)`,
        backgroundSize: '32px 32px',
      };
  }
}

export function resolveTileSurface(
  brand: Brand,
  polarity: TilePolarity = 'auto',
): { bg: string; fg: string; muted: string; border: string } {
  if (polarity === 'accent') {
    const fg = pickReadableFg(brand.accent);
    return {
      bg: brand.accent,
      fg,
      muted: fg === '#ffffff' ? 'rgba(255,255,255,0.74)' : 'rgba(9,9,11,0.72)',
      border: fg === '#ffffff' ? 'rgba(255,255,255,0.22)' : 'rgba(9,9,11,0.18)',
    };
  }
  if (polarity === 'invert') {
    return {
      bg: brand.ink,
      fg: brand.background,
      muted: `${brand.background}b8`,
      border: `${brand.background}28`,
    };
  }
  if (polarity === 'glass') {
    return {
      bg: `${brand.accent}16`,
      fg: brand.ink,
      muted: `${brand.ink}9e`,
      border: `${brand.accent}44`,
    };
  }
  return {
    bg: `${brand.ink}0b`,
    fg: brand.ink,
    muted: `${brand.ink}99`,
    border: `${brand.ink}1c`,
  };
}

function extractInnerSvg(svgText: string, inkHex: string, prefix: string): { viewBox: string; inner: string } {
  const adapted = adaptSvgPaintForSurface(svgText, inkHex, prefix);
  const vbMatch = /viewBox="([^"]+)"/i.exec(adapted);
  const viewBox = vbMatch ? vbMatch[1] : '0 0 256 256';
  const inner = adapted
    .replace(/^[\s\S]*?<svg[^>]*>/i, '')
    .replace(/<\/svg>\s*$/i, '');
  return { viewBox, inner };
}

/**
 * Generates a standalone 1200x630 Open Graph Social Share Card SVG.
 */
export function buildOgCardSvg(brand: Brand, markSvg: string): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const { inner } = extractInnerSvg(markSvg, brand.accent, 'og-exp-');
  const badgeFg = pickReadableFg(brand.accent);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${esc(brand.name)} Open Graph Card">
  <defs>
    <radialGradient id="og-glow" cx="85%" cy="20%" r="65%">
      <stop offset="0%" stop-color="${brand.accent}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${brand.background}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="og-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${brand.ink}" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${brand.background}"/>
  <rect width="1200" height="630" fill="url(#og-glow)"/>
  <rect width="1200" height="630" fill="url(#og-grid)"/>
  <rect x="44" y="44" width="1112" height="542" rx="${Math.max(12, brand.radiusPx * 1.5)}" fill="none" stroke="${brand.ink}" stroke-opacity="0.16" stroke-width="1.5"/>

  <!-- Top Pill & Handle -->
  <rect x="88" y="88" width="220" height="36" rx="18" fill="${brand.accent}"/>
  <text x="198" y="111" text-anchor="middle" fill="${badgeFg}" font-family="'Allo', system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="1.2">${esc(brand.voice.category.toUpperCase().slice(0, 22))}</text>
  <text x="1112" y="112" text-anchor="end" fill="${brand.ink}" fill-opacity="0.6" font-family="ui-monospace, monospace" font-size="16">${esc(brand.handle)} · ${esc(brand.voice.domain)}</text>

  <!-- Brand Mark -->
  <g transform="translate(880 185) scale(0.92)">
    <rect x="-24" y="-24" width="288" height="288" rx="${Math.max(24, brand.radiusPx * 3)}" fill="${brand.ink}" fill-opacity="0.05" stroke="${brand.accent}" stroke-opacity="0.4" stroke-width="2"/>
    <svg viewBox="0 0 256 256" width="240" height="240">${inner}</svg>
  </g>

  <!-- Main Headline & Tagline -->
  <text x="88" y="310" fill="${brand.ink}" font-family="'Allo', system-ui, -apple-system, sans-serif" font-size="82" font-weight="800" letter-spacing="-2.4">${esc(brand.name)}</text>
  <text x="88" y="372" fill="${brand.ink}" fill-opacity="0.72" font-family="'Allo', system-ui, -apple-system, sans-serif" font-size="27" font-weight="500">${esc(brand.tagline.slice(0, 62))}</text>

  <!-- Palette Bar -->
  ${brand.palette
    .slice(0, 4)
    .map(
      (hex, idx) =>
        `<rect x="${88 + idx * 96}" y="486" width="84" height="32" rx="8" fill="${hex}" stroke="${brand.ink}" stroke-opacity="0.15"/>`,
    )
    .join('\n  ')}
  <text x="496" y="507" fill="${brand.ink}" fill-opacity="0.55" font-family="ui-monospace, monospace" font-size="14">${esc(brand.voice.pillars.join(' · '))}</text>
</svg>`;
}

/**
 * Generates a Front + Back Executive Business Card SVG Spec Sheet.
 */
export function buildBusinessCardSvg(brand: Brand, markSvg: string): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const accentFg = pickReadableFg(brand.accent);
  const { inner: frontMark } = extractInnerSvg(markSvg, accentFg, 'biz-f-');
  const { inner: backMark } = extractInnerSvg(markSvg, brand.accent, 'biz-b-');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 340" width="960" height="340" role="img" aria-label="${esc(brand.name)} Business Card Spec">
  <rect width="960" height="340" fill="#09090b"/>
  <!-- Front Card (Accent Surface) -->
  <g transform="translate(36 35)">
    <rect width="420" height="250" rx="${Math.max(10, brand.radiusPx * 1.4)}" fill="${brand.accent}"/>
    <g transform="translate(166 44)">
      <svg viewBox="0 0 256 256" width="88" height="88">${frontMark}</svg>
    </g>
    <text x="210" y="172" text-anchor="middle" fill="${accentFg}" font-family="'Allo', system-ui, sans-serif" font-size="26" font-weight="800" letter-spacing="-0.6">${esc(brand.name)}</text>
    <text x="210" y="196" text-anchor="middle" fill="${accentFg}" fill-opacity="0.78" font-family="ui-monospace, monospace" font-size="11.5">${esc(brand.voice.domain)}</text>
  </g>

  <!-- Back Card (Editorial Surface) -->
  <g transform="translate(504 35)">
    <rect width="420" height="250" rx="${Math.max(10, brand.radiusPx * 1.4)}" fill="${brand.background}" stroke="${brand.ink}" stroke-opacity="0.22" stroke-width="1.5"/>
    <g transform="translate(32 28)">
      <svg viewBox="0 0 256 256" width="42" height="42">${backMark}</svg>
    </g>
    <text x="388" y="48" text-anchor="end" fill="${brand.accent}" font-family="ui-monospace, monospace" font-size="11" font-weight="700">${esc(brand.handle)}</text>
    <text x="32" y="132" fill="${brand.ink}" font-family="'Allo', system-ui, sans-serif" font-size="20" font-weight="700">Alex Rivera</text>
    <text x="32" y="154" fill="${brand.ink}" fill-opacity="0.65" font-family="'Allo', system-ui, sans-serif" font-size="12.5">Principal Design Systems Architect</text>
    <line x1="32" y1="176" x2="388" y2="176" stroke="${brand.ink}" stroke-opacity="0.14"/>
    <text x="32" y="204" fill="${brand.ink}" fill-opacity="0.78" font-family="ui-monospace, monospace" font-size="11.5">alex@${esc(brand.voice.domain)} · ${esc(brand.voice.domain)}</text>
    <g transform="translate(332 188)">
      ${brand.palette
        .slice(0, 4)
        .map((c, i) => `<circle cx="${i * 14}" cy="12" r="5" fill="${c}"/>`)
        .join('')}
    </g>
  </g>
  <text x="246" y="314" text-anchor="middle" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="10.5">FRONT · 85 × 55 MM BLEED SPEC</text>
  <text x="714" y="314" text-anchor="middle" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="10.5">REVERSE · TYPOGRAPHIC DIRECTORY</text>
</svg>`;
}

/**
 * Generates an AI Brand System Prompt & Guidelines Markdown document.
 */
export function buildAiBrandPrompt(brand: Brand, markName: string): string {
  return [
    `# ${brand.name} — AI Brand System Prompt & Identity Rules`,
    ``,
    `You are generating UI, copy, and visual assets for **${brand.name}** (${brand.voice.category}).`,
    `Follow these deterministic brand constraints without exception:`,
    ``,
    `## 1. Core Identity & Positioning`,
    `- **Brand Name:** ${brand.name}`,
    `- **Tagline:** ${brand.tagline}`,
    `- **Handle & Domain:** ${brand.handle} · https://${brand.voice.domain}`,
    `- **Voice Pillars:** ${brand.voice.pillars.join(' · ')}`,
    `- **Tone — We Are:** ${brand.voice.weAre}`,
    `- **Tone — We Are Not:** ${brand.voice.weAreNot}`,
    `- **Primary Call-to-Action:** "${brand.voice.ctaText}"`,
    ``,
    `## 2. Color Architecture (${brand.proportion[0]}-${brand.proportion[1]}-${brand.proportion[2]} Rule)`,
    `- **${brand.proportion[0]}% Dominant Canvas Surface:** \`${brand.background}\``,
    `- **${brand.proportion[1]}% Structural Ink & Secondary:** \`${brand.ink}\` / \`${brand.secondary}\` (Text contrast: ${wcagContrast(brand.ink, brand.background)}:1 WCAG)`,
    `- **${brand.proportion[2]}% Signal Accent:** \`${brand.accent}\` (Foreground on accent: \`${pickReadableFg(brand.accent)}\`)`,
    `- **Approved Brand Swatches:** ${brand.palette.map((c) => `\`${c}\``).join(', ')}`,
    ``,
    `## 3. Typography & Geometry`,
    `- **Display Font Preset:** \`${brand.displayFont}\` (tight tracking \`-0.03em\`, weight \`700\`)`,
    `- **Body Font Preset:** \`${brand.bodyFont}\` (line-height \`1.55\`)`,
    `- **Component Corner Radius:** \`${brand.radiusPx}px\` (Card container radius: \`${Math.max(6, brand.radiusPx + 4)}px\`)`,
    `- **BrandFx Pattern & Surface:** Pattern \`${brand.pattern}\` · Surface \`${brand.surfaceFx}\` · Photography \`${brand.photoFx}\``,
    ``,
    `## 4. Logo Mark Guardrails (${markName})`,
    `- **Minimum Clearspace:** Maintain at least \`1X\` exclusion zone on all 4 sides (\`X = 25% of mark height\`).`,
    `- **Minimum Scale:** \`16px\` digital favicon · \`64px\` app icon · \`10mm\` print.`,
    `- **Prohibited Misuse:** Never stretch non-uniformly, rotate off-grid, add drop shadows, outline paths, or place on backgrounds with < 4.5:1 contrast.`,
  ].join('\n');
}

/**
 * Generates a self-contained, zero-dependency interactive Brand Guidelines HTML Portal.
 */
export function buildStandaloneBrandBookHtml(brand: Brand, markSvg: string, cssTokens: string): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const markOnBg = adaptSvgPaintForSurface(markSvg, brand.accent, 'html-mk-1-');
  const markOnDark = adaptSvgPaintForSurface(markSvg, '#ffffff', 'html-mk-2-');
  const markOnLight = adaptSvgPaintForSurface(markSvg, '#09090b', 'html-mk-3-');
  const ogSvg = buildOgCardSvg(brand, markSvg);
  const bizSvg = buildBusinessCardSvg(brand, markSvg);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(brand.name)} — Official Brand Guidelines</title>
  <style>
    :root {
      --bg: ${brand.background};
      --ink: ${brand.ink};
      --accent: ${brand.accent};
      --secondary: ${brand.secondary};
      --radius: ${brand.radiusPx}px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.55;
      padding: 48px 24px 96px;
    }
    .wrap { max-width: 1080px; margin: 0 auto; display: grid; gap: 40px; }
    header {
      display: flex; align-items: center; justify-content: space-between;
      padding-bottom: 28px; border-bottom: 1px solid color-mix(in srgb, var(--ink) 16%, transparent);
    }
    h1 { font-size: 44px; margin: 0; letter-spacing: -0.03em; }
    h2 { font-size: 20px; margin: 0 0 14px; letter-spacing: -0.01em; }
    .sub { opacity: 0.72; font-size: 18px; margin-top: 6px; }
    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; }
    .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
    .card {
      padding: 22px;
      border-radius: calc(var(--radius) + 4px);
      border: 1px solid color-mix(in srgb, var(--ink) 16%, transparent);
      background: color-mix(in srgb, var(--ink) 4%, transparent);
    }
    .swatch { height: 84px; border-radius: var(--radius); margin-bottom: 10px; border: 1px solid rgba(128,128,128,0.2); }
    pre {
      padding: 16px; border-radius: var(--radius); overflow-x: auto;
      background: #09090b; color: #fafafa; font-size: 12.5px;
    }
    .mark-box { height: 140px; display: grid; place-items: center; border-radius: var(--radius); padding: 20px; }
    .mark-box svg { width: 76px; height: 76px; }
    .svg-banner svg { width: 100%; height: auto; border-radius: var(--radius); display: block; }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div>
        <div style="font-size:12px;font-weight:700;color:var(--accent);letter-spacing:0.08em;text-transform:uppercase">${esc(brand.voice.category)} · EST. ${esc(brand.voice.foundedYear)}</div>
        <h1>${esc(brand.name)}</h1>
        <div class="sub">${esc(brand.tagline)}</div>
      </div>
      <div style="width:72px;height:72px">${markOnBg}</div>
    </header>

    <section>
      <h2>01 · Brand Voice &amp; Positioning</h2>
      <div class="grid-2">
        <div class="card">
          <strong>Voice Pillars: ${esc(brand.voice.pillars.join(' · '))}</strong>
          <p style="opacity:0.8;margin:8px 0 0"><strong>We Are:</strong> ${esc(brand.voice.weAre)}</p>
          <p style="opacity:0.8;margin:6px 0 0"><strong>We Are Not:</strong> ${esc(brand.voice.weAreNot)}</p>
        </div>
        <div class="card">
          <strong>Digital Presence</strong>
          <p style="opacity:0.8;margin:8px 0 0">Handle: <code>${esc(brand.handle)}</code></p>
          <p style="opacity:0.8;margin:6px 0 0">Domain: <code>https://${esc(brand.voice.domain)}</code></p>
          <p style="opacity:0.8;margin:6px 0 0">Primary CTA: <code>${esc(brand.voice.ctaText)}</code></p>
        </div>
      </div>
    </section>

    <section>
      <h2>02 · Logo Polarity Matrix</h2>
      <div class="grid-4">
        <div class="mark-box" style="background:${brand.background};border:1px solid rgba(128,128,128,0.25)">${markOnBg}</div>
        <div class="mark-box" style="background:#09090b">${markOnDark}</div>
        <div class="mark-box" style="background:#ffffff;border:1px solid #e4e4e7">${markOnLight}</div>
        <div class="mark-box" style="background:${brand.accent}">${pickReadableFg(brand.accent) === '#ffffff' ? markOnDark : markOnLight}</div>
      </div>
    </section>

    <section>
      <h2>03 · Color Architecture (${brand.proportion[0]} / ${brand.proportion[1]} / ${brand.proportion[2]})</h2>
      <div class="grid-4">
        ${brand.palette
          .map(
            (c, i) => `<div class="card">
          <div class="swatch" style="background:${c}"></div>
          <strong>Swatch 0${i + 1}</strong>
          <div style="font-family:monospace;font-size:13px;opacity:0.75">${c.toUpperCase()}</div>
        </div>`,
          )
          .join('')}
      </div>
    </section>

    <section>
      <h2>04 · Open Graph &amp; Executive Collateral</h2>
      <div class="svg-banner" style="margin-bottom:18px">${ogSvg}</div>
      <div class="svg-banner">${bizSvg}</div>
    </section>

    <section>
      <h2>05 · Production CSS Design Tokens</h2>
      <pre><code>${esc(cssTokens)}</code></pre>
    </section>
  </div>
</body>
</html>`;
}

import catalog from './catalog.json';

export type ControlKind = 'slider' | 'color' | 'select' | 'toggle' | 'colorArray';

export interface Control {
  key: string;
  label: string;
  kind: ControlKind;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  default: number | string | boolean;
  options?: string[];
  inferred?: boolean;
}

export interface EffectDef {
  id: string;
  key: string;
  variant: string | null;
  label: string;
  category: '3d' | '2d' | 'mockups';
  group: string;
  controls: Control[];
}

interface CatalogShape {
  categories: { id: string; label: string; groups: { label: string; items: { id: string; label: string }[] }[] }[];
  effects: Record<string, EffectDef>;
  defaults: Record<string, Record<string, unknown>>;
  constructionDefaults: Record<string, unknown>;
  socialDefaults: Record<string, unknown>;
}

const data = catalog as unknown as CatalogShape;

export const categories = data.categories;
export const effects = data.effects;

/** Shader program + variant selector for each catalog entry. */
const SHADER_MAP: Record<string, { shader: string; mode: number }> = {
  'extrude:physical': { shader: 'extrude', mode: 0 },
  'extrude:color': { shader: 'extrude', mode: 1 },
  'extrude:matcap': { shader: 'extrude', mode: 2 },
  'extrude:gradient': { shader: 'extrude', mode: 3 },
  'extrude:texture': { shader: 'extrude', mode: 4 },
  'extrude:glass': { shader: 'extrude', mode: 5 },
  'amethystCoin:physical': { shader: 'coin', mode: 0 },
  paperCutout: { shader: 'emboss', mode: 0 },
  blindEmboss: { shader: 'emboss', mode: 1 },
  holoPrint: { shader: 'emboss', mode: 2 },
  leatherStamp: { shader: 'emboss', mode: 3 },
  satinEmbroidery: { shader: 'emboss', mode: 4 },
  waxSeal: { shader: 'emboss', mode: 5 },
  socialX: { shader: 'none', mode: 0 },
  socialInstagram: { shader: 'none', mode: 0 },
  socialRednote: { shader: 'none', mode: 0 },
  socialDouyin: { shader: 'none', mode: 0 },
  socialYoutube: { shader: 'none', mode: 0 },
};

export function shaderFor(id: string): { shader: string; mode: number } {
  if (SHADER_MAP[id]) return SHADER_MAP[id];
  const def = effects[id];
  return { shader: def?.key ?? id, mode: 0 };
}

/** Emboss-family palettes, recovered from the mockup schema table. */
export const EMBOSS_PALETTES: Record<string, { colors: string[]; labels: string[] }> = {
  paperCutout: { colors: ['#d8cdb5', '#aa9678', '#fff4d7'], labels: ['Base Color', 'Relief Color', 'Highlight Color'] },
  blindEmboss: { colors: ['#26272a', '#303135', '#b4b6bd'], labels: ['Base Color', 'Relief Color', 'Highlight Color'] },
  holoPrint: { colors: ['#000000', '#ff6ad5', '#7ce8ff'], labels: ['Base Color', 'Foil Color', 'Highlight Color'] },
  leatherStamp: { colors: ['#8b4c2d', '#48291c', '#dfa573'], labels: ['Leather Color', 'Deboss Color', 'Highlight Color'] },
  satinEmbroidery: { colors: ['#272e38', '#ead1ae', '#fff2da'], labels: ['Thread Color', 'Stitch Color', 'Highlight Color'] },
  waxSeal: { colors: ['#eadfc9', '#862c3e', '#e79992'], labels: ['Paper Color', 'Wax Color', 'Highlight Color'] },
};

export const SOCIAL_IDS = ['socialX', 'socialInstagram', 'socialRednote', 'socialDouyin', 'socialYoutube'];

const SOCIAL_CONTROLS: Control[] = [
  { key: 'logoSize', label: 'Logo Size', kind: 'slider', min: 0.3, max: 1, step: 0.01, default: 0.72 },
  { key: 'cornerRadius', label: 'Corner Radius', kind: 'slider', min: 0, max: 0.5, step: 0.01, default: 0.18 },
  { key: 'padding', label: 'Frame Padding', kind: 'slider', min: 0, max: 0.3, step: 0.01, default: 0.08 },
  { key: 'dark', label: 'Dark Frame', kind: 'toggle', default: false },
];

export function controlsFor(id: string): Control[] {
  if (SOCIAL_IDS.includes(id)) return SOCIAL_CONTROLS;
  const def = effects[id];
  if (!def) return [];
  const controls = def.controls.filter((c) => c.key && c.key.length > 0);
  if (def.key === 'extrude' && def.variant) {
    const material: Control = {
      key: 'materialMode',
      label: 'Material',
      kind: 'select',
      options: ['physical', 'color', 'matcap', 'gradient', 'glass', 'texture'],
      default: def.variant,
    };
    return [material, ...controls.filter((c) => c.key !== 'materialMode')];
  }
  return controls;
}

export function defaultsFor(id: string): Record<string, number | string | boolean> {
  const def = effects[id];
  const out: Record<string, number | string | boolean> = {};
  if (!def) {
    if (SOCIAL_IDS.includes(id)) for (const c of SOCIAL_CONTROLS) out[c.key] = c.default;
    return out;
  }
  for (const control of controlsFor(id)) out[control.key] = control.default;
  if (def.variant) out.materialMode = def.variant;
  return out;
}

export function colorsFor(id: string): string[] {
  const def = effects[id];
  const key = def?.key ?? id;
  if (EMBOSS_PALETTES[key]) return [...EMBOSS_PALETTES[key].colors];
  const raw = (data.defaults as Record<string, Record<string, unknown>>)[key];
  const colors = raw?.colors;
  if (Array.isArray(colors)) return colors.map(String);
  // No palette table for this effect: its colours are declared as `colors[i]`
  // controls instead, which still carry the real defaults.
  const fromControls = (def?.controls ?? [])
    .filter((c) => /^colors\[\d+\]$/.test(c.key))
    .sort((a, b) => Number(a.key.slice(7, -1)) - Number(b.key.slice(7, -1)))
    .map((c) => String(c.default))
    .filter((c) => c.startsWith('#'));
  if (fromControls.length) return fromControls;
  return [];
}

export function colorLabelsFor(id: string): string[] {
  const def = effects[id];
  const key = def?.key ?? id;
  if (EMBOSS_PALETTES[key]) return EMBOSS_PALETTES[key].labels;
  const raw = (data.defaults as Record<string, Record<string, unknown>>)[key];
  const labels = raw?.colorLabels;
  if (Array.isArray(labels) && labels.length) return labels.map(String);
  return ['Color A', 'Color B', 'Color C'];
}

export interface FilterDef {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
}

/** Filter stack + ranges lifted from shader-filters-*.js. */
export const FILTERS: FilterDef[] = [
  { id: 'exposure', label: 'Exposure', min: -2, max: 2, step: 0.05, initial: 0.35 },
  { id: 'contrast', label: 'Contrast', min: 0, max: 2, step: 0.01, initial: 1.3 },
  { id: 'saturation', label: 'Saturation', min: 0, max: 2, step: 0.01, initial: 1.4 },
  { id: 'grayscale', label: 'Grayscale', min: 0, max: 1, step: 0.01, initial: 1 },
  { id: 'invert', label: 'Invert', min: 0, max: 1, step: 0.01, initial: 1 },
  { id: 'grain', label: 'Film Grain', min: 0, max: 1, step: 0.01, initial: 0.25 },
  { id: 'pixelate', label: 'Pixelate', min: 1, max: 48, step: 1, initial: 8 },
  { id: 'blur', label: 'Blur', min: 0, max: 12, step: 0.1, initial: 2 },
  { id: 'chromatic', label: 'Chromatic Aberration', min: 0, max: 20, step: 0.1, initial: 4 },
  { id: 'orderedDither', label: 'Ordered Dithering', min: 2, max: 32, step: 1, initial: 4 },
  { id: 'vignette', label: 'Vignette', min: 0, max: 1, step: 0.01, initial: 0.4 },
];

export const EASINGS = ['linear', 'easeIn', 'easeOut', 'easeInOut'];

export const EASING_LABELS: Record<string, string> = {
  linear: 'Linear',
  easeIn: 'Ease In',
  easeOut: 'Ease Out',
  easeInOut: 'Ease In Out',
};

export function labelFor(id: string): string {
  return effects[id]?.label ?? id;
}

export function findGroupOf(id: string): string {
  return effects[id]?.group ?? '';
}

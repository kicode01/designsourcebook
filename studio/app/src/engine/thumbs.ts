import type { RenderState, StudioRenderer } from './renderer';
import { categories, colorsFor, defaultsFor, shaderFor } from '../data/effects';

/**
 * Thumbnails for the effect picker.
 *
 * Rendering forty effects costs a shader compile each, so the work is spread
 * across frames and the picker falls back to its glyph icon until a given
 * effect's thumbnail lands. The cache is cleared whenever the logo changes,
 * because every thumbnail is a render of that logo.
 */
const cache = new Map<string, string>();
const listeners = new Set<() => void>();
let generation = 0;

const FALLBACK_COLORS = ['#ffffff', '#b99aff', '#8960d7'];
/** A frame past the intro, so thumbnails are not all caught at progress 0. */
const THUMB_TIME = 1.6;
/**
 * Rendered far above the 28 px it is displayed at: several effects define
 * stroke width in uv units, so a 1:1 render turns their lines sub-pixel and
 * they come out black. The renderer downscales the result before encoding.
 */
const THUMB_SIZE = 512;

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribeThumbs(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function thumbFor(id: string): string | undefined {
  return cache.get(id);
}

export function thumbCount(): number {
  return cache.size;
}

/** Default render state for an effect, matching what selecting it would produce. */
function stateFor(id: string): RenderState {
  const shader = shaderFor(id);
  const colors = colorsFor(id);
  return {
    effectId: id,
    effectKey: shader.shader,
    mode: shader.mode,
    params: defaultsFor(id),
    colors: colors.length ? colors : FALLBACK_COLORS,
    filters: [],
    scale: 1,
    rotate: 0,
    offset: [0, 0],
    // Thumbnails get their own dark plate rather than transparency: several
    // effects draw light ink on nothing, which vanishes on a light panel.
    background: 'color',
    backgroundColor: '#161618',
    animate: true,
    easing: 'linear',
    speed: 1,
    startTime: 0,
    duration: 4,
  };
}

/**
 * Rebuild every thumbnail against the renderer's current logo. Returns a
 * function that cancels the run, so a fast sequence of logo uploads cannot
 * leave two builders fighting over the same cache.
 */
export function buildThumbnails(renderer: StudioRenderer, ids: string[]): () => void {
  const run = ++generation;
  cache.clear();
  notify();

  // The social mockups render nothing on the canvas — their content is a DOM
  // overlay — so a canvas thumbnail of them would just be the bare mark. They
  // keep the picker's glyph icon instead.
  const targets = ids.filter((id) => shaderFor(id).shader !== 'none');

  let index = 0;
  const step = () => {
    if (run !== generation) return;
    const batch = targets.slice(index, index + 3);
    if (batch.length === 0) return;
    for (const id of batch) {
      if (run !== generation) return;
      try {
        cache.set(id, renderer.thumbnail(stateFor(id), THUMB_TIME, THUMB_SIZE));
      } catch (err) {
        // A shader that fails to compile should cost its thumbnail, not the list.
        console.warn(`thumbnail failed for ${id}`, err);
      }
    }
    index += batch.length;
    notify();
    window.setTimeout(step, 12);
  };
  // Let the first paint and the intro animation settle before spending GPU
  // time on forty offscreen renders.
  window.setTimeout(step, 1200);

  return () => {
    if (run === generation) generation++;
  };
}

/** Catalogue order, which is the order the picker shows. */
export function allEffectIds(): string[] {
  return categories.flatMap((c) => c.groups.flatMap((g) => g.items.map((item) => item.id)));
}

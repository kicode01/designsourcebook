import { CENTER, SHEET, type BuiltGrid, type GridFace, type SymmetryMode } from '../../engine/gridArrangement';
import type { GradientStopSpec } from '../../engine/svgPaint';

export type KeylineOverlayKind =
  | 'none'
  | 'golden-phi'
  | 'ios-squircle'
  | 'material'
  | 'fibonacci'
  | 'harmonic-643'
  | 'safe-zone';

export type BadgeShape = 'none' | 'squircle' | 'circle' | 'rounded' | 'hexagon' | 'octagon' | 'shield';
export type RenderPathStyle = 'fill' | 'stroke' | 'fill-stroke';

export interface OpticalMetrics {
  cx: number;
  cy: number;
  dx: number;
  dy: number;
  bbox: [number, number, number, number];
  width: number;
  height: number;
  fillRatioPct: number;
  mirrorXScorePct: number;
}

export interface ExtendedStarter {
  id: string;
  label: string;
  category: 'emblem' | 'tech' | 'badge';
  keep: (x: number, y: number) => boolean;
}

const PHI = 1.61803398875;

/**
 * Generates precision SVG path strings for architectural keyline overlays
 * in the 240x240 SHEET coordinate system.
 */
export function buildKeylineOverlayPaths(kind: KeylineOverlayKind): {
  primary: string;
  secondary: string;
  labels: { x: number; y: number; text: string }[];
} {
  if (kind === 'none') return { primary: '', secondary: '', labels: [] };

  const circlePath = (cx: number, cy: number, r: number) =>
    `M${(cx - r).toFixed(2)} ${cy.toFixed(2)}A${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(cx + r).toFixed(2)} ${cy.toFixed(2)}A${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(cx - r).toFixed(2)} ${cy.toFixed(2)}Z`;

  const rectPath = (x: number, y: number, w: number, h: number, rx = 0) => {
    if (rx <= 0) return `M${x} ${y}H${x + w}V${y + h}H${x}Z`;
    const r = Math.min(rx, w / 2, h / 2);
    return `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
  };

  if (kind === 'golden-phi') {
    const r0 = 104;
    const r1 = r0 / PHI;
    const r2 = r1 / PHI;
    const r3 = r2 / PHI;
    const r4 = r3 / PHI;
    const primary = [r0, r1, r2, r3, r4].map((r) => circlePath(CENTER, CENTER, r)).join(' ');
    const secondary = [
      `M0 ${CENTER}H${SHEET}`,
      `M${CENTER} 0V${SHEET}`,
      `M0 0L${SHEET} ${SHEET}`,
      `M${SHEET} 0L0 ${SHEET}`,
      rectPath(CENTER - r0, CENTER - r1, r0 * 2, r1 * 2),
      rectPath(CENTER - r1, CENTER - r0, r1 * 2, r0 * 2),
    ].join(' ');
    return {
      primary,
      secondary,
      labels: [
        { x: CENTER + r0 - 18, y: CENTER - 4, text: '1.0φ' },
        { x: CENTER + r1 - 22, y: CENTER - 4, text: '0.618φ' },
        { x: CENTER + r2 - 22, y: CENTER - 4, text: '0.382φ' },
      ],
    };
  }

  if (kind === 'ios-squircle') {
    const pad = 16;
    const s = SHEET - pad * 2;
    const primary = [
      rectPath(pad, pad, s, s, s * 0.225),
      circlePath(CENTER, CENTER, s * 0.5),
      circlePath(CENTER, CENTER, s * 0.34),
      circlePath(CENTER, CENTER, s * 0.21),
    ].join(' ');
    const secondary = [
      `M0 ${CENTER}H${SHEET}`,
      `M${CENTER} 0V${SHEET}`,
      `M${pad} ${pad}L${SHEET - pad} ${SHEET - pad}`,
      `M${SHEET - pad} ${pad}L${pad} ${SHEET - pad}`,
      `M0 ${pad + s * 0.293}H${SHEET}`,
      `M0 ${SHEET - pad - s * 0.293}H${SHEET}`,
      `M${pad + s * 0.293} 0V${SHEET}`,
      `M${SHEET - pad - s * 0.293} 0V${SHEET}`,
    ].join(' ');
    return {
      primary,
      secondary,
      labels: [{ x: pad + 8, y: pad + 14, text: 'iOS Keyline R=22.5%' }],
    };
  }

  if (kind === 'material') {
    const primary = [
      circlePath(CENTER, CENTER, 100),
      circlePath(CENTER, CENTER, 48),
      rectPath(32, 32, 176, 176, 16),
      rectPath(20, 44, 200, 152, 16),
      rectPath(44, 20, 152, 200, 16),
    ].join(' ');
    const secondary = [
      `M0 ${CENTER}H${SHEET}`,
      `M${CENTER} 0V${SHEET}`,
      `M0 0L${SHEET} ${SHEET}`,
      `M${SHEET} 0L0 ${SHEET}`,
    ].join(' ');
    return {
      primary,
      secondary,
      labels: [
        { x: 36, y: 46, text: 'Square 176' },
        { x: CENTER + 52, y: CENTER - 4, text: 'Ø200' },
      ],
    };
  }

  if (kind === 'fibonacci') {
    // Golden rectangle & spiral inside 210x130 centered box
    const w = 194;
    const h = w / PHI;
    const x0 = CENTER - w / 2;
    const y0 = CENTER - h / 2;
    const s1 = h;
    const s2 = w - s1;
    const s3 = h - s2;
    const s4 = s2 - s3;
    const primary = [
      rectPath(x0, y0, w, h),
      `M${x0 + s1} ${y0}V${y0 + h}`,
      `M${x0 + s1} ${y0 + s2}H${x0 + w}`,
      `M${x0 + s1 + s4} ${y0 + s2}V${y0 + h}`,
      `M${x0} ${y0 + h}A${s1} ${s1} 0 0 1 ${x0 + s1} ${y0}`,
      `M${x0 + s1} ${y0}A${s2} ${s2} 0 0 1 ${x0 + w} ${y0 + s2}`,
      `M${x0 + w} ${y0 + s2}A${s3} ${s3} 0 0 1 ${x0 + s1 + s4} ${y0 + h}`,
    ].join(' ');
    const secondary = [`M0 ${CENTER}H${SHEET}`, `M${CENTER} 0V${SHEET}`].join(' ');
    return {
      primary,
      secondary,
      labels: [{ x: x0 + 6, y: y0 + 13, text: 'Fibonacci φ Spiral' }],
    };
  }

  if (kind === 'harmonic-643') {
    const r6 = 102;
    const r4 = (r6 * 4) / 6;
    const r3 = (r6 * 3) / 6;
    const r2 = (r6 * 2) / 6;
    const primary = [r6, r4, r3, r2].map((r) => circlePath(CENTER, CENTER, r)).join(' ');
    const secondary = [
      `M0 ${CENTER}H${SHEET}`,
      `M${CENTER} 0V${SHEET}`,
      rectPath(CENTER - r6, CENTER - r6, r6 * 2, r6 * 2),
      rectPath(CENTER - r4, CENTER - r4, r4 * 2, r4 * 2),
    ].join(' ');
    return {
      primary,
      secondary,
      labels: [
        { x: CENTER + r6 - 16, y: CENTER - 4, text: '6x' },
        { x: CENTER + r4 - 16, y: CENTER - 4, text: '4x' },
        { x: CENTER + r3 - 16, y: CENTER - 4, text: '3x' },
      ],
    };
  }

  // safe-zone
  const primary = [
    rectPath(16, 16, 208, 208),
    rectPath(28, 28, 184, 184),
    circlePath(CENTER, CENTER, 92),
  ].join(' ');
  const secondary = [
    `M0 ${CENTER}H${SHEET}`,
    `M${CENTER} 0V${SHEET}`,
    `M0 60H${SHEET}`,
    `M0 180H${SHEET}`,
    `M60 0V${SHEET}`,
    `M180 0V${SHEET}`,
  ].join(' ');
  return {
    primary,
    secondary,
    labels: [
      { x: 20, y: 26, text: 'Trim 16px' },
      { x: 32, y: 40, text: 'Safe 28px' },
    ],
  };
}

/**
 * Generates an SVG path in the 240x240 SHEET coordinate space for a container badge.
 */
export function buildBadgeContainerPath(shape: BadgeShape, inset = 10): string {
  if (shape === 'none') return '';
  const min = inset;
  const max = SHEET - inset;
  const size = max - min;
  const r = size / 2;

  if (shape === 'circle') {
    return `M${CENTER - r} ${CENTER}A${r} ${r} 0 1 0 ${CENTER + r} ${CENTER}A${r} ${r} 0 1 0 ${CENTER - r} ${CENTER}Z`;
  }
  if (shape === 'squircle') {
    const rx = Math.round(size * 0.23);
    return `M${min + rx} ${min}H${max - rx}A${rx} ${rx} 0 0 1 ${max} ${min + rx}V${max - rx}A${rx} ${rx} 0 0 1 ${max - rx} ${max}H${min + rx}A${rx} ${rx} 0 0 1 ${min} ${max - rx}V${min + rx}A${rx} ${rx} 0 0 1 ${min + rx} ${min}Z`;
  }
  if (shape === 'rounded') {
    const rx = Math.round(size * 0.11);
    return `M${min + rx} ${min}H${max - rx}A${rx} ${rx} 0 0 1 ${max} ${min + rx}V${max - rx}A${rx} ${rx} 0 0 1 ${max - rx} ${max}H${min + rx}A${rx} ${rx} 0 0 1 ${min} ${max - rx}V${min + rx}A${rx} ${rx} 0 0 1 ${min + rx} ${min}Z`;
  }
  if (shape === 'hexagon') {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = ((i * 60 - 90) * Math.PI) / 180;
      pts.push(`${(CENTER + Math.cos(a) * r).toFixed(2)} ${(CENTER + Math.sin(a) * r).toFixed(2)}`);
    }
    return `M${pts.join('L')}Z`;
  }
  if (shape === 'octagon') {
    const pts: string[] = [];
    for (let i = 0; i < 8; i++) {
      const a = ((i * 45 + 22.5) * Math.PI) / 180;
      pts.push(`${(CENTER + Math.cos(a) * r).toFixed(2)} ${(CENTER + Math.sin(a) * r).toFixed(2)}`);
    }
    return `M${pts.join('L')}Z`;
  }
  // shield
  return `M${CENTER} ${min}L${max - 12} ${min + 24}V${CENTER + 8}C${max - 12} ${max - 36} ${CENTER + 34} ${max - 8} ${CENTER} ${max}C${CENTER - 34} ${max - 8} ${min + 12} ${max - 36} ${min + 12} ${CENTER + 8}V${min + 24}Z`;
}

/**
 * Computes area-weighted optical center of gravity, bounding box, fill ratio,
 * and horizontal mirror balance score for the active facet selection.
 */
export function computeOpticalMetrics(built: BuiltGrid, selected: Set<string>): OpticalMetrics {
  if (!selected.size) {
    return {
      cx: CENTER,
      cy: CENTER,
      dx: 0,
      dy: 0,
      bbox: [CENTER, CENTER, CENTER, CENTER],
      width: 0,
      height: 0,
      fillRatioPct: 0,
      mirrorXScorePct: 100,
    };
  }

  let sumW = 0;
  let sumX = 0;
  let sumY = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let mirroredHits = 0;

  for (const id of selected) {
    const f = built.faceMap.get(id);
    if (!f) continue;
    const w = Math.max(1, (f.bbox[2] - f.bbox[0]) * (f.bbox[3] - f.bbox[1]));
    sumW += w;
    sumX += f.cx * w;
    sumY += f.cy * w;
    if (f.bbox[0] < minX) minX = f.bbox[0];
    if (f.bbox[1] < minY) minY = f.bbox[1];
    if (f.bbox[2] > maxX) maxX = f.bbox[2];
    if (f.bbox[3] > maxY) maxY = f.bbox[3];

    const symIds = built.symmetricFaces(f, 'x');
    if (symIds.some((sid) => sid !== id && selected.has(sid)) || Math.abs(f.cx - CENTER) < 4) {
      mirroredHits++;
    }
  }

  const cx = sumW > 0 ? Number((sumX / sumW).toFixed(1)) : CENTER;
  const cy = sumW > 0 ? Number((sumY / sumW).toFixed(1)) : CENTER;
  const dx = Number((cx - CENTER).toFixed(1));
  const dy = Number((cy - CENTER).toFixed(1));
  const width = Number(Math.max(0, maxX - minX).toFixed(1));
  const height = Number(Math.max(0, maxY - minY).toFixed(1));
  const fillRatioPct = Math.min(100, Math.round((selected.size / Math.max(1, built.faces.length)) * 100));
  const mirrorXScorePct = Math.round((mirroredHits / Math.max(1, selected.size)) * 100);

  return {
    cx,
    cy,
    dx,
    dy,
    bbox: [minX, minY, maxX, maxY],
    width,
    height,
    fillRatioPct,
    mirrorXScorePct,
  };
}

/**
 * Builds an adjacency map between faces that share a segment edge or touch within 1.5 units.
 */
function buildAdjacencyMap(built: BuiltGrid): Map<string, Set<string>> {
  const edgeToFaces = new Map<string, string[]>();
  const adj = new Map<string, Set<string>>();

  for (const f of built.faces) {
    adj.set(f.id, new Set());
    for (const seg of f.segs) {
      for (const k of [seg.key, seg.revKey]) {
        let list = edgeToFaces.get(k);
        if (!list) {
          list = [];
          edgeToFaces.set(k, list);
        }
        list.push(f.id);
      }
    }
  }

  for (const list of edgeToFaces.values()) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        adj.get(list[i])?.add(list[j]);
        adj.get(list[j])?.add(list[i]);
      }
    }
  }
  return adj;
}

/** Keeps only boundary facets of the current selection (hollows out interior facets). */
export function outlineSelection(built: BuiltGrid, selected: Set<string>): Set<string> {
  if (!selected.size) return new Set();
  const adj = buildAdjacencyMap(built);
  const out = new Set<string>();
  for (const id of selected) {
    const neighbors = adj.get(id);
    const f = built.faceMap.get(id);
    const touchesSheetBorder = f
      ? f.bbox[0] <= 2 || f.bbox[1] <= 2 || f.bbox[2] >= SHEET - 2 || f.bbox[3] >= SHEET - 2
      : false;
    if (!neighbors || neighbors.size < 3 || touchesSheetBorder || [...neighbors].some((nid) => !selected.has(nid))) {
      out.add(id);
    }
  }
  return out.size > 0 ? out : new Set(selected);
}

/** Expands selection by 1 topological ring of neighbor facets. */
export function dilateSelection(built: BuiltGrid, selected: Set<string>): Set<string> {
  if (!selected.size) return new Set();
  const adj = buildAdjacencyMap(built);
  const out = new Set(selected);
  for (const id of selected) {
    const neighbors = adj.get(id);
    if (neighbors) neighbors.forEach((nid) => out.add(nid));
  }
  return out;
}

/** Contracts selection by removing boundary facets (if interior facets exist). */
export function erodeSelection(built: BuiltGrid, selected: Set<string>): Set<string> {
  if (!selected.size) return new Set();
  const boundary = outlineSelection(built, selected);
  const out = new Set<string>();
  for (const id of selected) {
    if (!boundary.has(id)) out.add(id);
  }
  return out.size > 0 ? out : new Set(selected);
}

/** Flood-fills a connected component starting from startFace (with optional symmetry). */
export function floodFillFaces(
  built: BuiltGrid,
  selected: Set<string>,
  startFace: GridFace,
  symmetry: SymmetryMode,
): { component: Set<string>; targetSelectState: boolean } {
  const adj = buildAdjacencyMap(built);
  const startSelected = selected.has(startFace.id);
  const seeds = built.symmetricFaces(startFace, symmetry);
  const visited = new Set<string>(seeds);
  const queue = [...seeds];

  while (queue.length > 0 && visited.size < 600) {
    const curr = queue.shift()!;
    const neighbors = adj.get(curr);
    if (!neighbors) continue;
    for (const nid of neighbors) {
      if (visited.has(nid)) continue;
      if (selected.has(nid) === startSelected) {
        visited.add(nid);
        queue.push(nid);
      }
    }
  }

  return { component: visited, targetSelectState: !startSelected };
}

/** Finds all faces intersected by a straight line segment from (x1, y1) to (x2, y2), plus symmetry. */
export function rayIntersectFaces(
  built: BuiltGrid,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  symmetry: SymmetryMode,
  hitCtx: CanvasRenderingContext2D | null,
  hitPaths: Map<string, Path2D>,
): Set<string> {
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const steps = Math.max(4, Math.ceil(dist / 3));
  const out = new Set<string>();

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const sx = x1 + (x2 - x1) * t;
    const sy = y1 + (y2 - y1) * t;
    for (const f of built.faces) {
      if (sx < f.bbox[0] - 0.5 || sx > f.bbox[2] + 0.5 || sy < f.bbox[1] - 0.5 || sy > f.bbox[3] + 0.5) continue;
      const p = hitPaths.get(f.id);
      if (p && hitCtx && hitCtx.isPointInPath(p, sx, sy)) {
        built.symmetricFaces(f, symmetry).forEach((id) => out.add(id));
        break;
      }
    }
  }
  return out;
}

/** 16 Curated Geometric Form Starters across Emblem, Tech & Badge archetypes. */
export const EXTENDED_STARTERS: ExtendedStarter[] = [
  {
    id: 'delta',
    label: 'Delta',
    category: 'emblem',
    keep: (x, y) => {
      const dx = x - CENTER;
      const dy = y - CENTER;
      return dy > -74 && dy < 66 && Math.abs(dx) < (dy + 80) * 0.66 && !(dy > -12 && dy < 44 && Math.abs(dx) < (dy + 18) * 0.48);
    },
  },
  {
    id: 'hex-core',
    label: 'Hex Core',
    category: 'tech',
    keep: (x, y) => {
      const r = Math.hypot(x - CENTER, y - CENTER);
      return r > 28 && r < 86 && !(Math.abs(x - CENTER) < 12 && y < CENTER);
    },
  },
  {
    id: 'halo-ring',
    label: 'Halo Ring',
    category: 'emblem',
    keep: (x, y) => {
      const r = Math.hypot(x - CENTER, y - CENTER);
      return (r > 48 && r < 88 && Math.abs(x - y) > 16) || r < 22;
    },
  },
  {
    id: 'gem',
    label: 'Gem',
    category: 'badge',
    keep: (x, y) => {
      const m = Math.abs(x - CENTER) + Math.abs(y - CENTER);
      return m < 94 && m > 26;
    },
  },
  {
    id: 'swiss-plus',
    label: 'Swiss Plus',
    category: 'emblem',
    keep: (x, y) => {
      const ax = Math.abs(x - CENTER);
      const ay = Math.abs(y - CENTER);
      return (ax < 26 && ay < 84) || (ay < 26 && ax < 84);
    },
  },
  {
    id: 'ribbon-z',
    label: 'Ribbon Z',
    category: 'tech',
    keep: (x, y) => {
      const dx = x - CENTER;
      const dy = y - CENTER;
      if (Math.abs(dx) > 78 || Math.abs(dy) > 78) return false;
      const topBar = dy < -40 && dy > -74;
      const botBar = dy > 40 && dy < 74;
      const diag = Math.abs(dx + dy) < 26;
      return topBar || botBar || diag;
    },
  },
  {
    id: 'infinity',
    label: 'Infinity',
    category: 'tech',
    keep: (x, y) => {
      const d1 = Math.hypot(x - (CENTER - 42), y - CENTER);
      const d2 = Math.hypot(x - (CENTER + 42), y - CENTER);
      return (d1 > 22 && d1 < 48) || (d2 > 22 && d2 < 48);
    },
  },
  {
    id: 'iso-cube',
    label: 'Iso Cube',
    category: 'tech',
    keep: (x, y) => {
      const dx = Math.abs(x - CENTER);
      const dy = y - CENTER;
      const inHex = dx < 74 && Math.abs(dy) + dx * 0.58 < 86;
      const seam = dy > -8 && dx < 12 && dy > -78;
      const vSeam = dy > 0 && dx < 10;
      return inHex && !seam && !vSeam;
    },
  },
  {
    id: 'aperture',
    label: 'Aperture',
    category: 'emblem',
    keep: (x, y) => {
      const r = Math.hypot(x - CENTER, y - CENTER);
      const a = ((Math.atan2(y - CENTER, x - CENTER) * 180) / Math.PI + 360) % 60;
      return r > 32 && r < 92 && a > 10;
    },
  },
  {
    id: 'bolt',
    label: 'Bolt Signal',
    category: 'tech',
    keep: (x, y) => {
      const dx = x - CENTER;
      const dy = y - CENTER;
      const upper = dy >= -84 && dy <= 10 && dx >= -50 - dy * 0.55 && dx <= 16 - dy * 0.45;
      const lower = dy >= -10 && dy <= 84 && dx <= 50 - dy * 0.55 && dx >= -16 - dy * 0.45;
      return upper || lower;
    },
  },
  {
    id: 'north-star',
    label: 'North Star',
    category: 'emblem',
    keep: (x, y) => {
      const ax = Math.abs(x - CENTER);
      const ay = Math.abs(y - CENTER);
      const r = Math.hypot(ax, ay);
      return r < 94 && (ax * 3.2 + ay < 96 || ay * 3.2 + ax < 96 || (ax + ay < 58 && r > 16));
    },
  },
  {
    id: 'shield-crest',
    label: 'Shield Crest',
    category: 'badge',
    keep: (x, y) => {
      const ax = Math.abs(x - CENTER);
      const dy = y - CENTER;
      const outer = dy > -76 && dy < 82 && ax < 74 - Math.max(0, dy) * 0.62;
      const inner = dy > -52 && dy < 54 && ax < 48 - Math.max(0, dy) * 0.62 && ax > 8;
      return outer && !inner;
    },
  },
  {
    id: 'chain-link',
    label: 'Chain Link',
    category: 'tech',
    keep: (x, y) => {
      const ax = Math.abs(x - CENTER);
      const ay = Math.abs(y - CENTER);
      const box1 = x > CENTER - 76 && x < CENTER + 24 && y > CENTER - 56 && y < CENTER + 44;
      const hole1 = x > CENTER - 52 && x < CENTER && y > CENTER - 32 && y < CENTER + 20;
      const box2 = x > CENTER - 24 && x < CENTER + 76 && y > CENTER - 44 && y < CENTER + 56;
      const hole2 = x > CENTER && x < CENTER + 52 && y > CENTER - 20 && y < CENTER + 32;
      return ((box1 && !hole1) || (box2 && !hole2)) && ax + ay < 126;
    },
  },
  {
    id: 'wave-pulse',
    label: 'Wave Pulse',
    category: 'tech',
    keep: (x, y) => {
      const ax = Math.abs(x - CENTER);
      const ay = Math.abs(y - CENTER);
      if (ax > 86) return false;
      const col = Math.round(ax / 24);
      const barX = Math.abs(ax - col * 24) < 8;
      const maxH = col === 0 ? 78 : col === 1 ? 54 : col === 2 ? 36 : 20;
      return barX && ay < maxH;
    },
  },
  {
    id: 'crown-peak',
    label: 'Crown Peak',
    category: 'badge',
    keep: (x, y) => {
      const ax = Math.abs(x - CENTER);
      const dy = y - CENTER;
      if (ax > 80 || dy < -64 || dy > 58) return false;
      const base = dy > 28 && dy < 56;
      const centerPeak = dy > -62 && dy < 32 && ax < (dy + 68) * 0.45;
      const sidePeak = dy > -36 && dy < 32 && Math.abs(ax - 54) < (dy + 48) * 0.38;
      return base || centerPeak || sidePeak;
    },
  },
  {
    id: 'crescent-orbit',
    label: 'Lunar Orbit',
    category: 'emblem',
    keep: (x, y) => {
      const r1 = Math.hypot(x - CENTER, y - CENTER);
      const r2 = Math.hypot(x - (CENTER + 26), y - (CENTER - 18));
      const dot = Math.hypot(x - (CENTER + 44), y - (CENTER - 36)) < 18;
      return (r1 < 86 && r2 > 58) || dot;
    },
  },
];

/**
 * 5x7 Geometric Constructive Bitmap Font for stamping any A-Z / 0-9 character
 * onto any active construction grid.
 */
const GLYPH_5X7: Record<string, string[]> = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10111', '10001', '10001', '01110'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  '0': ['01110', '10011', '10101', '10101', '11001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00110', '01000', '10000', '11111'],
  '3': ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  '4': ['10010', '10010', '10010', '11111', '00010', '00010', '00010'],
  '5': ['11111', '10000', '10000', '11110', '00001', '00001', '11110'],
  '6': ['01110', '10000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
};

export const MONOGRAM_CHARS = Object.keys(GLYPH_5X7);

export function stampMonogramLetter(built: BuiltGrid, char: string): Set<string> {
  const rows = GLYPH_5X7[char.toUpperCase()] ?? GLYPH_5X7.A;
  const padX = 48;
  const padY = 36;
  const boxW = SHEET - padX * 2;
  const boxH = SHEET - padY * 2;
  const out = new Set<string>();

  for (const f of built.faces) {
    if (f.cx < padX || f.cx > SHEET - padX || f.cy < padY || f.cy > SHEET - padY) continue;
    const col = Math.min(4, Math.max(0, Math.floor(((f.cx - padX) / boxW) * 5)));
    const row = Math.min(6, Math.max(0, Math.floor(((f.cy - padY) / boxH) * 7)));
    if (rows[row]?.[col] === '1') {
      out.add(f.id);
    }
  }
  return out;
}

/**
 * Generates an architectural Blueprint Spec Sheet SVG with grid wireframe,
 * keyline overlays, optical center crosshair, bounding box measurements,
 * and technical title block.
 */
export function buildBlueprintSpecSvg({
  brandName,
  gridLabel,
  wireframeD,
  keylinePrimaryD,
  keylineSecondaryD,
  markInnerXml,
  metrics,
  score,
  anchorsCount,
  facetsCount,
  darkTheme = true,
}: {
  brandName: string;
  gridLabel: string;
  wireframeD: string;
  keylinePrimaryD: string;
  keylineSecondaryD: string;
  markInnerXml: string;
  metrics: OpticalMetrics;
  score: number;
  anchorsCount: number;
  facetsCount: number;
  darkTheme?: boolean;
}): string {
  const bg = darkTheme ? '#09090b' : '#fafafa';
  const ink = darkTheme ? '#fafafa' : '#09090b';
  const muted = darkTheme ? '#a1a1aa' : '#52525b';
  const gridCol = darkTheme ? 'rgba(255,255,255,0.13)' : 'rgba(9,9,11,0.13)';
  const keyCol = '#0ea5e9';
  const optCol = '#f59e0b';
  const [minX, minY, maxX, maxY] = metrics.bbox;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" width="1280" height="840" role="img" aria-label="${brandName} Construction Blueprint">
  <rect width="640" height="420" fill="${bg}"/>
  <rect x="16" y="16" width="608" height="388" rx="10" fill="none" stroke="${gridCol}" stroke-width="1"/>
  <line x1="396" y1="16" x2="396" y2="404" stroke="${gridCol}" stroke-width="1"/>

  <!-- Left Construction Stage (240x240 scaled 1.35x -> 324x324) -->
  <g transform="translate(44 48) scale(1.35)">
    <rect x="0" y="0" width="240" height="240" fill="none" stroke="${gridCol}" stroke-width="0.9"/>
    <path d="${wireframeD}" fill="none" stroke="${gridCol}" stroke-width="0.65"/>
    ${keylineSecondaryD ? `<path d="${keylineSecondaryD}" fill="none" stroke="${keyCol}" stroke-opacity="0.35" stroke-width="0.7" stroke-dasharray="2 2"/>` : ''}
    ${keylinePrimaryD ? `<path d="${keylinePrimaryD}" fill="none" stroke="${keyCol}" stroke-opacity="0.75" stroke-width="0.85"/>` : ''}
    ${markInnerXml}
    <!-- Bounding Box & Optical Center -->
    <rect x="${minX}" y="${minY}" width="${Math.max(1, maxX - minX)}" height="${Math.max(1, maxY - minY)}" fill="none" stroke="${optCol}" stroke-opacity="0.65" stroke-width="0.75" stroke-dasharray="3 2"/>
    <circle cx="120" cy="120" r="3" fill="none" stroke="${keyCol}" stroke-width="0.9"/>
    <circle cx="${metrics.cx}" cy="${metrics.cy}" r="2.8" fill="${optCol}"/>
  </g>

  <!-- Right Spec Column -->
  <g font-family="system-ui, -apple-system, monospace" fill="${ink}">
    <text x="416" y="48" font-size="10" fill="${keyCol}" font-weight="700" letter-spacing="1.2">ARCHITECTURAL SPEC SHEET</text>
    <text x="416" y="70" font-size="18" font-weight="700">${brandName.replace(/[<>&"]/g, '')}</text>
    <text x="416" y="88" font-size="11" fill="${muted}">${gridLabel.replace(/[<>&"]/g, '')}</text>

    <line x1="416" y1="104" x2="604" y2="104" stroke="${gridCol}"/>
    <text x="416" y="124" font-size="10" fill="${muted}">GEOMETRY SCORE</text>
    <text x="540" y="124" font-size="12" font-weight="700">${score}/100</text>

    <text x="416" y="146" font-size="10" fill="${muted}">FACETS / ANCHORS</text>
    <text x="540" y="146" font-size="11" font-weight="600">${facetsCount} / ${anchorsCount}</text>

    <text x="416" y="168" font-size="10" fill="${muted}">BOUNDING BOX</text>
    <text x="540" y="168" font-size="11" font-weight="600">${metrics.width} × ${metrics.height}</text>

    <text x="416" y="190" font-size="10" fill="${muted}">OPTICAL OFFSET</text>
    <text x="540" y="190" font-size="11" font-weight="600" fill="${optCol}">Δ(${metrics.dx}, ${metrics.dy})</text>

    <text x="416" y="212" font-size="10" fill="${muted}">SYMMETRY X</text>
    <text x="540" y="212" font-size="11" font-weight="600">${metrics.mirrorXScorePct}%</text>

    <line x1="416" y1="232" x2="604" y2="232" stroke="${gridCol}"/>
    <text x="416" y="252" font-size="10" fill="${muted}">SCALE SURVIVABILITY (64 · 32 · 16px)</text>
  </g>

  <g transform="translate(416 266) scale(0.266)">
    <rect width="240" height="240" rx="28" fill="${darkTheme ? '#141418' : '#f1f1f4'}" stroke="${gridCol}" stroke-width="3"/>
    ${markInnerXml}
  </g>
  <g transform="translate(496 298) scale(0.133)">
    <rect width="240" height="240" rx="36" fill="${darkTheme ? '#141418' : '#f1f1f4'}" stroke="${gridCol}" stroke-width="6"/>
    ${markInnerXml}
  </g>
  <g transform="translate(544 314) scale(0.0667)">
    <rect width="240" height="240" rx="44" fill="${darkTheme ? '#141418' : '#f1f1f4'}" stroke="${gridCol}" stroke-width="10"/>
    ${markInnerXml}
  </g>

  <text x="416" y="388" font-family="system-ui, monospace" font-size="9.5" fill="${muted}">DESIGN SOURCEBOOK STUDIO · DETERMINISTIC VECTOR ENGINE</text>
</svg>`;
}

/**
 * Generates a clean React / TypeScript SVG component from the exported SVG string.
 */
export function buildReactComponentCode(svgString: string, componentName = 'BrandMark'): string {
  const safeName = componentName.replace(/[^a-zA-Z0-9]/g, '') || 'BrandMark';
  const jsxBody = svgString
    .replace(/xmlns:xlink=/g, 'xmlnsXlink=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stop-color=/g, 'stopColor=')
    .replace(/aria-labelledby=/g, 'ariaLabelledby=')
    .replace(/<svg([^>]*)>/, '<svg$1 {...props}>');

  return `import type { SVGProps } from 'react';\n\nexport function ${safeName}(props: SVGProps<SVGSVGElement>) {\n  return (\n    ${jsxBody.split('\n').join('\n    ')}\n  );\n}\n`;
}

/**
 * Generates a standalone Lockup SVG (Horizontal, Vertical Stacked, or App Badge)
 */
export function buildLockupSvg({
  layout,
  markInnerXml,
  defsXml,
  brandName,
  tagline,
  inkColor,
  mutedColor,
  bgColor,
  accentColor,
  fontWeight = 700,
  trackingEm = -0.02,
  markScale = 1,
  gapPx = 18,
}: {
  layout: 'horizontal' | 'stacked' | 'badge';
  markInnerXml: string;
  defsXml: string;
  brandName: string;
  tagline: string;
  inkColor: string;
  mutedColor: string;
  bgColor: string;
  accentColor: string;
  fontWeight?: number;
  trackingEm?: number;
  markScale?: number;
  gapPx?: number;
}): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const s = (0.32 * markScale).toFixed(3);

  if (layout === 'badge') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="512" height="512" role="img" aria-label="${esc(brandName)} Badge">
  ${defsXml}
  <rect x="12" y="12" width="232" height="232" rx="52" fill="${bgColor}" stroke="${accentColor}" stroke-width="2"/>
  <g transform="translate(128 128) scale(${(0.76 * markScale).toFixed(3)}) translate(-120 -120)">
    ${markInnerXml}
  </g>
</svg>`;
  }

  if (layout === 'stacked') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 240" width="720" height="480" role="img" aria-label="${esc(brandName)} Stacked Lockup">
  ${defsXml}
  <rect width="360" height="240" rx="16" fill="${bgColor}"/>
  <g transform="translate(180 82) scale(${s}) translate(-120 -120)">
    ${markInnerXml}
  </g>
  <text x="180" y="${152 + gapPx * 0.5}" text-anchor="middle" fill="${inkColor}" font-family="'Allo', system-ui, -apple-system, sans-serif" font-size="24" font-weight="${fontWeight}" letter-spacing="${trackingEm}em">${esc(brandName)}</text>
  ${tagline ? `<text x="180" y="${174 + gapPx * 0.5}" text-anchor="middle" fill="${mutedColor}" font-family="'Allo', system-ui, -apple-system, sans-serif" font-size="11.5" font-weight="500" letter-spacing="0.02em">${esc(tagline.slice(0, 48))}</text>` : ''}
</svg>`;
  }

  // horizontal
  const textX = Math.round(112 + gapPx);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 140" width="960" height="280" role="img" aria-label="${esc(brandName)} Horizontal Lockup">
  ${defsXml}
  <rect width="480" height="140" rx="16" fill="${bgColor}"/>
  <g transform="translate(64 70) scale(${s}) translate(-120 -120)">
    ${markInnerXml}
  </g>
  <text x="${textX}" y="${tagline ? 66 : 78}" fill="${inkColor}" font-family="'Allo', system-ui, -apple-system, sans-serif" font-size="26" font-weight="${fontWeight}" letter-spacing="${trackingEm}em">${esc(brandName)}</text>
  ${tagline ? `<text x="${textX}" y="90" fill="${mutedColor}" font-family="'Allo', system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" letter-spacing="0.01em">${esc(tagline.slice(0, 52))}</text>` : ''}
</svg>`;
}

export type GradientPresetItem = { id: string; label: string; angle: number; stops: GradientStopSpec[] };

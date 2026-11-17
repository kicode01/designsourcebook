/**
 * Deterministic Logo Construction Grid & Planar Arrangement Engine (zero AI).
 * Supports polygonal, triangular, isometric, tangential circle-spandrel, polar,
 * and multi-center compass (Line + Circle DCEL) grids with seamless boundary union.
 */

export const SHEET = 240;
export const CENTER = SHEET / 2;

export type GridCategory = 'angular' | 'curved' | 'compass';
export type SymmetryMode = 'none' | 'x' | 'y' | 'quad' | 'rot2' | 'radial';
export type DensityLevel = 'low' | 'med' | 'high';

export type GridId =
  | 'adaptive'
  | 'square'
  | 'circle-spandrel'
  | 'iso30'
  | 'octa4'
  | 'tri60'
  | 'tri-orbital'
  | 'tri-halo'
  | 'octa-rings'
  | 'tri12'
  | 'octa8'
  | 'rhomb45'
  | 'hex'
  | 'brick'
  | 'arc-mesh'
  | 'polar'
  | 'vesica'
  | 'duo-vesica'
  | 'golden-construct'
  | 'octagram'
  | 'shield'
  | 'pinwheel-spiral'
  | 'grid-fillet'
  | 'iso-cube'
  | 'nested-frames';

export interface GridCatalogItem {
  id: GridId;
  label: string;
  short: string;
  category: GridCategory;
  description: string;
  starterPresets?: { id: string; label: string; test: (cx: number, cy: number, s: number) => boolean }[];
}

export interface SegCmd {
  fx: number;
  fy: number;
  tx: number;
  ty: number;
  kind: 'line' | 'arc';
  r?: number;
  sweep?: 0 | 1;
  outAngle: number;
  inAngle: number;
  key: string;
  revKey: string;
}

export interface GridFace {
  id: string;
  d: string;
  cx: number;
  cy: number;
  bbox: [number, number, number, number];
  segs: SegCmd[];
}

export interface BuiltGrid {
  id: GridId;
  label: string;
  density: DensityLevel;
  wireframe: string;
  faces: GridFace[];
  faceMap: Map<string, GridFace>;
  unionBoundary: (selectedIds: Set<string>) => string;
  symmetricFaces: (face: GridFace, mode: SymmetryMode) => string[];
}

export const CONSTRUCTION_GRIDS: GridCatalogItem[] = [
  { id: 'adaptive', label: 'Adaptive Logo Grid', short: 'Adaptive', category: 'compass', description: 'Bespoke construction stems, angles, rays & circles synthesized from the active logo' },
  { id: 'square', label: 'Square Matrix', short: 'Square', category: 'angular', description: 'Orthogonal grid + 24 modular presets & 7 motifs' },
  { id: 'circle-spandrel', label: 'Circle in Square', short: 'Circle Sq', category: 'curved', description: 'Inscribed cell circles split into quarter-disks & concave spandrels' },
  { id: 'iso30', label: 'Isometric 30° Cube', short: 'Iso 30°', category: 'angular', description: '±30° isometric lines + vertical stems for 3D marks & cubes' },
  { id: 'octa4', label: '45° Octagrid', short: 'Octa 45°', category: 'angular', description: 'Squares divided by ±45° diagonals into 4 triangles' },
  { id: 'tri60', label: '60° Triangle Grid', short: 'Tri 60°', category: 'angular', description: 'True equilateral triangles for crests, ribbons & deltas' },
  { id: 'tri-orbital', label: 'Tri-Orbital Ripples', short: 'Tri-Orbit', category: 'compass', description: 'Three overlapping concentric circle centers for blades & lenses' },
  { id: 'tri-halo', label: 'Tri-Grid + Halos', short: 'Tri+Halo', category: 'compass', description: '60° triangular matrix intersected with concentric construction rings' },
  { id: 'octa-rings', label: 'Octagrid + Bulls-eye', short: 'Octa+Ring', category: 'compass', description: '45° Octagrid fused with concentric radial circles' },
  { id: 'tri12', label: 'Hex-Tri Vertical', short: 'Tri-12', category: 'angular', description: '±60° diagonals + vertical lines forming 30-60-90 facets' },
  { id: 'octa8', label: '45° Precision 8-Tri', short: 'Octa 8', category: 'angular', description: 'Subdivided H/V midlines + ±45° diagonals (8 tris per cell)' },
  { id: 'rhomb45', label: '45° Diamond Lattice', short: 'Diamond', category: 'angular', description: 'Tilted 45° rhombic facets for emblems & shields' },
  { id: 'hex', label: 'Honeycomb Hexagons', short: 'Hexagon', category: 'angular', description: 'Regular hexagons split into triangular cube wedges' },
  { id: 'brick', label: 'Staggered Brick', short: 'Brick', category: 'angular', description: 'Offset running-bond grid for woven monograms & knots' },
  { id: 'arc-mesh', label: 'Vertex Circle Mesh', short: 'Arc Mesh', category: 'curved', description: 'Squares intersected by vertex-centered circles' },
  { id: 'polar', label: 'Polar Radial Grid', short: 'Polar', category: 'curved', description: 'Concentric rings + angular spokes for apertures & badges' },
  { id: 'vesica', label: 'Seed of Life', short: 'Vesica 7', category: 'curved', description: 'Overlapping equilateral circles creating petals, lenses & trefoils' },
  { id: 'duo-vesica', label: 'Twin Orbital Vesica', short: 'Duo-Orbit', category: 'curved', description: 'Paired ripple centers for infinities, crescents & S-curves' },
  { id: 'golden-construct', label: 'Golden φ Compass', short: 'Golden φ', category: 'compass', description: '1:1.618 harmonic guide lines & tangent construction circles' },
  { id: 'octagram', label: '8-Fold Star Construct', short: 'Octagram', category: 'compass', description: 'Nested 0°+45° squares + inner octagonal rings' },
  { id: 'shield', label: 'Heraldic Shield Grid', short: 'Shield', category: 'compass', description: 'Swept crest arcs, 45° chamfers & structural centerline ribs' },
  { id: 'pinwheel-spiral', label: 'Spiral Vortex Blades', short: 'Vortex', category: 'curved', description: 'Swept off-center arcs radiating into aperture & swirl blades' },
  { id: 'grid-fillet', label: 'Octagon-Corner Lattice', short: 'Chamfer', category: 'angular', description: 'Octagonal bevel tiles + diamond vertex hubs for fintech marks' },
  { id: 'iso-cube', label: 'Isometric Cube Lattice', short: 'Cube Hub', category: 'angular', description: '3D rhombic cube faces paired for Penrose ribbons & blocks' },
  { id: 'nested-frames', label: 'Concentric Rays Frame', short: 'Frames', category: 'compass', description: 'Nested square frames intersected by 0°/45° radial axes' },
];

const fmt = (n: number): string => {
  const r = Math.round(n * 100) / 100;
  return Number.isInteger(r) ? String(r) : String(r);
};

const normAngle = (a: number): number => {
  let x = a % (Math.PI * 2);
  if (x < 0) x += Math.PI * 2;
  if (Math.abs(x - Math.PI * 2) < 1e-6 || Math.abs(x) < 1e-6) return 0;
  return x;
};

const vKey = (x: number, y: number): string => `${Math.round(x * 100)},${Math.round(y * 100)}`;

function edgeCmd(
  fx: number,
  fy: number,
  tx: number,
  ty: number,
  kind: 'line' | 'arc' = 'line',
  r = 0,
  sweep: 0 | 1 = 1,
  cx = 0,
  cy = 0,
): SegCmd {
  const fk = vKey(fx, fy);
  const tk = vKey(tx, ty);
  const rTag = kind === 'arc' ? Math.round(r * 100) : 0;
  const key = `${fk}->${tk}|${rTag}`;
  const revKey = `${tk}->${fk}|${rTag}`;

  let outAngle = 0;
  let inAngle = 0;
  if (kind === 'line') {
    outAngle = normAngle(Math.atan2(ty - fy, tx - fx));
    inAngle = normAngle(outAngle + Math.PI);
  } else {
    const a1 = Math.atan2(fy - cy, fx - cx);
    const a2 = Math.atan2(ty - cy, tx - cx);
    // In SVG y-down coords, sweep=1 rotates +pi/2 from radius vector
    outAngle = normAngle(sweep === 1 ? a1 + Math.PI / 2 : a1 - Math.PI / 2);
    inAngle = normAngle(sweep === 1 ? a2 - Math.PI / 2 : a2 + Math.PI / 2);
  }
  return { fx, fy, tx, ty, kind, r, sweep, outAngle, inAngle, key, revKey };
}

function buildFaceFromSegs(id: string, segs: SegCmd[], preCx?: number, preCy?: number): GridFace | null {
  if (!segs.length) return null;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let sx = 0;
  let sy = 0;
  let d = `M${fmt(segs[0].fx)} ${fmt(segs[0].fy)}`;
  for (const s of segs) {
    minX = Math.min(minX, s.fx, s.tx);
    minY = Math.min(minY, s.fy, s.ty);
    maxX = Math.max(maxX, s.fx, s.tx);
    maxY = Math.max(maxY, s.fy, s.ty);
    sx += s.fx;
    sy += s.fy;
    if (s.kind === 'line') {
      d += `L${fmt(s.tx)} ${fmt(s.ty)}`;
    } else {
      d += `A${fmt(s.r || 1)} ${fmt(s.r || 1)} 0 0 ${s.sweep ?? 1} ${fmt(s.tx)} ${fmt(s.ty)}`;
    }
  }
  d += 'Z';
  return {
    id,
    d,
    cx: preCx ?? sx / segs.length,
    cy: preCy ?? sy / segs.length,
    bbox: [minX, minY, maxX, maxY],
    segs,
  };
}

function makePolygonFace(id: string, pts: [number, number][]): GridFace | null {
  if (pts.length < 3) return null;
  const segs: SegCmd[] = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 0.02) continue;
    segs.push(edgeCmd(a[0], a[1], b[0], b[1], 'line'));
  }
  if (segs.length < 3) return null;
  // Compute polygon centroid for accurate symmetry matching
  let area2 = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    const cross = x0 * y1 - x1 * y0;
    area2 += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  if (Math.abs(area2) < 1e-4) return null;
  // Ensure CW winding in y-down (positive area2) for consistent seam cancellation
  if (area2 < 0) {
    const rev = [...pts].reverse();
    return makePolygonFace(id, rev);
  }
  return buildFaceFromSegs(id, segs, cx / (3 * area2), cy / (3 * area2));
}

function stitchBoundaryUnion(faces: GridFace[], selectedIds: Set<string>): string {
  if (!selectedIds.size) return '';
  const edgeBucket = new Map<string, SegCmd[]>();
  const addEdge = (k: string, seg: SegCmd) => {
    const arr = edgeBucket.get(k);
    if (arr) arr.push(seg);
    else edgeBucket.set(k, [seg]);
  };

  for (const f of faces) {
    if (!selectedIds.has(f.id)) continue;
    for (const seg of f.segs) {
      const oppArr = edgeBucket.get(seg.revKey);
      if (oppArr && oppArr.length > 0) {
        oppArr.pop();
        if (oppArr.length === 0) edgeBucket.delete(seg.revKey);
      } else {
        addEdge(seg.key, seg);
      }
    }
  }

  const remaining: SegCmd[] = [];
  for (const arr of edgeBucket.values()) remaining.push(...arr);
  if (!remaining.length) return '';

  const byStart = new Map<string, SegCmd[]>();
  for (const s of remaining) {
    const fk = vKey(s.fx, s.fy);
    const list = byStart.get(fk);
    if (list) list.push(s);
    else byStart.set(fk, [s]);
  }

  const used = new Set<SegCmd>();
  let path = '';
  for (const seed of remaining) {
    if (used.has(seed)) continue;
    used.add(seed);
    let cur = seed;
    const startKey = vKey(seed.fx, seed.fy);
    path += `M${fmt(seed.fx)} ${fmt(seed.fy)}`;
    let steps = 0;
    while (steps++ < remaining.length + 2) {
      path +=
        cur.kind === 'line'
          ? `L${fmt(cur.tx)} ${fmt(cur.ty)}`
          : `A${fmt(cur.r || 1)} ${fmt(cur.r || 1)} 0 0 ${cur.sweep ?? 1} ${fmt(cur.tx)} ${fmt(cur.ty)}`;
      const tk = vKey(cur.tx, cur.ty);
      if (tk === startKey) break;
      const candidates = (byStart.get(tk) || []).filter((e) => !used.has(e));
      if (!candidates.length) break;
      let next = candidates[0];
      if (candidates.length > 1) {
        // Pick tightest right/CW interior turn to avoid figure-8 crossing
        let bestDelta = Infinity;
        const back = cur.inAngle;
        for (const cand of candidates) {
          let delta = back - cand.outAngle;
          while (delta <= 0) delta += Math.PI * 2;
          if (delta < bestDelta) {
            bestDelta = delta;
            next = cand;
          }
        }
      }
      used.add(next);
      cur = next;
    }
    path += 'Z';
  }
  return path;
}

function buildSymmetryResolver(faces: GridFace[], id: GridId, radialOrder?: number) {
  return (face: GridFace, mode: SymmetryMode): string[] => {
    if (mode === 'none') return [face.id];
    const targets: [number, number][] = [[face.cx, face.cy]];
    const { cx, cy } = face;
    if (mode === 'x') targets.push([SHEET - cx, cy]);
    else if (mode === 'y') targets.push([cx, SHEET - cy]);
    else if (mode === 'quad') targets.push([SHEET - cx, cy], [cx, SHEET - cy], [SHEET - cx, SHEET - cy]);
    else if (mode === 'rot2') targets.push([SHEET - cx, SHEET - cy]);
    else if (mode === 'radial') {
      const kSym = radialOrder && radialOrder >= 2
        ? radialOrder
        : id === 'tri60' || id === 'tri12' || id === 'tri-halo' || id === 'tri-orbital' || id === 'vesica' || id === 'hex'
          ? 6
          : 4;
      const dx = cx - CENTER;
      const dy = cy - CENTER;
      for (let i = 1; i < kSym; i++) {
        const a = (i * Math.PI * 2) / kSym;
        targets.push([CENTER + dx * Math.cos(a) - dy * Math.sin(a), CENTER + dx * Math.sin(a) + dy * Math.cos(a)]);
      }
    }

    const out = new Set<string>([face.id]);
    for (const [tx, ty] of targets) {
      if (tx < -2 || tx > SHEET + 2 || ty < -2 || ty > SHEET + 2) continue;
      let bestId = '';
      let bestD = Infinity;
      for (const cand of faces) {
        const d = (cand.cx - tx) ** 2 + (cand.cy - ty) ** 2;
        if (d < bestD) {
          bestD = d;
          bestId = cand.id;
        }
      }
      // Tolerance scaled cleanly to sheet spacing
      if (bestId && Math.sqrt(bestD) <= 20) out.add(bestId);
    }
    return [...out];
  };
}

export function wrapBuiltGrid(
  id: GridId,
  label: string,
  density: DensityLevel,
  wireframe: string,
  faces: GridFace[],
  radialOrder?: number,
): BuiltGrid {
  const faceMap = new Map<string, GridFace>();
  for (const f of faces) faceMap.set(f.id, f);
  return {
    id,
    label,
    density,
    wireframe,
    faces,
    faceMap,
    unionBoundary: (sel) => stitchBoundaryUnion(faces, sel),
    symmetricFaces: buildSymmetryResolver(faces, id, radialOrder),
  };
}

/* ============================================================================
 * 1. ANALYTIC GRID BUILDERS (0.3ms exact closed-form regions)
 * ========================================================================== */

function countFor(density: DensityLevel, lo: number, med: number, hi: number): number {
  return density === 'low' ? lo : density === 'high' ? hi : med;
}

function buildSquare(density: DensityLevel): BuiltGrid {
  const n = countFor(density, 6, 8, 12);
  const s = SHEET / n;
  const faces: GridFace[] = [];
  let wf = '';
  for (let i = 1; i < n; i++) wf += `M0 ${fmt(i * s)}H${SHEET}M${fmt(i * s)} 0V${SHEET}`;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const x = c * s;
      const y = r * s;
      const f = makePolygonFace(`sq-${r}-${c}`, [[x, y], [x + s, y], [x + s, y + s], [x, y + s]]);
      if (f) faces.push(f);
    }
  }
  return wrapBuiltGrid('square', 'Square Matrix', density, wf, faces);
}

function buildCircleSpandrel(density: DensityLevel): BuiltGrid {
  const n = countFor(density, 4, 6, 8);
  const s = SHEET / n;
  const r = s / 2;
  const faces: GridFace[] = [];
  let wf = '';
  for (let i = 1; i < n; i++) wf += `M0 ${fmt(i * s)}H${SHEET}M${fmt(i * s)} 0V${SHEET}`;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const x0 = col * s;
      const y0 = row * s;
      const x1 = x0 + s;
      const y1 = y0 + s;
      const mx = x0 + r;
      const my = y0 + r;
      // Wireframe: inscribed circle + subtle quadrant crosshairs
      wf += `M${fmt(mx + r)} ${fmt(my)}A${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(mx - r)} ${fmt(my)}A${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(mx + r)} ${fmt(my)}`;

      // 4 Inner quarter-circle quadrants (clockwise winding in y-down space)
      const qSpecs: { tag: string; segs: SegCmd[]; cx: number; cy: number }[] = [
        {
          tag: 'qNW',
          cx: mx - r * 0.45,
          cy: my - r * 0.45,
          segs: [
            edgeCmd(mx, my, x0, my, 'line'),
            edgeCmd(x0, my, mx, y0, 'arc', r, 1, mx, my),
            edgeCmd(mx, y0, mx, my, 'line'),
          ],
        },
        {
          tag: 'qNE',
          cx: mx + r * 0.45,
          cy: my - r * 0.45,
          segs: [
            edgeCmd(mx, my, mx, y0, 'line'),
            edgeCmd(mx, y0, x1, my, 'arc', r, 1, mx, my),
            edgeCmd(x1, my, mx, my, 'line'),
          ],
        },
        {
          tag: 'qSE',
          cx: mx + r * 0.45,
          cy: my + r * 0.45,
          segs: [
            edgeCmd(mx, my, x1, my, 'line'),
            edgeCmd(x1, my, mx, y1, 'arc', r, 1, mx, my),
            edgeCmd(mx, y1, mx, my, 'line'),
          ],
        },
        {
          tag: 'qSW',
          cx: mx - r * 0.45,
          cy: my + r * 0.45,
          segs: [
            edgeCmd(mx, my, mx, y1, 'line'),
            edgeCmd(mx, y1, x0, my, 'arc', r, 1, mx, my),
            edgeCmd(x0, my, mx, my, 'line'),
          ],
        },
        // 4 Outer concave corner spandrels
        {
          tag: 'cNW',
          cx: x0 + r * 0.18,
          cy: y0 + r * 0.18,
          segs: [
            edgeCmd(x0, y0, mx, y0, 'line'),
            edgeCmd(mx, y0, x0, my, 'arc', r, 0, mx, my),
            edgeCmd(x0, my, x0, y0, 'line'),
          ],
        },
        {
          tag: 'cNE',
          cx: x1 - r * 0.18,
          cy: y0 + r * 0.18,
          segs: [
            edgeCmd(mx, y0, x1, y0, 'line'),
            edgeCmd(x1, y0, x1, my, 'line'),
            edgeCmd(x1, my, mx, y0, 'arc', r, 0, mx, my),
          ],
        },
        {
          tag: 'cSE',
          cx: x1 - r * 0.18,
          cy: y1 - r * 0.18,
          segs: [
            edgeCmd(x1, my, x1, y1, 'line'),
            edgeCmd(x1, y1, mx, y1, 'line'),
            edgeCmd(mx, y1, x1, my, 'arc', r, 0, mx, my),
          ],
        },
        {
          tag: 'cSW',
          cx: x0 + r * 0.18,
          cy: y1 - r * 0.18,
          segs: [
            edgeCmd(x0, my, mx, y1, 'arc', r, 0, mx, my),
            edgeCmd(mx, y1, x0, y1, 'line'),
            edgeCmd(x0, y1, x0, my, 'line'),
          ],
        },
      ];

      for (const sp of qSpecs) {
        const f = buildFaceFromSegs(`cs-${row}-${col}-${sp.tag}`, sp.segs, sp.cx, sp.cy);
        if (f) faces.push(f);
      }
    }
  }
  return wrapBuiltGrid('circle-spandrel', 'Circle in Square', density, wf, faces);
}

function buildOcta4(density: DensityLevel): BuiltGrid {
  const n = countFor(density, 4, 6, 8);
  const s = SHEET / n;
  const faces: GridFace[] = [];
  let wf = '';
  for (let i = 1; i < n; i++) wf += `M0 ${fmt(i * s)}H${SHEET}M${fmt(i * s)} 0V${SHEET}`;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const x = c * s;
      const y = r * s;
      const x2 = x + s;
      const y2 = y + s;
      const mx = x + s / 2;
      const my = y + s / 2;
      wf += `M${fmt(x)} ${fmt(y)}L${fmt(x2)} ${fmt(y2)}M${fmt(x2)} ${fmt(y)}L${fmt(x)} ${fmt(y2)}`;
      const tris: [string, [number, number][]][] = [
        ['N', [[x, y], [x2, y], [mx, my]]],
        ['E', [[x2, y], [x2, y2], [mx, my]]],
        ['S', [[x2, y2], [x, y2], [mx, my]]],
        ['W', [[x, y2], [x, y], [mx, my]]],
      ];
      for (const [tag, pts] of tris) {
        const f = makePolygonFace(`o4-${r}-${c}-${tag}`, pts);
        if (f) faces.push(f);
      }
    }
  }
  return wrapBuiltGrid('octa4', '45° Octagrid', density, wf, faces);
}

function buildOcta8(density: DensityLevel): BuiltGrid {
  const n = countFor(density, 3, 4, 6);
  const s = SHEET / n;
  const faces: GridFace[] = [];
  let wf = '';
  for (let i = 1; i < n * 2; i++) wf += `M0 ${fmt((i * s) / 2)}H${SHEET}M${fmt((i * s) / 2)} 0V${SHEET}`;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const x = c * s;
      const y = r * s;
      const mx = x + s / 2;
      const my = y + s / 2;
      const x2 = x + s;
      const y2 = y + s;
      wf += `M${fmt(x)} ${fmt(y)}L${fmt(x2)} ${fmt(y2)}M${fmt(x2)} ${fmt(y)}L${fmt(x)} ${fmt(y2)}`;
      const tris: [string, [number, number][]][] = [
        ['t0', [[x, y], [mx, y], [mx, my]]],
        ['t1', [[mx, y], [x2, y], [mx, my]]],
        ['t2', [[x2, y], [x2, my], [mx, my]]],
        ['t3', [[x2, my], [x2, y2], [mx, my]]],
        ['t4', [[x2, y2], [mx, y2], [mx, my]]],
        ['t5', [[mx, y2], [x, y2], [mx, my]]],
        ['t6', [[x, y2], [x, my], [mx, my]]],
        ['t7', [[x, my], [x, y], [mx, my]]],
      ];
      for (const [tag, pts] of tris) {
        const f = makePolygonFace(`o8-${r}-${c}-${tag}`, pts);
        if (f) faces.push(f);
      }
    }
  }
  return wrapBuiltGrid('octa8', '45° Precision 8-Tri', density, wf, faces);
}

function clipPolyToRect(pts: [number, number][]): [number, number][] {
  const clipEdge = (poly: [number, number][], inside: (p: [number, number]) => boolean, intersect: (a: [number, number], b: [number, number]) => [number, number]) => {
    const out: [number, number][] = [];
    for (let i = 0; i < poly.length; i++) {
      const cur = poly[i];
      const prev = poly[(i + poly.length - 1) % poly.length];
      const curIn = inside(cur);
      const prevIn = inside(prev);
      if (curIn) {
        if (!prevIn) out.push(intersect(prev, cur));
        out.push(cur);
      } else if (prevIn) {
        out.push(intersect(prev, cur));
      }
    }
    return out;
  };
  let p = pts;
  p = clipEdge(p, (pt) => pt[0] >= -0.001, (a, b) => [0, a[1] + ((b[1] - a[1]) * (0 - a[0])) / (b[0] - a[0])]);
  p = clipEdge(p, (pt) => pt[0] <= SHEET + 0.001, (a, b) => [SHEET, a[1] + ((b[1] - a[1]) * (SHEET - a[0])) / (b[0] - a[0])]);
  p = clipEdge(p, (pt) => pt[1] >= -0.001, (a, b) => [a[0] + ((b[0] - a[0]) * (0 - a[1])) / (b[1] - a[1]), 0]);
  p = clipEdge(p, (pt) => pt[1] <= SHEET + 0.001, (a, b) => [a[0] + ((b[0] - a[0]) * (SHEET - a[1])) / (b[1] - a[1]), SHEET]);
  return p;
}

function buildTri60(density: DensityLevel): BuiltGrid {
  const cols = countFor(density, 6, 9, 12);
  const w = SHEET / cols;
  const h = (w * Math.sqrt(3)) / 2;
  const rows = Math.ceil(SHEET / h) + 1;
  const faces: GridFace[] = [];
  let wf = '';
  for (let r = 0; r <= rows; r++) {
    const y = r * h;
    if (y >= 0 && y <= SHEET) wf += `M0 ${fmt(y)}H${SHEET}`;
  }
  const dy = rows * h;
  for (let c = -rows; c <= cols + rows; c++) {
    const x0 = c * w;
    wf += clipLineWireframe(x0, 0, x0 + (dy / Math.sqrt(3)), dy);
    wf += clipLineWireframe(x0, 0, x0 - (dy / Math.sqrt(3)), dy);
  }
  for (let r = 0; r < rows; r++) {
    const y0 = r * h;
    const y1 = (r + 1) * h;
    const shift = r % 2 === 0 ? 0 : w / 2;
    for (let c = -2; c < cols + 2; c++) {
      const x0 = c * w + shift;
      const triA = clipPolyToRect([[x0, y0], [x0 + w, y0], [x0 + w / 2, y1]]);
      const triB = clipPolyToRect([[x0 + w, y0], [x0 + w * 1.5, y1], [x0 + w / 2, y1]]);
      const fA = makePolygonFace(`t60-${r}-${c}-a`, triA);
      const fB = makePolygonFace(`t60-${r}-${c}-b`, triB);
      if (fA) faces.push(fA);
      if (fB) faces.push(fB);
    }
  }
  return wrapBuiltGrid('tri60', '60° Triangle Grid', density, wf, faces);
}

function buildTri12(density: DensityLevel): BuiltGrid {
  const cols = countFor(density, 4, 6, 8);
  const w = SHEET / cols;
  const h = (w * Math.sqrt(3)) / 2;
  const rows = Math.ceil(SHEET / h) + 1;
  const faces: GridFace[] = [];
  let wf = '';
  for (let c = 1; c < cols * 2; c++) wf += `M${fmt((c * w) / 2)} 0V${SHEET}`;
  for (let r = 0; r <= rows; r++) {
    const y = r * h;
    if (y >= 0 && y <= SHEET) wf += `M0 ${fmt(y)}H${SHEET}`;
  }
  const dy = rows * h;
  for (let c = -rows; c <= cols + rows; c++) {
    const x0 = c * w;
    wf += clipLineWireframe(x0, 0, x0 + dy / Math.sqrt(3), dy);
    wf += clipLineWireframe(x0, 0, x0 - dy / Math.sqrt(3), dy);
  }
  for (let r = 0; r < rows; r++) {
    const y0 = r * h;
    const y1 = (r + 1) * h;
    const shift = r % 2 === 0 ? 0 : w / 2;
    for (let c = -2; c < cols + 2; c++) {
      const x0 = c * w + shift;
      const mx = x0 + w / 2;
      const quads: [string, [number, number][]][] = [
        ['l1', [[x0, y0], [mx, y0], [mx, y1]]],
        ['r1', [[mx, y0], [x0 + w, y0], [mx, y1]]],
        ['l2', [[x0 + w, y0], [x0 + w, y1], [mx, y1]]],
        ['r2', [[x0 + w, y0], [x0 + w * 1.5, y1], [x0 + w, y1]]],
      ];
      for (const [tag, raw] of quads) {
        const clipped = clipPolyToRect(raw);
        const f = makePolygonFace(`t12-${r}-${c}-${tag}`, clipped);
        if (f) faces.push(f);
      }
    }
  }
  return wrapBuiltGrid('tri12', 'Hex-Tri Vertical', density, wf, faces);
}

function buildIso30(density: DensityLevel): BuiltGrid {
  const cols = countFor(density, 6, 8, 12);
  const dx = SHEET / cols;
  const dy = dx / Math.sqrt(3);
  const rows = Math.ceil(SHEET / dy) + 3;
  const faces: GridFace[] = [];
  let wf = '';
  for (let c = 1; c < cols; c++) wf += `M${fmt(c * dx)} 0V${SHEET}`;
  for (let k = -cols; k <= rows + cols; k++) {
    const y0 = k * 2 * dy;
    wf += clipLineWireframe(0, y0, SHEET, y0 + SHEET / Math.sqrt(3));
    wf += clipLineWireframe(0, y0, SHEET, y0 - SHEET / Math.sqrt(3));
  }
  for (let r = -2; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x0 = c * dx;
      const x1 = (c + 1) * dx;
      const base = (r + (c % 2 === 0 ? 0.5 : 0)) * 2 * dy;
      const tA = clipPolyToRect([[x0, base - dy], [x1, base], [x0, base + dy]]);
      const tB = clipPolyToRect([[x0, base + dy], [x1, base], [x1, base + 2 * dy]]);
      const fA = makePolygonFace(`i30-${r}-${c}-a`, tA);
      const fB = makePolygonFace(`i30-${r}-${c}-b`, tB);
      if (fA) faces.push(fA);
      if (fB) faces.push(fB);
    }
  }
  return wrapBuiltGrid('iso30', 'Isometric 30° Cube', density, wf, faces);
}

function buildRhomb45(density: DensityLevel): BuiltGrid {
  const n = countFor(density, 5, 7, 10);
  const d = SHEET / n;
  const faces: GridFace[] = [];
  let wf = '';
  for (let i = -n; i <= n * 2; i++) {
    const c = i * d;
    wf += clipLineWireframe(c, 0, c + SHEET, SHEET);
    wf += clipLineWireframe(c, 0, c - SHEET, SHEET);
  }
  for (let r = 0; r < n * 2; r++) {
    for (let c = -1; c <= n; c++) {
      const cx = (c + (r % 2 === 0 ? 0.5 : 0)) * d;
      const cy = r * (d / 2);
      const diamond = clipPolyToRect([[cx, cy - d / 2], [cx + d / 2, cy], [cx, cy + d / 2], [cx - d / 2, cy]]);
      const f = makePolygonFace(`rh-${r}-${c}`, diamond);
      if (f) faces.push(f);
    }
  }
  return wrapBuiltGrid('rhomb45', '45° Diamond Lattice', density, wf, faces);
}

function buildHex(density: DensityLevel): BuiltGrid {
  const cols = countFor(density, 4, 6, 8);
  const r = SHEET / (cols * Math.sqrt(3));
  const w = r * Math.sqrt(3);
  const rowStep = r * 1.5;
  const rows = Math.ceil(SHEET / rowStep) + 1;
  const faces: GridFace[] = [];
  let wf = '';
  for (let row = 0; row <= rows; row++) {
    for (let col = -1; col <= cols + 1; col++) {
      const cx = (col + (row % 2 ? 0.5 : 0)) * w;
      const cy = row * rowStep;
      const corners: [number, number][] = [];
      for (let k = 0; k < 6; k++) {
        const a = (Math.PI / 180) * (60 * k - 30);
        corners.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
      }
      // Subtle hex wireframe
      wf += `M${fmt(corners[0][0])} ${fmt(corners[0][1])}`;
      for (let k = 1; k < 6; k++) wf += `L${fmt(corners[k][0])} ${fmt(corners[k][1])}`;
      wf += 'Z';
      for (let k = 0; k < 6; k++) {
        wf += clipLineWireframe(cx, cy, corners[k][0], corners[k][1]);
        const tri = clipPolyToRect([[cx, cy], corners[k], corners[(k + 1) % 6]]);
        const f = makePolygonFace(`hx-${row}-${col}-${k}`, tri);
        if (f) faces.push(f);
      }
    }
  }
  return wrapBuiltGrid('hex', 'Honeycomb Hexagons', density, wf, faces);
}

function buildBrick(density: DensityLevel): BuiltGrid {
  const cols = countFor(density, 5, 7, 9);
  const rows = countFor(density, 6, 8, 12);
  const w = SHEET / cols;
  const h = SHEET / rows;
  const faces: GridFace[] = [];
  let wf = '';
  for (let r = 1; r < rows; r++) wf += `M0 ${fmt(r * h)}H${SHEET}`;
  for (let r = 0; r < rows; r++) {
    const off = r % 2 === 1 ? w / 2 : 0;
    const y0 = r * h;
    for (let c = -1; c <= cols; c++) {
      const x0 = c * w + off;
      if (x0 > 0 && x0 < SHEET) wf += `M${fmt(x0)} ${fmt(y0)}V${fmt(y0 + h)}`;
      const cell = clipPolyToRect([[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]]);
      const f = makePolygonFace(`bk-${r}-${c}`, cell);
      if (f) faces.push(f);
    }
  }
  return wrapBuiltGrid('brick', 'Staggered Brick', density, wf, faces);
}

function buildPolar(density: DensityLevel): BuiltGrid {
  const rings = countFor(density, 4, 6, 8);
  const sectors = countFor(density, 12, 16, 24);
  const maxR = CENTER;
  const dr = maxR / rings;
  const da = (Math.PI * 2) / sectors;
  const faces: GridFace[] = [];
  let wf = '';

  for (let k = 1; k <= rings; k++) {
    const r = k * dr;
    wf += `M${fmt(CENTER + r)} ${CENTER}A${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(CENTER - r)} ${CENTER}A${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(CENTER + r)} ${CENTER}`;
  }
  for (let s = 0; s < sectors; s++) {
    const a = s * da - Math.PI / 2;
    wf += `M${CENTER} ${CENTER}L${fmt(CENTER + maxR * Math.cos(a))} ${fmt(CENTER + maxR * Math.sin(a))}`;
  }

  for (let k = 0; k < rings; k++) {
    const r0 = k * dr;
    const r1 = (k + 1) * dr;
    const rMid = (r0 + r1) / 2;
    for (let s = 0; s < sectors; s++) {
      const a0 = s * da - Math.PI / 2;
      const a1 = (s + 1) * da - Math.PI / 2;
      const am = (a0 + a1) / 2;
      const x01 = CENTER + r1 * Math.cos(a0);
      const y01 = CENTER + r1 * Math.sin(a0);
      const x11 = CENTER + r1 * Math.cos(a1);
      const y11 = CENTER + r1 * Math.sin(a1);
      const segs: SegCmd[] = [];
      if (r0 < 0.1) {
        segs.push(
          edgeCmd(CENTER, CENTER, x01, y01, 'line'),
          edgeCmd(x01, y01, x11, y11, 'arc', r1, 1, CENTER, CENTER),
          edgeCmd(x11, y11, CENTER, CENTER, 'line'),
        );
      } else {
        const x00 = CENTER + r0 * Math.cos(a0);
        const y00 = CENTER + r0 * Math.sin(a0);
        const x10 = CENTER + r0 * Math.cos(a1);
        const y10 = CENTER + r0 * Math.sin(a1);
        segs.push(
          edgeCmd(x00, y00, x01, y01, 'line'),
          edgeCmd(x01, y01, x11, y11, 'arc', r1, 1, CENTER, CENTER),
          edgeCmd(x11, y11, x10, y10, 'line'),
          edgeCmd(x10, y10, x00, y00, 'arc', r0, 0, CENTER, CENTER),
        );
      }
      const f = buildFaceFromSegs(`pl-${k}-${s}`, segs, CENTER + rMid * Math.cos(am), CENTER + rMid * Math.sin(am));
      if (f) faces.push(f);
    }
  }
  return wrapBuiltGrid('polar', 'Polar Radial Grid', density, wf, faces);
}

/* ============================================================================
 * 2. GENERAL 2D LINE + CIRCLE DCEL PLANAR ARRANGEMENT ENGINE
 * ========================================================================== */

export interface LineSegIn { x1: number; y1: number; x2: number; y2: number }
export interface CircleIn { cx: number; cy: number; r: number }

function clipSegToSheet(x1: number, y1: number, x2: number, y2: number): LineSegIn | null {
  const dx = x2 - x1;
  const dy = y2 - y1;
  let t0 = 0;
  let t1 = 1;
  const checks: [number, number][] = [[-dx, x1], [dx, SHEET - x1], [-dy, y1], [dy, SHEET - y1]];
  for (const [p, q] of checks) {
    if (Math.abs(p) < 1e-9) {
      if (q < 0) return null;
    } else {
      const r = q / p;
      if (p < 0) {
        if (r > t1) return null;
        if (r > t0) t0 = r;
      } else {
        if (r < t0) return null;
        if (r < t1) t1 = r;
      }
    }
  }
  if (t1 - t0 < 1e-5) return null;
  return { x1: x1 + t0 * dx, y1: y1 + t0 * dy, x2: x1 + t1 * dx, y2: y1 + t1 * dy };
}

function clipLineWireframe(x1: number, y1: number, x2: number, y2: number): string {
  const c = clipSegToSheet(x1, y1, x2, y2);
  if (!c) return '';
  return `M${fmt(c.x1)} ${fmt(c.y1)}L${fmt(c.x2)} ${fmt(c.y2)}`;
}

interface HalfEdgeDCEL {
  id: number;
  from: number;
  to: number;
  twin: number;
  kind: 'line' | 'arc';
  r: number;
  sweep: 0 | 1;
  cx: number;
  cy: number;
  outAngle: number;
  inAngle: number;
  bend: number;
  midX: number;
  midY: number;
  visited: boolean;
}

function pointInFaceLoop(px: number, py: number, pts: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    const inter = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi + 1e-12) + xi;
    if (inter) inside = !inside;
  }
  return inside;
}

export function arrangePlanarGrid(
  id: GridId,
  label: string,
  density: DensityLevel,
  rawLines: LineSegIn[],
  rawCircles: CircleIn[],
  radialOrder?: number,
): BuiltGrid {
  // Always add outer sheet boundary
  const boundary: LineSegIn[] = [
    { x1: 0, y1: 0, x2: SHEET, y2: 0 },
    { x1: SHEET, y1: 0, x2: SHEET, y2: SHEET },
    { x1: SHEET, y1: SHEET, x2: 0, y2: SHEET },
    { x1: 0, y1: SHEET, x2: 0, y2: 0 },
  ];
  const lines: LineSegIn[] = [...boundary];
  let wf = '';
  for (const s of rawLines) {
    const cl = clipSegToSheet(s.x1, s.y1, s.x2, s.y2);
    if (!cl) continue;
    lines.push(cl);
    wf += `M${fmt(cl.x1)} ${fmt(cl.y1)}L${fmt(cl.x2)} ${fmt(cl.y2)}`;
  }

  const circles = rawCircles.filter((c) => c.r > 0.5);
  for (const c of circles) {
    wf += `M${fmt(c.cx + c.r)} ${fmt(c.cy)}A${fmt(c.r)} ${fmt(c.r)} 0 1 0 ${fmt(c.cx - c.r)} ${fmt(c.cy)}A${fmt(c.r)} ${fmt(c.r)} 0 1 0 ${fmt(c.cx + c.r)} ${fmt(c.cy)}`;
  }

  // Collect exact intersections + endpoints
  const linePts: { x: number; y: number }[][] = lines.map((l) => [
    { x: l.x1, y: l.y1 },
    { x: l.x2, y: l.y2 },
  ]);
  const circPts: { x: number; y: number }[][] = circles.map(() => []);

  // Line-Line
  for (let i = 0; i < lines.length; i++) {
    const a = lines[i];
    const dx1 = a.x2 - a.x1;
    const dy1 = a.y2 - a.y1;
    for (let j = i + 1; j < lines.length; j++) {
      const b = lines[j];
      const dx2 = b.x2 - b.x1;
      const dy2 = b.y2 - b.y1;
      const denom = dx1 * dy2 - dy1 * dx2;
      if (Math.abs(denom) < 1e-8) continue;
      const t = ((b.x1 - a.x1) * dy2 - (b.y1 - a.y1) * dx2) / denom;
      const u = ((b.x1 - a.x1) * dy1 - (b.y1 - a.y1) * dx1) / denom;
      if (t >= -1e-4 && t <= 1 + 1e-4 && u >= -1e-4 && u <= 1 + 1e-4) {
        const px = a.x1 + Math.min(1, Math.max(0, t)) * dx1;
        const py = a.y1 + Math.min(1, Math.max(0, t)) * dy1;
        linePts[i].push({ x: px, y: py });
        linePts[j].push({ x: px, y: py });
      }
    }
  }

  // Line-Circle
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const dx = l.x2 - l.x1;
    const dy = l.y2 - l.y1;
    const len2 = dx * dx + dy * dy;
    if (len2 < 1e-8) continue;
    for (let k = 0; k < circles.length; k++) {
      const c = circles[k];
      const fx = l.x1 - c.cx;
      const fy = l.y1 - c.cy;
      const B = 2 * (fx * dx + fy * dy);
      const C = fx * fx + fy * fy - c.r * c.r;
      const disc = B * B - 4 * len2 * C;
      if (disc < -1e-4) continue;
      const sq = Math.sqrt(Math.max(0, disc));
      for (const sgn of sq < 1e-4 ? [0] : [-1, 1]) {
        const t = (-B + sgn * sq) / (2 * len2);
        if (t >= -1e-4 && t <= 1 + 1e-4) {
          const ct = Math.min(1, Math.max(0, t));
          const px = l.x1 + ct * dx;
          const py = l.y1 + ct * dy;
          linePts[i].push({ x: px, y: py });
          circPts[k].push({ x: px, y: py });
        }
      }
    }
  }

  // Circle-Circle
  for (let i = 0; i < circles.length; i++) {
    const a = circles[i];
    for (let j = i + 1; j < circles.length; j++) {
      const b = circles[j];
      const dx = b.cx - a.cx;
      const dy = b.cy - a.cy;
      const d = Math.hypot(dx, dy);
      if (d < 1e-4 || d > a.r + b.r + 1e-3 || d < Math.abs(a.r - b.r) - 1e-3) continue;
      const ex = dx / d;
      const ey = dy / d;
      const xDist = (d * d - b.r * b.r + a.r * a.r) / (2 * d);
      const h2 = a.r * a.r - xDist * xDist;
      if (h2 < -1e-4) continue;
      const h = Math.sqrt(Math.max(0, h2));
      const mx = a.cx + xDist * ex;
      const my = a.cy + xDist * ey;
      for (const sgn of h < 1e-3 ? [0] : [-1, 1]) {
        const px = mx - sgn * h * ey;
        const py = my + sgn * h * ex;
        if (px >= -0.05 && px <= SHEET + 0.05 && py >= -0.05 && py <= SHEET + 0.05) {
          circPts[i].push({ x: px, y: py });
          circPts[j].push({ x: px, y: py });
        }
      }
    }
  }

  // Ensure every circle has split points so arcs are <= 150deg (largeArcFlag = 0 always)
  for (let k = 0; k < circles.length; k++) {
    const c = circles[k];
    for (let q = 0; q < 4; q++) {
      const a = (q * Math.PI) / 2;
      const px = c.cx + c.r * Math.cos(a);
      const py = c.cy + c.r * Math.sin(a);
      if (px >= -0.02 && px <= SHEET + 0.02 && py >= -0.02 && py <= SHEET + 0.02) {
        circPts[k].push({ x: px, y: py });
      }
    }
  }

  // Cluster vertices cleanly (SNAP = 0.04)
  const verts: { x: number; y: number; sumX: number; sumY: number; count: number }[] = [];
  const bucketMap = new Map<string, number[]>();
  const SNAP = 0.04;
  const internVertex = (x: number, y: number): number => {
    const cx = Math.min(SHEET, Math.max(0, x));
    const cy = Math.min(SHEET, Math.max(0, y));
    const gx = Math.round(cx / SNAP);
    const gy = Math.round(cy / SNAP);
    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const list = bucketMap.get(`${gx + ox}:${gy + oy}`);
        if (!list) continue;
        for (const vid of list) {
          const v = verts[vid];
          if (Math.hypot(v.x - cx, v.y - cy) <= SNAP) {
            return vid;
          }
        }
      }
    }
    const vid = verts.length;
    verts.push({ x: cx, y: cy, sumX: cx, sumY: cy, count: 1 });
    const bk = `${gx}:${gy}`;
    const arr = bucketMap.get(bk);
    if (arr) arr.push(vid);
    else bucketMap.set(bk, [vid]);
    return vid;
  };

  // Deduplicate identical edge segments on shared lines
  const halfEdges: HalfEdgeDCEL[] = [];
  const edgeDedup = new Set<string>();

  const pushTwinPair = (
    u: number,
    v: number,
    kind: 'line' | 'arc',
    r: number,
    cx: number,
    cy: number,
    midX: number,
    midY: number,
  ) => {
    if (u === v) return;
    const ux = verts[u].x;
    const uy = verts[u].y;
    const vx = verts[v].x;
    const vy = verts[v].y;
    if (Math.hypot(vx - ux, vy - uy) < 0.03) return;
    if (midX < -0.02 || midX > SHEET + 0.02 || midY < -0.02 || midY > SHEET + 0.02) return;
    const dedupKey = `${Math.min(u, v)}-${Math.max(u, v)}-${Math.round(midX * 10)}-${Math.round(midY * 10)}-${kind}`;
    if (edgeDedup.has(dedupKey)) return;
    edgeDedup.add(dedupKey);

    const id1 = halfEdges.length;
    const id2 = id1 + 1;
    let out1 = 0;
    let out2 = 0;
    let bend1 = 0;
    let bend2 = 0;
    if (kind === 'line') {
      out1 = normAngle(Math.atan2(vy - uy, vx - ux));
      out2 = normAngle(Math.atan2(uy - vy, ux - vx));
    } else {
      const a1 = Math.atan2(uy - cy, ux - cx);
      const a2 = Math.atan2(vy - cy, vx - cx);
      // id1 follows increasing theta (sweep=1 in y-down), id2 decreasing theta (sweep=0)
      out1 = normAngle(a1 + Math.PI / 2);
      out2 = normAngle(a2 - Math.PI / 2);
      bend1 = 1 / r;
      bend2 = -1 / r;
    }

    halfEdges.push({
      id: id1,
      from: u,
      to: v,
      twin: id2,
      kind,
      r,
      sweep: 1,
      cx,
      cy,
      outAngle: out1,
      inAngle: out2,
      bend: bend1,
      midX,
      midY,
      visited: false,
    });
    halfEdges.push({
      id: id2,
      from: v,
      to: u,
      twin: id1,
      kind,
      r,
      sweep: 0,
      cx,
      cy,
      outAngle: out2,
      inAngle: out1,
      bend: bend2,
      midX,
      midY,
      visited: false,
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const dx = l.x2 - l.x1;
    const dy = l.y2 - l.y1;
    const len2 = dx * dx + dy * dy;
    if (len2 < 1e-6) continue;
    const sorted = linePts[i]
      .filter((p) => p.x >= -0.05 && p.x <= SHEET + 0.05 && p.y >= -0.05 && p.y <= SHEET + 0.05)
      .map((p) => ({ vid: internVertex(p.x, p.y), t: ((p.x - l.x1) * dx + (p.y - l.y1) * dy) / len2 }))
      .sort((a, b) => a.t - b.t);
    for (let k = 0; k + 1 < sorted.length; k++) {
      const u = sorted[k].vid;
      const v = sorted[k + 1].vid;
      if (u === v) continue;
      const mx = (verts[u].x + verts[v].x) / 2;
      const my = (verts[u].y + verts[v].y) / 2;
      pushTwinPair(u, v, 'line', 0, 0, 0, mx, my);
    }
  }

  for (let k = 0; k < circles.length; k++) {
    const c = circles[k];
    const pts = circPts[k]
      .filter((p) => p.x >= -0.05 && p.x <= SHEET + 0.05 && p.y >= -0.05 && p.y <= SHEET + 0.05)
      .map((p) => {
        const vid = internVertex(p.x, p.y);
        return { vid, a: normAngle(Math.atan2(verts[vid].y - c.cy, verts[vid].x - c.cx)) };
      })
      .sort((a, b) => a.a - b.a);
    const uniq: { vid: number; a: number }[] = [];
    for (const item of pts) {
      if (!uniq.length || uniq[uniq.length - 1].vid !== item.vid) uniq.push(item);
    }
    if (uniq.length > 1 && uniq[uniq.length - 1].vid === uniq[0].vid) uniq.pop();
    if (uniq.length < 2) continue;

    for (let j = 0; j < uniq.length; j++) {
      const cur = uniq[j];
      const nxt = uniq[(j + 1) % uniq.length];
      let da = nxt.a - cur.a;
      if (da <= 0) da += Math.PI * 2;
      // Split large arcs cleanly if > 170 deg
      if (da > Math.PI * 0.94) {
        const ma = cur.a + da / 2;
        const mpx = c.cx + c.r * Math.cos(ma);
        const mpy = c.cy + c.r * Math.sin(ma);
        if (mpx >= -0.02 && mpx <= SHEET + 0.02 && mpy >= -0.02 && mpy <= SHEET + 0.02) {
          const mv = internVertex(mpx, mpy);
          pushTwinPair(cur.vid, mv, 'arc', c.r, c.cx, c.cy, c.cx + c.r * Math.cos(cur.a + da / 4), c.cy + c.r * Math.sin(cur.a + da / 4));
          pushTwinPair(mv, nxt.vid, 'arc', c.r, c.cx, c.cy, c.cx + c.r * Math.cos(cur.a + (3 * da) / 4), c.cy + c.r * Math.sin(cur.a + (3 * da) / 4));
          continue;
        }
      }
      const ma = cur.a + da / 2;
      pushTwinPair(cur.vid, nxt.vid, 'arc', c.r, c.cx, c.cy, c.cx + c.r * Math.cos(ma), c.cy + c.r * Math.sin(ma));
    }
  }

  // Adjacency fan sorted clockwise by (outAngle, bend)
  const outByVert: HalfEdgeDCEL[][] = Array.from({ length: verts.length }, () => []);
  for (const he of halfEdges) outByVert[he.from].push(he);
  const edgeIndexInVert = new Int32Array(halfEdges.length);
  for (const fan of outByVert) {
    fan.sort((a, b) => {
      if (Math.abs(a.outAngle - b.outAngle) > 1e-5) return a.outAngle - b.outAngle;
      return a.bend - b.bend;
    });
    for (let i = 0; i < fan.length; i++) edgeIndexInVert[fan[i].id] = i;
  }

  const posLoops: { area: number; cycle: HalfEdgeDCEL[]; poly: [number, number][] }[] = [];
  const holeLoops: { area: number; cycle: HalfEdgeDCEL[]; poly: [number, number][]; sx: number; sy: number }[] = [];

  for (let i = 0; i < halfEdges.length; i++) {
    const start = halfEdges[i];
    if (start.visited) continue;
    const cycle: HalfEdgeDCEL[] = [];
    let cur = start;
    let guard = 0;
    let closed = false;
    while (guard++ < halfEdges.length + 2) {
      cur.visited = true;
      cycle.push(cur);
      const fan = outByVert[cur.to];
      if (!fan.length) break;
      const twinPos = edgeIndexInVert[cur.twin];
      const next = fan[(twinPos - 1 + fan.length) % fan.length];
      if (next.id === start.id) {
        closed = true;
        break;
      }
      if (next.visited) break;
      cur = next;
    }
    if (!closed || cycle.length < 2) continue;

    // Sample curve midpoints cleanly for accurate area & point-in-polygon tests
    const poly: [number, number][] = [];
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const e of cycle) {
      const fx = verts[e.from].x;
      const fy = verts[e.from].y;
      minX = Math.min(minX, fx);
      minY = Math.min(minY, fy);
      maxX = Math.max(maxX, fx);
      maxY = Math.max(maxY, fy);
      poly.push([fx, fy]);
      if (e.kind === 'arc') {
        poly.push([e.midX, e.midY]);
        minX = Math.min(minX, e.midX);
        minY = Math.min(minY, e.midY);
        maxX = Math.max(maxX, e.midX);
        maxY = Math.max(maxY, e.midY);
      }
    }
    let area2 = 0;
    for (let k = 0; k < poly.length; k++) {
      const [x0, y0] = poly[k];
      const [x1, y1] = poly[(k + 1) % poly.length];
      area2 += x0 * y1 - x1 * y0;
    }
    if (area2 > 1.5) {
      posLoops.push({ area: area2 / 2, cycle, poly });
    } else if (area2 < -1.5 && maxX - minX < SHEET - 0.5 && maxY - minY < SHEET - 0.5) {
      // Strictly interior hole loop
      holeLoops.push({ area: area2 / 2, cycle, poly, sx: poly[0][0], sy: poly[0][1] });
    }
  }

  // Sort positive loops smallest-first for nested hole pairing
  posLoops.sort((a, b) => a.area - b.area);
  const loopSegs = (cycle: HalfEdgeDCEL[]) =>
    cycle.map((e) => edgeCmd(verts[e.from].x, verts[e.from].y, verts[e.to].x, verts[e.to].y, e.kind, e.r, e.sweep, e.cx, e.cy));

  const holesPerFace: Map<number, HalfEdgeDCEL[][]> = new Map();
  for (const h of holeLoops) {
    for (let idx = 0; idx < posLoops.length; idx++) {
      if (pointInFaceLoop(h.sx, h.sy, posLoops[idx].poly)) {
        const arr = holesPerFace.get(idx) || [];
        arr.push(h.cycle);
        holesPerFace.set(idx, arr);
        break;
      }
    }
  }

  const faces: GridFace[] = [];
  for (let idx = 0; idx < posLoops.length; idx++) {
    const loop = posLoops[idx];
    const outerSegs = loopSegs(loop.cycle);
    let area2 = 0;
    let cx = 0;
    let cy = 0;
    for (let k = 0; k < loop.poly.length; k++) {
      const [x0, y0] = loop.poly[k];
      const [x1, y1] = loop.poly[(k + 1) % loop.poly.length];
      const cr = x0 * y1 - x1 * y0;
      area2 += cr;
      cx += (x0 + x1) * cr;
      cy += (y0 + y1) * cr;
    }
    const baseFace = buildFaceFromSegs(`${id}-${idx}`, outerSegs, cx / (3 * area2), cy / (3 * area2));
    if (!baseFace) continue;

    const childHoles = holesPerFace.get(idx);
    if (childHoles && childHoles.length) {
      let dFull = baseFace.d;
      const allSegs = [...baseFace.segs];
      for (const hCycle of childHoles) {
        const hSegs = loopSegs(hCycle);
        const hBuilt = buildFaceFromSegs('h', hSegs);
        if (hBuilt) {
          dFull += hBuilt.d;
          allSegs.push(...hSegs);
        }
      }
      faces.push({ ...baseFace, d: dFull, segs: allSegs });
    } else {
      faces.push(baseFace);
    }
  }

  return wrapBuiltGrid(id, label, density, wf, faces, radialOrder);
}

/* ============================================================================
 * 3. COMPASS, ORBITAL & SACRED GEOMETRY DEFINITIONS (DCEL-BACKED)
 * ========================================================================== */

function buildTriOrbital(density: DensityLevel): BuiltGrid {
  const rings = countFor(density, 4, 5, 7);
  const sep = 46;
  const rMax = 112;
  const dr = rMax / rings;
  const centers: [number, number][] = [
    [CENTER, CENTER - sep * 0.58],
    [CENTER - sep * 0.5, CENTER + sep * 0.3],
    [CENTER + sep * 0.5, CENTER + sep * 0.3],
  ];
  const circles: CircleIn[] = [];
  for (const [cx, cy] of centers) {
    for (let k = 1; k <= rings; k++) circles.push({ cx, cy, r: k * dr });
  }
  const lines: LineSegIn[] = [{ x1: CENTER, y1: 0, x2: CENTER, y2: SHEET }];
  return arrangePlanarGrid('tri-orbital', 'Tri-Orbital Ripples', density, lines, circles);
}

function buildTriHalo(density: DensityLevel): BuiltGrid {
  const cols = countFor(density, 4, 6, 8);
  const w = SHEET / cols;
  const h = (w * Math.sqrt(3)) / 2;
  const rows = Math.ceil(SHEET / h) + 1;
  const lines: LineSegIn[] = [];
  for (let r = 0; r <= rows; r++) lines.push({ x1: 0, y1: r * h, x2: SHEET, y2: r * h });
  const dy = rows * h;
  for (let c = -rows; c <= cols + rows; c++) {
    const x0 = c * w;
    lines.push({ x1: x0, y1: 0, x2: x0 + dy / Math.sqrt(3), y2: dy });
    lines.push({ x1: x0, y1: 0, x2: x0 - dy / Math.sqrt(3), y2: dy });
  }
  const circles: CircleIn[] = [
    { cx: CENTER, cy: CENTER, r: 44 },
    { cx: CENTER, cy: CENTER, r: 76 },
    { cx: CENTER, cy: CENTER, r: 108 },
  ];
  return arrangePlanarGrid('tri-halo', 'Tri-Grid + Halos', density, lines, circles);
}

function buildOctaRings(density: DensityLevel): BuiltGrid {
  const n = countFor(density, 4, 6, 8);
  const s = SHEET / n;
  const lines: LineSegIn[] = [];
  for (let i = 1; i < n; i++) {
    lines.push({ x1: 0, y1: i * s, x2: SHEET, y2: i * s });
    lines.push({ x1: i * s, y1: 0, x2: i * s, y2: SHEET });
  }
  for (let i = -n; i <= n; i++) {
    lines.push({ x1: i * s, y1: 0, x2: i * s + SHEET, y2: SHEET });
    lines.push({ x1: i * s, y1: 0, x2: i * s - SHEET, y2: SHEET });
  }
  const ringCount = countFor(density, 3, 4, 5);
  const circles: CircleIn[] = [];
  const step = 108 / ringCount;
  for (let k = 1; k <= ringCount; k++) circles.push({ cx: CENTER, cy: CENTER, r: k * step });
  return arrangePlanarGrid('octa-rings', 'Octagrid + Bulls-eye', density, lines, circles);
}

function buildVesica(density: DensityLevel): BuiltGrid {
  const r = density === 'low' ? 46 : 38;
  const circles: CircleIn[] = [
    { cx: CENTER, cy: CENTER, r },
    { cx: CENTER, cy: CENTER, r: r * 2 },
  ];
  if (density !== 'low') circles.push({ cx: CENTER, cy: CENTER, r: r * 0.5 });
  for (let k = 0; k < 6; k++) {
    const a = (k * Math.PI) / 3 - Math.PI / 2;
    circles.push({ cx: CENTER + r * Math.cos(a), cy: CENTER + r * Math.sin(a), r });
  }
  if (density === 'high') {
    for (let k = 0; k < 6; k++) {
      const a = (k * Math.PI) / 3;
      circles.push({ cx: CENTER + r * Math.sqrt(3) * Math.cos(a), cy: CENTER + r * Math.sqrt(3) * Math.sin(a), r });
    }
  }
  const lines: LineSegIn[] = [
    { x1: CENTER, y1: 0, x2: CENTER, y2: SHEET },
    { x1: 0, y1: CENTER, x2: SHEET, y2: CENTER },
  ];
  return arrangePlanarGrid('vesica', 'Seed of Life', density, lines, circles);
}

function buildDuoVesica(density: DensityLevel): BuiltGrid {
  const rings = countFor(density, 4, 5, 6);
  const off = 42;
  const maxR = 104;
  const dr = maxR / rings;
  const circles: CircleIn[] = [];
  for (const cx of [CENTER - off, CENTER + off]) {
    for (let k = 1; k <= rings; k++) circles.push({ cx, cy: CENTER, r: k * dr });
  }
  const lines: LineSegIn[] = [
    { x1: CENTER, y1: 0, x2: CENTER, y2: SHEET },
    { x1: 0, y1: CENTER, x2: SHEET, y2: CENTER },
  ];
  return arrangePlanarGrid('duo-vesica', 'Twin Orbital Vesica', density, lines, circles);
}

function buildGoldenConstruct(density: DensityLevel): BuiltGrid {
  const phi = 0.61803398875;
  const a = SHEET * (1 - phi); // ~91.67
  const b = SHEET * phi;       // ~148.33
  const c = a * phi;           // ~56.66
  const pts = [c, a, CENTER, b, SHEET - c];
  const lines: LineSegIn[] = [];
  for (const v of pts) {
    lines.push({ x1: v, y1: 0, x2: v, y2: SHEET });
    lines.push({ x1: 0, y1: v, x2: SHEET, y2: v });
  }
  if (density !== 'low') {
    lines.push({ x1: 0, y1: 0, x2: SHEET, y2: SHEET });
    lines.push({ x1: SHEET, y1: 0, x2: 0, y2: SHEET });
  }
  const circles: CircleIn[] = [
    { cx: CENTER, cy: CENTER, r: 28 },
    { cx: CENTER, cy: CENTER, r: 46 },
    { cx: CENTER, cy: CENTER, r: 74 },
    { cx: CENTER, cy: CENTER, r: 108 },
  ];
  if (density === 'high') {
    circles.push({ cx: a, cy: a, r: c }, { cx: b, cy: a, r: c }, { cx: a, cy: b, r: c }, { cx: b, cy: b, r: c });
  }
  return arrangePlanarGrid('golden-construct', 'Golden φ Compass', density, lines, circles);
}

function buildArcMesh(density: DensityLevel): BuiltGrid {
  const n = countFor(density, 3, 4, 6);
  const s = SHEET / n;
  const lines: LineSegIn[] = [];
  for (let i = 1; i < n; i++) {
    lines.push({ x1: 0, y1: i * s, x2: SHEET, y2: i * s });
    lines.push({ x1: i * s, y1: 0, x2: i * s, y2: SHEET });
  }
  const circles: CircleIn[] = [];
  for (let r = 0; r <= n; r++) {
    for (let c = 0; c <= n; c++) {
      circles.push({ cx: c * s, cy: r * s, r: s * 0.5 });
    }
  }
  return arrangePlanarGrid('arc-mesh', 'Vertex Circle Mesh', density, lines, circles);
}

function buildOctagram(density: DensityLevel): BuiltGrid {
  const sizes = density === 'low' ? [180, 110] : density === 'high' ? [208, 152, 100, 56] : [200, 138, 82];
  const lines: LineSegIn[] = [
    { x1: CENTER, y1: 0, x2: CENTER, y2: SHEET },
    { x1: 0, y1: CENTER, x2: SHEET, y2: CENTER },
    { x1: 0, y1: 0, x2: SHEET, y2: SHEET },
    { x1: SHEET, y1: 0, x2: 0, y2: SHEET },
  ];
  for (const w of sizes) {
    const h = w / 2;
    lines.push(
      { x1: CENTER - h, y1: CENTER - h, x2: CENTER + h, y2: CENTER - h },
      { x1: CENTER + h, y1: CENTER - h, x2: CENTER + h, y2: CENTER + h },
      { x1: CENTER + h, y1: CENTER + h, x2: CENTER - h, y2: CENTER + h },
      { x1: CENTER - h, y1: CENTER + h, x2: CENTER - h, y2: CENTER - h },
    );
    const d = h * Math.SQRT2;
    lines.push(
      { x1: CENTER, y1: CENTER - d, x2: CENTER + d, y2: CENTER },
      { x1: CENTER + d, y1: CENTER, x2: CENTER, y2: CENTER + d },
      { x1: CENTER, y1: CENTER + d, x2: CENTER - d, y2: CENTER },
      { x1: CENTER - d, y1: CENTER, x2: CENTER, y2: CENTER - d },
    );
  }
  const circles: CircleIn[] = [
    { cx: CENTER, cy: CENTER, r: 34 },
    { cx: CENTER, cy: CENTER, r: 78 },
  ];
  return arrangePlanarGrid('octagram', '8-Fold Star Construct', density, lines, circles);
}

function buildShield(density: DensityLevel): BuiltGrid {
  const cols = countFor(density, 4, 6, 8);
  const step = SHEET / cols;
  const lines: LineSegIn[] = [];
  for (let i = 1; i < cols; i++) {
    lines.push({ x1: i * step, y1: 0, x2: i * step, y2: SHEET });
    lines.push({ x1: 0, y1: i * step, x2: SHEET, y2: i * step });
  }
  lines.push({ x1: 0, y1: 0, x2: CENTER, y2: CENTER });
  lines.push({ x1: SHEET, y1: 0, x2: CENTER, y2: CENTER });
  const circles: CircleIn[] = [
    { cx: CENTER - 58, cy: 96, r: 148 },
    { cx: CENTER + 58, cy: 96, r: 148 },
    { cx: CENTER, cy: 132, r: 88 },
    { cx: CENTER, cy: CENTER, r: 44 },
  ];
  return arrangePlanarGrid('shield', 'Heraldic Shield Grid', density, lines, circles);
}

function buildPinwheelSpiral(density: DensityLevel): BuiltGrid {
  const petals = countFor(density, 6, 8, 12);
  const orbR = 46;
  const arcR = 92;
  const circles: CircleIn[] = [
    { cx: CENTER, cy: CENTER, r: 34 },
    { cx: CENTER, cy: CENTER, r: 76 },
    { cx: CENTER, cy: CENTER, r: 112 },
  ];
  for (let k = 0; k < petals; k++) {
    const a = (k * Math.PI * 2) / petals;
    circles.push({ cx: CENTER + orbR * Math.cos(a), cy: CENTER + orbR * Math.sin(a), r: arcR });
  }
  const lines: LineSegIn[] = [
    { x1: CENTER, y1: 0, x2: CENTER, y2: SHEET },
    { x1: 0, y1: CENTER, x2: SHEET, y2: CENTER },
  ];
  return arrangePlanarGrid('pinwheel-spiral', 'Spiral Vortex Blades', density, lines, circles);
}

function buildGridFillet(density: DensityLevel): BuiltGrid {
  const n = countFor(density, 4, 5, 7);
  const s = SHEET / n;
  const ch = s * 0.28;
  const lines: LineSegIn[] = [];
  for (let i = 1; i < n; i++) {
    lines.push({ x1: 0, y1: i * s, x2: SHEET, y2: i * s });
    lines.push({ x1: i * s, y1: 0, x2: i * s, y2: SHEET });
  }
  // Diamond chamfers around every vertex create Octagons + Diamonds
  for (let r = 0; r <= n; r++) {
    for (let c = 0; c <= n; c++) {
      const vx = c * s;
      const vy = r * s;
      lines.push(
        { x1: vx, y1: vy - ch, x2: vx + ch, y2: vy },
        { x1: vx + ch, y1: vy, x2: vx, y2: vy + ch },
        { x1: vx, y1: vy + ch, x2: vx - ch, y2: vy },
        { x1: vx - ch, y1: vy, x2: vx, y2: vy - ch },
      );
    }
  }
  return arrangePlanarGrid('grid-fillet', 'Octagon-Corner Lattice', density, lines, []);
}

function buildIsoCube(density: DensityLevel): BuiltGrid {
  const cols = countFor(density, 4, 6, 8);
  const dx = SHEET / cols;
  const dy = dx / Math.sqrt(3);
  const rows = Math.ceil(SHEET / dy) + 3;
  const faces: GridFace[] = [];
  let wf = '';
  for (let c = 1; c < cols; c++) wf += `M${fmt(c * dx)} 0V${SHEET}`;
  for (let k = -cols; k <= rows + cols; k++) {
    const y0 = k * 2 * dy;
    wf += clipLineWireframe(0, y0, SHEET, y0 + SHEET / Math.sqrt(3));
    wf += clipLineWireframe(0, y0, SHEET, y0 - SHEET / Math.sqrt(3));
  }
  for (let r = -1; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x0 = c * dx;
      const x1 = (c + 1) * dx;
      const base = (r + (c % 2 === 0 ? 0.5 : 0)) * 2 * dy;
      const rhombA = clipPolyToRect([[x0, base - dy], [x1, base], [x1, base + 2 * dy], [x0, base + dy]]);
      const fA = makePolygonFace(`ic-${r}-${c}-d`, rhombA);
      if (fA) faces.push(fA);
    }
  }
  return wrapBuiltGrid('iso-cube', 'Isometric Cube Lattice', density, wf, faces);
}

function buildNestedFrames(density: DensityLevel): BuiltGrid {
  const rings = countFor(density, 3, 5, 7);
  const step = CENTER / rings;
  const lines: LineSegIn[] = [
    { x1: CENTER, y1: 0, x2: CENTER, y2: SHEET },
    { x1: 0, y1: CENTER, x2: SHEET, y2: CENTER },
    { x1: 0, y1: 0, x2: SHEET, y2: SHEET },
    { x1: SHEET, y1: 0, x2: 0, y2: SHEET },
  ];
  for (let k = 1; k < rings; k++) {
    const o = k * step;
    const d = SHEET - o;
    lines.push(
      { x1: o, y1: o, x2: d, y2: o },
      { x1: d, y1: o, x2: d, y2: d },
      { x1: d, y1: d, x2: o, y2: d },
      { x1: o, y1: d, x2: o, y2: o },
    );
  }
  return arrangePlanarGrid('nested-frames', 'Concentric Rays Frame', density, lines, []);
}

/* ============================================================================
 * 4. DISPATCH, CACHE & STARTER SHAPES
 * ========================================================================== */

const BUILT_CACHE = new Map<string, BuiltGrid>();

export function buildGridById(id: GridId, density: DensityLevel): BuiltGrid {
  const key = `${id}:${density}`;
  const hit = BUILT_CACHE.get(key);
  if (hit) return hit;

  let built: BuiltGrid;
  switch (id) {
    case 'adaptive': built = buildOctaRings(density); built = { ...built, id: 'adaptive', label: 'Adaptive Logo Grid' }; break;
    case 'square': built = buildSquare(density); break;
    case 'circle-spandrel': built = buildCircleSpandrel(density); break;
    case 'octa4': built = buildOcta4(density); break;
    case 'octa8': built = buildOcta8(density); break;
    case 'tri60': built = buildTri60(density); break;
    case 'tri12': built = buildTri12(density); break;
    case 'iso30': built = buildIso30(density); break;
    case 'rhomb45': built = buildRhomb45(density); break;
    case 'hex': built = buildHex(density); break;
    case 'brick': built = buildBrick(density); break;
    case 'polar': built = buildPolar(density); break;
    case 'tri-orbital': built = buildTriOrbital(density); break;
    case 'tri-halo': built = buildTriHalo(density); break;
    case 'octa-rings': built = buildOctaRings(density); break;
    case 'vesica': built = buildVesica(density); break;
    case 'duo-vesica': built = buildDuoVesica(density); break;
    case 'golden-construct': built = buildGoldenConstruct(density); break;
    case 'arc-mesh': built = buildArcMesh(density); break;
    case 'octagram': built = buildOctagram(density); break;
    case 'shield': built = buildShield(density); break;
    case 'pinwheel-spiral': built = buildPinwheelSpiral(density); break;
    case 'grid-fillet': built = buildGridFillet(density); break;
    case 'iso-cube': built = buildIsoCube(density); break;
    case 'nested-frames': built = buildNestedFrames(density); break;
    default: built = buildSquare(density); break;
  }

  BUILT_CACHE.set(key, built);
  return built;
}

const THUMB_CACHE = new Map<GridId, string>();

export function gridWireframeThumb(id: GridId): string {
  const hit = THUMB_CACHE.get(id);
  if (hit) return hit;
  // Use low/med density wireframe so thumbnail lines stay clear at 56px
  const b = buildGridById(id, 'low');
  THUMB_CACHE.set(id, b.wireframe);
  return b.wireframe;
}

/** Curated non-square starter silhouettes formed automatically inside any construction grid */
export const COMPASS_STARTERS: { id: string; label: string; keep: (cx: number, cy: number) => boolean }[] = [
  { id: 'delta', label: 'Delta', keep: (x, y) => Math.abs(x - CENTER) <= (y - 34) * 0.56 && y >= 34 && y <= 198 },
  { id: 'hexcore', label: 'Hex Core', keep: (x, y) => Math.max(Math.abs(y - CENTER), Math.abs(x - CENTER) * 0.866 + Math.abs(y - CENTER) * 0.5) < 76 },
  { id: 'ring', label: 'Halo Ring', keep: (x, y) => { const d = Math.hypot(x - CENTER, y - CENTER); return d > 44 && d < 92; } },
  { id: 'diamond', label: 'Gem', keep: (x, y) => Math.abs(x - CENTER) + Math.abs(y - CENTER) < 86 },
  { id: 'cross', label: 'Swiss Plus', keep: (x, y) => (Math.abs(x - CENTER) < 30 && Math.abs(y - CENTER) < 86) || (Math.abs(y - CENTER) < 30 && Math.abs(x - CENTER) < 86) },
  { id: 'slash', label: 'Ribbon Z', keep: (x, y) => Math.abs((y - CENTER) + (x - CENTER)) < 26 || (Math.abs(y - 54) < 22 && x > 44 && x < 196) || (Math.abs(y - 186) < 22 && x > 44 && x < 196) },
];

/**
 * CreateX grid presets.
 *
 * The target ships 24 grids with 9 shown to anonymous visitors and the rest
 * behind a join prompt. These are independent designs built from the same
 * visual idea (a square cell matrix that reads as a mark) rather than copies of
 * theirs — the paid grid data is never exposed to a free client, so there is
 * nothing here that could have been lifted from it.
 */

export type Cells = Set<string>;

export const cellKey = (r: number, c: number) => `${r}:${c}`;

function build(n: number, on: (r: number, c: number, mid: number) => boolean): boolean[][] {
  const mid = (n - 1) / 2;
  return Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => on(r, c, mid)));
}

/** Deterministic PRNG so the "random" presets look identical every load. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The shape each filled cell draws. The target's cells are not all squares: a
 * preset carries its own motif and every filled cell repeats it, which is what
 * makes one grid read as rings and another as a lattice of diamonds.
 */
export type Motif = 'square' | 'circle' | 'diamond' | 'dot' | 'line' | 'diag' | 'cross';

export interface GridPreset {
  id: string;
  label: string;
  motif: Motif;
  build: (n: number) => boolean[][];
}

/** Design units per cell. The target's sheet is 16 × 15 = 240 units square. */
export const CELL = 15;

const H = CELL / 2;

/**
 * Filled motif geometry, in one-cell design space. Only absolute commands are
 * used (`M L H V A Z`) so {@link shiftMotif} can translate the numbers instead
 * of wrapping every cell in its own `<path transform>`.
 */
const MOTIF_FILL: Record<Motif, string> = {
  square: `M0 0L${CELL} 0L${CELL} ${CELL}L0 ${CELL}L0 0Z`,
  circle: `M${H} 1.1A6.4 6.4 0 1 1 ${H - 0.02} 1.1Z`,
  diamond: `M${H} 1.1L13.9 ${H}L${H} 13.9L1.1 ${H}Z`,
  dot: `M${H} 4.3A3.2 3.2 0 1 1 ${H - 0.02} 4.3Z`,
  line: 'M1 6.9H14V8.1H1Z',
  diag: 'M0.2 12.6L12.6 0.2L14.8 2.4L2.4 14.8Z',
  cross: 'M6.6 0.8H8.4V6.6H14.2V8.4H8.4V14.2H6.6V8.4H0.8V6.6H6.6Z',
};

/** The same motifs as open strokes — this is what makes the tiles line art. */
const MOTIF_STROKE: Record<Motif, string> = {
  square: MOTIF_FILL.square,
  circle: MOTIF_FILL.circle,
  diamond: MOTIF_FILL.diamond,
  dot: MOTIF_FILL.dot,
  line: `M1 ${H}H14`,
  diag: 'M1.6 1.6L13.4 13.4',
  cross: `M${H} 0.9V14.1M0.9 ${H}H14.1`,
};

export type MotifMode = 'fill' | 'stroke';

export function motifPath(motif: Motif, mode: MotifMode): string {
  return (mode === 'stroke' ? MOTIF_STROKE : MOTIF_FILL)[motif];
}

/** Translate an absolute-command path. */
function shiftMotif(d: string, dx: number, dy: number): string {
  let out = '';
  const re = /([MLHVAZ])([^MLHVAZ]*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(d)) !== null) {
    const cmd = m[1];
    const nums = (m[2].match(/-?\d*\.?\d+/g) ?? []).map(Number);
    if (cmd === 'M' || cmd === 'L') {
      for (let i = 0; i + 1 < nums.length; i += 2) out += `${cmd}${nums[i] + dx} ${nums[i + 1] + dy}`;
    } else if (cmd === 'H') {
      out += `H${nums[0] + dx}`;
    } else if (cmd === 'V') {
      out += `V${nums[0] + dy}`;
    } else if (cmd === 'A') {
      out += `A${nums[0]} ${nums[1]} ${nums[2]} ${nums[3]} ${nums[4]} ${nums[5] + dx} ${nums[6] + dy}`;
    } else {
      out += 'Z';
    }
  }
  return out;
}

export const GRID_PRESETS: GridPreset[] = [
  { id: 'dot', motif: 'circle', label: 'Dot', build: (n) => build(n, (r, c, m) => Math.abs(r - m) < 1 && Math.abs(c - m) < 1) },
  { id: 'block', motif: 'square', label: 'Block', build: (n) => build(n, (r, c) => r > 0 && c > 0 && r < n - 1 && c < n - 1) },
  { id: 'frame', motif: 'square', label: 'Frame', build: (n) => build(n, (r, c) => r === 0 || c === 0 || r === n - 1 || c === n - 1) },
  { id: 'plus', motif: 'cross', label: 'Plus', build: (n) => build(n, (r, c, m) => Math.abs(r - m) < 1 || Math.abs(c - m) < 1) },
  { id: 'diag', motif: 'diag', label: 'Diagonal', build: (n) => build(n, (r, c) => r === c) },
  { id: 'antidiag', motif: 'diag', label: 'Counter', build: (n) => build(n, (r, c) => r + c === n - 1) },
  { id: 'checker', motif: 'square', label: 'Checker', build: (n) => build(n, (r, c) => (r + c) % 2 === 0) },
  { id: 'weave', motif: 'line', label: 'Weave', build: (n) => build(n, (r, c) => (r + c) % 4 < 2) },
  { id: 'twill', motif: 'line', label: 'Twill', build: (n) => build(n, (r, c) => (r + 2 * c) % 4 < 2) },
  {
    id: 'rings',
    motif: 'circle',
    label: 'Rings',
    build: (n) =>
      build(n, (r, c, m) => Math.max(Math.abs(r - m), Math.abs(c - m)) % 2 < 1),
  },
  {
    id: 'diamond',
    motif: 'diamond',
    label: 'Diamond',
    build: (n) => build(n, (r, c, m) => (Math.abs(r - m) + Math.abs(c - m)) % 2 < 1),
  },
  {
    id: 'ripple',
    motif: 'circle',
    label: 'Ripple',
    build: (n) =>
      build(n, (r, c, m) => Math.floor(Math.hypot(r - m, c - m)) % 2 === 0),
  },
  {
    id: 'wave',
    motif: 'line',
    label: 'Wave',
    build: (n) =>
      build(n, (r, c, m) => r <= m + Math.sin((c / Math.max(n - 1, 1)) * Math.PI * 2) * n * 0.24),
  },
  { id: 'chevron', motif: 'line', label: 'Chevron', build: (n) => build(n, (r, c) => (r + c) % 6 < 3) },
  { id: 'stair', motif: 'square', label: 'Stair', build: (n) => build(n, (r, c) => c % 4 >= r % 4) },
  { id: 'lattice', motif: 'square', label: 'Lattice', build: (n) => build(n, (r, c) => r % 3 === 0 || c % 3 === 0) },
  {
    id: 'spokes',
    motif: 'line',
    label: 'Spokes',
    build: (n) =>
      build(n, (r, c, m) => {
        const a = Math.atan2(r - m, c - m);
        return Math.floor((a + Math.PI) / (Math.PI / 8)) % 2 === 0 && Math.hypot(r - m, c - m) > 1.2;
      }),
  },
  {
    id: 'truchet',
    motif: 'square',
    label: 'Truchet',
    build: (n) =>
      build(n, (r, c) => {
        const q = (Math.floor(r / 2) + Math.floor(c / 2)) % 2 === 0;
        return q ? r % 2 === c % 2 : r % 2 !== c % 2;
      }),
  },
  {
    id: 'pinwheel',
    motif: 'line',
    label: 'Pinwheel',
    build: (n) =>
      build(n, (r, c, m) => {
        const q = (r < m ? 0 : 1) + (c < m ? 0 : 2);
        const d = q === 0 ? r - c : q === 1 ? r + c - (n - 1) : q === 2 ? r + c - (n - 1) : c - r;
        return d >= 0 && d < 2;
      }),
  },
  { id: 'braille', motif: 'dot', label: 'Braille', build: (n) => build(n, (r, c) => r % 4 < 2 && c % 3 < 2) },
  {
    id: 'scatter',
    motif: 'dot',
    label: 'Scatter',
    build: (n) => {
      const rand = rng(0x5eed);
      return build(n, () => rand() < 0.42);
    },
  },
  {
    id: 'burst',
    motif: 'circle',
    label: 'Burst',
    build: (n) => build(n, (r, c, m) => Math.hypot(r - m, c - m) % 3 < 1.1),
  },
  {
    id: 'maze',
    motif: 'line',
    label: 'Maze',
    build: (n) => {
      const rand = rng(0x1234);
      return build(n, (r, c) => (r % 2 === 0 && rand() < 0.62) || (c % 2 === 0 && rand() < 0.3));
    },
  },
  {
    id: 'halo',
    motif: 'circle',
    label: 'Halo',
    build: (n) =>
      build(n, (r, c, m) => {
        const cheb = Math.max(Math.abs(r - m), Math.abs(c - m));
        return Math.abs(cheb - (m - 1)) < 0.6 || cheb < 0.6;
      }),
  },
];

export function presetCells(id: string, n: number): Cells {
  const preset = GRID_PRESETS.find((p) => p.id === id) ?? GRID_PRESETS[0];
  const grid = preset.build(n);
  const cells: Cells = new Set();
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (grid[r][c]) cells.add(cellKey(r, c));
  return cells;
}

/**
 * Flatten a cell set into a single SVG path in design units. One element per
 * preview instead of one per cell — 24 previews at 16×16 would otherwise be
 * ~6k nodes.
 */
export function cellsToPath(
  cells: Cells,
  n: number,
  motif: Motif = 'square',
  mode: MotifMode = 'fill',
): string {
  const tpl = motifPath(motif, mode);
  let d = '';
  for (const key of cells) {
    const [r, c] = key.split(':').map(Number);
    if (r < 0 || c < 0 || r >= n || c >= n) continue;
    d += shiftMotif(tpl, c * CELL, r * CELL);
  }
  return d;
}

/** The full n × n cell ruling, in design units — the preview's graph paper. */
export function gridLines(n: number): string {
  const s = n * CELL;
  let d = '';
  for (let i = 1; i < n; i++) d += `M0 ${i * CELL}H${s}M${i * CELL} 0V${s}`;
  return d;
}

export function cellsToGrid(cells: Cells, n: number): boolean[][] {
  const grid: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));
  for (const key of cells) {
    const [r, c] = key.split(':').map(Number);
    if (r >= 0 && c >= 0 && r < n && c < n) grid[r][c] = true;
  }
  return grid;
}

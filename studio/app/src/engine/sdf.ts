/**
 * Signed distance field of a logo mask, computed on the CPU with an 8SSEDT
 * (dead-reckoning) two-pass transform. The studio's own engine uploads a packed
 * distance texture (R = coarse, G = fine) and every effect shader samples it
 * instead of the raw alpha, which is what keeps bevels and glows smooth at any
 * zoom. This is the same idea, one channel, float precision.
 */
export function buildSignedDistance(alpha: Uint8Array, width: number, height: number): Float32Array {
  const INF = 1e9;
  const n = width * height;

  const outside = new Float32Array(n * 2);
  const inside = new Float32Array(n * 2);

  for (let i = 0; i < n; i++) {
    const a = alpha[i] > 127;
    outside[i * 2] = a ? INF : 0;
    outside[i * 2 + 1] = a ? INF : 0;
    inside[i * 2] = a ? 0 : INF;
    inside[i * 2 + 1] = a ? 0 : INF;
  }

  const dist = (x: number, y: number) => Math.sqrt(x * x + y * y);

  function compare(grid: Float32Array, x: number, y: number, ox: number, oy: number, w: number, h: number) {
    const nx = x + ox;
    const ny = y + oy;
    if (nx < 0 || ny < 0 || nx >= w || ny >= h) return;
    const i = (y * w + x) * 2;
    const j = (ny * w + nx) * 2;
    const dx = grid[j] + ox;
    const dy = grid[j + 1] + oy;
    if (dist(dx, dy) < dist(grid[i], grid[i + 1])) {
      grid[i] = dx;
      grid[i + 1] = dy;
    }
  }

  function pass(grid: Float32Array, w: number, h: number) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        compare(grid, x, y, -1, 0, w, h);
        compare(grid, x, y, 0, -1, w, h);
        compare(grid, x, y, -1, -1, w, h);
        compare(grid, x, y, 1, -1, w, h);
      }
    }
    for (let y = h - 1; y >= 0; y--) {
      for (let x = w - 1; x >= 0; x--) {
        compare(grid, x, y, 1, 0, w, h);
        compare(grid, x, y, 0, 1, w, h);
        compare(grid, x, y, 1, 1, w, h);
        compare(grid, x, y, -1, 1, w, h);
      }
    }
  }

  pass(outside, width, height);
  pass(inside, width, height);

  const raw = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const dOut = dist(outside[i * 2], outside[i * 2 + 1]);
    const dIn = dist(inside[i * 2], inside[i * 2 + 1]);
    raw[i] = dOut - dIn; // positive inside
  }
  return blur(raw, width, height, 3);
}

/** Small separable box blur — kills the ridge artefacts an exact EDT leaves in gradients. */
function blur(field: Float32Array, width: number, height: number, radius: number): Float32Array {
  const tmp = new Float32Array(field.length);
  const out = new Float32Array(field.length);
  const k = radius * 2 + 1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let i = -radius; i <= radius; i++) {
        const xx = Math.min(width - 1, Math.max(0, x + i));
        sum += field[y * width + xx];
      }
      tmp[y * width + x] = sum / k;
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let i = -radius; i <= radius; i++) {
        const yy = Math.min(height - 1, Math.max(0, y + i));
        sum += tmp[yy * width + x];
      }
      out[y * width + x] = sum / k;
    }
  }
  return out;
}

/** Downsample the alpha channel of a canvas into a compact mask for SDF building. */
export function alphaFromCanvas(canvas: HTMLCanvasElement, size: number): Uint8Array {
  const tmp = document.createElement('canvas');
  tmp.width = size;
  tmp.height = size;
  const ctx = tmp.getContext('2d', { willReadFrequently: true })!;
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(canvas, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  const out = new Uint8Array(size * size);
  for (let i = 0; i < out.length; i++) out[i] = data[i * 4 + 3];
  return out;
}

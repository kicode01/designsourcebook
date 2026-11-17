import { buildFragment, EFFECT_FRAGS, POST_FRAG, VERT } from './shaders';
import { buildFlatFragment, DITHER, FLAT, GLITCH, HALFTONE, RELIEF } from './flat-shaders';
import { controlsFor } from '../data/effects';
import { buildSignedDistance, alphaFromCanvas } from './sdf';
import {
  createFramebuffer,
  createProgram,
  createQuad,
  createTexture,
  hexToRgb,
  setUniforms,
  type Framebuffer,
  type GLProgram,
} from './gl';

export interface FilterSetting {
  id: string;
  amount: number;
  enabled: boolean;
}

export interface RenderState {
  /** Catalogue entry, e.g. `paperCutout` or `extrude:physical`. */
  effectId: string;
  /** Shader selector, which several catalogue entries share. */
  effectKey: string;
  mode: number;
  params: Record<string, number | string | boolean>;
  colors: string[];
  filters: FilterSetting[];
  scale: number;
  rotate: number;
  offset: [number, number];
  background: 'transparent' | 'color';
  backgroundColor: string;
  animate: boolean;
  easing: string;
  speed: number;
  startTime: number;
  duration: number;
}

const SDF_SIZE = 512;
const LOGO_SIZE = 1024;
const FIT_PADDING = 0.78;
/** uDistanceRange used by the recovered shaders: distances are stored in texels. */
const DISTANCE_RANGE = 192;
/** Padding baked into the distance texture; the relief shader hardcodes it. */
const DISTANCE_PAD = 192;
const DISTANCE_SIZE = SDF_SIZE + DISTANCE_PAD * 2;

/**
 * Catalogue effects that are served by the recovered multi-mode `FLAT` shader.
 * The value is the `uMode` the original passes for that effect, derived from
 * the registry order in the target bundle (`Object.keys` of the effect table).
 */
const FLAT_MODES: Record<string, number> = {
  glass: 0,
  holo: 1,
  particles: 2,
  led: 3,
  pixelCartoon: 4,
  neon: 5,
  luminousGlass: 6,
  stripes: 7,
  sketch: 8,
};

/** Effects with their own recovered single-purpose shader. */
const DEDICATED: Record<string, string> = {
  halftone: 'halftone',
  dither: 'dither',
  glitch: 'glitch',
  paperCutout: 'relief',
  blindEmboss: 'relief',
  leatherStamp: 'relief',
  holoPrint: 'relief',
  satinEmbroidery: 'relief',
  waxSeal: 'relief',
};

/**
 * `uMode` for the relief shader, recovered verbatim from the target:
 * `{paperCutout:0, blindEmboss:1, leatherStamp:2, holoPrint:4,
 *   satinEmbroidery:5, waxSeal:6}`.
 */
const RELIEF_MODES: Record<string, number> = {
  paperCutout: 0,
  blindEmboss: 1,
  leatherStamp: 2,
  holoPrint: 4,
  satinEmbroidery: 5,
  waxSeal: 6,
};

/** Material index into the relief shader's finish branches. */
const RELIEF_MATERIAL = { matte: 0, leather: 1 };

/**
 * Colour uniforms that some shaders declare but the catalogue does not expose as
 * controls. Without a value they default to black, which renders the logo
 * invisible (appGlass and oilLens both multiply the artwork by `uLogoColor`).
 */
const UNIFORM_COLOR_DEFAULTS: Record<string, number[]> = {
  uLogoColor: [1, 1, 1],
};

function floatToHalf(value: number, target: Uint16Array, index: number): void {
  const f32 = new Float32Array(1);
  const i32 = new Int32Array(f32.buffer);
  f32[0] = value;
  const x = i32[0];
  const sign = (x >> 16) & 0x8000;
  let exp = (x >> 23) & 0xff;
  let mant = x & 0x7fffff;
  if (exp === 0xff) {
    target[index] = sign | 0x7c00 | (mant ? 0x200 : 0);
    return;
  }
  let e = exp - 127 + 15;
  if (e >= 0x1f) {
    target[index] = sign | 0x7c00;
    return;
  }
  if (e <= 0) {
    if (e < -10) {
      target[index] = sign;
      return;
    }
    mant = (mant | 0x800000) >> (1 - e);
    target[index] = sign | (mant >> 13);
    return;
  }
  target[index] = sign | (e << 10) | (mant >> 13);
}

/** sRGB transfer function, matching three.js colour management. */
function srgbToLinear(rgb: [number, number, number]): [number, number, number] {
  const f = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return [f(rgb[0]), f(rgb[1]), f(rgb[2])];
}

function ease(kind: string, t: number): number {  switch (kind) {
    case 'easeIn': return t * t;
    case 'easeOut': return 1 - (1 - t) * (1 - t);
    case 'easeInOut': return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    default: return t;
  }
}

const FILTER_UNIFORMS: Record<string, string> = {
  exposure: 'uExposure',
  contrast: 'uContrast',
  saturation: 'uSaturation',
  grayscale: 'uGrayscale',
  invert: 'uInvert',
  grain: 'uGrain',
  pixelate: 'uPixelate',
  blur: 'uBlur',
  chromatic: 'uChromatic',
  orderedDither: 'uDither',
  vignette: 'uVignette',
};

export class StudioRenderer {
  private gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private quad: WebGLVertexArrayObject;
  private effectFbo: Framebuffer;
  private postFbo: Framebuffer;
  private logoTex: WebGLTexture | null = null;
  private sdfTex: WebGLTexture | null = null;
  private atlasTex: WebGLTexture | null = null;
  private distTex: WebGLTexture | null = null;
  private blurWideTex: WebGLTexture | null = null;
  private blurNarrowTex: WebGLTexture | null = null;
  private programs = new Map<string, GLProgram>();
  private postProgram: GLProgram | null = null;
  /** Where the post pass lands. `null` means the visible canvas. */
  private postTarget: Framebuffer | null = null;
  private logoCanvas: HTMLCanvasElement;
  private hasLogo = false;
  private size = 1024;
  private disposed = false;

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    if (!gl) throw new Error('WebGL2 is not available in this browser.');
    this.gl = gl;
    this.canvas = canvas;
    this.quad = createQuad(gl);
    this.effectFbo = createFramebuffer(gl, this.size, this.size);
    this.postFbo = createFramebuffer(gl, this.size, this.size);
    this.logoCanvas = document.createElement('canvas');
    this.logoCanvas.width = LOGO_SIZE;
    this.logoCanvas.height = LOGO_SIZE;
    this.atlasTex = this.buildAtlas();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (this.disposed) return;
        if (this.atlasTex) this.gl.deleteTexture(this.atlasTex);
        this.atlasTex = this.buildAtlas();
      });
    }
    (window as unknown as { __renderer?: StudioRenderer }).__renderer = this;
    this.postProgram = createProgram(gl, VERT, POST_FRAG);
  }

  private buildAtlas(): WebGLTexture {
    const gl = this.gl;
    const chars = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];
    const cell = 64;
    const c = document.createElement('canvas');
    c.width = cell * chars.length;
    c.height = cell;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#fff';
    ctx.font = `600 ${Math.round(cell * 0.86)}px "Allo", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    chars.forEach((ch, i) => ctx.fillText(ch, i * cell + cell / 2, cell / 2 + 2));
    const tex = createTexture(gl, { width: c.width, height: c.height });
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    return tex;
  }

  setLogo(source: CanvasImageSource & { width: number; height: number }, flip = false): void {
    const gl = this.gl;
    const ctx = this.logoCanvas.getContext('2d', { willReadFrequently: true })!;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, LOGO_SIZE, LOGO_SIZE);

    const box = LOGO_SIZE * FIT_PADDING;
    const sw = source.width || 1;
    const sh = source.height || 1;
    const ratio = Math.min(box / sw, box / sh);
    const w = sw * ratio;
    const h = sh * ratio;
    if (flip) {
      ctx.translate(LOGO_SIZE, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(source, (LOGO_SIZE - w) / 2, (LOGO_SIZE - h) / 2, w, h);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (!this.logoTex) {
      this.logoTex = createTexture(gl, { width: LOGO_SIZE, height: LOGO_SIZE });
    }
    gl.bindTexture(gl.TEXTURE_2D, this.logoTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.logoCanvas);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);

    const alpha = alphaFromCanvas(this.logoCanvas, SDF_SIZE);
    const field = buildSignedDistance(alpha, SDF_SIZE, SDF_SIZE);
    const half = new Uint16Array(field.length);
    for (let i = 0; i < field.length; i++) {
      // normalise to stage units, keep a little headroom for far-outside values
      floatToHalf(Math.max(-1, Math.min(1, field[i] / SDF_SIZE)), half, i);
    }
    if (!this.sdfTex) {
      this.sdfTex = createTexture(gl, {
        width: SDF_SIZE,
        height: SDF_SIZE,
        internalFormat: gl.R16F,
        format: gl.RED,
        type: gl.HALF_FLOAT,
      });
    }
    gl.bindTexture(gl.TEXTURE_2D, this.sdfTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R16F, SDF_SIZE, SDF_SIZE, 0, gl.RED, gl.HALF_FLOAT, half);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);

    // The recovered flat shader samples a packed distance texture and two
    // pre-blurred coverage textures rather than the raw mask, which is what
    // gives its frosted-glass mode a continuous falloff.
    this.distTex = this.buildPackedDistance(field);
    this.blurWideTex = this.buildCoverageBlur(alpha, 11);
    this.blurNarrowTex = this.buildCoverageBlur(alpha, 3);
    this.hasLogo = true;
  }

  /**
   * Pack a signed distance field into RG8 the way the original does:
   * `(r + g/255) * 2 - 1` scaled by uDistanceRange. Distances stay in texels so
   * the shader can rescale them to design pixels at any output size.
   *
   * The field is padded by DISTANCE_PAD on every side because the recovered
   * relief shader samples with that pad baked into its lookup. Padded texels
   * extrapolate the nearest edge value, which keeps the field continuous
   * across the content border.
   */
  private buildPackedDistance(field: Float32Array): WebGLTexture {
    const gl = this.gl;
    const data = new Uint8Array(DISTANCE_SIZE * DISTANCE_SIZE * 2);

    for (let y = 0; y < DISTANCE_SIZE; y++) {
      for (let x = 0; x < DISTANCE_SIZE; x++) {
        // nearest content texel, and how far we had to travel to reach it
        const cx = Math.min(SDF_SIZE - 1, Math.max(0, x - DISTANCE_PAD));
        const cy = Math.min(SDF_SIZE - 1, Math.max(0, y - DISTANCE_PAD));
        const dx = x - DISTANCE_PAD - cx;
        const dy = y - DISTANCE_PAD - cy;
        const travel = Math.sqrt(dx * dx + dy * dy);
        // The recovered shaders use the standard SDF convention (negative
        // inside), while the local field is positive inside — so it is negated
        // here rather than flipping every shader.
        const d = -(field[cy * SDF_SIZE + cx] - travel);

        const n = Math.max(0, Math.min(1, d / (DISTANCE_RANGE * 2) + 0.5));
        const scaled = n * 255;
        const coarse = Math.floor(scaled);
        const i = (y * DISTANCE_SIZE + x) * 2;
        data[i] = coarse;
        data[i + 1] = Math.round((scaled - coarse) * 255);
      }
    }

    if (!this.distTex) {
      this.distTex = createTexture(gl, {
        width: DISTANCE_SIZE,
        height: DISTANCE_SIZE,
        internalFormat: gl.RG8,
        format: gl.RG,
      });
    }
    gl.bindTexture(gl.TEXTURE_2D, this.distTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RG8, DISTANCE_SIZE, DISTANCE_SIZE, 0, gl.RG, gl.UNSIGNED_BYTE, data,
    );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    return this.distTex;
  }

  /** Box-blurred copy of the logo coverage, uploaded as a single channel. */
  private buildCoverageBlur(alpha: Uint8Array, radius: number): WebGLTexture {
    const gl = this.gl;
    const src = new Float32Array(alpha.length);
    for (let i = 0; i < alpha.length; i++) src[i] = alpha[i] / 255;
    const tmp = new Float32Array(src.length);
    const pass = (from: Float32Array, to: Float32Array, horizontal: boolean) => {
      const span = radius * 2 + 1;
      for (let y = 0; y < SDF_SIZE; y++) {
        for (let x = 0; x < SDF_SIZE; x++) {
          let sum = 0;
          for (let k = -radius; k <= radius; k++) {
            const sx = horizontal ? Math.min(SDF_SIZE - 1, Math.max(0, x + k)) : x;
            const sy = horizontal ? y : Math.min(SDF_SIZE - 1, Math.max(0, y + k));
            sum += from[sy * SDF_SIZE + sx];
          }
          to[y * SDF_SIZE + x] = sum / span;
        }
      }
    };
    pass(src, tmp, true);
    pass(tmp, src, false);
    const data = new Uint8Array(src.length);
    for (let i = 0; i < src.length; i++) data[i] = Math.round(Math.max(0, Math.min(1, src[i])) * 255);
    const tex = createTexture(gl, {
      width: SDF_SIZE,
      height: SDF_SIZE,
      internalFormat: gl.R8,
      format: gl.RED,
    });
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, SDF_SIZE, SDF_SIZE, 0, gl.RED, gl.UNSIGNED_BYTE, data);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    return tex;
  }

  clearLogo(): void {
    this.hasLogo = false;
    const ctx = this.logoCanvas.getContext('2d')!;
    ctx.clearRect(0, 0, LOGO_SIZE, LOGO_SIZE);
  }

  get logoLoaded(): boolean {
    return this.hasLogo;
  }

  private programFor(id: string, shaderKey: string): GLProgram {
    const source = this.shaderFor(id, shaderKey);
    if (!source) throw new Error(`Unknown effect shader: ${id}`);
    const cacheKey = source.cacheKey;
    const cached = this.programs.get(cacheKey);
    if (cached) return cached;
    const frag = source.flat ? buildFlatFragment(source.body) : buildFragment(source.body);
    const prog = createProgram(this.gl, VERT, frag);
    this.programs.set(cacheKey, prog);
    return prog;
  }

  /**
   * Resolve a catalogue entry to the shader that serves it. Recovered shaders
   * are keyed by effect id; the hand-written ones are keyed by the shared
   * shader selector, so both are tried.
   */
  private shaderFor(
    id: string,
    shaderKey: string,
  ): { body: string; flat: boolean; cacheKey: string } | null {
    const dedicated = DEDICATED[id];
    if (dedicated === 'halftone') return { body: HALFTONE, flat: true, cacheKey: 'flat:halftone' };
    if (dedicated === 'dither') return { body: DITHER, flat: true, cacheKey: 'flat:dither' };
    if (dedicated === 'glitch') return { body: GLITCH, flat: true, cacheKey: 'flat:glitch' };
    if (dedicated === 'relief') return { body: RELIEF, flat: true, cacheKey: 'flat:relief' };
    if (id in FLAT_MODES) return { body: FLAT, flat: true, cacheKey: 'flat:multi' };
    const body = EFFECT_FRAGS[shaderKey] ?? EFFECT_FRAGS[id];
    return body ? { body, flat: false, cacheKey: `legacy:${shaderKey}` } : null;
  }

  private paramUniforms(state: RenderState): Record<string, number | number[] | boolean | undefined> {
    const values: Record<string, number | number[] | boolean | undefined> = {
      ...UNIFORM_COLOR_DEFAULTS,
    };
    for (const [key, value] of Object.entries(state.params)) {
      // `scale` is the design-level logo scale; it maps to uScale, not a param uniform
      if (key === 'scale') continue;
      if (typeof value === 'number') {
        values[`u${key[0].toUpperCase()}${key.slice(1)}`] = value;
      } else if (typeof value === 'boolean') {
        values[`u${key[0].toUpperCase()}${key.slice(1)}`] = value ? 1 : 0;
      } else if (typeof value === 'string' && value.startsWith('#')) {
        values[`u${key[0].toUpperCase()}${key.slice(1)}`] = hexToRgb(value);
      }
    }
    const names = ['uColorA', 'uColorB', 'uColorC', 'uColorD', 'uColorE'];
    state.colors.forEach((hex, i) => {
      if (names[i]) values[names[i]] = hexToRgb(hex);
    });
    return values;
  }

  /**
   * Uniform block for the recovered shaders.
   *
   * The original does not expose named uniforms per effect: it flattens the
   * effect's numeric parameters into an array and uploads it as three `vec4`s,
   * so control order in the effect table *is* the ABI. Colours travel
   * separately as uColorA/B/C.
   *
   * Those colours are linear in the target (three.js converts on assignment).
   * Modes 6-8 encode to sRGB themselves; modes 0-5 expect the renderer to do
   * it, which the post pass handles via uEncode.
   */
  private flatUniforms(
    state: RenderState,
    elapsed: number,
  ): Record<string, number | number[] | boolean | undefined> {
    const key = state.effectId ?? state.effectKey;
    const mode = FLAT_MODES[key];
    const isFlat = mode !== undefined;
    const dedicated = DEDICATED[key];
    if (!isFlat && !dedicated) return {};

    const shared: Record<string, number | number[] | boolean | undefined> = {
      uTime: elapsed,
      uResolution: [this.size, this.size],
      uDistanceLayout: [DISTANCE_SIZE, DISTANCE_SIZE, SDF_SIZE, SDF_SIZE],
      uDistancePad: DISTANCE_PAD,
      uDistanceRange: DISTANCE_RANGE,
    };

    if (dedicated === 'relief') return { ...shared, ...this.reliefUniforms(state) };

    const values: number[] = [];
    for (const control of controlsFor(key)) {
      if (typeof control.default !== 'number') continue;
      const value = state.params[control.key];
      values.push(typeof value === 'number' ? value : control.default);
    }
    const block = (offset: number) => [0, 1, 2, 3].map((i) => values[offset + i] ?? 0);

    const scale = Math.max(state.scale, 0.02);
    const out: Record<string, number | number[] | boolean | undefined> = {
      ...shared,
      uMode: isFlat ? mode : state.mode,
      uParams0: block(0),
      uParams1: block(4),
      uParams2: block(8),
      uLogoAspect: 1,
      // The stage maps 1:1 onto the logo texture, so "logo pixels" are just
      // stage pixels divided by the current stage scale.
      uPixelLogoSize: [this.size * scale, this.size * scale],
      uOverscan: [1, 1],
    };

    if (isFlat) {
      const linear = state.colors.map((hex) => srgbToLinear(hexToRgb(hex)));
      out.uColorA = linear[0] ?? [1, 1, 1];
      out.uColorB = linear[1] ?? [1, 1, 1];
      out.uColorC = linear[2] ?? [1, 1, 1];
      out.uEncode = (mode ?? 0) <= 5 ? 1 : 0;
    } else {
      // Halftone and dither take a single ink colour; glitch uses A/B for the
      // split channels. They write display values directly.
      const ink = state.params.inkColor;
      const rgb = typeof ink === 'string' && ink.startsWith('#') ? hexToRgb(ink) : [1, 1, 1];
      out.uInk = rgb;
      out.uColorA = hexToRgb(state.colors[0] ?? '#ffffff');
      out.uColorB = hexToRgb(state.colors[1] ?? '#ffffff');
      out.uColorC = hexToRgb(state.colors[2] ?? '#ffffff');
      out.uEncode = 0;
    }
    return out;
  }

  /**
   * Uniform block for the recovered relief/mockup shader.
   *
   * Its parameter names line up with the mockup controls one-for-one, which is
   * why the port is mostly pass-through. Angles arrive in degrees and are
   * converted here, as the original does.
   */
  private reliefUniforms(state: RenderState): Record<string, number | number[] | boolean | undefined> {
    const p = state.params;
    const num = (k: string, fallback: number) =>
      typeof p[k] === 'number' ? (p[k] as number) : fallback;
    const rad = (k: string, fallback: number) => (num(k, fallback) * Math.PI) / 180;

    // Palettes are [surface, logo, accent]; the target uploads them as sRGB.
    const pal = state.colors.map(hexToRgb);
    const key = state.effectId ?? state.effectKey;

    return {
      uMode: RELIEF_MODES[key] ?? 0,
      // The relief shader names the layout uniform `uLayout` (not
      // uDistanceLayout) and bakes the pad into its lookup.
      uLayout: [DISTANCE_SIZE, DISTANCE_SIZE, SDF_SIZE, SDF_SIZE],
      uSurface: pal[0] ?? [1, 1, 1],
      uLogo: pal[1] ?? [1, 1, 1],
      uAccent: pal[2] ?? [1, 1, 1],
      uTransparentBackground: 0,
      uLogoAspect: [1, 1],
      uSize: num('logoSize', 0.7) * Math.max(state.scale, 0.02),
      uDepth: num('depth', 0.6),
      uBevel: num('bevel', 6),
      uLightAngle: rad('lightAngle', 135),
      uLightStrength: num('lightStrength', 1),
      uReliefMaterial: key === 'leatherStamp' ? RELIEF_MATERIAL.leather : RELIEF_MATERIAL.matte,
      // "Emboss" is raised; cut-out and stamps are recessed.
      uReliefSign: key === 'blindEmboss' ? 1 : -1,
      uTexture: num('texture', 0.5),
      uTextureScale: num('textureScale', 1),
      uShadow: num('shadow', 0.4),
      uRotation: rad('rotation', 0),
      uThreadAngle: rad('threadAngle', 30),
      uStitchLength: num('stitchLength', 9),
      uIrregularity: num('irregularity', 0.4),
      uFoilScale: num('foilScale', 0.5),
      uEncode: 0,
    };
  }

  render(state: RenderState, timeSeconds: number): void {
    const gl = this.gl;
    const source = this.shaderFor(state.effectId ?? state.effectKey, state.effectKey);
    const prog = this.programFor(state.effectId ?? state.effectKey, state.effectKey);

    // One clock drives everything: `speed` scales it, `startTime` offsets it and
    // the Animate toggle freezes it at that offset, so Start Time doubles as a
    // scrubber while animation is off. `uTime` stays linear (an eased clock
    // would stutter at the loop point); `uProgress` is the eased 0..1 cycle that
    // `duration` and `easing` shape.
    const cycle = Math.max(state.duration, 0.05);
    const elapsed = state.animate ? timeSeconds * state.speed + state.startTime : state.startTime;
    const raw = (((elapsed % cycle) + cycle) % cycle) / cycle;
    const progress = ease(state.easing, Math.min(Math.max(raw, 0), 1));
    const flat = this.flatUniforms(state, elapsed);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.effectFbo.fbo);
    gl.viewport(0, 0, this.size, this.size);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(prog.program);
    gl.bindVertexArray(this.quad);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.logoTex);
    // The relief shader reuses the name `uLogo` for a vec3 palette entry, so
    // the sampler binding has to be skipped for that program.
    if (source?.cacheKey !== 'flat:relief') {
      gl.uniform1i(prog.uniforms.get('uLogo') ?? null, 0);
    }
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.sdfTex);
    gl.uniform1i(prog.uniforms.get('uSdf') ?? null, 1);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.atlasTex);
    gl.uniform1i(prog.uniforms.get('uAtlas') ?? null, 2);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, this.distTex);
    gl.uniform1i(prog.uniforms.get('uDistance') ?? null, 3);
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, this.blurWideTex);
    gl.uniform1i(prog.uniforms.get('uBlurWide') ?? null, 4);
    gl.activeTexture(gl.TEXTURE5);
    gl.bindTexture(gl.TEXTURE_2D, this.blurNarrowTex);
    gl.uniform1i(prog.uniforms.get('uBlurNarrow') ?? null, 5);

    setUniforms(gl, prog, {
      uResolution: [this.size, this.size],
      uAspect: 1,
      uSdfRange: 1,
      uTime: elapsed,
      uProgress: progress,
      uScale: state.scale,
      uRotate: (state.rotate * Math.PI) / 180,
      uOffset: [state.offset[0], state.offset[1]],
      uMode: state.mode,
      ...this.paramUniforms(state),
      ...flat,
    });

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);

    // ---- filter stack ----
    const filters: Record<string, number> = {
      uExposure: 0,
      uContrast: 1,
      uSaturation: 1,
      uGrayscale: 0,
      uInvert: 0,
      uGrain: 0,
      uPixelate: 1,
      uBlur: 0,
      uChromatic: 0,
      uDither: 0,
      uVignette: 0,
    };
    for (const f of state.filters) {
      if (!f.enabled) continue;
      const uniform = FILTER_UNIFORMS[f.id];
      if (uniform) filters[uniform] = f.amount;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.postTarget ? this.postTarget.fbo : null);
    gl.viewport(0, 0, this.size, this.size);
    const bg = state.background === 'color' ? hexToRgb(state.backgroundColor) : [0, 0, 0];
    gl.clearColor(bg[0], bg[1], bg[2], state.background === 'color' ? 1 : 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(this.postProgram!.program);
    gl.bindVertexArray(this.quad);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.effectFbo.tex);
    gl.uniform1i(this.postProgram!.uniforms.get('uSource') ?? null, 0);
    setUniforms(gl, this.postProgram!, {
      uResolution: [this.size, this.size],
      uScale: 1,
      uRotate: 0,
      uOffset: [0, 0],
      uEncode: (flat.uEncode as number) ?? 0,
      ...filters,
    });
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
    gl.disable(gl.BLEND);
  }

  /**
   * Render one effect offscreen and return it as a PNG data URL, for the effect
   * picker's thumbnails.
   *
   * This deliberately never touches the visible canvas: the picker asks for
   * forty of these while the preview is animating, and going through
   * `snapshot()` would resize and repaint the canvas once per thumbnail.
   */
  thumbnail(state: RenderState, timeSeconds: number, size = 512, output = 64): string {
    const gl = this.gl;
    const prevSize = this.size;
    const prevEffect = this.effectFbo;
    const prevPost = this.postTarget;

    const effect = createFramebuffer(gl, size, size);
    const post = createFramebuffer(gl, size, size);
    this.size = size;
    this.effectFbo = effect;
    this.postTarget = post;

    try {
      this.render(state, timeSeconds);
      const pixels = new Uint8Array(size * size * 4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, post.fbo);
      gl.readPixels(0, 0, size, size, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

      const out = document.createElement('canvas');
      out.width = size;
      out.height = size;
      const ctx = out.getContext('2d')!;
      const tmp = document.createElement('canvas');
      tmp.width = size;
      tmp.height = size;
      tmp.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(pixels), size, size), 0, 0);
      // WebGL origin is bottom-left
      ctx.translate(0, size);
      ctx.scale(1, -1);
      ctx.drawImage(tmp, 0, 0);

      // Downscale here rather than leaving a 512 px image in the DOM: several
      // effects express stroke width in uv units, so they only read at a large
      // render size — the average is what makes a 1 px line survive at 28 px.
      const small = document.createElement('canvas');
      small.width = output;
      small.height = output;
      const sctx = small.getContext('2d')!;
      sctx.imageSmoothingEnabled = true;
      sctx.imageSmoothingQuality = 'high';
      sctx.drawImage(out, 0, 0, output, output);

      // WebP keeps the grainy effects (paper, noise) from bloating the list;
      // browsers without an encoder silently fall back to PNG.
      return small.toDataURL('image/webp', 0.92);
    } finally {
      this.size = prevSize;
      this.effectFbo = prevEffect;
      this.postTarget = prevPost;
      gl.deleteFramebuffer(effect.fbo);
      gl.deleteTexture(effect.tex);
      gl.deleteFramebuffer(post.fbo);
      gl.deleteTexture(post.tex);
    }
  }

  /** Render one frame offscreen at an arbitrary resolution and return a PNG blob. */
  async snapshot(state: RenderState, timeSeconds: number, width: number, height: number): Promise<Blob> {
    const gl = this.gl;
    const prevEffect = this.effectFbo;
    const prevPost = this.postFbo;
    const prevPostTarget = this.postTarget;
    const prevSize = this.size;

    const size = Math.max(width, height);
    const exportEffect = createFramebuffer(gl, size, size);
    const exportPost = createFramebuffer(gl, size, size);

    this.effectFbo = exportEffect;
    this.postFbo = exportPost;
    this.postTarget = exportPost;
    this.size = size;

    try {
      this.render(state, timeSeconds);

      const pixels = new Uint8Array(size * size * 4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, exportPost.fbo);
      gl.readPixels(0, 0, size, size, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

      const out = document.createElement('canvas');
      out.width = width;
      out.height = height;
      const ctx = out.getContext('2d')!;
      const img = new ImageData(new Uint8ClampedArray(pixels), size, size);
      const tmp = document.createElement('canvas');
      tmp.width = size;
      tmp.height = size;
      tmp.getContext('2d')!.putImageData(img, 0, 0);
      ctx.translate(0, height);
      ctx.scale(1, -1);
      ctx.drawImage(tmp, (width - size) / 2, (height - size) / 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      return await new Promise<Blob>((resolve) => out.toBlob((b) => resolve(b!), 'image/png'));
    } finally {
      this.size = prevSize;
      this.effectFbo = prevEffect;
      this.postFbo = prevPost;
      this.postTarget = prevPostTarget;
      gl.deleteFramebuffer(exportEffect.fbo);
      gl.deleteTexture(exportEffect.tex);
      gl.deleteFramebuffer(exportPost.fbo);
      gl.deleteTexture(exportPost.tex);
    }
  }

  get debugLogoCanvas(): HTMLCanvasElement {
    return this.logoCanvas;
  }

  get rawCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  dispose(): void {
    this.disposed = true;
    const gl = this.gl;
    this.programs.forEach((p) => gl.deleteProgram(p.program));
    this.programs.clear();
    if (this.postProgram) gl.deleteProgram(this.postProgram.program);
    [this.effectFbo, this.postFbo].forEach((fb) => {
      gl.deleteFramebuffer(fb.fbo);
      gl.deleteTexture(fb.tex);
    });
    if (this.logoTex) gl.deleteTexture(this.logoTex);
    if (this.sdfTex) gl.deleteTexture(this.sdfTex);
    if (this.atlasTex) gl.deleteTexture(this.atlasTex);
    gl.deleteVertexArray(this.quad);
  }
}

import { paintSocialOverlay } from '../SocialOverlay';
import type { AnimationState, FilterState, Transform } from '../../state/studio';

export type MotionPresetId =
  | 'shader-only'
  | 'float-3d'
  | 'turntable-y'
  | 'spin-z'
  | 'heartbeat'
  | 'pendulum'
  | 'kinetic-intro'
  | 'glitch-jolt'
  | 'hover-orbit'
  | 'flip-coin';

export type LoopMode = 'loop' | 'pingpong' | 'once';
export type StageBackdropMode = 'transparent' | 'color' | 'spotlight' | 'grid' | 'aura';
export type StageAspectMode = '1:1' | '16:9' | '9:16';

export interface MotionTransformDelta {
  scaleMult: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  x: number;
  y: number;
  z: number;
}

export interface MotionPresetDef {
  id: MotionPresetId;
  label: string;
  shortLabel: string;
  description: string;
}

export const MOTION_PRESETS: MotionPresetDef[] = [
  {
    id: 'float-3d',
    label: '3D Gyro Float',
    shortLabel: '3D Float',
    description: 'Smooth figure-8 3D perspective tilt with harmonic vertical levitation',
  },
  {
    id: 'turntable-y',
    label: '360° Y-Turntable',
    shortLabel: 'Turntable',
    description: 'Continuous 3D horizontal showcase rotation with subtle X-axis nod',
  },
  {
    id: 'heartbeat',
    label: 'Harmonic Pulse',
    shortLabel: 'Pulse',
    description: 'Rhythmic scale & Z-depth breathing synchronized with shader energy',
  },
  {
    id: 'spin-z',
    label: '360° Z-Orbital Spin',
    shortLabel: 'Z-Spin',
    description: 'Full 360° planar emblem rotation with subtle depth oscillation',
  },
  {
    id: 'pendulum',
    label: 'Isometric Pendulum',
    shortLabel: 'Pendulum',
    description: 'Architectural cradle swing combining Z rotation and 3D pitch',
  },
  {
    id: 'kinetic-intro',
    label: 'Kinetic Pop-In Reveal',
    shortLabel: 'Pop-In',
    description: 'Elastic spring entrance from 0% scale with 3D spin-in and hold',
  },
  {
    id: 'hover-orbit',
    label: 'Magnetic Orbit',
    shortLabel: 'Orbit',
    description: 'Circular X/Y levitation path with counter-tilting 3D normal',
  },
  {
    id: 'flip-coin',
    label: 'Coin Toss 3D Flip',
    shortLabel: 'Coin Flip',
    description: 'Snappy diagonal 360° medallion flip with hero face pause',
  },
  {
    id: 'glitch-jolt',
    label: 'Cybernetic Micro-Jolt',
    shortLabel: 'Cyber Jolt',
    description: 'High-frequency broadcast tremor with rhythmic scale snaps',
  },
  {
    id: 'shader-only',
    label: 'Shader Flow Only',
    shortLabel: 'Shader Only',
    description: 'Locks 3D transform while running internal shader flow',
  },
];

export const EXTENDED_EASINGS: { id: string; label: string }[] = [
  { id: 'linear', label: 'Linear (Constant)' },
  { id: 'easeInOut', label: 'Ease In Out (Smooth)' },
  { id: 'easeOut', label: 'Ease Out (Decelerate)' },
  { id: 'easeIn', label: 'Ease In (Accelerate)' },
  { id: 'spring', label: 'Spring Overshoot' },
  { id: 'elastic', label: 'Elastic Bounce' },
  { id: 'expo', label: 'Expo Snap' },
  { id: 'cubic', label: 'Cubic Cinematic' },
  { id: 'sine', label: 'Sine Breath' },
  { id: 'steps8', label: 'Step Quantized (8f)' },
];

export function evaluateEasing(kind: string, rawT: number): number {
  const t = Math.min(1, Math.max(0, rawT));
  switch (kind) {
    case 'easeIn':
      return t * t;
    case 'easeOut':
      return 1 - (1 - t) * (1 - t);
    case 'easeInOut':
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    case 'cubic':
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    case 'expo':
      if (t === 0 || t === 1) return t;
      return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
    case 'sine':
      return -(Math.cos(Math.PI * t) - 1) / 2;
    case 'spring': {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return Math.min(1.12, Math.max(0, 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)));
    }
    case 'elastic': {
      if (t === 0 || t === 1) return t;
      const c4 = (2 * Math.PI) / 3;
      return Math.min(1.15, Math.max(0, Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1));
    }
    case 'steps8':
      return Math.floor(t * 8) / 8;
    default:
      return t;
  }
}

/**
 * Computes normalized cycle progress (0..1) and periodic shader time
 * so every loop cycle joins seamlessly at t=0 and t=duration.
 */
export function computeAnimationTiming(
  anim: AnimationState,
  timeSeconds: number,
): { rawCycle: number; progress: number; shaderTime: number } {
  const cycle = Math.max(anim.duration, 0.2);
  const loopMode: LoopMode = anim.loopMode ?? 'loop';
  const elapsed = anim.animate ? timeSeconds * anim.speed + anim.startTime : anim.startTime;

  let rawCycle = 0;
  if (loopMode === 'once') {
    rawCycle = Math.min(1, Math.max(0, elapsed / cycle));
  } else if (loopMode === 'pingpong') {
    const doubleCycle = (((elapsed % (cycle * 2)) + cycle * 2) % (cycle * 2)) / cycle;
    rawCycle = doubleCycle <= 1 ? doubleCycle : 2 - doubleCycle;
  } else {
    rawCycle = (((elapsed % cycle) + cycle) % cycle) / cycle;
  }

  const progress = evaluateEasing(anim.easing, rawCycle);
  // 2π radians per cycle ensures every sin(uTime * k) in GLSL loops seamlessly!
  const shaderTime = progress * Math.PI * 2;
  return { rawCycle, progress, shaderTime };
}

/**
 * Computes the choreographed 3D/2D transform at the given cycle progress (0..1).
 */
export function computeChoreographedTransform(
  base: Transform,
  anim: AnimationState,
  progress: number,
  pointerTilt: { rx: number; ry: number } = { rx: 0, ry: 0 },
): Transform {
  const preset: MotionPresetId = anim.motionPreset ?? 'float-3d';
  const intensity = (anim.motionIntensity ?? 100) / 100;
  const tau = Math.PI * 2;
  const phase = progress * tau;

  let dScale = 1;
  let dRx = 0;
  let dRy = 0;
  let dRz = 0;
  let dX = 0;
  let dY = 0;
  let dZ = 0;

  if (anim.animate || anim.startTime > 0) {
    switch (preset) {
      case 'float-3d':
        dRx = Math.sin(phase) * 16 * intensity;
        dRy = Math.cos(phase) * 22 * intensity;
        dRz = Math.sin(phase * 2) * 4 * intensity;
        dY = Math.sin(phase) * 0.035 * intensity;
        dScale = 1 + Math.sin(phase * 2) * 0.04 * intensity;
        break;

      case 'turntable-y':
        dRy = Math.sin(phase) * 42 * intensity;
        dRx = Math.cos(phase) * 12 * intensity;
        dScale = 1 + Math.sin(phase) * 0.05 * intensity;
        break;

      case 'spin-z':
        dRz = (progress * 360) * Math.min(1, intensity);
        dScale = 1 + Math.sin(phase) * 0.06 * intensity;
        break;

      case 'heartbeat': {
        const beat = Math.pow(Math.max(0, Math.sin(phase)), 3) + 0.45 * Math.pow(Math.max(0, Math.sin(phase * 2 + 0.6)), 5);
        dScale = 1 + beat * 0.16 * intensity;
        dZ = beat * 0.18 * intensity;
        dRx = Math.sin(phase) * 6 * intensity;
        break;
      }

      case 'pendulum':
        dRz = Math.sin(phase) * 24 * intensity;
        dRx = Math.cos(phase) * 14 * intensity;
        dRy = Math.sin(phase) * 12 * intensity;
        break;

      case 'kinetic-intro': {
        // First 45% of cycle springs in from 0.25 -> 1.0, holds hero pose, then softly breathes
        const tIn = Math.min(1, progress / 0.45);
        const spring = 1 - Math.pow(1 - tIn, 3) * Math.cos(tIn * Math.PI * 2.5);
        dScale = Math.max(0.15, 0.2 + 0.8 * spring);
        dRy = (1 - tIn) * -55 * intensity + Math.sin(phase) * 6 * intensity;
        dRx = (1 - tIn) * 28 * intensity + Math.cos(phase) * 5 * intensity;
        dRz = (1 - tIn) * -18 * intensity;
        break;
      }

      case 'hover-orbit':
        dX = Math.cos(phase) * 0.055 * intensity;
        dY = Math.sin(phase) * 0.055 * intensity;
        dRy = -Math.cos(phase) * 20 * intensity;
        dRx = Math.sin(phase) * 20 * intensity;
        break;

      case 'flip-coin': {
        // Smooth eased flip wave
        const flipWave = Math.sin(phase);
        dRy = flipWave * 52 * intensity;
        dRx = Math.sin(phase * 2) * 18 * intensity;
        dRz = Math.cos(phase) * 8 * intensity;
        dScale = 1 + Math.abs(flipWave) * 0.08 * intensity;
        break;
      }

      case 'glitch-jolt': {
        const step = Math.floor(progress * 24);
        const burst = Math.sin(step * 12.9898) > 0.45 ? 1 : 0.15;
        dX = Math.sin(step * 78.233) * 0.04 * intensity * burst;
        dY = Math.cos(step * 39.11) * 0.025 * intensity * burst;
        dRz = Math.sin(step * 19.7) * 7 * intensity * burst;
        dScale = 1 + (burst > 0.5 ? 0.06 * intensity : 0);
        break;
      }

      case 'shader-only':
      default:
        break;
    }
  }

  return {
    scale: Math.max(10, Math.min(250, base.scale * dScale)),
    rotateX: base.rotateX + dRx + pointerTilt.rx,
    rotateY: base.rotateY + dRy + pointerTilt.ry,
    rotateZ: base.rotateZ + dRz,
    x: base.x + dX,
    y: base.y + dY,
    z: base.z + dZ,
  };
}

export const CAMERA_RIG_PRESETS: {
  id: string;
  label: string;
  patch: Partial<Transform>;
}[] = [
  { id: 'front', label: 'Front 0°', patch: { rotateX: 0, rotateY: 0, rotateZ: 0, x: 0, y: 0, z: 0, scale: 100 } },
  { id: 'iso-left', label: 'Iso Left', patch: { rotateX: 18, rotateY: -26, rotateZ: -4, scale: 102 } },
  { id: 'iso-right', label: 'Iso Right', patch: { rotateX: 18, rotateY: 26, rotateZ: 4, scale: 102 } },
  { id: 'hero-low', label: 'Hero Low', patch: { rotateX: 28, rotateY: -14, rotateZ: 0, scale: 108 } },
  { id: 'top-card', label: 'Top Card', patch: { rotateX: 36, rotateY: 0, rotateZ: 0, scale: 104 } },
];

export const FILTER_MASTER_PRESETS: {
  id: string;
  label: string;
  filters: Record<string, number>;
}[] = [
  { id: 'clean', label: 'Clean Master', filters: {} },
  {
    id: 'cinema-grain',
    label: '35mm Film',
    filters: { exposure: 0.15, contrast: 1.18, saturation: 1.15, grain: 0.18, vignette: 0.35 },
  },
  {
    id: 'cyber-rgb',
    label: 'Cyber Chromatic',
    filters: { contrast: 1.32, saturation: 1.45, chromatic: 6.5, vignette: 0.42 },
  },
  {
    id: 'crt-analog',
    label: 'CRT Broadcast',
    filters: { exposure: 0.2, contrast: 1.28, pixelate: 4, chromatic: 4.5, grain: 0.15, vignette: 0.5 },
  },
  {
    id: 'dither-1bit',
    label: 'Bayer Dither',
    filters: { contrast: 1.45, grayscale: 1, orderedDither: 4 },
  },
  {
    id: 'dream-halo',
    label: 'Soft Dream',
    filters: { exposure: 0.25, contrast: 1.08, saturation: 1.3, blur: 1.4, chromatic: 2.5 },
  },
];

export interface StudioFxShowcase {
  id: string;
  label: string;
  subtitle: string;
  effectId: string;
  colors?: string[];
  motionPreset: MotionPresetId;
  motionIntensity: number;
  easing: string;
  duration: number;
  backdrop: StageBackdropMode;
  backgroundColor: string;
  filterPresetId: string;
}

export const STUDIO_FX_SHOWCASES: StudioFxShowcase[] = [
  {
    id: 'chrome-gyro',
    label: 'Liquid Chrome Gyro',
    subtitle: 'Iridescent mercury reflection with 3D figure-8 levitation',
    effectId: 'liquidMetal',
    colors: ['#ffffff'],
    motionPreset: 'float-3d',
    motionIntensity: 100,
    easing: 'sine',
    duration: 4,
    backdrop: 'spotlight',
    backgroundColor: '#09090b',
    filterPresetId: 'clean',
  },
  {
    id: 'extrude-turntable',
    label: 'Obsidian Extrude 360°',
    subtitle: 'Physical 3D bevel extrusion on a continuous showcase turntable',
    effectId: 'extrude:physical',
    colors: ['#38bdf8', '#6366f1', '#f43f5e'],
    motionPreset: 'turntable-y',
    motionIntensity: 110,
    easing: 'easeInOut',
    duration: 4.5,
    backdrop: 'grid',
    backgroundColor: '#07090e',
    filterPresetId: 'clean',
  },
  {
    id: 'holo-pulse',
    label: 'Prismatic Foil Pulse',
    subtitle: 'Diffraction grating foil with rhythmic harmonic heartbeat',
    effectId: 'holo',
    colors: ['#ec4899', '#8b5cf6', '#06b6d4'],
    motionPreset: 'heartbeat',
    motionIntensity: 105,
    easing: 'spring',
    duration: 3.2,
    backdrop: 'aura',
    backgroundColor: '#0c0814',
    filterPresetId: 'clean',
  },
  {
    id: 'neon-plasma',
    label: 'Neon Gas Tube',
    subtitle: 'High-voltage SDF neon glow with magnetic orbital hover',
    effectId: 'neon',
    colors: ['#0ea5e9', '#ffffff', '#6366f1'],
    motionPreset: 'hover-orbit',
    motionIntensity: 95,
    easing: 'sine',
    duration: 4,
    backdrop: 'spotlight',
    backgroundColor: '#05070c',
    filterPresetId: 'cyber-rgb',
  },
  {
    id: 'cyber-glitch',
    label: 'Broadcast Signal Glitch',
    subtitle: 'RGB channel split & scanline displacement with micro-jolts',
    effectId: 'glitch',
    colors: ['#ff2a6d', '#05d9e8', '#ffffff'],
    motionPreset: 'glitch-jolt',
    motionIntensity: 115,
    easing: 'steps8',
    duration: 2.8,
    backdrop: 'grid',
    backgroundColor: '#08080c',
    filterPresetId: 'crt-analog',
  },
  {
    id: 'gold-medallion',
    label: 'Sovereign Coin Flip',
    subtitle: 'Milled-edge metallic relief medallion with 3D coin-toss flip',
    effectId: 'amethystCoin:physical',
    colors: ['#fbbf24', '#f59e0b', '#fef3c7'],
    motionPreset: 'flip-coin',
    motionIntensity: 110,
    easing: 'cubic',
    duration: 4,
    backdrop: 'spotlight',
    backgroundColor: '#0c0a09',
    filterPresetId: 'cinema-grain',
  },
  {
    id: 'emerald-lens',
    label: 'Optical Dispersion Lens',
    subtitle: 'Dome refraction & wavelength dispersion with kinetic pop-in',
    effectId: 'oilLens',
    colors: ['#10b981', '#06b6d4', '#ffffff'],
    motionPreset: 'kinetic-intro',
    motionIntensity: 100,
    easing: 'spring',
    duration: 3.6,
    backdrop: 'aura',
    backgroundColor: '#040d0a',
    filterPresetId: 'clean',
  },
  {
    id: 'luminous-portal',
    label: 'Luminous Glass Squircle',
    subtitle: 'Analytic frosted glass tile with internal rim diffusion',
    effectId: 'luminousGlass',
    colors: ['#1e1b4b', '#818cf8', '#ffffff'],
    motionPreset: 'pendulum',
    motionIntensity: 90,
    easing: 'sine',
    duration: 4.2,
    backdrop: 'spotlight',
    backgroundColor: '#09090f',
    filterPresetId: 'clean',
  },
  {
    id: 'thermal-scan',
    label: 'Infrared Heatmap Scan',
    subtitle: '5-stop thermal convection field with harmonic pulse',
    effectId: 'heatmap',
    colors: ['#09090b', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    motionPreset: 'heartbeat',
    motionIntensity: 95,
    easing: 'easeInOut',
    duration: 3.5,
    backdrop: 'color',
    backgroundColor: '#09090b',
    filterPresetId: 'clean',
  },
  {
    id: 'ascii-terminal',
    label: 'CRT ASCII Plotter',
    subtitle: 'Quantized glyph matrix with travelling print-head scan',
    effectId: 'ascii',
    colors: ['#10b981'],
    motionPreset: 'float-3d',
    motionIntensity: 65,
    easing: 'linear',
    duration: 4,
    backdrop: 'grid',
    backgroundColor: '#040906',
    filterPresetId: 'crt-analog',
  },
  {
    id: 'wax-seal-stamp',
    label: 'Atelier Wax Seal',
    subtitle: 'Hand-pressed crimson wax relief with raking studio light',
    effectId: 'waxSeal',
    colors: ['#eadfc9', '#991b1b', '#fca5a5'],
    motionPreset: 'float-3d',
    motionIntensity: 75,
    easing: 'sine',
    duration: 4.5,
    backdrop: 'color',
    backgroundColor: '#eadfc9',
    filterPresetId: 'cinema-grain',
  },
  {
    id: 'blueprint-draft',
    label: 'Architectural Plotter',
    subtitle: 'Concentric compass guides & rotating laser spirit beam',
    effectId: 'construction',
    colors: ['#0ea5e9'],
    motionPreset: 'pendulum',
    motionIntensity: 70,
    easing: 'easeInOut',
    duration: 4,
    backdrop: 'color',
    backgroundColor: '#090d16',
    filterPresetId: 'clean',
  },
];

/**
 * Paints the selected studio backdrop onto a 2D export/composite canvas.
 */
export function paintStageBackdrop(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  mode: StageBackdropMode,
  bgHex: string,
  accentHex: string,
): void {
  ctx.clearRect(0, 0, w, h);
  if (mode === 'transparent') return;

  ctx.fillStyle = bgHex || '#09090b';
  ctx.fillRect(0, 0, w, h);

  if (mode === 'spotlight') {
    const grad = ctx.createRadialGradient(w * 0.5, h * 0.45, w * 0.04, w * 0.5, h * 0.5, w * 0.65);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.13)');
    grad.addColorStop(0.5, `${accentHex}18`);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  } else if (mode === 'aura') {
    const g1 = ctx.createRadialGradient(w * 0.3, h * 0.28, w * 0.02, w * 0.3, h * 0.28, w * 0.6);
    g1.addColorStop(0, `${accentHex}44`);
    g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    const g2 = ctx.createRadialGradient(w * 0.72, h * 0.72, w * 0.02, w * 0.72, h * 0.72, w * 0.55);
    g2.addColorStop(0, 'rgba(99, 102, 241, 0.26)');
    g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);
  } else if (mode === 'grid') {
    const step = Math.max(24, Math.round(Math.min(w, h) / 22));
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.065)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    const glow = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.05, w * 0.5, h * 0.5, w * 0.58);
    glow.addColorStop(0, `${accentHex}22`);
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  }
}

/**
 * Composites a rendered WebGL frame with 3D rotation foreshortening, studio backdrop,
 * and SocialOverlay onto a target 2D canvas for video recording, PNG snapshots, and sprite sheets.
 */
export function compositeLogoFxFrame({
  ctx,
  width,
  height,
  source,
  transform,
  backdropMode,
  bgHex,
  accentHex,
  effectId,
  params,
  darkTheme,
  brandName,
  brandHandle,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  source: CanvasImageSource;
  transform: Transform;
  backdropMode: StageBackdropMode;
  bgHex: string;
  accentHex: string;
  effectId: string;
  params: Record<string, number | string | boolean>;
  darkTheme: boolean;
  brandName: string;
  brandHandle: string;
}): void {
  paintStageBackdrop(ctx, width, height, backdropMode, bgHex, accentHex);

  const squareSize = Math.min(width, height);
  const radX = (transform.rotateX * Math.PI) / 180;
  const radY = (transform.rotateY * Math.PI) / 180;
  const radZ = (transform.rotateZ * Math.PI) / 180;
  const cosX = Math.cos(radX);
  const cosY = Math.cos(radY);
  const sx = Math.sign(cosY || 1) * Math.max(0.18, Math.abs(cosY));
  const sy = Math.sign(cosX || 1) * Math.max(0.18, Math.abs(cosX));

  ctx.save();
  ctx.translate(width / 2 + transform.x * squareSize * 0.35, height / 2 + transform.y * squareSize * 0.35);
  ctx.rotate(radZ * 0.25);
  ctx.scale(sx, sy);
  ctx.drawImage(source, -squareSize / 2, -squareSize / 2, squareSize, squareSize);
  ctx.restore();

  if (width === height) {
    paintSocialOverlay(ctx, effectId, params, squareSize, darkTheme, brandName, brandHandle);
  }
}

export function applyFilterPresetToList(filters: FilterState[], presetId: string): FilterState[] {
  const preset = FILTER_MASTER_PRESETS.find((p) => p.id === presetId);
  if (!preset) return filters;
  return filters.map((f) => {
    const val = preset.filters[f.id];
    if (val !== undefined) {
      return { ...f, amount: val, enabled: true };
    }
    return { ...f, enabled: false };
  });
}

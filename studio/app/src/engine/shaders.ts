/**
 * GLSL for the effect engine.
 *
 * Architecture mirrors the original: the logo is rasterised once into a texture,
 * a signed distance field is derived from its alpha, and every effect is a single
 * fragment shader that samples both. Effects never draw geometry — the whole
 * stage is one fullscreen triangle, so the only cost is per-pixel shading.
 *
 * The shaders here are original implementations written against the parameter
 * semantics recovered from the target's inspector (see spec/param-metadata.json).
 */

export const VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
uniform float uScale;
uniform float uRotate;
uniform vec2 uOffset;
out vec2 vUv;
out vec2 vUvT;
void main() {
  vec2 uv = aPos * 0.5 + 0.5;
  vUv = uv;
  // The recovered shaders expect a coordinate that already carries the stage
  // transform, so it is applied here once instead of per-pixel.
  vec2 p = uv - 0.5 - uOffset;
  float s = sin(-uRotate);
  float c = cos(-uRotate);
  p = mat2(c, -s, s, c) * p;
  p /= max(uScale, 0.02);
  vUvT = p + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/** Shared helpers: transform, distance sampling, noise, lighting, environment. */
const COMMON = `
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform sampler2D uLogo;
uniform sampler2D uSdf;
uniform sampler2D uAtlas;
uniform vec2 uResolution;
uniform float uAspect;
uniform float uSdfRange;
uniform float uTime;
uniform float uProgress;
uniform float uScale;
uniform float uRotate;
uniform vec2 uOffset;
uniform float uMode;

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

vec2 xform(vec2 uv) {
  vec2 p = uv - 0.5 - uOffset;
  float s = sin(-uRotate);
  float c = cos(-uRotate);
  p = mat2(c, -s, s, c) * p;
  p /= max(uScale, 0.02);
  return p + 0.5;
}

float sdAt(vec2 uv) {
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return -0.5;
  return texture(uSdf, uv).r * uSdfRange;
}

vec4 logoAt(vec2 uv) {
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);
  return texture(uLogo, uv);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise2(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(cell), hash21(cell + vec2(1.0, 0.0)), f.x),
             mix(hash21(cell + vec2(0.0, 1.0)), hash21(cell + 1.0), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise2(p);
    p = p * 2.02 + 17.3;
    a *= 0.5;
  }
  return v;
}

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

vec3 normalFromSdf(vec2 uv, float eps) {
  float d = sdAt(uv);
  float dx = sdAt(uv + vec2(eps, 0.0)) - sdAt(uv - vec2(eps, 0.0));
  float dy = sdAt(uv + vec2(0.0, eps)) - sdAt(uv - vec2(0.0, eps));
  vec2 g = vec2(dx, dy) / (2.0 * eps);
  return normalize(vec3(-g * 0.06, 1.0));
}

// procedural studio environment used by the metal / glass surfaces
vec3 envSample(vec2 dir) {
  float y = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 floorC = vec3(0.012, 0.013, 0.016);
  vec3 midC = vec3(0.36, 0.375, 0.42);
  vec3 topC = vec3(1.0, 1.0, 1.01);
  vec3 c = mix(floorC, midC, smoothstep(0.0, 0.55, y));
  c = mix(c, topC, smoothstep(0.5, 0.98, y));
  float strip = smoothstep(0.86, 1.0, abs(sin(dir.x * 3.1 + 1.2)));
  c += vec3(0.55) * strip * smoothstep(0.25, 0.9, y);
  float horizon = smoothstep(0.48, 0.52, y) - smoothstep(0.52, 0.62, y);
  c -= vec3(0.12) * abs(horizon);
  return max(c, 0.0);
}

vec3 ramp(float t, vec3 a, vec3 b, vec3 c) {
  return clamp(mix(a, b, smoothstep(0.0, 0.5, t)) + c * smoothstep(0.5, 1.0, t), 0.0, 4.0);
}

vec4 over(vec4 src, vec4 dst) {
  float a = src.a + dst.a * (1.0 - src.a);
  if (a <= 0.0001) return vec4(0.0);
  vec3 c = (src.rgb * src.a + dst.rgb * dst.a * (1.0 - src.a)) / a;
  return vec4(c, a);
}

/**
 * Exponential inflation of the silhouette: steep at the edge, flat in the body.
 * Shared because both the liquid-metal surface and the coin relief build their
 * normal from the same field gradient.
 */
float domeHeight(vec2 p) {
  return 1.0 - exp(-max(sdAt(p), 0.0) * 5.0);
}

vec2 domeGrad(vec2 p, float eps) {
  return vec2(
    domeHeight(p + vec2(eps, 0.0)) - domeHeight(p - vec2(eps, 0.0)),
    domeHeight(p + vec2(0.0, eps)) - domeHeight(p - vec2(0.0, eps))
  ) / (2.0 * eps);
}
`;

/* ------------------------------------------------------------------ *
 * 2D effects
 * ------------------------------------------------------------------ */

const liquidMetal = `
uniform float uRepetition;
uniform float uSoftness;
uniform float uDistortion;
uniform float uContour;
uniform float uShiftRed;
uniform float uShiftBlue;
uniform float uAngle;
uniform vec3 uColorTint;

void main() {
  vec2 uv = xform(vUv);
  vec2 cyc = vec2(cos(uTime), sin(uTime)) * 0.42;
  float n = fbm(uv * 3.2 + cyc);
  vec2 duv = uv + (n - 0.5) * uDistortion * 0.16;
  float d = sdAt(duv);
  float aa = 0.0012 + uSoftness * 0.03;
  float mask = smoothstep(0.0, aa, d);
  if (mask <= 0.002) { outColor = vec4(0.0); return; }

  vec2 g = domeGrad(duv, 0.01);
  vec3 N = normalize(vec3(-g * 0.32, 1.0));
  vec3 R = reflect(vec3(0.0, 0.0, -1.0), N);
  float fres = pow(1.0 - clamp(N.z, 0.0, 1.0), 2.0);

  float ang = radians(uAngle);
  vec2 dir = vec2(cos(ang), sin(ang));
  float bands = 0.5 + 0.5 * sin(dot(duv - 0.5, dir) * uRepetition * 3.2 + d * 4.0 + fres * 7.0 + n * 1.6 - uTime);
  float contourAmt = smoothstep(0.0, 1.0, uContour);

  // chromatic reflection: each channel looks at a slightly different direction,
  // which is what puts rainbow fringes on the fast-curving edges
  vec2 rdir = R.xy * (1.15 + uRepetition * 0.06) + vec2(sin(uTime), cos(uTime)) * 0.15;
  float shR = uShiftRed * 0.06;
  float shB = uShiftBlue * 0.06;
  vec3 env = envSample(rdir);
  vec3 envC = vec3(
    envSample(rdir + vec2(shR, 0.0)).r,
    env.g,
    envSample(rdir - vec2(shB, 0.0)).b
  );

  // a second, coarser reflection layer banded by the contour setting
  vec3 bandEnv = envSample(rdir * 1.85 + vec2(0.0, bands * 0.5 - 0.25));
  vec3 col = mix(envC, bandEnv * 1.15, contourAmt * 0.5);
  col *= 0.82 + 0.42 * mix(1.0, bands, contourAmt);

  // cool highlights, warm shadows — the giveaway of a metal surface
  col *= mix(vec3(1.04, 1.0, 0.94), vec3(0.94, 0.97, 1.06), smoothstep(0.7, -0.1, rdir.y));

  // thin-film interference: hue steps along the silhouette offset contours.
  // The film flows, which is what separates liquid metal from polished chrome.
  float t = fract(d * (16.0 + uRepetition * 5.0) + dot(duv - 0.5, dir) * 2.0 + n * 0.25 - uProgress);
  vec3 hue = 0.5 + 0.5 * cos(TAU * (t + vec3(0.0, 0.33, 0.67) + vec3(uShiftRed * 0.12, 0.0, uShiftBlue * 0.12)));
  float film = (0.25 + 0.75 * contourAmt) * mix(0.5, 1.0, smoothstep(0.0, 0.8, fres));
  col = mix(col, hue * (0.5 + 0.85 * luma(col)), film * 0.95);

  col += vec3(1.0) * pow(fres, 3.5) * 0.3;
  col *= mix(vec3(1.0), uColorTint, 0.1);

  outColor = vec4(col, mask);
}`;

const glass = `
uniform float uEdgeWidth;
uniform float uFrost;
uniform float uRefraction;
uniform float uDepth;
uniform float uHighlight;
uniform float uLightDirection;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float edge = max(uEdgeWidth, 0.004);
  float mask = smoothstep(0.0, 0.0025, d);
  if (mask <= 0.001) { outColor = vec4(0.0); return; }

  vec3 N = normalFromSdf(uv, 0.005);
  float ang = radians(uLightDirection);
  vec2 L = vec2(cos(ang), sin(ang));
  float lambert = clamp(dot(N.xy, L) * 1.6 + 0.45, 0.0, 1.0);

  // refraction: sample the logo shifted along the surface normal
  vec2 refr = N.xy * uRefraction * 0.06;
  vec4 behind = logoAt(uv + refr);
  vec3 tint = mix(uColorA, uColorB, smoothstep(0.0, 0.5, d));

  float frost = smoothstep(0.0, 0.6, uFrost);
  float grain = fbm(uv * 120.0) * 0.5 + fbm(uv * 45.0) * 0.5;
  vec3 col = mix(behind.rgb, tint * (0.6 + 0.8 * grain), frost * 0.55);

  // bevel band along the silhouette
  float band = 1.0 - smoothstep(0.0, edge, d);
  col = mix(col, uColorB * (0.55 + 0.6 * lambert), band * 0.55 * uDepth);
  col += uColorC * pow(band, 2.0) * 0.18;

  float spec = pow(clamp(dot(normalize(N.xy + 0.001), L), 0.0, 1.0), 12.0);
  col += vec3(1.0) * spec * uHighlight * 0.55;

  outColor = vec4(col, mask * mix(0.72, 1.0, uDepth));
}`;

const holo = `
uniform float uBandScale;
uniform float uBandAngle;
uniform float uIridescence;
uniform float uLightSweep;
uniform float uSaturation;
uniform float uFoilBrightness;
uniform float uGrain;
uniform vec3 uColorA;
uniform vec3 uColorB;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float mask = smoothstep(0.0, 0.002, d);
  if (mask <= 0.001) { outColor = vec4(0.0); return; }

  float ang = radians(uBandAngle);
  vec2 dir = vec2(cos(ang), sin(ang));
  float t = dot(uv - 0.5, dir) * uBandScale * 6.0 + fbm(uv * 4.0) * 0.6 + uTime * uLightSweep * 0.15;
  vec3 irid = 0.5 + 0.5 * cos(TAU * (t + vec3(0.0, 0.33, 0.67)));
  irid = mix(vec3(luma(irid)), irid, uIridescence);
  irid *= uFoilBrightness;

  vec3 base = mix(uColorA, uColorB, 0.5 + 0.5 * sin(t * 0.7));
  vec3 col = mix(base, irid, 0.72);
  col += (hash21(uv * 900.0) - 0.5) * uGrain * 0.25;
  col = mix(vec3(luma(col)), col, 1.0 + uSaturation);
  outColor = vec4(col, mask);
}`;

const oilLens = `
uniform float uDome;
uniform float uDepth;
uniform float uDispersion;
uniform float uHighlights;
uniform float uRims;
uniform float uExposure;
uniform float uBloom;
uniform float uGrain;
uniform float uVignette;
uniform float uWavelengths;
uniform float uMotionBlur;
uniform vec3 uLogoColor;
uniform vec3 uFloorColor;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float mask = smoothstep(0.0, 0.003, d);
  if (mask <= 0.001) { outColor = vec4(0.0); return; }

  vec3 N = normalFromSdf(uv, 0.006);
  // The dome breathes and the room reflected in it drifts, so the highlights
  // travel across the lens instead of sitting on it.
  vec2 dome = N.xy * uDome * uDepth * (0.09 + 0.012 * sin(uTime * 0.9));
  float disp = uDispersion * 0.012;

  vec4 base = logoAt(uv);
  vec3 col;
  col.r = logoAt(uv + dome + vec2(disp, 0.0)).r;
  col.g = logoAt(uv + dome).g;
  col.b = logoAt(uv + dome - vec2(disp, 0.0)).b;
  col = mix(base.rgb, col, step(0.001, uDispersion));
  col *= uLogoColor;

  vec3 R = reflect(vec3(0.0, 0.0, -1.0), N);
  vec3 env = envSample(R.xy + vec2(cos(uTime * 0.35), sin(uTime * 0.28)) * 0.4);
  float spec = pow(clamp(dot(R, normalize(vec3(-0.3 + 0.25 * sin(uTime * 0.6), 0.8, 0.6))), 0.0, 1.0), 22.0);
  col = mix(col, env * 0.6, 0.35 * uDepth);
  col += vec3(1.0) * spec * uHighlights;
  // The lens sweeps a highlight across the face as it turns under the light.
  float sweep = exp(-pow((fract(uTime * 0.14) - (uv.x * 0.8 + uv.y * 0.4)) * 3.6, 2.0));
  col += env * sweep * 0.35 * uHighlights;

  float rim = 1.0 - smoothstep(0.0, 0.05, d);
  col += uRims * 0.35 * rim * envSample(vec2(uv.x, 1.0)).b;
  col *= uExposure;
  col += uBloom * 0.25 * smoothstep(0.55, 1.0, luma(col));
  col += (hash21(uv * 1200.0) - 0.5) * uGrain * 0.2;
  float vig = 1.0 - uVignette * smoothstep(0.35, 0.95, length(uv - 0.5) * 1.6);
  col *= vig;
  col = mix(col, uFloorColor, (1.0 - mask) * 0.0);
  outColor = vec4(col, mask);
}`;

const neon = `
uniform float uLineWidth;
uniform float uGlowRadius;
uniform float uGlowStrength;
uniform float uCoreBrightness;
uniform float uEdgeSoftness;
uniform float uGlowFalloff;
uniform float uFillOpacity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float res = uResolution.x;
  float px = d * res; // distance in pixels

  float half_w = uLineWidth * 0.5;
  float core = exp(-pow(abs(px - 0.0) / max(half_w, 0.6), 2.0));
  float halo = exp(-abs(px) / max(uGlowRadius, 0.5)) * uGlowStrength;
  float soft = exp(-abs(px) / max(half_w * (1.0 + uEdgeSoftness * 6.0), 1.0));

  vec3 col = uColorC * halo * 0.9 + uColorA * soft * 1.1 + uColorB * core * uCoreBrightness;
  float inside = smoothstep(0.0, 0.004, d);
  col += uColorA * inside * uFillOpacity;
  float a = clamp(max(max(halo, core), soft) + inside * uFillOpacity, 0.0, 1.0);
  col *= mix(1.0, 0.85, uGlowFalloff * 0.2);
  outColor = vec4(col, a);
}`;

const glitch = `
uniform float uDirection;
uniform float uShift;
uniform float uBands;
uniform float uSplit;
uniform float uBurstRate;
uniform float uBlockCount;
uniform float uJitter;
uniform float uPixelSize;
uniform float uTintMix;
uniform vec3 uSplitColorA;
uniform vec3 uSplitColorB;
uniform float uGlow;
uniform float uScanlineDensity;
uniform float uScanlineStrength;
uniform float uNoise;
uniform float uDropout;

float rnd(float x) { return fract(sin(x * 12.9898) * 43758.5453); }

void main() {
  vec2 uv = xform(vUv);
  float t = floor(uTime * uBurstRate);

  float bands = max(uBands, 1.0);
  float bandId = floor(uv.y * bands);
  float bandRand = rnd(bandId + t * 7.13);
  float bandOn = step(1.0 - uShift * 0.85, bandRand);
  float offset = (bandRand - 0.5) * uShift * 0.12 * bandOn;
  if (uDirection > 0.5) uv.x += offset; else uv.y += offset;

  // block displacement
  vec2 block = floor(uv * max(uBlockCount, 1.0));
  float blockRand = rnd(block.x * 3.1 + block.y * 7.7 + t);
  uv += (vec2(rnd(blockRand), rnd(blockRand + 3.0)) - 0.5) * uJitter * 0.02 * step(0.82, blockRand);

  // pixelation
  if (uPixelSize > 1.0) uv = (floor(uv * uResolution / uPixelSize) + 0.5) * uPixelSize / uResolution;

  vec2 dUv = (uv - 0.5) * (1.0 - uSplit * 0.05) + 0.5;
  float dr = sdAt(dUv + vec2(uSplit * 0.01, 0.0));
  float dg = sdAt(dUv);
  float db = sdAt(dUv - vec2(uSplit * 0.01, 0.0));
  float m = smoothstep(0.0, 0.002, dg);
  if (m <= 0.001) { outColor = vec4(0.0); return; }

  vec3 base = logoAt(dUv).rgb;
  vec3 col;
  col.r = mix(base.r, uSplitColorA.r, uTintMix);
  col.g = base.g;
  col.b = mix(base.b, uSplitColorB.b, uTintMix);
  col += vec3(smoothstep(0.0, 0.004, dr) - m, 0.0, smoothstep(0.0, 0.004, db) - m) * 0.8;

  float scan = 0.5 + 0.5 * sin(uv.y * uScanlineDensity * PI * 2.0 + uTime * 4.0);
  col *= 1.0 - uScanlineStrength * 0.6 * scan;
  col += (hash21(uv * 800.0 + t) - 0.5) * uNoise;
  col += uGlow * 0.25 * smoothstep(0.0, 0.03, dg) * (1.0 - smoothstep(0.03, 0.08, dg));

  float drop = step(rnd(bandId * 1.7 + t) , uDropout);
  outColor = vec4(col, m * (1.0 - drop * 0.85));
}`;

const halftone = `
uniform float uDotSpacing;
uniform float uScreenAngle;
uniform float uShading;
uniform float uShape;
uniform vec3 uInkColor;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float m = smoothstep(0.0, 0.002, d);
  if (m <= 0.001) { outColor = vec4(0.0); return; }

  float ang = radians(uScreenAngle);
  vec2 p = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * (uv - 0.5) * uResolution.x;
  vec2 cell = floor(p / max(uDotSpacing, 2.0));
  vec2 f = fract(p / max(uDotSpacing, 2.0)) - 0.5;

  float shade = 1.0 - clamp(smoothstep(0.0, 0.5, d) * uShading, 0.0, 1.0);
  float radius = 0.5 * mix(0.15, 1.0, shade);
  float dist;
  if (uShape < 0.5) dist = length(f);
  else if (uShape < 1.5) dist = max(abs(f.x), abs(f.y));
  else dist = (abs(f.x) + abs(f.y)) * 0.72;

  float dot_ = 1.0 - smoothstep(radius - 0.06, radius + 0.06, dist);
  vec3 col = uInkColor * dot_;
  outColor = vec4(col, dot_ * m);
}`;

const dither = `
uniform float uPixelSize;
uniform float uShading;
uniform vec3 uInkColor;

float bayer4(vec2 p) {
  int x = int(mod(p.x, 4.0));
  int y = int(mod(p.y, 4.0));
  float m[16] = float[16](0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0,
                          3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);
  return m[y * 4 + x] / 16.0;
}

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float m = smoothstep(0.0, 0.002, d);
  if (m <= 0.001) { outColor = vec4(0.0); return; }

  vec2 px = floor(uv * uResolution / max(uPixelSize, 1.0));
  float shade = 1.0 - clamp(smoothstep(0.0, 0.55, d) * uShading, 0.0, 1.0);
  float threshold = bayer4(px);
  float on = step(threshold, shade);
  vec3 col = uInkColor * on;
  outColor = vec4(col, on * m);
}`;

const ascii = `
uniform float uCharacterSize;
uniform float uShading;
uniform vec3 uInkColor;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float m = smoothstep(0.0, 0.002, d);
  if (m <= 0.001) { outColor = vec4(0.0); return; }

  float cell = max(uCharacterSize, 6.0);
  vec2 grid = uResolution / cell;
  vec2 p = uv * grid;
  vec2 ci = floor(p);
  vec2 f = fract(p);

  // sample the field at the cell centre to keep glyphs stable
  vec2 centre = (ci + 0.5) / grid;
  float dCell = sdAt(centre);
  // The field is normalised to stage units, so a stroke is only a few
  // hundredths deep; scale it up before quantising into glyph levels.
  // Terminal shimmer: cells step around the glyph ramp on a slow travelling
  // wave, which is what an animated ASCII render looks like.
  float shimmer = 1.0 + 0.14 * sin(uTime * 1.8 + ci.y * 0.45 + ci.x * 0.2);
  float shade = clamp(dCell * 14.0 * shimmer, 0.0, 1.0) * uShading;

  const int LEVELS = 10;
  // Level 0 is the blank glyph, so start at 1: a cell that is inside the mark
  // must never render as empty.
  int idx = 1 + int(clamp(floor(shade * float(LEVELS - 1)), 0.0, float(LEVELS - 2)));
  float cellW = 1.0 / float(LEVELS);
  vec2 atlasUv = vec2((float(idx) + f.x) * cellW, f.y);
  float glyph = texture(uAtlas, vec2(atlasUv.x, 1.0 - atlasUv.y)).a;
  glyph = smoothstep(0.25, 0.75, glyph);

  float sweep = 0.82 + 0.18 * smoothstep(0.0, 1.0, sin(uTime * 1.3 - ci.y * 0.5 + ci.x * 0.1) * 0.5 + 0.5);
  // A print head scans the block once per animation cycle, so Duration and
  // Easing are visible here rather than only in the raw clock.
  float head = exp(-pow((uv.y - (1.0 - uProgress)) * 24.0, 2.0));
  vec3 col = uInkColor * glyph * sweep * (0.72 + 0.5 * head);
  outColor = vec4(col, glyph * m);
}`;

const stripes = `
uniform float uStripeCount;
uniform float uStripeWidth;
uniform float uStripeAngle;
uniform float uStripeOffset;
uniform float uStripeSoftness;
uniform float uInvert;
uniform vec3 uColorA;
uniform vec3 uColorB;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float m = smoothstep(0.0, 0.002, d);
  if (m <= 0.001) { outColor = vec4(0.0); return; }

  float ang = radians(uStripeAngle);
  vec2 dir = vec2(cos(ang), sin(ang));
  float t = dot(uv - 0.5, dir) * max(uStripeCount, 1.0) * 2.0 + uStripeOffset + uTime * 0.05;
  float s = fract(t);
  float edge = max(uStripeWidth, 0.02) * 0.5;
  float bar = smoothstep(0.5 - edge - 0.02, 0.5 - edge + 0.02, s) - smoothstep(0.5 + edge - 0.02, 0.5 + edge + 0.02, s);
  bar = mix(bar, 1.0 - bar, uInvert);
  vec3 col = mix(uColorA, uColorB, bar);
  outColor = vec4(col, m);
}`;

const sketch = `
uniform float uLineWidth;
uniform float uHatchSpacing;
uniform float uHatchAngle;
uniform float uHandDrawnRoughness;
uniform float uCrossHatch;
uniform float uInkDensity;
uniform float uEdgeStrength;
uniform float uShadeStrength;
uniform vec3 uInkColor;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float m = smoothstep(0.0, 0.0015, d);
  if (m <= 0.001) { outColor = vec4(0.0); return; }

  // Hand-drawn "boil": the wobble field is re-drawn a few times a second.
  float wob = (fbm(uv * 90.0 + uTime * 0.5) - 0.5) * uHandDrawnRoughness * 0.012;
  float dd = sdAt(uv + wob);
  float edge = 1.0 - smoothstep(0.0, max(uLineWidth, 0.5) * 0.006, abs(dd));

  float ang = radians(uHatchAngle);
  vec2 dir = vec2(cos(ang), sin(ang));
  float h1 = abs(fract(dot(uv, dir) / max(uHatchSpacing, 4.0) * uResolution.x / 100.0 + uTime * 0.06) - 0.5) * 2.0;
  float ang2 = ang + PI * 0.5;
  vec2 dir2 = vec2(cos(ang2), sin(ang2));
  float h2 = abs(fract(dot(uv, dir2) / max(uHatchSpacing, 4.0) * uResolution.x / 100.0 - uTime * 0.05) - 0.5) * 2.0;

  float shade = smoothstep(0.0, 0.4, dd);
  float hatch = 1.0 - smoothstep(0.55, 0.95, h1);
  if (uCrossHatch > 0.5) hatch = max(hatch, (1.0 - smoothstep(0.55, 0.95, h2)) * smoothstep(0.35, 0.9, 1.0 - shade));
  float ink = max(edge * uEdgeStrength, hatch * uInkDensity * (1.0 - shade * (1.0 - uShadeStrength)));

  vec3 col = uInkColor;
  outColor = vec4(col, clamp(ink, 0.0, 1.0) * m);
}`;

const heatmap = `
uniform float uScale;
uniform float uClipBackground;
uniform float uContour;
uniform float uInnerGlow;
uniform float uOuterGlow;
uniform float uNoise;
uniform float uAngle;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uColorD;
uniform vec3 uColorE;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float t = clamp(d / max(uScale * 0.5, 0.02), -1.0, 1.0);
  // Heat blooms and drifts: the field is a slow convection, not a still frame.
  float n = (fbm(uv * 6.0 + vec2(uTime * 0.14, -uTime * 0.09)) - 0.5) * uNoise * 0.3;
  float v = clamp(t * 0.5 + 0.5 + n + 0.035 * sin(uTime * 1.1 - length(uv - 0.5) * 9.0), 0.0, 1.0);

  vec3 col;
  if (v < 0.25) col = mix(uColorA, uColorB, v / 0.25);
  else if (v < 0.5) col = mix(uColorB, uColorC, (v - 0.25) / 0.25);
  else if (v < 0.75) col = mix(uColorC, uColorD, (v - 0.5) / 0.25);
  else col = mix(uColorD, uColorE, (v - 0.75) / 0.25);

  float contour = abs(fract(d * 22.0 + uTime * 0.35) - 0.5) * 2.0;
  col *= mix(1.0, 0.72 + 0.5 * smoothstep(0.5, 1.0, contour), uContour);
  col += uColorE * uOuterGlow * 0.3 * exp(-max(d, 0.0) * 30.0) * step(d, 0.0);
  col += uColorC * uInnerGlow * 0.2 * smoothstep(0.0, 0.3, d);

  float m = smoothstep(0.0, 0.002, d);
  float outside = smoothstep(-0.02, 0.0, d) * uOuterGlow;
  float a = mix(m, max(m, outside), 1.0 - uClipBackground);
  outColor = vec4(col, a);
}`;

const gemSmoke = `
uniform float uScale;
uniform float uInnerDistortion;
uniform float uOuterDistortion;
uniform float uOuterGlow;
uniform float uInnerGlow;
uniform float uOffset;
uniform float uAngle;
uniform float uSize;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorInner;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float n1 = fbm(uv * 3.0 + vec2(uTime * 0.13, uTime * 0.05));
  float n2 = fbm(uv * 5.5 - vec2(uTime * 0.06, uTime * 0.15));

  float inner = smoothstep(0.0, 0.001, d + (n1 - 0.5) * uInnerDistortion * 0.12);
  float outerD = d + (n2 - 0.5) * uOuterDistortion * 0.18;
  float outer = exp(-max(-outerD, 0.0) / max(uScale * 0.18, 0.02)) * uOuterGlow;

  vec3 col = mix(uColorA, uColorB, clamp(n1 * 1.2, 0.0, 1.0));
  col = mix(col, uColorInner, inner * 0.65);
  col += uColorA * outer * 0.9;
  col += uColorInner * uInnerGlow * 0.25 * inner * smoothstep(0.0, 0.25, d);
  float a = clamp(max(inner, outer * 0.85), 0.0, 1.0);
  outColor = vec4(col, a);
}`;

const pixelCartoon = `
uniform float uPixelSize;
uniform float uOutlineWidth;
uniform float uColorSteps;
uniform float uShadowStrength;
uniform float uHighlight;
uniform float uLightDirection;
uniform float uPixelTexture;
uniform float uOpacity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

void main() {
  vec2 uv = xform(vUv);
  vec2 grid = uResolution / max(uPixelSize, 1.0);
  vec2 puv = (floor(uv * grid) + 0.5) / grid;

  float d = sdAt(puv);
  float steps = max(uColorSteps, 2.0);
  float shade = clamp(smoothstep(0.0, 0.35, d), 0.0, 1.0);
  shade = floor(shade * steps) / steps;

  float ang = radians(uLightDirection);
  vec2 L = vec2(cos(ang), sin(ang));
  vec3 N = normalFromSdf(puv, 0.008);
  float lambert = clamp(dot(N.xy, L) * 1.2 + 0.5, 0.0, 1.0);
  lambert = floor(lambert * steps) / steps;

  vec3 col = mix(uColorA, uColorB, shade * lambert);
  col = mix(col, uColorC, uHighlight * smoothstep(0.55, 1.0, lambert) * 0.55);

  float outline = 1.0 - smoothstep(0.0, max(uOutlineWidth, 0.5) * 0.004, abs(d));
  float shadow = smoothstep(-0.06 * uShadowStrength, 0.0, sdAt(puv + vec2(0.02, 0.03) * uShadowStrength)) *
                 (1.0 - smoothstep(0.0, 0.002, sdAt(puv + vec2(0.02, 0.03) * uShadowStrength)));
  col = mix(col, vec3(0.0), shadow * 0.35);
  col = mix(col, vec3(0.02), outline);
  col *= 1.0 + (hash21(puv * grid) - 0.5) * uPixelTexture * 0.25;

  float a = max(smoothstep(0.0, 0.002, d), outline);
  outColor = vec4(col, a * uOpacity);
}`;

const led = `
uniform float uLedSpacing;
uniform float uLedRadius;
uniform float uLedGlow;
uniform float uScanWave;
uniform float uOffBrightness;
uniform float uDotShape;
uniform float uOpacity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float spacing = max(uLedSpacing, 2.0);
  vec2 grid = uResolution / spacing;
  vec2 p = uv * grid;
  vec2 ci = floor(p);
  vec2 f = fract(p) - 0.5;

  float dCell = sdAt((ci + 0.5) / grid);
  float lit = smoothstep(0.0, 0.02, dCell);
  float wave = 0.5 + 0.5 * sin(ci.y * 0.35 - uTime * 3.0 * uScanWave + ci.x * 0.12);
  lit *= mix(0.55, 1.0, wave);

  float r = max(uLedRadius, 0.05) * 0.5;
  float dist = uDotShape < 0.5 ? length(f) : max(abs(f.x), abs(f.y));
  float dotMask = 1.0 - smoothstep(r - 0.05, r + 0.05, dist);
  float glow = exp(-max(dist - r, 0.0) * 9.0) * uLedGlow * lit;

  vec3 col = mix(uColorB * uOffBrightness, mix(uColorA, uColorC, wave), lit);
  col += uColorA * glow * 0.6;
  float a = clamp(max(dotMask * mix(0.35, 1.0, lit), glow * 0.5), 0.0, 1.0) * uOpacity;
  outColor = vec4(col, a);
}`;

const particles = `
uniform float uParticleSpacing;
uniform float uParticleSize;
uniform float uScatter;
uniform float uTurbulence;
uniform float uParticleGlow;
uniform float uFill;
uniform float uOpacity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  float m = smoothstep(0.0, 0.004, d);

  vec2 grid = uResolution / max(uParticleSpacing, 3.0);
  vec2 p = uv * grid;
  vec2 ci = floor(p);
  float rnd = hash21(ci);
  vec2 jitter = (vec2(hash21(ci + 1.7), hash21(ci + 4.3)) - 0.5) * uScatter * 1.6;
  jitter += vec2(sin(uTime * 0.8 + rnd * 6.28), cos(uTime * 0.7 + rnd * 6.28)) * uTurbulence * 0.35;
  vec2 centre = ci + 0.5 + jitter;
  float dist = length(p - centre);

  float dCell = sdAt(centre / grid);
  float inShape = smoothstep(0.0, 0.01, dCell);
  float radius = max(uParticleSize, 0.5) * 0.06 * (0.55 + rnd * 0.9);
  float dot_ = 1.0 - smoothstep(radius - 0.06, radius + 0.06, dist);
  float glow = exp(-max(dist - radius, 0.0) * 6.0) * uParticleGlow;

  vec3 col = mix(uColorA, uColorB, rnd);
  col = mix(col, uColorC, smoothstep(0.0, 0.3, dCell) * 0.35);
  col += uColorA * glow * 0.5;
  float a = clamp(max(dot_ * mix(0.45, 1.0, inShape), glow * 0.4), 0.0, 1.0) * uOpacity;
  a += m * uFill * 0.35;
  outColor = vec4(col, clamp(a, 0.0, 1.0));
}`;

const construction = `
uniform float uCircleCount;
uniform float uShowCircles;
uniform float uShowLines;
uniform float uShowBounds;
uniform float uShowCenters;
uniform float uPointSize;
uniform float uLineWidth;
uniform float uLineOpacity;
uniform float uDetail;
uniform vec3 uPointColor;
uniform vec3 uLineColor;
uniform vec3 uLogoColor;
uniform float uLogoOpacity;
uniform vec3 uPaperColor;
uniform float uTransparent;
uniform float uHatchEnabled;
uniform vec3 uHatchColor;
uniform float uHatchAngle;
uniform float uHatchSpacing;
uniform float uHatchOpacity;
uniform float uOutlineEnabled;
uniform vec3 uOutlineColor;
uniform float uOutlineWidth;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  vec2 p = (uv - 0.5) * uResolution.x;

  // Paper. Everything else is drawn over it, so the drawing reads as a sheet.
  vec3 col = uPaperColor;
  float alpha = 1.0;

  // Construction grid: fine rule lines on a fixed pitch.
  float grid = 0.0;
  if (uShowLines > 0.5) {
    float pitch = 26.0 / max(uDetail, 0.25);
    vec2 gp = p / pitch;
    vec2 gline = abs(fract(gp) - 0.5);
    float w = max(fwidth(gp.x), 0.001);
    grid = (1.0 - smoothstep(w, w * 2.2, min(gline.x, gline.y))) * 0.5;
  }
  col = mix(col, uLineColor, grid * uLineOpacity);

  // Concentric guide circles about the mark's centre.
  float rings = 0.0;
  if (uShowCircles > 0.5) {
    float r = length(p);
    for (int i = 1; i <= 12; i++) {
      float fi = float(i);
      if (fi > uCircleCount) break;
      float radius = fi * 0.082 * uResolution.x * 0.5;
      float w = max(uLineWidth * 0.6, fwidth(r));
      rings = max(rings, 1.0 - smoothstep(w * 0.6, w * 1.8, abs(r - radius)));
    }
  }
  col = mix(col, uLineColor, rings * uLineOpacity);

  // Centre crosshair.
  if (uShowCenters > 0.5) {
    vec2 q = abs(p);
    float arm = uPointSize * 3.0;
    float w = max(uLineWidth * 0.6, 0.75);
    float cross = (1.0 - smoothstep(w * 0.6, w * 1.8, q.y)) * step(q.x, arm)
                + (1.0 - smoothstep(w * 0.6, w * 1.8, q.x)) * step(q.y, arm);
    col = mix(col, uPointColor, clamp(cross, 0.0, 1.0) * uLineOpacity);
    float dot0 = 1.0 - smoothstep(uPointSize * 0.18, uPointSize * 0.3, length(p));
    col = mix(col, uPointColor, dot0 * uLineOpacity);
  }

  // Bounding box of the artwork.
  if (uShowBounds > 0.5) {
    vec2 b = abs(uv - 0.5);
    float w = max(uLineWidth * 0.6, 0.002);
    float box = (1.0 - smoothstep(w * 0.5, w * 1.8, abs(b.x - 0.36)))
              + (1.0 - smoothstep(w * 0.5, w * 1.8, abs(b.y - 0.36)));
    col = mix(col, uLineColor, clamp(box, 0.0, 1.0) * uLineOpacity);
  }

  // Drafting sweep: a radial beam rotates over the sheet, the way a plotter
  // head or a spirit level would read it. It runs off uProgress rather than
  // the raw clock, so Duration and Easing shape one revolution per cycle.
  {
    float beamAngle = atan(p.y, p.x) - uProgress * TAU;
    float beam = pow(max(0.0, cos(beamAngle)), 70.0) * exp(-length(p) / (0.55 * uResolution.x));
    col = mix(col, uLineColor, beam * uLineOpacity * 0.85);
  }

  // Optional hatch fill inside the mark. The field is positive inside, so the
  // coverage ramp runs upward from zero at the edge.
  float aa = max(fwidth(d), 0.0015);
  float inside = smoothstep(-aa, aa, d);
  if (uHatchEnabled > 0.5 && inside > 0.01) {
    float ang = radians(uHatchAngle);
    float across = dot(p, vec2(-sin(ang), cos(ang)));
    float phase = across / max(uHatchSpacing, 1.0);
    float hw = max(fwidth(phase) * 0.5, 0.03);
    float hatch = 1.0 - smoothstep(hw, hw * 2.0, abs(fract(phase) - 0.5));
    col = mix(col, uHatchColor, hatch * inside * uHatchOpacity);
  }

  // The mark itself, plus an optional keyline.
  col = mix(col, uLogoColor, inside * uLogoOpacity);
  if (uOutlineEnabled > 0.5) {
    float w = max(uOutlineWidth * 0.0016, aa);
    float line = 1.0 - smoothstep(w * 0.7, w * 1.9, abs(d));
    col = mix(col, uOutlineColor, line);
  }

  if (uTransparent > 0.5) alpha = inside;
  outColor = vec4(col, alpha);
}`;

/* ------------------------------------------------------------------ *
 * 3D family — extruded silhouette, wireframe, coin
 * ------------------------------------------------------------------ */

const extrude = `
uniform float uDepth;
uniform float uCornerRadius;
uniform float uBevelSize;
uniform float uBevelDepth;
uniform vec3 uPhysicalColor;
uniform vec3 uSolidColor;
uniform vec3 uGlassColor;
uniform float uGlassIor;
uniform float uGlassRefraction;
uniform float uGlassDispersion;
uniform float uGlassFrost;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uMetalness;
uniform float uRoughness;
uniform float uLightAngle;

vec3 material(vec3 N, vec3 base) {
  float ang = radians(uLightAngle + sin(uTime) * 28.0);
  vec3 L = normalize(vec3(cos(ang) * 0.65, sin(ang) * 0.65, 0.55 + 0.45 * cos(uTime)));
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 R = reflect(-V, N);
  float diff = clamp(dot(N, L), 0.0, 1.0);
  vec3 env = envSample(R.xy * 1.2);
  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0);
  float spec = pow(clamp(dot(R, L), 0.0, 1.0), mix(64.0, 8.0, uRoughness));

  vec3 col = base * (0.28 + 0.85 * diff);
  col = mix(col, env * base * 1.4, uMetalness * 0.85);
  col += vec3(1.0) * spec * mix(1.0, 0.25, uRoughness) * (0.4 + uMetalness);
  col += env * fres * 0.35;
  return col;
}

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);

  // fake extrusion: march the silhouette backwards along the light vector
  float ang = radians(uLightAngle);
  vec2 dir = normalize(vec2(cos(ang), sin(ang)));
  float depth = uDepth * 0.06;
  float steps = 18.0;
  float best = -1.0;
  float sideShade = 0.0;
  for (float i = 0.0; i < 18.0; i++) {
    float t = i / steps;
    float dd = sdAt(uv - dir * depth * t);
    if (dd > best) { best = dd; sideShade = 1.0 - t; }
  }

  float front = smoothstep(0.0, 0.0015, d);
  float side = smoothstep(0.0, 0.0015, best) * (1.0 - front);
  float mask = max(front, side);
  if (mask <= 0.001) { outColor = vec4(0.0); return; }

  vec3 N = normalFromSdf(uv, 0.004);
  // bevel: bend the normal near the edge
  float bevel = 1.0 - smoothstep(0.0, max(uBevelSize, 0.001) * 4.0, d);
  N = normalize(mix(N, normalize(vec3(-dir * 0.8, 1.0)), bevel * clamp(uBevelDepth * 30.0, 0.0, 1.0)));

  vec4 logo = logoAt(uv);
  vec3 base;
  if (uMode < 0.5) base = uPhysicalColor * (0.6 + 0.6 * luma(logo.rgb));
  else if (uMode < 1.5) base = uSolidColor;
  else if (uMode < 2.5) base = mix(uColorA, uColorB, 0.5 + 0.5 * sin(d * 12.0 + uTime * 0.2));
  else if (uMode < 3.5) base = mix(uColorA, uColorC, clamp(uv.y, 0.0, 1.0));
  else base = uGlassColor;

  vec3 col = material(N, base);
  col *= mix(0.55, 1.0, sideShade * side + front);
  if (uMode > 4.5) {
    // glass mode: refraction tint + dispersion on the bevel
    vec3 refr = vec3(logoAt(uv + N.xy * 0.02 * uGlassRefraction).r,
                     logoAt(uv + N.xy * 0.02 * uGlassRefraction).g,
                     logoAt(uv + N.xy * 0.02 * (uGlassRefraction + uGlassDispersion * 0.4)).b);
    col = mix(col, refr * uGlassColor, 0.55 * uGlassRefraction);
    col += uColorB * bevel * 0.3 * uGlassIor;
  }
  if (uMode > 3.5) {
    // The glass face carries a reflection that travels as the light moves; a
    // clear material otherwise renders the same frame forever.
    float sheen = exp(-pow((fract(uTime * 0.13) - (uv.x * 0.85 + uv.y * 0.4)) * 4.0, 2.0));
    col += mix(uColorA, uColorC, uv.y) * sheen * 0.2;
  }
  outColor = vec4(col, mask);
}`;

const wireframe = `
uniform float uLineColorUnused;
uniform vec3 uLineColor;
uniform vec3 uEdgeColor;
uniform float uDepth;
uniform float uDensity;
uniform float uSimplification;
uniform float uLineWidth;
uniform float uOpacity;
uniform float uGlow;
uniform float uFill;
uniform float uTiltX;
uniform float uTiltY;
uniform float uPerspective;

void main() {
  vec2 uv = xform(vUv);
  float tiltX = radians(uTiltX);
  float tiltY = radians(uTiltY);
  vec2 warp = vec2(sin(uv.y * PI + uTime) * tiltY * 0.08, cos(uv.x * PI - uTime) * tiltX * 0.08);
  float d = sdAt(uv + warp);

  float edge = 1.0 - smoothstep(0.0, uLineWidth * 0.0015, abs(d));
  float contourLines = 1.0 - smoothstep(0.0, uLineWidth * 0.001, abs(fract(d * uDensity * 40.0) - 0.5) / max(uDensity, 0.01) * 0.02);
  contourLines *= smoothstep(0.0, 0.02, d);

  float fillMask = smoothstep(0.0, 0.002, d) * uFill;
  vec3 col = uLineColor * contourLines * 0.8 + uEdgeColor * edge;
  // A scan band travels up the mesh and lights the lines it crosses.
  float scan = exp(-pow((uv.y - uProgress) * 11.0, 2.0));
  col += uLineColor * scan * (edge * 0.9 + contourLines * 0.45);
  col += uLineColor * fillMask * 0.35;
  col += uLineColor * uGlow * 0.5 * exp(-abs(d) * 60.0);

  float a = clamp(max(edge, max(contourLines * 0.8, fillMask)), 0.0, 1.0) * uOpacity;
  outColor = vec4(col, a);
}`;

const coin = `
uniform float uCoinDepth;
uniform float uCornerRadiusC;
uniform float uBevel;
uniform float uBevelDepth;
uniform float uRoughness;
uniform float uLightStrength;
uniform float uLogoSize;
uniform float uReeding;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

void main() {
  vec2 uv = xform(vUv);
  vec2 p = uv - 0.5;
  float r = length(p) * 2.0;
  float ang = atan(p.y, p.x);

  float radius = 0.86;
  float disc = 1.0 - smoothstep(radius - 0.004, radius + 0.004, r);
  // 0 across the flat face, 1 at the milled edge.
  float rimBand = smoothstep(radius - 0.15, radius - 0.015, r);

  // reeded edge
  float reeding = 0.5 + 0.5 * sin(ang * (24.0 + uReeding * 120.0));
  float reed = rimBand * (0.5 + 0.5 * reeding);

  float logoScale = max(uLogoSize, 0.2);
  vec2 luv = (p / logoScale) + 0.5;
  float ld = sdAt(luv);
  float relief = smoothstep(-0.02, 0.02, ld);
  vec2 g = domeGrad(luv, 0.006);

  // A coin is a flat face with a raised rim, not a dome: the normal stays
  // near +Z across the face and only tips outward at the milled edge.
  vec2 radial = p / max(length(p), 0.0001);
  vec3 N = normalize(vec3(-g * 0.45 * relief + radial * rimBand * 1.5, 1.0));

  // The key light orbits the coin one full revolution per cycle, so the rim and relief catch it in turn.
  float lightAng = radians(35.0) + uTime;
  vec3 L = normalize(vec3(cos(lightAng), sin(lightAng), 0.9));
  float diff = clamp(dot(N, L), 0.0, 1.0);
  vec3 R = reflect(vec3(0.0, 0.0, -1.0), N);
  vec3 env = envSample(R.xy);
  float spec = pow(clamp(dot(R, L), 0.0, 1.0), mix(48.0, 6.0, uRoughness));

  // Rim sits a little proud of the face, so it catches more light.
  vec3 base = mix(uColorA, uColorB, 0.5 + 0.5 * diff);
  base = mix(base, uColorB * 1.15, reed * 0.35);
  vec3 col = base * (0.45 + 0.8 * diff) + env * base * 0.5 + vec3(1.0) * spec * 0.5 * uLightStrength;
  col = mix(col, uColorC, relief * 0.4);
  col += uColorB * relief * 0.18 * diff;

  // Inner face is slightly recessed relative to the rim.
  col *= 1.0 - (1.0 - rimBand) * 0.06;
  col *= 1.0 - rimBand * 0.1;

  float mask = disc * smoothstep(0.0, 0.002, disc);
  outColor = vec4(col, mask);
}`;

/* ------------------------------------------------------------------ *
 * Mockups
 * ------------------------------------------------------------------ */

const stickerPeel = `
uniform float uPeel;
uniform float uDirection;
uniform float uCurlRadius;
uniform float uRotation;
uniform float uBorderWidth;
uniform vec3 uBorderColor;
uniform vec3 uBackColor;
uniform float uPreserveColors;
uniform vec3 uLogoColor;
uniform float uHolographicIntensity;
uniform float uHolographicScale;
uniform float uHolographicAngle;

void main() {
  vec2 uv = xform(vUv);
  float ang = radians(uDirection);
  vec2 dir = vec2(cos(ang), sin(ang));
  vec2 p = uv - 0.5;
  float along = dot(p, dir);
  float peelT = clamp(uPeel / 100.0, 0.0, 1.0);

  // The curl lifts and settles a little, and the foil sheen travels across it.
  float peelEdge = 0.5 - peelT * 0.9 + 0.014 * sin(uTime * 1.1);
  float fold = smoothstep(peelEdge, peelEdge + 0.06, along);
  vec2 curled = uv - dir * fold * 0.12 * (1.0 - fold);

  float d = sdAt(curled);
  float border = max(uBorderWidth, 0.5) * 0.004;
  float mask = smoothstep(0.0, 0.0015, d + border);
  if (mask <= 0.001) { outColor = vec4(0.0); return; }

  vec3 col = uBorderColor;
  vec4 logo = logoAt(curled);
  vec3 art = mix(uLogoColor, logo.rgb, uPreserveColors);
  float inner = smoothstep(0.0, 0.0015, d);
  col = mix(col, art, inner * logo.a);

  float hang = smoothstep(0.0, 0.03, d) * 0.0 + fold;
  vec3 holo = 0.5 + 0.5 * cos(TAU * (dot(p, dir) * uHolographicScale * 3.0 + vec3(0.0, 0.33, 0.67) + uTime * 0.18));
  col = mix(col, holo, uHolographicIntensity * fold * 0.75);
  col *= 1.0 - fold * 0.35;
  col = mix(col, uBackColor, smoothstep(0.0, 0.5, fold) * 0.25);

  float shadow = smoothstep(-0.06, 0.0, sdAt(curled + dir * 0.02)) * (1.0 - mask);
  col *= 1.0 - shadow * 0.25;
  outColor = vec4(col, max(mask, shadow * 0.2));
}`;

const emboss = `
uniform float uEmbossDepth;
uniform float uBevel;
uniform float uTexture;
uniform float uTextureScale;
uniform float uLightAngle;
uniform float uLightStrength;
uniform float uShadow;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

void main() {
  vec2 uv = xform(vUv);
  float d = sdAt(uv);
  // A raking light sweeps the relief, which is the only way an emboss reads.
  float ang = radians(uLightAngle + sin(uTime * 0.6) * 18.0);
  vec2 L = vec2(cos(ang), sin(ang));
  float bevel = max(uBevel, 0.5) * 0.0035;

  // relief gradient: signed distance stepped along the light vector
  float h = smoothstep(-bevel, bevel, d);
  float hL = smoothstep(-bevel, bevel, sdAt(uv + L * bevel * 0.9));
  float relief = (h - hL) * uEmbossDepth * 2.2;

  vec3 base = uColorA;
  float grain = fbm(uv * 240.0 * max(uTextureScale, 0.2)) * uTexture;
  base *= 0.92 + grain * 0.35;

  vec3 col = base + uColorB * max(relief, 0.0) * uLightStrength + uColorC * max(-relief, 0.0) * 0.55;
  col *= 1.0 - smoothstep(0.0, bevel, -d) * 0.12;

  float shadowOff = uShadow;
  float sh = sdAt(uv + L * 0.012);
  col *= 1.0 - smoothstep(0.0, 0.03, -sh) * shadowOff * 0.8;

  float mask = smoothstep(0.0, 0.002, d);
  // paper/mockup surface continues past the logo for cut-out styles
  if (uMode < 0.5) {
    outColor = vec4(col, 1.0);
  } else {
    outColor = vec4(col, max(mask, 0.98));
  }
}`;

const appGlass = `
uniform float uLogoSize;
uniform float uCornerRadius;
uniform float uRefraction;
uniform float uSpecular;
uniform float uFresnel;
uniform float uDistortion;
uniform float uOpacity;
uniform float uSaturation;
uniform float uTintStrength;
uniform float uBrightness;
uniform float uShadowSpread;
uniform float uShadowOffsetY;
uniform float uBevelMode;
uniform float uAspectRatio;
uniform float uChromAberration;
uniform vec3 uLogoColor;
uniform vec3 uColorA;
uniform vec3 uColorB;

float sdRoundRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 uv = xform(vUv);
  vec2 p = (uv - 0.5) * vec2(uAspectRatio, 1.0);
  float size = 0.42;
  float d = sdRoundRect(p, vec2(size * uAspectRatio, size), uCornerRadius * size);

  float shadow = 1.0 - smoothstep(0.0, 0.02 + uShadowSpread * 0.01, d);
  float shadowMask = smoothstep(-0.02, 0.06, -sdRoundRect(p - vec2(0.0, uShadowOffsetY * 0.01), vec2(size * uAspectRatio, size), uCornerRadius * size));

  float tile = smoothstep(0.0, 0.002, -d);
  if (tile <= 0.001 && shadow <= 0.001) { outColor = vec4(0.0); return; }

  // glass body with refraction of the logo behind it; the refracted sample
  // drifts so the pane reads as glass over something alive
  float bevel = smoothstep(0.0, 0.12, -d);
  vec2 refr = (p / size) * uRefraction * 0.02 * bevel
            + vec2(sin(uTime * 0.55), cos(uTime * 0.42)) * 0.02 * bevel;
  vec2 luv = (p / max(uLogoSize, 0.2)) * 0.5 + 0.5 + refr;
  vec3 art;
  art.r = logoAt(luv + vec2(uChromAberration * 0.004, 0.0)).r;
  art.g = logoAt(luv).g;
  art.b = logoAt(luv - vec2(uChromAberration * 0.004, 0.0)).b;
  art *= uLogoColor;
  art = mix(vec3(luma(art)), art, 1.0 + uSaturation);
  art = (art - 0.5) * (1.0 + uBrightness) + 0.5;

  vec3 tint = mix(uColorA, uColorB, uv.y);
  vec3 col = mix(art, tint, uTintStrength * 0.6);
  col = mix(col, tint * 1.15, 0.18 + 0.22 * (1.0 - bevel));

  vec3 N = normalize(vec3((p / size) * 0.5, 0.6));
  float specAng = uTime * 0.7;
  float spec = pow(clamp(dot(N, normalize(vec3(-0.4 + 0.5 * sin(specAng), 0.7, 0.6))), 0.0, 1.0), 14.0) * uSpecular;
  col += vec3(1.0) * spec;
  float edgeLight = pow(1.0 - bevel, 2.0) * uFresnel;
  col += tint * edgeLight * 0.5;
  // A highlight crosses the tile as the light passes over the glass.
  float sheen = exp(-pow((fract(uTime * 0.13) - (p.x / size * 0.5 + 0.5)) * 4.0, 2.0));
  col += tint * sheen * 0.22;

  float a = tile * uOpacity;
  vec3 shadowCol = vec3(0.0);
  float sa = shadowMask * shadow * 0.35 * uOpacity;
  vec4 outv = vec4(col, a);
  outColor = vec4(mix(shadowCol, col, a), max(a, sa));
  outColor.rgb = mix(shadowCol, col, clamp(a / max(max(a, sa), 0.001), 0.0, 1.0));
}`;

const luminousGlass = `
uniform float uLogoSize;
uniform float uCornerRadius;
uniform float uGlowWidth;
uniform float uGlowStrength;
uniform float uRimWidth;
uniform float uRimBrightness;
uniform float uLightDirection;
uniform float uLightContrast;
uniform float uSurfaceOpacity;
uniform float uBackgroundOpacity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

float sdRoundRect2(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 uv = xform(vUv);
  vec2 p = uv - 0.5;
  float d = sdRoundRect2(p, vec2(0.4), uCornerRadius);

  float tile = smoothstep(0.0, 0.0015, -d);
  // The panel is lit from within: the diffused glow breathes.
  float glow = exp(-max(-d, 0.0) / max(uGlowWidth, 0.01)) * uGlowStrength * (0.82 + 0.18 * sin(uTime * 1.6));
  if (tile <= 0.001 && glow <= 0.002) { outColor = vec4(0.0); return; }

  vec2 luv = p / max(uLogoSize, 0.15) + 0.5;
  vec4 logo = logoAt(luv);
  vec3 art = mix(uColorC, logo.rgb, logo.a);

  vec3 col = mix(uColorA, art, tile);
  col += uColorB * glow * 0.55;
  float rim = 1.0 - smoothstep(0.0, uRimWidth, abs(d + uRimWidth * 0.5));
  col += uColorB * rim * uRimBrightness;

  float ang = radians(uLightDirection) + sin(uTime * 0.5) * 0.5;
  vec2 L = vec2(cos(ang), sin(ang));
  float dir = clamp(dot(normalize(p + 0.001), L) * 0.5 + 0.5, 0.0, 1.0);
  col *= mix(1.0, 0.75 + 0.55 * dir, uLightContrast);

  float a = clamp(tile * mix(1.0, uSurfaceOpacity, 1.0) + glow * 0.85, 0.0, 1.0);
  a = max(a, tile * uBackgroundOpacity);
  outColor = vec4(col, a);
}`;

const dock = `
uniform float uIconScale;
uniform float uIconGlass;
uniform float uSpacing;
uniform float uMagnification;
uniform vec3 uLogoTileColor;
uniform vec3 uLogoTileGradientStart;
uniform vec3 uLogoTileGradientEnd;
uniform vec3 uColorA;
uniform vec3 uColorB;

float sdRR(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 uv = xform(vUv);
  vec2 p = uv - 0.5;

  // wallpaper: soft radial sky
  float r = length(p);
  vec3 wall = mix(uColorA, uColorB, smoothstep(0.0, 0.75, r));
  wall *= 0.85 + 0.3 * fbm(uv * 2.5 + vec2(uTime * 0.04, uTime * 0.025));

  // dock shelf
  float shelf = sdRR(p - vec2(0.0, -0.28), vec2(0.42, 0.115), 0.1);
  float shelfMask = smoothstep(0.0, 0.002, -shelf);
  vec3 shelfCol = mix(vec3(0.9), vec3(0.65), smoothstep(-0.2, 0.2, p.y));
  shelfCol *= 0.75 + 0.35 * uIconGlass;

  // logo tile
  float tileSize = 0.115 * uIconScale;
  // The tile lifts and settles the way a dock icon does under the pointer.
  vec2 tileCenter = vec2(0.0, -0.05 + sin(uTime * 1.4) * 0.008 * (0.35 + uMagnification));
  float tile = sdRR(p - tileCenter, vec2(tileSize), tileSize * 0.28);
  float tileMask = smoothstep(0.0, 0.0015, -tile);
  vec3 tileCol = mix(uLogoTileGradientStart, uLogoTileGradientEnd, clamp(uv.y * 1.4 - 0.1, 0.0, 1.0));
  tileCol = mix(tileCol, uLogoTileColor, 0.25);
  vec4 logo = logoAt((p - tileCenter) / (tileSize * 1.55) + 0.5);
  tileCol = mix(tileCol, logo.rgb, logo.a * 0.9);

  // small satellite icons
  float sat = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec2 pos = vec2((fi - 1.5) * 0.115 * uSpacing, -0.28);
    float s = sdRR(p - pos, vec2(0.048), 0.014);
    sat = max(sat, smoothstep(0.0, 0.0015, -s));
  }
  vec3 satCol = mix(vec3(0.35), vec3(0.85), smoothstep(-0.35, -0.2, p.y));

  vec3 col = wall;
  col = mix(col, shelfCol, shelfMask * 0.75);
  col = mix(col, satCol, sat * 0.9);
  col = mix(col, tileCol, tileMask);
  float a = 1.0;
  outColor = vec4(col, a);
}`;

/* ------------------------------------------------------------------ *
 * Post-processing: the filter stack recovered from shader-filters-*.js
 * (exposure, contrast, saturation, grayscale, invert, grain, pixelate,
 *  blur, chromatic aberration, ordered dithering, vignette)
 * ------------------------------------------------------------------ */

export const POST_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform sampler2D uSource;
uniform vec2 uResolution;
uniform float uExposure;
uniform float uContrast;
uniform float uSaturation;
uniform float uGrayscale;
uniform float uInvert;
uniform float uGrain;
uniform float uPixelate;
uniform float uBlur;
uniform float uChromatic;
uniform float uDither;
uniform float uVignette;
// Recovered shaders work in linear light and only some of them encode their own
// output, so the post pass finishes the transfer curve when asked.
uniform float uEncode;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

float bayer4(vec2 p) {
  int x = int(mod(p.x, 4.0));
  int y = int(mod(p.y, 4.0));
  float m[16] = float[16](0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0,
                          3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);
  return m[y * 4 + x] / 16.0;
}

void main() {
  vec2 uv = vUv;
  if (uPixelate > 1.0) {
    uv = (floor(uv * uResolution / uPixelate) + 0.5) * uPixelate / uResolution;
  }

  vec4 col;
  if (uBlur > 0.05) {
    vec2 px = uBlur / uResolution;
    vec4 sum = vec4(0.0);
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        sum += texture(uSource, uv + vec2(float(x), float(y)) * px);
      }
    }
    col = sum / 9.0;
  } else {
    col = texture(uSource, uv);
  }

  if (uChromatic > 0.01) {
    vec2 off = vec2(uChromatic, 0.0) / uResolution;
    col.r = texture(uSource, uv + off).r;
    col.b = texture(uSource, uv - off).b;
  }

  vec3 c = col.rgb;
  c *= exp2(uExposure);
  c = (c - 0.5) * uContrast + 0.5;
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(vec3(l), c, uSaturation);
  c = mix(c, vec3(l), uGrayscale);
  c = mix(c, 1.0 - c, uInvert);

  if (uDither > 0.0) {
    float levels = max(uDither, 2.0);
    float t = bayer4(gl_FragCoord.xy);
    c = floor(c * levels + t) / levels;
  }

  c += (hash(uv * uResolution) - 0.5) * uGrain;

  if (uVignette > 0.0) {
    float v = smoothstep(0.35, 0.95, length(vUv - 0.5) * 1.55);
    c *= 1.0 - uVignette * v;
  }

  if (uEncode > 0.5) {
    c = mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
  }

  outColor = vec4(clamp(c, 0.0, 1.0), col.a);
}`;

/** effect key -> fragment body */
export const EFFECT_FRAGS: Record<string, string> = {
  liquidMetal,
  glass,
  holo,
  oilLens,
  neon,
  glitch,
  halftone,
  dither,
  ascii,
  stripes,
  sketch,
  heatmap,
  gemSmoke,
  pixelCartoon,
  led,
  particles,
  construction,
  extrude,
  wireframe,
  coin,
  stickerPeel,
  emboss,
  appGlass,
  luminousGlass,
  dock,
  none: `
void main() {
  vec2 uv = xform(vUv);
  vec4 c = logoAt(uv);
  outColor = c;
}`,
};

/**
 * Uniforms declared by the shared prelude. Effect bodies are allowed to mention
 * these (most of them read `uScale`/`uOffset` directly), but a second
 * declaration is a hard GLSL error, so duplicates are dropped at assembly time
 * rather than being hand-maintained in twenty-odd shader strings.
 */
const COMMON_UNIFORMS = new Set(
  [...COMMON.matchAll(/uniform\s+\w+\s+(\w+)\s*;/g)].map((m) => m[1]),
);

function stripCommonUniforms(body: string): string {
  return body.replace(/^[ \t]*uniform\s+\w+\s+(\w+)\s*;[ \t]*$/gm, (line, name: string) =>
    COMMON_UNIFORMS.has(name) ? '' : line,
  );
}

export function buildFragment(body: string): string {
  return `#version 300 es\n${COMMON}\n${stripCommonUniforms(body)}`;
}

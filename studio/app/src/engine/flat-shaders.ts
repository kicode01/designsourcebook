/**
 * GLSL recovered verbatim from the target application's renderer bundle.
 *
 * These are the *real* effect shaders, not reconstructions. The original app
 * ships a small number of programs and drives them with `uMode` plus three
 * packed `vec4` parameter blocks, so 40 catalogue entries collapse onto a
 * handful of fragment shaders:
 *
 *   FLAT      uMode 0..8 -> glass, holo, particles, led, pixelCartoon, neon,
 *                          luminousGlass, stripes, sketch
 *   HALFTONE  single mode; uShape selects circle/square/diamond/line/cross
 *   DITHER    4x4 Bayer threshold
 *   GLITCH    band/block displacement with channel split
 *
 * Bodies are GLSL ES 1.00 (`texture2D`, `gl_FragColor`); buildFlatFragment()
 * supplies the ES 3.00 prelude and the compatibility defines.
 */

/** 117-fragment-dc.glsl */
export const FLAT = `
uniform sampler2D uLogo;
uniform sampler2D uBlurWide;
uniform sampler2D uBlurNarrow;
uniform sampler2D uDistance;
uniform vec4 uDistanceLayout;
uniform float uDistancePad;
uniform float uDistanceRange;
uniform vec2 uResolution;
uniform vec2 uOverscan;
uniform vec2 uPixelLogoSize;
uniform float uTime;
uniform float uMode;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec4 uParams0;
uniform vec4 uParams1;
uniform vec4 uParams2;
uniform float uLogoAspect;


const float TAU = 6.28318530718;

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise2(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(cell), hash21(cell + vec2(1.0, 0.0)), f.x),
             mix(hash21(cell + vec2(0.0, 1.0)), hash21(cell + 1.0), f.x), f.y);
}

vec4 logoAt(vec2 p) {
  if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0) return vec4(0.0);
  return texture2D(uLogo, p);
}

float maskAt(vec2 p) { return logoAt(p).a; }

// A snapped cell coordinate jumps at its border. Use the unsnapped texel
// footprint so adjacent fragments in the same cell never select different mips.
vec4 pixelCellSample(vec2 p, vec2 uvPerPixel) {
  if (any(lessThan(p, vec2(0.0))) || any(greaterThan(p, vec2(1.0)))) return vec4(0.0);
  return textureGrad(uLogo, p, vec2(uvPerPixel.x, 0.0), vec2(0.0, uvPerPixel.y));
}

float neonDistanceAt(vec2 p) {
  vec2 lookup = (p * uDistanceLayout.zw + vec2(uDistancePad)) / uDistanceLayout.xy;
  if (any(lessThan(lookup, vec2(0.0))) || any(greaterThan(lookup, vec2(1.0)))) return uDistanceRange;
  vec4 packed = texture2D(uDistance, lookup);
  return ((packed.r + packed.g / 255.0) * 2.0 - 1.0) * uDistanceRange;
}

void main() {
  vec2 uv = (vUv - 0.5) * uOverscan + 0.5;
  vec2 px = max(abs(vec2(dFdx(uv.x), dFdy(uv.y))), vec2(0.000001));
  vec4 logo = logoAt(uv);
  float a = logo.a;
  vec3 color = uColorA;
  float alpha = 0.0;

  if (uMode < 0.5) {
    // Frosted glass: blur the logo coverage for a continuous white-to-blue transition.
    float width = uParams0.x;
    // The recovered body has no time term here, so the frost sits still. The
    // refraction noise drifts and the key light sweeps, which is what makes a
    // frosted pane read as glass rather than a still.
    float refracted = noise2(uv * 2.8 + vec2(0.13 + uTime * 0.11, -0.1 + uTime * 0.07)) - 0.5;
    vec2 glassUv = uv + vec2(refracted, noise2(uv * 2.8 + 7.4 - uTime * 0.09) - 0.5) * uParams0.z * width * 0.12;
    float validUv = step(0.0, glassUv.x) * step(glassUv.x, 1.0) * step(0.0, glassUv.y) * step(glassUv.y, 1.0);
    float softCoverage = texture2D(uBlurWide, glassUv).r * validUv;
    float edgeCoverage = texture2D(uBlurNarrow, glassUv).r * validUv;
    float angle = radians(uParams1.y) + sin(uTime * 0.45) * 0.55;
    vec2 lightDirection = vec2(cos(angle), sin(angle));
    float directional = clamp(0.5 + dot(uv - 0.5, lightDirection) * 0.65, 0.0, 1.0);
    float depth = uParams0.w;
    float shade = clamp(0.18 + (1.0 - uv.y) * 0.55 + refracted * uParams0.z * 0.25, 0.0, 1.0);
    color = mix(uColorA, uColorC, shade * depth * 0.45);
    color += vec3(refracted * uParams0.z * 0.035);
    float frost = (1.0 - softCoverage) * uParams0.y * 1.55 * (0.93 + directional * 0.07);
    float edgeLight = (1.0 - edgeCoverage) * uParams1.x * 0.46;
    color = mix(color, uColorB, clamp(frost + edgeLight, 0.0, 1.0));
    // A broad highlight crosses the pane as the light passes over it.
    float sheen = exp(-pow((fract(uTime * 0.12) - (uv.x + uv.y * 0.45) * 0.5) * 5.0, 2.0));
    color += uColorB * sheen * (0.06 + uParams0.y * 0.12);
    float halo = softCoverage * (1.0 - a) * uParams1.z;
    color = mix(color, uColorB, halo * 0.7);
    alpha = clamp(a * uParams1.w + halo * 0.12, 0.0, 1.0);
  } else if (uMode < 1.5) {
    // Holographic foil: angle-sensitive bands, light sweep, micro texture.
    float angle = radians(uParams0.y);
    float axis = dot(uv - 0.5, vec2(cos(angle), sin(angle)));
    float band = 0.5 + 0.5 * sin(axis * uParams0.x * TAU + uTime);
    float secondBand = 0.5 + 0.5 * sin(axis * uParams0.x * TAU * 0.63 - uTime + 1.7);
    vec3 foil = mix(uColorA, uColorB, band);
    foil = mix(foil, uColorC, secondBand * uParams0.z * 0.7);
    float sweep = pow(max(0.0, 1.0 - abs(fract(axis * 0.65 + uTime / TAU) - 0.5) * 5.0), 2.0);
    float texture = noise2(uv * 220.0) - 0.5;
    float sparkle = step(0.985 - uParams1.y * 0.055, hash21(floor(uv * uResolution.xy * 0.4))) * (0.5 + 0.5 * sin(uTime + axis * 40.0));
    color = mix(mix(uColorA, uColorB, 0.5), foil, uParams0.z);
    color = (color + vec3(sweep * uParams0.w * 0.55 + sparkle * uParams1.y * 0.75)) * uParams1.z;
    color *= 1.0 + texture * uParams1.x * 0.45;
    alpha = a * uParams1.w;
  } else if (uMode < 2.5) {
    // Particles sample the logo once per cell, then move within that cell.
    float spacing = max(2.0, uParams0.x * min(uResolution.x, uResolution.y) / 600.0);
    vec2 grid = gl_FragCoord.xy / spacing;
    vec2 cell = floor(grid);
    vec2 local = fract(grid) - 0.5;
    vec2 centerDelta = ((cell + 0.5) * spacing - gl_FragCoord.xy) * px;
    float sampled = maskAt(uv + centerDelta);
    float random = hash21(cell);
    vec2 scatter = (vec2(random, hash21(cell + 17.3)) - 0.5) * uParams0.z * 0.7;
    vec2 motion = vec2(sin(uTime + random * TAU), cos(uTime + random * TAU)) * uParams0.w * 0.17;
    vec2 offset = local - scatter - motion;
    float shape = mix(length(offset), max(abs(offset.x), abs(offset.y)), uParams1.z);
    float radius = uParams0.y * (0.74 + 0.26 * random);
    float particle = 1.0 - smoothstep(radius - 0.06, radius + 0.04, shape);
    float glow = 1.0 - smoothstep(radius, radius + 0.27, shape);
    float twinkle = 1.0 - uParams1.x * 0.55 * (0.5 + 0.5 * sin(uTime * 2.0 + random * TAU));
    alpha = sampled * clamp(particle + glow * uParams1.x * 0.25, 0.0, 1.0) * twinkle * (1.0 - uParams1.y * random * 0.6);
    color = mix(uColorA, uColorB, random * uParams1.w);
    color = mix(color, uColorC, pow(max(particle, 0.0), 4.0) * uParams1.x * 0.6);
  } else if (uMode < 3.5) {
    // LED matrix: rotated lamp grid with individually sampled logo cells.
    float angle = radians(uParams1.y);
    float cs = cos(angle);
    float sn = sin(angle);
    vec2 centered = gl_FragCoord.xy - uResolution * 0.5;
    float spacing = max(3.0, uParams0.x * min(uResolution.x, uResolution.y) / 600.0);
    vec2 rotated = vec2(cs * centered.x + sn * centered.y, -sn * centered.x + cs * centered.y) / spacing;
    vec2 local = fract(rotated) - 0.5;
    vec2 gridDelta = local * spacing;
    vec2 screenDelta = vec2(cs * gridDelta.x - sn * gridDelta.y, sn * gridDelta.x + cs * gridDelta.y);
    vec2 cellUv = uv - screenDelta * px;
    float cellMask = maskAt(cellUv);
    float random = hash21(floor(rotated));
    float scan = 1.0 - uParams0.w * 0.55 * (0.5 + 0.5 * sin(uTime * 2.0 + rotated.y * 0.18));
    float flicker = 1.0 - uParams1.x * 0.65 * (0.5 + 0.5 * sin(uTime * 3.0 + random * TAU));
    float radius = length(local);
    float led = 1.0 - smoothstep(uParams0.y - 0.05, uParams0.y + 0.04, radius);
    float halo = 1.0 - smoothstep(uParams0.y, uParams0.y + 0.25, radius);
    alpha = cellMask * clamp(led * scan * flicker + halo * uParams0.z * 0.25 + uParams1.z * 0.22, 0.0, 1.0);
    color = mix(uColorA, uColorB, (1.0 - scan * flicker) * 0.48);
    color = mix(color, uColorC, halo * uParams0.z * uParams1.w * 0.42);
  } else if (uMode < 4.5) {
    // Pixel cartoon: sample at cell centers, add a blocky silhouette and cel-shaded colors.
    float spacing = max(2.0, uParams0.x * min(uResolution.x, uResolution.y) / 600.0);
    vec2 cell = floor(gl_FragCoord.xy / spacing);
    vec2 uvPerPixel = 1.0 / uPixelLogoSize;
    vec2 centerUv = 0.5 + ((cell + 0.5) * spacing - 0.5 * uResolution) * uvPerPixel;
    vec4 sampled = pixelCellSample(centerUv, uvPerPixel);
    float inside = step(0.5, sampled.a);
    vec2 outlineStep = spacing * uvPerPixel * max(uParams0.y, 0.01);
    float left = step(0.5, pixelCellSample(centerUv - vec2(outlineStep.x, 0.0), uvPerPixel).a);
    float right = step(0.5, pixelCellSample(centerUv + vec2(outlineStep.x, 0.0), uvPerPixel).a);
    float top = step(0.5, pixelCellSample(centerUv + vec2(0.0, outlineStep.y), uvPerPixel).a);
    float bottom = step(0.5, pixelCellSample(centerUv - vec2(0.0, outlineStep.y), uvPerPixel).a);
    float neighbors = max(max(left, right), max(top, bottom));
    float interiorEdge = inside * (1.0 - min(min(left, right), min(top, bottom)));
    float outline = step(0.01, uParams0.y) * max((1.0 - inside) * neighbors, interiorEdge * 0.75);
    float angle = radians(uParams1.y) + sin(uTime * 0.5) * 0.6;
    vec2 lightDirection = vec2(cos(angle), sin(angle));
    float light = clamp(0.58 + dot(centerUv - 0.5, lightDirection) * 0.8, 0.0, 1.0);
    float sourceLuma = dot(sampled.rgb, vec3(0.2126, 0.7152, 0.0722));
    light = clamp(light + (sourceLuma - 0.5) * 0.28 + (hash21(cell) - 0.5) * uParams1.z * 0.36, 0.0, 0.999);
    float steps = max(2.0, floor(uParams0.z + 0.5));
    float tone = floor(light * steps) / (steps - 1.0);
    color = mix(uColorA * 0.65, uColorA, tone);
    color = mix(color, uColorB, pow(tone, 2.0) * uParams1.x * 0.85);
    color = mix(color, uColorC, (1.0 - tone) * uParams0.w * 0.32);
    color = mix(color, uColorC, outline);
    alpha = max(inside, outline) * uParams1.w;
  } else if (uMode < 5.5) {
    // A padded signed distance field keeps the neon tube smooth at preview and export sizes.
    vec2 sourceSize = uDistanceLayout.zw;
    float sourcePerPixel = max(0.0001, 0.5 * (length(dFdx(uv) * sourceSize) + length(dFdy(uv) * sourceSize)));
    float distance = neonDistanceAt(uv) / sourcePerPixel * 600.0 / min(uResolution.x, uResolution.y);
    float fromEdge = abs(distance);
    float feather = max(fwidth(distance), 0.35 * 600.0 / min(uResolution.x, uResolution.y)) * mix(0.55, 1.75, uParams1.x);
    float halfWidth = uParams0.x * 0.5;
    float tube = 1.0 - smoothstep(halfWidth - feather, halfWidth + feather, fromEdge);
    float glowDistance = max(0.0, fromEdge - halfWidth);
    float nearHalo = exp(-pow(glowDistance / max(0.8, uParams0.y * 0.18), 2.0) * 0.8);
    float wideHalo = exp(-pow(glowDistance / max(1.0, uParams0.y), 2.0) * 2.5);
    float halo = clamp((nearHalo * 0.7 + wideHalo * mix(0.15, 0.55, uParams1.y)) * uParams0.z, 0.0, 1.0);
    vec3 light = mix(uColorC, uColorA, clamp(nearHalo * 0.75 + tube * 0.15, 0.0, 1.0));
    light = mix(light, uColorB * uParams0.w, tube * 0.92);
    // Gas in the tube pulses and a brighter slug travels the length of the mark.
    float pulse = 0.84 + 0.16 * sin(uTime * 2.3 - uv.y * 5.0 - uv.x * 2.0);
    light *= pulse;
    halo *= 0.9 + 0.1 * sin(uTime * 1.7);
    color = mix(uColorA * 0.24, light, clamp(halo + tube, 0.0, 1.0));
    float fill = step(distance, 0.0) * uParams1.z;
    alpha = clamp(max(tube, halo * 0.62) + fill * (1.0 - tube), 0.0, 1.0) * uParams1.w;
  } else if (uMode < 6.5) {
    // Analytic rounded glass tile: all rims and the inner diffusion share one
    // distance field, so radius changes cannot detach a highlight from the face.
    float angle = radians(uParams2.w);
    vec2 p = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * (uv - 0.5);
    float radius = clamp(uParams0.y, 0.02, 0.49);
    vec2 q = abs(p) - vec2(0.5 - radius);
    float distance = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
    float aa = max(fwidth(distance), 0.0001);
    float coverage = 1.0 - smoothstep(-aa, aa, distance);
    float inner = max(-distance, 0.0);
    // A smooth angular field avoids the interior seams of a box-SDF normal.
    vec2 n = normalize(p + vec2(0.000001));
    vec2 light = vec2(cos(radians(uParams1.z) + sin(uTime * 0.5) * 0.7), sin(radians(uParams1.z) + sin(uTime * 0.5) * 0.7));
    float lobe = pow(abs(dot(n, light)), 3.0);
    float distribution = mix(1.0, 0.28 + 0.92 * lobe, uParams1.w);
    float width = max(0.005, uParams0.z * distribution);
    // The diffused glow breathes, so the tile reads as a lit panel.
    float diffusion = exp(-pow(inner / width, 1.6)) * uParams0.w * (0.88 + 0.12 * sin(uTime * 1.5));
    float rim = exp(-pow(inner / max(uParams1.x, aa), 2.0));
    float rimLight = (0.45 + 0.55 * max(dot(n, normalize(vec2(-0.6, 0.8))), 0.0)) * uParams1.y;
    vec3 surface = mix(uColorA, uColorB, clamp(diffusion * 0.86, 0.0, 1.0));
    surface = mix(surface, mix(uColorB, vec3(1.0), 0.25), clamp(rim * rimLight, 0.0, 1.0));
    float grain = (hash21(floor((p + 0.5) * 1100.0)) - 0.5) * uParams2.z;
    surface = max(surface + grain * (0.1 + diffusion), vec3(0.0));

    // Contain any uploaded aspect ratio within the independently sized square tile.
    vec2 logoFit = vec2(min(1.0, uLogoAspect), min(1.0, 1.0 / max(uLogoAspect, 0.001)));
    vec2 logoUv = p / (max(uParams0.x, 0.01) * logoFit) + 0.5;
    vec2 sourceEdge = min(logoUv, 1.0 - logoUv);
    float sourceCoverage = smoothstep(0.0, max(fwidth(logoUv.x), fwidth(logoUv.y)), min(sourceEdge.x, sourceEdge.y));
    float ink = logoAt(logoUv).a * coverage * sourceCoverage;
    float surfaceAlpha = coverage * clamp(uParams2.x + diffusion * (1.0 - uParams2.x), 0.0, 1.0);
    alpha = ink + surfaceAlpha * (1.0 - ink);
    color = (uColorC * ink + surface * surfaceAlpha * (1.0 - ink)) / max(alpha, 0.00001);
    // Three's Color uniforms are linear; this standalone shader writes sRGB.
    color = mix(color * 12.92, 1.055 * pow(max(color, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), color));
  }

  if (uMode >= 6.5 && uMode < 7.5) {
    // Logo-local bands keep density and alignment identical at every output size.
    float count = max(2.0, floor(uParams0.x + 0.5));
    float width = clamp(uParams0.y / 100.0, 0.1, 0.9);
    float axis = mix(1.0 - uv.y, uv.x, step(0.5, uParams0.z));
    // Fit complete first and last bands when offset is zero.
    float phase = axis * (count - 1.0 + width) + (1.0 - width) * 0.5 + uParams0.w / 100.0 + uTime * 0.12;
    float distance = abs(fract(phase) - 0.5) - width * 0.5;
    float aa = max(fwidth(phase) * 0.5, 0.00001);
    alpha = a * (1.0 - smoothstep(-aa, aa, distance)) * uParams1.x;
    // Color uniforms are linear; the canvas expects sRGB.
    color = mix(uColorA * 12.92, 1.055 * pow(max(uColorA, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), uColorA));
  }

  if (uMode >= 7.5 && uMode < 8.5) {
    // Work in logo-local design pixels: marks stay fixed across preview/export.
    vec2 fit = vec2(min(1.0, uLogoAspect), min(1.0, 1.0 / max(uLogoAspect, 0.001)));
    vec2 p = uv * fit * 600.0;
    float rough = uParams0.w;
    vec2 wobble = vec2(noise2(p * 0.07 + uTime * 0.07), noise2(p * 0.07 + 31.4 + uTime * 0.05)) - 0.5;
    vec2 penUv = uv + wobble * rough * 2.2 / (fit * 600.0);
    float distance = neonDistanceAt(penUv) * 600.0 / max(uDistanceLayout.z, uDistanceLayout.w);
    float aa = max(fwidth(distance) * 0.65, 0.08);
    float pressure = 0.75 + 0.4 * noise2(p * 0.04 + 8.0);
    float halfWidth = uParams0.x * pressure * 0.5;
    float outline = 1.0 - smoothstep(halfWidth - aa, halfWidth + aa, abs(distance));
    float secondDistance = neonDistanceAt(penUv + vec2(1.2, -0.8) * rough / (fit * 600.0)) * 600.0 / max(uDistanceLayout.z, uDistanceLayout.w);
    float retrace = (1.0 - smoothstep(halfWidth * 0.55 - aa, halfWidth * 0.55 + aa, abs(secondDistance))) * uParams1.y;
    float angle = radians(uParams0.z);
    vec2 along = vec2(cos(angle), sin(angle));
    float across = dot(p, vec2(-along.y, along.x));
    float lengthwise = dot(p, along);
    float spacing = uParams0.y;
    float row = floor(across / spacing);
    float jitter = (hash21(vec2(row, 13.0)) - 0.5) * rough * spacing * 0.4;
    float wave = (noise2(vec2(lengthwise * 0.045, row * 3.7)) - 0.5) * rough * 2.2;
    wave += sin(lengthwise * 0.013 + hash21(vec2(row, 7.0)) * TAU + uTime * 0.8) * rough * 1.8;
    float phase = (across + jitter + wave) / spacing;
    float lineDistance = abs(fract(phase) - 0.5) * spacing;
    float hatchAA = max(fwidth(phase) * spacing * 0.6, 0.08);
    float hatch = 1.0 - smoothstep(halfWidth - hatchAA, halfWidth + hatchAA, lineDistance);
    float coverage = 1.0 - smoothstep(-aa, aa, distance);
    float pencil = 1.0 - uParams1.z * noise2(p * 2.1);
    alpha = max(max(outline, retrace), hatch * coverage * uParams1.x) * pencil * uParams1.w;
    color = mix(uColorA * 12.92, 1.055 * pow(max(uColorA, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), uColorA));
  }

  if (alpha < 0.002) discard;
  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
}
`;

/** 103-fragment-as.glsl */
export const RELIEF = `
uniform sampler2D uDistance;
uniform vec4 uLayout;
uniform vec2 uResolution;
uniform vec2 uLogoAspect;
uniform vec3 uSurface, uLogo, uAccent;
uniform float uTransparentBackground;
uniform float uMode, uSize, uDepth, uBevel, uLightAngle, uLightStrength;
uniform float uReliefMaterial, uReliefSign;
uniform float uTexture, uTextureScale, uShadow, uRotation;
uniform float uThreadAngle, uStitchLength, uIrregularity, uFoilScale;
uniform float uTime;
const float PI=3.14159265359;
float bell(float x){ return exp(-x*x); }
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
mat2 rot(float a){ return mat2(cos(a),-sin(a),sin(a),cos(a)); }
float distanceAt(vec2 p){
 vec2 uv=p/(uSize*1000.*uLogoAspect)+.5;
 vec2 texUV=(uv*uLayout.zw+vec2(192.))/uLayout.xy;
 vec4 sampleValue=texture2D(uDistance,clamp(texUV,.0001,.9999));
 float d=((sampleValue.r+sampleValue.g/255.)*2.-1.)*192.;
 float outside=length(max(abs(uv-.5)-.5,0.))*1024.;
 return max(d,outside>192.?outside:d)*uSize*1000./max(uLayout.z,uLayout.w);
}
float leather(vec2 p){
 vec2 cell=p*.15*uTextureScale,i=floor(cell),f=fract(cell); float a=10.,b=10.;
 for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){
 vec2 g=vec2(float(x),float(y)); vec2 r=g+vec2(hash(i+g),hash(i+g+17.))-f;
 float d=dot(r,r); if(d<a){b=a;a=d;}else if(d<b){b=d;}
 }
 return smoothstep(0.,.12,b-a)*.7+noise(p*.64)*.3;
}
float fabric(vec2 p){
 p*=uTextureScale;
 float a=sin((p.x+p.y*.18)*2.6),b=sin((p.y-p.x*.18)*2.6);
 float diagonal=sin((p.x+p.y)*.85);
 return a*.24+b*.24+diagonal*.3+noise(p*1.9)*.3;
}
float yarn(vec2 p){
 vec2 q=rot(uThreadAngle)*p*uTextureScale;
 q+=vec2(noise(p*.025),noise(p*.04+18.))*uIrregularity*2.;
 float row=floor(q.y/5.2);
 q.x+=hash(vec2(row,4.))*uStitchLength*.8;
 float across=pow(max(0.,cos(q.y*PI*2./5.2+noise(q*.14)*uIrregularity)),.6);
 float stitch=pow(max(0.,sin(fract(q.x/uStitchLength)*PI)),.6);
 float twist=sin(q.x*3.8+q.y*6.1)*.12;
 return across*stitch+twist;
}
float sealRadius(vec2 p){ float a=atan(p.y,p.x);return 335.+uIrregularity*(sin(a*5.+1.)*13.+sin(a*9.)*7.+cos(a*13.)*4.); }
float heightAt(vec2 p){
 float d=distanceAt(p), edge=(1.-smoothstep(-uBevel,uBevel,d));
 if(uMode<2.5){
  if(uMode<.5) return uReliefSign*uDepth*9.*(1.-smoothstep(-uBevel,0.,d));
  return uReliefSign*uDepth*7.*edge;
 }
 if(uMode<4.5) return uDepth*4.*(1.-smoothstep(-uBevel,1.,d));
 if(uMode<5.5) return uDepth*(8.*edge+2.3*yarn(p)*(1.-smoothstep(-2.,.5,d)));
 float r=length(p),boundary=sealRadius(p);
 float disc=(1.-smoothstep(boundary-12.,boundary+3.,r));
 float lip=exp(-pow((r-boundary+18.)/15.,2.));
 float stamp=(1.-smoothstep(-uBevel,1.,d));
 return disc*(uDepth*(9.+9.*lip+3.*stamp)+noise(p*.018)*uIrregularity*2.);
}
void main(){
 vec2 aspect=uResolution/min(uResolution.x,uResolution.y);
 vec2 p=rot(uRotation)*((vUv-.5)*aspect*1000.);
 float d=distanceAt(p);
 float aa=max(.65,fwidth(d));
 float mask=1.-smoothstep(-aa,aa,d);
 float stepSize=1.2;
 float h=heightAt(p);
 vec2 slope=vec2(heightAt(p+vec2(stepSize,0))-heightAt(p-vec2(stepSize,0)),heightAt(p+vec2(0,stepSize))-heightAt(p-vec2(0,stepSize)))/(2.*stepSize);
 vec2 lightDir=vec2(cos(uLightAngle+sin(uTime*.55)*.38),sin(uLightAngle+sin(uTime*.55)*.38));
 vec3 normal=normalize(vec3(-slope,1.));
 vec3 light=normalize(vec3(lightDir,1.25));
 float diffuse=dot(normal,light)-light.z;
 float fine=(noise(p*1.8*uTextureScale)-.5);
 float coarse=(noise(p*.22*uTextureScale)-.5);
 float grain=(fine*.14+coarse*.045)*uTexture;
 vec3 base=uSurface;
 float shade=max(.32,1.+diffuse*uLightStrength*.72);
 float shadow=0.;
 vec3 color;
 if(uMode<2.5){
  bool recessed=uReliefSign<0.;
  float contact=recessed ? mask*exp(-abs(d)/(7.+uDepth*9.)) : (1.-mask)*exp(-max(d,0.)/7.);
  shadow=contact*uShadow*(recessed?.35:.12);
  if(uReliefMaterial<.5){
   base=mix(uSurface,uLogo,mask*(recessed?.42:.28));
   color=base*(shade-shadow+grain)+uAccent*max(0.,diffuse)*(recessed?.48:.22);
  }else if(uReliefMaterial<1.5){
   base=mix(uSurface,uLogo,mask*.65);
   if(recessed) shadow=mask*exp(-abs(d)/10.)*uShadow*.25;
   color=base*(shade-shadow+(leather(p)-.5)*uTexture*.38+grain*.7)+uAccent*max(0.,diffuse)*.16;
  }else{
   base=mix(uSurface,uLogo,mask*.75);
   // A broad reflected strip crosses the sheet and bends at the bevel.
   vec3 view=normalize(vec3(-p/1000.,1.));
   vec3 reflected=reflect(-view,normal);
   float strip=dot(reflected.xy,lightDir);
   if(uReliefMaterial<3.5){
    bool brushed=uReliefMaterial<2.5;
    float finish=brushed ? noise(p*vec2(.026,.85)*uTextureScale)-.5 : fine;
    float reflection=bell((strip-.23)/(brushed?.25:.14));
    float glint=bell((strip+.48)/.08);
    color=base*(.68+diffuse*uLightStrength*.76-shadow+finish*uTexture*(brushed?.20:.025))
         +uAccent*(reflection*.48+glint*.21)*uLightStrength;
   }else{
    float glaze=pow(max(0.,dot(normal,normalize(light+view))),56.);
    color=base*(shade-shadow+grain*.24)+uAccent*glaze*.63*uLightStrength;
   }
  }
 }else if(uMode<4.5){
  vec2 reflection=rot(uLightAngle+uTime*.28)*p/1000.;
  float band=sin((reflection.x+reflection.y*.38)*uFoilScale*12.+noise(p*.003)*1.8);
  float micro=pow(max(0.,noise(p*2.)-.62)*2.64,3.)*uTexture;
  vec3 spectrum=.72+.28*cos(vec3(0.,2.094,4.188)+band*3.5+reflection.y*9.);
  vec3 foil=mix(spectrum,uLogo,.48);
  foil=mix(foil,uAccent,pow(max(0.,band),16.)*.42);
  foil=foil*(.85+diffuse*uLightStrength+grain*.8)+uAccent*micro*.4;
  shadow=exp(-max(d,0.)/3.)*(1.-mask)*uShadow*.16;
  color=mix(uSurface*(1.+grain-shadow),foil,mask);
 }else if(uMode<5.5){
  float weave=fabric(p);
  vec3 cloth=uSurface*(.86+weave*uTexture*.55+fine*.2*uTexture);
  float stitches=yarn(p);
  float glint=pow(max(0.,dot(normal,normalize(light+vec3(0,0,1)))),22.);
  float edgeThread=exp(-abs(d+1.)/3.)*(.55+.45*sin((p.x-p.y)*2.));
  vec3 thread=uLogo*(.79+diffuse*.72*uLightStrength+stitches*.18+(noise(p*3.)-.5)*uIrregularity*.35);
  thread+=uAccent*(glint*.23+edgeThread*.10)*uLightStrength;
  shadow=exp(-max(d,0.)/5.)*(1.-mask)*uShadow*.5;
  float fuzz=(noise(p*2.8)-.5)*uIrregularity*1.3;
  float fuzzyMask=1.-smoothstep(-aa,aa,d+fuzz);
  color=mix(cloth*(1.-shadow),thread,fuzzyMask);
 }else{
  float r=length(p),radius=sealRadius(p);
  float disc=1.-smoothstep(radius-1.,radius+1.,r);
  float spec=pow(max(0.,dot(normal,normalize(light+vec3(0,0,1)))),36.);
  vec3 wax=uLogo*(.8+diffuse*.85*uLightStrength+grain*.25);
  wax+=uAccent*spec*.25*uLightStrength;
  wax-=uLogo*exp(-abs(d)/6.)*mask*.12*uShadow;
  float castShadow=exp(-max(0.,r-radius)/12.)*uShadow*.3;
  color=mix(uSurface*(1.+grain-castShadow),wax,disc);
 }
 // A studio light travels across the sheet, so every finish catches a glint
 // even where the surface is flat and moving the key light changes nothing.
 float sweepPos=fract(uTime*.11)*1.9-.95;
 float sweep=bell((dot(vUv-.5,vec2(.88,.48))-sweepPos)/.38);
 color+=uAccent*sweep*.085*max(uLightStrength,.2);
 float vignette=1.-.12*dot((vUv-.5)*aspect,(vUv-.5)*aspect);
 float coverage=uMode>5.5?1.-smoothstep(sealRadius(p)-1.,sealRadius(p)+1.,length(p)):mask;
 gl_FragColor=vec4(max(color*vignette,vec3(0.)),uTransparentBackground > 0.5 ?coverage:1.);
}
`;

/** 106-fragment-anon.glsl */
export const HALFTONE = `
uniform sampler2D uLogo;
uniform vec3 uInk;
uniform float uDotSpacing;
uniform float uAngle;
uniform float uShading;
uniform float uShape;
uniform vec2 uResolution;
uniform vec2 uOverscan;
uniform float uTime;


void main() {
  float spacing = max(2.0, uDotSpacing * min(uResolution.x, uResolution.y) / 600.0);
  float cs = cos(uAngle);
  float sn = sin(uAngle);
  vec2 position = gl_FragCoord.xy - 0.5 * uResolution;
  vec2 grid = vec2(cs * position.x + sn * position.y,
                   -sn * position.x + cs * position.y) / spacing;
  vec2 local = fract(grid) - 0.5;
  vec2 gridOffset = local * spacing;
  vec2 screenOffset = vec2(cs * gridOffset.x - sn * gridOffset.y,
                           sn * gridOffset.x + cs * gridOffset.y);
  vec2 logoUv = (vUv - 0.5) * uOverscan + 0.5;
  vec2 sampleUv = logoUv - screenOffset * vec2(dFdx(logoUv.x), dFdy(logoUv.y));
  if (sampleUv.x < 0.0 || sampleUv.x > 1.0 || sampleUv.y < 0.0 || sampleUv.y > 1.0) discard;
  vec4 logo = texture2D(uLogo, sampleUv);
  if (logo.a < 0.002) discard;

  float luma = dot(logo.rgb, vec3(0.2126, 0.7152, 0.0722));
  float light = clamp(0.66 + 0.18 * (sampleUv.y - sampleUv.x)
    + 0.26 * sin(sampleUv.x * 6.2831853)
    // Screen angle: the printed light moves across the dot grid.
    + 0.13 * sin(uTime * 1.1 + grid.y * 0.9 + grid.x * 0.35), 0.08, 1.0);
  float coverage = logo.a * mix(1.0, light, uShading) * mix(1.0, luma, 0.45);
  if (coverage < 0.04) discard;
  float size = sqrt(clamp(coverage, 0.0, 1.0));
  vec2 p = abs(local);
  float distanceToShape;
  if (uShape < 0.5) {
    distanceToShape = length(local) - 0.49 * size;
  } else if (uShape < 1.5) {
    distanceToShape = max(p.x, p.y) - 0.48 * size;
  } else if (uShape < 2.5) {
    distanceToShape = (p.x + p.y - 0.49 * size) * 0.7071068;
  } else if (uShape < 3.5) {
    distanceToShape = p.y - 0.46 * coverage;
  } else {
    float arm = 0.47;
    float bar = 0.04 + 0.20 * coverage;
    distanceToShape = min(max(p.x - arm, p.y - bar), max(p.x - bar, p.y - arm));
  }
  float edge = max(fwidth(distanceToShape), 0.01);
  float alpha = 1.0 - smoothstep(-edge, edge, distanceToShape);
  if (alpha < 0.002) discard;
  gl_FragColor = vec4(uInk, alpha);
}
`;

/** 107-fragment-anon.glsl */
export const DITHER = `
uniform sampler2D uLogo;
uniform vec3 uInk;
uniform float uPixelSize;
uniform float uShading;
uniform float uTime;
uniform vec2 uResolution;


float bayer2(vec2 p) {
  if (p.y < 0.5) return p.x < 0.5 ? 0.0 : 2.0;
  return p.x < 0.5 ? 3.0 : 1.0;
}

float bayer4(vec2 p) {
  return 4.0 * bayer2(mod(p, 2.0)) + bayer2(floor(p / 2.0));
}

void main() {
  // Keep the grid at the same relative scale in the preview and export.
  float cellSize = max(1.0, uPixelSize * min(uResolution.x, uResolution.y) / 600.0);
  vec2 cell = floor(gl_FragCoord.xy / cellSize);
  vec2 centeredUv = vUv + (floor(gl_FragCoord.xy / cellSize) * cellSize + 0.5 * cellSize - gl_FragCoord.xy)
    * (vec2(dFdx(vUv.x), dFdy(vUv.y)));
  vec4 logo = texture2D(uLogo, centeredUv);
  if (logo.a < 0.002) discard;
  float luma = dot(logo.rgb, vec3(0.2126, 0.7152, 0.0722));
  float light = clamp(0.58 + 0.36 * (vUv.y - vUv.x)
    + 0.20 * sin(uTime + vUv.x * 6.2831853), 0.05, 1.0);
  float coverage = logo.a * mix(1.0, light, uShading) * mix(1.0, luma, 0.45);
  float threshold = (bayer4(mod(cell, 4.0)) + 0.5) / 16.0;
  if (coverage < threshold) discard;
  gl_FragColor = vec4(uInk, 1.0);
}
`;

/** 108-fragment-anon.glsl */
export const GLITCH = `
uniform sampler2D uLogo;
uniform vec3 uTint;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
uniform vec2 uTexel;
uniform float uDirection;
uniform float uShift;
uniform float uBands;
uniform float uSplit;
uniform float uBurstRate;
uniform float uBlockCount;
uniform float uJitter;
uniform float uPixelSize;
uniform float uTintMix;
uniform float uGlow;
uniform float uScanlineDensity;
uniform float uScanlineStrength;
uniform float uNoise;
uniform float uDropout;
uniform float uSeed;


float hash(vec2 value) {
  return fract(sin(dot(value, vec2(127.1, 311.7))) * 43758.5453);
}

vec4 logoAt(vec2 uv) {
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);
  return texture2D(uLogo, uv);
}

void main() {
  const float TAU = 6.28318530718;
  vec2 oriented = mix(vUv, vUv.yx, uDirection);
  float band = floor(oriented.y * max(uBands, 1.0));
  float bandRandom = hash(vec2(band, uSeed));
  // Time uses integer harmonics of one full turn, so preview and video join cleanly.
  float burst = smoothstep(0.62, 0.95, 0.5 + 0.5 * sin(uTime * uBurstRate + bandRandom * TAU));
  float block = floor(oriented.x * max(uBlockCount, 1.0));
  float blockRandom = hash(vec2(block + band * 31.0, uSeed + 13.37));
  float blockPulse = smoothstep(0.72, 0.96, 0.5 + 0.5 * sin(uTime * (uBurstRate + 1.0) + blockRandom * TAU));
  oriented.x += uShift * 0.11 * ((bandRandom * 2.0 - 1.0) * burst + uJitter * (blockRandom * 2.0 - 1.0) * blockPulse);
  oriented.y += uShift * uJitter * 0.012 * (blockRandom - 0.5) * blockPulse;
  vec2 uv = mix(oriented, oriented.yx, uDirection);
  if (uPixelSize > 1.0) {
    vec2 cell = uTexel * uPixelSize;
    uv = (floor(uv / cell) + 0.5) * cell;
  }

  vec4 logo = logoAt(uv);
  vec2 splitAxis = mix(vec2(1.0, 0.0), vec2(0.0, 1.0), uDirection);
  float splitDistance = 0.025 * uSplit * (0.35 + 0.65 * burst);
  float channelA = logoAt(uv + splitAxis * splitDistance).a;
  float channelB = logoAt(uv - splitAxis * splitDistance).a;
  float line = 0.5 + 0.5 * sin(vUv.y * uScanlineDensity * TAU + uTime * 4.0);
  float scan = 1.0 - uScanlineStrength * 0.58 * line;
  vec2 grainCell = floor(vUv / uTexel * 0.35);
  float grain = hash(grainCell + vec2(sin(uTime * 5.0), cos(uTime * 5.0)) * 17.0) - 0.5;
  float dropped = step(1.0 - uDropout * 0.55, hash(vec2(band, uSeed + 41.0))) * burst;

  vec3 color = mix(logo.rgb, uTint, uTintMix) * logo.a;
  color = (color + grain * uNoise * logo.a * 0.5) * scan * (1.0 - dropped * 0.9);
  float alpha = logo.a * (1.0 - dropped * 0.7);
  float splitAmount = uSplit * (0.2 + 0.8 * burst);
  color += (uColorA * channelA + uColorB * channelB) * splitAmount * 0.55;
  alpha = max(alpha, max(channelA, channelB) * splitAmount * 0.8);
  if (uGlow > 0.001) {
    float halo = max(max(logoAt(uv + splitAxis * 0.008).a, logoAt(uv - splitAxis * 0.008).a) - logo.a, 0.0);
    color += mix(uColorA, uColorB, 0.5) * halo * uGlow * 0.8;
    alpha = max(alpha, halo * uGlow * 0.7);
  }
  if (alpha < 0.003) discard;
  gl_FragColor = vec4(color / max(alpha, 0.001), alpha);
}
`;

/**
 * Compatibility prelude. `vUv` is redefined to the transformed coordinate
 * computed in the vertex stage, so the original bodies keep working unchanged
 * while still honouring the stage scale / rotation / offset controls.
 */
export function buildFlatFragment(body: string): string {
  return `#version 300 es
precision highp float;
precision highp int;
out vec4 outColor;
in vec2 vUvT;
#define vUv vUvT
#define texture2D texture
#define gl_FragColor outColor
` + body;
}

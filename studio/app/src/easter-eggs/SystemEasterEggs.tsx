import React, { useState, useMemo } from 'react';
import {
  Button,
  Glass,
  Input,
  Menu,
  SearchField,
  SegmentedControl,
  Slider,
  Switch,
  TabBar,
} from 'glisse';

export interface CatalogSystemData {
  slug: string;
  name: string;
  org?: string;
  style?: string;
  theme?: string;
  canvas: string;
  surface: string;
  text: string;
  muted: string;
  brand: string;
  border: string;
  radius: string;
  palette?: { name: string; value: string }[];
  type?: {
    name: string;
    fontFamily?: string;
    fontSize?: string;
    px?: number;
    fontWeight?: number | string;
    lineHeight?: number | string;
    letterSpacing?: string;
  }[];
  components?: {
    key: string;
    kind: string;
    backgroundColor?: string;
    textColor?: string;
    rounded?: string;
    padding?: string;
    border?: string;
    shadow?: string;
  }[];
}

/* ---------- SF-Symbol style crisp vector icons for Apple TabBar & Controls ---------- */
const SfSparkles = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
    <path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16z" />
  </svg>
);

const SfSliders = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="17" x2="20" y2="17" />
    <circle cx="9" cy="7" r="2.5" fill="currentColor" />
    <circle cx="15" cy="17" r="2.5" fill="currentColor" />
  </svg>
);

const SfSpatial = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M6.3 6.3a8 8 0 0 0 0 11.4" />
    <path d="M17.7 6.3a8 8 0 0 1 0 11.4" />
    <path d="M3.5 3.5a12 12 0 0 0 0 17" />
    <path d="M20.5 3.5a12 12 0 0 1 0 17" />
  </svg>
);

const SfLens = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12a4 4 0 0 1 4-4" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const SfPlay = (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M6.5 4.8a1 1 0 0 1 1.52-.85l8 5.2a1 1 0 0 1 0 1.7l-8 5.2A1 1 0 0 1 6.5 15.2V4.8z" />
  </svg>
);

const SfSun = (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="10" cy="10" r="3.5" />
    <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4" />
  </svg>
);

type AppleSceneId = 'tahoe' | 'ios26' | 'spatial' | 'hig';

const APPLE_SCENES: Record<
  AppleSceneId,
  {
    label: string;
    theme: 'dark' | 'light';
    subtitle: string;
    bgCss: string;
    orbA: string;
    orbB: string;
    orbC: string;
    watermark: string;
    subWatermark: string;
  }
> = {
  tahoe: {
    label: 'Tahoe Dark',
    theme: 'dark',
    subtitle: 'macOS Tahoe 26 · Nocturne refractive wallpaper with Snell-bezel dispersion',
    bgCss: 'linear-gradient(135deg, #070b19 0%, #131b3a 38%, #2a173b 72%, #0c1021 100%)',
    orbA: 'radial-gradient(circle, rgba(0, 145, 255, 0.72) 0%, rgba(0, 145, 255, 0) 70%)',
    orbB: 'radial-gradient(circle, rgba(255, 94, 58, 0.65) 0%, rgba(255, 94, 58, 0) 70%)',
    orbC: 'radial-gradient(circle, rgba(48, 209, 88, 0.5) 0%, rgba(48, 209, 88, 0) 70%)',
    watermark: 'Liquid Glass',
    subWatermark: 'OPTICAL REFRACTION · SNELL BEZEL · CHROMATIC DISPERSION · SPRING LENSING',
  },
  ios26: {
    label: 'iOS 26 Light',
    theme: 'light',
    subtitle: 'iOS 26 Daylight · Lifted lenses drop under labels & cast calibrated daylight shadows',
    bgCss: 'linear-gradient(135deg, #e8f1ff 0%, #f5efff 45%, #ffe9df 100%)',
    orbA: 'radial-gradient(circle, rgba(0, 122, 255, 0.44) 0%, rgba(0, 122, 255, 0) 70%)',
    orbB: 'radial-gradient(circle, rgba(255, 115, 76, 0.42) 0%, rgba(255, 115, 76, 0) 70%)',
    orbC: 'radial-gradient(circle, rgba(88, 86, 214, 0.36) 0%, rgba(88, 86, 214, 0) 70%)',
    watermark: 'iOS 26 Glass',
    subWatermark: 'DAYLIGHT LENS · UIKIT CAPSULE · REAL-TIME BACKDROP BENDING',
  },
  spatial: {
    label: 'visionOS',
    theme: 'dark',
    subtitle: 'visionOS Spatial Computing · Specular rim illumination & depth-aware glass panes',
    bgCss: 'linear-gradient(145deg, #121318 0%, #232028 48%, #151c24 100%)',
    orbA: 'radial-gradient(circle, rgba(100, 210, 255, 0.52) 0%, rgba(100, 210, 255, 0) 70%)',
    orbB: 'radial-gradient(circle, rgba(255, 214, 10, 0.38) 0%, rgba(255, 214, 10, 0) 70%)',
    orbC: 'radial-gradient(circle, rgba(191, 90, 242, 0.45) 0%, rgba(191, 90, 242, 0) 70%)',
    watermark: 'Spatial UI',
    subWatermark: 'SPECULAR RIM LIGHT · RUBBER-BAND PRESS · DEPTH OPTICS',
  },
  hig: {
    label: 'HIG Studio',
    theme: 'light',
    subtitle: 'Apple HIG Binary Surface (#f5f5f7 / #1d1d1f / #0071e3) with high-contrast refraction grid',
    bgCss: 'linear-gradient(180deg, #f5f5f7 0%, #e8e8ed 100%)',
    orbA: 'radial-gradient(circle, rgba(0, 113, 227, 0.32) 0%, rgba(0, 113, 227, 0) 70%)',
    orbB: 'radial-gradient(circle, rgba(29, 29, 31, 0.14) 0%, rgba(29, 29, 31, 0) 70%)',
    orbC: 'radial-gradient(circle, rgba(41, 151, 255, 0.28) 0%, rgba(41, 151, 255, 0) 70%)',
    watermark: 'SF Pro Display',
    subWatermark: 'PRECISION TYPOGRAPHY · 980PX CAPSULE · #0071E3 INTERACTIVE ACCENT',
  },
};

export interface AppleLiquidGlassStageProps {
  compact?: boolean;
  accentColor?: string;
  systemName?: string;
  defaultScene?: AppleSceneId;
}

export function AppleLiquidGlassStage({
  compact = false,
  accentColor = '#0088ff',
  systemName = 'Apple',
  defaultScene = 'tahoe',
}: AppleLiquidGlassStageProps) {
  const [sceneId, setSceneId] = useState<AppleSceneId>(defaultScene);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [textTab, setTextTab] = useState<string>('refraction');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [trueTone, setTrueTone] = useState<boolean>(true);
  const [spatialAudio, setSpatialAudio] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(true);
  const [glassBend, setGlassBend] = useState<number>(2.2);
  const [dispersion, setDispersion] = useState<number>(0.75);
  const [rimShine, setRimShine] = useState<number>(0.22);
  const [statusNote, setStatusNote] = useState<string>(
    'Hold & drag any TabBar, SegmentedControl, Switch, or Slider thumb to lift its optical lens.',
  );

  const scene = APPLE_SCENES[sceneId];
  const isLight = scene.theme === 'light';
  const fgColor = isLight ? '#1d1d1f' : '#ffffff';
  const mutedColor = isLight ? 'rgba(29, 29, 31, 0.66)' : 'rgba(235, 235, 245, 0.72)';

  const stageVars = {
    '--lg-glass-bend': String(trueTone ? glassBend : 0),
    '--lg-glass-dispersion': String(trueTone ? dispersion : 0),
    '--lg-rim-shine': String(rimShine),
    '--lg-fill': accentColor,
  } as React.CSSProperties;

  return (
    <div
      className="ds-glisse-stage"
      data-theme={scene.theme}
      style={{
        ...stageVars,
        position: 'relative',
        borderRadius: compact ? 16 : 20,
        overflow: 'hidden',
        color: fgColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        border: isLight ? '1px solid rgba(0,0,0,0.09)' : '1px solid rgba(255,255,255,0.12)',
        boxShadow: isLight
          ? '0 20px 50px rgba(0, 0, 0, 0.08)'
          : '0 24px 60px rgba(0, 0, 0, 0.45)',
      }}
    >
      {/* Refractive Backdrop (marked data-glisse-backdrop so glisse lenses bend this layer in real time) */}
      <div
        data-glisse-backdrop=""
        style={{
          position: 'absolute',
          inset: 0,
          background: scene.bgCss,
          overflow: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {/* Atmospheric Color Orbs */}
        <div
          style={{
            position: 'absolute',
            width: 520,
            height: 520,
            top: -140,
            left: -80,
            background: scene.orbA,
            filter: 'blur(18px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 480,
            height: 480,
            bottom: -160,
            right: -60,
            background: scene.orbB,
            filter: 'blur(20px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 420,
            height: 420,
            top: '22%',
            left: '36%',
            background: scene.orbC,
            filter: 'blur(24px)',
          }}
        />

        {/* High-contrast optical calibration lines & editorial watermark so refraction is immediately visible */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: isLight
              ? 'linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Ribbons of chromatic bands to make Snell bezel refraction & dispersion pop */}
        <div
          style={{
            position: 'absolute',
            left: '-5%',
            right: '-5%',
            top: '48%',
            height: 68,
            transform: 'rotate(-4deg)',
            background: isLight
              ? 'linear-gradient(90deg, rgba(0,113,227,0.22), rgba(255,56,60,0.22), rgba(52,199,89,0.22), rgba(88,86,214,0.22))'
              : 'linear-gradient(90deg, rgba(0,145,255,0.34), rgba(255,66,69,0.32), rgba(48,209,88,0.30), rgba(191,90,242,0.34))',
            filter: 'blur(8px)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: compact ? '22px 24px' : '28px 36px',
          }}
        >
          <div
            style={{
              fontSize: compact ? 64 : 96,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: isLight ? 'rgba(0, 0, 0, 0.085)' : 'rgba(255, 255, 255, 0.11)',
              whiteSpace: 'nowrap',
            }}
          >
            {scene.watermark}
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: isLight ? 'rgba(0, 0, 0, 0.22)' : 'rgba(255, 255, 255, 0.22)',
              textAlign: 'right',
            }}
          >
            {scene.subWatermark}
          </div>
        </div>
      </div>

      {/* Foreground Interactive Liquid Glass Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: compact ? '18px 20px' : '26px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: compact ? 16 : 20,
        }}
      >
        {/* Top Floating Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Glass
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: '#30d158',
                  boxShadow: '0 0 8px rgba(48, 209, 88, 0.8)',
                }}
              />
              <span>{systemName} · Liquid Glass</span>
              <code
                style={{
                  fontSize: 11,
                  padding: '1px 6px',
                  borderRadius: 999,
                  background: isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.12)',
                  fontWeight: 500,
                }}
              >
                glisse@0.6.0
              </code>
            </Glass>
            <span style={{ fontSize: 12, color: mutedColor }}>{scene.subtitle}</span>
          </div>

          {/* Authentic glisse SegmentedControl */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <SegmentedControl
              aria-label="Apple Wallpaper & Polarity"
              value={sceneId}
              onValueChange={(val) => {
                setSceneId(val as AppleSceneId);
                setStatusNote(`Switched backdrop to ${APPLE_SCENES[val as AppleSceneId].label}`);
              }}
              items={[
                { value: 'tahoe', label: 'Tahoe' },
                { value: 'ios26', label: 'iOS 26' },
                { value: 'spatial', label: 'Spatial' },
                { value: 'hig', label: 'HIG' },
              ]}
            />
          </div>
        </div>

        {/* Main 2-Column Interactive Liquid Glass Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: compact
              ? 'repeat(auto-fit, minmax(260px, 1fr))'
              : 'minmax(300px, 1.25fr) minmax(290px, 1fr)',
            gap: 16,
            alignItems: 'stretch',
          }}
        >
          {/* Left Pane: Hero Typography, Spotlight SearchField, Liquid Buttons & Morphing Menu */}
          <Glass
            style={{
              borderRadius: 24,
              padding: compact ? '20px' : '24px 26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: mutedColor,
                  }}
                >
                  {activeTab === 'overview' && 'Human Interface Guidelines · iOS 26 & macOS Tahoe'}
                  {activeTab === 'controls' && 'Interactive UIKit & AppKit Liquid Controls'}
                  {activeTab === 'spatial' && 'Spatial Audio & Dynamic Island Fluidity'}
                  {activeTab === 'physics' && 'Snell-Law Bezel Refraction & Chromatic Split'}
                </span>

                {/* Authentic glisse Morphing Menu */}
                <Menu
                  aria-label="Liquid Glass Actions"
                  items={[
                    {
                      label: 'Tahoe Dark Mode',
                      onSelect: () => {
                        setSceneId('tahoe');
                        setStatusNote('Activated macOS Tahoe Dark Mode');
                      },
                    },
                    {
                      label: 'iOS 26 Daylight Mode',
                      onSelect: () => {
                        setSceneId('ios26');
                        setStatusNote('Activated iOS 26 Daylight Mode');
                      },
                    },
                    {
                      label: 'Boost Optical Refraction',
                      onSelect: () => {
                        setTrueTone(true);
                        setGlassBend(3.4);
                        setDispersion(1.6);
                        setStatusNote('Boosted --lg-glass-bend to 3.4 & dispersion to 1.6');
                      },
                    },
                    'separator',
                    {
                      label: 'Reset Optical Defaults',
                      destructive: true,
                      onSelect: () => {
                        setTrueTone(true);
                        setGlassBend(2.2);
                        setDispersion(0.75);
                        setRimShine(0.22);
                        setStatusNote('Reset Liquid Glass physics to iOS 26.1 defaults');
                      },
                    },
                  ]}
                />
              </div>

              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: compact ? 28 : 36,
                  fontWeight: 600,
                  letterSpacing: '-0.024em',
                  lineHeight: 1.07,
                }}
              >
                {activeTab === 'overview' && 'Design that refracts reality.'}
                {activeTab === 'controls' && 'Tactile lensing under every finger.'}
                {activeTab === 'spatial' && 'Dimensional sound and light.'}
                {activeTab === 'physics' && 'Real-time SVG displacement optics.'}
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: 14.5,
                  lineHeight: 1.48,
                  letterSpacing: '-0.014em',
                  color: mutedColor,
                  maxWidth: '56ch',
                }}
              >
                {activeTab === 'overview' &&
                  'Apple’s Liquid Glass combines optical Snell-law rim refraction, chromatic dispersion, and spring-lifted magnification lenses with SF Pro’s tight optical tracking.'}
                {activeTab === 'controls' &&
                  'Press and hold any button for rubber-band spring stretch and cursor-tracked specular highlights, or drag across tabs and switches to lift their magnifying glass lens.'}
                {activeTab === 'spatial' &&
                  'Translucent surfaces dynamically sample the colors and typography behind them, maintaining hierarchy across iOS 26, iPadOS, macOS Tahoe, and visionOS.'}
                {activeTab === 'physics' &&
                  'Powered by glisse: a 256-sample bezel refraction curve bends R, G, and B rays at separate refractive indices while painting a high-DPI specular rim.'}
              </p>
            </div>

            {/* Authentic glisse SearchField */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <SearchField
                placeholder="Search Apple HIG tokens, SF Symbols, or Liquid Glass..."
                value={searchQuery}
                onValueChange={(v) => {
                  setSearchQuery(v);
                  if (v) setStatusNote(`Spotlight query: "${v}"`);
                }}
                style={{ maxWidth: '100%' }}
              />

              {/* Authentic glisse Buttons (glass, filled, tinted, destructive) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <Button
                  variant="filled"
                  tint="#0071e3"
                  onClick={() => setStatusNote('Triggered Apple Blue Primary CTA (--lg-button-fill: #0071e3)')}
                >
                  Continue
                </Button>
                <Button
                  icon={SfPlay}
                  onClick={() => {
                    setPlaying((p) => !p);
                    setStatusNote(playing ? 'Paused Spatial Audio preview' : 'Playing Spatial Audio preview');
                  }}
                >
                  {playing ? 'Spatial Playing' : 'Play Demo'}
                </Button>
                <Button
                  tint={isLight ? '#0066cc' : '#64d2ff'}
                  onClick={() => {
                    setSceneId((prev) => (prev === 'tahoe' ? 'ios26' : 'tahoe'));
                    setStatusNote('Toggled Daylight / Nocturne glass appearance');
                  }}
                >
                  Flip Polarity
                </Button>
                <Button
                  destructive
                  onClick={() => {
                    setSearchQuery('');
                    setGlassBend(2.2);
                    setDispersion(0.75);
                    setStatusNote('Cleared Spotlight & restored default optics');
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </Glass>

          {/* Right Pane: Control Center Switches & Live Optical Physics Sliders */}
          <Glass
            style={{
              borderRadius: 24,
              padding: compact ? '20px' : '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>
                Control Center · Optical Tuning
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  color: mutedColor,
                }}
              >
                Hold thumb to lens
              </span>
            </div>

            {/* 3 glisse Switches */}
            <div style={{ display: 'grid', gap: 10 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Optical Bezel Refraction</div>
                  <div style={{ fontSize: 11, color: mutedColor }}>Snell’s law n=1.5 rim displacement</div>
                </div>
                <Switch
                  aria-label="Optical Bezel Refraction"
                  checked={trueTone}
                  onCheckedChange={(v) => {
                    setTrueTone(v);
                    setStatusNote(`Optical Bezel Refraction ${v ? 'enabled' : ' bypassed'}`);
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Spatial Audio &amp; Dynamic Lensing</div>
                  <div style={{ fontSize: 11, color: mutedColor }}>120Hz ProMotion spring response</div>
                </div>
                <Switch
                  aria-label="Spatial Audio and Dynamic Lensing"
                  checked={spatialAudio}
                  onCheckedChange={(v) => {
                    setSpatialAudio(v);
                    setStatusNote(`Spatial Audio head tracking ${v ? 'active' : 'off'}`);
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Daylight Glass (iOS 26 Light)</div>
                  <div style={{ fontSize: 11, color: mutedColor }}>Drops lifted lens under labels</div>
                </div>
                <Switch
                  aria-label="Daylight Glass Mode"
                  checked={isLight}
                  onCheckedChange={(v) => {
                    setSceneId(v ? 'ios26' : 'tahoe');
                    setStatusNote(`Switched to ${v ? 'iOS 26 Light' : 'macOS Tahoe Dark'}`);
                  }}
                />
              </div>
            </div>

            {/* 2 glisse Sliders that live-control --lg-glass-bend and --lg-glass-dispersion */}
            <div style={{ display: 'grid', gap: 8, paddingTop: 4 }}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 11.5,
                    fontWeight: 500,
                    marginBottom: 2,
                  }}
                >
                  <span>Refraction Bend (<code>--lg-glass-bend</code>)</span>
                  <code style={{ fontSize: 11, color: mutedColor }}>{glassBend.toFixed(2)}</code>
                </div>
                <Slider
                  aria-label="Refraction Bend"
                  min={0}
                  max={4}
                  step={0.05}
                  value={glassBend}
                  onValueChange={(v) => setGlassBend(v)}
                />
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 11.5,
                    fontWeight: 500,
                    marginBottom: 2,
                  }}
                >
                  <span>Chromatic Dispersion (<code>--lg-glass-dispersion</code>)</span>
                  <code style={{ fontSize: 11, color: mutedColor }}>{dispersion.toFixed(2)}</code>
                </div>
                <Slider
                  aria-label="Chromatic Dispersion"
                  min={0}
                  max={2.5}
                  step={0.05}
                  value={dispersion}
                  onValueChange={(v) => setDispersion(v)}
                />
              </div>
            </div>
          </Glass>
        </div>

        {/* Bottom Dock: Icon TabBar + Text TabBar + Live Status Readout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {/* Icon TabBar (iOS 26 52px height mode) */}
            <TabBar
              aria-label="Apple Liquid Glass Sections"
              value={activeTab}
              onValueChange={(v) => {
                setActiveTab(v);
                setStatusNote(`Selected TabBar section: ${v}`);
              }}
              items={[
                { value: 'overview', label: 'Overview', icon: SfSparkles },
                { value: 'controls', label: 'Controls', icon: SfSliders },
                { value: 'spatial', label: 'Spatial', icon: SfSpatial },
                { value: 'physics', label: 'Optics', icon: SfLens },
              ]}
            />

            {/* Compact Pill TabBar (32px text mode) */}
            {!compact && (
              <TabBar
                aria-label="Optical Layer Mode"
                value={textTab}
                onValueChange={(v) => {
                  setTextTab(v);
                  if (v === 'refraction') {
                    setGlassBend(2.2);
                    setDispersion(0.75);
                  } else if (v === 'prism') {
                    setGlassBend(3.5);
                    setDispersion(2.0);
                  } else {
                    setGlassBend(0.8);
                    setDispersion(0.15);
                  }
                  setStatusNote(`Applied ${v} preset to Liquid Glass lenses`);
                }}
                items={[
                  { value: 'refraction', label: 'Standard' },
                  { value: 'prism', label: 'Deep Prism' },
                  { value: 'subtle', label: 'Subtle Frost' },
                ]}
              />
            )}
          </div>

          <Glass
            style={{
              padding: '7px 14px',
              borderRadius: 999,
              fontSize: 11.5,
              color: mutedColor,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: fgColor, fontWeight: 500 }}>Live Telemetry:</span>
            <span>{statusNote}</span>
          </Glass>
        </div>
      </div>
    </div>
  );
}

/* ---------- Individual Apple Component Token Specimen rendered with real glisse ---------- */
export function AppleGlisseTokenSpecimen({
  comp,
  index,
}: {
  comp: NonNullable<CatalogSystemData['components']>[number];
  index: number;
}) {
  const [checked, setChecked] = useState(true);
  const [seg, setSeg] = useState('pro');
  const [tab, setTab] = useState('mac');
  const [sliderVal, setSliderVal] = useState(68);

  const isDarkBg = index % 2 === 1 || /dark|tooltip/i.test(comp.key);
  const bgGradient = isDarkBg
    ? 'linear-gradient(135deg, #0b1124 0%, #1d1836 55%, #0d1b2a 100%)'
    : 'linear-gradient(135deg, #e6f0ff 0%, #f3eaff 55%, #ffe9e0 100%)';

  const renderControl = () => {
    const k = comp.key.toLowerCase();
    const kind = comp.kind.toLowerCase();

    if (kind === 'button') {
      if (k.includes('primary-blue')) {
        return (
          <Button variant="filled" tint="#0071e3">
            Continue
          </Button>
        );
      }
      if (k.includes('primary-dark')) {
        return (
          <Button variant="filled" tint="#1d1d1f">
            Apple Pay
          </Button>
        );
      }
      if (k.includes('pill-link')) {
        return <Button tint="#0071e3">Learn more ›</Button>;
      }
      if (k.includes('media')) {
        return <Button icon={SfPlay}>Spatial Audio</Button>;
      }
      return <Button>{comp.key.replace(/^button-/, '').replace(/-/g, ' ')}</Button>;
    }

    if (kind === 'input') {
      return <SearchField defaultValue="Apple Intelligence" style={{ maxWidth: 210 }} />;
    }

    if (kind === 'switch' || kind === 'checkbox') {
      return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Switch checked={checked} onCheckedChange={setChecked} aria-label={comp.key} />
          <span style={{ fontSize: 12.5, fontWeight: 500 }}>
            {checked ? 'Liquid On' : 'Off'}
          </span>
        </div>
      );
    }

    if (kind === 'select') {
      return (
        <SegmentedControl
          aria-label={comp.key}
          value={seg}
          onValueChange={setSeg}
          items={[
            { value: 'air', label: 'Air' },
            { value: 'pro', label: 'Pro' },
          ]}
        />
      );
    }

    if (kind === 'tabs' || kind === 'tab' || kind === 'nav') {
      return (
        <TabBar
          aria-label={comp.key}
          value={tab}
          onValueChange={setTab}
          items={[
            { value: 'mac', label: 'Mac' },
            { value: 'ipad', label: 'iPad' },
          ]}
        />
      );
    }

    if (kind === 'tooltip' || kind === 'modal') {
      return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Glass style={{ padding: '7px 13px', borderRadius: 14, fontSize: 12, fontWeight: 500 }}>
            AirPods Pro Connected
          </Glass>
          <Menu
            aria-label="Quick Menu"
            items={[
              { label: 'Noise Control' },
              { label: 'Spatialize Stereo' },
              'separator',
              { label: 'Disconnect', destructive: true },
            ]}
          />
        </div>
      );
    }

    if (kind === 'badge') {
      const isSuccess = k.includes('success');
      return (
        <Glass
          style={{
            padding: '5px 12px',
            borderRadius: 999,
            fontSize: 11.5,
            fontWeight: 600,
            color: isSuccess ? '#30d158' : undefined,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: isSuccess ? '#30d158' : '#0071e3',
            }}
          />
          {isSuccess ? 'Verified HIG' : 'Liquid Glass'}
        </Glass>
      );
    }

    if (kind === 'table') {
      return (
        <div style={{ width: '100%', maxWidth: 210 }}>
          <Slider value={sliderVal} onValueChange={setSliderVal} aria-label="Optical Scale" />
        </div>
      );
    }

    if (kind === 'icon') {
      return <Button icon={SfSun} aria-label="Display Brightness" />;
    }

    return (
      <Glass
        style={{
          padding: '10px 14px',
          borderRadius: 16,
          fontSize: 12,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ color: '#0071e3', display: 'inline-flex' }}>{SfSparkles}</span>
        <span>{comp.key}</span>
      </Glass>
    );
  };

  return (
    <div
      data-theme={isDarkBg ? 'dark' : 'light'}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 86,
        padding: '16px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: isDarkBg ? '#ffffff' : '#1d1d1f',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
      }}
    >
      <div
        data-glisse-backdrop=""
        style={{
          position: 'absolute',
          inset: 0,
          background: bgGradient,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 110,
            height: 110,
            borderRadius: '50%',
            top: -20,
            left: '15%',
            background: isDarkBg ? 'rgba(0, 145, 255, 0.45)' : 'rgba(0, 113, 227, 0.25)',
            filter: 'blur(12px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: '50%',
            bottom: -24,
            right: '14%',
            background: isDarkBg ? 'rgba(255, 94, 58, 0.4)' : 'rgba(255, 115, 76, 0.25)',
            filter: 'blur(12px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: isDarkBg ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.065)',
            userSelect: 'none',
          }}
        >
          Aa · HIG
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
        {renderControl()}
      </div>
    </div>
  );
}

/* ---------- Windows 98 (98.css) Interactive Easter Egg ---------- */
function Win98EasterEgg() {
  const [tab, setTab] = useState<'general' | 'minesweeper'>('minesweeper');
  const [revealed, setRevealed] = useState<Record<number, boolean>>({ 0: true, 1: true, 6: true });
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [flagMode, setFlagMode] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const mines = useMemo(() => new Set([4, 9, 14, 19]), []);
  const countAround = (idx: number) => {
    const r = Math.floor(idx / 5);
    const c = idx % 5;
    let n = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < 5 && nc >= 0 && nc < 5 && mines.has(nr * 5 + nc)) n++;
      }
    }
    return n;
  };

  const resetGame = () => {
    setRevealed({});
    setFlagged({});
    setGameOver(false);
  };

  const bevelOut =
    'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf';
  const bevelIn =
    'inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a';

  return (
    <div
      style={{
        background: '#008080',
        padding: '22px',
        borderRadius: 8,
        fontFamily: '"Pixelated MS Sans Serif", Tahoma, "MS Sans Serif", sans-serif',
        color: '#000',
        border: '1px solid #004d4d',
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          background: '#c0c0c0',
          boxShadow: bevelOut,
          padding: 3,
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            background: 'linear-gradient(90deg, #000080, #1084d0)',
            color: '#fff',
            padding: '3px 4px 3px 6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          <span>💻 Microsoft Windows 98 — Interactive Specimen (98.css)</span>
          <div style={{ display: 'flex', gap: 2 }}>
            {['_', '□', '×'].map((sym) => (
              <button
                key={sym}
                type="button"
                onClick={resetGame}
                style={{
                  width: 16,
                  height: 14,
                  background: '#c0c0c0',
                  boxShadow: bevelOut,
                  color: '#000',
                  fontSize: 10,
                  fontWeight: 700,
                  lineHeight: '12px',
                }}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
              {(['minesweeper', 'general'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  style={{
                    padding: '4px 10px',
                    background: '#c0c0c0',
                    boxShadow: tab === t ? bevelIn : bevelOut,
                    fontSize: 11,
                    fontWeight: tab === t ? 700 : 400,
                  }}
                >
                  {t === 'minesweeper' ? '💣 WinMine.exe' : '⚙️ System.ini'}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setFlagMode((f) => !f)}
                style={{
                  marginLeft: 'auto',
                  padding: '4px 8px',
                  background: '#c0c0c0',
                  boxShadow: flagMode ? bevelIn : bevelOut,
                  fontSize: 11,
                }}
              >
                🚩 Flag: {flagMode ? 'ON' : 'OFF'}
              </button>
            </div>

            {tab === 'minesweeper' ? (
              <div style={{ background: '#c0c0c0', boxShadow: bevelIn, padding: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                    padding: '4px 6px',
                    boxShadow: bevelIn,
                  }}
                >
                  <span style={{ background: '#000', color: '#ff0000', fontFamily: 'monospace', padding: '1px 6px', fontWeight: 700 }}>
                    004
                  </span>
                  <button
                    type="button"
                    onClick={resetGame}
                    style={{ width: 24, height: 24, background: '#c0c0c0', boxShadow: bevelOut, fontSize: 14 }}
                  >
                    {gameOver ? '😵' : '🙂'}
                  </button>
                  <span style={{ background: '#000', color: '#ff0000', fontFamily: 'monospace', padding: '1px 6px', fontWeight: 700 }}>
                    098
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 28px)', gap: 2, justifyContent: 'center' }}>
                  {Array.from({ length: 25 }, (_, i) => {
                    const isRev = revealed[i];
                    const isMine = mines.has(i);
                    const cnt = countAround(i);
                    const numColors = ['', '#0000ff', '#008000', '#ff0000', '#000080'];
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          if (gameOver) return;
                          if (flagMode) {
                            setFlagged((f) => ({ ...f, [i]: !f[i] }));
                            return;
                          }
                          if (isMine) setGameOver(true);
                          setRevealed((r) => ({ ...r, [i]: true }));
                        }}
                        style={{
                          width: 28,
                          height: 28,
                          background: isRev && isMine ? '#ff0000' : '#c0c0c0',
                          boxShadow: isRev ? 'inset 1px 1px #808080' : bevelOut,
                          fontSize: 12,
                          fontWeight: 700,
                          color: numColors[cnt] || '#000',
                        }}
                      >
                        {isRev ? (isMine ? '💣' : cnt || '') : flagged[i] ? '🚩' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ background: '#fff', boxShadow: bevelIn, padding: 10, fontSize: 11.5, lineHeight: 1.5 }}>
                <strong>Microsoft Windows 98 Second Edition</strong>
                <div>4.10.2222 A · 64.0 MB RAM</div>
                <div style={{ marginTop: 6 }}>Zero border-radius, dual 2px 3D bevels, and 11px MS Sans Serif pixel metrics.</div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10 }}>
            <fieldset style={{ border: '1px groove #dfdfdf', padding: 10, fontSize: 11.5 }}>
              <legend>Display Properties</legend>
              <div style={{ marginBottom: 6 }}>Desktop Surface: <code>#008080</code> (Teal)</div>
              <div style={{ marginBottom: 6 }}>Dialog 3D Face: <code>#c0c0c0</code> (Silver)</div>
              <div>Active Title Bar: <code>#000080 → #1084d0</code></div>
            </fieldset>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
              <button
                type="button"
                onClick={resetGame}
                style={{ padding: '4px 16px', background: '#c0c0c0', boxShadow: bevelOut, fontSize: 11, fontWeight: 700 }}
              >
                OK
              </button>
              <button
                type="button"
                onClick={resetGame}
                style={{ padding: '4px 14px', background: '#c0c0c0', boxShadow: bevelOut, fontSize: 11 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- NES.css 8-Bit Quest Interactive Easter Egg ---------- */
function NesCssEasterEgg() {
  const [coins, setCoins] = useState(12);
  const [hp, setHp] = useState(84);
  const [log, setLog] = useState('A wild CSS Specificity Boss appeared! Choose an 8-bit command.');

  return (
    <div
      style={{
        background: '#212529',
        color: '#ffffff',
        padding: 22,
        borderRadius: 4,
        border: '4px solid #ffffff',
        boxShadow: 'inset 0 0 0 4px #000000',
        fontFamily: '"Press Start 2P", "Courier New", monospace',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#f7d51d', fontWeight: 700 }}>★ NES.CSS 8-BIT ARCADE STAGE</div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 12 }}>
          <span style={{ color: '#f7d51d' }}>🪙 COINS × {String(coins).padStart(2, '0')}</span>
          <span style={{ color: '#92cc41' }}>♥ HP {hp}/100</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        <div style={{ background: '#000', border: '3px solid #fff', padding: 14 }}>
          <div style={{ fontSize: 11, color: '#209cee', marginBottom: 8 }}>QUEST DIALOG</div>
          <p style={{ margin: '0 0 12px', fontSize: 12, lineHeight: 1.6 }}>{log}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button
              type="button"
              onClick={() => {
                setCoins((c) => c + 1);
                setLog(`Bumped the ? Block! Collected +1 8-bit token (${coins + 1} total).`);
              }}
              style={{
                padding: '7px 12px',
                background: '#f7d51d',
                color: '#000',
                border: '3px solid #000',
                boxShadow: 'inset -3px -3px 0 #e59400',
                fontWeight: 700,
                fontSize: 11,
              }}
            >
              [?] PUNCH COIN BLOCK
            </button>
            <button
              type="button"
              onClick={() => {
                setHp((h) => Math.min(100, h + 16));
                setLog('Used #92cc41 Pixel Potion! Restored +16 HP.');
              }}
              style={{
                padding: '7px 12px',
                background: '#92cc41',
                color: '#000',
                border: '3px solid #000',
                boxShadow: 'inset -3px -3px 0 #4aa52e',
                fontWeight: 700,
                fontSize: 11,
              }}
            >
              ▶ HEAL
            </button>
            <button
              type="button"
              onClick={() => {
                setHp((h) => Math.max(12, h - 14));
                setCoins((c) => c + 5);
                setLog('Cast #e76e55 Fireball! Critical hit (+5 Coins).');
              }}
              style={{
                padding: '7px 12px',
                background: '#e76e55',
                color: '#fff',
                border: '3px solid #000',
                boxShadow: 'inset -3px -3px 0 #8c2022',
                fontWeight: 700,
                fontSize: 11,
              }}
            >
              ▶ FIREBALL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Linear / Raycast Keyboard-First ⌘K Easter Egg ---------- */
function CommandBarEasterEgg({ system }: { system: CatalogSystemData }) {
  const [q, setQ] = useState('');
  const [issues, setIssues] = useState([
    { id: 'DS-101', title: 'Implement sub-millisecond command menu transitions', status: 'In Progress', priority: 'Urgent' },
    { id: 'DS-104', title: 'Calibrate dark-mode hairline luminance borders (rgba 8%)', status: 'Todo', priority: 'High' },
    { id: 'DS-109', title: 'Verify keyboard-first focus rings & hotkey badges', status: 'Done', priority: 'Medium' },
  ]);

  const cycleStatus = (id: string) => {
    const order = ['Todo', 'In Progress', 'Done'];
    setIssues((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, status: order[(order.indexOf(it.status) + 1) % order.length] } : it,
      ),
    );
  };

  const filtered = issues.filter((it) => (it.id + ' ' + it.title).toLowerCase().includes(q.toLowerCase()));

  return (
    <div
      style={{
        background: '#0d0e11',
        color: '#f2f3f5',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <kbd
          style={{
            padding: '2px 6px',
            borderRadius: 5,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            fontSize: 11,
          }}
        >
          ⌘K
        </kbd>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Filter ${system.name} issues or type a command...`}
          style={{
            flex: 1,
            background: 'transparent',
            border: 0,
            outline: 'none',
            color: '#fff',
            fontSize: 13,
          }}
        />
        <span style={{ fontSize: 11, color: '#8a8f98' }}>Click any row to cycle status</span>
      </div>
      <div style={{ padding: 8, display: 'grid', gap: 4 }}>
        {filtered.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={() => cycleStatus(it.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              padding: '8px 12px',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: '#f2f3f5',
              textAlign: 'left',
              fontSize: 12.5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <code style={{ color: '#8a8f98', fontSize: 11.5 }}>{it.id}</code>
              <span>{it.title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontSize: 11,
                  padding: '2px 8px',
                  borderRadius: 999,
                  background:
                    it.status === 'Done'
                      ? 'rgba(48,209,88,0.16)'
                      : it.status === 'In Progress'
                        ? 'rgba(94,106,210,0.22)'
                        : 'rgba(255,255,255,0.08)',
                  color:
                    it.status === 'Done' ? '#30d158' : it.status === 'In Progress' ? '#8b95f6' : '#a1a1aa',
                }}
              >
                {it.status}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Material 3 Dynamic Color Morpher Easter Egg ---------- */
function MaterialYouEasterEgg() {
  const seeds = [
    { name: 'Iris', primary: '#6750A4', container: '#EADDFF', onContainer: '#21005D', surface: '#FEF7FF' },
    { name: 'Lagoon', primary: '#006874', container: '#97F0FF', onContainer: '#001F24', surface: '#F5FAFB' },
    { name: 'Moss', primary: '#386A20', container: '#B8F397', onContainer: '#072100', surface: '#F7FBF1' },
    { name: 'Terracotta', primary: '#9C4146', container: '#FFDADB', onContainer: '#400008', surface: '#FFF8F7' },
  ];
  const [idx, setIdx] = useState(0);
  const s = seeds[idx];

  return (
    <div
      style={{
        background: s.surface,
        color: s.onContainer,
        padding: 20,
        borderRadius: 28,
        border: `1px solid ${s.container}`,
        transition: 'all 240ms cubic-bezier(0.2, 0, 0, 1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7 }}>
            Material 3 Expressive · Dynamic Color Seed
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>
            Tonal Palette: {s.name} ({s.primary})
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {seeds.map((seed, i) => (
            <button
              key={seed.name}
              type="button"
              onClick={() => setIdx(i)}
              style={{
                padding: '7px 14px',
                borderRadius: i === idx ? 12 : 999,
                background: i === idx ? seed.primary : seed.container,
                color: i === idx ? '#ffffff' : seed.onContainer,
                fontWeight: 600,
                fontSize: 12,
                transition: 'all 200ms ease',
              }}
            >
              {seed.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Dispatcher for Catalog System Detail Views ---------- */
export function SystemEasterEggBanner({ system }: { system: CatalogSystemData }) {
  const slug = system.slug.toLowerCase();
  const [showGlassLab, setShowGlassLab] = useState(false);

  if (slug === 'apple') {
    return <AppleLiquidGlassStage systemName="Apple" accentColor="#0071e3" defaultScene="tahoe" />;
  }

  if (slug === 'fluent') {
    return <AppleLiquidGlassStage systemName="Microsoft Fluent 2" accentColor="#0078d4" defaultScene="ios26" />;
  }

  if (slug === '98css') {
    return <Win98EasterEgg />;
  }

  if (slug === 'nescss') {
    return <NesCssEasterEgg />;
  }

  if (slug === 'linear-app' || slug === 'raycast') {
    return <CommandBarEasterEgg system={system} />;
  }

  if (slug === 'material' || slug === 'google') {
    return <MaterialYouEasterEgg />;
  }

  return (
    <div style={{ marginTop: 12 }}>
      {!showGlassLab ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="pill-btn"
            onClick={() => setShowGlassLab(true)}
            style={{ fontSize: 11.5 }}
          >
            ✨ Preview {system.name} with Liquid Glass (glisse)
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11.5, opacity: 0.75 }}>
              Interactive Liquid Glass (<code>glisse</code>) specimen tinted with <strong>{system.name}</strong> ({system.brand})
            </span>
            <button type="button" className="pill-btn" onClick={() => setShowGlassLab(false)}>
              Close Liquid Glass Lab
            </button>
          </div>
          <AppleLiquidGlassStage
            compact
            systemName={system.name}
            accentColor={system.brand || '#0088ff'}
            defaultScene={system.theme === 'light' ? 'ios26' : 'tahoe'}
          />
        </div>
      )}
    </div>
  );
}

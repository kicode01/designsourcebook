import { useMemo, useState } from 'react';
import { FONT_OPTIONS, pickReadableFg } from '../../engine/dsEngine';
import { buildLockupSvg } from './logoMakerUtils';

interface LogoLockupBuilderProps {
  markInnerXml: string;
  defsXml: string;
  defaultBrandName: string;
  defaultTagline: string;
  primaryHex: string;
  accentHex: string;
  theme: 'dark' | 'light';
  onFlash: (msg: string) => void;
}

export function LogoLockupBuilder({
  markInnerXml,
  defsXml,
  defaultBrandName,
  defaultTagline,
  primaryHex,
  accentHex,
  theme,
  onFlash,
}: LogoLockupBuilderProps) {
  const [brandName, setBrandName] = useState<string>(defaultBrandName || 'Northwind');
  const [tagline, setTagline] = useState<string>(defaultTagline || 'Precision Vector Systems');
  const [layout, setLayout] = useState<'horizontal' | 'stacked' | 'badge'>('horizontal');
  const [surfaceMode, setSurfaceMode] = useState<'dark' | 'light' | 'brand'>(theme);
  const [fontId, setFontId] = useState<string>('allo-precision');
  const [fontWeight, setFontWeight] = useState<number>(700);
  const [trackingEm, setTrackingEm] = useState<number>(-0.02);
  const [markScale, setMarkScale] = useState<number>(1.0);
  const [gapPx, setGapPx] = useState<number>(18);
  const [textCase, setTextCase] = useState<'as-typed' | 'upper' | 'lower'>('as-typed');

  const displayBrand = useMemo(() => {
    if (textCase === 'upper') return brandName.toUpperCase();
    if (textCase === 'lower') return brandName.toLowerCase();
    return brandName;
  }, [brandName, textCase]);

  const colors = useMemo(() => {
    if (surfaceMode === 'light') {
      return { bg: '#ffffff', ink: '#09090b', muted: '#52525b', accent: primaryHex };
    }
    if (surfaceMode === 'brand') {
      const fg = pickReadableFg(primaryHex);
      return {
        bg: primaryHex,
        ink: fg,
        muted: fg === '#ffffff' ? 'rgba(255,255,255,0.75)' : 'rgba(9,9,11,0.72)',
        accent: accentHex,
      };
    }
    return { bg: '#0c0c0f', ink: '#fafafa', muted: '#a1a1aa', accent: primaryHex };
  }, [surfaceMode, primaryHex, accentHex]);

  const activeSvg = useMemo(
    () =>
      buildLockupSvg({
        layout,
        markInnerXml,
        defsXml,
        brandName: displayBrand,
        tagline,
        inkColor: colors.ink,
        mutedColor: colors.muted,
        bgColor: colors.bg,
        accentColor: colors.accent,
        fontWeight,
        trackingEm,
        markScale,
        gapPx,
      }),
    [layout, markInnerXml, defsXml, displayBrand, tagline, colors, fontWeight, trackingEm, markScale, gapPx],
  );

  const trioSvgs = useMemo(
    () => ({
      horizontal: buildLockupSvg({
        layout: 'horizontal',
        markInnerXml: markInnerXml.replace(/ds-mk-grad/g, 'ds-lk-h'),
        defsXml: defsXml.replace(/ds-mk-grad/g, 'ds-lk-h'),
        brandName: displayBrand,
        tagline,
        inkColor: colors.ink,
        mutedColor: colors.muted,
        bgColor: colors.bg,
        accentColor: colors.accent,
        fontWeight,
        trackingEm,
        markScale,
        gapPx,
      }),
      stacked: buildLockupSvg({
        layout: 'stacked',
        markInnerXml: markInnerXml.replace(/ds-mk-grad/g, 'ds-lk-s'),
        defsXml: defsXml.replace(/ds-mk-grad/g, 'ds-lk-s'),
        brandName: displayBrand,
        tagline,
        inkColor: colors.ink,
        mutedColor: colors.muted,
        bgColor: colors.bg,
        accentColor: colors.accent,
        fontWeight,
        trackingEm,
        markScale,
        gapPx,
      }),
      badge: buildLockupSvg({
        layout: 'badge',
        markInnerXml: markInnerXml.replace(/ds-mk-grad/g, 'ds-lk-b'),
        defsXml: defsXml.replace(/ds-mk-grad/g, 'ds-lk-b'),
        brandName: displayBrand,
        tagline,
        inkColor: colors.ink,
        mutedColor: colors.muted,
        bgColor: colors.bg,
        accentColor: colors.accent,
        fontWeight,
        trackingEm,
        markScale,
        gapPx,
      }),
    }),
    [markInnerXml, defsXml, displayBrand, tagline, colors, fontWeight, trackingEm, markScale, gapPx],
  );

  const exportLockupSvg = () => {
    const blob = new Blob([activeSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(brandName || 'brand').toLowerCase().replace(/\s+/g, '-')}-${layout}-lockup.svg`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    onFlash(`Exported ${layout} lockup SVG`);
  };

  const copyLockupSvg = () => {
    void navigator.clipboard.writeText(activeSvg);
    onFlash('Copied lockup SVG to clipboard');
  };

  const fontPreset = FONT_OPTIONS.find((f) => f.id === fontId) ?? FONT_OPTIONS[0];

  return (
    <div className="createx-lab-scroll" aria-label="Wordmark & Lockup Studio">
      <div className="createx-lab-header">
        <div>
          <span className="createx-lab-eyebrow">LOCKUP &amp; WORDMARK COMPOSER</span>
          <h2 className="createx-lab-title">Mark + Wordmark Lockup System</h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="ds-action-btn" onClick={copyLockupSvg}>
            Copy Lockup SVG
          </button>
          <button type="button" className="ds-action-btn is-primary" onClick={exportLockupSvg}>
            Export Lockup SVG
          </button>
        </div>
      </div>

      {/* Live Controls Bar */}
      <div className="createx-lockup-controls">
        <label className="createx-lockup-field">
          <span>Brand Wordmark</span>
          <input
            type="text"
            className="ds-text-input"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Brand name"
          />
        </label>
        <label className="createx-lockup-field">
          <span>Descriptor / Tagline</span>
          <input
            type="text"
            className="ds-text-input"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Optional tagline"
          />
        </label>
        <label className="createx-lockup-field">
          <span>Display Type Preset</span>
          <select
            className="ds-select-input"
            value={fontId}
            onChange={(e) => setFontId(e.target.value)}
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label} ({f.meta})
              </option>
            ))}
          </select>
        </label>
        <div className="createx-lockup-field">
          <span>Active Export Layout</span>
          <div className="page-segmented">
            {(
              [
                ['horizontal', 'Horizontal'],
                ['stacked', 'Stacked'],
                ['badge', 'Badge'],
              ] as const
            ).map(([id, lbl]) => (
              <button
                key={id}
                type="button"
                aria-pressed={layout === id}
                onClick={() => setLayout(id)}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sliders & Polarity Row */}
      <div className="createx-lockup-sliders">
        <div className="createx-lockup-field">
          <span>Surface Polarity</span>
          <div className="page-segmented">
            {(['dark', 'light', 'brand'] as const).map((sm) => (
              <button
                key={sm}
                type="button"
                aria-pressed={surfaceMode === sm}
                onClick={() => setSurfaceMode(sm)}
              >
                {sm === 'dark' ? 'Dark' : sm === 'light' ? 'Light' : 'Brand'}
              </button>
            ))}
          </div>
        </div>

        <div className="createx-lockup-field">
          <span>Case Style</span>
          <div className="page-segmented">
            {(
              [
                ['as-typed', 'Mixed'],
                ['upper', 'UPPER'],
                ['lower', 'lower'],
              ] as const
            ).map(([c, lbl]) => (
              <button
                key={c}
                type="button"
                aria-pressed={textCase === c}
                onClick={() => setTextCase(c)}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>

        <label className="createx-lockup-field">
          <span>Weight · {fontWeight}</span>
          <input
            type="range"
            min={500}
            max={800}
            step={100}
            value={fontWeight}
            onChange={(e) => setFontWeight(Number(e.target.value))}
          />
        </label>

        <label className="createx-lockup-field">
          <span>Tracking · {(trackingEm * 100).toFixed(0)}%</span>
          <input
            type="range"
            min={-0.06}
            max={0.14}
            step={0.01}
            value={trackingEm}
            onChange={(e) => setTrackingEm(Number(e.target.value))}
          />
        </label>

        <label className="createx-lockup-field">
          <span>Mark Scale · {Math.round(markScale * 100)}%</span>
          <input
            type="range"
            min={0.65}
            max={1.35}
            step={0.05}
            value={markScale}
            onChange={(e) => setMarkScale(Number(e.target.value))}
          />
        </label>

        <label className="createx-lockup-field">
          <span>Clearspace Gap · {gapPx}px</span>
          <input
            type="range"
            min={6}
            max={38}
            step={2}
            value={gapPx}
            onChange={(e) => setGapPx(Number(e.target.value))}
          />
        </label>
      </div>

      {/* 3-Card Lockup Specimen Grid */}
      <div
        className="createx-lockup-stage"
        style={{
          fontFamily: fontPreset.stack,
          fontVariationSettings: fontPreset.variation,
          fontFeatureSettings: fontPreset.features,
        }}
      >
        <div
          className={`createx-lockup-specimen is-wide ${layout === 'horizontal' ? 'is-selected' : ''}`}
          onClick={() => setLayout('horizontal')}
        >
          <div className="createx-lockup-card-top">
            <strong>Primary Horizontal Lockup</strong>
            <span>Navigation header, masthead &amp; documentation bar</span>
          </div>
          <div
            className="createx-lockup-svg-wrap"
            dangerouslySetInnerHTML={{ __html: trioSvgs.horizontal }}
          />
        </div>

        <div
          className={`createx-lockup-specimen ${layout === 'stacked' ? 'is-selected' : ''}`}
          onClick={() => setLayout('stacked')}
        >
          <div className="createx-lockup-card-top">
            <strong>Vertical Stacked Lockup</strong>
            <span>Hero splash, keynote title slide &amp; centered signage</span>
          </div>
          <div
            className="createx-lockup-svg-wrap"
            dangerouslySetInnerHTML={{ __html: trioSvgs.stacked }}
          />
        </div>

        <div
          className={`createx-lockup-specimen ${layout === 'badge' ? 'is-selected' : ''}`}
          onClick={() => setLayout('badge')}
        >
          <div className="createx-lockup-card-top">
            <strong>App Launcher &amp; Avatar Badge</strong>
            <span>iOS/macOS squircle tile, GitHub org &amp; social avatar</span>
          </div>
          <div
            className="createx-lockup-svg-wrap"
            dangerouslySetInnerHTML={{ __html: trioSvgs.badge }}
          />
        </div>
      </div>
    </div>
  );
}

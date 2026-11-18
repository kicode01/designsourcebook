import { useMemo } from 'react';
import { fontStyleFor, hexToOklch, pickReadableFg, resolveFontOption, wcagContrast } from '../../engine/dsEngine';
import { adaptSvgPaintForSurface } from '../../engine/svgPaint';
import type { Brand } from './brandMakerUtils';

interface BrandGuidelinesViewProps {
  brand: Brand;
  markSvg: string;
  markName: string;
  onExportHtmlBook: () => void;
  onCopyAiPrompt: () => void;
  onFlash: (msg: string) => void;
}

function fitGuidelinesSvg(svgText: string, inkHex: string, prefix: string): string {
  const adapted = adaptSvgPaintForSurface(svgText, inkHex, prefix);
  return adapted
    .replace(/\swidth="[^"]*"/i, ' width="100%"')
    .replace(/\sheight="[^"]*"/i, ' height="100%"');
}

export function BrandGuidelinesView({
  brand,
  markSvg,
  markName,
  onExportHtmlBook,
  onCopyAiPrompt,
  onFlash,
}: BrandGuidelinesViewProps) {
  const displayFont = resolveFontOption(brand.displayFont, 'display');
  const bodyFont = resolveFontOption(brand.bodyFont, 'body');
  const displayStyle = fontStyleFor(brand.displayFont, 'display');
  const bodyStyle = fontStyleFor(brand.bodyFont, 'body');

  const markAccent = useMemo(() => fitGuidelinesSvg(markSvg, brand.accent, 'bgv-acc-'), [markSvg, brand.accent]);
  const markWhite = useMemo(() => fitGuidelinesSvg(markSvg, '#ffffff', 'bgv-w-'), [markSvg]);
  const markBlack = useMemo(() => fitGuidelinesSvg(markSvg, '#09090b', 'bgv-b-'), [markSvg]);
  const markOnAccentFg = pickReadableFg(brand.accent) === '#ffffff' ? markWhite : markBlack;

  const misuseItems = [
    {
      id: 'stretch',
      rule: 'Do not stretch or distort aspect ratio',
      style: { transform: 'scaleX(1.52) scaleY(0.72)' },
      bg: '#141418',
      svg: markAccent,
    },
    {
      id: 'rotate',
      rule: 'Do not tilt or rotate at arbitrary angles',
      style: { transform: 'rotate(23deg)' },
      bg: '#141418',
      svg: markAccent,
    },
    {
      id: 'glow',
      rule: 'Do not add drop shadows or neon glows',
      style: { filter: `drop-shadow(0 0 12px #ff0055) drop-shadow(0 6px 8px #00ff99)` },
      bg: '#141418',
      svg: markWhite,
    },
    {
      id: 'clash',
      rule: 'Do not place on low-contrast or clashing fills',
      style: { opacity: 0.45 },
      bg: brand.accent,
      svg: markAccent,
    },
    {
      id: 'crop',
      rule: 'Do not crop or crowd the 1X clearspace zone',
      style: { transform: 'scale(1.65)' },
      bg: '#141418',
      svg: markAccent,
    },
    {
      id: 'recolor',
      rule: 'Do not apply off-palette rainbow colors',
      style: { filter: 'hue-rotate(145deg) saturate(3.5)' },
      bg: '#141418',
      svg: markAccent,
    },
  ];

  return (
    <div className="createx-lab-scroll" aria-label="Interactive Brand Guidelines Book">
      <div className="createx-lab-header">
        <div>
          <span className="createx-lab-eyebrow">
            OFFICIAL BRAND STANDARDS · {brand.voice.category.toUpperCase()} · EST. {brand.voice.foundedYear}
          </span>
          <h2 className="createx-lab-title">{brand.name} — Brand Identity Manual</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="ds-action-btn" onClick={onCopyAiPrompt}>
            Copy AI Brand Prompt
          </button>
          <button type="button" className="ds-action-btn is-primary" onClick={onExportHtmlBook}>
            Export Standalone HTML Book
          </button>
        </div>
      </div>

      <div className="createx-lab-grid">
        {/* 01. Brand Strategy & Voice Pillars */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>01 · Brand Positioning &amp; Voice Architecture</strong>
              <span>Verbal identity pillars, tone boundaries, and primary conversion copy</span>
            </div>
            <span className="createx-lab-badge">{brand.handle}</span>
          </header>
          <div className="bx-guide-voice-hero" style={{ borderColor: `${brand.accent}44` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: brand.accent, letterSpacing: '0.08em' }}>
              POSITIONING STATEMENT
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4, ...displayStyle }}>{brand.tagline}</div>
            <div className="bx-guide-pillars-row">
              {brand.voice.pillars.map((pil, idx) => (
                <span key={idx} className="bx-guide-pillar-chip">
                  0{idx + 1} · {pil}
                </span>
              ))}
            </div>
          </div>
          <div className="bx-guide-do-dont">
            <div className="bx-guide-do-card is-do">
              <strong>WE ARE (APPROVED TONE)</strong>
              <p>{brand.voice.weAre}</p>
            </div>
            <div className="bx-guide-do-card is-dont">
              <strong>WE ARE NOT (AVOID)</strong>
              <p>{brand.voice.weAreNot}</p>
            </div>
          </div>
        </section>

        {/* 02. Logo Polarity & Lockup Matrix */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>02 · Approved Logo Polarity Matrix</strong>
              <span>Surface-adapted vector masters across dark, light, brand accent, and 1-bit print</span>
            </div>
            <span className="createx-lab-badge">{markName}</span>
          </header>
          <div className="bx-guide-polarity-grid">
            <div className="bx-guide-polarity-cell" style={{ background: '#09090b', color: '#fafafa' }}>
              <div className="bx-guide-polarity-mark" dangerouslySetInnerHTML={{ __html: markAccent }} />
              <span>Primary Dark (#09090B)</span>
            </div>
            <div className="bx-guide-polarity-cell" style={{ background: '#ffffff', color: '#09090b' }}>
              <div className="bx-guide-polarity-mark" dangerouslySetInnerHTML={{ __html: markBlack }} />
              <span>Editorial Paper (#FFFFFF)</span>
            </div>
            <div
              className="bx-guide-polarity-cell"
              style={{ background: brand.accent, color: pickReadableFg(brand.accent) }}
            >
              <div className="bx-guide-polarity-mark" dangerouslySetInnerHTML={{ __html: markOnAccentFg }} />
              <span>Signal Accent ({brand.accent.toUpperCase()})</span>
            </div>
            <div className="bx-guide-polarity-cell" style={{ background: '#18181b', color: '#fafafa' }}>
              <div className="bx-guide-polarity-mark" dangerouslySetInnerHTML={{ __html: markWhite }} />
              <span>1-Bit Knock-Out Stamp</span>
            </div>
          </div>
        </section>

        {/* 03. Clearspace & Minimum Scale Specification */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>03 · Architectural Clearspace &amp; Minimum Scale</strong>
              <span>Maintain a minimum 1X exclusion perimeter (X = 25% of symbol height)</span>
            </div>
            <span className="createx-lab-badge">1X Rule</span>
          </header>
          <div className="bx-clearspace-stage">
            <div className="bx-clearspace-diagram">
              <span className="bx-cs-tag is-top">1X</span>
              <span className="bx-cs-tag is-bottom">1X</span>
              <span className="bx-cs-tag is-left">1X</span>
              <span className="bx-cs-tag is-right">1X</span>
              <div className="bx-clearspace-inner">
                <div className="bx-clearspace-mark" dangerouslySetInnerHTML={{ __html: markAccent }} />
              </div>
            </div>
            <div className="bx-minscale-col">
              <div className="bx-minscale-row">
                <div style={{ width: 44, height: 44 }} dangerouslySetInnerHTML={{ __html: markAccent }} />
                <div>
                  <strong>App &amp; Launcher</strong>
                  <span>Min 64×64px (@1x)</span>
                </div>
              </div>
              <div className="bx-minscale-row">
                <div style={{ width: 24, height: 24 }} dangerouslySetInnerHTML={{ __html: markAccent }} />
                <div>
                  <strong>UI Navigation Header</strong>
                  <span>Min 24×24px optical box</span>
                </div>
              </div>
              <div className="bx-minscale-row">
                <div style={{ width: 16, height: 16 }} dangerouslySetInnerHTML={{ __html: markAccent }} />
                <div>
                  <strong>Browser Favicon / Print</strong>
                  <span>Min 16×16px · 10mm physical</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04. Logo Misuse Guardrails (6 Visual "Do Not" Cards) */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>04 · Logo Misuse &amp; Integrity Guardrails</strong>
              <span>Never alter geometry, proportions, or contrast of the master vector symbol</span>
            </div>
            <span className="createx-lab-badge">6 Strict Rules</span>
          </header>
          <div className="bx-misuse-grid">
            {misuseItems.map((item) => (
              <div key={item.id} className="bx-misuse-card">
                <div className="bx-misuse-preview" style={{ background: item.bg }}>
                  <span className="bx-misuse-badge">DO NOT</span>
                  <div
                    className="bx-misuse-mark"
                    style={item.style}
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />
                </div>
                <span className="bx-misuse-caption">{item.rule}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 05. Color Architecture & 60-30-10 Proportion Rule */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>
                05 · Chromatic Architecture ({brand.proportion[0]} / {brand.proportion[1]} / {brand.proportion[2]})
              </strong>
              <span>Click any swatch to copy hex · OKLCH perceptual lightness &amp; WCAG 2.2 verified</span>
            </div>
            <span className="createx-lab-badge">{wcagContrast(brand.ink, brand.background)}:1 Text</span>
          </header>
          <div className="bx-proportion-bar">
            <div
              className="bx-prop-seg"
              style={{
                flex: brand.proportion[0],
                background: brand.background,
                color: brand.ink,
                border: '1px solid rgba(128,128,128,0.28)',
              }}
            >
              <strong>{brand.proportion[0]}% Canvas</strong>
              <span>{brand.background.toUpperCase()}</span>
            </div>
            <div
              className="bx-prop-seg"
              style={{
                flex: brand.proportion[1],
                background: brand.ink,
                color: brand.background,
              }}
            >
              <strong>{brand.proportion[1]}% Ink</strong>
              <span>{brand.ink.toUpperCase()}</span>
            </div>
            <div
              className="bx-prop-seg"
              style={{
                flex: brand.proportion[2],
                background: brand.accent,
                color: pickReadableFg(brand.accent),
              }}
            >
              <strong>{brand.proportion[2]}%</strong>
            </div>
          </div>
          <div className="bx-swatch-spec-grid">
            {brand.palette.map((hex, idx) => {
              const lch = hexToOklch(hex);
              const fg = pickReadableFg(hex);
              return (
                <button
                  key={idx}
                  type="button"
                  className="bx-swatch-spec-card"
                  style={{ background: hex, color: fg }}
                  title={`Click to copy ${hex.toUpperCase()}`}
                  onClick={() => {
                    void navigator.clipboard.writeText(hex.toUpperCase());
                    onFlash(`Copied ${hex.toUpperCase()}`);
                  }}
                >
                  <strong>{hex.toUpperCase()}</strong>
                  <span>
                    L{Math.round(lch.l * 100)} C{lch.c.toFixed(2)} H{Math.round(lch.h)}°
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 06. Typography Hierarchy & Editorial Specimens */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>06 · Typographic Hierarchy &amp; OpenType Pairing</strong>
              <span>Display headline &amp; body editorial pairing with deterministic feature settings</span>
            </div>
            <span className="createx-lab-badge">
              {displayFont.label} + {bodyFont.label}
            </span>
          </header>
          <div className="bx-type-spec-stack">
            <div className="bx-type-spec-row">
              <div className="bx-type-spec-meta">
                <strong>DISPLAY</strong>
                <span>{displayFont.label}</span>
                <code>{displayFont.meta} · 700</code>
              </div>
              <div className="bx-type-spec-sample" style={{ ...displayStyle, fontSize: 24, fontWeight: 700 }}>
                {brand.name} — {brand.voice.pillars.join(' · ')}
              </div>
            </div>
            <div className="bx-type-spec-row">
              <div className="bx-type-spec-meta">
                <strong>SUBHEAD</strong>
                <span>{displayFont.label}</span>
                <code>-0.015em · 600</code>
              </div>
              <div className="bx-type-spec-sample" style={{ ...displayStyle, fontSize: 15, fontWeight: 600 }}>
                {brand.tagline}
              </div>
            </div>
            <div className="bx-type-spec-row">
              <div className="bx-type-spec-meta">
                <strong>BODY COPY</strong>
                <span>{bodyFont.label}</span>
                <code>1.55 LH · 400</code>
              </div>
              <div className="bx-type-spec-sample" style={{ ...bodyStyle, fontSize: 12.5, opacity: 0.82 }}>
                Engineered for high-density interfaces and editorial clarity across desktop, mobile, and print touchpoints.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

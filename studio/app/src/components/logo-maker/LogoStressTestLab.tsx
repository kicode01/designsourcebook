import { useMemo, useState } from 'react';
import type { SvgAnatomy } from '../../engine/svgAnatomy';
import type { OpticalMetrics } from './logoMakerUtils';
import { pickReadableFg, wcagContrast } from '../../engine/dsEngine';
import { adaptSvgPaintForSurface } from '../../engine/svgPaint';

interface LogoStressTestLabProps {
  cleanSvg: string;
  brandName: string;
  anatomy: SvgAnatomy;
  optical: OpticalMetrics;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  onAutoCenter: () => void;
  onExportBlueprint: () => void;
}

export function LogoStressTestLab({
  cleanSvg,
  brandName,
  anatomy,
  optical,
  primaryHex,
  secondaryHex,
  accentHex,
  onAutoCenter,
  onExportBlueprint,
}: LogoStressTestLabProps) {
  const [blurPx, setBlurPx] = useState<number>(2.5);
  const [spinMasks, setSpinMasks] = useState<boolean>(false);

  const darkSurfaceSvg = useMemo(
    () => adaptSvgPaintForSurface(cleanSvg, '#fafafa', 'stress-dark-'),
    [cleanSvg],
  );

  const monoWhiteSvg = useMemo(
    () =>
      adaptSvgPaintForSurface(cleanSvg, '#ffffff', 'stress-mono-w-').replace(
        /fill="(?!none)[^"]*"/gi,
        'fill="#ffffff"',
      ),
    [cleanSvg],
  );

  const monoBlackSvg = useMemo(
    () =>
      adaptSvgPaintForSurface(cleanSvg, '#09090b', 'stress-mono-b-').replace(
        /fill="(?!none)[^"]*"/gi,
        'fill="#09090b"',
      ),
    [cleanSvg],
  );

  const surfaceSwatches = useMemo(
    () => [
      { id: 'obsidian', label: 'Obsidian Dark', bg: '#09090b', fg: '#ffffff' },
      { id: 'paper', label: 'Paper Light', bg: '#ffffff', fg: '#09090b' },
      { id: 'primary', label: 'Brand Primary', bg: primaryHex, fg: pickReadableFg(primaryHex) },
      { id: 'secondary', label: 'Secondary', bg: secondaryHex, fg: pickReadableFg(secondaryHex) },
      { id: 'accent', label: 'Signal Accent', bg: accentHex, fg: pickReadableFg(accentHex) },
      { id: 'slate', label: 'Neutral Slate', bg: '#27272a', fg: '#fafafa' },
    ],
    [primaryHex, secondaryHex, accentHex],
  );

  const offsetMag = Math.hypot(optical.dx, optical.dy);

  return (
    <div className="createx-lab-scroll" aria-label="Logo Perceptual Stress-Test & Audit Lab">
      <div className="createx-lab-header">
        <div>
          <span className="createx-lab-eyebrow">PERCEPTUAL &amp; GEOMETRIC QA WORKBENCH</span>
          <h2 className="createx-lab-title">{brandName} · Mark Stress-Test Lab</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button type="button" className="ds-action-btn" onClick={onAutoCenter}>
            Auto-Center Optically
          </button>
          <button type="button" className="ds-action-btn is-primary" onClick={onExportBlueprint}>
            Export Blueprint SVG
          </button>
        </div>
      </div>

      <div className="createx-lab-grid">
        {/* 1. Gaussian Blur / Squint Test */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>1. Squint &amp; Low-Acuity Blur Test</strong>
              <span>Reveals counter-plugging, optical clumping, and silhouette legibility at distance</span>
            </div>
            <div className="page-segmented" style={{ width: 196 }}>
              {(
                [
                  [0, 'Sharp'],
                  [2.5, '2.5px'],
                  [5, '5px'],
                ] as const
              ).map(([val, lbl]) => (
                <button
                  key={val}
                  type="button"
                  aria-pressed={blurPx === val}
                  onClick={() => setBlurPx(val)}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </header>
          <div className="createx-squint-pair">
            <div className="createx-squint-box is-dark">
              <div
                className="createx-squint-svg"
                style={{ filter: `blur(${blurPx}px)` }}
                dangerouslySetInnerHTML={{
                  __html: darkSurfaceSvg.replace(/width="256" height="256"/, 'width="96" height="96"'),
                }}
              />
              <span>Dark Surface · {blurPx}px σ</span>
            </div>
            <div className="createx-squint-box is-light">
              <div
                className="createx-squint-svg"
                style={{ filter: `blur(${blurPx}px)` }}
                dangerouslySetInnerHTML={{
                  __html: monoBlackSvg.replace(/width="256" height="256"/, 'width="96" height="96"'),
                }}
              />
              <span>Light Surface · {blurPx}px σ</span>
            </div>
          </div>
        </section>

        {/* 2. Micro-Scale Favicon & Browser Tab Bar */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>2. Micro-Scale &amp; Favicon Survival</strong>
              <span>Tests 64px → 12px pixel-grid rasterization and real browser tab headers</span>
            </div>
            <span className="createx-lab-badge">64 · 32 · 24 · 16 · 12px</span>
          </header>
          <div className="createx-scale-strip">
            {([64, 32, 24, 16, 12] as const).map((sz) => (
              <div key={sz} className="createx-scale-cell">
                <div className="createx-scale-frame">
                  <div
                    style={{ width: sz, height: sz, display: 'grid', placeItems: 'center' }}
                    dangerouslySetInnerHTML={{
                      __html: darkSurfaceSvg
                        .replace(/ds-mk-grad/g, `ds-mk-sz-${sz}`)
                        .replace(/width="256" height="256"/, `width="${sz}" height="${sz}"`),
                    }}
                  />
                </div>
                <span>{sz}px</span>
              </div>
            ))}
          </div>
          <div className="createx-tab-sim-stack">
            <div className="createx-browser-tab is-dark">
              <span className="createx-browser-dots">
                <i />
                <i />
                <i />
              </span>
              <div className="createx-browser-pill">
                <span
                  className="createx-browser-fav"
                  dangerouslySetInnerHTML={{
                    __html: darkSurfaceSvg
                      .replace(/ds-mk-grad/g, 'ds-mk-tab-d')
                      .replace(/width="256" height="256"/, 'width="16" height="16"'),
                  }}
                />
                <span className="createx-browser-title">{brandName} — Studio Documentation</span>
                <span className="createx-browser-close">×</span>
              </div>
            </div>
            <div className="createx-browser-tab is-light">
              <span className="createx-browser-dots">
                <i />
                <i />
                <i />
              </span>
              <div className="createx-browser-pill">
                <span
                  className="createx-browser-fav"
                  dangerouslySetInnerHTML={{
                    __html: monoBlackSvg.replace(/width="256" height="256"/, 'width="16" height="16"'),
                  }}
                />
                <span className="createx-browser-title">{brandName} — Product Workspace</span>
                <span className="createx-browser-close">×</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Surface Polarity & Chromatic Matrix */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>3. Surface Polarity &amp; Chromatic Matrix</strong>
              <span>Evaluates mark contrast across 6 brand &amp; neutral surfaces</span>
            </div>
            <span className="createx-lab-badge">WCAG 2.2</span>
          </header>
          <div className="createx-surface-matrix">
            {surfaceSwatches.map((sw) => {
              const ratio = wcagContrast(sw.fg, sw.bg);
              const adapted =
                sw.fg === '#ffffff'
                  ? monoWhiteSvg
                  : monoBlackSvg;
              return (
                <div
                  key={sw.id}
                  className="createx-surface-tile"
                  style={{ background: sw.bg, color: sw.fg }}
                >
                  <div
                    className="createx-surface-mark"
                    dangerouslySetInnerHTML={{
                      __html: adapted.replace(/width="256" height="256"/, 'width="46" height="46"'),
                    }}
                  />
                  <div className="createx-surface-meta">
                    <strong>{sw.label}</strong>
                    <span>{ratio.toFixed(1)}:1</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. 1-Bit Monochrome & Knock-Out Stamp */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>4. 1-Bit Monochrome &amp; Knock-Out Stamp</strong>
              <span>Verifies zero-gradient survival for thermal print, laser etch, and embossing</span>
            </div>
            <span className="createx-lab-badge">1-Bit Strict</span>
          </header>
          <div className="createx-squint-pair">
            <div className="createx-squint-box is-light">
              <div
                className="createx-squint-svg"
                dangerouslySetInnerHTML={{
                  __html: monoBlackSvg.replace(/width="256" height="256"/, 'width="88" height="88"'),
                }}
              />
              <span>Positive Ink Stamp (#000 on #FFF)</span>
            </div>
            <div className="createx-squint-box is-dark">
              <div
                className="createx-squint-svg"
                dangerouslySetInnerHTML={{
                  __html: monoWhiteSvg.replace(/width="256" height="256"/, 'width="88" height="88"'),
                }}
              />
              <span>Reverse Knock-Out (#FFF on #000)</span>
            </div>
          </div>
        </section>

        {/* 5. App Icon & Social Avatar Mask Crops */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>5. App Store, OS &amp; Avatar Mask Crops</strong>
              <span>Checks corner tension inside Circle, iOS Squircle, Android Rounded &amp; Hex masks</span>
            </div>
            <button
              type="button"
              className={`page-chip ${spinMasks ? 'is-active' : ''}`}
              onClick={() => setSpinMasks((v) => !v)}
            >
              {spinMasks ? 'Stop Spin' : 'Spin Check'}
            </button>
          </header>
          <div className="createx-mask-row">
            {[
              { id: 'circle', label: 'Circle Avatar', radius: '50%', clip: undefined },
              { id: 'squircle', label: 'iOS Squircle', radius: '22.5%', clip: undefined },
              { id: 'rounded', label: 'Android Tile', radius: '12%', clip: undefined },
              {
                id: 'hex',
                label: 'Hex Badge',
                radius: '0',
                clip: 'polygon(50% 2%, 95% 26%, 95% 74%, 50% 98%, 5% 74%, 5% 26%)',
              },
            ].map((m) => (
              <div key={m.id} className="createx-mask-item">
                <div
                  className={`createx-mask-avatar ${spinMasks ? 'is-spinning' : ''}`}
                  style={{
                    borderRadius: m.radius,
                    clipPath: m.clip,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: darkSurfaceSvg
                      .replace(/ds-mk-grad/g, `ds-mk-mask-${m.id}`)
                      .replace(/width="256" height="256"/, 'width="54" height="54"'),
                  }}
                />
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Vector Anatomy & Optical Balance Telemetry */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>6. Vector Anatomy &amp; Optical Telemetry</strong>
              <span>Deterministic path hygiene, anchor count, and center-of-mass balance</span>
            </div>
            <span className="createx-lab-badge">Score {anatomy.score}/100</span>
          </header>
          <div className="createx-telemetry-kpis">
            <div className="createx-telemetry-kpi">
              <span>Optical Offset</span>
              <strong style={{ color: offsetMag <= 3 ? '#10b981' : '#f59e0b' }}>
                Δ({optical.dx}, {optical.dy})
              </strong>
            </div>
            <div className="createx-telemetry-kpi">
              <span>Mirror X Balance</span>
              <strong>{optical.mirrorXScorePct}%</strong>
            </div>
            <div className="createx-telemetry-kpi">
              <span>Anchor Vertices</span>
              <strong>{anatomy.anchors.length}</strong>
            </div>
            <div className="createx-telemetry-kpi">
              <span>Bounding Box</span>
              <strong>
                {optical.width}×{optical.height}
              </strong>
            </div>
          </div>
          <div className="createx-findings-list">
            {anatomy.findings.map((f, idx) => (
              <div key={idx} className={`createx-finding-item is-${f.level}`}>
                <span className="createx-finding-dot" />
                <span>{f.message}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

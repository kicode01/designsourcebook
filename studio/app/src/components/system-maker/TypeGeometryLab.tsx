import { useState } from 'react';
import {
  computeConcentricRadius,
  fontStyleFor,
  interpolateFluidPx,
  type CompiledSystem,
  type DesignSystemDoc,
} from '../../engine/dsEngine';

const VIEWPORT_PRESETS = [
  { label: '375px Mobile', vw: 375 },
  { label: '768px Tablet', vw: 768 },
  { label: '1024px Laptop', vw: 1024 },
  { label: '1440px Desktop', vw: 1440 },
];

export function TypeGeometryLab({
  doc,
  compiled,
  cvdHex,
  onCopyText,
}: {
  doc: DesignSystemDoc;
  compiled: CompiledSystem;
  cvdHex: (hex: string) => string;
  onCopyText: (txt: string, label: string) => void;
}) {
  const [viewportVw, setViewportVw] = useState(1024);
  const [sampleText, setSampleText] = useState('The quick brown fox jumps over the lazy dog');
  const [motionKey, setMotionKey] = useState<'fast' | 'normal' | 'slow' | 'spring'>('normal');
  const [motionPos, setMotionPos] = useState(false);

  const { semantic: sem, typeScale, spacingScale, radii, motion } = compiled;
  const minVw = doc.fluidMinVw ?? 360;
  const maxVw = doc.fluidMaxVw ?? 1440;
  const outerPx = Math.round(doc.baseRadiusPx * 1.5);
  const padPx = Math.round(doc.baseSpacePx * 1.5);
  const innerPx = computeConcentricRadius(outerPx, padPx);

  const activeDuration =
    motionKey === 'fast' ? motion.fast : motionKey === 'slow' ? motion.slow : motion.normal;
  const activeBezier = motionKey === 'spring' ? motion.spring : motion.easeOut;

  const triggerMotion = (key: 'fast' | 'normal' | 'slow' | 'spring') => {
    setMotionKey(key);
    setMotionPos((v) => !v);
  };

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {/* Utopia Fluid Type Viewport Scrubber */}
      <div className="ds-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div>
            <strong style={{ fontSize: 13 }}>Utopia Fluid Typography Scrubber (Ratio {doc.typeRatio})</strong>
            <div style={{ fontSize: 11.5, color: 'var(--studio-muted)', marginTop: 2 }}>
              Scrub viewport width ({minVw}px → {maxVw}px) to preview interpolated fluid sizes and copy exact CSS clamp() expressions.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {VIEWPORT_PRESETS.map((vp) => (
              <button
                key={vp.vw}
                type="button"
                className={`ds-pill-tab ${viewportVw === vp.vw ? 'is-active' : ''}`}
                style={{
                  border: '1px solid var(--studio-panel-border)',
                  background: viewportVw === vp.vw ? 'var(--studio-accent)' : 'var(--studio-panel-control)',
                  color: viewportVw === vp.vw ? 'var(--studio-accent-fg)' : 'var(--studio-muted)',
                }}
                onClick={() => setViewportVw(vp.vw)}
              >
                {vp.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ds-scrubber-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 220 }}>
            <span style={{ fontSize: 11.5, color: 'var(--studio-muted)', whiteSpace: 'nowrap' }}>Viewport</span>
            <input
              type="range"
              min={320}
              max={1440}
              step={4}
              value={viewportVw}
              onChange={(e) => setViewportVw(Number(e.target.value))}
              aria-label="Fluid typography viewport width"
              style={{ flex: 1, accentColor: 'var(--studio-accent)' }}
            />
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, minWidth: 54 }}>
              {viewportVw}px
            </code>
          </div>
          <input
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            placeholder="Custom specimen phrase…"
            aria-label="Custom typography specimen phrase"
            className="ds-seed-input"
            style={{ flex: 1, minWidth: 220, maxWidth: 360 }}
          />
        </div>

        <div
          className="ds-preview-frame"
          style={{
            background: cvdHex(sem.canvas),
            color: cvdHex(sem.ink),
            borderColor: sem.border,
            borderRadius: radii.lg,
            marginTop: 12,
          }}
        >
          {typeScale.map((t) => {
            const interp = interpolateFluidPx(t, viewportVw, minVw, maxVw);
            const isDisplay = t.token === 'display' || t.token.startsWith('h');
            return (
              <div
                key={t.token}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '76px 140px 1fr auto',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 0',
                  borderBottom: `1px solid ${sem.border}`,
                }}
              >
                <code style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 11, color: cvdHex(sem.brand), fontWeight: 600 }}>
                  {t.token}
                </code>
                <div style={{ ...fontStyleFor(doc.monoFont, 'mono'), fontSize: 10.5, color: cvdHex(sem.muted) }}>
                  <strong style={{ color: cvdHex(sem.ink) }}>{interp}px</strong>
                  <span style={{ opacity: 0.78 }}> ({t.minPx}→{t.px})</span>
                  <div style={{ opacity: 0.68 }}>lh {t.lineHeight} · {t.measureCh}</div>
                </div>
                <span
                  style={{
                    ...fontStyleFor(isDisplay ? doc.displayFont : doc.bodyFont, isDisplay ? 'display' : 'body'),
                    fontSize: Math.min(interp, 46),
                    fontWeight: t.weight,
                    lineHeight: t.lineHeight,
                    letterSpacing: `${t.trackingEm}em`,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minWidth: 0,
                  }}
                >
                  {sampleText || 'The quick brown fox jumps over the lazy dog'}
                </span>
                <button
                  type="button"
                  onClick={() => onCopyText(t.clampCss, `--ds-text-${t.token} clamp()`)}
                  title={t.clampCss}
                  style={{
                    padding: '4px 8px',
                    borderRadius: radii.sm,
                    background: cvdHex(sem.surfaceAlt),
                    color: cvdHex(sem.muted),
                    border: `1px solid ${sem.border}`,
                    ...fontStyleFor(doc.monoFont, 'mono'),
                    fontSize: 10,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Copy clamp()
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concentric Radius + Spacing + Motion Grid */}
      <div className="ds-two-col-lab">
        {/* Concentric Radius Inspector */}
        <div className="ds-card">
          <div style={{ marginBottom: 12 }}>
            <strong style={{ fontSize: 13 }}>Concentric Corner Geometry</strong>
            <div style={{ fontSize: 11.5, color: 'var(--studio-muted)', marginTop: 2 }}>
              R<sub>inner</sub> = max(0, R<sub>outer</sub> − Padding) = max(0, {outerPx} − {padPx}) = <strong>{innerPx}px</strong>
            </div>
          </div>

          <div
            style={{
              padding: padPx,
              borderRadius: radii.lg,
              background: cvdHex(sem.surface),
              border: `1.5px solid ${cvdHex(sem.brand)}`,
              color: cvdHex(sem.ink),
            }}
          >
            <div style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: cvdHex(sem.brand), marginBottom: 8 }}>
              Outer Container · radius {radii.lg} · padding {padPx}px
            </div>
            <div
              style={{
                padding: 14,
                borderRadius: radii.innerNested,
                background: cvdHex(sem.surfaceAlt),
                border: `1px solid ${sem.borderStrong}`,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600 }}>Concentric Nested Surface</div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: cvdHex(sem.muted), marginTop: 4 }}>
                Inner radius {radii.innerNested} stays visually parallel to outer curve.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {Object.entries(radii).map(([k, v]) => (
              <button
                key={k}
                type="button"
                onClick={() => onCopyText(v, `radius-${k}: ${v}`)}
                style={{
                  padding: '5px 10px',
                  borderRadius: v,
                  background: 'var(--studio-panel-control)',
                  border: '1px solid var(--studio-panel-border)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  color: 'var(--studio-ink)',
                }}
              >
                {k}: {v}
              </button>
            ))}
          </div>
        </div>

        {/* Spacing & Motion Curves */}
        <div className="ds-card" style={{ display: 'grid', gap: 16 }}>
          <div>
            <strong style={{ fontSize: 13 }}>Spacing Rhythm ({doc.baseSpacePx}px base × {sem.densityMult}x)</strong>
            <div style={{ display: 'grid', gap: 6, marginTop: 10 }}>
              {spacingScale.map((s) => (
                <button
                  key={s.token}
                  type="button"
                  onClick={() => onCopyText(`${s.px}px`, `--ds-space-${s.token}`)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}
                >
                  <code style={{ width: 64, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--studio-muted)' }}>
                    space-{s.token}
                  </code>
                  <span style={{ width: 42, fontFamily: 'var(--font-mono)', fontSize: 11 }}>{s.px}px</span>
                  <div style={{ height: 9, width: Math.max(4, Math.min(220, s.px * 2.6)), borderRadius: radii.sm, background: cvdHex(sem.brand) }} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--studio-panel-border)', paddingTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8, flexWrap: 'wrap' }}>
              <strong style={{ fontSize: 13 }}>Motion &amp; Easing Playground</strong>
              <button type="button" className="ds-action-btn" onClick={() => setMotionPos((v) => !v)}>
                Replay Motion
              </button>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              {([
                ['fast', `Fast (${motion.fast})`],
                ['normal', `Normal (${motion.normal})`],
                ['slow', `Slow (${motion.slow})`],
                ['spring', 'Spring Curve'],
              ] as const).map(([k, lbl]) => (
                <button
                  key={k}
                  type="button"
                  className={`page-chip ${motionKey === k ? 'is-active' : ''}`}
                  onClick={() => triggerMotion(k)}
                >
                  {lbl}
                </button>
              ))}
            </div>
            <div className="ds-motion-track" onClick={() => setMotionPos((v) => !v)} title="Click to trigger transition">
              <div
                className="ds-motion-puck"
                style={{
                  background: cvdHex(sem.brand),
                  color: cvdHex(sem.brandFg),
                  borderRadius: radii.md,
                  left: motionPos ? 'calc(100% - 146px)' : '6px',
                  transition: `left ${activeDuration} ${activeBezier}`,
                }}
              >
                {motionKey} · {activeDuration}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

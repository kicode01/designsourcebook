import { useMemo, useState } from 'react';
import {
  apcaContrast,
  pickReadableFg,
  wcagContrast,
  type CompiledSystem,
  type RampStop,
} from '../../engine/dsEngine';

type RampOverlayMetric = 'hex' | 'wcag' | 'apca' | 'lightness';
type MatrixFilter = 'all' | 'pass' | 'fail';

const RAMP_KEYS = ['primary', 'secondary', 'accent', 'neutral', 'success', 'warning', 'danger', 'info'] as const;
type RampName = (typeof RAMP_KEYS)[number];

export function OklchContrastLab({
  compiled,
  cvdHex,
  onAutoFixPrimary,
  onCopyText,
}: {
  compiled: CompiledSystem;
  cvdHex: (hex: string) => string;
  onAutoFixPrimary: (targetWcag: number) => void;
  onCopyText: (txt: string, label: string) => void;
}) {
  const [overlayMetric, setOverlayMetric] = useState<RampOverlayMetric>('hex');
  const [selectedStop, setSelectedStop] = useState<{ ramp: RampName; step: number }>({
    ramp: 'primary',
    step: 500,
  });
  const [matrixFilter, setMatrixFilter] = useState<MatrixFilter>('all');

  const { ramps, semantic, audits, contrastMatrix } = compiled;

  const activeStopObj: RampStop = useMemo(() => {
    const list = ramps[selectedStop.ramp] || ramps.primary;
    return list.find((s) => s.step === selectedStop.step) || list[5];
  }, [ramps, selectedStop]);

  const activeOnCanvas = useMemo(
    () => wcagContrast(activeStopObj.hex, semantic.canvas),
    [activeStopObj.hex, semantic.canvas],
  );
  const activeApcaCanvas = useMemo(
    () => apcaContrast(activeStopObj.hex, semantic.canvas),
    [activeStopObj.hex, semantic.canvas],
  );

  const bgNames = ['Canvas', 'Surface', 'Surface Alt', 'Brand', 'Secondary'] as const;
  const fgNames = Array.from(new Set(contrastMatrix.map((c) => c.fgName)));

  const filteredMatrixCount = useMemo(() => {
    return contrastMatrix.filter((c) => {
      if (matrixFilter === 'pass') return c.aaPass;
      if (matrixFilter === 'fail') return !c.aaPass;
      return true;
    }).length;
  }, [contrastMatrix, matrixFilter]);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {/* OKLCH 50-950 Ramps + Inspector */}
      <div className="ds-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div>
            <strong style={{ fontSize: 13 }}>Perceptual OKLCH 50–950 Ramps (8 Scales · 88 Stops)</strong>
            <div style={{ fontSize: 11.5, color: 'var(--studio-muted)', marginTop: 2 }}>
              Click any stop to inspect its Radix-style semantic role, OKLCH coordinates, alpha tint, and contrasts.
            </div>
          </div>
          <div className="ds-pills-row" role="group" aria-label="Ramp chip metric overlay">
            {([
              ['hex', 'HEX'],
              ['wcag', 'WCAG vs Canvas'],
              ['apca', 'APCA Lc'],
              ['lightness', 'OKLCH L%'],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`ds-pill-tab ${overlayMetric === id ? 'is-active' : ''}`}
                onClick={() => setOverlayMetric(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Stop Inspector Bar */}
        <div className="ds-stop-inspector">
          <div className="ds-stop-swatch" style={{ background: cvdHex(activeStopObj.hex), color: pickReadableFg(cvdHex(activeStopObj.hex)) }}>
            {activeStopObj.step}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <code style={{ fontSize: 12, fontWeight: 600 }}>--ds-{selectedStop.ramp}-{activeStopObj.step}</code>
              <span className="ldb-badge">{activeStopObj.role}</span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--studio-muted)' }}>
                {activeStopObj.oklch} · {activeStopObj.rgb} · alpha {activeStopObj.alphaHex}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 4, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--studio-muted)', flexWrap: 'wrap' }}>
              <span>vs Canvas: <strong style={{ color: 'var(--studio-ink)' }}>{activeOnCanvas}:1</strong> (Lc {activeApcaCanvas})</span>
              <span>vs White: <strong style={{ color: 'var(--studio-ink)' }}>{activeStopObj.onLightContrast}:1</strong></span>
              <span>vs Dark: <strong style={{ color: 'var(--studio-ink)' }}>{activeStopObj.onDarkContrast}:1</strong></span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button type="button" className="ds-action-btn" onClick={() => onCopyText(activeStopObj.hex, `${selectedStop.ramp}-${activeStopObj.step} HEX`)}>
              Copy HEX
            </button>
            <button type="button" className="ds-action-btn" onClick={() => onCopyText(activeStopObj.oklch, 'OKLCH')}>
              Copy OKLCH
            </button>
            <button type="button" className="ds-action-btn" onClick={() => onCopyText(`var(--ds-${selectedStop.ramp}-${activeStopObj.step})`, 'CSS var')}>
              Copy var()
            </button>
          </div>
        </div>

        {RAMP_KEYS.map((name) => (
          <div key={name} className="ds-ramp-row">
            <span className="ds-ramp-label">{name}</span>
            {ramps[name].map((s) => {
              const sim = cvdHex(s.hex);
              const fg = pickReadableFg(sim);
              const isSelected = selectedStop.ramp === name && selectedStop.step === s.step;
              const metricText =
                overlayMetric === 'hex'
                  ? s.hex
                  : overlayMetric === 'wcag'
                    ? `${wcagContrast(s.hex, semantic.canvas)}:1`
                    : overlayMetric === 'apca'
                      ? `Lc ${apcaContrast(s.hex, semantic.canvas)}`
                      : s.oklch.replace('oklch(', '').split(' ')[0];

              return (
                <button
                  key={s.step}
                  type="button"
                  className={`ds-ramp-chip ${isSelected ? 'is-selected' : ''}`}
                  style={{ background: sim, color: fg }}
                  title={`${name}-${s.step} (${s.role}): ${s.hex} · ${s.oklch}`}
                  onClick={() => {
                    setSelectedStop({ ramp: name, step: s.step });
                    onCopyText(s.hex, `${name}-${s.step} ${s.hex}`);
                  }}
                >
                  <span>{s.step}</span>
                  <span style={{ opacity: 0.82 }}>{metricText}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* WCAG 2.2 + APCA Audit */}
      <div className="ds-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div>
            <strong style={{ fontSize: 13 }}>WCAG 2.2 + APCA Contrast Audit</strong>
            <div style={{ fontSize: 11.5, color: 'var(--studio-muted)', marginTop: 2 }}>
              {audits.filter((a) => a.aaPass).length}/{audits.length} pairs pass WCAG AA (≥ 4.5:1) · {audits.filter((a) => a.aaaPass).length}/{audits.length} pass AAA (≥ 7.0:1)
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="ds-action-btn" onClick={() => onAutoFixPrimary(4.5)}>
              Auto-Fix AA (4.5:1)
            </button>
            <button type="button" className="ds-action-btn is-primary" onClick={() => onAutoFixPrimary(7.0)}>
              Auto-Fix AAA (7.0:1)
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          {audits.map((a) => (
            <div
              key={a.pair}
              style={{
                padding: '10px 12px',
                borderRadius: 9,
                background: cvdHex(a.bg),
                color: cvdHex(a.fg),
                border: '1px solid rgba(127,127,127,0.22)',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600 }}>{a.pair}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                <span>WCAG {a.wcag}:1</span>
                <span>Lc {a.apca}</span>
                <span>{a.aaaPass ? 'AAA' : a.aaPass ? 'AA' : a.wcag >= 3 ? 'AA Large' : 'FAIL'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* N x N Semantic Contrast Matrix */}
      <div className="ds-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div>
            <strong style={{ fontSize: 13 }}>Semantic Surface × Foreground Contrast Matrix ({filteredMatrixCount} shown)</strong>
            <div style={{ fontSize: 11.5, color: 'var(--studio-muted)', marginTop: 2 }}>
              Inspects every semantic foreground across every active surface simultaneously.
            </div>
          </div>
          <div className="ds-pills-row" role="group" aria-label="Matrix contrast filter">
            {([
              ['all', 'All Pairs'],
              ['pass', 'Passing AA+'],
              ['fail', 'Failing Only'],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`ds-pill-tab ${matrixFilter === id ? 'is-active' : ''}`}
                onClick={() => setMatrixFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="ds-matrix-table">
            <thead>
              <tr>
                <th>Foreground \ Background</th>
                {bgNames.map((bg) => (
                  <th key={bg}>{bg}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fgNames.map((fgName) => (
                <tr key={fgName}>
                  <th>{fgName}</th>
                  {bgNames.map((bgName) => {
                    const cell = contrastMatrix.find((c) => c.fgName === fgName && c.bgName === bgName);
                    if (!cell) return <td key={bgName} />;
                    const matchesFilter =
                      matrixFilter === 'all' ||
                      (matrixFilter === 'pass' && cell.aaPass) ||
                      (matrixFilter === 'fail' && !cell.aaPass);
                    const grade = cell.aaaPass ? 'AAA' : cell.aaPass ? 'AA' : cell.aaLarge ? '3:1' : 'FAIL';
                    return (
                      <td key={bgName} style={{ opacity: matchesFilter ? 1 : 0.2 }}>
                        <button
                          type="button"
                          className="ds-matrix-cell"
                          style={{ background: cvdHex(cell.bg), color: cvdHex(cell.fg) }}
                          title={`${cell.fgName} (${cell.fg}) on ${cell.bgName} (${cell.bg}) — WCAG ${cell.wcag}:1 · APCA Lc ${cell.apca}`}
                          onClick={() =>
                            onCopyText(
                              `${cell.fgName} (${cell.fg}) on ${cell.bgName} (${cell.bg}): ${cell.wcag}:1 / Lc ${cell.apca}`,
                              `${cell.fgName} on ${cell.bgName}`,
                            )
                          }
                        >
                          <span style={{ fontWeight: 700 }}>{cell.wcag}:1</span>
                          <span style={{ opacity: 0.82, fontSize: 9.5 }}>{grade} · Lc {cell.apca}</span>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

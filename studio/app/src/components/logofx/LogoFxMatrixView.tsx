import { useMemo, useState, useSyncExternalStore } from 'react';
import { categories } from '../../data/effects';
import { subscribeThumbs, thumbCount, thumbFor } from '../../engine/thumbs';
import { STUDIO_FX_SHOWCASES, type StudioFxShowcase } from './logoFxUtils';

interface LogoFxMatrixViewProps {
  currentEffectId: string;
  markName: string;
  onSelectEffect: (effectId: string) => void;
  onApplyShowcase: (showcase: StudioFxShowcase) => void;
}

export function LogoFxMatrixView({
  currentEffectId,
  markName,
  onSelectEffect,
  onApplyShowcase,
}: LogoFxMatrixViewProps) {
  useSyncExternalStore(subscribeThumbs, thumbCount);
  const [catFilter, setCatFilter] = useState<string>('all');

  const filteredGroups = useMemo(() => {
    const out: { categoryId: string; categoryLabel: string; groupLabel: string; items: { id: string; label: string }[] }[] = [];
    for (const cat of categories) {
      if (catFilter !== 'all' && cat.id !== catFilter) continue;
      for (const grp of cat.groups) {
        out.push({
          categoryId: cat.id,
          categoryLabel: cat.label,
          groupLabel: grp.label,
          items: grp.items,
        });
      }
    }
    return out;
  }, [catFilter]);

  return (
    <div className="createx-lab-scroll" aria-label="LogoFX Shader & Motion Preset Matrix">
      <div className="createx-lab-header">
        <div>
          <span className="createx-lab-eyebrow">WEBGL2 SDF SHADER &amp; CHOREOGRAPHY GALLERY</span>
          <h2 className="createx-lab-title">{markName} — 40+ Real-Time Shaders &amp; Studio Showcases</h2>
        </div>
        <div className="page-segmented" style={{ width: 280 }}>
          {[
            ['all', 'All (40)'],
            ['3d', '3D'],
            ['2d', '2D'],
            ['mockups', 'Mockups'],
          ].map(([cid, clbl]) => (
            <button
              key={cid}
              type="button"
              aria-pressed={catFilter === cid}
              onClick={() => setCatFilter(cid)}
            >
              {clbl}
            </button>
          ))}
        </div>
      </div>

      {/* 12 Curated Studio FX Showcases */}
      <section className="createx-lab-card">
        <header className="createx-lab-card-head">
          <div>
            <strong>Curated Studio FX + 3D Motion Showcases (12)</strong>
            <span>1-click presets combining WebGL2 shader, palette, 3D choreography, easing, backdrop, and film grading</span>
          </div>
          <span className="createx-lab-badge">Shader + Motion + Post-FX</span>
        </header>
        <div className="lfx-showcase-grid">
          {STUDIO_FX_SHOWCASES.map((sc) => {
            const thumb = thumbFor(sc.effectId);
            return (
              <button
                key={sc.id}
                type="button"
                className={`lfx-showcase-card ${currentEffectId === sc.effectId ? 'is-active' : ''}`}
                onClick={() => onApplyShowcase(sc)}
              >
                <div className="lfx-showcase-thumb" style={{ background: sc.backgroundColor }}>
                  {thumb ? (
                    <img src={thumb} alt={sc.label} />
                  ) : (
                    <span className="lfx-showcase-fallback">{sc.label.slice(0, 2)}</span>
                  )}
                </div>
                <div className="lfx-showcase-meta">
                  <div className="lfx-showcase-top">
                    <strong>{sc.label}</strong>
                    <span className="lfx-showcase-motion-pill">{sc.motionPreset}</span>
                  </div>
                  <span>{sc.subtitle}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Full Categorized Shader Matrix */}
      <div className="createx-lab-grid">
        {filteredGroups.map((grp) => (
          <section key={`${grp.categoryId}-${grp.groupLabel}`} className="createx-lab-card">
            <header className="createx-lab-card-head">
              <div>
                <strong>
                  {grp.categoryLabel} · {grp.groupLabel}
                </strong>
                <span>{grp.items.length} real-time SDF fragment shaders</span>
              </div>
              <span className="createx-lab-badge">{grp.categoryLabel}</span>
            </header>
            <div className="lfx-matrix-items">
              {grp.items.map((item) => {
                const thumb = thumbFor(item.id);
                const active = currentEffectId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`lfx-matrix-tile ${active ? 'is-active' : ''}`}
                    onClick={() => onSelectEffect(item.id)}
                  >
                    <div className="lfx-matrix-thumb">
                      {thumb ? (
                        <img src={thumb} alt={item.label} />
                      ) : (
                        <span className="lfx-showcase-fallback">{item.label.slice(0, 2)}</span>
                      )}
                    </div>
                    <span className="lfx-matrix-label">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

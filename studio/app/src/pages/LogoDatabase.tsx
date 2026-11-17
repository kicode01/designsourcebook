import { useEffect, useMemo, useState } from 'react';
import { TopBar } from '../components/TopBar';
import { Icon } from '../components/icons';
import { parseSvgAnatomy, type SvgAnatomy } from '../engine/svgAnatomy';
import { glyphToSvg, useProject } from '../state/project';

interface LogoRecord {
  id: string;
  brand: string;
  variant: string;
  width: number;
  height: number;
  aspect: number;
  aspectClass: string;
  shapes: number;
  anchors: number;
  colors: string[];
  nColors: number;
  primaryFamily: string;
  markType: string;
  subject: string;
  geometry: string[];
  techniques: string[];
  typeStyle?: string;
  industry: string;
  exemplary: boolean;
  note: string;
  svg: string;
}

interface LogoStats {
  total: number;
  exemplaryCount: number;
  medianAnchors: number;
  twoOrFewerColorsPct: number;
  markTypes: { key: string; count: number }[];
  industries: { key: string; count: number }[];
  techniques: { key: string; count: number }[];
  geometries: { key: string; count: number }[];
}

export function LogoDatabase() {
  const { iconPacks, setActiveMark, setDesignSystem } = useProject();
  const [subTab, setSubTab] = useState<'logos' | 'icons'>('logos');

  const [stats, setStats] = useState<LogoStats | null>(null);
  const [items, setItems] = useState<LogoRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState('');
  const [industry, setIndustry] = useState('');
  const [markType, setMarkType] = useState('');
  const [technique, setTechnique] = useState('');
  const [onlyExemplary, setOnlyExemplary] = useState(false);

  const [selectedLogo, setSelectedLogo] = useState<LogoRecord | null>(null);
  const [xrayDark, setXrayDark] = useState(false);
  const [showAnchors, setShowAnchors] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  const [packFilter, setPackFilter] = useState('all');
  const [iconQuery, setIconQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  useEffect(() => {
    fetch('/api/logos?stats=1')
      .then((r) => r.json())
      .then((d) => { if (d.ok) setStats(d); })
      .catch(() => { /* ignore */ });
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', '36');
    if (q.trim()) params.set('q', q.trim());
    if (industry) params.set('industry', industry);
    if (markType) params.set('mark_type', markType);
    if (technique) params.set('technique', technique);
    if (onlyExemplary) params.set('exemplary', '1');

    fetch(`/api/logos?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && d.ok) {
          setItems(d.items || []);
          setTotal(Number(d.total || 0));
          if (!selectedLogo && d.items?.length) setSelectedLogo(d.items[0]);
        }
      })
      .catch(() => { /* ignore */ })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [page, q, industry, markType, technique, onlyExemplary]);

  const anatomy: SvgAnatomy | null = useMemo(
    () => (selectedLogo ? parseSvgAnatomy(selectedLogo.svg) : null),
    [selectedLogo],
  );

  const packEntries = useMemo(() => {
    const out: { packId: string; grid: number; name: string; svg: string }[] = [];
    const nq = iconQuery.trim().toLowerCase();
    for (const [packId, pk] of Object.entries(iconPacks)) {
      if (packFilter !== 'all' && packId !== packFilter) continue;
      for (const g of pk.glyphs || []) {
        if (nq && !g.name.toLowerCase().includes(nq) && !packId.toLowerCase().includes(nq)) continue;
        out.push({
          packId,
          grid: pk.grid || 24,
          name: g.name,
          svg: glyphToSvg(g, pk.grid || 24, '#fafafa'),
        });
      }
    }
    return out.slice(0, 180);
  }, [iconPacks, packFilter, iconQuery]);

  const sendToLogoFX = (name: string, svg: string, source: 'logodb' | 'iconpack') => {
    // Normalize currentColor or dark fills for crisp white alpha extraction in WebGL2 SDF
    const normalized = svg.replace(/currentColor/gi, '#FFFFFF');
    setActiveMark({ id: name, name, svg: normalized, source });
    window.location.hash = '#/logofx';
  };

  return (
    <div className="logo-studio">
      <div className="ds-shell-page">
        <div style={{ position: 'relative', minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <TopBar current="logos" />

          <div className="ds-main-scroll">
            <div className="ds-subhead">
              <div className="ds-title-block">
                <h1>Logo Database &amp; Construction Anatomy</h1>
                <p>
                  Study how {stats ? stats.total.toLocaleString() : '1,432'} iconic software marks &amp;{' '}
                  {Object.keys(iconPacks).length || 57} official UI icon systems are constructed (educational reference; trademarks belong to their owners)
                </p>
              </div>

              <div className="ds-pills-row">
                <button
                  type="button"
                  className={`ds-pill-tab ${subTab === 'logos' ? 'is-active' : ''}`}
                  onClick={() => setSubTab('logos')}
                >
                  Brand Marks ({stats?.total ?? 1432})
                </button>
                <button
                  type="button"
                  className={`ds-pill-tab ${subTab === 'icons' ? 'is-active' : ''}`}
                  onClick={() => setSubTab('icons')}
                >
                  UI Icon Packs ({Object.keys(iconPacks).length || 57})
                </button>
              </div>
            </div>

            {stats && subTab === 'logos' && (
              <div className="ds-stats-strip">
                <div className="ds-stat-box">
                  <strong>{stats.total.toLocaleString()}</strong>
                  <span>Indexed SVG marks in Postgres</span>
                </div>
                <div className="ds-stat-box">
                  <strong>{stats.exemplaryCount}</strong>
                  <span>Exemplary construction studies</span>
                </div>
                <div className="ds-stat-box">
                  <strong>{stats.medianAnchors}</strong>
                  <span>Median anchor points</span>
                </div>
                <div className="ds-stat-box">
                  <strong>{stats.twoOrFewerColorsPct}%</strong>
                  <span>Use 1–2 solid colors</span>
                </div>
              </div>
            )}

            {subTab === 'logos' ? (
              <>
                <div className="ldb-filters">
                  <label className="ldb-search">
                    <Icon name="search" size={14} />
                    <input
                      placeholder="Search brands, geometry, subject, construction notes…"
                      value={q}
                      onChange={(e) => { setQ(e.target.value); setPage(1); }}
                    />
                  </label>
                  <select
                    className="ldb-select"
                    value={markType}
                    onChange={(e) => { setMarkType(e.target.value); setPage(1); }}
                    aria-label="Filter by mark type"
                  >
                    <option value="">All Mark Types</option>
                    {(stats?.markTypes ?? []).map((m) => (
                      <option key={m.key} value={m.key}>{m.key} ({m.count})</option>
                    ))}
                  </select>
                  <select
                    className="ldb-select"
                    value={technique}
                    onChange={(e) => { setTechnique(e.target.value); setPage(1); }}
                    aria-label="Filter by technique"
                  >
                    <option value="">All Techniques</option>
                    {(stats?.techniques ?? []).map((t) => (
                      <option key={t.key} value={t.key}>{t.key} ({t.count})</option>
                    ))}
                  </select>
                  <select
                    className="ldb-select"
                    value={industry}
                    onChange={(e) => { setIndustry(e.target.value); setPage(1); }}
                    aria-label="Filter by industry"
                  >
                    <option value="">All Industries</option>
                    {(stats?.industries ?? []).map((ind) => (
                      <option key={ind.key} value={ind.key}>{ind.key} ({ind.count})</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className={`ds-action-btn ${onlyExemplary ? 'is-primary' : ''}`}
                    onClick={() => { setOnlyExemplary(!onlyExemplary); setPage(1); }}
                  >
                    <Icon name="star" size={12} /> Exemplary Only
                  </button>
                </div>

                <div className="ldb-grid">
                  {loading && items.length === 0 ? (
                    <div className="ds-card">Loading database from Neon Postgres…</div>
                  ) : items.map((logo) => (
                    <button
                      key={logo.id}
                      type="button"
                      className="ldb-card"
                      style={{
                        borderColor: selectedLogo?.id === logo.id ? 'var(--studio-accent)' : undefined,
                      }}
                      onClick={() => setSelectedLogo(logo)}
                    >
                      <div className="ldb-stage" dangerouslySetInnerHTML={{ __html: logo.svg }} />
                      <div className="ldb-card-head">
                        <strong>{logo.brand}</strong>
                        <span className={`ldb-badge ${logo.exemplary ? 'is-star' : ''}`}>
                          {logo.exemplary ? '★ Study' : logo.markType}
                        </span>
                      </div>
                      <p className="ldb-note">{logo.note || logo.subject || `${logo.markType} · ${logo.industry}`}</p>
                      <div className="ldb-meta-foot">
                        <span>{logo.anchors} anchors</span>
                        <span>{logo.nColors}c · {logo.techniques?.[0] ?? 'flat'}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {total > 36 && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 20 }}>
                    <button
                      type="button"
                      className="ds-action-btn"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      Prev
                    </button>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--studio-muted)' }}>
                      Page {page} of {Math.ceil(total / 36)} ({total} marks)
                    </span>
                    <button
                      type="button"
                      className="ds-action-btn"
                      disabled={page * 36 >= total}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="ldb-filters">
                  <label className="ldb-search">
                    <Icon name="search" size={14} />
                    <input
                      placeholder="Filter 684 verified UI icons (home, search, settings…)"
                      value={iconQuery}
                      onChange={(e) => setIconQuery(e.target.value)}
                    />
                  </label>
                  <select
                    className="ldb-select"
                    value={packFilter}
                    onChange={(e) => setPackFilter(e.target.value)}
                  >
                    <option value="all">All Icon Packs ({Object.keys(iconPacks).length})</option>
                    {Object.entries(iconPacks).sort().map(([id, pk]) => (
                      <option key={id} value={id}>{id} ({pk.grid}px)</option>
                    ))}
                  </select>
                </div>

                <div className="ldb-grid">
                  {packEntries.map((item) => (
                    <div
                      key={`${item.packId}-${item.name}`}
                      className="ldb-card"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        setSelectedLogo({
                          id: `${item.packId}-${item.name}`,
                          brand: `${item.packId} / ${item.name}`,
                          variant: 'icon',
                          width: item.grid,
                          height: item.grid,
                          aspect: 1,
                          aspectClass: 'square',
                          shapes: 1,
                          anchors: 0,
                          colors: ['#fafafa'],
                          nColors: 1,
                          primaryFamily: 'mono',
                          markType: 'pictorial',
                          subject: item.name,
                          geometry: ['grid-modular'],
                          techniques: ['line-monoline'],
                          industry: 'design-creative',
                          exemplary: true,
                          note: `Official ${item.grid}×${item.grid}px grid glyph from ${item.packId}.`,
                          svg: item.svg,
                        })
                      }
                    >
                      <div
                        className="ldb-stage is-dark"
                        style={{ color: '#fafafa' }}
                        dangerouslySetInnerHTML={{
                          __html: item.svg.replace(/width="256" height="256"/, 'width="48" height="48"'),
                        }}
                      />
                      <div className="ldb-card-head">
                        <strong>{item.name}</strong>
                        <span className="ldb-badge">{item.packId}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                        <button
                          type="button"
                          className="ds-action-btn"
                          style={{ flex: 1, justifyContent: 'center' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            sendToLogoFX(`${item.packId}-${item.name}`, item.svg, 'iconpack');
                          }}
                        >
                          Open in LogoFX
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <aside className="studio-inspector" aria-label="SVG Construction Anatomy">
          <div className="studio-tabs">
            <button type="button" className="studio-tab" aria-selected="true">
              Construction Anatomy
            </button>
            <button
              type="button"
              className="studio-tab"
              aria-selected="false"
              onClick={() => setXrayDark((v) => !v)}
            >
              {xrayDark ? 'Dark Ground' : 'Light Ground'}
            </button>
          </div>

          <div className="studio-panel-scroll">
            {selectedLogo && anatomy ? (
              <>
                <div className="studio-section">
                  <div className={`anatomy-canvas-box ${xrayDark ? 'is-dark' : ''}`}>
                    <div
                      style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}
                      dangerouslySetInnerHTML={{ __html: selectedLogo.svg }}
                    />
                    <svg
                      viewBox={`${anatomy.viewBox.join(' ')}`}
                      style={{
                        position: 'absolute',
                        inset: 20,
                        width: 'calc(100% - 40px)',
                        height: 'calc(100% - 40px)',
                        pointerEvents: 'none',
                      }}
                    >
                      {showGrid && (
                        <g stroke="rgba(14,165,233,0.35)" strokeWidth={anatomy.viewBox[2] / 256} fill="none">
                          <rect
                            x={anatomy.viewBox[0]}
                            y={anatomy.viewBox[1]}
                            width={anatomy.viewBox[2]}
                            height={anatomy.viewBox[3]}
                          />
                          <line
                            x1={anatomy.viewBox[0] + anatomy.viewBox[2] / 2}
                            y1={anatomy.viewBox[1]}
                            x2={anatomy.viewBox[0] + anatomy.viewBox[2] / 2}
                            y2={anatomy.viewBox[1] + anatomy.viewBox[3]}
                          />
                          <line
                            x1={anatomy.viewBox[0]}
                            y1={anatomy.viewBox[1] + anatomy.viewBox[3] / 2}
                            x2={anatomy.viewBox[0] + anatomy.viewBox[2]}
                            y2={anatomy.viewBox[1] + anatomy.viewBox[3] / 2}
                          />
                          <line
                            x1={anatomy.viewBox[0]}
                            y1={anatomy.viewBox[1]}
                            x2={anatomy.viewBox[0] + anatomy.viewBox[2]}
                            y2={anatomy.viewBox[1] + anatomy.viewBox[3]}
                            strokeDasharray="4 4"
                          />
                        </g>
                      )}
                      {showAnchors && (
                        <g>
                          {anatomy.handles.slice(0, 120).map((h, i) => (
                            <line
                              key={`h-${i}`}
                              x1={h.anchor.x}
                              y1={h.anchor.y}
                              x2={h.control.x}
                              y2={h.control.y}
                              stroke="#f43f5e"
                              strokeWidth={anatomy.viewBox[2] / 320}
                            />
                          ))}
                          {anatomy.anchors.slice(0, 160).map((pt, i) => (
                            <circle
                              key={`a-${i}`}
                              cx={pt.x}
                              cy={pt.y}
                              r={anatomy.viewBox[2] / 90}
                              fill="#0ea5e9"
                              stroke="#ffffff"
                              strokeWidth={anatomy.viewBox[2] / 280}
                            />
                          ))}
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="page-chip-row" style={{ marginTop: 10 }}>
                    <button
                      type="button"
                      className={`page-chip ${showGrid ? 'is-active' : ''}`}
                      onClick={() => setShowGrid(!showGrid)}
                    >
                      Grid Axes
                    </button>
                    <button
                      type="button"
                      className={`page-chip ${showAnchors ? 'is-active' : ''}`}
                      onClick={() => setShowAnchors(!showAnchors)}
                    >
                      Anchors ({anatomy.anchors.length})
                    </button>
                  </div>
                </div>

                <div className="studio-section">
                  <div className="studio-section-title"><span>How It&apos;s Constructed</span></div>
                  <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--studio-section-ink)', margin: '0 0 10px' }}>
                    {selectedLogo.note || selectedLogo.subject}
                  </p>
                  <div className="param-row"><span className="param-label">Mark Type</span><span className="param-value">{selectedLogo.markType}</span></div>
                  <div className="param-row"><span className="param-label">Industry</span><span className="param-value">{selectedLogo.industry}</span></div>
                  <div className="param-row"><span className="param-label">Primitives</span><span className="param-value">{anatomy.shapes} shapes · {anatomy.anchors.length} anchors</span></div>
                  <div className="param-row"><span className="param-label">Audit Score</span><span className="param-value">{anatomy.score}/100</span></div>
                </div>

                <div className="studio-section">
                  <div className="studio-section-title"><span>Techniques &amp; Colors</span></div>
                  <div className="page-chip-row" style={{ marginBottom: 10 }}>
                    {(selectedLogo.techniques || []).map((t) => (
                      <span key={t} className="ldb-badge">{t}</span>
                    ))}
                    {(selectedLogo.geometry || []).map((g) => (
                      <span key={g} className="ldb-badge">{g}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {(selectedLogo.colors || []).map((c) => (
                      <button
                        key={c}
                        type="button"
                        className="ds-action-btn"
                        onClick={() => {
                          setDesignSystem({ primaryHex: c });
                          flash(`Applied ${c} to System Maker`);
                        }}
                      >
                        <span style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
                        <span>{c}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="studio-section" style={{ display: 'grid', gap: 8 }}>
                  <button
                    type="button"
                    className="ds-action-btn is-primary"
                    style={{ justifyContent: 'center', height: 34 }}
                    onClick={() => sendToLogoFX(selectedLogo.brand, selectedLogo.svg, 'logodb')}
                  >
                    Study in LogoFX WebGL2
                  </button>
                  <span style={{ fontSize: 10.5, color: 'var(--studio-dim2)', lineHeight: 1.4 }}>
                    Study reference only — trademarks remain property of their respective owners.
                  </span>
                </div>
              </>
            ) : (
              <div className="studio-section" style={{ fontSize: 12, color: 'var(--studio-muted)' }}>
                Select any logo card to dissect its vectors, anchors, and grid.
              </div>
            )}
          </div>
        </aside>
      </div>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

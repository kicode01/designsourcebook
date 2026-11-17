import { useEffect, useMemo, useState } from 'react';
import { Icon } from './icons';
import { CURATED_MARKS, glyphToSvg, useProject, type ActiveMark } from '../state/project';

export type ExportFormat = 'png' | 'webm';

export function ExportDialog({
  open,
  onClose,
  onExport,
  defaultSize,
  busy,
}: {
  open: boolean;
  onClose: () => void;
  onExport: (format: ExportFormat, size: number, transparent: boolean) => void;
  defaultSize: number;
  busy: boolean;
}) {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [size, setSize] = useState(defaultSize);
  const [transparent, setTransparent] = useState(true);

  useEffect(() => {
    if (open) setSize(defaultSize);
  }, [defaultSize, open]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label="Export">
        <h2>Export LogoFX</h2>
        <p className="sub">Rendered offscreen by the WebGL2 SDF shader pipeline + overlay composite.</p>

        <div className="modal-row">
          <span>Format</span>
          <div className="segment" role="group" aria-label="Format">
            <button type="button" aria-pressed={format === 'png'} onClick={() => setFormat('png')}>
              PNG
            </button>
            <button type="button" aria-pressed={format === 'webm'} onClick={() => setFormat('webm')}>
              Video
            </button>
          </div>
        </div>

        <div className="modal-row">
          <span>Size</span>
          <select value={size} onChange={(e) => setSize(Number(e.target.value))} aria-label="Size">
            {[512, 1024, 1500, 2048, 3000].map((s) => (
              <option key={s} value={s}>
                {s} × {s}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-row">
          <span>Transparent background</span>
          <div className="segment">
            <button type="button" aria-pressed={!transparent} onClick={() => setTransparent(false)}>
              No
            </button>
            <button type="button" aria-pressed={transparent} onClick={() => setTransparent(true)}>
              Yes
            </button>
          </div>
        </div>

        {format === 'webm' && (
          <p className="sub" style={{ marginTop: 12, marginBottom: 0 }}>
            Video records one animation loop straight from the canvas at 30 fps.
          </p>
        )}

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={busy}
            onClick={() => onExport(format, size, transparent)}
          >
            {busy ? 'Rendering…' : format === 'png' ? 'Download PNG' : 'Record video'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function MarkPickerDialog({
  open,
  onClose,
  onSelect,
  onUploadFile,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (mark: ActiveMark) => void;
  onUploadFile: () => void;
}) {
  const { iconPacks, activeMark } = useProject();
  const [sourceTab, setSourceTab] = useState<'packs' | 'logos'>('packs');
  const [packId, setPackId] = useState('all');
  const [q, setQ] = useState('');
  const [brandLogos, setBrandLogos] = useState<{ id: string; brand: string; svg: string }[]>([]);
  const [logosLoading, setLogosLoading] = useState(false);

  const glyphs = useMemo(() => {
    const out: { pack: string; name: string; svg: string }[] = [];
    const nq = q.trim().toLowerCase();
    for (const [pid, pk] of Object.entries(iconPacks)) {
      if (packId !== 'all' && pid !== packId) continue;
      for (const g of pk.glyphs || []) {
        if (nq && !g.name.toLowerCase().includes(nq) && !pid.toLowerCase().includes(nq)) continue;
        out.push({ pack: pid, name: g.name, svg: glyphToSvg(g, pk.grid || 24, '#fafafa') });
      }
    }
    return out.slice(0, 72);
  }, [iconPacks, packId, q]);

  useEffect(() => {
    if (!open || sourceTab !== 'logos') return;
    let cancelled = false;
    setLogosLoading(true);
    const params = new URLSearchParams({ page: '1', limit: '36' });
    if (q.trim()) params.set('q', q.trim());
    fetch(`/api/logos?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && d.ok && Array.isArray(d.items)) {
          setBrandLogos(d.items);
        }
      })
      .catch(() => { /* ignore */ })
      .finally(() => { if (!cancelled) setLogosLoading(false); });
    return () => { cancelled = true; };
  }, [open, sourceTab, q]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" style={{ width: 'min(640px, calc(100vw - 32px))' }} onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label="Choose Vector Mark">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <h2>Choose Source Mark</h2>
          <button type="button" className="icon-button" aria-label="Close" onClick={onClose}>
            <Icon name="x" size={16} />
          </button>
        </div>
        <p className="sub">Load a Design Sourcebook mark, custom SVG, verified UI glyph, or brand mark from Catalog.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, alignItems: 'center' }}>
          {CURATED_MARKS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`ds-action-btn ${activeMark.id === m.id ? 'is-primary' : ''}`}
              onClick={() => { onSelect(m); onClose(); }}
            >
              {m.name}
            </button>
          ))}
          <button type="button" className="ds-action-btn" onClick={() => { onClose(); onUploadFile(); }}>
            <Icon name="upload" size={13} /> Upload SVG / PNG
          </button>
          <a
            href="../#/logos"
            className="ds-action-btn"
            style={{ marginLeft: 'auto' }}
            title="Inspect SVG Construction Anatomy in Catalog"
          >
            Logo DB <Icon name="arrowUpRight" size={12} />
          </a>
        </div>

        <div className="segment" role="group" aria-label="Mark source" style={{ marginBottom: 10 }}>
          <button type="button" aria-pressed={sourceTab === 'packs'} onClick={() => setSourceTab('packs')}>
            UI Icon Packs ({Object.keys(iconPacks).length})
          </button>
          <button type="button" aria-pressed={sourceTab === 'logos'} onClick={() => setSourceTab('logos')}>
            Brand Logos (1,432)
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <label className="ldb-search" style={{ flex: 1 }}>
            <Icon name="search" size={13} />
            <input
              placeholder={sourceTab === 'packs' ? 'Filter verified UI glyphs…' : 'Search 1,432 company logos…'}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          {sourceTab === 'packs' && (
            <select className="ldb-select" value={packId} onChange={(e) => setPackId(e.target.value)}>
              <option value="all">All Packs ({Object.keys(iconPacks).length})</option>
              {Object.keys(iconPacks).sort().map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          )}
        </div>

        <div className="icon-pick-grid">
          {sourceTab === 'packs' ? (
            glyphs.map((g) => (
              <button
                key={`${g.pack}-${g.name}`}
                type="button"
                className="icon-pick-cell"
                onClick={() => {
                  onSelect({
                    id: `${g.pack}-${g.name}`,
                    name: `${g.pack} / ${g.name}`,
                    svg: g.svg.replace(/currentColor/gi, '#FFFFFF'),
                    source: 'iconpack',
                  });
                  onClose();
                }}
              >
                <span style={{ color: '#fafafa', display: 'grid', placeItems: 'center' }} dangerouslySetInnerHTML={{ __html: g.svg }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>{g.name}</span>
              </button>
            ))
          ) : logosLoading && brandLogos.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 24, fontSize: 12, color: 'var(--studio-muted)' }}>
              Querying 1,432 logos…
            </div>
          ) : (
            brandLogos.map((logo) => (
              <button
                key={logo.id}
                type="button"
                className="icon-pick-cell"
                onClick={() => {
                  onSelect({
                    id: logo.id,
                    name: logo.brand,
                    svg: logo.svg.replace(/currentColor/gi, '#FFFFFF'),
                    source: 'logodb',
                  });
                  onClose();
                }}
              >
                <span
                  style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', overflow: 'hidden' }}
                  dangerouslySetInnerHTML={{
                    __html: logo.svg
                      .replace(/\swidth="[^"]*"/i, ' width="24"')
                      .replace(/\sheight="[^"]*"/i, ' height="24"'),
                  }}
                />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>{logo.brand}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

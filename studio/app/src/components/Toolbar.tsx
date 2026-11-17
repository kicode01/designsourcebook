import { Icon } from './icons';
import { useStudio } from '../state/studio';

interface Props {
  onPickMark: () => void;
  onUpload: () => void;
  onExport: () => void;
  onFlip: () => void;
}

export function Toolbar({ onPickMark, onUpload, onExport, onFlip }: Props) {
  const { state, dispatch } = useStudio();
  const { doc, ui, past, future } = state;

  const zoomBy = (delta: number) =>
    dispatch({ type: 'setUI', patch: { zoom: Math.min(200, Math.max(25, ui.zoom + delta)) } });

  return (
    <>
      <div className={`studio-toolbar ${ui.collapsed ? 'is-hidden' : ''}`}>
        <div className="toolbar-pill is-plain">
          <button type="button" className="toolbar-button" onClick={onPickMark}>
            <Icon name="grid" size={14} />
            <span>Mark</span>
          </button>
          <button type="button" className="toolbar-button" onClick={onUpload}>
            <Icon name="upload" size={14} />
            <span>Upload</span>
          </button>
        </div>

        <div className="toolbar-pill">
          <button
            type="button"
            className="toolbar-button is-icon"
            aria-label={doc.animation.animate ? 'Pause animation' : 'Play animation'}
            title={doc.animation.animate ? 'Pause animation' : 'Play animation'}
            onClick={() => dispatch({ type: 'setAnimation', patch: { animate: !doc.animation.animate } })}
          >
            <Icon name={doc.animation.animate ? 'pause' : 'play'} size={14} />
          </button>
          <button
            type="button"
            className="toolbar-button is-icon"
            aria-label="Undo"
            disabled={past.length === 0}
            onClick={() => dispatch({ type: 'undo' })}
          >
            <Icon name="undo" size={15} />
          </button>
          <button
            type="button"
            className="toolbar-button is-icon"
            aria-label="Redo"
            disabled={future.length === 0}
            onClick={() => dispatch({ type: 'redo' })}
          >
            <Icon name="redo" size={15} />
          </button>
          <button type="button" className="toolbar-button is-icon" aria-label="Flip horizontally" onClick={onFlip}>
            <Icon name="flip" size={15} />
          </button>
        </div>

        <button
          type="button"
          className={`toolbar-square ${ui.collapsed ? 'is-active' : ''}`}
          aria-label={ui.collapsed ? 'Show settings panel' : 'Hide settings panel'}
          aria-controls="studio-inspector"
          aria-expanded={!ui.collapsed}
          onClick={() => dispatch({ type: 'setUI', patch: { collapsed: !ui.collapsed } })}
        >
          <Icon name="panel" size={16} />
        </button>

        <div className="toolbar-pill">
          <button type="button" className="toolbar-button is-icon" aria-label="Zoom out" onClick={() => zoomBy(-25)}>
            <Icon name="zoomOut" size={14} />
          </button>
          <span className="zoom-value">{ui.zoom}%</span>
          <button type="button" className="toolbar-button is-icon" aria-label="Zoom in" onClick={() => zoomBy(25)}>
            <Icon name="zoomIn" size={14} />
          </button>
        </div>

        <div className="export-split">
          <button type="button" className="export-main" onClick={onExport}>
            Export
          </button>
          <button type="button" className="export-caret" aria-label="Export options" onClick={onExport}>
            <Icon name="chevronDown" size={13} />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="studio-corner-button is-right"
        aria-label={ui.collapsed ? 'Show settings panel' : 'Hide settings panel'}
        onClick={() => dispatch({ type: 'setUI', patch: { collapsed: !ui.collapsed } })}
      >
        <Icon name="chevronRight" size={16} style={{ transform: ui.collapsed ? 'rotate(180deg)' : 'none' }} />
      </button>
    </>
  );
}

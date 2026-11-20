import { useMemo, useState } from 'react';
import { labelFor } from '../../data/effects';
import type { AnimationState, CanvasState, Transform } from '../../state/studio';
import {
  EXTENDED_EASINGS,
  MOTION_PRESETS,
  computeChoreographedTransform,
  evaluateEasing,
  type LoopMode,
  type MotionPresetId,
  type StageAspectMode,
} from './logoFxUtils';

interface LogoFxVideoStudioProps {
  effectId: string;
  markName: string;
  animation: AnimationState;
  transform: Transform;
  canvasState: CanvasState;
  recording: boolean;
  recordProgressPct: number;
  recordedVideoUrl: string | null;
  storyboardThumbs: string[];
  onPatchAnimation: (patch: Partial<AnimationState>) => void;
  onPatchCanvas: (patch: Partial<CanvasState>) => void;
  onRecordVideo: (opts: { aspect: StageAspectMode; fps: 30 | 60; loops: 1 | 2; mbps: 8 | 16 }) => void;
  onExportSpriteSheet: () => void;
  onSeekPhase: (phase01: number) => void;
}

export function LogoFxVideoStudio({
  effectId,
  markName,
  animation,
  transform,
  canvasState,
  recording,
  recordProgressPct,
  recordedVideoUrl,
  storyboardThumbs,
  onPatchAnimation,
  onPatchCanvas,
  onRecordVideo,
  onExportSpriteSheet,
  onSeekPhase,
}: LogoFxVideoStudioProps) {
  const [fps, setFps] = useState<30 | 60>(60);
  const [loops, setLoops] = useState<1 | 2>(1);
  const [mbps, setMbps] = useState<8 | 16>(16);

  const totalFrames = Math.round(animation.duration * fps * loops);

  const keyframes = useMemo(() => {
    return Array.from({ length: 8 }, (_, idx) => {
      const rawT = idx / 8;
      const eased = evaluateEasing(animation.easing, rawT);
      const tf = computeChoreographedTransform(
        transform,
        { ...animation, animate: true },
        eased,
      );
      return {
        idx,
        pct: Math.round(rawT * 100),
        timeSec: (rawT * animation.duration).toFixed(2),
        easedPct: Math.round(eased * 100),
        rx: Math.round(tf.rotateX),
        ry: Math.round(tf.rotateY),
        rz: Math.round(tf.rotateZ),
        scale: Math.round(tf.scale),
      };
    });
  }, [animation, transform]);

  const easingCurvePath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const y = evaluateEasing(animation.easing, t);
      const px = (8 + t * 224).toFixed(1);
      const py = (76 - y * 60).toFixed(1);
      pts.push(`${i === 0 ? 'M' : 'L'}${px} ${py}`);
    }
    return pts.join(' ');
  }, [animation.easing]);

  return (
    <div className="createx-lab-scroll" aria-label="LogoFX Motion & Video Mastering Studio">
      <div className="createx-lab-header">
        <div>
          <span className="createx-lab-eyebrow">PHASE-LOCKED VIDEO &amp; CHOREOGRAPHY MASTERING</span>
          <h2 className="createx-lab-title">
            {markName} · {labelFor(effectId)} Video Studio
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="ds-action-btn"
            disabled={recording}
            onClick={onExportSpriteSheet}
          >
            Export 4×4 Sprite Sheet PNG
          </button>
          <button
            type="button"
            className="ds-action-btn is-primary"
            disabled={recording}
            onClick={() =>
              onRecordVideo({
                aspect: canvasState.aspect ?? '1:1',
                fps,
                loops,
                mbps,
              })
            }
          >
            {recording ? `Rendering Video (${recordProgressPct}%)…` : `Render ${fps}fps Video Master`}
          </button>
        </div>
      </div>

      {/* Top Mastering Config Bar */}
      <div className="createx-lockup-sliders" style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}>
        <div className="createx-lockup-field">
          <span>Video Aspect Ratio</span>
          <div className="page-segmented">
            {(['1:1', '16:9', '9:16'] as StageAspectMode[]).map((asp) => (
              <button
                key={asp}
                type="button"
                aria-pressed={(canvasState.aspect ?? '1:1') === asp}
                onClick={() => onPatchCanvas({ aspect: asp })}
              >
                {asp}
              </button>
            ))}
          </div>
        </div>

        <div className="createx-lockup-field">
          <span>Frame Rate</span>
          <div className="page-segmented">
            {([30, 60] as const).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={fps === f}
                onClick={() => setFps(f)}
              >
                {f} FPS
              </button>
            ))}
          </div>
        </div>

        <div className="createx-lockup-field">
          <span>Loop Mode</span>
          <div className="page-segmented">
            {(
              [
                ['loop', 'Loop'],
                ['pingpong', 'Bounce'],
                ['once', 'Once'],
              ] as [LoopMode, string][]
            ).map(([lm, lbl]) => (
              <button
                key={lm}
                type="button"
                aria-pressed={(animation.loopMode ?? 'loop') === lm}
                onClick={() => onPatchAnimation({ loopMode: lm })}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>

        <div className="createx-lockup-field">
          <span>Loop Cycles</span>
          <div className="page-segmented">
            {([1, 2] as const).map((lp) => (
              <button
                key={lp}
                type="button"
                aria-pressed={loops === lp}
                onClick={() => setLoops(lp)}
              >
                {lp}× ({(animation.duration * lp).toFixed(1)}s)
              </button>
            ))}
          </div>
        </div>

        <div className="createx-lockup-field">
          <span>Video Bitrate</span>
          <div className="page-segmented">
            {([8, 16] as const).map((b) => (
              <button
                key={b}
                type="button"
                aria-pressed={mbps === b}
                onClick={() => setMbps(b)}
              >
                {b} Mbps
              </button>
            ))}
          </div>
        </div>

        <label className="createx-lockup-field">
          <span>
            Cycle Duration · {animation.duration.toFixed(1)}s ({totalFrames}f)
          </span>
          <input
            type="range"
            min={1}
            max={12}
            step={0.5}
            value={animation.duration}
            onChange={(e) => onPatchAnimation({ duration: Number(e.target.value) })}
          />
        </label>
      </div>

      {recording && (
        <div className="lfx-record-progress-card" role="status">
          <div className="lfx-record-progress-head">
            <strong>Phase-Locked WebGL2 Video Render in Progress…</strong>
            <span>
              {recordProgressPct}% · {fps} FPS · {canvasState.aspect ?? '1:1'}
            </span>
          </div>
          <div className="lfx-record-progress-track">
            <div className="lfx-record-progress-fill" style={{ width: `${recordProgressPct}%` }} />
          </div>
        </div>
      )}

      <div className="createx-lab-grid">
        {/* 1. 8-Frame Phase Storyboard & Keyframe Inspector */}
        <section className="createx-lab-card" style={{ gridColumn: '1 / -1' }}>
          <header className="createx-lab-card-head">
            <div>
              <strong>1. 8-Phase Loop Storyboard &amp; Keyframe Scrubber</strong>
              <span>Click any phase card to seek the shader clock and inspect exact 3D choreography angles</span>
            </div>
            <span className="createx-lab-badge">
              {animation.motionPreset} · {animation.easing} · {animation.duration}s
            </span>
          </header>
          <div className="lfx-storyboard-strip">
            {keyframes.map((kf, i) => (
              <button
                key={kf.idx}
                type="button"
                className="lfx-storyboard-card"
                onClick={() => onSeekPhase(kf.idx / 8)}
              >
                <div className="lfx-storyboard-head">
                  <strong>{kf.pct}%</strong>
                  <span>{kf.timeSec}s</span>
                </div>
                <div className="lfx-storyboard-thumb">
                  {storyboardThumbs[i] ? (
                    <img
                      src={storyboardThumbs[i]}
                      alt={`Phase ${kf.pct}%`}
                      style={{
                        transform: `perspective(320px) rotateX(${kf.rx * 0.65}deg) rotateY(${kf.ry * 0.65}deg) rotateZ(${kf.rz * 0.25}deg) scale(${(kf.scale / 100).toFixed(2)})`,
                      }}
                    />
                  ) : (
                    <span className="lfx-showcase-fallback">{kf.pct}%</span>
                  )}
                </div>
                <div className="lfx-storyboard-angles">
                  <span>
                    X:{kf.rx}° Y:{kf.ry}°
                  </span>
                  <span>{kf.scale}%</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 2. 3D Motion Choreography Selector */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>2. 3D Camera &amp; Motion Choreography (10)</strong>
              <span>Synchronizes 3D perspective tilt, orbit, and scale with shader uProgress</span>
            </div>
            <span className="createx-lab-badge">Intensity {animation.motionIntensity ?? 100}%</span>
          </header>
          <label className="createx-angle-row" style={{ marginBottom: 4 }}>
            <span>Motion Intensity · {animation.motionIntensity ?? 100}%</span>
            <input
              type="range"
              min={0}
              max={200}
              step={5}
              value={animation.motionIntensity ?? 100}
              onChange={(e) => onPatchAnimation({ motionIntensity: Number(e.target.value) })}
            />
          </label>
          <div className="lfx-motion-preset-grid">
            {MOTION_PRESETS.map((mp) => (
              <button
                key={mp.id}
                type="button"
                className={`lfx-motion-card ${(animation.motionPreset ?? 'float-3d') === mp.id ? 'is-active' : ''}`}
                onClick={() => onPatchAnimation({ motionPreset: mp.id as MotionPresetId, animate: true })}
              >
                <strong>{mp.label}</strong>
                <span>{mp.description}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Easing Curve Visualizer & Video Master Player */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>3. Temporal Easing Curve &amp; Rendered Video Preview</strong>
              <span>Shapes uProgress (0→1) and uTime (0→2π) across every shader and 3D rig</span>
            </div>
            <span className="createx-lab-badge">{animation.easing}</span>
          </header>

          <div className="lfx-easing-box">
            <svg viewBox="0 0 240 84" className="lfx-easing-svg" aria-label="Easing curve graph">
              <line x1="8" y1="76" x2="232" y2="76" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <line x1="8" y1="16" x2="232" y2="16" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="8" y1="76" x2="232" y2="16" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
              <path d={easingCurvePath} fill="none" stroke="#0ea5e9" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <div className="page-chip-row" style={{ marginTop: 6 }}>
              {EXTENDED_EASINGS.map((ea) => (
                <button
                  key={ea.id}
                  type="button"
                  className={`page-chip ${animation.easing === ea.id ? 'is-active' : ''}`}
                  onClick={() => onPatchAnimation({ easing: ea.id })}
                >
                  {ea.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="lfx-video-preview-box">
            {recordedVideoUrl ? (
              <div className="lfx-video-player-wrap">
                <video
                  src={recordedVideoUrl}
                  controls
                  loop
                  autoPlay
                  muted
                  playsInline
                  className="lfx-video-element"
                />
                <div className="lfx-video-player-actions">
                  <span>Rendered Master Ready ({fps} FPS · WebM)</span>
                  <a
                    href={recordedVideoUrl}
                    download={`logofx-${effectId.replace(/[:]/g, '-')}-${fps}fps.webm`}
                    className="ds-action-btn is-primary"
                  >
                    Download Video
                  </a>
                </div>
              </div>
            ) : (
              <div className="lfx-video-placeholder">
                <strong>Ready to Render Phase-Locked Video</strong>
                <span>
                  Click &ldquo;Render {fps}fps Video Master&rdquo; above to record a seamless loop starting at exact frame 0 with 3D motion choreography, studio backdrop, and shader post-processing.
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

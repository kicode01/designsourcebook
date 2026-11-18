import React, { memo, useRef } from 'react';
import {
  Button,
  Menu,
  SearchField,
  SegmentedControl,
  Slider,
  Switch,
  TabBar,
} from 'glisse';

export interface CatalogSystemData {
  slug: string;
  name: string;
  org?: string;
  style?: string;
  overview?: string;
  theme?: string;
  canvas: string;
  surface: string;
  text: string;
  muted: string;
  brand: string;
  border: string;
  radius: string;
}

function firstSentence(raw?: string): string {
  if (!raw) {
    return "Apple's interface language pairs SF Pro optical typography and binary light/dark surfaces with tactile Liquid Glass controls.";
  }
  const line = String(raw)
    .split('\n')[0]
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
  if (line.length <= 210) return line;
  const cut = line.slice(0, 210);
  const m = cut.match(/^[\s\S]*[.!?](?=\s)/);
  return m ? m[0] : cut.replace(/\s+\S*$/, '') + '…';
}

/**
 * Memoized inner controls so parent theme switches or interactions never trigger
 * unnecessary glisse useRefraction canvas refits during pointer gestures.
 */
const GlisseControlStrip = memo(function GlisseControlStrip() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22 }}>
      {/* Primary interactive row: Buttons, SegmentedControl, and Menu */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Button variant="filled" tint="#0071e3">
          Continue
        </Button>
        <Button>Secondary</Button>
        <Button tint="var(--apple-link-tint, #0066cc)">Learn more</Button>

        <SegmentedControl
          aria-label="Platform target"
          defaultValue="ios"
          items={[
            { value: 'ios', label: 'iOS 26' },
            { value: 'macos', label: 'macOS' },
            { value: 'visionos', label: 'visionOS' },
          ]}
        />

        <Menu
          aria-label="Options"
          align="start"
          items={[
            { label: 'Human Interface Guidelines' },
            { label: 'SF Pro Optical Sizing' },
            { label: 'Liquid Glass Material' },
            'separator',
            { label: 'Reset Controls', destructive: true },
          ]}
        />
      </div>

      {/* Secondary interactive row: SearchField, TabBar, Switch, and Slider */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <SearchField
          placeholder="Search Guidelines…"
          style={{ width: 240, maxWidth: '100%' }}
        />

        <TabBar
          aria-label="Section navigation"
          defaultValue="foundations"
          items={[
            { value: 'foundations', label: 'Foundations' },
            { value: 'patterns', label: 'Patterns' },
            { value: 'components', label: 'Components' },
          ]}
        />

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft: 4,
          }}
        >
          <Switch defaultChecked aria-label="Toggle setting" />
        </div>

        <div style={{ width: 170, display: 'inline-flex', alignItems: 'center' }}>
          <Slider defaultValue={64} min={0} max={100} step={1} aria-label="Value slider" />
        </div>
      </div>
    </div>
  );
});

export interface AppleLiquidGlassStageProps {
  compact?: boolean;
  systemName?: string;
  overview?: string;
  defaultPolarity?: 'light' | 'dark';
}

/**
 * Clean, zero-lag Apple HIG + Liquid Glass (glisse) hero specimen.
 * Updates polarity via direct DOM attributes on the container ref so glisse
 * components never re-render on every frame during spring/lens gestures.
 */
export const AppleLiquidGlassStage = memo(function AppleLiquidGlassStage({
  compact = false,
  overview,
  defaultPolarity = 'light',
}: AppleLiquidGlassStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const setPolarity = (mode: 'light' | 'dark') => {
    const el = containerRef.current;
    if (!el) return;
    el.setAttribute('data-theme', mode);
    el.style.background = mode === 'dark' ? '#000000' : '#f5f5f7';
    el.style.color = mode === 'dark' ? '#f5f5f7' : '#1d1d1f';
    el.style.setProperty('--apple-link-tint', mode === 'dark' ? '#2997ff' : '#0066cc');
    const sub = el.querySelector<HTMLElement>('[data-apple-sub]');
    if (sub) {
      sub.style.color = mode === 'dark' ? 'rgba(245, 245, 247, 0.68)' : 'rgba(29, 29, 31, 0.72)';
    }
  };

  const isDarkInit = defaultPolarity === 'dark';

  return (
    <div
      ref={containerRef}
      className="ds-glisse-stage"
      data-theme={defaultPolarity}
      style={{
        ['--apple-link-tint' as string]: isDarkInit ? '#2997ff' : '#0066cc',
        position: 'relative',
        padding: compact ? '24px 26px' : '38px 40px',
        background: isDarkInit ? '#000000' : '#f5f5f7',
        color: isDarkInit ? '#f5f5f7' : '#1d1d1f',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        transition: 'background-color 220ms ease, color 220ms ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ maxWidth: '62ch' }}>
          <h1
            style={{
              margin: '0 0 10px',
              fontSize: compact ? 32 : 44,
              fontWeight: 600,
              lineHeight: 1.07,
              letterSpacing: '-0.022em',
            }}
          >
            Design with intent.
          </h1>
          <p
            data-apple-sub=""
            style={{
              margin: 0,
              fontSize: compact ? 14.5 : 16.5,
              lineHeight: 1.5,
              letterSpacing: '-0.016em',
              color: isDarkInit ? 'rgba(245, 245, 247, 0.68)' : 'rgba(29, 29, 31, 0.72)',
              transition: 'color 220ms ease',
            }}
          >
            {firstSentence(overview)}
          </p>
        </div>

        <SegmentedControl
          aria-label="Appearance"
          defaultValue={defaultPolarity}
          onValueChange={(val) => setPolarity(val as 'light' | 'dark')}
          items={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
        />
      </div>

      <GlisseControlStrip />
    </div>
  );
});

export function SystemEasterEggBanner({ system }: { system: CatalogSystemData }) {
  if (system.slug.toLowerCase() !== 'apple') return null;
  return (
    <AppleLiquidGlassStage
      systemName={system.name}
      overview={system.overview || system.style}
      defaultPolarity="light"
    />
  );
}

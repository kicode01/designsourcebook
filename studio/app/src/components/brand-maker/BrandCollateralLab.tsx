import { useMemo } from 'react';
import { fontStyleFor, pickReadableFg } from '../../engine/dsEngine';
import { adaptSvgPaintForSurface } from '../../engine/svgPaint';
import {
  buildBusinessCardSvg,
  buildOgCardSvg,
  buildPatternStyle,
  type Brand,
} from './brandMakerUtils';

interface BrandCollateralLabProps {
  brand: Brand;
  markSvg: string;
  onExportOgSvg: () => void;
  onExportBizCardSvg: () => void;
  onFlash: (msg: string) => void;
}

function fitCollateralSvg(svgText: string, inkHex: string, prefix: string): string {
  return adaptSvgPaintForSurface(svgText, inkHex, prefix)
    .replace(/\swidth="[^"]*"/i, ' width="100%"')
    .replace(/\sheight="[^"]*"/i, ' height="100%"');
}

export function BrandCollateralLab({
  brand,
  markSvg,
  onExportOgSvg,
  onExportBizCardSvg,
  onFlash,
}: BrandCollateralLabProps) {
  const displayStyle = fontStyleFor(brand.displayFont, 'display');
  const bodyStyle = fontStyleFor(brand.bodyFont, 'body');
  const accentFg = pickReadableFg(brand.accent);
  const patternCss = useMemo(
    () => buildPatternStyle(brand.pattern, brand.accent, brand.ink),
    [brand.pattern, brand.accent, brand.ink],
  );

  const markAccent = useMemo(() => fitCollateralSvg(markSvg, brand.accent, 'col-acc-'), [markSvg, brand.accent]);
  const markOnAccent = useMemo(() => fitCollateralSvg(markSvg, accentFg, 'col-oa-'), [markSvg, accentFg]);
  const ogSvg = useMemo(() => buildOgCardSvg(brand, markSvg), [brand, markSvg]);
  const bizSvg = useMemo(() => buildBusinessCardSvg(brand, markSvg), [brand, markSvg]);

  const copyEmailSignatureHtml = () => {
    const html = `<table cellpadding="0" cellspacing="0" style="font-family:system-ui,-apple-system,sans-serif;color:${brand.ink};background:${brand.background};padding:16px 20px;border-radius:${brand.radiusPx}px;border:1px solid ${brand.accent}44">
  <tr>
    <td style="padding-right:16px;border-right:2px solid ${brand.accent}">
      <strong style="font-size:16px;display:block">${brand.name}</strong>
      <span style="font-size:11px;color:${brand.accent};font-family:monospace">${brand.handle}</span>
    </td>
    <td style="padding-left:16px">
      <div style="font-weight:700;font-size:14px">Alex Rivera</div>
      <div style="font-size:12px;opacity:0.75">Principal Design Systems Architect · ${brand.name}</div>
      <div style="font-size:11.5px;margin-top:4px;font-family:monospace">alex@${brand.voice.domain} · https://${brand.voice.domain}</div>
    </td>
  </tr>
</table>`;
    void navigator.clipboard.writeText(html);
    onFlash('Copied HTML Email Signature to clipboard');
  };

  return (
    <div className="createx-lab-scroll" aria-label="Brand Collateral & Real-World Touchpoint Lab">
      <div className="createx-lab-header">
        <div>
          <span className="createx-lab-eyebrow">REAL-WORLD TOUCHPOINTS &amp; COLLATERAL STUDIO</span>
          <h2 className="createx-lab-title">{brand.name} — Multi-Channel Collateral Suite</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="ds-action-btn" onClick={onExportBizCardSvg}>
            Export Business Card SVG
          </button>
          <button type="button" className="ds-action-btn is-primary" onClick={onExportOgSvg}>
            Export 1200×630 OG Card SVG
          </button>
        </div>
      </div>

      <div className="createx-lab-grid">
        {/* 1. SaaS Landing Page Hero & Navigation Masthead (Full-Width Card) */}
        <section className="createx-lab-card" style={{ gridColumn: '1 / -1' }}>
          <header className="createx-lab-card-head">
            <div>
              <strong>1. Product Web Hero &amp; Navigation Masthead</strong>
              <span>Live web application shell applying brand surface, accent CTA, radius, and display typography</span>
            </div>
            <span className="createx-lab-badge">https://{brand.voice.domain}</span>
          </header>
          <div
            className="bx-col-web-hero"
            style={{
              background: brand.background,
              color: brand.ink,
              borderRadius: Math.max(8, brand.radiusPx + 4),
              border: `1px solid ${brand.ink}22`,
              ...bodyStyle,
            }}
          >
            <div className="bx-col-web-nav" style={{ borderBottom: `1px solid ${brand.ink}18` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 26, height: 26 }} dangerouslySetInnerHTML={{ __html: markAccent }} />
                <strong style={{ ...displayStyle, fontSize: 15 }}>{brand.name}</strong>
                <span
                  style={{
                    fontSize: 10,
                    padding: '2px 7px',
                    borderRadius: 999,
                    background: `${brand.accent}22`,
                    color: brand.accent,
                    fontWeight: 700,
                  }}
                >
                  {brand.voice.category}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12 }}>
                <span style={{ opacity: 0.72 }}>Architecture</span>
                <span style={{ opacity: 0.72 }}>Documentation</span>
                <span style={{ opacity: 0.72 }}>Changelog</span>
                <span
                  style={{
                    padding: '5px 12px',
                    borderRadius: brand.radiusPx,
                    background: brand.accent,
                    color: accentFg,
                    fontWeight: 600,
                    fontSize: 11.5,
                  }}
                >
                  {brand.voice.ctaText}
                </span>
              </div>
            </div>

            <div className="bx-col-web-body">
              <div className="bx-col-web-copy">
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '3px 10px',
                    borderRadius: 999,
                    border: `1px solid ${brand.accent}55`,
                    color: brand.accent,
                    fontSize: 10.5,
                    fontWeight: 700,
                    width: 'fit-content',
                  }}
                >
                  {brand.voice.pillars.join(' · ')}
                </div>
                <h3 style={{ ...displayStyle, fontSize: 30, margin: '10px 0 8px', lineHeight: 1.08, letterSpacing: '-0.03em' }}>
                  {brand.tagline}
                </h3>
                <p style={{ margin: 0, fontSize: 13, opacity: 0.75, maxWidth: 520 }}>
                  Built with {brand.name} verified tokens — {brand.voice.weAre.toLowerCase()}.
                </p>
                <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                  <span
                    style={{
                      padding: '8px 16px',
                      borderRadius: brand.radiusPx,
                      background: brand.accent,
                      color: accentFg,
                      fontWeight: 700,
                      fontSize: 12.5,
                    }}
                  >
                    {brand.voice.ctaText} →
                  </span>
                  <span
                    style={{
                      padding: '8px 16px',
                      borderRadius: brand.radiusPx,
                      border: `1px solid ${brand.ink}2e`,
                      color: brand.ink,
                      fontWeight: 600,
                      fontSize: 12.5,
                    }}
                  >
                    {brand.handle}
                  </span>
                </div>
              </div>
              <div
                className="bx-col-web-art"
                style={{
                  borderRadius: Math.max(6, brand.radiusPx),
                  border: `1px solid ${brand.ink}22`,
                  ...patternCss,
                }}
              >
                <div
                  style={{
                    width: 82,
                    height: 82,
                    padding: 16,
                    borderRadius: Math.max(12, brand.radiusPx * 1.4),
                    background: brand.accent,
                    boxShadow: '0 14px 32px rgba(0,0,0,0.32)',
                  }}
                  dangerouslySetInnerHTML={{ __html: markOnAccent }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Open Graph 1200x630 Social Share Card */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>2. Open Graph &amp; Social Unfurl Card (1200×630)</strong>
              <span>X / LinkedIn / Slack / Discord link preview card with brand glow and palette bar</span>
            </div>
            <button type="button" className="page-chip" onClick={onExportOgSvg}>
              Download SVG
            </button>
          </header>
          <div
            className="bx-col-svg-frame"
            dangerouslySetInnerHTML={{ __html: ogSvg }}
          />
        </section>

        {/* 3. Executive Business Card (Front & Back Print Sheet) */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>3. Executive Business Card (85×55mm Front &amp; Back)</strong>
              <span>Dual-sided print &amp; NFC pass specification with typographic reverse directory</span>
            </div>
            <button type="button" className="page-chip" onClick={onExportBizCardSvg}>
              Download SVG
            </button>
          </header>
          <div
            className="bx-col-svg-frame"
            dangerouslySetInnerHTML={{ __html: bizSvg }}
          />
        </section>

        {/* 4. Mobile App Icon, Push Notification & Live Widget */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>4. Mobile OS Launcher, Notification &amp; Widget</strong>
              <span>iOS Squircle home icon, push notification banner, and live telemetry widget</span>
            </div>
            <span className="createx-lab-badge">iOS / Android</span>
          </header>
          <div className="bx-col-mobile-suite">
            <div className="bx-col-app-launcher">
              <div
                className="bx-col-squircle"
                style={{ background: brand.accent }}
                dangerouslySetInnerHTML={{ __html: markOnAccent }}
              />
              <span>{brand.name}</span>
            </div>
            <div className="bx-col-notif-stack">
              <div
                className="bx-col-notif"
                style={{
                  background: brand.background,
                  color: brand.ink,
                  borderRadius: Math.max(10, brand.radiusPx),
                  border: `1px solid ${brand.ink}24`,
                }}
              >
                <div
                  className="bx-col-notif-icon"
                  style={{ background: brand.accent }}
                  dangerouslySetInnerHTML={{ __html: markOnAccent }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                    <strong>{brand.name}</strong>
                    <span style={{ opacity: 0.55 }}>now</span>
                  </div>
                  <div style={{ fontSize: 11.5, opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {brand.tagline}
                  </div>
                </div>
              </div>
              <div
                className="bx-col-widget"
                style={{
                  background: `${brand.accent}16`,
                  color: brand.ink,
                  borderRadius: Math.max(10, brand.radiusPx),
                  border: `1px solid ${brand.accent}44`,
                }}
              >
                <div>
                  <span style={{ fontSize: 9.5, fontFamily: 'monospace', color: brand.accent, fontWeight: 700 }}>
                    LIVE TELEMETRY
                  </span>
                  <strong style={{ display: 'block', fontSize: 14, ...displayStyle }}>
                    {brand.voice.domain}
                  </strong>
                </div>
                <span
                  style={{
                    padding: '4px 9px',
                    borderRadius: 999,
                    background: brand.accent,
                    color: accentFg,
                    fontSize: 10.5,
                    fontWeight: 700,
                  }}
                >
                  99.99% OK
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Official HTML Email Signature & Document Masthead */}
        <section className="createx-lab-card">
          <header className="createx-lab-card-head">
            <div>
              <strong>5. Corporate Email Signature &amp; Press Masthead</strong>
              <span>Ready-to-paste HTML table email signature for team communication</span>
            </div>
            <button type="button" className="page-chip" onClick={copyEmailSignatureHtml}>
              Copy HTML Signature
            </button>
          </header>
          <div
            className="bx-col-email-card"
            style={{
              background: brand.background,
              color: brand.ink,
              borderRadius: Math.max(8, brand.radiusPx),
              border: `1px solid ${brand.ink}24`,
            }}
          >
            <div className="bx-col-email-left" style={{ borderRight: `2px solid ${brand.accent}` }}>
              <div style={{ width: 36, height: 36 }} dangerouslySetInnerHTML={{ __html: markAccent }} />
              <strong style={{ ...displayStyle, fontSize: 14 }}>{brand.name}</strong>
              <span style={{ fontSize: 10.5, color: brand.accent, fontFamily: 'monospace' }}>{brand.handle}</span>
            </div>
            <div className="bx-col-email-right">
              <strong style={{ fontSize: 13.5 }}>Alex Rivera</strong>
              <span style={{ fontSize: 11.5, opacity: 0.75 }}>
                Principal Design Systems Architect · {brand.name}
              </span>
              <code style={{ fontSize: 11, color: brand.accent, marginTop: 4 }}>
                alex@{brand.voice.domain} · https://{brand.voice.domain}
              </code>
              <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>
                {brand.palette.map((c, i) => (
                  <span
                    key={i}
                    style={{ width: 14, height: 6, borderRadius: 3, background: c, display: 'inline-block' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

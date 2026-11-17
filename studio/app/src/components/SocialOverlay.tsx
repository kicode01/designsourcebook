import { useEffect, useRef } from 'react';
import { SOCIAL_IDS } from '../data/effects';

interface Props {
  effectId: string;
  params: Record<string, number | string | boolean>;
  size: number;
  dark: boolean;
  brandName?: string;
  brandHandle?: string;
}

export function paintSocialOverlay(
  ctx: CanvasRenderingContext2D,
  effectId: string,
  params: Record<string, number | string | boolean>,
  size: number,
  dark: boolean,
  brandName?: string,
  brandHandle?: string,
) {
  if (!SOCIAL_IDS.includes(effectId)) return;

  const isDarkFrame = Boolean(params.dark ?? dark);
  const pad = Number(params.padding ?? 0.08) * size;
  const radius = Number(params.cornerRadius ?? 0.18) * size * 0.4;
  const card = { x: pad, y: pad, w: size - pad * 2, h: size - pad * 2 };
  const header = card.h * 0.14;
  const footer = card.h * 0.13;
  const win = {
    x: card.x + card.w * 0.04,
    y: card.y + header,
    w: card.w * 0.92,
    h: card.h - header - footer,
  };

  const cardColor = isDarkFrame ? '#111214' : '#ffffff';
  const textColor = isDarkFrame ? '#f4f4f5' : '#09090b';
  const muted = isDarkFrame ? '#a1a1aa' : '#52525b';

  ctx.save();
  ctx.beginPath();
  roundRect(ctx, card.x, card.y, card.w, card.h, radius);
  roundRect(ctx, win.x, win.y, win.w, win.h, radius * 0.55);
  ctx.fillStyle = cardColor;
  ctx.fill('evenodd');
  ctx.restore();

  const platform = effectId.replace('social', '').toLowerCase();
  const cleanHandle = (brandHandle || '').trim();
  const handle = cleanHandle
    ? (cleanHandle.startsWith('@') ? cleanHandle : `@${cleanHandle}`)
    : `@${platform}.sourcebook`;
  const displayName = (brandName || '').trim() || (platform === 'youtube' ? 'Design Sourcebook' : 'Design Sourcebook Studio');

  ctx.fillStyle = textColor;
  ctx.textBaseline = 'middle';
  const avatarR = header * 0.26;
  const avatarX = card.x + card.w * 0.06 + avatarR;
  const avatarY = card.y + header * 0.55;

  const grad = ctx.createLinearGradient(avatarX - avatarR, avatarY - avatarR, avatarX + avatarR, avatarY + avatarR);
  if (platform === 'instagram') {
    grad.addColorStop(0, '#f9ce34');
    grad.addColorStop(0.5, '#ee2a7b');
    grad.addColorStop(1, '#6228d7');
  } else if (platform === 'douyin') {
    grad.addColorStop(0, '#25f4ee');
    grad.addColorStop(1, '#fe2c55');
  } else if (platform === 'rednote') {
    grad.addColorStop(0, '#ff2e4d');
    grad.addColorStop(1, '#ff7a59');
  } else if (platform === 'youtube') {
    grad.addColorStop(0, '#ff0033');
    grad.addColorStop(1, '#c00');
  } else {
    grad.addColorStop(0, '#3f3f46');
    grad.addColorStop(1, '#09090b');
  }
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = `600 ${Math.round(header * 0.24)}px "Allo", system-ui, sans-serif`;
  ctx.fillStyle = textColor;
  ctx.fillText(displayName, avatarX + avatarR * 1.6, avatarY - header * 0.08);
  ctx.fillStyle = muted;
  ctx.font = `500 ${Math.round(header * 0.18)}px "Allo", system-ui, sans-serif`;
  ctx.fillText(handle, avatarX + avatarR * 1.6, avatarY + header * 0.16);

  ctx.strokeStyle = muted;
  ctx.lineWidth = Math.max(1, header * 0.02);
  ctx.beginPath();
  ctx.arc(card.x + card.w * 0.9, avatarY, avatarR * 0.16, 0, Math.PI * 2);
  ctx.moveTo(card.x + card.w * 0.9 - avatarR * 0.4, avatarY);
  ctx.lineTo(card.x + card.w * 0.9 + avatarR * 0.4, avatarY);
  ctx.stroke();

  const fy = card.y + card.h - footer * 0.55;
  ctx.fillStyle = textColor;
  ctx.font = `600 ${Math.round(footer * 0.24)}px "Allo", system-ui, sans-serif`;
  const likes = platform === 'youtube' ? '12.4K' : platform === 'instagram' ? '4,281' : '1,204';
  ctx.fillText('Like', card.x + card.w * 0.07, fy);
  ctx.fillText('Share', card.x + card.w * 0.18, fy);
  ctx.fillStyle = muted;
  ctx.font = `500 ${Math.round(footer * 0.2)}px "Allo", system-ui, sans-serif`;
  ctx.fillText(`${likes} saves`, card.x + card.w * 0.32, fy);

  if (platform === 'youtube') {
    ctx.fillStyle = '#ff0033';
    ctx.beginPath();
    const bw = card.w * 0.17;
    const bh = bw * 0.42;
    roundRect(ctx, card.x + card.w * 0.77, fy - bh / 2, bw, bh, bh * 0.28);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `700 ${Math.round(bh * 0.42)}px "Allo", system-ui, sans-serif`;
    ctx.fillText('Subscribe', card.x + card.w * 0.785, fy);
  }
}

export function SocialOverlay({ effectId, params, size, dark, brandName, brandHandle }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let alive = true;
    const draw = () => {
      const canvas = ref.current;
      if (!canvas || !alive) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      const ctx = canvas.getContext('2d')!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      paintSocialOverlay(ctx, effectId, params, size, dark, brandName, brandHandle);
    };
    draw();
    if (typeof document !== 'undefined' && document.fonts?.status !== 'loaded') {
      void document.fonts.ready.then(draw);
    }
    return () => { alive = false; };
  }, [effectId, params, size, dark, brandName, brandHandle]);

  if (!SOCIAL_IDS.includes(effectId)) return null;
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

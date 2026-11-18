import type React from 'react';

const PORTAL_ID = 'dsPortalVeil';
const HANDOFF_KEY = 'ds_portal_handoff';
const TARGET_CATALOG_BG = '#09090b';

let launching = false;
let leftViaPortal = false;
let lifecycleBound = false;
const warmedDocs = new Set<string>();

function supportsCrossDocVT(): boolean {
  return typeof window !== 'undefined' && 'onpagereveal' in window && window.location.protocol !== 'file:';
}

export function warmPortalHref(rawHref: string) {
  if (typeof document === 'undefined' || !window.location.protocol.startsWith('http')) return;
  try {
    const url = new URL(rawHref, window.location.href);
    url.hash = '';
    const docUrl = url.toString();
    if (warmedDocs.has(docUrl)) return;
    warmedDocs.add(docUrl);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'document';
    link.href = docUrl;
    document.head.appendChild(link);
  } catch {
    // ignore malformed href
  }
}

export function clearPortalOverlay() {
  launching = false;
  document.getElementById(PORTAL_ID)?.remove();
}

export function installPortalPageShowCleanup() {
  if (lifecycleBound || typeof window === 'undefined') return;
  lifecycleBound = true;

  window.addEventListener('pageshow', (e) => {
    clearPortalOverlay();
    if (e.persisted && leftViaPortal) {
      leftViaPortal = false;
      const root = document.getElementById('root');
      if (root && typeof root.animate === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        root.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 180, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      }
    }
    leftViaPortal = false;
  });
}

/**
 * Navigates between Studio and Catalog seamlessly: Chromium/Safari run coordinated
 * Cross-Document View Transitions with shared topbar/brand anchoring, while other
 * browsers or file:// sessions get a synchronized surface fade.
 */
export function triggerPortalNavigation(
  e: React.MouseEvent<HTMLAnchorElement>,
  targetBg: string = TARGET_CATALOG_BG,
) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }
  const href = e.currentTarget.href;
  if (!href) return;

  if (supportsCrossDocVT()) {
    return;
  }

  e.preventDefault();
  if (launching) return;
  clearPortalOverlay();
  launching = true;

  const portal = document.createElement('div');
  portal.id = PORTAL_ID;
  portal.style.cssText =
    `position:fixed;inset:0;z-index:9999;pointer-events:all;background:${targetBg};opacity:0;transition:opacity 120ms cubic-bezier(0.22, 1, 0.36, 1);`;
  portal.setAttribute('aria-hidden', 'true');
  document.body.appendChild(portal);

  const finish = () => {
    if (!document.getElementById(PORTAL_ID)) return;
    leftViaPortal = true;
    try {
      sessionStorage.setItem(HANDOFF_KEY, JSON.stringify({ dir: 'to-catalog', ts: Date.now() }));
    } catch {
      // ignore storage restrictions
    }
    window.location.href = href;
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    portal.style.opacity = '1';
    finish();
    return;
  }

  requestAnimationFrame(() => {
    portal.style.opacity = '1';
    window.setTimeout(finish, 125);
  });
}

import type React from 'react';

const PORTAL_ID = 'dsPortalVeil';
const HANDOFF_KEY = 'ds_portal_handoff';
const TARGET_CATALOG_BG = '#09090b';

let launching = false;
let leftViaPortal = false;
let pageShowBound = false;

function supportsCrossDocVT(): boolean {
  return typeof window !== 'undefined' && 'onpagereveal' in window && window.location.protocol !== 'file:';
}

export function clearPortalOverlay() {
  launching = false;
  document.getElementById(PORTAL_ID)?.remove();
}

export function installPortalPageShowCleanup() {
  if (pageShowBound || typeof window === 'undefined') return;
  pageShowBound = true;
  window.addEventListener('pageshow', (e) => {
    clearPortalOverlay();
    if (e.persisted && leftViaPortal) {
      leftViaPortal = false;
      const root = document.getElementById('root');
      if (root && typeof root.animate === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        root.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 160, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      }
    }
    leftViaPortal = false;
  });
}

/**
 * Navigates between Studio and Catalog cleanly: native links let Chromium run
 * Cross-Document View Transitions with zero dead screen, while browsers without
 * `pagereveal` get a subtle solid-surface veil fade instead of a jarring wipe.
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
    `position:fixed;inset:0;z-index:9999;pointer-events:all;background:${targetBg};opacity:0;transition:opacity 110ms cubic-bezier(0.22, 1, 0.36, 1);`;
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
    window.setTimeout(finish, 120);
  });
}

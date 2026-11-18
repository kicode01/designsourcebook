import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
  AppleGlisseTokenSpecimen,
  SystemEasterEggBanner,
  type CatalogSystemData,
} from './SystemEasterEggs';

let activeRoots: Root[] = [];

export function unmountCatalogSystemExperience() {
  for (const r of activeRoots) {
    try {
      r.unmount();
    } catch {
      // ignore unmount errors
    }
  }
  activeRoots = [];
}

export function mountCatalogSystemExperience(
  system: CatalogSystemData,
  detailEl: HTMLElement | null,
) {
  unmountCatalogSystemExperience();
  if (!system || !detailEl) return;

  const bannerHost = detailEl.querySelector<HTMLElement>('#sys-easter-egg-root');
  if (bannerHost) {
    const root = createRoot(bannerHost);
    root.render(<SystemEasterEggBanner system={system} />);
    activeRoots.push(root);
  }

  // On #/apple, also hydrate the Component Tokens grid with live glisse Liquid Glass specimens
  if (system.slug === 'apple' && Array.isArray(system.components) && system.components.length > 0) {
    const compStages = Array.from(detailEl.querySelectorAll<HTMLElement>('.comp-grid .comp .comp-stage'));
    const originalHtml = compStages.map((el) => el.innerHTML);
    const originalStyle = compStages.map((el) => el.getAttribute('style') || '');
    let compRoots: Root[] = [];
    let mode: 'glisse' | 'classic' = 'glisse';

    const mountGlisseComps = () => {
      compRoots.forEach((r) => {
        try {
          r.unmount();
        } catch {}
      });
      compRoots = [];
      compStages.forEach((stageEl, idx) => {
        const comp = system.components?.[idx];
        if (!comp) return;
        stageEl.style.padding = '0';
        const host = document.createElement('div');
        host.style.width = '100%';
        host.style.height = '100%';
        stageEl.innerHTML = '';
        stageEl.appendChild(host);
        const r = createRoot(host);
        r.render(<AppleGlisseTokenSpecimen comp={comp} index={idx} />);
        compRoots.push(r);
        activeRoots.push(r);
      });
    };

    const restoreClassicComps = () => {
      compRoots.forEach((r) => {
        try {
          r.unmount();
        } catch {}
      });
      compRoots = [];
      compStages.forEach((stageEl, idx) => {
        stageEl.setAttribute('style', originalStyle[idx]);
        stageEl.innerHTML = originalHtml[idx];
      });
    };

    const compSecHeader = detailEl.querySelector<HTMLElement>('.sec .sec-h');
    if (compSecHeader && !compSecHeader.querySelector('[data-apple-comp-mode]')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'pill-btn';
      toggleBtn.setAttribute('data-apple-comp-mode', 'glisse');
      toggleBtn.style.marginLeft = '8px';
      toggleBtn.style.fontSize = '11px';
      toggleBtn.style.padding = '3px 10px';
      const syncLabel = () => {
        toggleBtn.textContent =
          mode === 'glisse' ? '💧 Liquid Glass (glisse) · Switch to Classic HIG' : 'Classic HIG · Switch to Liquid Glass (glisse)';
      };
      syncLabel();
      toggleBtn.addEventListener('click', () => {
        mode = mode === 'glisse' ? 'classic' : 'glisse';
        syncLabel();
        if (mode === 'glisse') mountGlisseComps();
        else restoreClassicComps();
      });
      compSecHeader.appendChild(toggleBtn);
    }

    mountGlisseComps();
  }
}

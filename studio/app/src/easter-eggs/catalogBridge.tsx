import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { SystemEasterEggBanner, type CatalogSystemData } from './SystemEasterEggs';

let activeRoot: Root | null = null;

export function unmountCatalogSystemExperience() {
  if (activeRoot) {
    try {
      activeRoot.unmount();
    } catch {
      // ignore unmount errors
    }
    activeRoot = null;
  }
}

export function mountCatalogSystemExperience(
  system: CatalogSystemData,
  detailEl: HTMLElement | null,
) {
  unmountCatalogSystemExperience();
  if (!system || system.slug !== 'apple' || !detailEl) return;

  const bannerHost = detailEl.querySelector<HTMLElement>('#sys-easter-egg-root');
  if (bannerHost) {
    activeRoot = createRoot(bannerHost);
    activeRoot.render(<SystemEasterEggBanner system={system} />);
  }
}

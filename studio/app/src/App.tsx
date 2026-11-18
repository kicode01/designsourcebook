import { useEffect, useState } from 'react';
import { Studio } from './components/Studio';
import { ProjectProvider } from './state/project';
import { StudioProvider } from './state/studio';
import { SystemMaker } from './pages/SystemMaker';
import { CreateX } from './pages/CreateX';
import { BrandX } from './pages/BrandX';

function readRoute(): string {
  const raw = window.location.hash.replace(/^#/, '');
  const clean = raw.split('?')[0].replace(/\/$/, '');
  if (!clean || clean === '/studio') return '/systems';
  return clean;
}

function useRoute() {
  const [path, setPath] = useState(readRoute);
  useEffect(() => {
    const onHash = () => setPath(readRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return path;
}

const TITLES: Record<string, string> = {
  '/systems': 'Design System Maker — Design Sourcebook Studio',
  '/create': 'Logo Maker — Design Sourcebook Studio',
  '/logofx': 'LogoFX — Design Sourcebook Studio',
  '/brand': 'Brand Maker & BrandFx — Design Sourcebook Studio',
};

function RedirectToCatalogLogos({ path }: { path: string }) {
  useEffect(() => {
    const suffix = path.slice('/logos'.length);
    window.location.replace(`../#/logos${suffix}`);
  }, [path]);
  return null;
}

function RouterView({ path }: { path: string }) {
  if (path === '/logos' || path.startsWith('/logos/')) return <RedirectToCatalogLogos path={path} />;
  if (path === '/create' || path === '/createx') return <CreateX />;
  if (path === '/brand' || path === '/brandx') return <BrandX />;
  if (path === '/logofx') {
    return (
      <StudioProvider>
        <Studio />
      </StudioProvider>
    );
  }
  return <SystemMaker />;
}

export default function App() {
  const path = useRoute();

  useEffect(() => {
    document.title = TITLES[path] ?? TITLES['/systems'];
  }, [path]);

  useEffect(() => {
    const root = document.documentElement;
    let hasChameleon = root.classList.contains('ds-chameleon-enter');
    try {
      const raw = sessionStorage.getItem('ds_studio_chameleon');
      if (raw) {
        sessionStorage.removeItem('ds_studio_chameleon');
        hasChameleon = true;
      }
    } catch {
      // ignore storage restrictions
    }
    if (!hasChameleon) return;
    root.classList.add('ds-chameleon-revealed');
    const raf = requestAnimationFrame(() => {
      root.classList.remove('ds-chameleon-enter');
    });
    const timer = window.setTimeout(() => {
      root.classList.remove('ds-chameleon-revealed');
      root.style.removeProperty('background-color');
    }, 380);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      root.classList.remove('ds-chameleon-enter', 'ds-chameleon-revealed');
      root.style.removeProperty('background-color');
    };
  }, []);

  return (
    <ProjectProvider>
      <RouterView path={path} />
    </ProjectProvider>
  );
}

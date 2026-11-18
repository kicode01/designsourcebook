import { Icon } from './icons';
import { useProject } from '../state/project';
import { triggerPortalNavigation, warmPortalHref } from '../utils/chameleonNav';

export type Product = 'systems' | 'create' | 'logofx' | 'brand';

const PRODUCTS: { id: Product; label: string; href: string }[] = [
  { id: 'systems', label: 'System Maker', href: '#/systems' },
  { id: 'create', label: 'Logo Maker', href: '#/create' },
  { id: 'logofx', label: 'LogoFX', href: '#/logofx' },
  { id: 'brand', label: 'Brand Maker', href: '#/brand' },
];

export function TopBar({
  current,
  onShare,
  extraActions,
}: {
  current: Product;
  onShare?: () => void;
  extraActions?: React.ReactNode;
}) {
  const { theme, toggleTheme } = useProject();

  return (
    <header className="studio-topbar" aria-label="Design Sourcebook Studio Navigation">
      <div className="studio-topbar-inner">
        <div className="studio-brand">
          <a
            className="ds-brand-link"
            href="../"
            onPointerEnter={(e) => warmPortalHref(e.currentTarget.href)}
            onFocus={(e) => warmPortalHref(e.currentTarget.href)}
            onClick={(e) => triggerPortalNavigation(e)}
            title="Return to Design Sourcebook Catalog"
          >
            <svg className="ds-mark" viewBox="0 0 256 256" aria-hidden="true">
              <defs>
                <linearGradient id="tb-g1" gradientUnits="userSpaceOnUse" x1="138" y1="67" x2="230" y2="43">
                  <stop offset="0%" stopColor="#FF3B5C" />
                  <stop offset="100%" stopColor="#FF8A00" />
                </linearGradient>
                <linearGradient id="tb-g2" gradientUnits="userSpaceOnUse" x1="138" y1="124" x2="230" y2="100">
                  <stop offset="0%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="tb-g3" gradientUnits="userSpaceOnUse" x1="138" y1="181" x2="230" y2="157">
                  <stop offset="0%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M 26 47.18 Q 26 42.68 30.35 43.84 L 113.65 66.17 Q 118 67.33 118 71.83 L 118 208.83 Q 118 213.33 113.65 212.17 L 30.35 189.84 Q 26 188.68 26 184.18 Z M 52.43 74.76 Q 50.5 74.24 50.5 76.24 L 50.5 168.24 Q 50.5 170.24 52.43 170.76 L 91.57 181.25 Q 93.5 181.77 93.5 179.77 L 93.5 87.77 Q 93.5 85.77 91.57 85.25 Z"
              />
              <g className="ds-slabs">
                <path
                  fill="url(#tb-g1)"
                  d="M 138 71.83 Q 138 67.33 142.35 66.17 L 225.65 43.84 Q 230 42.68 230 47.18 L 230 70.18 Q 230 74.68 225.65 75.84 L 142.35 98.17 Q 138 99.33 138 94.83 Z"
                />
                <path
                  fill="url(#tb-g2)"
                  d="M 138 128.83 Q 138 124.33 142.35 123.17 L 225.65 100.84 Q 230 99.68 230 104.18 L 230 127.18 Q 230 131.68 225.65 132.84 L 142.35 155.17 Q 138 156.33 138 151.83 Z"
                />
                <path
                  fill="url(#tb-g3)"
                  d="M 138 185.83 Q 138 181.33 142.35 180.17 L 225.65 157.84 Q 230 156.68 230 161.18 L 230 184.18 Q 230 188.68 225.65 189.84 L 142.35 212.17 Q 138 213.33 138 208.83 Z"
                />
              </g>
            </svg>
            <span>Design Sourcebook</span>
            <span className="ds-brand-badge">Studio</span>
          </a>
        </div>

        <nav className="ds-nav-seg" aria-label="Studio Modules">
          {PRODUCTS.map((p) => (
            <a
              key={p.id}
              className={`product-switcher ${p.id === current ? 'is-current' : ''}`}
              href={p.href}
              aria-current={p.id === current ? 'page' : undefined}
            >
              {p.label}
            </a>
          ))}
        </nav>

        <div className="studio-top-actions">
          <a
            className="product-switcher is-current"
            href="../"
            onPointerEnter={(e) => warmPortalHref(e.currentTarget.href)}
            onFocus={(e) => warmPortalHref(e.currentTarget.href)}
            onClick={(e) => triggerPortalNavigation(e)}
            title="Return to Design Sourcebook Catalog"
          >
            <span>Catalog</span>
            <Icon name="arrowUpRight" size={12} />
          </a>
          <button
            type="button"
            className="icon-button"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}

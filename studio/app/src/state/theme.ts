import { useEffect } from 'react';

/**
 * Tokens are declared on `:root` (light) with a `html.dark` override, so the
 * theme has to live on the <html> element — a `data-theme` attribute on the
 * app root alone cannot win against `html.dark`, which ships in index.html.
 */
export function useHtmlTheme(theme: 'dark' | 'light') {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    root.style.colorScheme = theme;
  }, [theme]);
}

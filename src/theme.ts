/**
 * Light / dark switch for the design B preview: Pearl (light) is the base
 * styling, Onyx (dark) is `body.pr.t-onyx`. With no stored choice the page
 * follows the system setting; the nav toggle stores an explicit one.
 * The inline script at the top of b.html applies the same logic before
 * first paint, so keep THEME_KEY in sync with it.
 */

export const THEME_KEY = 'subsecond-b-theme';

export type Theme = 'light' | 'dark';

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme): void {
  document.body.classList.toggle('t-onyx', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

export function initThemeToggle(): void {
  const toggles = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  if (!toggles.length) return;

  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const systemTheme = (): Theme => (system.matches ? 'dark' : 'light');

  applyTheme(storedTheme() ?? systemTheme());

  system.addEventListener('change', () => {
    if (!storedTheme()) applyTheme(systemTheme());
  });

  toggles.forEach((btn) =>
    btn.addEventListener('click', () => {
      const next: Theme = document.body.classList.contains('t-onyx') ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Storage blocked: the choice holds for this visit only.
      }
      applyTheme(next);
    }),
  );
}

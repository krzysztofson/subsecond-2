import { translations, type Lang } from './i18n';

function menuAriaLabel(isOpen: boolean): string {
  const lang: Lang = document.documentElement.lang === 'pl' ? 'pl' : 'en';
  const key = isOpen ? 'nav.menuClose' : 'nav.menu';
  return translations[lang][key];
}

export function initMobileNav(): void {
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  if (!toggle || !drawer) return;

  const close = (): void => {
    drawer.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', menuAriaLabel(false));
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', menuAriaLabel(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}

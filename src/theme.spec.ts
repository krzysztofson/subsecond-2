import { beforeEach, describe, expect, it } from 'vitest';
import { initThemeToggle, THEME_KEY } from './theme';

describe('initThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = 'pr';
    document.body.innerHTML = '<button type="button" data-theme-toggle></button>';
  });

  it('should follow the system setting when nothing is stored', () => {
    // test-setup stubs matchMedia as light
    initThemeToggle();
    expect(document.body.classList.contains('t-onyx')).toBe(false);
    expect(document.querySelector('[data-theme-toggle]')!.getAttribute('aria-label')).toBe('Switch to dark mode');
  });

  it('should apply a stored choice', () => {
    localStorage.setItem(THEME_KEY, 'dark');
    initThemeToggle();
    expect(document.body.classList.contains('t-onyx')).toBe(true);
  });

  it('should flip the theme and remember it on click', () => {
    initThemeToggle();
    const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]')!;

    btn.click();
    expect(document.body.classList.contains('t-onyx')).toBe(true);
    expect(localStorage.getItem(THEME_KEY)).toBe('dark');
    expect(btn.getAttribute('aria-label')).toBe('Switch to light mode');

    btn.click();
    expect(document.body.classList.contains('t-onyx')).toBe(false);
    expect(localStorage.getItem(THEME_KEY)).toBe('light');
  });
});

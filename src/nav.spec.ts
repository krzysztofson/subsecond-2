import { beforeEach, describe, expect, it } from 'vitest';
import { initMobileNav } from './nav';

describe('initMobileNav', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="nav-toggle" aria-expanded="false"></button>
      <div id="nav-drawer">
        <a href="#contact">Contact</a>
      </div>
    `;
    document.body.classList.remove('nav-open');
  });

  it('should open and close the drawer on toggle click', () => {
    initMobileNav();
    const toggle = document.getElementById('nav-toggle')!;
    const drawer = document.getElementById('nav-drawer')!;

    toggle.click();
    expect(drawer.classList.contains('is-open')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(document.body.classList.contains('nav-open')).toBe(true);

    toggle.click();
    expect(drawer.classList.contains('is-open')).toBe(false);
  });

  it('should close the drawer when a link is clicked', () => {
    initMobileNav();
    const toggle = document.getElementById('nav-toggle')!;
    const drawer = document.getElementById('nav-drawer')!;
    const link = drawer.querySelector('a')!;

    toggle.click();
    link.click();
    expect(drawer.classList.contains('is-open')).toBe(false);
  });
});

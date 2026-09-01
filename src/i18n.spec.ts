import { beforeEach, describe, expect, it } from 'vitest';
import indexHtml from '../index.html?raw';
import { STORAGE_KEY, getStoredLang, isLang, setLanguage, translations } from './i18n';

describe('translations', () => {
  it('should have identical key sets for en and pl', () => {
    const enKeys = Object.keys(translations.en).sort();
    const plKeys = Object.keys(translations.pl).sort();
    expect(plKeys).toEqual(enKeys);
  });

  it('should have no empty values in either language', () => {
    for (const lang of ['en', 'pl'] as const) {
      for (const [key, value] of Object.entries(translations[lang])) {
        expect(value.trim(), `${lang}.${key}`).not.toBe('');
      }
    }
  });

  it('should define every key referenced from index.html', () => {
    const referenced = [
      ...indexHtml.matchAll(/data-i18n(?:-alt|-aria|-placeholder)?="([^"]+)"/g),
    ].map((match) => match[1]);

    expect(referenced.length).toBeGreaterThan(0);
    const missing = referenced.filter((key) => translations.en[key] === undefined);
    expect(missing).toEqual([]);
  });
});

describe('isLang', () => {
  it('should accept en and pl', () => {
    expect(isLang('en')).toBe(true);
    expect(isLang('pl')).toBe(true);
  });

  it('should reject anything else', () => {
    expect(isLang('de')).toBe(false);
    expect(isLang(null)).toBe(false);
    expect(isLang(undefined)).toBe(false);
  });
});

describe('getStoredLang', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should default to en when nothing is stored', () => {
    expect(getStoredLang()).toBe('en');
  });

  it('should return the stored language when valid', () => {
    localStorage.setItem(STORAGE_KEY, 'pl');
    expect(getStoredLang()).toBe('pl');
  });

  it('should fall back to en when the stored value is garbage', () => {
    localStorage.setItem(STORAGE_KEY, 'fr');
    expect(getStoredLang()).toBe('en');
  });

  it('should default to pl for a Polish browser language when nothing is stored', () => {
    expect(getStoredLang(localStorage, 'pl-PL')).toBe('pl');
  });

  it('should prefer the stored language over the browser language', () => {
    localStorage.setItem(STORAGE_KEY, 'en');
    expect(getStoredLang(localStorage, 'pl-PL')).toBe('en');
  });
});

describe('setLanguage', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'en';
    document.body.innerHTML = `
      <p data-i18n="hero.line1">placeholder</p>
      <p data-i18n="hero.line2">placeholder</p>
      <p data-i18n="unknown.key">untouched</p>
      <option data-i18n="hero.scroll">Scroll</option>
      <button data-lang="en"></button>
      <button data-lang="pl"></button>
    `;
  });

  it('should swap text content of all known data-i18n elements', () => {
    setLanguage('pl');
    expect(document.querySelector('[data-i18n="hero.line1"]')!.textContent).toBe(
      translations.pl['hero.line1'],
    );
    expect(document.querySelector('[data-i18n="hero.line2"]')!.textContent).toBe(
      translations.pl['hero.line2'],
    );
  });

  it('should translate option elements with data-i18n', () => {
    setLanguage('pl');
    expect(document.querySelector('option')!.textContent).toBe(translations.pl['hero.scroll']);
  });

  it('should leave elements with unknown keys untouched', () => {
    setLanguage('pl');
    expect(document.querySelector('[data-i18n="unknown.key"]')!.textContent).toBe('untouched');
  });

  it('should persist the choice and update <html lang>', () => {
    setLanguage('pl');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('pl');
    expect(document.documentElement.lang).toBe('pl');
  });

  it('should mark the matching toggle button as active', () => {
    setLanguage('pl');
    expect(document.querySelector('[data-lang="pl"]')!.classList.contains('is-active')).toBe(true);
    expect(document.querySelector('[data-lang="en"]')!.classList.contains('is-active')).toBe(false);

    setLanguage('en');
    expect(document.querySelector('[data-lang="en"]')!.classList.contains('is-active')).toBe(true);
    expect(document.querySelector('[data-lang="pl"]')!.classList.contains('is-active')).toBe(false);
  });
});

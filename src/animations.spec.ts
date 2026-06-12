import { describe, expect, it } from 'vitest';
import { splitLines } from './animations';

describe('splitLines', () => {
  it('should wrap text in mask/line spans and return the line elements', () => {
    const el = document.createElement('h1');
    el.textContent = 'We build presence.';
    document.body.appendChild(el);

    const lines = splitLines(el);

    // jsdom has no layout, so every word reports offsetTop 0 -> one line.
    expect(lines).toHaveLength(1);
    expect(lines[0].classList.contains('split-line')).toBe(true);
    expect(lines[0].parentElement!.classList.contains('split-line-mask')).toBe(true);
    expect(el.textContent).toBe('We build presence.');
  });

  it('should normalise whitespace in the source text', () => {
    const el = document.createElement('p');
    el.textContent = '  Some   agencies \n build   websites.  ';
    document.body.appendChild(el);

    const lines = splitLines(el);

    expect(el.textContent).toBe('Some agencies build websites.');
    expect(lines.length).toBeGreaterThan(0);
  });

  it('should return an empty array for empty elements', () => {
    const el = document.createElement('p');
    document.body.appendChild(el);

    expect(splitLines(el)).toEqual([]);
    expect(el.textContent).toBe('');
  });

  it('should keep the full text identical after a second split (idempotent)', () => {
    const el = document.createElement('p');
    el.textContent = 'Ready to stop looking average?';
    document.body.appendChild(el);

    splitLines(el);
    splitLines(el);

    expect(el.textContent).toBe('Ready to stop looking average?');
  });
});

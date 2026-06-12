import { describe, expect, it } from 'vitest';
import { buildMailtoUrl } from './contact';

describe('buildMailtoUrl', () => {
  it('should encode subject and body for mailto', () => {
    const url = buildMailtoUrl('hello@subsecond.app', 'Revenue review', {
      name: 'Jane Doe',
      email: 'jane@firm.pl',
      company: 'Acme Legal',
      package: 'growth',
      message: 'We need a new site.',
    });

    expect(url.startsWith('mailto:hello@subsecond.app?')).toBe(true);
    expect(url).toContain('subject=Revenue%20review');
    expect(url).toContain('jane%40firm.pl');
    expect(url).toContain('We%20need%20a%20new%20site.');
  });

  it('should use em dash when company is empty', () => {
    const url = buildMailtoUrl('hello@subsecond.app', 'Test', {
      name: 'A',
      email: 'a@b.c',
      company: '',
      package: 'foundation',
      message: 'Hi',
    });

    expect(decodeURIComponent(url)).toContain('Company: —');
  });
});

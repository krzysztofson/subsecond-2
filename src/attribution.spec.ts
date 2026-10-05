import { beforeEach, describe, expect, it } from 'vitest';
import {
  ATTRIBUTION_KEY,
  captureAttribution,
  getAttribution,
  getCalendlyUtm,
  withUtm,
} from './attribution';

describe('attribution', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should capture UTMs and oppref from the landing URL', () => {
    captureAttribution(
      '?utm_source=openai&utm_medium=paid&utm_campaign=revenue_review&utm_content=dropoff_v1&oppref=abc123',
    );
    expect(getAttribution()).toEqual({
      utm_source: 'openai',
      utm_medium: 'paid',
      utm_campaign: 'revenue_review',
      utm_content: 'dropoff_v1',
      oppref: 'abc123',
    });
  });

  it('should not overwrite stored values with missing or empty ones', () => {
    captureAttribution('?utm_source=openai&utm_campaign=revenue_review');
    captureAttribution('?utm_source=&utm_content=audit_v1');
    expect(getAttribution()).toEqual({
      utm_source: 'openai',
      utm_campaign: 'revenue_review',
      utm_content: 'audit_v1',
    });
  });

  it('should leave the page URL untouched', () => {
    window.history.replaceState(null, '', '/revenue-review?oppref=test123&utm_source=openai');
    captureAttribution();
    expect(window.location.pathname).toBe('/revenue-review');
    expect(window.location.search).toBe('?oppref=test123&utm_source=openai');
  });

  it('should survive corrupt storage', () => {
    sessionStorage.setItem(ATTRIBUTION_KEY, '{not json');
    expect(getAttribution()).toEqual({});
  });

  it('should map UTMs for Calendly and links, without oppref', () => {
    captureAttribution('?utm_source=openai&utm_medium=paid&oppref=abc123');
    expect(getCalendlyUtm()).toEqual({ utmSource: 'openai', utmMedium: 'paid' });
    const url = new URL(withUtm('https://calendly.com/chatcraft/introductory-call?hide_gdpr_banner=1'));
    expect(url.searchParams.get('utm_source')).toBe('openai');
    expect(url.searchParams.get('hide_gdpr_banner')).toBe('1');
    expect(url.searchParams.has('oppref')).toBe(false);
  });
});

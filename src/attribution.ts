/**
 * Keeps campaign parameters for the whole session so they survive in-page
 * navigation and reach Calendly. Never rewrites the URL: the OpenAI pixel
 * reads `oppref` from the landing URL itself.
 */

export const ATTRIBUTION_KEY = 'subsecond-attr';

export const ATTRIBUTION_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'oppref',
] as const;

export type AttributionParam = (typeof ATTRIBUTION_PARAMS)[number];
export type Attribution = Partial<Record<AttributionParam, string>>;

export function getAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/** Merge non-empty campaign params from the current URL into session storage. */
export function captureAttribution(search: string = window.location.search): Attribution {
  const params = new URLSearchParams(search);
  const stored = getAttribution();

  ATTRIBUTION_PARAMS.forEach((key) => {
    const value = params.get(key)?.trim();
    if (value) stored[key] = value;
  });

  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked (private mode etc.) — attribution still works from the URL.
  }
  return stored;
}

/** UTM fields in the shape Calendly.initInlineWidget expects. */
export function getCalendlyUtm(): Record<string, string> {
  const attr = getAttribution();
  const utm: Record<string, string> = {};
  if (attr.utm_source) utm.utmSource = attr.utm_source;
  if (attr.utm_medium) utm.utmMedium = attr.utm_medium;
  if (attr.utm_campaign) utm.utmCampaign = attr.utm_campaign;
  if (attr.utm_content) utm.utmContent = attr.utm_content;
  if (attr.utm_term) utm.utmTerm = attr.utm_term;
  return utm;
}

/** Append stored UTMs (not `oppref`) to a URL, e.g. a direct Calendly link. */
export function withUtm(url: string): string {
  const attr = getAttribution();
  const out = new URL(url);
  ATTRIBUTION_PARAMS.forEach((key) => {
    const value = attr[key];
    if (key !== 'oppref' && value) out.searchParams.set(key, value);
  });
  return out.toString();
}

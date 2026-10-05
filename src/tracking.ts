/**
 * Thin wrappers over the OpenAI pixel (`oaiq`) and GA4 (`gtag`). Both are
 * bootstrapped by inline snippets injected into every page (vite.config.ts),
 * so calls queue safely even before the vendor scripts finish loading.
 */

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** GA4 funnel event. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  window.gtag?.('event', name, params);
}

/** OpenAI pixel page view — the pixel does not track these automatically. */
export function trackPageView(id: string, name: string): void {
  window.oaiq?.('measure', 'page_viewed', {
    type: 'contents',
    contents: [{ id, name, content_type: 'page' }],
  });
}

/**
 * Primary conversion: a completed Calendly booking. `eventId` is the Calendly
 * invitee UUID so a future Conversions API call can be deduplicated against it.
 */
export function trackBooking(eventId: string, placement: string): void {
  window.oaiq?.('measure', 'lead_created', { type: 'customer_action' }, { event_id: eventId });
  trackEvent('calendly_booking_completed', { placement, event_id: eventId });
}

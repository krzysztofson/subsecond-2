/**
 * Entry for the homepage (design D, `/`) and the design B preview (`/b`).
 * Both are static, CSS-animated pages: this only wires attribution,
 * measurement, booking, the before/after sliders and the review form.
 */
import { captureAttribution } from './attribution';
import { initBookingModal, initCalendly, loadCalendly } from './booking';
import { initCompareSliders } from './compare';
import { initReviewForms } from './forms';
import { initNotice } from './notice';
import { trackEvent, trackPageView } from './tracking';

captureAttribution();
trackPageView(document.body.dataset.page ?? 'home', document.body.dataset.pageName ?? 'Homepage');

const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = String(new Date().getFullYear());

// In-page links to the video review form; the scroll itself is a plain anchor.
document.querySelectorAll<HTMLElement>('[data-review-cta]').forEach((cta) => {
  cta.addEventListener('click', () => trackEvent('video_review_cta_click', { cta: cta.dataset.reviewCta }));
});

initNotice();
initCompareSliders();
initBookingModal();
initCalendly();
initReviewForms();

// Warm up widget.js (script only, no iframe) so a booking click renders faster.
const warmCalendly = () => void loadCalendly().catch(() => {});
if ('requestIdleCallback' in window) {
  requestIdleCallback(warmCalendly, { timeout: 4000 });
} else {
  setTimeout(warmCalendly, 3000);
}

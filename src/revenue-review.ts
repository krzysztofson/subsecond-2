import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { captureAttribution } from './attribution';
import { initCalendly, initFallbackForms, loadCalendly, mountEmbed } from './booking';
import { initNotice } from './notice';
import { trackEvent, trackPageView } from './tracking';
import { initCursor, initMagnetics, initNavScrollState, initReveals } from './animations';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- */
/*  Attribution + measurement                                         */
/* ---------------------------------------------------------------- */

const attribution = captureAttribution();
trackPageView('revenue-review', 'Revenue review LP');
trackEvent('openai_lp_view', {
  utm_source: attribution.utm_source,
  utm_campaign: attribution.utm_campaign,
  utm_content: attribution.utm_content,
});

const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = String(new Date().getFullYear());

/* ---------------------------------------------------------------- */
/*  CTAs — every one scrolls to the inline Calendly embed            */
/* ---------------------------------------------------------------- */

const book = document.getElementById('book');
const lpEmbed = document.querySelector<HTMLElement>('[data-calendly-embed="lp"]');

document.querySelectorAll<HTMLAnchorElement>('[data-lp-cta]').forEach((cta) => {
  cta.addEventListener('click', (event) => {
    trackEvent('revenue_review_cta_click', { cta: cta.dataset.lpCta });
    // Start the calendar now rather than when the scroll gets near it.
    if (lpEmbed) void mountEmbed(lpEmbed);
    if (!book) return;
    // Scroll without touching the URL, so the landing query string stays intact.
    event.preventDefault();
    book.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

/* ---------------------------------------------------------------- */
/*  Mobile sticky CTA: visible past the hero, hidden at the embed    */
/* ---------------------------------------------------------------- */

const sticky = document.getElementById('lp-sticky');
const hero = document.getElementById('hero');

if (sticky && hero && book && 'IntersectionObserver' in window) {
  let pastHero = false;
  let atBook = false;
  const update = () => sticky.classList.toggle('is-visible', pastHero && !atBook);

  new IntersectionObserver(([entry]) => {
    pastHero = !entry.isIntersecting;
    update();
  }).observe(hero);

  new IntersectionObserver(([entry]) => {
    atBook = entry.isIntersecting;
    update();
  }).observe(book);
}

/* ---------------------------------------------------------------- */
/*  Interaction layers                                                */
/* ---------------------------------------------------------------- */

if (!prefersReducedMotion) initReveals();
initNotice();
initCursor();
initMagnetics();
initNavScrollState();
initCalendly();
initFallbackForms();

// Warm up widget.js (script only, no iframe) so a CTA click renders faster.
const warmCalendly = () => void loadCalendly().catch(() => {});
if ('requestIdleCallback' in window) {
  requestIdleCallback(warmCalendly, { timeout: 4000 });
} else {
  setTimeout(warmCalendly, 3000);
}

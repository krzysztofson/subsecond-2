import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { initContactForm } from './contact';
import { initMobileNav } from './nav';
import { CALENDLY_URL } from './config';
import { getStoredLang, setLanguage, type Lang } from './i18n';
import { createHeroScene } from './webgl';
import {
  animateLinesIn,
  createScrollLineReveal,
  initCursor,
  initMagnetics,
  initNavScrollState,
  initReveals,
  runPreloader,
  splitLines,
} from './animations';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- */
/*  Language                                                          */
/* ---------------------------------------------------------------- */

setLanguage(getStoredLang());

/* ---------------------------------------------------------------- */
/*  Smooth scroll                                                     */
/* ---------------------------------------------------------------- */

if (!prefersReducedMotion) {
  const lenis = new Lenis({ lerp: 0.1, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------------------------------------------------------------- */
/*  WebGL hero                                                        */
/* ---------------------------------------------------------------- */

const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement | null;
if (canvas) createHeroScene(canvas);

/* ---------------------------------------------------------------- */
/*  Split text setup                                                  */
/* ---------------------------------------------------------------- */

const heroSplitEls = Array.from(document.querySelectorAll<HTMLElement>('.hero [data-split]'));
const scrollSplitEls = Array.from(
  document.querySelectorAll<HTMLElement>('[data-split]'),
).filter((el) => !heroSplitEls.includes(el));

let heroLines: HTMLElement[] = [];

function buildSplits(animate: boolean): void {
  heroLines = heroSplitEls.flatMap((el) => splitLines(el));

  scrollSplitEls.forEach((el) => {
    const lines = splitLines(el);
    if (animate) {
      createScrollLineReveal(el, lines);
    }
  });

  if (!animate) {
    gsap.set(heroLines, { yPercent: 0 });
  }

  ScrollTrigger.refresh();
}

/* ---------------------------------------------------------------- */
/*  Intro choreography                                                */
/* ---------------------------------------------------------------- */

function heroIntro(): void {
  if (prefersReducedMotion) {
    gsap.set(heroLines, { yPercent: 0 });
    gsap.set(['.hero__sub', '.hero__cta', '.hero__scroll', '.nav'], { autoAlpha: 1 });
    return;
  }

  gsap.set(['.hero__sub', '.hero__cta', '.hero__scroll'], { autoAlpha: 0, y: 24 });
  gsap.set('.nav', { autoAlpha: 0, y: -16 });

  animateLinesIn(heroLines, 0.1);
  gsap.to(['.hero__sub', '.hero__cta'], {
    autoAlpha: 1,
    y: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.55,
  });
  gsap.to('.hero__scroll', { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1 });
  gsap.to('.nav', { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 });
}

if (prefersReducedMotion) {
  buildSplits(false);
  runPreloader(heroIntro);
} else {
  buildSplits(true);
  gsap.set(heroLines, { yPercent: 115 });
  initReveals();
  runPreloader(heroIntro);
}

/* ---------------------------------------------------------------- */
/*  Language toggle (re-split after swap)                             */
/* ---------------------------------------------------------------- */

document.querySelectorAll<HTMLElement>('[data-lang]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang as Lang;
    setLanguage(lang);

    // The swap replaced split spans with plain text; rebuild without
    // replaying intro animations and show everything immediately.
    ScrollTrigger.getAll().forEach((st) => st.kill());
    buildSplits(false);
    scrollSplitEls.forEach((el) => {
      gsap.set(el.querySelectorAll('.split-line'), { yPercent: 0 });
    });
    gsap.set('[data-reveal]', { y: 0, autoAlpha: 1, clearProps: 'transform,opacity,visibility' });
  });
});

/* ---------------------------------------------------------------- */
/*  Interaction layers                                                */
/* ---------------------------------------------------------------- */

initCursor();
initMagnetics();
initNavScrollState();
initMobileNav();
initContactForm();

const calendlyLink = document.getElementById('calendly-link') as HTMLAnchorElement | null;
if (calendlyLink && CALENDLY_URL) {
  calendlyLink.href = CALENDLY_URL;
  calendlyLink.hidden = false;
}

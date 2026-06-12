import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Split text into visual lines                                       */
/* ------------------------------------------------------------------ */

/**
 * Splits an element's text into visual lines, each wrapped in
 * .split-line-mask > .split-line so the line can slide out of an
 * overflow-hidden mask. Returns the inner .split-line elements.
 */
export function splitLines(el: HTMLElement): HTMLElement[] {
  const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim();
  el.textContent = '';
  if (!text) return [];

  // Lay out word spans first so we can measure which line each lands on.
  const words = text.split(' ');
  const wordSpans = words.map((word) => {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.textContent = word;
    return span;
  });
  wordSpans.forEach((span, i) => {
    el.appendChild(span);
    if (i < wordSpans.length - 1) el.appendChild(document.createTextNode(' '));
  });

  const lines: string[][] = [];
  let lastTop: number | null = null;
  wordSpans.forEach((span) => {
    const top = span.offsetTop;
    if (lastTop === null || top !== lastTop) {
      lines.push([]);
      lastTop = top;
    }
    lines[lines.length - 1].push(span.textContent ?? '');
  });

  el.textContent = '';
  return lines.map((lineWords) => {
    const mask = document.createElement('span');
    mask.className = 'split-line-mask';
    const line = document.createElement('span');
    line.className = 'split-line';
    line.textContent = lineWords.join(' ');
    mask.appendChild(line);
    el.appendChild(mask);
    return line;
  });
}

/* ------------------------------------------------------------------ */
/*  Reveals                                                            */
/* ------------------------------------------------------------------ */

/** Slide split lines up from below their mask. */
export function animateLinesIn(lines: HTMLElement[], delay = 0): gsap.core.Tween {
  return gsap.fromTo(
    lines,
    { yPercent: 115 },
    { yPercent: 0, duration: 1.1, stagger: 0.09, ease: 'power4.out', delay },
  );
}

/** Scroll-triggered line reveal for elements below the fold. */
export function createScrollLineReveal(el: HTMLElement, lines: HTMLElement[]): void {
  gsap.fromTo(
    lines,
    { yPercent: 115 },
    {
      yPercent: 0,
      duration: 1.1,
      stagger: 0.09,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    },
  );
}

/** Fade-up stagger for [data-reveal] cards/rows. */
export function initReveals(): void {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
    gsap.fromTo(
      el,
      { y: 48, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power3.out',
        delay: (i % 4) * 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    );
  });
}

/* ------------------------------------------------------------------ */
/*  Cursor                                                             */
/* ------------------------------------------------------------------ */

export function initCursor(): void {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  const dot = cursor.querySelector<HTMLElement>('.cursor__dot');
  const ring = cursor.querySelector<HTMLElement>('.cursor__ring');
  if (!dot || !ring) return;

  const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    dotX(e.clientX);
    dotY(e.clientY);
    ringX(e.clientX);
    ringY(e.clientY);
  });

  document.querySelectorAll<HTMLElement>('[data-cursor], a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
}

/* ------------------------------------------------------------------ */
/*  Magnetic buttons                                                   */
/* ------------------------------------------------------------------ */

export function initMagnetics(): void {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * 0.3);
      yTo((e.clientY - (rect.top + rect.height / 2)) * 0.3);
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* ------------------------------------------------------------------ */
/*  Nav scroll state                                                   */
/* ------------------------------------------------------------------ */

export function initNavScrollState(): void {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ------------------------------------------------------------------ */
/*  Preloader                                                          */
/* ------------------------------------------------------------------ */

export function runPreloader(onComplete: () => void): void {
  const preloader = document.getElementById('preloader');
  const counter = document.getElementById('preloader-counter');

  if (!preloader || !counter) {
    onComplete();
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    preloader.remove();
    onComplete();
    return;
  }

  const progress = { value: 0 };
  const tl = gsap.timeline({
    onComplete: () => {
      preloader.remove();
    },
  });

  tl.to(progress, {
    value: 100,
    duration: 1.5,
    ease: 'power2.inOut',
    onUpdate: () => {
      counter.textContent = String(Math.round(progress.value));
    },
  })
    .to(preloader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      onStart: onComplete,
    })
    .to('.preloader__inner', { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, '<');
}

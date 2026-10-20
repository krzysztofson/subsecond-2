/** Clamps a divider position to the 0–100 range. */
export function clampPosition(value: number): number {
  return Math.min(100, Math.max(0, value));
}

const easeInOut = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOut = (t: number): number => 1 - (1 - t) ** 2;

/**
 * Left, right, back to rest: the one-time sweep that hints the divider can be
 * dragged. Plain rAF so the pages using sliders don't need GSAP. Returns a cancel.
 */
function playHint(start: number, onFrame: (pos: number) => void): () => void {
  const legs = [
    { to: start - 22, ms: 900, ease: easeInOut },
    { to: start + 18, ms: 1100, ease: easeInOut },
    { to: start, ms: 800, ease: easeOut },
  ];
  let from = start;
  let leg = 0;
  let legStart = 0;
  let raf = 0;

  const tick = (now: number): void => {
    legStart ||= now;
    const { to, ms, ease } = legs[leg];
    const t = Math.min(1, (now - legStart) / ms);
    onFrame(from + (to - from) * ease(t));
    if (t === 1) {
      from = to;
      leg += 1;
      legStart = now;
      if (leg === legs.length) return;
    }
    raf = requestAnimationFrame(tick);
  };

  const timer = window.setTimeout(() => {
    raf = requestAnimationFrame(tick);
  }, 400);
  return () => {
    window.clearTimeout(timer);
    cancelAnimationFrame(raf);
  };
}

/**
 * Before/after sliders: [data-compare] holds the "after" image, the clipped
 * "before" image and a [role="slider"] handle. The divider is driven by the
 * --pos custom property (0–100). Drag or click anywhere on the frame, or use
 * the arrow keys on the handle. A one-time sweep hints at the interaction
 * when the slider first scrolls into view.
 */
export function initCompareSliders(root: ParentNode = document): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.querySelectorAll<HTMLElement>('[data-compare]').forEach((el) => {
    const handle = el.querySelector<HTMLElement>('[role="slider"]');
    if (!handle) return;

    const state = { pos: Number(el.dataset.start ?? 50) };
    let cancelHint: (() => void) | null = null;

    const render = (): void => {
      const pos = clampPosition(state.pos);
      el.style.setProperty('--pos', `${pos}%`);
      el.style.setProperty('--p', String(pos));
      handle.setAttribute('aria-valuenow', String(Math.round(pos)));
    };

    const set = (pos: number): void => {
      cancelHint?.();
      cancelHint = null;
      state.pos = clampPosition(pos);
      render();
    };

    const fromPointer = (clientX: number): void => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) set(((clientX - rect.left) / rect.width) * 100);
    };

    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      el.setPointerCapture?.(e.pointerId);
      el.classList.add('is-dragging');
      // A touch may turn into a vertical scroll (pointercancel), so it only
      // moves the divider once it drags sideways or lifts as a tap.
      if (e.pointerType !== 'touch') fromPointer(e.clientX);
    });

    el.addEventListener('pointermove', (e) => {
      if (el.classList.contains('is-dragging')) fromPointer(e.clientX);
    });

    el.addEventListener('pointerup', (e) => {
      if (el.classList.contains('is-dragging')) fromPointer(e.clientX);
      el.classList.remove('is-dragging');
    });
    el.addEventListener('pointercancel', () => el.classList.remove('is-dragging'));

    handle.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 10 : 2;
      const moves: Record<string, number> = {
        ArrowLeft: state.pos - step,
        ArrowDown: state.pos - step,
        ArrowRight: state.pos + step,
        ArrowUp: state.pos + step,
        Home: 0,
        End: 100,
      };
      if (!(e.key in moves)) return;
      e.preventDefault();
      set(moves[e.key]);
    });

    render();

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        cancelHint = playHint(state.pos, (pos) => {
          state.pos = pos;
          render();
        });
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
  });
}

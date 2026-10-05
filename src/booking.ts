import { getAttribution, getCalendlyUtm, withUtm } from './attribution';
import { CALENDLY_ORIGIN, CALENDLY_URL } from './config';
import { trackBooking, trackEvent } from './tracking';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget(options: {
        url: string;
        parentElement: HTMLElement;
        utm?: Record<string, string>;
      }): void;
    };
  }
}

const WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js';
const BOOKED_KEY_PREFIX = 'subsecond-booked:';

let widgetPromise: Promise<void> | null = null;

/** Inject Calendly's widget.js once. */
export function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  widgetPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      widgetPromise = null;
      reject(new Error('Calendly widget failed to load'));
    };
    document.head.appendChild(script);
  });
  return widgetPromise;
}

/** After this long without a rendered calendar, say so instead of just waiting. */
export const SLOW_AFTER_MS = 8000;
/**
 * Fallback if Calendly's iframe loads but its "viewed" message never arrives.
 * Generous on purpose: on slow connections the iframe fires `load` well
 * before the calendar inside it has rendered.
 */
const READY_AFTER_LOAD_MS = 6000;

const STATUS_TEXT = {
  loading: 'Loading calendar…',
  slow: 'Still loading — the calendar is taking longer than usual.',
  error: 'The calendar couldn’t load here.',
} as const;

type EmbedState = 'loading' | 'slow' | 'error' | 'ready';

/**
 * Visible placeholder while Calendly loads (its own spinner needs CSS we
 * don't ship), with a direct link so nobody is left staring at a blank box.
 */
function showStatus(container: HTMLElement): void {
  if (container.querySelector('.calendly-status')) return;
  const status = document.createElement('div');
  status.className = 'calendly-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.innerHTML = `
    <span class="calendly-status__dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <p class="calendly-status__text">${STATUS_TEXT.loading}</p>
    <a class="calendly-status__link" target="_blank" rel="noopener">Open calendar in a new tab</a>
  `;
  status.querySelector('a')!.href = withUtm(CALENDLY_URL);
  container.appendChild(status);
}

function setState(container: HTMLElement, state: EmbedState): void {
  if (container.dataset.calendlyState === 'ready') return;
  container.dataset.calendlyState = state;
  const status = container.querySelector('.calendly-status');
  if (state === 'ready') {
    status?.remove();
    return;
  }
  const text = status?.querySelector('.calendly-status__text');
  if (text) text.textContent = STATUS_TEXT[state];
}

/** Render the Calendly widget into a `[data-calendly-embed]` container (once). */
export function mountEmbed(container: HTMLElement): Promise<void> {
  if (container.dataset.calendlyMounted) return Promise.resolve();
  container.dataset.calendlyMounted = 'true';
  showStatus(container);
  setState(container, 'loading');
  window.setTimeout(() => {
    if (container.dataset.calendlyState === 'loading') setState(container, 'slow');
  }, SLOW_AFTER_MS);

  return loadCalendly()
    .then(() => {
      window.Calendly?.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: container,
        utm: getCalendlyUtm(),
      });
      container.querySelector('iframe')?.addEventListener('load', () => {
        window.setTimeout(() => setState(container, 'ready'), READY_AFTER_LOAD_MS);
      });
    })
    .catch(() => {
      delete container.dataset.calendlyMounted;
      setState(container, 'error');
    });
}

/** The embed a Calendly message came from, by matching its iframe window. */
function embedOf(source: MessageEventSource | null): HTMLElement | null {
  const embeds = document.querySelectorAll<HTMLElement>('[data-calendly-embed]');
  for (const embed of embeds) {
    const frame = embed.querySelector('iframe');
    if (frame && frame.contentWindow === source) return embed;
  }
  return null;
}

function inviteeId(payload: unknown): string | null {
  const uri = (payload as { invitee?: { uri?: unknown } } | undefined)?.invitee?.uri;
  if (typeof uri !== 'string' || !uri) return null;
  return uri.split('/').filter(Boolean).pop() ?? null;
}

const booked = new Set<string>();
const opened = new Set<string>();

function alreadyBooked(id: string): boolean {
  if (booked.has(id)) return true;
  try {
    return sessionStorage.getItem(BOOKED_KEY_PREFIX + id) !== null;
  } catch {
    return false;
  }
}

function markBooked(id: string): void {
  booked.add(id);
  try {
    sessionStorage.setItem(BOOKED_KEY_PREFIX + id, String(Date.now()));
  } catch {
    // In-memory guard still prevents duplicates on this page.
  }
}

/**
 * Funnel + conversion tracking from Calendly's postMessage events. Only a
 * completed booking (`calendly.event_scheduled`) counts as the conversion.
 */
export function handleCalendlyMessage(event: MessageEvent): void {
  if (event.origin !== CALENDLY_ORIGIN) return;
  const data = event.data as { event?: unknown; payload?: unknown } | null;
  if (!data || typeof data.event !== 'string' || !data.event.startsWith('calendly.')) return;

  const embed = embedOf(event.source);
  const placement = embed?.dataset.calendlyEmbed ?? 'unknown';

  // Any page view inside the iframe means the calendar is on screen.
  if (embed && data.event !== 'calendly.page_height') setState(embed, 'ready');

  switch (data.event) {
    case 'calendly.event_type_viewed':
      if (opened.has(placement)) return;
      opened.add(placement);
      trackEvent('calendly_opened', { placement });
      break;
    case 'calendly.date_and_time_selected':
      trackEvent('calendly_date_selected', { placement });
      break;
    case 'calendly.event_scheduled': {
      const id = inviteeId(data.payload);
      if (!id || alreadyBooked(id)) return;
      markBooked(id);
      trackBooking(id, placement);
      break;
    }
  }
}

let listening = false;

/**
 * Lazy-mount inline embeds as they approach the viewport, point direct
 * Calendly links at a UTM-tagged URL, and listen for booking events.
 * The modal embed is mounted by initBookingModal on first open instead.
 */
export function initCalendly(): void {
  if (!listening) {
    window.addEventListener('message', handleCalendlyMessage);
    listening = true;
  }

  document.querySelectorAll<HTMLAnchorElement>('[data-calendly-link]').forEach((link) => {
    link.href = withUtm(CALENDLY_URL);
  });

  const inline = Array.from(
    document.querySelectorAll<HTMLElement>('[data-calendly-embed]:not([data-calendly-lazy="manual"])'),
  );
  if (!inline.length) return;

  if (!('IntersectionObserver' in window)) {
    inline.forEach((el) => void mountEmbed(el));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        void mountEmbed(entry.target as HTMLElement);
      });
    },
    { rootMargin: '600px 0px' },
  );
  inline.forEach((el) => observer.observe(el));
}

/**
 * Fallback inquiry forms next to the calendar: attach stored UTMs as hidden
 * fields so form leads keep their attribution, and log the submit to GA.
 * Not an OpenAI conversion — only a completed booking is.
 */
export function initFallbackForms(): void {
  document.querySelectorAll<HTMLFormElement>('form[data-fallback-form]').forEach((form) => {
    form.addEventListener('submit', () => {
      const attr = getAttribution();
      Object.entries({ ...attr, landing_page: window.location.pathname }).forEach(([name, value]) => {
        if (!value) return;
        let input = form.querySelector<HTMLInputElement>(`input[type="hidden"][name="${name}"]`);
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          form.appendChild(input);
        }
        input.value = value;
      });
      trackEvent('fallback_form_submit', { placement: form.dataset.fallbackForm });
    });
  });
}

export function initBookingModal(): void {
  const overlay = document.getElementById('calendlyModal');
  const closeBtn = document.getElementById('calendly-modal-close');
  const embed = overlay?.querySelector<HTMLElement>('[data-calendly-embed]');
  const triggers = document.querySelectorAll<HTMLAnchorElement>('[data-booking-cta]');
  if (!overlay || !closeBtn || !triggers.length) return;

  // Without JS-driven modal (or if it fails) the link still books directly.
  triggers.forEach((trigger) => {
    trigger.href = withUtm(CALENDLY_URL);
  });

  const open = (event: Event): void => {
    event.preventDefault();
    const cta = (event.currentTarget as HTMLElement).dataset.bookingCta || 'unknown';
    trackEvent('booking_cta_click', { cta });
    if (embed) void mountEmbed(embed);
    overlay.classList.add('is-open');
    document.body.classList.add('calendly-modal-open');
    closeBtn.focus();
  };

  const close = (): void => {
    overlay.classList.remove('is-open');
    document.body.classList.remove('calendly-modal-open');
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', open));
  closeBtn.addEventListener('click', close);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) close();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
}

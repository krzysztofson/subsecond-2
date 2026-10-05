import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import {
  handleCalendlyMessage,
  initBookingModal,
  initFallbackForms,
  mountEmbed,
  SLOW_AFTER_MS,
} from './booking';

const CALENDLY = 'https://calendly.com';

type Tag = (...args: unknown[]) => void;

function calendlyMessage(
  event: string,
  payload: unknown = {},
  { origin = CALENDLY, source = null as MessageEventSource | null } = {},
): MessageEvent {
  return new MessageEvent('message', { data: { event, payload }, origin, source });
}

function scheduled(inviteeUuid: string, opts?: { origin?: string; source?: MessageEventSource | null }) {
  return calendlyMessage(
    'calendly.event_scheduled',
    {
      event: { uri: 'https://api.calendly.com/scheduled_events/EV1' },
      invitee: { uri: `https://api.calendly.com/scheduled_events/EV1/invitees/${inviteeUuid}` },
    },
    opts,
  );
}

function leadCalls(oaiq: Mock<Tag>) {
  return oaiq.mock.calls.filter((call) => call[0] === 'measure' && call[1] === 'lead_created');
}

describe('Calendly tracking', () => {
  let oaiq: Mock<Tag>;
  let gtag: Mock<Tag>;

  beforeEach(() => {
    sessionStorage.clear();
    oaiq = vi.fn<Tag>();
    gtag = vi.fn<Tag>();
    window.oaiq = oaiq;
    window.gtag = gtag;
    document.body.innerHTML = `
      <div data-calendly-embed="lp"><iframe></iframe></div>
    `;
  });

  it('should fire exactly one lead_created per booking, with the invitee as event_id', () => {
    handleCalendlyMessage(scheduled('INV-ONCE'));
    handleCalendlyMessage(scheduled('INV-ONCE'));

    const calls = leadCalls(oaiq);
    expect(calls).toHaveLength(1);
    expect(calls[0]).toEqual([
      'measure',
      'lead_created',
      { type: 'customer_action' },
      { event_id: 'INV-ONCE' },
    ]);
    expect(gtag).toHaveBeenCalledWith(
      'event',
      'calendly_booking_completed',
      expect.objectContaining({ event_id: 'INV-ONCE' }),
    );
  });

  it('should not re-fire a booking already recorded in this session', () => {
    sessionStorage.setItem('subsecond-booked:INV-STORED', '1');
    handleCalendlyMessage(scheduled('INV-STORED'));
    expect(leadCalls(oaiq)).toHaveLength(0);
  });

  it('should ignore messages from other origins', () => {
    handleCalendlyMessage(scheduled('INV-SPOOF', { origin: 'https://evil.example' }));
    expect(oaiq).not.toHaveBeenCalled();
    expect(gtag).not.toHaveBeenCalled();
  });

  it('should ignore a booking event without an invitee', () => {
    handleCalendlyMessage(calendlyMessage('calendly.event_scheduled', {}));
    expect(oaiq).not.toHaveBeenCalled();
  });

  it('should send funnel steps to GA only, never as a lead', () => {
    const frame = document.querySelector('iframe')!;
    const source = frame.contentWindow;
    handleCalendlyMessage(calendlyMessage('calendly.event_type_viewed', {}, { source }));
    handleCalendlyMessage(calendlyMessage('calendly.event_type_viewed', {}, { source }));
    handleCalendlyMessage(calendlyMessage('calendly.date_and_time_selected', {}, { source }));

    expect(oaiq).not.toHaveBeenCalled();
    const opened = gtag.mock.calls.filter((c) => c[1] === 'calendly_opened');
    expect(opened).toEqual([['event', 'calendly_opened', { placement: 'lp' }]]);
    expect(gtag).toHaveBeenCalledWith('event', 'calendly_date_selected', { placement: 'lp' });
  });
});

describe('initBookingModal', () => {
  beforeEach(() => {
    window.oaiq = vi.fn<Tag>();
    window.gtag = vi.fn<Tag>();
    document.body.className = '';
    document.body.innerHTML = `
      <a href="#contact" data-booking-cta="hero">Book</a>
      <a href="#contact" data-booking-cta="nav">Book</a>
      <div id="calendlyModal">
        <button id="calendly-modal-close"></button>
        <div data-calendly-embed="modal" data-calendly-lazy="manual"></div>
      </div>
    `;
    // Pretend widget.js is already loaded so the modal can mount synchronously.
    window.Calendly = { initInlineWidget: vi.fn() };
  });

  it('should open the modal from every CTA without counting a lead', () => {
    initBookingModal();
    const overlay = document.getElementById('calendlyModal')!;
    const close = document.getElementById('calendly-modal-close')!;

    document.querySelectorAll<HTMLAnchorElement>('[data-booking-cta]').forEach((cta) => {
      expect(cta.href).toContain('calendly.com/chatcraft/introductory-call');
      cta.click();
      expect(overlay.classList.contains('is-open')).toBe(true);
      expect(document.body.classList.contains('calendly-modal-open')).toBe(true);
      close.click();
      expect(overlay.classList.contains('is-open')).toBe(false);
    });

    expect(window.gtag).toHaveBeenCalledWith('event', 'booking_cta_click', { cta: 'hero' });
    expect(window.gtag).toHaveBeenCalledWith('event', 'booking_cta_click', { cta: 'nav' });
    expect(window.oaiq).not.toHaveBeenCalled();
  });

  it('should close on Escape', () => {
    initBookingModal();
    const overlay = document.getElementById('calendlyModal')!;
    document.querySelector<HTMLAnchorElement>('[data-booking-cta]')!.click();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(overlay.classList.contains('is-open')).toBe(false);
  });

  it('should mount the modal Calendly embed on first open', async () => {
    initBookingModal();
    document.querySelector<HTMLAnchorElement>('[data-booking-cta]')!.click();
    await Promise.resolve();
    await Promise.resolve();
    expect(window.Calendly!.initInlineWidget).toHaveBeenCalledTimes(1);
    expect(window.Calendly!.initInlineWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining('calendly.com/chatcraft/introductory-call'),
        parentElement: document.querySelector('[data-calendly-embed="modal"]'),
      }),
    );
  });
});

describe('initFallbackForms', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.oaiq = vi.fn<Tag>();
    window.gtag = vi.fn<Tag>();
    document.body.innerHTML = `
      <form data-fallback-form="lp" action="https://submit-form.com/x" method="POST">
        <input name="email" value="a@b.co" />
      </form>
    `;
  });

  it('should add stored UTMs as hidden fields and log a GA event, not a lead', () => {
    sessionStorage.setItem(
      'subsecond-attr',
      JSON.stringify({ utm_source: 'openai', utm_campaign: 'revenue_review' }),
    );
    initFallbackForms();
    const form = document.querySelector('form')!;
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    form.dispatchEvent(new Event('submit', { cancelable: true }));

    const hidden = (name: string) =>
      form.querySelectorAll<HTMLInputElement>(`input[type="hidden"][name="${name}"]`);
    expect(hidden('utm_source')).toHaveLength(1);
    expect(hidden('utm_source')[0].value).toBe('openai');
    expect(hidden('utm_campaign')[0].value).toBe('revenue_review');
    expect(hidden('landing_page')[0].value).toBe(window.location.pathname);
    expect(window.gtag).toHaveBeenCalledWith('event', 'fallback_form_submit', { placement: 'lp' });
    expect(window.oaiq).not.toHaveBeenCalled();
  });
});

describe('Calendly loading state', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.gtag = vi.fn<Tag>();
    window.oaiq = vi.fn<Tag>();
    document.body.innerHTML = `<div data-calendly-embed="lp"></div>`;
    // Stub widget.js: inject an iframe like Calendly does.
    window.Calendly = {
      initInlineWidget: vi.fn(({ parentElement }) => {
        parentElement.appendChild(document.createElement('iframe'));
      }),
    };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const embed = () => document.querySelector<HTMLElement>('[data-calendly-embed]')!;
  const status = () => embed().querySelector('.calendly-status');

  it('should show a loading message with a direct link as soon as it mounts', () => {
    void mountEmbed(embed());
    expect(status()?.textContent).toContain('Loading calendar');
    const link = status()!.querySelector<HTMLAnchorElement>('a')!;
    expect(link.href).toContain('calendly.com/chatcraft/introductory-call');
    expect(link.target).toBe('_blank');
  });

  it('should remove the message once Calendly reports a page view', async () => {
    await mountEmbed(embed());
    const source = embed().querySelector('iframe')!.contentWindow;
    handleCalendlyMessage(calendlyMessage('calendly.page_height', {}, { source }));
    expect(status()).not.toBeNull();
    handleCalendlyMessage(calendlyMessage('calendly.event_type_viewed', {}, { source }));
    expect(status()).toBeNull();
    expect(embed().dataset.calendlyState).toBe('ready');
  });

  it('should say it is slow after a while, keeping the link', async () => {
    await mountEmbed(embed());
    vi.advanceTimersByTime(SLOW_AFTER_MS);
    expect(embed().dataset.calendlyState).toBe('slow');
    expect(status()?.textContent).toContain('taking longer than usual');
    expect(status()?.querySelector('a')).not.toBeNull();
  });

  it('should show an error state when widget.js fails', async () => {
    window.Calendly = undefined;
    const append = vi.spyOn(document.head, 'appendChild').mockImplementation((node) => {
      queueMicrotask(() => (node as HTMLScriptElement).onerror?.(new Event('error')));
      return node;
    });
    await mountEmbed(embed());
    append.mockRestore();
    expect(embed().dataset.calendlyState).toBe('error');
    expect(status()?.textContent).toContain('couldn’t load');
  });
});

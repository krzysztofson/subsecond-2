import { getAttribution } from './attribution';
import { trackEvent } from './tracking';

/**
 * Normalise what people actually type into a "website address" field —
 * `yourclinic.com`, `www.clinic.pl/about`, `https://clinic.com` — into an
 * absolute http(s) URL. Returns null for anything that isn't a public host.
 */
export function normalizeSiteUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value || /\s/.test(value)) return null;
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (!/\.[a-z][a-z\d-]+$/i.test(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

const MESSAGES = {
  badUrl: 'Enter your website address, e.g. yourclinic.com',
  sending: 'Sending…',
  sent: 'Thanks! Your video review is on its way. Expect it in your inbox within 3 business days.',
  error: 'That didn’t go through. Try again, or email hello@subsecond.app.',
} as const;

type FormState = 'idle' | 'sending' | 'sent' | 'error';

function setState(form: HTMLFormElement, state: FormState): void {
  form.dataset.state = state;
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  if (status) status.textContent = state === 'idle' ? '' : MESSAGES[state];
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (button) button.disabled = state === 'sending';
}

/**
 * Free video review forms (`form[data-review-form]`): website + email, sent
 * to Formspark as JSON with the session's attribution so the lead keeps its
 * source. Without JS the same form posts to Formspark directly.
 * Logs `video_review_submit` to GA4; not an OpenAI conversion — only a
 * completed booking is.
 */
export function initReviewForms(root: ParentNode = document): void {
  root.querySelectorAll<HTMLFormElement>('form[data-review-form]').forEach((form) => {
    const site = form.querySelector<HTMLInputElement>('input[name="site_url"]');
    site?.addEventListener('input', () => site.setCustomValidity(''));

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (form.dataset.state === 'sending' || form.dataset.state === 'sent') return;

      const siteUrl = site ? normalizeSiteUrl(site.value) : null;
      if (site && !siteUrl) {
        site.setCustomValidity(MESSAGES.badUrl);
        site.reportValidity();
        return;
      }

      const placement = form.dataset.reviewForm ?? 'unknown';
      const fields = Object.fromEntries(
        Array.from(new FormData(form).entries()).filter(
          (entry): entry is [string, string] => typeof entry[1] === 'string',
        ),
      );
      const payload = {
        ...fields,
        ...(siteUrl ? { site_url: siteUrl } : {}),
        ...getAttribution(),
        placement,
        landing_page: window.location.pathname,
      };

      setState(form, 'sending');
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Form endpoint answered ${res.status}`);
        setState(form, 'sent');
        trackEvent('video_review_submit', { placement });
      } catch {
        setState(form, 'error');
        trackEvent('video_review_error', { placement });
      }
    });
  });
}

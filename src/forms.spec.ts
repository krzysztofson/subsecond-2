import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { ATTRIBUTION_KEY } from './attribution';
import { initReviewForms, normalizeSiteUrl } from './forms';

describe('normalizeSiteUrl', () => {
  it('should accept a bare domain and add https', () => {
    expect(normalizeSiteUrl('yourclinic.com')).toBe('https://yourclinic.com/');
    expect(normalizeSiteUrl('  www.klinika.pl/o-nas ')).toBe('https://www.klinika.pl/o-nas');
  });

  it('should keep an explicit http(s) scheme', () => {
    expect(normalizeSiteUrl('http://clinic.com')).toBe('http://clinic.com/');
    expect(normalizeSiteUrl('HTTPS://Clinic.com/a')).toBe('https://clinic.com/a');
  });

  it('should reject things that are not a public website', () => {
    expect(normalizeSiteUrl('')).toBeNull();
    expect(normalizeSiteUrl('my clinic')).toBeNull();
    expect(normalizeSiteUrl('localhost')).toBeNull();
    expect(normalizeSiteUrl('ftp://clinic.com')).toBeNull();
    expect(normalizeSiteUrl('javascript:alert(1)')).toBeNull();
  });
});

type Tag = (...args: unknown[]) => void;

describe('initReviewForms', () => {
  let gtag: Mock<Tag>;
  let fetchMock: Mock;

  const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

  function render(): HTMLFormElement {
    document.body.innerHTML = `
      <form action="https://submit-form.com/TEST" method="POST" data-review-form="home">
        <input type="hidden" name="form" value="video_review" />
        <input type="text" name="site_url" required />
        <input type="email" name="email" required />
        <button type="submit">Send</button>
        <p data-form-status></p>
      </form>`;
    initReviewForms();
    return document.querySelector('form')!;
  }

  function fill(form: HTMLFormElement, site: string, email = 'owner@clinic.com'): void {
    form.querySelector<HTMLInputElement>('[name="site_url"]')!.value = site;
    form.querySelector<HTMLInputElement>('[name="email"]')!.value = email;
  }

  beforeEach(() => {
    sessionStorage.clear();
    gtag = vi.fn<Tag>();
    window.gtag = gtag;
    fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should post JSON with the normalised URL and stored attribution, then show success', async () => {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify({ utm_source: 'openai', utm_campaign: 'spring' }));
    const form = render();
    fill(form, 'yourclinic.com');

    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await flush();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://submit-form.com/TEST');
    expect(init.headers.Accept).toBe('application/json');
    expect(JSON.parse(init.body)).toMatchObject({
      form: 'video_review',
      site_url: 'https://yourclinic.com/',
      email: 'owner@clinic.com',
      utm_source: 'openai',
      utm_campaign: 'spring',
      placement: 'home',
    });
    expect(form.dataset.state).toBe('sent');
    expect(form.querySelector('[data-form-status]')!.textContent).toMatch(/on its way/);
    expect(gtag).toHaveBeenCalledWith('event', 'video_review_submit', { placement: 'home' });
  });

  it('should not send an unusable website address', async () => {
    const form = render();
    fill(form, 'my clinic');

    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await flush();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(form.querySelector<HTMLInputElement>('[name="site_url"]')!.validationMessage).not.toBe('');
  });

  it('should show an error and allow a retry when the endpoint fails', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500 });
    const form = render();
    fill(form, 'clinic.com');

    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await flush();
    expect(form.dataset.state).toBe('error');
    expect(gtag).not.toHaveBeenCalledWith('event', 'video_review_submit', expect.anything());

    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await flush();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(form.dataset.state).toBe('sent');
  });

  it('should send only once when submitted twice in a row', async () => {
    const form = render();
    fill(form, 'clinic.com');

    form.dispatchEvent(new Event('submit', { cancelable: true }));
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await flush();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

/**
 * Informational cookie notice. Analytics and ad measurement load regardless;
 * this only tells visitors so, and remembers that they've seen it.
 */

export const NOTICE_KEY = 'subsecond-notice-ok';

function dismissed(): boolean {
  try {
    return localStorage.getItem(NOTICE_KEY) !== null;
  } catch {
    return false;
  }
}

export function initNotice(): void {
  if (dismissed() || document.getElementById('cookie-notice')) return;

  const notice = document.createElement('div');
  notice.className = 'cookie-notice';
  notice.id = 'cookie-notice';
  notice.setAttribute('role', 'region');
  notice.setAttribute('aria-label', 'Cookie notice');
  notice.innerHTML = `
    <p class="cookie-notice__text">We use cookies for analytics and ad measurement.</p>
    <button type="button" class="cookie-notice__btn" data-cursor>OK</button>
  `;

  notice.querySelector('button')?.addEventListener('click', () => {
    try {
      localStorage.setItem(NOTICE_KEY, String(Date.now()));
    } catch {
      // Storage blocked — the notice just reappears next visit.
    }
    notice.remove();
  });

  document.body.appendChild(notice);
}

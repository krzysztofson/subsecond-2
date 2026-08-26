import { CALENDLY_URL } from './config';

export function initBookingModal(): void {
  const overlay = document.getElementById('calendlyModal');
  const closeBtn = document.getElementById('calendly-modal-close');
  const triggers = document.querySelectorAll<HTMLAnchorElement>('[data-booking-cta]');
  if (!overlay || !closeBtn || !triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.href = CALENDLY_URL;
  });

  const open = (event: Event): void => {
    event.preventDefault();
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

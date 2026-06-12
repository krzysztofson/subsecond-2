import { CONTACT_EMAIL } from './config';
import { translations, type Lang } from './i18n';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  package: string;
  message: string;
}

export function buildMailtoUrl(
  email: string,
  subject: string,
  data: ContactFormData,
): string {
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || '—'}`,
    `Package: ${data.package}`,
    '',
    data.message,
  ].join('\n');

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function getLang(): Lang {
  const lang = document.documentElement.lang;
  return lang === 'pl' ? 'pl' : 'en';
}

function preselectPackage(form: HTMLFormElement): void {
  const select = form.querySelector<HTMLSelectElement>('[name="package"]');
  if (!select) return;

  const fromHash = window.location.hash.match(/package=(foundation|growth|partner)/i);
  if (fromHash) {
    select.value = fromHash[1].toLowerCase();
    return;
  }

  const trigger = document.querySelector<HTMLElement>('[data-package].is-pending');
  if (trigger?.dataset.package) {
    select.value = trigger.dataset.package;
    trigger.classList.remove('is-pending');
  }
}

export function initContactForm(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (!form) return;

  preselectPackage(form);

  document.querySelectorAll<HTMLElement>('[data-package]').forEach((el) => {
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-package]').forEach((node) =>
        node.classList.remove('is-pending'),
      );
      el.classList.add('is-pending');
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data: ContactFormData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem('company') as HTMLInputElement).value.trim(),
      package: (form.elements.namedItem('package') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };

    const lang = getLang();
    const subject = translations[lang]['contact.form.subject'];
    window.location.href = buildMailtoUrl(CONTACT_EMAIL, subject, data);
  });
}

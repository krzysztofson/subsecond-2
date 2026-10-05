import { beforeEach, describe, expect, it } from 'vitest';
import { initNotice, NOTICE_KEY } from './notice';

describe('initNotice', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  it('should show once and stay hidden after OK', () => {
    initNotice();
    initNotice();
    expect(document.querySelectorAll('#cookie-notice')).toHaveLength(1);

    document.querySelector<HTMLButtonElement>('#cookie-notice button')!.click();
    expect(document.getElementById('cookie-notice')).toBeNull();
    expect(localStorage.getItem(NOTICE_KEY)).not.toBeNull();

    initNotice();
    expect(document.getElementById('cookie-notice')).toBeNull();
  });
});

import { beforeEach, describe, expect, it } from 'vitest';
import { clampPosition, initCompareSliders } from './compare';

function pointer(type: string, clientX: number): PointerEvent {
  // jsdom has no PointerEvent constructor; a MouseEvent carries what we read.
  const event = new MouseEvent(type, { clientX, button: 0, bubbles: true });
  Object.assign(event, { pointerId: 1, pointerType: 'mouse' });
  return event as PointerEvent;
}

describe('clampPosition', () => {
  it('should keep the divider within 0–100', () => {
    expect(clampPosition(-12)).toBe(0);
    expect(clampPosition(42)).toBe(42);
    expect(clampPosition(130)).toBe(100);
  });
});

describe('initCompareSliders', () => {
  let el: HTMLElement;
  let handle: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div data-compare>
        <div role="slider" tabindex="0" aria-valuenow="50"></div>
      </div>
    `;
    el = document.querySelector('[data-compare]')!;
    handle = el.querySelector('[role="slider"]')!;
    el.getBoundingClientRect = () => ({ left: 100, width: 200 }) as DOMRect;
    initCompareSliders();
  });

  it('should start the divider in the middle', () => {
    expect(el.style.getPropertyValue('--pos')).toBe('50%');
    expect(handle.getAttribute('aria-valuenow')).toBe('50');
  });

  it('should follow a drag across the frame', () => {
    el.dispatchEvent(pointer('pointerdown', 150));
    expect(el.style.getPropertyValue('--pos')).toBe('25%');

    el.dispatchEvent(pointer('pointermove', 250));
    expect(el.style.getPropertyValue('--pos')).toBe('75%');

    el.dispatchEvent(pointer('pointerup', 250));
    el.dispatchEvent(pointer('pointermove', 120));
    expect(el.style.getPropertyValue('--pos')).toBe('75%');
  });

  it('should clamp drags past the edges', () => {
    el.dispatchEvent(pointer('pointerdown', 400));
    expect(handle.getAttribute('aria-valuenow')).toBe('100');
  });

  it('should move with the arrow keys and jump with Home/End', () => {
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(handle.getAttribute('aria-valuenow')).toBe('52');

    handle.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', shiftKey: true, bubbles: true }),
    );
    expect(handle.getAttribute('aria-valuenow')).toBe('42');

    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(handle.getAttribute('aria-valuenow')).toBe('0');
  });
});

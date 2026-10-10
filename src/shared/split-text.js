import { CLASS_SPLIT_PART } from '../constants.js';

/**
 * Wraps every word or character of an element's text in its own span so the parts can animate separately.
 * @param {HTMLElement} element
 * @param {'words' | 'chars'} unit
 * @returns {HTMLSpanElement[]}
 */
export function splitText(element, unit) {
  const text = element.textContent.trim();
  const parts = unit === 'chars' ? [...text] : text.split(/\s+/);
  element.setAttribute('aria-label', text);
  element.textContent = '';

  return parts.map((part, index) => {
    const span = document.createElement('span');
    span.className = CLASS_SPLIT_PART;
    span.setAttribute('aria-hidden', 'true');
    span.textContent = part === ' ' ? '\u00a0' : part;
    element.append(span);
    if (unit === 'words' && index < parts.length - 1) element.append(' ');
    return span;
  });
}

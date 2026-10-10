import { IMAGE_QUALITY, IMAGE_WIDTHS, UNSPLASH_BASE } from '../constants.js';

/**
 * @param {string} photoId the part of an Unsplash image URL after "photo-"
 * @param {number} width
 * @returns {string}
 */
export function unsplashUrl(photoId, width) {
  return `${UNSPLASH_BASE}${photoId}?auto=format&fit=crop&w=${width}&q=${IMAGE_QUALITY}`;
}

/**
 * @param {string} photoId
 * @returns {string} a srcset covering phone to large desktop widths
 */
export function unsplashSrcset(photoId) {
  return IMAGE_WIDTHS.map((width) => `${unsplashUrl(photoId, width)} ${width}w`).join(', ');
}

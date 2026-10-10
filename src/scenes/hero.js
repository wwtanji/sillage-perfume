import { gsap } from 'gsap';
import { CLASS_IS_READY, SELECTORS } from '../constants.js';
import { splitText } from '../shared/split-text.js';
import { prefersReducedMotion } from '../shared/motion.js';

const frame = (top, right, bottom, left, archRadius) =>
  `inset(${top}% ${right}% ${bottom}% ${left}% round ${archRadius}px ${archRadius}px 0px 0px)`;

/**
 * Opens on the bottle in full bleed, then lets it draw back into a framed arch as the visitor scrolls.
 * @returns {void}
 */
export function initHero() {
  document.body.classList.add(CLASS_IS_READY);
  if (prefersReducedMotion()) return;

  const letters = splitText(document.querySelector(SELECTORS.heroTitle), 'chars');
  gsap
    .timeline({ defaults: { ease: 'expo.out' } })
    .fromTo(SELECTORS.heroMedia, { clipPath: frame(50, 50, 50, 50, 0) }, { clipPath: frame(0, 0, 0, 0, 0), duration: 2.2, ease: 'expo.inOut' }, 0)
    .from(SELECTORS.heroImage, { scale: 1.3, duration: 3.2 }, 0)
    .from(letters, { yPercent: 120, rotate: 8, duration: 1.6, stagger: 0.07 }, 0.9)
    .from(SELECTORS.heroPart, { autoAlpha: 0, y: 20, duration: 1.2, stagger: 0.12 }, 1.4);

  gsap
    .timeline({ scrollTrigger: { trigger: SELECTORS.hero, start: 'top top', end: 'bottom top', scrub: true } })
    .fromTo(SELECTORS.heroMedia, { clipPath: frame(0, 0, 0, 0, 0) }, { clipPath: frame(12, 24, 6, 24, 999), ease: 'none', immediateRender: false }, 0)
    .fromTo(SELECTORS.heroImage, { scale: 1 }, { scale: 1.2, ease: 'none', immediateRender: false }, 0)
    .to(SELECTORS.heroTitle, { yPercent: -70, letterSpacing: '0.04em', ease: 'none' }, 0)
    .to(SELECTORS.heroPart, { autoAlpha: 0, ease: 'none', duration: 0.4 }, 0);
}

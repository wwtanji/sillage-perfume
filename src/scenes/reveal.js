import { gsap } from 'gsap';
import { SELECTORS } from '../constants.js';
import { splitText } from '../shared/split-text.js';
import { prefersReducedMotion } from '../shared/motion.js';

/**
 * Lights the manifesto word by word, fades blocks in as they arrive and drifts framed images against the scroll.
 * @returns {void}
 */
export function initReveals() {
  if (prefersReducedMotion()) return;

  const words = splitText(document.querySelector(SELECTORS.manifesto), 'words');
  gsap.fromTo(
    words,
    { opacity: 0.12 },
    {
      opacity: 1,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: { trigger: SELECTORS.manifesto, start: 'top 78%', end: 'bottom 40%', scrub: true },
    },
  );

  document.querySelectorAll(SELECTORS.reveal).forEach((element) => {
    gsap.from(element, {
      y: 70,
      autoAlpha: 0,
      duration: 1.3,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 85%' },
    });
  });

  document.querySelectorAll(SELECTORS.parallax).forEach((image) => {
    gsap.fromTo(
      image,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

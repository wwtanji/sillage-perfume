import { gsap } from 'gsap';
import { CLASS_IS_ACTIVE, CLASS_IS_STATIC, PRICE_CURRENCY, PRICE_LOCALE, SELECTORS } from '../constants.js';
import { FRAGRANCES } from '../data/fragrances.js';
import { unsplashSrcset, unsplashUrl } from '../shared/unsplash.js';
import { prefersReducedMotion } from '../shared/motion.js';

const SCROLL_PER_FRAGRANCE = 100;
const ARCH_RADIUS = 'round 999px 999px 0 0';
const archClip = (top, bottom) => `inset(${top}% 0% ${bottom}% 0% ${ARCH_RADIUS})`;
const priceFormatter = new Intl.NumberFormat(PRICE_LOCALE, { style: 'currency', currency: PRICE_CURRENCY, maximumFractionDigits: 0 });

function pad(number) {
  return String(number).padStart(2, '0');
}

function panelMarkup(fragrance, index) {
  const pyramid = fragrance.pyramid.map((tier) => `<div><dt>${tier.label}</dt><dd>${tier.notes}</dd></div>`).join('');
  return `
    <article class="panel" id="${fragrance.id}" data-panel>
      <div class="panel__text" data-panel-text>
        <p class="panel__family">${fragrance.family}</p>
        <h3 class="panel__name">${fragrance.name}</h3>
        <p class="panel__line">${fragrance.line}</p>
        <dl class="panel__pyramid">${pyramid}</dl>
        <p class="panel__price"><span>${priceFormatter.format(fragrance.price)}</span>${fragrance.size}</p>
      </div>
      <figure class="panel__arch" data-panel-arch>
        <img data-panel-image src="${unsplashUrl(fragrance.photo.id, 1080)}" srcset="${unsplashSrcset(fragrance.photo.id)}"
          sizes="(max-width: 900px) 80vw, 38vw" alt="${fragrance.photo.alt}" ${index === 0 ? '' : 'loading="lazy"'} />
      </figure>
      <p class="panel__index" aria-hidden="true">${pad(index + 1)}</p>
    </article>`;
}

function applyPalette(target, palette) {
  target.style.setProperty('--bg', palette.background);
  target.style.setProperty('--fg', palette.foreground);
  target.style.setProperty('--accent', palette.accent);
}

function animatePalette(target, palette) {
  gsap.to(target, {
    '--bg': palette.background,
    '--fg': palette.foreground,
    '--accent': palette.accent,
    duration: 1.1,
    ease: 'power2.inOut',
  });
}

function transition(panels, from, to) {
  const direction = to > from ? 1 : -1;
  const outgoing = panels[from];
  const incoming = panels[to];
  const outgoingText = outgoing.querySelector(SELECTORS.panelText).children;
  const incomingText = incoming.querySelector(SELECTORS.panelText).children;
  const incomingImage = incoming.querySelector(SELECTORS.panelImage);

  gsap.to(outgoingText, { yPercent: -40 * direction, autoAlpha: 0, duration: 0.6, stagger: 0.04, ease: 'power3.in', overwrite: 'auto' });
  gsap.to(outgoing, { autoAlpha: 0, duration: 0.8, delay: 0.35, ease: 'none', overwrite: 'auto' });

  gsap.killTweensOf([incoming, ...incomingText]);
  gsap.set(incoming, { autoAlpha: 1, zIndex: 2 });
  gsap.set(outgoing, { zIndex: 1 });
  gsap.fromTo(
    incoming.querySelector(SELECTORS.panelArch),
    { clipPath: direction > 0 ? archClip(100, 0) : archClip(0, 100) },
    { clipPath: archClip(0, 0), duration: 1.2, ease: 'expo.inOut', overwrite: 'auto' },
  );
  gsap.fromTo(incomingImage, { scale: 1.35 }, { scale: 1, duration: 1.6, ease: 'expo.out', overwrite: 'auto' });
  gsap.fromTo(
    incomingText,
    { yPercent: 50 * direction, autoAlpha: 0 },
    { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.06, delay: 0.35, ease: 'power3.out', overwrite: 'auto' },
  );
}

/**
 * Pins the collection and swaps fragrances as the visitor scrolls: the bottle rises through an arch,
 * the notes slide in, and the whole room takes on the fragrance's colours.
 * @returns {void}
 */
export function initCollection() {
  const collection = document.querySelector(SELECTORS.collection);
  const stage = collection.querySelector(SELECTORS.collectionStage);
  const count = collection.querySelector(SELECTORS.collectionCount);
  const progressBar = collection.querySelector(SELECTORS.collectionProgress);
  stage.innerHTML = FRAGRANCES.map(panelMarkup).join('');
  applyPalette(collection, FRAGRANCES[0].palette);

  const panels = [...stage.querySelectorAll(SELECTORS.panel)];
  if (prefersReducedMotion()) {
    collection.classList.add(CLASS_IS_STATIC);
    return;
  }

  gsap.set(panels.slice(1), { autoAlpha: 0 });
  panels[0].classList.add(CLASS_IS_ACTIVE);
  let current = 0;

  const show = (index) => {
    if (index === current) return;
    transition(panels, current, index);
    panels[current].classList.remove(CLASS_IS_ACTIVE);
    panels[index].classList.add(CLASS_IS_ACTIVE);
    animatePalette(collection, FRAGRANCES[index].palette);
    count.textContent = pad(index + 1);
    current = index;
  };

  gsap.timeline({
    scrollTrigger: {
      trigger: collection,
      start: 'top top',
      end: `+=${SCROLL_PER_FRAGRANCE * FRAGRANCES.length}%`,
      pin: true,
      scrub: true,
      onUpdate: ({ progress }) => {
        progressBar.style.transform = `scaleX(${progress})`;
        show(Math.min(FRAGRANCES.length - 1, Math.floor(progress * FRAGRANCES.length)));
      },
    },
  });

  panels.forEach((panel) => {
    gsap.to(panel.querySelector(SELECTORS.panelImage), {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: { trigger: collection, start: 'top top', end: `+=${SCROLL_PER_FRAGRANCE * FRAGRANCES.length}%`, scrub: true },
    });
  });
}

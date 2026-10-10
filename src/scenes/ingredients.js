import { gsap } from 'gsap';
import { SELECTORS, SIDEWAYS_QUERY } from '../constants.js';
import { INGREDIENTS } from '../data/ingredients.js';
import { unsplashSrcset, unsplashUrl } from '../shared/unsplash.js';

function cardMarkup(ingredient, index) {
  return `
    <article class="ingredient">
      <figure class="ingredient__frame">
        <img data-ingredient-image src="${unsplashUrl(ingredient.photo.id, 1080)}" srcset="${unsplashSrcset(ingredient.photo.id)}"
          sizes="(max-width: 900px) 78vw, 30vw" alt="${ingredient.photo.alt}" loading="lazy" />
      </figure>
      <p class="ingredient__index">${String(index + 1).padStart(2, '0')}</p>
      <h3 class="ingredient__name">${ingredient.name}</h3>
      <p class="ingredient__origin">${ingredient.origin}</p>
      <p class="ingredient__text">${ingredient.text}</p>
    </article>`;
}

/**
 * Lays the raw materials out on a track that walks sideways on wide screens and swipes on phones.
 * @returns {void}
 */
export function initIngredients() {
  const section = document.querySelector(SELECTORS.ingredients);
  const track = section.querySelector(SELECTORS.ingredientsTrack);
  track.insertAdjacentHTML('beforeend', INGREDIENTS.map(cardMarkup).join(''));
  const travelDistance = () => track.scrollWidth - window.innerWidth;

  gsap.matchMedia().add(SIDEWAYS_QUERY, () => {
    const walk = gsap.to(track, {
      x: () => -travelDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${travelDistance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    track.querySelectorAll(SELECTORS.ingredientImage).forEach((image) => {
      gsap.fromTo(
        image,
        { xPercent: -12 },
        {
          xPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: image.parentElement, containerAnimation: walk, start: 'left right', end: 'right left', scrub: true },
        },
      );
    });
  });
}

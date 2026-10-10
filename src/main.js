import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import './styles.css';
import { initSmoothScroll, initScrollLinks } from './interactions/smooth-scroll.js';
import { initHero } from './scenes/hero.js';
import { initCollection } from './scenes/collection.js';
import { initIngredients } from './scenes/ingredients.js';
import { initReveals } from './scenes/reveal.js';

gsap.registerPlugin(ScrollTrigger);
history.scrollRestoration = 'manual';

async function start() {
  const lenis = initSmoothScroll();
  initCollection();
  initIngredients();
  initReveals();
  initScrollLinks(lenis);

  await document.fonts.ready;
  ScrollTrigger.refresh();
  initHero();
}

start();

/**
 * @typedef {Object} Ingredient
 * @property {string} name
 * @property {string} origin
 * @property {string} text
 * @property {import('./fragrances.js').Photo} photo
 */

/** @type {Ingredient[]} */
export const INGREDIENTS = [
  {
    name: 'Rose',
    origin: 'Damask rose, Bulgaria',
    text: 'Picked at dawn, before the sun burns off the oil. It takes thousands of petals to make a single gram.',
    photo: { id: '1707317061323-d7967684713c', alt: 'A single red rose in a dark room', author: 'Nipun Haldar' },
  },
  {
    name: 'Vanilla',
    origin: 'Vanilla orchid, Madagascar',
    text: 'Every flower is pollinated by hand, and the pods are cured in the sun for months before they smell of anything.',
    photo: { id: '1672582938873-a796f64539dd', alt: 'A white orchid in a black vase against a dark background', author: 'Iosif Chiriluta' },
  },
  {
    name: 'Bergamot',
    origin: 'Citrus bergamia, Calabria',
    text: 'The bright green opening of most colognes. The peel is cold-pressed, never heated.',
    photo: { id: '1534362761520-f5454bdc1651', alt: 'A close-up of the peel of a green citrus fruit', author: 'Jason Leung' },
  },
  {
    name: 'Oud',
    origin: 'Agarwood, Assam',
    text: 'A dark, resinous wood that forms only when the tree fights an infection. Rare, smoky and expensive.',
    photo: { id: '1488643637913-82a3820cf051', alt: 'Smoke curling against a black background', author: 'Daniele Levis Pelusi' },
  },
  {
    name: 'Cedar',
    origin: 'Atlas cedar, Morocco',
    text: 'Dry, pencil-shaving wood that holds the heavier notes in place and lets them last into the evening.',
    photo: { id: '1635485755954-02f78f378dc0', alt: 'Smoke rising from a piece of wood on a dark surface', author: 'GKVP' },
  },
];

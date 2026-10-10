/**
 * @typedef {Object} NoteTier
 * @property {string} label
 * @property {string} notes
 */

/**
 * @typedef {Object} Palette
 * @property {string} background
 * @property {string} foreground
 * @property {string} accent
 */

/**
 * @typedef {Object} Photo
 * @property {string} id the part of the Unsplash URL after "photo-"
 * @property {string} alt
 * @property {string} author
 */

/**
 * @typedef {Object} Fragrance
 * @property {string} id
 * @property {string} name
 * @property {string} family
 * @property {string} line
 * @property {NoteTier[]} pyramid
 * @property {number} price
 * @property {string} size
 * @property {Palette} palette
 * @property {Photo} photo
 */

/** @type {Fragrance[]} */
export const FRAGRANCES = [
  {
    id: 'ambre-nuit',
    name: 'Ambre Nuit',
    family: 'Amber · Spiced',
    line: 'Saffron and labdanum melting into warm vanilla. The last hour of a long dinner.',
    pyramid: [
      { label: 'Top', notes: 'Pink pepper, saffron' },
      { label: 'Heart', notes: 'Labdanum, tonka bean' },
      { label: 'Base', notes: 'Amber, Madagascar vanilla' },
    ],
    price: 185,
    size: 'Extrait de parfum, 50 ml',
    palette: { background: '#1e0e06', foreground: '#f6e7d4', accent: '#f08a3c' },
    photo: { id: '1709662369957-0cbf9f8452fc', alt: 'A pipette letting amber oil fall into a glass bottle', author: 'Fulvio Ciccolo' },
  },
  {
    id: 'rose-noire',
    name: 'Rose Noire',
    family: 'Floral · Woody',
    line: 'Damask rose pressed against dark oud. A rose that has been out all night.',
    pyramid: [
      { label: 'Top', notes: 'Blackcurrant, bergamot' },
      { label: 'Heart', notes: 'Damask rose, Turkish rose' },
      { label: 'Base', notes: 'Oud, patchouli' },
    ],
    price: 210,
    size: 'Extrait de parfum, 50 ml',
    palette: { background: '#12080b', foreground: '#f3e3e5', accent: '#d2475a' },
    photo: { id: '1720423738890-37689a6f6b95', alt: 'A red glass perfume bottle against a dark red background', author: 'Muhammad Sulyman' },
  },
  {
    id: 'vetiver-fume',
    name: 'Vétiver Fumé',
    family: 'Woody · Smoky',
    line: 'Haitian vetiver over birch smoke and cedar. Wool coat, cold air, a fire somewhere close.',
    pyramid: [
      { label: 'Top', notes: 'Grapefruit, cardamom' },
      { label: 'Heart', notes: 'Haitian vetiver, orris' },
      { label: 'Base', notes: 'Birch tar, Atlas cedar' },
    ],
    price: 175,
    size: 'Eau de parfum, 100 ml',
    palette: { background: '#1a150f', foreground: '#efe4d3', accent: '#c4a57a' },
    photo: { id: '1716857591457-7d7fa45199c6', alt: 'Two amber bottles on a mirror under shadows of leaves', author: 'Masoud Nikookalam' },
  },
  {
    id: 'neroli-blanc',
    name: 'Néroli Blanc',
    family: 'Citrus · Musk',
    line: 'Bitter orange blossom and clean white musk. Linen drying in a Mediterranean courtyard.',
    pyramid: [
      { label: 'Top', notes: 'Calabrian bergamot, neroli' },
      { label: 'Heart', notes: 'Orange blossom, white tea' },
      { label: 'Base', notes: 'White musk, ambrette' },
    ],
    price: 160,
    size: 'Eau de parfum, 100 ml',
    palette: { background: '#ebe4d8', foreground: '#2b261f', accent: '#8a7350' },
    photo: { id: '1705899844877-81bb0a0665c1', alt: 'An unlabelled glass bottle resting between pale stones', author: 'Content Pixie' },
  },
  {
    id: 'iris-poudre',
    name: 'Iris Poudré',
    family: 'Powdery · Floral',
    line: 'Orris butter, violet and soft suede. The inside of a vintage handbag.',
    pyramid: [
      { label: 'Top', notes: 'Pear, aldehydes' },
      { label: 'Heart', notes: 'Orris butter, violet' },
      { label: 'Base', notes: 'Suede, sandalwood' },
    ],
    price: 195,
    size: 'Extrait de parfum, 50 ml',
    palette: { background: '#f1ddd6', foreground: '#3a2226', accent: '#a5566a' },
    photo: { id: '1647507653704-bde7f2d6dbf0', alt: 'A dark bottle with a blank label on a pedestal against blush pink', author: 'Ubaid E. Alyafizi' },
  },
];

import type { BottleRecipe } from '../types';

export const BOTTLE_RECIPES: BottleRecipe[] = [
  {
    smaakstof: 'neutraal',
    label: 'Naturel',
    ingredienten: ['Water kefir (na F1)'],
    tip: 'Laat 24-48 uur op kamertemperatuur staan voor lichte bruising.',
  },
  {
    smaakstof: 'gember',
    label: 'Gember',
    ingredienten: [
      'Water kefir (na F1)',
      '1-2 cm verse gember, fijngehakt of geraspt',
      'Optioneel: 1 tl honing',
    ],
    tip: 'Gember versnelt de gisting sterk. Controleer de druk na 12-18 uur en ontlucht indien nodig.',
  },
  {
    smaakstof: 'rood_fruit',
    label: 'Rood Fruit',
    ingredienten: [
      'Water kefir (na F1)',
      '50-100g frambozen, aardbeien of bramen (vers of diepvries)',
      'Optioneel: 1 tl rietsuiker',
    ],
    tip: 'Rood fruit geeft veel suiker af en versnelt de gisting. Ontlucht voorzichtig na 12-24 uur.',
  },
  {
    smaakstof: 'citrus',
    label: 'Citrus',
    ingredienten: [
      'Water kefir (na F1)',
      'Sap van ½ citroen of ½ limoen',
      'Optioneel: schil van ½ sinaasappel',
    ],
    tip: 'Citrus geeft een frisse, zachte smaak. Gisting verloopt rustiger dan bij gember of rood fruit.',
  },
];

export function getRecipe(smaakstof: string): BottleRecipe | undefined {
  return BOTTLE_RECIPES.find((r) => r.smaakstof === smaakstof);
}

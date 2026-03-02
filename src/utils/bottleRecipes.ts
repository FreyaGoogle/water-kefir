import type { BottleRecipe, Smaakstof } from '../types';

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
    snelleGisting: true,
  },
  {
    smaakstof: 'rood_fruit',
    label: 'Rood Fruit (mix)',
    ingredienten: [
      'Water kefir (na F1)',
      '50-100g frambozen, aardbeien of bramen (vers of diepvries)',
      'Optioneel: 1 tl rietsuiker',
    ],
    tip: 'Rood fruit geeft veel suiker af en versnelt de gisting. Ontlucht voorzichtig na 12-24 uur.',
    snelleGisting: true,
  },
  {
    smaakstof: 'citrus',
    label: 'Citrus (mix)',
    ingredienten: [
      'Water kefir (na F1)',
      'Sap van ½ citroen of ½ limoen',
      'Optioneel: schil van ½ sinaasappel',
    ],
    tip: 'Citrus geeft een frisse, zachte smaak. Gisting verloopt rustiger dan bij gember of rood fruit.',
  },
  {
    smaakstof: 'aardbei',
    label: 'Aardbei',
    ingredienten: [
      'Water kefir (na F1)',
      '80-120g verse of diepvries aardbeien, in stukjes',
      'Optioneel: 1 tl honing',
    ],
    tip: 'Aardbeien geven een mooie roze kleur en zoete smaak. Controleer de druk na 18-24 uur.',
    snelleGisting: true,
  },
  {
    smaakstof: 'framboos',
    label: 'Framboos',
    ingredienten: [
      'Water kefir (na F1)',
      '80-100g frambozen (vers of diepvries)',
      'Optioneel: 1 tl agavesiroop',
    ],
    tip: 'Frambozen geven een levendige, scherpe smaak. De gisting verloopt actief — ontlucht na 12-18 uur.',
    snelleGisting: true,
  },
  {
    smaakstof: 'blauwe_bes',
    label: 'Blauwe bes',
    ingredienten: [
      'Water kefir (na F1)',
      '80-100g blauwe bessen (vers of diepvries)',
    ],
    tip: 'Blauwe bessen geven een mooie paarse kleur. Gisting is matig actief, controleer na 24 uur.',
  },
  {
    smaakstof: 'granaatappel',
    label: 'Granaatappel',
    ingredienten: [
      'Water kefir (na F1)',
      '50-80ml granaatappelsap (100% puur)',
      'Optioneel: een paar pitten voor decoratie',
    ],
    tip: 'Granaatappel geeft een rijke, friszure smaak. Laat 24-36 uur fermenteren voor de beste bruising.',
  },
  {
    smaakstof: 'mango',
    label: 'Mango',
    ingredienten: [
      'Water kefir (na F1)',
      '80-100g mango (vers of diepvries), in stukjes',
      'Optioneel: snufje kurkuma voor kleur',
    ],
    tip: 'Mango geeft een exotische, zoete smaak. De suikers versnellen de gisting — controleer na 18-24 uur.',
    snelleGisting: true,
  },
  {
    smaakstof: 'ananas',
    label: 'Ananas',
    ingredienten: [
      'Water kefir (na F1)',
      '80-100g verse ananas, in stukjes (geen blik — conserveermiddelen remmen gisting)',
    ],
    tip: 'Ananas geeft veel suiker af en versnelt de gisting sterk. Ontlucht na 12-18 uur.',
    snelleGisting: true,
  },
  {
    smaakstof: 'passievrucht',
    label: 'Passievrucht',
    ingredienten: [
      'Water kefir (na F1)',
      'Vruchtvlees van 2-3 passievruchten',
      'Optioneel: 1 tl honing',
    ],
    tip: 'Passievrucht geeft een tropische, aromatische smaak. Zeef het zaad na fermentatie als gewenst.',
  },
  {
    smaakstof: 'limoen',
    label: 'Limoen',
    ingredienten: [
      'Water kefir (na F1)',
      'Sap van 1 limoen',
      'Optioneel: schil van ½ limoen (biologisch)',
    ],
    tip: 'Limoen geeft een frisse, scherpe smaak. Laat 24 uur fermenteren voor een zachte bruising.',
  },
  {
    smaakstof: 'peer',
    label: 'Peer',
    ingredienten: [
      'Water kefir (na F1)',
      '1 rijpe peer, in dunne plakjes',
      'Optioneel: snufje kaneel',
    ],
    tip: 'Peer geeft een milde, zachte smaak. Gisting verloopt rustig — laat 36-48 uur staan voor goede bruising.',
  },
  {
    smaakstof: 'vlierbloesem',
    label: 'Vlierbloesem',
    ingredienten: [
      'Water kefir (na F1)',
      '30-50ml vlierbloesemcordial (of 2-3 verse vlierbloesemtakjes)',
    ],
    tip: 'Vlierbloesem geeft een bloemige, verfijnde smaak. Gisting is rustig — laat 24-36 uur staan.',
  },
  {
    smaakstof: 'munt',
    label: 'Munt',
    ingredienten: [
      'Water kefir (na F1)',
      '6-8 verse muntblaadjes',
      'Optioneel: sap van ½ limoen',
    ],
    tip: 'Munt geeft een verfrissende smaak. Combineer eventueel met limoen voor een mojito-effect.',
  },
  {
    smaakstof: 'hibiscus',
    label: 'Hibiscus',
    ingredienten: [
      'Water kefir (na F1)',
      '1-2 tl gedroogde hibiscusbloemen (of 50ml gebrouwen hibiscusthee, afgekoeld)',
    ],
    tip: 'Hibiscus geeft een mooie dieprode kleur en friszure smaak. Laat 24-36 uur fermenteren.',
  },
  {
    smaakstof: 'vanille',
    label: 'Vanille',
    ingredienten: [
      'Water kefir (na F1)',
      '½ vanillestokje (opengespleten) of 1 tl puur vanille-extract',
      'Optioneel: 1 tl honing',
    ],
    tip: 'Vanille geeft een zachte, romige smaak. Laat 24-48 uur fermenteren voor de beste aroma-ontwikkeling.',
  },
];

export function getRecipe(smaakstof: Smaakstof): BottleRecipe | undefined {
  return BOTTLE_RECIPES.find((r) => r.smaakstof === smaakstof);
}

export function getRecipes(smaakstoffen: Smaakstof[]): BottleRecipe[] {
  return BOTTLE_RECIPES.filter((r) => smaakstoffen.includes(r.smaakstof));
}

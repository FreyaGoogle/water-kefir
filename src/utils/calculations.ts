import type { Ingredients, GedroogdFruitType } from '../types';

export const GEDROOGD_FRUIT_CONFIG: Record<GedroogdFruitType, { label: string; gramPerStuk: number }> = {
  abrikozen: { label: 'Gedroogde abrikozen', gramPerStuk: 8 },
  dadels:    { label: 'Dadels',              gramPerStuk: 7 },
  rozijnen:  { label: 'Rozijnen',            gramPerStuk: 1.5 },
  vijgen:    { label: 'Gedroogde vijgen',    gramPerStuk: 10 },
  pruimen:   { label: 'Gedroogde pruimen',   gramPerStuk: 10 },
};

const GRAM_PER_SCHIJFJE_CITROEN = 15;

export function calcIngredients(gramsKefir: number): Ingredients {
  return {
    water: gramsKefir * 10,
    suiker: gramsKefir * 0.5,
    abrikozen: gramsKefir * 0.05,
    citroen: gramsKefir * 0.05,
  };
}

export interface FormattedIngredient {
  label: string;
  value: number;
  unit: string;
}

export function formatIngredients(
  ing: Ingredients,
  fruitType: GedroogdFruitType = 'abrikozen',
): FormattedIngredient[] {
  const fruitConfig = GEDROOGD_FRUIT_CONFIG[fruitType];
  const fruitStuks = Math.max(1, Math.round(ing.abrikozen / fruitConfig.gramPerStuk));
  const citroenSchijfjes = Math.max(1, Math.round(ing.citroen / GRAM_PER_SCHIJFJE_CITROEN));

  return [
    { label: 'Water', value: ing.water, unit: 'ml' },
    { label: 'Suiker', value: ing.suiker, unit: 'g' },
    { label: fruitConfig.label, value: fruitStuks, unit: 'stuks' },
    { label: 'Citroen', value: citroenSchijfjes, unit: 'schijfjes' },
  ];
}

import type { Ingredients } from '../types';

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

export function formatIngredients(ing: Ingredients): FormattedIngredient[] {
  return [
    { label: 'Water', value: ing.water, unit: 'ml' },
    { label: 'Suiker', value: ing.suiker, unit: 'g' },
    { label: 'Gedroogde abrikozen', value: ing.abrikozen, unit: 'g' },
    { label: 'Citroen (schijfje)', value: ing.citroen, unit: 'g' },
  ];
}

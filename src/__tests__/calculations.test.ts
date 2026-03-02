import { describe, it, expect } from 'vitest';
import { calcIngredients, formatIngredients } from '../utils/calculations';

describe('calcIngredients', () => {
  it('calcIngredients(50) → water=500, suiker=25, abrik=12.5, citroen=22.5', () => {
    const result = calcIngredients(50);
    expect(result.water).toBe(500);
    expect(result.suiker).toBe(25);
    expect(result.abrikozen).toBe(12.5);
    expect(result.citroen).toBe(22.5);
  });

  it('verhouding water ×10 voor 20g', () => {
    expect(calcIngredients(20).water).toBe(200);
  });

  it('verhouding water ×10 voor 50g', () => {
    expect(calcIngredients(50).water).toBe(500);
  });

  it('verhouding water ×10 voor 80g', () => {
    expect(calcIngredients(80).water).toBe(800);
  });

  it('verhouding water ×10 voor 150g', () => {
    expect(calcIngredients(150).water).toBe(1500);
  });

  it('verhouding suiker ×0.5 voor 20g', () => {
    expect(calcIngredients(20).suiker).toBe(10);
  });

  it('verhouding suiker ×0.5 voor 50g', () => {
    expect(calcIngredients(50).suiker).toBe(25);
  });

  it('verhouding suiker ×0.5 voor 80g', () => {
    expect(calcIngredients(80).suiker).toBe(40);
  });

  it('verhouding suiker ×0.5 voor 100g', () => {
    expect(calcIngredients(100).suiker).toBe(50);
  });

  it('verhouding abrikozen ×0.25 voor 50g', () => {
    expect(calcIngredients(50).abrikozen).toBe(12.5);
  });

  it('verhouding citroen ×0.45 voor 50g', () => {
    expect(calcIngredients(50).citroen).toBe(22.5);
  });

  it('verhouding abrikozen ×0.25 voor 100g → 25g (≈3 abrikozen)', () => {
    expect(calcIngredients(100).abrikozen).toBe(25);
  });

  it('verhouding citroen ×0.45 voor 100g → 45g (≈3 schijfjes)', () => {
    expect(calcIngredients(100).citroen).toBe(45);
  });
});

describe('formatIngredients', () => {
  it('formatIngredients bevat alle labels', () => {
    const ing = calcIngredients(50);
    const formatted = formatIngredients(ing);
    const labels = formatted.map((f) => f.label);
    expect(labels).toContain('Water');
    expect(labels).toContain('Suiker');
    expect(labels).toContain('Gedroogde abrikozen');
    expect(labels).toContain('Citroen');
  });

  it('formatIngredients bevat alle waarden', () => {
    const ing = calcIngredients(50);
    const formatted = formatIngredients(ing);
    expect(formatted.find((f) => f.label === 'Water')?.value).toBe(500);
    expect(formatted.find((f) => f.label === 'Suiker')?.value).toBe(25);
  });

  it('formatIngredients geeft 4 ingrediënten terug', () => {
    const formatted = formatIngredients(calcIngredients(50));
    expect(formatted).toHaveLength(4);
  });

  it('fruit toont in stuks', () => {
    const formatted = formatIngredients(calcIngredients(50));
    const fruit = formatted.find((f) => f.label === 'Gedroogde abrikozen');
    expect(fruit?.unit).toBe('stuks');
  });

  it('citroen toont in schijfjes', () => {
    const formatted = formatIngredients(calcIngredients(50));
    const citroen = formatted.find((f) => f.label === 'Citroen');
    expect(citroen?.unit).toBe('schijfjes');
  });

  it('dadels als fruittype geeft eigen label', () => {
    const formatted = formatIngredients(calcIngredients(50), 'dadels');
    const labels = formatted.map((f) => f.label);
    expect(labels).toContain('Dadels');
  });

  it('minimum 1 stuk fruit ook bij kleine hoeveelheid', () => {
    const formatted = formatIngredients(calcIngredients(10));
    const fruit = formatted.find((f) => f.label === 'Gedroogde abrikozen');
    expect(fruit?.value).toBeGreaterThanOrEqual(1);
  });

  it('minimum 1 schijfje citroen ook bij kleine hoeveelheid', () => {
    const formatted = formatIngredients(calcIngredients(10));
    const citroen = formatted.find((f) => f.label === 'Citroen');
    expect(citroen?.value).toBeGreaterThanOrEqual(1);
  });
});

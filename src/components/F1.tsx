import { useState, useEffect } from 'react';
import { calcIngredients, formatIngredients, GEDROOGD_FRUIT_CONFIG } from '../utils/calculations';
import { saveData, loadData } from '../utils/storage';
import type { GedroogdFruitType } from '../types';

const FRUIT_OPTIONS: { value: GedroogdFruitType; label: string }[] = [
  { value: 'abrikozen', label: 'Gedroogde abrikozen' },
  { value: 'dadels',    label: 'Dadels' },
  { value: 'rozijnen',  label: 'Rozijnen' },
  { value: 'vijgen',    label: 'Gedroogde vijgen' },
  { value: 'pruimen',   label: 'Gedroogde pruimen' },
];

export function F1() {
  const [grams, setGrams] = useState<number | null>(null);
  const [fruitType, setFruitType] = useState<GedroogdFruitType>('abrikozen');

  useEffect(() => {
    const data = loadData();
    if (data?.gramsKefir) setGrams(data.gramsKefir);
    if (data?.gedroogdFruit) setFruitType(data.gedroogdFruit);
  }, []);

  const ingredients = grams ? calcIngredients(grams) : null;
  const formatted = ingredients ? formatIngredients(ingredients, fruitType) : null;

  function handleGramsChange(value: string) {
    const num = value === '' ? null : Number(value);
    setGrams(num);
    if (num) saveData({ gramsKefir: num });
  }

  function handleFruitChange(value: GedroogdFruitType) {
    setFruitType(value);
    saveData({ gedroogdFruit: value });
  }

  const fruitConfig = GEDROOGD_FRUIT_CONFIG[fruitType];

  return (
    <div className="card">
      <h2>Eerste Fermentatie (F1)</h2>
      <p>Voer het gewicht van je kefirkorrels in om de benodigde ingrediënten te berekenen.</p>

      <div className="form-group">
        <label htmlFor="grams">Kefirkorrels (gram):</label>
        <input
          id="grams"
          type="number"
          min={10}
          max={500}
          value={grams ?? ''}
          placeholder="bijv. 50"
          onChange={(e) => handleGramsChange(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fruitType">Soort gedroogd fruit:</label>
        <select
          id="fruitType"
          value={fruitType}
          onChange={(e) => handleFruitChange(e.target.value as GedroogdFruitType)}
        >
          {FRUIT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <h3>Ingrediënten voor F1</h3>
      {formatted ? (
        <>
          <table className="ingredients-table">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Hoeveelheid</th>
              </tr>
            </thead>
            <tbody>
              {formatted.map((ing) => (
                <tr key={ing.label}>
                  <td>{ing.label}</td>
                  <td>
                    {ing.value} {ing.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="smaak-notitie">
            <em>De hoeveelheden gedroogd fruit en citroen zijn richtlijnen — pas gerust aan naar eigen smaak.</em>
          </p>
        </>
      ) : (
        <p className="placeholder-tekst">Voer het gewicht van je kefirkorrels in om de ingrediënten te zien.</p>
      )}

      {formatted && (
        <div className="info-box">
          <strong>Werkwijze F1:</strong>
          <ol>
            <li>Doe water, suiker, {fruitConfig.label.toLowerCase()} en citroen in een pot. Roer kort door — de suiker lost ook op zonder verwarmen.</li>
            <li>Voeg de kefirkorrels toe.</li>
            <li>Dek af met een doek en laat 24-48 uur fermenteren op kamertemperatuur.</li>
            <li>Zeef de korrels en bewaar de kefir voor F2.</li>
          </ol>
        </div>
      )}
    </div>
  );
}

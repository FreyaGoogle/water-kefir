import { useState, useEffect } from 'react';
import { calcIngredients, formatIngredients } from '../utils/calculations';
import { saveData, loadData } from '../utils/storage';

export function F1() {
  const [grams, setGrams] = useState<number>(50);

  useEffect(() => {
    const data = loadData();
    if (data?.gramsKefir) setGrams(data.gramsKefir);
  }, []);

  const ingredients = calcIngredients(grams);
  const formatted = formatIngredients(ingredients);

  function handleChange(value: number) {
    setGrams(value);
    saveData({ gramsKefir: value });
  }

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
          value={grams}
          onChange={(e) => handleChange(Number(e.target.value))}
        />
      </div>

      <h3>Ingrediënten voor F1</h3>
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

      <div className="info-box">
        <strong>Werkwijze F1:</strong>
        <ol>
          <li>Los de suiker op in lauwwarm water.</li>
          <li>Laat afkoelen tot kamertemperatuur.</li>
          <li>Voeg kefirkorrels, abrikozen en citroen toe.</li>
          <li>Dek af met een doek en laat 24-48 uur fermenteren.</li>
          <li>Zeef de korrels en bewaar de kefir voor F2.</li>
        </ol>
      </div>
    </div>
  );
}

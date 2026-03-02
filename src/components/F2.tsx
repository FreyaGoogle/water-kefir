import { useState, useEffect } from 'react';
import { getPressureWarning } from '../utils/decisions';
import { getRecipe } from '../utils/bottleRecipes';
import { saveData, loadData } from '../utils/storage';
import type { Smaakstof } from '../types';

const SMAAKSTOF_OPTIONS: { value: Smaakstof; label: string }[] = [
  { value: 'neutraal', label: 'Naturel' },
  { value: 'gember', label: 'Gember' },
  { value: 'rood_fruit', label: 'Rood Fruit' },
  { value: 'citrus', label: 'Citrus' },
];

const HOURS_OPTIONS = [12, 24, 36, 48];

export function F2() {
  const [hours, setHours] = useState<number>(24);
  const [smaakstof, setSmaakstof] = useState<Smaakstof>('neutraal');

  useEffect(() => {
    const data = loadData();
    if (data?.f2Hours) setHours(data.f2Hours);
    if (data?.smaakstof) setSmaakstof(data.smaakstof);
  }, []);

  function handleHoursChange(value: number) {
    setHours(value);
    saveData({ f2Hours: value });
  }

  function handleSmaakstofChange(value: Smaakstof) {
    setSmaakstof(value);
    saveData({ smaakstof: value });
  }

  const pressureWarning = getPressureWarning(smaakstof, hours);
  const recipe = getRecipe(smaakstof);

  return (
    <div className="card">
      <h2>Tweede Fermentatie (F2)</h2>
      <p>Geef je kefir smaak en bruising in een afgesloten fles.</p>

      <div className="form-group">
        <label htmlFor="smaakstof">Smaakstof:</label>
        <select
          id="smaakstof"
          value={smaakstof}
          onChange={(e) => handleSmaakstofChange(e.target.value as Smaakstof)}
        >
          {SMAAKSTOF_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="hours">Fermentatietijd (uren):</label>
        <select
          id="hours"
          value={hours}
          onChange={(e) => handleHoursChange(Number(e.target.value))}
        >
          {HOURS_OPTIONS.map((h) => (
            <option key={h} value={h}>
              {h} uur
            </option>
          ))}
        </select>
      </div>

      {pressureWarning && (
        <div className="warning-box" data-testid="pressure-warning">
          ⚠️ {pressureWarning}
        </div>
      )}

      {recipe && (
        <div className="recipe-box">
          <h3>Recept: {recipe.label}</h3>
          <ul>
            {recipe.ingredienten.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
          <p>
            <em>Tip: {recipe.tip}</em>
          </p>
        </div>
      )}

      <div className="info-box">
        <strong>Werkwijze F2:</strong>
        <ol>
          <li>Doe de kefir (na F1) in een schone glazen fles met beugelsluiting.</li>
          <li>Voeg de smaakstof toe.</li>
          <li>Sluit de fles goed af.</li>
          <li>Laat {hours} uur op kamertemperatuur staan.</li>
          <li>Zet koud en geniet!</li>
        </ol>
      </div>
    </div>
  );
}

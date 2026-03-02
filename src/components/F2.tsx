import { useState, useEffect } from 'react';
import { getPressureWarning } from '../utils/decisions';
import { getRecipes } from '../utils/bottleRecipes';
import { saveData, loadData } from '../utils/storage';
import type { Smaakstof } from '../types';

interface SmaakstofGroep {
  label: string;
  opties: { value: Smaakstof; label: string }[];
}

const SMAAKSTOF_GROEPEN: SmaakstofGroep[] = [
  {
    label: 'Neutraal',
    opties: [
      { value: 'neutraal', label: 'Naturel' },
    ],
  },
  {
    label: 'Rood fruit & bessen',
    opties: [
      { value: 'rood_fruit',    label: 'Rood Fruit (mix)' },
      { value: 'aardbei',       label: 'Aardbei' },
      { value: 'framboos',      label: 'Framboos' },
      { value: 'blauwe_bes',    label: 'Blauwe bes' },
      { value: 'granaatappel',  label: 'Granaatappel' },
    ],
  },
  {
    label: 'Tropisch fruit',
    opties: [
      { value: 'mango',         label: 'Mango' },
      { value: 'ananas',        label: 'Ananas' },
      { value: 'passievrucht',  label: 'Passievrucht' },
    ],
  },
  {
    label: 'Citrus',
    opties: [
      { value: 'citrus',        label: 'Citrus (mix)' },
      { value: 'limoen',        label: 'Limoen' },
    ],
  },
  {
    label: 'Mild fruit',
    opties: [
      { value: 'peer',          label: 'Peer' },
    ],
  },
  {
    label: 'Kruiden & bloemen',
    opties: [
      { value: 'gember',        label: 'Gember' },
      { value: 'munt',          label: 'Munt' },
      { value: 'vlierbloesem',  label: 'Vlierbloesem' },
      { value: 'hibiscus',      label: 'Hibiscus' },
      { value: 'vanille',       label: 'Vanille' },
    ],
  },
];

const HOURS_OPTIONS = [12, 24, 36, 48];

function parseSavedSmaakstof(raw: Smaakstof | Smaakstof[] | undefined): Smaakstof[] {
  if (!raw) return ['neutraal'];
  if (Array.isArray(raw)) return raw.length > 0 ? raw : ['neutraal'];
  return [raw];
}

export function F2() {
  const [hours, setHours] = useState<number>(24);
  const [smaakstoffen, setSmaakstoffen] = useState<Smaakstof[]>(['neutraal']);

  useEffect(() => {
    const data = loadData();
    if (data?.f2Hours) setHours(data.f2Hours);
    if (data?.smaakstof !== undefined) {
      setSmaakstoffen(parseSavedSmaakstof(data.smaakstof));
    }
  }, []);

  function handleHoursChange(value: number) {
    setHours(value);
    saveData({ f2Hours: value });
  }

  function handleToggle(waarde: Smaakstof) {
    setSmaakstoffen((prev) => {
      let nieuw: Smaakstof[];
      if (waarde === 'neutraal') {
        nieuw = ['neutraal'];
      } else if (prev.includes(waarde)) {
        nieuw = prev.filter((s) => s !== waarde);
        if (nieuw.length === 0) nieuw = ['neutraal'];
      } else {
        nieuw = [...prev.filter((s) => s !== 'neutraal'), waarde];
      }
      saveData({ smaakstof: nieuw });
      return nieuw;
    });
  }

  const pressureWarning = getPressureWarning(smaakstoffen, hours);
  const recepten = getRecipes(smaakstoffen);

  const gecombineerdeIngredienten = recepten.length > 0
    ? Array.from(new Set(recepten.flatMap((r) => r.ingredienten)))
    : ['Water kefir (na F1)'];

  return (
    <div className="card">
      <h2>Tweede Fermentatie (F2)</h2>
      <p>Geef je kefir smaak en bruising in een afgesloten fles.</p>

      <div className="form-group">
        <label>Smaakstof (meerdere mogelijk):</label>
        <div className="smaakstof-groepen">
          {SMAAKSTOF_GROEPEN.map((groep) => (
            <div key={groep.label} className="smaakstof-groep">
              <strong className="groep-label">{groep.label}</strong>
              <div className="smaakstof-opties">
                {groep.opties.map((opt) => (
                  <label key={opt.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={smaakstoffen.includes(opt.value)}
                      onChange={() => handleToggle(opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
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

      <div className="recipe-box">
        <h3>
          {smaakstoffen.includes('neutraal') && smaakstoffen.length === 1
            ? 'Recept: Naturel'
            : `Recept: ${recepten.map((r) => r.label).join(' + ')}`}
        </h3>
        <ul>
          {gecombineerdeIngredienten.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
        {recepten.map((r) => (
          <p key={r.smaakstof}>
            <em>Tip ({r.label}): {r.tip}</em>
          </p>
        ))}
      </div>

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

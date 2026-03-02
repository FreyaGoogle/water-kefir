import { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/storage';
import { generateActions } from '../utils/planner';
import type { PlannerAction, Tijdvoorkeur } from '../types';

export function Planner() {
  const [tijdvoorkeur, setTijdvoorkeur] = useState<Tijdvoorkeur>('ochtend');
  const [f2Hours, setF2Hours] = useState<number>(24);
  const [actions, setActions] = useState<PlannerAction[]>([]);

  useEffect(() => {
    const data = loadData();
    if (data?.tijdvoorkeur) setTijdvoorkeur(data.tijdvoorkeur);
    if (data?.f2Hours) setF2Hours(data.f2Hours);
  }, []);

  useEffect(() => {
    setActions(generateActions(new Date(), f2Hours, tijdvoorkeur));
  }, [tijdvoorkeur, f2Hours]);

  function handleTijdvoorkeur(value: Tijdvoorkeur) {
    setTijdvoorkeur(value);
    saveData({ tijdvoorkeur: value });
  }

  function toggleDone(id: string) {
    const updated = actions.map((a) => (a.id === id ? { ...a, done: !a.done } : a));
    setActions(updated);
    saveData({ plannerActions: updated });
  }

  return (
    <div className="card">
      <h2>Planner</h2>
      <p>Plan je kefir-cyclus op basis van je voorkeur.</p>

      <div className="form-group">
        <label>Starttijd voorkeur:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="ochtend"
              checked={tijdvoorkeur === 'ochtend'}
              onChange={() => handleTijdvoorkeur('ochtend')}
            />
            Ochtend (08:00)
          </label>
          <label>
            <input
              type="radio"
              value="avond"
              checked={tijdvoorkeur === 'avond'}
              onChange={() => handleTijdvoorkeur('avond')}
            />
            Avond (20:00)
          </label>
        </div>
      </div>

      <h3>Actielijst</h3>
      <ul className="action-list">
        {actions.map((action) => (
          <li key={action.id} className={action.done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={action.done}
              onChange={() => toggleDone(action.id)}
              id={action.id}
            />
            <label htmlFor={action.id}>
              <span className="action-time">{action.time}</span>
              <span className="action-label">{action.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

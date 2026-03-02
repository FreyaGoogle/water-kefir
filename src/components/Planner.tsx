import { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/storage';
import { generateActions } from '../utils/planner';
import type { PlannerAction } from '../types';

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function currentTimeString(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function Planner() {
  const [startDate, setStartDate] = useState<string>(todayString());
  const [startTime, setStartTime] = useState<string>(currentTimeString());
  const [f2Hours, setF2Hours] = useState<number>(24);
  const [actions, setActions] = useState<PlannerAction[]>([]);

  useEffect(() => {
    const data = loadData();
    if (data?.plannerStartDate) setStartDate(data.plannerStartDate);
    if (data?.plannerStartTime) setStartTime(data.plannerStartTime);
    if (data?.f2Hours) setF2Hours(data.f2Hours);
  }, []);

  useEffect(() => {
    if (!startDate || !startTime) return;
    const [year, month, day] = startDate.split('-').map(Number);
    const [hour, minute] = startTime.split(':').map(Number);
    const dt = new Date(year, month - 1, day, hour, minute, 0, 0);
    setActions(generateActions(dt, f2Hours));
  }, [startDate, startTime, f2Hours]);

  function handleDateChange(value: string) {
    setStartDate(value);
    saveData({ plannerStartDate: value });
  }

  function handleTimeChange(value: string) {
    setStartTime(value);
    saveData({ plannerStartTime: value });
  }

  function toggleDone(id: string) {
    const updated = actions.map((a) => (a.id === id ? { ...a, done: !a.done } : a));
    setActions(updated);
    saveData({ plannerActions: updated });
  }

  return (
    <div className="card">
      <h2>Planner</h2>
      <p>Kies de startdatum en -tijd van je F1. De planner berekent wanneer je wat moet doen.</p>

      <div className="planner-inputs">
        <div className="form-group">
          <label htmlFor="start-date">Startdatum:</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="start-time">Starttijd:</label>
          <input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => handleTimeChange(e.target.value)}
          />
        </div>
      </div>

      {actions.length > 0 && (
        <>
          <h3>Wat moet je doen?</h3>
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
        </>
      )}
    </div>
  );
}

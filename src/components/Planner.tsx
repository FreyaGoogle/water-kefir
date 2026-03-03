import { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/storage';
import { generateMoments } from '../utils/planner';
import type { PlannerMoment } from '../types';

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function currentTimeString(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function buildMoments(date: string, time: string, hours: number): PlannerMoment[] {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const dt = new Date(year, month - 1, day, hour, minute, 0, 0);
  return generateMoments(dt, hours);
}

export function Planner() {
  const [startDate, setStartDate] = useState<string>(todayString());
  const [startTime, setStartTime] = useState<string>(currentTimeString());
  const [f2Hours, setF2Hours] = useState<number>(24);
  const [moments, setMoments] = useState<PlannerMoment[]>([]);

  useEffect(() => {
    const data = loadData();
    const date = data?.plannerStartDate ?? todayString();
    const time = data?.plannerStartTime ?? currentTimeString();
    const hours = data?.f2Hours ?? 24;

    setStartDate(date);
    setStartTime(time);
    setF2Hours(hours);

    if (data?.plannerMoments && data.plannerMoments.length > 0) {
      setMoments(data.plannerMoments);
    } else {
      setMoments(buildMoments(date, time, hours));
    }
  }, []);

  function handleDateChange(value: string) {
    setStartDate(value);
    saveData({ plannerStartDate: value });
    const newMoments = buildMoments(value, startTime, f2Hours);
    setMoments(newMoments);
    saveData({ plannerMoments: newMoments });
  }

  function handleTimeChange(value: string) {
    setStartTime(value);
    saveData({ plannerStartTime: value });
    const newMoments = buildMoments(startDate, value, f2Hours);
    setMoments(newMoments);
    saveData({ plannerMoments: newMoments });
  }

  function toggleStep(momentId: string, stepId: string) {
    const updated = moments.map((m) =>
      m.id === momentId
        ? { ...m, steps: m.steps.map((s) => (s.id === stepId ? { ...s, done: !s.done } : s)) }
        : m
    );
    setMoments(updated);
    saveData({ plannerMoments: updated });
  }

  function resetPlan() {
    const newMoments = buildMoments(startDate, startTime, f2Hours);
    setMoments(newMoments);
    saveData({ plannerMoments: newMoments });
  }

  const totalSteps = moments.reduce((sum, m) => sum + m.steps.length, 0);
  const doneSteps = moments.reduce((sum, m) => sum + m.steps.filter((s) => s.done).length, 0);

  return (
    <div className="card">
      <h2>Planner</h2>
      <p>Vul de startdatum en -tijd van je F1 in. De planner laat stap voor stap zien wat je wanneer moet doen.</p>

      <div className="planner-inputs">
        <div className="form-group">
          <label htmlFor="start-date">Startdatum F1:</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="start-time">Starttijd F1:</label>
          <input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => handleTimeChange(e.target.value)}
          />
        </div>
      </div>

      <p className="planner-f2-note">
        F2-fermentatietijd: <strong>{f2Hours} uur</strong> — stel dit in via het F2-tabblad.
      </p>

      {moments.length > 0 && (
        <>
          {totalSteps > 0 && (
            <div className="planner-progress-bar-wrap">
              <div
                className="planner-progress-bar"
                style={{ width: `${Math.round((doneSteps / totalSteps) * 100)}%` }}
              />
              <span className="planner-progress-label">{doneSteps} / {totalSteps} stappen klaar</span>
            </div>
          )}

          <div className="planner-moments">
            {moments.map((moment, index) => {
              const doneMoment = moment.steps.filter((s) => s.done).length;
              const totalMoment = moment.steps.length;
              const allDone = doneMoment === totalMoment;

              return (
                <div key={moment.id} className={`moment-card${allDone ? ' moment-all-done' : ''}`}>
                  <div className="moment-header">
                    <span className={`moment-number${allDone ? ' moment-number-done' : ''}`}>
                      {allDone ? '✓' : index + 1}
                    </span>
                    <div className="moment-title-group">
                      <span className="moment-icon">{moment.icon}</span>
                      <span className="moment-title">{moment.title}</span>
                      <span className="moment-time">{moment.time}</span>
                    </div>
                    <span className="moment-badge">{doneMoment}/{totalMoment}</span>
                  </div>

                  <ul className="step-list">
                    {moment.steps.map((s) => (
                      <li key={s.id} className={`step-item${s.done ? ' step-done' : ''}`}>
                        <input
                          type="checkbox"
                          id={s.id}
                          checked={s.done}
                          onChange={() => toggleStep(moment.id, s.id)}
                        />
                        <label htmlFor={s.id}>{s.label}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <button className="btn btn-secondary" onClick={resetPlan}>
            Opnieuw beginnen
          </button>
        </>
      )}
    </div>
  );
}

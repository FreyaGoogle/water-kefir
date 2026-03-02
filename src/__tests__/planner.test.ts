import { describe, it, expect } from 'vitest';
import { generateActions } from '../utils/planner';

describe('generateActions', () => {
  const startDate = new Date(2026, 2, 2, 8, 0, 0); // maandag 2 maart 2026 08:00

  it('genereert exact 3 acties', () => {
    const actions = generateActions(startDate, 24);
    expect(actions).toHaveLength(3);
  });

  it('genereert Start F1 actie', () => {
    const actions = generateActions(startDate, 24);
    expect(actions.some((a) => a.label.includes('Start F1'))).toBe(true);
  });

  it('genereert Zeef/F2 actie', () => {
    const actions = generateActions(startDate, 24);
    expect(actions.some((a) => a.label.includes('Zeef/F2'))).toBe(true);
  });

  it('genereert Koelen actie', () => {
    const actions = generateActions(startDate, 24);
    expect(actions.some((a) => a.label.includes('Koelen'))).toBe(true);
  });

  it('alle acties hebben uniek id', () => {
    const actions = generateActions(startDate, 24);
    const ids = actions.map((a) => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('alle acties hebben done=false', () => {
    const actions = generateActions(startDate, 24);
    expect(actions.every((a) => a.done === false)).toBe(true);
  });

  it('starttijd bevat dag en datum in time-veld', () => {
    const actions = generateActions(startDate, 24);
    expect(actions[0].time).toContain('maart');
    expect(actions[0].time).toContain('08:00');
  });

  it('Zeef/F2 actie is 48 uur later', () => {
    const actions = generateActions(startDate, 24);
    // Start: 2 maart 08:00 → Zeef: 4 maart 08:00
    expect(actions[1].time).toContain('4');
    expect(actions[1].time).toContain('maart');
  });
});

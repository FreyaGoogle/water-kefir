import { describe, it, expect } from 'vitest';
import { generateActions } from '../utils/planner';

describe('generateActions', () => {
  it('genereert exact 3 acties', () => {
    const actions = generateActions(new Date(), 24, 'ochtend');
    expect(actions).toHaveLength(3);
  });

  it('genereert Start F1 actie', () => {
    const actions = generateActions(new Date(), 24, 'ochtend');
    expect(actions.some((a) => a.label.includes('Start F1'))).toBe(true);
  });

  it('genereert Zeef/F2 actie', () => {
    const actions = generateActions(new Date(), 24, 'ochtend');
    expect(actions.some((a) => a.label.includes('Zeef/F2'))).toBe(true);
  });

  it('genereert Koelen actie', () => {
    const actions = generateActions(new Date(), 24, 'ochtend');
    expect(actions.some((a) => a.label.includes('Koelen'))).toBe(true);
  });

  it('alle acties hebben uniek id', () => {
    const actions = generateActions(new Date(), 24, 'ochtend');
    const ids = actions.map((a) => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('alle acties hebben done=false', () => {
    const actions = generateActions(new Date(), 24, 'ochtend');
    expect(actions.every((a) => a.done === false)).toBe(true);
  });

  it('ochtendvoorkeur → start tijd 08:00', () => {
    const actions = generateActions(new Date(), 24, 'ochtend');
    expect(actions[0].time).toBe('08:00');
  });

  it('avondvoorkeur → start tijd 20:00', () => {
    const actions = generateActions(new Date(), 24, 'avond');
    expect(actions[0].time).toBe('20:00');
  });
});

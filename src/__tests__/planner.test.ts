import { describe, it, expect } from 'vitest';
import { generateMoments } from '../utils/planner';

describe('generateMoments', () => {
  const startDate = new Date(2026, 2, 2, 8, 0, 0); // maandag 2 maart 2026 08:00

  it('genereert exact 3 momenten', () => {
    const moments = generateMoments(startDate, 24);
    expect(moments).toHaveLength(3);
  });

  it('eerste moment is Start F1', () => {
    const moments = generateMoments(startDate, 24);
    expect(moments[0].title).toBe('Start F1');
  });

  it('tweede moment is de overgang F1→F2', () => {
    const moments = generateMoments(startDate, 24);
    expect(moments[1].title).toContain('Overgang');
  });

  it('derde moment is F2 in de koelkast', () => {
    const moments = generateMoments(startDate, 24);
    expect(moments[2].title).toContain('koelkast');
  });

  it('elk moment heeft een icon', () => {
    const moments = generateMoments(startDate, 24);
    expect(moments.every((m) => m.icon.length > 0)).toBe(true);
  });

  it('elk moment heeft stappen', () => {
    const moments = generateMoments(startDate, 24);
    expect(moments.every((m) => m.steps.length > 0)).toBe(true);
  });

  it('alle stappen hebben done=false', () => {
    const moments = generateMoments(startDate, 24);
    const allSteps = moments.flatMap((m) => m.steps);
    expect(allSteps.every((s) => s.done === false)).toBe(true);
  });

  it('alle stap-ids zijn uniek', () => {
    const moments = generateMoments(startDate, 24);
    const ids = moments.flatMap((m) => m.steps.map((s) => s.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('alle moment-ids zijn uniek', () => {
    const moments = generateMoments(startDate, 24);
    const ids = moments.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('starttijd bevat dag en datum', () => {
    const moments = generateMoments(startDate, 24);
    expect(moments[0].time).toContain('maart');
    expect(moments[0].time).toContain('08:00');
  });

  it('overgang is 48 uur later (4 maart)', () => {
    const moments = generateMoments(startDate, 24);
    expect(moments[1].time).toContain('4');
    expect(moments[1].time).toContain('maart');
  });

  it('koelkast is 48 + f2Hours later', () => {
    const moments24 = generateMoments(startDate, 24);
    expect(moments24[2].time).toContain('5'); // 4 maart 08:00 + 24h = 5 maart 08:00

    const moments48 = generateMoments(startDate, 48);
    expect(moments48[2].time).toContain('6'); // 4 maart 08:00 + 48h = 6 maart 08:00
  });

  it('overgang bevat stap over zeven', () => {
    const moments = generateMoments(startDate, 24);
    const overgangSteps = moments[1].steps.map((s) => s.label.toLowerCase());
    expect(overgangSteps.some((l) => l.includes('zeef'))).toBe(true);
  });

  it('overgang bevat stap over F2-fles afsluiten', () => {
    const moments = generateMoments(startDate, 24);
    const overgangSteps = moments[1].steps.map((s) => s.label.toLowerCase());
    expect(overgangSteps.some((l) => l.includes('sluit'))).toBe(true);
  });
});

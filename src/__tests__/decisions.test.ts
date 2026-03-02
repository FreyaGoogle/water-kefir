import { describe, it, expect } from 'vitest';
import {
  evaluateCheck,
  getMoldWarning,
  getPressureWarning,
  CHECK_QUESTIONS,
} from '../utils/decisions';

describe('Planner acties', () => {
  it('CHECK_QUESTIONS bevat 6 of meer vragen', () => {
    expect(CHECK_QUESTIONS.length).toBeGreaterThanOrEqual(6);
  });

  it('alle CHECK_QUESTIONS hebben unieke id', () => {
    const ids = CHECK_QUESTIONS.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('alle CHECK_QUESTIONS hebben alle 3 scores', () => {
    for (const q of CHECK_QUESTIONS) {
      expect(q.scores.green).toBeTruthy();
      expect(q.scores.orange).toBeTruthy();
      expect(q.scores.red).toBeTruthy();
    }
  });
});

describe('evaluateCheck', () => {
  it('groen bij alle groene antwoorden', () => {
    const answers = Array(6).fill('green');
    expect(evaluateCheck(answers)).toBe('groen');
  });

  it('rood bij één rood antwoord', () => {
    const answers = ['green', 'green', 'green', 'green', 'green', 'red'];
    expect(evaluateCheck(answers)).toBe('rood');
  });

  it('rood bij meerdere rode antwoorden', () => {
    const answers = ['red', 'red', 'green', 'green', 'green', 'green'];
    expect(evaluateCheck(answers)).toBe('rood');
  });

  it('oranje bij meerderheid oranje antwoorden', () => {
    const answers = ['orange', 'orange', 'orange', 'orange', 'green', 'green'];
    expect(evaluateCheck(answers)).toBe('oranje');
  });

  it('groen bij gelijke aantallen groen en oranje', () => {
    const answers = ['green', 'green', 'green', 'orange', 'orange', 'orange'];
    // greenCount (3) is not > orangeCount (3), so groen
    expect(evaluateCheck(answers)).toBe('groen');
  });
});

describe('getMoldWarning', () => {
  it('schimmelwaarschuwing bevat "STOP"', () => {
    const warning = getMoldWarning(['red']);
    expect(warning).toContain('STOP');
  });

  it('geen waarschuwing bij groene antwoorden', () => {
    const warning = getMoldWarning(['green', 'green']);
    expect(warning).toBeNull();
  });

  it('geen waarschuwing bij oranje antwoorden', () => {
    const warning = getMoldWarning(['orange', 'orange']);
    expect(warning).toBeNull();
  });
});

describe('getPressureWarning', () => {
  it('waarschuwing bij gember + 24u', () => {
    const warning = getPressureWarning(['gember'], 24);
    expect(warning).not.toBeNull();
  });

  it('waarschuwing bij rood_fruit + 24u', () => {
    const warning = getPressureWarning(['rood_fruit'], 24);
    expect(warning).not.toBeNull();
  });

  it('null bij neutraal + 48u (geen snelle gisting)', () => {
    const warning = getPressureWarning(['neutraal'], 48);
    expect(warning).toBeNull();
  });

  it('null bij citrus + 48u (geen snelle gisting)', () => {
    const warning = getPressureWarning(['citrus'], 48);
    expect(warning).toBeNull();
  });

  it('waarschuwing bij gember + 48u', () => {
    const warning = getPressureWarning(['gember'], 48);
    expect(warning).not.toBeNull();
  });

  it('null bij neutraal + 12u', () => {
    const warning = getPressureWarning(['neutraal'], 12);
    expect(warning).toBeNull();
  });

  it('null bij citrus + 12u', () => {
    const warning = getPressureWarning(['citrus'], 12);
    expect(warning).toBeNull();
  });

  it('null bij citrus + 24u', () => {
    const warning = getPressureWarning(['citrus'], 24);
    expect(warning).toBeNull();
  });

  it('null bij neutraal + 24u', () => {
    const warning = getPressureWarning(['neutraal'], 24);
    expect(warning).toBeNull();
  });

  it('waarschuwing bij combinatie gember + citrus + 24u', () => {
    const warning = getPressureWarning(['gember', 'citrus'], 24);
    expect(warning).not.toBeNull();
  });

  it('waarschuwing bij mango + 24u', () => {
    const warning = getPressureWarning(['mango'], 24);
    expect(warning).not.toBeNull();
  });

  it('waarschuwing bij ananas + 24u', () => {
    const warning = getPressureWarning(['ananas'], 24);
    expect(warning).not.toBeNull();
  });
});

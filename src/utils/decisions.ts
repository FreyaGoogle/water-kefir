import type { CheckResult, CheckQuestion, Smaakstof } from '../types';

export const CHECK_QUESTIONS: CheckQuestion[] = [
  {
    id: 'q1',
    text: 'Hoe ruikt de kefir?',
    scores: {
      green: 'Fris en licht zuur',
      orange: 'Neutraal, weinig geur',
      red: 'Onaangenaam of schimmelachtig',
    },
  },
  {
    id: 'q2',
    text: 'Hoe zien de korrels eruit?',
    scores: {
      green: 'Transparant, geleiachtig en soepel',
      orange: 'Iets troebel of kleiner dan normaal',
      red: 'Bruin, slijmerig of vreemde kleur',
    },
  },
  {
    id: 'q3',
    text: 'Is er belvorming (CO2-activiteit)?',
    scores: {
      green: 'Ja, veel belletjes bij het zeven',
      orange: 'Weinig activiteit',
      red: 'Geen activiteit of raar schuim',
    },
  },
  {
    id: 'q4',
    text: 'Hoe smaakt de kefir na F1?',
    scores: {
      green: 'Licht zoet-zuur, aangenaam',
      orange: 'Te zoet of te zuur',
      red: 'Bitter, vies of onaangenaam',
    },
  },
  {
    id: 'q5',
    text: 'Zijn er zichtbare schimmels of vreemde vlekken?',
    scores: {
      green: 'Nee, alles ziet er schoon uit',
      orange: 'Kleine onregelmatigheden, niet zeker',
      red: 'Ja, duidelijke schimmel of vlekken',
    },
  },
  {
    id: 'q6',
    text: 'Groeien de korrels?',
    scores: {
      green: 'Ja, volume neemt toe',
      orange: 'Stabiel, geen groei',
      red: 'Korrels worden kleiner of lossen op',
    },
  },
];

export function evaluateCheck(answers: string[]): CheckResult {
  if (answers.includes('red')) return 'rood';
  const orangeCount = answers.filter((a) => a === 'orange').length;
  const greenCount = answers.filter((a) => a === 'green').length;
  if (orangeCount > greenCount) return 'oranje';
  return 'groen';
}

export function getMoldWarning(answers: string[]): string | null {
  if (answers.includes('red')) {
    return 'STOP: Mogelijke schimmel of bederf gedetecteerd. Gooi deze batch weg en steriliseer al je materialen voor je opnieuw begint.';
  }
  return null;
}

const SNELLE_GISTING_SOORTEN: Smaakstof[] = [
  'gember', 'rood_fruit', 'aardbei', 'framboos', 'mango', 'ananas',
];

export function getPressureWarning(smaakstoffen: Smaakstof[], hours: number): string | null {
  if (hours >= 48) {
    return 'Waarschuwing: bij 48 uur of langer bestaat er een risico op overdruk in de fles. Ontlucht voorzichtig of gebruik een drukbestendige fles.';
  }
  const snelleActief = smaakstoffen.filter((s) => SNELLE_GISTING_SOORTEN.includes(s));
  if (snelleActief.length > 0 && hours >= 24) {
    const namen = snelleActief.join(', ').replace(/_/g, ' ');
    return `Waarschuwing: ${namen} versnelt de gisting aanzienlijk. Bij ${hours} uur F2 kan er overdruk ontstaan. Controleer de druk regelmatig.`;
  }
  return null;
}

export interface Ingredients {
  water: number;
  suiker: number;
  abrikozen: number;
  citroen: number;
}

export interface PlannerAction {
  id: string;
  label: string;
  time: string;
  done: boolean;
}

export interface CheckQuestion {
  id: string;
  text: string;
  scores: {
    green: string;
    orange: string;
    red: string;
  };
}

export type CheckResult = 'groen' | 'oranje' | 'rood';

export type Smaakstof = 'neutraal' | 'gember' | 'rood_fruit' | 'citrus';

export type Tijdvoorkeur = 'ochtend' | 'avond';

export interface StorageData {
  gramsKefir: number;
  f2Hours: number;
  smaakstof: Smaakstof;
  tijdvoorkeur: Tijdvoorkeur;
  checkAnswers: Record<string, string>;
  plannerActions: PlannerAction[];
}

export interface BottleRecipe {
  smaakstof: Smaakstof;
  label: string;
  ingredienten: string[];
  tip: string;
}

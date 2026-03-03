export interface Ingredients {
  water: number;
  suiker: number;
  abrikozen: number;
  citroen: number;
}

export type GedroogdFruitType = 'abrikozen' | 'dadels' | 'rozijnen' | 'vijgen' | 'pruimen';

export interface PlannerAction {
  id: string;
  label: string;
  time: string;
  done: boolean;
}

export interface PlannerStep {
  id: string;
  label: string;
  done: boolean;
}

export interface PlannerMoment {
  id: string;
  time: string;
  title: string;
  icon: string;
  steps: PlannerStep[];
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

export type Smaakstof =
  | 'neutraal'
  | 'gember'
  | 'rood_fruit'
  | 'citrus'
  | 'aardbei'
  | 'framboos'
  | 'blauwe_bes'
  | 'granaatappel'
  | 'mango'
  | 'ananas'
  | 'passievrucht'
  | 'limoen'
  | 'peer'
  | 'vlierbloesem'
  | 'munt'
  | 'hibiscus'
  | 'vanille';

export interface StorageData {
  gramsKefir: number;
  f2Hours: number;
  smaakstof: Smaakstof | Smaakstof[];
  gedroogdFruit: GedroogdFruitType;
  plannerStartDate: string;
  plannerStartTime: string;
  checkAnswers: Record<string, string>;
  plannerActions: PlannerAction[];
  plannerMoments: PlannerMoment[];
}

export interface BottleRecipe {
  smaakstof: Smaakstof;
  label: string;
  ingredienten: string[];
  tip: string;
  snelleGisting?: boolean;
}

import type { PlannerAction, Tijdvoorkeur } from '../types';

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
}

export function generateActions(
  startDate: Date,
  f2Hours: number,
  tijdvoorkeur: Tijdvoorkeur
): PlannerAction[] {
  const start = new Date(startDate);
  const hour = tijdvoorkeur === 'ochtend' ? 8 : 20;
  start.setHours(hour, 0, 0, 0);

  const zeefF2 = new Date(start);
  zeefF2.setHours(zeefF2.getHours() + 48);

  const koelen = new Date(zeefF2);
  koelen.setHours(koelen.getHours() + f2Hours);

  return [
    {
      id: generateId(),
      label: 'Start F1 – Zet kefir op met ingrediënten',
      time: formatTime(start),
      done: false,
    },
    {
      id: generateId(),
      label: 'Zeef/F2 – Zeef de korrels, bottel de kefir',
      time: formatTime(zeefF2),
      done: false,
    },
    {
      id: generateId(),
      label: 'Koelen – Zet de fles in de koelkast',
      time: formatTime(koelen),
      done: false,
    },
  ];
}

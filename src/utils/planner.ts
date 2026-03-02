import type { PlannerAction } from '../types';

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function formatDateTime(date: Date): string {
  const dag = date.toLocaleDateString('nl-NL', { weekday: 'long' });
  const datumStr = date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' });
  const tijd = date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
  return `${dag.charAt(0).toUpperCase() + dag.slice(1)} ${datumStr} om ${tijd}`;
}

export function generateActions(startDate: Date, f2Hours: number): PlannerAction[] {
  const start = new Date(startDate);

  const zeefF2 = new Date(start);
  zeefF2.setHours(zeefF2.getHours() + 48);

  const koelen = new Date(zeefF2);
  koelen.setHours(koelen.getHours() + f2Hours);

  return [
    {
      id: generateId(),
      label: 'Start F1 – Zet kefir op met ingrediënten',
      time: formatDateTime(start),
      done: false,
    },
    {
      id: generateId(),
      label: 'Zeef/F2 – Zeef de korrels, bottel de kefir',
      time: formatDateTime(zeefF2),
      done: false,
    },
    {
      id: generateId(),
      label: 'Koelen – Zet de fles in de koelkast',
      time: formatDateTime(koelen),
      done: false,
    },
  ];
}

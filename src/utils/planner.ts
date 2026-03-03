import type { PlannerMoment, PlannerStep } from '../types';

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function formatDateTime(date: Date): string {
  const dag = date.toLocaleDateString('nl-NL', { weekday: 'long' });
  const datumStr = date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' });
  const tijd = date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
  return `${dag.charAt(0).toUpperCase() + dag.slice(1)} ${datumStr} om ${tijd}`;
}

function step(label: string): PlannerStep {
  return { id: generateId(), label, done: false };
}

export function generateMoments(startDate: Date, f2Hours: number): PlannerMoment[] {
  const start = new Date(startDate);

  const overgangDag = new Date(start);
  overgangDag.setHours(overgangDag.getHours() + 48);

  const koelkast = new Date(overgangDag);
  koelkast.setHours(koelkast.getHours() + f2Hours);

  return [
    {
      id: generateId(),
      time: formatDateTime(start),
      title: 'Start F1',
      icon: '🫙',
      steps: [
        step('Steriliseer de F1-pot: spoel goed om met kokend water'),
        step('Los de suiker op in lauwwarm water en roer goed door'),
        step('Voeg het gedroogd fruit en een partje citroen toe'),
        step('Voeg de kefirkorrels toe'),
        step('Dek de pot af met een doek en sluit met een elastiek'),
        step('Zet op kamertemperatuur, weg van direct zonlicht'),
      ],
    },
    {
      id: generateId(),
      time: formatDateTime(overgangDag),
      title: 'Overgang: F1 → F2',
      icon: '🔄',
      steps: [
        step('Haal de vorige F2-fles(sen) uit de koelkast — klaar om te drinken!'),
        step('Was de F2-fles(sen) schoon en laat afdruipen'),
        step('Zeef de F1: houd een fijnmazige zeef boven de schone fles of maatbeker'),
        step('Schep de kefirkorrels uit de zeef en bewaar ze in een bakje'),
        step('Gooi het gedroogd fruit en de citroen weg'),
        step('Vul de F2-fles met de gezeefd kefir'),
        step('Voeg de smaakstof toe (vers fruit, gembersap, limoensap...)'),
        step('Sluit de F2-fles goed af met de beugelsluiting'),
        step('Zet de F2-fles op kamertemperatuur'),
        step('Was de F1-pot schoon'),
        step('Los suiker op in lauwwarm water voor de nieuwe F1'),
        step('Voeg gedroogd fruit en een partje citroen toe'),
        step('Voeg de kefirkorrels toe'),
        step('Dek de F1-pot af met doek en elastiek'),
      ],
    },
    {
      id: generateId(),
      time: formatDateTime(koelkast),
      title: 'F2 in de koelkast',
      icon: '❄️',
      steps: [
        step('Open de F2-fles voorzichtig boven de gootsteen (druk kan hoog zijn!)'),
        step('Proef eventueel en sluit de fles daarna direct weer af'),
        step('Zet de F2-fles in de koelkast'),
        step('Laat minimaal 2 uur afkoelen voor optimale smaak en prik'),
      ],
    },
  ];
}

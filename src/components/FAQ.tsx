interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Wat is water kefir?',
    answer:
      'Water kefir is een gefermenteerde drank gemaakt met kefirkorrels, water en suiker. De korrels bevatten een symbiose van bacteriën en gisten die de suiker fermenteren tot een licht bruisende, probiotische drank.',
  },
  {
    question: 'Hoe bewaar ik mijn kefirkorrels als ik even stop?',
    answer:
      'Dit hangt af van hoe lang je wilt pauzeren. Voor een korte pauze (tot 6 maanden): leg de korrels in suikerwater en bewaar in de koelkast. De meeste mensen ververs het suikerwater wekelijks, maar er zijn ook ervaringen waarbij korrels jarenlang in de koelkast overleven. Voor langdurige bewaring zijn de meningen verdeeld. Invriezen kan — droog de korrels eerst goed af — maar er bestaat kans op structuurschade aan de korrels. Drogen wordt door veel mensen als de meest betrouwbare methode gezien: laat de korrels 3-5 dagen drogen op kamertemperatuur en bewaar ze daarna droog in de koelkast (3-6 maanden) of vriezer (tot een jaar). Na opslag kunnen korrels 1-2 weken nodig hebben om weer op gang te komen.',
  },
  {
    question: 'Mijn kefir is niet bruisend. Wat doe ik fout?',
    answer:
      'Mogelijke oorzaken: te koude omgeving (ideaal: 20-25°C), te weinig suiker, korrels in slechte conditie, of te korte F2 tijd. Probeer de fles langer op kamertemperatuur te laten staan en zorg voor een constante temperatuur.',
  },
  {
    question: 'Hoeveel water kefir kan ik per dag drinken?',
    answer:
      'Dit verschilt sterk per persoon. Begin met een kleine hoeveelheid — zoals een half glaasje — en kijk hoe je lichaam reageert. De meeste mensen bouwen dit geleidelijk op naar wat voor hen goed voelt. Sommigen drinken dagelijks 250-500 ml zonder problemen, anderen houden het bij minder. Er is geen vaste grens: luister naar je eigen lichaam.',
  },
  {
    question: 'Kunnen mijn korrels groeien?',
    answer:
      'Ja! Gezonde korrels groeien bij elke batch een beetje. Als ze te veel worden, kun je een deel weggeven, eten (ze zijn prima in smoothies) of composteren.',
  },
  {
    question: 'Is water kefir geschikt voor mensen met lactose-intolerantie?',
    answer:
      'Ja! Water kefir bevat geen zuivel en is daarom volledig geschikt voor mensen met lactose-intolerantie of een melkallergie.',
  },
  {
    question: 'Welk water gebruik ik het best?',
    answer:
      'Nederlands leidingwater is prima geschikt — het bevat geen chloor en werkt goed voor water kefir. In andere landen kan leidingwater wél chloor bevatten; gebruik dan gefilterd of bronwater, of laat het water eerst even staan.',
  },
];

export function FAQ() {
  return (
    <div className="card">
      <h2>Veelgestelde Vragen</h2>

      <div className="faq-list">
        {FAQ_ITEMS.map((item, index) => (
          <details key={index} className="faq-item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

interface Tip {
  titel: string;
  tekst: string;
}

const TIPS: Tip[] = [
  {
    titel: 'Zomer vs. winter',
    tekst:
      'In de zomer fermenteert kefir sneller door de hogere kamertemperatuur — soms is F1 al na 24 uur klaar. In de winter duurt het vaak een dag langer. Proef en kijk, de klok is maar een richtlijn.',
  },
  {
    titel: 'Gebruik beugelflesjes voor F2',
    tekst:
      'Beugelflesjes (zoals van bier of limonade) zijn ontworpen voor koolzuurhoudende dranken en houden de druk goed. Een handig trucje: zet ook een plastic frisdrankfles naast je glazen fles. Als die strak staat, weet je dat er genoeg koolzuur is.',
  },
  {
    titel: 'Korrels een rustbatch geven',
    tekst:
      'Als je kefir flauwer van smaak wordt of minder actief lijkt, help je de korrels door een batch te doen zonder smaakstoffen — alleen water en suiker. Dit geeft de micro-organismen de kans om zich te herstellen.',
  },
  {
    titel: 'Smaak sturen met fermentatietijd',
    tekst:
      'Korter fermenteren (24 uur) geeft een zoetere, zachtere kefir. Langer (48 uur of meer) maakt hem zuurder en minder zoet. Experimenteer tot je jouw ideale balans gevonden hebt.',
  },
  {
    titel: 'Flessen spoelen zonder zeep',
    tekst:
      'Zeep kan restanten achterlaten die de korrels schaden. Spoel flessen en pot na elk gebruik goed door met heet water — dat is genoeg. Af en toe een keer steriliseren met kokend water of in de vaatwasser mag wel.',
  },
  {
    titel: 'Rietsuiker of ruwe suiker',
    tekst:
      'Gewone witte suiker werkt prima, maar rietsuiker of ongeraffineerde rietsuiker bevat iets meer mineralen en kan de korrels een extra boost geven. Probeer het eens voor een rijkere smaak.',
  },
  {
    titel: 'Drijvende korrels = goed teken',
    tekst:
      'Als je korrels (of rozijnen, vijgen) naar boven drijven en kleine belletjes bevatten, is de gisting actief. Korrels die zinken zijn niet per se slecht, maar drijvende korrels geven aan dat er genoeg CO₂ wordt geproduceerd.',
  },
  {
    titel: 'Teveel korrels? Geen probleem',
    tekst:
      'Als je korrels groeien heb je op termijn meer dan je nodig hebt. Geef ze weg, stop ze in een smoothie, of maak een gedroogde backup voor als er iets misgaat. Droog ze 3-5 dagen op kamertemperatuur en bewaar ze in de koelkast. Wil je stoppen of heb je er simpelweg te veel? Kefirkorrels zijn volledig composteerbaar — gewoon op de composthoop of in de GFT-bak.',
  },
  {
    titel: 'Metaal vermijden',
    tekst:
      'Sommige metalen (zoals aluminium) kunnen de bacteriën en gisten schaden. Gebruik bij voorkeur glazen potten, plastic of roestvrij stalen zeefjes en lepels.',
  },
  {
    titel: 'F2 buiten de koelkast',
    tekst:
      'Je hoeft de F2-fles niet in de koelkast te zetten tijdens de tweede fermentatie — op kamertemperatuur werkt prima. Zet hem pas koud als de kefir klaar is en je hem wilt bewaren of drinken.',
  },
  {
    titel: 'Citroen zonder pit',
    tekst:
      'Verwijder de pitjes uit je citroenplakjes voor je ze toevoegt. Citroenpitjes kunnen een licht bittere smaak afgeven aan de kefir.',
  },
  {
    titel: 'Varieer met suikersoort voor smaak',
    tekst:
      'Kokossuiker, palmsuiker of een klein scheutje ahornsiroop geven elk een andere ondertoon aan de kefir. Houd het bij max. een deel bijzondere suiker en de rest gewone suiker, zodat de korrels genoeg te verteren hebben.',
  },
];

export function Tips() {
  return (
    <div className="card">
      <h2>Tips &amp; Tricks</h2>
      <p>Handige ervaringen en inzichten voor een betere water kefir. Voel je vrij om te experimenteren — elke batch is anders.</p>

      <div className="tips-lijst">
        {TIPS.map((tip, i) => (
          <div key={i} className="tip-item">
            <h3 className="tip-titel">{tip.titel}</h3>
            <p>{tip.tekst}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

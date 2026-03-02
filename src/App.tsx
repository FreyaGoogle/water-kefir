import { useState } from 'react';
import { F1 } from './components/F1';
import { F2 } from './components/F2';
import { Planner } from './components/Planner';
import { Check } from './components/Check';
import { FAQ } from './components/FAQ';
import './App.css';

type Tab = 'f1' | 'f2' | 'planner' | 'check' | 'faq';

const TABS: { id: Tab; label: string }[] = [
  { id: 'f1', label: 'F1' },
  { id: 'f2', label: 'F2' },
  { id: 'planner', label: 'Planner' },
  { id: 'check', label: 'Check' },
  { id: 'faq', label: 'FAQ' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('f1');

  return (
    <div className="app">
      <header className="app-header">
        <h1>💧 Water Kefir Assistent</h1>
        <p className="subtitle">Jouw hulp bij het brouwen van heerlijke water kefir</p>
      </header>

      <nav className="tab-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {activeTab === 'f1' && <F1 />}
        {activeTab === 'f2' && <F2 />}
        {activeTab === 'planner' && <Planner />}
        {activeTab === 'check' && <Check />}
        {activeTab === 'faq' && <FAQ />}
      </main>

      <footer className="app-footer">
        <p>
          <em>
            Disclaimer: Deze app is bedoeld als hulpmiddel en vervangt geen professioneel advies.
            Gebruik je gezond verstand bij het beoordelen van de kefir.
          </em>
        </p>
      </footer>
    </div>
  );
}

export default App;

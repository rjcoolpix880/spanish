import React, { useState } from 'react';
import type { PracticeSettings } from './types/spanish';
import { SettingsView } from './components/SettingsView';
import { QuizView } from './components/QuizView';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'settings' | 'quiz'>('settings');

  const [settings, setSettings] = useState<PracticeSettings>({
    selectedTenses: ['presente', 'preterito_indefinido', 'preterito_imperfecto', 'futuro_simple'],
    includeIrregular: true,
    beginnerMode: false,
    tenseLabelMode: 'spanish',
    personLabelMode: 'english',
  });

  return (
    <div className="app-viewport">
      <main className="app-main">
        {currentView === 'settings' ? (
          <SettingsView
            settings={settings}
            onUpdateSettings={setSettings}
            onStartQuiz={() => setCurrentView('quiz')}
          />
        ) : (
          <QuizView
            settings={settings}
            onOpenSettings={() => setCurrentView('settings')}
          />
        )}
      </main>
    </div>
  );
};

export default App;

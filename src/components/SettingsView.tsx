import React from 'react';
import type { PracticeSettings, TenseKey, LabelDisplayMode } from '../types/spanish';
import { TENSES_LIST } from '../data/verbs';
import { Toggle } from './Toggle';
import { TenseIcon } from './Icons';
import { SegmentedControl } from './SegmentedControl';

interface SettingsViewProps {
  settings: PracticeSettings;
  onUpdateSettings: (newSettings: PracticeSettings) => void;
  onStartQuiz: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdateSettings, onStartQuiz }) => {
  const handleTenseToggle = (tenseKey: TenseKey, isChecked: boolean) => {
    let updatedTenses: TenseKey[];
    if (isChecked) {
      updatedTenses = [...settings.selectedTenses, tenseKey];
    } else {
      // Keep at least one tense selected
      if (settings.selectedTenses.length <= 1) return;
      updatedTenses = settings.selectedTenses.filter((t) => t !== tenseKey);
    }
    onUpdateSettings({ ...settings, selectedTenses: updatedTenses });
  };

  const handleIncludeIrregularChange = (checked: boolean) => {
    onUpdateSettings({ ...settings, includeIrregular: checked });
  };

  const handleBeginnerModeChange = (checked: boolean) => {
    onUpdateSettings({ ...settings, beginnerMode: checked });
  };

  const handleTenseLabelModeChange = (mode: LabelDisplayMode) => {
    onUpdateSettings({ ...settings, tenseLabelMode: mode });
  };

  const handlePersonLabelModeChange = (mode: LabelDisplayMode) => {
    onUpdateSettings({ ...settings, personLabelMode: mode });
  };

  return (
    <div className="settings-card">
      <header className="settings-header">
        <h1 className="main-heading">Conjugation Settings</h1>
      </header>

      <section className="settings-section">
        <h2 className="section-title">Tenses</h2>
        <div className="tenses-list">
          {TENSES_LIST.map((tense) => {
            const isSelected = settings.selectedTenses.includes(tense.key);
            return (
              <div
                key={tense.key}
                className={`tense-option ${isSelected ? 'tense-option-selected' : ''}`}
                onClick={() => handleTenseToggle(tense.key, !isSelected)}
              >
                <div className="tense-option-left">
                  <div className="tense-icon-wrapper">
                    <TenseIcon tenseKey={tense.key} size={24} />
                  </div>
                  <div className="tense-names">
                    <span className="tense-proper">{tense.properName}</span>
                    <span className="tense-english">({tense.englishLabel})</span>
                  </div>
                </div>
                <Toggle
                  id={`tense-${tense.key}`}
                  checked={isSelected}
                  onChange={(val) => handleTenseToggle(tense.key, val)}
                  label=""
                  disabled={isSelected && settings.selectedTenses.length === 1}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-title">Button Label Displays</h2>
        <div className="toggles-group">
          <SegmentedControl
            label="Time / Aspect Button Labels"
            value={settings.tenseLabelMode}
            onChange={handleTenseLabelModeChange}
          />
          <SegmentedControl
            label="Subject Person Button Labels"
            value={settings.personLabelMode}
            onChange={handlePersonLabelModeChange}
          />
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-title">Filters & Helpers</h2>
        <div className="toggles-group">
          <Toggle
            id="toggle-irregular"
            checked={settings.includeIrregular}
            onChange={handleIncludeIrregularChange}
            label="Include Irregular Verbs"
            sublabel="Practice irregular verbs (ser, estar, ir, tener, etc.)"
          />
          <Toggle
            id="toggle-beginner"
            checked={settings.beginnerMode}
            onChange={handleBeginnerModeChange}
            label="Beginner Mode"
            sublabel="Highlight giveaway letters for tenses and subjects"
          />
        </div>
      </section>

      <footer className="settings-footer">
        <button type="button" className="btn-primary" onClick={onStartQuiz}>
          Start Practice
        </button>
      </footer>
    </div>
  );
};

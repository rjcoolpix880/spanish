import React, { useState, useEffect } from 'react';
import type { PracticeSettings, QuestionPrompt, TenseKey, PersonKey, UserSelection } from '../types/spanish';
import { VERBS_DATABASE, TENSES_LIST, PERSONS_LIST } from '../data/verbs';
import { TenseIcon, PersonIcon } from './Icons';
import { BeginnerText } from './BeginnerText';
import { getEnglishContextualPhrase } from '../utils/translator';

interface QuizViewProps {
  settings: PracticeSettings;
  onOpenSettings: () => void;
}

// Ordered strictly for Timeline representation: Ongoing Past (far left) -> One-time Past -> Present -> Future (far right)
const TIMELINE_TENSES: TenseKey[] = [
  'preterito_imperfecto',
  'preterito_indefinido',
  'presente',
  'futuro_simple',
];

// Ordered strictly for 2-column x 3-row school grid (Col 1: yo, tu, el; Col 2: nosotros, vosotros, ellos)
const SCHOOL_GRID_PERSONS: PersonKey[] = [
  'yo',
  'tu',
  'el_ella_usted',
  'nosotros',
  'vosotros_ustedes',
  'ellos_ellas',
];

export const QuizView: React.FC<QuizViewProps> = ({ settings, onOpenSettings }) => {
  const [currentPrompt, setCurrentPrompt] = useState<QuestionPrompt | null>(null);
  const [selection, setSelection] = useState<UserSelection>({ selectedTense: null, selectedPerson: null });
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [hintActive, setHintActive] = useState<boolean>(false);

  // Hidden reveal states per word (off by default)
  const [showInfinitive, setShowInfinitive] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);

  // Filter verbs based on settings
  const availableVerbs = VERBS_DATABASE.filter((verb) => {
    if (!settings.includeIrregular && verb.isIrregular) return false;
    return true;
  });

  // Generate a random question prompt based on selected tenses & filtered verbs
  const generateQuestion = (): QuestionPrompt => {
    const validVerbs = availableVerbs.length > 0 ? availableVerbs : VERBS_DATABASE;
    const randomVerb = validVerbs[Math.floor(Math.random() * validVerbs.length)];

    const selectedTenses = settings.selectedTenses.length > 0 ? settings.selectedTenses : (['presente'] as TenseKey[]);
    const randomTense = selectedTenses[Math.floor(Math.random() * selectedTenses.length)];

    const persons: PersonKey[] = ['yo', 'tu', 'el_ella_usted', 'nosotros', 'vosotros_ustedes', 'ellos_ellas'];
    const randomPerson = persons[Math.floor(Math.random() * persons.length)];

    const entry = randomVerb.conjugations[randomTense][randomPerson];

    return {
      verb: randomVerb,
      targetTense: randomTense,
      targetPerson: randomPerson,
      conjugatedText: entry.conjugated,
      entry,
    };
  };

  const loadNextQuestion = () => {
    setCurrentPrompt(generateQuestion());
    setSelection({ selectedTense: null, selectedPerson: null });
    setShowFeedback(false);
    setHintActive(false);
    setShowInfinitive(false);
    setShowTranslation(false);
  };

  useEffect(() => {
    loadNextQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentPrompt) return null;

  const handleSelectTense = (tense: TenseKey) => {
    if (showFeedback) return;
    const newSelection = { ...selection, selectedTense: tense };
    setSelection(newSelection);
    if (newSelection.selectedPerson !== null) {
      setShowFeedback(true);
    }
  };

  const handleSelectPerson = (person: PersonKey) => {
    if (showFeedback) return;
    const newSelection = { ...selection, selectedPerson: person };
    setSelection(newSelection);
    if (newSelection.selectedTense !== null) {
      setShowFeedback(true);
    }
  };

  // Find all valid (tense, person) combinations that produce currentPrompt.conjugatedText
  const allMatches: { tense: TenseKey; person: PersonKey }[] = [];
  if (currentPrompt) {
    (Object.keys(currentPrompt.verb.conjugations) as TenseKey[]).forEach((tKey) => {
      (Object.keys(currentPrompt.verb.conjugations[tKey]) as PersonKey[]).forEach((pKey) => {
        const entry = currentPrompt.verb.conjugations[tKey][pKey];
        if (entry.conjugated.toLowerCase().trim() === currentPrompt.conjugatedText.toLowerCase().trim()) {
          allMatches.push({ tense: tKey, person: pKey });
        }
      });
    });
  }

  const isCorrect =
    selection.selectedTense !== null &&
    selection.selectedPerson !== null &&
    allMatches.some((m) => m.tense === selection.selectedTense && m.person === selection.selectedPerson);

  const otherMatches = isCorrect
    ? allMatches.filter(
        (m) => !(m.tense === selection.selectedTense && m.person === selection.selectedPerson)
      )
    : [];

  const validTenses = new Set(allMatches.map((m) => m.tense));
  const validPersons = new Set(allMatches.map((m) => m.person));

  // Determine what user's selection would conjugate to for diagnostic feedback
  const userSelectedEntry =
    selection.selectedTense && selection.selectedPerson
      ? currentPrompt.verb.conjugations[selection.selectedTense][selection.selectedPerson]
      : null;

  const userPickedEnglishPhrase =
    selection.selectedTense && selection.selectedPerson
      ? getEnglishContextualPhrase(currentPrompt.verb, selection.selectedTense, selection.selectedPerson)
      : '';

  const isHighlighting = settings.beginnerMode || hintActive || showFeedback;

  // Helper for Tense Button label rendering based on settings
  const getTenseLabel = (tKey: TenseKey): string | null => {
    const tenseInfo = TENSES_LIST.find((item) => item.key === tKey)!;
    if (settings.tenseLabelMode === 'spanish') return tenseInfo.properName;
    if (settings.tenseLabelMode === 'english') return tenseInfo.englishLabel;
    return null; // 'none'
  };

  // Helper for Person Button label rendering based on settings
  const getPersonLabel = (pKey: PersonKey): string | null => {
    const personInfo = PERSONS_LIST.find((item) => item.key === pKey)!;
    if (settings.personLabelMode === 'spanish') return personInfo.spanishLabel;
    if (settings.personLabelMode === 'english') return personInfo.shortLabel;
    return null; // 'none'
  };

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <button type="button" className="btn-secondary-sm" onClick={onOpenSettings}>
          Settings
        </button>
      </header>

      {/* Verb Card Display */}
      <div className="verb-card">
        <div className="verb-display-main">
          <BeginnerText
            word={currentPrompt.conjugatedText}
            entry={currentPrompt.entry}
            highlightActive={isHighlighting}
          />
        </div>

        {/* Revealed Info Box (Off by default, shown when user clicks buttons) */}
        {(showInfinitive || showTranslation) && (
          <div className="revealed-info">
            {showInfinitive && <span className="revealed-infinitive">{currentPrompt.verb.infinitive}</span>}
            {showTranslation && <span className="revealed-translation">({currentPrompt.verb.englishTranslation})</span>}
          </div>
        )}

        {/* Buttons below the word: 3 in normal mode, 2 in beginner mode */}
        <div className="verb-action-buttons">
          <button
            type="button"
            className={`btn-toggle-info ${showInfinitive ? 'btn-toggle-info-active' : ''}`}
            onClick={() => setShowInfinitive(!showInfinitive)}
          >
            {showInfinitive ? 'Hide Verb' : 'Unconjugated Verb'}
          </button>

          <button
            type="button"
            className={`btn-toggle-info ${showTranslation ? 'btn-toggle-info-active' : ''}`}
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? 'Hide Translation' : 'Translation'}
          </button>

          {!settings.beginnerMode && !showFeedback && (
            <button
              type="button"
              className={`btn-hint-toggle ${hintActive ? 'btn-hint-toggle-active' : ''}`}
              onClick={() => setHintActive(!hintActive)}
            >
              {hintActive ? 'Hide Hint' : 'Hint'}
            </button>
          )}
        </div>
      </div>

      {/* Interactive Icon Selector Section */}
      <div className="icon-selector-section">
        {/* 1. Subject Person Grid FIRST */}
        <div className="icon-row-group">
          <span className="row-label">Subject Person</span>
          <div className="icons-grid-person-2x3">
            {SCHOOL_GRID_PERSONS.map((personKey) => {
              const p = PERSONS_LIST.find((item) => item.key === personKey)!;
              const label = getPersonLabel(p.key);
              const isSelected = selection.selectedPerson === p.key;
              const isValidPerson = validPersons.has(p.key);

              let btnClass = 'icon-btn icon-btn-person';
              if (isSelected) btnClass += ' icon-btn-selected';

              if (showFeedback) {
                if (isSelected) {
                  if (isValidPerson) {
                    btnClass += ' icon-btn-correct';
                  } else {
                    btnClass += ' icon-btn-incorrect';
                  }
                } else if (isValidPerson) {
                  if (isCorrect) {
                    btnClass += ' icon-btn-correct-alt';
                  } else {
                    btnClass += ' icon-btn-correct';
                  }
                }
              }

              return (
                <button
                  key={p.key}
                  type="button"
                  className={btnClass}
                  onClick={() => handleSelectPerson(p.key)}
                  disabled={showFeedback}
                  aria-label={p.spanishLabel}
                >
                  <PersonIcon personKey={p.key} size={22} />
                  {label && <span className="icon-btn-label">{label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Time / Aspect Row SECOND (Below Subject Person) */}
        <div className="icon-row-group">
          <span className="row-label">Time / Aspect</span>
          <div className="icons-grid-tense-timeline">
            {TIMELINE_TENSES.map((tenseKey) => {
              const t = TENSES_LIST.find((item) => item.key === tenseKey)!;
              const label = getTenseLabel(t.key);
              const isSelected = selection.selectedTense === t.key;
              const isValidTense = validTenses.has(t.key);

              let btnClass = 'icon-btn icon-btn-tense';
              if (isSelected) btnClass += ' icon-btn-selected';

              if (showFeedback) {
                if (isSelected) {
                  if (isValidTense) {
                    btnClass += ' icon-btn-correct';
                  } else {
                    btnClass += ' icon-btn-incorrect';
                  }
                } else if (isValidTense) {
                  if (isCorrect) {
                    btnClass += ' icon-btn-correct-alt';
                  } else {
                    btnClass += ' icon-btn-correct';
                  }
                }
              }

              return (
                <button
                  key={t.key}
                  type="button"
                  className={btnClass}
                  onClick={() => handleSelectTense(t.key)}
                  disabled={showFeedback}
                  aria-label={t.properName}
                >
                  <TenseIcon tenseKey={t.key} size={24} />
                  {label && <span className="icon-btn-label">{label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Immediate Feedback Card */}
      {showFeedback && (
        <div className={`feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <div className="feedback-top-action">
            <button type="button" className="btn-primary" onClick={loadNextQuestion}>
              Next
            </button>
          </div>

          <div className="feedback-status-row">
            <span className="feedback-result-title">{isCorrect ? 'Correct' : 'Incorrect'}</span>
          </div>

          {/* Correct with Alternate Meanings Note */}
          {isCorrect && otherMatches.length > 0 && (
            <div className="feedback-alternate-note">
              <span className="alternate-note-title">
                💡 <strong>Note:</strong> "{currentPrompt.conjugatedText}" can also mean:
              </span>
              <ul className="alternate-note-list">
                {otherMatches.map((alt) => {
                  const altTenseInfo = TENSES_LIST.find((t) => t.key === alt.tense)!;
                  const altPersonInfo = PERSONS_LIST.find((p) => p.key === alt.person)!;
                  const altEnglishPhrase = getEnglishContextualPhrase(
                    currentPrompt.verb,
                    alt.tense,
                    alt.person
                  );
                  return (
                    <li key={`${alt.tense}-${alt.person}`} className="alternate-match-item">
                      <strong>"{altEnglishPhrase}"</strong> ({altTenseInfo.properName} – {altPersonInfo.spanishLabel})
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {!isCorrect && (
            <div className="diagnostic-box">
              <div className="diagnostic-block">
                <span className="diagnostic-header">You picked:</span>
                <span className="diagnostic-spanish-word">"{userSelectedEntry ? userSelectedEntry.conjugated : 'N/A'}"</span>
                <span className="diagnostic-english-phrase">{userPickedEnglishPhrase}</span>
              </div>

              <div className="diagnostic-divider" />

              <div className="diagnostic-block">
                <span className="diagnostic-header">
                  {allMatches.length > 1 ? 'Correct answer options for this word:' : 'Correct answer:'}
                </span>
                <span className="diagnostic-spanish-word">"{currentPrompt.conjugatedText}"</span>
                {allMatches.map((match) => {
                  const matchTenseInfo = TENSES_LIST.find((t) => t.key === match.tense)!;
                  const matchPersonInfo = PERSONS_LIST.find((p) => p.key === match.person)!;
                  const matchEnglishPhrase = getEnglishContextualPhrase(
                    currentPrompt.verb,
                    match.tense,
                    match.person
                  );
                  return (
                    <div key={`${match.tense}-${match.person}`} className="diagnostic-match-item">
                      <span className="diagnostic-english-phrase">"{matchEnglishPhrase}"</span>
                      <span className="diagnostic-grammar-tag">
                        ({matchTenseInfo.properName} – {matchPersonInfo.spanishLabel})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Giveaway Explanations in English */}
          {(settings.beginnerMode || hintActive || !isCorrect) && (
            <div className="giveaway-explanations">
              {currentPrompt.entry.tenseGiveawayExplanation && (
                <div className="explanation-line">
                  <span className="explanation-icon">
                    <TenseIcon tenseKey={currentPrompt.targetTense} size={18} />
                  </span>
                  <span className="explanation-text">{currentPrompt.entry.tenseGiveawayExplanation}</span>
                </div>
              )}
              {currentPrompt.entry.personGiveawayExplanation && (
                <div className="explanation-line">
                  <span className="explanation-icon">
                    <PersonIcon personKey={currentPrompt.targetPerson} size={18} />
                  </span>
                  <span className="explanation-text">{currentPrompt.entry.personGiveawayExplanation}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

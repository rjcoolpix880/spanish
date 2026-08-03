import React from 'react';
import type { ConjugationEntry } from '../types/spanish';

interface BeginnerTextProps {
  word: string;
  entry: ConjugationEntry;
  highlightActive: boolean;
}

interface TextSegment {
  text: string;
  type: 'stem' | 'tense' | 'person';
}

export const BeginnerText: React.FC<BeginnerTextProps> = ({ word, entry, highlightActive }) => {
  if (!highlightActive) {
    return <span className="verb-display-text">{word}</span>;
  }

  // Parse word into highlighted segments based on entry.tenseGiveaway and entry.personGiveaway
  const segments: TextSegment[] = [];
  const lowerWord = word.toLowerCase();

  const tensePart = entry.tenseGiveaway?.toLowerCase();
  const personPart = entry.personGiveaway?.toLowerCase();
  
  // Custom splitting strategy for giveaway markers
  if (personPart && lowerWord.endsWith(personPart)) {
    const mainStemAndTense = word.slice(0, word.length - personPart.length);
    const personSeg = word.slice(word.length - personPart.length);

    if (tensePart && mainStemAndTense.toLowerCase().includes(tensePart)) {
      const idx = mainStemAndTense.toLowerCase().indexOf(tensePart);
      const stemBefore = mainStemAndTense.slice(0, idx);
      const tenseSeg = mainStemAndTense.slice(idx, idx + tensePart.length);
      const stemAfter = mainStemAndTense.slice(idx + tensePart.length);

      if (stemBefore) segments.push({ text: stemBefore, type: 'stem' });
      segments.push({ text: tenseSeg, type: 'tense' });
      if (stemAfter) segments.push({ text: stemAfter, type: 'stem' });
      segments.push({ text: personSeg, type: 'person' });
    } else {
      if (mainStemAndTense) segments.push({ text: mainStemAndTense, type: 'stem' });
      segments.push({ text: personSeg, type: 'person' });
    }
  } else if (tensePart && lowerWord.includes(tensePart)) {
    const idx = lowerWord.indexOf(tensePart);
    const before = word.slice(0, idx);
    const tenseSeg = word.slice(idx, idx + tensePart.length);
    const after = word.slice(idx + tensePart.length);

    if (before) segments.push({ text: before, type: 'stem' });
    segments.push({ text: tenseSeg, type: 'tense' });
    if (after) segments.push({ text: after, type: 'stem' });
  } else {
    segments.push({ text: word, type: 'stem' });
  }

  return (
    <span className="verb-display-text">
      {segments.map((seg, i) => {
        if (seg.type === 'tense') {
          return (
            <span key={i} className="highlight-tense" title={entry.tenseGiveawayExplanation || 'Tense giveaway'}>
              {seg.text}
            </span>
          );
        }
        if (seg.type === 'person') {
          return (
            <span key={i} className="highlight-person" title={entry.personGiveawayExplanation || 'Person giveaway'}>
              {seg.text}
            </span>
          );
        }
        return <span key={i}>{seg.text}</span>;
      })}
    </span>
  );
};

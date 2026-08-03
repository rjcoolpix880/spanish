export type TenseKey = 'presente' | 'preterito_indefinido' | 'preterito_imperfecto' | 'futuro_simple';

export type PersonKey = 'yo' | 'tu' | 'el_ella_usted' | 'nosotros' | 'vosotros_ustedes' | 'ellos_ellas';

export type LabelDisplayMode = 'spanish' | 'english' | 'none';

export interface TenseInfo {
  key: TenseKey;
  properName: string;
  englishLabel: string;
  description: string;
  iconType: 'ongoing_past' | 'one_time_past' | 'present' | 'future';
}

export interface PersonInfo {
  key: PersonKey;
  spanishLabel: string;
  englishLabel: string;
  shortLabel: string;
}

export interface ConjugationEntry {
  conjugated: string;
  stem: string;
  tenseGiveaway?: string;
  personGiveaway?: string;
  tenseGiveawayExplanation?: string;
  personGiveawayExplanation?: string;
}

export type ConjugationTable = Record<TenseKey, Record<PersonKey, ConjugationEntry>>;

export interface VerbItem {
  id: string;
  infinitive: string;
  englishTranslation: string;
  type: 'ar' | 'er' | 'ir';
  isIrregular: boolean;
  conjugations: ConjugationTable;
}

export interface PracticeSettings {
  selectedTenses: TenseKey[];
  includeIrregular: boolean;
  beginnerMode: boolean;
  tenseLabelMode: LabelDisplayMode;
  personLabelMode: LabelDisplayMode;
}

export interface QuestionPrompt {
  verb: VerbItem;
  targetTense: TenseKey;
  targetPerson: PersonKey;
  conjugatedText: string;
  entry: ConjugationEntry;
}

export interface UserSelection {
  selectedTense: TenseKey | null;
  selectedPerson: PersonKey | null;
}

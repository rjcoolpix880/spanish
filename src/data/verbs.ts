import type { TenseInfo, PersonInfo, VerbItem, ConjugationEntry, ConjugationTable } from '../types/spanish';

export const TENSES_LIST: TenseInfo[] = [
  {
    key: 'presente',
    properName: 'Presente',
    englishLabel: 'Present',
    description: 'Current actions or general facts',
    iconType: 'present',
  },
  {
    key: 'preterito_indefinido',
    properName: 'Pretérito Indefinido',
    englishLabel: 'Preterite',
    description: 'Completed past actions at a specific moment',
    iconType: 'one_time_past',
  },
  {
    key: 'preterito_imperfecto',
    properName: 'Pretérito Imperfecto',
    englishLabel: 'Imperfect',
    description: 'Continuous, repeated, or background past actions',
    iconType: 'ongoing_past',
  },
  {
    key: 'futuro_simple',
    properName: 'Futuro Simple',
    englishLabel: 'Future',
    description: 'Actions that will happen',
    iconType: 'future',
  },
];

export const PERSONS_LIST: PersonInfo[] = [
  { key: 'yo', spanishLabel: 'yo', englishLabel: 'me / I', shortLabel: 'me' },
  { key: 'tu', spanishLabel: 'tú', englishLabel: 'you', shortLabel: 'you' },
  { key: 'el_ella_usted', spanishLabel: 'él / ella / usted', englishLabel: 'him / her / you (formal)', shortLabel: 'him' },
  { key: 'nosotros', spanishLabel: 'nosotros', englishLabel: 'us / we', shortLabel: 'us' },
  { key: 'vosotros_ustedes', spanishLabel: 'vosotros / ustedes', englishLabel: 'you all', shortLabel: 'you all' },
  { key: 'ellos_ellas', spanishLabel: 'ellos / ellas', englishLabel: 'them', shortLabel: 'them' },
];

function makeEntry(
  conjugated: string,
  stem: string,
  tenseGiveaway?: string,
  personGiveaway?: string,
  tenseGiveawayExplanation?: string,
  personGiveawayExplanation?: string
): ConjugationEntry {
  return {
    conjugated,
    stem,
    tenseGiveaway,
    personGiveaway,
    tenseGiveawayExplanation,
    personGiveawayExplanation,
  };
}

// Regular AR verbs generator helper (e.g., hablar, caminar, cantar, trabajar, bailar, mirar, llamar, viajar)
function buildRegularArVerb(id: string, infinitive: string, translation: string): VerbItem {
  const stem = infinitive.slice(0, -2);
  const conjugations: ConjugationTable = {
    presente: {
      yo: makeEntry(`${stem}o`, stem, undefined, 'o', undefined, "The ending '-o' is the giveaway for 'me / I'"),
      tu: makeEntry(`${stem}as`, stem, undefined, 's', undefined, "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry(`${stem}a`, stem, undefined, 'a', undefined, "The ending '-a' indicates 3rd person singular ('him / her')"),
      nosotros: makeEntry(`${stem}amos`, stem, undefined, 'mos', undefined, "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry(`${stem}áis`, stem, undefined, 'ís', undefined, "The ending '-ís' is the giveaway for 'you all'"),
      ellos_ellas: makeEntry(`${stem}an`, stem, undefined, 'n', undefined, "The letter 'n' is the giveaway for 'them'"),
    },
    preterito_indefinido: {
      yo: makeEntry(`${stem}é`, stem, 'é', undefined, "The accented '-é' is the giveaway for one-time past (Preterite) 'me / I'"),
      tu: makeEntry(`${stem}aste`, stem, 'aste', 'ste', "The ending '-aste' indicates Preterite", "The suffix '-ste' indicates 'you'"),
      el_ella_usted: makeEntry(`${stem}ó`, stem, 'ó', undefined, "The accented '-ó' is the giveaway for one-time past (Preterite) 'him / her'"),
      nosotros: makeEntry(`${stem}amos`, stem, 'amos', 'mos', "The ending '-amos' indicates Preterite", "The suffix '-mos' indicates 'us / we'"),
      vosotros_ustedes: makeEntry(`${stem}asteis`, stem, 'asteis', 'steis', "The ending '-asteis' indicates Preterite", "The suffix '-steis' indicates 'you all'"),
      ellos_ellas: makeEntry(`${stem}aron`, stem, 'aron', 'ron', "The ending '-aron' indicates Preterite", "The suffix '-ron' indicates 'them'"),
    },
    preterito_imperfecto: {
      yo: makeEntry(`${stem}aba`, stem, 'ba', undefined, "The giveaway 'ba' marks ongoing past (Imperfect)"),
      tu: makeEntry(`${stem}abas`, stem, 'ba', 's', "The giveaway 'ba' marks ongoing past (Imperfect)", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry(`${stem}aba`, stem, 'ba', undefined, "The giveaway 'ba' marks ongoing past (Imperfect)"),
      nosotros: makeEntry(`${stem}ábamos`, stem, 'ba', 'mos', "The giveaway 'ba' marks ongoing past (Imperfect)", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry(`${stem}abais`, stem, 'ba', 'is', "The giveaway 'ba' marks ongoing past (Imperfect)", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry(`${stem}aban`, stem, 'ba', 'n', "The giveaway 'ba' marks ongoing past (Imperfect)", "The letter 'n' is the giveaway for 'them'"),
    },
    futuro_simple: {
      yo: makeEntry(`${infinitive}é`, infinitive, 'r', 'é', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-é' marks Future 'me / I'"),
      tu: makeEntry(`${infinitive}ás`, infinitive, 'r', 's', "The letter 'r' before the vowel is the giveaway for Future tense", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry(`${infinitive}á`, infinitive, 'r', 'á', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-á' marks Future 'him / her'"),
      nosotros: makeEntry(`${infinitive}emos`, infinitive, 'r', 'mos', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry(`${infinitive}éis`, infinitive, 'r', 'is', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry(`${infinitive}án`, infinitive, 'r', 'n', "The letter 'r' before the vowel is the giveaway for Future tense", "The letter 'n' is the giveaway for 'them'"),
    },
  };

  return { id, infinitive, englishTranslation: translation, type: 'ar', isIrregular: false, conjugations };
}

// Regular ER verbs generator helper
function buildRegularErVerb(id: string, infinitive: string, translation: string): VerbItem {
  const stem = infinitive.slice(0, -2);
  const conjugations: ConjugationTable = {
    presente: {
      yo: makeEntry(`${stem}o`, stem, undefined, 'o', undefined, "The ending '-o' is the giveaway for 'me / I'"),
      tu: makeEntry(`${stem}es`, stem, undefined, 's', undefined, "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry(`${stem}e`, stem, undefined, 'e', undefined, "The ending '-e' indicates 3rd person singular ('him / her')"),
      nosotros: makeEntry(`${stem}emos`, stem, undefined, 'mos', undefined, "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry(`${stem}éis`, stem, undefined, 'ís', undefined, "The ending '-ís' is the giveaway for 'you all'"),
      ellos_ellas: makeEntry(`${stem}en`, stem, undefined, 'n', undefined, "The letter 'n' is the giveaway for 'them'"),
    },
    preterito_indefinido: {
      yo: makeEntry(`${stem}í`, stem, 'í', undefined, "The accented '-í' is the giveaway for one-time past (Preterite) 'me / I'"),
      tu: makeEntry(`${stem}iste`, stem, 'iste', 'ste', "The ending '-iste' indicates Preterite", "The suffix '-ste' indicates 'you'"),
      el_ella_usted: makeEntry(`${stem}ió`, stem, 'ió', undefined, "The ending '-ió' is the giveaway for one-time past (Preterite) 'him / her'"),
      nosotros: makeEntry(`${stem}imos`, stem, 'imos', 'mos', "The ending '-imos' indicates Preterite", "The suffix '-mos' indicates 'us / we'"),
      vosotros_ustedes: makeEntry(`${stem}isteis`, stem, 'isteis', 'steis', "The ending '-isteis' indicates Preterite", "The suffix '-steis' indicates 'you all'"),
      ellos_ellas: makeEntry(`${stem}ieron`, stem, 'ieron', 'ron', "The ending '-ieron' indicates Preterite", "The suffix '-ron' indicates 'them'"),
    },
    preterito_imperfecto: {
      yo: makeEntry(`${stem}ía`, stem, 'ía', undefined, "The giveaway 'ía' marks ongoing past (Imperfect)"),
      tu: makeEntry(`${stem}ías`, stem, 'ía', 's', "The giveaway 'ía' marks ongoing past (Imperfect)", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry(`${stem}ía`, stem, 'ía', undefined, "The giveaway 'ía' marks ongoing past (Imperfect)"),
      nosotros: makeEntry(`${stem}íamos`, stem, 'ía', 'mos', "The giveaway 'ía' marks ongoing past (Imperfect)", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry(`${stem}íais`, stem, 'ía', 'is', "The giveaway 'ía' marks ongoing past (Imperfect)", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry(`${stem}ían`, stem, 'ía', 'n', "The giveaway 'ía' marks ongoing past (Imperfect)", "The letter 'n' is the giveaway for 'them'"),
    },
    futuro_simple: {
      yo: makeEntry(`${infinitive}é`, infinitive, 'r', 'é', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-é' marks Future 'me / I'"),
      tu: makeEntry(`${infinitive}ás`, infinitive, 'r', 's', "The letter 'r' before the vowel is the giveaway for Future tense", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry(`${infinitive}á`, infinitive, 'r', 'á', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-á' marks Future 'him / her'"),
      nosotros: makeEntry(`${infinitive}emos`, infinitive, 'r', 'mos', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry(`${infinitive}éis`, infinitive, 'r', 'is', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry(`${infinitive}án`, infinitive, 'r', 'n', "The letter 'r' before the vowel is the giveaway for Future tense", "The letter 'n' is the giveaway for 'them'"),
    },
  };

  return { id, infinitive, englishTranslation: translation, type: 'er', isIrregular: false, conjugations };
}

// Regular IR verbs generator helper
function buildRegularIrVerb(id: string, infinitive: string, translation: string): VerbItem {
  const stem = infinitive.slice(0, -2);
  const conjugations: ConjugationTable = {
    presente: {
      yo: makeEntry(`${stem}o`, stem, undefined, 'o', undefined, "The ending '-o' is the giveaway for 'me / I'"),
      tu: makeEntry(`${stem}es`, stem, undefined, 's', undefined, "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry(`${stem}e`, stem, undefined, 'e', undefined, "The ending '-e' indicates 3rd person singular ('him / her')"),
      nosotros: makeEntry(`${stem}imos`, stem, undefined, 'mos', undefined, "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry(`${stem}ís`, stem, undefined, 'ís', undefined, "The ending '-ís' is the giveaway for 'you all'"),
      ellos_ellas: makeEntry(`${stem}en`, stem, undefined, 'n', undefined, "The letter 'n' is the giveaway for 'them'"),
    },
    preterito_indefinido: {
      yo: makeEntry(`${stem}í`, stem, 'í', undefined, "The accented '-í' is the giveaway for one-time past (Preterite) 'me / I'"),
      tu: makeEntry(`${stem}iste`, stem, 'iste', 'ste', "The ending '-iste' indicates Preterite", "The suffix '-ste' indicates 'you'"),
      el_ella_usted: makeEntry(`${stem}ió`, stem, 'ió', undefined, "The ending '-ió' is the giveaway for one-time past (Preterite) 'him / her'"),
      nosotros: makeEntry(`${stem}imos`, stem, 'imos', 'mos', "The ending '-imos' indicates Preterite", "The suffix '-mos' indicates 'us / we'"),
      vosotros_ustedes: makeEntry(`${stem}isteis`, stem, 'isteis', 'steis', "The ending '-isteis' indicates Preterite", "The suffix '-steis' indicates 'you all'"),
      ellos_ellas: makeEntry(`${stem}ieron`, stem, 'ieron', 'ron', "The ending '-ieron' indicates Preterite", "The suffix '-ron' indicates 'them'"),
    },
    preterito_imperfecto: {
      yo: makeEntry(`${stem}ía`, stem, 'ía', undefined, "The giveaway 'ía' marks ongoing past (Imperfect)"),
      tu: makeEntry(`${stem}ías`, stem, 'ía', 's', "The giveaway 'ía' marks ongoing past (Imperfect)", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry(`${stem}ía`, stem, 'ía', undefined, "The giveaway 'ía' marks ongoing past (Imperfect)"),
      nosotros: makeEntry(`${stem}íamos`, stem, 'ía', 'mos', "The giveaway 'ía' marks ongoing past (Imperfect)", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry(`${stem}íais`, stem, 'ía', 'is', "The giveaway 'ía' marks ongoing past (Imperfect)", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry(`${stem}ían`, stem, 'ía', 'n', "The giveaway 'ía' marks ongoing past (Imperfect)", "The letter 'n' is the giveaway for 'them'"),
    },
    futuro_simple: {
      yo: makeEntry(`${infinitive}é`, infinitive, 'r', 'é', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-é' marks Future 'me / I'"),
      tu: makeEntry(`${infinitive}ás`, infinitive, 'r', 's', "The letter 'r' before the vowel is the giveaway for Future tense", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry(`${infinitive}á`, infinitive, 'r', 'á', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-á' marks Future 'him / her'"),
      nosotros: makeEntry(`${infinitive}emos`, infinitive, 'r', 'mos', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry(`${infinitive}éis`, infinitive, 'r', 'is', "The letter 'r' before the vowel is the giveaway for Future tense", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry(`${infinitive}án`, infinitive, 'r', 'n', "The letter 'r' before the vowel is the giveaway for Future tense", "The letter 'n' is the giveaway for 'them'"),
    },
  };

  return { id, infinitive, englishTranslation: translation, type: 'ir', isIrregular: false, conjugations };
}

// Irregular verb SER (to be - essential)
const verbSer: VerbItem = {
  id: 'ser',
  infinitive: 'ser',
  englishTranslation: 'to be (essential)',
  type: 'er',
  isIrregular: true,
  conjugations: {
    presente: {
      yo: makeEntry('soy', 's', undefined, 'y', undefined, "Irregular 'soy' for 'me / I'"),
      tu: makeEntry('eres', 'er', undefined, 's', undefined, "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('es', 'e', undefined, 's', undefined, "3rd person singular 'es'"),
      nosotros: makeEntry('somos', 'so', undefined, 'mos', undefined, "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('sois', 'so', undefined, 'is', undefined, "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry('son', 'so', undefined, 'n', undefined, "The letter 'n' is the giveaway for 'them'"),
    },
    preterito_indefinido: {
      yo: makeEntry('fui', 'fui', 'fui', undefined, "Irregular Preterite stem 'fui-'"),
      tu: makeEntry('fuiste', 'fui', 'ste', 'ste', "Irregular Preterite stem 'fuiste'", "The suffix '-ste' indicates 'you'"),
      el_ella_usted: makeEntry('fue', 'fue', 'fue', undefined, "Irregular Preterite 'fue'"),
      nosotros: makeEntry('fuimos', 'fui', 'mos', 'mos', "Irregular Preterite stem 'fuimos'", "The suffix '-mos' indicates 'us / we'"),
      vosotros_ustedes: makeEntry('fuisteis', 'fui', 'steis', 'steis', "Irregular Preterite stem 'fuisteis'", "The suffix '-steis' indicates 'you all'"),
      ellos_ellas: makeEntry('fueron', 'fue', 'ron', 'ron', "Irregular Preterite 'fueron'", "The suffix '-ron' indicates 'them'"),
    },
    preterito_imperfecto: {
      yo: makeEntry('era', 'er', 'a', undefined, "Imperfect of SER: 'era'"),
      tu: makeEntry('eras', 'er', 'a', 's', "Imperfect of SER: 'eras'", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('era', 'er', 'a', undefined, "Imperfect of SER: 'era'"),
      nosotros: makeEntry('éramos', 'ér', 'a', 'mos', "Imperfect of SER: 'éramos'", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('erais', 'er', 'a', 'is', "Imperfect of SER: 'erais'", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry('eran', 'er', 'a', 'n', "Imperfect of SER: 'eran'", "The letter 'n' is the giveaway for 'them'"),
    },
    futuro_simple: {
      yo: makeEntry('seré', 'ser', 'r', 'é', "The letter 'r' is the giveaway for Future tense", "The ending '-é' marks Future 'me / I'"),
      tu: makeEntry('serás', 'ser', 'r', 's', "The letter 'r' is the giveaway for Future tense", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('será', 'ser', 'r', 'á', "The letter 'r' is the giveaway for Future tense", "The ending '-á' marks Future 'him / her'"),
      nosotros: makeEntry('seremos', 'ser', 'r', 'mos', "The letter 'r' is the giveaway for Future tense", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('seréis', 'ser', 'r', 'is', "The letter 'r' is the giveaway for Future tense", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry('serán', 'ser', 'r', 'n', "The letter 'r' is the giveaway for Future tense", "The letter 'n' is the giveaway for 'them'"),
    },
  },
};

// Irregular verb ESTAR (to be - location/condition)
const verbEstar: VerbItem = {
  id: 'estar',
  infinitive: 'estar',
  englishTranslation: 'to be (location/state)',
  type: 'ar',
  isIrregular: true,
  conjugations: {
    presente: {
      yo: makeEntry('estoy', 'est', undefined, 'oy', undefined, "Irregular 'estoy' for 'me / I'"),
      tu: makeEntry('estás', 'est', undefined, 's', undefined, "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('está', 'est', undefined, 'á', undefined, "3rd person singular 'está'"),
      nosotros: makeEntry('estamos', 'est', undefined, 'mos', undefined, "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('estáis', 'est', undefined, 'ís', undefined, "The ending '-ís' marks 'you all'"),
      ellos_ellas: makeEntry('están', 'est', undefined, 'n', undefined, "The letter 'n' is the giveaway for 'them'"),
    },
    preterito_indefinido: {
      yo: makeEntry('estuve', 'estuv', 'uv', 'e', "Irregular stem 'estuv-' for Preterite", "First person '-e'"),
      tu: makeEntry('estuviste', 'estuv', 'uv', 'ste', "Irregular stem 'estuv-' for Preterite", "The suffix '-ste' indicates 'you'"),
      el_ella_usted: makeEntry('estuvo', 'estuv', 'uv', 'o', "Irregular stem 'estuv-' for Preterite", "Third person '-o'"),
      nosotros: makeEntry('estuvimos', 'estuv', 'uv', 'mos', "Irregular stem 'estuv-' for Preterite", "The suffix '-mos' indicates 'us / we'"),
      vosotros_ustedes: makeEntry('estuvisteis', 'estuv', 'uv', 'steis', "Irregular stem 'estuv-' for Preterite", "The suffix '-steis' indicates 'you all'"),
      ellos_ellas: makeEntry('estuvieron', 'estuv', 'uv', 'ron', "Irregular stem 'estuv-' for Preterite", "The suffix '-ron' indicates 'them'"),
    },
    preterito_imperfecto: {
      yo: makeEntry('estaba', 'est', 'ba', undefined, "The giveaway 'ba' marks ongoing past (Imperfect)"),
      tu: makeEntry('estabas', 'est', 'ba', 's', "The giveaway 'ba' marks ongoing past (Imperfect)", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('estaba', 'est', 'ba', undefined, "The giveaway 'ba' marks ongoing past (Imperfect)"),
      nosotros: makeEntry('estábamos', 'est', 'ba', 'mos', "The giveaway 'ba' marks ongoing past (Imperfect)", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('estabais', 'est', 'ba', 'is', "The giveaway 'ba' marks ongoing past (Imperfect)", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry('estaban', 'est', 'ba', 'n', "The giveaway 'ba' marks ongoing past (Imperfect)", "The letter 'n' is the giveaway for 'them'"),
    },
    futuro_simple: {
      yo: makeEntry('estaré', 'estar', 'r', 'é', "The letter 'r' is the giveaway for Future tense", "The ending '-é' marks Future 'me / I'"),
      tu: makeEntry('estarás', 'estar', 'r', 's', "The letter 'r' is the giveaway for Future tense", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('estará', 'estar', 'r', 'á', "The letter 'r' is the giveaway for Future tense", "The ending '-á' marks Future 'him / her'"),
      nosotros: makeEntry('estaremos', 'estar', 'r', 'mos', "The letter 'r' is the giveaway for Future tense", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('estaréis', 'estar', 'r', 'is', "The letter 'r' is the giveaway for Future tense", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry('estarán', 'estar', 'r', 'n', "The letter 'r' is the giveaway for Future tense", "The letter 'n' is the giveaway for 'them'"),
    },
  },
};

// Irregular verb IR (to go)
const verbIr: VerbItem = {
  id: 'ir',
  infinitive: 'ir',
  englishTranslation: 'to go',
  type: 'ir',
  isIrregular: true,
  conjugations: {
    presente: {
      yo: makeEntry('voy', 'v', undefined, 'oy', undefined, "Irregular 'voy' for 'me / I'"),
      tu: makeEntry('vas', 'v', undefined, 's', undefined, "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('va', 'v', undefined, 'a', undefined, "3rd person singular 'va'"),
      nosotros: makeEntry('vamos', 'v', undefined, 'mos', undefined, "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('vais', 'v', undefined, 'is', undefined, "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry('van', 'v', undefined, 'n', undefined, "The letter 'n' is the giveaway for 'them'"),
    },
    preterito_indefinido: {
      yo: makeEntry('fui', 'fui', 'fui', undefined, "Irregular Preterite 'fui'"),
      tu: makeEntry('fuiste', 'fui', 'ste', 'ste', "Irregular Preterite 'fuiste'", "The suffix '-ste' indicates 'you'"),
      el_ella_usted: makeEntry('fue', 'fue', 'fue', undefined, "Irregular Preterite 'fue'"),
      nosotros: makeEntry('fuimos', 'fui', 'mos', 'mos', "Irregular Preterite 'fuimos'", "The suffix '-mos' indicates 'us / we'"),
      vosotros_ustedes: makeEntry('fuisteis', 'fui', 'steis', 'steis', "Irregular Preterite 'fuisteis'", "The suffix '-steis' indicates 'you all'"),
      ellos_ellas: makeEntry('fueron', 'fue', 'ron', 'ron', "Irregular Preterite 'fueron'", "The suffix '-ron' indicates 'them'"),
    },
    preterito_imperfecto: {
      yo: makeEntry('iba', 'i', 'ba', undefined, "The giveaway 'ba' marks ongoing past (Imperfect)"),
      tu: makeEntry('ibas', 'i', 'ba', 's', "The giveaway 'ba' marks ongoing past (Imperfect)", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('iba', 'i', 'ba', undefined, "The giveaway 'ba' marks ongoing past (Imperfect)"),
      nosotros: makeEntry('íbamos', 'í', 'ba', 'mos', "The giveaway 'ba' marks ongoing past (Imperfect)", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('ibais', 'i', 'ba', 'is', "The giveaway 'ba' marks ongoing past (Imperfect)", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry('iban', 'i', 'ba', 'n', "The giveaway 'ba' marks ongoing past (Imperfect)", "The letter 'n' is the giveaway for 'them'"),
    },
    futuro_simple: {
      yo: makeEntry('iré', 'ir', 'r', 'é', "The letter 'r' is the giveaway for Future tense", "The ending '-é' marks Future 'me / I'"),
      tu: makeEntry('irás', 'ir', 'r', 's', "The letter 'r' is the giveaway for Future tense", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('irá', 'ir', 'r', 'á', "The letter 'r' is the giveaway for Future tense", "The ending '-á' marks Future 'him / her'"),
      nosotros: makeEntry('iremos', 'ir', 'r', 'mos', "The letter 'r' is the giveaway for Future tense", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('iréis', 'ir', 'r', 'is', "The letter 'r' is the giveaway for Future tense", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry('irán', 'ir', 'r', 'n', "The letter 'r' is the giveaway for Future tense", "The letter 'n' is the giveaway for 'them'"),
    },
  },
};

// Irregular verb TENER (to have)
const verbTener: VerbItem = {
  id: 'tener',
  infinitive: 'tener',
  englishTranslation: 'to have',
  type: 'er',
  isIrregular: true,
  conjugations: {
    presente: {
      yo: makeEntry('tengo', 'teng', undefined, 'o', undefined, "The ending '-o' is the giveaway for 'me / I'"),
      tu: makeEntry('tienes', 'tien', undefined, 's', undefined, "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('tiene', 'tien', undefined, 'e', undefined, "3rd person singular 'tiene'"),
      nosotros: makeEntry('tenemos', 'ten', undefined, 'mos', undefined, "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('tenéis', 'ten', undefined, 'ís', undefined, "The ending '-ís' marks 'you all'"),
      ellos_ellas: makeEntry('tienen', 'tien', undefined, 'n', undefined, "The letter 'n' is the giveaway for 'them'"),
    },
    preterito_indefinido: {
      yo: makeEntry('tuve', 'tuv', 'uv', 'e', "Irregular Preterite stem 'tuv-'", "First person '-e'"),
      tu: makeEntry('tuviste', 'tuv', 'uv', 'ste', "Irregular Preterite stem 'tuv-'", "The suffix '-ste' indicates 'you'"),
      el_ella_usted: makeEntry('tuvo', 'tuv', 'uv', 'o', "Irregular Preterite stem 'tuv-'", "Third person '-o'"),
      nosotros: makeEntry('tuvimos', 'tuv', 'uv', 'mos', "Irregular Preterite stem 'tuv-'", "The suffix '-mos' indicates 'us / we'"),
      vosotros_ustedes: makeEntry('tuvisteis', 'tuv', 'uv', 'steis', "Irregular Preterite stem 'tuv-'", "The suffix '-steis' indicates 'you all'"),
      ellos_ellas: makeEntry('tuvieron', 'tuv', 'uv', 'ron', "Irregular Preterite stem 'tuv-'", "The suffix '-ron' indicates 'them'"),
    },
    preterito_imperfecto: {
      yo: makeEntry('tenía', 'ten', 'ía', undefined, "The giveaway 'ía' marks ongoing past (Imperfect)"),
      tu: makeEntry('tenías', 'ten', 'ía', 's', "The giveaway 'ía' marks ongoing past (Imperfect)", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('tenía', 'ten', 'ía', undefined, "The giveaway 'ía' marks ongoing past (Imperfect)"),
      nosotros: makeEntry('teníamos', 'ten', 'ía', 'mos', "The giveaway 'ía' marks ongoing past (Imperfect)", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('teníais', 'ten', 'ía', 'is', "The giveaway 'ía' marks ongoing past (Imperfect)", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry('tenían', 'ten', 'ía', 'n', "The giveaway 'ía' marks ongoing past (Imperfect)", "The letter 'n' is the giveaway for 'them'"),
    },
    futuro_simple: {
      yo: makeEntry('tendré', 'tendr', 'r', 'é', "The letter 'r' is the giveaway for Future tense", "The ending '-é' marks Future 'me / I'"),
      tu: makeEntry('tendrás', 'tendr', 'r', 's', "The letter 'r' is the giveaway for Future tense", "The letter 's' is the giveaway for 'you'"),
      el_ella_usted: makeEntry('tendrá', 'tendr', 'r', 'á', "The letter 'r' is the giveaway for Future tense", "The ending '-á' marks Future 'him / her'"),
      nosotros: makeEntry('tendremos', 'tendr', 'r', 'mos', "The letter 'r' is the giveaway for Future tense", "The ending '-mos' is the giveaway for 'us / we'"),
      vosotros_ustedes: makeEntry('tendréis', 'tendr', 'r', 'is', "The letter 'r' is the giveaway for Future tense", "The ending '-is' marks 'you all'"),
      ellos_ellas: makeEntry('tendrán', 'tendr', 'r', 'n', "The letter 'r' is the giveaway for Future tense", "The letter 'n' is the giveaway for 'them'"),
    },
  },
};

// Extensive list of verbs
export const VERBS_DATABASE: VerbItem[] = [
  // Regular AR Verbs
  buildRegularArVerb('hablar', 'hablar', 'to speak / talk'),
  buildRegularArVerb('caminar', 'caminar', 'to walk'),
  buildRegularArVerb('cantar', 'cantar', 'to sing'),
  buildRegularArVerb('trabajar', 'trabajar', 'to work'),
  buildRegularArVerb('bailar', 'bailar', 'to dance'),
  buildRegularArVerb('mirar', 'mirar', 'to watch / look'),
  buildRegularArVerb('llamar', 'llamar', 'to call'),
  buildRegularArVerb('viajar', 'viajar', 'to travel'),
  buildRegularArVerb('comprar', 'comprar', 'to buy'),
  buildRegularArVerb('estudiar', 'estudiar', 'to study'),
  buildRegularArVerb('escuchar', 'escuchar', 'to listen'),
  buildRegularArVerb('tomar', 'tomar', 'to take / drink'),

  // Regular ER Verbs
  buildRegularErVerb('comer', 'comer', 'to eat'),
  buildRegularErVerb('beber', 'beber', 'to drink'),
  buildRegularErVerb('correr', 'correr', 'to run'),
  buildRegularErVerb('aprender', 'aprender', 'to learn'),
  buildRegularErVerb('comprender', 'comprender', 'to understand'),
  buildRegularErVerb('vender', 'vender', 'to sell'),
  buildRegularErVerb('responder', 'responder', 'to answer'),
  buildRegularErVerb('leer', 'leer', 'to read'),

  // Regular IR Verbs
  buildRegularIrVerb('vivir', 'vivir', 'to live'),
  buildRegularIrVerb('escribir', 'escribir', 'to write'),
  buildRegularIrVerb('abrir', 'abrir', 'to open'),
  buildRegularIrVerb('recibir', 'recibir', 'to receive'),
  buildRegularIrVerb('asistir', 'asistir', 'to attend'),
  buildRegularIrVerb('subir', 'subir', 'to go up / climb'),
  buildRegularIrVerb('descubrir', 'descubrir', 'to discover'),

  // Irregular Verbs
  verbSer,
  verbEstar,
  verbIr,
  verbTener,
];

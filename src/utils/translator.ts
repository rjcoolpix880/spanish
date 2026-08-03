import type { TenseKey, PersonKey, VerbItem } from '../types/spanish';

// Generates contextual English phrases for verb conjugations
export function getEnglishContextualPhrase(verb: VerbItem, tenseKey: TenseKey, personKey: PersonKey): string {
  // English pronouns
  const pronounMap: Record<PersonKey, string> = {
    yo: 'I',
    tu: 'you',
    el_ella_usted: 'he / she / you (formal)',
    nosotros: 'we',
    vosotros_ustedes: 'you all',
    ellos_ellas: 'they',
  };

  const pronoun = pronounMap[personKey];

  // Custom verb conjugation dictionaries for clear natural English
  const verbEnglishRules: Record<string, {
    present: Record<PersonKey, string>;
    preterite: Record<PersonKey, string>;
    imperfect: Record<PersonKey, string>;
    future: Record<PersonKey, string>;
  }> = {
    hablar: {
      present: { yo: 'I speak', tu: 'you speak', el_ella_usted: 'he / she speaks', nosotros: 'we speak', vosotros_ustedes: 'you all speak', ellos_ellas: 'they speak' },
      preterite: { yo: 'I spoke', tu: 'you spoke', el_ella_usted: 'he / she spoke', nosotros: 'we spoke', vosotros_ustedes: 'you all spoke', ellos_ellas: 'they spoke' },
      imperfect: { yo: 'I used to speak', tu: 'you used to speak', el_ella_usted: 'he / she used to speak', nosotros: 'we used to speak', vosotros_ustedes: 'you all used to speak', ellos_ellas: 'they used to speak' },
      future: { yo: 'I will speak', tu: 'you will speak', el_ella_usted: 'he / she will speak', nosotros: 'we will speak', vosotros_ustedes: 'you all will speak', ellos_ellas: 'they will speak' },
    },
    beber: {
      present: { yo: 'I drink', tu: 'you drink', el_ella_usted: 'he / she drinks', nosotros: 'we drink', vosotros_ustedes: 'you all drink', ellos_ellas: 'they drink' },
      preterite: { yo: 'I drank', tu: 'you drank', el_ella_usted: 'he / she drank', nosotros: 'we drank', vosotros_ustedes: 'you all drank', ellos_ellas: 'they drank' },
      imperfect: { yo: 'I used to drink', tu: 'you used to drink', el_ella_usted: 'he / she used to drink', nosotros: 'we used to drink', vosotros_ustedes: 'you all used to drink', ellos_ellas: 'they used to drink' },
      future: { yo: 'I will drink', tu: 'you will drink', el_ella_usted: 'he / she will drink', nosotros: 'we will drink', vosotros_ustedes: 'you all will drink', ellos_ellas: 'they will drink' },
    },
    comer: {
      present: { yo: 'I eat', tu: 'you eat', el_ella_usted: 'he / she eats', nosotros: 'we eat', vosotros_ustedes: 'you all eat', ellos_ellas: 'they eat' },
      preterite: { yo: 'I ate', tu: 'you ate', el_ella_usted: 'he / she ate', nosotros: 'we ate', vosotros_ustedes: 'you all ate', ellos_ellas: 'they ate' },
      imperfect: { yo: 'I used to eat', tu: 'you used to eat', el_ella_usted: 'he / she used to eat', nosotros: 'we used to eat', vosotros_ustedes: 'you all used to eat', ellos_ellas: 'they used to eat' },
      future: { yo: 'I will eat', tu: 'you will eat', el_ella_usted: 'he / she will eat', nosotros: 'we will eat', vosotros_ustedes: 'you all will eat', ellos_ellas: 'they will eat' },
    },
    vivir: {
      present: { yo: 'I live', tu: 'you live', el_ella_usted: 'he / she lives', nosotros: 'we live', vosotros_ustedes: 'you all live', ellos_ellas: 'they live' },
      preterite: { yo: 'I lived', tu: 'you lived', el_ella_usted: 'he / she lived', nosotros: 'we lived', vosotros_ustedes: 'you all lived', ellos_ellas: 'they lived' },
      imperfect: { yo: 'I used to live', tu: 'you used to live', el_ella_usted: 'he / she used to live', nosotros: 'we used to live', vosotros_ustedes: 'you all used to live', ellos_ellas: 'they used to live' },
      future: { yo: 'I will live', tu: 'you will live', el_ella_usted: 'he / she will live', nosotros: 'we will live', vosotros_ustedes: 'you all will live', ellos_ellas: 'they will live' },
    },
    ser: {
      present: { yo: 'I am', tu: 'you are', el_ella_usted: 'he / she is', nosotros: 'we are', vosotros_ustedes: 'you all are', ellos_ellas: 'they are' },
      preterite: { yo: 'I was', tu: 'you were', el_ella_usted: 'he / she was', nosotros: 'we were', vosotros_ustedes: 'you all were', ellos_ellas: 'they were' },
      imperfect: { yo: 'I used to be', tu: 'you used to be', el_ella_usted: 'he / she used to be', nosotros: 'we used to be', vosotros_ustedes: 'you all used to be', ellos_ellas: 'they used to be' },
      future: { yo: 'I will be', tu: 'you will be', el_ella_usted: 'he / she will be', nosotros: 'we will be', vosotros_ustedes: 'you all will be', ellos_ellas: 'they will be' },
    },
    estar: {
      present: { yo: 'I am', tu: 'you are', el_ella_usted: 'he / she is', nosotros: 'we are', vosotros_ustedes: 'you all are', ellos_ellas: 'they are' },
      preterite: { yo: 'I was', tu: 'you were', el_ella_usted: 'he / she was', nosotros: 'we were', vosotros_ustedes: 'you all were', ellos_ellas: 'they were' },
      imperfect: { yo: 'I used to be', tu: 'you used to be', el_ella_usted: 'he / she used to be', nosotros: 'we used to be', vosotros_ustedes: 'you all used to be', ellos_ellas: 'they used to be' },
      future: { yo: 'I will be', tu: 'you will be', el_ella_usted: 'he / she will be', nosotros: 'we will be', vosotros_ustedes: 'you all will be', ellos_ellas: 'they will be' },
    },
    ir: {
      present: { yo: 'I go', tu: 'you go', el_ella_usted: 'he / she goes', nosotros: 'we go', vosotros_ustedes: 'you all go', ellos_ellas: 'they go' },
      preterite: { yo: 'I went', tu: 'you went', el_ella_usted: 'he / she went', nosotros: 'we went', vosotros_ustedes: 'you all went', ellos_ellas: 'they went' },
      imperfect: { yo: 'I used to go', tu: 'you used to go', el_ella_usted: 'he / she used to go', nosotros: 'we used to go', vosotros_ustedes: 'you all used to go', ellos_ellas: 'they used to go' },
      future: { yo: 'I will go', tu: 'you will go', el_ella_usted: 'he / she will go', nosotros: 'we will go', vosotros_ustedes: 'you all will go', ellos_ellas: 'they will go' },
    },
    tener: {
      present: { yo: 'I have', tu: 'you have', el_ella_usted: 'he / she has', nosotros: 'we have', vosotros_ustedes: 'you all have', ellos_ellas: 'they have' },
      preterite: { yo: 'I had', tu: 'you had', el_ella_usted: 'he / she had', nosotros: 'we had', vosotros_ustedes: 'you all had', ellos_ellas: 'they had' },
      imperfect: { yo: 'I used to have', tu: 'you used to have', el_ella_usted: 'he / she used to have', nosotros: 'we used to have', vosotros_ustedes: 'you all used to have', ellos_ellas: 'they used to have' },
      future: { yo: 'I will have', tu: 'you will have', el_ella_usted: 'he / she will have', nosotros: 'we will have', vosotros_ustedes: 'you all will have', ellos_ellas: 'they will have' },
    },
  };

  const verbRule = verbEnglishRules[verb.id];
  if (verbRule) {
    if (tenseKey === 'presente') return verbRule.present[personKey];
    if (tenseKey === 'preterito_indefinido') return verbRule.preterite[personKey];
    if (tenseKey === 'preterito_imperfecto') return verbRule.imperfect[personKey];
    if (tenseKey === 'futuro_simple') return verbRule.future[personKey];
  }

  // Fallback pattern generator for any other regular verb
  const baseTranslation = verb.englishTranslation.replace(/^to\s+/, ''); // e.g. "walk"
  if (tenseKey === 'presente') {
    if (personKey === 'el_ella_usted') return `${pronoun} ${baseTranslation}s`;
    return `${pronoun} ${baseTranslation}`;
  }
  if (tenseKey === 'preterito_imperfecto') {
    return `${pronoun} used to ${baseTranslation}`;
  }
  if (tenseKey === 'futuro_simple') {
    return `${pronoun} will ${baseTranslation}`;
  }
  if (tenseKey === 'preterito_indefinido') {
    return `${pronoun} ${baseTranslation}ed`;
  }

  return `${pronoun} ${baseTranslation}`;
}

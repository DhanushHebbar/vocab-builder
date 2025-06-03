import { VocabularyWord } from '../types/vocabulary';

// This is a subset of words for the initial application
// In a real application, this would be fetched from an API or database
export const vocabularyData: VocabularyWord[] = [
  {
    id: 1,
    word: 'brevity',
    partOfSpeech: 'noun',
    meaning: 'Concise and exact use of words in writing or speech.',
    usage: 'The editor praised the reporter for the brevity of her articles.',
    synonyms: ['conciseness', 'succinctness', 'terseness', 'economy'],
    antonyms: ['lengthiness', 'verbosity', 'wordiness', 'prolixity'],
    etymology: 'From Latin brevitas, from brevis "short"',
    rootInfo: 'brev- (short)',
    quote: `"Brevity is the soul of wit." - William Shakespeare`,
    difficulty: 'intermediate'
  },
  {
    id: 2,
    word: 'eloquent',
    partOfSpeech: 'adjective',
    meaning: 'Fluent or persuasive in speaking or writing.',
    usage: 'She gave an eloquent speech that moved the audience to tears.',
    synonyms: ['articulate', 'expressive', 'fluent', 'persuasive'],
    antonyms: ['inarticulate', 'tongue-tied', 'halting', 'mumbling'],
    etymology: 'From Latin eloquentem, from eloqui "to speak out"',
    rootInfo: 'e- (out) + loqui (to speak)',
    quote: `"True eloquence consists in saying all that is necessary, and nothing but what is necessary." - Heinrich Heine`,
    difficulty: 'intermediate'
  },
  {
    id: 3,
    word: 'ubiquitous',
    partOfSpeech: 'adjective',
    meaning: 'Present, appearing, or found everywhere.',
    usage: 'Smartphones have become ubiquitous in modern society.',
    synonyms: ['omnipresent', 'universal', 'pervasive', 'prevalent'],
    antonyms: ['rare', 'scarce', 'uncommon', 'limited'],
    etymology: 'From Latin ubique "everywhere"',
    rootInfo: 'ubique (everywhere)',
    quote: `"Technology is becoming as ubiquitous as the air we breathe." - Godfrey Reggio`,
    difficulty: 'advanced'
  },
  {
    id: 4,
    word: 'serendipity',
    partOfSpeech: 'noun',
    meaning: 'The occurrence and development of events by chance in a happy or beneficial way.',
    usage: 'By serendipity, she found her dream job while looking for something else.',
    synonyms: ['chance', 'fortune', 'luck', 'happenstance'],
    antonyms: ['misfortune', 'calamity', 'design', 'intention'],
    etymology: 'Coined by Horace Walpole in 1754 from the Persian fairy tale "The Three Princes of Serendip"',
    rootInfo: 'From Serendip, an old name for Sri Lanka',
    quote: `"Serendipity is looking in a haystack for a needle and discovering a farmer's daughter." - Julius Comroe Jr.`,
    difficulty: 'advanced'
  },
  {
    id: 5,
    word: 'perspicacious',
    partOfSpeech: 'adjective',
    meaning: 'Having a ready insight into and understanding of things.',
    usage: 'Her perspicacious comments revealed her deep understanding of the issue.',
    synonyms: ['perceptive', 'astute', 'insightful', 'discerning'],
    antonyms: ['unperceptive', 'undiscerning', 'obtuse', 'unaware'],
    etymology: 'From Latin perspicax, from perspicere "to see through"',
    rootInfo: 'per- (through) + specere (to look)',
    quote: `"The perspicacious reader will already have guessed the solution to the mystery." - A.A. Milne`,
    difficulty: 'advanced'
  },
  {
    id: 6,
    word: 'ephemeral',
    partOfSpeech: 'adjective',
    meaning: 'Lasting for a very short time.',
    usage: 'The beauty of cherry blossoms is ephemeral, lasting only a few days each spring.',
    synonyms: ['fleeting', 'transient', 'momentary', 'brief'],
    antonyms: ['permanent', 'enduring', 'everlasting', 'eternal'],
    etymology: 'From Greek ephemeros "lasting only a day"',
    rootInfo: 'epi- (on) + hemera (day)',
    quote: `"Art is ephemeral, like the artist himself, but it's worth pursuing." - Auguste Rodin`,
    difficulty: 'intermediate'
  },
  {
    id: 7,
    word: 'paradigm',
    partOfSpeech: 'noun',
    meaning: 'A typical example or pattern of something; a model.',
    usage: 'This discovery will change the current scientific paradigm.',
    synonyms: ['model', 'pattern', 'example', 'archetype'],
    antonyms: ['anomaly', 'exception', 'aberration', 'deviation'],
    etymology: 'From Greek paradeigma "pattern, example"',
    rootInfo: 'para- (beside) + deiknynai (to show)',
    quote: `"The paradigm of science is to never accept something as true until it has been verified multiple times." - Stephen Hawking`,
    difficulty: 'intermediate'
  },
  {
    id: 8,
    word: 'ameliorate',
    partOfSpeech: 'verb',
    meaning: 'Make (something bad or unsatisfactory) better.',
    usage: 'The new policies are designed to ameliorate the living conditions of the poor.',
    synonyms: ['improve', 'better', 'enhance', 'upgrade'],
    antonyms: ['worsen', 'aggravate', 'exacerbate', 'deteriorate'],
    etymology: 'From French améliorer, from Latin melior "better"',
    rootInfo: 'melior- (better)',
    pastTense: 'ameliorated',
    presentTense: 'ameliorates',
    futureTense: 'will ameliorate',
    quote: `"Education is the most powerful weapon which you can use to ameliorate the world." - Nelson Mandela`,
    difficulty: 'advanced'
  },
  {
    id: 9,
    word: 'pragmatic',
    partOfSpeech: 'adjective',
    meaning: 'Dealing with things sensibly and realistically in a way that is based on practical considerations.',
    usage: 'She takes a pragmatic approach to problem-solving.',
    synonyms: ['practical', 'realistic', 'sensible', 'rational'],
    antonyms: ['idealistic', 'impractical', 'unrealistic', 'theoretical'],
    etymology: 'From Greek pragmatikos "relating to fact"',
    rootInfo: 'pragma (deed, affair)',
    quote: `"I'm a pragmatic person, concerned about results, not ideology." - Mikhail Gorbachev`,
    difficulty: 'intermediate'
  },
  {
    id: 10,
    word: 'cacophony',
    partOfSpeech: 'noun',
    meaning: 'A harsh, discordant mixture of sounds.',
    usage: 'The cacophony of the construction site made it impossible to concentrate.',
    synonyms: ['discord', 'dissonance', 'noise', 'clamor'],
    antonyms: ['harmony', 'euphony', 'melody', 'consonance'],
    etymology: 'From Greek kakophonia, from kakos "bad" + phone "sound"',
    rootInfo: 'kako- (bad) + phone (sound)',
    quote: `"The cacophony of an orchestra tuning up is a special kind of musical chaos." - Leonard Bernstein`,
    difficulty: 'advanced'
  }
];

// Function to get word of the day
export const getWordOfTheDay = (): VocabularyWord => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return vocabularyData[dayOfYear % vocabularyData.length];
};

// Function to search words
export const searchWords = (query: string): VocabularyWord[] => {
  const lowercaseQuery = query.toLowerCase();
  return vocabularyData.filter(word => 
    word.word.toLowerCase().includes(lowercaseQuery) ||
    word.meaning.toLowerCase().includes(lowercaseQuery) ||
    word.synonyms.some(syn => syn.toLowerCase().includes(lowercaseQuery))
  );
};

// Function to get words by difficulty
export const getWordsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): VocabularyWord[] => {
  return vocabularyData.filter(word => word.difficulty === difficulty);
};
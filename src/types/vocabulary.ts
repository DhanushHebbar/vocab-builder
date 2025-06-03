export interface VocabularyWord {
  id: number;
  word: string;
  partOfSpeech: string;
  meaning: string;
  usage: string;
  synonyms: string[];
  antonyms: string[];
  etymology: string;
  rootInfo: string;
  pastTense?: string;
  presentTense?: string;
  futureTense?: string;
  quote?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserProgress {
  learned: number[];
  favorites: number[];
  quizzed: number[];
  history: number[];
  lastViewedDate?: string;
  streak: number;
}
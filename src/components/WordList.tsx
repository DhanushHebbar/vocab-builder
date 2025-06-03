import React, { useState } from 'react';
import { VocabularyWord } from '../types/vocabulary';
import WordCard from './WordCard';
import { ChevronDown, ChevronUp, List } from 'lucide-react';

interface WordListProps {
  words: VocabularyWord[];
  title?: string;
  emptyMessage?: string;
}

const WordList: React.FC<WordListProps> = ({ 
  words, 
  title = "Vocabulary Words", 
  emptyMessage = "No words found" 
}) => {
  const [expandedWordId, setExpandedWordId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'alphabetical' | 'difficulty'>('alphabetical');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const toggleWordDetails = (wordId: number) => {
    setExpandedWordId(expandedWordId === wordId ? null : wordId);
  };
  
  const handleSort = (type: 'alphabetical' | 'difficulty') => {
    if (sortBy === type) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortDirection('asc');
    }
  };
  
  // Sort the words based on the current sort settings
  const sortedWords = [...words].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return sortDirection === 'asc' 
        ? a.word.localeCompare(b.word)
        : b.word.localeCompare(a.word);
    } else {
      // Map difficulty to numerical value for sorting
      const difficultyValue = {
        'beginner': 1,
        'intermediate': 2,
        'advanced': 3
      };
      const aValue = difficultyValue[a.difficulty];
      const bValue = difficultyValue[b.difficulty];
      
      return sortDirection === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
  });
  
  if (words.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-neutral-600">
        <List className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="font-serif text-xl font-bold text-neutral-800">{title}</h2>
        
        <div className="flex space-x-2 text-sm">
          <button 
            onClick={() => handleSort('alphabetical')}
            className={`flex items-center px-3 py-1 rounded border ${
              sortBy === 'alphabetical' ? 'border-primary-500 text-primary-700 bg-primary-50' : 'border-neutral-300 text-neutral-600'
            }`}
          >
            Alphabetical
            {sortBy === 'alphabetical' && (
              sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </button>
          
          <button 
            onClick={() => handleSort('difficulty')}
            className={`flex items-center px-3 py-1 rounded border ${
              sortBy === 'difficulty' ? 'border-primary-500 text-primary-700 bg-primary-50' : 'border-neutral-300 text-neutral-600'
            }`}
          >
            Difficulty
            {sortBy === 'difficulty' && (
              sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedWords.map((word) => (
          <WordCard 
            key={word.id}
            word={word}
            showDetails={expandedWordId === word.id}
            onToggleDetails={() => toggleWordDetails(word.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default WordList;
import React from 'react';
import { VocabularyWord } from '../types/vocabulary';
import { Heart, BookOpen, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface WordCardProps {
  word: VocabularyWord;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, showDetails = false, onToggleDetails }) => {
  const { userProgress, addToFavorites, removeFromFavorites, addToLearned } = useUser();
  
  const isFavorite = userProgress.favorites.includes(word.id);
  const isLearned = userProgress.learned.includes(word.id);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(word.id);
    } else {
      addToFavorites(word.id);
    }
  };
  
  const markAsLearned = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToLearned(word.id);
  };
  
  // Function to get the badge color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden
                 ${showDetails ? 'animate-fade-in' : 'hover:shadow-lg'}`}
      onClick={onToggleDetails}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">{word.word}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={toggleFavorite}
              className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-accent-500 hover:text-accent-600' : 'text-neutral-400 hover:text-accent-500'}`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={markAsLearned}
              className={`p-2 rounded-full transition-colors ${isLearned ? 'text-primary-500 hover:text-primary-600' : 'text-neutral-400 hover:text-primary-500'}`}
              aria-label={isLearned ? "Marked as learned" : "Mark as learned"}
            >
              <BookOpen className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <span className="text-sm italic text-neutral-600 mr-3">{word.partOfSpeech}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(word.difficulty)}`}>
            {word.difficulty}
          </span>
          {isLearned && (
            <span className="ml-2 flex items-center text-xs text-primary-600">
              <Award className="h-3 w-3 mr-1" />
              Learned
            </span>
          )}
        </div>
        
        <p className="text-neutral-700 mb-4">{word.meaning}</p>
        
        {showDetails ? (
          <div className="space-y-4 animate-fade-in">
            {word.usage && (
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">Usage</h3>
                <p className="text-neutral-600 italic">"{word.usage}"</p>
              </div>
            )}
            
            {word.synonyms.length > 0 && (
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">Synonyms</h3>
                <div className="flex flex-wrap gap-2">
                  {word.synonyms.map((synonym, index) => (
                    <span key={index} className="bg-neutral-100 px-2 py-1 rounded text-sm text-neutral-700">
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {word.antonyms.length > 0 && (
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">Antonyms</h3>
                <div className="flex flex-wrap gap-2">
                  {word.antonyms.map((antonym, index) => (
                    <span key={index} className="bg-neutral-100 px-2 py-1 rounded text-sm text-neutral-700">
                      {antonym}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {word.etymology && (
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">Etymology</h3>
                <p className="text-neutral-600">{word.etymology}</p>
              </div>
            )}
            
            {word.rootInfo && (
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">Root</h3>
                <p className="text-neutral-600">{word.rootInfo}</p>
              </div>
            )}
            
            {(word.pastTense || word.presentTense || word.futureTense) && (
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">Tenses</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {word.pastTense && (
                    <div className="bg-neutral-50 p-2 rounded">
                      <span className="text-xs text-neutral-500">Past</span>
                      <p className="text-neutral-700">{word.pastTense}</p>
                    </div>
                  )}
                  {word.presentTense && (
                    <div className="bg-neutral-50 p-2 rounded">
                      <span className="text-xs text-neutral-500">Present</span>
                      <p className="text-neutral-700">{word.presentTense}</p>
                    </div>
                  )}
                  {word.futureTense && (
                    <div className="bg-neutral-50 p-2 rounded">
                      <span className="text-xs text-neutral-500">Future</span>
                      <p className="text-neutral-700">{word.futureTense}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {word.quote && (
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">Notable Quote</h3>
                <blockquote className="border-l-4 border-accent-300 pl-4 italic text-neutral-700">
                  {word.quote}
                </blockquote>
              </div>
            )}
          </div>
        ) : (
          <button 
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            onClick={onToggleDetails}
          >
            Show details
          </button>
        )}
      </div>
    </div>
  );
};

export default WordCard;
import React, { useState, useEffect } from 'react';
import { getWordOfTheDay } from '../data/vocabularyData';
import { VocabularyWord } from '../types/vocabulary';
import WordCard from './WordCard';
import { CalendarDays } from 'lucide-react';
import { useUser } from '../context/UserContext';

const WordOfTheDay: React.FC = () => {
  const [wordOfDay, setWordOfDay] = useState<VocabularyWord | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { updateStreak, userProgress } = useUser();
  
  useEffect(() => {
    const todayWord = getWordOfTheDay();
    setWordOfDay(todayWord);
    
    // Update the user's streak when viewing word of the day
    updateStreak();
  }, [updateStreak]);

  if (!wordOfDay) {
    return <div className="p-8 text-center">Loading word of the day...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <CalendarDays className="h-6 w-6 text-primary-600 mr-2" />
          <h2 className="font-serif text-xl font-bold text-primary-800">Word of the Day</h2>
        </div>
        <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
          <span className="text-accent-500 font-bold mr-1">{userProgress.streak}</span>
          <span className="text-sm text-neutral-600">day streak</span>
        </div>
      </div>
      
      <div className="animate-page-turn">
        <WordCard 
          word={wordOfDay} 
          showDetails={showDetails}
          onToggleDetails={() => setShowDetails(!showDetails)}
        />
      </div>
    </div>
  );
};

export default WordOfTheDay;
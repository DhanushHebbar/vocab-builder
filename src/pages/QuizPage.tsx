import React, { useState } from 'react';
import { vocabularyData, getWordsByDifficulty } from '../data/vocabularyData';
import QuizMode from '../components/QuizMode';
import { Dumbbell, Brain, BookOpen } from 'lucide-react';

const QuizPage: React.FC = () => {
  const [quizDifficulty, setQuizDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [wordsForQuiz, setWordsForQuiz] = useState(vocabularyData);
  const [quizStarted, setQuizStarted] = useState(false);
  
  const handleStartQuiz = (difficulty: 'all' | 'beginner' | 'intermediate' | 'advanced') => {
    setQuizDifficulty(difficulty);
    
    // Filter words based on selected difficulty
    if (difficulty === 'all') {
      setWordsForQuiz(vocabularyData);
    } else {
      setWordsForQuiz(getWordsByDifficulty(difficulty));
    }
    
    setQuizStarted(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="font-serif text-2xl font-bold text-neutral-800 mb-4">Vocabulary Quiz</h1>
        <p className="text-neutral-600 mb-6">
          Test your vocabulary knowledge with our interactive quiz. Choose a difficulty level to get started.
        </p>
        
        {!quizStarted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuizCard 
              title="All Levels" 
              description="Mix of beginner, intermediate, and advanced words" 
              icon={<BookOpen className="h-8 w-8 text-primary-600" />}
              onClick={() => handleStartQuiz('all')}
              count={vocabularyData.length}
            />
            
            <QuizCard 
              title="Beginner" 
              description="Common words for building basic vocabulary" 
              icon={<Dumbbell className="h-8 w-8 text-green-600" />}
              onClick={() => handleStartQuiz('beginner')}
              count={vocabularyData.filter(w => w.difficulty === 'beginner').length}
              color="green"
            />
            
            <QuizCard 
              title="Intermediate" 
              description="More advanced words for expanding vocabulary" 
              icon={<Dumbbell className="h-8 w-8 text-blue-600" />}
              onClick={() => handleStartQuiz('intermediate')}
              count={vocabularyData.filter(w => w.difficulty === 'intermediate').length}
              color="blue"
            />
            
            <QuizCard 
              title="Advanced" 
              description="Challenging words for vocabulary mastery" 
              icon={<Brain className="h-8 w-8 text-purple-600" />}
              onClick={() => handleStartQuiz('advanced')}
              count={vocabularyData.filter(w => w.difficulty === 'advanced').length}
              color="purple"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-xl font-medium text-neutral-800">
                {quizDifficulty === 'all' ? 'All Levels' : quizDifficulty.charAt(0).toUpperCase() + quizDifficulty.slice(1)} Quiz
              </h2>
              
              <button 
                onClick={() => setQuizStarted(false)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Change Difficulty
              </button>
            </div>
            
            <QuizMode words={wordsForQuiz} />
          </div>
        )}
      </div>
    </div>
  );
};

interface QuizCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  count: number;
  color?: 'blue' | 'green' | 'purple';
}

const QuizCard: React.FC<QuizCardProps> = ({ title, description, icon, onClick, count, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100 hover:bg-blue-100',
    green: 'bg-green-50 border-green-100 hover:bg-green-100',
    purple: 'bg-purple-50 border-purple-100 hover:bg-purple-100',
  };
  
  return (
    <button 
      onClick={onClick}
      className={`p-6 rounded-lg border text-left transition-colors ${colorClasses[color]}`}
    >
      <div className="flex justify-between items-start mb-4">
        {icon}
        <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-neutral-700">
          {count} words
        </span>
      </div>
      <h3 className="font-serif text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
    </button>
  );
};

export default QuizPage;
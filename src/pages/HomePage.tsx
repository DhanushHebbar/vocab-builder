import React, { useState } from 'react';
import WordOfTheDay from '../components/WordOfTheDay';
import SearchBar from '../components/SearchBar';
import WordList from '../components/WordList';
import { vocabularyData, searchWords } from '../data/vocabularyData';
import { Book, Trophy, History } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<typeof vocabularyData>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { userProgress, addToHistory } = useUser();
  
  // Get last viewed words from history
  const recentlyViewedWords = userProgress.history
    .slice(0, 3)
    .map(id => vocabularyData.find(word => word.id === id))
    .filter(Boolean) as typeof vocabularyData;
  
  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    const results = searchWords(query);
    setSearchResults(results);
    setHasSearched(true);
    
    // Record history for the first result if exists
    if (results.length > 0) {
      addToHistory(results[0].id);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white rounded-xl p-8 shadow-lg">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
          Expand Your Vocabulary
        </h1>
        <p className="text-primary-100 mb-6 max-w-2xl">
          Discover new words, learn their meanings, and track your progress with our daily vocabulary builder. Challenge yourself to learn one new word every day.
        </p>
        
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {hasSearched ? (
        <div className="animate-fade-in">
          <WordList 
            words={searchResults} 
            title={`Search Results (${searchResults.length})`}
            emptyMessage="No words found matching your search. Try different keywords."
          />
        </div>
      ) : (
        <>
          <WordOfTheDay />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Trophy className="h-5 w-5 text-accent-500 mr-2" />
                <h2 className="font-serif text-lg font-bold text-neutral-800">Your Progress</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Words Learned</span>
                  <span className="font-medium text-primary-700">{userProgress.learned.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Favorites</span>
                  <span className="font-medium text-primary-700">{userProgress.favorites.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Quiz Words</span>
                  <span className="font-medium text-primary-700">{userProgress.quizzed.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Current Streak</span>
                  <span className="font-medium text-accent-600">{userProgress.streak} days</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/quiz" 
                  className="block w-full py-2 px-4 bg-accent-500 hover:bg-accent-600 text-white text-center font-medium rounded-lg transition-colors"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Book className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="font-serif text-lg font-bold text-neutral-800">Difficulty Levels</h2>
              </div>
              
              <div className="space-y-4">
                <Link to="/browse?difficulty=beginner" className="block p-3 bg-green-50 border border-green-100 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-green-800 font-medium">Beginner</span>
                    <span className="text-sm text-green-600 bg-white px-2 py-1 rounded-full">
                      {vocabularyData.filter(w => w.difficulty === 'beginner').length} words
                    </span>
                  </div>
                </Link>
                
                <Link to="/browse?difficulty=intermediate" className="block p-3 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-800 font-medium">Intermediate</span>
                    <span className="text-sm text-blue-600 bg-white px-2 py-1 rounded-full">
                      {vocabularyData.filter(w => w.difficulty === 'intermediate').length} words
                    </span>
                  </div>
                </Link>
                
                <Link to="/browse?difficulty=advanced" className="block p-3 bg-purple-50 border border-purple-100 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-800 font-medium">Advanced</span>
                    <span className="text-sm text-purple-600 bg-white px-2 py-1 rounded-full">
                      {vocabularyData.filter(w => w.difficulty === 'advanced').length} words
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <History className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="font-serif text-lg font-bold text-neutral-800">Recently Viewed</h2>
              </div>
              
              {recentlyViewedWords.length > 0 ? (
                <div className="space-y-3">
                  {recentlyViewedWords.map(word => (
                    <div key={word.id} className="p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                      <h3 className="font-medium text-neutral-800">{word.word}</h3>
                      <p className="text-sm text-neutral-600 truncate">{word.meaning}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-center py-4">
                  No recently viewed words
                </p>
              )}
              
              <div className="mt-4">
                <Link 
                  to="/browse" 
                  className="block w-full py-2 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-center font-medium rounded-lg transition-colors"
                >
                  Browse All Words
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Ripple Button Component
import './RippleButton.css';

const RippleButton: React.FC = () => {
  return (
    <a 
      href="https://vocab-builder-swart.vercel.app/" 
      target="_blank" 
      className="ripple-button" 
      aria-label="Try this Vocabulary App"
    >
      <span>🚀 Try This App</span>
    </a>
  );
};

export default RippleButton;

export default HomePage;

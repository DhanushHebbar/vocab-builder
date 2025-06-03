import React from 'react';
import { vocabularyData } from '../data/vocabularyData';
import WordList from '../components/WordList';
import { useUser } from '../context/UserContext';
import { Heart } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { userProgress } = useUser();
  
  // Get favorited words from vocabulary data
  const favoriteWords = userProgress.favorites
    .map(id => vocabularyData.find(word => word.id === id))
    .filter(Boolean) as typeof vocabularyData;
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Heart className="h-6 w-6 text-accent-500 mr-2 fill-current" />
          <h1 className="font-serif text-2xl font-bold text-neutral-800">Your Favorite Words</h1>
        </div>
        
        <p className="text-neutral-600">
          {favoriteWords.length > 0 
            ? `You have ${favoriteWords.length} favorite word${favoriteWords.length === 1 ? '' : 's'}.` 
            : 'You haven\'t added any favorite words yet.'}
        </p>
      </div>
      
      <WordList 
        words={favoriteWords} 
        title="Favorites"
        emptyMessage="You haven't added any favorite words yet. Click the heart icon on any word to add it to your favorites."
      />
    </div>
  );
};

export default FavoritesPage;
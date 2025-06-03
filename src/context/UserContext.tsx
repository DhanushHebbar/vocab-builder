import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types/vocabulary';

interface UserContextType {
  userProgress: UserProgress;
  addToLearned: (wordId: number) => void;
  addToFavorites: (wordId: number) => void;
  removeFromFavorites: (wordId: number) => void;
  addToHistory: (wordId: number) => void;
  addToQuizzed: (wordId: number) => void;
  updateStreak: () => void;
}

const defaultUserProgress: UserProgress = {
  learned: [],
  favorites: [],
  quizzed: [],
  history: [],
  streak: 0,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : defaultUserProgress;
  });

  // Save to localStorage whenever userProgress changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const addToLearned = (wordId: number) => {
    setUserProgress(prev => ({
      ...prev,
      learned: prev.learned.includes(wordId) 
        ? prev.learned 
        : [...prev.learned, wordId],
    }));
  };

  const addToFavorites = (wordId: number) => {
    setUserProgress(prev => ({
      ...prev,
      favorites: prev.favorites.includes(wordId) 
        ? prev.favorites 
        : [...prev.favorites, wordId],
    }));
  };

  const removeFromFavorites = (wordId: number) => {
    setUserProgress(prev => ({
      ...prev,
      favorites: prev.favorites.filter(id => id !== wordId),
    }));
  };

  const addToHistory = (wordId: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    setUserProgress(prev => ({
      ...prev,
      history: prev.history.includes(wordId) 
        ? [wordId, ...prev.history.filter(id => id !== wordId)]
        : [wordId, ...prev.history],
      lastViewedDate: today,
    }));
  };

  const addToQuizzed = (wordId: number) => {
    setUserProgress(prev => ({
      ...prev,
      quizzed: prev.quizzed.includes(wordId) 
        ? prev.quizzed 
        : [...prev.quizzed, wordId],
    }));
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    
    setUserProgress(prev => {
      // If this is the first visit or the last visit was yesterday, increment streak
      if (!prev.lastViewedDate) {
        return { ...prev, streak: 1, lastViewedDate: today };
      }

      const lastDate = new Date(prev.lastViewedDate);
      const todayDate = new Date(today);
      
      // Calculate the difference in days
      const diffTime = todayDate.getTime() - lastDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // If visited yesterday, increment streak
      if (diffDays === 1) {
        return { ...prev, streak: prev.streak + 1, lastViewedDate: today };
      } 
      // If visited today already, maintain streak
      else if (diffDays === 0) {
        return { ...prev, lastViewedDate: today };
      } 
      // If more than a day has passed, reset streak
      else {
        return { ...prev, streak: 1, lastViewedDate: today };
      }
    });
  };

  return (
    <UserContext.Provider value={{ 
      userProgress, 
      addToLearned, 
      addToFavorites, 
      removeFromFavorites, 
      addToHistory, 
      addToQuizzed,
      updateStreak,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
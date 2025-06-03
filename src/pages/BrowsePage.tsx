import React, { useState, useEffect } from 'react';
import { vocabularyData, getWordsByDifficulty } from '../data/vocabularyData';
import SearchBar from '../components/SearchBar';
import WordList from '../components/WordList';
import { Filter } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const BrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredWords, setFilteredWords] = useState(vocabularyData);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState<string>('all');
  
  // Get unique parts of speech from data
  const partsOfSpeech = Array.from(new Set(vocabularyData.map(word => word.partOfSpeech)));
  
  useEffect(() => {
    // Check URL parameters for initial filters
    const difficultyParam = searchParams.get('difficulty');
    if (difficultyParam) {
      setSelectedDifficulty(difficultyParam);
    }
  }, [searchParams]);
  
  useEffect(() => {
    let results = [...vocabularyData];
    
    // Apply difficulty filter
    if (selectedDifficulty !== 'all') {
      results = getWordsByDifficulty(selectedDifficulty as any);
    }
    
    // Apply part of speech filter
    if (selectedPartOfSpeech !== 'all') {
      results = results.filter(word => word.partOfSpeech === selectedPartOfSpeech);
    }
    
    setFilteredWords(results);
    
    // Update URL parameters
    const params: { [key: string]: string } = {};
    if (selectedDifficulty !== 'all') params.difficulty = selectedDifficulty;
    if (selectedPartOfSpeech !== 'all') params.pos = selectedPartOfSpeech;
    
    setSearchParams(params, { replace: true });
  }, [selectedDifficulty, selectedPartOfSpeech, setSearchParams]);
  
  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      // Reset to filtered state
      let results = [...vocabularyData];
      
      if (selectedDifficulty !== 'all') {
        results = results.filter(word => word.difficulty === selectedDifficulty);
      }
      
      if (selectedPartOfSpeech !== 'all') {
        results = results.filter(word => word.partOfSpeech === selectedPartOfSpeech);
      }
      
      setFilteredWords(results);
      return;
    }
    
    // Search within current filters
    const lowercaseQuery = query.toLowerCase();
    let results = vocabularyData.filter(word => 
      (word.word.toLowerCase().includes(lowercaseQuery) ||
       word.meaning.toLowerCase().includes(lowercaseQuery) ||
       word.synonyms.some(syn => syn.toLowerCase().includes(lowercaseQuery)))
    );
    
    // Apply current filters to search results
    if (selectedDifficulty !== 'all') {
      results = results.filter(word => word.difficulty === selectedDifficulty);
    }
    
    if (selectedPartOfSpeech !== 'all') {
      results = results.filter(word => word.partOfSpeech === selectedPartOfSpeech);
    }
    
    setFilteredWords(results);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="font-serif text-2xl font-bold text-neutral-800 mb-4">Browse Vocabulary</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="flex items-center text-sm font-medium text-neutral-700 mb-2">
              <Filter className="h-4 w-4 mr-1" />
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="flex items-center text-sm font-medium text-neutral-700 mb-2">
              <Filter className="h-4 w-4 mr-1" />
              Part of Speech
            </label>
            <select
              value={selectedPartOfSpeech}
              onChange={(e) => setSelectedPartOfSpeech(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {partsOfSpeech.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <WordList 
        words={filteredWords} 
        title={`Vocabulary Words (${filteredWords.length})`}
        emptyMessage="No words match your current filters. Try adjusting your search criteria."
      />
    </div>
  );
};

export default BrowsePage;
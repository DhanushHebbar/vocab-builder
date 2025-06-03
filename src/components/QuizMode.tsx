import React, { useState, useEffect } from 'react';
import { VocabularyWord } from '../types/vocabulary';
import { useUser } from '../context/UserContext';
import { CheckCircle, XCircle, HelpCircle, RefreshCw } from 'lucide-react';

interface QuizModeProps {
  words: VocabularyWord[];
}

interface QuizQuestion {
  questionType: 'meaning' | 'synonym' | 'antonym';
  wordId: number;
  word: string;
  correctAnswer: string;
  options: string[];
}

const QuizMode: React.FC<QuizModeProps> = ({ words }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const { addToQuizzed } = useUser();
  
  // Generate quiz questions when words change
  useEffect(() => {
    if (words.length === 0) return;
    
    const generateQuestions = () => {
      const questionTypes: ('meaning' | 'synonym' | 'antonym')[] = ['meaning', 'synonym', 'antonym'];
      const quizQuestions: QuizQuestion[] = [];
      
      // Generate up to 10 questions or as many as we have words
      const questionCount = Math.min(words.length, 10);
      
      const shuffledWords = [...words].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < questionCount; i++) {
        const word = shuffledWords[i];
        const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        let correctAnswer = '';
        let options: string[] = [];
        
        switch (questionType) {
          case 'meaning':
            correctAnswer = word.meaning;
            // Get incorrect options from other words' meanings
            options = shuffledWords
              .filter(w => w.id !== word.id)
              .map(w => w.meaning)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);
            break;
          case 'synonym':
            if (word.synonyms.length === 0) {
              // If no synonyms, default to meaning question
              correctAnswer = word.meaning;
              options = shuffledWords
                .filter(w => w.id !== word.id)
                .map(w => w.meaning)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
              break;
            }
            correctAnswer = word.synonyms[Math.floor(Math.random() * word.synonyms.length)];
            // Get incorrect options from other words' synonyms
            options = shuffledWords
              .filter(w => w.id !== word.id)
              .flatMap(w => w.synonyms)
              .filter(s => s !== correctAnswer)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);
            break;
          case 'antonym':
            if (word.antonyms.length === 0) {
              // If no antonyms, default to meaning question
              correctAnswer = word.meaning;
              options = shuffledWords
                .filter(w => w.id !== word.id)
                .map(w => w.meaning)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
              break;
            }
            correctAnswer = word.antonyms[Math.floor(Math.random() * word.antonyms.length)];
            // Get incorrect options from other words' antonyms
            options = shuffledWords
              .filter(w => w.id !== word.id)
              .flatMap(w => w.antonyms)
              .filter(a => a !== correctAnswer)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);
            break;
        }
        
        // Add correct answer to options and shuffle
        options.push(correctAnswer);
        options = options.sort(() => Math.random() - 0.5);
        
        quizQuestions.push({
          questionType,
          wordId: word.id,
          word: word.word,
          correctAnswer,
          options,
        });
      }
      
      return quizQuestions;
    };
    
    setQuestions(generateQuestions());
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setIsAnswered(false);
    setSelectedAnswer(null);
  }, [words]);
  
  if (words.length === 0 || questions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-neutral-600">Not enough words available for a quiz.</p>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    // Mark the word as quizzed
    addToQuizzed(currentQuestion.wordId);
  };
  
  const getQuestionPrompt = () => {
    switch (currentQuestion.questionType) {
      case 'meaning':
        return `What is the meaning of "${currentQuestion.word}"?`;
      case 'synonym':
        return `Which of the following is a synonym for "${currentQuestion.word}"?`;
      case 'antonym':
        return `Which of the following is an antonym for "${currentQuestion.word}"?`;
      default:
        return 'Select the correct answer:';
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const restartQuiz = () => {
    // Regenerate questions with the same words
    const newQuestions = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };
  
  if (quizCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">Quiz Completed!</h2>
          <p className="text-neutral-600">You scored {score} out of {questions.length}</p>
          
          <div className="mt-6 w-full max-w-md mx-auto bg-neutral-100 rounded-full h-4">
            <div 
              className="h-4 rounded-full bg-primary-500 transition-all duration-1000"
              style={{ width: `${(score / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="mt-8">
            {score === questions.length ? (
              <div className="flex flex-col items-center text-green-600">
                <CheckCircle className="w-16 h-16 mb-2" />
                <p className="text-lg font-medium">Perfect score! Excellent work!</p>
              </div>
            ) : score >= questions.length * 0.7 ? (
              <div className="flex flex-col items-center text-primary-600">
                <CheckCircle className="w-16 h-16 mb-2" />
                <p className="text-lg font-medium">Great job! Keep learning!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-accent-500">
                <HelpCircle className="w-16 h-16 mb-2" />
                <p className="text-lg font-medium">Good effort! Try again to improve.</p>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={restartQuiz}
          className="flex items-center justify-center mx-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Restart Quiz
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-medium text-neutral-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="text-sm font-medium text-primary-600">
          Score: {score} / {questions.length}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-neutral-800 mb-2">{getQuestionPrompt()}</h3>
        <div className="p-3 bg-primary-50 rounded-lg border border-primary-100">
          <span className="font-serif text-xl font-bold text-primary-800">{currentQuestion.word}</span>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={isAnswered}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              !isAnswered
                ? 'border-neutral-300 hover:border-primary-300 hover:bg-primary-50'
                : option === selectedAnswer
                  ? selectedAnswer === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : option === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-neutral-300 opacity-50'
            }`}
          >
            <div className="flex items-center">
              <span className="flex-grow">{option}</span>
              {isAnswered && (
                <>
                  {option === currentQuestion.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : option === selectedAnswer ? (
                    <XCircle className="h-5 w-5 text-red-600" />
                  ) : null}
                </>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <button
          onClick={handleNextQuestion}
          className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  );
};

export default QuizMode;
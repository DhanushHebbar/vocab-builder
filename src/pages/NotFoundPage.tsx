import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-serif text-5xl font-bold text-neutral-800 mb-4">404</h1>
      <p className="text-xl text-neutral-600 mb-8">The page you're looking for doesn't exist.</p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/"
          className="flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        
        <Link 
          to="/browse"
          className="flex items-center justify-center px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-medium rounded-lg transition-colors"
        >
          <Search className="h-5 w-5 mr-2" />
          Browse Words
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
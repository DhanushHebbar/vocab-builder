import React from 'react';
import { Heart, Mail, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <BookOpen className="h-6 w-6 text-accent-500 mr-2" />
            <span className="font-serif text-xl font-bold">VocabBuilder</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-neutral-300 hover:text-accent-500 transition-colors"
              aria-label="Contact us"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-neutral-300 hover:text-accent-500 transition-colors"
              aria-label="Support the project"
            >
              <Heart className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-6 text-center text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} VocabBuilder. All rights reserved.</p>
          <p className="mt-1">Expand your vocabulary, one word at a time.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState } from 'react';
import { BookOpen, Menu, X, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import NavWaves from './NavWaves';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userProgress } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink
      to={to}
      onClick={closeMenu}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md transition-all duration-300 ${
          isActive
            ? 'bg-primary-100 text-primary-800 font-medium transform scale-105'
            : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700 hover:scale-105'
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <motion.header 
      className="bg-white shadow-sm sticky top-0 z-10 relative"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary-800 transition-transform hover:scale-105">
              <BookOpen className="h-6 w-6 text-primary-600" />
              <span>VocabBuilder</span>
            </NavLink>
            
            <nav className="hidden md:flex ml-8 space-x-1">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/browse">Browse</NavItem>
              <NavItem to="/quiz">Quiz</NavItem>
              <NavItem to="/favorites">Favorites</NavItem>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <motion.div 
              className="bg-primary-50 px-3 py-1 rounded-full text-sm transform transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-primary-800 font-medium">{userProgress.streak} day streak</span>
            </motion.div>

            <NavLink 
              to="/profile"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </NavLink>
            
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.nav 
            className="md:hidden pt-4 pb-2 border-t mt-4 space-y-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <NavItem to="/">Home</NavItem>
            <NavItem to="/browse">Browse</NavItem>
            <NavItem to="/quiz">Quiz</NavItem>
            <NavItem to="/favorites">Favorites</NavItem>
            <NavItem to="/profile">Profile</NavItem>
          </motion.nav>
        )}
      </div>
      <NavWaves />
    </motion.header>
  );
};

export default Header;
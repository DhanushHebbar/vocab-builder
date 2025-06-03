import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundWords from './components/BackgroundWords';
import ParticleEffect from './components/ParticleEffect';

// Pages
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import QuizPage from './pages/QuizPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 relative overflow-hidden">
          <BackgroundWords />
          <ParticleEffect />
          <div className="relative z-10">
            <Header />
            
            <AnimatePresence mode="wait">
              <motion.main
                className="flex-grow container mx-auto px-4 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/browse" element={<BrowsePage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </motion.main>
            </AnimatePresence>
            
            <Footer />
          </div>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
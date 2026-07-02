import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Menu as MenuIcon, X } from 'lucide-react';
import { Logo } from './Logo';
import type { User as UserType } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserType | null;
  onLogout: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
  onOpenAuth,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'menu', label: 'Menu' },
    { id: 'reservation', label: 'Rezerwacja' },
    { id: 'contact', label: 'Kontakt' },
  ];

  if (currentUser) {
    navItems.push({ id: 'dashboard', label: 'Panel' });
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-light border-b border-gold/10 backdrop-blur-md">
      {/* 3-Column balanced grid */}
      <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-2 md:grid-cols-3 items-center">
        
        {/* Column 1: Logo (Left aligned) */}
        <div className="flex justify-start cursor-pointer" onClick={() => setActiveTab('home')}>
          <Logo className="h-10" />
        </div>

        {/* Column 2: Navigation Links (Centered) */}
        <div className="hidden md:flex justify-center items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative font-sans text-sm tracking-luxury transition-colors duration-300 uppercase py-2 px-1 ${
                activeTab === item.id
                  ? 'text-gold font-medium'
                  : 'text-primary/70 hover:text-gold'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Column 3: Actions (Right aligned) */}
        <div className="hidden md:flex justify-end items-center gap-5">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 text-sm font-sans text-primary hover:text-gold transition-colors duration-200"
              >
                <User size={16} className="text-gold" />
                <span className="max-w-[120px] truncate">{currentUser.username}</span>
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-full hover:bg-red-500/10 text-red-500 hover:text-red-600 transition-colors duration-200"
                title="Wyloguj się"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-sm font-sans tracking-luxury uppercase text-primary/80 hover:text-gold transition-colors duration-200 px-3 py-2"
              >
                Zaloguj
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="text-sm font-sans tracking-luxury uppercase bg-gold hover:bg-gold-dark text-white px-5 py-2 rounded border border-gold transition-all duration-300 font-medium hover:shadow-lg hover:shadow-gold/20"
              >
                Zarejestruj
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu toggle (Right aligned on mobile) */}
        <div className="flex justify-end items-center gap-3 md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 border border-gold/20 text-primary rounded"
          >
            {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-light border-b border-gold/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`text-left font-sans text-base tracking-luxury uppercase py-2 border-b border-gold/5 ${
                    activeTab === item.id
                      ? 'text-gold font-medium'
                      : 'text-primary/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {currentUser ? (
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-gold/15">
                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-primary"
                  >
                    <User size={18} className="text-gold" />
                    <span>{currentUser.username}</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <LogOut size={16} />
                    <span>Wyloguj</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-gold/15">
                  <button
                    onClick={() => {
                      onOpenAuth('login');
                      setIsOpen(false);
                    }}
                    className="w-full text-center border border-gold/20 text-primary py-2.5 rounded font-sans tracking-luxury uppercase"
                  >
                    Zaloguj się
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth('signup');
                      setIsOpen(false);
                    }}
                    className="w-full text-center bg-gold text-white py-2.5 rounded font-sans font-medium tracking-luxury uppercase"
                  >
                    Utwórz konto
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

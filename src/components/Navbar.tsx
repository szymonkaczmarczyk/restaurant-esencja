import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Menu as MenuIcon, X, CalendarDays } from 'lucide-react';
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

  const openReservation = () => {
    setActiveTab('reservation');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-light border-b border-gold/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 grid grid-cols-2 md:grid-cols-3 items-center">
        
        <button
          type="button"
          className="flex justify-start w-fit"
          onClick={() => setActiveTab('home')}
          aria-label="Esencja, strona główna"
        >
          <Logo className="h-10" />
        </button>

        <div className="hidden md:flex justify-center items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative font-sans text-sm transition-colors duration-300 py-2 px-1 ${
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
                aria-label="Wyloguj się"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="flex items-center gap-2 text-sm font-sans text-primary/70 hover:text-gold transition-colors duration-200 py-2"
            >
              <User size={16} />
              Zaloguj się
            </button>
          )}
          <button
            onClick={openReservation}
            className="group flex items-center gap-2 text-sm font-sans bg-gold hover:bg-gold-dark text-neutralDark px-5 h-11 rounded font-medium transition-colors duration-300"
          >
            <CalendarDays size={16} className="transition-transform duration-300 group-hover:-translate-y-px" />
            Zarezerwuj stolik
          </button>
        </div>

        <div className="flex justify-end items-center gap-2 md:hidden">
          <button
            onClick={openReservation}
            className="flex shrink-0 items-center gap-2 h-11 px-3 sm:px-4 bg-gold text-neutralDark rounded font-sans text-sm font-medium"
          >
            <CalendarDays size={16} />
            Rezerwuj
          </button>
          <button
            onClick={toggleMenu}
            className="flex shrink-0 items-center justify-center w-11 h-11 border border-gold/20 text-primary rounded"
            aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

      </div>

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
                  className={`text-left font-sans text-base py-2 border-b border-gold/5 ${
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
                <div className="flex items-center justify-between gap-4 pt-4 mt-2 border-t border-gold/15 font-sans text-sm">
                  <button
                    onClick={() => {
                      onOpenAuth('login');
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 min-h-11 text-primary"
                  >
                    <User size={16} className="text-gold" />
                    Zaloguj się
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth('signup');
                      setIsOpen(false);
                    }}
                    className="min-h-11 text-primary/70 underline underline-offset-4 decoration-gold/40"
                  >
                    Załóż konto
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

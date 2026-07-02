import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Lock, User as UserIcon } from 'lucide-react';
import type { User } from '../types';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
  onLoginSuccess: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ isOpen, onClose, initialMode, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Handle Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (!usernameOrEmail || !email || !phone || !password) {
        setError('Proszę wypełnić wszystkie pola.');
        return;
      }

      // Check if email already exists
      const existingUser = localStorage.getItem(`user_${email}`);
      if (existingUser) {
        setError('Użytkownik o podanym adresie email już istnieje.');
        return;
      }

      const newUser: User = {
        username: usernameOrEmail,
        email: email,
        phone: phone,
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage
      localStorage.setItem(`user_${email}`, JSON.stringify({ ...newUser, password }));
      // Store index by username too
      localStorage.setItem(`username_${usernameOrEmail}`, email);

      onLoginSuccess(newUser);
      onClose();
    } else {
      if (!usernameOrEmail || !password) {
        setError('Proszę podać login oraz hasło.');
        return;
      }

      // Resolve email if username was provided
      let resolvedEmail = usernameOrEmail;
      if (!usernameOrEmail.includes('@')) {
        const foundEmail = localStorage.getItem(`username_${usernameOrEmail}`);
        if (!foundEmail) {
          setError('Nieprawidłowe dane logowania.');
          return;
        }
        resolvedEmail = foundEmail;
      }

      const userRaw = localStorage.getItem(`user_${resolvedEmail}`);
      if (!userRaw) {
        setError('Użytkownik nie istnieje.');
        return;
      }

      const userData = JSON.parse(userRaw);
      if (userData.password !== password) {
        setError('Niepoprawne hasło.');
        return;
      }

      const loggedInUser: User = {
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        createdAt: userData.createdAt,
      };

      onLoginSuccess(loggedInUser);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-neutralLight dark:bg-neutralDark border border-gold/20 p-8 rounded shadow-2xl z-10 transition-colors duration-300"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-primary/60 dark:text-neutralDark-text/60 hover:text-gold dark:hover:text-gold transition-colors duration-200"
            >
              <X size={20} />
            </button>

            {/* Modal Title */}
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl text-primary dark:text-gold font-light tracking-wide uppercase">
                {mode === 'login' ? 'Zaloguj się' : 'Stwórz konto'}
              </h2>
              <p className="font-sans text-xs text-primary/60 dark:text-neutralDark-text/60 mt-2 tracking-wider">
                {mode === 'login' ? 'Zaloguj się do konta restauracji Esencja' : 'Zarejestruj się, aby móc rezerwować stoliki online'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-sm">
              {error && (
                <div className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2.5 rounded text-xs">
                  {error}
                </div>
              )}

              {/* Username field (Shared) */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-primary/60 dark:text-neutralDark-text/60 mb-1.5">
                  {mode === 'login' ? 'Email lub Nazwa Użytkownika' : 'Nazwa Użytkownika'}
                </label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                  <input
                    type="text"
                    required
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    className="w-full bg-neutralLight-alt dark:bg-neutralDark-alt text-primary dark:text-neutralDark-text border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none pl-11 pr-4 py-3 rounded transition-all duration-300 shadow-inner"
                    placeholder={mode === 'login' ? 'e.g. jan_kowalski' : 'e.g. jan_kowalski'}
                  />
                </div>
              </div>

              {/* Email (only on Signup) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary/60 dark:text-neutralDark-text/60 mb-1.5">
                    Adres Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutralLight-alt dark:bg-neutralDark-alt text-primary dark:text-neutralDark-text border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none pl-11 pr-4 py-3 rounded transition-all duration-300 shadow-inner"
                      placeholder="e.g. jan@example.com"
                    />
                  </div>
                </div>
              )}

              {/* Phone (only on Signup) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary/60 dark:text-neutralDark-text/60 mb-1.5">
                    Numer Telefonu
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutralLight-alt dark:bg-neutralDark-alt text-primary dark:text-neutralDark-text border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none pl-11 pr-4 py-3 rounded transition-all duration-300 shadow-inner"
                      placeholder="e.g. +48 123 456 789"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-primary/60 dark:text-neutralDark-text/60 mb-1.5">
                  Hasło
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutralLight-alt dark:bg-neutralDark-alt text-primary dark:text-neutralDark-text border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none pl-11 pr-4 py-3 rounded transition-all duration-300 shadow-inner"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-white dark:text-neutralDark font-sans font-semibold tracking-luxury uppercase py-3.5 rounded mt-4 border border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/15"
              >
                {mode === 'login' ? 'Zaloguj się' : 'Utwórz konto'}
              </button>

              {/* Mode switcher link */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login');
                    setError('');
                  }}
                  className="text-xs text-gold hover:text-gold-light transition-colors duration-200 underline font-light"
                >
                  {mode === 'login'
                    ? 'Nie posiadasz jeszcze konta? Zarejestruj się'
                    : 'Masz już konto? Zaloguj się'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

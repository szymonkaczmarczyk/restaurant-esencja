import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Lock, User as UserIcon } from 'lucide-react';
import type { User } from '../types';
import { isValidPhone } from '../utils/validation';

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

  useEffect(() => {
    if (!isOpen) return;
    setMode(initialMode);
    setUsernameOrEmail('');
    setEmail('');
    setPhone('');
    setPassword('');
    setError('');
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      const username = usernameOrEmail.trim();
      const normalizedEmail = email.trim().toLowerCase();
      if (!username || !normalizedEmail || !phone || !password) {
        setError('Proszę wypełnić wszystkie pola.');
        return;
      }
      if (username.includes('@')) {
        setError('Nazwa użytkownika nie może zawierać znaku @.');
        return;
      }
      if (!isValidPhone(phone)) {
        setError('Podaj poprawny numer telefonu (9 cyfr, opcjonalnie z +48).');
        return;
      }
      if (password.length < 6) {
        setError('Hasło musi mieć co najmniej 6 znaków.');
        return;
      }

      if (localStorage.getItem(`user_${normalizedEmail}`)) {
        setError('Użytkownik o podanym adresie email już istnieje.');
        return;
      }
      if (localStorage.getItem(`username_${username.toLowerCase()}`)) {
        setError('Ta nazwa użytkownika jest już zajęta.');
        return;
      }

      const newUser: User = {
        username,
        email: normalizedEmail,
        phone: phone.trim(),
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(`user_${normalizedEmail}`, JSON.stringify({ ...newUser, password }));
      localStorage.setItem(`username_${username.toLowerCase()}`, normalizedEmail);

      onLoginSuccess(newUser);
      onClose();
    } else {
      if (!usernameOrEmail || !password) {
        setError('Proszę podać login oraz hasło.');
        return;
      }

      const login = usernameOrEmail.trim().toLowerCase();
      let resolvedEmail = login;
      if (!login.includes('@')) {
        const foundEmail = localStorage.getItem(`username_${login}`) ?? localStorage.getItem(`username_${usernameOrEmail.trim()}`);
        if (!foundEmail) {
          setError('Nieprawidłowe dane logowania.');
          return;
        }
        resolvedEmail = foundEmail;
      }

      const userRaw = localStorage.getItem(`user_${resolvedEmail}`) ?? localStorage.getItem(`user_${usernameOrEmail.trim()}`);
      const userData = userRaw ? JSON.parse(userRaw) : null;
      if (!userData || userData.password !== password) {
        setError('Nieprawidłowe dane logowania.');
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="auth-title">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-neutralLight dark:bg-neutralDark border border-gold/20 p-8 rounded shadow-2xl z-10 transition-colors duration-300"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Zamknij"
              className="absolute top-4 right-4 text-primary/60 dark:text-neutralDark-text/60 hover:text-gold dark:hover:text-gold transition-colors duration-200"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-8">
              <h2 id="auth-title" className="font-serif text-3xl text-primary dark:text-gold font-light">
                {mode === 'login' ? 'Zaloguj się' : 'Stwórz konto'}
              </h2>
              <p className="font-sans text-xs text-primary/60 dark:text-neutralDark-text/60 mt-2 tracking-wider">
                {mode === 'login' ? 'Zaloguj się do konta restauracji Esencja' : 'Konto zapamięta Twoje rezerwacje, ulubione dania i oceny'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-sm">
              {error && (
                <div role="alert" className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2.5 rounded text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-widest text-primary/60 dark:text-neutralDark-text/60 mb-1.5">
                  {mode === 'login' ? 'E-mail lub nazwa użytkownika' : 'Nazwa użytkownika'}
                </label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                  <input
                    type="text"
                    required
                    autoFocus
                    autoComplete="username"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    className="w-full bg-neutralLight-alt dark:bg-neutralDark-alt text-primary dark:text-neutralDark-text border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none pl-11 pr-4 py-3 rounded transition-all duration-300 shadow-inner"
                    placeholder={mode === 'login' ? 'np. jan_kowalski lub jan@example.com' : 'np. jan_kowalski'}
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary/60 dark:text-neutralDark-text/60 mb-1.5">
                    Adres e-mail
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutralLight-alt dark:bg-neutralDark-alt text-primary dark:text-neutralDark-text border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none pl-11 pr-4 py-3 rounded transition-all duration-300 shadow-inner"
                      placeholder="np. jan@example.com"
                    />
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary/60 dark:text-neutralDark-text/60 mb-1.5">
                    Numer telefonu
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutralLight-alt dark:bg-neutralDark-alt text-primary dark:text-neutralDark-text border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none pl-11 pr-4 py-3 rounded transition-all duration-300 shadow-inner"
                      placeholder="np. 500 600 700"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-widest text-primary/60 dark:text-neutralDark-text/60 mb-1.5">
                  Hasło
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gold/60" />
                  <input
                    type="password"
                    required
                    minLength={mode === 'signup' ? 6 : undefined}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutralLight-alt dark:bg-neutralDark-alt text-primary dark:text-neutralDark-text border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none pl-11 pr-4 py-3 rounded transition-all duration-300 shadow-inner"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-dark text-neutralDark dark:text-neutralDark font-sans font-semibold py-3.5 rounded mt-4 border border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/15"
              >
                {mode === 'login' ? 'Zaloguj się' : 'Utwórz konto'}
              </button>

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
                    ? 'Nie masz jeszcze konta? Załóż konto'
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

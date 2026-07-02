import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Heart, Star, Trash2, CalendarDays } from 'lucide-react';
import type { User, Reservation } from '../types';
import { menuDishes } from '../data/menuData';

interface DashboardProps {
  currentUser: User | null;
  setActiveTab: (tab: string) => void;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser, setActiveTab }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'reservations' | 'favorites' | 'ratings' | 'payments'>('reservations');

  // Load user data
  useEffect(() => {
    if (currentUser) {
      // Reservations
      const userResRaw = localStorage.getItem(`reservations_${currentUser.email}`);
      setReservations(userResRaw ? JSON.parse(userResRaw) : []);

      // Favorites
      const userFavsRaw = localStorage.getItem(`favs_${currentUser.email}`);
      setFavorites(userFavsRaw ? JSON.parse(userFavsRaw) : []);

      // Ratings
      const userRatingsRaw = localStorage.getItem(`ratings_${currentUser.email}`);
      setRatings(userRatingsRaw ? JSON.parse(userRatingsRaw) : {});

      // Payments
      const paymentsRaw = localStorage.getItem(`history_${currentUser.email}`);
      setTransactions(paymentsRaw ? JSON.parse(paymentsRaw) : []);
    }
  }, [currentUser]);

  // Cancel reservation
  const handleCancelReservation = (resId: string) => {
    if (!currentUser) return;

    // Filter from user list
    const updatedUserRes = reservations.filter(res => res.id !== resId);
    setReservations(updatedUserRes);
    localStorage.setItem(`reservations_${currentUser.email}`, JSON.stringify(updatedUserRes));

    // Filter from system-wide index
    const systemResRaw = localStorage.getItem('esencja_all_reservations');
    const systemRes: Reservation[] = systemResRaw ? JSON.parse(systemResRaw) : [];
    const updatedSystemRes = systemRes.filter(res => res.id !== resId);
    localStorage.setItem('esencja_all_reservations', JSON.stringify(updatedSystemRes));

    // Add refund transaction simulation
    const refundTransaction: Transaction = {
      id: `RF-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      description: `Zwrot Kaucji - Anulowano Rezerwację`,
      amount: -50,
      date: new Date().toLocaleDateString('pl-PL'),
      status: 'Zwrócono'
    };
    const updatedTransactions = [refundTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem(`history_${currentUser.email}`, JSON.stringify(updatedTransactions));
  };

  // Remove dish from favorites
  const handleRemoveFavorite = (dishId: string) => {
    if (!currentUser) return;
    const updatedFavs = favorites.filter(id => id !== dishId);
    setFavorites(updatedFavs);
    localStorage.setItem(`favs_${currentUser.email}`, JSON.stringify(updatedFavs));
  };

  // Delete/Reset dish rating
  const handleRemoveRating = (dishId: string) => {
    if (!currentUser) return;
    const updatedRatings = { ...ratings };
    delete updatedRatings[dishId];
    setRatings(updatedRatings);
    localStorage.setItem(`ratings_${currentUser.email}`, JSON.stringify(updatedRatings));
  };

  if (!currentUser) return null;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-neutralLight dark:bg-neutralDark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Profile Card Header */}
        <div className="p-8 glass-light dark:glass border border-gold/15 rounded flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Panel Klienta</span>
            <h1 className="font-serif text-3xl md:text-4xl text-primary dark:text-gold font-light tracking-wide">
              Witaj, {currentUser.username}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-primary/60 dark:text-neutralDark-text/60 mt-1">
              <span>Email: {currentUser.email}</span>
              <span className="hidden md:inline text-gold">•</span>
              <span>Telefon: {currentUser.phone}</span>
            </div>
          </div>
          
          <button
            onClick={() => setActiveTab('reservation')}
            className="bg-gold hover:bg-gold-dark text-white dark:text-neutralDark font-sans font-semibold tracking-luxury uppercase px-6 py-3 rounded border border-gold transition-all duration-300 text-sm shadow-md"
          >
            Zarezerwuj Nowy Stolik
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-gold/10 gap-8 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'reservations', label: 'Moje Rezerwacje', icon: CalendarDays },
            { id: 'favorites', label: 'Ulubione Dania', icon: Heart },
            { id: 'ratings', label: 'Moje Oceny', icon: Star },
            { id: 'payments', label: 'Historia Transakcji', icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 font-sans text-sm tracking-luxury uppercase pb-4 border-b-2 transition-all duration-300 flex-shrink-0 ${
                  activeSubTab === tab.id
                    ? 'border-gold text-gold font-medium'
                    : 'border-transparent text-primary/60 dark:text-neutralDark-text/60 hover:text-gold'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* Reservations Tab */}
            {activeSubTab === 'reservations' && (
              <motion.div
                key="reservations"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-4"
              >
                {reservations.length === 0 ? (
                  <div className="text-center py-16 border border-gold/10 rounded glass-light dark:glass text-primary/50 dark:text-neutralDark-text/50 font-light flex flex-col items-center gap-2">
                    <CalendarDays size={32} className="text-gold/40" />
                    <p className="font-sans text-sm">Nie masz jeszcze żadnych rezerwacji.</p>
                  </div>
                ) : (
                  reservations.map((res) => (
                    <div
                      key={res.id}
                      className="p-6 glass-light dark:glass border border-gold/10 rounded flex flex-col md:flex-row items-center justify-between gap-6 hover:border-gold/30 transition-colors duration-200"
                    >
                      <div className="flex flex-col gap-1.5 text-center md:text-left">
                        <span className="text-xs text-gold uppercase font-semibold tracking-wider">
                          {res.tableName}
                        </span>
                        <div className="font-serif text-xl text-primary dark:text-gold font-light mt-0.5">
                          Termin: {res.date} r. o godz. {res.timeSlot}
                        </div>
                        <div className="font-sans text-xs text-primary/60 dark:text-neutralDark-text/60 flex items-center gap-4 mt-1.5 justify-center md:justify-start">
                          <span>Goście: {res.guestsCount} {res.guestsCount === 1 ? 'osoba' : res.guestsCount < 5 ? 'osoby' : 'osób'}</span>
                          <span>Czas trwania: {res.duration || '2h'}</span>
                        </div>
                        {res.notes && (
                          <div className="text-xs text-primary/55 dark:text-neutralDark-text/55 italic mt-2 bg-black/5 dark:bg-white/5 p-2 rounded">
                            Uwagi: {res.notes}
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleCancelReservation(res.id)}
                        className="flex items-center gap-2 border border-red-500/30 hover:border-red-500 text-red-500 dark:text-red-400 hover:bg-red-500/10 font-sans text-xs tracking-luxury uppercase px-4 py-2.5 rounded transition-all duration-200"
                      >
                        <Trash2 size={14} />
                        Anuluj Rezerwację
                      </button>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {/* Favorites Tab */}
            {activeSubTab === 'favorites' && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {favorites.length === 0 ? (
                  <div className="col-span-full text-center py-16 border border-gold/10 rounded glass-light dark:glass text-primary/50 dark:text-neutralDark-text/50 font-light flex flex-col items-center gap-2">
                    <Heart size={32} className="text-gold/40" />
                    <p className="font-sans text-sm">Brak ulubionych dań. Dodaj je w Menu!</p>
                  </div>
                ) : (
                  menuDishes
                    .filter(dish => favorites.includes(dish.id))
                    .map((dish) => (
                      <div
                        key={dish.id}
                        className="glass-light dark:glass border border-gold/10 rounded overflow-hidden flex flex-col justify-between h-full hover:border-gold/30 transition-colors duration-200"
                      >
                        <div className="h-44 overflow-hidden">
                          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col gap-4 justify-between flex-grow">
                          <div className="flex flex-col gap-1">
                            <h3 className="font-serif text-lg text-primary dark:text-gold font-medium">{dish.name}</h3>
                            <p className="font-sans text-xs text-primary/60 dark:text-neutralDark-text/60 line-clamp-2">{dish.description}</p>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-gold/5">
                            <span className="font-serif text-sm text-gold font-medium">{dish.price} zł</span>
                            <button
                              onClick={() => handleRemoveFavorite(dish.id)}
                              className="text-red-500 dark:text-red-400 hover:bg-red-500/10 p-2 rounded"
                              title="Usuń z ulubionych"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </motion.div>
            )}

            {/* Ratings Tab */}
            {activeSubTab === 'ratings' && (
              <motion.div
                key="ratings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-4"
              >
                {Object.keys(ratings).length === 0 ? (
                  <div className="text-center py-16 border border-gold/10 rounded glass-light dark:glass text-primary/50 dark:text-neutralDark-text/50 font-light flex flex-col items-center gap-2">
                    <Star size={32} className="text-gold/40" />
                    <p className="font-sans text-sm">Nie oceniłeś jeszcze żadnych potraw.</p>
                  </div>
                ) : (
                  menuDishes
                    .filter(dish => dish.id in ratings)
                    .map((dish) => (
                      <div
                        key={dish.id}
                        className="p-5 glass-light dark:glass border border-gold/10 rounded flex items-center justify-between gap-6 hover:border-gold/30 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-4">
                          <img src={dish.image} alt={dish.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex flex-col gap-0.5">
                            <h3 className="font-serif text-lg text-primary dark:text-gold font-medium">{dish.name}</h3>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] uppercase font-semibold text-gold">Twoja Ocena:</span>
                              <div className="flex">
                                {[...Array(ratings[dish.id])].map((_, i) => (
                                  <Star key={i} size={14} fill="#B59A57" color="#B59A57" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveRating(dish.id)}
                          className="text-primary/40 dark:text-neutralDark-text/40 hover:text-red-500 dark:hover:text-red-400 p-2 rounded"
                          title="Usuń ocenę"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                )}
              </motion.div>
            )}

            {/* Payments Tab */}
            {activeSubTab === 'payments' && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-4 font-sans"
              >
                {transactions.length === 0 ? (
                  <div className="text-center py-16 border border-gold/10 rounded glass-light dark:glass text-primary/50 dark:text-neutralDark-text/50 font-light flex flex-col items-center gap-2">
                    <CreditCard size={32} className="text-gold/40" />
                    <p className="font-sans text-sm">Brak historii płatności.</p>
                  </div>
                ) : (
                  <div className="glass-light dark:glass border border-gold/10 rounded overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gold/10 border-b border-gold/10 uppercase tracking-widest text-[10px] text-primary/70 dark:text-neutralDark-text/70">
                          <tr>
                            <th className="px-6 py-4">ID Transakcji</th>
                            <th className="px-6 py-4">Opis</th>
                            <th className="px-6 py-4">Kwota</th>
                            <th className="px-6 py-4">Data</th>
                            <th className="px-6 py-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gold/5 text-primary/80 dark:text-neutralDark-text/80">
                          {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-gold/5 transition-colors duration-150">
                              <td className="px-6 py-4 font-semibold text-gold">{tx.id}</td>
                              <td className="px-6 py-4">{tx.description}</td>
                              <td className={`px-6 py-4 font-medium ${tx.amount < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                {tx.amount > 0 ? `+${tx.amount}` : tx.amount} zł
                              </td>
                              <td className="px-6 py-4 text-xs">{tx.date}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                  tx.status === 'Zwrócono' 
                                    ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                                    : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                }`}>
                                  {tx.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

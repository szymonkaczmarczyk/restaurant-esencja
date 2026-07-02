import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Award, Coffee, Soup, Utensils, GlassWater } from 'lucide-react';
import { menuDishes } from '../data/menuData';
import type { User } from '../types';

interface MenuProps {
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Menu: React.FC<MenuProps> = ({ currentUser, onOpenAuth }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'starters' | 'mains' | 'desserts' | 'drinks'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  // Sync favorites & ratings from localStorage
  useEffect(() => {
    if (currentUser) {
      const userFavs = localStorage.getItem(`favs_${currentUser.email}`);
      const userRatings = localStorage.getItem(`ratings_${currentUser.email}`);
      
      setFavorites(userFavs ? JSON.parse(userFavs) : []);
      setRatings(userRatings ? JSON.parse(userRatings) : {});
    } else {
      setFavorites([]);
      setRatings({});
    }
  }, [currentUser]);

  // Handle Like/Favorite toggle
  const handleToggleFavorite = (dishId: string) => {
    if (!currentUser) {
      onOpenAuth('login');
      return;
    }

    const updatedFavs = favorites.includes(dishId)
      ? favorites.filter(id => id !== dishId)
      : [...favorites, dishId];

    setFavorites(updatedFavs);
    localStorage.setItem(`favs_${currentUser.email}`, JSON.stringify(updatedFavs));
  };

  // Handle Rate dish
  const handleRateDish = (dishId: string, ratingValue: number) => {
    if (!currentUser) {
      onOpenAuth('login');
      return;
    }

    const updatedRatings = { ...ratings, [dishId]: ratingValue };
    setRatings(updatedRatings);
    localStorage.setItem(`ratings_${currentUser.email}`, JSON.stringify(updatedRatings));
  };

  // Filter dishes
  const filteredDishes = activeCategory === 'all'
    ? menuDishes
    : menuDishes.filter(dish => dish.category === activeCategory);

  const categories = [
    { id: 'all', label: 'Wszystkie', icon: Utensils },
    { id: 'starters', label: 'Przystawki', icon: Soup },
    { id: 'mains', label: 'Dania Główne', icon: Utensils },
    { id: 'desserts', label: 'Desery', icon: Coffee },
    { id: 'drinks', label: 'Napoje & Wina', icon: GlassWater },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-neutralLight dark:bg-neutralDark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Kulinarna Podróż</span>
          <h1 className="font-serif text-4xl md:text-6xl text-primary dark:text-gold font-light tracking-wide mt-3 uppercase">
            Menu Esencja
          </h1>
          <div className="h-0.5 w-16 bg-gold mx-auto mt-4 mb-6" />
          <p className="font-sans text-sm text-primary/70 dark:text-neutralDark-text/70 max-w-xl mx-auto font-light leading-relaxed">
            Prezentujemy państwu nasze autorskie menu. Każde danie to starannie zbilansowana esencja smaków, przygotowywana na świeżo z najwyższej jakości składników.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-2 font-sans text-sm tracking-luxury uppercase px-5 py-3 rounded border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gold border-gold text-white dark:text-neutralDark font-medium'
                    : 'border-gold/25 text-primary/80 dark:text-neutralDark-text/80 hover:border-gold hover:text-gold'
                }`}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dishes Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => {
              const isFav = favorites.includes(dish.id);
              const userRating = ratings[dish.id] || 0;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={dish.id}
                  className="glass-light dark:glass rounded overflow-hidden shadow-lg border border-gold/10 hover:border-gold/30 transition-colors duration-300 flex flex-col h-full"
                >
                  {/* Photo Container */}
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Chef Special Badge */}
                    {dish.isChefSpecial && (
                      <span className="absolute top-4 left-4 bg-gold text-neutralDark text-xs font-sans font-semibold tracking-wider px-3 py-1 uppercase rounded-full flex items-center gap-1 shadow-md">
                        <Award size={12} />
                        Szef Poleca
                      </span>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={() => handleToggleFavorite(dish.id)}
                      className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 border ${
                        isFav 
                          ? 'bg-red-500/20 border-red-500 text-red-500 hover:bg-red-500/30' 
                          : 'bg-black/30 border-white/20 text-white hover:bg-black/50 hover:border-gold hover:text-gold'
                      }`}
                      title={isFav ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                    >
                      <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-baseline gap-2">
                        <h3 className="font-serif text-2xl text-primary dark:text-gold font-light tracking-wide leading-tight">
                          {dish.name}
                        </h3>
                        <span className="font-serif text-xl text-gold font-medium flex-shrink-0">
                          {dish.price} zł
                        </span>
                      </div>
                      <p className="font-sans text-sm text-primary/70 dark:text-neutralDark-text/70 font-light leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Ratings and Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-[10px] uppercase tracking-wider text-primary/50 dark:text-neutralDark-text/50">
                          Twoja Ocena
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRateDish(dish.id, star)}
                              className="text-gold/40 hover:text-gold transition-colors duration-150"
                              title={`Oceń na ${star} gwiazdek`}
                            >
                              <Star
                                size={16}
                                fill={star <= userRating ? "#B59A57" : "none"}
                                color="#B59A57"
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Info if not logged in */}
                      {!currentUser && (
                        <span className="text-[10px] font-sans font-light italic text-primary/40 dark:text-neutralDark-text/40">
                          Zaloguj się, aby oceniać
                        </span>
                      )}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

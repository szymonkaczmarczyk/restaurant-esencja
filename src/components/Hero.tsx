import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, Compass, Star } from 'lucide-react';
import { BlurText } from './BlurText';
import ScrollReveal from './ScrollReveal';
import { menuDishes } from '../data/menuData';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

interface Testimonial {
  id: number;
  text: string;
  author: string;
  rating: number;
}

const signatureDishes = menuDishes.filter((dish) => dish.isChefSpecial && dish.category !== 'drinks').slice(0, 3);

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Zarezerwowaliśmy lożę C1 i dokładnie ją dostaliśmy. Spokojnie, bez pośpiechu, obsługa pamiętała o alergii.",
    author: "Katarzyna i Robert, Warszawa",
    rating: 5,
  },
  {
    id: 2,
    text: "Żeberka odchodzą od kości, a glazura nie jest przesłodzona. Do tego kieliszek toskańskiego czerwonego i wieczór był udany.",
    author: "Marek Nowicki, krytyk kulinarny",
    rating: 5,
  },
  {
    id: 3,
    text: "Najbardziej podoba mi się, że wybieram konkretny stolik na planie sali. Na urodziny wzięłam stół bankietowy dla całej szóstki.",
    author: "Anna Kwiatkowska, Gdańsk",
    rating: 5,
  },
  {
    id: 4,
    text: "Przyszliśmy na deser i zostaliśmy na kolację. Brownie z ciepłym sosem czekoladowym zamówiłabym jeszcze raz.",
    author: "Janusz Wiśniewski, Poznań",
    rating: 5,
  },
  {
    id: 5,
    text: "Łosoś idealnie wysmażony, skóra chrupiąca. Kelner sam zaproponował wino do ryby i trafił. Wrócimy.",
    author: "Karolina i Piotr, Kraków",
    rating: 5,
  },
  {
    id: 6,
    text: "Kameralnie i bez nadęcia. Miska z tofu była lepsza niż niejedno danie mięsne, które jadłam w tym roku.",
    author: "dr Elżbieta Wójcik, Warszawa",
    rating: 5,
  }
];

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentTestimonialIdx]);

  const handleNextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const testimonialVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <div className="pt-20">

      <section className="relative min-h-[90vh] py-24 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full flex justify-start text-left text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-start gap-6 max-w-3xl"
          >
            <span className="font-sans text-xs md:text-sm tracking-[0.16em] md:tracking-[0.3em] text-gold uppercase font-medium">
              Krakowskie Przedmieście 4, Warszawa
            </span>

            <h1 className="flex flex-col items-start font-normal">
              <BlurText
                as="span"
                text="Sztuka ukryta"
                delay={60}
                animateBy="words"
                direction="top"
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none justify-start"
              />
              <BlurText
                as="span"
                text="w Esencji"
                delay={60}
                animateBy="words"
                direction="bottom"
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none justify-start text-gold italic mt-2"
              />
            </h1>

            <p className="font-sans text-base md:text-lg max-w-xl text-white/80 font-light leading-relaxed mt-2">
              Kolacja przy wybranym stoliku, bez dzwonienia. Sprawdź wolne miejsca na planie sali i zarezerwuj w minutę.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('reservation')}
                className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-neutralDark font-sans font-semibold px-9 py-4 rounded border border-gold transition-all duration-300 hover:shadow-xl hover:shadow-gold/30 cursor-pointer whitespace-nowrap"
              >
                <Calendar size={18} />
                Zarezerwuj stolik
              </motion.button>
              <div className="hidden sm:block h-6 w-px bg-white/20" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('menu')}
                className="flex items-center justify-center gap-2 hover:bg-white/10 text-white font-sans px-9 py-4 rounded border border-white/30 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Zobacz menu
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="font-sans text-xs tracking-widest uppercase">Przewiń</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-gold rounded-full"
          />
        </div>
      </section>

      <section className="py-24 bg-neutralLight dark:bg-neutralDark transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Kuchnia</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-gold font-light leading-tight">
              Sezonowe składniki, <br />
              <span className="italic">proste talerze</span>
            </h2>
            <div className="h-0.5 w-16 bg-gold my-2" />
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={2}
              blurStrength={6}
              textClassName="font-sans text-primary/80 dark:text-neutralDark-text/80 leading-relaxed font-light text-base"
              rotationEnd="bottom bottom-=20%"
              wordAnimationEnd="bottom bottom-=10%"
            >
              Gotujemy z tego, co akurat jest najlepsze na rynku. Kartę zmieniamy razem z sezonem, a każde danie ma kilka składników, które dobrze się rozumieją. Bez pianek dla samych pianek.
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="flex gap-3">
                <Compass className="text-gold flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-lg text-primary dark:text-gold font-medium">Lokalni dostawcy</h4>
                  <p className="font-sans text-xs text-primary/60 dark:text-neutralDark-text/60 mt-1">
                    Warzywa, mięso i ryby od dostawców, których znamy z imienia.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Star className="text-gold flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-lg text-primary dark:text-gold font-medium">Kuchnia na widoku</h4>
                  <p className="font-sans text-xs text-primary/60 dark:text-neutralDark-text/60 mt-1">
                    Z sali widać, jak powstaje Twoje danie.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[380px] w-full mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -1, zIndex: 40 }}
              transition={{ duration: 0.5 }}
              className="absolute left-[-20px] top-[-10px] w-52 h-44 rounded shadow-xl border border-gold/15 overflow-hidden z-10 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600"
                alt="Kucharz flambiruje danie na patelni"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1, zIndex: 40 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute right-[-20px] top-[20px] w-60 h-52 rounded shadow-2xl border border-gold/20 overflow-hidden z-20 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=600"
                alt="Szef kuchni wykańcza danie na talerzu"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -2, zIndex: 40 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute left-[120px] bottom-[-20px] w-52 h-40 rounded shadow-xl border border-gold/15 overflow-hidden z-30 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600"
                alt="Goście wznoszą toast czerwonym winem"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

        </div>
      </section>

      <section className="py-24 bg-neutralLight-alt dark:bg-neutralDark-alt transition-colors duration-300 overflow-hidden border-t border-gold/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-6 order-2 lg:order-1 relative h-[380px] w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1, zIndex: 40 }}
              transition={{ duration: 0.5 }}
              className="absolute left-[-20px] top-[10px] w-56 h-44 rounded shadow-xl border border-gold/15 overflow-hidden z-10 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=600"
                alt="Sala restauracji z widokiem przez okno"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -1, zIndex: 40 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute right-[-20px] top-[40px] w-52 h-44 rounded shadow-2xl border border-gold/20 overflow-hidden z-20 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
                alt="Sala restauracji wieczorem"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 7 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2, zIndex: 40 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute left-[130px] bottom-[-20px] w-56 h-44 rounded shadow-xl border border-gold/15 overflow-hidden z-30 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
                alt="Żeberka w glazurze barbecue na desce"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-6">
            <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Sala</span>
            <h3 className="font-serif text-3xl md:text-4xl text-primary dark:text-gold font-light leading-tight">
              Osiem stolików, w tym stół VIP
            </h3>
            <div className="h-0.5 w-16 bg-gold my-1" />
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur={true}
              baseRotation={2}
              blurStrength={6}
              textClassName="font-sans text-primary/80 dark:text-neutralDark-text/80 leading-relaxed font-light text-base"
              rotationEnd="bottom bottom-=20%"
              wordAnimationEnd="bottom bottom-=10%"
            >
              Stoliki od dwóch do ośmiu osób, dwie loże, stół bankietowy i stół VIP na większe kolacje. Na planie sali widzisz, które miejsca są wolne o wybranej godzinie, i rezerwujesz konkretny stolik.
            </ScrollReveal>

            <div className="flex items-center gap-12 mt-8 border-t border-gold/15 pt-8 justify-start">
              <div className="flex items-center gap-3">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                  <path d="M12 2L14.8 7.7L21 8.6L16.5 13L17.6 19.2L12 16.3L6.4 19.2L7.5 13L3 8.6L9.2 7.7L12 2Z" stroke="#B59A57" strokeWidth="1.5" fill="none" />
                  <path d="M12 5L13.8 8.8L18 9.4L15 12.4L15.7 16.6L12 14.6L8.3 16.6L9 12.4L6 9.4L10.2 8.8L12 5Z" fill="#B59A57" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-serif text-xs font-semibold tracking-[0.15em] text-gold">Michelin Guide</span>
                  <span className="font-sans text-[10px] text-primary/65 dark:text-neutralDark-text/65 uppercase tracking-wider">Rekomendacja 2026</span>
                </div>
              </div>

              <div className="h-8 w-px bg-gold/15" />

              <div className="flex items-center gap-3">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                  <path d="M12 3C7.58 3 4 6.58 4 11C4 14.08 5.74 16.74 8.28 18.06L7 22L12 20.5L17 22L15.72 18.06C18.26 16.74 20 14.08 20 11C20 6.58 16.42 3 12 3Z" stroke="#B59A57" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="11" r="5" fill="#B59A57" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-serif text-xs font-semibold tracking-[0.15em] text-gold">Champion de Qualité</span>
                  <span className="font-sans text-[10px] text-primary/65 dark:text-neutralDark-text/65 uppercase tracking-wider">Grand Prix</span>
                </div>
              </div>
            </div>
            <p className="font-sans text-[11px] text-primary/55 dark:text-neutralDark-text/55 mt-4">
              Wyróżnienia przykładowe - projekt demonstracyjny, restauracja ich nie otrzymała.
            </p>
          </div>

        </div>
      </section>

      <section className="py-24 bg-neutralLight dark:bg-neutralDark transition-colors duration-300 border-t border-b border-gold/5">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Szef poleca</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-gold font-light mt-3">
            Trzy dania na początek
          </h2>
          <div className="h-0.5 w-16 bg-gold mx-auto mt-4" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureDishes.map((dish, index) => (
            <motion.article
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="glass-light dark:glass rounded overflow-hidden shadow-xl border border-gold/10"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-gold text-neutralDark text-xs font-sans font-semibold px-3 py-1 rounded">Szef poleca</span>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-serif text-2xl text-primary dark:text-gold">{dish.name}</h3>
                  <span className="font-serif text-xl text-gold font-medium flex-shrink-0">{dish.price} zł</span>
                </div>
                <p className="font-sans text-sm text-primary/70 dark:text-neutralDark-text/70 font-light leading-relaxed mb-6">
                  {dish.description}
                </p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="text-gold-dark font-sans text-sm font-medium hover:text-gold transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                >
                  Zobacz w menu <ChevronRight size={14} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-24 bg-neutralLight-alt dark:bg-neutralDark-alt transition-colors duration-300 text-center relative overflow-hidden border-b border-gold/5">
        <div className="max-w-4xl mx-auto px-6 relative">
          <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Opinie gości</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-gold font-light mt-3 mb-12">
            Co mówią goście
          </h2>

          <div className="relative min-h-[220px] flex items-center justify-center px-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonialIdx}
                custom={direction}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonials[currentTestimonialIdx].rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#B59A57" color="#B59A57" />
                  ))}
                </div>

                <p className="font-serif text-xl md:text-2xl italic text-primary/95 dark:text-neutralDark-text/95 leading-relaxed font-light max-w-2xl">
                  „{testimonials[currentTestimonialIdx].text}”
                </p>

                <span className="font-sans text-sm tracking-wider uppercase font-semibold text-gold mt-6">
                  {testimonials[currentTestimonialIdx].author}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentTestimonialIdx ? 1 : -1);
                  setCurrentTestimonialIdx(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentTestimonialIdx === idx ? 'bg-gold w-6' : 'bg-gold/30'
                  }`}
              />
            ))}
          </div>

          <p className="font-sans text-xs text-primary/55 dark:text-neutralDark-text/55 mt-6">
            Opinie przykładowe, napisane na potrzeby projektu demonstracyjnego. Osoby nie istnieją.
          </p>

        </div>
      </section>

    </div>
  );
};

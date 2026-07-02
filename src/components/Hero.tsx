import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, Compass, Star } from 'lucide-react';
import { BlurText } from './BlurText';
import ScrollReveal from './ScrollReveal';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

interface Testimonial {
  id: number;
  text: string;
  author: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Wizyta w Esencji to nie tylko wyśmienity obiad, ale całe doznanie artystyczne. Obsługa na najwyższym poziomie, intymna atmosfera i jedzenie, które zachwyca zmysły.",
    author: "Katarzyna & Robert, Warszawa",
    rating: 5,
  },
  {
    id: 2,
    text: "Polędwica Wagyu dosłownie rozpływa się w ustach. Kunszt kulinarny na poziomie najlepszych światowych restauracji gwiazdkowych. Gorąco polecam!",
    author: "Marek Nowicki, Krytyk Kulinarny",
    rating: 5,
  },
  {
    id: 3,
    text: "Niezwykłe kompozycje smakowe i absolutnie unikalny design. Możliwość podglądu i rezerwacji konkretnego stolika online to genialne udogodnienie.",
    author: "Anna Kwiatkowska, Gdańsk",
    rating: 5,
  },
  {
    id: 4,
    text: "Wspaniała, nastrojowa atmosfera wieczorowa. Słodka 'Złota Esencja' to deserowy majstersztyk, który na stałe zapisał się w mojej pamięci.",
    author: "Janusz Wiśniewski, Poznań",
    rating: 5,
  },
  {
    id: 5,
    text: "Profesjonalizm personelu kelnerskiego i niesamowity dobór win. Halibut w sosie szafranowym to mistrzostwo świata. Wrócimy tu na pewno!",
    author: "Karolina & Piotr, Kraków",
    rating: 5,
  },
  {
    id: 6,
    text: "Luksus w czystej postaci. Od samego wejścia czuje się elitarny i kameralny charakter restauracji. Cada potrawa to oddzielna historia.",
    author: "dr Elżbieta Wójcik, Warszawa",
    rating: 5,
  }
];

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  // Auto rotate testimonials
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

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content (Left-aligned) */}
        <div className="relative max-w-7xl mx-auto px-6 w-full flex justify-start text-left text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-start gap-6 max-w-3xl"
          >
            <span className="font-sans text-sm tracking-[0.3em] text-gold uppercase font-medium">
              Ekskluzywna Podróż Kulinarna
            </span>

            <div className="flex flex-col items-start">
              <BlurText
                text="Sztuka ukryta"
                delay={60}
                animateBy="words"
                direction="top"
                className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-luxury font-light leading-none justify-start"
              />
              <BlurText
                text="w Esencji"
                delay={60}
                animateBy="words"
                direction="bottom"
                className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-luxury font-light leading-none justify-start text-gold italic mt-2"
              />
            </div>

            <p className="font-sans text-base md:text-lg max-w-xl text-white/80 font-light leading-relaxed mt-2">
              Odkryj harmonię smaku i luksusu w samym sercu stolicy. Nasza kuchnia to harmonijne połączenie tradycji oraz nowoczesnych technik kulinarnych.
            </p>
          </motion.div>
        </div>

        {/* Bottom-center CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="absolute bottom-36 left-1/2 translate-x-[-53%] flex flex-col sm:flex-row items-center gap-4 z-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('reservation')}
            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-neutralDark font-sans font-semibold tracking-luxury uppercase px-9 py-4 rounded border border-gold transition-all duration-300 hover:shadow-xl hover:shadow-gold/30 cursor-pointer whitespace-nowrap"
          >
            <Calendar size={18} />
            Rezerwuj Stolik
          </motion.button>
          <div className="hidden sm:block h-6 w-px bg-white/20" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('menu')}
            className="flex items-center justify-center gap-2 hover:bg-white/10 text-white font-sans tracking-luxury uppercase px-9 py-4 rounded border border-white/30 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Poznaj Menu
            <ChevronRight size={18} />
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="font-sans text-xs tracking-widest uppercase">Przewiń</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-gold rounded-full"
          />
        </div>
      </section>

      {/* Philosophy Section 1 (Text Left, Scattered Collage Right) */}
      <section className="py-24 bg-neutralLight dark:bg-neutralDark transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Text Left (7 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Nasza Filozofia</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-gold font-light leading-tight">
              Pasja, Perfekcja, <br />
              <span className="italic">Niezrównany Smak</span>
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
              W restauracji „Esencja” wierzymy, że jedzenie to nie tylko potrzeba, ale przede wszystkim sztuka. Każdy talerz to starannie skomponowane dzieło, w którym łączymy najlepsze, lokalne składniki sezonowe z nowoczesnymi technikami kulinarnymi z całego świata.
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="flex gap-3">
                <Compass className="text-gold flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-lg text-primary dark:text-gold font-medium">Lokalne Produkty</h4>
                  <p className="font-sans text-xs text-primary/60 dark:text-neutralDark-text/60 mt-1">
                    Składniki od sprawdzonych, ekologicznych dostawców.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Star className="text-gold flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-serif text-lg text-primary dark:text-gold font-medium">Kunszt Szefów Kuchni</h4>
                  <p className="font-sans text-xs text-primary/60 dark:text-neutralDark-text/60 mt-1">
                    Dania tworzone przez mistrzów z międzynarodowym doświadczeniem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scattered Collage Right (6 cols) - Wider offsets to spread photos across layout */}
          <div className="lg:col-span-6 relative h-[380px] w-full mt-10 lg:mt-0">
            {/* Image 1: Main kitchen action (rotated left, background) */}
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
                alt="Kuchnia w Ogniu"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Image 2: Chef Plating (rotated right, foreground overlap) */}
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
                alt="Szef Plating"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Image 3: Wine cellars (rotated left, bottom overlap) */}
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
                alt="Luksusowe Wina"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Philosophy Section 2 (Scattered Collage Left, Text Right) */}
      <section className="py-24 bg-neutralLight-alt dark:bg-neutralDark-alt transition-colors duration-300 overflow-hidden border-t border-gold/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Scattered Collage Left (6 cols) - Wider offsets to spread photos across layout */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative h-[380px] w-full">
            {/* Image 4: Beautiful Interior (rotated right, background) */}
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
                alt="Wnętrze Esencja"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Image 5: Table Setting Detail (rotated left, foreground) */}
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
                alt="Stolik Wieczorny"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Image 6: Gourmet dish close-up (rotated right, bottom) */}
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
                alt="Zbliżenie Detali Kuchni"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Text Right (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-6">
            <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold font-medium">Mistrzowski Kunszt</span>
            <h3 className="font-serif text-3xl md:text-4xl text-primary dark:text-gold font-light leading-tight">
              Prestiż w Każdym Calu
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
              Dbamy o każdy szczegół – od selekcji win z najlepszych światowych winnic, przez unikalny, nastrojowy design wnętrza, aż po najwyższy standard obsługi kelnerskiej. Chcemy, aby każda wizyta u nas była zapisanym w pamięci przeżyciem zmysłowym.
            </ScrollReveal>

            {/* Michelin & Culinary Awards Inline Panel */}
            <div className="flex items-center gap-12 mt-8 border-t border-gold/15 pt-8 justify-start">
              <div className="flex items-center gap-3">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                  <path d="M12 2L14.8 7.7L21 8.6L16.5 13L17.6 19.2L12 16.3L6.4 19.2L7.5 13L3 8.6L9.2 7.7L12 2Z" stroke="#B59A57" strokeWidth="1.5" fill="none" />
                  <path d="M12 5L13.8 8.8L18 9.4L15 12.4L15.7 16.6L12 14.6L8.3 16.6L9 12.4L6 9.4L10.2 8.8L12 5Z" fill="#B59A57" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-serif text-xs font-semibold tracking-[0.15em] text-gold uppercase">Michelin Guide</span>
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
                  <span className="font-serif text-xs font-semibold tracking-[0.15em] text-gold uppercase">Champion de Qualité</span>
                  <span className="font-sans text-[10px] text-primary/65 dark:text-neutralDark-text/65 uppercase tracking-wider">Grand Prix</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Signature Dishes */}
      <section className="py-24 bg-neutralLight dark:bg-neutralDark transition-colors duration-300 border-t border-b border-gold/5">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Polecane przez Szefa Kuchni</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-gold font-light mt-3">
            Kulinarne Dzieła Sztuki
          </h2>
          <div className="h-0.5 w-16 bg-gold mx-auto mt-4" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Disabled Hover Lift */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-light dark:glass rounded overflow-hidden shadow-xl border border-gold/10"
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
                alt="Tatar z Jelenia"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-gold text-neutralDark text-xs font-sans font-semibold tracking-wider px-3 py-1 uppercase rounded-full">Specjał</span>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl text-primary dark:text-gold mb-2">Tatar z Jelenia</h3>
              <p className="font-sans text-sm text-primary/70 dark:text-neutralDark-text/70 font-light leading-relaxed mb-6">
                Ręcznie siekana polędwica z jelenia, marynowane rydze, oliwa truflowa, konfitowane żółtko i emulsja z czosnku niedźwiedziego.
              </p>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-gold font-sans text-sm font-medium hover:text-gold-light transition-colors duration-200 flex items-center gap-1 uppercase tracking-wider cursor-pointer"
              >
                Zobacz w Menu <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* Card 2 - Disabled Hover Lift */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-light dark:glass rounded overflow-hidden shadow-xl border border-gold/10"
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
                alt="Wagyu Steak"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-gold text-neutralDark text-xs font-sans font-semibold tracking-wider px-3 py-1 uppercase rounded-full">Specjał</span>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl text-primary dark:text-gold mb-2">Polędwica Wagyu</h3>
              <p className="font-sans text-sm text-primary/70 dark:text-neutralDark-text/70 font-light leading-relaxed mb-6">
                Najwyższej jakości wołowina Wagyu A5, fondant ziemniaczany z rozmarynem, glazurowane smardze i bogaty sos z porto.
              </p>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-gold font-sans text-sm font-medium hover:text-gold-light transition-colors duration-200 flex items-center gap-1 uppercase tracking-wider cursor-pointer"
              >
                Zobacz w Menu <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* Card 3 - Disabled Hover Lift */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-light dark:glass rounded overflow-hidden shadow-xl border border-gold/10"
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800"
                alt="Złoty Fondant"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-gold text-neutralDark text-xs font-sans font-semibold tracking-wider px-3 py-1 uppercase rounded-full">Specjał</span>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-2xl text-primary dark:text-gold mb-2">Złota Esencja</h3>
              <p className="font-sans text-sm text-primary/70 dark:text-neutralDark-text/70 font-light leading-relaxed mb-6">
                Płynny czekoladowy fondant Valrhona ozdobiony płatkami 24-karatowego jadalnego złota, lody z palonego masła, marakuja.
              </p>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-gold font-sans text-sm font-medium hover:text-gold-light transition-colors duration-200 flex items-center gap-1 uppercase tracking-wider cursor-pointer"
              >
                Zobacz w Menu <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutralLight-alt dark:bg-neutralDark-alt transition-colors duration-300 text-center relative overflow-hidden border-b border-gold/5">
        <div className="max-w-4xl mx-auto px-6 relative">
          <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Opinie gości</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary dark:text-gold font-light mt-3 mb-12">
            Niezapomniane Doświadczenia
          </h2>

          <div className="relative min-h-[220px] flex items-center justify-center px-4">
            {/* Carousel Content */}
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
                  "{testimonials[currentTestimonialIdx].text}"
                </p>

                <span className="font-sans text-sm tracking-wider uppercase font-semibold text-gold mt-6">
                  {testimonials[currentTestimonialIdx].author}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
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

        </div>
      </section>

    </div>
  );
};

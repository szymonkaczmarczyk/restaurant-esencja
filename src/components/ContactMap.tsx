import React from 'react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

export const ContactMap: React.FC = () => {
  const destinationAddress = "Krakowskie Przedmieście 4, 00-071 Warszawa";

  const handleNavigate = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationAddress)}`;
    window.open(mapsUrl, '_blank', 'noopener');
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-neutralLight dark:bg-neutralDark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Kontakt</span>
          <h1 className="font-serif text-4xl md:text-6xl text-primary dark:text-gold font-light mt-3">
            Jak do nas trafić
          </h1>
          <div className="h-0.5 w-16 bg-gold mx-auto mt-4 mb-6" />
          <p className="font-sans text-sm text-primary/70 dark:text-neutralDark-text/70 max-w-xl mx-auto font-light leading-relaxed">
            Krakowskie Przedmieście 4, pięć minut pieszo od placu Zamkowego. Zadzwoń, jeśli planujesz kolację dla więcej niż ośmiu osób albo zamknięte wydarzenie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 glass-light dark:glass border border-gold/15 rounded flex-grow flex flex-col justify-between">
              
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="font-serif text-2xl text-primary dark:text-gold mb-4">Esencja, Warszawa</h3>
                  <p className="font-sans text-sm text-primary/70 dark:text-neutralDark-text/70 font-light leading-relaxed">
                    Jedna sala, osiem stolików, w tym stół VIP na osiem osób. Wolne miejsca sprawdzisz na planie sali w zakładce rezerwacji.
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-gold/10 border border-gold/20 rounded text-gold h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-primary/50 dark:text-neutralDark-text/50 mb-0.5">Adres</span>
                      <span className="font-sans text-sm text-primary dark:text-neutralDark-text font-medium">
                        Krakowskie Przedmieście 4, 00-071 Warszawa
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-gold/10 border border-gold/20 rounded text-gold h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-primary/50 dark:text-neutralDark-text/50 mb-0.5">Telefon rezerwacje</span>
                      <a href="tel:+48221234567" className="font-sans text-sm text-primary dark:text-neutralDark-text font-medium hover:text-gold transition-colors duration-200">
                        +48 22 123 45 67
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-gold/10 border border-gold/20 rounded text-gold h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-primary/50 dark:text-neutralDark-text/50 mb-0.5">Napisz do nas</span>
                      <a href="mailto:kontakt@restauracja-esencja.pl" className="font-sans text-sm text-primary dark:text-neutralDark-text font-medium hover:text-gold transition-colors duration-200">
                        kontakt@restauracja-esencja.pl
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-gold/10">
                <button
                  onClick={handleNavigate}
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-neutralDark dark:text-neutralDark font-sans font-semibold py-4 rounded border border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/15"
                >
                  <Navigation size={18} />
                  Nawiguj do lokalu
                </button>
                <p className="text-[10px] font-sans text-center text-primary/50 dark:text-neutralDark-text/50 mt-2 font-light">
                  Otwiera trasę w Mapach Google z Twojej obecnej lokalizacji.
                </p>
              </div>

            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <div className="glass-light dark:glass border border-gold/15 rounded overflow-hidden flex-grow min-h-[400px] h-full relative">
              <iframe
                title="Mapa dojazdu do restauracji Esencja"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.4357065096173!2d21.014299977508316!3d52.2354999719875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a083321%3A0x6b297c5553e1a0ad!2sKrakowskie%20Przedmie%C5%9Bcie%204%2C%2000-333%20Warszawa!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
                className="w-full h-full border-none absolute inset-0 filter invert-[0.1] dark:invert-[0.9] dark:hue-rotate-[180deg] transition-all duration-300"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

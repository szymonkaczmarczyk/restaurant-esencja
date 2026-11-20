import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-neutralLight-alt border-t border-gold/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          
          <div className="flex flex-col justify-start md:h-[160px]">
            <div className="h-7 flex items-center mb-2.5">
              <Logo className="h-8" showText={true} />
            </div>
            <p className="font-sans text-xs text-primary/70 leading-relaxed pr-2">
              Restauracja przy Krakowskim Przedmieściu z rezerwacją konkretnego stolika online.
            </p>
          </div>

          <div className="flex flex-col justify-start md:h-[160px]">
            <h3 className="font-serif text-sm text-primary h-7 flex items-center mb-3">Nawigacja</h3>
            <ul className="flex flex-col gap-2.5 font-sans text-xs text-primary/70">
              <li>
                <button onClick={() => setActiveTab('menu')} className="hover:text-gold transition-colors duration-200 cursor-pointer">Menu</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reservation')} className="hover:text-gold transition-colors duration-200 cursor-pointer">Rezerwacja stolika</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-gold transition-colors duration-200 cursor-pointer">Kontakt i dojazd</button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-start md:h-[160px]">
            <h3 className="font-serif text-sm text-primary h-7 flex items-center mb-3">Godziny otwarcia</h3>
            <ul className="flex flex-col gap-3 font-sans text-xs text-primary/70">
              <li className="flex items-center gap-2">
                <Clock size={13} className="text-gold flex-shrink-0" />
                <span>pon.-czw. 12:00-22:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={13} className="text-gold flex-shrink-0" />
                <span>pt.-sob. 12:00-23:30</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={13} className="text-gold flex-shrink-0" />
                <span>niedz. 12:00-21:00</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-start md:h-[160px]">
            <h3 className="font-serif text-sm text-primary h-7 flex items-center mb-3">Kontakt</h3>
            <ul className="flex flex-col gap-3 font-sans text-xs text-primary/70">
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-gold flex-shrink-0 mt-0.5" />
                <span>Krakowskie Przedmieście 4, Warszawa</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-gold flex-shrink-0" />
                <a href="tel:+48221234567" className="hover:text-gold transition-colors duration-200">+48 22 123 45 67</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-gold flex-shrink-0" />
                <a href="mailto:kontakt@restauracja-esencja.pl" className="hover:text-gold transition-colors duration-200">kontakt@restauracja-esencja.pl</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gold/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-primary/50">
            © {new Date().getFullYear()} Restauracja Esencja. Projekt demonstracyjny.
          </p>
          <p className="font-sans text-xs text-primary/40">
            Dane kontaktowe są przykładowe.
          </p>
        </div>
      </div>
    </footer>
  );
};

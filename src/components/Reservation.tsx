import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, Info, CheckCircle2, User as UserIcon, Phone, Mail, X } from 'lucide-react';
import type { User, Reservation as ReservationData } from '../types';
import canvasConfetti from 'canvas-confetti';

interface ReservationProps {
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

interface TableLayout {
  id: string;
  name: string;
  capacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
}

export const Reservation: React.FC<ReservationProps> = ({ currentUser, onOpenAuth }) => {
  const [selectedTable, setSelectedTable] = useState<TableLayout | null>(null);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('2h');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [bookedTableIds, setBookedTableIds] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const tables: TableLayout[] = [
    { id: 'T1', name: 'Stolik dwuosobowy T1', capacity: 2, x: 60, y: 75, width: 55, height: 55, rx: 6 },
    { id: 'T2', name: 'Stolik dwuosobowy T2', capacity: 2, x: 60, y: 205, width: 55, height: 55, rx: 6 },
    { id: 'T3', name: 'Stolik czteroosobowy T3', capacity: 4, x: 185, y: 75, width: 85, height: 55, rx: 8 },
    { id: 'T4', name: 'Stolik czteroosobowy T4', capacity: 4, x: 185, y: 205, width: 85, height: 55, rx: 8 },
    { id: 'C1', name: 'Loża komfortowa C1', capacity: 4, x: 340, y: 75, width: 95, height: 55, rx: 8 },
    { id: 'C2', name: 'Loża komfortowa C2', capacity: 4, x: 340, y: 205, width: 95, height: 55, rx: 8 },
    { id: 'T7', name: 'Stół bankietowy T7', capacity: 6, x: 505, y: 130, width: 100, height: 70, rx: 10 },
    { id: 'V1', name: 'Królewski Stół VIP', capacity: 8, x: 685, y: 90, width: 130, height: 85, rx: 10 },
  ];

  useEffect(() => {
    if (currentUser) { setName(currentUser.username); setPhone(currentUser.phone); setEmail(currentUser.email); }
    else { setName(''); setPhone(''); setEmail(''); }
  }, [currentUser]);

  useEffect(() => {
    const raw = localStorage.getItem('esencja_all_reservations');
    setReservations(raw ? JSON.parse(raw) : []);
  }, [successMessage]);

  useEffect(() => {
    if (date && timeSlot) {
      const booked = reservations.filter(r => r.date === date && r.timeSlot === timeSlot).map(r => r.tableId);
      setBookedTableIds(booked);
      if (selectedTable && booked.includes(selectedTable.id)) setSelectedTable(null);
    } else { setBookedTableIds([]); }
  }, [date, timeSlot, reservations]);

  const handleTableClick = (table: TableLayout) => {
    if (bookedTableIds.includes(table.id)) return;
    setSelectedTable(table);
    setGuestsCount(table.capacity);
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!/^[0-9]{9}$/.test(phone.replace(/\s+/g, ''))) e.phone = 'Numer telefonu musi składać się z dokładnie 9 cyfr.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Podaj poprawny adres e-mail.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleReserve = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!selectedTable || !date || !timeSlot || !validateForm()) return;

    const res: ReservationData = {
      id: Math.random().toString(36).substring(2, 9), tableId: selectedTable.id, tableName: selectedTable.name,
      date, timeSlot, duration, guestsCount, customerName: name, customerPhone: phone, notes, createdAt: new Date().toISOString(),
    };

    const targetEmail = currentUser ? currentUser.email : email;
    const userRes = JSON.parse(localStorage.getItem(`reservations_${targetEmail}`) || '[]');
    localStorage.setItem(`reservations_${targetEmail}`, JSON.stringify([res, ...userRes]));
    localStorage.setItem('esencja_all_reservations', JSON.stringify([res, ...reservations]));

    if (currentUser) {
      const hist = JSON.parse(localStorage.getItem(`history_${currentUser.email}`) || '[]');
      hist.unshift({ id: `TX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`, description: `Rezerwacja - ${selectedTable.name}`, amount: guestsCount * 50, date: new Date().toLocaleDateString('pl-PL'), status: 'Opłacona (Kaucja)' });
      localStorage.setItem(`history_${currentUser.email}`, JSON.stringify(hist));
    }

    canvasConfetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#B59A57', '#2C3531', '#F9F8F3'] });
    if (!currentUser) setShowSignupPrompt(true); else setSuccessMessage(true);
    setSelectedTable(null);
    setNotes('');
  };

  const renderChair = (cx: number, cy: number, rot: number, sel: boolean, booked: boolean) => {
    const fill = sel ? '#B59A57' : booked ? '#7F1D1D' : '#F4F1EA';
    const stroke = sel ? '#B59A57' : booked ? '#F87171' : '#B59A57';
    const dot = sel ? '#F9F8F3' : booked ? '#FCA5A5' : '#B59A57';
    return (
      <g transform={`translate(${cx},${cy}) rotate(${rot})`}>
        <path d="M -9,-8 Q 0,-13 9,-8" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <rect x="-8" y="-6" width="16" height="13" rx="3" fill={fill} stroke={stroke} strokeWidth="1.1" />
        <circle cx="0" cy="1" r="1.5" fill={dot} opacity="0.8" />
      </g>
    );
  };

  const W = '#B59A57';
  const WO = 0.35;
  const WW = 2;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-neutralLight transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.2em] text-gold uppercase font-semibold">Zarezerwuj Doświadczenie</span>
          <h1 className="font-serif text-4xl md:text-6xl text-primary font-light tracking-wide mt-3 uppercase">Plan Sali & Rezerwacja</h1>
          <div className="h-0.5 w-16 bg-gold mx-auto mt-4 mb-6" />
          <p className="font-sans text-sm text-primary/70 max-w-xl mx-auto font-light leading-relaxed">Wybierz preferowaną datę i godzinę, aby sprawdzić dostępność stolików. Kliknij wolny stolik na planie i dokończ rezerwację.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 flex flex-col gap-6 h-full">
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 glass-light border border-gold/15 rounded shadow-lg">
              <div>
                <label className="block text-xs uppercase tracking-widest text-primary/60 mb-2.5 flex items-center gap-1.5 font-medium"><Calendar size={14} className="text-gold" /> Data Wizyty</label>
                <input type="date" required min={new Date().toISOString().split('T')[0]} value={date} onChange={e => setDate(e.target.value)} className="w-full bg-neutralLight-alt text-primary border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none p-3.5 rounded font-sans text-sm transition-all duration-300 shadow-inner" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-primary/60 mb-2.5 flex items-center gap-1.5 font-medium"><Clock size={14} className="text-gold" /> Godzina</label>
                <select required value={timeSlot} onChange={e => setTimeSlot(e.target.value)} className="w-full bg-neutralLight-alt text-primary border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none p-3.5 rounded font-sans text-sm transition-all duration-300 shadow-inner appearance-none cursor-pointer" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23B59A57\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', paddingRight: '40px' }}>
                  <option value="">Wybierz godzinę</option>
                  {['12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-primary/60 mb-2.5 flex items-center gap-1.5 font-medium"><Users size={14} className="text-gold" /> Liczba gości</label>
                <select value={guestsCount} onChange={e => setGuestsCount(parseInt(e.target.value))} disabled={!selectedTable} className="w-full bg-neutralLight-alt text-primary border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none p-3.5 rounded font-sans text-sm transition-all duration-300 shadow-inner disabled:opacity-50 appearance-none cursor-pointer" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23B59A57\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', paddingRight: '40px' }}>
                  {[...Array(selectedTable ? selectedTable.capacity : 8)].map((_, i) => <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'osoba' : i < 4 ? 'osoby' : 'osób'}</option>)}
                </select>
              </div>
            </div>

            {/* Map */}
            <div className="relative glass-light border border-gold/15 rounded p-6 flex flex-col justify-between shadow-lg transition-all duration-300 flex-grow min-h-[520px]">
              {!date || !timeSlot ? (
                <div className="absolute inset-0 bg-neutralLight/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-20">
                  <Info className="text-gold mb-3 animate-pulse" size={32} />
                  <h3 className="font-serif text-xl text-primary uppercase tracking-wider mb-2">Interaktywny Plan Sali</h3>
                  <p className="font-sans text-xs text-primary/60 max-w-sm">Aby odblokować podgląd wolnych stolików, proszę wybrać <strong>Datę</strong> oraz <strong>Godzinę</strong>.</p>
                </div>
              ) : null}

              <div className="w-full flex-grow flex items-center justify-center">
                <svg viewBox="0 0 900 520" className="w-full h-full select-none">

                  {/* ========== ROOM FILLS ========== */}
                  <rect x="630" y="30" width="240" height="300" fill="#B59A57" opacity="0.04" />
                  <rect x="30" y="330" width="150" height="130" fill="#2C3531" opacity="0.04" />
                  <rect x="180" y="330" width="160" height="130" fill="#B59A57" opacity="0.05" />
                  <rect x="540" y="330" width="160" height="130" fill="#2C3531" opacity="0.04" />
                  <rect x="700" y="330" width="170" height="130" fill="#2C3531" opacity="0.03" />

                  {/* ========== OUTER WALLS ========== */}
                  <line x1="30" y1="30" x2="870" y2="30" stroke={W} strokeWidth={WW} opacity={WO} />
                  <line x1="30" y1="30" x2="30" y2="460" stroke={W} strokeWidth={WW} opacity={WO} />
                  <line x1="870" y1="30" x2="870" y2="460" stroke={W} strokeWidth={WW} opacity={WO} />
                  <line x1="30" y1="460" x2="420" y2="460" stroke={W} strokeWidth={WW} opacity={WO} />
                  <line x1="470" y1="460" x2="870" y2="460" stroke={W} strokeWidth={WW} opacity={WO} />

                  {/* ========== DIVIDER WALL y=330 (with WC door gap at x: 80-120) ========== */}
                  <line x1="30" y1="330" x2="80" y2="330" stroke={W} strokeWidth={WW} opacity={WO} />
                  <line x1="120" y1="330" x2="390" y2="330" stroke={W} strokeWidth={WW} opacity={WO} />
                  <line x1="500" y1="330" x2="870" y2="330" stroke={W} strokeWidth={WW} opacity={WO} />

                  {/* ========== VIP WALL x=630 ========== */}
                  <line x1="630" y1="30" x2="630" y2="230" stroke={W} strokeWidth={WW+0.2} opacity={WO} />
                  <line x1="630" y1="280" x2="630" y2="330" stroke={W} strokeWidth={WW+0.2} opacity={WO} />

                  {/* ========== SERVICE ROOM DIVIDERS ========== */}
                  {/* x=180 (WC | Szatnia) — continuous, no door */}
                  <line x1="180" y1="330" x2="180" y2="460" stroke={W} strokeWidth={WW} opacity={WO} />

                  {/* x=340 (Szatnia | Lobby) — gap y: 380-420 for szatnia door */}
                  <line x1="340" y1="330" x2="340" y2="380" stroke={W} strokeWidth={WW} opacity={WO} />
                  <line x1="340" y1="420" x2="340" y2="460" stroke={W} strokeWidth={WW} opacity={WO} />

                  {/* x=540 (Lobby | WC) — gap y: 380-420 for WC door */}
                  <line x1="540" y1="330" x2="540" y2="380" stroke={W} strokeWidth={WW} opacity={WO} />
                  <line x1="540" y1="420" x2="540" y2="460" stroke={W} strokeWidth={WW} opacity={WO} />

                  {/* x=700 (WC | Zaplecze) — continuous, no door */}
                  <line x1="700" y1="330" x2="700" y2="460" stroke={W} strokeWidth={WW} opacity={WO} />

                  {/* ========== DOOR SWINGS (all arcs flipped to convex) ========== */}

                  {/* Main Entrance (y=460, gap x: 420→470, swings outward/down) */}
                  <line x1="420" y1="460" x2="420" y2="510" stroke={W} strokeWidth="1.5" opacity="0.55" />
                  <path d="M 420,510 A 50,50 0 0,0 470,460" fill="none" stroke={W} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />

                  {/* WC left door (y=330, gap x: 80→120, swings DOWN into WC room) */}
                  <line x1="80" y1="330" x2="80" y2="370" stroke={W} strokeWidth="1.5" opacity="0.5" />
                  <path d="M 80,370 A 40,40 0 0,0 120,330" fill="none" stroke={W} strokeWidth="1" strokeDasharray="3,3" opacity="0.35" />

                  {/* Szatnia door (x=340, gap y: 380→420, swings LEFT into szatnia) */}
                  <line x1="340" y1="380" x2="300" y2="380" stroke={W} strokeWidth="1.5" opacity="0.5" />
                  <path d="M 300,380 A 40,40 0 0,0 340,420" fill="none" stroke={W} strokeWidth="1" strokeDasharray="3,3" opacity="0.35" />

                  {/* WC right door (x=540, gap y: 380→420, swings RIGHT into WC) */}
                  <line x1="540" y1="380" x2="580" y2="380" stroke={W} strokeWidth="1.5" opacity="0.5" />
                  <path d="M 580,380 A 40,40 0 0,1 540,420" fill="none" stroke={W} strokeWidth="1" strokeDasharray="3,3" opacity="0.35" />

                  {/* VIP door (x=630, gap y: 230→280, swings RIGHT into VIP) */}
                  <line x1="630" y1="230" x2="680" y2="230" stroke={W} strokeWidth="1.8" opacity="0.5" />
                  <path d="M 680,230 A 50,50 0 0,1 630,280" fill="none" stroke={W} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />

                  {/* ========== PASSAGE ARCHWAY MARKERS ========== */}
                  <rect x="387" y="324" width="6" height="12" rx="1" fill={W} opacity="0.25" />
                  <rect x="497" y="324" width="6" height="12" rx="1" fill={W} opacity="0.25" />

                  {/* ========== ROOM LABELS ========== */}
                  <text x="105" y="400" textAnchor="middle" fill={W} className="font-serif text-[11px] tracking-widest font-bold" opacity="0.55">WC</text>
                  <text x="260" y="400" textAnchor="middle" fill={W} className="font-serif text-[10px] tracking-widest font-semibold" opacity="0.55">SZATNIA</text>
                  <text x="620" y="400" textAnchor="middle" fill={W} className="font-serif text-[11px] tracking-widest font-bold" opacity="0.55">WC</text>
                  <text x="785" y="400" textAnchor="middle" fill={W} className="font-serif text-[9px] tracking-widest font-semibold" opacity="0.45">ZAPLECZE</text>
                  <text x="445" y="355" textAnchor="middle" fill={W} className="font-sans text-[8px] tracking-[0.2em] font-semibold" opacity="0.5">LOBBY</text>
                  <text x="445" y="490" textAnchor="middle" fill={W} className="font-sans text-[8px] tracking-widest font-semibold" opacity="0.65">WEJŚCIE</text>
                  <text x="750" y="310" textAnchor="middle" fill={W} className="font-serif text-[9px] tracking-[0.25em] font-semibold" opacity="0.55">SALA VIP</text>

                  {/* ========== TABLES ========== */}
                  {tables.map((table) => {
                    const isBooked = bookedTableIds.includes(table.id);
                    const isSelected = selectedTable?.id === table.id;
                    const fill = isSelected ? '#B59A57' : isBooked ? '#FEE2E2' : '#FBF9F4';
                    const stroke = isSelected ? '#B59A57' : isBooked ? '#F87171' : '#B59A57';
                    const txt = isSelected ? '#F9F8F3' : isBooked ? '#991B1B' : '#2C3531';

                    return (
                      <g key={table.id} onClick={() => handleTableClick(table)} className={`${isBooked ? 'cursor-not-allowed' : 'cursor-pointer'} transition-all duration-300`}>
                        <rect x={table.x} y={table.y} width={table.width} height={table.height} rx={table.rx || 0} fill={fill} stroke={stroke} strokeWidth={isSelected ? 2.5 : 1.5} />

                        {table.capacity === 2 && (<>
                          {renderChair(table.x + table.width/2, table.y - 12, 0, isSelected, isBooked)}
                          {renderChair(table.x + table.width/2, table.y + table.height + 12, 180, isSelected, isBooked)}
                        </>)}

                        {table.capacity === 4 && (<>
                          {renderChair(table.x + 25, table.y - 12, 0, isSelected, isBooked)}
                          {renderChair(table.x + table.width - 25, table.y - 12, 0, isSelected, isBooked)}
                          {renderChair(table.x + 25, table.y + table.height + 12, 180, isSelected, isBooked)}
                          {renderChair(table.x + table.width - 25, table.y + table.height + 12, 180, isSelected, isBooked)}
                        </>)}

                        {table.capacity === 6 && (<>
                          {renderChair(table.x + 22, table.y - 12, 0, isSelected, isBooked)}
                          {renderChair(table.x + table.width/2, table.y - 12, 0, isSelected, isBooked)}
                          {renderChair(table.x + table.width - 22, table.y - 12, 0, isSelected, isBooked)}
                          {renderChair(table.x + 22, table.y + table.height + 12, 180, isSelected, isBooked)}
                          {renderChair(table.x + table.width/2, table.y + table.height + 12, 180, isSelected, isBooked)}
                          {renderChair(table.x + table.width - 22, table.y + table.height + 12, 180, isSelected, isBooked)}
                        </>)}

                        {table.capacity === 8 && (<>
                          {renderChair(table.x + 30, table.y - 12, 0, isSelected, isBooked)}
                          {renderChair(table.x + table.width/2, table.y - 12, 0, isSelected, isBooked)}
                          {renderChair(table.x + table.width - 30, table.y - 12, 0, isSelected, isBooked)}
                          {renderChair(table.x + 30, table.y + table.height + 12, 180, isSelected, isBooked)}
                          {renderChair(table.x + table.width/2, table.y + table.height + 12, 180, isSelected, isBooked)}
                          {renderChair(table.x + table.width - 30, table.y + table.height + 12, 180, isSelected, isBooked)}
                          {renderChair(table.x - 12, table.y + table.height/2, 270, isSelected, isBooked)}
                          {renderChair(table.x + table.width + 12, table.y + table.height/2, 90, isSelected, isBooked)}
                        </>)}

                        <text x={table.x + table.width/2} y={table.y + table.height/2 - 2} textAnchor="middle" fill={txt} className="font-serif text-xs font-bold select-none">{table.id}</text>
                        <text x={table.x + table.width/2} y={table.y + table.height/2 + 12} textAnchor="middle" fill={txt} className="font-sans text-[9px] opacity-85 select-none font-medium">({table.capacity} os.)</text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Legend */}
              <div className="border-t border-gold/15 pt-5 mt-4 flex flex-wrap items-center justify-center gap-6 font-sans text-xs">
                <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 bg-[#FBF9F4] border border-[#B59A57] rounded-sm" /><span className="text-primary/75">Wolny stolik</span></div>
                <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 bg-[#FEE2E2] border border-[#F87171] rounded-sm" /><span className="text-primary/75">Zajęty stolik</span></div>
                <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 bg-[#B59A57] border border-[#B59A57] rounded-sm" /><span className="text-primary/75">Twój wybór</span></div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-4 h-full flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {successMessage ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="p-8 glass-light border border-emerald-500/20 rounded shadow-xl text-center flex flex-col items-center gap-4 h-full justify-center">
                  <CheckCircle2 size={48} className="text-emerald-500 animate-bounce" />
                  <h3 className="font-serif text-2xl text-primary uppercase tracking-wider">Potwierdzono!</h3>
                  <p className="font-sans text-sm text-primary/70 leading-relaxed font-light">Twoja rezerwacja została pomyślnie zarejestrowana.</p>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSuccessMessage(false)} className="mt-4 w-full bg-gold hover:bg-gold-dark text-white font-sans font-semibold tracking-luxury uppercase py-3.5 rounded transition-all duration-300">Nowa Rezerwacja</motion.button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 glass-light border border-gold/15 rounded shadow-xl h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-primary uppercase tracking-wider mb-6 pb-3 border-b border-gold/15">Dane rezerwacji</h3>
                    {selectedTable ? (
                      <form onSubmit={handleReserve} className="flex flex-col gap-4 font-sans text-sm">
                        <div className="p-4 bg-gold/10 border border-gold/20 rounded flex flex-col gap-1.5 shadow-sm">
                          <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Wybrany stolik</span>
                          <span className="font-serif text-lg text-primary font-medium leading-none">{selectedTable.name}</span>
                          <span className="text-xs text-primary/70 mt-1 font-light">Pojemność: {selectedTable.capacity} gości</span>
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-primary/60 mb-2 flex items-center gap-1.5 font-medium"><UserIcon size={12} className="text-gold" /> Imię i nazwisko</label>
                          <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-neutralLight-alt text-primary border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none p-3 rounded text-sm transition-all duration-300 shadow-inner" placeholder="np. Jan Kowalski" />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-primary/60 mb-1.5 flex items-center gap-1.5 font-medium"><Phone size={12} className="text-gold" /> Telefon kontaktowy</label>
                          <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className={`w-full bg-neutralLight-alt text-primary border outline-none p-3 rounded text-sm transition-all duration-300 shadow-inner ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold'}`} placeholder="np. 500600700" />
                          {errors.phone && <span className="text-[11px] text-red-500 mt-1 block">{errors.phone}</span>}
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-primary/60 mb-1.5 flex items-center gap-1.5 font-medium"><Mail size={12} className="text-gold" /> Adres E-mail</label>
                          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={`w-full bg-neutralLight-alt text-primary border outline-none p-3 rounded text-sm transition-all duration-300 shadow-inner ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold'}`} placeholder="np. jan@example.com" />
                          {errors.email && <span className="text-[11px] text-red-500 mt-1 block">{errors.email}</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-primary/60 mb-2 font-medium">Czas rezerwacji</label>
                            <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-neutralLight-alt text-primary border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none p-3 rounded text-sm transition-all duration-300 shadow-inner appearance-none cursor-pointer" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23B59A57\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundPosition: 'right 8px center', backgroundRepeat: 'no-repeat', paddingRight: '28px' }}>
                              <option value="1.5h">1.5 godziny</option><option value="2h">2 godziny</option><option value="2.5h">2.5 godziny</option><option value="3h">3 godziny</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-primary/60 mb-2 font-medium">Liczba gości</label>
                            <select value={guestsCount} onChange={e => setGuestsCount(parseInt(e.target.value))} className="w-full bg-neutralLight-alt text-primary border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none p-3 rounded text-sm transition-all duration-300 shadow-inner appearance-none cursor-pointer" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'%23B59A57\' height=\'20\' viewBox=\'0 0 24 24\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundPosition: 'right 8px center', backgroundRepeat: 'no-repeat', paddingRight: '28px' }}>
                              {[...Array(selectedTable.capacity)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-primary/60 mb-2 font-medium">Uwagi (alergie, preferencje)</label>
                          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full bg-neutralLight-alt text-primary border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold outline-none p-3 rounded text-sm resize-none transition-all duration-300 shadow-inner" placeholder="Wpisz opcjonalne uwagi..." />
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gold hover:bg-gold-dark text-white font-sans font-semibold tracking-luxury uppercase py-3.5 rounded mt-2 border border-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/15 cursor-pointer">Potwierdź rezerwację</motion.button>
                      </form>
                    ) : (
                      <div className="py-16 text-center text-primary/50 font-light flex flex-col items-center justify-center gap-2">
                        <Info size={24} className="text-gold/50" />
                        <p className="font-sans text-xs">Wybierz wolny stolik na planie sali, aby wypełnić formularz rezerwacji.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Signup Prompt Modal */}
      <AnimatePresence>
        {showSignupPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSignupPrompt(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-neutralLight border border-gold/20 p-8 rounded shadow-2xl z-10 text-center flex flex-col gap-6">
              <button onClick={() => setShowSignupPrompt(false)} className="absolute top-4 right-4 text-primary/60 hover:text-gold transition-colors duration-200"><X size={20} /></button>
              <div className="flex flex-col items-center gap-2">
                <CheckCircle2 size={44} className="text-emerald-500" />
                <h3 className="font-serif text-2xl text-primary uppercase tracking-wider">Rezerwacja Zapisana!</h3>
                <p className="font-sans text-xs text-primary/60">Dziękujemy, {name}. Twoja rezerwacja została pomyślnie złożona.</p>
              </div>
              <div className="border-t border-b border-gold/15 py-5 text-left flex flex-col gap-3.5">
                <h4 className="font-serif text-base text-primary uppercase tracking-wide">Załóż konto i zyskaj korzyści:</h4>
                <ul className="font-sans text-xs text-primary/85 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span><span><strong>Zarządzanie online:</strong> Łatwe przeglądanie i anulowanie rezerwacji.</span></li>
                  <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span><span><strong>Ulubione dania:</strong> Dodawanie ulubionych pozycji z menu.</span></li>
                  <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span><span><strong>Historia transakcji:</strong> Pełny rejestr płatności.</span></li>
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => { setShowSignupPrompt(false); onOpenAuth('signup'); }} className="w-full bg-gold hover:bg-gold-dark text-white font-sans font-semibold tracking-luxury uppercase py-3.5 rounded border border-gold transition-all duration-300 shadow-md">Załóż Konto Teraz</button>
                <button onClick={() => setShowSignupPrompt(false)} className="w-full border border-gold/30 hover:border-gold hover:bg-gold/5 text-primary font-sans text-xs tracking-luxury uppercase py-3 rounded transition-all duration-300">Zamknij i przejdź do strony</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

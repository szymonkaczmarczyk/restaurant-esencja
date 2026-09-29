import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Reservation } from './components/Reservation';
import { Dashboard } from './components/Dashboard';
import { ContactMap } from './components/ContactMap';
import { Auth } from './components/Auth';
import type { User } from './types';
import './App.css';

// Each tab gets a URL hash so back/forward, refresh and shared links work
const TAB_HASHES: Record<string, string> = {
  home: '',
  menu: 'menu',
  reservation: 'rezerwacja',
  contact: 'kontakt',
  dashboard: 'panel',
};

const tabFromHash = (hash: string) => {
  const slug = hash.replace(/^#\/?/, '');
  return Object.keys(TAB_HASHES).find(tab => TAB_HASHES[tab] === slug) ?? 'home';
};

function App() {
  const [activeTab, setActiveTabState] = useState<string>(() => tabFromHash(window.location.hash));

  const setActiveTab = (tab: string) => {
    const hash = TAB_HASHES[tab] ?? '';
    if (tabFromHash(window.location.hash) !== tab) {
      window.history.pushState(null, '', hash ? `#${hash}` : window.location.pathname + window.location.search);
    }
    setActiveTabState(tab);
  };

  useEffect(() => {
    const onPop = () => setActiveTabState(tabFromHash(window.location.hash));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Hardcode light mode
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  // Read saved active user session on mount
  useEffect(() => {
    const sessionUser = localStorage.getItem('esencja_active_user');
    if (sessionUser) {
      try {
        setCurrentUser(JSON.parse(sessionUser));
      } catch (e) {
        console.error("Failed parsing user session", e);
      }
    } else if (activeTab === 'dashboard') {
      // #panel opened without a session: send the visitor home and offer login
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setActiveTabState('home');
      setAuthMode('login');
      setIsAuthOpen(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('esencja_active_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('esencja_active_user');
    if (activeTab === 'dashboard') {
      setActiveTab('home');
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutralLight text-neutralDark-textDark font-sans transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={handleOpenAuth}
      />

      {/* Pages Container */}
      <main>
        {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}
        {activeTab === 'menu' && (
          <Menu currentUser={currentUser} onOpenAuth={handleOpenAuth} />
        )}
        {activeTab === 'reservation' && (
          <Reservation currentUser={currentUser} onOpenAuth={handleOpenAuth} />
        )}
        {activeTab === 'contact' && <ContactMap />}
        {activeTab === 'dashboard' && currentUser && (
          <Dashboard currentUser={currentUser} setActiveTab={setActiveTab} />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Auth Dialog Modal */}
      <Auth
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;

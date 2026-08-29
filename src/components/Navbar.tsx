import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/useScrollReveal';
import { navigateToSection, navigate, type Route } from '@/router';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'blog', label: 'Blog' },
];

const SECTION_IDS = ['home', 'about', 'projects', 'experience', 'blog'];

interface NavbarProps {
  route: Route;
}

export default function Navbar({ route }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    setMobileOpen(false);
  }, [route]);

  const handleNavClick = (item: (typeof NAV_ITEMS)[number]) => {
    if (route.name !== 'home') {
      navigate({ name: 'home' });
      setTimeout(() => navigateToSection(item.id), 100);
    } else {
      navigateToSection(item.id);
    }
  };

  const isActive = (id: string) => {
    if (id === 'blog' && route.name === 'post') return true;
    return route.name === 'home' && activeSection === id;
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl">
      <div className="glass-pill rounded-full px-4 py-2 flex items-center justify-between shadow-lg">
        {/* Mobile brand */}
        <button
          onClick={() => { navigate({ name: 'home' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="md:hidden text-sm font-bold text-ink-900 tracking-tight"
        >
          Ashish
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(item.id)
                    ? 'bg-white/70 text-ink-900 shadow-sm'
                    : 'text-ink-600 hover:bg-white/40 hover:text-ink-900'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-white/40 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 glass rounded-3xl p-3 shadow-lg animate-fade-in">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    isActive(item.id)
                      ? 'bg-white/70 text-ink-900'
                      : 'text-ink-600 hover:bg-white/40'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

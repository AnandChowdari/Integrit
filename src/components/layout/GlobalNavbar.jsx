import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../config/site';

export default function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Captiongrit', path: '/products/captiongrit' },
    { name: 'Contact', path: '/#contact' },
  ];


  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-[690px] px-2 ${
        isScrolled ? 'top-4' : 'top-6'
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-2.5 rounded-full border border-white/10 bg-[#0c0c0f]/80 backdrop-blur-md shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] transition-all duration-300">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img src="/logo.svg" alt="Flogrit Logo" className="w-6 h-6 object-contain group-hover:scale-110 transition-transform rounded-md" />
          <span className="font-display font-bold text-base text-white tracking-wide">Flogrit</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between flex-grow pl-6">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-semibold tracking-wide transition-colors ${location.pathname === link.path
                    ? 'text-accent-primary'
                    : 'text-text-secondary hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            <Link
              to="/#contact"
              className="bg-accent-primary hover:bg-accent-secondary text-black px-5 py-2 rounded-full font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(198,255,52,0.15)] hover:shadow-[0_0_25px_rgba(198,255,52,0.3)] hover:-translate-y-0.5"
            >
              Book a Call
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+12px)] left-2 right-2 glass bg-[#0A0A0A]/95 p-6 flex flex-col gap-4 md:hidden shadow-2xl rounded-2xl border border-white/10"
          >
            <div className="flex flex-col gap-4 border-b border-white/10 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-base font-semibold text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              to="/#contact"
              className="bg-accent-primary text-black px-6 py-3.5 text-center font-extrabold text-sm uppercase tracking-wider rounded-xl mt-2"
            >
              Book a Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

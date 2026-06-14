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
    { name: 'Contact', path: '/contact' },
  ];


  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-full max-w-7xl px-4 ${
        isScrolled ? 'top-4' : 'top-6'
      }`}
    >
      <div className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
        isScrolled 
          ? 'glass shadow-2xl bg-[#0A0A0A]/60' 
          : 'bg-transparent'
      }`}>
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.jpg" alt="Integrit Logo" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform rounded-md" />
          <span className="font-display font-bold text-xl text-white tracking-wide">Integrit</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}


          </div>

          <div className="flex flex-col items-center">
            <Link
              to="/contact"
              className="bg-accent-primary hover:bg-accent-secondary text-black px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(198,255,52,0.15)] hover:shadow-[0_0_25px_rgba(198,255,52,0.3)] hover:-translate-y-0.5"
            >
              Book a Call
            </Link>
            {siteConfig.urgency.enabled && (
              <p className="text-[10px] font-mono text-text-secondary text-center mt-1">
                {siteConfig.urgency.spotsLeft} spots left this month
              </p>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
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
            className="absolute top-[calc(100%+12px)] left-4 right-4 glass bg-[#0A0A0A]/90 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4 border-b border-white/10 pb-4">
              {[...navLinks].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg font-medium text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              to="/contact"
              className="bg-accent-primary text-black px-6 py-4 text-center font-bold text-lg w-full rounded-xl mt-2"
            >
              Book a Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

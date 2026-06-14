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

  const agencyLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const toolsLinks = [
    { name: 'Products', path: '/products' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md bg-[#0A0A0A]/80 border-b border-[#1E1E1E] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.jpg" alt="Integrit Logo" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform rounded-md" />
          <span className="font-display font-bold text-xl text-white tracking-wide">Integrit</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {agencyLinks.map((link) => (
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

            {/* Visual separator between Agency and Tools */}
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-accent-primary/60 border border-accent-primary/20 rounded-full bg-accent-primary/5">
              TOOLS
            </span>

            {toolsLinks.map((link) => (
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1E1E1E] p-6 flex flex-col gap-5 md:hidden shadow-2xl"
          >
            {[...agencyLinks, ...toolsLinks].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-medium text-text-secondary hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-accent-primary text-black px-6 py-4 text-center font-bold text-lg w-full rounded-lg"
            >
              Book a Call
            </Link>
            {siteConfig.urgency.enabled && (
              <p className="text-xs font-mono text-text-secondary text-center">
                ⚡ {siteConfig.urgency.text}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onBuyNow }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Languages', href: '#languages' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
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
        <a href="#" className="flex items-center gap-2 group">
          <img src="/logo.jpg" alt="Captiongrit Logo" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform rounded-md" />
          <span className="font-display font-bold text-xl tracking-tight">Captiongrit</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={onBuyNow} className="bg-accent-primary hover:bg-accent-secondary text-black px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_15px_rgba(198,255,52,0.2)] hover:shadow-[0_0_25px_rgba(198,255,52,0.4)]">
            Buy Now
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+12px)] left-4 right-4 glass bg-[#0A0A0A]/90 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4 border-b border-white/10 pb-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-white/80 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <button onClick={() => { setMobileMenuOpen(false); onBuyNow(); }} className="bg-accent-primary text-black px-6 py-4 rounded-xl font-bold w-full text-lg mt-2">
              Buy Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

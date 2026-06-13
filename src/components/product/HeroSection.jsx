import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import CaptiongritPluginDemo from './CaptiongritPluginDemo';

export default function HeroSection({ onBuyNow }) {
  const trustItems = [
    "One-time payment",
    "No subscriptions",
    "24 languages",
    "Works inside Adobe"
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="noise-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/30 bg-accent-primary/5 text-accent-primary text-sm font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              Now Available — Version 1.0
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-white">
              Don't waste hours.<br />
              <span className="glow-text text-accent-primary">Create captions in seconds.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl">
              AI-powered captions in 24 languages — One Click, One-Time License. Works inside Adobe Premiere Pro & After Effects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <button 
                onClick={onBuyNow}
                className="bg-accent-primary hover:bg-accent-secondary text-black px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(198,255,52,0.2)] hover:shadow-[0_0_30px_rgba(198,255,52,0.4)] hover:-translate-y-1"
              >
                Buy Now — Starting at ₹999
              </button>
              <a 
                href="#how-it-works"
                className="flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:bg-white/5 transition-all"
              >
                See How It Works
              </a>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {trustItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-accent-primary" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual: Interactive Demo */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex items-center justify-center lg:justify-end"
          >
            <CaptiongritPluginDemo />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

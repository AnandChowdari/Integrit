import { motion } from 'framer-motion';

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary font-body text-text-primary selection:bg-accent-primary/30 selection:text-white">
      {/* Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="noise-overlay" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 max-w-2xl px-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none border border-white/10 bg-white/5 text-text-secondary text-sm font-medium mb-8 uppercase tracking-wider">
          Results
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Case Studies</h1>
        
        <p className="text-xl text-text-secondary mb-12">
          Coming soon — we're documenting our client results.
        </p>
        
        <div className="w-16 h-px bg-white/20 mx-auto" />
      </motion.div>
    </div>
  );
}

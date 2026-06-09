import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Plug } from 'lucide-react';

export default function WhatWeDoSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Two ways Integrit grows your business</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 — Agency Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 flex flex-col justify-between group hover:border-white/20 transition-colors"
          >
            <div>
              <div className="w-14 h-14 rounded-none bg-surface-2 border border-white/10 flex items-center justify-center mb-8">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">Marketing + Editing + Lead Funnels</h3>
              <p className="text-text-secondary leading-relaxed mb-8 text-lg">
                We handle your content end-to-end — from scripting and editing long-form YouTube videos to running AI automation funnels that capture and convert your viewers into paying clients.
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Video Editing', 'Content Strategy', 'AI Funnels', 'Lead Gen'].map(tag => (
                  <span key={tag} className="text-xs font-mono px-3 py-1 bg-surface-2 border border-white/10 text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link 
              to="/services"
              className="inline-flex items-center text-accent-primary font-bold hover:text-accent-hover transition-colors"
            >
              Explore Services <span className="ml-2">→</span>
            </Link>
          </motion.div>

          {/* Card 2 — Creator Tools */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-10 flex flex-col justify-between group hover:border-accent-primary/50 transition-colors shadow-[0_0_30px_rgba(198,255,52,0)] hover:shadow-[0_0_30px_rgba(198,255,52,0.1)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-none bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-8 text-accent-primary">
                <Plug className="w-6 h-6" />
              </div>
              <h3 className="font-display text-3xl font-bold text-white mb-4">Plugins & Apps for Editors</h3>
              <p className="text-text-secondary leading-relaxed mb-8 text-lg">
                We build production tools for Adobe creators. Caption Integrit is our flagship plugin — AI-powered captions in 24 languages, built natively inside Premiere Pro and After Effects.
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Adobe CEP', 'AI Captions', '24 Languages', 'One-Time License'].map(tag => (
                  <span key={tag} className="text-xs font-mono px-3 py-1 bg-surface-2 border border-white/10 text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link 
              to="/products"
              className="inline-flex items-center text-accent-primary font-bold hover:text-accent-hover transition-colors relative z-10"
            >
              See Our Products <span className="ml-2">→</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

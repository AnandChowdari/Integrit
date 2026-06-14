import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Plug } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../../lib/motionVariants';

export default function WhatWeDoSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Label strip */}
        <div className="flex items-center gap-4 mb-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#1E1E1E]" />
          <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">Two ways Integrit works</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#1E1E1E]" />
        </div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">Two ways Integrit <span className="font-accent">grows</span> your business</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >

          {/* Card 1 — Agency Services */}
          <motion.div
            variants={fadeUpVariant}
            className="glass-card p-10 flex flex-col justify-between group hover:border-white/20 transition-colors"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest text-text-secondary uppercase mb-3 block">
                For Business Owners & Creators
              </span>
              <div className="w-14 h-14 rounded-2xl bg-[#161616] border border-white/10 flex items-center justify-center mb-8">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-4">Marketing + Editing + Lead Funnels</h3>
              <p className="text-base font-body text-text-secondary leading-relaxed mb-8">
                We handle your content end-to-end — from scripting and editing long-form YouTube videos to running AI automation funnels that capture and convert your viewers into paying clients.
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Video Editing', 'Content Strategy', 'AI Funnels', 'Lead Gen'].map(tag => (
                  <span key={tag} className="text-xs font-mono px-3 py-1 bg-[#161616] border border-[#1E1E1E] text-text-secondary rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center text-accent-primary font-bold hover:text-accent-secondary transition-colors"
            >
              Explore Services <span className="ml-2">→</span>
            </Link>
          </motion.div>

          {/* Card 2 — Creator Tools */}
          <motion.div
            variants={fadeUpVariant}
            className="glass-card p-10 flex flex-col justify-between group hover:border-accent-primary/50 transition-colors shadow-[0_0_30px_rgba(198,255,52,0)] hover:shadow-[0_0_30px_rgba(198,255,52,0.1)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-text-secondary uppercase mb-3 block">
                For Video Editors & Creators
              </span>
              <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-8 text-accent-primary">
                <Plug className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-4">Plugins & Apps for Editors</h3>
              <p className="text-base font-body text-text-secondary leading-relaxed mb-8">
                We build production tools for Adobe creators. Captiongrit is our flagship plugin — AI-powered captions in 24 languages, built natively inside Premiere Pro and After Effects.
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Adobe CEP', 'AI Captions', '24 Languages', 'One-Time License'].map(tag => (
                  <span key={tag} className="text-xs font-mono px-3 py-1 bg-[#161616] border border-[#1E1E1E] text-text-secondary rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center text-accent-primary font-bold hover:text-accent-secondary transition-colors relative z-10"
            >
              See Our Products <span className="ml-2">→</span>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

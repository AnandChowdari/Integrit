import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../../lib/motionVariants';

export default function WhatWeDoSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Label strip */}
        <div className="flex items-center gap-4 mb-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#1E1E1E]" />
          <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">How Integrit works</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#1E1E1E]" />
        </div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">How Integrit <span className="font-accent">grows</span> your business</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
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
              <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-4">Marketing + Editing + Lead Funnels</h3>
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

        </motion.div>
      </div>
    </section>
  );
}

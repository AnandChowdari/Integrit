import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUpVariant } from '../../lib/motionVariants';

export default function AgencyProductsSection() {
  return (
    <section className="py-32 px-6 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Tools we've built for <span className="font-accent">creators</span></h2>
          <p className="text-base font-body text-text-secondary">One-time purchases. No subscriptions. Built by editors, for editors.</p>
        </motion.div>

        {/* Rich Captiongrit Preview Card */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="glass-card p-0 overflow-hidden group hover:-translate-y-1 transition-transform duration-300
                          border border-[#1E1E1E] hover:border-accent-primary/20 hover:shadow-[0_0_40px_rgba(198,255,52,0.06)]
                          text-left max-w-2xl mx-auto">

            {/* Top: Fake Adobe UI Panel */}
            <div className="bg-[#1c1c1c] border-b border-[#2a2a2a] px-4 py-2 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
              </div>
              <span className="text-[10px] font-mono text-text-secondary">Captiongrit — Adobe CEP Extension</span>
              <span className="ml-auto text-[10px] font-mono text-accent-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                Connected
              </span>
            </div>


            {/* Bottom: Card content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-accent-primary mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                    Now Available — v1.0
                  </span>
                  <h3 className="text-xl font-display font-bold text-white">Captiongrit</h3>
                  <p className="text-xs font-mono text-text-secondary mt-0.5">Adobe Premiere Pro & After Effects</p>
                </div>
                <span className="text-right">
                  <p className="text-lg font-display font-bold text-accent-primary">₹399</p>
                  <p className="text-[10px] font-mono text-text-secondary">one-time</p>
                </span>
              </div>
              <p className="text-sm font-body text-text-secondary leading-relaxed mb-4">
                AI-powered captions in 24 languages, inside your Adobe timeline. Natural, Word-by-Word, or Phonetic mode.
              </p>
              <div className="flex gap-3">
                <Link to="/products/captiongrit"
                   className="flex-1 px-4 py-2.5 bg-accent-primary text-black text-xs font-semibold font-display rounded-lg
                              hover:bg-accent-secondary transition-colors text-center">
                  View Plugin →
                </Link>
                <Link to="/products/captiongrit#pricing"
                   className="px-4 py-2.5 border border-accent-primary/40 text-accent-primary text-xs font-display rounded-lg
                              hover:bg-accent-primary/10 transition-colors text-center">
                  See Pricing
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-text-secondary font-body mb-4">More tools coming soon — follow us for updates</p>
          <div className="flex justify-center gap-6 text-sm text-text-secondary">
            <a href="https://instagram.com/anandwithcamera" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-colors">Instagram</a>
            <span>·</span>
            <a href="https://linkedin.com/in/anand-chowdari/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-colors">LinkedIn</a>
            <span>·</span>
            <a href="https://discord.gg/wjQ3PtMw" target="_blank" rel="noopener noreferrer" className="hover:text-accent-primary transition-colors">Discord</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

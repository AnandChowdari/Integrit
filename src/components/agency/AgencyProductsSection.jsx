import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AgencyProductsSection() {
  return (
    <section className="py-32 px-6 bg-surface/30 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Tools we've built for creators</h2>
          <p className="text-xl text-text-secondary">One-time purchases. No subscriptions. Built by editors, for editors.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 md:p-14 relative group shadow-[0_0_40px_rgba(198,255,52,0.05)] border-accent-primary/30"
        >
          <div className="absolute inset-0 bg-accent-primary/5 pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-bold uppercase tracking-wider mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
            Now Available — v1.0
          </div>

          <h3 className="font-display text-4xl font-bold text-white mb-4">Captiongrit</h3>
          
          <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            AI-powered captions in 24 languages inside Adobe Premiere Pro and After Effects. Natural, Word-by-Word, or Phonetic mode. One-time license.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['Adobe Premiere Pro', 'After Effects', '24 Languages', 'Phonetic Mode'].map(tag => (
              <span key={tag} className="text-xs font-mono px-3 py-1 bg-surface-2 border border-white/10 text-text-muted">
                {tag}
              </span>
            ))}
          </div>

          <div className="font-bold text-white mb-8">From ₹999 / $19 — One-Time</div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/products/captiongrit"
              className="bg-accent-primary hover:bg-accent-secondary text-black px-8 py-4 rounded-none font-bold text-lg transition-all shadow-[0_0_15px_rgba(198,255,52,0.2)] hover:shadow-[0_0_25px_rgba(198,255,52,0.4)]"
            >
              View Plugin →
            </Link>
            <Link 
              to="/products/captiongrit#pricing"
              className="flex items-center justify-center px-8 py-4 rounded-none font-bold text-lg border border-white/20 hover:bg-white/5 transition-all text-white"
            >
              See Pricing
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-text-muted mb-4">More tools coming soon — follow us for updates</p>
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

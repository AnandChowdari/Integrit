import { motion } from 'framer-motion';
import GlobalNavbar from '../components/layout/GlobalNavbar';
import GlobalFooter from '../components/layout/GlobalFooter';
import { Link } from 'react-router-dom';

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary font-body text-text-primary selection:bg-accent-primary/30 selection:text-white">
      <GlobalNavbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Tools built by creators, <span className="text-accent-primary">for creators</span></h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              We build production tools that we use ourselves. No subscriptions.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-10 md:p-14 relative group shadow-[0_0_40px_rgba(198,255,52,0.05)] border-accent-primary/30 text-center mb-20"
            >
              <div className="absolute inset-0 bg-accent-primary/5 pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-bold uppercase tracking-wider mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                Now Available — v1.0
              </div>

              <h2 className="font-display text-4xl font-bold text-white mb-4">Captiongrit</h2>
              
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
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center max-w-md mx-auto"
            >
              <h3 className="font-display text-2xl font-bold text-white mb-4">More coming soon</h3>
              <p className="text-text-secondary mb-6">Join the waitlist to be notified when we drop new creator tools.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="flex-grow bg-surface-2 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-accent-primary"
                />
                <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 transition-colors border border-white/10">Notify Me</button>
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}

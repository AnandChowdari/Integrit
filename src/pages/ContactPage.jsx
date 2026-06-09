import { motion } from 'framer-motion';
import GlobalNavbar from '../components/layout/GlobalNavbar';
import GlobalFooter from '../components/layout/GlobalFooter';
import { ArrowRight, MessageSquare, Briefcase, Zap } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary font-body text-text-primary selection:bg-accent-primary/30 selection:text-white">
      <GlobalNavbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none border border-accent-primary/30 bg-accent-primary/5 text-accent-primary text-sm font-medium mb-8 uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                Start Growing
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Let's build something.</h1>
              <p className="text-xl text-text-secondary mb-12 max-w-md">
                Whether you need a full-service content engine, an AI lead funnel, or a custom integration, we're ready to help you scale.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-surface-2 border border-white/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">1. Discovery Call</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">We hop on a quick call to understand your current audience, bottlenecks, and conversion goals.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-surface-2 border border-white/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">2. Custom Strategy</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">We map out a precise action plan — what content to make, and what automation flows to build.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-surface-2 border border-white/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">3. Execution</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">We take over production and implementation. You watch the leads roll in.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-10 md:p-12 relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[60px] pointer-events-none" />
              
              <form action="https://formspree.io/f/placeholder" method="POST" className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Form submitted (Placeholder)'); }}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-surface-2 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors rounded-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-surface-2 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors rounded-none"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">I am a...</label>
                  <select 
                    className="w-full bg-surface-2 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors rounded-none appearance-none cursor-pointer"
                  >
                    <option value="business">Business Owner / Coach</option>
                    <option value="creator">Content Creator</option>
                    <option value="brand">Startup / Brand</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">Message</label>
                  <textarea 
                    rows={5}
                    required
                    className="w-full bg-surface-2 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors rounded-none resize-none"
                    placeholder="Tell us about your current situation and goals..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-accent-primary hover:bg-accent-secondary text-black font-bold py-4 flex items-center justify-center gap-2 transition-all rounded-none mt-4 shadow-[0_0_15px_rgba(198,255,52,0.15)] hover:shadow-[0_0_25px_rgba(198,255,52,0.3)]"
                >
                  Send Message <ArrowRight className="w-5 h-5" />
                </button>

              </form>
            </motion.div>

          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}

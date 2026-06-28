import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Briefcase, Zap, CheckCircle } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { slideLeftVariant, slideRightVariant } from '../../lib/motionVariants';

export default function ContactSection() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const data = Object.fromEntries(new FormData(e.target));
    try {
      // TODO: Replace with real Formspree ID
      const res = await fetch('https://formspree.io/f/placeholder', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 border-t border-white/5 relative overflow-hidden bg-bg-primary">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <motion.div
            variants={slideLeftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Urgency badge */}
            {siteConfig.urgency.enabled && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/10
                              border border-accent-primary/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                <span className="text-xs font-mono text-accent-primary">
                  Accepting {siteConfig.urgency.spotsLeft} new clients in {siteConfig.urgency.month}
                </span>
              </div>
            )}

            <h2 className="font-display text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.08]">
              Let’s build <span className="font-accent">something.</span>
            </h2>
            <p className="text-base font-body text-text-secondary mb-12 max-w-md leading-relaxed">
              Whether you need a full-service content engine, an AI lead funnel, or a custom integration, we're ready to help you scale.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#161616] border border-[#1E1E1E] rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-1">1. Discovery Call</h3>
                  <p className="text-text-secondary text-sm font-body leading-relaxed">We hop on a quick call to understand your current audience, bottlenecks, and conversion goals.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#161616] border border-[#1E1E1E] rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-1">2. Custom Strategy</h3>
                  <p className="text-text-secondary text-sm font-body leading-relaxed">We map out a precise action plan — what content to make, and what automation flows to build.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#161616] border border-[#1E1E1E] rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-1">3. Execution</h3>
                  <p className="text-text-secondary text-sm font-body leading-relaxed">We take over production and implementation. You watch the leads roll in.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            variants={slideRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-10 md:p-12 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[60px] pointer-events-none" />

            {status === 'success' ? (
              <div className="relative z-10 text-center py-12">
                <div className="w-12 h-12 rounded-full bg-accent-primary/15 border border-accent-primary/30
                                flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-accent-primary" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">Message received.</h3>
                <p className="text-sm font-body text-text-secondary">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-display font-bold text-text-secondary mb-2 uppercase tracking-wide">Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full bg-[#111111] border border-[#1E1E1E] px-4 py-3 text-white font-body focus:outline-none focus:border-accent-primary/40 transition-colors rounded-xl"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-display font-bold text-text-secondary mb-2 uppercase tracking-wide">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full bg-[#111111] border border-[#1E1E1E] px-4 py-3 text-white font-body focus:outline-none focus:border-accent-primary/40 transition-colors rounded-xl"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-text-secondary mb-2 uppercase tracking-wide">I am a...</label>
                  <select
                    name="type"
                    className="w-full bg-[#111111] border border-[#1E1E1E] px-4 py-3 text-white font-body focus:outline-none focus:border-accent-primary/40 transition-colors rounded-xl appearance-none cursor-pointer"
                  >
                    <option value="business">Business Owner / Coach</option>
                    <option value="creator">Content Creator</option>
                    <option value="brand">Startup / Brand</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-display font-bold text-text-secondary mb-2 uppercase tracking-wide">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-[#111111] border border-[#1E1E1E] px-4 py-3 text-white font-body focus:outline-none focus:border-accent-primary/40 transition-colors rounded-xl resize-none"
                    placeholder="Tell us about your current situation and goals..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-accent-primary hover:bg-accent-secondary text-black font-bold font-display py-4 flex items-center justify-center gap-2 transition-all rounded-xl mt-4 shadow-[0_0_15px_rgba(198,255,52,0.15)] hover:shadow-[0_0_25px_rgba(198,255,52,0.3)] disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : <>Send Message <ArrowRight className="w-5 h-5" /></>}
                </button>

                {status === 'error' && (
                  <p className="text-sm text-red-400 text-center font-body">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

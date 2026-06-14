import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { fadeUpVariant } from '../../lib/motionVariants';

export default function AgencyFinalCta() {
  return (
    <section className="relative py-40 px-6 overflow-hidden border-t border-white/5">
      {/* Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="noise-overlay" />

      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Social proof + Urgency strip */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mb-8 flex-wrap"
        >
          <div className="flex -space-x-2">
            {['N', 'A', 'P'].map((l, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-[#1E1E1E] border-2 border-[#0A0A0A]
                                      flex items-center justify-center text-xs font-mono text-text-secondary">
                {l}
              </div>
            ))}
          </div>
          <p className="text-sm font-body text-text-secondary">
            <span className="text-white">10+ clients</span> already scaling with Integrit
          </p>
          {siteConfig.urgency.enabled && (
            <>
              <span className="hidden sm:block h-4 w-px bg-[#1E1E1E]" />
              <p className="text-sm font-mono text-accent-primary">⚡ {siteConfig.urgency.text}</p>
            </>
          )}
        </motion.div>

        <motion.h2
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-bold mb-6 text-white leading-tight tracking-tight"
        >
          Ready to <span className="font-accent">grow</span> and <span className="font-accent">convert?</span>
        </motion.h2>

        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-base font-body text-text-secondary mb-12"
        >
          Let's build your content + automation system together.
        </motion.p>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="bg-accent-primary hover:bg-accent-secondary text-black px-10 py-5 rounded-xl font-bold text-xl transition-all shadow-[0_0_20px_rgba(198,255,52,0.3)] hover:shadow-[0_0_40px_rgba(198,255,52,0.5)] hover:-translate-y-1"
          >
            Work With Us
          </Link>
          <Link
            to="/products"
            className="flex items-center justify-center px-10 py-5 rounded-xl font-bold text-xl border border-white/20 hover:bg-white/5 transition-all text-white"
          >
            Explore Products
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 text-sm text-text-secondary font-body"
        >
          Or just explore — no pressure.
        </motion.p>
      </div>
    </section>
  );
}

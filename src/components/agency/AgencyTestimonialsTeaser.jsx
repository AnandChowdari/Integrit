import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../lib/motionVariants';

export default function AgencyTestimonialsTeaser() {
  const testimonials = [
    {
      quote: "Integrit's editing system helped our YouTube channel break 5M+ views organically. The content strategy alone was worth it — they truly understand what makes content convert.",
      name: 'Nivas K.',
      handle: 'Hustle Lifestyle',
      platform: 'YouTube & Instagram',
      result: '5M+ organic views',
      initials: 'NK',
    },
    // Add more real testimonials when available. Structure is ready.
  ];

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-3">Client Results</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">What our clients <span className="font-accent">say</span></h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUpVariant} className="glass-card p-6">
              <p className="text-sm font-body text-text-secondary leading-relaxed mb-4">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent-primary/15 border border-accent-primary/30
                                flex items-center justify-center text-xs font-mono text-accent-primary font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-body text-white font-medium">{t.name}</p>
                  <p className="text-xs font-mono text-text-secondary">{t.handle} · {t.platform}</p>
                </div>
                <span className="ml-auto px-2 py-1 text-[10px] font-mono text-accent-primary
                                 bg-accent-primary/10 border border-accent-primary/20 rounded-full whitespace-nowrap">
                  {t.result}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

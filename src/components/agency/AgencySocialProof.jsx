import { motion } from 'framer-motion';
import { siteConfig } from '../../config/site';
import { fadeUpVariant, staggerContainer } from '../../lib/motionVariants';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function AgencySocialProof() {
  const stats = [
    { value: siteConfig.stats.viewsNumeric, suffix: siteConfig.stats.viewsSuffix, label: 'Organic Views Generated', context: 'across YouTube, Reels & LinkedIn' },
    { value: siteConfig.stats.clientsNumeric, suffix: siteConfig.stats.clientsSuffix, label: 'Clients Served', context: 'creators & businesses' },
    { value: siteConfig.stats.conversionNumeric, suffix: siteConfig.stats.conversionSuffix, label: 'Avg Lead Conversion Lift', context: 'vs industry baseline' },
    { value: siteConfig.stats.doneForYouNumeric, suffix: siteConfig.stats.doneForYouSuffix, label: 'Done-For-You', context: 'we handle everything' },
  ];

  return (
    <section className="relative z-20 w-full bg-[#111111]/50 backdrop-blur-md">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#1E1E1E]">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUpVariant} className="text-center px-6 py-8">
              <p className="text-4xl md:text-5xl font-display font-bold text-accent-primary glow-text">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm font-accent text-white">{stat.label}</p>
              <p className="mt-0.5 text-xs font-mono text-text-secondary">{stat.context}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

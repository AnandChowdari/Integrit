import { motion } from 'framer-motion';

export default function SocialProofBar() {
  const stats = [
    { value: '500+', label: 'Editors Using It' },
    { value: '24', label: 'Languages Supported' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '30sec', label: 'Average Caption Time' },
  ];

  return (
    <section className="relative z-20 -mt-10 px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-strong py-8 px-8 sm:px-12 flex flex-wrap justify-between items-center gap-8 shadow-2xl"
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center sm:items-start flex-1 min-w-[120px]">
            <span className="font-display font-bold text-4xl text-white mb-1 glow-text">
              {stat.value}
            </span>
            <span className="text-sm text-text-secondary font-medium tracking-wide uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

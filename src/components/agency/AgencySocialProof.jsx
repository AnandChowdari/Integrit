import { motion } from 'framer-motion';

export default function AgencySocialProof() {
  const stats = [
    { value: '50K+', label: 'Combined Views Generated' },
    { value: '10+', label: 'Clients Served' },
    { value: '3x', label: 'Average Lead Conversion Lift' },
    { value: '100%', label: 'Done-For-You' },
  ];

  return (
    <section className="relative z-20 w-full border-y border-white/5 bg-surface/50 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1 w-full py-4 md:py-0">
              <span className="font-display font-bold text-3xl md:text-4xl text-white mb-1">
                {stat.value}
              </span>
              <span className="text-xs text-text-secondary font-medium tracking-wide uppercase text-center max-w-[150px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

import { motion } from 'framer-motion';

export default function HowItWorksAgency() {
  const steps = [
    {
      num: "01",
      title: "ATTRACT",
      desc: "We create and edit content that gets views — YouTube, Reels, LinkedIn. Strategy + production, handled."
    },
    {
      num: "02",
      title: "CAPTURE",
      desc: "Every viewer is a potential lead. We build opt-in systems, lead magnets, and landing pages to capture them."
    },
    {
      num: "03",
      title: "CONVERT",
      desc: "AI automation funnels nurture leads via WhatsApp and email sequences until they book a call or buy."
    },
    {
      num: "04",
      title: "SCALE",
      desc: "We analyze what's converting and double down. Continuous optimization until your pipeline runs itself."
    }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">The Integrit Growth System</h2>
          <p className="text-xl text-text-secondary">Views without conversions is just vanity. We fix both.</p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line Desktop */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px">
            <svg width="100%" height="2" className="absolute inset-0">
              <path 
                d="M 0,1 L 2000,1" 
                stroke="#C6FF34" 
                strokeWidth="2" 
                strokeDasharray="8 8" 
                className="animate-flow-dash opacity-30" 
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col relative"
              >
                {/* Mobile Connecting Line */}
                {idx !== steps.length - 1 && (
                  <div className="md:hidden absolute left-6 top-16 bottom-[-3rem] w-px border-l-2 border-dashed border-accent-primary/30" />
                )}

                <div className="w-12 h-12 rounded-none bg-surface border border-accent-primary flex items-center justify-center font-display font-bold text-accent-primary mb-6 shadow-[0_0_15px_rgba(198,255,52,0.15)] relative z-10">
                  {step.num}
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 tracking-wide">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

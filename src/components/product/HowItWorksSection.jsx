import { motion } from 'framer-motion';

export default function HowItWorksSection() {
  const steps = [
    "Install the CEP Plugin in Adobe",
    "Open your sequence or composition",
    "Choose your language and caption style",
    "Hit Generate — AI transcribes your audio",
    "Captions appear on your timeline, ready to export"
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 bg-bg-secondary relative border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">From footage to captions in <span className="font-accent">5 steps</span></h2>
          <p className="text-base font-body text-text-secondary">No more manual syncing. No more external websites.</p>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-6 relative"
            >
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="absolute left-6 top-16 bottom-[-2rem] w-px bg-gradient-to-b from-accent-primary/50 to-transparent dashed-line" style={{ borderLeft: '2px dashed rgba(198,255,52,0.3)' }} />
              )}
              
              <div className="w-12 h-12 shrink-0 rounded-full bg-accent-primary/10 border border-accent-primary text-accent-primary flex items-center justify-center font-display font-bold text-xl z-10 shadow-[0_0_15px_rgba(198,255,52,0.2)]">
                {idx + 1}
              </div>
              
              <div className="pt-2 pb-12">
                <p className="text-xl md:text-2xl font-medium text-white">{step}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

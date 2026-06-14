import { motion } from 'framer-motion';

export default function CaptionModesSection() {
  const modes = [
    {
      title: "Natural Phrase",
      desc: "flowing conversational captions",
      preview: "AI captions are taking over the world.",
      highlight: "taking over"
    },
    {
      title: "Word by Word",
      desc: "one word at a time, TikTok style",
      preview: "AI | captions | are | taking | over | the | world.",
      highlight: "taking"
    },
    {
      title: "Phonetic Mode",
      desc: "Telugu/Hindi/Tamil in Roman script",
      preview: "Nenu AI use chestunnanu.",
      highlight: "chestunnanu"
    }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight"><span className="font-accent">Three Ways</span> to Caption</h2>
          <p className="text-base font-body text-text-secondary">Choose the style that fits your video's vibe.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modes.map((mode, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 flex flex-col items-center text-center group"
            >
              <h3 className="font-display font-bold text-xl mb-2 text-white">{mode.title}</h3>
              <p className="text-sm text-text-secondary mb-8">{mode.desc}</p>
              
              <div className="w-full bg-bg-primary rounded-xl p-6 border border-white/5 relative overflow-hidden group-hover:border-accent-primary/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                <p className="font-display font-bold text-2xl relative z-10 leading-relaxed text-white/50">
                  {mode.preview.split(mode.highlight).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-accent-primary glow-text px-1">{mode.highlight}</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

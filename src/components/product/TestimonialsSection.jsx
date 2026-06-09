import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marcus Vella",
      role: "YouTube Creator (1.2M Subs)",
      quote: "The phonetic Romanization is a game changer for my Telugu channel. I can finally add accurate subtitles without manually typing everything out.",
      rating: 5
    },
    {
      name: "Priya Iyer",
      role: "Freelance Video Editor",
      quote: "Caption Integrit saves me about 2 hours per video. The fact that it works directly inside Premiere means I never have to break my workflow.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Agency Director",
      quote: "We were paying hundreds a month for cloud captioning services. A one-time payment for this level of accuracy is an absolute steal.",
      rating: 5
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
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary mb-4">
            Early Beta Feedback
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">What Beta Testers Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-primary text-accent-primary" />
                  ))}
                </div>
                <p className="text-white/90 text-lg leading-relaxed mb-8">"{test.quote}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center font-bold text-accent-primary">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{test.name}</h4>
                  <p className="text-text-secondary text-sm">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

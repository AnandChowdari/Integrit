import { motion } from 'framer-motion';

export default function WhoWeWorkWithSection() {
  const audiences = [
    {
      title: "Business Owners & Coaches",
      desc: "You have expertise. We build the content machine and automation system that turns your knowledge into clients."
    },
    {
      title: "Content Creators",
      desc: "You already create. We edit faster, distribute smarter, and build the funnel that monetizes your audience."
    },
    {
      title: "Startups & Brands",
      desc: "You need visibility and leads. We run the full stack — from content to conversion — so your team can focus on building."
    }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Built for people with something to say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((aud, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 flex flex-col"
            >
              <h3 className="font-display text-2xl font-bold text-white mb-4">{aud.title}</h3>
              <p className="text-text-secondary leading-relaxed">{aud.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUpVariant, staggerContainer } from '../../lib/motionVariants';

export default function WhoWeWorkWithSection() {
  const audiences = [
    {
      title: 'Business Owners & Coaches',
      desc: 'You have expertise. We build the content machine and automation system that turns your knowledge into clients.',
      cta: 'See How We Help Coaches →',
      href: '/services',
    },
    {
      title: 'Content Creators',
      desc: 'You already create. We edit faster, distribute smarter, and build the funnel that monetizes your audience.',
      cta: 'Explore Creator Tools →',
      href: '/products',
    },
    {
      title: 'Startups & Brands',
      desc: 'You need visibility and leads. We run the full stack — from content to conversion — so your team can focus on building.',
      cta: 'Book a Discovery Call →',
      href: '/contact',
    },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Built for people with <span className="font-accent">something to say</span></h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {audiences.map((aud, idx) => (
            <motion.div
              key={idx}
              variants={fadeUpVariant}
              className="glass-card p-10 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display text-xl font-semibold text-white mb-4">{aud.title}</h3>
                <p className="text-base font-body text-text-secondary leading-relaxed mb-6">{aud.desc}</p>
              </div>
              <Link
                to={aud.href}
                className="inline-flex items-center text-accent-primary font-bold text-sm hover:text-accent-secondary transition-colors"
              >
                {aud.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

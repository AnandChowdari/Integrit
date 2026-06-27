import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../lib/motionVariants';

const services = [
  {
    id: 1,
    title: 'Lift your social media presence with wider audience.',
    items: [
      'Content strategy',
      'Video editing',
      'Uploading / SEO Ranking'
    ]
  },
  {
    id: 2,
    title: 'Converting reach to leads to generate flow of cash',
    items: [
      'Meta ads',
      'Automating DMs',
      'Chatbots in website (AI) for your website'
    ]
  },
  {
    id: 3,
    title: 'Follow up the leads that are leaking',
    items: [
      'WhatsApp automation',
      'Instagram automations',
      'Voice agents, cart abandonment systems'
    ]
  }
];

export default function WhatWeDoSection() {
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
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            What <span className="font-accent">We Do</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-accent-primary" />
            <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">Our Services</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-accent-primary" />
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto flex flex-col gap-6"
        >
          {services.map((service, index) => (
            <ServiceBox key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceBox({ service, index }) {
  return (
    <motion.div
      variants={fadeUpVariant}
      className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden relative"
    >
      <div className="p-6 md:p-8 flex items-center justify-between relative z-20">
        <h3 className="font-display text-lg md:text-xl font-semibold text-white flex items-center gap-4">
          <span className="text-accent-primary font-mono text-sm">0{index + 1}</span>
          {service.title}
        </h3>
        <motion.div 
          initial={{ rotate: 0 }}
          whileInView={{ rotate: 180 }}
          viewport={{ margin: '-20% 0px -20% 0px' }}
          transition={{ duration: 0.5 }}
          className="w-8 h-8 shrink-0 rounded-full border border-white/20 flex items-center justify-center bg-white/5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className="text-white">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </motion.div>
      </div>
      
      {/* Scroll animation opening */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 'auto', opacity: 1 }}
        viewport={{ margin: '-20% 0px -20% 0px' }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="p-6 md:p-8 pt-0 text-text-secondary font-body border-t border-white/10">
          <ul className="list-disc pl-5 space-y-2 text-white/80">
            {service.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

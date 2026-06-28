import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../lib/motionVariants';
import { ChevronRight } from 'lucide-react';

const problems = [
  {
    id: 1,
    title: 'Story 1: The Traffic Plateau',
    summary: 'You are consistently posting content, but your views and engagement have flatlined. You feel like you hit a ceiling and cannot seem to reach new audiences despite the effort.',
    details: 'Constraints & Details: The algorithmic constraints often limit reach if content structure does not hook viewers early. We solve this by overhauling content strategy, optimizing retention graphs, and testing fresh angles to break past the plateau.',
  },
  {
    id: 2,
    title: 'Story 2: Leaking Leads',
    summary: 'You are getting thousands of views and your audience is growing, but it is not translating into revenue. People watch your content but they do not take action or enter your funnels.',
    details: 'Constraints & Details: The primary constraint is a broken bridge between content consumption and the call-to-action. We address this by integrating automated DM workflows, optimizing landing pages, and placing strategic lead magnets that naturally convert viewers.',
  }
];

export default function FindYourProblemSection() {
  return (
    <section className="py-32 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Find Your <span className="font-accent">Problem</span>
          </h2>
          <p className="text-base font-body text-text-secondary max-w-2xl mx-auto">
            Explore stories of challenges we have seen. If these sound familiar, click to see how we solve them.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProblemCard({ problem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div variants={fadeUpVariant} className="glass-card p-8 md:p-10 flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:border-accent-primary/30">
      <h3 className="font-display text-2xl font-semibold text-white mb-4">
        {problem.title}
      </h3>
      <p className="text-text-secondary font-body leading-relaxed mb-8 flex-grow">
        {problem.summary}
      </p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-white/10 mb-8 text-white/90 font-body leading-relaxed text-sm">
              <strong className="text-accent-primary block mb-2">The Story & Constraints</strong>
              {problem.details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 text-accent-primary font-semibold text-sm tracking-wide uppercase hover:text-accent-secondary transition-colors mt-auto w-fit"
      >
        {isExpanded ? 'Show Less' : 'Click to know more'}
        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? '-rotate-90' : ''}`} />
      </button>
    </motion.div>
  );
}

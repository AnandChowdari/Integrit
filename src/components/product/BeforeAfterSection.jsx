import { motion } from 'framer-motion';
import { fadeUpVariant } from '../../lib/motionVariants';

export default function BeforeAfterSection() {
  const comparisons = [
    { metric: 'Caption one 10-min video',  before: '2–3 hours',                after: '< 30 seconds' },
    { metric: 'Language accuracy',          before: 'Manual / error-prone',     after: '95–99% AI accuracy' },
    { metric: 'Indian language support',    before: 'Not available in tools',   after: '10 languages + phonetic' },
    { metric: 'Cost per video',             before: '$0.25/min (Cloud services)', after: '< $0.10/hour of video' },
    { metric: 'Software you need',          before: 'Exit Adobe, upload elsewhere', after: 'Stay inside Premiere / AE' },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono text-text-secondary uppercase tracking-widest mb-3">Time saved</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">Before vs. After Captiongrit</h2>
          <p className="text-base font-body text-text-secondary">See how much time and money you save on every project.</p>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm font-body min-w-[600px]">
            <thead>
              <tr className="border-b border-[#1E1E1E]">
                <th className="text-left py-4 pr-6 text-text-secondary font-normal w-1/3">Metric</th>
                <th className="py-4 px-6 text-left font-normal w-1/3">
                  <span className="text-red-400/80">❌ Without Captiongrit</span>
                </th>
                <th className="py-4 px-6 text-left font-semibold w-1/3">
                  <span className="text-accent-primary">✅ With Captiongrit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E1E]">
              {comparisons.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 pr-6 text-white font-medium">{row.metric}</td>
                  <td className="py-4 px-6" style={{ color: '#ff6b6b' }}>{row.before}</td>
                  <td className="py-4 px-6 text-accent-primary font-medium">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

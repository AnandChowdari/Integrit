import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Film, Bot, BarChart3, TrendingUp, Check, X } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../../lib/motionVariants';

export default function AgencyServicesPreview() {


  return (
    <section className="py-32 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Full-stack growth, <span className="font-accent">done for you</span></h2>
          <p className="text-base font-body text-text-secondary">We don’t just make content. We build systems that convert.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >

          {/* Large Card */}
          <motion.div
            variants={fadeUpVariant}
            className="md:col-span-2 glass-card p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                  <Film className="w-5 h-5 text-accent-primary" />
                </div>
                <span className="text-xs font-mono text-text-secondary">01 / Core Service</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-4">Video Editing & Content Production</h3>
              <p className="text-base font-body text-text-secondary leading-relaxed max-w-xl">
                Long-form YouTube editing, short-form Reels, thumbnails, motion graphics — everything a growing channel needs. Clients have crossed 5M+ combined views with our editing systems.
              </p>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div
            variants={fadeUpVariant}
            className="glass-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-accent-primary" />
              </div>
              <span className="text-xs font-mono text-text-secondary">02 / Automation</span>
            </div>
            <h3 className="font-display text-xl font-semibold text-white mb-3">AI Lead Funneling</h3>
            <p className="text-base font-body text-text-secondary leading-relaxed">
              Automated pipelines that capture leads from your content and push them through WhatsApp, email, and CRM sequences.
            </p>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div
            variants={fadeUpVariant}
            className="glass-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-accent-primary" />
              </div>
              <span className="text-xs font-mono text-text-secondary">03 / Strategy</span>
            </div>
            <h3 className="font-display text-xl font-semibold text-white mb-3">Marketing Strategy</h3>
            <p className="text-base font-body text-text-secondary leading-relaxed">
              Niche research, hook writing, content calendars, and distribution strategy built around your audience.
            </p>
          </motion.div>

          {/* Small Card 3 */}
          <motion.div
            variants={fadeUpVariant}
            className="glass-card p-8 flex flex-col md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent-primary" />
              </div>
              <span className="text-xs font-mono text-text-secondary">04 / Analytics</span>
            </div>
            <h3 className="font-display text-xl font-semibold text-white mb-3">Growth Analytics</h3>
            <p className="text-base font-body text-text-secondary leading-relaxed">
              Track what's working. Weekly reports on views, leads, and conversion metrics that actually matter.
            </p>
          </motion.div>

        </motion.div>



        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link
            to="/services"
            className="inline-flex items-center text-accent-primary font-bold hover:text-accent-secondary transition-colors text-lg"
          >
            See Full Services <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Film, Bot, BarChart3, LineChart } from 'lucide-react';

export default function AgencyServicesPreview() {
  return (
    <section className="py-32 px-6 bg-surface/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Full-stack growth, done for you</h2>
          <p className="text-xl text-text-secondary">We don't just make content. We build systems that convert.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-card p-10 flex flex-col justify-between"
          >
            <div>
              <Film className="w-8 h-8 text-white mb-6" />
              <h3 className="font-display text-2xl font-bold text-white mb-4">Video Editing & Content Production</h3>
              <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
                Long-form YouTube editing, short-form Reels, thumbnails, motion graphics — everything a growing channel needs. Clients have crossed 50K+ combined views with our editing systems.
              </p>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 flex flex-col"
          >
            <Bot className="w-8 h-8 text-white mb-6" />
            <h3 className="font-display text-xl font-bold text-white mb-3">AI Lead Funneling</h3>
            <p className="text-text-secondary leading-relaxed">
              Automated pipelines that capture leads from your content and push them through WhatsApp, email, and CRM sequences.
            </p>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 flex flex-col"
          >
            <BarChart3 className="w-8 h-8 text-white mb-6" />
            <h3 className="font-display text-xl font-bold text-white mb-3">Marketing Strategy</h3>
            <p className="text-text-secondary leading-relaxed">
              Niche research, hook writing, content calendars, and distribution strategy built around your audience.
            </p>
          </motion.div>

          {/* Small Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 flex flex-col md:col-span-2 lg:col-span-1"
          >
            <LineChart className="w-8 h-8 text-white mb-6" />
            <h3 className="font-display text-xl font-bold text-white mb-3">Growth Analytics</h3>
            <p className="text-text-secondary leading-relaxed">
              Track what's working. Weekly reports on views, leads, and conversion metrics that actually matter.
            </p>
          </motion.div>
          
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/services"
            className="inline-flex items-center text-accent-primary font-bold hover:text-accent-hover transition-colors text-lg"
          >
            See Full Services <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

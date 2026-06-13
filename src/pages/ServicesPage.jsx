import { motion } from 'framer-motion';
import GlobalNavbar from '../components/layout/GlobalNavbar';
import GlobalFooter from '../components/layout/GlobalFooter';
import { Film, Bot, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const services = [
    {
      icon: Film,
      title: "Video Editing & Production",
      desc: "Long-form YouTube editing, short-form Reels, thumbnails, motion graphics — everything a growing channel needs. We don't just edit; we engineer retention. Our editing systems have generated over 50K+ combined views for our clients.",
      tags: ["YouTube Long-form", "Reels/TikTok/Shorts", "Motion Graphics", "Thumbnail Design"]
    },
    {
      icon: BarChart3,
      title: "Content Strategy & Marketing",
      desc: "We analyze your niche, write hooks, build content calendars, and devise distribution strategies built around your audience. We ensure every piece of content has a clear purpose and path to conversion.",
      tags: ["Niche Research", "Scripting & Hooks", "Content Calendars", "Distribution Strategy"]
    },
    {
      icon: Bot,
      title: "AI Lead Automation Funnels",
      desc: "Getting views is only half the battle. We build automated pipelines that capture leads from your content and nurture them through WhatsApp, email, and CRM sequences until they book a call or buy.",
      tags: ["WhatsApp Automations", "Email Sequences", "Lead Magnets", "CRM Integration"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary font-body text-text-primary selection:bg-accent-primary/30 selection:text-white">
      <GlobalNavbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Full-stack growth, <span className="text-accent-primary">done for you</span></h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              We handle the entire pipeline — from creating the content that gets attention, to building the AI funnels that turn that attention into revenue.
            </p>
          </motion.div>

          <div className="space-y-8 mb-32">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-10 md:p-14 flex flex-col md:flex-row gap-10 items-start"
                >
                  <div className="w-16 h-16 shrink-0 rounded-none bg-surface-2 border border-white/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-accent-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-bold text-white mb-4">{svc.title}</h2>
                    <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-3xl">
                      {svc.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {svc.tags.map(tag => (
                        <span key={tag} className="text-sm font-mono px-4 py-2 bg-surface-2 border border-white/10 text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <h2 className="font-display text-4xl font-bold text-white mb-10 text-center">Combined Growth Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-10 flex flex-col items-center text-center">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Content Engine</h3>
                <p className="text-text-secondary mb-8">Full-service video editing & strategy.</p>
                <div className="text-3xl font-bold text-white mb-8">Custom Pricing</div>
                <Link to="/contact" className="w-full bg-surface-2 border border-white/20 hover:bg-white/5 text-white py-4 font-bold transition-all">Contact Us</Link>
              </div>
              <div className="glass-card p-10 flex flex-col items-center text-center border-accent-primary/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent-primary/5 pointer-events-none" />
                <h3 className="font-display text-2xl font-bold text-white mb-2 relative z-10">The Full Stack</h3>
                <p className="text-text-secondary mb-8 relative z-10">Content + Editing + AI Lead Funnels.</p>
                <div className="text-3xl font-bold text-white mb-8 relative z-10">Custom Pricing</div>
                <Link to="/contact" className="w-full bg-accent-primary hover:bg-accent-secondary text-black py-4 font-bold transition-all relative z-10">Book a Discovery Call</Link>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}

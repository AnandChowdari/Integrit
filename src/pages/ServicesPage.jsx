import { motion } from 'framer-motion';
import GlobalNavbar from '../components/layout/GlobalNavbar';
import GlobalFooter from '../components/layout/GlobalFooter';
import { Film, Bot, BarChart3, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeUpVariant, staggerContainer } from '../lib/motionVariants';
import SectionDivider from '../components/ui/SectionDivider';

export default function ServicesPage() {
  const services = [
    {
      icon: Film,
      title: "Video Editing & Production",
      desc: "Long-form YouTube editing, short-form Reels, thumbnails, motion graphics — everything a growing channel needs. We don't just edit; we engineer retention. Our editing systems have generated over 5M+ combined organic views for our clients.",
      tags: ["YouTube Long-form", "Reels/TikTok/Shorts", "Motion Graphics", "Thumbnail Design"],
      priceNote: "Starting from ₹8,000/video — custom packages available",
      num: "01",
    },
    {
      icon: BarChart3,
      title: "Content Strategy & Marketing",
      desc: "We analyze your niche, write hooks, build content calendars, and devise distribution strategies built around your audience. We ensure every piece of content has a clear purpose and path to conversion.",
      tags: ["Niche Research", "Scripting & Hooks", "Content Calendars", "Distribution Strategy"],
      priceNote: "Starting from ₹15,000/month — 1-month minimum",
      num: "02",
    },
    {
      icon: Bot,
      title: "AI Lead Automation Funnels",
      desc: "Getting views is only half the battle. We build automated pipelines that capture leads from your content and nurture them through WhatsApp, email, and CRM sequences until they book a call or buy.",
      tags: ["WhatsApp Automations", "Email Sequences", "Lead Magnets", "CRM Integration"],
      priceNote: "Custom build — Book a call to get a scoped estimate",
      num: "03",
    }
  ];

  const plans = [
    {
      name: 'Simple 4-pack',
      price: 'Custom',
      priceNote: 'per video',
      subPacks: ['Simple 4-pack', 'Simple 6-pack', 'Simple 12-pack'],
      validity: '60 Days Validity',
      includes: [
        'Up to 4 professional video edits (60 sec)',
        '48-72 hour turnaround',
        '2 rounds of changes',
        'No complex motion graphics or animations',
        'Ideal for simple social forward reels',
        'Simple briefing format',
        'Frames.io for accurate feedback',
      ],
      cta: 'Get a Quote',
      href: '/contact',
      featured: false,
    },
    {
      name: 'Complex 4-pack',
      price: 'Custom',
      priceNote: 'per video',
      badge: '⭐ Most Popular',
      subPacks: ['Complex 4-pack', 'Complex 8-pack', 'Complex 12-pack'],
      validity: '60 Days Validity',
      includes: [
        'Up to 4 professional video edits (60 sec)',
        '48-72 hour turnaround',
        '3 rounds of changes',
        'Includes heavy motion graphics and detailed storytelling',
        'Ideal for talking head, detailed and retention hooked edits',
        'Personal project manager',
        'Frames.io for accurate feedback',
      ],
      cta: 'Book a Discovery Call',
      href: '/contact',
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary font-body text-text-primary selection:bg-accent-primary/30 selection:text-white">
      <GlobalNavbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="mb-20 text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-[5rem] font-extrabold text-white mb-6 tracking-tight leading-[1.08]">Full-stack growth, <span className="font-accent">done for you</span></h1>
            <p className="text-base font-body text-text-secondary max-w-2xl mx-auto">
              We handle the entire pipeline — from creating the content that gets attention, to building the AI funnels that turn that attention into revenue.
            </p>
          </motion.div>

          {/* Service Blocks */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 mb-32"
          >
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUpVariant}
                  className="glass-card p-10 md:p-14 flex flex-col md:flex-row gap-10 items-start"
                >
                  <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-accent-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-text-secondary mb-2 block">{svc.num} / Service</span>
                    <h2 className="font-display text-xl font-semibold text-white mb-4">{svc.title}</h2>
                    <p className="text-base font-body text-text-secondary leading-relaxed mb-8 max-w-3xl">
                      {svc.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {svc.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono px-3 py-1 bg-[#161616] border border-[#1E1E1E] text-text-secondary rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-mono text-text-secondary">
                      {svc.priceNote.includes('₹') ? (
                        <>
                          {svc.priceNote.split(/₹[\d,]+/).map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && <span className="text-accent-primary font-medium">₹{svc.priceNote.match(/₹([\d,]+)/)?.[1]}</span>}
                            </span>
                          ))}
                        </>
                      ) : (
                        <>{svc.priceNote.split('Book a call').map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && <span className="text-accent-primary font-medium">Book a call</span>}
                          </span>
                        ))}</>
                      )}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <SectionDivider direction="down" />

          {/* Pricing Cards */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="text-xs font-mono text-text-secondary uppercase tracking-widest text-center mb-3">Pricing</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 text-center tracking-tight">
              Simple, Transparent <span className="font-accent">Pricing</span>
            </h2>
            <p className="text-base font-body text-text-secondary text-center mb-12 max-w-lg mx-auto">
              No hidden fees. Just clear, flexible plans to suit your workflow.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20"
          >
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                className={`rounded-2xl p-8 md:p-10 flex flex-col relative overflow-hidden ${
                  plan.featured
                    ? 'bg-gradient-to-br from-[#1a1030] to-[#0f0a1a] border-2 border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.15)]'
                    : 'glass-card'
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <h3 className="font-display text-2xl font-bold text-white mb-2">{plan.name}</h3>

                <p className="text-xs font-mono text-text-secondary mb-4">
                  One request at a time. Pause or cancel anytime.
                </p>

                {/* Sub-pack pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {plan.subPacks.map((pack, i) => (
                    <span key={pack} className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      i === 0
                        ? plan.featured
                          ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300'
                          : 'bg-accent-primary/10 border border-accent-primary/30 text-accent-primary'
                        : 'bg-[#161616] border border-[#1E1E1E] text-text-secondary hover:border-white/20'
                    }`}>
                      {pack}
                    </span>
                  ))}
                </div>

                <div className={`py-3 px-4 rounded-lg mb-6 text-sm font-mono ${
                  plan.featured
                    ? 'bg-purple-500/10 border border-purple-500/20 text-purple-300'
                    : 'bg-accent-primary/5 border border-accent-primary/15 text-accent-primary'
                }`}>
                  {plan.validity}
                </div>

                {/* Feature list */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.includes.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body text-text-secondary">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.featured ? 'text-purple-400' : 'text-accent-primary'}`} />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="space-y-3 mt-auto">
                  <Link
                    to={plan.href}
                    className={`block w-full py-4 text-center font-bold text-sm rounded-xl transition-all ${
                      plan.featured
                        ? 'bg-purple-500 hover:bg-purple-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                        : 'bg-[#161616] border border-white/10 hover:bg-white/5 text-white'
                    }`}
                  >
                    {plan.cta === 'Book a Discovery Call' ? 'Buy Now' : plan.cta}
                  </Link>
                  <Link
                    to="/contact"
                    className="block w-full py-3 text-center text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    Book a Call
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium Section */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-20"
          >
            <div className="glass-card p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 border border-accent-primary/30 rounded-full text-accent-primary text-[10px] font-mono uppercase tracking-wider font-bold mb-4">
                  Our Best Offering
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                  For <span className="font-accent">Projects</span> that need some <span className="font-accent">Extra Love</span>
                </h3>
                <p className="text-sm font-body text-text-secondary max-w-lg">
                  Full-suite campaigns crafted for some of the world's leading brands.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                <p className="text-2xl md:text-3xl font-display font-bold text-white">₹35,000 <span className="text-base font-body text-text-secondary">onwards</span></p>
                <div className="flex gap-3">
                  <span className="text-xs font-mono text-text-secondary hover:text-white cursor-pointer transition-colors">View Premium Work</span>
                  <Link to="/contact" className="px-4 py-2 bg-accent-primary text-black text-xs font-bold rounded-lg hover:bg-accent-secondary transition-colors">
                    Book a call
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Compare CTA */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-display text-xl font-bold text-white mb-3">Find The Right Plan For You</h3>
            <p className="text-sm font-body text-text-secondary mb-6">
              Compare prices, plans and features for all the plans and find out the perks you get with each plan
            </p>
            <Link to="/contact" className="px-6 py-3 border border-white/20 rounded-xl text-sm text-white hover:bg-white/5 transition-colors inline-block">
              Compare Plans & Pricing
            </Link>
          </motion.div>

        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}

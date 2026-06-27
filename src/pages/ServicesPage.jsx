import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, MessageSquare, Bot, Mic, ArrowRight, Check, Zap } from 'lucide-react';
import GlobalNavbar from '../components/layout/GlobalNavbar';
import GlobalFooter from '../components/layout/GlobalFooter';
import './ServicesPage.css';

/* ─── Animation Defaults ─────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];
const DURATION = 0.6;
const STAGGER = 0.08;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE, delay: i * STAGGER },
  }),
};

const fadeUpSlide = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * STAGGER },
  }),
};

const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE, delay: i * STAGGER },
  }),
};

/* ─── Counter Hook ────────────────────────────────────── */
function useCountUp(target, duration = 1200, startCounting = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, startCounting]);

  return value;
}

/* ─── Stat Card Component ─────────────────────────────── */
function StatCard({ number, suffix, label, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(number, 1200, isInView);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative pl-6 py-8 px-6"
      style={{ background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--border)' }}
    >
      <div
        className={`stat-card-border ${isInView ? 'animate' : ''}`}
        style={{ animationDelay: `${index * 80}ms` }}
      />
      <p className="font-syne text-5xl md:text-6xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
        {count}{suffix}
      </p>
      <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
        {label}
      </p>
    </motion.div>
  );
}

/* ─── Metric Card Component ───────────────────────────── */
function MetricCard({ number, suffix, label, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(number, 1200, isInView);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="text-center"
    >
      <p className="font-syne text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
        {count}{suffix}
      </p>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </motion.div>
  );
}

/* ─── Word Split Animation ────────────────────────────── */
function WordSplit({ text, className = '', startDelay = 0.2 }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: EASE, delay: startDelay + i * 0.06 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Pricing Data ────────────────────────────────────── */
const PRICING_DATA = {
  simple: [
    { videos: '4 videos', price: '₹16,000', priceSuffix: '/mo', features: ['4 professional video edits', '48-72hr turnaround', '2 revision rounds', 'Simple social-forward reels', 'Frames.io feedback'] },
    { videos: '8 videos', price: '₹30,400', priceSuffix: '/mo', features: ['8 professional video edits', '48-72hr turnaround', '2 revision rounds', 'Simple social-forward reels', 'Frames.io feedback', 'Content calendar'], recommended: true },
    { videos: '12 videos', price: '₹42,000', priceSuffix: '/mo', features: ['12 professional video edits', '48-72hr turnaround', '2 revision rounds', 'Simple social-forward reels', 'Frames.io feedback', 'Content calendar', 'Priority support'] },
  ],
  precise: [
    { videos: '4 videos', price: '₹28,000', priceSuffix: '/mo', features: ['4 premium video edits', '48-72hr turnaround', '3 revision rounds', 'Heavy motion graphics', 'Detailed storytelling', 'Personal project manager'] },
    { videos: '8 videos', price: '₹54,400', priceSuffix: '/mo', features: ['8 premium video edits', '48-72hr turnaround', '3 revision rounds', 'Heavy motion graphics', 'Detailed storytelling', 'Personal project manager', 'Content calendar'], recommended: true },
    { videos: '12 videos', price: '₹78,000', priceSuffix: '/mo', features: ['12 premium video edits', '48-72hr turnaround', '3 revision rounds', 'Heavy motion graphics', 'Detailed storytelling', 'Personal project manager', 'Content calendar', 'Priority support'] },
  ],
};

/* ─── Testimonials Data ───────────────────────────────── */
const TESTIMONIALS = [
  { quote: "Flogrit transformed our social media from zero to 2M+ views in 3 months. The ROI has been incredible.", name: "Rahul Mehta", brand: "TechVault India" },
  { quote: "Their AI automation funnel captured 400+ qualified leads in the first month alone. Game-changing.", name: "Priya Sharma", brand: "GlowSkin Co." },
  { quote: "The video editing quality is on par with top agencies charging 5× more. Absolute no-brainer.", name: "Arjun Reddy", brand: "FitForge" },
  { quote: "We went from manually chasing leads to a fully automated pipeline. Our team can finally focus on delivery.", name: "Sneha Patel", brand: "EduBridge Academy" },
];

/* ─── Video Showcase Data ─────────────────────────────── */
const VIDEO_CARDS = [
  { 
    title: 'Brand Reel', 
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #0d2800 100%)',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  { 
    title: 'Product Launch', 
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #1a2100 100%)',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  { 
    title: 'Testimonial Edit', 
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a2800 100%)',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  { 
    title: 'Motion Graphics', 
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #0d1a00 100%)',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
];

const CONTENT_PILLS = ['Reels', 'Long-form', 'Motion Graphics', 'Multilingual Captions', 'Ad Creatives'];

/* ════════════════════════════════════════════════════════
   SERVICES PAGE
   ════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pricingMode, setPricingMode] = useState('simple');

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPlans = PRICING_DATA[pricingMode];

  return (
    <div className="services-page min-h-screen flex flex-col font-body selection:bg-[#b5ff47]/30 selection:text-white">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <GlobalNavbar />

      <main className="flex-grow">
        {/* ──────────────────────────────────────────────
            SECTION 1 · HERO
            ────────────────────────────────────────────── */}
        <section className="hero-dot-grid relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden" id="services-hero">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Eyebrow */}
            <motion.p
              className="eyebrow mb-6"
              variants={fadeUpSlide}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0 }}
            >
              Growth · Content · Automation
            </motion.p>

            {/* Headline — word-split */}
            <h1 className="display-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl">
              <WordSplit text="We turn your brand into a growth machine." startDelay={0.1} />
            </h1>

            {/* Sub-headline */}
            <motion.p
              className="text-base md:text-lg max-w-2xl mb-10"
              style={{ color: 'var(--text-muted)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION, ease: EASE, delay: 0.6 }}
            >
              Businesses without social media presence are losing growth every day.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION, ease: EASE, delay: 0.8 }}
            >
              <Link
                to="/#contact"
                className="cta-glow-init inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm transition-all hover:scale-[1.03]"
                style={{
                  background: 'var(--accent)',
                  color: '#000',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-dim)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Book a Discovery Call <ArrowRight size={16} />
              </Link>
              <a
                href="#services-showcase"
                className="inline-flex items-center gap-2 text-sm transition-colors group"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="group-hover:underline group-hover:text-white transition-colors">See our work ↓</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            SECTION 2 · PAIN POINT
            ────────────────────────────────────────────── */}
        <section className="py-20 md:py-[120px]" id="pain-point">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-12"
            >
              <p className="section-label mb-4">THE PROBLEM WE SOLVE</p>
              <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl max-w-2xl">
                Your competitors are already winning attention.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard number={73} suffix="%" label="Of businesses with no social presence lose leads to competitors" index={0} />
              <StatCard number={5} suffix="×" label="More revenue generated by brands with active content" index={1} />
              <StatCard number={48} suffix="hrs" label="Average response delay that kills conversion" index={2} />
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            SECTION 3 · SERVICES / VIDEO SHOWCASE
            ────────────────────────────────────────────── */}
        <section className="py-20 md:py-[120px]" id="services-showcase">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-6"
            >
              <p className="section-label mb-4">SERVICES</p>
              <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mb-4">What we create</h2>
              <p className="text-base max-w-2xl" style={{ color: 'var(--text-muted)' }}>
                Short-form reels, YouTube edits, brand content, motion graphics, and caption-driven multilingual videos.
              </p>
            </motion.div>

            {/* Video Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10"
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {VIDEO_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  className="video-card group"
                  variants={scaleIn}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ background: card.gradient }}
                >
                  {/* Looping Video element */}
                  {card.videoUrl && (
                    <video
                      src={card.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                    />
                  )}

                  {/* Dark overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 z-10 pointer-events-none" />

                  {/* Visual content area */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-4 z-20">
                    <p className="text-xs font-semibold text-white/95 text-center tracking-wide">{card.title}</p>
                  </div>
                  {/* Play overlay */}
                  <div className="play-overlay z-30">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(181,255,71,0.15)', border: '1px solid rgba(181,255,71,0.3)' }}>
                      <Play size={20} style={{ color: 'var(--accent)' }} fill="currentColor" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Content Type Pills */}
            <div className="flex flex-wrap gap-3">
              {CONTENT_PILLS.map((pill, i) => (
                <motion.span
                  key={pill}
                  className="content-pill"
                  variants={slideFromLeft}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {pill}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            SECTION 4 · SOCIAL PROOF
            ────────────────────────────────────────────── */}
        <section className="py-20 md:py-[120px]" id="social-proof">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-12"
            >
              <p className="section-label mb-4">SOCIAL PROOF</p>
              <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl">Testimonials & results</h2>
            </motion.div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-16" style={{ borderBottom: '1px solid var(--border)' }}>
              <MetricCard number={50} suffix="M+" label="Views delivered" index={0} />
              <MetricCard number={120} suffix="+" label="Brands served" index={1} />
              <MetricCard number={98} suffix="%" label="Client retention" index={2} />
            </div>

            {/* Testimonial Marquee */}
            <div className="overflow-hidden -mx-6 px-6">
              <div className="testimonial-marquee flex gap-6" style={{ width: 'max-content' }}>
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                  <motion.div
                    key={i}
                    className="testimonial-card"
                    variants={slideFromRight}
                    custom={i % TESTIMONIALS.length}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      "{t.quote}"
                    </p>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.brand}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            SECTION 5 · PRICING
            ────────────────────────────────────────────── */}
        <section className="py-20 md:py-[120px]" id="pricing">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="text-center mb-10"
            >
              <p className="section-label mb-4">PRICING</p>
              <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mb-4">
                Plans

              </h2>
            </motion.div>

            {/* Toggle */}
            <motion.div
              className="flex justify-center mb-12"
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="toggle-pill">
                <button
                  className={pricingMode === 'simple' ? 'active' : ''}
                  onClick={() => setPricingMode('simple')}
                >
                  Simple
                </button>
                <button
                  className={pricingMode === 'precise' ? 'active' : ''}
                  onClick={() => setPricingMode('precise')}
                >
                  Precise
                </button>
              </div>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <AnimatePresence mode="wait">
                {currentPlans.map((plan, i) => (
                  <motion.div
                    key={`${pricingMode}-${i}`}
                    className={`pricing-card p-8 flex flex-col ${plan.recommended ? 'featured' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE, delay: i * 0.1 }}
                  >
                    {plan.recommended && (
                      <div className="inline-flex items-center self-start gap-1 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-4"
                        style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(181,255,71,0.2)' }}>
                        <Zap size={10} /> Recommended
                      </div>
                    )}

                    <h3 className="font-syne text-lg font-bold text-white mb-2">{plan.videos}</h3>

                    <div className="mb-6">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={plan.price}
                          className="font-syne text-3xl md:text-4xl font-bold"
                          style={{ color: 'var(--accent)' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          {plan.price}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-sm ml-1" style={{ color: 'var(--text-muted)' }}>{plan.priceSuffix}</span>
                    </div>

                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                          <Check size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/#contact"
                      className="btn-shimmer block w-full py-4 text-center font-bold text-sm rounded-xl transition-all"
                      style={{
                        background: plan.recommended ? 'var(--accent)' : 'transparent',
                        color: plan.recommended ? '#000' : 'var(--accent)',
                        border: plan.recommended ? 'none' : '1px solid var(--accent)',
                      }}
                    >
                      Get Started →
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Custom Card */}
            <motion.div
              className="pricing-card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-syne text-xl font-bold text-white mb-2">Custom</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Custom scope, enterprise volume, or unique formats? Let's talk.
                </p>
              </div>
              <Link
                to="/#contact"
                className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.03]"
                style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'transparent' }}
              >
                Book a Call <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            SECTION 6 · AI AUTOMATION
            ────────────────────────────────────────────── */}
        <section className="py-20 md:py-[120px]" id="ai-automation">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-12"
            >
              <p className="section-label mb-4">AI AUTOMATION</p>
              <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl mb-4">AI lead funnels & automation</h2>
              <p className="text-base max-w-2xl" style={{ color: 'var(--text-muted)' }}>
                Your audience is watching — but not converting. We build the systems that turn viewers into customers, 24/7.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: MessageSquare, title: 'Meta → WhatsApp & Instagram automations', desc: 'Capture leads directly from your Meta ads and route them into automated WhatsApp sequences.' },
                { icon: Bot, title: 'Chatbots for websites', desc: 'AI-powered chatbots that qualify, nurture, and book calls while you sleep.' },
                { icon: Mic, title: 'Voice agents for businesses', desc: 'Custom voice AI that handles inbound calls, answers FAQs, and schedules appointments.' },
              ].map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    className="feature-card group"
                    variants={fadeUp}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{ background: 'var(--accent-glow)', border: '1px solid rgba(181,255,71,0.15)' }}>
                      <Icon size={22} className="feature-icon" style={{ color: 'var(--accent)' }} />
                    </div>
                    <h3 className="font-syne text-lg font-bold text-white mb-3">{feat.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{feat.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* How It Works — Step Flow */}
            <motion.div
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <p className="eyebrow mb-8">HOW IT WORKS</p>
              <HowItWorksFlow />
            </motion.div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            SECTION 7 · FINAL CTA
            ────────────────────────────────────────────── */}
        <section className="py-24 md:py-[140px]" id="final-cta">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="display-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              <WordSplit text="Automate your business. 24/7." />
            </h2>

            <motion.p
              className="text-sm md:text-base mb-10"
              style={{ color: 'var(--text-muted)' }}
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Starts from ₹16,000/month. No lock-ins.
            </motion.p>

            <motion.div
              variants={fadeUpSlide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center gap-6"
            >
              <Link
                to="/#contact"
                className="cta-pulse inline-flex items-center gap-2 font-bold text-sm transition-all hover:scale-[1.03]"
                style={{
                  background: 'var(--accent)',
                  color: '#000',
                  padding: '18px 40px',
                  borderRadius: 6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-dim)';
                  e.currentTarget.classList.remove('cta-pulse');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.classList.add('cta-pulse');
                }}
              >
                Book Your Discovery Call <ArrowRight size={16} />
              </Link>

              <p className="enterprise-link text-xs cursor-pointer group" style={{ color: 'var(--text-muted)' }}>
                <Link to="/#contact" className="hover:underline hover:text-white transition-colors">
                  Looking for SaaS animations, product launches, or enterprise branding?{' '}
                  <span className="enterprise-arrow">→</span>
                </Link>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}

/* ─── How It Works Step Flow ───────────────────────────── */
function HowItWorksFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const steps = [
    { num: '1', label: 'Audience sees content' },
    { num: '2', label: 'Bot captures lead' },
    { num: '3', label: 'Auto follow-up closes sale' },
  ];

  return (
    <div ref={ref}>
      {/* Desktop: horizontal flow */}
      <div className="hidden md:flex items-center gap-0">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-center flex-1">
            <motion.div
              className="flex items-center gap-4 shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.2 }}
            >
              <div className="step-circle">{step.num}</div>
              <p className="text-sm font-medium text-white whitespace-nowrap">{step.label}</p>
            </motion.div>

            {i < steps.length - 1 && (
              <div className="flex-1 mx-4 h-[2px] overflow-hidden" style={{ background: 'var(--border)' }}>
                <motion.div
                  className="h-full"
                  style={{ background: 'var(--accent)' }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.2 + 0.3 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical flow */}
      <div className="flex md:hidden flex-col items-start gap-0">
        {steps.map((step, i) => (
          <div key={step.num}>
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.2 }}
            >
              <div className="step-circle">{step.num}</div>
              <p className="text-sm font-medium text-white">{step.label}</p>
            </motion.div>

            {i < steps.length - 1 && (
              <div className="w-[2px] h-8 ml-6 overflow-hidden" style={{ background: 'var(--border)' }}>
                <motion.div
                  className="w-full"
                  style={{ background: 'var(--accent)' }}
                  initial={{ height: 0 }}
                  animate={isInView ? { height: '100%' } : {}}
                  transition={{ duration: 0.4, ease: EASE, delay: i * 0.2 + 0.3 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

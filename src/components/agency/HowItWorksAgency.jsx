import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "ATTRACT",
    desc: "We create and edit content that gets views — YouTube, Reels, LinkedIn. Strategy + production, handled."
  },
  {
    num: "02",
    title: "CAPTURE",
    desc: "Every viewer is a potential lead. We build opt-in systems, lead magnets, and landing pages to capture them."
  },
  {
    num: "03",
    title: "CONVERT",
    desc: "AI automation funnels nurture leads via WhatsApp and email sequences until they book a call or buy."
  },
  {
    num: "04",
    title: "SCALE",
    desc: "We analyze what's converting and double down. Continuous optimization until your pipeline runs itself."
  }
];

export default function HowItWorksAgency() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);
  const activeStepRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // Keep ref in sync to use in passive-false event listener without re-binding
  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  // Screen resize listener to swap coords dynamically in JS
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle manual scrollbar dragging or touch swiping
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const containerTop = window.scrollY + rect.top;

      // When the container is active and pinned in viewport
      if (rect.top <= 10 && rect.bottom >= viewportHeight - 10) {
        const scrolledPast = -rect.top;
        const progress = scrolledPast / viewportHeight; // ranges from 0 to 3
        const step = Math.min(steps.length - 1, Math.max(0, Math.round(progress)));

        if (step !== activeStepRef.current) {
          setActiveStep(step);
        }

        // Auto-snap scrollbar to target step after user stops scrolling (touch & drag fallback)
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          if (!isProgrammaticScroll.current) {
            const targetScrollY = containerTop + step * viewportHeight;
            if (Math.abs(window.scrollY - targetScrollY) > 15) {
              isProgrammaticScroll.current = true;
              window.scrollTo({
                top: targetScrollY,
                behavior: 'smooth'
              });
              setTimeout(() => {
                isProgrammaticScroll.current = false;
              }, 800);
            }
          }
        }, 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Intercept scroll wheel events for high-accuracy single step scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // We only hijack the scroll if the container is fully in viewport
      const isPinned = rect.top <= 10 && rect.bottom >= viewportHeight - 10;
      if (!isPinned) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentStepVal = activeStepRef.current;
      const nextStep = currentStepVal + direction;

      // If there is a valid next step in this section, transition to it
      if (nextStep >= 0 && nextStep < steps.length) {
        e.preventDefault();

        isProgrammaticScroll.current = true;
        setActiveStep(nextStep);

        const containerTop = window.scrollY + rect.top;
        const targetScrollY = containerTop + nextStep * viewportHeight;

        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        });

        // Set cooldown before unlocking scroll listeners
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 800); // matches smooth scroll transition time
      }
    };

    // Passive false allows us to use e.preventDefault() to block standard scrolling
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Responsive positions for the steps along the curve (percentages of curve container)
  const desktopCoords = [
    { left: '15%', top: '60%' },
    { left: '38%', top: '42%' },
    { left: '62%', top: '42%' },
    { left: '85%', top: '60%' }
  ];

  const mobileCoords = [
    { left: '20%', top: '15%' },
    { left: '42%', top: '38%' },
    { left: '42%', top: '62%' },
    { left: '20%', top: '85%' }
  ];

  const coords = isMobile ? mobileCoords : desktopCoords;

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-bg-primary">
      {/* Sticky viewport content */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-16 md:py-24 px-6">

        {/* Skip button */}
        <button
          onClick={() => { containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }}
          className="absolute top-4 right-6 text-xs font-mono text-text-secondary hover:text-white transition-colors z-30"
        >
          Skip →
        </button>

        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              The Flogrit <span className="font-accent">Growth System</span>
            </h2>
            <p className="text-base font-body text-text-secondary max-w-2xl mx-auto">
              Views without conversions is just vanity. We fix both.
            </p>
            <p className="text-xs font-mono text-text-secondary/60 mt-4 animate-bounce">
              ↓ Scroll to walk through the process
            </p>
          </motion.div>
        </div>

        {/* Curved Flow Visual Area */}
        <div className="relative w-full max-w-5xl mx-auto h-[45vh] md:h-[40vh] my-auto flex items-center justify-center">

          {/* Desktop Curved Path SVG */}
          <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              {/* Background Path (Dashed) */}
              <path
                d="M 15,60 Q 50,20 85,60"
                fill="none"
                stroke="#1E1E1E"
                strokeWidth="0.5"
                strokeDasharray="1 1"
              />
              {/* Active Progress Path */}
              <motion.path
                d="M 15,60 Q 50,20 85,60"
                fill="none"
                stroke="#C6FF34"
                strokeWidth="0.6"
                strokeDasharray="1 1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: activeStep / 3 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Mobile Curved Path SVG */}
          <div className="block md:hidden absolute inset-0 w-full h-full pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              {/* Background Path */}
              <path
                d="M 20,15 Q 70,50 20,85"
                fill="none"
                stroke="#1E1E1E"
                strokeWidth="0.5"
                strokeDasharray="1.5 1.5"
              />
              {/* Active Progress Path */}
              <motion.path
                d="M 20,15 Q 70,50 20,85"
                fill="none"
                stroke="#C6FF34"
                strokeWidth="0.6"
                strokeDasharray="1.5 1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: activeStep / 3 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Interactive Steps along the curve */}
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;

            return (
              <motion.button
                key={idx}
                onClick={() => {
                  isProgrammaticScroll.current = true;
                  setActiveStep(idx);
                  if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const containerTop = window.scrollY + rect.top;
                    window.scrollTo({
                      top: containerTop + idx * window.innerHeight,
                      behavior: 'smooth'
                    });
                  }
                  setTimeout(() => {
                    isProgrammaticScroll.current = false;
                  }, 800);
                }}
                style={{
                  left: coords[idx].left,
                  top: coords[idx].top
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20 cursor-pointer focus:outline-none"
                animate={{
                  scale: isActive ? 1.25 : 0.95,
                  opacity: isActive ? 1 : 0.4
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Node Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold transition-all duration-300 border ${isActive
                      ? 'bg-accent-primary text-black border-accent-primary shadow-[0_0_20px_rgba(198,255,52,0.4)]'
                      : 'bg-bg-secondary text-text-secondary border-border-default hover:border-accent-primary/50'
                    }`}
                >
                  {step.num}
                </div>

                {/* Step Short Title (displayed just below/above circle) */}
                <span
                  className={`absolute translate-y-8 text-[11px] font-mono tracking-widest font-bold whitespace-nowrap ${isActive ? 'text-accent-primary' : 'text-text-secondary'
                    }`}
                >
                  {step.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Central Display Card for Active Step Detail Text */}
        <div className="w-full max-w-2xl mx-auto mt-auto">
          <div className="bg-bg-secondary border border-border-default p-8 rounded-[4px] min-h-[140px] flex flex-col justify-center items-center text-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-accent-primary">
                  Step {steps[activeStep].num} — {steps[activeStep].title}
                </div>
                <p className="text-text-primary text-base md:text-lg leading-relaxed max-w-xl mx-auto font-body">
                  {steps[activeStep].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll progress dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  isProgrammaticScroll.current = true;
                  setActiveStep(idx);
                  if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const containerTop = window.scrollY + rect.top;
                    window.scrollTo({
                      top: containerTop + idx * window.innerHeight,
                      behavior: 'smooth'
                    });
                  }
                  setTimeout(() => {
                    isProgrammaticScroll.current = false;
                  }, 800);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStep === idx
                    ? 'w-6 bg-accent-primary'
                    : 'bg-border-default hover:bg-text-secondary/50'
                  }`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

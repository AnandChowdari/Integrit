
# INTEGRIT WEBSITE — COMPLETE REDESIGN IMPLEMENTATION PROMPT
> For: Coding AI (Claude / Cursor / v0)  
> Stack: React 19 + Vite + TailwindCSS v3 + Framer Motion v12 + React Router DOM v7  
> Goal: A new visitor understands what Integrit does in <5 seconds, trusts it immediately, and takes action.

---

## GROUND RULES (READ BEFORE TOUCHING ANY FILE)

1. **Color system: LOCKED.** Never change `#0A0A0A`, `#111111`, `#161616`, `#C6FF34`, `#A8E620`, `#FFFFFF`, `#888888`, `#1E1E1E`. Use them via the existing Tailwind config keys (`bg-primary`, `accent-primary`, etc.).
2. **Font system: CHANGING.** Replace the current Syne/DM Sans/JetBrains Mono triple with:
   - Display: **Space Grotesk** (`font-display`) — bold, technical, more authoritative than Syne
   - Body: **Inter** (`font-body`) — cleaner scanability than DM Sans
   - Mono: **JetBrains Mono** (`font-mono`) — keep unchanged
   - Update `index.html` Google Fonts link and `tailwind.config.js` fontFamily entries accordingly.
3. **Existing animations: PRESERVE ALL.** Do not remove `marquee`, `flow-dash`, `float`, `scroll-jacked steps`, `3D tilt`, `pathLength`, or `animate-pulse`. You may add to them; you may not remove them.
4. **Routing: FROZEN.** Do not rename, add, or remove any route in `App.jsx` / `main.jsx`. All existing paths remain identical.
5. **Mobile-first always.** Every component you write or modify must be functional and beautiful on 375px width before you touch desktop layouts.
6. **One source of truth for motion.** Create `/src/lib/motionVariants.js` and export all Framer Motion `variants` objects from there. Import into components — do not inline complex variants.

---

## STEP 0 — GLOBAL SETUP FILES

### 0a. `tailwind.config.js` — Patch only these keys

```js
// In theme.extend.fontFamily:
fontFamily: {
  display: ['Space Grotesk', 'sans-serif'],
  body:    ['Inter', 'sans-serif'],
  mono:    ['JetBrains Mono', 'monospace'],
},
// In theme.extend.animation — ADD these new entries (keep existing ones):
animation: {
  // existing...
  'count-up':      'countUp 2s ease-out forwards',
  'slide-up-fade': 'slideUpFade 0.5s ease-out forwards',
  'glow-pulse':    'glowPulse 3s ease-in-out infinite',
  'sticky-drop':   'stickyDrop 0.3s ease-out forwards',
},
// In theme.extend.keyframes — ADD:
keyframes: {
  // existing...
  countUp:     { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
  slideUpFade: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
  glowPulse:   { '0%,100%': { boxShadow: '0 0 20px rgba(198,255,52,0.1)' }, '50%': { boxShadow: '0 0 40px rgba(198,255,52,0.35)' } },
  stickyDrop:  { from: { transform: 'translateY(-100%)' }, to: { transform: 'translateY(0)' } },
},
```

### 0b. `index.html` — Replace Google Fonts link

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 0c. `/src/lib/motionVariants.js` — CREATE THIS FILE

```js
// All shared Framer Motion variants used across the site
export const fadeUpVariant = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const scaleInVariant = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const slideLeftVariant = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const slideRightVariant = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const glassCardHover = {
  rest:  { y: 0, borderColor: 'rgba(255,255,255,0.06)', boxShadow: 'none' },
  hover: { y: -4, borderColor: 'rgba(198,255,52,0.2)', boxShadow: '0 0 24px rgba(198,255,52,0.08)' },
};
```

### 0d. `/src/components/ui/SectionDivider.jsx` — CREATE THIS FILE

```jsx
// Reusable gradient section divider. Replace ALL hard `<hr>` or border-only section breaks.
export default function SectionDivider({ direction = 'down' }) {
  return (
    <div
      className="w-full h-24 pointer-events-none"
      style={{
        background: direction === 'down'
          ? 'linear-gradient(to bottom, #0A0A0A, transparent)'
          : 'linear-gradient(to top, #0A0A0A, transparent)',
      }}
    />
  );
}
```

### 0e. `/src/components/ui/AnimatedCounter.jsx` — CREATE THIS FILE

```jsx
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}
```

---

## STEP 1 — GLOBAL NAVBAR (`/src/components/Navbar.jsx`)

### Changes required:

**1a. Add a visual separator between "Agency" and "Tools" nav groups:**

```jsx
// Inside nav links container, AFTER the "Products" link, add this pill label:
<span className="hidden lg:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-accent-primary/60 border border-accent-primary/20 rounded-full bg-accent-primary/5">
  TOOLS
</span>
```

**1b. Replace the CTA button text and add a secondary urgency line:**

```jsx
// Primary CTA in navbar:
<a href="/contact" className="...existing neon button classes...">
  Book a Call
</a>
// Directly below the button, ONLY on desktop:
<p className="hidden lg:block text-[10px] font-mono text-text-secondary text-center mt-1">
  3 spots left this month
</p>
```

**1c. Sticky behavior: the navbar should gain `backdrop-blur-md bg-primary/80 border-b border-[#1E1E1E]` after 60px of scroll.** Add a `useScrollTrigger` hook:

```jsx
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 60);
  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}, []);
// Apply: className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-[#0A0A0A]/80 border-b border-[#1E1E1E]' : 'bg-transparent'}`}
```

---

## STEP 2 — STICKY CTA BAR (`/src/components/ui/StickyCTABar.jsx`) — CREATE NEW

This bar appears **after 50% page scroll** and is fixed to the bottom of the viewport. It should NOT appear on the `/products/captiongrit` page (that page has its own CTA).

```jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function StickyCTABar() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const exclude = ['/products/captiongrit'];

  useEffect(() => {
    const handler = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setShow(pct > 0.5);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (exclude.includes(pathname)) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-4 py-3 md:px-8
                     bg-[#111111]/90 backdrop-blur-md border-t border-[#1E1E1E]"
        >
          <p className="text-sm font-body text-text-secondary hidden sm:block">
            <span className="text-white font-medium">Only 3 client spots</span> open this month.
          </p>
          <div className="flex gap-3 w-full sm:w-auto">
            <a href="/contact"
               className="flex-1 sm:flex-none px-5 py-2.5 bg-accent-primary text-black text-sm font-semibold font-body rounded-lg
                          hover:bg-accent-secondary transition-colors text-center whitespace-nowrap
                          shadow-[0_0_20px_rgba(198,255,52,0.2)]">
              Book a Discovery Call →
            </a>
            <a href="/products/captiongrit"
               className="flex-1 sm:flex-none px-5 py-2.5 border border-accent-primary/40 text-accent-primary text-sm font-body rounded-lg
                          hover:bg-accent-primary/10 transition-colors text-center whitespace-nowrap">
              Get Captiongrit
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Mount in `App.jsx`**: Add `<StickyCTABar />` as a sibling to `<Routes>`, outside any route.

---

## STEP 3 — HOME PAGE: COMPLETE SECTION REDESIGNS

### 3.1 SECTION 1: Hero (`AgencyHero.jsx`)

**Problem → Solution narrative arc.** The hero must answer three questions in order: *What's the problem? Who solves it? What do I do next?*

**Left Column Changes:**

```jsx
// ABOVE the H1, add a problem-framing eyebrow badge:
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1E1E1E] bg-[#111111] mb-6">
  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
  <span className="text-[11px] font-mono text-text-secondary tracking-widest uppercase">
    For creators & businesses in India
  </span>
</div>

// H1 — change font scale dramatically. Current size is too close to body text.
// New: clamp(2.75rem, 6vw, 5rem) — use Tailwind: text-5xl md:text-6xl lg:text-7xl
// Weight: font-bold, tracking-tight (-0.03em)
<h1 className="font-display font-bold text-5xl md:text-6xl lg:text-[5rem] leading-[1.08] tracking-tight text-white">
  We grow your audience.<br />
  <span className="text-text-secondary">Then we convert them.</span>
</h1>

// Subtext — increase visual separation from H1 with mt-6, not mt-2:
<p className="mt-6 text-base md:text-lg font-body text-text-secondary max-w-md leading-relaxed">
  Integrit combines content marketing, video editing, and AI automation funneling 
  to turn views into real, paying leads — on autopilot.
</p>

// CTA row — add a "Book a Discovery Call" primary button ABOVE "See Our Services":
<div className="mt-8 flex flex-col sm:flex-row gap-3">
  <a href="/contact"
     className="px-6 py-3.5 bg-accent-primary text-black font-semibold font-body rounded-xl
                hover:bg-accent-secondary transition-all hover:-translate-y-0.5
                shadow-[0_0_24px_rgba(198,255,52,0.2)] hover:shadow-[0_0_32px_rgba(198,255,52,0.35)]
                text-center text-sm">
    Book a Discovery Call →
  </a>
  <a href="/services"
     className="px-6 py-3.5 border border-accent-primary/40 text-accent-primary font-body rounded-xl
                hover:bg-accent-primary/10 transition-all text-center text-sm">
    See Our Services
  </a>
</div>

// Urgency line immediately below CTAs:
<p className="mt-3 text-xs font-mono text-text-secondary/70">
  ⚡ Only 3 new client spots available this month
</p>

// Trust checklist — change layout to horizontal pill row, not vertical list:
<div className="mt-8 flex flex-wrap gap-2">
  {['Marketing + Editing', 'AI Lead Funnels', 'Creator Tools', 'Done-For-You'].map(item => (
    <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono
                                bg-[#161616] border border-[#1E1E1E] rounded-full text-text-secondary">
      <span className="text-accent-primary">✓</span> {item}
    </span>
  ))}
</div>
```

**Right Column (3D Widget):** Keep the existing 3D tilt and SVG flow-dash animation completely intact. Add only these two enhancements:
- Wrap the widget container with `motion.div` from `motionVariants.js` using `slideRightVariant`
- On mobile (`md:hidden`): replace the 3D widget with a static 2-column mini stat grid (50K+ Views, 10+ Clients, 3x Conversion, 100% DFY) using `AnimatedCounter` — the 3D canvas is too heavy for mobile.

```jsx
// Mobile stat fallback (shown only on < md):
<div className="grid grid-cols-2 gap-3 md:hidden mt-8">
  {[
    { value: 50, suffix: 'K+', label: 'Combined Views' },
    { value: 10, suffix: '+',  label: 'Clients Served' },
    { value: 3,  suffix: 'x',  label: 'Lead Conversion Lift' },
    { value: 100,suffix: '%',  label: 'Done-For-You' },
  ].map(stat => (
    <div key={stat.label} className="glass-card p-4">
      <p className="text-2xl font-display font-bold text-accent-primary">
        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
      </p>
      <p className="text-xs font-mono text-text-secondary mt-1">{stat.label}</p>
    </div>
  ))}
</div>
```

**Section bottom:** Add `<SectionDivider direction="down" />` as last child.

---

### 3.2 SECTION 2: Social Proof Bar (`AgencySocialProof.jsx`)

Replace static numbers with `AnimatedCounter`. Add micro-labels for context. Add a subtle horizontal gradient separator above and below.

```jsx
// Full replacement of the stat items:
const stats = [
  { value: 50,  suffix: 'K+', label: 'Combined Views Generated', context: 'across YouTube & Reels' },
  { value: 10,  suffix: '+',  label: 'Clients Served',           context: 'creators & businesses' },
  { value: 3,   suffix: 'x',  label: 'Avg Lead Conversion Lift', context: 'vs industry baseline' },
  { value: 100, suffix: '%',  label: 'Done-For-You',             context: 'we handle everything' },
];

// Render:
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#1E1E1E]">
  {stats.map((stat, i) => (
    <motion.div key={i} variants={fadeUpVariant} className="text-center px-6 py-8">
      <p className="text-4xl md:text-5xl font-display font-bold text-accent-primary glow-text">
        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
      </p>
      <p className="mt-1 text-sm font-body text-white font-medium">{stat.label}</p>
      <p className="mt-0.5 text-xs font-mono text-text-secondary">{stat.context}</p>
    </motion.div>
  ))}
</div>
```

---

### 3.3 SECTION 3: What We Do (`WhatWeDoSection.jsx`)

**Audience Separation.** This is the key trust/clarity moment — visitors self-select into Agency or Tools customer.

Add a label strip above the headline:

```jsx
<div className="flex items-center gap-4 mb-4">
  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#1E1E1E]" />
  <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">Two ways Integrit works</span>
  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#1E1E1E]" />
</div>
```

**Card 1 (Agency):** Add a large SVG illustration inside the card header — a simplified upward-trending chart with a neon green glow line drawn with Framer Motion `pathLength`. This card gets a green glow border on hover.

**Card 2 (Products):** Add a miniature Adobe Premiere-style panel mock (just the top bar: dark gray rectangle, small tabs labeled "Captions | Settings", an accent-colored "Generate" button inside). SVG, static, purely decorative.

Both cards: Make the audience tag explicit:

```jsx
// Top of each card, before the icon:
<span className="text-[10px] font-mono tracking-widest text-text-secondary uppercase mb-3 block">
  For Business Owners & Creators  {/* Card 1 */}
</span>
<span className="text-[10px] font-mono tracking-widest text-text-secondary uppercase mb-3 block">
  For Video Editors & Creators  {/* Card 2 */}
</span>
```

---

### 3.4 SECTION 4: Services Preview (`AgencyServicesPreview.jsx`)

**Add icons.** Each bento card needs a Lucide icon + a small colored illustration behind it as a decorative layer.

```jsx
import { Film, Bot, BarChart3, TrendingUp } from 'lucide-react';

// Large card (Video Editing) — add icon header:
<div className="flex items-center gap-3 mb-4">
  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20
                  flex items-center justify-center">
    <Film className="w-5 h-5 text-accent-primary" />
  </div>
  <span className="text-xs font-mono text-text-secondary">01 / Core Service</span>
</div>

// Each small card gets the same treatment with Bot, BarChart3, TrendingUp respectively.
```

**Add Agency Comparison Table** — new sub-section at the BOTTOM of `AgencyServicesPreview.jsx`, before its CTA:

```jsx
// File-level addition inside AgencyServicesPreview.jsx, below the bento grid:
<div className="mt-16">
  <p className="text-xs font-mono text-text-secondary uppercase tracking-widest text-center mb-8">
    Why Integrit over alternatives
  </p>
  <div className="overflow-x-auto">
    <table className="w-full text-sm font-body">
      <thead>
        <tr className="border-b border-[#1E1E1E]">
          <th className="text-left py-3 pr-6 text-text-secondary font-normal">Capability</th>
          <th className="py-3 px-4 text-accent-primary font-semibold">Integrit</th>
          <th className="py-3 px-4 text-text-secondary font-normal">Freelancer</th>
          <th className="py-3 px-4 text-text-secondary font-normal">In-House Team</th>
          <th className="py-3 px-4 text-text-secondary font-normal">Agency</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#1E1E1E]">
        {[
          ['Video Editing',            '✅', '✅', '✅', '✅'],
          ['Content Strategy',         '✅', '❌', '✅', '✅'],
          ['AI Lead Funnels',          '✅', '❌', '❌', 'Rare'],
          ['Done-For-You Pipeline',    '✅', '❌', '✅', '✅'],
          ['Adobe Plugin (Captiongrit)','✅', '❌', '❌', '❌'],
          ['India-Aware Pricing',      '✅', '✅', '✅', '❌'],
          ['Fixed Monthly Retainer',   '❌', '❌', 'High', 'Very High'],
        ].map(([cap, ...vals]) => (
          <tr key={cap}>
            <td className="py-3 pr-6 text-white">{cap}</td>
            {vals.map((v, i) => (
              <td key={i} className={`py-3 px-4 text-center ${i === 0 ? 'text-accent-primary font-medium' : 'text-text-secondary'}`}>
                {v}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
```

---

### 3.5 SECTION 5: How It Works (`HowItWorksAgency.jsx`)

**Decision on scroll-jack:** Keep the scroll-jacked section but add a **skip mechanism** and improve legibility. The confusion comes from users not knowing it's scroll-jacked.

```jsx
// Add above the scroll-jacked container:
<div className="text-center mb-6">
  <p className="text-xs font-mono text-text-secondary animate-bounce">
    ↓ Scroll inside this section to walk through the process
  </p>
</div>

// Add a "Skip →" button in the top-right of the sticky container:
<button
  onClick={() => { /* scroll past the section */ sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }}
  className="absolute top-4 right-4 text-xs font-mono text-text-secondary hover:text-white transition-colors z-10"
>
  Skip →
</button>
```

No structural changes to the existing 4-step scroll mechanism.

---

### 3.6 SECTION 6: Products Preview (`AgencyProductsSection.jsx`)

Replace the current Captiongrit card with a richer preview panel.

```jsx
// New Captiongrit card structure:
<div className="glass-card p-0 overflow-hidden group hover:-translate-y-1 transition-transform duration-300
                border border-[#1E1E1E] hover:border-accent-primary/20 hover:shadow-[0_0_40px_rgba(198,255,52,0.06)]">
  
  {/* Top: Fake Adobe UI Panel — PURELY DECORATIVE */}
  <div className="bg-[#1c1c1c] border-b border-[#2a2a2a] px-4 py-2 flex items-center gap-3">
    <div className="flex gap-1.5">
      <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
    </div>
    <span className="text-[10px] font-mono text-text-secondary">Captiongrit — Adobe CEP Extension</span>
    <span className="ml-auto text-[10px] font-mono text-accent-primary flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
      Connected
    </span>
  </div>

  {/* Middle: Language + mode chips */}
  <div className="px-5 py-4 border-b border-[#1E1E1E]">
    <p className="text-[10px] font-mono text-text-secondary mb-2 uppercase tracking-wider">Selected language</p>
    <div className="flex flex-wrap gap-2">
      {['Telugu', 'Hindi', 'Tamil', 'English', '+20 more'].map(lang => (
        <span key={lang} className={`px-2.5 py-1 rounded-full text-[10px] font-mono border
          ${lang === 'Telugu' ? 'bg-accent-primary/15 border-accent-primary/40 text-accent-primary'
                              : 'bg-[#161616] border-[#2a2a2a] text-text-secondary'}`}>
          {lang}
        </span>
      ))}
    </div>
  </div>

  {/* Bottom: Card content */}
  <div className="p-5">
    <div className="flex items-start justify-between mb-3">
      <div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-accent-primary mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
          Now Available — v1.0
        </span>
        <h3 className="text-xl font-display font-bold text-white">Captiongrit</h3>
        <p className="text-xs font-mono text-text-secondary mt-0.5">Adobe Premiere Pro & After Effects</p>
      </div>
      <span className="text-right">
        <p className="text-lg font-display font-bold text-accent-primary">₹999</p>
        <p className="text-[10px] font-mono text-text-secondary">one-time</p>
      </span>
    </div>
    <p className="text-sm font-body text-text-secondary leading-relaxed mb-4">
      AI-powered captions in 24 languages, inside your Adobe timeline. Natural, Word-by-Word, or Phonetic mode.
    </p>
    <div className="flex gap-3">
      <a href="/products/captiongrit"
         className="flex-1 px-4 py-2.5 bg-accent-primary text-black text-xs font-semibold font-body rounded-lg
                    hover:bg-accent-secondary transition-colors text-center">
        View Plugin →
      </a>
      <a href="/products/captiongrit#pricing"
         className="px-4 py-2.5 border border-accent-primary/40 text-accent-primary text-xs font-body rounded-lg
                    hover:bg-accent-primary/10 transition-colors text-center">
        See Pricing
      </a>
    </div>
  </div>
</div>
```

---

### 3.7 SECTION 7: Who We Work With (`WhoWeWorkWithSection.jsx`)

Add a self-selection CTA inside each audience card so visitors navigate directly to the most relevant next step:

```jsx
// Inside each of the 3 audience cards, after the body text:
const audiences = [
  {
    title: 'Business Owners & Coaches',
    body: 'You have expertise. We build the content machine and automation system that turns your knowledge into clients.',
    cta: 'See How We Help Coaches →',
    href: '/services',
  },
  {
    title: 'Content Creators',
    body: 'You already create. We edit faster, distribute smarter, and build the funnel that monetizes your audience.',
    cta: 'Explore Creator Tools →',
    href: '/products',
  },
  {
    title: 'Startups & Brands',
    body: 'You need visibility and leads. We run the full stack — from content to conversion — so your team can focus on building.',
    cta: 'Book a Discovery Call →',
    href: '/contact',
  },
];
```

---

### 3.8 SECTION 8: Final CTA (`AgencyFinalCta.jsx`)

Add urgency + social proof immediately above the CTA buttons:

```jsx
// ADD before the button row:
<div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
  <div className="flex -space-x-2">
    {/* 3 generic avatar circles as placeholder for client avatars */}
    {['A', 'B', 'C'].map((l, i) => (
      <div key={i} className="w-8 h-8 rounded-full bg-[#1E1E1E] border-2 border-[#0A0A0A]
                              flex items-center justify-center text-xs font-mono text-text-secondary">
        {l}
      </div>
    ))}
  </div>
  <p className="text-sm font-body text-text-secondary">
    <span className="text-white">10+ clients</span> already scaling with Integrit
  </p>
  <span className="hidden sm:block h-4 w-px bg-[#1E1E1E]" />
  <p className="text-sm font-mono text-accent-primary">⚡ 3 spots left this month</p>
</div>
```

---

## STEP 4 — SERVICES PAGE (`ServicesPage.jsx`)

### 4a. Add a pricing anchor to fix the "Custom Pricing = friction" problem

Below each service's tag list, add a starting-price line:

```jsx
// Service 1 — Video Editing:
<p className="mt-4 text-xs font-mono text-text-secondary">
  Starting from <span className="text-accent-primary font-medium">₹8,000/video</span> — custom packages available
</p>

// Service 2 — Content Strategy:
<p className="mt-4 text-xs font-mono text-text-secondary">
  Starting from <span className="text-accent-primary font-medium">₹15,000/month</span> — 1-month minimum
</p>

// Service 3 — AI Funnels:
<p className="mt-4 text-xs font-mono text-text-secondary">
  Custom build — <span className="text-accent-primary font-medium">Book a call</span> to get a scoped estimate
</p>
```

### 4b. Add Lucide icons to each service block

Each service card needs a 48×48 icon container at the top:

```jsx
import { Film, BarChart3, Bot } from 'lucide-react';
const icons = { video: Film, strategy: BarChart3, funnels: Bot };

// Icon container (same pattern for all 3):
<div className="w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20
                flex items-center justify-center mb-5">
  <Icon className="w-6 h-6 text-accent-primary" />
</div>
```

### 4c. Combined Plans section — replace vague pricing table

```jsx
// Make the "Content Engine" and "Full Stack" plan cards far more concrete:
const plans = [
  {
    name: 'Content Engine',
    price: 'Custom',
    priceNote: 'from ₹20K/mo',
    includes: [
      'Full-service video editing (2–4 videos/mo)',
      'Short-form Reels (4–8/mo)',
      'Thumbnail design',
      'Weekly content calendar',
      'Growth analytics report',
    ],
    cta: 'Get a Quote',
    href: '/contact',
    featured: false,
  },
  {
    name: 'The Full Stack',
    price: 'Custom',
    priceNote: 'from ₹40K/mo',
    badge: '⭐ Most Popular',
    includes: [
      'Everything in Content Engine',
      'AI WhatsApp + email automation',
      'Lead capture landing page',
      'CRM setup & integration',
      'Monthly conversion audit',
    ],
    cta: 'Book a Discovery Call',
    href: '/contact',
    featured: true,
  },
];
```

---

## STEP 5 — CAPTIONGRIT PAGE (`/src/pages/CaptiongritPage.jsx`)

### 5a. Hero Plugin Demo Widget — Make it more visually impressive

The existing demo widget should be upgraded to a **3-state interactive simulation**:

```jsx
// Replace static plugin demo with a stepped interaction demo:
// State 1: "Before" — shows a timeline with no captions, greyed out clips
// State 2: "Generating" — shows a loading bar and "AI Processing..." with a progress animation
// State 3: "After" — shows the same timeline with caption blocks appearing one by one

// Tab switcher above the widget:
const [demoState, setDemoState] = useState('before'); // 'before' | 'generating' | 'after'

<div className="flex gap-2 mb-4 p-1 bg-[#111111] rounded-xl w-fit mx-auto">
  {['before', 'generating', 'after'].map(state => (
    <button
      key={state}
      onClick={() => setDemoState(state)}
      className={`px-4 py-2 rounded-lg text-xs font-mono transition-all capitalize
        ${demoState === state ? 'bg-accent-primary text-black' : 'text-text-secondary hover:text-white'}`}
    >
      {state === 'generating' ? '⚙ generating' : state}
    </button>
  ))}
</div>
```

**The widget panel itself:** Keep all existing JSX structure but add `AnimatePresence` to transition between states with `opacity` and slight `y` movement.

### 5b. Before vs After Section — CREATE NEW, insert after `HowItWorks` section

```jsx
// New section: /src/components/captiongrit/BeforeAfterSection.jsx

const comparisons = [
  { metric: 'Caption one 10-min video',  before: '2–3 hours', after: '< 30 seconds' },
  { metric: 'Language accuracy',          before: 'Manual / error-prone', after: '95–99% AI accuracy' },
  { metric: 'Indian language support',    before: 'Not available in tools', after: '10 languages + phonetic' },
  { metric: 'Cost per video',             before: '$0.25/min (Rev.com)', after: '< $0.10/hour of video' },
  { metric: 'Software you need',          before: 'Exit Adobe, upload elsewhere', after: 'Stay inside Premiere / AE' },
];

// Render as a split-comparison table with color-coded columns:
// "Before" column: text-[#ff5555] (soft red, no new color token — use inline)
// "After / Captiongrit" column: text-accent-primary
```

Mount order in `CaptiongritPage.jsx`:
```
Hero + Demo
SocialProofBar
BeforeAfterSection  ← NEW, insert here
ThreeCaptionModes
HowItWorks
FeaturesGrid
LanguageMarquee
PricingSection
ComparisonTable
Testimonials
FAQ
FinalCTA
```

### 5c. FAQ — Make it more scannable

Replace the existing accordion with a **two-column accordion on desktop**:

```jsx
// Wrap FAQ items in a CSS grid on desktop:
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  {faqItems.map((item, i) => (
    <FAQItem key={i} {...item} />
  ))}
</div>
```

Add a search/filter bar above the FAQ:

```jsx
const [filter, setFilter] = useState('');
// Filter faqItems by filter string (question.includes(filter))

<div className="relative mb-6">
  <input
    type="text"
    placeholder="Search FAQ..."
    value={filter}
    onChange={e => setFilter(e.target.value)}
    className="w-full bg-[#111111] border border-[#1E1E1E] rounded-xl px-4 py-3 pl-10
               text-sm font-body text-white placeholder:text-text-secondary
               focus:outline-none focus:border-accent-primary/40 transition-colors"
  />
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
</div>
```

### 5d. Pricing Toggle — Keep as-is, but add a social proof line above the plans

```jsx
// Directly above the 3 pricing cards:
<p className="text-center text-sm font-body text-text-secondary mb-8">
  Trusted by <span className="text-white font-medium">editors across India</span> — 
  <span className="text-accent-primary"> 30-day money-back guarantee</span> on all plans
</p>
```

---

## STEP 6 — CONTACT PAGE (`ContactPage.jsx`)

### 6a. Fix the Formspree placeholder

Replace the `action="https://formspree.io/f/placeholder"` with a real working setup:

```jsx
// Replace form submit handler with:
const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('loading');
  const data = Object.fromEntries(new FormData(e.target));
  try {
    const res = await fetch('https://formspree.io/f/YOUR_REAL_ID', {
      method: 'POST', headers: { 'Accept': 'application/json' }, body: JSON.stringify(data),
    });
    setStatus(res.ok ? 'success' : 'error');
  } catch { setStatus('error'); }
};

// Show a success state after submission:
{status === 'success' && (
  <div className="glass-card p-8 text-center">
    <div className="w-12 h-12 rounded-full bg-accent-primary/15 border border-accent-primary/30
                    flex items-center justify-center mx-auto mb-4">
      <CheckCircle className="w-6 h-6 text-accent-primary" />
    </div>
    <h3 className="text-xl font-display font-bold text-white mb-2">Message received.</h3>
    <p className="text-sm font-body text-text-secondary">We'll get back to you within 24 hours.</p>
  </div>
)}
```

### 6b. Add urgency to the contact page hero

```jsx
// Below the headline, add a subtle scarcity badge:
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/10
                border border-accent-primary/20 mb-6">
  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
  <span className="text-xs font-mono text-accent-primary">Accepting 3 new clients in July 2026</span>
</div>
```

---

## STEP 7 — TESTIMONIALS (Agency Side) — BOOTSTRAP PLACEHOLDER SECTION

Since no testimonials exist on the agency side yet, create a placeholder testimonials section that shows the *structure* and signals credibility, even with dummy data. Add it to `AgencyFinalCta.jsx` ABOVE the final CTA buttons.

```jsx
// /src/components/home/AgencyTestimonialsTeaser.jsx — CREATE NEW
const testimonials = [
  {
    quote: "Integrit's editing system helped our YouTube channel break 30K views in 45 days. The content strategy alone was worth it.",
    name: 'Nivas K.',
    handle: '@hustlelifehyd',
    platform: 'YouTube',
    result: '30K views in 45 days',
    initials: 'NK',
  },
  // Add 1–2 more real testimonials when available. Structure is ready.
];

// Render:
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
  {testimonials.map((t, i) => (
    <div key={i} className="glass-card p-5">
      <p className="text-sm font-body text-text-secondary leading-relaxed mb-4">
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent-primary/15 border border-accent-primary/30
                        flex items-center justify-center text-xs font-mono text-accent-primary font-bold">
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-body text-white font-medium">{t.name}</p>
          <p className="text-xs font-mono text-text-secondary">{t.handle} · {t.platform}</p>
        </div>
        <span className="ml-auto px-2 py-1 text-[10px] font-mono text-accent-primary
                         bg-accent-primary/10 border border-accent-primary/20 rounded-full">
          {t.result}
        </span>
      </div>
    </div>
  ))}
</div>
```

---

## STEP 8 — GLOBAL FOOTER (Footer component)

### 8a. Add "Made in India" badge more prominently

```jsx
// In the brand column (column 1), after logo + tagline:
<div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full
                bg-[#111111] border border-[#1E1E1E] w-fit">
  <span className="text-sm">🇮🇳</span>
  <span className="text-[11px] font-mono text-text-secondary">Made in India</span>
</div>
```

### 8b. Replace "About" footer link (which has no page) with "Book a Call" for now

```jsx
// In column 2, change the non-functional "About" link:
<a href="/contact" className="...">Book a Discovery Call</a>
// Add note: (About page — coming soon)
```

---

## STEP 9 — ACCESSIBILITY & PERFORMANCE HARDENING

Apply these to every component you touch:

1. **Focus rings:** Every interactive element gets `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]`
2. **Reduced motion:** Every `motion.div` with `whileInView` or `animate` must check:
   ```jsx
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   // If true, skip animations by setting initial === visible
   ```
3. **Image alt text:** All `<img>` tags must have descriptive `alt` attributes.
4. **Button labels:** Every icon-only button needs `aria-label`.
5. **Sticky CTA bar z-index:** Must be `z-50` and sit below any open modal.

---

## STEP 10 — EXECUTION ORDER

Work through changes in this exact order to minimize merge conflicts:

1. `tailwind.config.js` + `index.html` font update
2. `/src/lib/motionVariants.js` (new)
3. `/src/components/ui/AnimatedCounter.jsx` (new)
4. `/src/components/ui/SectionDivider.jsx` (new)
5. `/src/components/ui/StickyCTABar.jsx` (new) + mount in `App.jsx`
6. `Navbar.jsx` — scroll behavior + CTA update
7. `AgencyHero.jsx` — full left column rebuild + mobile stat grid
8. `AgencySocialProof.jsx` — AnimatedCounter integration
9. `WhatWeDoSection.jsx` — audience labels + decorative illustrations
10. `AgencyServicesPreview.jsx` — icons + comparison table
11. `HowItWorksAgency.jsx` — skip button + scroll hint
12. `AgencyProductsSection.jsx` — new Captiongrit preview card
13. `WhoWeWorkWithSection.jsx` — per-audience CTAs
14. `AgencyTestimonialsTeaser.jsx` (new) + mount in home page
15. `AgencyFinalCta.jsx` — urgency strip + avatars
16. `ServicesPage.jsx` — icons + pricing anchors + plan cards
17. `CaptiongritPage.jsx` — BeforeAfterSection, demo widget upgrade, FAQ overhaul
18. `ContactPage.jsx` — Formspree fix + urgency badge
19. Footer — Made in India badge + link fix
20. Final pass: SectionDivider insertions at every section boundary

---

## TYPOGRAPHY SCALE REFERENCE

Apply these exact Tailwind classes for text hierarchy everywhere:

| Role | Tailwind Classes |
|---|---|
| Page H1 | `text-5xl md:text-6xl lg:text-[5rem] font-display font-bold leading-[1.08] tracking-tight` |
| Section H2 | `text-3xl md:text-4xl font-display font-bold tracking-tight` |
| Card H3 | `text-xl font-display font-semibold` |
| Body / Paragraph | `text-base font-body text-text-secondary leading-relaxed` |
| Mono Label / Tag | `text-xs font-mono text-text-secondary uppercase tracking-widest` |
| Stat Number | `text-4xl md:text-5xl font-display font-bold text-accent-primary` |
| Button Text | `text-sm font-body font-semibold` |

---

## GLASS CARD STANDARD

Use this exact class string for ALL glass cards (do not diverge):

```
className="bg-white/[0.02] backdrop-blur-[12px] border border-white/[0.06] rounded-2xl
           hover:border-accent-primary/20 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(198,255,52,0.06)]
           transition-all duration-300"
```

---

## FINAL CHECKLIST — Verify before marking done

- [ ] Homepage communicates value in first visible viewport without scrolling
- [ ] "Book a Discovery Call" appears above the fold on mobile AND desktop
- [ ] Urgency ("3 spots left") appears in at least 3 places: navbar, hero, sticky bar
- [ ] All stat numbers animate on scroll (AnimatedCounter)
- [ ] SectionDivider used between every major section (no hard borders)
- [ ] StickyCTABar appears at 50% scroll and is excluded from `/products/captiongrit`
- [ ] Captiongrit hero demo has 3-state interaction (before / generating / after)
- [ ] BeforeAfterSection exists on Captiongrit page
- [ ] FAQ on Captiongrit is 2-column on desktop with search filter
- [ ] Contact form has real Formspree ID and success state
- [ ] Mobile: 3D hero widget replaced with stat grid on < md
- [ ] All buttons have focus-visible ring in accent-primary
- [ ] Space Grotesk + Inter loaded correctly from Google Fonts
- [ ] `motionVariants.js` used for all motion — no inline variant objects
- [ ] Font sizes: H1 is at minimum 3× larger than body text at any viewport
- [ ] Existing animations (marquee, float, flow-dash, pathLength) still work

---

*Generated from full Integrit context analysis. Stack: React 19 + Vite + TailwindCSS v3 + Framer Motion v12.*  
*Color system: locked. Font system: Space Grotesk + Inter + JetBrains Mono. Routing: frozen.*

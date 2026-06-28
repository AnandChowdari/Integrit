# Integrit Website — Full Redesign Executor Prompt v2
> Paste this entire prompt to your coding AI (Cursor, Claude Code, etc.)
> Do NOT break it into parts — give it all at once.

---

## WHO INTEGRIT IS

**Integrit** is a hybrid digital agency based in India targeting coaches, real estate businesses, and local service brands who are bleeding leads and invisible online. The agency solves two compounding problems simultaneously:

**Problem 1 — Media Absence:** Most Indian businesses have no consistent content presence. No Reels, no YouTube, no brand voice. Their competitors post daily and stay top-of-mind. They don't. Clients choose who they see — and these businesses are invisible.

**Problem 2 — Lead Loss from Slow Follow-up:** 71% of internet leads are wasted due to slow follow-up. The average Indian business responds to a lead in 29+ hours. By then, the lead has called 3 competitors. In real estate alone, builders are silently losing 30–40% of leads because there's no system — just spreadsheets, missed calls, and forgotten WhatsApp messages.

**Integrit's fix:** Content marketing + video editing builds the organic funnel. AI automation (WhatsApp bots, chatbots, voice agents) contacts leads within 60 seconds of form submission, 24/7.

**Target clients:**
- Real estate agents and developers running Meta ads but losing leads to slow follow-up
- Coaches and consultants who get DMs and inquiries but have no follow-up system
- Local service businesses (gyms, clinics, institutes) with no social media presence

**Services:**
1. Video Editing & Content — Reels, YouTube, ads. Plans: 4 videos (₹16,000 simple / ₹28,000 precise), 8 videos (₹30,400 / ₹54,400), 12 videos (₹42,000 / ₹78,000). Trial video at ₹3,000 (credited toward first month if they sign within 7 days). Turnaround: 48 hours.
2. AI Lead Automation — WhatsApp follow-up (setup ₹15,000–20,000 + ₹8,000–12,000/mo retainer), Instagram DM automation, website chatbots, voice agents.
3. Strategy & Growth — Audit → content plan → automation build → ongoing management.

**Flagship product:** Captiongrit — AI-powered caption plugin for Adobe Premiere Pro. Transcribes audio, romanizes Indian languages (Telugu, Hindi, Tamil, Kannada, Malayalam + 20 more) into styled SRT captions in one click.

---

## TECH STACK (locked)

React 19 + Vite + TailwindCSS v3 + Framer Motion v12 + React Router DOM v7

**Design system (do not change):**
- Background: `#0A0A0A`
- Accent / Lime: `#C6FF34`
- White text: `#FFFFFF`
- Muted text: `#888888`
- Card background: `#111111`
- Border: `#1E1E1E`
- Font headings: Space Grotesk
- Font body: Inter
- Font mono: JetBrains Mono

**Design references:**
- Navbar + scroll animations: phantom.com — floating pill navbar, glassmorphism, staggered word-by-word heading reveals, sticky scroll sections
- Scroll storytelling: linear.app/releases/2022 — restraint, one idea per section, breathe between sections
- Overall agency confidence: twingate.com, qount.io

---

## EXISTING FILE STRUCTURE

```
src/
  App.jsx
  main.jsx
  components/
    agency/
      AgencyFinalCta.jsx
      AgencyHero.jsx
      AgencyProductsSection.jsx
      AgencyServicesPreview.jsx
      AgencySocialProof.jsx
      AgencyTestimonialsTeaser.jsx
      HowItWorksAgency.jsx
      WhatWeDoSection.jsx
      WhoWeWorkWithSection.jsx
    layout/
      CaptiongritFooter.jsx
      CaptiongritNavbar.jsx
      GlobalFooter.jsx
      GlobalNavbar.jsx
      ScrollToTop.jsx
    product/
      AutomationWorkflowsSection.jsx
      BeforeAfterSection.jsx
      CaptiongritPluginDemo.jsx
      CaptionModesSection.jsx
      CaseStudiesSection.jsx
      CheckoutModal.jsx
      ComparisonSection.jsx
      FaqSection.jsx
      FeaturesSection.jsx
      FinalCtaSection.jsx
      HeroSection.jsx
      HowItWorksSection.jsx
      LanguageMarquee.jsx
      PricingSection.jsx
      SocialProofBar.jsx
      TestimonialsSection.jsx
    ui/
      AnimatedCounter.jsx
      LightPillar.jsx
      SectionDivider.jsx
      SideRays.jsx
      StickyCTABar.jsx
      Strands.jsx
      TypewriterText.jsx
  pages/
    CaseStudiesPage.jsx
    ContactPage.jsx
    HomePage.jsx
    ProductsPage.jsx
    ServicesPage.jsx
    products/
      CaptiongritPage.jsx
```

---

## VISITOR JOURNEY — WHAT EACH SECTION DOES

This is not just a layout spec. Each section has a job. The visitor arrives from Instagram or LinkedIn — they already know Anand/Integrit exists but want to understand what it does and if it's for them. The page must take them from "curious" → "this is exactly my problem" → "I need to book a call" in 7 sections.

**Section 1 — Hero:** Immediate problem identification. Visitor reads the headline and thinks "yes, that's me." CTA visible immediately. No confusion about what Integrit does.

**Section 2 — Pain Amplification:** Make the problem feel real and costly with facts and scenarios. Visitor thinks "I didn't realize how much this was costing me."

**Section 3 — Services:** Visitor understands exactly what Integrit offers and which service maps to their pain. Not a feature list — an outcome promise.

**Section 4 — How It Works:** Remove friction. Visitor thinks "okay this is simple, I know what happens if I book a call."

**Section 5 — Proof:** Trust. Visitor thinks "they've done this before and it worked."

**Section 6 — Products Teaser:** Expand awareness of Captiongrit for video editor visitors.

**Section 7 — Final CTA:** One last push. Low-commitment ask (free 20-min call). Visitor books.

---

## COMPLETE SECTION SPECIFICATIONS

### SECTION 1 — HERO (rebuild AgencyHero.jsx)

**Visitor mindset entering:** "I saw this on Instagram/LinkedIn — what does Integrit actually do?"
**Job of this section:** Hit the exact pain in the first 3 seconds. One CTA.

**Layout:** Two-column. Left: copy. Right: animated workflow visual.

**Left side content:**

Top tag (JetBrains Mono, 12px, `#C6FF34`, pill border `#C6FF34`):
```
[ AI Automation + Content Agency · India ]
```

Main headline — USE WordReveal component, Space Grotesk 64px/40px mobile, weight 700:
```
Your leads go cold.
Your content goes nowhere.
We fix both.
```

Sub-headline (ScrollReveal delay 200ms, Inter 18px, `#AAAAAA`, max-width 520px):
```
Integrit builds your media presence and automates your lead
follow-up — so you attract more clients and never lose one again.
```

CTA row (ScrollReveal delay 400ms):
- Primary button: "Book a Discovery Call →" — bg `#C6FF34`, text `#0A0A0A`, font-weight 700, padding 14px 28px, border-radius 8px, hover: scale(1.03) brightness(1.05)
- Secondary button: "See Our Services" — bg transparent, border `1px solid #333`, text `#FFFFFF`, same padding, hover: border-color `#C6FF34`, text `#C6FF34`

Micro-stats row below CTAs (ScrollReveal delay 600ms) — 3 stats separated by vertical dividers (`#1E1E1E`):
- Stat 1: "48hr" in `#C6FF34` Space Grotesk 28px bold + "turnaround" in `#666` Inter 13px below
- Stat 2: "50K+" in `#C6FF34` Space Grotesk 28px bold + "views delivered" in `#666` Inter 13px below
- Stat 3: "60sec" in `#C6FF34` Space Grotesk 28px bold + "lead response time" in `#666` Inter 13px below

**Right side:** Keep existing animated workflow engine visual (n8n-style node graph) from current AgencyHero.jsx. Relabel nodes so a non-technical visitor understands:
- Node 1: "Lead Submits Form" (Instagram/Meta)
- Node 2: "Integrit AI Core" (center, highlighted with `#C6FF34` border)
- Node 3: "WhatsApp Sent" (within 60 seconds)
- Node 4: "Call Booked"
- Node 5: "Revenue Closed ₹"
Wrap entire right visual in ScrollReveal direction='left' delay=300ms.

**Background:** Single subtle lime glow top-right (`radial-gradient` from `rgba(198,255,52,0.06)` to transparent). Do NOT repeat this glow on any other section.

---

### SECTION 2 — PAIN AMPLIFICATION (rebuild WhoWeWorkWithSection.jsx)

**Visitor mindset:** "Okay what exactly is the problem you're solving?"
**Job:** Make the pain feel real, urgent, and expensive. Use real data. Visitor goes from "interested" to "oh this is costing me real money."

**Section label** (JetBrains Mono, 11px, `#666`, letter-spacing 2px, uppercase):
```
THE PROBLEM
```

**Headline** (WordReveal, Space Grotesk 40px, white):
```
Two silent killers destroying Indian businesses right now.
```

**Two cards side by side** (ScrollReveal stagger 0ms and 150ms):

**Card 1 — Media Absence** (`background: #111111`, `border: 1px solid #1E1E1E`, padding 32px, border-radius 12px):
- Icon: eye with slash (SVG, `#C6FF34`)
- Card label (JetBrains Mono 11px `#C6FF34`): `01 / INVISIBLE BRAND`
- Heading (Space Grotesk 20px white): "Your competitors post daily. You don't. Clients go to them."
- Body (Inter 15px `#888`): "India has 600M+ social media users. Your potential clients scroll Instagram and YouTube for hours every day. If they don't see you consistently, they forget you exist — or worse, they find your competitor first. A fitness trainer in Delhi gets thousands of Reel views but zero paid class signups because there's no content strategy pulling viewers into clients. A coaching institute in Hyderabad runs ₹50,000 in ads but has no organic presence — so when ads stop, clients stop."
- Bottom stat: "90% of Indian small businesses have no consistent social media strategy." — source tag in `#444` JetBrains Mono 11px

**Card 2 — Slow Follow-up** (`background: #111111`, `border: 1px solid #1E1E1E`, padding 32px, border-radius 12px):
- Icon: clock with X (SVG, `#C6FF34`)
- Card label (JetBrains Mono 11px `#C6FF34`): `02 / DEAD LEADS`
- Heading (Space Grotesk 20px white): "A lead fills your form. You call back in 6 hours. They already booked someone else."
- Body (Inter 15px `#888`): "71% of internet leads are wasted due to slow follow-up. The average Indian business responds to a lead in 29+ hours. In real estate, builders are silently losing 30–40% of leads — not because the market is bad, but because there's no system. Leads arrive from MagicBricks, 99acres, Facebook Ads, and your website — and they sit in a spreadsheet while your salesperson handles other calls. By the time you follow up, they've visited a competitor's site. A real estate developer spending ₹1 lakh/month on Meta ads loses ₹30,000–40,000 worth of those leads before anyone even picks up the phone."
- Bottom stat: "78% of customers buy from the business that responds first." — source tag in `#444`

**Below cards — full width callout** (ScrollReveal delay 300ms):
Dark card `background: #0D0D0D`, `border: 1px solid #C6FF3420`, padding 24px, border-radius 8px, centered text:
```
Sound familiar? This double bleed — no visibility, no follow-up system —
is costing Indian businesses crores every year. Integrit fixes both.
```
Text in Inter 16px `#AAAAAA`, the word "crores" in `#C6FF34`.

---

### SECTION 3 — WHAT WE DO (rebuild WhatWeDoSection.jsx)

**Visitor mindset:** "Okay I have these problems. What exactly does Integrit do about it?"
**Job:** Map each service directly to the pain. Not a features list — a promise of outcome.

**Section label** (JetBrains Mono 11px `#666` uppercase letter-spacing 2px):
```
OUR SERVICES
```

**Headline** (WordReveal Space Grotesk 40px white):
```
One agency. Two problems solved.
```

**Sub** (Inter 16px `#888`, ScrollReveal delay 100ms):
```
We don't just make content. We don't just build bots.
We connect both into a system that brings clients in and never lets them go.
```

**Three service cards** in a row (ScrollReveal stagger: 0ms, 150ms, 300ms):
Each card: `background: #111111`, `border: 1px solid #1E1E1E`, padding 28px, border-radius 12px, hover: `border-color: #C6FF34`, `transform: scale(1.02)`, transition 300ms.

**Card 1 — Video Editing & Content:**
- Number tag: `01` JetBrains Mono `#C6FF34`
- Icon: play button SVG
- Heading: "Video Editing & Content"
- Body: "Reels, YouTube videos, and ad creatives — edited to hook attention in 3 seconds and drive action. We handle the full pipeline: cut, captions, music, motion graphics."
- Details row: "4–12 videos/month · 48hr turnaround · UGC to motion graphics"
- CTA link: "See Plans →" color `#C6FF34`, links to `/services`

**Card 2 — AI Lead Automation (center card, slightly elevated — `border: 1px solid #C6FF3440`):**
- Number tag: `02` JetBrains Mono `#C6FF34`
- Icon: zap/lightning SVG
- Badge above heading: `MOST IMPACTFUL` — tiny pill, bg `#C6FF34`, text `#0A0A0A`, 10px JetBrains Mono
- Heading: "AI Lead Automation"
- Body: "When a lead fills your form at 11pm, our system sends them a WhatsApp message within 60 seconds. 3-day follow-up sequence. Chatbots that qualify visitors. Voice agents that call leads automatically. You wake up to booked calls."
- Details row: "WhatsApp · Chatbots · Voice Agents · 24/7"
- CTA link: "See Automations →" color `#C6FF34`, links to `/services`

**Card 3 — Strategy & Growth:**
- Number tag: `03` JetBrains Mono `#C6FF34`
- Icon: chart/growth SVG
- Heading: "Strategy & Growth"
- Body: "We audit your current setup — where leads are dropping, why content isn't converting — and build a system that fixes it. Then we execute it for you every month."
- Details row: "Audit · Content Calendar · Monthly Reports"
- CTA link: "Book a Strategy Call →" color `#C6FF34`, links to `/contact`

---

### SECTION 4 — HOW IT WORKS (rebuild HowItWorksAgency.jsx)

**Visitor mindset:** "This sounds good but what actually happens after I reach out?"
**Job:** Remove fear and friction. Make the process feel simple, safe, and clear.

**Section label** (JetBrains Mono 11px `#666` uppercase):
```
THE PROCESS
```

**Headline** (WordReveal Space Grotesk 40px white):
```
Simple. No fluff. Here's exactly what happens.
```

**Three-step layout** — large step numbers, sticky scroll if possible (section pins while steps reveal as user scrolls through). If sticky scroll is too complex, use ScrollReveal with large stagger (0ms, 200ms, 400ms).

Each step: left side = large number + heading, right side = description + what the client gets.

**Step 01 — We Audit** (ScrollReveal delay 0ms):
- Number: `01` Space Grotesk 88px `#C6FF34` opacity 0.15 (watermark style behind content)
- Heading: "We Audit Your Setup" Space Grotesk 28px white
- Body (Inter 16px `#888`): "Book a free 20-minute discovery call. We study your current content, where leads are coming from, how fast you're following up, and where you're losing people. No assumptions — just your actual numbers."
- Client gets tag: `You get: A clear breakdown of what's costing you leads`
- Tag style: `border: 1px solid #1E1E1E`, `#666`, JetBrains Mono 12px, padding 8px 14px

**Step 02 — We Build** (ScrollReveal delay 200ms):
- Number: `02` same watermark style
- Heading: "We Build Your System" Space Grotesk 28px white
- Body: "Content calendar + editing pipeline + automation workflows. WhatsApp sequences, chatbot flows, lead routing — all set up, tested, and handed over. You don't need to understand the tech. You just need it to work."
- Client gets tag: `You get: A fully working growth system in under 2 weeks`

**Step 03 — You Grow** (ScrollReveal delay 400ms):
- Number: `03` same watermark style
- Heading: "You Grow. We Maintain." Space Grotesk 28px white
- Body: "Consistent content goes out every week. Every lead gets contacted in 60 seconds. Every month we send you a performance report. You focus on the actual work of running your business."
- Client gets tag: `You get: Leads, content, and conversions — running together`

**Below steps** (ScrollReveal delay 500ms):
Single centered line, Inter 16px `#666`:
```
Most clients see measurable lead improvement in the first 30 days.
```

---

### SECTION 5 — SOCIAL PROOF (rebuild AgencySocialProof.jsx)

**Visitor mindset:** "Have they actually done this for someone? Can I trust them?"
**Job:** Show real results. Real business. Real numbers. Build trust fast.

**Section label** (JetBrains Mono 11px `#666` uppercase):
```
RESULTS
```

**Headline** (WordReveal Space Grotesk 40px white):
```
Real work. Real results.
```

**Case study card** (ScrollReveal delay 0ms):
`background: #111111`, `border: 1px solid #1E1E1E`, padding 40px, border-radius 16px, full width or 70% centered.

Left column — stats:
- "50K+" Space Grotesk 64px `#C6FF34` bold
- "Combined views" Inter 14px `#666`
- Divider
- "25 min" Space Grotesk 32px white bold
- "Long-form YouTube video" Inter 14px `#666`
- Divider
- "Video Editing + Strategy" JetBrains Mono 12px `#C6FF34`

Right column — context:
- Client tag: `CLIENT / HUSTLE LIFESTYLE HYDERABAD` JetBrains Mono 11px `#444`
- Description (Inter 16px `#AAAAAA`): "A 25-minute long-form YouTube documentary, fully scripted, edited, and deployed with content strategy. Result: 50,000+ combined views across platforms — from a single video."
- Service used: Video Editing + Content Strategy
- "View Case Study →" link `#C6FF34` → links to `/case-studies`

**Placeholder card below** (ScrollReveal delay 150ms):
`border: 1px dashed #1E1E1E`, padding 32px, border-radius 16px, centered content:
- JetBrains Mono 11px `#444`: `AUTOMATION CASE STUDY`
- Inter 18px `#666`: "Coming soon. We're currently building this for our first automation client."
- Sub (Inter 14px `#444`): "Want to be our next success story?"
- CTA button: "Book a Call →" — same primary button style, smaller

---

### SECTION 6 — PRODUCTS TEASER (rebuild AgencyProductsSection.jsx)

**Visitor mindset:** "Do they build their own tools too?"
**Job:** Introduce Captiongrit as proof that Integrit builds real products, not just services. Attracts video editor audience.

**Section label** (JetBrains Mono 11px `#666` uppercase):
```
OUR TOOLS
```

**Headline** (WordReveal Space Grotesk 40px white):
```
We don't just use tools. We build them.
```

**Single Captiongrit card** (ScrollReveal delay 0ms):
`background: #111111`, `border: 1px solid #C6FF34`, padding 40px, border-radius 16px — the lime border makes it stand out from all other cards.

Layout: left = product info, right = mini visual/badge

Left:
- Product tag: `PREMIERE PRO PLUGIN` JetBrains Mono 11px `#C6FF34`
- Product name: "Captiongrit" Space Grotesk 32px white bold
- Tagline: "AI captions for Indian creators. In your own language." Inter 18px `#888`
- Description: "Captiongrit transcribes your video audio and automatically converts it into phonetically accurate captions in Telugu, Hindi, Tamil, Kannada, Malayalam and 20 more Indian languages — inside Premiere Pro. One click. No third-party app. No copy-pasting."
- Features row (JetBrains Mono 12px `#666`, separated by `·`): `24 Languages · Phonetic Romanization · SRT Export · Built for Indian Creators`
- CTA: "Explore Captiongrit →" — `#C6FF34` text, hover underline, arrow, links to `/products/captiongrit`

Right:
- Simple badge/graphic: dark card showing `AI` in large text with language flags or script samples (Telugu: తెలుగు, Hindi: हिन्दी, Tamil: தமிழ்) fading in with stagger

---

### SECTION 7 — FINAL CTA (rebuild AgencyFinalCta.jsx)

**Visitor mindset:** "I'm interested. What do I do next?"
**Job:** Remove all remaining friction. One clear, low-commitment ask. Book the call.

**Full-width section** — `background: #111111`, `border-top: 1px solid #1E1E1E`, `border-bottom: 1px solid #1E1E1E`, padding 80px 0.

**Centered content:**

JetBrains Mono 11px `#444` uppercase letter-spacing: `FREE DISCOVERY CALL`

Headline (WordReveal Space Grotesk 48px white):
```
Ready to stop losing leads?
```

Sub (ScrollReveal delay 200ms, Inter 18px `#888`, max-width 500px centered):
```
Book a free 20-minute call. We'll audit your current setup
and tell you exactly what's costing you clients — no obligation.
```

Single CTA (ScrollReveal delay 400ms):
"Book a Discovery Call →" — same primary button style, larger: padding 18px 36px, font-size 18px

Below button (ScrollReveal delay 500ms, Inter 13px `#444` centered):
```
No contracts. No fluff. Just clarity on what's actually holding your business back.
```

---

## GLOBAL FOOTER (rebuild GlobalFooter.jsx)

Four columns:

**Column 1 — Brand:**
- Integrit logo + wordmark
- Tagline: "AI Automation + Content Agency · India"
- Social links: Instagram (anandwithcamera), LinkedIn

**Column 2 — Services:**
- Video Editing
- AI Lead Automation
- Strategy & Growth
- All link to `/services`

**Column 3 — Products:**
- Captiongrit → `/products/captiongrit`
- (More coming soon — placeholder in `#444`)

**Column 4 — Company:**
- Contact → `/contact`
- Case Studies → `/case-studies`
- Book a Call (CTA style link in `#C6FF34`)

Bottom bar: `border-top: 1px solid #1E1E1E`, padding 20px 0, flex between:
- Left: "© 2026 Integrit. Built in India." Inter 13px `#444`
- Right: "A product of anandwithcamera" Inter 13px `#444`

---

## NAVBAR SPEC (rebuild GlobalNavbar.jsx — Phantom-style)

**Floating pill** — centered, fixed, top: 20px, z-index: 50:
- `background: rgba(10,10,10,0.7)`, `backdropFilter: blur(20px)`, `border: 1px solid rgba(255,255,255,0.08)`
- `border-radius: 100px` (full pill)
- padding: 10px 20px
- max-width: 680px, centered with `left: 50%; transform: translateX(-50%)`

**Inside the pill left→right:**
- Logo icon + "Integrit" wordmark (Space Grotesk 16px white bold)
- Spacer (flex-grow)
- Nav links: Services | Products | Contact — Inter 14px `#888`, hover `#FFFFFF` 200ms, active route `#C6FF34`
- Spacer 24px
- "Book a Call" pill: `background: #C6FF34`, `color: #0A0A0A`, `font-weight: 700`, 13px, padding 8px 18px, `border-radius: 100px`, hover scale(1.03)

**Scroll behavior:** Past 80px — padding reduces from 10px to 6px, bg becomes `rgba(10,10,10,0.92)`. Smooth transition 300ms.

**Products dropdown on hover:**
Absolute positioned below "Products" link. `background: rgba(10,10,10,0.95)`, `border: 1px solid #1E1E1E`, border-radius 8px, padding 8px. Single item:
- "Captiongrit" — Inter 14px `#888`, hover `#FFFFFF`, links to `/products/captiongrit`
Appears with opacity 0→1 + y: -4→0, duration 200ms.

**Mobile (below 768px):**
- Replace pill with small logo + hamburger icon (3 lines `#888`, hover `#FFFFFF`)
- On click: full-screen overlay `background: #0A0A0A`, `z-index: 100`
- Links stacked vertically, Space Grotesk 28px, centered
- Closes on link click or X button
- Overlay animates in with opacity 0→1 duration 250ms

---

## CAPTIONGRIT CONNECTION FIXES

### CaptiongritNavbar.jsx
Add to left side of navbar (before logo):
```jsx
<Link to="/" style={{color: '#888', fontSize: '14px', fontFamily: 'Inter'}}>
  ← Back to Integrit
</Link>
```
Hover: `color: #C6FF34`, transition 200ms. Separated from logo by `|` divider in `#333`.

### CaptiongritPage.jsx
Add this section at the very bottom, before `<CaptiongritFooter />`:

```
background: #0A0A0A
border-top: 1px solid #1E1E1E
padding: 60px 0
centered content:
  JetBrains Mono 11px #444: "BUILT BY"
  Space Grotesk 24px white: "Integrit"
  Inter 16px #666: "India's AI Automation + Content Agency"
  CTA: "See What Else We Do →" → links to /
```

---

## ROUTING (App.jsx)

```jsx
/ → HomePage
/services → ServicesPage
/products → ProductsPage
/products/captiongrit → CaptiongritPage
/contact → ContactPage
/case-studies → CaseStudiesPage (hidden from nav)
```

Wrap all routes with AnimatePresence + PageWrapper:
```jsx
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {children}
  </motion.div>
)
```

---

## ANIMATION COMPONENTS TO BUILD

### src/components/ui/ScrollReveal.jsx
Props: `delay` (ms, default 0), `direction` ('up'|'left'|'right', default 'up'), `duration` (ms, default 600), `children`

```jsx
// initial: opacity 0, y: 40 (or x: ±40)
// whileInView: opacity 1, y/x: 0
// viewport: { once: true, margin: "-80px" }
// transition: { duration: duration/1000, delay: delay/1000, ease: [0.25, 0.1, 0.25, 1] }
```

### src/components/ui/WordReveal.jsx
Props: `text` (string), `delay` (ms, default 0), `className`

```jsx
// Split text by spaces into words
// Each word: <motion.span> with opacity 0→1, y: 20→0
// Stagger: 60ms between each word
// viewport: { once: true, margin: "-60px" }
// type: "tween", ease: [0.25, 0.1, 0.25, 1]
```

---

## ANIMATION PRINCIPLES

1. Hero section animates on mount (300ms delay after load). Everything else: whileInView only.
2. Stagger between siblings: always 80ms. Never more.
3. Easing: always `[0.25, 0.1, 0.25, 1]`. Never default ease-in-out.
4. No springs, no bounce. `type: "tween"` only.
5. Travel distances: headings y:40, cards y:24, small UI y:16.
6. Durations: headings 700ms, cards 500ms, small elements 350ms.
7. Hover: scale max 1.03. Border transitions 300ms. Button brightness(1.05).
8. `#C6FF34` only on: CTAs, key stats, active states, hover states, section labels. Never decorative.
9. One lime glow background effect — hero section only. No other glows.

---

## TYPOGRAPHY RULES

- H1 hero: Space Grotesk 64px desktop / 40px mobile, weight 700, line-height 1.1
- H2 sections: Space Grotesk 40px desktop / 28px mobile, weight 700, line-height 1.2
- H3 cards: Space Grotesk 22px, weight 600
- Body: Inter 16px, weight 400, line-height 1.7, `#AAAAAA`
- Small/muted: Inter 14px, `#666666`
- Stats: Space Grotesk 48px+, weight 700, `#C6FF34`
- Labels/tags: JetBrains Mono 11–12px, `#C6FF34` or `#444`, letter-spacing 1.5–2px

---

## DO NOT TOUCH

- Everything inside `src/components/product/` — Captiongrit internals stay as-is
- `CheckoutModal.jsx` — Razorpay logic untouched
- Only add to CaptiongritPage and CaptiongritNavbar — do not restructure them

---

## BUILD ORDER

1. `ScrollReveal.jsx` + `WordReveal.jsx`
2. `GlobalNavbar.jsx`
3. `App.jsx` (routing + AnimatePresence + ScrollToTop fix)
4. `GlobalFooter.jsx`
5. `AgencyHero.jsx` (Section 1)
6. `WhoWeWorkWithSection.jsx` (Section 2)
7. `WhatWeDoSection.jsx` (Section 3)
8. `HowItWorksAgency.jsx` (Section 4)
9. `AgencySocialProof.jsx` (Section 5)
10. `AgencyProductsSection.jsx` (Section 6)
11. `AgencyFinalCta.jsx` (Section 7)
12. `HomePage.jsx` (assemble all sections)
13. `CaptiongritNavbar.jsx` + `CaptiongritPage.jsx` (connection fixes)

---

## DELIVERABLES CHECKLIST

- [ ] Floating pill navbar, glassmorphism, Phantom-style
- [ ] Navbar compresses on scroll past 80px
- [ ] Products hover dropdown shows Captiongrit
- [ ] Mobile hamburger menu, full screen overlay, closes on click
- [ ] Hero: WordReveal headline, stats row, workflow visual on right
- [ ] Section 2: two pain cards with real stats, callout below
- [ ] Section 3: three service cards, center card elevated
- [ ] Section 4: three steps with watermark numbers
- [ ] Section 5: Nivas case study card + placeholder automation card
- [ ] Section 6: Captiongrit card with lime border
- [ ] Section 7: single CTA, no distractions
- [ ] All headings use WordReveal
- [ ] All cards/sections use ScrollReveal
- [ ] Page transitions smooth (AnimatePresence)
- [ ] ScrollToTop fires on nested routes
- [ ] CaptiongritNavbar has "← Back to Integrit"
- [ ] CaptiongritPage bottom links to homepage
- [ ] GlobalFooter has all 4 columns with Captiongrit in Products
- [ ] All internal links use React Router Link, not anchor tags
- [ ] No console errors
- [ ] Mobile responsive at 375px

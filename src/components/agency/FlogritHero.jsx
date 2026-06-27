import { useEffect, useRef, useState, useMemo } from 'react';
import './FlogritHero.css';

/* ═══════════════════════════════════════════════════════
   FLOGRIT HERO — Scroll-Driven Tube Animation (v5 - Snake)
   
   Phase 1 (0–62.5% scroll): Arch animation — tube draws,
   nodes activate, wordmark reveals.
   Phase 2 (62.5–100% scroll): Snake transition — arch
   morphs into a horizontal sine-wave pipeline that slides
   rightward off-screen with 5 nodes riding along.
   ═══════════════════════════════════════════════════════ */

/* ─── Constants ──────────────────────────────────────── */

// Where each node sits on the arch tube (% of total path length)
const NODE_PATH_POSITIONS = [0.08, 0.22, 0.46, 0.72, 0.90];

// Tube is fully drawn at 100% of HERO progress (not raw scroll)
const TUBE_DRAW_END = 1.0;

// Nodes activate when the tube reaches them
const NODE_THRESHOLDS = NODE_PATH_POSITIONS.map(pos => pos * TUBE_DRAW_END);

// Completion state (completion pulse)
const COMPLETION_START = 1.0;

/* ─── Helpers ────────────────────────────────────────── */

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function phaseProgress(p, start, end) {
  return clamp01((p - start) / (end - start));
}

/* ═══════════════════════════════════════════════════════ */

export default function FlogritHero() {

  /* ─── State ───────────────────────────────────────── */
  const [dimensions, setDimensions] = useState(() => ({
    w: document.documentElement.clientWidth,
    h: window.innerHeight,
  }));
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  /* ─── Refs ────────────────────────────────────────── */
  const sectionRef = useRef(null);

  // Arch tube refs
  const glowRef = useRef(null);
  const tubeRef = useRef(null);
  const innerCoreRef = useRef(null);
  const highlightRef = useRef(null);



  // Arch node refs
  const nodeRefs = useRef([]);



  // Wordmark refs
  const flRef = useRef(null);
  const oRef = useRef(null);
  const gritRef = useRef(null);

  // UI refs
  const scrollHintRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressFillRef = useRef(null);

  // Cached path data (avoids re-renders during scroll)
  const pathDataRef = useRef({ totalLength: 0, nodePositions: [] });

  /* ─── Derived Values ──────────────────────────────── */
  const { w: vw, h: vh } = dimensions;

  const nodeGap = (isMobile ? 18 : 56) + (isMobile ? 12 : 36);

  // Smooth wavy curve for arch phase
  const pathD = useMemo(() => {
    if (!vw || !vh) return '';
    return `M 0,${vh * 0.85} C ${vw * 0.20},${vh * 0.70} ${vw * 0.32},${vh * 0.50} ${vw * 0.46},${vh * 0.50} S ${vw * 0.72},${vh * 0.70} ${vw},${vh * 0.85}`;
  }, [vw, vh]);

  /* ─── Effect: Window Resize ───────────────────────── */
  useEffect(() => {
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setDimensions({
          w: document.documentElement.clientWidth,
          h: window.innerHeight,
        });
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
    };
  }, []);

  /* ─── Effect: Path Setup ──────────────────────────── */
  useEffect(() => {
    const tubeEl = tubeRef.current;
    const highlightEl = highlightRef.current;
    const glowEl = glowRef.current;
    const innerCoreEl = innerCoreRef.current;
    if (!tubeEl || !pathD) return;

    // Compute total length for dash animation
    const totalLength = tubeEl.getTotalLength();

    // Init stroke-dash (starts fully hidden) for all arch path components
    const paths = [tubeEl, highlightEl, glowEl, innerCoreEl];
    paths.forEach(el => {
      if (el) {
        el.style.strokeDasharray = `${totalLength}`;
        el.style.strokeDashoffset = `${totalLength}`;
      }
    });

    // Get pixel positions of nodes along the arch path
    const nodePositions = NODE_PATH_POSITIONS.map(pct => {
      const pt = tubeEl.getPointAtLength(totalLength * pct);
      return { x: pt.x, y: pt.y };
    });

    // Cache for scroll handler
    pathDataRef.current = { totalLength, nodePositions };

    // Position arch node <g> groups on the path
    nodePositions.forEach((pos, idx) => {
      const g = nodeRefs.current[idx];
      if (g) g.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
    });

    // Set CSS variables for wordmark positioning (node 3 = index 2 = the "O")
    const n3 = nodePositions[2];
    if (n3) {
      const root = document.documentElement;
      root.style.setProperty('--n3x', `${n3.x}px`);
      root.style.setProperty('--n3y', `${n3.y}px`);
      root.style.setProperty('--node-gap', `${nodeGap}px`);
    }

    // Cleanup CSS vars on unmount
    return () => {
      const root = document.documentElement;
      root.style.removeProperty('--n3x');
      root.style.removeProperty('--n3y');
      root.style.removeProperty('--node-gap');
    };
  }, [pathD, nodeGap]);

  /* ─── Effect: Scroll Animation Engine ─────────────── */
  useEffect(() => {
    let ticking = false;
    let rafId;

    const animate = () => {
      const section = sectionRef.current;
      if (!section) return;

      const { totalLength } = pathDataRef.current;
      if (!totalLength) return;

      const rect = section.getBoundingClientRect();

      // Skip if hero section is entirely off-screen
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        if (progressBarRef.current) progressBarRef.current.style.opacity = '0';
        return;
      }

      const scrolled = -rect.top;
      const maxScroll = section.offsetHeight - window.innerHeight;
      const rawP = clamp01(scrolled / maxScroll);

      const heroP = rawP;

      /* ══════════════════════════════════════════════════
         ARCH ANIMATION
         ══════════════════════════════════════════════════ */

      /* ── Tube Drawing ── */
      const drawnLength = totalLength * Math.min(heroP / TUBE_DRAW_END, 1);

      if (tubeRef.current) {
        tubeRef.current.style.strokeDashoffset = `${totalLength - drawnLength}`;
      }
      if (glowRef.current) {
        glowRef.current.style.strokeDashoffset = `${totalLength - drawnLength}`;
      }
      if (innerCoreRef.current) {
        innerCoreRef.current.style.strokeDashoffset = `${totalLength - drawnLength}`;
      }
      if (highlightRef.current) {
        highlightRef.current.style.strokeDashoffset = `${totalLength - drawnLength * 0.95}`;
      }

      /* ── Node Activation ── */
      NODE_THRESHOLDS.forEach((threshold, idx) => {
        const g = nodeRefs.current[idx];
        if (!g) return;

        if (heroP >= threshold) {
          g.classList.add('node--active');
        } else {
          g.classList.remove('node--active');
          g.classList.remove('node--complete');
        }

        // Completion glow pulse (skip Bubble 3 / index 2)
        if (heroP >= COMPLETION_START && idx !== 2) {
          g.classList.add('node--complete');
        } else {
          g.classList.remove('node--complete');
        }
      });

      /* ── Wordmark Reveal (FL + O + GRIT) ── */
      const wordmarkStart = NODE_THRESHOLDS[2];
      const wordmarkEnd = wordmarkStart + 0.10;
      const wp = phaseProgress(heroP, wordmarkStart, wordmarkEnd);

      if (flRef.current) {
        flRef.current.style.opacity = `${wp}`;
        flRef.current.style.transform = `translateX(${(1 - wp) * -30}px) translateY(-50%)`;
      }
      if (oRef.current) {
        oRef.current.style.opacity = `${wp}`;
        oRef.current.style.transform = `translateX(-50%) translateY(-50%) scale(${wp})`;
      }
      if (gritRef.current) {
        gritRef.current.style.opacity = `${wp}`;
        gritRef.current.style.transform = `translateX(${(1 - wp) * 30}px) translateY(-50%)`;
      }

      // Smoothly transition Bubble 3 from circle to letter O
      const node3Group = nodeRefs.current[2];
      if (node3Group) {
        const fillEl = node3Group.querySelector('.node-fill');
        const ringEl = node3Group.querySelector('.node-ring');
        const glowEl = node3Group.querySelector('.node-glow');
        
        if (heroP >= wordmarkStart) {
          if (fillEl) {
            const r = Math.round(192 - wp * (192 - 10));
            const g = Math.round(255 - wp * (255 - 10));
            const b = Math.round(52 - wp * (52 - 10));
            fillEl.style.fill = `rgb(${r}, ${g}, ${b})`;
          }
          if (ringEl) ringEl.style.opacity = `${1 - wp}`;
          if (glowEl) glowEl.style.opacity = `${1 - wp}`;
        } else {
          if (fillEl) fillEl.style.fill = '';
          if (ringEl) ringEl.style.opacity = '';
          if (glowEl) glowEl.style.opacity = '';
        }
      }



      /* ── Scroll Hint ── */
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = `${Math.max(0, 1 - rawP / 0.03)}`;
      }

      /* ── Progress Bar ── */
      if (progressBarRef.current) {
        progressBarRef.current.style.opacity = (rawP > 0.01 && rawP < 0.99) ? '1' : '0';
      }
      if (progressFillRef.current) {
        progressFillRef.current.style.height = `${rawP * 100}%`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        animate();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial render
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [dimensions]);

  /* ─── Render ──────────────────────────────────────── */

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="flogrit-hero"
        aria-label="Flogrit hero animation"
      >
        <div className="flogrit-sticky">

          {/* ═══ SVG Layer ═══ */}
          <svg
            className="flogrit-svg"
            viewBox={`0 0 ${vw} ${vh}`}
          >
            {/* ─── Arch Tube Paths ─── */}

            {/* Tube — outer glow */}
            <path
              ref={glowRef}
              d={pathD}
              fill="none"
              stroke="rgba(192, 255, 52, 0.15)"
              strokeWidth={isMobile ? 38 : 72}
              strokeLinecap="round"
            />

            {/* Tube — outer stroke (the pipe wall) */}
            <path
              ref={tubeRef}
              d={pathD}
              fill="none"
              stroke="#C0FF34"
              strokeWidth={isMobile ? 26 : 48}
              strokeLinecap="round"
              opacity={0.9}
            />

            {/* Tube — inner core (hollow part) */}
            <path
              ref={innerCoreRef}
              d={pathD}
              fill="none"
              stroke="#0A0A0A"
              strokeWidth={isMobile ? 16 : 34}
              strokeLinecap="round"
            />

            {/* Tube — inner highlight (gives 3D pipe feel) */}
            <path
              ref={highlightRef}
              d={pathD}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={isMobile ? 4 : 8}
              strokeLinecap="round"
            />

            {/* ─── Arch Nodes (5 beads on the arch tube) ─── */}
            {[0, 1, 3, 4].map(idx => {
              const isO = idx === 2;
              const innerR = isO ? (isMobile ? 18 : 56) : (isMobile ? 10 : 24);
              const outerR = isO ? (isMobile ? 26 : 75) : (isMobile ? 16 : 32);
              const glowR = isO ? (isMobile ? 34 : 96) : (isMobile ? 22 : 44);
              return (
                <g
                  key={`node-${idx}`}
                  ref={el => { nodeRefs.current[idx] = el; }}
                  className="tube-node"
                >
                  <g className={`node-float-container node-float-${idx}`}>
                    {/* Glow halo */}
                    <circle
                      r={glowR}
                      fill="rgba(192,255,52,0.12)"
                      className="node-glow"
                    />
                    {/* Solid fill */}
                    <circle
                      r={innerR}
                      fill="#C0FF34"
                      className="node-fill"
                    />
                    {/* Outer ring */}
                    <circle
                      r={outerR}
                      fill="none"
                      stroke="#C0FF34"
                      strokeWidth={1.5}
                      className="node-ring"
                    />
                  </g>
                </g>
              );
            })}


          </svg>

          {/* ═══ Wordmark Layer: FL O GRIT ═══ */}
          <div className="flogrit-wordmark-layer">
            <span
              ref={flRef}
              className="flogrit-wordmark fl-text"
            >
              FL
            </span>
            <span
              ref={oRef}
              className="flogrit-wordmark o-text"
            >
              O
            </span>
            <span
              ref={gritRef}
              className="flogrit-wordmark grit-text"
            >
              GRIT
            </span>
          </div>

          {/* ═══ Scroll Hint ═══ */}
          <div ref={scrollHintRef} className="flogrit-scroll-hint">
            <span>scroll</span>
            <svg width="12" height="20" viewBox="0 0 12 20">
              <path
                d="M6 0 L6 16 M2 12 L6 16 L10 12"
                stroke="#C0FF34"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

        </div>
      </section>

      {/* ═══ Scroll Progress Bar (Fixed, right edge) ═══ */}
      <div ref={progressBarRef} className="flogrit-progress">
        <div ref={progressFillRef} className="flogrit-progress-fill" />
        <div className="flogrit-progress-tick" />
        <div className="flogrit-progress-tick" />
        <div className="flogrit-progress-tick" />
        <div className="flogrit-progress-tick" />
        <div className="flogrit-progress-tick" />
        <div className="flogrit-progress-tick" />
      </div>
    </>
  );
}

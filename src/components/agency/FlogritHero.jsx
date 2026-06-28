import { useEffect, useRef, useState, useMemo } from 'react';
import './FlogritHero.css';

/* ═══════════════════════════════════════════════════════
   FLOGRIT HERO — Time-Based Loading Animation (v6)
   
   Animates automatically on load over 1.5 seconds.
   Fades out to reveal the main BrandReveal below it.
   ═══════════════════════════════════════════════════════ */

const NODE_PATH_POSITIONS = [0.08, 0.22, 0.46, 0.72, 0.90];
const TUBE_DRAW_END = 0.8; // Finishes drawing at 80% of timeline
const NODE_THRESHOLDS = NODE_PATH_POSITIONS.map(pos => pos * TUBE_DRAW_END);
const COMPLETION_START = 0.8;
const ANIM_DURATION = 1500; // 1.5 seconds

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function phaseProgress(p, start, end) {
  return clamp01((p - start) / (end - start));
}

export default function FlogritHero() {
  const [dimensions, setDimensions] = useState(() => ({
    w: document.documentElement.clientWidth,
    h: window.innerHeight,
  }));
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isHidden, setIsHidden] = useState(false);

  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const tubeRef = useRef(null);
  const innerCoreRef = useRef(null);
  const highlightRef = useRef(null);
  const nodeRefs = useRef([]);
  const flRef = useRef(null);
  const oRef = useRef(null);
  const gritRef = useRef(null);

  const pathDataRef = useRef({ totalLength: 0, nodePositions: [] });

  const { w: vw, h: vh } = dimensions;
  const nodeGap = (isMobile ? 18 : 56) + (isMobile ? 12 : 36);

  const pathD = useMemo(() => {
    if (!vw || !vh) return '';
    return `M 0,${vh * 0.85} C ${vw * 0.20},${vh * 0.70} ${vw * 0.32},${vh * 0.50} ${vw * 0.46},${vh * 0.50} S ${vw * 0.72},${vh * 0.70} ${vw},${vh * 0.85}`;
  }, [vw, vh]);

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

  useEffect(() => {
    const tubeEl = tubeRef.current;
    if (!tubeEl || !pathD) return;

    const totalLength = tubeEl.getTotalLength();
    const paths = [tubeRef.current, highlightRef.current, glowRef.current, innerCoreRef.current];
    paths.forEach(el => {
      if (el) {
        el.style.strokeDasharray = `${totalLength}`;
        el.style.strokeDashoffset = `${totalLength}`;
      }
    });

    const nodePositions = NODE_PATH_POSITIONS.map(pct => {
      const pt = tubeEl.getPointAtLength(totalLength * pct);
      return { x: pt.x, y: pt.y };
    });

    pathDataRef.current = { totalLength, nodePositions };

    nodePositions.forEach((pos, idx) => {
      const g = nodeRefs.current[idx];
      if (g) g.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
    });

    const layer = document.querySelector('.flogrit-wordmark-layer');
    if (layer && nodePositions[2]) {
      layer.style.setProperty('--n3x', `${nodePositions[2].x}px`);
      layer.style.setProperty('--n3y', `${nodePositions[2].y}px`);
    }
  }, [pathD, nodeGap]);

  useEffect(() => {
    let rafId;
    const startTime = Date.now();

    const animate = () => {
      const { totalLength } = pathDataRef.current;
      if (!totalLength) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = Date.now() - startTime;
      const rawP = clamp01(elapsed / ANIM_DURATION);

      const drawnLength = totalLength * Math.min(rawP / TUBE_DRAW_END, 1);

      if (tubeRef.current) tubeRef.current.style.strokeDashoffset = `${totalLength - drawnLength}`;
      if (glowRef.current) glowRef.current.style.strokeDashoffset = `${totalLength - drawnLength}`;
      if (innerCoreRef.current) innerCoreRef.current.style.strokeDashoffset = `${totalLength - drawnLength}`;
      if (highlightRef.current) highlightRef.current.style.strokeDashoffset = `${totalLength - drawnLength * 0.95}`;

      NODE_THRESHOLDS.forEach((threshold, idx) => {
        const g = nodeRefs.current[idx];
        if (!g) return;

        if (rawP >= threshold) {
          g.classList.add('node--active');
        }
        if (rawP >= COMPLETION_START && idx !== 2) {
          g.classList.add('node--complete');
        }
      });

      const wordmarkStart = NODE_THRESHOLDS[2];
      const wordmarkEnd = wordmarkStart + 0.15;
      const wp = phaseProgress(rawP, wordmarkStart, wordmarkEnd);

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

      const node3Group = nodeRefs.current[2];
      if (node3Group) {
        const fillEl = node3Group.querySelector('.node-fill');
        const ringEl = node3Group.querySelector('.node-ring');
        const glowEl = node3Group.querySelector('.node-glow');
        
        if (rawP >= wordmarkStart) {
          if (fillEl) {
            const r = Math.round(192 - wp * (192 - 10));
            const g = Math.round(255 - wp * (255 - 10));
            const b = Math.round(52 - wp * (52 - 10));
            fillEl.style.fill = `rgb(${r}, ${g}, ${b})`;
          }
          if (ringEl) ringEl.style.opacity = `${1 - wp}`;
          if (glowEl) glowEl.style.opacity = `${1 - wp}`;
        }
      }

      if (rawP < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        // Animation finished, hide loader after a tiny pause
        setTimeout(() => setIsHidden(true), 200);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Avoid unmounting completely if you want a CSS fade, 
  // but if it's completely done we can render null after the fade finishes.
  const [shouldUnmount, setShouldUnmount] = useState(false);
  useEffect(() => {
    if (isHidden) {
      const t = setTimeout(() => setShouldUnmount(true), 600); // Wait for CSS opacity transition
      return () => clearTimeout(t);
    }
  }, [isHidden]);

  if (shouldUnmount) return null;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`flogrit-hero ${isHidden ? 'loader-hidden' : ''}`}
      aria-label="Flogrit Loading"
    >
      <div className="flogrit-sticky">
        <svg className="flogrit-svg" viewBox={`0 0 ${vw} ${vh}`}>
          <path ref={glowRef} d={pathD} fill="none" stroke="rgba(192, 255, 52, 0.15)" strokeWidth={isMobile ? 38 : 72} strokeLinecap="round" />
          <path ref={tubeRef} d={pathD} fill="none" stroke="#C0FF34" strokeWidth={isMobile ? 26 : 48} strokeLinecap="round" opacity={0.9} />
          <path ref={innerCoreRef} d={pathD} fill="none" stroke="#0A0A0A" strokeWidth={isMobile ? 16 : 34} strokeLinecap="round" />
          <path ref={highlightRef} d={pathD} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={isMobile ? 4 : 8} strokeLinecap="round" />

          {[0, 1, 2, 3, 4].map(idx => {
            const isO = idx === 2;
            const innerR = isO ? (isMobile ? 18 : 56) : (isMobile ? 10 : 24);
            const outerR = isO ? (isMobile ? 26 : 75) : (isMobile ? 16 : 32);
            const glowR = isO ? (isMobile ? 34 : 96) : (isMobile ? 22 : 44);
            return (
              <g key={`node-${idx}`} ref={el => { nodeRefs.current[idx] = el; }} className="tube-node">
                <g className={`node-float-container node-float-${idx}`}>
                  <circle r={glowR} fill="rgba(192,255,52,0.12)" className="node-glow" />
                  <circle r={innerR} fill="#C0FF34" className="node-fill" />
                  <circle r={outerR} fill="none" stroke="#C0FF34" strokeWidth={1.5} className="node-ring" />
                </g>
              </g>
            );
          })}
        </svg>

        <div className="flogrit-wordmark-layer">
          <span ref={flRef} className="flogrit-wordmark fl-text">FL</span>
          <span ref={oRef} className="flogrit-wordmark o-text">O</span>
          <span ref={gritRef} className="flogrit-wordmark grit-text">GRIT</span>
        </div>
      </div>
    </section>
  );
}

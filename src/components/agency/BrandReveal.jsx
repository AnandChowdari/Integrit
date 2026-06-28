import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './BrandReveal.css';

/* ═══════════════════════════════════════════════════════
   BRAND REVEAL — Full-viewport section showing the
   FLOGRIT wordmark with premium typography. A flowing
   water wave animation runs along the bottom edge.
   ═══════════════════════════════════════════════════════ */

export default function BrandReveal() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  /* ─── Smooth "Flow" Water Animation ──────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      // Draw multiple layered smooth waves to symbolize "Flow"
      const waves = [
        { amp: 22, freq: 0.005, speed: 0.008, y: h * 0.35, color: 'rgba(198, 255, 52, 0.15)' },
        { amp: 16, freq: 0.008, speed: 0.012, y: h * 0.45, color: 'rgba(198, 255, 52, 0.20)' },
        { amp: 28, freq: 0.004, speed: 0.006, y: h * 0.25, color: 'rgba(198, 255, 52, 0.10)' },
        { amp: 12, freq: 0.010, speed: 0.015, y: h * 0.55, color: 'rgba(198, 255, 52, 0.25)' },
        { amp: 20, freq: 0.006, speed: 0.010, y: h * 0.40, color: 'rgba(198, 255, 52, 0.18)' },
      ];

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 3) {
          const y = wave.y
            + Math.sin(x * wave.freq + time * wave.speed) * wave.amp
            + Math.sin(x * wave.freq * 0.5 + time * wave.speed * 1.3) * wave.amp * 0.4;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // Draw a bright flowing line on the topmost wave crest
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = h * 0.25
          + Math.sin(x * 0.004 + time * 0.006) * 28
          + Math.sin(x * 0.002 + time * 0.006 * 1.3) * 28 * 0.4;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = 'rgba(198, 255, 52, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      time += 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  /* ─── Animation Variants ────────────────────────────── */
  const titleVariants = {
    hidden: { scale: 0.85, opacity: 0, textShadow: "0 0 0px #C6FF34" },
    visible: { 
      scale: 1, 
      opacity: 1, 
      textShadow: "0 0 30px rgba(198,255,52,0.4)",
      transition: { delay: 1.5, duration: 1.2, ease: "easeOut" } // Delayed to start after loader fades
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 20 },
    visible: (i) => ({
      opacity: 1, 
      filter: 'blur(0px)', 
      y: 0,
      transition: { delay: 1.8 + (i * 0.08), duration: 0.6, ease: "easeOut" }
    })
  };

  const btnVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 2.8, duration: 0.6, ease: "easeOut" }
    }
  };

  const taglineWords = [
    { text: "from", bold: false },
    { text: "Reach", bold: false },
    { text: "to", bold: false },
    { text: "Leads", bold: false },
    { text: "that", bold: false },
    { text: "flo", bold: true },
    { text: "every", bold: false },
    { text: "business owner", bold: true },
    { text: "needs", bold: false }
  ];

  return (
    <section
      ref={sectionRef}
      className="brand-reveal"
      aria-label="Flogrit brand reveal"
    >
      {/* ═══ Typography Wordmark ═══ */}
      <div className="brand-reveal__content">
        <motion.h1 
          className="brand-reveal__title"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          FLOGRIT
        </motion.h1>

        <p className="brand-reveal__tagline">
          {taglineWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              style={{ display: "inline-block", margin: "0 0.15em" }}
            >
              {word.bold ? <strong>{word.text}</strong> : word.text}
            </motion.span>
          ))}
        </p>

        <motion.a 
          href="#what-we-do" 
          className="brand-reveal__btn"
          initial="hidden"
          animate="visible"
          variants={btnVariants}
        >
          Check Our Work
        </motion.a>
      </div>

      {/* ═══ Water Wave Animation ═══ */}
      <div className="brand-reveal__water">
        <canvas ref={canvasRef} className="brand-reveal__canvas" />
      </div>
    </section>
  );
}

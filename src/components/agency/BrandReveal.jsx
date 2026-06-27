import { useEffect, useRef } from 'react';
import './BrandReveal.css';

/* ═══════════════════════════════════════════════════════
   BRAND REVEAL — Full-viewport section showing the
   FLOGRIT wordmark with premium typography. A flowing
   water wave animation runs along the bottom edge.
   ═══════════════════════════════════════════════════════ */

export default function BrandReveal() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  /* ─── Water Wave Canvas Animation ──────────────────── */
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

      // Draw multiple layered waves
      const waves = [
        { amp: 18, freq: 0.008, speed: 0.008, y: h * 0.30, color: 'rgba(192, 255, 52, 0.15)' },
        { amp: 14, freq: 0.012, speed: 0.012, y: h * 0.40, color: 'rgba(192, 255, 52, 0.20)' },
        { amp: 22, freq: 0.006, speed: 0.006, y: h * 0.25, color: 'rgba(192, 255, 52, 0.10)' },
        { amp: 10, freq: 0.015, speed: 0.015, y: h * 0.50, color: 'rgba(192, 255, 52, 0.25)' },
        { amp: 16, freq: 0.010, speed: 0.010, y: h * 0.35, color: 'rgba(192, 255, 52, 0.18)' },
      ];

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 2) {
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
      for (let x = 0; x <= w; x += 2) {
        const y = h * 0.25
          + Math.sin(x * 0.006 + time * 0.006) * 22
          + Math.sin(x * 0.003 + time * 0.006 * 1.3) * 22 * 0.4;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = 'rgba(192, 255, 52, 0.35)';
      ctx.lineWidth = 1.5;
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

  return (
    <section
      ref={sectionRef}
      className="brand-reveal"
      aria-label="Flogrit brand reveal"
    >
      {/* ═══ Typography Wordmark ═══ */}
      <div className="brand-reveal__content">
        <h1 className="brand-reveal__title">
          <span className="brand-reveal__fl">FL</span>
          <span className="brand-reveal__o">O</span>
          <span className="brand-reveal__grit">GRIT</span>
        </h1>
        <p className="brand-reveal__tagline">
          From reach to leads that flo every business owner needs
        </p>
      </div>

      {/* ═══ Water Wave Animation ═══ */}
      <div className="brand-reveal__water">
        <canvas ref={canvasRef} className="brand-reveal__canvas" />
      </div>
    </section>
  );
}

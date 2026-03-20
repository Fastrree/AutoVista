"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./ScrollToTop.module.css";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  isSpark: boolean;
  life: number;
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [burning, setBurning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const burningRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Merkezi sıfırlama: her şeyi temizle ──
  const fullReset = useCallback(() => {
    burningRef.current = false;
    setBurning(false);

    if (scrollTimerRef.current) { clearTimeout(scrollTimerRef.current); scrollTimerRef.current = null; }
    if (resetTimerRef.current) { clearTimeout(resetTimerRef.current); resetTimerRef.current = null; }

    cancelAnimationFrame(animFrameRef.current);
    particlesRef.current = [];

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, []);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 400);

      if (y <= 10 || (y <= 400 && (burningRef.current || particlesRef.current.length > 0))) {
        fullReset();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fullReset]);

  // Particle system
  const startParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    cancelAnimationFrame(animFrameRef.current);
    particlesRef.current = [];

    const createParticle = (): Particle => {
      const isSpark = Math.random() > 0.88;
      return {
        x: 155, y: 108,
        size: isSpark ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
        speedX: Math.random() * -8 - 2,
        speedY: (Math.random() - 0.6) * 4,
        opacity: 1, isSpark, life: 0,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (burningRef.current) {
        for (let i = 0; i < 4; i++) {
          particlesRef.current.push(createParticle());
        }
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        if (p.isSpark) {
          p.opacity -= 0.04;
          p.speedY += 0.1;
        } else {
          p.size += 1.2;
          p.opacity -= 0.012;
          p.speedX *= 0.98;
          p.speedY -= 0.02;
        }

        if (p.opacity <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(p.size, 0), 0, Math.PI * 2);

        if (p.isSpark) {
          ctx.fillStyle = `rgba(255, ${Math.floor(80 + Math.random() * 80)}, 0, ${p.opacity})`;
          ctx.shadowColor = "rgba(255, 120, 0, 0.6)";
          ctx.shadowBlur = 6;
        } else {
          const gray = Math.floor(160 + Math.random() * 40);
          ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${p.opacity * 0.6})`;
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      ctx.shadowBlur = 0;

      if (burningRef.current || particlesRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleClick = useCallback(() => {
    if (burningRef.current) return;

    // Önceki timer'ları temizle
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    setBurning(true);
    burningRef.current = true;
    startParticles();

    scrollTimerRef.current = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      scrollTimerRef.current = null;
    }, 800);

    resetTimerRef.current = setTimeout(() => {
      fullReset();
    }, 2500);
  }, [startParticles, fullReset]);

  return (
    <div
      className={`${styles.stage} ${visible ? styles.visible : ""}`}
      id="scroll-to-top"
    >
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={200}
        height={160}
      />

      <button
        className={`${styles.btn} ${burning ? styles.burning : ""}`}
        onClick={handleClick}
        aria-label="Scroll to top"
      >
        <div className={styles.wheelWrapper}>
          <svg className={styles.wheelSvg} width="64" height="64" viewBox="0 0 100 100" fill="none" suppressHydrationWarning>
            <defs>
              <radialGradient id="stt-tireGrad" cx="50%" cy="50%" r="50%">
                <stop offset="65%" stopColor="#1a1a1a" />
                <stop offset="82%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#111" />
              </radialGradient>
              <linearGradient id="stt-rimShine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#999" />
                <stop offset="40%" stopColor="#eee" />
                <stop offset="60%" stopColor="#ccc" />
                <stop offset="100%" stopColor="#555" />
              </linearGradient>
              <linearGradient id="stt-spokeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d0d0d0" />
                <stop offset="100%" stopColor="#888" />
              </linearGradient>
              <radialGradient id="stt-hubGrad" cx="45%" cy="40%">
                <stop offset="0%" stopColor="#ccc" />
                <stop offset="100%" stopColor="#555" />
              </radialGradient>
            </defs>

            {/* LASTİK */}
            <circle cx="50" cy="50" r="48" fill="url(#stt-tireGrad)" />
            <circle cx="50" cy="50" r="48" stroke="#000" strokeWidth="1.5" fill="none" />
            <circle cx="50" cy="50" r="46" stroke="#333" strokeWidth="0.5" fill="none" opacity="0.5" />

            {/* DÖNEN GRUP */}
            <g className={styles.treadRing}>
              <circle cx="50" cy="50" r="43" stroke="#222" strokeWidth="5" fill="none" />
              <circle cx="50" cy="50" r="46" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" fill="none" />
              <circle cx="50" cy="50" r="41" stroke="#1a1a1a" strokeWidth="0.8" strokeDasharray="2 4" fill="none" />

              <circle cx="50" cy="50" r="36" fill="#444" />
              <circle cx="50" cy="50" r="35" fill="url(#stt-rimShine)" opacity="0.85" />
              <circle cx="50" cy="50" r="34" stroke="#666" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="32" fill="#111" />

              <path d="M50 20 L43 37 L50 35 L57 37 Z" fill="url(#stt-spokeGrad)" />
              <path d="M50 20 L43 37 L50 35 L57 37 Z" fill="url(#stt-spokeGrad)" transform="rotate(72 50 50)" />
              <path d="M50 20 L43 37 L50 35 L57 37 Z" fill="url(#stt-spokeGrad)" transform="rotate(144 50 50)" />
              <path d="M50 20 L43 37 L50 35 L57 37 Z" fill="url(#stt-spokeGrad)" transform="rotate(216 50 50)" />
              <path d="M50 20 L43 37 L50 35 L57 37 Z" fill="url(#stt-spokeGrad)" transform="rotate(288 50 50)" />

              <path d="M56 37L50 20" stroke="#ddd" strokeWidth="0.3" opacity="0.6" />
              <path d="M56 37L50 20" stroke="#ddd" strokeWidth="0.3" opacity="0.6" transform="rotate(72 50 50)" />
              <path d="M56 37L50 20" stroke="#ddd" strokeWidth="0.3" opacity="0.6" transform="rotate(144 50 50)" />
              <path d="M56 37L50 20" stroke="#ddd" strokeWidth="0.3" opacity="0.6" transform="rotate(216 50 50)" />
              <path d="M56 37L50 20" stroke="#ddd" strokeWidth="0.3" opacity="0.6" transform="rotate(288 50 50)" />

              <circle cx="50" cy="50" r="11" fill="url(#stt-hubGrad)" />
              <circle cx="50" cy="50" r="10" stroke="#aaa" strokeWidth="0.4" fill="none" />

              <circle cx="50" cy="41" r="1.6" fill="#ccc" stroke="#999" strokeWidth="0.4" />
              <circle cx="58.6" cy="44.5" r="1.6" fill="#ccc" stroke="#999" strokeWidth="0.4" />
              <circle cx="55.3" cy="54.5" r="1.6" fill="#ccc" stroke="#999" strokeWidth="0.4" />
              <circle cx="44.7" cy="54.5" r="1.6" fill="#ccc" stroke="#999" strokeWidth="0.4" />
              <circle cx="41.4" cy="44.5" r="1.6" fill="#ccc" stroke="#999" strokeWidth="0.4" />
            </g>

            {/* SABİT: göbek + ok */}
            <circle cx="50" cy="50" r="4" fill="var(--accent)" opacity="0.9" />
            <path d="M46.5 52.5L50 48L53.5 52.5" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <span className={styles.ground} />
      </button>
    </div>
  );
}

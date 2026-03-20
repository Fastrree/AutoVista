"use client";

import { useState, useEffect } from "react";
import styles from "./ScrollToTop.module.css";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : ""}`}
      onClick={scrollUp}
      aria-label="Scroll to top"
      id="scroll-to-top"
    >
      <svg
        className={styles.wheel}
        width="58"
        height="58"
        viewBox="0 0 200 150"
        fill="none"
        suppressHydrationWarning
      >
        {/* ── Duman Katmanları (Hacimli Bulut) ── */}
        <g className={styles.smokeCloud} opacity="0.5">
          <circle cx="50" cy="110" r="25" fill="var(--text-tertiary)" />
          <circle cx="80" cy="120" r="20" fill="var(--text-tertiary)" />
          <circle cx="30" cy="125" r="15" fill="var(--text-tertiary)" />
          <path
            d="M40 90C20 90 10 105 10 120C10 135 25 145 50 145H100V110C100 95 85 90 75 90H40Z"
            fill="var(--text-tertiary)"
          />
        </g>

        {/* ── Sürtünme / Hız Çizgileri ── */}
        <path className={styles.speedDash} d="M80 140H35" stroke="var(--text-tertiary)" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 5" opacity="0.4" />
        <path className={styles.speedDash} d="M70 132H25" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 6" opacity="0.25" />

        {/* ── Lastik Gövde (Perspektif) ── */}
        <path
          d="M120 40C100 40 85 65 85 95C85 125 100 150 120 150C140 150 155 125 155 95C155 65 140 40 120 40Z"
          fill="#1f2937"
          stroke="var(--text-tertiary)"
          strokeWidth="2"
        />

        {/* ── Lastik Yan Yüzey (Yanak) ── */}
        <path
          d="M135 45C115 45 105 65 105 95C105 125 115 145 135 145C155 145 165 125 165 95C165 65 155 45 135 45Z"
          fill="#374151"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* ── Jant ── */}
        <ellipse cx="135" cy="95" rx="20" ry="35" fill="var(--text-tertiary)" opacity="0.6" />
        <ellipse cx="135" cy="95" rx="15" ry="26" fill="#2d3748" stroke="var(--text-tertiary)" strokeWidth="1" />

        {/* ── Jant Göbeği ── */}
        <ellipse cx="135" cy="95" rx="8" ry="14" fill="#1a202c" stroke="var(--text-tertiary)" strokeWidth="1.5" />
        <ellipse cx="135" cy="95" rx="4" ry="7" fill="var(--accent)" opacity="0.85" />

        {/* ── Lastik Dişleri ── */}
        <g stroke="var(--text-tertiary)" strokeWidth="2" opacity="0.5">
          <path d="M100 60L87 64" />
          <path d="M97 78L86 80" />
          <path d="M97 112L86 115" />
          <path d="M102 130L93 138" />
        </g>

        {/* ── Yukarı Ok (Jant Ortasında) ── */}
        <path
          d="M130 100L135 88L140 100"
          stroke="#e2e8f0"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>
    </button>
  );
}

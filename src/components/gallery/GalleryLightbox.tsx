"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { ListingImage } from "@/types/listing";
import styles from "./GalleryLightbox.module.css";

interface GalleryLightboxProps {
  images: ListingImage[];
  initialIndex?: number;
  onClose: () => void;
}

export function GalleryLightbox({ images, initialIndex = 0, onClose }: GalleryLightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const thumbRailRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  const goNext = useCallback(() => {
    setCurrent((i) => (i + 1) % total);
    setIsZoomed(false);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((i) => (i - 1 + total) % total);
    setIsZoomed(false);
  }, [total]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          goPrev();
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case " ":
          e.preventDefault();
          setIsZoomed((z) => !z);
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, onClose]);

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Scroll active thumbnail into view
  useEffect(() => {
    const rail = thumbRailRef.current;
    if (!rail) return;
    const activeThumb = rail.children[current] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [current]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only swipe if horizontal movement is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const img = images[current];

  return (
    <div className={styles.overlay} id="gallery-lightbox" role="dialog" aria-label="Image gallery">
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose} />

      {/* Top Bar */}
      <div className={styles.topBar}>
        <span className={styles.counter}>{current + 1} / {total}</span>
        <div className={styles.topActions}>
          <button
            className={styles.topBtn}
            onClick={() => setIsZoomed((z) => !z)}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            title={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35M8 11h6" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
              </svg>
            )}
          </button>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close gallery" id="lightbox-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div
        className={styles.main}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Prev Button */}
        <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={goPrev} aria-label="Previous image" id="lightbox-prev">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Image */}
        <div className={`${styles.imageContainer} ${isZoomed ? styles.zoomed : ""}`}>
          <img
            src={img.url}
            alt={img.alt || `Photo ${current + 1}`}
            className={styles.image}
            onClick={() => setIsZoomed((z) => !z)}
            draggable={false}
          />
        </div>

        {/* Next Button */}
        <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={goNext} aria-label="Next image" id="lightbox-next">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Rail */}
      <div className={styles.thumbRail} ref={thumbRailRef}>
        {images.map((thumb, i) => (
          <button
            key={i}
            className={`${styles.thumb} ${i === current ? styles.thumbActive : ""}`}
            onClick={() => { setCurrent(i); setIsZoomed(false); }}
            aria-label={`View photo ${i + 1}`}
          >
            <img src={thumb.url} alt={thumb.alt || `Thumbnail ${i + 1}`} draggable={false} />
          </button>
        ))}
      </div>

      {/* Keyboard Hint */}
      <div className={styles.keyHint}>
        <span>← → Navigate</span>
        <span>ESC Close</span>
        <span>Space Zoom</span>
      </div>
    </div>
  );
}

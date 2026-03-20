"use client";

import { useState, useEffect } from "react";
import type { ListingImage } from "@/types/listing";
import styles from "./GalleryGridModal.module.css";

interface GalleryGridModalProps {
  images: ListingImage[];
  title: string;
  onClose: () => void;
  onSelectImage: (index: number) => void;
}

export function GalleryGridModal({ images, title, onClose, onSelectImage }: GalleryGridModalProps) {
  const [visible, setVisible] = useState(false);

  // Animate in
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const heroImage = images[0];
  const restImages = images.slice(1);

  return (
    <div className={`${styles.overlay} ${visible ? styles.overlayVisible : ""}`} id="gallery-grid-modal">
      {/* Top bar */}
      <div className={styles.topBar}>
        <h2 className={styles.title}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
          Photo Gallery
          <span className={styles.photoCount}>{images.length} photos</span>
        </h2>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close gallery" id="grid-modal-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className={styles.content}>
        {/* Hero — first image full width */}
        {heroImage && (
          <div
            className={styles.heroCard}
            onClick={() => onSelectImage(0)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onSelectImage(0); }}
          >
            <img src={heroImage.url} alt={title} className={styles.heroImg} />
            <div className={styles.imgIndex}>1 / {images.length}</div>
          </div>
        )}

        {/* 2-column grid for remaining images */}
        {restImages.length > 0 && (
          <div className={styles.grid}>
            {restImages.map((img, i) => {
              const realIndex = i + 1;
              return (
                <div
                  key={realIndex}
                  className={styles.gridItem}
                  onClick={() => onSelectImage(realIndex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter") onSelectImage(realIndex); }}
                >
                  <img
                    src={img.url}
                    alt={img.alt || `Photo ${realIndex + 1}`}
                    className={styles.gridImg}
                  />
                  <div className={styles.imgIndex}>{realIndex + 1} / {images.length}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

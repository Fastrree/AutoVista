"use client";

import { useState, useEffect } from "react";
import type { ListingImage } from "@/types/listing";
import styles from "./GalleryGridModal.module.css";

type GalleryTab = "photos" | "360" | "video";

interface GalleryGridModalProps {
  images: ListingImage[];
  title: string;
  videoUrl?: string;
  panorama360Url?: string;
  onClose: () => void;
  onSelectImage: (index: number) => void;
}

export function GalleryGridModal({
  images,
  title,
  videoUrl,
  panorama360Url,
  onClose,
  onSelectImage,
}: GalleryGridModalProps) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<GalleryTab>("photos");

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
          Photo &amp; Video Gallery
        </h2>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close gallery" id="grid-modal-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabBar}>
        <button
          className={`${styles.tab} ${activeTab === "photos" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("photos")}
          id="tab-photos"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          Photos
          <span className={styles.tabCount}>{images.length}</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === "360" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("360")}
          id="tab-360"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          360° View
          {panorama360Url && <span className={styles.tabDot} />}
        </button>
        <button
          className={`${styles.tab} ${activeTab === "video" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("video")}
          id="tab-video"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Video
          {videoUrl && <span className={styles.tabDot} />}
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* ─── Photos Tab ─── */}
        {activeTab === "photos" && (
          <>
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
                      <img src={img.url} alt={img.alt || `Photo ${realIndex + 1}`} className={styles.gridImg} />
                      <div className={styles.imgIndex}>{realIndex + 1} / {images.length}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ─── 360° View Tab ─── */}
        {activeTab === "360" && (
          <div className={styles.mediaPanel}>
            {panorama360Url ? (
              <div className={styles.iframeWrap}>
                <iframe
                  src={panorama360Url}
                  title="360° View"
                  className={styles.iframe}
                  allowFullScreen
                />
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <p className={styles.emptyTitle}>No 360° View Available</p>
                <p className={styles.emptyDesc}>This listing does not have a 360° view yet.</p>
              </div>
            )}
          </div>
        )}

        {/* ─── Video Tab ─── */}
        {activeTab === "video" && (
          <div className={styles.mediaPanel}>
            {videoUrl ? (
              <div className={styles.videoWrap}>
                <video
                  src={videoUrl}
                  controls
                  className={styles.videoPlayer}
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <p className={styles.emptyTitle}>No Video Available</p>
                <p className={styles.emptyDesc}>This listing does not have a video yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

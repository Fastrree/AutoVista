"use client";

import { useState } from "react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { GalleryGridModal } from "@/components/gallery/GalleryGridModal";
import type { ListingImage } from "@/types/listing";
import styles from "./DetailGallery.module.css";

interface DetailGalleryProps {
  images: ListingImage[];
  brandName: string;
  title: string;
  videoUrl?: string;
  panorama360Url?: string;
}

export function DetailGallery({ images, brandName, title, videoUrl, panorama360Url }: DetailGalleryProps) {
  const [gridOpen, setGridOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Click hero/thumbs → open grid modal
  const openGrid = () => {
    setGridOpen(true);
  };

  // Click a photo in grid → open slider lightbox at that index
  const openLightboxFromGrid = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className={styles.gallery} id="listing-gallery">
        <div
          className={styles.mainImage}
          onClick={openGrid}
          role="button"
          tabIndex={0}
          aria-label={`Open gallery for ${title}`}
          onKeyDown={(e) => { if (e.key === "Enter") openGrid(); }}
        >
          {images[0] ? (
            <>
              <img src={images[0].url} alt={title} className={styles.heroImg} />
              <div className={styles.galleryHint}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                {images.length} photos
              </div>
            </>
          ) : (
            <div className={styles.imgPlaceholder}>{brandName}</div>
          )}
        </div>
        {images.length > 1 && (
          <div className={styles.thumbRow}>
            {images.slice(0, 6).map((img, i) => (
              <div
                key={i}
                className={styles.thumb}
                onClick={openGrid}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") openGrid(); }}
              >
                <img src={img.url} alt={img.alt || `Photo ${i + 1}`} />
              </div>
            ))}
            {images.length > 6 && (
              <div
                className={styles.thumbMore}
                onClick={openGrid}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") openGrid(); }}
              >
                +{images.length - 6}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Step 1: Vertical grid modal (cars.com style) */}
      {gridOpen && (
        <GalleryGridModal
          images={images}
          title={title}
          videoUrl={videoUrl}
          panorama360Url={panorama360Url}
          onClose={() => setGridOpen(false)}
          onSelectImage={(index) => openLightboxFromGrid(index)}
        />
      )}

      {/* Step 2: Slider lightbox (prev/next navigation) */}
      {lightboxOpen && (
        <GalleryLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

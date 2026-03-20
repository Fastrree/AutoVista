"use client";

import { useFavorites } from "./FavoritesProvider";
import type { Listing } from "@/types/listing";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  listing: Listing;
  size?: "sm" | "md";
  className?: string;
}

export function FavoriteButton({ listing, size = "md", className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(listing.id);

  return (
    <button
      className={`${styles.btn} ${styles[size]} ${active ? styles.active : ""} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(listing);
      }}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      title={active ? "Remove from favorites" : "Add to favorites"}
      id={`fav-btn-${listing.id}`}
    >
      <svg
        width={size === "sm" ? 16 : 20}
        height={size === "sm" ? 16 : 20}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

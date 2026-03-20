"use client";

import { useCompare } from "./CompareProvider";
import type { Listing } from "@/types/listing";
import styles from "./CompareButton.module.css";

interface CompareButtonProps {
  listing: Listing;
  size?: "sm" | "md";
  className?: string;
}

export function CompareButton({ listing, size = "md", className = "" }: CompareButtonProps) {
  const { isInCompare, toggleCompare, isFull } = useCompare();
  const active = isInCompare(listing.id);
  const disabled = !active && isFull;

  return (
    <button
      className={`${styles.btn} ${styles[size]} ${active ? styles.active : ""} ${disabled ? styles.disabled : ""} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) toggleCompare(listing);
      }}
      aria-label={active ? "Remove from comparison" : "Add to comparison"}
      title={disabled ? "Comparison full (max 4)" : active ? "Remove from comparison" : "Add to comparison"}
      id={`compare-btn-${listing.id}`}
    >
      <svg
        width={size === "sm" ? 14 : 18}
        height={size === "sm" ? 14 : 18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
      </svg>
    </button>
  );
}

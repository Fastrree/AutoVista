// ─── Brand Logo Component ───
// Uses real SVG brand logos from /brands/ directory
// Falls back to first letter for brands without a logo file

import Image from "next/image";
import type { CSSProperties } from "react";

// Brands that have real SVG logo files in /public/brands/
const realLogoBrands = new Set([
  "mercedes",
  "bmw",
  "audi",
  "bugatti",
  "ferrari",
  "ford",
  "astonmartin",
  "bentley",
  "rollsroyce",
  "tesla",
  "byd",
  "aurus",
  "jeep",
  "landrover",
  "maserati",
  "volkswagen",
  "toyota",
  "nissan",
]);

interface BrandLogoProps {
  brandId: string;
  fallback?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function BrandLogo({
  brandId,
  fallback,
  size = 40,
  className,
  style,
}: BrandLogoProps) {
  if (realLogoBrands.has(brandId)) {
    return (
      <Image
        src={`/brands/${brandId}.svg`}
        alt={`${fallback || brandId} logo`}
        width={size}
        height={size}
        className={className}
        style={{ objectFit: "contain", ...style }}
        unoptimized
      />
    );
  }

  // Fallback: stylized first letter for brands without a logo file
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" />
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontSize="36"
        fontWeight="800"
        fill="currentColor"
        fontFamily="sans-serif"
      >
        {(fallback || brandId).charAt(0).toUpperCase()}
      </text>
    </svg>
  );
}

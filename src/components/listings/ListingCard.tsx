"use client";

import Link from "next/link";
import type { Listing } from "@/types/listing";
import type { Locale } from "@/i18n/config";
import { formatPrice, formatKm } from "@/i18n/formatters";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { CompareButton } from "@/components/compare/CompareButton";
import styles from "./ListingCard.module.css";

interface ListingCardProps {
  listing: Listing;
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
}

const fuelLabels: Record<string, string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  electric: "Electric",
  hybrid: "Hybrid",
  pluginHybrid: "Plug-in Hybrid",
  hydrogen: "Hydrogen",
  lpg: "LPG",
};

const transLabels: Record<string, string> = {
  automatic: "Auto",
  manual: "Manual",
  cvt: "CVT",
  dct: "DCT",
};

export function ListingCard({ listing, locale, dict }: ListingCardProps) {
  const mainImage = listing.images.find((img) => img.isMain) || listing.images[0];
  const hasDamage = listing.condition?.damagePanels && listing.condition.damagePanels.length > 0;

  return (
    <Link
      href={`/${locale}/ilan/${listing.slug}`}
      className={`card ${styles.card}`}
      id={`listing-card-${listing.id}`}
    >
      {/* Image */}
      <div className={styles.imageWrapper}>
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={listing.title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>{listing.brandName}</span>
          </div>
        )}

        {/* Badges overlay */}
        <div className={styles.badges}>
          {listing.seller.type === "dealer" && listing.seller.isVerified && (
            <span className={`badge badge-accent ${styles.verifiedBadge}`}>✓ Verified</span>
          )}
          {listing.condition?.hasExpertReport && (
            <span className={`badge badge-success`}>
              {dict.detail.expertReport}
            </span>
          )}
        </div>

        {/* Action buttons overlay */}
        <div className={styles.cardActions}>
          <FavoriteButton listing={listing} size="sm" />
          <CompareButton listing={listing} size="sm" />
        </div>

        {/* Price overlay */}
        <div className={styles.priceOverlay}>
          <span className={styles.price}>
            {formatPrice(listing.priceAmount, locale, listing.priceCurrency)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Title */}
        <h3 className={styles.title}>{listing.brandName} {listing.modelName}</h3>
        {listing.trimName && <span className={styles.trim}>{listing.trimName}</span>}

        {/* Specs Row */}
        <div className={styles.specs}>
          <span className={styles.spec}>{listing.year}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.spec}>{formatKm(listing.km, locale)}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.spec}>{fuelLabels[listing.fuelType] || listing.fuelType}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.spec}>{transLabels[listing.transmission] || listing.transmission}</span>
        </div>

        {/* Power & Engine */}
        {listing.horsepowerHp && (
          <div className={styles.power}>
            {listing.horsepowerHp} {dict.common.hp}
            {listing.displacementCc && ` · ${(listing.displacementCc / 1000).toFixed(1)}L`}
          </div>
        )}

        {/* Features Preview */}
        {listing.features.length > 0 && (
          <div className={styles.features}>
            {listing.features.slice(0, 4).map((f, i) => (
              <span key={i} className={styles.featureTag}>{f}</span>
            ))}
            {listing.features.length > 4 && (
              <span className={styles.featureMore}>+{listing.features.length - 4}</span>
            )}
          </div>
        )}

        {/* Condition Summary */}
        <div className={styles.condition}>
          {hasDamage ? (
            <span className={styles.conditionWarning}>
              ⚠ {listing.condition!.damagePanels!.length} {locale === "tr" ? "panel kaydı" : "panel record(s)"}
            </span>
          ) : (
            <span className={styles.conditionClean}>
              ✓ {dict.detail.noPaint}
            </span>
          )}
        </div>

        {/* Bottom Row */}
        <div className={styles.bottom}>
          <div className={styles.seller}>
            <span className={styles.sellerType}>
              {dict.detail.sellerTypes[listing.seller.type] || listing.seller.type}
            </span>
            <span className={styles.dot}>·</span>
            <span className={styles.location}>{listing.city}</span>
          </div>
        </div>

        {/* Why Consider */}
        {listing.whyConsider && (
          <p className={styles.whyConsider}>💡 {listing.whyConsider}</p>
        )}
      </div>
    </Link>
  );
}

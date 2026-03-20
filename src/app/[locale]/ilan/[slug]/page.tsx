import { isValidLocale, localeCurrencies, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";
import { getListings, getListingBySlug } from "@/data/seed";
import { formatPrice, formatKm, formatNumber } from "@/i18n/formatters";
import Link from "next/link";
import { ListingCard } from "@/components/listings/ListingCard";
import { DetailGallery } from "@/components/gallery/DetailGallery";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { CompareButton } from "@/components/compare/CompareButton";
import styles from "./detail.module.css";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const currency = localeCurrencies[locale];
  const listing = getListingBySlug(locale, currency, slug);

  if (!listing) notFound();

  // Similar listings (same brand, different listing)
  const allListings = getListings(locale, currency);
  const similar = allListings
    .filter((l) => l.brandId === listing.brandId && l.id !== listing.id)
    .slice(0, 4);

  const hasDamage = listing.condition?.damagePanels && listing.condition.damagePanels.length > 0;

  return (
    <div className={`${styles.page} container`}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href={`/${locale}`}>{dict.nav.home}</Link>
        <span className={styles.breadSep}>/</span>
        <Link href={`/${locale}/kesfet`}>{dict.nav.explore}</Link>
        <span className={styles.breadSep}>/</span>
        <Link href={`/${locale}/kesfet?brandIds=${listing.brandId}`}>{listing.brandName}</Link>
        <span className={styles.breadSep}>/</span>
        <span>{listing.modelName}</span>
      </nav>

      <div className={styles.layout}>
        {/* Left Column */}
        <div className={styles.main}>
          {/* Gallery */}
          <DetailGallery images={listing.images} brandName={listing.brandName} title={listing.title} />

          {/* Title Block */}
          <section className={styles.titleBlock}>
            <h1 className={styles.title}>{listing.brandName} {listing.modelName}</h1>
            {listing.trimName && <span className={styles.trim}>{listing.trimName}</span>}
            <p className={styles.subtitle}>{listing.description}</p>
            <div className={styles.priceRow}>
              <span className={styles.price}>
                {formatPrice(listing.priceAmount, locale, listing.priceCurrency)}
              </span>
              {listing.priceContext && (
                <span className={`badge ${listing.priceContext.priceScore >= 75 ? "badge-success" : listing.priceContext.priceScore >= 50 ? "badge-warning" : "badge-error"}`}>
                  {listing.priceContext.label}
                </span>
              )}
              <div className={styles.detailActions}>
                <FavoriteButton listing={listing} />
                <CompareButton listing={listing} />
              </div>
            </div>
          </section>

          {/* Quick Specs */}
          <section className={styles.quickSpecs} id="quick-specs">
            <div className={styles.specItem}>
              <span className={styles.specLabel}>{dict.detail.year}</span>
              <span className={styles.specValue}>{listing.year}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>{dict.detail.km}</span>
              <span className={styles.specValue}>{formatKm(listing.km, locale)}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>{dict.detail.fuel}</span>
              <span className={styles.specValue}>{listing.fuelType}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>{dict.detail.transmission}</span>
              <span className={styles.specValue}>{listing.transmission}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>{dict.detail.power}</span>
              <span className={styles.specValue}>{listing.horsepowerHp} {dict.common.hp}</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>{dict.detail.bodyType}</span>
              <span className={styles.specValue}>{listing.bodyType}</span>
            </div>
            {listing.drivetrain && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>{dict.detail.drivetrain}</span>
                <span className={styles.specValue}>{listing.drivetrain.toUpperCase()}</span>
              </div>
            )}
            {listing.exteriorColor && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>{dict.detail.color}</span>
                <span className={styles.specValue}>{listing.exteriorColor}</span>
              </div>
            )}
          </section>

          {/* Technical Specs */}
          <section className={styles.section} id="technical-specs">
            <h2 className={styles.sectionTitle}>{dict.detail.technicalSpecs}</h2>
            <div className={styles.specTable}>
              {listing.displacementCc && (
                <div className={styles.specRow}>
                  <span>{dict.detail.displacement}</span>
                  <span>{formatNumber(listing.displacementCc, locale)} {dict.common.cc}</span>
                </div>
              )}
              {listing.horsepowerHp && (
                <div className={styles.specRow}>
                  <span>{dict.detail.power}</span>
                  <span>{listing.horsepowerHp} {dict.common.hp}</span>
                </div>
              )}
              {listing.torqueNm && (
                <div className={styles.specRow}>
                  <span>{dict.detail.torque}</span>
                  <span>{listing.torqueNm} {dict.common.nm}</span>
                </div>
              )}
              {listing.batteryCapacityKwh && (
                <div className={styles.specRow}>
                  <span>Battery</span>
                  <span>{listing.batteryCapacityKwh} {dict.common.kwh}</span>
                </div>
              )}
              {listing.wltpRangeKm && (
                <div className={styles.specRow}>
                  <span>WLTP Range</span>
                  <span>{formatKm(listing.wltpRangeKm, locale)}</span>
                </div>
              )}
              <div className={styles.specRow}>
                <span>{dict.detail.doors}</span>
                <span>{listing.doorCount || 4}</span>
              </div>
              <div className={styles.specRow}>
                <span>{dict.detail.seats}</span>
                <span>{listing.seatCount || 5}</span>
              </div>
            </div>
          </section>

          {/* Equipment Groups */}
          {listing.equipmentGroups && listing.equipmentGroups.length > 0 && (
            <section className={styles.section} id="equipment">
              <h2 className={styles.sectionTitle}>{dict.detail.equipment}</h2>
              <div className={styles.equipmentGrid}>
                {listing.equipmentGroups.map((group, i) => (
                  <div key={i} className={styles.equipmentGroup}>
                    <h3 className={styles.equipmentCategory}>{group.category}</h3>
                    <ul className={styles.equipmentList}>
                      {group.items.map((item, j) => (
                        <li key={j} className={styles.equipmentItem}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Features Tags */}
          {listing.features.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>{dict.explore.features}</h3>
              <div className={styles.featureTags}>
                {listing.features.map((f, i) => (
                  <span key={i} className={styles.featureTag}>{f}</span>
                ))}
              </div>
            </section>
          )}

          {/* Condition */}
          <section className={styles.section} id="condition">
            <h2 className={styles.sectionTitle}>{dict.detail.condition}</h2>
            <div className={styles.conditionCard}>
              <div className={styles.conditionRow}>
                <span>{dict.detail.expertReport}</span>
                <span className={listing.condition?.hasExpertReport ? styles.condGood : styles.condNeutral}>
                  {listing.condition?.hasExpertReport ? dict.detail.available : dict.detail.notAvailable}
                </span>
              </div>
              {listing.condition?.tramerAmount !== undefined && (
                <div className={styles.conditionRow}>
                  <span>Tramer</span>
                  <span>{listing.condition.tramerAmount > 0 ? formatPrice(listing.condition.tramerAmount, locale, listing.priceCurrency) : "—"}</span>
                </div>
              )}
              {!hasDamage && (
                <div className={styles.conditionRow}>
                  <span>{dict.detail.noPaint}</span>
                  <span className={styles.condGood}>✓</span>
                </div>
              )}
              {listing.condition?.damagePanels?.map((dp, i) => (
                <div key={i} className={styles.conditionRow}>
                  <span>{dp.panel.replace(/_/g, " ")}</span>
                  <span className={styles.condWarning}>
                    {dict.detail.conditionTypes[dp.conditionType] || dp.conditionType}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Why Consider */}
          {listing.whyConsider && (
            <section className={styles.whyConsider}>
              <h3>{dict.detail.whyConsider}</h3>
              <p>💡 {listing.whyConsider}</p>
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className={styles.sidebar}>
          {/* Price Context Card */}
          {listing.priceContext && (
            <div className={styles.sideCard} id="price-context">
              <h3 className={styles.sideCardTitle}>{dict.detail.priceAnalysis}</h3>
              <div className={styles.priceBar}>
                <div className={styles.priceBarTrack}>
                  <div
                    className={styles.priceBarPosition}
                    style={{
                      left: `${Math.min(100, Math.max(0, ((listing.priceAmount - listing.priceContext.marketMin) / (listing.priceContext.marketMax - listing.priceContext.marketMin)) * 100))}%`,
                    }}
                  />
                </div>
                <div className={styles.priceBarLabels}>
                  <span>{formatPrice(listing.priceContext.marketMin, locale, listing.priceCurrency)}</span>
                  <span>{formatPrice(listing.priceContext.marketMax, locale, listing.priceCurrency)}</span>
                </div>
              </div>
              <p className={styles.priceBarNote}>
                {dict.detail.marketRange}: {listing.priceContext.comparableCount} {locale === "tr" ? "benzer araç" : "comparable vehicles"}
              </p>
            </div>
          )}

          {/* Seller Card */}
          <div className={styles.sideCard} id="seller-info">
            <h3 className={styles.sideCardTitle}>{dict.detail.seller}</h3>
            <div className={styles.sellerInfo}>
              <div className={styles.sellerAvatar}>
                {listing.seller.displayName.charAt(0)}
              </div>
              <div>
                <p className={styles.sellerName}>{listing.seller.displayName}</p>
                <p className={styles.sellerMeta}>
                  {dict.detail.sellerTypes[listing.seller.type] || listing.seller.type}
                  {listing.seller.isVerified && " · ✓ Verified"}
                </p>
              </div>
            </div>
            {listing.seller.ratingAvg && (
              <div className={styles.sellerRating}>
                ⭐ {listing.seller.ratingAvg} ({listing.seller.ratingCount})
              </div>
            )}
            <button className={`btn btn-primary btn-lg ${styles.ctaBtn}`} id="contact-seller">
              {dict.detail.contactSeller}
            </button>
          </div>

          {/* Scores */}
          <div className={styles.sideCard}>
            <div className={styles.scoreRow}>
              <span className={styles.scoreLabel}>{dict.detail.trustScore}</span>
              <span className={`badge ${(listing.trustScore ?? 0) >= 80 ? "badge-success" : "badge-warning"}`}>
                {listing.trustScore}/100
              </span>
            </div>
            <div className={styles.scoreRow}>
              <span className={styles.scoreLabel}>{dict.detail.priceScore}</span>
              <span className={`badge ${(listing.priceScore ?? 0) >= 75 ? "badge-success" : "badge-warning"}`}>
                {listing.priceScore}/100
              </span>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar Listings */}
      {similar.length > 0 && (
        <section className={styles.similar} id="similar-listings">
          <h2 className="section-title">{dict.detail.similar}</h2>
          <div className={styles.similarGrid}>
            {similar.map((l) => (
              <ListingCard key={l.id} listing={l} locale={locale} dict={dict} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

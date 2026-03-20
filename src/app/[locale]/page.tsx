import { isValidLocale, localeCurrencies, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";
import { brands } from "@/data/catalog/brands";
import { getListings } from "@/data/seed";
import { ListingCard } from "@/components/listings/ListingCard";
import { formatPrice } from "@/i18n/formatters";
import Link from "next/link";
import styles from "./page.module.css";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const currency = localeCurrencies[locale];
  const listings = getListings(locale, currency);
  const newListings = listings.slice(0, 8);

  // Collections
  const suvs = listings.filter((l) => l.bodyType === "suv").slice(0, 4);
  const electrics = listings.filter((l) => l.fuelType === "electric").slice(0, 4);
  const luxury = listings.filter((l) => ["rollsroyce", "bentley", "bugatti", "ferrari", "maserati", "astonmartin"].includes(l.brandId)).slice(0, 4);

  return (
    <div className={styles.page}>
      {/* === HERO === */}
      <section className={styles.hero} id="hero-section">
        <div className={styles.heroGlow} />
        <div className={`${styles.heroInner} container`}>
          <h1 className={styles.heroTitle}>{dict.home.heroTitle}</h1>
          <p className={styles.heroSubtitle}>{dict.home.heroSubtitle}</p>

          {/* Search Bar */}
          <div className={styles.searchBar} id="hero-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Link href={`/${locale}/kesfet`} className={styles.searchInput}>
              {dict.home.searchPlaceholder}
            </Link>
            <Link href={`/${locale}/kesfet`} className={`btn btn-primary ${styles.searchBtn}`}>
              {dict.home.exploreNow}
            </Link>
          </div>

          {/* Quick stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{listings.length.toLocaleString()}+</span>
              <span className={styles.statLabel}>{locale === "tr" ? "Aktif İlan" : "Active Listings"}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{brands.length}</span>
              <span className={styles.statLabel}>{locale === "tr" ? "Marka" : "Brands"}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>4</span>
              <span className={styles.statLabel}>{locale === "tr" ? "Pazar" : "Markets"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* === POPULAR BRANDS === */}
      <section className={`${styles.section} container`} id="popular-brands">
        <div className={styles.sectionHeader}>
          <h2 className="section-title">{dict.home.popularBrands}</h2>
          <Link href={`/${locale}/kesfet`} className={styles.viewAll}>{dict.home.viewAll} →</Link>
        </div>
        <div className={styles.brandGrid}>
          {brands.map((brand) => {
            const count = listings.filter((l) => l.brandId === brand.id).length;
            return (
              <Link
                key={brand.id}
                href={`/${locale}/kesfet?brandIds=${brand.id}`}
                className={styles.brandCard}
                id={`brand-${brand.id}`}
              >
                <span className={styles.brandIcon}>{brand.name.charAt(0)}</span>
                <span className={styles.brandName}>{brand.name}</span>
                <span className={styles.brandCount}>{count} {locale === "tr" ? "ilan" : "listings"}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* === NEW LISTINGS === */}
      <section className={`${styles.section} container`} id="new-listings">
        <div className={styles.sectionHeader}>
          <h2 className="section-title">{dict.home.newListings}</h2>
          <Link href={`/${locale}/kesfet?sort=newest`} className={styles.viewAll}>{dict.home.viewAll} →</Link>
        </div>
        <div className={styles.listingGrid}>
          {newListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} locale={locale} dict={dict} />
          ))}
        </div>
      </section>

      {/* === COLLECTIONS === */}
      <section className={`${styles.section} container`} id="collections">
        <h2 className="section-title">{dict.home.collections}</h2>
        <div className={styles.collections}>
          {/* SUV Collection */}
          <div className={styles.collection}>
            <div className={styles.collectionHeader}>
              <h3 className={styles.collectionTitle}>🚙 SUV & Crossover</h3>
              <span className={styles.collectionCount}>{listings.filter((l) => l.bodyType === "suv").length} {locale === "tr" ? "araç" : "vehicles"}</span>
            </div>
            <div className={styles.collectionItems}>
              {suvs.map((l) => (
                <Link key={l.id} href={`/${locale}/ilan/${l.slug}`} className={styles.collectionItem}>
                  <span className={styles.collectionItemTitle}>{l.brandName} {l.modelName}</span>
                  <span className={styles.collectionItemPrice}>{formatPrice(l.priceAmount, locale, l.priceCurrency)}</span>
                </Link>
              ))}
            </div>
            <Link href={`/${locale}/kesfet?bodyTypes=suv`} className={styles.collectionLink}>
              {dict.home.viewAll} →
            </Link>
          </div>

          {/* Electric */}
          <div className={styles.collection}>
            <div className={styles.collectionHeader}>
              <h3 className={styles.collectionTitle}>⚡ {locale === "tr" ? "Elektrikli" : "Electric"}</h3>
              <span className={styles.collectionCount}>{listings.filter((l) => l.fuelType === "electric").length} {locale === "tr" ? "araç" : "vehicles"}</span>
            </div>
            <div className={styles.collectionItems}>
              {electrics.map((l) => (
                <Link key={l.id} href={`/${locale}/ilan/${l.slug}`} className={styles.collectionItem}>
                  <span className={styles.collectionItemTitle}>{l.brandName} {l.modelName}</span>
                  <span className={styles.collectionItemPrice}>{formatPrice(l.priceAmount, locale, l.priceCurrency)}</span>
                </Link>
              ))}
            </div>
            <Link href={`/${locale}/kesfet?fuelTypes=electric`} className={styles.collectionLink}>
              {dict.home.viewAll} →
            </Link>
          </div>

          {/* Luxury */}
          <div className={styles.collection}>
            <div className={styles.collectionHeader}>
              <h3 className={styles.collectionTitle}>👑 {locale === "tr" ? "Lüks" : "Luxury"}</h3>
              <span className={styles.collectionCount}>{luxury.length}+ {locale === "tr" ? "araç" : "vehicles"}</span>
            </div>
            <div className={styles.collectionItems}>
              {luxury.map((l) => (
                <Link key={l.id} href={`/${locale}/ilan/${l.slug}`} className={styles.collectionItem}>
                  <span className={styles.collectionItemTitle}>{l.brandName} {l.modelName}</span>
                  <span className={styles.collectionItemPrice}>{formatPrice(l.priceAmount, locale, l.priceCurrency)}</span>
                </Link>
              ))}
            </div>
            <Link href={`/${locale}/kesfet`} className={styles.collectionLink}>
              {dict.home.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* === WHY AUTOVISTA === */}
      <section className={`${styles.section} ${styles.whySection} container`} id="why-autovista">
        <h2 className="section-title" style={{ textAlign: "center" }}>{dict.home.whyAutoVista}</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🔍</span>
            <h3 className={styles.featureTitle}>{dict.home.deepFilters}</h3>
            <p className={styles.featureDesc}>{dict.home.deepFiltersDesc}</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🛡️</span>
            <h3 className={styles.featureTitle}>{dict.home.trustSignals}</h3>
            <p className={styles.featureDesc}>{dict.home.trustSignalsDesc}</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📊</span>
            <h3 className={styles.featureTitle}>{dict.home.priceIntel}</h3>
            <p className={styles.featureDesc}>{dict.home.priceIntelDesc}</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⚖️</span>
            <h3 className={styles.featureTitle}>{dict.home.smartCompare}</h3>
            <p className={styles.featureDesc}>{dict.home.smartCompareDesc}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useFavorites } from "@/components/favorites/FavoritesProvider";
import { ListingCard } from "@/components/listings/ListingCard";
import type { Locale } from "@/i18n/config";
import styles from "./favorites.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FavoritesClient({ locale, dict }: { locale: Locale; dict: any }) {
  const { favorites, clearAll, count } = useFavorites();

  return (
    <div className={`${styles.page} container`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{dict.nav.favorites}</h1>
        {count > 0 && (
          <div className={styles.headerActions}>
            <span className={styles.count}>{count} {locale === "tr" ? "araç" : "vehicles"}</span>
            <button onClick={clearAll} className="btn btn-ghost">{dict.explore.clearAll}</button>
          </div>
        )}
      </div>

      {count === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>❤️</span>
          <h2 className={styles.emptyTitle}>
            {locale === "tr" ? "Henüz favori eklemediniz" : "No favourites yet"}
          </h2>
          <p className={styles.emptyDesc}>
            {locale === "tr"
              ? "İlanlardaki kalp ikonuna tıklayarak favorilerinize ekleyin."
              : "Click the heart icon on listings to add them to your favourites."}
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map((fav) => (
            <div key={fav.listing.id} className={styles.favItem}>
              <ListingCard listing={fav.listing} locale={locale} dict={dict} />
              {/* Price change indicator */}
              {fav.priceAtAdd !== fav.listing.priceAmount && (
                <div className={`${styles.priceChange} ${fav.listing.priceAmount < fav.priceAtAdd ? styles.priceDown : styles.priceUp}`}>
                  {fav.listing.priceAmount < fav.priceAtAdd ? "↓" : "↑"}{" "}
                  {locale === "tr" ? "Fiyat değişti" : "Price changed"}
                </div>
              )}
              {/* New expert report indicator */}
              {!fav.hadExpertReport && fav.listing.condition?.hasExpertReport && (
                <div className={styles.newReport}>
                  🔬 {locale === "tr" ? "Yeni ekspertiz raporu" : "New expert report"}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

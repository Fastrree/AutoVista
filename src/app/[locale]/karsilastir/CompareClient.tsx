"use client";

import { useState } from "react";
import { useCompare } from "@/components/compare/CompareProvider";
import type { Locale } from "@/i18n/config";
import { formatPrice, formatKm, formatNumber } from "@/i18n/formatters";
import Link from "next/link";
import styles from "./compare.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CompareClient({ locale, dict }: { locale: Locale; dict: any }) {
  const { items, removeFromCompare, clearCompare, count } = useCompare();
  const [showDiffsOnly, setShowDiffsOnly] = useState(false);

  // Spec rows to compare
  const specRows = [
    { key: "year", label: dict.detail.year, getValue: (l: typeof items[0]) => String(l.year) },
    { key: "km", label: dict.detail.km, getValue: (l: typeof items[0]) => formatKm(l.km, locale) },
    { key: "price", label: dict.explore.price, getValue: (l: typeof items[0]) => formatPrice(l.priceAmount, locale, l.priceCurrency) },
    { key: "fuel", label: dict.detail.fuel, getValue: (l: typeof items[0]) => l.fuelType },
    { key: "transmission", label: dict.detail.transmission, getValue: (l: typeof items[0]) => l.transmission },
    { key: "bodyType", label: dict.detail.bodyType, getValue: (l: typeof items[0]) => l.bodyType },
    { key: "hp", label: dict.detail.power, getValue: (l: typeof items[0]) => l.horsepowerHp ? `${l.horsepowerHp} ${dict.common.hp}` : "—" },
    { key: "torque", label: dict.detail.torque, getValue: (l: typeof items[0]) => l.torqueNm ? `${l.torqueNm} ${dict.common.nm}` : "—" },
    { key: "displacement", label: dict.detail.displacement, getValue: (l: typeof items[0]) => l.displacementCc ? `${formatNumber(l.displacementCc, locale)} ${dict.common.cc}` : "—" },
    { key: "drivetrain", label: dict.detail.drivetrain, getValue: (l: typeof items[0]) => l.drivetrain?.toUpperCase() || "—" },
    { key: "color", label: dict.detail.color, getValue: (l: typeof items[0]) => l.exteriorColor || "—" },
    { key: "doors", label: dict.detail.doors, getValue: (l: typeof items[0]) => String(l.doorCount || 4) },
    { key: "seats", label: dict.detail.seats, getValue: (l: typeof items[0]) => String(l.seatCount || 5) },
    { key: "battery", label: "Battery", getValue: (l: typeof items[0]) => l.batteryCapacityKwh ? `${l.batteryCapacityKwh} ${dict.common.kwh}` : "—" },
    { key: "range", label: "WLTP Range", getValue: (l: typeof items[0]) => l.wltpRangeKm ? formatKm(l.wltpRangeKm, locale) : "—" },
    { key: "condition", label: dict.detail.condition, getValue: (l: typeof items[0]) => l.condition?.overallStatus || "—" },
    { key: "expertReport", label: dict.detail.expertReport, getValue: (l: typeof items[0]) => l.condition?.hasExpertReport ? "✓" : "✗" },
    { key: "trustScore", label: dict.detail.trustScore, getValue: (l: typeof items[0]) => l.trustScore ? `${l.trustScore}/100` : "—" },
    { key: "priceScore", label: dict.detail.priceScore, getValue: (l: typeof items[0]) => l.priceScore ? `${l.priceScore}/100` : "—" },
    { key: "seller", label: dict.detail.seller, getValue: (l: typeof items[0]) => l.seller.displayName },
    { key: "sellerType", label: dict.detail.sellerType || "Seller Type", getValue: (l: typeof items[0]) => dict.detail.sellerTypes[l.seller.type] || l.seller.type },
    { key: "city", label: dict.detail.location || "Location", getValue: (l: typeof items[0]) => l.city },
  ];

  // Filter to show only differences
  const visibleRows = showDiffsOnly
    ? specRows.filter((row) => {
        const values = items.map((item) => row.getValue(item));
        return new Set(values).size > 1;
      })
    : specRows;

  return (
    <div className={`${styles.page} container`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{dict.nav.compare}</h1>
        {count > 0 && (
          <div className={styles.headerActions}>
            <label className={styles.diffToggle}>
              <input
                type="checkbox"
                checked={showDiffsOnly}
                onChange={(e) => setShowDiffsOnly(e.target.checked)}
              />
              <span className={styles.toggleCheckmark} />
              {dict.compare?.showDifferences || (locale === "tr" ? "Sadece farkları göster" : "Show differences only")}
            </label>
            <button onClick={clearCompare} className="btn btn-ghost">{dict.explore.clearAll}</button>
          </div>
        )}
      </div>

      {count === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>⚖️</span>
          <h2 className={styles.emptyTitle}>
            {locale === "tr" ? "Henüz karşılaştırma eklemediniz" : "No vehicles to compare"}
          </h2>
          <p className={styles.emptyDesc}>
            {locale === "tr"
              ? "İlanlardaki karşılaştırma ikonuna tıklayarak buraya ekleyin. (Maks. 4 araç)"
              : "Click the compare icon on listings to add them here. (Max 4 vehicles)"}
          </p>
          <Link href={`/${locale}/kesfet`} className="btn btn-primary btn-lg">
            {dict.home.exploreNow}
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table} id="compare-table">
            <thead>
              <tr>
                <th className={styles.labelCell}>{locale === "tr" ? "Özellik" : "Specification"}</th>
                {items.map((item) => (
                  <th key={item.id} className={styles.vehicleCell}>
                    <div className={styles.vehicleHeader}>
                      <div className={styles.vehicleImgWrap}>
                        {item.images[0] ? (
                          <img src={item.images[0].url} alt={item.title} className={styles.vehicleImg} />
                        ) : (
                          <div className={styles.vehicleImgPlaceholder}>{item.brandName.charAt(0)}</div>
                        )}
                      </div>
                      <Link href={`/${locale}/ilan/${item.slug}`} className={styles.vehicleName}>
                        {item.brandName} {item.modelName}
                      </Link>
                      <span className={styles.vehiclePrice}>
                        {formatPrice(item.priceAmount, locale, item.priceCurrency)}
                      </span>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCompare(item.id)}
                        aria-label="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => {
                const values = items.map((item) => row.getValue(item));
                const allSame = new Set(values).size === 1;

                return (
                  <tr key={row.key} className={allSame ? styles.sameRow : styles.diffRow}>
                    <td className={styles.labelCell}>{row.label}</td>
                    {items.map((item, idx) => (
                      <td
                        key={item.id}
                        className={`${styles.valueCell} ${!allSame ? styles.diffValue : ""}`}
                      >
                        {values[idx]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

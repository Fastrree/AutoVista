"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Listing } from "@/types/listing";
import type { Brand } from "@/types/catalog";
import type { Locale } from "@/i18n/config";
import { ListingCard } from "@/components/listings/ListingCard";
import styles from "./explore.module.css";

const PAGE_SIZE = 24;

const fuelOptions = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
  { value: "pluginHybrid", label: "Plug-in Hybrid" },
];

const bodyTypeOptions = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "hatchback", label: "Hatchback" },
  { value: "coupe", label: "Coupé" },
  { value: "convertible", label: "Convertible" },
  { value: "wagon", label: "Wagon" },
  { value: "pickup", label: "Pickup" },
  { value: "supercar", label: "Supercar" },
  { value: "hypercar", label: "Hypercar" },
];

const transOptions = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];

interface ExploreClientProps {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  allListings: Listing[];
  brands: Brand[];
  initialSearchParams: Record<string, string | string[] | undefined>;
}

function parseArrayParam(val: string | string[] | undefined): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return val.split(",").filter(Boolean);
}

function parseNumParam(val: string | string[] | undefined): number | undefined {
  if (!val || Array.isArray(val)) return undefined;
  const n = parseInt(val, 10);
  return isNaN(n) ? undefined : n;
}

export function ExploreClient({ locale, dict, allListings, brands, initialSearchParams }: ExploreClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse state from URL
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => parseArrayParam(initialSearchParams.brandIds));
  const [selectedFuels, setSelectedFuels] = useState<string[]>(() => parseArrayParam(initialSearchParams.fuelTypes));
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>(() => parseArrayParam(initialSearchParams.bodyTypes));
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(() => parseArrayParam(initialSearchParams.transmissions));
  const [minPrice, setMinPrice] = useState<number | undefined>(() => parseNumParam(initialSearchParams.minPrice));
  const [maxPrice, setMaxPrice] = useState<number | undefined>(() => parseNumParam(initialSearchParams.maxPrice));
  const [minYear, setMinYear] = useState<number | undefined>(() => parseNumParam(initialSearchParams.minYear));
  const [maxYear, setMaxYear] = useState<number | undefined>(() => parseNumParam(initialSearchParams.maxYear));
  const [sort, setSort] = useState<string>(() => (initialSearchParams.sort as string) || "relevance");
  const [page, setPage] = useState<number>(() => parseNumParam(initialSearchParams.page) || 1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (selectedBrands.length) params.set("brandIds", selectedBrands.join(","));
    if (selectedFuels.length) params.set("fuelTypes", selectedFuels.join(","));
    if (selectedBodyTypes.length) params.set("bodyTypes", selectedBodyTypes.join(","));
    if (selectedTransmissions.length) params.set("transmissions", selectedTransmissions.join(","));
    if (minPrice) params.set("minPrice", String(minPrice));
    if (maxPrice) params.set("maxPrice", String(maxPrice));
    if (minYear) params.set("minYear", String(minYear));
    if (maxYear) params.set("maxYear", String(maxYear));
    if (sort !== "relevance") params.set("sort", sort);
    if (page > 1) params.set("page", String(page));

    const qs = params.toString();
    router.replace(`/${locale}/kesfet${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [selectedBrands, selectedFuels, selectedBodyTypes, selectedTransmissions, minPrice, maxPrice, minYear, maxYear, sort, page, locale, router]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...allListings];

    if (selectedBrands.length) result = result.filter((l) => selectedBrands.includes(l.brandId));
    if (selectedFuels.length) result = result.filter((l) => selectedFuels.includes(l.fuelType));
    if (selectedBodyTypes.length) result = result.filter((l) => selectedBodyTypes.includes(l.bodyType));
    if (selectedTransmissions.length) result = result.filter((l) => selectedTransmissions.includes(l.transmission));
    if (minPrice) result = result.filter((l) => l.priceAmount >= minPrice);
    if (maxPrice) result = result.filter((l) => l.priceAmount <= maxPrice);
    if (minYear) result = result.filter((l) => l.year >= minYear);
    if (maxYear) result = result.filter((l) => l.year <= maxYear);

    // Sort
    switch (sort) {
      case "priceLow": result.sort((a, b) => a.priceAmount - b.priceAmount); break;
      case "priceHigh": result.sort((a, b) => b.priceAmount - a.priceAmount); break;
      case "yearNew": result.sort((a, b) => b.year - a.year); break;
      case "kmLow": result.sort((a, b) => a.km - b.km); break;
      case "newest": result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()); break;
      default: break;
    }

    return result;
  }, [allListings, selectedBrands, selectedFuels, selectedBodyTypes, selectedTransmissions, minPrice, maxPrice, minYear, maxYear, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleArray = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
    setPage(1);
  };

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedFuels([]);
    setSelectedBodyTypes([]);
    setSelectedTransmissions([]);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinYear(undefined);
    setMaxYear(undefined);
    setSort("relevance");
    setPage(1);
  };

  const activeFilterCount = selectedBrands.length + selectedFuels.length + selectedBodyTypes.length + selectedTransmissions.length + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0) + (minYear ? 1 : 0) + (maxYear ? 1 : 0);

  // Filter Panel Content
  const filterContent = (
    <div className={styles.filterContent}>
      {/* Brands */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterLabel}>{dict.explore.brand}</h3>
        <div className={styles.filterOptions}>
          {brands.map((b) => (
            <label key={b.id} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(b.id)}
                onChange={() => toggleArray(selectedBrands, b.id, setSelectedBrands)}
              />
              <span className={styles.checkmark} />
              <span>{b.name}</span>
              <span className={styles.filterCount}>
                ({allListings.filter((l) => l.brandId === b.id).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterLabel}>{dict.explore.fuel}</h3>
        <div className={styles.filterOptions}>
          {fuelOptions.map((f) => (
            <label key={f.value} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedFuels.includes(f.value)}
                onChange={() => toggleArray(selectedFuels, f.value, setSelectedFuels)}
              />
              <span className={styles.checkmark} />
              <span>{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterLabel}>{dict.explore.bodyType}</h3>
        <div className={styles.filterOptions}>
          {bodyTypeOptions.map((b) => (
            <label key={b.value} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedBodyTypes.includes(b.value)}
                onChange={() => toggleArray(selectedBodyTypes, b.value, setSelectedBodyTypes)}
              />
              <span className={styles.checkmark} />
              <span>{b.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterLabel}>{dict.explore.transmission}</h3>
        <div className={styles.filterOptions}>
          {transOptions.map((t) => (
            <label key={t.value} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={selectedTransmissions.includes(t.value)}
                onChange={() => toggleArray(selectedTransmissions, t.value, setSelectedTransmissions)}
              />
              <span className={styles.checkmark} />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterLabel}>{dict.explore.price}</h3>
        <div className={styles.rangeInputs}>
          <input
            type="number"
            placeholder={dict.explore.min}
            value={minPrice ?? ""}
            onChange={(e) => { setMinPrice(e.target.value ? parseInt(e.target.value) : undefined); setPage(1); }}
            className={`input ${styles.rangeInput}`}
          />
          <span className={styles.rangeSep}>—</span>
          <input
            type="number"
            placeholder={dict.explore.max}
            value={maxPrice ?? ""}
            onChange={(e) => { setMaxPrice(e.target.value ? parseInt(e.target.value) : undefined); setPage(1); }}
            className={`input ${styles.rangeInput}`}
          />
        </div>
      </div>

      {/* Year Range */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterLabel}>{dict.explore.year}</h3>
        <div className={styles.rangeInputs}>
          <input
            type="number"
            placeholder={dict.explore.min}
            value={minYear ?? ""}
            onChange={(e) => { setMinYear(e.target.value ? parseInt(e.target.value) : undefined); setPage(1); }}
            className={`input ${styles.rangeInput}`}
          />
          <span className={styles.rangeSep}>—</span>
          <input
            type="number"
            placeholder={dict.explore.max}
            value={maxYear ?? ""}
            onChange={(e) => { setMaxYear(e.target.value ? parseInt(e.target.value) : undefined); setPage(1); }}
            className={`input ${styles.rangeInput}`}
          />
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearAll} className={`btn btn-ghost ${styles.clearBtn}`}>
          {dict.explore.clearAll}
        </button>
      )}
    </div>
  );

  return (
    <div className={styles.explore}>
      {/* Mobile Filter Button */}
      <div className={styles.mobileFilterBar}>
        <button
          className={`btn btn-secondary ${styles.mobileFilterBtn}`}
          onClick={() => setMobileFilterOpen(true)}
          id="mobile-filter-toggle"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
          {dict.explore.filters}
          {activeFilterCount > 0 && <span className={styles.filterBadge}>{activeFilterCount}</span>}
        </button>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className={`input ${styles.sortSelect}`}
          id="sort-select"
        >
          {Object.entries(dict.explore.sortOptions).map(([key, label]) => (
            <option key={key} value={key}>{label as string}</option>
          ))}
        </select>
      </div>

      <div className={`${styles.layout} container`}>
        {/* Desktop Sidebar */}
        <aside className={styles.sidebar} id="filter-panel">
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>{dict.explore.filters}</h2>
            {activeFilterCount > 0 && (
              <span className={`badge badge-accent`}>{activeFilterCount}</span>
            )}
          </div>
          {filterContent}
        </aside>

        {/* Results */}
        <div className={styles.results}>
          {/* Results Header */}
          <div className={styles.resultsHeader}>
            <p className={styles.resultCount}>
              <strong>{filtered.length}</strong> {dict.explore.results}
            </p>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className={`input ${styles.desktopSort}`}
              id="desktop-sort-select"
            >
              {Object.entries(dict.explore.sortOptions).map(([key, label]) => (
                <option key={key} value={key}>{label as string}</option>
              ))}
            </select>
          </div>

          {/* Listing Grid */}
          {paged.length > 0 ? (
            <div className={styles.grid}>
              {paged.map((listing) => (
                <ListingCard key={listing.id} listing={listing} locale={locale} dict={dict} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>{dict.explore.noResults}</p>
              <p className={styles.emptyDesc}>{dict.explore.noResultsDesc}</p>
              <button onClick={clearAll} className="btn btn-primary">{dict.explore.clearAll}</button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination} id="pagination">
              <button
                className="btn btn-secondary"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ← {dict.common.previous}
              </button>
              <span className={styles.pageInfo}>
                {dict.explore.page} {page} / {totalPages}
              </span>
              <button
                className="btn btn-secondary"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                {dict.common.next} →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className={styles.drawer} id="mobile-filter-drawer">
          <div className={styles.drawerOverlay} onClick={() => setMobileFilterOpen(false)} />
          <div className={styles.drawerContent}>
            <div className={styles.drawerHeader}>
              <h2>{dict.explore.filters}</h2>
              <button onClick={() => setMobileFilterOpen(false)} className="btn-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {filterContent}
            <button
              onClick={() => setMobileFilterOpen(false)}
              className={`btn btn-primary btn-lg ${styles.drawerApply}`}
            >
              {filtered.length} {dict.explore.results} — {dict.explore.apply}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

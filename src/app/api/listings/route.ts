import { NextRequest, NextResponse } from "next/server";
import { isValidLocale, localeCurrencies, defaultLocale } from "@/i18n/config";
import { getListings } from "@/data/seed";
import type { Listing, SortOption, SearchResult, FacetGroup } from "@/types/listing";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const locale = sp.get("locale") || defaultLocale;
  const currency = isValidLocale(locale) ? localeCurrencies[locale] : localeCurrencies[defaultLocale];

  let items = getListings(isValidLocale(locale) ? locale : defaultLocale, currency);

  // ─── Filters ───
  const brandIds = sp.getAll("brandIds").flatMap((v) => v.split(",")).filter(Boolean);
  const modelIds = sp.getAll("modelIds").flatMap((v) => v.split(",")).filter(Boolean);
  const fuelTypes = sp.getAll("fuelTypes").flatMap((v) => v.split(",")).filter(Boolean);
  const bodyTypes = sp.getAll("bodyTypes").flatMap((v) => v.split(",")).filter(Boolean);
  const transmissions = sp.getAll("transmissions").flatMap((v) => v.split(",")).filter(Boolean);
  const sellerTypes = sp.getAll("sellerTypes").flatMap((v) => v.split(",")).filter(Boolean);
  const minPrice = sp.get("minPrice") ? parseInt(sp.get("minPrice")!) : undefined;
  const maxPrice = sp.get("maxPrice") ? parseInt(sp.get("maxPrice")!) : undefined;
  const minKm = sp.get("minKm") ? parseInt(sp.get("minKm")!) : undefined;
  const maxKm = sp.get("maxKm") ? parseInt(sp.get("maxKm")!) : undefined;
  const minYear = sp.get("minYear") ? parseInt(sp.get("minYear")!) : undefined;
  const maxYear = sp.get("maxYear") ? parseInt(sp.get("maxYear")!) : undefined;
  const q = sp.get("q");

  if (brandIds.length) items = items.filter((l) => brandIds.includes(l.brandId));
  if (modelIds.length) items = items.filter((l) => modelIds.includes(l.modelId));
  if (fuelTypes.length) items = items.filter((l) => fuelTypes.includes(l.fuelType));
  if (bodyTypes.length) items = items.filter((l) => bodyTypes.includes(l.bodyType));
  if (transmissions.length) items = items.filter((l) => transmissions.includes(l.transmission));
  if (sellerTypes.length) items = items.filter((l) => sellerTypes.includes(l.seller.type));
  if (minPrice !== undefined) items = items.filter((l) => l.priceAmount >= minPrice);
  if (maxPrice !== undefined) items = items.filter((l) => l.priceAmount <= maxPrice);
  if (minKm !== undefined) items = items.filter((l) => l.km >= minKm);
  if (maxKm !== undefined) items = items.filter((l) => l.km <= maxKm);
  if (minYear !== undefined) items = items.filter((l) => l.year >= minYear);
  if (maxYear !== undefined) items = items.filter((l) => l.year <= maxYear);
  if (q) {
    const lower = q.toLowerCase();
    items = items.filter((l) =>
      l.title.toLowerCase().includes(lower) ||
      l.brandName.toLowerCase().includes(lower) ||
      l.modelName.toLowerCase().includes(lower)
    );
  }

  // ─── Sort ───
  const sort = (sp.get("sort") || "relevance") as SortOption;
  switch (sort) {
    case "priceLow": items.sort((a, b) => a.priceAmount - b.priceAmount); break;
    case "priceHigh": items.sort((a, b) => b.priceAmount - a.priceAmount); break;
    case "yearNew": items.sort((a, b) => b.year - a.year); break;
    case "kmLow": items.sort((a, b) => a.km - b.km); break;
    case "newest": items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()); break;
    default: break;
  }

  // ─── Pagination ───
  const page = Math.max(1, parseInt(sp.get("page") || "1"));
  const pageSize = Math.min(100, Math.max(1, parseInt(sp.get("pageSize") || "24")));
  const total = items.length;
  const paged = items.slice((page - 1) * pageSize, page * pageSize);

  // ─── Facets ───
  const allForFacets = getListings(isValidLocale(locale) ? locale : defaultLocale, currency);
  const facets: FacetGroup[] = [
    buildFacet("brandId", "Brand", allForFacets, (l) => l.brandId, (l) => l.brandName),
    buildFacet("fuelType", "Fuel", allForFacets, (l) => l.fuelType),
    buildFacet("bodyType", "Body Type", allForFacets, (l) => l.bodyType),
    buildFacet("transmission", "Transmission", allForFacets, (l) => l.transmission),
    buildFacet("sellerType", "Seller Type", allForFacets, (l) => l.seller.type),
  ];

  const result: SearchResult = {
    items: paged,
    total,
    page,
    pageSize,
    facets,
    activeFilters: [],
    summary: `${total} results`,
    marketMeta: { locale, currency },
  };

  return NextResponse.json(result);
}

function buildFacet(
  field: string,
  label: string,
  items: Listing[],
  getValue: (l: Listing) => string,
  getLabel?: (l: Listing) => string,
): FacetGroup {
  const counts = new Map<string, { count: number; label: string }>();
  for (const item of items) {
    const val = getValue(item);
    const lbl = getLabel ? getLabel(item) : val;
    const existing = counts.get(val);
    if (existing) {
      existing.count++;
    } else {
      counts.set(val, { count: 1, label: lbl });
    }
  }
  return {
    field,
    label,
    options: Array.from(counts.entries())
      .map(([value, { count, label }]) => ({ value, label, count }))
      .sort((a, b) => b.count - a.count),
  };
}

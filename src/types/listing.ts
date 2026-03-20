// ─── Listing Domain Types ───

import type { BodyType, Drivetrain, FuelType, Transmission } from "./catalog";

export interface Listing {
  id: string;
  slug: string;
  title: string;
  description?: string;

  // Vehicle core
  brandId: string;
  brandName: string;
  modelId: string;
  modelName: string;
  trimName?: string;
  year: number;
  km: number;
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  drivetrain?: Drivetrain;
  exteriorColor?: string;
  interiorColor?: string;
  doorCount?: number;
  seatCount?: number;

  // Engine
  engineCode?: string;
  displacementCc?: number;
  horsepowerHp?: number;
  torqueNm?: number;
  batteryCapacityKwh?: number;
  wltpRangeKm?: number;

  // Price
  priceAmount: number;
  priceCurrency: string;
  negotiable?: boolean;

  // Seller
  seller: ListingSeller;

  // Location
  city: string;
  country: string;
  district?: string;

  // Media
  images: ListingImage[];
  videoUrl?: string;

  // Features / Equipment
  features: string[];
  equipmentGroups?: EquipmentGroup[];

  // Condition
  condition?: VehicleCondition;

  // Scores (derived, not primary)
  priceScore?: number;
  trustScore?: number;
  qualityScore?: number;

  // Price context
  priceContext?: PriceContext;

  // Meta
  whyConsider?: string;
  publishedAt: string;
  updatedAt?: string;
  sourceId?: string;
  sourceMarket: string;
  sourceUrl?: string;
  sourceMeta?: Record<string, string>;
}

export interface ListingImage {
  url: string;
  alt?: string;
  order: number;
  width?: number;
  height?: number;
  isMain?: boolean;
}

export interface ListingSeller {
  id: string;
  displayName: string;
  type: "individual" | "dealer" | "corporate";
  isVerified: boolean;
  ratingAvg?: number;
  ratingCount?: number;
  responseRate?: number;
  activeListingCount?: number;
  city?: string;
}

export interface EquipmentGroup {
  category: string;
  items: string[];
}

export interface VehicleCondition {
  overallStatus?: string;
  hasExpertReport: boolean;
  expertReportUrl?: string;
  tramerAmount?: number;
  damagePanels?: DamagePanel[];
  notes?: string;
}

export interface DamagePanel {
  panel: string;
  conditionType:
    | "original"
    | "painted"
    | "localPainted"
    | "changed"
    | "repaired";
  severity?: "minor" | "moderate" | "major";
  note?: string;
}

export interface PriceContext {
  marketMin: number;
  marketMedian: number;
  marketMax: number;
  priceScore: number;
  label: string;
  comparableCount: number;
}

// ─── Search Types ───
export interface ListingSearchState {
  brandIds?: string[];
  modelIds?: string[];
  cityIds?: string[];
  bodyTypes?: BodyType[];
  fuelTypes?: FuelType[];
  transmissions?: Transmission[];
  sellerTypes?: string[];
  requiredFeatures?: string[];
  minPrice?: number;
  maxPrice?: number;
  minKm?: number;
  maxKm?: number;
  minYear?: number;
  maxYear?: number;
  sort?: SortOption;
  page?: number;
  locale?: string;
  q?: string;
}

export type SortOption =
  | "relevance"
  | "priceLow"
  | "priceHigh"
  | "yearNew"
  | "kmLow"
  | "newest";

export interface SearchResult {
  items: Listing[];
  total: number;
  page: number;
  pageSize: number;
  facets: FacetGroup[];
  activeFilters: ActiveFilter[];
  summary: string;
  marketMeta?: Record<string, string>;
}

export interface FacetGroup {
  field: string;
  label: string;
  options: FacetOption[];
}

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

export interface ActiveFilter {
  field: string;
  label: string;
  value: string;
  displayValue: string;
}

// ─── Listing Detail Response ───
export interface ListingDetail extends Listing {
  technicalSpecs: TechnicalSpec[];
  similarListings: Listing[];
}

export interface TechnicalSpec {
  group: string;
  items: { label: string; value: string }[];
}

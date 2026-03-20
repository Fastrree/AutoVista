// ─── Vehicle Catalog Domain Types ───

export interface Brand {
  id: string;
  name: string;
  slug: string;
  countryCode: string;
  logoUrl?: string;
  isActive: boolean;
}

export interface Model {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  segment?: string;
  bodyTypeDefault?: BodyType;
  productionStartYear?: number;
  productionEndYear?: number;
}

export interface Generation {
  id: string;
  modelId: string;
  name: string;
  code?: string;
  startYear: number;
  endYear?: number;
}

export interface Trim {
  id: string;
  generationId?: string;
  modelId: string;
  name: string;
  startYear?: number;
  endYear?: number;
}

export interface Engine {
  id: string;
  code?: string;
  displacementCc?: number;
  fuelType: FuelType;
  cylinderCount?: number;
  horsepowerHp: number;
  torqueNm?: number;
  drivetrainDefault?: Drivetrain;
  transmissionDefault?: Transmission;
  emissionStandard?: string;
  batteryCapacityKwh?: number;
  wltpRangeKm?: number;
}

export interface Feature {
  id: string;
  category: FeatureCategory;
  name: string;
  slug: string;
  valueType: "boolean" | "number" | "enum" | "text";
  unit?: string;
  isFilterable: boolean;
}

export type BodyType =
  | "sedan"
  | "suv"
  | "hatchback"
  | "coupe"
  | "convertible"
  | "wagon"
  | "pickup"
  | "van"
  | "limousine"
  | "supercar"
  | "hypercar";

export type FuelType =
  | "petrol"
  | "diesel"
  | "electric"
  | "hybrid"
  | "pluginHybrid"
  | "hydrogen"
  | "lpg";

export type Transmission = "automatic" | "manual" | "cvt" | "dct";

export type Drivetrain = "fwd" | "rwd" | "awd" | "4wd";

export type FeatureCategory =
  | "safety"
  | "comfort"
  | "infotainment"
  | "exterior"
  | "performance"
  | "ev"
  | "interior";

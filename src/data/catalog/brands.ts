import type { Brand, Model } from "@/types/catalog";

// ─── 15 Mandatory Brands ───
export const brands: Brand[] = [
  { id: "mercedes", name: "Mercedes-Benz", slug: "mercedes-benz", countryCode: "DE", isActive: true },
  { id: "bmw", name: "BMW", slug: "bmw", countryCode: "DE", isActive: true },
  { id: "audi", name: "Audi", slug: "audi", countryCode: "DE", isActive: true },
  { id: "bugatti", name: "Bugatti", slug: "bugatti", countryCode: "FR", isActive: true },
  { id: "ferrari", name: "Ferrari", slug: "ferrari", countryCode: "IT", isActive: true },
  { id: "ford", name: "Ford", slug: "ford", countryCode: "US", isActive: true },
  { id: "astonmartin", name: "Aston Martin", slug: "aston-martin", countryCode: "GB", isActive: true },
  { id: "bentley", name: "Bentley", slug: "bentley", countryCode: "GB", isActive: true },
  { id: "rollsroyce", name: "Rolls-Royce", slug: "rolls-royce", countryCode: "GB", isActive: true },
  { id: "tesla", name: "Tesla", slug: "tesla", countryCode: "US", isActive: true },
  { id: "byd", name: "BYD", slug: "byd", countryCode: "CN", isActive: true },
  { id: "aurus", name: "Aurus", slug: "aurus", countryCode: "RU", isActive: true },
  { id: "jeep", name: "Jeep", slug: "jeep", countryCode: "US", isActive: true },
  { id: "landrover", name: "Land Rover", slug: "land-rover", countryCode: "GB", isActive: true },
  { id: "maserati", name: "Maserati", slug: "maserati", countryCode: "IT", isActive: true },
];

// ─── Models per Brand (Real vehicles) ───
export const models: Model[] = [
  // Mercedes-Benz
  { id: "mb-aclass", brandId: "mercedes", name: "A-Class", slug: "a-class", segment: "compact", bodyTypeDefault: "hatchback" },
  { id: "mb-cclass", brandId: "mercedes", name: "C-Class", slug: "c-class", segment: "midsize", bodyTypeDefault: "sedan" },
  { id: "mb-eclass", brandId: "mercedes", name: "E-Class", slug: "e-class", segment: "executive", bodyTypeDefault: "sedan" },
  { id: "mb-sclass", brandId: "mercedes", name: "S-Class", slug: "s-class", segment: "luxury", bodyTypeDefault: "sedan" },
  { id: "mb-gle", brandId: "mercedes", name: "GLE", slug: "gle", segment: "suv", bodyTypeDefault: "suv" },
  { id: "mb-glc", brandId: "mercedes", name: "GLC", slug: "glc", segment: "suv", bodyTypeDefault: "suv" },
  { id: "mb-gclass", brandId: "mercedes", name: "G-Class", slug: "g-class", segment: "suv", bodyTypeDefault: "suv" },
  { id: "mb-amggt", brandId: "mercedes", name: "AMG GT", slug: "amg-gt", segment: "sport", bodyTypeDefault: "coupe" },
  { id: "mb-ml", brandId: "mercedes", name: "ML", slug: "ml", segment: "suv", bodyTypeDefault: "suv" },
  { id: "mb-cls", brandId: "mercedes", name: "CLS", slug: "cls", segment: "executive", bodyTypeDefault: "coupe" },
  { id: "mb-eqs", brandId: "mercedes", name: "EQS", slug: "eqs", segment: "luxury", bodyTypeDefault: "sedan" },
  { id: "mb-eqe", brandId: "mercedes", name: "EQE", slug: "eqe", segment: "executive", bodyTypeDefault: "sedan" },

  // BMW
  { id: "bmw-1", brandId: "bmw", name: "1 Series", slug: "1-series", segment: "compact", bodyTypeDefault: "hatchback" },
  { id: "bmw-3", brandId: "bmw", name: "3 Series", slug: "3-series", segment: "midsize", bodyTypeDefault: "sedan" },
  { id: "bmw-5", brandId: "bmw", name: "5 Series", slug: "5-series", segment: "executive", bodyTypeDefault: "sedan" },
  { id: "bmw-7", brandId: "bmw", name: "7 Series", slug: "7-series", segment: "luxury", bodyTypeDefault: "sedan" },
  { id: "bmw-x3", brandId: "bmw", name: "X3", slug: "x3", segment: "suv", bodyTypeDefault: "suv" },
  { id: "bmw-x5", brandId: "bmw", name: "X5", slug: "x5", segment: "suv", bodyTypeDefault: "suv" },
  { id: "bmw-x7", brandId: "bmw", name: "X7", slug: "x7", segment: "suv", bodyTypeDefault: "suv" },
  { id: "bmw-m3", brandId: "bmw", name: "M3", slug: "m3", segment: "sport", bodyTypeDefault: "sedan" },
  { id: "bmw-m4", brandId: "bmw", name: "M4", slug: "m4", segment: "sport", bodyTypeDefault: "coupe" },
  { id: "bmw-i4", brandId: "bmw", name: "i4", slug: "i4", segment: "midsize", bodyTypeDefault: "sedan" },
  { id: "bmw-ix", brandId: "bmw", name: "iX", slug: "ix", segment: "suv", bodyTypeDefault: "suv" },

  // Audi
  { id: "audi-a3", brandId: "audi", name: "A3", slug: "a3", segment: "compact", bodyTypeDefault: "sedan" },
  { id: "audi-a4", brandId: "audi", name: "A4", slug: "a4", segment: "midsize", bodyTypeDefault: "sedan" },
  { id: "audi-a6", brandId: "audi", name: "A6", slug: "a6", segment: "executive", bodyTypeDefault: "sedan" },
  { id: "audi-a8", brandId: "audi", name: "A8", slug: "a8", segment: "luxury", bodyTypeDefault: "sedan" },
  { id: "audi-q5", brandId: "audi", name: "Q5", slug: "q5", segment: "suv", bodyTypeDefault: "suv" },
  { id: "audi-q7", brandId: "audi", name: "Q7", slug: "q7", segment: "suv", bodyTypeDefault: "suv" },
  { id: "audi-q8", brandId: "audi", name: "Q8", slug: "q8", segment: "suv", bodyTypeDefault: "suv" },
  { id: "audi-rs6", brandId: "audi", name: "RS 6", slug: "rs6", segment: "sport", bodyTypeDefault: "wagon" },
  { id: "audi-etron", brandId: "audi", name: "e-tron GT", slug: "e-tron-gt", segment: "sport", bodyTypeDefault: "sedan" },

  // Bugatti
  { id: "bugatti-chiron", brandId: "bugatti", name: "Chiron", slug: "chiron", segment: "hypercar", bodyTypeDefault: "hypercar" },
  { id: "bugatti-veyron", brandId: "bugatti", name: "Veyron", slug: "veyron", segment: "hypercar", bodyTypeDefault: "hypercar" },
  { id: "bugatti-mistral", brandId: "bugatti", name: "Mistral", slug: "mistral", segment: "hypercar", bodyTypeDefault: "convertible" },

  // Ferrari
  { id: "ferrari-488", brandId: "ferrari", name: "488 GTB", slug: "488-gtb", segment: "supercar", bodyTypeDefault: "supercar" },
  { id: "ferrari-f8", brandId: "ferrari", name: "F8 Tributo", slug: "f8-tributo", segment: "supercar", bodyTypeDefault: "supercar" },
  { id: "ferrari-sf90", brandId: "ferrari", name: "SF90 Stradale", slug: "sf90-stradale", segment: "hypercar", bodyTypeDefault: "supercar" },
  { id: "ferrari-roma", brandId: "ferrari", name: "Roma", slug: "roma", segment: "gt", bodyTypeDefault: "coupe" },
  { id: "ferrari-portofino", brandId: "ferrari", name: "Portofino", slug: "portofino", segment: "gt", bodyTypeDefault: "convertible" },
  { id: "ferrari-296", brandId: "ferrari", name: "296 GTB", slug: "296-gtb", segment: "supercar", bodyTypeDefault: "supercar" },
  { id: "ferrari-purosangue", brandId: "ferrari", name: "Purosangue", slug: "purosangue", segment: "suv", bodyTypeDefault: "suv" },

  // Ford
  { id: "ford-mustang", brandId: "ford", name: "Mustang", slug: "mustang", segment: "sport", bodyTypeDefault: "coupe" },
  { id: "ford-focus", brandId: "ford", name: "Focus", slug: "focus", segment: "compact", bodyTypeDefault: "hatchback" },
  { id: "ford-f150", brandId: "ford", name: "F-150", slug: "f-150", segment: "pickup", bodyTypeDefault: "pickup" },
  { id: "ford-ranger", brandId: "ford", name: "Ranger", slug: "ranger", segment: "pickup", bodyTypeDefault: "pickup" },
  { id: "ford-explorer", brandId: "ford", name: "Explorer", slug: "explorer", segment: "suv", bodyTypeDefault: "suv" },
  { id: "ford-mache", brandId: "ford", name: "Mustang Mach-E", slug: "mustang-mach-e", segment: "suv", bodyTypeDefault: "suv" },

  // Aston Martin
  { id: "am-db11", brandId: "astonmartin", name: "DB11", slug: "db11", segment: "gt", bodyTypeDefault: "coupe" },
  { id: "am-db12", brandId: "astonmartin", name: "DB12", slug: "db12", segment: "gt", bodyTypeDefault: "coupe" },
  { id: "am-vantage", brandId: "astonmartin", name: "Vantage", slug: "vantage", segment: "sport", bodyTypeDefault: "coupe" },
  { id: "am-dbx", brandId: "astonmartin", name: "DBX", slug: "dbx", segment: "suv", bodyTypeDefault: "suv" },
  { id: "am-dbs", brandId: "astonmartin", name: "DBS Superleggera", slug: "dbs", segment: "supercar", bodyTypeDefault: "coupe" },

  // Bentley
  { id: "bentley-continental", brandId: "bentley", name: "Continental GT", slug: "continental-gt", segment: "gt", bodyTypeDefault: "coupe" },
  { id: "bentley-flying", brandId: "bentley", name: "Flying Spur", slug: "flying-spur", segment: "luxury", bodyTypeDefault: "sedan" },
  { id: "bentley-bentayga", brandId: "bentley", name: "Bentayga", slug: "bentayga", segment: "suv", bodyTypeDefault: "suv" },

  // Rolls-Royce
  { id: "rr-phantom", brandId: "rollsroyce", name: "Phantom", slug: "phantom", segment: "luxury", bodyTypeDefault: "sedan" },
  { id: "rr-ghost", brandId: "rollsroyce", name: "Ghost", slug: "ghost", segment: "luxury", bodyTypeDefault: "sedan" },
  { id: "rr-cullinan", brandId: "rollsroyce", name: "Cullinan", slug: "cullinan", segment: "suv", bodyTypeDefault: "suv" },
  { id: "rr-spectre", brandId: "rollsroyce", name: "Spectre", slug: "spectre", segment: "luxury", bodyTypeDefault: "coupe" },
  { id: "rr-wraith", brandId: "rollsroyce", name: "Wraith", slug: "wraith", segment: "gt", bodyTypeDefault: "coupe" },

  // Tesla
  { id: "tesla-model3", brandId: "tesla", name: "Model 3", slug: "model-3", segment: "midsize", bodyTypeDefault: "sedan" },
  { id: "tesla-modely", brandId: "tesla", name: "Model Y", slug: "model-y", segment: "suv", bodyTypeDefault: "suv" },
  { id: "tesla-models", brandId: "tesla", name: "Model S", slug: "model-s", segment: "luxury", bodyTypeDefault: "sedan" },
  { id: "tesla-modelx", brandId: "tesla", name: "Model X", slug: "model-x", segment: "suv", bodyTypeDefault: "suv" },
  { id: "tesla-cybertruck", brandId: "tesla", name: "Cybertruck", slug: "cybertruck", segment: "pickup", bodyTypeDefault: "pickup" },

  // BYD
  { id: "byd-seal", brandId: "byd", name: "Seal", slug: "seal", segment: "midsize", bodyTypeDefault: "sedan" },
  { id: "byd-atto3", brandId: "byd", name: "Atto 3", slug: "atto-3", segment: "suv", bodyTypeDefault: "suv" },
  { id: "byd-han", brandId: "byd", name: "Han", slug: "han", segment: "executive", bodyTypeDefault: "sedan" },
  { id: "byd-tang", brandId: "byd", name: "Tang", slug: "tang", segment: "suv", bodyTypeDefault: "suv" },

  // Aurus
  { id: "aurus-senat", brandId: "aurus", name: "Senat", slug: "senat", segment: "luxury", bodyTypeDefault: "limousine" },
  { id: "aurus-komendant", brandId: "aurus", name: "Komendant", slug: "komendant", segment: "suv", bodyTypeDefault: "suv" },

  // Jeep
  { id: "jeep-wrangler", brandId: "jeep", name: "Wrangler", slug: "wrangler", segment: "suv", bodyTypeDefault: "suv" },
  { id: "jeep-grandcherokee", brandId: "jeep", name: "Grand Cherokee", slug: "grand-cherokee", segment: "suv", bodyTypeDefault: "suv" },
  { id: "jeep-cherokee", brandId: "jeep", name: "Cherokee", slug: "cherokee", segment: "suv", bodyTypeDefault: "suv" },
  { id: "jeep-compass", brandId: "jeep", name: "Compass", slug: "compass", segment: "suv", bodyTypeDefault: "suv" },
  { id: "jeep-renegade", brandId: "jeep", name: "Renegade", slug: "renegade", segment: "suv", bodyTypeDefault: "suv" },
  { id: "jeep-gladiator", brandId: "jeep", name: "Gladiator", slug: "gladiator", segment: "pickup", bodyTypeDefault: "pickup" },

  // Land Rover
  { id: "lr-rangerover", brandId: "landrover", name: "Range Rover", slug: "range-rover", segment: "luxury", bodyTypeDefault: "suv" },
  { id: "lr-rangerover-sport", brandId: "landrover", name: "Range Rover Sport", slug: "range-rover-sport", segment: "suv", bodyTypeDefault: "suv" },
  { id: "lr-defender", brandId: "landrover", name: "Defender", slug: "defender", segment: "suv", bodyTypeDefault: "suv" },
  { id: "lr-discovery", brandId: "landrover", name: "Discovery", slug: "discovery", segment: "suv", bodyTypeDefault: "suv" },
  { id: "lr-evoque", brandId: "landrover", name: "Range Rover Evoque", slug: "evoque", segment: "suv", bodyTypeDefault: "suv" },
  { id: "lr-velar", brandId: "landrover", name: "Range Rover Velar", slug: "velar", segment: "suv", bodyTypeDefault: "suv" },

  // Maserati
  { id: "maserati-ghibli", brandId: "maserati", name: "Ghibli", slug: "ghibli", segment: "executive", bodyTypeDefault: "sedan" },
  { id: "maserati-levante", brandId: "maserati", name: "Levante", slug: "levante", segment: "suv", bodyTypeDefault: "suv" },
  { id: "maserati-quattroporte", brandId: "maserati", name: "Quattroporte", slug: "quattroporte", segment: "luxury", bodyTypeDefault: "sedan" },
  { id: "maserati-mc20", brandId: "maserati", name: "MC20", slug: "mc20", segment: "supercar", bodyTypeDefault: "supercar" },
  { id: "maserati-grecale", brandId: "maserati", name: "Grecale", slug: "grecale", segment: "suv", bodyTypeDefault: "suv" },
  { id: "maserati-granturismo", brandId: "maserati", name: "GranTurismo", slug: "granturismo", segment: "gt", bodyTypeDefault: "coupe" },
];

// ─── Mercedes ML 63 AMG trims (normalized as trims, not brands) ───
export const mercedesMLTrims = [
  { id: "trim-ml63amg", modelId: "mb-ml", name: "ML 63 AMG", slug: "ml-63-amg" },
  { id: "trim-ml63amg-brabus", modelId: "mb-ml", name: "ML 63 AMG Brabus", slug: "ml-63-amg-brabus" },
  { id: "trim-ml63amg-brabus-700", modelId: "mb-ml", name: "ML 63 AMG Brabus 700", slug: "ml-63-amg-brabus-700" },
  { id: "trim-ml63amg-brabus-b63s", modelId: "mb-ml", name: "ML 63 AMG Brabus B63S", slug: "ml-63-amg-brabus-b63s" },
];

export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}

export function getModelsByBrand(brandId: string): Model[] {
  return models.filter((m) => m.brandId === brandId);
}

export function getModelById(id: string): Model | undefined {
  return models.find((m) => m.id === id);
}

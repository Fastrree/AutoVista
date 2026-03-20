// ─── Seed Data Generator — Realistic listings ───
import { brands, models } from "@/data/catalog/brands";
import type { Listing, EquipmentGroup, VehicleCondition, DamagePanel, PriceContext, ListingSeller } from "@/types/listing";
import type { BodyType, FuelType, Transmission, Drivetrain } from "@/types/catalog";

// ─── Helper Data ───
const cities: Record<string, { city: string; country: string }[]> = {
  tr: [
    { city: "İstanbul", country: "TR" }, { city: "Ankara", country: "TR" },
    { city: "İzmir", country: "TR" }, { city: "Bursa", country: "TR" },
    { city: "Antalya", country: "TR" }, { city: "Adana", country: "TR" },
    { city: "Konya", country: "TR" }, { city: "Gaziantep", country: "TR" },
  ],
  de: [
    { city: "Berlin", country: "DE" }, { city: "München", country: "DE" },
    { city: "Hamburg", country: "DE" }, { city: "Frankfurt", country: "DE" },
    { city: "Köln", country: "DE" }, { city: "Stuttgart", country: "DE" },
    { city: "Düsseldorf", country: "DE" },
  ],
  "en-gb": [
    { city: "London", country: "GB" }, { city: "Manchester", country: "GB" },
    { city: "Birmingham", country: "GB" }, { city: "Edinburgh", country: "GB" },
    { city: "Liverpool", country: "GB" }, { city: "Bristol", country: "GB" },
  ],
  "en-us": [
    { city: "New York", country: "US" }, { city: "Los Angeles", country: "US" },
    { city: "Chicago", country: "US" }, { city: "Houston", country: "US" },
    { city: "Miami", country: "US" }, { city: "San Francisco", country: "US" },
    { city: "Dallas", country: "US" },
  ],
};

const colors = ["Black", "White", "Silver", "Grey", "Blue", "Red", "Dark Blue", "Pearl White", "Obsidian Black", "Glacier White", "Sapphire Blue", "Racing Green"];
const sellerNames = ["AutoCenter Premium", "Elite Motors", "City Cars", "Premium Auto Gallery", "Star Motors", "Golden Wheel", "AutoHaus Select", "Drive Nation", "Royal Motors"];

const featurePool = [
  "Apple CarPlay", "Android Auto", "Sunroof", "Panoramic Roof", "Heated Seats",
  "Ventilated Seats", "Adaptive Cruise Control", "Lane Keep Assist", "Blind Spot Monitor",
  "360° Camera", "Head-Up Display", "Wireless Charging", "Harman Kardon Sound",
  "Bang & Olufsen Sound", "LED Matrix Headlights", "Ambient Lighting", "Keyless Entry",
  "Electric Trunk", "Memory Seats", "Parking Sensors", "Rear View Camera",
  "Navigation", "DAB Radio", "Automatic Parking", "Traffic Sign Recognition",
  "Night Vision", "Massage Seats", "Air Suspension", "Sport Exhaust",
  "Carbon Fiber Trim", "Alcantara Interior", "19-inch Alloys", "20-inch Alloys",
  "21-inch Alloys", "Performance Brakes", "Launch Control", "Sport Differential",
];

const equipmentCategories: Record<string, string[]> = {
  "Safety": ["ABS", "ESP", "Airbags (8x)", "ISOFIX", "Emergency Brake Assist", "Tire Pressure Monitor"],
  "Comfort": ["Climate Control", "Heated Steering Wheel", "Electric Windows", "Electric Mirrors", "Rain Sensor", "Light Sensor"],
  "Infotainment": ["Touchscreen Display", "Bluetooth", "USB-C Ports", "Digital Cockpit"],
  "Exterior": ["LED Headlights", "LED Taillights", "Fog Lights", "Roof Rails", "Chrome Package"],
  "Performance": ["Sport Mode", "Paddle Shifters", "Sport Suspension"],
};

const panels = ["hood", "roof", "trunk", "left_front_door", "right_front_door", "left_rear_door", "right_rear_door", "left_fender", "right_fender"];
const conditionTypes: DamagePanel["conditionType"][] = ["original", "painted", "localPainted", "changed", "repaired"];

const whyConsiderTemplates = [
  "Low mileage for its age, well-maintained service history",
  "Full options package with premium sound system",
  "Single owner, garage kept, excellent condition",
  "Recently serviced, new tires, comprehensive warranty",
  "Rare color combination, factory sport package",
  "Below market average price, verified seller",
  "Complete service records, no accident history",
  "Premium spec with advanced driver assistance",
  "Dealer certified pre-owned with extended warranty",
  "Exceptional value with low running costs",
];

// ─── Seeded Random ───
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickN<T>(arr: T[], n: number, rand: () => number): T[] {
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
}

function randomInt(min: number, max: number, rand: () => number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}

// ─── Price ranges by brand ───
const priceRanges: Record<string, { min: number; max: number }> = {
  mercedes: { min: 25000, max: 180000 },
  bmw: { min: 22000, max: 160000 },
  audi: { min: 20000, max: 150000 },
  bugatti: { min: 2000000, max: 5000000 },
  ferrari: { min: 200000, max: 800000 },
  ford: { min: 15000, max: 80000 },
  astonmartin: { min: 120000, max: 350000 },
  bentley: { min: 150000, max: 400000 },
  rollsroyce: { min: 250000, max: 600000 },
  tesla: { min: 30000, max: 120000 },
  byd: { min: 20000, max: 60000 },
  aurus: { min: 200000, max: 500000 },
  jeep: { min: 25000, max: 90000 },
  landrover: { min: 40000, max: 200000 },
  maserati: { min: 60000, max: 250000 },
  volkswagen: { min: 15000, max: 60000 },
  toyota: { min: 12000, max: 80000 },
  nissan: { min: 12000, max: 120000 },
};

const currencyMultipliers: Record<string, number> = {
  TRY: 32,
  GBP: 0.79,
  EUR: 0.92,
  USD: 1,
};

const fuelTypes: FuelType[] = ["petrol", "diesel", "electric", "hybrid", "pluginHybrid"];
const transmissions: Transmission[] = ["automatic", "manual"];
const drivetrains: Drivetrain[] = ["fwd", "rwd", "awd"];

function getEngineSpec(brand: string, fuel: FuelType, rand: () => number) {
  if (fuel === "electric") {
    return {
      displacementCc: undefined,
      horsepowerHp: randomInt(150, 750, rand),
      torqueNm: randomInt(300, 1000, rand),
      batteryCapacityKwh: pick([40, 58, 62, 75, 77, 82, 100, 107, 120], rand),
      wltpRangeKm: randomInt(250, 650, rand),
    };
  }
  const isLuxury = ["bugatti", "ferrari", "astonmartin", "bentley", "rollsroyce", "maserati"].includes(brand);
  return {
    displacementCc: isLuxury ? pick([3000, 3800, 4000, 4700, 5200, 5500, 6000, 6500, 8000], rand) : pick([1000, 1200, 1400, 1500, 1600, 1800, 2000, 2500, 3000], rand),
    horsepowerHp: isLuxury ? randomInt(300, 1500, rand) : randomInt(100, 400, rand),
    torqueNm: isLuxury ? randomInt(400, 1600, rand) : randomInt(150, 500, rand),
    batteryCapacityKwh: fuel === "pluginHybrid" || fuel === "hybrid" ? pick([8, 12, 14, 18, 25], rand) : undefined,
    wltpRangeKm: fuel === "pluginHybrid" ? randomInt(40, 100, rand) : undefined,
  };
}

// ─── Generate Listings ───
export function generateListings(market: string, currency: string, count: number = 200): Listing[] {
  const rand = seededRandom(market.charCodeAt(0) * 1000 + count);
  const marketCities = cities[market] || cities.tr;
  const multiplier = currencyMultipliers[currency] || 1;
  const listings: Listing[] = [];

  for (let i = 0; i < count; i++) {
    const brand = pick(brands, rand);
    const brandModels = models.filter((m) => m.brandId === brand.id);
    if (brandModels.length === 0) continue;
    const model = pick(brandModels, rand);

    const year = randomInt(2015, 2025, rand);
    const km = randomInt(1000, 200000, rand);
    const fuel = brand.id === "tesla" || brand.id === "byd" ? "electric" as FuelType : pick(fuelTypes, rand);
    const trans = fuel === "electric" ? "automatic" as Transmission : pick(transmissions, rand);
    const drivetrain = pick(drivetrains, rand);
    const color = pick(colors, rand);
    const loc = pick(marketCities, rand);
    const engine = getEngineSpec(brand.id, fuel, rand);

    const basePrice = randomInt(priceRanges[brand.id]?.min || 20000, priceRanges[brand.id]?.max || 100000, rand);
    const price = Math.round(basePrice * multiplier);

    const sellerType = pick(["individual", "dealer", "corporate"] as const, rand);
    const seller: ListingSeller = {
      id: `seller-${market}-${i}`,
      displayName: sellerType === "individual" ? `User ${randomInt(1000, 9999, rand)}` : pick(sellerNames, rand),
      type: sellerType,
      isVerified: sellerType === "dealer" ? rand() > 0.2 : rand() > 0.6,
      ratingAvg: Number((3.5 + rand() * 1.5).toFixed(1)),
      ratingCount: randomInt(5, 500, rand),
      responseRate: Number((0.7 + rand() * 0.3).toFixed(2)),
      activeListingCount: sellerType === "dealer" ? randomInt(5, 80, rand) : randomInt(1, 3, rand),
      city: loc.city,
    };

    const featureCount = randomInt(3, 12, rand);
    const selectedFeatures = pickN(featurePool, featureCount, rand);

    const eqGroups: EquipmentGroup[] = Object.entries(equipmentCategories).map(([cat, items]) => ({
      category: cat,
      items: pickN(items, randomInt(2, items.length, rand), rand),
    }));

    // Condition — 70% have all original panels
    const hasAnyDamage = rand() > 0.7;
    const damagePanels: DamagePanel[] = hasAnyDamage
      ? pickN(panels, randomInt(1, 3, rand), rand).map((p) => ({
          panel: p,
          conditionType: pick(conditionTypes.filter((c) => c !== "original"), rand),
        }))
      : [];

    const condition: VehicleCondition = {
      overallStatus: damagePanels.length === 0 ? "Clean" : "Has records",
      hasExpertReport: rand() > 0.5,
      tramerAmount: hasAnyDamage ? randomInt(0, 50000, rand) : 0,
      damagePanels,
    };

    // Price context
    const priceContext: PriceContext = {
      marketMin: Math.round(price * (0.8 + rand() * 0.1)),
      marketMedian: Math.round(price * (0.95 + rand() * 0.1)),
      marketMax: Math.round(price * (1.1 + rand() * 0.2)),
      priceScore: randomInt(50, 95, rand),
      label: pick(["Good Price", "Fair Price", "Above Average", "Great Deal", "Market Price"], rand),
      comparableCount: randomInt(5, 50, rand),
    };

    const slug = `${brand.slug}-${model.slug}-${year}-${i}`;

    const listing: Listing = {
      id: `${market}-${i}`,
      slug,
      title: `${brand.name} ${model.name} ${year}`,
      description: `${year} ${brand.name} ${model.name}, ${engine.horsepowerHp} HP, ${formatNumber(km)} km`,
      brandId: brand.id,
      brandName: brand.name,
      modelId: model.id,
      modelName: model.name,
      year,
      km,
      fuelType: fuel,
      transmission: trans,
      bodyType: model.bodyTypeDefault || "sedan",
      drivetrain,
      exteriorColor: color,
      doorCount: model.bodyTypeDefault === "coupe" ? 2 : 4,
      seatCount: model.bodyTypeDefault === "coupe" ? 2 : 5,
      ...engine,
      priceAmount: price,
      priceCurrency: currency,
      seller,
      city: loc.city,
      country: loc.country,
      images: generatePlaceholderImages(brand.slug, model.slug, i, rand),
      features: selectedFeatures,
      equipmentGroups: eqGroups,
      condition,
      priceScore: priceContext.priceScore,
      trustScore: randomInt(60, 98, rand),
      priceContext,
      whyConsider: pick(whyConsiderTemplates, rand),
      publishedAt: new Date(Date.now() - randomInt(0, 90 * 24 * 60 * 60 * 1000, rand)).toISOString(),
      sourceMarket: market,
    };

    listings.push(listing);
  }

  return listings;
}

function generatePlaceholderImages(brandSlug: string, modelSlug: string, index: number, rand: () => number) {
  const count = randomInt(3, 8, rand);
  return Array.from({ length: count }, (_, i) => ({
    url: `https://placehold.co/800x500/1a1a2e/00d4aa?text=${encodeURIComponent(`${brandSlug} ${modelSlug}`)}`,
    alt: `${brandSlug} ${modelSlug} photo ${i + 1}`,
    order: i,
    width: 800,
    height: 500,
    isMain: i === 0,
  }));
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

// ─── Cached data store ───
const cache: Record<string, Listing[]> = {};

export function getListings(market: string, currency: string): Listing[] {
  const key = `${market}-${currency}`;
  if (!cache[key]) {
    cache[key] = generateListings(market, currency, 200);
  }
  return cache[key];
}

export function getListingBySlug(market: string, currency: string, slug: string): Listing | undefined {
  const all = getListings(market, currency);
  return all.find((l) => l.slug === slug);
}

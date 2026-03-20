// ─── API Contract Tests ───
// Validates the /api/listings and /api/listings/[slug] endpoints
// return data matching the SearchResult and ListingDetail contracts.

import { describe, it, expect } from "vitest";
import { getListings, getListingBySlug } from "@/data/seed";
import type { Listing } from "@/types/listing";

// We test the data layer directly since Next.js API routes
// are thin wrappers around these functions.

describe("GET /api/listings — Search Contract", () => {
  const locale = "tr";
  const currency = "TRY";

  it("returns listings array with correct shape", () => {
    const items = getListings(locale, currency);
    expect(items).toBeDefined();
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
  });

  it("each listing has required fields", () => {
    const items = getListings(locale, currency);
    const first = items[0];

    // Core identity
    expect(first.id).toBeDefined();
    expect(typeof first.id).toBe("string");
    expect(first.slug).toBeDefined();
    expect(typeof first.slug).toBe("string");
    expect(first.title).toBeDefined();

    // Vehicle
    expect(first.brandId).toBeDefined();
    expect(first.brandName).toBeDefined();
    expect(first.modelId).toBeDefined();
    expect(first.modelName).toBeDefined();
    expect(typeof first.year).toBe("number");
    expect(first.year).toBeGreaterThan(1990);
    expect(first.year).toBeLessThanOrEqual(2026);
    expect(typeof first.km).toBe("number");
    expect(first.km).toBeGreaterThanOrEqual(0);

    // Enums
    expect(["petrol", "diesel", "electric", "hybrid", "pluginHybrid", "hydrogen", "lpg"]).toContain(first.fuelType);
    expect(["automatic", "manual", "cvt", "dct"]).toContain(first.transmission);
    expect(["sedan", "suv", "hatchback", "coupe", "convertible", "wagon", "van", "pickup", "minivan", "crossover", "limousine", "supercar"]).toContain(first.bodyType);

    // Price
    expect(typeof first.priceAmount).toBe("number");
    expect(first.priceAmount).toBeGreaterThan(0);
    expect(first.priceCurrency).toBe("TRY");

    // Seller
    expect(first.seller).toBeDefined();
    expect(first.seller.id).toBeDefined();
    expect(first.seller.displayName).toBeDefined();
    expect(["individual", "dealer", "corporate"]).toContain(first.seller.type);
    expect(typeof first.seller.isVerified).toBe("boolean");

    // Location
    expect(first.city).toBeDefined();
    expect(first.country).toBeDefined();

    // Media
    expect(Array.isArray(first.images)).toBe(true);
    expect(Array.isArray(first.features)).toBe(true);

    // Meta
    expect(first.publishedAt).toBeDefined();
    expect(first.sourceMarket).toBe("tr");
  });

  it("generates consistent listings across calls (deterministic)", () => {
    const first = getListings(locale, currency);
    const second = getListings(locale, currency);

    expect(first.length).toBe(second.length);
    expect(first[0].id).toBe(second[0].id);
    expect(first[0].priceAmount).toBe(second[0].priceAmount);
  });

  it("generates locale-specific currency", () => {
    const trItems = getListings("tr", "TRY");
    const gbItems = getListings("en-gb", "GBP");
    const deItems = getListings("de", "EUR");
    const usItems = getListings("en-us", "USD");

    expect(trItems[0].priceCurrency).toBe("TRY");
    expect(gbItems[0].priceCurrency).toBe("GBP");
    expect(deItems[0].priceCurrency).toBe("EUR");
    expect(usItems[0].priceCurrency).toBe("USD");
  });

  it("generates 200 listings per market (seed target)", () => {
    const items = getListings(locale, currency);
    expect(items.length).toBe(200);
  });

  it("all slugs are unique within a market", () => {
    const items = getListings(locale, currency);
    const slugs = items.map((l) => l.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("all IDs are unique within a market", () => {
    const items = getListings(locale, currency);
    const ids = items.map((l) => l.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("condition panel types are valid enum values", () => {
    const items = getListings(locale, currency);
    const validTypes = ["original", "painted", "localPainted", "changed", "repaired"];

    for (const item of items) {
      if (item.condition?.damagePanels) {
        for (const dp of item.condition.damagePanels) {
          expect(validTypes).toContain(dp.conditionType);
        }
      }
    }
  });

  it("price context scores are in 0-100 range", () => {
    const items = getListings(locale, currency);

    for (const item of items) {
      if (item.priceContext) {
        expect(item.priceContext.priceScore).toBeGreaterThanOrEqual(0);
        expect(item.priceContext.priceScore).toBeLessThanOrEqual(100);
        expect(item.priceContext.marketMin).toBeLessThanOrEqual(item.priceContext.marketMax);
      }
    }
  });
});

describe("GET /api/listings/[slug] — Detail Contract", () => {
  const locale = "tr";
  const currency = "TRY";

  it("returns a listing by slug", () => {
    const items = getListings(locale, currency);
    const slug = items[0].slug;
    const detail = getListingBySlug(locale, currency, slug);

    expect(detail).toBeDefined();
    expect(detail!.slug).toBe(slug);
  });

  it("returns undefined for non-existent slug", () => {
    const detail = getListingBySlug(locale, currency, "non-existent-slug-xyz");
    expect(detail).toBeUndefined();
  });

  it("detail has all listing fields plus extras", () => {
    const items = getListings(locale, currency);
    const detail = getListingBySlug(locale, currency, items[0].slug);

    expect(detail).toBeDefined();
    // Should have all Listing fields
    expect(detail!.id).toBeDefined();
    expect(detail!.brandName).toBeDefined();
    expect(detail!.priceAmount).toBeGreaterThan(0);
    expect(detail!.seller).toBeDefined();
    expect(detail!.condition).toBeDefined();
  });

  it("equipment groups have valid structure", () => {
    const items = getListings(locale, currency);
    const detail = getListingBySlug(locale, currency, items[0].slug);

    if (detail?.equipmentGroups) {
      for (const group of detail.equipmentGroups) {
        expect(group.category).toBeDefined();
        expect(typeof group.category).toBe("string");
        expect(Array.isArray(group.items)).toBe(true);
        expect(group.items.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("Facet Generation", () => {
  it("builds correct facet structure from listings", () => {
    const items = getListings("tr", "TRY");

    // Simulate facet building (same as API route)
    const brandCounts = new Map<string, number>();
    for (const item of items) {
      brandCounts.set(item.brandId, (brandCounts.get(item.brandId) || 0) + 1);
    }

    expect(brandCounts.size).toBeGreaterThan(0);
    // Every brand in the results should have a count
    for (const [, count] of brandCounts) {
      expect(count).toBeGreaterThan(0);
    }
  });
});

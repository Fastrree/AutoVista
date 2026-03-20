// ─── Ingestion Adapter Tests ───
// Validates adapter interface compliance, configuration,
// normalization logic, and error handling.

import { describe, it, expect } from "vitest";
import { DEFAULT_ADAPTER_CONFIG, type AdapterConfig, type MarketSourceAdapter } from "@/adapters/interface";
import { SahibindenAdapter } from "@/adapters/tr/sahibinden";
import { MobileDeAdapter } from "@/adapters/de/mobilede";
import { AutoTraderUKAdapter } from "@/adapters/uk/autotrader";
import { USScrapingAdapter } from "@/adapters/us/scraper";
import { createAdapterRegistry } from "@/adapters/registry";
import { featureFlags, isMarketEnabled, isKillSwitchActive } from "@/adapters/flags";

describe("Default Adapter Config", () => {
  it("has sensible rate limiting defaults", () => {
    expect(DEFAULT_ADAPTER_CONFIG.rateLimit).toBeGreaterThan(0);
    expect(DEFAULT_ADAPTER_CONFIG.rateLimit).toBeLessThanOrEqual(60);
  });

  it("has retry configuration", () => {
    expect(DEFAULT_ADAPTER_CONFIG.maxRetries).toBeGreaterThanOrEqual(1);
    expect(DEFAULT_ADAPTER_CONFIG.retryDelayMs).toBeGreaterThanOrEqual(500);
  });

  it("has reasonable timeout", () => {
    expect(DEFAULT_ADAPTER_CONFIG.timeoutMs).toBeGreaterThanOrEqual(5000);
    expect(DEFAULT_ADAPTER_CONFIG.timeoutMs).toBeLessThanOrEqual(60000);
  });

  it("has user agent string", () => {
    expect(DEFAULT_ADAPTER_CONFIG.userAgent).toBeDefined();
    expect(DEFAULT_ADAPTER_CONFIG.userAgent).toContain("AutoVista");
  });
});

describe("TR Adapter — SahibindenAdapter", () => {
  const adapter = new SahibindenAdapter();

  it("implements MarketSourceAdapter interface", () => {
    expectAdapterInterface(adapter);
  });

  it("has correct market and source identifiers", () => {
    expect(adapter.id).toBe("tr-sahibinden");
    expect(adapter.market).toBe("tr");
    expect(adapter.sourceName).toBe("sahibinden");
  });

  it("uses conservative rate limit for scraping", () => {
    expect(adapter.config.rateLimit).toBeLessThanOrEqual(10);
  });

  it("has longer timeout for scraping", () => {
    expect(adapter.config.timeoutMs).toBeGreaterThanOrEqual(15000);
  });
});

describe("DE Adapter — MobileDeAdapter", () => {
  it("implements MarketSourceAdapter without API key", () => {
    const adapter = new MobileDeAdapter();
    expectAdapterInterface(adapter);
    expect(adapter.id).toBe("de-mobilede");
    expect(adapter.market).toBe("de");
  });

  it("implements MarketSourceAdapter with API key", () => {
    const adapter = new MobileDeAdapter("test-api-key");
    expectAdapterInterface(adapter);
    expect(adapter.market).toBe("de");
  });

  it("has correct source name", () => {
    const adapter = new MobileDeAdapter();
    expect(adapter.sourceName).toBe("mobile.de");
  });
});

describe("UK Adapter — AutoTraderUKAdapter", () => {
  const adapter = new AutoTraderUKAdapter();

  it("implements MarketSourceAdapter interface", () => {
    expectAdapterInterface(adapter);
  });

  it("has correct identifiers", () => {
    expect(adapter.id).toBe("uk-autotrader");
    expect(adapter.market).toBe("uk");
    expect(adapter.sourceName).toBe("autotrader.co.uk");
  });
});

describe("US Adapter — USScrapingAdapter", () => {
  const adapter = new USScrapingAdapter();

  it("implements MarketSourceAdapter interface", () => {
    expectAdapterInterface(adapter);
  });

  it("has correct identifiers", () => {
    expect(adapter.id).toBe("us-scraper");
    expect(adapter.market).toBe("us");
    expect(adapter.sourceName).toBe("us-aggregator");
  });
});

describe("Adapter Registry", () => {
  it("creates all 4 adapters by default", () => {
    const registry = createAdapterRegistry();
    expect(registry.size).toBe(4);
    expect(registry.has("tr")).toBe(true);
    expect(registry.has("de")).toBe(true);
    expect(registry.has("uk")).toBe(true);
    expect(registry.has("us")).toBe(true);
  });

  it("respects enabledMarkets filter", () => {
    const registry = createAdapterRegistry({ enabledMarkets: ["tr", "de"] });
    expect(registry.size).toBe(2);
    expect(registry.has("tr")).toBe(true);
    expect(registry.has("de")).toBe(true);
    expect(registry.has("uk")).toBe(false);
    expect(registry.has("us")).toBe(false);
  });

  it("creates empty registry when no markets enabled", () => {
    const registry = createAdapterRegistry({ enabledMarkets: [] });
    expect(registry.size).toBe(0);
  });

  it("passes DE API key to adapter", () => {
    const registry = createAdapterRegistry({ deApiKey: "test-key" });
    const deAdapter = registry.get("de");
    expect(deAdapter).toBeDefined();
    expect(deAdapter!.market).toBe("de");
  });
});

describe("Feature Flags", () => {
  it("has all required flag fields", () => {
    expect(typeof featureFlags.syncKillSwitch).toBe("boolean");
    expect(typeof featureFlags.enableTR).toBe("boolean");
    expect(typeof featureFlags.enableDE).toBe("boolean");
    expect(typeof featureFlags.enableUK).toBe("boolean");
    expect(typeof featureFlags.enableUS).toBe("boolean");
    expect(typeof featureFlags.useSeedData).toBe("boolean");
    expect(typeof featureFlags.snapshotFallback).toBe("boolean");
    expect(typeof featureFlags.verbose).toBe("boolean");
  });

  it("kill switch defaults to false", () => {
    expect(isKillSwitchActive()).toBe(false);
  });

  it("all markets enabled by default", () => {
    expect(isMarketEnabled("tr")).toBe(true);
    expect(isMarketEnabled("de")).toBe(true);
    expect(isMarketEnabled("uk")).toBe(true);
    expect(isMarketEnabled("us")).toBe(true);
  });

  it("unknown markets are disabled", () => {
    expect(isMarketEnabled("fr")).toBe(false);
    expect(isMarketEnabled("")).toBe(false);
    expect(isMarketEnabled("jp")).toBe(false);
  });

  it("seed data is enabled by default (safe default)", () => {
    expect(featureFlags.useSeedData).toBe(true);
  });

  it("snapshot fallback is enabled by default", () => {
    expect(featureFlags.snapshotFallback).toBe(true);
  });
});

describe("Adapter Config Override", () => {
  it("allows partial config override", () => {
    const adapter = new SahibindenAdapter({ rateLimit: 2 });
    expect(adapter.config.rateLimit).toBe(2);
    // Other defaults should survive
    expect(adapter.config.maxRetries).toBeGreaterThan(0);
    expect(adapter.config.userAgent).toBeDefined();
  });

  it("merges configs correctly", () => {
    const adapter = new MobileDeAdapter(undefined, {
      timeoutMs: 30000,
      maxRetries: 5,
    });
    expect(adapter.config.timeoutMs).toBe(30000);
    expect(adapter.config.maxRetries).toBe(5);
    // Should still have defaults for non-overridden
    expect(adapter.config.rateLimit).toBeGreaterThan(0);
  });
});

// ─── Helper ───

function expectAdapterInterface(adapter: MarketSourceAdapter) {
  // Required read-only properties
  expect(adapter.id).toBeDefined();
  expect(typeof adapter.id).toBe("string");
  expect(adapter.market).toBeDefined();
  expect(typeof adapter.market).toBe("string");
  expect(adapter.sourceName).toBeDefined();
  expect(typeof adapter.sourceName).toBe("string");
  expect(adapter.config).toBeDefined();

  // Required methods
  expect(typeof adapter.healthCheck).toBe("function");
  expect(typeof adapter.fetchPage).toBe("function");
  expect(typeof adapter.fetchSingle).toBe("function");
  expect(typeof adapter.fullSync).toBe("function");
  expect(typeof adapter.validateSchema).toBe("function");
}

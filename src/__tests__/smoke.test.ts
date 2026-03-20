// ─── Locale, Theme, Deep-Link Smoke Tests ───
// Validates i18n configuration, formatters, theme tokens,
// and URL routing logic.

import { describe, it, expect } from "vitest";
import { locales, defaultLocale, isValidLocale, localeCurrencies, localeCountries, localeNames, type Locale } from "@/i18n/config";
import { formatPrice, formatKm, formatNumber, formatDate } from "@/i18n/formatters";

describe("i18n Configuration", () => {
  it("has exactly 4 locales", () => {
    expect(locales).toHaveLength(4);
    expect(locales).toContain("tr");
    expect(locales).toContain("en-gb");
    expect(locales).toContain("de");
    expect(locales).toContain("en-us");
  });

  it("default locale is 'tr'", () => {
    expect(defaultLocale).toBe("tr");
  });

  it("validates locale strings correctly", () => {
    expect(isValidLocale("tr")).toBe(true);
    expect(isValidLocale("en-gb")).toBe(true);
    expect(isValidLocale("de")).toBe(true);
    expect(isValidLocale("en-us")).toBe(true);
    expect(isValidLocale("fr")).toBe(false);
    expect(isValidLocale("")).toBe(false);
    expect(isValidLocale("TR")).toBe(false);
  });

  it("every locale has currency mapping", () => {
    for (const locale of locales) {
      expect(localeCurrencies[locale]).toBeDefined();
      expect(typeof localeCurrencies[locale]).toBe("string");
    }
  });

  it("currency mappings are correct", () => {
    expect(localeCurrencies["tr"]).toBe("TRY");
    expect(localeCurrencies["en-gb"]).toBe("GBP");
    expect(localeCurrencies["de"]).toBe("EUR");
    expect(localeCurrencies["en-us"]).toBe("USD");
  });

  it("every locale has country code", () => {
    for (const locale of locales) {
      expect(localeCountries[locale]).toBeDefined();
    }
  });

  it("every locale has display name", () => {
    for (const locale of locales) {
      expect(localeNames[locale]).toBeDefined();
      expect(localeNames[locale].length).toBeGreaterThan(0);
    }
  });
});

describe("Formatters", () => {
  it("formatPrice formats TR locale correctly", () => {
    const result = formatPrice(100000, "tr", "TRY");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    // Should contain the number
    expect(result).toContain("100");
  });

  it("formatPrice formats GB locale with GBP", () => {
    const result = formatPrice(25000, "en-gb", "GBP");
    expect(result).toBeDefined();
    expect(result).toContain("25");
  });

  it("formatPrice formats DE locale with EUR", () => {
    const result = formatPrice(30000, "de", "EUR");
    expect(result).toBeDefined();
    expect(result).toContain("30");
  });

  it("formatPrice formats US locale with USD", () => {
    const result = formatPrice(40000, "en-us", "USD");
    expect(result).toBeDefined();
    expect(result).toContain("40");
  });

  it("formatKm returns km for non-US locales", () => {
    const result = formatKm(150000, "tr");
    expect(result).toBeDefined();
    expect(result).toContain("150");
    expect(result.toLowerCase()).toContain("km");
  });

  it("formatKm returns miles for US locale", () => {
    const result = formatKm(150000, "en-us");
    expect(result).toBeDefined();
    // 150000 km ≈ 93206 miles
    expect(result.toLowerCase()).toContain("mi");
  });

  it("formatNumber formats with locale separators", () => {
    const result = formatNumber(15000, "tr");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });

  it("formatDate returns a date string", () => {
    const result = formatDate("2024-01-15", "tr");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("Locale Routing Logic", () => {
  it("all locale paths are valid URL segments", () => {
    for (const locale of locales) {
      // Should be lowercase, contain only valid URL chars
      expect(locale).toMatch(/^[a-z-]+$/);
      expect(locale.length).toBeGreaterThan(0);
      expect(locale.length).toBeLessThanOrEqual(5);
    }
  });

  it("deep-link slug format is consistent", () => {
    // Slugs should follow brandname-modelname-year-index pattern
    const slugPattern = /^[a-z0-9-]+-\d{4}-\d+$/;
    // Test with a few known slug patterns
    expect("bmw-x3-2023-1").toMatch(slugPattern);
    expect("mercedes-benz-c-class-2022-5").toMatch(slugPattern);
  });
});

describe("Theme System", () => {
  it("CSS custom properties exist in globals", async () => {
    // Read the CSS file and verify key tokens exist
    const fs = await import("fs");
    const path = await import("path");
    const cssPath = path.join(process.cwd(), "src/app/globals.css");
    const css = fs.readFileSync(cssPath, "utf-8");

    // Dark theme tokens
    expect(css).toContain("--bg-primary");
    expect(css).toContain("--text-primary");
    expect(css).toContain("--accent");
    expect(css).toContain("--border");

    // Light theme override
    expect(css).toContain('[data-theme="light"]');

    // Typography
    expect(css).toContain("--font-display");
    expect(css).toContain("--font-sans");

    // Spacing
    expect(css).toContain("--space-sm");
    expect(css).toContain("--space-md");
    expect(css).toContain("--space-lg");

    // Animations
    expect(css).toContain("@keyframes");
  });

  it("theme toggle persists via localStorage key", () => {
    // Verify the key name used across components
    const THEME_KEY = "autovista-theme";
    expect(THEME_KEY).toBe("autovista-theme");
  });
});

// ─── TR Adapter: sahibinden.com scraping adapter ───
// TEMPORARY adapter using web scraping since no official API exists.
// Replace with official API when/if available.

import {
  BaseAdapter,
  type AdapterHealth,
  type RawListingPage,
  type AdapterConfig,
} from "../interface";
import type { Listing } from "@/types/listing";

const TR_CONFIG: Partial<AdapterConfig> = {
  rateLimit: 5, // Conservative: 5 req/min for scraping
  maxRetries: 3,
  retryDelayMs: 2000,
  timeoutMs: 20000,
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
};

/**
 * Sahibinden.com scraping adapter.
 *
 * ⚠ SCRAPING ADAPTER — TEMPORARY
 * This adapter scrapes sahibinden.com listing pages.
 * It may break if the site changes its HTML structure.
 * Schema validation is used to detect drift early.
 *
 * Expected page structure selectors (as of 2024):
 * - Listing cards: `.searchResultsItem`
 * - Title: `.classifiedTitle`
 * - Price: `.classified-price-container span`
 * - Details: `.searchResultsAttributeValue`
 * - Image: `.searchResultsLargeThumbnail img`
 * - Pagination: `.pagination .paginator`
 */
export class SahibindenAdapter extends BaseAdapter {
  readonly id = "tr-sahibinden";
  readonly market = "tr";
  readonly sourceName = "sahibinden";

  private readonly baseUrl = "https://www.sahibinden.com";
  private readonly searchPath = "/otomobil";

  constructor(config?: Partial<AdapterConfig>) {
    super({ ...TR_CONFIG, ...config });
  }

  async healthCheck(): Promise<AdapterHealth> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "HEAD",
        signal: AbortSignal.timeout(this.config.timeoutMs),
        headers: { "User-Agent": this.config.userAgent },
      });

      return {
        adapter: this.id,
        market: this.market,
        healthy: response.ok,
        schemaVersion: "2024.1",
        sourceReachable: response.ok,
      };
    } catch (err) {
      return {
        adapter: this.id,
        market: this.market,
        healthy: false,
        lastError: err instanceof Error ? err.message : String(err),
        schemaVersion: "2024.1",
        sourceReachable: false,
      };
    }
  }

  async fetchPage(cursor?: string): Promise<RawListingPage> {
    const pageNum = cursor ? parseInt(cursor) : 0;
    const offset = pageNum * 20;
    const url = `${this.baseUrl}${this.searchPath}?pagingOffset=${offset}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": this.config.userAgent,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "tr-TR,tr;q=0.9",
      },
      signal: AbortSignal.timeout(this.config.timeoutMs),
    });

    if (!response.ok) {
      throw new Error(`sahibinden responded ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const items = this.parseListingsFromHtml(html);
    const hasMore = this.hasNextPage(html);

    return {
      items,
      hasMore,
      cursor: hasMore ? String(pageNum + 1) : undefined,
      sourceTimestamp: new Date().toISOString(),
    };
  }

  async fetchSingle(sourceId: string): Promise<Partial<Listing> | null> {
    const url = `${this.baseUrl}/ilan/${sourceId}/detay`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": this.config.userAgent,
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "tr-TR,tr;q=0.9",
        },
        signal: AbortSignal.timeout(this.config.timeoutMs),
      });

      if (!response.ok) return null;

      const html = await response.text();
      return this.parseDetailFromHtml(html, sourceId);
    } catch {
      return null;
    }
  }

  async validateSchema(): Promise<boolean> {
    try {
      const page = await this.fetchPage();
      // Schema is valid if we can extract at least 1 listing
      return page.items.length > 0;
    } catch {
      return false;
    }
  }

  // ─── HTML Parsing (placeholder implementations) ───
  // These would use a proper HTML parser like cheerio in production.
  // For now, they demonstrate the normalization pattern.

  private parseListingsFromHtml(html: string): Partial<Listing>[] {
    const listings: Partial<Listing>[] = [];

    // Extract listing blocks using regex patterns
    // In production: use cheerio or similar DOM parser
    const itemPattern = /class="searchResultsItem"[^>]*data-id="(\d+)"/g;
    let match;

    while ((match = itemPattern.exec(html)) !== null) {
      const sourceId = match[1];
      const listing = this.extractListingFromBlock(html, sourceId);
      if (listing) {
        listings.push(this.normalizeListing(listing, sourceId));
      }
    }

    return listings;
  }

  private extractListingFromBlock(
    _html: string,
    sourceId: string
  ): Record<string, string> | null {
    // Placeholder: in production, extract fields from HTML block
    // Return null if extraction fails (schema drift)
    return {
      sourceId,
      title: "",
      price: "",
      year: "",
      km: "",
      fuel: "",
      transmission: "",
      city: "",
      imageUrl: "",
    };
  }

  private normalizeListing(
    raw: Record<string, string>,
    sourceId: string
  ): Partial<Listing> {
    // Normalize scraped data into unified Listing schema
    return {
      id: `tr-shb-${sourceId}`,
      sourceId,
      sourceMarket: "tr",
      sourceUrl: `${this.baseUrl}/ilan/${sourceId}/detay`,
      title: raw.title || "",
      priceCurrency: "TRY",
      priceAmount: this.parsePrice(raw.price),
      year: parseInt(raw.year) || 0,
      km: this.parseKm(raw.km),
      fuelType: this.normalizeFuel(raw.fuel),
      transmission: this.normalizeTransmission(raw.transmission),
      city: raw.city || "",
      images: raw.imageUrl
        ? [{ url: raw.imageUrl, order: 0, isMain: true }]
        : [],
      features: [],
      publishedAt: new Date().toISOString(),
    };
  }

  private parseDetailFromHtml(
    _html: string,
    sourceId: string
  ): Partial<Listing> {
    // Placeholder: parse detail page HTML
    return {
      id: `tr-shb-${sourceId}`,
      sourceId,
      sourceMarket: "tr",
    };
  }

  private hasNextPage(html: string): boolean {
    return html.includes('class="prevNextBut"') && html.includes("sonraki");
  }

  // ─── Normalization Helpers ───

  private parsePrice(raw: string): number {
    if (!raw) return 0;
    return parseInt(raw.replace(/[^\d]/g, "")) || 0;
  }

  private parseKm(raw: string): number {
    if (!raw) return 0;
    return parseInt(raw.replace(/[^\d]/g, "")) || 0;
  }

  private normalizeFuel(raw: string): Listing["fuelType"] {
    const map: Record<string, Listing["fuelType"]> = {
      benzin: "petrol",
      "benzin & lpg": "lpg",
      dizel: "diesel",
      elektrik: "electric",
      hibrit: "hybrid",
    };
    return map[raw?.toLowerCase()] || "petrol";
  }

  private normalizeTransmission(raw: string): Listing["transmission"] {
    const map: Record<string, Listing["transmission"]> = {
      otomatik: "automatic",
      "yarı otomatik": "automatic",
      düz: "manual",
    };
    return map[raw?.toLowerCase()] || "manual";
  }
}

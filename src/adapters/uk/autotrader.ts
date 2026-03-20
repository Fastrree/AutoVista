// ─── UK Adapter: Auto Trader UK ───
// Uses AutoTrader's public search pages.
// Replace with partner API when available.

import {
  BaseAdapter,
  type AdapterHealth,
  type RawListingPage,
  type AdapterConfig,
} from "../interface";
import type { Listing } from "@/types/listing";

const UK_CONFIG: Partial<AdapterConfig> = {
  rateLimit: 6,
  maxRetries: 3,
  retryDelayMs: 2000,
  timeoutMs: 15000,
};

/**
 * Auto Trader UK adapter.
 *
 * Normalizes UK-specific terms:
 * - Mileage in miles (converted to km for internal storage)
 * - GBP currency
 * - "Petrol" stays petrol, "Gearbox: Automatic/Manual"
 */
export class AutoTraderUKAdapter extends BaseAdapter {
  readonly id = "uk-autotrader";
  readonly market = "uk";
  readonly sourceName = "autotrader.co.uk";

  private readonly baseUrl = "https://www.autotrader.co.uk";

  constructor(config?: Partial<AdapterConfig>) {
    super({ ...UK_CONFIG, ...config });
  }

  async healthCheck(): Promise<AdapterHealth> {
    try {
      const response = await fetch(`${this.baseUrl}/car-search`, {
        method: "HEAD",
        signal: AbortSignal.timeout(this.config.timeoutMs),
        headers: { "User-Agent": this.config.userAgent },
      });

      return {
        adapter: this.id,
        market: this.market,
        healthy: response.ok || response.status === 405,
        schemaVersion: "2024.1",
        sourceReachable: true,
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
    const pageNum = cursor ? parseInt(cursor) : 1;
    const url = `${this.baseUrl}/car-search?page=${pageNum}&postcode=SW1A1AA&radius=200`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": this.config.userAgent,
        Accept: "text/html",
        "Accept-Language": "en-GB,en;q=0.9",
      },
      signal: AbortSignal.timeout(this.config.timeoutMs),
    });

    if (!response.ok) {
      throw new Error(`AutoTrader responded ${response.status}`);
    }

    const html = await response.text();
    const items = this.parseListingsHtml(html);
    const hasMore = html.includes('"nextPage"');

    return {
      items,
      hasMore,
      cursor: hasMore ? String(pageNum + 1) : undefined,
    };
  }

  async fetchSingle(sourceId: string): Promise<Partial<Listing> | null> {
    try {
      const url = `${this.baseUrl}/car-details/${sourceId}`;
      const response = await fetch(url, {
        headers: {
          "User-Agent": this.config.userAgent,
          Accept: "text/html",
        },
        signal: AbortSignal.timeout(this.config.timeoutMs),
      });

      if (!response.ok) return null;

      const html = await response.text();
      return this.parseDetailHtml(html, sourceId);
    } catch {
      return null;
    }
  }

  async validateSchema(): Promise<boolean> {
    try {
      const page = await this.fetchPage();
      return page.items.length > 0;
    } catch {
      return false;
    }
  }

  private parseListingsHtml(_html: string): Partial<Listing>[] {
    // Placeholder: parse AutoTrader search results
    // In production: use cheerio or structured data from JSON-LD
    return [];
  }

  private parseDetailHtml(_html: string, sourceId: string): Partial<Listing> {
    return {
      id: `uk-at-${sourceId}`,
      sourceId,
      sourceMarket: "uk",
      priceCurrency: "GBP",
    };
  }

  /** Convert miles to km */
  protected milesToKm(miles: number): number {
    return Math.round(miles * 1.60934);
  }
}

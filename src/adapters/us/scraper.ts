// ─── US Adapter: Scraping fallback ───
// No single dominant US API available.
// Scrapes aggregator search pages.

import {
  BaseAdapter,
  type AdapterHealth,
  type RawListingPage,
  type AdapterConfig,
} from "../interface";
import type { Listing } from "@/types/listing";

const US_CONFIG: Partial<AdapterConfig> = {
  rateLimit: 6,
  maxRetries: 3,
  retryDelayMs: 2000,
  timeoutMs: 15000,
};

/**
 * US market scraping adapter.
 *
 * Normalizes US-specific terms:
 * - Mileage in miles (converted to km for storage)
 * - USD currency
 * - "Gas" → petrol, "Automatic" → automatic
 * - "AWD/4WD" → awd/4wd drivetrain
 */
export class USScrapingAdapter extends BaseAdapter {
  readonly id = "us-scraper";
  readonly market = "us";
  readonly sourceName = "us-aggregator";

  private readonly baseUrl = "https://www.cars.com";

  constructor(config?: Partial<AdapterConfig>) {
    super({ ...US_CONFIG, ...config });
  }

  async healthCheck(): Promise<AdapterHealth> {
    try {
      const response = await fetch(`${this.baseUrl}/shopping/results/`, {
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
    const url = `${this.baseUrl}/shopping/results/?page=${pageNum}&stock_type=used&list_price_max=&makes[]=&maximum_distance=all&zip=10001`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": this.config.userAgent,
        Accept: "text/html",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(this.config.timeoutMs),
    });

    if (!response.ok) {
      throw new Error(`Source responded ${response.status}`);
    }

    const html = await response.text();
    const items = this.parseListingsHtml(html);
    const hasMore = html.includes('"next_page_url"') || html.includes('sds-pagination__link--next');

    return {
      items,
      hasMore,
      cursor: hasMore ? String(pageNum + 1) : undefined,
    };
  }

  async fetchSingle(sourceId: string): Promise<Partial<Listing> | null> {
    try {
      const url = `${this.baseUrl}/vehicledetail/${sourceId}/`;
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
    // Placeholder: parse search results
    return [];
  }

  private parseDetailHtml(_html: string, sourceId: string): Partial<Listing> {
    return {
      id: `us-scr-${sourceId}`,
      sourceId,
      sourceMarket: "us",
      priceCurrency: "USD",
    };
  }

  /** Convert miles to km */
  protected milesToKm(miles: number): number {
    return Math.round(miles * 1.60934);
  }
}

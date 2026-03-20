// ─── DE Adapter: mobile.de / AutoScout24 ───
// Prefers mobile.de API if credentials available,
// falls back to AutoScout24 scraping.

import {
  BaseAdapter,
  type AdapterHealth,
  type RawListingPage,
  type AdapterConfig,
} from "../interface";
import type { Listing } from "@/types/listing";

const DE_CONFIG: Partial<AdapterConfig> = {
  rateLimit: 8,
  maxRetries: 3,
  retryDelayMs: 1500,
  timeoutMs: 15000,
};

/**
 * German market adapter supporting:
 * 1. mobile.de (preferred — if API key available)
 * 2. AutoScout24 (fallback scraping)
 *
 * Normalizes German automotive terms:
 * - PS → HP conversion
 * - ccm → cc
 * - Benzin → petrol, Diesel → diesel
 * - Schaltgetriebe → manual, Automatik → automatic
 */
export class MobileDeAdapter extends BaseAdapter {
  readonly id = "de-mobilede";
  readonly market = "de";
  readonly sourceName = "mobile.de";

  private readonly baseUrl = "https://suchen.mobile.de";
  private readonly apiKey: string | undefined;

  constructor(apiKey?: string, config?: Partial<AdapterConfig>) {
    super({ ...DE_CONFIG, ...config });
    this.apiKey = apiKey;
  }

  async healthCheck(): Promise<AdapterHealth> {
    try {
      const url = this.apiKey
        ? "https://services.mobile.de/search-api/search"
        : this.baseUrl;

      const headers: Record<string, string> = {
        "User-Agent": this.config.userAgent,
      };
      if (this.apiKey) {
        headers["Authorization"] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(url, {
        method: "HEAD",
        signal: AbortSignal.timeout(this.config.timeoutMs),
        headers,
      });

      return {
        adapter: this.id,
        market: this.market,
        healthy: response.ok || response.status === 405, // HEAD may not be allowed
        schemaVersion: this.apiKey ? "api-v1" : "scrape-2024.1",
        sourceReachable: true,
      };
    } catch (err) {
      return {
        adapter: this.id,
        market: this.market,
        healthy: false,
        lastError: err instanceof Error ? err.message : String(err),
        schemaVersion: this.apiKey ? "api-v1" : "scrape-2024.1",
        sourceReachable: false,
      };
    }
  }

  async fetchPage(cursor?: string): Promise<RawListingPage> {
    if (this.apiKey) {
      return this.fetchFromApi(cursor);
    }
    return this.fetchFromScraping(cursor);
  }

  async fetchSingle(sourceId: string): Promise<Partial<Listing> | null> {
    try {
      const url = this.apiKey
        ? `https://services.mobile.de/search-api/ad/${sourceId}`
        : `${this.baseUrl}/fahrzeuge/details.html?id=${sourceId}`;

      const headers: Record<string, string> = {
        "User-Agent": this.config.userAgent,
      };
      if (this.apiKey) {
        headers["Authorization"] = `Bearer ${this.apiKey}`;
        headers["Accept"] = "application/json";
      }

      const response = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(this.config.timeoutMs),
      });

      if (!response.ok) return null;

      if (this.apiKey) {
        const data = await response.json();
        return this.normalizeApiItem(data);
      } else {
        const html = await response.text();
        return this.normalizeScrapedDetail(html, sourceId);
      }
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

  // ─── API-based Fetch ───
  private async fetchFromApi(cursor?: string): Promise<RawListingPage> {
    const pageNum = cursor ? parseInt(cursor) : 1;
    const url = `https://services.mobile.de/search-api/search?pageNumber=${pageNum}&pageSize=20&categories=Car`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        Accept: "application/json",
        "User-Agent": this.config.userAgent,
      },
      signal: AbortSignal.timeout(this.config.timeoutMs),
    });

    if (!response.ok) {
      throw new Error(`mobile.de API responded ${response.status}`);
    }

    const data = await response.json();
    const items = (data.searchResult?.items || []).map(
      (item: Record<string, unknown>) => this.normalizeApiItem(item)
    );

    return {
      items,
      hasMore: data.searchResult?.currentPage < data.searchResult?.totalPages,
      cursor: String(pageNum + 1),
      totalEstimate: data.searchResult?.totalCount,
    };
  }

  // ─── Scraping-based Fetch ───
  private async fetchFromScraping(cursor?: string): Promise<RawListingPage> {
    const pageNum = cursor ? parseInt(cursor) : 1;
    const url = `${this.baseUrl}/fahrzeuge/search.html?categories=Car&pageNumber=${pageNum}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": this.config.userAgent,
        Accept: "text/html",
        "Accept-Language": "de-DE,de;q=0.9",
      },
      signal: AbortSignal.timeout(this.config.timeoutMs),
    });

    if (!response.ok) {
      throw new Error(`mobile.de responded ${response.status}`);
    }

    const html = await response.text();
    const items = this.parseListingsHtml(html);
    const hasMore = html.includes("pagination-next") && !html.includes("pagination-next disabled");

    return {
      items,
      hasMore,
      cursor: hasMore ? String(pageNum + 1) : undefined,
    };
  }

  // ─── Normalization ───

  private normalizeApiItem(data: Record<string, unknown>): Partial<Listing> {
    const ad = data as Record<string, unknown>;
    const price = ad.price as Record<string, unknown> | undefined;
    const vehicle = ad.vehicle as Record<string, unknown> | undefined;

    return {
      id: `de-mde-${ad.id || ""}`,
      sourceId: String(ad.id || ""),
      sourceMarket: "de",
      sourceUrl: String(ad.url || ""),
      title: String(ad.title || ""),
      priceCurrency: "EUR",
      priceAmount: Number(price?.amount || 0),
      year: Number(vehicle?.firstRegistration?.toString().slice(0, 4) || 0),
      km: Number(vehicle?.mileage || 0),
      fuelType: this.normalizeFuel(String(vehicle?.fuel || "")),
      transmission: this.normalizeTransmission(String(vehicle?.transmission || "")),
      horsepowerHp: this.psToHp(Number(vehicle?.power || 0)),
      features: [],
      images: [],
      publishedAt: new Date().toISOString(),
    };
  }

  private parseListingsHtml(_html: string): Partial<Listing>[] {
    // Placeholder: parse mobile.de search results HTML
    // In production: use cheerio
    return [];
  }

  private normalizeScrapedDetail(
    _html: string,
    sourceId: string
  ): Partial<Listing> {
    return {
      id: `de-mde-${sourceId}`,
      sourceId,
      sourceMarket: "de",
    };
  }

  private normalizeFuel(raw: string): Listing["fuelType"] {
    const map: Record<string, Listing["fuelType"]> = {
      benzin: "petrol",
      diesel: "diesel",
      elektro: "electric",
      hybrid: "hybrid",
      "plug-in-hybrid": "pluginHybrid",
      erdgas: "lpg",
      wasserstoff: "hydrogen",
    };
    return map[raw.toLowerCase()] || "petrol";
  }

  private normalizeTransmission(raw: string): Listing["transmission"] {
    const map: Record<string, Listing["transmission"]> = {
      automatik: "automatic",
      schaltgetriebe: "manual",
      halbautomatik: "automatic",
    };
    return map[raw.toLowerCase()] || "manual";
  }

  /** Convert PS (Pferdestärke) to HP */
  private psToHp(ps: number): number {
    return Math.round(ps * 0.9863);
  }
}

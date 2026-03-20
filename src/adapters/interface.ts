// ─── Market Source Adapter Interface ───
// All market adapters must implement this contract.
// Adapters normalize raw source data into the unified Listing schema.

import type { Listing } from "@/types/listing";

/** Configuration for rate limiting and retry behavior */
export interface AdapterConfig {
  /** Maximum requests per minute to source */
  rateLimit: number;
  /** Number of retries on transient failure */
  maxRetries: number;
  /** Base delay between retries in ms (exponential backoff applied) */
  retryDelayMs: number;
  /** Request timeout in ms */
  timeoutMs: number;
  /** User-Agent string for requests */
  userAgent: string;
}

/** Result of a single sync operation */
export interface SyncResult {
  market: string;
  adapter: string;
  success: boolean;
  listingsCount: number;
  newCount: number;
  updatedCount: number;
  removedCount: number;
  errors: SyncError[];
  durationMs: number;
  timestamp: string;
  snapshotPath?: string;
}

export interface SyncError {
  code: string;
  message: string;
  url?: string;
  retryable: boolean;
}

/** Health check result */
export interface AdapterHealth {
  adapter: string;
  market: string;
  healthy: boolean;
  lastSuccessfulSync?: string;
  lastError?: string;
  schemaVersion: string;
  sourceReachable: boolean;
}

/** Page of raw listings from source */
export interface RawListingPage {
  items: Partial<Listing>[];
  totalEstimate?: number;
  hasMore: boolean;
  cursor?: string;
  sourceTimestamp?: string;
}

/**
 * Market Source Adapter — the core contract.
 *
 * Every market (TR, DE, UK, US) gets at least one adapter.
 * Adapters handle:
 *   1. Fetching raw data from the source (API or scraping)
 *   2. Normalizing into the Listing schema
 *   3. Rate limiting and retry logic
 *   4. Schema drift detection
 */
export interface MarketSourceAdapter {
  /** Unique adapter identifier */
  readonly id: string;

  /** Market code */
  readonly market: string;

  /** Source name (e.g. "sahibinden", "mobile.de", "autotrader") */
  readonly sourceName: string;

  /** Adapter configuration */
  readonly config: AdapterConfig;

  /** Check if adapter is healthy and source is reachable */
  healthCheck(): Promise<AdapterHealth>;

  /**
   * Fetch a page of listings from the source.
   * Adapters handle their own normalization.
   * @param cursor Pagination cursor from previous page
   * @param filters Optional search filters to narrow results
   */
  fetchPage(cursor?: string, filters?: Record<string, string>): Promise<RawListingPage>;

  /**
   * Fetch a single listing by its source-specific ID.
   * Used for refreshing individual listings.
   */
  fetchSingle(sourceId: string): Promise<Partial<Listing> | null>;

  /**
   * Full sync: fetch all available listings and return normalized results.
   * This is the main entry point for the CLI sync command.
   * @param maxPages Maximum pages to fetch (safety limit)
   */
  fullSync(maxPages?: number): Promise<SyncResult>;

  /**
   * Detect if the source schema has changed (anti-drift).
   * Returns true if the current page structure matches expectations.
   */
  validateSchema(): Promise<boolean>;
}

/**
 * Default adapter configuration.
 * Individual adapters can override specific fields.
 */
export const DEFAULT_ADAPTER_CONFIG: AdapterConfig = {
  rateLimit: 10,
  maxRetries: 3,
  retryDelayMs: 1000,
  timeoutMs: 15000,
  userAgent: "AutoVista/2.1 DataSync (+https://autovista.app)",
};

/**
 * Base class for adapters with common retry/rate-limit logic.
 */
export abstract class BaseAdapter implements MarketSourceAdapter {
  abstract readonly id: string;
  abstract readonly market: string;
  abstract readonly sourceName: string;
  readonly config: AdapterConfig;

  private requestTimestamps: number[] = [];

  constructor(config?: Partial<AdapterConfig>) {
    this.config = { ...DEFAULT_ADAPTER_CONFIG, ...config };
  }

  abstract healthCheck(): Promise<AdapterHealth>;
  abstract fetchPage(cursor?: string, filters?: Record<string, string>): Promise<RawListingPage>;
  abstract fetchSingle(sourceId: string): Promise<Partial<Listing> | null>;
  abstract validateSchema(): Promise<boolean>;

  async fullSync(maxPages: number = 50): Promise<SyncResult> {
    const start = Date.now();
    const allItems: Partial<Listing>[] = [];
    const errors: SyncError[] = [];
    let cursor: string | undefined;
    let pageCount = 0;

    try {
      while (pageCount < maxPages) {
        const page = await this.fetchPageWithRetry(cursor);
        allItems.push(...page.items);
        pageCount++;

        if (!page.hasMore || !page.cursor) break;
        cursor = page.cursor;

        // Rate limit between pages
        await this.enforceRateLimit();
      }
    } catch (err) {
      errors.push({
        code: "SYNC_FAILED",
        message: err instanceof Error ? err.message : String(err),
        retryable: true,
      });
    }

    return {
      market: this.market,
      adapter: this.id,
      success: errors.length === 0,
      listingsCount: allItems.length,
      newCount: allItems.length, // First sync treats all as new
      updatedCount: 0,
      removedCount: 0,
      errors,
      durationMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
  }

  /** Fetch with exponential backoff retry */
  protected async fetchPageWithRetry(cursor?: string): Promise<RawListingPage> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        await this.enforceRateLimit();
        return await this.fetchPage(cursor);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (attempt < this.config.maxRetries) {
          const delay = this.config.retryDelayMs * Math.pow(2, attempt);
          await this.sleep(delay);
        }
      }
    }

    throw lastError || new Error("fetchPage failed after retries");
  }

  /** Enforce rate limit using sliding window */
  protected async enforceRateLimit(): Promise<void> {
    const now = Date.now();
    const windowStart = now - 60000; // 1 minute window

    // Remove timestamps outside window
    this.requestTimestamps = this.requestTimestamps.filter((t) => t > windowStart);

    if (this.requestTimestamps.length >= this.config.rateLimit) {
      const oldestInWindow = this.requestTimestamps[0];
      const waitMs = oldestInWindow + 60000 - now + 100; // +100ms buffer
      if (waitMs > 0) {
        await this.sleep(waitMs);
      }
    }

    this.requestTimestamps.push(Date.now());
  }

  protected sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

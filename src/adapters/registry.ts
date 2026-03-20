// ─── Adapter Registry ───
// Central registry for all market adapters.
// Handles adapter instantiation and market→adapter mapping.

import type { MarketSourceAdapter, SyncResult, AdapterHealth } from "./interface";
import { SahibindenAdapter } from "./tr/sahibinden";
import { MobileDeAdapter } from "./de/mobilede";
import { AutoTraderUKAdapter } from "./uk/autotrader";
import { USScrapingAdapter } from "./us/scraper";

/** Environment-based adapter configuration */
interface RegistryConfig {
  deApiKey?: string;
  enabledMarkets?: string[];
}

/**
 * Creates and returns all adapters based on configuration.
 * Respects feature flags and market enable/disable.
 */
export function createAdapterRegistry(config: RegistryConfig = {}): Map<string, MarketSourceAdapter> {
  const registry = new Map<string, MarketSourceAdapter>();

  const enabledMarkets = config.enabledMarkets || ["tr", "de", "uk", "us"];

  if (enabledMarkets.includes("tr")) {
    registry.set("tr", new SahibindenAdapter());
  }

  if (enabledMarkets.includes("de")) {
    registry.set("de", new MobileDeAdapter(config.deApiKey));
  }

  if (enabledMarkets.includes("uk")) {
    registry.set("uk", new AutoTraderUKAdapter());
  }

  if (enabledMarkets.includes("us")) {
    registry.set("us", new USScrapingAdapter());
  }

  return registry;
}

/**
 * Run sync across all registered adapters.
 * @param registry Adapter registry
 * @param markets Optional subset of markets to sync
 * @param maxPages Maximum pages per adapter
 */
export async function syncAllMarkets(
  registry: Map<string, MarketSourceAdapter>,
  markets?: string[],
  maxPages: number = 50
): Promise<SyncResult[]> {
  const adapters = markets
    ? Array.from(registry.entries()).filter(([m]) => markets.includes(m))
    : Array.from(registry.entries());

  const results: SyncResult[] = [];

  for (const [_market, adapter] of adapters) {
    console.log(`[sync] Starting ${adapter.id}...`);

    try {
      // Health check first
      const health = await adapter.healthCheck();
      if (!health.healthy) {
        console.warn(`[sync] ${adapter.id} unhealthy, skipping: ${health.lastError}`);
        results.push({
          market: adapter.market,
          adapter: adapter.id,
          success: false,
          listingsCount: 0,
          newCount: 0,
          updatedCount: 0,
          removedCount: 0,
          errors: [{ code: "UNHEALTHY", message: health.lastError || "Health check failed", retryable: true }],
          durationMs: 0,
          timestamp: new Date().toISOString(),
        });
        continue;
      }

      // Schema validation
      const schemaValid = await adapter.validateSchema();
      if (!schemaValid) {
        console.error(`[sync] ${adapter.id} SCHEMA DRIFT DETECTED — aborting this adapter`);
        results.push({
          market: adapter.market,
          adapter: adapter.id,
          success: false,
          listingsCount: 0,
          newCount: 0,
          updatedCount: 0,
          removedCount: 0,
          errors: [{ code: "SCHEMA_DRIFT", message: "Source page structure changed", retryable: false }],
          durationMs: 0,
          timestamp: new Date().toISOString(),
        });
        continue;
      }

      // Full sync
      const result = await adapter.fullSync(maxPages);
      results.push(result);
      console.log(`[sync] ${adapter.id} completed: ${result.listingsCount} listings in ${result.durationMs}ms`);
    } catch (err) {
      console.error(`[sync] ${adapter.id} crashed:`, err);
      results.push({
        market: adapter.market,
        adapter: adapter.id,
        success: false,
        listingsCount: 0,
        newCount: 0,
        updatedCount: 0,
        removedCount: 0,
        errors: [{ code: "CRASH", message: String(err), retryable: true }],
        durationMs: 0,
        timestamp: new Date().toISOString(),
      });
    }
  }

  return results;
}

/**
 * Run health checks on all registered adapters.
 */
export async function checkAllHealth(
  registry: Map<string, MarketSourceAdapter>
): Promise<AdapterHealth[]> {
  const results: AdapterHealth[] = [];

  for (const [, adapter] of registry) {
    const health = await adapter.healthCheck();
    results.push(health);
  }

  return results;
}

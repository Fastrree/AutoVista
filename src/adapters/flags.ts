// ─── Feature Flags / Kill Switch / Snapshot Fallback ───
// Controls which adapters are active, allows emergency kill,
// and provides fallback to latest snapshot when sync fails.

import * as fs from "fs";
import * as path from "path";

/**
 * Feature flags for the adapter system.
 * Can be overridden via environment variables.
 */
export interface FeatureFlags {
  /** Global kill switch — disables ALL syncing */
  syncKillSwitch: boolean;

  /** Per-market enable/disable */
  enableTR: boolean;
  enableDE: boolean;
  enableUK: boolean;
  enableUS: boolean;

  /** Use seed data instead of real sync */
  useSeedData: boolean;

  /** Fallback to latest snapshot on sync failure */
  snapshotFallback: boolean;

  /** Log verbosity */
  verbose: boolean;
}

/**
 * Read feature flags from environment variables.
 * Defaults are production-safe (seed data enabled, sync disabled).
 */
export const featureFlags: FeatureFlags = {
  syncKillSwitch: envBool("AUTOVISTA_SYNC_KILL_SWITCH", false),
  enableTR: envBool("AUTOVISTA_ENABLE_TR", true),
  enableDE: envBool("AUTOVISTA_ENABLE_DE", true),
  enableUK: envBool("AUTOVISTA_ENABLE_UK", true),
  enableUS: envBool("AUTOVISTA_ENABLE_US", true),
  useSeedData: envBool("AUTOVISTA_USE_SEED_DATA", true), // Default: true (safe)
  snapshotFallback: envBool("AUTOVISTA_SNAPSHOT_FALLBACK", true),
  verbose: envBool("AUTOVISTA_VERBOSE", false),
};

/** Check if kill switch is active */
export function isKillSwitchActive(): boolean {
  return featureFlags.syncKillSwitch;
}

/** Check if a market is enabled */
export function isMarketEnabled(market: string): boolean {
  switch (market.toLowerCase()) {
    case "tr": return featureFlags.enableTR;
    case "de": return featureFlags.enableDE;
    case "uk": return featureFlags.enableUK;
    case "us": return featureFlags.enableUS;
    default: return false;
  }
}

/** Check if seed data should be used */
export function useSeedData(): boolean {
  return featureFlags.useSeedData;
}

/**
 * Get the latest snapshot file path for a given market.
 * Returns null if no snapshot exists.
 */
export function getLatestSnapshot(market?: string): string | null {
  const snapshotDir = path.join(process.cwd(), "data", "snapshots");

  if (!fs.existsSync(snapshotDir)) return null;

  const files = fs.readdirSync(snapshotDir)
    .filter((f) => f.startsWith("sync-") && f.endsWith(".json"))
    .sort()
    .reverse(); // Most recent first

  if (files.length === 0) return null;

  // If market specified, find snapshot containing that market
  if (market) {
    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(snapshotDir, file), "utf-8");
        const data = JSON.parse(content);
        if (data.markets?.includes(market)) {
          return path.join(snapshotDir, file);
        }
      } catch {
        continue;
      }
    }
    return null;
  }

  return path.join(snapshotDir, files[0]);
}

/**
 * Load listings from the latest snapshot.
 * Returns empty array if no snapshot or parse error.
 */
export function loadSnapshotListings(market?: string): unknown[] {
  const snapshotPath = getLatestSnapshot(market);
  if (!snapshotPath) return [];

  try {
    const content = fs.readFileSync(snapshotPath, "utf-8");
    const data = JSON.parse(content);
    return data.results || [];
  } catch {
    return [];
  }
}

// ─── Helpers ───

function envBool(key: string, defaultValue: boolean): boolean {
  const val = process.env[key];
  if (val === undefined || val === "") return defaultValue;
  return val === "true" || val === "1";
}

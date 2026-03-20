// ─── CLI Sync Command ───
// Usage: npx tsx src/adapters/cli-sync.ts [--markets tr,de] [--max-pages 10] [--health-only]
//
// This is a standalone script, NOT a Next.js route.
// Run it from the project root.

import { createAdapterRegistry, syncAllMarkets, checkAllHealth } from "./registry";
import { featureFlags, isMarketEnabled, isKillSwitchActive } from "./flags";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const args = process.argv.slice(2);
  const healthOnly = args.includes("--health-only");
  const marketsArg = args.find((a) => a.startsWith("--markets="))?.split("=")[1];
  const maxPagesArg = args.find((a) => a.startsWith("--max-pages="))?.split("=")[1];

  const markets = marketsArg?.split(",").map((m) => m.trim());
  const maxPages = maxPagesArg ? parseInt(maxPagesArg) : 20;

  console.log("╔══════════════════════════════════════════╗");
  console.log("║     AutoVista Data Sync CLI v2.1         ║");
  console.log("╚══════════════════════════════════════════╝");
  console.log();

  // Check global kill switch
  if (isKillSwitchActive()) {
    console.error("🚫 KILL SWITCH ACTIVE — all syncing is disabled.");
    console.error("   Set AUTOVISTA_SYNC_KILL_SWITCH=false to re-enable.");
    process.exit(1);
  }

  // Build registry with only enabled markets
  const enabledMarkets = (markets || ["tr", "de", "uk", "us"]).filter(isMarketEnabled);

  if (enabledMarkets.length === 0) {
    console.warn("⚠ No markets enabled. Check feature flags.");
    process.exit(0);
  }

  console.log(`Markets: ${enabledMarkets.join(", ")}`);
  console.log(`Flags:`, JSON.stringify(featureFlags, null, 2));
  console.log();

  const registry = createAdapterRegistry({
    deApiKey: process.env.MOBILE_DE_API_KEY,
    enabledMarkets,
  });

  // Health check
  if (healthOnly) {
    console.log("─── Health Check ───");
    const health = await checkAllHealth(registry);
    for (const h of health) {
      const icon = h.healthy ? "✅" : "❌";
      console.log(`${icon} ${h.adapter} (${h.market}): ${h.healthy ? "healthy" : h.lastError}`);
    }
    process.exit(health.every((h) => h.healthy) ? 0 : 1);
  }

  // Full sync
  console.log("─── Starting Sync ───");
  console.log(`Max pages per adapter: ${maxPages}`);
  console.log();

  const results = await syncAllMarkets(registry, enabledMarkets, maxPages);

  // Summary
  console.log();
  console.log("─── Sync Summary ───");

  let totalListings = 0;
  let totalErrors = 0;
  let allSuccess = true;

  for (const r of results) {
    const icon = r.success ? "✅" : "❌";
    console.log(`${icon} ${r.adapter}: ${r.listingsCount} listings, ${r.durationMs}ms`);
    if (r.errors.length > 0) {
      for (const e of r.errors) {
        console.log(`   ⚠ [${e.code}] ${e.message}`);
      }
    }
    totalListings += r.listingsCount;
    totalErrors += r.errors.length;
    if (!r.success) allSuccess = false;
  }

  console.log();
  console.log(`Total: ${totalListings} listings, ${totalErrors} errors`);

  // Write snapshot
  const snapshotDir = path.join(process.cwd(), "data", "snapshots");
  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const snapshotPath = path.join(snapshotDir, `sync-${timestamp}.json`);

  const snapshot = {
    timestamp: new Date().toISOString(),
    markets: enabledMarkets,
    results,
    totalListings,
    totalErrors,
    allSuccess,
  };

  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2));
  console.log(`\nSnapshot saved: ${snapshotPath}`);

  process.exit(allSuccess ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal sync error:", err);
  process.exit(2);
});

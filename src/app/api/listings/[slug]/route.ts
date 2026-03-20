import { NextRequest, NextResponse } from "next/server";
import { isValidLocale, localeCurrencies, defaultLocale } from "@/i18n/config";
import { getListings, getListingBySlug } from "@/data/seed";
import type { ListingDetail, TechnicalSpec } from "@/types/listing";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const locale = request.nextUrl.searchParams.get("locale") || defaultLocale;
  const currency = isValidLocale(locale) ? localeCurrencies[locale] : localeCurrencies[defaultLocale];

  const listing = getListingBySlug(isValidLocale(locale) ? locale : defaultLocale, currency, slug);

  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  // Build technical specs
  const technicalSpecs: TechnicalSpec[] = [
    {
      group: "Engine & Performance",
      items: [
        ...(listing.displacementCc ? [{ label: "Displacement", value: `${listing.displacementCc} cc` }] : []),
        ...(listing.horsepowerHp ? [{ label: "Power", value: `${listing.horsepowerHp} HP` }] : []),
        ...(listing.torqueNm ? [{ label: "Torque", value: `${listing.torqueNm} Nm` }] : []),
        { label: "Fuel Type", value: listing.fuelType },
        { label: "Transmission", value: listing.transmission },
        ...(listing.drivetrain ? [{ label: "Drivetrain", value: listing.drivetrain.toUpperCase() }] : []),
      ],
    },
    {
      group: "Dimensions",
      items: [
        { label: "Doors", value: String(listing.doorCount || 4) },
        { label: "Seats", value: String(listing.seatCount || 5) },
        { label: "Body Type", value: listing.bodyType },
      ],
    },
    ...(listing.batteryCapacityKwh
      ? [{
          group: "Electric",
          items: [
            { label: "Battery", value: `${listing.batteryCapacityKwh} kWh` },
            ...(listing.wltpRangeKm ? [{ label: "WLTP Range", value: `${listing.wltpRangeKm} km` }] : []),
          ],
        }]
      : []),
  ];

  // Similar listings
  const allListings = getListings(isValidLocale(locale) ? locale : defaultLocale, currency);
  const similar = allListings
    .filter((l) => l.brandId === listing.brandId && l.id !== listing.id)
    .slice(0, 6);

  const detail: ListingDetail = {
    ...listing,
    technicalSpecs,
    similarListings: similar,
  };

  return NextResponse.json(detail);
}

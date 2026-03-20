import { isValidLocale, localeCurrencies, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";
import { getListings } from "@/data/seed";
import { brands } from "@/data/catalog/brands";
import { ExploreClient } from "./ExploreClient";

export default async function ExplorePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const currency = localeCurrencies[locale];
  const allListings = getListings(locale, currency);
  const sp = await searchParams;

  return (
    <ExploreClient
      locale={locale}
      dict={dict}
      allListings={allListings}
      brands={brands}
      initialSearchParams={sp}
    />
  );
}

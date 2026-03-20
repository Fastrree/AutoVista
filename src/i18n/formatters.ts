import { localeCurrencies, type Locale } from "./config";

export function formatPrice(
  amount: number,
  locale: Locale,
  currency?: string
): string {
  const cur = currency ?? localeCurrencies[locale];
  const intlLocale =
    locale === "tr"
      ? "tr-TR"
      : locale === "en-gb"
        ? "en-GB"
        : locale === "de"
          ? "de-DE"
          : "en-US";

  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: cur,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, locale: Locale): string {
  const intlLocale =
    locale === "tr"
      ? "tr-TR"
      : locale === "en-gb"
        ? "en-GB"
        : locale === "de"
          ? "de-DE"
          : "en-US";

  return new Intl.NumberFormat(intlLocale).format(value);
}

export function formatDate(date: string | Date, locale: Locale): string {
  const intlLocale =
    locale === "tr"
      ? "tr-TR"
      : locale === "en-gb"
        ? "en-GB"
        : locale === "de"
          ? "de-DE"
          : "en-US";

  return new Intl.DateTimeFormat(intlLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatKm(km: number, locale: Locale): string {
  if (locale === "en-us" || locale === "en-gb") {
    const miles = Math.round(km * 0.621371);
    return `${formatNumber(miles, locale)} mi`;
  }
  return `${formatNumber(km, locale)} km`;
}

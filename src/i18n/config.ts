// ─── i18n Configuration ───
export const locales = ["tr", "en-gb", "de", "en-us"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  "en-gb": "English (UK)",
  de: "Deutsch",
  "en-us": "English (US)",
};

export const localeCurrencies: Record<Locale, string> = {
  tr: "TRY",
  "en-gb": "GBP",
  de: "EUR",
  "en-us": "USD",
};

export const localeCurrencySymbols: Record<string, string> = {
  TRY: "₺",
  GBP: "£",
  EUR: "€",
  USD: "$",
};

export const localeCountries: Record<Locale, string> = {
  tr: "TR",
  "en-gb": "GB",
  de: "DE",
  "en-us": "US",
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

import type { Locale } from "./config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dictionary = Record<string, any>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  tr: () => import("./dictionaries/tr.json").then((m) => m.default),
  "en-gb": () => import("./dictionaries/en-gb.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  "en-us": () => import("./dictionaries/en-us.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

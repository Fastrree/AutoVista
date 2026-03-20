import { locales, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import { CompareProvider } from "@/components/compare/CompareProvider";
import { MainNav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.site.name} — ${dict.site.tagline}`,
    description: dict.site.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const langMap: Record<Locale, string> = {
    tr: "tr",
    "en-gb": "en-GB",
    de: "de",
    "en-us": "en",
  };

  const dict = await getDictionary(locale);

  return (
    <html lang={langMap[locale]} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('autovista-theme');
                if (t === 'light' || t === 'dark') {
                  document.documentElement.setAttribute('data-theme', t);
                } else {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <FavoritesProvider>
            <CompareProvider>
              <MainNav locale={locale} dict={dict} />
              <main style={{ minHeight: "calc(100vh - var(--nav-height) - 200px)", paddingTop: "var(--nav-height)" }}>
                {children}
              </main>
              <Footer dict={dict} />
              <ScrollToTop />
            </CompareProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

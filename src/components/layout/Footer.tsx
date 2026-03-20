import Link from "next/link";
import type { Locale } from "@/i18n/config";
import styles from "./Footer.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Footer({ locale, dict }: { locale: Locale; dict: any }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="main-footer">
      <div className={`${styles.inner} container`}>
        {/* Top row: 3 columns */}
        <div className={styles.columns}>
          {/* Brand column */}
          <div className={styles.column}>
            <div className={styles.brand}>
              <span className={styles.logoIcon}>AV</span>
              <span className={styles.logoText}>AutoVista</span>
            </div>
            <p className={styles.brandDesc}>
              {locale === "tr"
                ? "Doğru arabayı güvenle bulmanın en akıllı yolu."
                : "The smartest way to find the right car with confidence."}
            </p>
            {/* Social */}
            <div className={styles.social}>
              {/* Twitter/X */}
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M13.232 11.232L20 4" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* GitHub */}
              <a href="https://github.com/Fastrree/AutoVista" className={styles.socialLink} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              {locale === "tr" ? "Keşfet" : "Explore"}
            </h4>
            <Link href={`/${locale}/kesfet`} className={styles.footerLink}>
              {locale === "tr" ? "Tüm Araçlar" : "All Vehicles"}
            </Link>
            <Link href={`/${locale}/kesfet?fuelTypes=electric`} className={styles.footerLink}>
              {locale === "tr" ? "Elektrikli Araçlar" : "Electric Vehicles"}
            </Link>
            <Link href={`/${locale}/kesfet?bodyTypes=suv`} className={styles.footerLink}>
              SUV & Crossover
            </Link>
            <Link href={`/${locale}/favoriler`} className={styles.footerLink}>
              {dict.nav.favorites}
            </Link>
            <Link href={`/${locale}/karsilastir`} className={styles.footerLink}>
              {dict.nav.compare}
            </Link>
          </div>

          {/* Legal column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              {locale === "tr" ? "Şirket" : "Company"}
            </h4>
            <a href="#" className={styles.footerLink}>{dict.footer.about}</a>
            <a href="#" className={styles.footerLink}>{dict.footer.contact}</a>
            <a href="#" className={styles.footerLink}>{dict.footer.privacy}</a>
            <a href="#" className={styles.footerLink}>{dict.footer.terms}</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} AutoVista. {dict.footer.rights}
          </p>
          <p className={styles.tech}>
            Built with Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

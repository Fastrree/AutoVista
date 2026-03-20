"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { useState, useEffect } from "react";
import styles from "./MainNav.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MainNav({ locale, dict }: { locale: Locale; dict: any }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which icon to show — only after mount to avoid hydration mismatch
  const showSun = mounted && theme === "dark";
  const showMoon = mounted && theme === "light";

  return (
    <nav className={`${styles.nav} glass`} id="main-nav">
      <div className={`${styles.inner} container`}>
        {/* Logo */}
        <Link href={`/${locale}`} className={styles.logo} id="nav-logo">
          <span className={styles.logoIcon}>AV</span>
          <span className={styles.logoText}>AutoVista</span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.links}>
          <Link href={`/${locale}`} className={`${styles.link} ${pathname === `/${locale}` ? styles.linkActive : ""}`} id="nav-home">
            {dict.nav.home}
          </Link>
          <Link href={`/${locale}/kesfet`} className={`${styles.link} ${pathname.includes("/kesfet") ? styles.linkActive : ""}`} id="nav-explore">
            {dict.nav.explore}
          </Link>
          <Link href={`/${locale}/favoriler`} className={`${styles.link} ${pathname.includes("/favoriler") ? styles.linkActive : ""}`} id="nav-favorites">
            {dict.nav.favorites}
          </Link>
          <Link href={`/${locale}/karsilastir`} className={`${styles.link} ${pathname.includes("/karsilastir") ? styles.linkActive : ""}`} id="nav-compare">
            {dict.nav.compare}
          </Link>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`btn-icon ${styles.actionBtn}`}
            id="theme-toggle"
            title={dict.nav.theme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            suppressHydrationWarning
          >
            {showSun && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" suppressHydrationWarning>
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            )}
            {showMoon && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" suppressHydrationWarning>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            {!mounted && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" suppressHydrationWarning>
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            )}
          </button>

          {/* Language Switcher */}
          <div className={styles.langWrapper}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`btn-icon ${styles.actionBtn}`}
              id="lang-switcher"
              aria-label={dict.nav.language}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" suppressHydrationWarning>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            {langDropdownOpen && (
              <div className={styles.langDropdown} id="lang-dropdown">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}`}
                    className={`${styles.langOption} ${loc === locale ? styles.langActive : ""}`}
                    onClick={() => setLangDropdownOpen(false)}
                    id={`lang-${loc}`}
                  >
                    {localeNames[loc]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`btn-icon ${styles.mobileToggle}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" suppressHydrationWarning>
              {mobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <Link href={`/${locale}`} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            {dict.nav.home}
          </Link>
          <Link href={`/${locale}/kesfet`} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            {dict.nav.explore}
          </Link>
          <Link href={`/${locale}/favoriler`} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            {dict.nav.favorites}
          </Link>
          <Link href={`/${locale}/karsilastir`} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            {dict.nav.compare}
          </Link>
        </div>
      )}
    </nav>
  );
}

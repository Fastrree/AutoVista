import styles from "./Footer.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Footer({ dict }: { dict: any }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="main-footer">
      <div className={`${styles.inner} container`}>
        <div className={styles.brand}>
          <span className={styles.logoIcon}>AV</span>
          <span className={styles.logoText}>AutoVista</span>
        </div>

        <div className={styles.links}>
          <a href="#" className={styles.link}>{dict.footer.about}</a>
          <a href="#" className={styles.link}>{dict.footer.contact}</a>
          <a href="#" className={styles.link}>{dict.footer.privacy}</a>
          <a href="#" className={styles.link}>{dict.footer.terms}</a>
        </div>

        <p className={styles.copy}>
          © {year} AutoVista. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}

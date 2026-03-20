import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <title>404 — AutoVista</title>
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
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', -apple-system, sans-serif",
          background: "var(--bg-primary, #0a0a0f)",
          color: "var(--text-primary, #f0f0f5)",
          padding: "2rem",
          textAlign: "center",
        }}>
          {/* Car SVG outline */}
          <svg width="200" height="100" viewBox="0 0 800 300" fill="none" style={{ opacity: 0.3, marginBottom: "2rem" }}>
            <path d="M120 200 C120 200 140 170 180 155 L280 130 C300 120 340 100 380 95 L520 90 C560 90 590 95 610 110 L660 140 C680 150 700 165 710 185 L720 200 Z" stroke="currentColor" strokeWidth="4" fill="none" />
            <circle cx="230" cy="210" r="28" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle cx="620" cy="210" r="28" stroke="currentColor" strokeWidth="3" fill="none" />
            {/* Flat tire */}
            <line x1="202" y1="238" x2="258" y2="238" stroke="currentColor" strokeWidth="3" />
            <text x="400" y="170" textAnchor="middle" fontSize="80" fontWeight="900" fill="currentColor" opacity="0.15">?</text>
          </svg>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, var(--text-primary, #f0f0f5) 0%, #00d4aa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "0.5rem",
          }}>
            404
          </h1>

          <p style={{
            fontSize: "1.25rem",
            color: "var(--text-secondary, #a0a0b8)",
            marginBottom: "0.5rem",
            fontWeight: 500,
          }}>
            Bu yol çıkmaz sokak gibi görünüyor.
          </p>

          <p style={{
            fontSize: "0.875rem",
            color: "var(--text-tertiary, #6b6b80)",
            marginBottom: "2rem",
            maxWidth: "400px",
          }}>
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/tr"
              style={{
                padding: "0.75rem 1.5rem",
                background: "#00d4aa",
                color: "#0a0a0f",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
            >
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/tr/kesfet"
              style={{
                padding: "0.75rem 1.5rem",
                background: "var(--bg-elevated, #1e1e30)",
                color: "var(--text-primary, #f0f0f5)",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: "1px solid var(--border, rgba(255,255,255,0.08))",
                textDecoration: "none",
              }}
            >
              Araç Keşfet
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

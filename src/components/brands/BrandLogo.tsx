// ─── Brand Logo SVGs ───
// Stylized/iconic SVG representations for each brand

import type { FC, SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & { size?: number };

const defaultSize = 40;

/* ── Mercedes-Benz ── */
const MercedesLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <line x1="50" y1="12" x2="50" y2="50" stroke="currentColor" strokeWidth="3" />
    <line x1="50" y1="50" x2="17" y2="78" stroke="currentColor" strokeWidth="3" />
    <line x1="50" y1="50" x2="83" y2="78" stroke="currentColor" strokeWidth="3" />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
  </svg>
);

/* ── BMW ── */
const BmwLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="4" />
    <line x1="50" y1="4" x2="50" y2="96" stroke="currentColor" strokeWidth="2" />
    <line x1="4" y1="50" x2="96" y2="50" stroke="currentColor" strokeWidth="2" />
    <path d="M50 4 A46 46 0 0 1 96 50 L50 50 Z" fill="currentColor" opacity="0.15" />
    <path d="M4 50 A46 46 0 0 1 50 96 L50 50 Z" fill="currentColor" opacity="0.15" />
    <text x="50" y="36" textAnchor="middle" fontSize="14" fontWeight="800" fill="currentColor" fontFamily="sans-serif">B M W</text>
  </svg>
);

/* ── Audi ── */
const AudiLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 140 60" fill="none" {...props}>
    <circle cx="25" cy="30" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="55" cy="30" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="85" cy="30" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
    <circle cx="115" cy="30" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
  </svg>
);

/* ── Ferrari ── */
const FerrariLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
    <rect x="10" y="5" width="80" height="90" rx="4" stroke="currentColor" strokeWidth="3" />
    <rect x="25" y="5" width="50" height="14" fill="#d4a017" opacity="0.8" rx="2" />
    <text x="50" y="60" textAnchor="middle" fontSize="36" fontWeight="900" fill="currentColor" fontFamily="serif">F</text>
    <rect x="25" y="82" width="50" height="13" fill="#22c55e" opacity="0.6" rx="2" />
  </svg>
);

/* ── Bugatti ── */
const BugattiLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
    <ellipse cx="50" cy="50" rx="46" ry="30" stroke="currentColor" strokeWidth="3" />
    <text x="50" y="58" textAnchor="middle" fontSize="28" fontWeight="900" fill="currentColor" fontFamily="serif">B</text>
    <line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

/* ── Ford ── */
const FordLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 120 60" fill="none" {...props}>
    <ellipse cx="60" cy="30" rx="56" ry="26" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.08" />
    <text x="60" y="40" textAnchor="middle" fontSize="28" fontWeight="700" fontStyle="italic" fill="currentColor" fontFamily="serif">Ford</text>
  </svg>
);

/* ── Aston Martin ── */
const AstonMartinLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 140 60" fill="none" {...props}>
    <path d="M70 10 L130 35 L120 42 L70 28 L20 42 L10 35 Z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
    <text x="70" y="54" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor" letterSpacing="3" fontFamily="sans-serif">ASTON MARTIN</text>
  </svg>
);

/* ── Bentley ── */
const BentleyLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 120 60" fill="none" {...props}>
    <circle cx="60" cy="30" r="14" stroke="currentColor" strokeWidth="2.5" />
    <text x="60" y="36" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor" fontFamily="serif">B</text>
    <path d="M46 30 L5 20 L5 24 L44 32" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M74 30 L115 20 L115 24 L76 32" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M46 30 L5 40 L5 36 L44 28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M74 30 L115 40 L115 36 L76 28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
  </svg>
);

/* ── Rolls-Royce ── */
const RollsRoyceLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
    <rect x="15" y="8" width="70" height="84" rx="3" stroke="currentColor" strokeWidth="2.5" />
    <text x="50" y="40" textAnchor="middle" fontSize="30" fontWeight="900" fill="currentColor" fontFamily="serif">R</text>
    <text x="50" y="72" textAnchor="middle" fontSize="30" fontWeight="900" fill="currentColor" fontFamily="serif">R</text>
    <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/* ── Tesla ── */
const TeslaLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
    <path d="M50 15 L50 90" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    <path d="M20 20 C20 20 35 28 50 15 C65 28 80 20 80 20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
    <circle cx="50" cy="10" r="4" fill="currentColor" />
  </svg>
);

/* ── BYD ── */
const BydLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 120 60" fill="none" {...props}>
    <ellipse cx="60" cy="30" rx="56" ry="26" stroke="currentColor" strokeWidth="3" />
    <text x="60" y="40" textAnchor="middle" fontSize="24" fontWeight="800" fill="currentColor" fontFamily="sans-serif">BYD</text>
  </svg>
);

/* ── Aurus ── */
const AurusLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
    <polygon points="50,8 92,50 50,92 8,50" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.05" />
    <text x="50" y="58" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="sans-serif">AURUS</text>
  </svg>
);

/* ── Jeep ── */
const JeepLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 120 60" fill="none" {...props}>
    {/* Grille shape */}
    <rect x="10" y="10" width="100" height="40" rx="8" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.05" />
    {[28, 42, 56, 70, 84].map((x) => (
      <line key={x} x1={x} y1="14" x2={x} y2="46" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    ))}
    <text x="60" y="38" textAnchor="middle" fontSize="20" fontWeight="800" fill="currentColor" fontFamily="sans-serif">JEEP</text>
  </svg>
);

/* ── Land Rover ── */
const LandRoverLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 140 60" fill="none" {...props}>
    <ellipse cx="70" cy="30" rx="66" ry="26" stroke="currentColor" strokeWidth="3" />
    <text x="70" y="26" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" letterSpacing="2" fontFamily="sans-serif">LAND</text>
    <text x="70" y="42" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" letterSpacing="2" fontFamily="sans-serif">ROVER</text>
  </svg>
);

/* ── Maserati ── */
const MaseratiLogo: FC<LogoProps> = ({ size = defaultSize, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
    <ellipse cx="50" cy="50" rx="40" ry="46" stroke="currentColor" strokeWidth="3" />
    {/* Trident */}
    <line x1="50" y1="20" x2="50" y2="70" stroke="currentColor" strokeWidth="3" />
    <line x1="36" y1="25" x2="36" y2="55" stroke="currentColor" strokeWidth="2.5" />
    <line x1="64" y1="25" x2="64" y2="55" stroke="currentColor" strokeWidth="2.5" />
    <path d="M36 25 C36 18 50 14 50 20" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M64 25 C64 18 50 14 50 20" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="36" cy="55" r="2.5" fill="currentColor" />
    <circle cx="50" cy="70" r="2.5" fill="currentColor" />
    <circle cx="64" cy="55" r="2.5" fill="currentColor" />
  </svg>
);

// ─── Logo Registry ───
const logos: Record<string, FC<LogoProps>> = {
  mercedes: MercedesLogo,
  bmw: BmwLogo,
  audi: AudiLogo,
  ferrari: FerrariLogo,
  bugatti: BugattiLogo,
  ford: FordLogo,
  astonmartin: AstonMartinLogo,
  bentley: BentleyLogo,
  rollsroyce: RollsRoyceLogo,
  tesla: TeslaLogo,
  byd: BydLogo,
  aurus: AurusLogo,
  jeep: JeepLogo,
  landrover: LandRoverLogo,
  maserati: MaseratiLogo,
};

interface BrandLogoProps extends LogoProps {
  brandId: string;
  fallback?: string;
}

export function BrandLogo({ brandId, fallback, size = defaultSize, ...props }: BrandLogoProps) {
  const LogoComponent = logos[brandId];
  if (LogoComponent) {
    return <LogoComponent size={size} {...props} />;
  }
  // Fallback: ilk harf
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" {...props}>
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" />
      <text x="50" y="60" textAnchor="middle" fontSize="36" fontWeight="800" fill="currentColor" fontFamily="sans-serif">
        {(fallback || brandId).charAt(0).toUpperCase()}
      </text>
    </svg>
  );
}

"use client";

export type IconName =
  | "today"
  | "court"
  | "gear"
  | "user"
  | "chart"
  | "grid"
  | "clock"
  | "check"
  | "plus"
  | "minus"
  | "arrowR"
  | "arrowL"
  | "close"
  | "bolt"
  | "card"
  | "euro"
  | "arrowUp"
  | "pin"
  | "logout"
  | "shield"
  | "trophy"
  | "star"
  | "users";

const paths: Record<IconName, React.ReactNode> = {
  today: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
      <circle cx="12" cy="14.5" r="2.2" />
    </>
  ),
  court: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 12h18M12 3v18" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  gear: (
    <>
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19.4 13a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V19a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 17.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 13a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 7 1.7 1.7 0 0 0 4.26 5.13l-.06-.06A2 2 0 1 1 7.03 2.24l.06.06A1.7 1.7 0 0 0 9 2.6h.06A1.7 1.7 0 0 0 10.09 1H10a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 7v.06A1.7 1.7 0 0 0 21 8.09H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 13Z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.6 3.6-6 8-6s8 2.4 8 6" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l3.5-4 3 2.5L20 7" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  arrowR: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowL: <path d="M19 12H5M11 18l-6-6 6-6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19" />
    </>
  ),
  euro: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5A4.5 4.5 0 0 0 8 12a4.5 4.5 0 0 0 7.5 3.5M6.5 11h6M6.5 13.2h5" />
    </>
  ),
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  logout: (
    <>
      <path d="M15 4h2.5A1.5 1.5 0 0 1 19 5.5v13a1.5 1.5 0 0 1-1.5 1.5H15" />
      <path d="M10 12h9M16 8l4 4-4 4" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3Z" />,
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 17h6M10 20h4M12 13v4" />
    </>
  ),
  star: <path d="M12 3l2.6 5.6 6 .7-4.4 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.4 9.3l6-.7L12 3Z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-2.8 2.7-5 6-5" />
      <circle cx="17" cy="9" r="2.6" />
      <path d="M14 20c0-2.2 1.8-4 4-4" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function Icon({ name, size = 20, stroke = 1.6, style, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}

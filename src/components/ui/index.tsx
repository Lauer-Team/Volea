import { Icon, type IconName } from "./Icon";

import Link from "next/link";

interface LogoProps {
  size?: number;
  mark?: boolean;
  href?: string;
}

export function Logo({ size = 22, mark = true, href }: LogoProps) {
  const inner = (
    <div className="row gap-2" style={{ alignItems: "center" }}>
      {mark && (
        <svg width={size * 1.15} height={size * 1.15} viewBox="0 0 40 40" aria-hidden>
          <circle cx="20" cy="20" r="18.5" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <path
            d="M20 7 L27 28 M20 7 L13 28"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="20" cy="31.5" r="1.8" fill="var(--accent)" />
        </svg>
      )}
      <span className="display" style={{ fontSize: size, letterSpacing: "0.16em", color: "var(--ink)" }}>
        VOLEA
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
        {inner}
      </Link>
    );
  }

  return inner;
}

type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  full?: boolean;
}

export function Button({
  children,
  variant = "solid",
  size = "md",
  icon,
  iconRight,
  full,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const sizes: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: "7px 12px", fontSize: 13 },
    md: { padding: "11px 18px", fontSize: 14.5 },
    lg: { padding: "14px 24px", fontSize: 16 },
  };
  const variants: Record<ButtonVariant, React.CSSProperties> = {
    solid: { background: "var(--accent)", color: "var(--accent-ink)", boxShadow: "var(--shadow-soft)" },
    outline: { background: "transparent", color: "var(--ink)", borderColor: "var(--line-strong)" },
    ghost: { background: "transparent", color: "var(--ink-2)" },
    soft: { background: "var(--surface-3)", color: "var(--ink)", borderColor: "var(--line)" },
    danger: {
      background: "transparent",
      color: "var(--busy)",
      borderColor: "color-mix(in oklab, var(--busy) 40%, transparent)",
    },
  };

  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: "var(--font-ui)",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        border: "1px solid transparent",
        borderRadius: "var(--radius-sm)",
        transition: "transform .12s, background .2s, border-color .2s, opacity .2s",
        width: full ? "100%" : "auto",
        opacity: disabled ? 0.5 : 1,
        whiteSpace: "nowrap",
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "translateY(1px)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "none")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
      {...props}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 15 : 17} />}
    </button>
  );
}

type BadgeTone = "neutral" | "free" | "busy" | "accent";

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  soft?: boolean;
  style?: React.CSSProperties;
}

export function Badge({ children, tone = "neutral", soft, style }: BadgeProps) {
  const tones: Record<BadgeTone, { c: string; b: string; bg: string }> = {
    neutral: { c: "var(--ink-2)", b: "var(--line-strong)", bg: soft ? "var(--surface-3)" : "transparent" },
    free: {
      c: "var(--free)",
      b: "color-mix(in oklab, var(--free) 40%, transparent)",
      bg: soft ? "var(--free-soft)" : "transparent",
    },
    busy: {
      c: "var(--busy)",
      b: "color-mix(in oklab, var(--busy) 40%, transparent)",
      bg: soft ? "var(--busy-soft)" : "transparent",
    },
    accent: {
      c: "var(--accent)",
      b: "color-mix(in oklab, var(--accent) 45%, transparent)",
      bg: soft ? "var(--soon-soft)" : "transparent",
    },
  };
  const tn = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: "0.03em",
        color: tn.c,
        border: `1px solid ${tn.b}`,
        background: tn.bg,
        padding: "3px 9px",
        borderRadius: 999,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

interface AvatarProps {
  initials: string;
  size?: number;
}

export function Avatar({ initials, size = 38 }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(145deg, var(--surface-3), var(--surface-2))",
        border: "1px solid var(--line-strong)",
        color: "var(--accent)",
        fontFamily: "var(--font-display)",
        fontSize: size * 0.4,
        letterSpacing: "0.04em",
      }}
    >
      {initials}
    </div>
  );
}

interface CourtDiagramProps {
  w?: number;
  single?: boolean;
  accent?: boolean;
  fill?: string;
}

export function CourtDiagram({ w = 120, single = false, accent = false, fill }: CourtDiagramProps) {
  const h = w * 0.5;
  const line = accent ? "var(--accent)" : "var(--line-strong)";
  const glass = fill || (accent ? "color-mix(in oklab, var(--accent) 12%, transparent)" : "var(--surface-3)");
  return (
    <svg width={w} height={h} viewBox="0 0 200 100" style={{ display: "block" }}>
      <rect x="4" y="4" width="192" height="92" rx="4" fill={glass} stroke={line} strokeWidth="2.4" />
      <line x1="100" y1="4" x2="100" y2="96" stroke={line} strokeWidth="2.4" />
      <line x1="46" y1="4" x2="46" y2="96" stroke={line} strokeWidth="1.4" opacity="0.7" />
      <line x1="154" y1="4" x2="154" y2="96" stroke={line} strokeWidth="1.4" opacity="0.7" />
      <line x1="46" y1="50" x2="154" y2="50" stroke={line} strokeWidth="1.4" opacity="0.7" />
      {!single && <circle cx="100" cy="50" r="2.6" fill={line} />}
    </svg>
  );
}

interface SegmentedOption {
  value: string;
  label: string;
  icon?: IconName;
}

interface SegmentedProps {
  options: SegmentedOption[];
  value: string;
  onChange: (v: string) => void;
  size?: "sm" | "md";
}

export function Segmented({ options, value, onChange, size = "md" }: SegmentedProps) {
  return (
    <div
      className="row"
      style={{
        background: "var(--surface-3)",
        border: "1px solid var(--line)",
        borderRadius: 999,
        padding: 3,
        gap: 2,
      }}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: "none",
              cursor: "pointer",
              padding: size === "sm" ? "6px 12px" : "8px 16px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: size === "sm" ? 12.5 : 13.5,
              fontFamily: "var(--font-ui)",
              background: active ? "var(--accent)" : "transparent",
              color: active ? "var(--accent-ink)" : "var(--ink-2)",
              boxShadow: active ? "var(--shadow-soft)" : "none",
              transition: "all .18s",
            }}
          >
            {o.icon && <Icon name={o.icon} size={15} />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

interface StatProps {
  icon: IconName;
  label: string;
  value: string | number;
  sub?: string;
  tone?: string;
}

export function Stat({ icon, label, value, sub, tone }: StatProps) {
  return (
    <div className="card" style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="eyebrow" style={{ fontSize: 10 }}>
          {label}
        </span>
        <Icon name={icon} size={16} style={{ color: tone || "var(--accent)" }} />
      </div>
      <div className="row gap-2" style={{ alignItems: "baseline" }}>
        <span className="display" style={{ fontSize: 30, lineHeight: 1 }}>
          {value}
        </span>
        {sub && <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{sub}</span>}
      </div>
    </div>
  );
}

export function Legend({ c, label }: { c: string; label: string }) {
  return (
    <span className="row gap-2">
      <span style={{ width: 11, height: 11, borderRadius: 3, background: c, opacity: 0.85 }} />
      {label}
    </span>
  );
}

export function Stepper({ icon, onClick }: { icon: "plus" | "minus"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        background: "var(--surface)",
        color: "var(--ink)",
        display: "grid",
        placeItems: "center",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <Icon name={icon} size={15} />
    </button>
  );
}

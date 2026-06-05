export function addMin(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + 90;
  const nh = Math.floor(total / 60) % 24;
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

export const ACCENTS = {
  brass: { accent: "#c8a24c", ink: "#1a1812" },
  clay: { accent: "#c2603a", ink: "#fbf5ef" },
  green: { accent: "#5e8c61", ink: "#0f1a10" },
  slate: { accent: "#5b7fa6", ink: "#0c1420" },
} as const;

export const FONTS = {
  classic: {
    display: "'Marcellus', Georgia, serif",
    ui: "'Hanken Grotesk', system-ui, sans-serif",
  },
  editorial: {
    display: "'Cormorant Garamond', Georgia, serif",
    ui: "'Hanken Grotesk', system-ui, sans-serif",
  },
  modern: {
    display: "'Hanken Grotesk', system-ui, sans-serif",
    ui: "'Hanken Grotesk', system-ui, sans-serif",
  },
} as const;

export const DENSITY = {
  compact: "20px",
  regular: "30px",
  comfy: "44px",
} as const;

import type { CSSProperties } from "react";

export const iconBtnStyle: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 10,
  border: "1px solid var(--line)",
  background: "var(--surface-2)",
  color: "var(--ink-2)",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
};

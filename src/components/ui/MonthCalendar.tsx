"use client";

import { useMemo } from "react";
import type { Lang } from "@/lib/types";

interface MonthCalendarProps {
  selected: Date;
  onSelect: (d: Date) => void;
  compact?: boolean;
  lang: Lang;
}

const WEEKDAYS = {
  de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
};

const MONTHS = {
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function MonthCalendar({ selected, onSelect, compact, lang }: MonthCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const viewMonth = selected.getMonth();
  const viewYear = selected.getFullYear();

  const days = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const cells: (Date | null)[] = Array(startOffset).fill(null);
    const count = new Date(viewYear, viewMonth + 1, 0).getDate();
    for (let d = 1; d <= count; d++) cells.push(new Date(viewYear, viewMonth, d));
    return cells;
  }, [viewMonth, viewYear]);

  const weekdays = WEEKDAYS[lang];
  const months = MONTHS[lang];

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => onSelect(selected)}
        className="row gap-2"
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid var(--line-strong)",
          background: "var(--surface-2)",
          cursor: "pointer",
          fontFamily: "var(--font-ui)",
          fontWeight: 600,
          fontSize: 14,
          color: "var(--ink)",
        }}
      >
        <span style={{ color: "var(--accent)" }}>
          {selected.toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </span>
        <span className="muted" style={{ fontSize: 12 }}>
          {months[viewMonth]} {viewYear}
        </span>
      </button>
    );
  }

  return (
    <div
      className="card"
      style={{
        padding: "10px 12px 12px",
        background: "var(--surface-2)",
        maxWidth: 260,
        width: "100%",
      }}
    >
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
        <span className="display" style={{ fontSize: 14 }}>
          {months[viewMonth]} {viewYear}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 2,
          marginBottom: 4,
        }}
      >
        {weekdays.map((w) => (
          <div key={w} className="mono" style={{ textAlign: "center", fontSize: 9, color: "var(--ink-faint)", fontWeight: 600 }}>
            {w}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {days.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const isToday = sameDay(d, today);
          const isSelected = sameDay(d, selected);
          const isPast = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(d)}
              className="mono"
              style={{
                height: 26,
                borderRadius: 6,
                border: isSelected ? "1px solid var(--accent)" : isToday ? "1px solid var(--line-strong)" : "1px solid transparent",
                background: isSelected ? "var(--soon-soft)" : "transparent",
                color: isPast ? "var(--ink-faint)" : isSelected ? "var(--accent)" : "var(--ink)",
                cursor: isPast ? "default" : "pointer",
                fontWeight: isSelected || isToday ? 700 : 500,
                fontSize: 11,
                opacity: isPast ? 0.45 : 1,
                transition: "background .15s, border-color .15s",
                padding: 0,
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

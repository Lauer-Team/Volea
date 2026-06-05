"use client";

import { COURTS, GRID, HOURS, TYPE_LABEL } from "@/lib/data";
import type { TFunction } from "@/lib/i18n";
import type { Court, Lang, SlotCell } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";

interface OccupancyGridProps {
  t: TFunction;
  lang: Lang;
  manage?: boolean;
  filterFree?: boolean;
  onCell?: (court: Court, slotIndex: number, cell: SlotCell) => void;
}

export function OccupancyGrid({ t, lang, manage, filterFree, onCell }: OccupancyGridProps) {
  const cellLabel = { free: t("free"), booked: t("booked"), mine: t("mine") };

  return (
    <div style={{ overflowX: "auto", paddingBottom: 4 }}>
      <div style={{ minWidth: 760 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `132px repeat(${HOURS.length}, 1fr)`,
            gap: 6,
            marginBottom: 6,
          }}
        >
          <div />
          {HOURS.map((h) => (
            <div key={h} className="mono" style={{ textAlign: "center", fontSize: 12, color: "var(--ink-3)", fontWeight: 500 }}>
              {h}
            </div>
          ))}
        </div>
        <div className="col" style={{ gap: 6 }}>
          {COURTS.map((c) => (
            <div
              key={c.id}
              style={{
                display: "grid",
                gridTemplateColumns: `132px repeat(${HOURS.length}, 1fr)`,
                gap: 6,
              }}
            >
              <div className="row gap-2" style={{ minWidth: 0 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    background: "var(--surface-3)",
                    border: "1px solid var(--line)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <span className="display" style={{ fontSize: 13, color: "var(--accent)" }}>
                    {c.id}
                  </span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
                    {TYPE_LABEL[c.type][lang]} · {c.mode}
                  </div>
                </div>
              </div>
              {GRID[c.id].map((s, i) => {
                const dim = filterFree && s.state !== "free";
                const clickable = s.state === "free" || !!manage;
                const colors = {
                  free: {
                    bg: "var(--free-soft)",
                    bd: "color-mix(in oklab, var(--free) 34%, transparent)",
                    c: "var(--free)",
                  },
                  booked: {
                    bg: "var(--busy-soft)",
                    bd: "color-mix(in oklab, var(--busy) 30%, transparent)",
                    c: "var(--busy)",
                  },
                  mine: {
                    bg: "var(--soon-soft)",
                    bd: "color-mix(in oklab, var(--accent) 50%, transparent)",
                    c: "var(--accent)",
                  },
                }[s.state];
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={!clickable}
                    onClick={() => clickable && onCell?.(c, i, s)}
                    title={`${c.name} · ${HOURS[i]} · ${cellLabel[s.state]}`}
                    style={{
                      height: 34,
                      borderRadius: 8,
                      cursor: clickable ? "pointer" : "default",
                      background: colors.bg,
                      border: `1px solid ${colors.bd}`,
                      opacity: dim ? 0.28 : 1,
                      display: "grid",
                      placeItems: "center",
                      transition: "transform .1s, box-shadow .2s, opacity .2s",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (clickable) {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "var(--shadow-soft)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {s.state === "free" ? (
                      <Icon name="plus" size={14} style={{ color: colors.c, opacity: 0.8 }} />
                    ) : (
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: colors.c,
                          padding: "0 4px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                        }}
                      >
                        {manage ? s.who : s.state === "mine" ? t("mine") : ""}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

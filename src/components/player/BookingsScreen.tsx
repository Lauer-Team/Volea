"use client";

import { courtById } from "@/lib/data";
import type { TFunction } from "@/lib/i18n";
import type { Booking } from "@/lib/types";
import { Badge, Button, CourtDiagram } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

interface BookingsScreenProps {
  t: TFunction;
  bookings: Booking[];
  onCancel: (id: string) => void;
  onEdit: (id: string) => void;
}

export function BookingsScreen({ t, bookings, onCancel, onEdit }: BookingsScreenProps) {
  return (
    <div className="view-in col gap-6" style={{ padding: "var(--page-pad)" }}>
      <div className="row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            {t("bookings")}
          </div>
          <h1 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: 0 }}>
            {t("myBookings")}
          </h1>
        </div>
        <Badge soft tone="accent">
          {bookings.length} {t("bookings")}
        </Badge>
      </div>

      {bookings.length === 0 ? (
        <div className="card" style={{ padding: 40, textAlign: "center" }}>
          <Icon name="today" size={32} style={{ color: "var(--ink-faint)", marginBottom: 12 }} />
          <p className="muted" style={{ margin: 0, fontSize: 15 }}>
            {t("noBookings")}
          </p>
        </div>
      ) : (
        <div className="col gap-3">
          {bookings.map((b) => {
            const c = courtById(b.court);
            return (
              <div key={b.id} className="card" style={{ padding: 18, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ width: 88, flexShrink: 0 }}>
                  <CourtDiagram w={88} accent single={c.mode === "Einzel"} />
                </div>
                <div className="grow" style={{ minWidth: 180 }}>
                  <div className="row gap-2" style={{ marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 17 }}>{c.name}</span>
                    <Badge tone="free" soft>
                      <Icon name="check" size={11} />
                      {b.status}
                    </Badge>
                  </div>
                  <div className="row gap-4 muted" style={{ fontSize: 13, flexWrap: "wrap" }}>
                    <span className="row gap-1">
                      <Icon name="today" size={14} />
                      {b.date}
                    </span>
                    <span className="row gap-1">
                      <Icon name="clock" size={14} />
                      {b.time}
                    </span>
                    <span className="row gap-1">
                      <Icon name="user" size={14} />
                      {b.players} {t("players")}
                    </span>
                  </div>
                  {b.gear.length > 0 && (
                    <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>
                      + {b.gear.join(" · ")}
                    </div>
                  )}
                </div>
                <div className="col gap-2" style={{ alignItems: "flex-end" }}>
                  <div className="display" style={{ fontSize: 24 }}>
                    {b.price} €
                  </div>
                  <div className="row gap-2">
                    <Button size="sm" variant="ghost" onClick={() => onEdit(b.id)}>
                      {t("editBooking")}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        if (window.confirm(t("confirmCancel"))) onCancel(b.id);
                      }}
                    >
                      {t("cancelBooking")}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

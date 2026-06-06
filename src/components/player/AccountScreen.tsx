"use client";

import { courtById } from "@/lib/data";
import type { TFunction } from "@/lib/i18n";
import type { AccentKey, Booking, DensityKey, FontKey, Lang, SharedBooking, Theme, UserProfile } from "@/lib/types";
import { AppearanceSettings } from "@/components/SettingsPanel";
import { Avatar, Badge, CourtDiagram, Stat } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

interface AccountScreenProps {
  t: TFunction;
  profile: UserProfile;
  bookings: Booking[];
  sharedBookings: SharedBooking[];
  onConfirmShare: (id: string) => void;
  theme: Theme;
  accent: AccentKey;
  font: FontKey;
  density: DensityKey;
  lang: Lang;
  onTheme: (v: Theme) => void;
  onAccent: (v: AccentKey) => void;
  onFont: (v: FontKey) => void;
  onDensity: (v: DensityKey) => void;
  onLang: (v: Lang) => void;
}

export function AccountScreen({
  t,
  profile,
  bookings,
  sharedBookings,
  onConfirmShare,
  theme,
  accent,
  font,
  density,
  lang,
  onTheme,
  onAccent,
  onFont,
  onDensity,
  onLang,
}: AccountScreenProps) {
  const me = profile;
  const quotaLeft = me.monthlyQuota - me.monthlyUsed;
  const pendingShares = sharedBookings.filter((sb) => {
    const mePart = sb.participants.find((p) => p.friendId === "me");
    return mePart?.status === "pending" && sb.status === "awaiting";
  });

  return (
    <div className="view-in col gap-6" style={{ padding: "var(--page-pad)" }}>
      <div
        className="card"
        style={{
          padding: 26,
          display: "flex",
          gap: 22,
          alignItems: "center",
          flexWrap: "wrap",
          background: "linear-gradient(120deg, var(--surface), color-mix(in oklab, var(--accent) 7%, var(--surface)))",
        }}
      >
        <Avatar initials={me.initials} size={76} />
        <div className="grow" style={{ minWidth: 200 }}>
          <div className="row gap-2" style={{ marginBottom: 4 }}>
            <h1 className="display" style={{ fontSize: 30, margin: 0 }}>
              {me.name}
            </h1>
            <Badge tone="accent" soft>
              <Icon name="star" size={12} />
              {me.member}
            </Badge>
          </div>
          <p className="muted" style={{ margin: 0, fontSize: 14 }}>
            {t("since")} {me.since} · {t("level")} {me.level}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>
            {t("credit")}
          </div>
          <div className="display" style={{ fontSize: 34, color: "var(--accent)" }}>
            {me.credit} €
          </div>
        </div>
      </div>

      {pendingShares.length > 0 && (
        <div>
          <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
            <h2 className="display" style={{ fontSize: 22, margin: 0 }}>
              {t("pendingConfirmations")}
            </h2>
            <Badge tone="accent" soft>
              {pendingShares.length}
            </Badge>
          </div>
          <div className="col gap-3">
            {pendingShares.map((sb) => {
              const c = courtById(sb.court);
              const myPart = sb.participants.find((p) => p.friendId === "me")!;
              return (
                <div
                  key={sb.id}
                  className="card"
                  style={{
                    padding: 16,
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    flexWrap: "wrap",
                    background: "color-mix(in oklab, var(--accent) 6%, var(--surface))",
                    border: "1px solid color-mix(in oklab, var(--accent) 25%, var(--line))",
                  }}
                >
                  <div style={{ width: 84, flexShrink: 0 }}>
                    <CourtDiagram w={84} accent single={c.mode === "Einzel"} />
                  </div>
                  <div className="grow" style={{ minWidth: 160 }}>
                    <div className="row gap-2" style={{ marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 16 }}>{c.name}</span>
                      <Badge tone="accent" soft>
                        {t("sharedBooking")}
                      </Badge>
                    </div>
                    <div className="row gap-4 muted" style={{ fontSize: 13, flexWrap: "wrap" }}>
                      <span className="row gap-1">
                        <Icon name="today" size={14} />
                        {sb.date}
                      </span>
                      <span className="row gap-1">
                        <Icon name="clock" size={14} />
                        {sb.time}
                      </span>
                    </div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
                      {t("invitedBy")} {sb.organizerName}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="display" style={{ fontSize: 22, color: "var(--accent)" }}>
                      {myPart.share} €
                    </div>
                    <div className="muted" style={{ fontSize: 11, marginBottom: 8 }}>
                      {t("yourShare")}
                    </div>
                    <button
                      type="button"
                      onClick={() => onConfirmShare(sb.id)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 9,
                        border: "none",
                        background: "var(--accent)",
                        color: "var(--accent-ink)",
                        cursor: "pointer",
                        fontFamily: "var(--font-ui)",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {t("confirmShare")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
          <h2 className="display" style={{ fontSize: 22, margin: 0 }}>
            {t("upcoming")}
          </h2>
          <Badge soft tone="accent">
            {bookings.length} {t("bookings")}
          </Badge>
        </div>
        <div className="col gap-3">
          {bookings.map((b) => {
            const c = courtById(b.court);
            return (
              <div key={b.id} className="card" style={{ padding: 16, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ width: 84, flexShrink: 0 }}>
                  <CourtDiagram w={84} accent single={c.mode === "Einzel"} />
                </div>
                <div className="grow" style={{ minWidth: 160 }}>
                  <div className="row gap-2" style={{ marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>{c.name}</span>
                    <Badge tone={b.shared ? "accent" : "free"} soft>
                      <Icon name={b.shared ? "users" : "check"} size={11} />
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
                  {b.sharedWith && b.sharedWith.length > 0 && (
                    <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
                      <Icon name="users" size={12} style={{ marginRight: 4, verticalAlign: -1 }} />
                      {b.sharedWith.join(", ")}
                    </div>
                  )}
                  {b.gear.length > 0 && (
                    <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
                      + {b.gear.join(" · ")}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="display" style={{ fontSize: 22 }}>
                    {b.price} €
                  </div>
                  <button
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--ink-faint)",
                      cursor: "pointer",
                      fontSize: 12.5,
                      fontFamily: "var(--font-ui)",
                      marginTop: 4,
                    }}
                  >
                    {t("manage")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 14 }}>
        <Stat icon="star" label={t("monthlyQuota")} value={`${me.monthlyUsed}/${me.monthlyQuota}`} sub={`${quotaLeft} ${t("quotaRemaining")}`} />
        <Stat icon="clock" label="Stunden gespielt" value="51" />
        <Stat icon="trophy" label="Sessions 2026" value="34" />
        <Stat icon="star" label="Lieblingsplatz" value="Center" />
      </div>

      <AppearanceSettings
        theme={theme}
        accent={accent}
        font={font}
        density={density}
        lang={lang}
        onTheme={onTheme}
        onAccent={onAccent}
        onFont={onFont}
        onDensity={onDensity}
        onLang={onLang}
        t={t}
      />
    </div>
  );
}

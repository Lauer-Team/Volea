"use client";

import { courtById } from "@/lib/data";
import type { TFunction } from "@/lib/i18n";
import type { AccentKey, Booking, DensityKey, FontKey, Lang, Theme, UserProfile } from "@/lib/types";
import { AppearanceSettings } from "@/components/SettingsPanel";
import { Avatar, Badge, CourtDiagram, Stat } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

interface AccountScreenProps {
  t: TFunction;
  profile: UserProfile;
  bookings: Booking[];
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

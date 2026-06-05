"use client";

import { useCallback, useMemo, useState } from "react";
import { AuthScreen } from "@/components/auth/AuthScreen";
import { AdminBookings, AdminCourts, AdminOverview } from "@/components/admin/AdminScreens";
import { BookingSheet } from "@/components/booking/BookingSheet";
import { AccountScreen } from "@/components/player/AccountScreen";
import { EquipmentScreen } from "@/components/player/EquipmentScreen";
import { PlayerHome } from "@/components/player/PlayerHome";
import { SettingsPanel } from "@/components/SettingsPanel";
import { Avatar, Logo, Segmented } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import { ME } from "@/lib/data";
import { makeT } from "@/lib/i18n";
import type {
  AccentKey,
  AdminView,
  AppView,
  BookingSheetState,
  Cart,
  Court,
  DensityKey,
  FontKey,
  Lang,
  PlayerView,
  Role,
  Theme,
} from "@/lib/types";
import { ACCENTS, DENSITY, FONTS } from "@/lib/utils";

export function VoleaApp() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accent, setAccent] = useState<AccentKey>("brass");
  const [font, setFont] = useState<FontKey>("classic");
  const [density, setDensity] = useState<DensityKey>("regular");
  const [lang, setLang] = useState<Lang>("de");

  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState<Role>("player");
  const [view, setView] = useState<AppView>("home");
  const [cart, setCart] = useState<Cart>({});
  const [sheet, setSheet] = useState<BookingSheetState>({ open: false, court: null, slot: 0 });

  const t = useMemo(() => makeT(lang), [lang]);

  const rootStyle = useMemo(() => {
    const acc = ACCENTS[accent];
    const fnt = FONTS[font];
    return {
      "--accent": acc.accent,
      "--accent-ink": acc.ink,
      "--font-display": fnt.display,
      "--font-ui": fnt.ui,
      "--page-pad": `clamp(18px, 3.4vw, ${DENSITY[density]})`,
      minHeight: "100%",
    } as React.CSSProperties;
  }, [accent, font, density]);

  const addGear = useCallback((id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }, []);

  const removeGear = useCallback((id: string) => {
    setCart((c) => {
      const n = { ...c };
      n[id] = (n[id] || 0) - 1;
      if (n[id] <= 0) delete n[id];
      return n;
    });
  }, []);

  const openBooking = useCallback((court: Court, slot: number) => {
    setSheet({ open: true, court, slot });
  }, []);

  const switchRole = useCallback((r: Role) => {
    setRole(r);
    setView(r === "player" ? "home" : "overview");
  }, []);

  if (!authed) {
    return (
      <div data-theme={theme} style={rootStyle}>
        <AuthScreen t={t} onAuth={() => setAuthed(true)} />
        <SettingsPanel
          theme={theme}
          accent={accent}
          font={font}
          density={density}
          lang={lang}
          onTheme={setTheme}
          onAccent={setAccent}
          onFont={setFont}
          onDensity={setDensity}
          onLang={setLang}
          t={t}
        />
      </div>
    );
  }

  const playerNav: { id: PlayerView; label: string; icon: IconName }[] = [
    { id: "home", label: t("courts"), icon: "today" },
    { id: "equipment", label: t("equipment"), icon: "gear" },
    { id: "account", label: t("account"), icon: "user" },
  ];

  const adminNav: { id: AdminView; label: string; icon: IconName }[] = [
    { id: "overview", label: t("overview"), icon: "chart" },
    { id: "bookings", label: t("bookings"), icon: "today" },
    { id: "courts", label: t("courts"), icon: "grid" },
  ];

  const nav = role === "player" ? playerNav : adminNav;

  let screen: React.ReactNode = null;
  if (role === "player") {
    if (view === "home")
      screen = <PlayerHome t={t} lang={lang} openBooking={openBooking} goEquip={() => setView("equipment")} />;
    else if (view === "equipment")
      screen = (
        <EquipmentScreen t={t} lang={lang} cart={cart} addGear={addGear} removeGear={removeGear} goCheckout={() => setView("home")} />
      );
    else if (view === "account") screen = <AccountScreen t={t} />;
  } else {
    if (view === "overview") screen = <AdminOverview t={t} />;
    else if (view === "bookings") screen = <AdminBookings t={t} lang={lang} />;
    else if (view === "courts") screen = <AdminCourts t={t} lang={lang} />;
  }

  return (
    <div className="app-bg" data-theme={theme} style={rootStyle}>
      <div className="shell">
        <aside className="sidebar">
          <div style={{ padding: "22px 20px 18px" }}>
            <Logo size={21} />
          </div>
          <div style={{ padding: "0 16px 16px" }}>
            <Segmented
              value={role}
              onChange={(v) => switchRole(v as Role)}
              size="sm"
              options={[
                { value: "player", label: t("player"), icon: "user" },
                { value: "admin", label: t("admin"), icon: "shield" },
              ]}
            />
          </div>
          <nav className="col gap-1" style={{ padding: "6px 12px", flex: 1 }}>
            {nav.map((n) => (
              <NavItem key={n.id} n={n} active={view === n.id} onClick={() => setView(n.id)} />
            ))}
          </nav>
          {role === "player" && (
            <div style={{ padding: "12px 16px" }}>
              <div className="card" style={{ padding: 14, background: "var(--surface-2)" }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>
                  {t("credit")}
                </div>
                <div className="display" style={{ fontSize: 24, color: "var(--accent)" }}>
                  {ME.credit} €
                </div>
              </div>
            </div>
          )}
          <div className="row" style={{ gap: 10, padding: "14px 18px", borderTop: "1px solid var(--line)" }}>
            <Avatar initials={ME.initials} size={36} />
            <div className="grow" style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {ME.name}
              </div>
              <div className="muted" style={{ fontSize: 11.5 }}>
                {role === "admin" ? "Club-Manager" : ME.member}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAuthed(false)}
              title={t("logout")}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                border: "1px solid var(--line)",
                background: "var(--surface-2)",
                color: "var(--ink-2)",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="logout" size={16} />
            </button>
          </div>
        </aside>

        <div className="content">
          <header className="topbar">
            <Logo size={18} />
            <div className="grow" />
            <Segmented
              value={role}
              onChange={(v) => switchRole(v as Role)}
              size="sm"
              options={[
                { value: "player", label: t("player") },
                { value: "admin", label: t("admin") },
              ]}
            />
          </header>

          <main className="main" key={role + view}>
            {screen}
          </main>

          <nav className="bottom-nav">
            {nav.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setView(n.id)}
                className="bn-item"
                style={{ color: view === n.id ? "var(--accent)" : "var(--ink-3)" }}
              >
                <Icon name={n.icon} size={21} />
                <span style={{ fontSize: 10.5, fontWeight: 600 }}>{n.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <BookingSheet
        t={t}
        lang={lang}
        open={sheet.open}
        court={sheet.court}
        slotIndex={sheet.slot}
        cart={cart}
        addGear={addGear}
        removeGear={removeGear}
        onClose={() => setSheet({ ...sheet, open: false })}
      />

      <SettingsPanel
        theme={theme}
        accent={accent}
        font={font}
        density={density}
        lang={lang}
        onTheme={setTheme}
        onAccent={setAccent}
        onFont={setFont}
        onDensity={setDensity}
        onLang={setLang}
        t={t}
      />
    </div>
  );
}

function NavItem({
  n,
  active,
  onClick,
}: {
  n: { id: string; label: string; icon: IconName };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="row gap-3"
      style={{
        width: "100%",
        padding: "11px 14px",
        borderRadius: 11,
        cursor: "pointer",
        textAlign: "left",
        border: "none",
        fontFamily: "var(--font-ui)",
        fontWeight: 600,
        fontSize: 14.5,
        transition: "all .16s",
        background: active ? "var(--surface-3)" : "transparent",
        color: active ? "var(--ink)" : "var(--ink-3)",
      }}
    >
      <Icon name={n.icon} size={19} style={{ color: active ? "var(--accent)" : "var(--ink-3)" }} />
      {n.label}
      {active && (
        <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
      )}
    </button>
  );
}

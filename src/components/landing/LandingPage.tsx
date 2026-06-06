"use client";

import Link from "next/link";
import { Logo, Button } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

export function LandingPage() {
  return (
    <div className="app-bg" data-theme="dark" style={{ minHeight: "100vh" }}>
      <header
        className="row"
        style={{
          justifyContent: "space-between",
          padding: "20px var(--page-pad)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <Logo size={20} href="/" />
        <Link href="/app/" style={{ textDecoration: "none" }}>
          <Button variant="outline" size="sm" iconRight="arrowR">
            Anmelden
          </Button>
        </Link>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(32px, 8vh, 80px) var(--page-pad)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Padel Club · München
            </div>
            <h1 className="display" style={{ fontSize: "clamp(36px, 6vw, 56px)", margin: "0 0 20px", lineHeight: 1.05 }}>
              Zehn Plätze.
              <br />
              Ein Clubhaus.
              <br />
              <span style={{ color: "var(--accent)" }}>Dein Spiel.</span>
            </h1>
            <p style={{ color: "var(--ink-2)", fontSize: 17, lineHeight: 1.65, maxWidth: 420, margin: "0 0 32px" }}>
              Reserviere Panorama-Courts, leih dir Premium-Schläger und sieh in Echtzeit, was frei ist — alles an einem Ort.
            </p>
            <div className="row gap-3" style={{ flexWrap: "wrap" }}>
              <Link href="/app/" style={{ textDecoration: "none" }}>
                <Button size="lg" iconRight="arrowR">
                  Jetzt buchen
                </Button>
              </Link>
              <Link href="/app/" style={{ textDecoration: "none" }}>
                <Button variant="outline" size="lg">
                  Mitglied werden
                </Button>
              </Link>
            </div>
          </div>

          <div
            className="card"
            style={{
              padding: 28,
              background: "linear-gradient(145deg, var(--surface), color-mix(in oklab, var(--accent) 10%, var(--surface)))",
            }}
          >
            <div className="col gap-4">
              {[
                { icon: "today" as const, title: "Live-Auslastung", text: "Sieh auf einen Blick, welche Courts frei sind." },
                { icon: "gear" as const, title: "Ausrüstung leihen", text: "Schläger, Bälle und Schuhe direkt zur Buchung." },
                { icon: "star" as const, title: "Premium-Erlebnis", text: "Panorama-Plätze, Club-Guthaben, nahtlose Buchung." },
              ].map((item) => (
                <div key={item.title} className="row gap-3" style={{ alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "var(--surface-3)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={item.icon} size={18} style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                    <p className="muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="row gap-6"
          style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--line)", flexWrap: "wrap", color: "var(--ink-3)", fontSize: 13 }}
        >
          <span className="row gap-2">
            <Icon name="pin" size={15} style={{ color: "var(--accent)" }} />
            Lindenhof · München
          </span>
          <span className="row gap-2">
            <Icon name="clock" size={15} style={{ color: "var(--accent)" }} />
            08–22 Uhr
          </span>
          <span className="row gap-2">
            <Icon name="court" size={15} style={{ color: "var(--accent)" }} />
            10 Courts · Indoor & Outdoor
          </span>
        </div>
      </main>
    </div>
  );
}

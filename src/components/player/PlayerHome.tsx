"use client";

import { useState } from "react";
import { courtById, occStats } from "@/lib/data";
import type { TFunction } from "@/lib/i18n";
import type { Court } from "@/lib/types";
import { Button, Legend, Segmented, Stat } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import { OccupancyGrid } from "@/components/OccupancyGrid";
import { ME } from "@/lib/data";

interface PlayerHomeProps {
  t: TFunction;
  lang: "de" | "en";
  openBooking: (court: Court, slot: number) => void;
  goEquip: () => void;
}

export function PlayerHome({ t, lang, openBooking, goEquip }: PlayerHomeProps) {
  const [filterFree, setFilterFree] = useState(false);
  const st = occStats();

  return (
    <div className="view-in col gap-6" style={{ padding: "var(--page-pad)" }}>
      <div className="row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "flex-end" }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            {t("greeting")}, {ME.name.split(" ")[0]}
          </div>
          <h1 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: 0 }}>
            {t("availability")}
          </h1>
        </div>
        <Segmented
          value={filterFree ? "free" : "all"}
          onChange={(v) => setFilterFree(v === "free")}
          options={[
            { value: "all", label: t("filterAll") },
            { value: "free", label: t("filterFree"), icon: "check" },
          ]}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
        <Stat icon="court" label={t("courtsBusy")} value={`${st.booked}/${st.total}`} sub={`${st.pct}%`} />
        <Stat icon="check" label={t("openSlots")} value={st.free} tone="var(--free)" />
        <Stat icon="clock" label={t("nextFree")} value="08:00" sub={courtById(3).name} tone="var(--free)" />
        <Stat icon="bolt" label={t("peakAt")} value="20:00" sub="92%" tone="var(--busy)" />
      </div>

      <div className="card" style={{ padding: "20px 20px 22px" }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div className="row gap-2">
            <Icon name="today" size={18} style={{ color: "var(--accent)" }} />
            <span style={{ fontWeight: 600, fontSize: 15 }}>{t("today")} · Do 5. Juni</span>
          </div>
          <div className="row gap-4" style={{ fontSize: 12, color: "var(--ink-3)" }}>
            <Legend c="var(--free)" label={t("free")} />
            <Legend c="var(--busy)" label={t("booked")} />
            <Legend c="var(--accent)" label={t("mine")} />
          </div>
        </div>
        <OccupancyGrid t={t} lang={lang} filterFree={filterFree} onCell={(c, i) => openBooking(c, i)} />
        <p className="muted" style={{ fontSize: 12.5, marginTop: 14, marginBottom: 0 }}>
          {t("selectSlot")} — {t("duration")} · 90 Min Blocks.
        </p>
      </div>

      <div
        className="card"
        style={{
          padding: 22,
          display: "flex",
          gap: 20,
          alignItems: "center",
          flexWrap: "wrap",
          background: "linear-gradient(120deg, var(--surface), color-mix(in oklab, var(--accent) 8%, var(--surface)))",
        }}
      >
        <div className="grow" style={{ minWidth: 240 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            {t("equipment")}
          </div>
          <h3 className="display" style={{ fontSize: 22, margin: "0 0 6px" }}>
            Premium-Schläger ab 8 €
          </h3>
          <p className="muted" style={{ margin: 0, fontSize: 14 }}>
            Head, Bullpadel & Nox — frisch bespannt, direkt am Court.
          </p>
        </div>
        <Button variant="outline" iconRight="arrowR" onClick={goEquip}>
          {t("rent")}
        </Button>
      </div>
    </div>
  );
}

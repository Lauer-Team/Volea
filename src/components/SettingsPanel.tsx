"use client";

import { useState } from "react";
import type { AccentKey, DensityKey, FontKey, Lang, Theme } from "@/lib/types";
import { ACCENTS } from "@/lib/utils";
import type { TFunction } from "@/lib/i18n";

interface SettingsPanelProps {
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
  t: TFunction;
}

export function SettingsPanel({
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
  t,
}: SettingsPanelProps) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={t("settings")}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 50,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid var(--line-strong)",
          background: "var(--surface)",
          color: "var(--accent)",
          cursor: "pointer",
          boxShadow: "var(--shadow-soft)",
          display: "grid",
          placeItems: "center",
          fontSize: 18,
        }}
      >
        ⚙
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 50,
        width: 280,
        background: "var(--surface)",
        border: "1px solid var(--line-strong)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        padding: 16,
      }}
    >
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
        <span className="eyebrow">{t("settings")}</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-3)", fontSize: 18 }}
        >
          ×
        </button>
      </div>

      <SettingGroup label={t("theme")}>
        <RadioRow
          value={theme}
          options={[
            { value: "dark", label: "Night" },
            { value: "light", label: "Day" },
          ]}
          onChange={(v) => onTheme(v as Theme)}
        />
      </SettingGroup>

      <SettingGroup label={t("accent")}>
        <div className="row gap-2" style={{ flexWrap: "wrap" }}>
          {(Object.keys(ACCENTS) as AccentKey[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => onAccent(k)}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: accent === k ? "2px solid var(--ink)" : "2px solid transparent",
                background: ACCENTS[k].accent,
                cursor: "pointer",
              }}
              title={k}
            />
          ))}
        </div>
      </SettingGroup>

      <SettingGroup label={t("font")}>
        <RadioRow
          value={font}
          options={[
            { value: "classic", label: "Classic" },
            { value: "editorial", label: "Editorial" },
            { value: "modern", label: "Modern" },
          ]}
          onChange={(v) => onFont(v as FontKey)}
        />
      </SettingGroup>

      <SettingGroup label={t("density")}>
        <RadioRow
          value={density}
          options={[
            { value: "compact", label: lang === "de" ? "Kompakt" : "Compact" },
            { value: "regular", label: lang === "de" ? "Normal" : "Regular" },
            { value: "comfy", label: lang === "de" ? "Weit" : "Comfy" },
          ]}
          onChange={(v) => onDensity(v as DensityKey)}
        />
      </SettingGroup>

      <SettingGroup label={t("language")}>
        <RadioRow
          value={lang}
          options={[
            { value: "de", label: "Deutsch" },
            { value: "en", label: "English" },
          ]}
          onChange={(v) => onLang(v as Lang)}
        />
      </SettingGroup>
    </div>
  );
}

function SettingGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function RadioRow({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="row gap-1" style={{ flexWrap: "wrap" }}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          style={{
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid var(--line-strong)",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "var(--font-ui)",
            background: value === o.value ? "var(--accent)" : "transparent",
            color: value === o.value ? "var(--accent-ink)" : "var(--ink-2)",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

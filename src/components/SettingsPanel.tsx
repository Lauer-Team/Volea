"use client";

import type { AccentKey, DensityKey, FontKey, Lang, Theme } from "@/lib/types";
import { ACCENTS } from "@/lib/utils";
import type { TFunction } from "@/lib/i18n";

export interface AppearanceSettingsProps {
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

/** Inline appearance settings — shown inside Account screen */
export function AppearanceSettings({
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
}: AppearanceSettingsProps) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <h2 className="display" style={{ fontSize: 22, margin: "0 0 18px" }}>
        {t("settings")}
      </h2>

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

      <SettingGroup label={t("language")} last>
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

function SettingGroup({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ marginBottom: last ? 0 : 14 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-2)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>
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

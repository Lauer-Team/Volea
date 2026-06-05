"use client";

import { useState } from "react";
import { CAT_LABEL, cartCount, cartTotal, EQUIPMENT } from "@/lib/data";
import type { TFunction } from "@/lib/i18n";
import type { Cart, EquipmentCategory, Lang } from "@/lib/types";
import { Badge, Button, Stepper } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

const gearIcon: Record<EquipmentCategory, IconName> = {
  racket: "trophy",
  ball: "court",
  shoe: "user",
  extra: "star",
};

interface EquipmentScreenProps {
  t: TFunction;
  lang: Lang;
  cart: Cart;
  addGear: (id: string) => void;
  removeGear: (id: string) => void;
  goCheckout: () => void;
}

export function EquipmentScreen({ t, lang, cart, addGear, removeGear, goCheckout }: EquipmentScreenProps) {
  const [cat, setCat] = useState<"all" | EquipmentCategory>("all");
  const cats: ("all" | EquipmentCategory)[] = ["all", "racket", "ball", "shoe", "extra"];
  const items = EQUIPMENT.filter((e) => cat === "all" || e.cat === cat);
  const count = cartCount(cart);
  const total = cartTotal(cart);

  return (
    <div className="view-in col gap-6" style={{ padding: "var(--page-pad)" }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          {t("equipment")}
        </div>
        <h1 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: 0 }}>
          {t("rentEquipment")}
        </h1>
        <p className="muted" style={{ margin: "8px 0 0", fontSize: 14.5 }}>
          {t("gearOptional")} — alles frisch gepflegt und am Court bereitgelegt.
        </p>
      </div>

      <div className="row gap-2" style={{ flexWrap: "wrap" }}>
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            style={{
              border: "1px solid var(--line-strong)",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 13.5,
              fontFamily: "var(--font-ui)",
              transition: "all .18s",
              background: cat === c ? "var(--accent)" : "transparent",
              color: cat === c ? "var(--accent-ink)" : "var(--ink-2)",
              borderColor: cat === c ? "var(--accent)" : "var(--line-strong)",
            }}
          >
            {c === "all" ? t("filterAll") : CAT_LABEL[c][lang]}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))", gap: 16 }}>
        {items.map((e) => {
          const q = cart[e.id] || 0;
          return (
            <div key={e.id} className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: "var(--surface-3)",
                    border: "1px solid var(--line)",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--accent)",
                  }}
                >
                  <Icon name={gearIcon[e.cat]} size={24} />
                </div>
                <Badge tone={e.stock < 6 ? "busy" : "free"} soft>
                  {e.stock < 6 ? t("lowStock") : t("availableNow")}
                </Badge>
              </div>
              <div className="grow">
                <div style={{ fontWeight: 600, fontSize: 16 }}>{e.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-faint)", letterSpacing: "0.04em", marginTop: 2, marginBottom: 8 }}>
                  {e.tag.toUpperCase()}
                </div>
                <p className="muted" style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
                  {e.blurb}
                </p>
              </div>
              <div className="row" style={{ justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                <div className="row gap-1" style={{ alignItems: "baseline" }}>
                  <span className="display" style={{ fontSize: 22 }}>
                    {e.price}&nbsp;€
                  </span>
                  <span style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{t("perItem")}</span>
                </div>
                {q === 0 ? (
                  <Button size="sm" variant="soft" icon="plus" onClick={() => addGear(e.id)}>
                    {t("addToBooking")}
                  </Button>
                ) : (
                  <div className="row gap-2" style={{ background: "var(--surface-3)", borderRadius: 999, padding: 3, border: "1px solid var(--line)" }}>
                    <Stepper icon="minus" onClick={() => removeGear(e.id)} />
                    <span className="mono" style={{ minWidth: 18, textAlign: "center", fontWeight: 600 }}>
                      {q}
                    </span>
                    <Stepper icon="plus" onClick={() => addGear(e.id)} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {count > 0 && (
        <div style={{ position: "sticky", bottom: 16, zIndex: 5 }}>
          <div
            className="card"
            style={{
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              boxShadow: "var(--shadow)",
              borderColor: "var(--line-strong)",
            }}
          >
            <div className="row gap-2">
              <Icon name="check" size={18} style={{ color: "var(--accent)" }} />
              <span style={{ fontWeight: 600 }}>
                {count} {t("addedGear")}
              </span>
            </div>
            <span className="grow muted" style={{ fontSize: 14 }}>
              {t("total")} · <strong style={{ color: "var(--ink)" }}>{total} €</strong>
            </span>
            <Button iconRight="arrowR" onClick={goCheckout}>
              {t("checkout")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

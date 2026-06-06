"use client";

import { useMemo, useState } from "react";
import type { TFunction } from "@/lib/i18n";
import type { Friend } from "@/lib/types";
import { Avatar, Badge } from "@/components/ui";
import { Icon } from "@/components/ui/Icon";

interface FriendsScreenProps {
  t: TFunction;
  friends: Friend[];
}

export function FriendsScreen({ t, friends }: FriendsScreenProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return friends;
    return friends.filter((f) => f.name.toLowerCase().includes(q) || f.level.toLowerCase().includes(q));
  }, [friends, query]);

  return (
    <div className="view-in col gap-6" style={{ padding: "var(--page-pad)" }}>
      <div>
        <h1 className="display" style={{ fontSize: 28, margin: "0 0 6px" }}>
          {t("clubFriends")}
        </h1>
        <p className="muted" style={{ margin: 0, fontSize: 14.5, maxWidth: 520, lineHeight: 1.6 }}>
          {t("friendsHint")}
        </p>
      </div>

      <div className="row gap-3" style={{ flexWrap: "wrap" }}>
        <div
          className="row gap-2 grow"
          style={{
            minWidth: 200,
            padding: "10px 14px",
            borderRadius: 11,
            border: "1px solid var(--line-strong)",
            background: "var(--surface-2)",
          }}
        >
          <Icon name="user" size={16} style={{ color: "var(--ink-faint)", flexShrink: 0 }} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchFriends")}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              outline: "none",
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              color: "var(--ink)",
            }}
          />
        </div>
        <Badge soft tone="accent">
          {friends.length} {t("friends")}
        </Badge>
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ padding: 32, textAlign: "center", background: "var(--surface-2)" }}>
          <Icon name="users" size={32} style={{ color: "var(--ink-faint)", marginBottom: 12 }} />
          <p className="muted" style={{ margin: 0 }}>
            {t("noFriends")}
          </p>
        </div>
      ) : (
        <div className="col gap-2">
          {filtered.map((f) => (
            <div
              key={f.id}
              className="card row gap-3"
              style={{ padding: "14px 16px", alignItems: "center", background: "var(--surface-2)" }}
            >
              <Avatar initials={f.initials} size={44} />
              <div className="grow" style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{f.name}</div>
                <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>
                  {f.level}
                </div>
              </div>
              <Badge soft>
                <Icon name="check" size={11} />
                {t("friends")}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

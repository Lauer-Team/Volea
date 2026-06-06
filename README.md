# VOLEA — Padel Club Buchungs-App

WebApp für eine Padel-Anlage mit 10 Plätzen. Spieler können Plätze buchen, Ausrüstung leihen und die Live-Auslastung sehen. Admins verwalten Buchungen, Plätze und sehen Umsatz-Statistiken.

**Live:** [volea.lauer.team](https://volea.lauer.team) · **Version:** 0.2.0

## Features

- **Spieler:** Live-Auslastung, Platz buchen (90-Min-Slots), Ausrüstung leihen, Konto & Buchungen
- **Admin:** Übersicht mit Charts, Buchungen verwalten, Platz-Inventar
- **Design:** Dark/Light Theme, 4 Akzentfarben, DE/EN, responsive (Sidebar + Mobile Tab-Bar)
- **Landingpage:** Öffentliche Startseite unter `/`, App unter `/app/`
- **Backend:** Supabase (Auth, DB) mit Fallback auf lokale Demo-Daten

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- React 19 + TypeScript
- [Supabase](https://supabase.com/) (Auth, Postgres, RLS)
- Tailwind CSS 4 + CSS Custom Properties (Design Tokens)

## Lokaler Start

```bash
npm install
cp .env.local.example .env.local   # Supabase-Keys eintragen (optional)
npm run dev
```

Dann im Browser: [http://localhost:3000](http://localhost:3000)

Ohne `.env.local` läuft die App im Demo-Modus (Mock-Daten, Login ohne echtes Backend).

## Deployment

GitHub Actions baut bei Push auf `main` und veröffentlicht auf GitHub Pages.

Benötigte Repository-Secrets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Projektstruktur

```
src/
  app/              # Next.js App Router (/, /app/)
  components/       # UI-Komponenten & Screens
  lib/              # Daten, i18n, Types, Supabase-Client
supabase/
  migrations/       # Datenbank-Schema
```

## Changelog

Siehe [CHANGELOG.md](./CHANGELOG.md).

## Roadmap

- [ ] Stripe Zahlung
- [ ] Realtime-Auslastung über Supabase
- [ ] Buchungs-Flow vollständig an Backend anbinden

## Design

Basierend auf der VOLEA Design-Vorlage (Clubhouse Night/Day, Brass-Akzent, Marcellus + Hanken Grotesk).

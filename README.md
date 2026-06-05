# VOLEA — Padel Club Buchungs-App

WebApp für eine Padel-Anlage mit 10 Plätzen. Spieler können Plätze buchen, Ausrüstung leihen und die Live-Auslastung sehen. Admins verwalten Buchungen, Plätze und sehen Umsatz-Statistiken.

## Features

- **Spieler:** Live-Auslastung, Platz buchen (90-Min-Slots), Ausrüstung leihen, Konto & Buchungen
- **Admin:** Übersicht mit Charts, Buchungen verwalten, Platz-Inventar
- **Design:** Dark/Light Theme, 4 Akzentfarben, DE/EN, responsive (Sidebar + Mobile Tab-Bar)
- **Demo-Daten:** Mock-Daten lokal — Supabase-Backend folgt in Schritt 2

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19 + TypeScript
- Tailwind CSS 4 + CSS Custom Properties (Design Tokens aus der Vorlage)

## Lokaler Start

```bash
npm install
npm run dev
```

Dann im Browser: [http://localhost:3000](http://localhost:3000)

**Demo-Login:** Beliebige E-Mail/Passwort eingeben und „Anmelden" klicken — Auth ist noch Mock.

## Projektstruktur

```
src/
  app/           # Next.js App Router
  components/    # UI-Komponenten & Screens
  lib/           # Mock-Daten, i18n, Types, Utils
```

## Roadmap

- [ ] Supabase Backend (Auth, DB, Realtime)
- [ ] GitHub Pages Deployment (static export)
- [ ] Stripe Zahlung

## Design

Basierend auf der VOLEA Design-Vorlage (Clubhouse Night/Day, Brass-Akzent, Marcellus + Hanken Grotesk).

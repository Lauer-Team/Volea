import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VOLEA Padel Club",
  description: "Padel-Plätze buchen, Ausrüstung leihen, Live-Auslastung — VOLEA Padel Club München",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="dark">
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

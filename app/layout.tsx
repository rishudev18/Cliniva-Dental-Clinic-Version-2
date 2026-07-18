import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Public_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Placeholder metadata — the full SEO layer (unique titles, descriptions,
// openGraph, canonical) is built in Step 11 per SPEC §9.
export const metadata: Metadata = {
  title: "Clivia Dental Clinic",
  description: "Dental clinic in DLF Phase 2, Gurugram.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${newsreader.variable} ${publicSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-porcelain font-body text-scrub antialiased">
        <SkipLink />
        <Header />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}

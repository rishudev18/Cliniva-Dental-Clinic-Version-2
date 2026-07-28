import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SkipLink } from "@/components/layout/SkipLink";
import { seo } from "@/content/seo";
import { dentistJsonLd, siteUrl } from "@/lib/jsonld";
import "./globals.css";

// §5.2 revision (2026-07-28) — Plus Jakarta Sans replaces Newsreader and
// Public Sans both, one variable font serving the display and body roles
// that used to be two separate faces (see the `fontFamily` comment in
// tailwind.config.ts for how `font-display`/`font-body` both resolve here
// without touching every call site). Weight 700 is loaded even though no
// current usage needs it above 600 — kept for headroom, since the client
// specified the full 400/500/600/700 set.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Sitewide defaults (§9.2) — every route overrides title/description with
// its own metadata export; this is the fallback plus the shared fields
// (metadataBase, openGraph.locale, twitter card) every route inherits.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.home.title,
  description: seo.home.description,
  openGraph: {
    siteName: "Clivia Dental Clinic",
    locale: "en_IN",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

// GA4 — only rendered once a real measurement ID is supplied; §11 permits
// no third-party scripts other than GA4, and there is no ID yet (§13-style
// TODO, not a client input the spec explicitly lists but the same category
// of "not blocking, wire it up so it activates the moment it's provided").
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${plusJakartaSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-porcelain font-body text-scrub antialiased">
        <JsonLd data={dentistJsonLd()} />
        <SkipLink />
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}

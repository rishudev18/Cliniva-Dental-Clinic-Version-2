import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { IBM_Plex_Mono, Newsreader, Public_Sans } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { SkipLink } from "@/components/layout/SkipLink";
import { seo } from "@/content/seo";
import { dentistJsonLd, siteUrl } from "@/lib/jsonld";
import "./globals.css";

// Weight 500 only — every `font-display` usage across the site (h1/h2 base
// styles, DoctorCard, Header/Footer/MobileNav clinic name) is `font-medium`;
// weight 400 was never actually rendered anywhere (§11 "preloaded subset").
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["500"],
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
      className={`${newsreader.variable} ${publicSans.variable} ${ibmPlexMono.variable}`}
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

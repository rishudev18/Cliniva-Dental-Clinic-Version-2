import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";

// Route-group layout for every standard page (all routes except /book,
// which needs the minimal-header/slim-footer variant per SPEC §7.7).
// Full Header + Footer + StickyMobileCta live here instead of the root
// layout so /book can render a different chrome without a client-side
// pathname check (which would need "use client" on Header — hard rule 1
// only permits that on the 4 named components, and Header isn't one).

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <Footer />
      <StickyMobileCta />
    </>
  );
}

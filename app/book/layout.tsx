import Link from "next/link";
import { Phone } from "lucide-react";
import { clinic } from "@/content/clinic";
import { Container } from "@/components/ui/Container";

// /book gets its own minimal chrome (SPEC §7.7: "Focused page, no
// distractions... Minimal header (logo + phone only), no footer nav — just
// a slim footer") instead of the standard Header/Footer/StickyMobileCta
// used everywhere else — see app/(site)/layout.tsx for those.

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b bg-enamel">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-medium text-scrub">
              {clinic.name.split(" ")[0]}
            </span>
            <span className="hidden text-sm text-graphite sm:inline">
              {clinic.name.split(" ").slice(1).join(" ")}
            </span>
          </Link>
          <a
            href={`tel:${clinic.phone}`}
            className="flex items-center gap-2 rounded-pill px-3 py-2 text-sm font-medium text-scrub transition duration-200 ease-clinic hover:text-clinic"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {clinic.phoneDisplay}
          </a>
        </Container>
      </header>

      <div id="main-content" tabIndex={-1}>
        {children}
      </div>

      <footer className="border-t bg-porcelain py-8">
        <Container className="flex flex-col items-center gap-1 text-center text-sm text-graphite">
          <p>
            © {new Date().getFullYear()} {clinic.name}
          </p>
          <p>
            {clinic.address.line1}, {clinic.address.locality}, {clinic.address.city}
          </p>
        </Container>
      </footer>
    </>
  );
}

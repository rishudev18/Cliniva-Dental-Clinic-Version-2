import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { clinic } from "@/content/clinic";
import { primaryServices } from "@/content/services";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

// Server Component. Sticky enamel header; the 1px bottom border fades in
// after 8px of scroll via a CSS scroll-driven animation (.header-border in
// globals.css) — no JS, per hard rule 1. Services dropdown opens on hover
// and keyboard focus via group-hover / group-focus-within.

export function Header() {
  return (
    <header className="header-border sticky top-0 z-40 bg-enamel">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-medium text-scrub">
            {clinic.name.split(" ")[0]}
          </span>
          <span className="hidden text-sm text-graphite sm:inline">
            {clinic.name.split(" ").slice(1).join(" ")}
          </span>
        </Link>

        {/* Desktop nav — §3.2 (nav revision): Home · About · Services (dropdown) · Smile Gallery · Contact.
            Link padding is px-3, not the site's usual px-4 — with Public Sans this row had 0.91px of
            slack at exactly 768px; Plus Jakarta Sans (§5.2 revision) is wider and turned that into real
            18px overflow. px-3 was the smallest change that restored margin at 768px. */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <Link
            href="/"
            className="rounded-pill px-3 py-2 font-medium text-scrub transition duration-200 ease-clinic hover:text-clinic"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="rounded-pill px-3 py-2 font-medium text-scrub transition duration-200 ease-clinic hover:text-clinic"
          >
            About
          </Link>
          <div className="group relative">
            <Link
              href="/services"
              className="flex items-center gap-1 rounded-pill px-3 py-2 font-medium text-scrub transition duration-200 ease-clinic hover:text-clinic"
            >
              Services
              <ChevronDown
                className="h-4 w-4 transition duration-200 ease-clinic group-hover:rotate-180 group-focus-within:rotate-180"
                aria-hidden="true"
              />
            </Link>
            <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition duration-200 ease-clinic group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <ul className="rounded-card border bg-enamel py-2 shadow-lift">
                {primaryServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block px-5 py-2.5 text-sm text-scrub transition duration-200 ease-clinic hover:text-clinic"
                    >
                      {service.shortName}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t pt-1">
                  <Link
                    href="/services"
                    className="block px-5 py-2.5 text-sm font-medium text-clinic"
                  >
                    View all treatments
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {[
            { href: "/smile-gallery", label: "Smile Gallery" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-pill px-3 py-2 font-medium text-scrub transition duration-200 ease-clinic hover:text-clinic"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/book" size="sm" className="ml-3">
            Book appointment
          </Button>
        </nav>

        {/* Mobile: phone icon + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <a
            href={`tel:${clinic.phone}`}
            aria-label={`Call the clinic on ${clinic.phoneDisplay}`}
            className="flex h-11 w-11 items-center justify-center rounded-pill text-scrub"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

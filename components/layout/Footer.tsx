import Link from "next/link";
import { clinic } from "@/content/clinic";
import { primaryServices } from "@/content/services";
import { Container } from "@/components/ui/Container";

// Server Component. 4 columns per §3.2, stacking to 1 on mobile.
// Scrub background (§5.1); locality appears in the address on every page (§9.5).

export function Footer() {
  const year = new Date().getFullYear();
  const address = clinic.address;

  return (
    <footer className="bg-scrub text-porcelain">
      <Container className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* 1 — Clinic */}
        <div>
          <p className="font-display text-2xl font-medium text-enamel">{clinic.name}</p>
          <p className="mt-3 max-w-[38ch] text-sm text-porcelain/80">{clinic.positioning}</p>
          <address className="mt-4 text-sm not-italic text-porcelain/80">
            {address.line1}, {address.line2}
            <br />
            {address.city}, {address.state} {address.pincode}
          </address>
          <a
            href={clinic.mapsUrl}
            target="_blank"
            rel="noopener"
            className="mt-3 inline-block text-sm font-medium text-enamel underline underline-offset-4"
          >
            Get directions
          </a>
        </div>

        {/* 2 — Treatments */}
        <nav aria-label="Treatments">
          <p className="font-mono text-eyebrow uppercase text-porcelain/60">Treatments</p>
          <ul className="mt-4 space-y-2.5">
            {primaryServices.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-porcelain/80 transition duration-200 ease-clinic hover:text-enamel"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3 — Clinic pages */}
        <nav aria-label="Clinic">
          <p className="font-mono text-eyebrow uppercase text-porcelain/60">Clinic</p>
          <ul className="mt-4 space-y-2.5">
            {[
              { href: "/about", label: "About" },
              { href: "/pricing", label: "Pricing" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy", label: "Privacy" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-porcelain/80 transition duration-200 ease-clinic hover:text-enamel"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 4 — Hours and contact */}
        <div>
          <p className="font-mono text-eyebrow uppercase text-porcelain/60">Hours</p>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {clinic.hours.map((row) => (
                <tr key={row.days}>
                  <td className="py-1 pr-4 text-porcelain/80">{row.days}</td>
                  <td className="py-1 text-right font-mono text-porcelain">
                    {row.open} – {row.close}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`tel:${clinic.phone}`}
                className="font-mono text-porcelain transition duration-200 ease-clinic hover:text-enamel"
              >
                {clinic.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener"
                className="text-porcelain/80 transition duration-200 ease-clinic hover:text-enamel"
              >
                WhatsApp us
              </a>
            </li>
            <li>
              <a
                href={`mailto:${clinic.email}`}
                className="text-porcelain/80 transition duration-200 ease-clinic hover:text-enamel"
              >
                {clinic.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-enamel/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-porcelain/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {clinic.name}
          </p>
          <p>
            Website by{" "}
            <a
              href="https://rishukumar.dev"
              rel="nofollow noopener"
              target="_blank"
              className="text-porcelain/80 underline underline-offset-4 hover:text-enamel"
            >
              Rishu Kumar
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}

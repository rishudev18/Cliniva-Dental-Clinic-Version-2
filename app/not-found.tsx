import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { clinic } from "@/content/clinic";
import { notFound } from "@/content/notFound";
import { seo } from "@/content/seo";

// Root not-found.tsx (SPEC §3.1/§15, P1). Renders under app/layout.tsx
// only — nested route-group chrome (app/(site)/layout.tsx's Header/Footer)
// is a sibling branch, not an ancestor, so it never wraps this page. Given
// that, this page carries its own minimal, self-contained chrome rather
// than assuming Header/Footer are present, the same reasoning app/book
// used for its own minimal layout.

export const metadata: Metadata = {
  title: seo.notFound.title,
  description: seo.notFound.description,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <Container className="flex items-center justify-between py-5">
          <Link href="/" className="font-display text-xl font-medium text-scrub">
            {clinic.name}
          </Link>
          <a
            href={`tel:${clinic.phone}`}
            className="flex items-center gap-2 font-mono text-sm text-scrub transition duration-200 ease-clinic hover:text-clinic"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {clinic.phoneDisplay}
          </a>
        </Container>
      </header>

      <main className="flex flex-1 items-center py-16">
        <Container className="max-w-xl text-center">
          <p className="font-mono text-eyebrow uppercase text-graphite">404</p>
          <h1 className="mt-4 text-scrub">{notFound.heading}</h1>
          <p className="mt-3 text-body-l text-graphite">{notFound.body}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/">Back to home</Button>
            {notFound.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-clinic underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </main>

      <footer className="border-t py-6">
        <Container className="text-center text-sm text-graphite">
          © {new Date().getFullYear()} {clinic.name} · {clinic.address.line1},{" "}
          {clinic.address.line2}, {clinic.address.city}
        </Container>
      </footer>
    </div>
  );
}

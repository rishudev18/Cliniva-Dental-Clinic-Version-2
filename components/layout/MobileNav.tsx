"use client";

// One of the four permitted client components (§2.1).
// Full-screen overlay menu: body scroll lock, closes on route change and
// Esc, traps focus while open, returns focus to the trigger on close (§10).

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { clinic } from "@/content/clinic";
import { primaryServices } from "@/content/services";

const mainLinks = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-pill text-scrub md:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 overflow-y-auto bg-enamel md:hidden"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <span className="font-display text-2xl font-medium text-scrub">
              {clinic.name}
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-pill text-scrub"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="px-5 pb-12 pt-4" aria-label="Mobile">
            <ul className="space-y-1">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 font-display text-3xl font-medium text-scrub"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-eyebrow uppercase text-graphite">
              Treatments
            </p>
            <ul className="mt-3 space-y-1">
              {primaryServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block py-2 text-body-l text-scrub"
                  >
                    {service.shortName}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-3">
              <Link
                href="/book"
                className="flex min-h-[48px] items-center justify-center rounded-pill bg-clinic px-8 py-3.5 text-body-l font-medium text-enamel"
              >
                Book appointment
              </Link>
              <a
                href={`tel:${clinic.phone}`}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-pill border border-scrub px-8 py-3.5 text-body-l font-medium text-scrub"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call the clinic
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

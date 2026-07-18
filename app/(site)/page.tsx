import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Receipt,
  ScanLine,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { CostClarityTable } from "@/components/blocks/CostClarityTable";
import { CtaBand } from "@/components/blocks/CtaBand";
import { DoctorCard } from "@/components/blocks/DoctorCard";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";
import { MapEmbed } from "@/components/blocks/MapEmbed";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { TestimonialCard } from "@/components/blocks/TestimonialCard";
import { TrustBar } from "@/components/blocks/TrustBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { clinic } from "@/content/clinic";
import { cta } from "@/content/cta";
import { doctors } from "@/content/doctors";
import { faqs } from "@/content/faqs";
import { home } from "@/content/home";
import { pricing } from "@/content/pricing";
import { seo } from "@/content/seo";
import { primaryServices } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { faqPageJsonLd } from "@/lib/jsonld";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: seo.home.title,
  description: seo.home.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.home.title,
    description: seo.home.description,
    url: "/",
    images: ["/opengraph-image"],
  },
};

const homeFaqs = faqs.slice(0, 6);

// Home page (SPEC §7.1) — all 11 sections in order (section 2, About us
// teaser, added post-launch). Every heading and card grid picks up the
// CSS-only §5.4 scroll-reveal (via SectionHeading, or a `.reveal` class on
// the grid wrapper directly).

const differentiatorIcons: Record<string, LucideIcon> = {
  ShieldCheck,
  ScanLine,
  Receipt,
  UserCheck,
};

// The "View all treatments →" / "See full price list →" / "More about our
// doctors →" pattern (§7.1) — same arrow-link treatment as ServiceCard.
function SectionLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-sm font-medium text-clinic underline-offset-4 transition duration-200 ease-clinic hover:text-scrub hover:underline"
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 ease-clinic group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

export default function Home() {
  const address = clinic.address;

  return (
    <main>
      {/* 1 — Hero. LCP element; fades in once on load, nothing else animates. */}
      <section className="hero-fade py-16 md:py-24">
        <Container className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12">
          <div className="md:w-3/5">
            <p className="font-mono text-eyebrow uppercase text-graphite">
              {address.locality} · Since {clinic.established}
            </p>
            <h1 className="mt-4 text-scrub">{home.hero.headline}</h1>
            <p className="mt-5 max-w-[54ch] text-body-l text-graphite">{home.hero.lead}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book" size="lg">
                Book appointment
              </Button>
              <Button href={whatsappUrl()} variant="secondary" size="lg" newTab>
                WhatsApp us
              </Button>
            </div>

            <p className="mt-8 font-mono text-sm text-graphite">
              {[
                `${clinic.googleRating.value}★ (${clinic.googleRating.count}+ Google reviews)`,
                ...home.hero.microTrust,
              ].join(" · ")}
            </p>
          </div>

          <div className="md:w-2/5">
            <div className="flex aspect-[4/5] max-h-[280px] w-full flex-col items-center justify-center gap-2 rounded-card bg-gradient-to-br from-rinse to-enamel md:max-h-none">
              <span className="font-mono text-eyebrow uppercase text-scrub">
                Clinic interior — photo to come
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — TrustBar. Reordered ahead of the About us teaser per
          client request — spec order was Hero → About us → TrustBar;
          this build is Hero → TrustBar → About us. bg-enamel since the
          hero above is porcelain (default). */}
      <section className="bg-enamel py-12">
        <Container>
          <TrustBar />
        </Container>
      </section>

      {/* 3 — About us (teaser), added post-launch (§7.1 sec 2). Mirrors the
          hero's layout pattern (text ~60% / photo ~40%, photo below text
          on mobile, same 280px mobile height cap) but built entirely from
          existing primitives — no new component, per spec. Porcelain
          (default) since section 2 above is now enamel — every background
          below was re-checked top to bottom after this reorder (§14 "no
          two identical adjacent bands"). */}
      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12">
          <div className="md:w-3/5">
            <SectionHeading
              eyebrow="About us"
              title={`Specialist dental care in ${address.locality}`}
              lead={home.aboutTeaser.body}
            />
            <p className="mt-6 font-mono text-sm text-graphite">
              {[`Est. ${clinic.established}`, ...home.aboutTeaser.quickFacts].join(" · ")}
            </p>
            <div className="mt-6">
              <SectionLink href="/about">Learn more about us</SectionLink>
            </div>
          </div>

          <div className="md:w-2/5">
            <div className="flex aspect-[4/5] max-h-[280px] w-full flex-col items-center justify-center gap-2 rounded-card bg-gradient-to-br from-rinse to-enamel md:max-h-none">
              <span className="font-mono text-eyebrow uppercase text-scrub">
                About us — photo to come
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 — Services */}
      <section className="bg-enamel py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Treatments" title="Popular treatments" />
          <div className="reveal mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {primaryServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-8">
            <SectionLink href="/services">View all treatments</SectionLink>
          </div>
        </Container>
      </section>

      {/* 5 — Why this clinic */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Why this clinic" title="What to expect here" />
          <div className="reveal mt-10 grid gap-8 md:grid-cols-2">
            {home.differentiators.map((item) => {
              const Icon = differentiatorIcons[item.icon] ?? ShieldCheck;
              return (
                <div key={item.title} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-pill bg-rinse">
                    <Icon className="h-6 w-6 text-scrub" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-scrub">{item.title}</h3>
                    <p className="mt-2 text-graphite">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 6 — Cost Clarity (condensed) */}
      <section className="bg-enamel py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="What treatment actually costs"
            lead={pricing.rangeNote}
          />
          <div className="mt-10">
            <CostClarityTable variant="condensed" />
          </div>
          <div className="mt-8">
            <SectionLink href="/pricing">See full price list</SectionLink>
          </div>
        </Container>
      </section>

      {/* 7 — Meet the team */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Our doctors" title="Meet the team" lead={home.teamIntro} />
          <div className="reveal mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
          <div className="mt-8">
            <SectionLink href="/about">More about our doctors</SectionLink>
          </div>
        </Container>
      </section>

      {/* 8 — Testimonials */}
      <section className="bg-enamel py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Testimonials" title="What patients say" />
          <div className="reveal mt-10 -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div
                key={testimonial.name}
                className="w-[85%] shrink-0 snap-center sm:w-[360px] md:w-auto"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3">
            <StarRating rating={Math.round(clinic.googleRating.value)} />
            <p className="text-sm text-graphite">
              {clinic.googleRating.value} average from {clinic.googleRating.count}+ Google
              reviews ·{" "}
              <a
                href={clinic.googleRating.url}
                target="_blank"
                rel="noopener"
                className="font-medium text-clinic underline-offset-4 hover:underline"
              >
                See all reviews
              </a>
            </p>
          </div>
        </Container>
      </section>

      {/* 9 — FAQ */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <JsonLd data={faqPageJsonLd(homeFaqs)} />
          <div className="mt-10">
            <FaqAccordion items={homeFaqs} idPrefix="home-faq" />
          </div>
          <p className="mt-6 text-sm text-graphite">
            Didn&rsquo;t find your answer?{" "}
            <Link
              href="/contact"
              className="font-medium text-clinic underline-offset-4 hover:underline"
            >
              Contact us
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* 10 — Booking CTA band */}
      <CtaBand heading={cta.heading} body={cta.body} />

      {/* 11 — Location strip — enamel; differs from the CTA band's scrub
          above it either way, chosen to continue the alternation read. */}
      <section className="bg-enamel py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Visit us" title="Find the clinic" />
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start">
            <MapEmbed />
            <div>
              <address className="not-italic text-graphite">
                <p className="font-medium text-scrub">{clinic.name}</p>
                <p className="mt-1">
                  {address.line1}, {address.line2}
                </p>
                <p>
                  {address.city}, {address.state} {address.pincode}
                </p>
              </address>
              <table className="mt-6 w-full max-w-sm text-sm">
                <tbody>
                  {clinic.hours.map((row) => (
                    <tr key={row.days} className="border-t first:border-t-0">
                      <td className="py-2 pr-4 text-graphite">{row.days}</td>
                      <td className="py-2 text-right font-mono text-scrub tabular-nums">
                        {row.open} – {row.close}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-6 max-w-[46ch] text-sm text-graphite">{clinic.emergencyNote}</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

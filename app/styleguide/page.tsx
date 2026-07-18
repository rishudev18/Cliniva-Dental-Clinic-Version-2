import { CostClarityTable } from "@/components/blocks/CostClarityTable";
import { DoctorCard } from "@/components/blocks/DoctorCard";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";
import { MapEmbed } from "@/components/blocks/MapEmbed";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { TestimonialCard } from "@/components/blocks/TestimonialCard";
import { TrustBar } from "@/components/blocks/TrustBar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { doctors } from "@/content/doctors";
import { faqs } from "@/content/faqs";
import { primaryServices } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { formatINRRange } from "@/lib/utils";

// TEMPORARY route per SPEC §12 Step 3 — renders every token, type size,
// and button state for review. Delete this route before shipping (Step 13).
// Dev-facing labels only; not part of the site's page copy.

export const metadata = { title: "Styleguide (temporary)", robots: { index: false } };

const colors = [
  { name: "porcelain", cls: "bg-porcelain", hexLabel: "#F4F7F8", role: "Page background, section bands" },
  { name: "enamel", cls: "bg-enamel", hexLabel: "#FFFFFF", role: "Cards, surfaces, header" },
  { name: "scrub", cls: "bg-scrub", hexLabel: "#0B2B3C", role: "Primary ink, footer bg" },
  { name: "clinic", cls: "bg-clinic", hexLabel: "#1C7BA8", role: "Interactive only" },
  { name: "rinse", cls: "bg-rinse", hexLabel: "#CFE9E4", role: "Soft fills, never carries text" },
  { name: "graphite", cls: "bg-graphite", hexLabel: "#5C6E78", role: "Body text, muted labels" },
  { name: "success", cls: "bg-success", hexLabel: "#2E7D57", role: "State only" },
  { name: "error", cls: "bg-error", hexLabel: "#B23B3B", role: "State only" },
  { name: "warning", cls: "bg-warning", hexLabel: "#B5822E", role: "State only" },
];

function Swatch({ name, cls, hexLabel, role }: (typeof colors)[number]) {
  return (
    <div className="rounded-card border bg-enamel p-3 shadow-card">
      <div className={`h-16 rounded-sm border ${cls}`} />
      <p className="mt-2 font-mono text-sm text-scrub">{name}</p>
      <p className="font-mono text-eyebrow uppercase text-graphite">{hexLabel}</p>
      <p className="mt-1 text-sm text-graphite">{role}</p>
    </div>
  );
}

export default function Styleguide() {
  return (
    <main className="py-16">
      <Container>
        <p className="font-mono text-eyebrow uppercase text-graphite">
          Temporary — delete before shipping
        </p>
        <h1 className="mt-3 text-scrub">Styleguide</h1>

        {/* Color tokens */}
        <section className="mt-16">
          <h2 className="text-scrub">Color tokens</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {colors.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </div>
        </section>

        {/* Type scale */}
        <section className="mt-16">
          <h2 className="text-scrub">Type scale</h2>
          <div className="mt-6 space-y-6 rounded-card border bg-enamel p-6 shadow-card">
            <div>
              <p className="font-mono text-eyebrow uppercase text-graphite">h1 · Newsreader 500</p>
              <p className="font-display text-scrub" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                Straightforward dental care
              </p>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-graphite">h2 · Newsreader 500</p>
              <p className="font-display text-scrub" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.15 }}>
                What treatment actually costs
              </p>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-graphite">h3 · Public Sans 600</p>
              <p className="text-scrub" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                Sterilised, sealed instruments
              </p>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-graphite">Body L · 1.125rem</p>
              <p className="max-w-[68ch] text-body-l text-graphite">
                A lead paragraph reads at this size. Max line length for body copy is 68 characters, held with a max-width utility.
              </p>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-graphite">Body · 1rem</p>
              <p className="max-w-[68ch] text-graphite">
                Standard body copy at 1rem with 1.65 leading. Graphite on enamel and porcelain both clear WCAG AA at this size.
              </p>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-graphite">Small · 0.875rem</p>
              <p className="text-sm text-graphite">Small text for captions and metadata.</p>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-graphite">Eyebrow · IBM Plex Mono 500</p>
              <p className="font-mono text-eyebrow uppercase text-graphite">Treatments · DLF Phase 2</p>
            </div>
            <div>
              <p className="font-mono text-eyebrow uppercase text-graphite">Mono — numbers and facts only</p>
              <p className="font-mono text-body-l text-scrub tabular-nums">{formatINRRange(8000, 15000)}</p>
              <p className="font-mono text-sm text-scrub">45–60 minutes · 1–2 visits · 10 AM – 8 PM</p>
            </div>
          </div>
        </section>

        {/* SectionHeading component */}
        <section className="mt-16">
          <h2 className="text-scrub">SectionHeading</h2>
          <div className="mt-6 space-y-10 rounded-card border bg-enamel p-6 shadow-card">
            <SectionHeading
              eyebrow="Treatments"
              title="Left aligned with eyebrow and lead"
              lead="An optional lead paragraph in Body L graphite, capped at 68 characters per line."
            />
            <SectionHeading
              align="center"
              eyebrow="Pricing"
              title="Centre aligned variant"
              lead="The same component with align set to center."
            />
          </div>
        </section>

        {/* Buttons */}
        <section className="mt-16">
          <h2 className="text-scrub">Buttons</h2>
          <div className="mt-6 space-y-8 rounded-card border bg-enamel p-6 shadow-card">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size}>
                <p className="font-mono text-eyebrow uppercase text-graphite">size {size}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <Button size={size}>Book appointment</Button>
                  <Button size={size} variant="secondary">WhatsApp us</Button>
                  <Button size={size} variant="ghost">See full price list</Button>
                </div>
              </div>
            ))}
            <div>
              <p className="font-mono text-eyebrow uppercase text-graphite">disabled · as button element</p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <Button disabled>Book appointment</Button>
                <Button type="submit" variant="secondary">Request appointment</Button>
              </div>
            </div>
            <p className="max-w-[68ch] text-sm text-graphite">
              Hover: primary fills scrub, secondary re-inks to clinic, ghost underlines. Focus: 2px clinic ring, 2px offset — tab through to check.
            </p>
          </div>
        </section>

        {/* Elevation and radius */}
        <section className="mt-16">
          <h2 className="text-scrub">Elevation & radius</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-card border bg-enamel p-6 shadow-card">
              <p className="font-mono text-sm text-scrub">shadow-card · rounded-card 12px</p>
              <p className="mt-1 text-sm text-graphite">Resting card elevation.</p>
            </div>
            <div className="rounded-card border bg-enamel p-6 shadow-lift">
              <p className="font-mono text-sm text-scrub">shadow-lift</p>
              <p className="mt-1 text-sm text-graphite">Hover elevation only.</p>
            </div>
            <div className="rounded-sm border bg-enamel p-6">
              <p className="font-mono text-sm text-scrub">rounded-sm 4px · border</p>
              <p className="mt-1 text-sm text-graphite">Inputs and chips. Border is graphite at 18%.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="rounded-pill bg-rinse px-5 py-2.5">
              <span className="font-mono text-sm text-scrub">rounded-pill 999px · rinse fill</span>
            </span>
          </div>
        </section>

        {/* Step 5 — cards and blocks */}
        <section className="mt-16">
          <h2 className="text-scrub">Breadcrumbs · Chip · StarRating</h2>
          <div className="mt-6 space-y-6 rounded-card border bg-enamel p-6 shadow-card">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Root Canal Treatment", href: "/services/root-canal-treatment" },
              ]}
            />
            <div className="flex flex-wrap items-center gap-3">
              <Chip>Crowns & bridges</Chip>
              <Chip>Braces</Chip>
              <StarRating rating={4} />
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-scrub">TrustBar</h2>
          <div className="mt-6 rounded-card border bg-enamel p-8 shadow-card">
            <TrustBar />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-scrub">ServiceCard</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {primaryServices.slice(0, 3).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-scrub">DoctorCard — compact and full</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DoctorCard doctor={doctors[0]} />
            <DoctorCard doctor={doctors[1]} variant="full" />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-scrub">TestimonialCard</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-scrub">FaqAccordion</h2>
          <div className="mt-6 rounded-card border bg-enamel p-6 shadow-card">
            <FaqAccordion items={faqs.slice(0, 3)} idPrefix="sg-faq" />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-scrub">MapEmbed</h2>
          <div className="mt-6">
            <MapEmbed />
          </div>
        </section>

        {/* Step 6 — signature element */}
        <section className="mt-16">
          <h2 className="text-scrub">CostClarityTable — condensed</h2>
          <div className="mt-6">
            <CostClarityTable variant="condensed" />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-scrub">CostClarityTable — full</h2>
          <div className="mt-6">
            <CostClarityTable variant="full" />
          </div>
        </section>
      </Container>
    </main>
  );
}

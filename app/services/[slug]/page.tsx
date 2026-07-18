import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { CtaBand } from "@/components/blocks/CtaBand";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";
import { IncludedExtra } from "@/components/blocks/IncludedExtra";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";
import { cta } from "@/content/cta";
import { getService, services } from "@/content/services";
import { cardGridCols, cn, formatINRRange } from "@/lib/utils";

// /services/[slug] — treatment detail (SPEC §7.3). Statically generated for
// all 12 treatments via generateStaticParams.

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-2 text-center md:px-6">
      <dd className="font-mono text-lg font-medium text-scrub">{value}</dd>
      <dt className="mt-1 font-mono text-eyebrow uppercase text-scrub/70">{label}</dt>
    </div>
  );
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    notFound();
  }

  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <main>
      {/* 1 — Breadcrumb + h1 + oneLiner */}
      <section className="py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: service.name, href: `/services/${service.slug}` },
            ]}
          />
          <h1 className="mt-4 text-scrub">
            {service.name} in {clinic.address.locality}
          </h1>
          <p className="mt-3 max-w-[68ch] text-body-l text-graphite">{service.oneLiner}</p>
        </Container>
      </section>

      {/* 2 — Fact strip */}
      <section className="pb-12">
        <Container>
          <dl className="grid grid-cols-2 gap-y-6 rounded-card bg-rinse p-6 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-scrub/15">
            <FactItem label="Duration" value={service.duration} />
            <FactItem label="Sittings" value={service.sittings} />
            <FactItem label="Pain level" value={service.painLevel} />
            <FactItem label="Anaesthesia" value={service.anesthesia} />
          </dl>
        </Container>
      </section>

      {/* 3 — "You may need this if" */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="rounded-card border bg-enamel p-8 shadow-card">
            <p className="font-mono text-eyebrow uppercase text-graphite">
              You may need this if
            </p>
            <p className="mt-3 text-body-l text-scrub">{service.problem}</p>
          </div>
        </Container>
      </section>

      {/* 4 — What it involves */}
      <section className="pb-16 md:pb-24">
        <Container>
          <SectionHeading eyebrow="The treatment" title="What it involves" />
          <div className="mt-8 max-w-[68ch] space-y-4 text-graphite">
            {service.description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* 5 — The process (numbered — it is a sequence, §7.3) */}
      <section className="bg-enamel pb-16 pt-16 md:pb-24 md:pt-24">
        <Container>
          <SectionHeading eyebrow="Step by step" title="The process" />
          <ol className="reveal mt-10 max-w-[68ch] space-y-8">
            {service.process.map((step, i) => (
              <li key={step.step} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-scrub font-mono text-sm font-medium text-enamel">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-scrub">{step.step}</h3>
                  <p className="mt-1 text-graphite">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 6 — Cost */}
      <section className="pb-16 pt-16 md:pb-24 md:pt-24">
        <Container>
          <SectionHeading eyebrow="Cost" title="What this treatment costs" />
          <p className="reveal mt-8 font-mono text-4xl font-medium text-scrub tabular-nums">
            {formatINRRange(service.priceRange.min, service.priceRange.max)}
            <span className="ml-3 font-body text-base font-normal text-graphite">
              {service.priceRange.unit}
            </span>
          </p>
          <p className="mt-3 max-w-[60ch] text-graphite">{service.priceNote}</p>
          <div className="mt-10">
            <IncludedExtra />
          </div>
        </Container>
      </section>

      {/* 7 — Aftercare */}
      <section className="bg-enamel pb-16 pt-16 md:pb-24 md:pt-24">
        <Container>
          <SectionHeading eyebrow="Aftercare" title="After your treatment" />
          <ul className="reveal mt-8 grid gap-3 sm:grid-cols-2">
            {service.aftercare.map((item) => (
              <li key={item} className="flex gap-3 text-graphite">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-scrub" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8 — FAQs */}
      <section className="pb-16 pt-16 md:pb-24 md:pt-24">
        <Container>
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <div className="mt-10">
            <FaqAccordion items={service.faqs} idPrefix={`${service.slug}-faq`} />
          </div>
        </Container>
      </section>

      {/* 9 — Booking CTA band, treatment name prefilled */}
      <CtaBand
        heading={cta.heading}
        body={cta.body}
        whatsappServiceName={service.name}
        bookHref={`/book?treatment=${service.slug}`}
      />

      {/* 10 — Related treatments */}
      {related.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeading eyebrow="Related" title="Related treatments" />
            <div className={cn("reveal mt-10 grid gap-6", cardGridCols(related.length))}>
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}

import type { Metadata } from "next";
import { CostClarityTable } from "@/components/blocks/CostClarityTable";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";
import { pricing } from "@/content/pricing";
import { seo } from "@/content/seo";
import { categoryLabels, categoryOrder, services } from "@/content/services";
import { servicesIndex } from "@/content/servicesIndex";
import { cardGridCols, cn } from "@/lib/utils";

// /services — index (SPEC §7.2). Services grouped by category, with the
// "Not sure what you need?" band between the general and cosmetic groups,
// and the condensed Cost Clarity Table near the bottom.

export const metadata: Metadata = {
  title: seo.services.title,
  description: seo.services.description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: seo.services.title,
    description: seo.services.description,
    url: "/services",
    images: ["/opengraph-image"],
  },
};

export default function ServicesIndex() {
  const groups = categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      items: services.filter((s) => s.category === category),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <main>
      <section className="py-12 md:py-16">
        <Container>
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
          <h1 className="mt-4 text-scrub">Dental treatments in {clinic.address.locality}</h1>
          <p className="mt-3 max-w-[68ch] text-body-l text-graphite">{servicesIndex.lead}</p>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container className="space-y-16">
          <SectionHeading title="All treatments" className="mb-2" />
          {groups.map((group, i) => (
            <div key={group.category}>
              <p className="font-mono text-eyebrow uppercase text-graphite">{group.label}</p>
              <div className={cn("reveal mt-6 grid gap-6", cardGridCols(group.items.length))}>
                {group.items.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>

              {/* "Not sure what you need?" band — between general and cosmetic (§7.2) */}
              {i === 0 && (
                <div className="reveal mt-12 rounded-card border bg-enamel p-8 shadow-card md:flex md:items-center md:justify-between md:gap-8">
                  <div>
                    <h3 className="text-scrub">Not sure what you need?</h3>
                    <p className="mt-2 max-w-[50ch] text-graphite">
                      {servicesIndex.consultationBandBody}
                    </p>
                  </div>
                  <div className="mt-6 shrink-0 md:mt-0">
                    <Button href="/book">Book a consultation</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Container>
      </section>

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
        </Container>
      </section>
    </main>
  );
}

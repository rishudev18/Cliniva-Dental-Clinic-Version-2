import { CostClarityTable } from "@/components/blocks/CostClarityTable";
import { CtaBand } from "@/components/blocks/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cta } from "@/content/cta";
import { pricing } from "@/content/pricing";

// /pricing — the signature page (SPEC §7.5). CostClarityTable's `full`
// variant already renders the 2-paragraph honest intro above the table and
// the What's included / What costs extra columns below it — see
// components/blocks/CostClarityTable.tsx — so this page adds only the
// payment, insurance, and no-upselling notes that belong to it alone.

export default function PricingPage() {
  return (
    <main>
      <section className="py-12 md:py-16">
        <Container>
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Pricing", href: "/pricing" }]} />
          <h1 className="mt-4 text-scrub">Treatment costs, listed plainly</h1>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <SectionHeading title="The full price list" className="mb-8" />
          <CostClarityTable variant="full" />
        </Container>
      </section>

      <section className="bg-enamel py-16 md:py-24">
        <Container className="grid gap-6 md:grid-cols-3">
          <div className="rounded-card border bg-porcelain p-6">
            <h3 className="text-scrub">Payment & EMI</h3>
            <p className="mt-2 text-sm text-graphite">{pricing.paymentNote}</p>
          </div>
          <div className="rounded-card border bg-porcelain p-6">
            <h3 className="text-scrub">Insurance & cashless</h3>
            <p className="mt-2 text-sm text-graphite">{pricing.insuranceNote}</p>
          </div>
          <div className="rounded-card border bg-porcelain p-6">
            <h3 className="text-scrub">No upselling</h3>
            <p className="mt-2 text-sm text-graphite">{pricing.noUpsellNote}</p>
          </div>
        </Container>
      </section>

      <CtaBand heading={cta.heading} body={cta.body} />
    </main>
  );
}

import { Check, Plus } from "lucide-react";
import { pricing } from "@/content/pricing";

// Server Component. The "What's included" / "What costs extra" two-column
// block (§5.5) — used below the Cost Clarity Table on /pricing and below
// the price on each /services/[slug] page (§7.3 sec 6). Extracted out of
// CostClarityTable so both places render the same markup from the same
// content, rather than duplicating the list JSX.

export function IncludedExtra() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section
        aria-label="What's included"
        className="rounded-card border bg-enamel p-6 shadow-card"
      >
        <h3 className="text-scrub">What&rsquo;s included</h3>
        <ul className="mt-4 space-y-3">
          {pricing.included.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-graphite">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-scrub" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section
        aria-label="What costs extra"
        className="rounded-card border bg-enamel p-6 shadow-card"
      >
        <h3 className="text-scrub">What costs extra</h3>
        <ul className="mt-4 space-y-3">
          {pricing.extra.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-graphite">
              <Plus className="mt-0.5 h-4 w-4 shrink-0 text-scrub" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

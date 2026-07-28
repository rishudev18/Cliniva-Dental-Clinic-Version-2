import Link from "next/link";
import { IncludedExtra } from "@/components/blocks/IncludedExtra";
import { pricing } from "@/content/pricing";
import {
  categoryLabels,
  categoryOrder,
  primaryServices,
  services,
  type Service,
} from "@/content/services";
import { formatINRRange } from "@/lib/utils";

// Server Component. The signature element (§5.5): treatment costs listed
// plainly. `full` = honest range note, all 12 treatments grouped by category
// with mono eyebrow headers, then the included/extra columns. `condensed` =
// the 6 primary treatments, no grouping — for the home page, /services and
// service pages. Desktop renders a real table; on mobile the same rows
// become stacked cards with the mono price kept most prominent.

type CostClarityTableProps = { variant: "full" | "condensed" };

function BookLink({ service }: { service: Service }) {
  return (
    <Link
      href={`/book?treatment=${service.slug}`}
      className="font-medium text-clinic underline-offset-4 transition duration-200 ease-clinic hover:underline"
      aria-label={`Book ${service.name}`}
    >
      Book
    </Link>
  );
}

function PriceCell({ service }: { service: Service }) {
  return (
    <>
      <span className="font-mono font-medium text-scrub tabular-nums">
        {formatINRRange(service.priceRange.min, service.priceRange.max)}
      </span>{" "}
      <span className="whitespace-nowrap text-sm text-graphite">
        {service.priceRange.unit}
      </span>
    </>
  );
}

function DesktopRows({ group }: { group: Service[] }) {
  return (
    <>
      {group.map((service) => (
        <tr key={service.slug} className="border-t border-graphite/20 first:border-t-0">
          <th scope="row" className="py-5 pr-6 text-left align-top font-semibold text-scrub">
            {service.name}
          </th>
          <td className="py-5 pr-6 align-top">
            <PriceCell service={service} />
          </td>
          <td className="max-w-[34ch] py-5 pr-6 align-top text-sm text-graphite">
            {service.priceNote}
          </td>
          <td className="py-5 text-right align-top">
            <BookLink service={service} />
          </td>
        </tr>
      ))}
    </>
  );
}

function MobileCards({ group }: { group: Service[] }) {
  return (
    <ul className="space-y-3">
      {group.map((service) => (
        <li key={service.slug} className="rounded-card border bg-enamel p-5 shadow-soft">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-semibold text-scrub">{service.name}</p>
            <BookLink service={service} />
          </div>
          {/* The price stays the most prominent thing in the card (§5.5) */}
          <p className="mt-2 font-mono text-xl font-medium text-scrub tabular-nums">
            {formatINRRange(service.priceRange.min, service.priceRange.max)}
            <span className="ml-2 align-baseline font-body text-sm font-normal text-graphite">
              {service.priceRange.unit}
            </span>
          </p>
          <p className="mt-2 text-sm text-graphite">{service.priceNote}</p>
        </li>
      ))}
    </ul>
  );
}

function GroupTable({ group, caption }: { group: Service[]; caption: string }) {
  return (
    <table className="w-full border-collapse">
      <caption className="sr-only">{caption}</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Treatment</th>
          <th scope="col">Price range</th>
          <th scope="col">What determines the range</th>
          <th scope="col">Book</th>
        </tr>
      </thead>
      <tbody>
        <DesktopRows group={group} />
      </tbody>
    </table>
  );
}

export function CostClarityTable({ variant }: CostClarityTableProps) {
  if (variant === "condensed") {
    return (
      <div>
        <div className="hidden rounded-well border bg-enamel px-6 shadow-soft md:block">
          <GroupTable group={primaryServices} caption="Treatment price ranges" />
        </div>
        <div className="md:hidden">
          <MobileCards group={primaryServices} />
        </div>
      </div>
    );
  }

  const groups = categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      items: services.filter((service) => service.category === category),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      {/* The honest note above the table (§5.5) — 2 paragraphs on the full
          variant, since /pricing is the one place this gets the fuller
          explanation (§7.5); condensed uses elsewhere quote the shorter
          `pricing.rangeNote` directly as their own lead paragraph. */}
      <div className="max-w-[68ch] space-y-4 text-body-l text-graphite">
        {pricing.introParagraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <section key={group.category} aria-label={group.label}>
            <p className="font-mono text-eyebrow uppercase text-graphite">
              {group.label}
            </p>
            <div className="mt-3 hidden rounded-well border bg-enamel px-6 shadow-soft md:block">
              <GroupTable
                group={group.items}
                caption={`${group.label} — treatment price ranges`}
              />
            </div>
            <div className="mt-3 md:hidden">
              <MobileCards group={group.items} />
            </div>
          </section>
        ))}
      </div>

      {/* What's included / what costs extra (§5.5) — plain, unhedged */}
      <div className="mt-12">
        <IncludedExtra />
      </div>
    </div>
  );
}

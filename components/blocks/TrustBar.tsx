import { trust } from "@/content/trust";

// Server Component. 4 stats, mono numerals, thin dividers between (§6).
// `.reveal` added 2026-07-28 (item 5) — was one of the few grids on the
// home page missing the scroll-reveal treatment every other card grid has.
// Component-level, so /about's TrustBar picks it up too.

export function TrustBar() {
  return (
    <dl className="reveal grid grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-graphite/20 md:gap-y-0">
      {trust.map((item) => (
        <div key={item.label} className="px-4 text-center md:px-6">
          <dd className="font-mono text-3xl font-medium text-scrub tabular-nums">
            {item.stat}
          </dd>
          <dt className="mt-2 text-sm text-graphite">{item.label}</dt>
        </div>
      ))}
    </dl>
  );
}

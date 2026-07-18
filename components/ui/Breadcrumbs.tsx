import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListJsonLd, type Crumb } from "@/lib/jsonld";

// Server Component. On all pages except `/` (§6). Renders the visible trail
// and emits BreadcrumbList JSON-LD server-side (§9.3).

type BreadcrumbsProps = { items: Crumb[] };

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={breadcrumbListJsonLd(items)} />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-graphite">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-graphite/60" aria-hidden="true" />
              )}
              {last ? (
                <span aria-current="page" className="text-scrub">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition duration-200 ease-clinic hover:text-clinic"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

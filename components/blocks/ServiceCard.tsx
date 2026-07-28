import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Baby,
  Bone,
  Brush,
  CircleMinus,
  Crown,
  HeartPulse,
  Layers,
  ShieldCheck,
  Smile,
  SmilePlus,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/content/services";
import { formatINR } from "@/lib/utils";

// Server Component. Icon in rinse circle, name, oneLiner, price-from in
// mono, arrow link (§6). The whole card is one link; hover lifts 2px with
// shadow-lift and a darkened border (§5.4).

const icons: Record<string, LucideIcon> = {
  Anchor,
  Baby,
  Bone,
  Brush,
  CircleMinus,
  Crown,
  HeartPulse,
  Layers,
  ShieldCheck,
  Smile,
  SmilePlus,
  Sparkles,
};

type ServiceCardProps = { service: Service };

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = icons[service.icon] ?? Smile;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-card border bg-enamel p-6 shadow-soft transition duration-200 ease-clinic hover:-translate-y-0.5 hover:border-graphite/40 hover:shadow-lift"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-rinse">
        <Icon className="h-6 w-6 text-scrub" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-scrub">{service.name}</h3>
      <p className="mt-2 text-sm text-graphite">{service.oneLiner}</p>
      <div className="mt-auto flex items-center justify-between pt-5">
        <span className="font-mono text-sm text-scrub tabular-nums">
          From {formatINR(service.priceRange.min)}
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-clinic">
          About {service.shortName.toLowerCase()}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 ease-clinic group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

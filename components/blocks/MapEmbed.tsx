import { MapPin } from "lucide-react";
import { clinic } from "@/content/clinic";
import { Button } from "@/components/ui/Button";

// Server Component. Lazy-loaded map iframe over a static fallback block,
// with a Get directions button (§6). The fallback (address on rinse) shows
// until the iframe paints — and permanently for no-JS/blocked-iframe cases.
// No map photo supplied yet (§13), so the fallback is a labelled placeholder
// rather than a static image.

export function MapEmbed() {
  const { address } = clinic;
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-card border md:aspect-[16/9]">
        {/* Static fallback underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-rinse p-6 text-center">
          <MapPin className="h-6 w-6 text-scrub" aria-hidden="true" />
          <p className="text-sm text-scrub">
            {address.line1}, {address.line2}, {address.city} {address.pincode}
          </p>
        </div>
        <iframe
          src={clinic.mapsEmbedUrl}
          loading="lazy"
          title={`Map showing ${clinic.name}, ${address.locality}, ${address.city}`}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className="mt-4">
        <Button href={clinic.mapsUrl} variant="secondary" size="sm" newTab>
          Get directions
        </Button>
      </div>
    </div>
  );
}

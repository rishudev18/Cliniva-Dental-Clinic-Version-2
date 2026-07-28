import { MapPin } from "lucide-react";
import { clinic } from "@/content/clinic";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Server Component. Lazy-loaded map iframe over a static fallback block,
// with a Get directions button (§6). The fallback (address on rinse) shows
// until the iframe paints — and permanently for no-JS/blocked-iframe cases.
// No map photo supplied yet (§13), so the fallback is a labelled placeholder
// rather than a static image.
//
// `tone` (default "default", i.e. today's exact output) is additive: passing
// "muted" applies a desaturated CSS filter to the iframe only (not the
// fallback) and upgrades the frame to the hero/doctor-card elevation
// (shadow-raised + rounded-well) instead of a bare border. `saturate-[.65]`/
// `contrast-[1.05]` are numeric filter transforms, not new color values —
// Hard rule 3 (six tokens only) is unaffected. Home passes "muted"; every
// other call site stays prop-less and pixel-identical to before.

type MapEmbedProps = { tone?: "default" | "muted" };

export function MapEmbed({ tone = "default" }: MapEmbedProps) {
  const { address } = clinic;
  const muted = tone === "muted";
  return (
    <div>
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden md:aspect-[16/9]",
          muted ? "rounded-well shadow-raised" : "rounded-card border",
        )}
      >
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
          className={cn(
            "absolute inset-0 h-full w-full border-0",
            muted && "saturate-[.65] contrast-[1.05]",
          )}
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

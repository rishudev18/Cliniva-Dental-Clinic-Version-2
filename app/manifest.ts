import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";

// §9.4 — web app manifest. Icons point at the app/icon.svg static
// convention file, served verbatim at /icon.svg by Next. A proper
// 192/512 PNG maskable-icon set should replace this once a real logo
// exists (§13 TODO) — SVG "any" is a reasonable placeholder in the
// meantime, not a fully spec'd PWA icon set.

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: clinic.name,
    short_name: "Clivia Dental",
    description: clinic.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F7F8", // porcelain
    theme_color: "#0B2B3C", // scrub
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

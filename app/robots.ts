import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/jsonld";

// §9.4 — allow all except /thank-you (nothing for a search result to land
// on) and /styleguide (dev-only route, deleted before shipping — disallowed
// here too as a safety net for as long as it still exists).

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thank-you", "/styleguide"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

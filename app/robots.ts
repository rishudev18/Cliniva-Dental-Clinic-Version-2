import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/jsonld";

// §9.4 — allow all except /thank-you (nothing for a search result to land on).
// /styleguide was disallowed here too while it existed (Step 12); the route
// itself is deleted as of Step 13's final acceptance pass, so that entry is
// gone rather than left pointing at a route that no longer exists.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thank-you"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

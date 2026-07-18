import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { siteUrl } from "@/lib/jsonld";

// §9.4 — every public route, generated from the static routes plus the 12
// service slugs. /thank-you (noindex) and /styleguide (dev-only, deleted
// before shipping) are deliberately excluded.

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified, priority: 1 },
    { url: `${siteUrl}/services`, lastModified, priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified, priority: 0.7 },
    { url: `${siteUrl}/pricing`, lastModified, priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified, priority: 0.7 },
    { url: `${siteUrl}/book`, lastModified, priority: 0.8 },
    { url: `${siteUrl}/privacy`, lastModified, priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}

// Structured data builders (§9.3). Only what's needed so far —
// Dentist/MedicalProcedure/FAQPage builders arrive with the SEO layer (Step 11).

// Placeholder domain — §13 domain not yet confirmed; update before launch.
export const siteUrl = "https://cliviadental.in";

export type Crumb = { name: string; href: string };

export function breadcrumbListJsonLd(items: Crumb[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  });
}

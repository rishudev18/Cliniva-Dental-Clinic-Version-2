import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/blocks/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { clinic } from "@/content/clinic";
import { cta } from "@/content/cta";
import { getConsentedGalleryEntries } from "@/content/gallery";
import { seo } from "@/content/seo";
import { categoryLabels, categoryOrder, getService } from "@/content/services";
import { smileGallery } from "@/content/smileGallery";
import { cardGridCols, cn } from "@/lib/utils";

// /smile-gallery (SPEC §7.4a, added in the nav revision). Before/after pairs
// sourced from content/gallery.ts, grouped by the same treatment categories
// as /services. `getConsentedGalleryEntries()` is the ONLY read path for
// that data — it re-filters to consentObtained === true in code, so this
// page can never accidentally render an entry that hasn't been explicitly
// marked consented, regardless of what the data file contains.

export const metadata: Metadata = {
  title: seo.smileGallery.title,
  description: seo.smileGallery.description,
  alternates: { canonical: "/smile-gallery" },
  openGraph: {
    title: seo.smileGallery.title,
    description: seo.smileGallery.description,
    url: "/smile-gallery",
    images: ["/opengraph-image"],
  },
};

export default function SmileGalleryPage() {
  const entries = getConsentedGalleryEntries();

  const groups = categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      items: entries.filter((entry) => getService(entry.treatmentSlug)?.category === category),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <main>
      <section className="py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Smile Gallery", href: "/smile-gallery" }]}
          />
          <h1 className="mt-4 text-scrub">Real smiles from {clinic.address.locality} patients</h1>
          <p className="mt-3 max-w-[68ch] text-body-l text-graphite">{smileGallery.lead}</p>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          {groups.length === 0 ? (
            <div className="reveal rounded-card border bg-enamel p-10 text-center shadow-soft">
              <p className="mx-auto max-w-[52ch] text-body-l text-graphite">
                {smileGallery.emptyState}
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {groups.map((group) => (
                <div key={group.category}>
                  <p className="font-mono text-eyebrow uppercase text-graphite">{group.label}</p>
                  <div className={cn("reveal mt-6 grid gap-6", cardGridCols(group.items.length))}>
                    {group.items.map((entry) => {
                      const service = getService(entry.treatmentSlug);
                      return (
                        <div
                          key={entry.id}
                          className="overflow-hidden rounded-card border bg-enamel shadow-soft"
                        >
                          <div className="grid grid-cols-2 gap-px bg-porcelain">
                            <div className="flex aspect-square flex-col items-center justify-center gap-1 bg-rinse">
                              <span className="font-mono text-eyebrow uppercase text-scrub/70">
                                Before
                              </span>
                            </div>
                            <div className="flex aspect-square flex-col items-center justify-center gap-1 bg-rinse">
                              <span className="font-mono text-eyebrow uppercase text-scrub/70">
                                After
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            {service && (
                              <Link
                                href={`/services/${service.slug}`}
                                className="font-medium text-clinic transition duration-200 ease-clinic hover:underline"
                              >
                                {service.name}
                              </Link>
                            )}
                            <p className="mt-2 text-sm text-graphite">{entry.caption}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CtaBand heading={cta.heading} body={cta.body} />
    </main>
  );
}

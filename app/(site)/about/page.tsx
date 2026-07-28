import type { Metadata } from "next";
import { PackageCheck, ShieldCheck, Sparkles, Trash2, type LucideIcon } from "lucide-react";
import { CtaBand } from "@/components/blocks/CtaBand";
import { DoctorCard } from "@/components/blocks/DoctorCard";
import { TrustBar } from "@/components/blocks/TrustBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/content/about";
import { clinic } from "@/content/clinic";
import { cta } from "@/content/cta";
import { doctors } from "@/content/doctors";
import { seo } from "@/content/seo";
import { personJsonLd } from "@/lib/jsonld";

// /about — clinic story, full doctor bios, sterilisation & safety, facility
// photos, trust stats, CTA band (SPEC §7.4).

const sterilisationIcons: LucideIcon[] = [ShieldCheck, PackageCheck, Sparkles, Trash2];

export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: seo.about.title,
    description: seo.about.description,
    url: "/about",
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <main>
      {/* 1 — Clinic story */}
      <section className="py-12 md:py-16">
        <Container>
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
          <h1 className="mt-4 text-scrub">
            About {clinic.name} in {clinic.address.locality}
          </h1>
          <p className="mt-3 max-w-[68ch] text-body-l text-graphite">{about.lead}</p>
          <div className="mt-8 max-w-[68ch] space-y-4 text-graphite">
            {about.story.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* 2 — Our team */}
      <section className="bg-enamel py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Our team" title="The doctors who treat you" />
          {doctors.map((doctor) => (
            <JsonLd key={doctor.slug} data={personJsonLd(doctor)} />
          ))}
          <div className="reveal mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} variant="full" />
            ))}
          </div>
        </Container>
      </section>

      {/* 3 — Sterilisation & safety */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Safety"
            title="Sterilisation & safety"
            lead={about.sterilisation.lead}
          />
          <div className="reveal mt-10 grid gap-6 sm:grid-cols-2">
            {about.sterilisation.points.map((point, i) => {
              const Icon = sterilisationIcons[i];
              return (
                <div key={point.title} className="rounded-card border bg-enamel p-6 shadow-soft">
                  <div className="flex h-11 w-11 items-center justify-center rounded-pill bg-rinse">
                    <Icon className="h-5 w-5 text-scrub" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-scrub">{point.title}</h3>
                  <p className="mt-2 text-graphite">{point.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4 — Facility photos (no lightbox, just a responsive grid; no photos
          supplied yet, §13 — labelled placeholders at a consistent ratio) */}
      <section className="bg-enamel py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="The clinic" title="Inside Clivia Dental Clinic" />
          <div className="reveal mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {about.facilityPhotos.map((label) => (
              <div
                key={label}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-card bg-rinse"
              >
                <span className="font-mono text-eyebrow uppercase text-scrub">{label}</span>
                <span className="font-mono text-eyebrow uppercase text-scrub/70">Photo to come</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5 — Trust stats */}
      <section className="py-16 md:py-24">
        <Container>
          <TrustBar />
        </Container>
      </section>

      {/* 6 — Booking CTA band */}
      <CtaBand heading={cta.heading} body={cta.body} />
    </main>
  );
}

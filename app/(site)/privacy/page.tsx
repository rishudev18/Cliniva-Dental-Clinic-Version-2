import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { clinic } from "@/content/clinic";
import { privacy } from "@/content/privacy";
import { seo } from "@/content/seo";

// /privacy — privacy policy (SPEC §3.1, P1). Linked from the footer on
// every page since Step 4; built now so that link resolves to a real page
// instead of a 404.

export const metadata: Metadata = {
  title: seo.privacy.title,
  description: seo.privacy.description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: seo.privacy.title,
    description: seo.privacy.description,
    url: "/privacy",
    images: ["/opengraph-image"],
  },
};

export default function PrivacyPage() {
  return (
    <main className="py-12 md:py-16">
      <Container className="max-w-[68ch]">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy", href: "/privacy" }]} />
        <h1 className="mt-4 text-scrub">Privacy Policy</h1>
        <p className="mt-3 text-body-l text-graphite">{privacy.lead}</p>
        <p className="mt-2 font-mono text-sm text-graphite">Last updated {privacy.lastUpdated}</p>

        <div className="mt-10 space-y-8">
          {privacy.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-scrub">{section.heading}</h2>
              <p className="mt-2 text-graphite">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-8">
          <h2 className="text-scrub">Contact us</h2>
          <p className="mt-2 text-graphite">
            Questions about this policy or your information? Write to{" "}
            <a
              href={`mailto:${clinic.email}`}
              className="font-medium text-clinic underline-offset-4 hover:underline"
            >
              {clinic.email}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${clinic.phone}`}
              className="font-medium text-clinic underline-offset-4 hover:underline"
            >
              {clinic.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </Container>
    </main>
  );
}

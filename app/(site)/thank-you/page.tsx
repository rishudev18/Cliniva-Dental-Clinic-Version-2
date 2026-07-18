import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { clinic } from "@/content/clinic";
import { thankYou } from "@/content/thankYou";
import { whatsappUrl } from "@/lib/utils";

// /thank-you — post-submission confirmation (SPEC §7.8). noindex per spec;
// the rest of the SEO layer (unique title/description, openGraph, etc.) is
// built out fully in Step 11, but robots:noindex is called out specifically
// here so this page never accidentally gets indexed in the meantime.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="py-16 md:py-24">
      <Container className="max-w-2xl text-center">
        <h1 className="text-scrub">{thankYou.heading}</h1>
        <p className="mt-3 text-body-l text-graphite">{thankYou.lead}</p>

        <h2 className="mt-10 text-scrub">What happens next</h2>
        <ol className="mt-6 space-y-6 text-left">
          {thankYou.steps.map((item, i) => (
            <li key={item.step} className="flex gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-scrub font-mono text-sm font-medium text-enamel">
                {i + 1}
              </span>
              <div>
                <h3 className="text-scrub">{item.step}</h3>
                <p className="mt-1 text-graphite">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`tel:${clinic.phone}`}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill border border-scrub px-6 py-3 font-medium text-scrub transition duration-200 ease-clinic hover:border-clinic hover:text-clinic"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {clinic.phoneDisplay}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill border border-scrub px-6 py-3 font-medium text-scrub transition duration-200 ease-clinic hover:border-clinic hover:text-clinic"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp us
          </a>
        </div>

        <div className="mt-10">
          <Button href="/" variant="ghost">
            Back to home
          </Button>
        </div>
      </Container>
    </main>
  );
}

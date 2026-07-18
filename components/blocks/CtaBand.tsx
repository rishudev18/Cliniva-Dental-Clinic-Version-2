import { Phone, MessageCircle } from "lucide-react";
import { clinic } from "@/content/clinic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappUrl } from "@/lib/utils";

// Server Component. Full-width scrub band with the three booking actions
// (§6/§7.1 sec 9) — reused on the home page and, in later steps, on service,
// about, and pricing pages. `heading`/`body` are passed in from each page's
// own content so no copy is hardcoded here; `whatsappServiceName` lets a
// service page prefill the §8.3 service-specific WhatsApp message, and
// `bookHref` lets it deep-link `/book?treatment=slug` (§7.3 sec 9) so the
// booking form can preselect the treatment once it exists (Step 10).

type CtaBandProps = {
  heading: string;
  body: string;
  whatsappServiceName?: string;
  bookHref?: string;
};

export function CtaBand({ heading, body, whatsappServiceName, bookHref = "/book" }: CtaBandProps) {
  const todayHours = clinic.hours[0];

  return (
    <section className="bg-scrub py-16 text-porcelain md:py-20">
      <Container className="text-center">
        <h2 className="text-enamel">{heading}</h2>
        <p className="mx-auto mt-3 max-w-[60ch] text-body-l text-porcelain/85">{body}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={bookHref} size="lg">
            Book appointment
          </Button>
          <a
            href={`tel:${clinic.phone}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill border border-porcelain/40 px-8 py-3.5 text-body-l font-medium text-enamel transition duration-200 ease-clinic hover:border-clinic hover:text-clinic"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {clinic.phoneDisplay}
          </a>
          <a
            href={whatsappUrl(whatsappServiceName)}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-pill border border-porcelain/40 px-8 py-3.5 text-body-l font-medium text-enamel transition duration-200 ease-clinic hover:border-clinic hover:text-clinic"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        <p className="mt-8 font-mono text-sm text-porcelain/70">
          Open today {todayHours.open} – {todayHours.close} · {clinic.emergencyNote}
        </p>
      </Container>
    </section>
  );
}

import { Phone, MessageCircle } from "lucide-react";
import { clinic } from "@/content/clinic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappUrl } from "@/lib/utils";

// Server Component. Full-width scrub band with the three booking actions
// (§6/§7.1 sec 9). `heading`/`body` are passed in from each page's own
// content so no copy is hardcoded here; `whatsappServiceName` lets a
// service page prefill the §8.3 service-specific WhatsApp message, and
// `bookHref` lets it deep-link `/book?treatment=slug` (§7.3 sec 9).
//
// Restyle (2026-07-28): two-column desktop layout (heading+body left,
// actions right) instead of a centered stack — structurally more
// interesting and shortens the path to the buttons. Mobile stays a
// centered single column, unchanged. Hours + emergency note now sit in a
// bordered strip so they read as a clinic sign rather than a footnote —
// `rounded-card` since this is a bordered content box, not one of the
// three components §5.3 names for `rounded-well` (doctor cards, the
// pricing table container, the hero frame). No gradient (§5.1 permits
// exactly one, already used on the hero).

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
      <Container>
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:gap-12 md:text-left">
          <div className="md:max-w-[46ch]">
            <h2 className="text-enamel">{heading}</h2>
            <p className="mt-3 text-body-l text-porcelain/85">{body}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
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
        </div>

        <div className="mt-8 rounded-card border border-porcelain/20 px-6 py-3 text-center font-mono text-sm text-porcelain/70">
          Open today {todayHours.open} – {todayHours.close} · {clinic.emergencyNote}
        </div>
      </Container>
    </section>
  );
}

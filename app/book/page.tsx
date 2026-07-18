import { Check } from "lucide-react";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Container } from "@/components/ui/Container";
import { book } from "@/content/book";
import { clinic } from "@/content/clinic";
import { whatsappUrl } from "@/lib/utils";

// /book — dedicated appointment request page (SPEC §7.7). Minimal chrome
// from app/book/layout.tsx; this page is just the centred form.

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ treatment?: string }>;
}) {
  const { treatment } = await searchParams;

  return (
    <main className="py-12 md:py-20">
      <Container className="max-w-xl">
        <h1 className="text-center text-scrub">
          Book your appointment in {clinic.address.locality}
        </h1>
        <p className="mt-3 text-center text-body-l text-graphite">{book.lead}</p>

        <ul className="mt-8 space-y-2">
          {book.reassurances.map((item) => (
            <li key={item} className="flex items-center justify-center gap-2 text-sm text-graphite">
              <Check className="h-4 w-4 shrink-0 text-scrub" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-card border bg-enamel p-6 shadow-card md:p-8">
          <AppointmentForm defaultTreatment={treatment} />
        </div>

        <p className="mt-6 text-center text-sm text-graphite">
          {book.whatsappLead}{" "}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener"
            className="font-medium text-clinic underline underline-offset-4"
          >
            Message us on WhatsApp
          </a>
        </p>
      </Container>
    </main>
  );
}

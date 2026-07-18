import { Mail, MessageCircle, Phone } from "lucide-react";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { MapEmbed } from "@/components/blocks/MapEmbed";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { clinic } from "@/content/clinic";
import { contact } from "@/content/contact";
import { cn, isTodayRow, whatsappUrl } from "@/lib/utils";

// /contact — two-column: form left, address/hours/map right (SPEC §7.6).

export default function ContactPage() {
  const { address } = clinic;

  return (
    <main className="py-12 md:py-16">
      <Container>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
        <h1 className="mt-4 text-scrub">
          Contact {clinic.name} in {address.locality}
        </h1>
        <p className="mt-3 max-w-[68ch] text-body-l text-graphite">{contact.lead}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — form */}
          <div className="rounded-card border bg-enamel p-6 shadow-card md:p-8">
            <h2 className="text-scrub">Request an appointment</h2>
            <div className="mt-6">
              <AppointmentForm />
            </div>
          </div>

          {/* Right — address, hours, map */}
          <div>
            <address className="not-italic">
              <p className="text-scrub">
                {address.line1}, {address.line2}
              </p>
              <p className="text-graphite">
                {address.city}, {address.state} {address.pincode}
              </p>
            </address>
            <div className="mt-4">
              <Button href={clinic.mapsUrl} variant="secondary" size="sm" newTab>
                Get directions
              </Button>
            </div>

            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`tel:${clinic.phone}`}
                  className="flex items-center gap-2 font-mono text-scrub transition duration-200 ease-clinic hover:text-clinic"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {clinic.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 text-scrub transition duration-200 ease-clinic hover:text-clinic"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${clinic.email}`}
                  className="flex items-center gap-2 text-scrub transition duration-200 ease-clinic hover:text-clinic"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {clinic.email}
                </a>
              </li>
            </ul>

            <table className="mt-6 w-full text-sm">
              <caption className="sr-only">Opening hours</caption>
              <tbody>
                {clinic.hours.map((row) => {
                  const today = isTodayRow(row.days);
                  return (
                    <tr
                      key={row.days}
                      className={cn(
                        "border-t border-graphite/20 first:border-t-0",
                        today && "font-medium text-scrub"
                      )}
                    >
                      <td className="py-2 pr-4 text-graphite">
                        {row.days}
                        {today && <Chip className="ml-2 px-2 py-0.5 text-xs">Today</Chip>}
                      </td>
                      <td className="py-2 text-right font-mono tabular-nums text-scrub">
                        {row.open} – {row.close}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-graphite">{clinic.emergencyNote}</p>

            <div className="mt-8">
              <MapEmbed />
            </div>
            <p className="mt-4 text-sm text-graphite">{contact.directions}</p>
          </div>
        </div>
      </Container>
    </main>
  );
}

// Structured data builders (§9.3), injected server-side via the <JsonLd>
// component (components/seo/JsonLd.tsx). Every builder returns a JSON
// string ready for dangerouslySetInnerHTML — never rendered client-side.

import { clinic } from "@/content/clinic";
import type { Doctor } from "@/content/doctors";
import type { Service } from "@/content/services";
import { WEEK_MON_FIRST } from "@/lib/utils";

// Placeholder domain — §13 domain not yet confirmed; update before launch.
export const siteUrl = "https://cliviadental.in";

export type Crumb = { name: string; href: string };
export type Faq = { q: string; a: string };

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

// "10:00 AM" -> "10:00", "8:00 PM" -> "20:00" (schema.org wants 24h, no AM/PM).
function to24h(time: string): string {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return time;
  let [, hourStr, minute, period] = match;
  let hour = parseInt(hourStr, 10) % 12;
  if (period.toUpperCase() === "PM") hour += 12;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

// "Monday – Sunday" -> the 7 schema.org day URLs; "Sunday" -> just the one.
function expandDays(days: string): string[] {
  const parts = days.split(/[–-]/).map((s) => s.trim());
  const names =
    parts.length === 1
      ? [parts[0]]
      : (() => {
          const s = WEEK_MON_FIRST.indexOf(parts[0]);
          const e = WEEK_MON_FIRST.indexOf(parts[1]);
          if (s === -1 || e === -1) return WEEK_MON_FIRST;
          return s <= e
            ? WEEK_MON_FIRST.slice(s, e + 1)
            : [...WEEK_MON_FIRST.slice(s), ...WEEK_MON_FIRST.slice(0, e + 1)];
        })();
  return names.map((name) => `https://schema.org/${name}`);
}

export function dentistJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${siteUrl}/#clinic`,
    name: clinic.name,
    description: clinic.positioning,
    image: `${siteUrl}/opengraph-image`,
    telephone: clinic.phone,
    email: clinic.email,
    url: siteUrl,
    priceRange: "₹₹",
    areaServed: clinic.address.locality,
    medicalSpecialty: "Dentistry",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.geo.lat,
      longitude: clinic.geo.lng,
    },
    openingHoursSpecification: clinic.hours.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: expandDays(row.days),
      opens: to24h(row.open),
      closes: to24h(row.close),
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.googleRating.value,
      reviewCount: clinic.googleRating.count,
    },
  });
}

export function medicalProcedureJsonLd(service: Service): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    description: service.oneLiner,
    procedureType:
      service.category === "surgical"
        ? "https://schema.org/SurgicalProcedure"
        : "https://schema.org/NoninvasiveProcedure",
    howPerformed: service.process.map((step) => step.detail).join(" "),
    followup: service.aftercare.join(" "),
    preparation: service.problem,
    bodyLocation: "Teeth",
    provider: {
      "@type": "Dentist",
      name: clinic.name,
      url: siteUrl,
    },
  });
}

export function faqPageJsonLd(items: Faq[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  });
}

export function personJsonLd(doctor: Doctor): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: doctor.name,
    jobTitle: doctor.role,
    description: doctor.bio.split("\n\n")[0],
    hasCredential: doctor.qualifications,
    knowsLanguage: doctor.languages,
    image: `${siteUrl}${doctor.photo}`,
    worksFor: {
      "@type": "Dentist",
      name: clinic.name,
      url: siteUrl,
    },
  });
}

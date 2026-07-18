// Per-route SEO copy for `metadata` exports (§9.2). Title pattern:
// "⟨Page⟩ in ⟨Locality⟩ | ⟨Clinic Name⟩", 50–60 chars. Descriptions are
// 140–160 chars. `/services/[slug]` titles/descriptions are generated
// dynamically in that route's generateMetadata from content/services.ts
// instead, since they vary per treatment.

export type RouteSeo = { title: string; description: string };

export const seo = {
  home: {
    title: "Dentist in DLF Phase 2, Gurugram | Clivia Dental Clinic",
    description:
      "Four specialist dentists in DLF Phase 2, Gurugram. Written price ranges, sterilised instruments opened in front of you, and same-day slots for pain, every day.",
  },
  services: {
    title: "Dental Treatments in DLF Phase 2 | Clivia Dental Clinic",
    description:
      "All 12 treatments at Clivia Dental Clinic in DLF Phase 2, Gurugram — root canals, implants, braces and whitening, each with a written price range and details.",
  },
  about: {
    title: "Meet Our Dentists in DLF Phase 2 | Clivia Dental Clinic",
    description:
      "Meet the four dentists at Clivia Dental Clinic in DLF Phase 2, Gurugram, read our sterilisation protocol, and see inside the clinic before you book a visit.",
  },
  pricing: {
    title: "Treatment Costs in DLF Phase 2 | Clivia Dental Clinic",
    description:
      "Written price ranges for every treatment at Clivia Dental Clinic in DLF Phase 2, Gurugram — what's included, what costs extra, and what decides your final cost.",
  },
  contact: {
    title: "Contact Us in DLF Phase 2, Gurugram | Clivia Dental Clinic",
    description:
      "Address, map, opening hours and an appointment form for Clivia Dental Clinic in DLF Phase 2, Gurugram. Call, WhatsApp, or request a slot online, any day.",
  },
  book: {
    title: "Book an Appointment in DLF Phase 2 | Clivia Dental Clinic",
    description:
      "Request an appointment at Clivia Dental Clinic in DLF Phase 2, Gurugram in under a minute. No payment needed to book — we confirm on WhatsApp or by phone.",
  },
  thankYou: {
    title: "Appointment Request Received | Clivia Dental Clinic",
    description:
      "Your appointment request at Clivia Dental Clinic has been received. We confirm every booking on WhatsApp or by phone, usually within a couple of hours.",
  },
  privacy: {
    title: "Privacy Policy | Clivia Dental Clinic, DLF Phase 2",
    description:
      "How Clivia Dental Clinic collects, uses and protects the information you share through our appointment form, website analytics, and WhatsApp enquiries.",
  },
  notFound: {
    title: "Page Not Found in DLF Phase 2 | Clivia Dental Clinic",
    description:
      "The page you were looking for doesn't exist. Find treatments, pricing and contact details for Clivia Dental Clinic in DLF Phase 2, Gurugram from our home page.",
  },
} satisfies Record<string, RouteSeo>;

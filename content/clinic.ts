// Clinic-level facts and contact details (SPEC §4.1).
// Single source of truth — every page reads from here, never hardcodes.
// Items marked "placeholder" are plausible stand-ins for unconfirmed §13
// client inputs; confirm with the clinic before launch.

export type Clinic = {
  name: string;
  tagline: string; // max 60 chars
  positioning: string; // one sentence, max 140 chars
  phone: string; // "+91XXXXXXXXXX"
  phoneDisplay: string; // "+91 XXXXX XXXXX"
  whatsapp: string; // digits only, no +
  email: string;
  address: {
    line1: string;
    line2: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
  };
  geo: { lat: number; lng: number };
  mapsUrl: string;
  mapsEmbedUrl: string;
  hours: Array<{ days: string; open: string; close: string }>;
  emergencyNote: string;
  established: string; // year
  social: { instagram?: string; facebook?: string; practo?: string };
};

export const clinic: Clinic = {
  name: "Clivia Dental Clinic",
  tagline: "Straightforward dental care in DLF Phase 2, Gurugram",
  positioning:
    "A four-doctor clinic in DLF Phase 2 that publishes its prices, explains every step, and keeps same-day slots for people in pain.",
  phone: "+919625722542",
  phoneDisplay: "+91 96257 22542",
  whatsapp: "919625722542",
  // Placeholder — clinic email not yet confirmed.
  email: "hello@cliviadental.in",
  address: {
    line1: "5, N-12 Rd",
    line2: "DLF Phase 2, Sector 25",
    locality: "DLF Phase 2",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122002",
  },
  // Placeholder pin near DLF Phase 2 — replace with the exact Google Maps pin.
  geo: { lat: 28.4889, lng: 77.0926 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Clivia+Dental+Clinic+DLF+Phase+2+Gurugram",
  mapsEmbedUrl: "https://www.google.com/maps?q=28.4889,77.0926&z=16&output=embed",
  hours: [{ days: "Monday – Sunday", open: "10:00 AM", close: "8:00 PM" }],
  emergencyNote:
    "In pain outside these hours? Call us. We keep same-day slots for dental emergencies.",
  // Placeholder — founding year not yet confirmed.
  established: "2012",
  social: {
    // Placeholders — confirm live profile URLs with the clinic.
    instagram: "https://www.instagram.com/cliviadentalclinic",
    practo: "https://www.practo.com/gurgaon/clinic/clivia-dental-clinic",
  },
};

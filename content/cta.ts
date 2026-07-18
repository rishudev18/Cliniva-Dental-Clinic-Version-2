// Default copy for the booking CTA band (§7.1 sec 9), reused as-is on the
// service detail, about, and pricing pages (§7.3/§7.4/§7.5) since the spec
// gives each of them "a booking CTA band," not distinct band copy per page.
// Service pages still get a treatment-specific WhatsApp message and Book
// link — see CtaBand's `whatsappServiceName` / `bookHref` props.

export const cta = {
  heading: "Book your appointment",
  body: "Same-day slots for pain, and a written price range before you agree to treatment.",
};

// Patient testimonials (SPEC §4.4). 6–8 entries, text max 180 chars.
// Plausible placeholders — replace with real quoted reviews (with consent)
// from the clinic's Google and Practo profiles before launch.

export type Testimonial = {
  name: string;
  initials: string;
  treatment: string;
  rating: number; // out of 5
  text: string; // max 180 chars
  source: "Google" | "Practo";
};

export const testimonials: Testimonial[] = [
  {
    name: "Priya S.",
    initials: "PS",
    treatment: "Root canal",
    rating: 5,
    text: "Came in at 8 pm with a throbbing molar. Dr. Chawla showed me the X-ray, explained the cost before starting, and finished the root canal in two visits. No surprises.",
    source: "Google",
  },
  {
    name: "Rohit M.",
    initials: "RM",
    treatment: "Dental implant",
    rating: 5,
    text: "I compared three clinics for an implant. Clivia was the only one that gave me a written price range upfront. Dr. Mukherjee did the whole thing exactly as quoted.",
    source: "Google",
  },
  {
    name: "Kavita A.",
    initials: "KA",
    treatment: "Braces",
    rating: 5,
    text: "My daughter has had her braces adjusted here every month for a year. Same doctor every visit, appointments run on time, and they explain her progress at each sitting.",
    source: "Practo",
  },
  {
    name: "Manish T.",
    initials: "MT",
    treatment: "Scaling & polishing",
    rating: 4,
    text: "Clean, organised clinic. The hygiene routine is visible — sealed instruments opened in front of you. Cleaning was thorough, though I did wait about 15 minutes.",
    source: "Google",
  },
  {
    name: "Farah K.",
    initials: "FK",
    treatment: "Teeth whitening",
    rating: 5,
    text: "They were honest that whitening would not fix my one discoloured tooth and suggested a veneer instead of selling me the pricier package. That honesty won me over.",
    source: "Practo",
  },
  {
    name: "Suresh B.",
    initials: "SB",
    treatment: "Dentures",
    rating: 5,
    text: "Got full dentures for my father, age 78. Dr. Mukherjee adjusted them over three visits until eating was comfortable. Patient, unhurried care for an elderly man.",
    source: "Google",
  },
  {
    name: "Ananya D.",
    initials: "AD",
    treatment: "Wisdom tooth removal",
    rating: 5,
    text: "Was dreading my impacted wisdom tooth removal. The procedure took under an hour, they called the next morning to check on me, and the bill matched the estimate.",
    source: "Google",
  },
];

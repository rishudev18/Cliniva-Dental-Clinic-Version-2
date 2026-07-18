// Copy for the Cost Clarity Table and /pricing page (SPEC §5.5, §7.5).
// Not one of the six §4 files — added so this copy lives in /content per
// the hard rule that no copy is hardcoded in components.

export type Pricing = {
  rangeNote: string; // the short honest note above condensed tables (home, /services)
  introParagraphs: [string, string]; // the fuller 2-paragraph version, above the full table on /pricing
  included: string[]; // "What's included"
  extra: string[]; // "What costs extra"
  paymentNote: string;
  insuranceNote: string;
  noUpsellNote: string;
};

export const pricing: Pricing = {
  rangeNote:
    "These are ranges, not fixed prices, because teeth differ: a molar root canal takes longer than a front tooth, and a crown's price depends on its material. Before any treatment starts, you get an exact written quote — and it stays fixed once you approve it.",
  introParagraphs: [
    "Every price below is a range, not a fixed number, because no two teeth are the same job. A front-tooth filling takes less time than a molar root canal; a metal crown costs less than a zirconia one. Listing a single number for either would mean rounding up for the simple cases or losing money on the complex ones — so instead we tell you what decides where in the range your treatment falls, next to the range itself.",
    "None of this is a quote for your specific tooth. That comes after an examination, in writing, before you agree to anything — and once you approve it, that number does not move. What follows here is the same honest range we would tell a friend who asked what something costs before booking.",
  ],
  included: [
    "The consultation and examination",
    "Digital X-rays taken during treatment",
    "Local anaesthesia",
    "All materials used in the procedure itself",
    "Follow-up review visits for that treatment",
  ],
  extra: [
    "Medicines prescribed for home",
    "A crown after root canal treatment (priced separately, told upfront)",
    "Bone grafting before an implant, where genuinely needed",
    "Retainers after braces treatment",
    "Treatment of separate problems found during examination — never started without asking you",
  ],
  paymentNote:
    "We accept cash, UPI, and all major credit and debit cards. For treatments above ₹20,000 — implants, braces, full-mouth work — EMI is available through major cards; ask at the front desk before treatment begins.",
  insuranceNote:
    "Most dental treatment in India is paid directly, but many health policies reimburse it. We provide itemised bills, prescriptions and reports for your claim, and can confirm current cashless tie-ups on the phone before your visit.",
  noUpsellNote:
    "One commitment, plainly stated: we quote for the problem you came with. If we find something else during examination, we tell you, explain it, and leave the decision with you. No treatment is added to your plan without your explicit yes.",
};

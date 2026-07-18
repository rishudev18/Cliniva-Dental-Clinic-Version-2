// Home page copy that isn't modelled elsewhere in Section 4 (SPEC §7.1).
// Section headings whose wording is fixed or purely structural (e.g. the
// literal `What treatment actually costs` h2, "What patients say") stay
// inline in the page component, matching the precedent set by
// CostClarityTable's "What's included" / "What costs extra" headings.
// Only the authored, business-specific copy lives here.

export type Differentiator = { icon: string; title: string; body: string };

export const home = {
  hero: {
    // Benefit statement, not the clinic name (§7.1).
    headline: "Transform your smile. Transform your confidence.",
    lead: "Four specialist doctors, sterilised instruments opened in front of you, and a written price range before any treatment starts. Same-day appointments for pain, seven days a week.",
    microTrust: ["Same-day appointments", "Digital X-ray", "Sterilised, sealed instruments"] as [
      string,
      string,
      string,
    ],
  },
  // §7.1 section 2, added post-launch. Eyebrow ("About us") and the h2
  // template (locality-interpolated) are structural/spec-fixed and stay
  // inline in page.tsx, matching the precedent set by the hero's own
  // eyebrow/heading. "Est. ⟨year⟩" is likewise built inline from
  // clinic.established (single source of truth) rather than duplicated
  // here — quickFacts holds only the two authored, non-derived facts.
  aboutTeaser: {
    body: "Clivia Dental Clinic has treated families in DLF Phase 2 since 2012. Four specialist doctors work under one roof, each focused on their own area, so your case goes to someone trained specifically for it rather than a single generalist handling everything.",
    quickFacts: ["4 specialist dentists", "Digital X-ray on site"] as [string, string],
  },
  differentiators: [
    {
      icon: "ShieldCheck",
      title: "Sterilised, sealed instruments",
      body: "Every instrument is autoclaved and sealed in a pouch that is opened in front of you. Needles, gloves and suction tips are single-use and discarded after each patient.",
    },
    {
      icon: "ScanLine",
      title: "Digital X-ray and intraoral camera",
      body: "A digital X-ray shows the problem in seconds, at a fraction of the radiation of older film. The intraoral camera lets you see what the doctor sees, on screen, before any treatment is agreed.",
    },
    {
      icon: "Receipt",
      title: "A written price range before treatment",
      body: "Every treatment plan comes with a cost range and the reason for it, in writing, before you agree to anything. The Cost Clarity table on this site lists all twelve treatments the same way.",
    },
    {
      icon: "UserCheck",
      title: "One doctor, start to finish",
      body: "The doctor who examines you is the one who treats you and reviews your progress at every visit. Four specialists cover different needs, but your case does not change hands.",
    },
  ] satisfies Differentiator[],
  teamIntro: "Four specialist doctors, each seeing their own patients from first visit to last.",
};

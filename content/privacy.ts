// Copy for /privacy (SPEC §3.1, P1 route — not detailed in §7, but linked
// from the footer on every page since Step 4, so it needs to exist and say
// something accurate rather than 404). Plain-language, scoped to what the
// site actually does: the appointment form (§8.1) and optional GA4
// analytics (§11). Not a substitute for a lawyer's review before launch —
// flagging that the way every other §13 placeholder is flagged.

export type PrivacySection = { heading: string; body: string };

export const privacy = {
  lead: "This page explains what information Clivia Dental Clinic collects through this website, why, and what you can do about it.",
  // Placeholder — set to the date this policy is actually reviewed and published.
  lastUpdated: "18 July 2026",
  sections: [
    {
      heading: "Information we collect",
      body: "When you use the appointment form, we collect your name, phone number, and — only if you choose to fill them in — your preferred treatment, day, time, and a message. We do not collect your email address anywhere on this site. We do not use tracking cookies to build an advertising profile of you.",
    },
    {
      heading: "How we use it",
      body: "Your appointment request is sent directly to the clinic's front desk by email so a team member can review it and contact you on the phone number you gave, by call or WhatsApp, to confirm a time. We do not sell, rent, or share your appointment details with anyone outside the clinic.",
    },
    {
      heading: "Analytics",
      body: "We may use Google Analytics to understand which pages visitors find useful, in aggregate. This does not include anything you type into the appointment form. You can opt out of Google Analytics tracking using a browser extension such as Google's own opt-out add-on.",
    },
    {
      heading: "Third-party services",
      body: "We use Resend to deliver appointment-request emails, and WhatsApp to receive messages if you contact us that way. Each of these services processes the information you send them under their own privacy policy, not ours.",
    },
    {
      heading: "How long we keep it",
      body: "We keep appointment requests and the contact details in them for as long as needed to provide dental care and meet our record-keeping obligations, and delete or anonymise them when that need has passed.",
    },
    {
      heading: "Your rights",
      body: "You can ask us what information we hold about you, ask us to correct it, or ask us to delete it, by calling the clinic or writing to the email address below. We will respond within a reasonable time.",
    },
    {
      heading: "Changes to this policy",
      body: "If how we handle your information changes, we will update this page and change the date at the top of it.",
    },
  ] satisfies PrivacySection[],
};

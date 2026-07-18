// General clinic FAQs (SPEC §4.5) — 10 questions.
// Required topics covered: consultation cost, pain, insurance/cashless,
// first visit, emergency availability, sterilisation, EMI, walk-in vs
// appointment.

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much does a consultation cost?",
    a: "A consultation and check-up costs ₹300–₹500, depending on whether an X-ray is needed. Before any treatment starts, you get the full cost in writing — the consultation fee is adjusted against it if you go ahead.",
  },
  {
    q: "Will my treatment hurt?",
    a: "Most procedures are done under local anaesthetic, so you feel pressure but not pain during treatment. Some soreness for a day or two afterwards is normal, and we tell you beforehand exactly what to expect for your specific procedure.",
  },
  {
    q: "What happens on my first visit?",
    a: "A doctor examines your teeth and gums, takes an X-ray if needed, and explains what they find. You leave with a written treatment plan and its cost range. If nothing needs treatment, we say so — the visit ends there.",
  },
  {
    q: "Do you accept insurance or cashless payment?",
    a: "Most dental treatment in India is paid directly, but many health policies reimburse it. We provide itemised bills, prescriptions and reports for your claim. Ask us on the phone about current cashless tie-ups before your visit.",
  },
  {
    q: "Can I pay in EMIs?",
    a: "Yes, for treatments above ₹20,000 — implants, braces and full-mouth work — we support EMI through major credit and debit cards. Ask at the front desk for the current options before treatment begins.",
  },
  {
    q: "What if I have a dental emergency?",
    a: "Call us. We keep same-day slots for emergencies — severe pain, swelling, a broken tooth, or a knocked-out tooth. The clinic is open 10 AM to 8 PM every day of the week, including Sundays.",
  },
  {
    q: "How do you sterilise your instruments?",
    a: "Every instrument is cleaned in an ultrasonic bath, sealed in a pouch, and autoclaved under pressure — the pouch is opened in front of you. Needles, gloves, suction tips and cups are single-use and discarded after every patient.",
  },
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "Walk-ins are welcome any day between 10 AM and 8 PM, but booked patients are seen first. Booking on WhatsApp takes under a minute and means you are not waiting with a toothache.",
  },
  {
    q: "How often should I get my teeth cleaned?",
    a: "Every six to twelve months for most adults. If your gums bleed, you smoke, or you have diabetes, the shorter end of that range is safer. A cleaning visit takes about 30–45 minutes.",
  },
  {
    q: "Do you treat children?",
    a: "Yes, from around age 3. First visits are kept short and pressure-free so the child leaves comfortable, and we handle milk-teeth fillings, pulp treatment and habit checks. See the kids' dentistry page for details.",
  },
];

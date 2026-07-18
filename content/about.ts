// Copy for /about (SPEC §7.4) that isn't modelled elsewhere.

export const about = {
  lead: "Four dentists, one clinic, and a straightforward way of explaining what your teeth actually need.",
  story: [
    "Clivia Dental Clinic opened in DLF Phase 2, Gurugram, in 2012 with a simple aim: explain every treatment in plain language before it starts, and put a real price range next to it. That has not changed as the clinic has grown from one doctor to four.",
    "Each of our four doctors treats their own patients from the first visit through to review, rather than handing cases between whoever is free that day. Between them they cover general dentistry, root canals, prosthodontics, orthodontics and oral surgery, so most people never need to be referred elsewhere.",
    "We are a five-minute walk from the Sector 25 market in DLF Phase 2, and we keep same-day slots open every day of the week for anyone in pain.",
  ],
  sterilisation: {
    lead: "This is the part of a dental visit patients notice least and should trust most. Here is exactly what happens between patients.",
    points: [
      {
        title: "Autoclave sterilisation",
        body: "Every reusable instrument is cleaned, packed into a sealed pouch, and run through a steam autoclave that reaches sterilising temperature and pressure. Pouches are opened in front of you at the start of your appointment, not before.",
      },
      {
        title: "Single-use items, used once",
        body: "Needles, gloves, suction tips, and anaesthetic cartridges are single-use. Each is opened at your chairside and discarded immediately after your appointment — never reused, never rinsed and reused.",
      },
      {
        title: "Surface disinfection between patients",
        body: "The dental chair, light, tray, and every surface within reach of a patient are wiped down with a hospital-grade disinfectant after every single appointment, before the next patient is seated.",
      },
      {
        title: "Documented disposal",
        body: "Sharps and biomedical waste go into colour-coded containers and are collected by a licensed biomedical waste handler, as required under Indian biomedical waste rules — not into ordinary bins.",
      },
    ],
  },
  // Placeholder — no facility photos supplied yet (§13); labelled placeholders
  // at a consistent aspect ratio until real photos exist.
  facilityPhotos: [
    "Reception",
    "Waiting area",
    "Treatment room",
    "Sterilisation area",
    "Digital X-ray room",
    "Clinic exterior",
  ],
};

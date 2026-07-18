// All 12 treatments (SPEC §4.2): 6 primary + 6 secondary.
// Price ranges are plausible Gurugram placeholders — replace with the
// clinic's confirmed ranges before launch. `priceNote` (what determines
// the range) is required by the Cost Clarity Table rows (SPEC §5.5).
// `description` holds two paragraphs separated by \n\n.

export type ServiceCategory = "general" | "cosmetic" | "surgical" | "preventive";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  primary: boolean; // shown on home + nav dropdown
  icon: string; // lucide icon name
  oneLiner: string; // max 90 chars, used on cards
  problem: string; // "You have this if..." — 2 sentences
  description: string; // 2 paragraphs
  process: Array<{ step: string; detail: string }>; // 3–5 steps
  duration: string;
  sittings: string;
  painLevel: "Minimal" | "Mild" | "Moderate";
  anesthesia: string;
  priceRange: { min: number; max: number; unit: string };
  priceNote: string; // what determines the range — shown beside the price
  aftercare: string[]; // 3–5 bullets
  faqs: Array<{ q: string; a: string }>; // 3–4 per service
};

export const categoryLabels: Record<ServiceCategory, string> = {
  general: "General & restorative",
  cosmetic: "Cosmetic & orthodontic",
  surgical: "Surgical",
  preventive: "Preventive & family",
};

export const categoryOrder: ServiceCategory[] = [
  "general",
  "cosmetic",
  "surgical",
  "preventive",
];

export const services: Service[] = [
  // ── Primary ──────────────────────────────────────────────────────────
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    shortName: "Root Canal",
    category: "general",
    primary: true,
    icon: "ShieldCheck",
    oneLiner: "Save an infected tooth instead of pulling it, usually in one or two visits.",
    problem:
      "A tooth that throbs at night, reacts sharply to hot or cold, or hurts when you bite usually means the nerve inside is infected. A root canal clears that infection so the tooth can stay.",
    description:
      "A root canal removes the infected nerve tissue from inside the tooth, cleans and disinfects the canals, and seals them so bacteria cannot return. The tooth stays in your mouth and keeps working; only the inflamed tissue inside it is gone. It is the standard alternative to extraction for a deeply decayed or injured tooth.\n\nAt Clivia, root canals are planned from a digital X-ray and done under local anaesthetic with rubber-dam isolation, which keeps the tooth dry and the treatment sterile. Most cases finish in one or two sittings. A crown is usually advised afterwards, because a root-canal-treated tooth is more brittle than a live one — we tell you upfront if yours will need it and what that adds to the cost.",
    process: [
      { step: "Diagnosis", detail: "A digital X-ray confirms the infection and shows the shape of the root canals." },
      { step: "Anaesthesia and isolation", detail: "The tooth is numbed and isolated with a rubber dam so the work stays sterile." },
      { step: "Cleaning the canals", detail: "The infected tissue is removed and each canal is cleaned, shaped and disinfected." },
      { step: "Filling and sealing", detail: "The canals are filled with an inert material and the tooth is sealed." },
      { step: "Crown (if advised)", detail: "A crown is placed in a later visit to protect the treated tooth under chewing load." },
    ],
    duration: "45–60 minutes per sitting",
    sittings: "1–2 visits",
    painLevel: "Mild",
    anesthesia: "Local anaesthetic",
    priceRange: { min: 4000, max: 9000, unit: "per tooth" },
    priceNote: "Front teeth have one canal; molars have three or four. More canals means more time and a higher cost.",
    aftercare: [
      "Avoid chewing on the treated side until the numbness wears off.",
      "Mild soreness for 2–3 days is normal; the prescribed painkiller covers it.",
      "Do not skip the crown appointment if one was advised — the tooth is brittle without it.",
      "Brush and floss the treated tooth normally.",
      "Call us if pain increases after the third day instead of fading.",
    ],
    faqs: [
      { q: "Does a root canal hurt?", a: "The procedure itself is done under local anaesthetic, so you feel pressure but not pain. The days before treatment — when the nerve is inflamed — are usually the painful part." },
      { q: "Can the tooth be saved with just a filling instead?", a: "If decay has reached the nerve, a filling will trap the infection inside. The X-ray tells us clearly which side of that line your tooth is on, and we show it to you." },
      { q: "Do I really need a crown afterwards?", a: "For molars, almost always — they take heavy chewing force and crack without protection. For front teeth, sometimes a filling is enough. We advise per tooth, not by default." },
      { q: "How long does a root-canal-treated tooth last?", a: "With a proper seal and crown, many last decades. The treated tooth still needs the same brushing and check-ups as the rest." },
    ],
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    shortName: "Implants",
    category: "surgical",
    primary: true,
    icon: "Anchor",
    oneLiner: "A fixed replacement tooth anchored in the jaw — the closest option to a natural tooth.",
    problem:
      "You have a missing tooth, or one that is about to be extracted, and you want a fixed replacement that does not involve grinding the neighbouring teeth. Implants also slow the bone loss that follows an extraction.",
    description:
      "A dental implant is a small titanium post placed in the jawbone where the tooth root used to be. Over three to six months the bone bonds to it, and a crown is then fixed on top. The result is a tooth that is brushed, used and cleaned like the others — no removable plate, no support taken from adjacent teeth.\n\nImplant work at Clivia is handled by our prosthodontist from planning to final crown. We measure bone depth on X-ray before quoting, so the price you are given includes everything we can foresee — including a bone graft if one is genuinely needed, and not if it is not.",
    process: [
      { step: "Assessment", detail: "X-rays and measurements confirm there is enough bone and rule out gum infection." },
      { step: "Implant placement", detail: "The titanium post is placed in the jaw under local anaesthetic in a single sitting." },
      { step: "Healing period", detail: "Over 3–6 months the bone fuses to the implant. A temporary tooth can cover the gap." },
      { step: "Crown fitting", detail: "An impression is taken and the final crown is fixed onto the implant." },
    ],
    duration: "60–90 minutes for placement",
    sittings: "3–4 visits over 3–6 months",
    painLevel: "Mild",
    anesthesia: "Local anaesthetic",
    priceRange: { min: 25000, max: 45000, unit: "per implant" },
    priceNote: "The implant brand, the crown material on top, and whether a bone graft is needed set the final figure.",
    aftercare: [
      "Bite on the gauze for an hour and eat soft, cool food on day one.",
      "Do not smoke during the healing period — it is the main cause of implant failure.",
      "Clean around the implant gently from day two with the brush we give you.",
      "Attend every review visit so healing is confirmed on schedule.",
    ],
    faqs: [
      { q: "Is getting an implant painful?", a: "Placement is done under local anaesthetic and most patients report less discomfort than an extraction. Two or three days of mild soreness afterwards is typical." },
      { q: "How long do implants last?", a: "The titanium post can last decades if the gum around it stays healthy. The crown on top may need replacement after 10–15 years of wear." },
      { q: "Am I too old for an implant?", a: "Age itself is not the limit — bone quality and general health are. We assess both on X-ray and medical history before advising either way." },
      { q: "Why do quotes for implants vary so much between clinics?", a: "Mostly the implant brand and crown material. We name the brand in your written quote so you can compare like for like." },
    ],
  },
  {
    slug: "braces-and-aligners",
    name: "Braces & Aligners",
    shortName: "Braces",
    category: "cosmetic",
    primary: true,
    icon: "Smile",
    oneLiner: "Straighten crowded or protruding teeth with metal, ceramic, or clear aligners.",
    problem:
      "Your teeth are crowded, gapped, or protrude enough that you avoid smiling in photos. Or a dentist has flagged a bite problem that is wearing your teeth unevenly.",
    description:
      "Orthodontic treatment moves teeth gradually into better positions using fixed braces or removable clear aligners. Beyond appearance, straight teeth are easier to clean and distribute chewing force evenly, which matters for how long they last. Treatment is planned and monitored personally by our orthodontist of seventeen years.\n\nThe options differ in visibility and price, not in the biology: metal braces are the most economical and the fastest for complex cases; ceramic braces trade some sturdiness for being less visible; clear aligners are nearly invisible and removable, at the highest price. At the first consultation you get a written plan with the realistic duration and total cost of each option that fits your case.",
    process: [
      { step: "Records", detail: "Photographs, an X-ray and impressions map exactly where each tooth is and where it should go." },
      { step: "Plan and options", detail: "The orthodontist presents the options that fit your case, with duration and full cost of each." },
      { step: "Fitting", detail: "Braces are bonded, or your first aligner set is fitted and checked." },
      { step: "Adjustments", detail: "A visit every 4–6 weeks keeps the movement on track. Missed visits extend the treatment." },
      { step: "Retainers", detail: "After the braces come off, retainers hold the new position while the bone settles." },
    ],
    duration: "30–45 minutes per adjustment",
    sittings: "Monthly visits for 12–24 months",
    painLevel: "Mild",
    anesthesia: "None needed",
    priceRange: { min: 30000, max: 120000, unit: "full treatment" },
    priceNote: "Metal braces sit at the lower end; ceramic and clear aligners at the upper. Complexity adds months, not hidden fees.",
    aftercare: [
      "Expect pressure and tenderness for 3–4 days after each adjustment.",
      "Avoid hard and sticky food that can break brackets — a broken bracket adds a visit.",
      "Clean around brackets after every meal with the brushes we provide.",
      "Wear retainers exactly as prescribed after treatment ends, or the teeth drift back.",
    ],
    faqs: [
      { q: "Am I too old for braces?", a: "No. Teeth move at any age if the gums and bone are healthy. Roughly a third of our orthodontic patients are adults." },
      { q: "How long will I need to wear braces?", a: "Most cases take 12 to 24 months. The orthodontist gives you a realistic estimate for your case at the first consultation — in writing." },
      { q: "Braces or aligners — which should I choose?", a: "Aligners suit mild to moderate cases and cost more; braces handle everything and cost less. We tell you honestly whether your case is one aligners can finish." },
      { q: "Do braces damage the teeth?", a: "The brackets do not, but poor cleaning around them can. We show you the routine at fitting and check cleaning at every adjustment visit." },
    ],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    shortName: "Whitening",
    category: "cosmetic",
    primary: true,
    icon: "Sparkles",
    oneLiner: "One-sitting, in-clinic whitening for tea, coffee, and age-related staining.",
    problem:
      "Your teeth have yellowed from tea, coffee, tobacco, or simply with age, and brushing no longer makes a difference. Polishing at a salon or with home kits has stopped helping.",
    description:
      "In-clinic whitening uses a dentist-strength peroxide gel, applied with the gums shielded, to lighten the tooth enamel itself — not just the surface stains a polish removes. A single sitting typically lightens teeth by several shades; the exact result depends on the cause and depth of the discolouration, which we assess honestly before you commit.\n\nWhitening only works on natural enamel. Crowns, veneers and fillings do not change colour, and a single dead or root-canal-treated tooth needs a different approach — we check for all of this first and will tell you plainly if whitening is not the right tool for your case.",
    process: [
      { step: "Assessment and cleaning", detail: "We confirm whitening will work for your discolouration and remove surface deposits first." },
      { step: "Gum protection", detail: "A barrier gel shields your gums so the whitening gel touches only enamel." },
      { step: "Whitening cycles", detail: "The gel is applied in 2–3 timed cycles of 15 minutes, with the shade checked between cycles." },
      { step: "Shade check and advice", detail: "Final shade is compared against the starting one, and you get the aftercare rules." },
    ],
    duration: "60–90 minutes",
    sittings: "1 visit",
    painLevel: "Minimal",
    anesthesia: "None needed",
    priceRange: { min: 8000, max: 15000, unit: "full mouth" },
    priceNote: "Depends on the depth of staining and whether one session is enough or a second is advised.",
    aftercare: [
      "Avoid tea, coffee, red wine, turmeric-heavy food and smoking for 48 hours — the enamel restains fastest then.",
      "Some sensitivity to cold for a day or two is normal; use the desensitising paste we recommend.",
      "Brush twice daily with a non-abrasive paste to keep the shade longer.",
      "Expect the result to last 1–2 years depending on diet and smoking.",
    ],
    faqs: [
      { q: "How many shades lighter will my teeth get?", a: "Typically two to five shades in one sitting, depending on the cause of the staining. Yellowish stains respond best; greyish ones respond less. We assess yours before quoting." },
      { q: "Does whitening damage the enamel?", a: "Dentist-supervised whitening at correct concentrations does not soften or thin enamel. Temporary sensitivity is the only common side effect, and it settles within days." },
      { q: "Why not just use a home whitening kit?", a: "Over-the-counter kits use much weaker gel and unshielded trays. Results are slower and uneven, and gel on the gums can burn them. In-clinic treatment is stronger, faster and supervised." },
      { q: "Will my crowns and fillings whiten too?", a: "No — only natural enamel changes shade. If you have visible crowns or fillings, we discuss whether they will need replacement to match, before you start." },
    ],
  },
  {
    slug: "crowns-and-bridges",
    name: "Dental Crowns & Bridges",
    shortName: "Crowns & Bridges",
    category: "general",
    primary: true,
    icon: "Crown",
    oneLiner: "Caps and bridges that restore broken or root-canal-treated teeth to full use.",
    problem:
      "A tooth is broken, heavily filled, or brittle after a root canal. Or you have a missing tooth with sound neighbours on both sides that could support a bridge.",
    description:
      "A crown is a made-to-measure cap that covers a damaged tooth completely, restoring its shape and letting it take full chewing force again. A bridge uses crowns on the neighbouring teeth to hold a replacement tooth over a gap — a fixed alternative to a denture where an implant is not chosen. Both are made in a dental laboratory from an impression of your prepared tooth.\n\nThe material is the main decision: metal is strongest and cheapest but visible; porcelain-fused-to-metal balances the two; zirconia is strong and looks closest to a natural tooth. Our prosthodontist explains what each means for your specific tooth — including when the cheaper option is genuinely the sensible one — before anything is cut.",
    process: [
      { step: "Preparation", detail: "The tooth is shaped under local anaesthetic to make room for the crown." },
      { step: "Impression and shade", detail: "An impression and shade match go to the lab; a temporary crown covers the tooth meanwhile." },
      { step: "Fitting", detail: "The finished crown is checked for fit, bite and colour, then cemented permanently." },
    ],
    duration: "30–45 minutes per sitting",
    sittings: "2–3 visits",
    painLevel: "Minimal",
    anesthesia: "Local anaesthetic",
    priceRange: { min: 4000, max: 15000, unit: "per unit" },
    priceNote: "The material sets the price: metal at the lower end, porcelain-fused-to-metal in the middle, zirconia at the top.",
    aftercare: [
      "Avoid sticky and very hard food on the temporary crown — it is cemented lightly on purpose.",
      "Slight sensitivity after fitting settles within a week.",
      "Floss around the crown daily; the gum line under it still gets plaque.",
      "A night guard is advised if you grind your teeth — grinding shortens a crown's life.",
    ],
    faqs: [
      { q: "How long does a crown last?", a: "Typically 10–15 years, and often longer with good cleaning. The gum and tooth under the crown still need normal care and check-ups." },
      { q: "Which crown material should I pick?", a: "For back molars under heavy force, metal or zirconia. For visible front teeth, zirconia or porcelain. We recommend per tooth and give you the price of each in writing." },
      { q: "Bridge or implant for a missing tooth?", a: "A bridge is faster and cheaper but involves shaping the neighbouring teeth. An implant leaves neighbours untouched but costs more and takes months. We lay out both honestly for your case." },
      { q: "Does getting a crown hurt?", a: "Preparation is done under local anaesthetic. If the tooth already had a root canal, it has no live nerve so there is nothing to numb — you feel only vibration." },
    ],
  },
  {
    slug: "scaling-and-polishing",
    name: "Scaling & Polishing",
    shortName: "Cleaning",
    category: "preventive",
    primary: true,
    icon: "Brush",
    oneLiner: "Professional cleaning that removes the tartar a toothbrush cannot.",
    problem:
      "Your gums bleed when you brush, your breath turns stale by mid-day, or you can see yellow-brown deposits near the gum line. Tartar has built up past what brushing can remove.",
    description:
      "Scaling removes tartar — the hardened plaque that builds up on teeth and under the gum line no matter how well you brush. An ultrasonic scaler vibrates the deposits off without cutting the tooth, and polishing then smooths the enamel so new plaque struggles to stick. It is the single most cost-effective thing you can do for your gums.\n\nDone every six to twelve months, scaling keeps gum disease from getting started; done after years of build-up, it is the first step of gum treatment rather than a substitute for it. If we find deposits below the gum line that a standard cleaning cannot reach, we tell you before doing anything more.",
    process: [
      { step: "Examination", detail: "Gums and deposits are checked to confirm a standard cleaning is what you need." },
      { step: "Ultrasonic scaling", detail: "Tartar is vibrated off each tooth surface and along the gum line." },
      { step: "Polishing", detail: "A rotating cup and paste smooth the enamel and remove surface stains." },
    ],
    duration: "30–45 minutes",
    sittings: "1 visit",
    painLevel: "Minimal",
    anesthesia: "Usually none; available on request",
    priceRange: { min: 1000, max: 2500, unit: "full mouth" },
    priceNote: "More tartar takes more time. Years of build-up may need a second sitting, quoted before we start.",
    aftercare: [
      "Teeth may feel briefly sensitive to cold — it settles within a few days.",
      "Gums that bled during cleaning usually stop bleeding within a week of proper brushing.",
      "Keep a twice-daily brushing and once-daily flossing routine so the result lasts.",
      "Book the next cleaning in 6–12 months rather than waiting for symptoms.",
    ],
    faqs: [
      { q: "Does scaling loosen or damage the teeth?", a: "No. The looseness people notice was already there — tartar was splinting the teeth together. Removing it exposes the real state of the gums so they can heal firm again." },
      { q: "Why do my teeth feel gappy after cleaning?", a: "The spaces were filled with tartar. Once it is removed, the natural gaps reappear; the gum tightens back over the following weeks." },
      { q: "Is scaling the same as whitening?", a: "No. Scaling removes deposits and surface stains, so teeth look cleaner and often somewhat brighter. Whitening chemically lightens the enamel itself — a separate treatment." },
      { q: "How often do I need it?", a: "Every 6–12 months for most adults. Smokers, diabetics and anyone with a history of gum disease should stay at the six-month end." },
    ],
  },
  // ── Secondary ────────────────────────────────────────────────────────
  {
    slug: "tooth-extraction",
    name: "Tooth Extraction",
    shortName: "Extraction",
    category: "surgical",
    primary: false,
    icon: "CircleMinus",
    oneLiner: "Careful removal of a tooth that cannot be saved, with a clear plan for what comes next.",
    problem:
      "A tooth is loose, broken below the gum line, or too decayed for a filling or root canal to rebuild. Keeping it would risk infection spreading to the teeth around it.",
    description:
      "Extraction is the last resort, not the default — if a tooth can reasonably be saved, we say so and price both options. When removal genuinely is the right call, it is a short procedure under local anaesthetic: the tooth is loosened and lifted out, the socket is cleaned, and bleeding is controlled before you leave the chair.\n\nJust as important is the conversation about the gap. A missing tooth lets neighbours drift and the opposing tooth over-erupt, so we discuss replacement — implant, bridge or denture — with honest prices before the extraction, not as an afterthought.",
    process: [
      { step: "X-ray and assessment", detail: "The root shape is checked and we confirm removal is genuinely the right option." },
      { step: "Anaesthesia", detail: "The area is fully numbed; we start only after confirming you feel nothing sharp." },
      { step: "Removal", detail: "The tooth is loosened and lifted out; you feel pressure, not pain." },
      { step: "Socket care", detail: "The socket is cleaned, gauze is placed, and you get written aftercare instructions." },
    ],
    duration: "20–40 minutes",
    sittings: "1 visit",
    painLevel: "Mild",
    anesthesia: "Local anaesthetic",
    priceRange: { min: 1000, max: 3500, unit: "per tooth" },
    priceNote: "A loose or fully visible tooth is simple; a broken or firmly rooted one takes more time and instruments.",
    aftercare: [
      "Bite firmly on the gauze for 45–60 minutes; a little oozing on day one is normal.",
      "Do not spit, rinse or use a straw for 24 hours — it dislodges the healing clot.",
      "Eat soft, cool food for two days and chew on the other side.",
      "No smoking for at least 72 hours; it is the main cause of painful dry socket.",
      "Call us if bleeding restarts heavily or pain worsens after day three.",
    ],
    faqs: [
      { q: "Does an extraction hurt?", a: "With proper local anaesthesia you feel pushing and pressure but not pain. Soreness afterwards is managed with an ordinary painkiller for a day or two." },
      { q: "Do I have to replace the extracted tooth?", a: "For back teeth, usually yes within a year — neighbours drift into the gap and the bite degrades. We explain the options and their costs before removing anything." },
      { q: "What is dry socket?", a: "A painful condition where the healing clot is lost from the socket, usually from smoking, spitting or straws in the first days. Following the aftercare list makes it rare." },
    ],
  },
  {
    slug: "wisdom-tooth-removal",
    name: "Wisdom Tooth Removal",
    shortName: "Wisdom Tooth",
    category: "surgical",
    primary: false,
    icon: "Bone",
    oneLiner: "Removal of painful or impacted wisdom teeth, surgical when needed.",
    problem:
      "Pain at the back of the jaw, a wisdom tooth coming in sideways, or repeated swelling and food trapping around a partly erupted tooth. An X-ray confirms whether removal is the answer.",
    description:
      "Wisdom teeth are the last molars, arriving in the late teens or twenties — often into a jaw with no room left for them. A wisdom tooth that erupts straight and cleanable can simply stay. One that is impacted (stuck against the next tooth), half-erupted under a flap of gum, or repeatedly infected is usually better removed before it damages its neighbour.\n\nA fully erupted wisdom tooth comes out like any other extraction. An impacted one needs a minor surgical procedure — lifting the gum, sometimes sectioning the tooth — done under local anaesthetic in a single visit. We show you your X-ray, explain which kind yours is, and quote accordingly before anything is scheduled.",
    process: [
      { step: "X-ray and plan", detail: "An X-ray shows the tooth's angle and depth, and whether simple or surgical removal is needed." },
      { step: "Anaesthesia", detail: "The area is fully numbed. For anxious patients we schedule extra time — no rushing." },
      { step: "Removal", detail: "The tooth is removed whole or in sections; stitches are placed if the gum was lifted." },
      { step: "Review", detail: "A follow-up visit checks healing and removes stitches if non-dissolving ones were used." },
    ],
    duration: "45–90 minutes",
    sittings: "1 visit + review",
    painLevel: "Moderate",
    anesthesia: "Local anaesthetic",
    priceRange: { min: 3000, max: 8000, unit: "per tooth" },
    priceNote: "An erupted tooth is a standard extraction; an impacted one needs minor surgery, which sets the higher end.",
    aftercare: [
      "Swelling peaks around day two — a cold pack in the first 24 hours keeps it down.",
      "Take the prescribed course fully, not just until the pain stops.",
      "Soft food and no straws, spitting or smoking for three days.",
      "Rinse gently with warm salt water from day two, especially after meals.",
      "Some jaw stiffness is normal for up to a week; call us if it worsens instead of easing.",
    ],
    faqs: [
      { q: "Do all wisdom teeth need removal?", a: "No. A straight, fully erupted wisdom tooth you can clean is fine to keep. We advise removal only when the X-ray and symptoms justify it." },
      { q: "How bad is the recovery?", a: "Expect two to three days of swelling and soreness managed with medication, and about a week of eating carefully. Most people work the next day for a simple removal." },
      { q: "Will you put me to sleep for it?", a: "Removal is done under local anaesthetic — you are awake but the area is completely numb. For complex cases needing general anaesthesia, we refer you to a hospital setup and say so upfront." },
    ],
  },
  {
    slug: "dentures",
    name: "Dentures",
    shortName: "Dentures",
    category: "general",
    primary: false,
    icon: "SmilePlus",
    oneLiner: "Removable full or partial sets, fitted and adjusted until they sit right.",
    problem:
      "You are missing several teeth or a full arch, and eating or speaking has become work. You want teeth back without surgery, at a predictable cost.",
    description:
      "Dentures replace missing teeth with a removable set: a full denture for a whole arch, or a partial denture that clips around your remaining teeth. Made well, they restore eating and speech and support the face; made carelessly, they slip and hurt — which is why fitting matters far more than the material brochure suggests.\n\nAt Clivia, dentures are made under our prosthodontist across several fitting stages, and the price includes the adjustment visits afterwards — new dentures always need two or three small refinements as your gums adapt. For patients who want more grip on a lower denture, we also explain implant-supported options and their honest costs.",
    process: [
      { step: "Impressions", detail: "Moulds of your gums and any remaining teeth are taken over two visits for accuracy." },
      { step: "Bite and try-in", detail: "A wax version is tried in your mouth to check fit, bite and appearance before final making." },
      { step: "Final fitting", detail: "The finished denture is fitted and you practise inserting and removing it." },
      { step: "Adjustments", detail: "Pressure spots that appear over the first weeks are relieved in short follow-up visits, included in the price." },
    ],
    duration: "30–45 minutes per sitting",
    sittings: "4–5 visits",
    painLevel: "Minimal",
    anesthesia: "None needed",
    priceRange: { min: 12000, max: 40000, unit: "per arch" },
    priceNote: "Basic acrylic sits at the lower end; flexible and cast-partial dentures, which fit lighter and last longer, at the top.",
    aftercare: [
      "Expect a practice period — speaking and chewing take one to two weeks to feel natural.",
      "Remove and rinse dentures after meals; brush them daily with a soft brush, not toothpaste.",
      "Keep them in water overnight; a dry denture warps.",
      "Come in for adjustment if a sore spot develops — do not file the denture yourself.",
    ],
    faqs: [
      { q: "How long do dentures last?", a: "Five to eight years typically. The denture wears slowly, and your gum ridge changes shape over time, so refitting or relining is eventually needed." },
      { q: "Will I be without teeth while they are made?", a: "No — for front teeth we arrange an immediate temporary denture so you are never without a smile while the final one is made." },
      { q: "Why does my new denture need adjustments?", a: "Gums compress unevenly under a new denture, creating pressure spots no impression can fully predict. Two or three short adjustment visits are normal and included." },
    ],
  },
  {
    slug: "kids-dentistry",
    name: "Kids' Dentistry",
    shortName: "Kids' Dentistry",
    category: "preventive",
    primary: false,
    icon: "Baby",
    oneLiner: "Gentle first visits, fillings, and habit checks for children from age 3.",
    problem:
      "Your child complains of a toothache, has visible dark spots on their milk teeth, or has never seen a dentist. Milk-teeth cavities spread faster than adult ones and are worth acting on early.",
    description:
      "Children's dentistry at Clivia covers first check-ups, cleanings, fluoride application, milk-teeth fillings and pulp treatment, and monitoring how the adult teeth are coming in. Milk teeth matter more than they get credit for: they hold space for the permanent teeth, and infection in them can damage the adult tooth forming underneath.\n\nThe first visit is deliberately short and treatment-free wherever possible — the child sits in the chair, meets the doctor, has a look and a count. A child whose first memory of the dentist is boredom rather than pain cooperates for life, and we protect that deliberately. Parents stay in the room throughout.",
    process: [
      { step: "Introduction visit", detail: "A short, pressure-free check-up and cleaning so the child gets comfortable with the chair." },
      { step: "Assessment", detail: "Teeth are checked for cavities and spacing; an X-ray only if genuinely needed." },
      { step: "Treatment in short sittings", detail: "Fillings or other work are split into short visits matched to the child's patience." },
      { step: "Prevention plan", detail: "Fluoride, sealants where useful, and a brushing routine the child will actually follow." },
    ],
    duration: "20–40 minutes",
    sittings: "1 visit for most treatments",
    painLevel: "Minimal",
    anesthesia: "Local anaesthetic where needed, with numbing gel first",
    priceRange: { min: 500, max: 3000, unit: "per visit" },
    priceNote: "A check-up and fluoride sit at the lower end; milk-teeth fillings and pulp treatment at the top.",
    aftercare: [
      "Keep the child off food for an hour after fluoride application.",
      "After a filling with anaesthesia, watch that they do not chew their numb cheek.",
      "Brush together twice a day — children under 8 cannot clean molars properly alone.",
      "Book a check-up every six months; small cavities in milk teeth grow quickly.",
    ],
    faqs: [
      { q: "At what age should my child first see a dentist?", a: "Around age 3 for a routine first visit, or earlier if you spot dark spots, holes, or complaints while eating. Early visits are short and mostly about familiarity." },
      { q: "Why treat milk teeth if they will fall out anyway?", a: "Because they hold space for the adult teeth and can pass infection to the permanent tooth developing underneath. Early loss also lets neighbouring teeth drift into the gap." },
      { q: "My child is terrified of dentists. How do you handle that?", a: "Slowly. The first visit involves no treatment unless there is pain, parents stay in the room, and we stop when the child needs a break. Trust first, treatment second." },
    ],
  },
  {
    slug: "gum-treatment",
    name: "Gum Treatment",
    shortName: "Gum Treatment",
    category: "preventive",
    primary: false,
    icon: "HeartPulse",
    oneLiner: "Treatment for bleeding gums and bad breath, from deep cleaning to gum surgery.",
    problem:
      "Gums that bleed, recede, or feel loose around the teeth, and breath that turns stale soon after brushing. Untreated gum disease is the most common reason adults lose otherwise healthy teeth.",
    description:
      "Gum disease starts as gingivitis — red, bleeding gums caused by plaque along the gum line — and, left alone, progresses to periodontitis, where the bone holding the teeth slowly dissolves. The disease causes no pain for years, which is exactly why it costs so many people their teeth. Bleeding while brushing is the early warning, not a normal thing to ignore.\n\nTreatment depends on the stage. Early disease reverses with a thorough scaling and better home care. Established disease needs deep cleaning (root planing) below the gum line, done comfortably under local anaesthetic over two to four visits. Advanced cases may need minor gum surgery, which we explain and price separately — never as a surprise mid-treatment.",
    process: [
      { step: "Gum assessment", detail: "Pocket depths around each tooth are measured to stage the disease accurately." },
      { step: "Scaling", detail: "Tartar above and along the gum line is removed with an ultrasonic scaler." },
      { step: "Root planing", detail: "Deposits below the gum line are cleaned from the root surfaces under local anaesthetic." },
      { step: "Review", detail: "Gums are re-measured after 4–6 weeks to confirm healing and decide if anything more is needed." },
    ],
    duration: "45–60 minutes per sitting",
    sittings: "1–4 visits by stage",
    painLevel: "Mild",
    anesthesia: "Local anaesthetic for deep cleaning",
    priceRange: { min: 2500, max: 15000, unit: "full mouth" },
    priceNote: "Stage decides the cost: a deep cleaning sits at the lower end, surgical treatment for advanced disease at the top.",
    aftercare: [
      "Gums may be tender for a few days after deep cleaning; warm salt-water rinses help.",
      "Brush along the gum line twice daily with the technique we demonstrate — this is half the treatment.",
      "Use the prescribed mouthwash for the stated period only, not indefinitely.",
      "Keep the review appointment; gum disease that is not re-measured quietly returns.",
    ],
    faqs: [
      { q: "My gums bleed when I brush. Is that serious?", a: "It is the earliest sign of gum disease, and the stage at which treatment is cheapest and fully effective. Bleeding gums are common, but they are not normal." },
      { q: "Can receded gums grow back?", a: "Lost gum height does not grow back on its own, but treatment stops further recession, and grafting can rebuild it in selected cases. We are honest about which applies to you." },
      { q: "Is gum disease linked to my general health?", a: "Yes — it runs both ways. Diabetes makes gum disease worse, and severe gum disease makes blood sugar harder to control. Smokers heal slower and lose more bone." },
    ],
  },
  {
    slug: "dental-fillings",
    name: "Dental Fillings",
    shortName: "Fillings",
    category: "general",
    primary: false,
    icon: "Layers",
    oneLiner: "Tooth-coloured fillings for cavities, done before they grow into root canals.",
    problem:
      "A visible hole or dark spot on a tooth, food catching in the same place every meal, or a twinge with sweets and cold water. Small cavities do not hurt — which is exactly when to fill them.",
    description:
      "A filling removes the decayed part of a tooth and rebuilds the lost structure with composite — a tooth-coloured material bonded directly to the enamel and shaped to your bite. Done early, it is a short, inexpensive visit; postponed, the same cavity grows towards the nerve until it needs a root canal at several times the cost.\n\nWe use composite rather than silver amalgam: it matches the tooth, needs less healthy tooth removed, and contains no mercury. Each filling is checked against your bite before you leave, because a filling that sits even slightly high aches within days.",
    process: [
      { step: "Decay removal", detail: "The decayed portion is removed; anaesthesia is used for deeper cavities." },
      { step: "Bonding and filling", detail: "The cavity is conditioned and composite is placed and set in thin layers." },
      { step: "Shaping and bite check", detail: "The filling is carved to your natural anatomy and checked against your bite." },
    ],
    duration: "30–45 minutes",
    sittings: "1 visit",
    painLevel: "Minimal",
    anesthesia: "Local anaesthetic for deep cavities",
    priceRange: { min: 1000, max: 3500, unit: "per tooth" },
    priceNote: "Size and depth of the cavity, and whether the tooth needs a protective liner under the filling.",
    aftercare: [
      "You can eat once the numbness wears off — composite sets fully in the chair.",
      "Brief sensitivity to cold near a deep filling settles over one to two weeks.",
      "If the filling feels high when you bite, come back — a two-minute adjustment fixes it.",
      "Floss the filled tooth daily; the margins of a filling are where new decay starts.",
    ],
    faqs: [
      { q: "How long does a filling last?", a: "Composite fillings typically last 5–10 years, longer with good hygiene. We check existing fillings at every routine visit and tell you when one is nearing replacement." },
      { q: "Will the filling be visible?", a: "No — composite is shade-matched to your tooth before placement. On front teeth, we layer shades so the repair disappears." },
      { q: "The tooth does not hurt. Why fill it now?", a: "Pain begins only when decay nears the nerve — at which point a filling is no longer enough. Filling the cavity now, while it is still small and silent, is what keeps it from becoming a root canal later." },
    ],
  },
];

export const primaryServices: Service[] = services.filter((s) => s.primary);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

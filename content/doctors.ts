// Doctor profiles (SPEC §4.3, client data from §13).
// Registration numbers are plausible placeholders — replace with real
// Dental Council numbers before launch. Photos are labelled placeholders
// until portraits are supplied.

export type Doctor = {
  slug: string;
  name: string;
  qualifications: string;
  role: string;
  experienceYears: number;
  specialities: string[]; // 2–4
  bio: string; // 2 paragraphs, separated by \n\n
  registration: string; // Dental Council reg. no.
  photo: string;
  languages: string[];
};

export const doctors: Doctor[] = [
  {
    slug: "dr-amit-chawla",
    name: "Dr. Amit Chawla",
    qualifications: "BDS, MDS (Oral Pathology & Oral Microbiology)",
    role: "Senior Dental Surgeon",
    experienceYears: 20,
    specialities: ["Diagnosis & treatment planning", "Root canal treatment", "Oral pathology"],
    bio: "Dr. Chawla has practised dentistry for twenty years, with postgraduate training in oral pathology — the study of what actually goes wrong inside teeth and gums. That background shapes how the clinic works: diagnosis first, treatment second. He reads every X-ray himself and will tell you plainly when a tooth can be saved and when it cannot.\n\nHe leads treatment planning at Clivia and handles complex root canals and long-standing infections that other clinics refer out. Patients mostly remember him for the explanations: he draws what he sees on the X-ray and walks you through the options, including the option of doing nothing.",
    registration: "A-10482, Haryana State Dental Council",
    photo: "/images/doctors/doc1_new.jpg",
    languages: ["English", "Hindi"],
  },
  {
    slug: "dr-sthitodhi-mukherjee",
    name: "Dr. Sthitodhi Mukherjee",
    qualifications: "BDS, MDS (Prosthodontics and Crown & Bridge)",
    role: "Prosthodontist",
    experienceYears: 12,
    specialities: ["Crowns & bridges", "Dental implants", "Dentures", "Smile design"],
    bio: "Dr. Mukherjee is a prosthodontist — a specialist in rebuilding and replacing teeth. Crowns, bridges, implants and dentures at Clivia go through him, from the first measurement to the final fit. His standard is simple: a replacement tooth should be something you stop noticing within a week.\n\nOver twelve years he has fitted everything from single crowns to full-arch rehabilitations. He is particular about materials and will explain exactly what the difference is between a metal, porcelain-fused and zirconia crown before you choose — including why the cheaper option is sometimes the right one.",
    registration: "A-23917, Haryana State Dental Council",
    photo: "/images/doctors/doc2_new.jpg",
    languages: ["English", "Hindi", "Bengali"],
  },
  {
    slug: "dr-amandeep-singh",
    name: "Dr. Amandeep Singh",
    qualifications: "BDS, MDS (Orthodontics and Dentofacial Orthopaedics)",
    role: "Orthodontist",
    experienceYears: 17,
    specialities: ["Braces", "Clear aligners", "Bite correction"],
    bio: "Dr. Singh is the clinic's orthodontist, with seventeen years of moving teeth into better positions. He treats children, teenagers and a growing number of adults who assumed braces were no longer an option for them. Metal braces, ceramic braces and clear aligners are all planned and monitored by him personally, visit to visit.\n\nHis first consultation is deliberately unhurried: photographs, measurements and a frank conversation about how long treatment will really take and what it will really cost. If a case does not need orthodontic treatment, he says so and sends you home.",
    registration: "A-15206, Haryana State Dental Council",
    photo: "/images/doctors/doc3_new.jpg",
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    slug: "dr-rishabh-mishra",
    name: "Dr. Rishabh Mishra",
    qualifications: "BDS",
    role: "Dental Surgeon",
    experienceYears: 3,
    specialities: ["General dentistry", "Fillings & extractions", "Teeth whitening"],
    bio: "Dr. Mishra handles much of the clinic's day-to-day dentistry: check-ups, cleanings, fillings, extractions and whitening. He is often the first doctor a new patient meets, and he sets the tone — no rushing, no jargon, and no treatment before you understand what it is for.\n\nHe has a particular interest in cosmetic dentistry and works alongside the senior specialists on larger cases, which means every treatment he does is backed by twenty years of in-house experience one door away.",
    registration: "A-41530, Haryana State Dental Council",
    photo: "/images/doctors/doc4_new.jpg",
    languages: ["English", "Hindi"],
  },
];

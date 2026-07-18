// SPEC §4.6 (added in the nav revision) — before/after treatment photos.
// No consented patient photos exist yet, so every entry here is a
// placeholder with consentObtained: false. Real entries (with real images
// and a signed consent record) get added later, one at a time, as the
// clinic supplies them.
//
// Hard rule (§4.6): a stray `consentObtained: true` added to this file by
// mistake must still not be enough to make an entry public — the render
// path is required to filter in code, not rely on data-file hygiene alone.
// getConsentedGalleryEntries() below is the one function any page may call
// to read this array; nothing else should import `galleryEntries` directly.

export type GalleryEntry = {
  id: string;
  treatmentSlug: string; // links back to a content/services.ts slug
  beforeImage: string;
  afterImage: string;
  caption: string; // no patient name unless separately consented to be named
  consentObtained: boolean; // MUST be true before an entry renders publicly
};

export const galleryEntries: GalleryEntry[] = [
  {
    id: "placeholder-1",
    treatmentSlug: "teeth-whitening",
    beforeImage: "",
    afterImage: "",
    caption: "Placeholder entry — awaiting patient consent before publishing.",
    consentObtained: false,
  },
  {
    id: "placeholder-2",
    treatmentSlug: "braces-and-aligners",
    beforeImage: "",
    afterImage: "",
    caption: "Placeholder entry — awaiting patient consent before publishing.",
    consentObtained: false,
  },
  {
    id: "placeholder-3",
    treatmentSlug: "crowns-and-bridges",
    beforeImage: "",
    afterImage: "",
    caption: "Placeholder entry — awaiting patient consent before publishing.",
    consentObtained: false,
  },
];

/** The only sanctioned read path for `galleryEntries` — always re-filters by consent, in code. */
export function getConsentedGalleryEntries(): GalleryEntry[] {
  return galleryEntries.filter((entry) => entry.consentObtained === true);
}

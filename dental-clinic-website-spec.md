# Dental Clinic Website — Build Specification

**Version:** 1.0
**Stack:** Next.js (App Router) + Tailwind CSS
**Intended use:** This document is the single source of truth for the build. Hand it to Claude Code as the project spec. Implement it exactly; do not invent sections, routes, or components that are not listed here.

---

## 0. How to use this spec

1. Fill in every `⟨TODO:⟩` marker in **Section 13** before starting the build. Everything else is already decided.
2. Build in the order given in **Section 12**. Do not jump ahead.
3. Check the finished build against **Section 14** before shipping.
4. If a requirement in this spec conflicts with a default habit (e.g. reaching for `"use client"`), the spec wins.

---

## 1. Project overview

### 1.1 What this is
A marketing and patient-acquisition website for a single-location dental clinic in Delhi NCR. It is not a patient portal, not an e-commerce site, and has no login.

### 1.2 Primary business goal
Convert a stranger who found the clinic on Google Search or Google Maps into a booked appointment enquiry, via WhatsApp or a form submission, in under 60 seconds from landing.

### 1.3 Secondary goals
- Rank for local intent searches (`dentist near me`, `root canal ⟨area⟩`, `dental clinic ⟨area⟩`).
- Establish credibility fast: qualifications, real photos, real reviews, transparent pricing.
- Remove the two biggest friction points for Indian dental patients: *"How much will this cost?"* and *"Will it hurt?"*

### 1.4 Target visitor
- 25–55, on an Android phone, on mobile data, in Delhi NCR.
- Often in mild-to-moderate pain or acting on a family member's behalf.
- Price-sensitive and comparison-shopping across 3–4 clinics.
- Reads English but scans, does not read long paragraphs.

**Design consequence:** mobile-first is not a nice-to-have. Build every section mobile-first, then scale up. Assume a 4G connection and a mid-range Android device.

### 1.5 Non-goals (do not build)
- Online payment or deposits
- User accounts, login, dashboards
- Live chat widget
- Blog CMS integration (the blog is out of scope in v1; articles route is reserved but not built)
- Multi-language / Hindi toggle (v2)

---

## 2. Tech stack and constraints

| Concern | Decision |
|---|---|
| Framework | Next.js 14+ / 15, **App Router** |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS. Design tokens defined in `tailwind.config.ts`, not as raw hex in JSX |
| Fonts | `next/font/google`, self-hosted at build. No external font CDN calls |
| Icons | `lucide-react` only |
| Animation | CSS transitions and `@keyframes` only. No Framer Motion, no GSAP |
| Forms | Native form handling via a Next.js **Server Action**. No react-hook-form, no Formik |
| Content | Local TypeScript data files under `/content`. No CMS, no database |
| Images | `next/image` everywhere. WebP. Explicit `width`/`height` |
| Deployment target | Vercel |
| Analytics | Google Analytics 4 via `@next/third-parties/google`, gated behind an env var |

### 2.1 Hard rendering rule
**Every page is a Server Component by default.** `"use client"` is permitted **only** on these components, and nowhere else:

- `MobileNav` (menu open/close state)
- `FaqAccordion` (expand/collapse state)
- `AppointmentForm` (form state + submission feedback)
- `StickyMobileCta` (scroll listener)

All page content — headings, service copy, doctor bios, testimonials, pricing, FAQ *text* — must be present in the server-rendered HTML. This is non-negotiable and is verified in Section 14.

### 2.2 Dependencies allowed
`next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `lucide-react`, `@next/third-parties`, `zod` (form validation), `resend` (transactional email). Nothing else without a stated reason.

---

## 3. Information architecture

### 3.1 Routes

| Route | Purpose | Priority |
|---|---|---|
| `/` | Home — full conversion path in one scroll | P0 |
| `/services` | Index of all treatments | P0 |
| `/services/[slug]` | Individual treatment detail page | P0 |
| `/about` | Clinic story, doctor profiles, credentials, facility | P0 |
| `/smile-gallery` | Before/after treatment photos of consenting patients | P0 |
| `/pricing` | Transparent treatment cost ranges (not in top nav — reachable via footer, CTA bands, service pages) | P0 |
| `/contact` | Address, map, hours, directions, form | P0 |
| `/book` | Dedicated appointment request page | P0 |
| `/thank-you` | Post-submission confirmation | P0 |
| `/privacy` | Privacy policy | P1 |
| `/404` | Custom not-found | P1 |

Reserved but **not built in v1**: `/articles`, `/articles/[slug]`.

### 3.2 Navigation

**Revision note (post-launch change, applied after Steps 1–13 were built):** nav restructured per client feedback. Order changed to lead with About before Services, Pricing removed from the top-level nav (page still exists, still linked from footer/CTA bands/service pages), and a new Smile Gallery item added.

**Header (desktop):** Logo · Home · About · Services (dropdown, lists 6 primary treatments) · Smile Gallery · Contact · `Book Appointment` (primary button)

**Header (mobile):** Logo · phone icon (tel: link) · hamburger → full-screen overlay menu, same item order as desktop

**Footer (4 columns, stacks to 1 on mobile):**
1. Clinic name, one-line positioning statement, address, `Get Directions` link
2. Treatments (links to 6 service pages)
3. Clinic — About, Smile Gallery, Pricing, Contact, Privacy
4. Hours table + phone + WhatsApp + email

Footer bottom bar: `© ⟨year⟩ ⟨Clinic Name⟩ · Website by ⟨Your Name⟩` with a `rel="nofollow"` link to your site.

---

## 4. Content model

Create these files under `/content`. Each exports a typed const. **All page content reads from these files** — no hardcoded copy inside components.

### 4.1 `/content/clinic.ts`
```ts
export const clinic = {
  name: string,
  tagline: string,              // max 60 chars
  positioning: string,          // one sentence, max 140 chars
  phone: string,                // "+91XXXXXXXXXX"
  phoneDisplay: string,         // "+91 XXXXX XXXXX"
  whatsapp: string,             // digits only, no +
  email: string,
  address: {
    line1: string, line2: string, locality: string,
    city: string, state: string, pincode: string,
  },
  geo: { lat: number, lng: number },
  mapsUrl: string,              // Google Maps share link
  mapsEmbedUrl: string,
  hours: Array<{ days: string, open: string, close: string }>,
  emergencyNote: string,
  established: string,          // year
  social: { instagram?: string, facebook?: string, practo?: string },
}
```

### 4.2 `/content/services.ts`
Array of 6 primary + 6 secondary services.

```ts
type Service = {
  slug: string,
  name: string,                 // "Root Canal Treatment"
  shortName: string,            // "Root Canal"
  category: 'general' | 'cosmetic' | 'surgical' | 'preventive',
  primary: boolean,             // shown on home + nav dropdown
  icon: string,                 // lucide icon name
  oneLiner: string,             // max 90 chars, used on cards
  problem: string,              // "You have this if..." — 2 sentences
  description: string,          // 2 paragraphs
  process: Array<{ step: string, detail: string }>,   // 3–5 steps
  duration: string,             // "45–60 minutes"
  sittings: string,             // "1–2 visits"
  painLevel: 'Minimal' | 'Mild' | 'Moderate',
  anesthesia: string,
  priceRange: { min: number, max: number, unit: string },
  aftercare: string[],          // 3–5 bullets
  faqs: Array<{ q: string, a: string }>,   // 3–4 per service
}
```

**The 6 primary services:** Root Canal Treatment · Dental Implants · Braces & Aligners · Teeth Whitening · Dental Crowns & Bridges · Scaling & Polishing.

**The 6 secondary services:** Tooth Extraction · Wisdom Tooth Removal · Dentures · Kids' Dentistry · Gum Treatment · Dental Fillings.

### 4.3 `/content/doctors.ts`
```ts
type Doctor = {
  slug: string,
  name: string,                 // "Dr. ⟨Name⟩"
  qualifications: string,       // "BDS, MDS (Endodontics)"
  role: string,                 // "Chief Dental Surgeon"
  experienceYears: number,
  specialities: string[],       // 2–4
  bio: string,                  // 2 paragraphs
  registration: string,         // Dental Council reg. no.
  photo: string,
  languages: string[],          // ["English", "Hindi"]
}
```

### 4.4 `/content/testimonials.ts`
6–8 entries: `{ name, initials, treatment, rating, text (max 180 chars), source: 'Google' | 'Practo' }`

### 4.5 `/content/faqs.ts`
10 general FAQs. Must include, at minimum: cost of a consultation, whether treatment is painful, insurance/cashless, first-visit expectations, emergency availability, sterilisation and hygiene protocol, EMI availability, walk-in vs appointment.

### 4.6 `/content/gallery.ts` *(added in nav revision)*
```ts
type GalleryEntry = {
  id: string,
  treatmentSlug: string,         // links back to services.ts entry
  beforeImage: string,
  afterImage: string,
  caption: string,               // no patient name unless separately consented to be named
  consentObtained: boolean,      // MUST be true before an entry renders publicly
}
```
**Hard rule: filter this array to `consentObtained === true` at render time, in code, not by only remembering to leave unconsented entries out of the data file.** This is a compliance requirement, not a style preference — the render logic must not be able to show an entry that hasn't been explicitly marked consented, even if one is accidentally added to the data file later.

### 4.7 `/content/trust.ts`
```ts
{ stat: string, label: string }[]   // exactly 4
```
e.g. `{ stat: "12+", label: "Years in practice" }`

---

## 5. Design system

Direction: **clean and clinical**. Calm, bright, high-contrast, disciplined. The feeling to aim for is a well-lit modern clinic where everything is visibly in order — not a hospital, and not a spa.

### 5.1 Color tokens
Define exactly these in `tailwind.config.ts` under `theme.extend.colors`. No other colors anywhere in the codebase.

| Token | Hex | Role |
|---|---|---|
| `porcelain` | `#F4F7F8` | Page background, alternating section bands |
| `enamel` | `#FFFFFF` | Cards, surfaces, header background |
| `scrub` | `#0B2B3C` | Primary ink, headings, footer background |
| `clinic` | `#1C7BA8` | Brand primary — buttons, links, active states |
| `rinse` | `#CFE9E4` | Soft accent fills, highlight blocks, icon backgrounds |
| `graphite` | `#5C6E78` | Body text, muted labels, borders at 20% opacity |

Semantic (states only, never decorative): `success #2E7D57`, `error #B23B3B`, `warning #B5822E`.

**Usage rules**
- `clinic` is for interactive elements only. If it is not clickable, it is not `clinic`.
- `rinse` never carries text — it is a fill behind `scrub` text or icons.
- Section backgrounds alternate `porcelain` → `enamel` → `porcelain`. Never two identical adjacent bands.
- Gradients: forbidden. Exactly one exception — a subtle `rinse`→`enamel` vertical wash behind the hero.

### 5.2 Typography

| Role | Face | Weights | Usage |
|---|---|---|---|
| Display | **Newsreader** (serif) | 400, 500 | h1, h2, doctor names, pull quotes |
| Body | **Public Sans** | 400, 500, 600 | h3–h6, all body copy, buttons, nav |
| Utility | **IBM Plex Mono** | 400, 500 | Eyebrow labels, prices, durations, hours, stat numbers |

The serif/mono pairing is the personality of this site. A clinic that publishes its prices in a precise monospaced figure reads as one with nothing to hide — that is the whole point. Use the mono face deliberately and sparingly: it appears only where a *number or a fact* is being stated.

**Type scale** (mobile → desktop, `clamp()`):

| Element | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| h1 | `clamp(2.25rem, 5vw, 3.75rem)` | 500 | `-0.02em` | 1.05 |
| h2 | `clamp(1.75rem, 3.5vw, 2.5rem)` | 500 | `-0.015em` | 1.15 |
| h3 | `clamp(1.25rem, 2vw, 1.5rem)` | 600 | `-0.01em` | 1.3 |
| Body L | `1.125rem` | 400 | `0` | 1.65 |
| Body | `1rem` | 400 | `0` | 1.65 |
| Small | `0.875rem` | 400 | `0` | 1.5 |
| Eyebrow | `0.75rem` | 500 | `0.12em`, uppercase | 1 |

Max line length for body copy: **68 characters** (`max-w-[68ch]`).

### 5.3 Spacing, radius, elevation
- Spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` px only.
- Section vertical padding: `py-16` mobile, `py-24` tablet, `py-32` desktop.
- Container: `max-w-6xl mx-auto px-5 md:px-8`.
- Radius: `4px` (inputs, small chips), `12px` (cards), `999px` (pills and buttons). Nothing else.
- Shadows: exactly two — `shadow-card` (`0 1px 3px rgba(11,43,60,0.06), 0 8px 24px rgba(11,43,60,0.05)`) and `shadow-lift` on hover (`0 2px 6px rgba(11,43,60,0.08), 0 16px 40px rgba(11,43,60,0.08)`). Never on anything that isn't a card or a dropdown.
- Borders: `1px solid rgba(92,110,120,0.18)`.

### 5.4 Motion
- Transitions: `200ms cubic-bezier(0.2, 0, 0, 1)` for hover/focus; `320ms` for expand/collapse.
- One scroll-reveal pattern: fade in + 12px rise, triggered once via `IntersectionObserver` in a small client wrapper, applied only to section headings and card grids.
- Hover on cards: lift 2px + `shadow-lift` + border darkens. Nothing scales, nothing rotates.
- All motion wrapped in `@media (prefers-reduced-motion: reduce)` overrides that disable transform and animation.

### 5.5 Signature element — the Cost Clarity Table
This is the one thing the site is remembered for. Most Indian dental clinic websites hide pricing entirely; this one leads with it.

A full-width table on `/pricing`, repeated in condensed form on the home page and on each service page:

- Rows: treatment name (Public Sans 600) · price range (IBM Plex Mono, tabular numerals, `₹8,000 – ₹15,000`) · what determines the range (small graphite text) · a `Book` link.
- Grouped by category with mono eyebrow headers.
- Above the table, a short honest note explaining *why* it is a range, not a fixed price.
- Below it, two short columns: **What's included** and **What costs extra** — plain, unhedged language.
- On mobile the table becomes stacked cards; the price stays in mono and stays the most prominent thing in each card.

Give this element more design attention than anything else on the site. Everything around it stays quiet.

---

## 6. Global components

Build these under `/components` before building any page.

| Component | Notes |
|---|---|
| `Header` | Sticky, `enamel` background, `1px` bottom border appearing after 8px scroll. Desktop dropdown for Services on hover + focus |
| `MobileNav` | *client* — full-screen overlay, body scroll lock, closes on route change and `Esc` |
| `Footer` | 4 columns per Section 3.2 |
| `StickyMobileCta` | *client* — fixed bottom bar, mobile only, appears after 400px scroll. Two halves: `Call` (tel:) and `WhatsApp` (wa.me deep link with prefilled message) |
| `Button` | Variants: `primary` (clinic fill), `secondary` (scrub outline), `ghost`. Sizes `sm`/`md`/`lg`. Renders as `<a>` or `<button>` by prop |
| `SectionHeading` | Eyebrow (mono) + h2 + optional lead paragraph. Alignment prop |
| `ServiceCard` | Icon in `rinse` circle, name, oneLiner, price-from in mono, arrow link |
| `DoctorCard` | Photo (4:5), name (serif), qualifications (mono), speciality chips, experience |
| `TestimonialCard` | Initials avatar, name, treatment tag, 5-star row, quote, source badge |
| `FaqAccordion` | *client* — all answers rendered in DOM at all times, collapsed via CSS `grid-template-rows` so crawlers still read them. Proper `aria-expanded` / `aria-controls` |
| `TrustBar` | 4 stats, mono numerals, thin dividers between |
| `CostClarityTable` | Per Section 5.5. Props: `variant: 'full' | 'condensed'` |
| `AppointmentForm` | *client* — see Section 8 |
| `WhatsAppButton` | Builds `https://wa.me/{number}?text={encoded}` with a context-aware prefilled message |
| `Breadcrumbs` | On all pages except `/`. Also emits BreadcrumbList JSON-LD |
| `MapEmbed` | Lazy-loaded iframe, `loading="lazy"`, with a static fallback image and a `Get Directions` button |

---

## 7. Page specifications

### 7.1 `/` — Home
Sections in exact order:

1. **Hero**
   - Left (60%): eyebrow (`⟨Locality⟩ · Since ⟨year⟩`), h1 (`⟨TODO: headline⟩` — a benefit statement, not the clinic name), lead paragraph (max 2 sentences), two CTAs: `Book Appointment` (primary) + `WhatsApp Us` (secondary), and a row of three micro-trust items (mono, e.g. `Same-day appointments · Digital X-ray · Sterilised, sealed instruments`).
   - Right (40%): clinic interior photo, 4:5 ratio, `rinse`→`enamel` wash behind it.
   - Mobile: stacks, image below CTAs, image height capped at 280px.
   - **This is the LCP element. Image must be `priority`. No animation on hero load beyond a 400ms fade.**

2. **TrustBar** — 4 stats from `/content/trust.ts`.

3. **Services** — Eyebrow `Treatments`, h2, 6 `ServiceCard`s in a 1/2/3 column grid. Below: text link `View all treatments →`.

4. **Why this clinic** — 4 differentiator blocks, 2×2 grid. Each: lucide icon in `rinse` circle, h3, two-sentence body. Content angles: sterilisation protocol, technology (digital X-ray / intraoral camera), transparent pricing, single-doctor continuity of care.

5. **Cost Clarity** (condensed) — h2 `What treatment actually costs`, one honest paragraph, `CostClarityTable variant="condensed"` showing the 6 primary treatments, then `See full price list →`.

6. **Meet the team** — h2, one-line intro, then a row of 4 compact `DoctorCard`s (photo, name in Newsreader, qualifications + registration number in mono, primary speciality chip). `More about our doctors →` links to `/about`.

7. **Testimonials** — h2, 3 cards on desktop / horizontal scroll-snap on mobile, plus the aggregate Google rating with a link to the Google reviews page.

8. **FAQ** — 6 questions from `/content/faqs.ts` via `FaqAccordion`. Link to `/contact` for anything unanswered.

9. **Booking CTA band** — Full-width `scrub` background. h2 in `enamel`, one line of copy, three actions: `Book Appointment`, `Call ⟨phone⟩`, `WhatsApp`. Below in mono: today's hours + emergency note.

10. **Location strip** — `MapEmbed` left, address + hours table + `Get Directions` right.

### 7.2 `/services` — Index
- Page header: breadcrumb, h1 `Dental treatments in ⟨Locality⟩`, lead paragraph.
- Services grouped by `category` with mono eyebrow headers, each group a card grid.
- Between the general and cosmetic groups: an inline `Not sure what you need?` band → `Book a consultation` CTA.
- `CostClarityTable variant="condensed"` near the bottom.

### 7.3 `/services/[slug]` — Treatment detail
Statically generated via `generateStaticParams`. Sections:

1. Breadcrumb + h1 (service name + locality) + oneLiner.
2. **Fact strip** (mono, 4 items, `rinse` background): Duration · Sittings · Pain level · Anaesthesia.
3. **"You may need this if"** — the `problem` field, set larger, in a bordered block.
4. **What it involves** — the `description` paragraphs.
5. **The process** — vertical numbered steps from `process[]`. Numbering is justified here because it *is* a sequence.
6. **Cost** — the price range in large mono type, plus the two-column what's-included / what-costs-extra treatment.
7. **Aftercare** — checklist from `aftercare[]`, lucide `Check` icons.
8. **FAQs** — service-specific, via `FaqAccordion`.
9. **Booking CTA band** with the treatment name prefilled in the WhatsApp message and the form's treatment field.
10. **Related treatments** — 3 cards from the same category.

### 7.4 `/about`
Clinic story (2–3 paragraphs, mentions founding year and locality) → **Our team** section, all 4 doctors as full `DoctorCard` + expanded bio each, in a grid that stays legible at 4-across on desktop and stacks to 1-across on mobile (order: Dr. Amit Chawla, Dr. Sthitodhi Mukherjee, Dr. Amandeep Singh, Dr. Rishabh Mishra) → **Sterilisation & safety** section (this matters more than it looks: itemise autoclave protocol, single-use items, disposal — in plain language) → facility photo grid (6 images, no lightbox, just a responsive grid) → trust stats → CTA band.

### 7.4a `/smile-gallery` *(added in nav revision)*
- Breadcrumb, h1 `Real smiles from ⟨Locality⟩ patients`, one honest lead paragraph noting these are real patients who agreed to share their results.
- Grid of before/after pairs, sourced from `content/gallery.ts`, **filtered to `consentObtained === true` only** — this filter happens in the page/component code, not just by data hygiene.
- Each pair: side-by-side (or slider-free stacked on mobile — no JS-heavy before/after slider widget, keep this a Server Component like everything else) before/after images, treatment name (linked to that service's detail page), and the caption.
- Optionally group by `treatmentSlug` category, same category labels as `/services`.
- If zero entries currently have `consentObtained: true`, the page must still render cleanly with an honest empty state (e.g. "We're currently gathering patient consent for this gallery — check back soon, or ask us in person about specific results.") rather than a broken or blank layout.
- CTA band at the bottom, same pattern as other pages.
- Add to sitemap, add standard metadata, add to `Breadcrumbs`.

### 7.5 `/pricing`
The signature page. h1 `Treatment costs, listed plainly`. An honest 2-paragraph intro on why prices are ranges. Full `CostClarityTable`. Then: **What's included** / **What costs extra** columns · payment methods and EMI note · insurance and cashless note · a short "no upselling" commitment paragraph · CTA band.

### 7.6 `/contact`
Two-column on desktop: left = `AppointmentForm`; right = address block, `Get Directions`, phone, WhatsApp, email, full hours table (today's row highlighted), emergency note, `MapEmbed` below. Under the map: short public-transport and parking directions in plain text.

### 7.7 `/book`
Focused page, no distractions. Minimal header (logo + phone only), no footer nav — just a slim footer. Centred `AppointmentForm` at `max-w-xl`, with a 3-item reassurance list above it (`No payment needed to book`, `We confirm on WhatsApp within ⟨X⟩ hours`, `Reschedule anytime`). WhatsApp alternative offered below the form.

### 7.8 `/thank-you`
Confirmation heading, a summary of what happens next (3 numbered steps), clinic phone + WhatsApp, `Back to home`. Set `robots: noindex`.

---

## 8. Appointment form

### 8.1 Fields
| Field | Type | Required | Validation |
|---|---|---|---|
| Full name | text | Yes | 2–60 chars |
| Phone | tel | Yes | Indian mobile, 10 digits, optional `+91` prefix |
| Treatment | select | No | Options from `services.ts` + `Not sure / General consultation` |
| Preferred day | select | No | `Today`, `Tomorrow`, `This week`, `Next week`, `Flexible` |
| Preferred time | select | No | `Morning`, `Afternoon`, `Evening` |
| Message | textarea | No | Max 500 chars |
| Honeypot | hidden text | — | Must be empty, `aria-hidden`, off-screen |

Email is deliberately **not** collected. Indian patients respond on phone and WhatsApp; every extra field costs conversions.

### 8.2 Behaviour
- Validation with `zod`, shared schema used on both client and server.
- Submits via a Server Action. Sends email through Resend to the clinic address.
- Inline errors below each field, `aria-describedby` wired, error text in `error` color, never color alone — always an icon plus text.
- Submit button shows a pending state via `useFormStatus` and is disabled while pending.
- On success: redirect to `/thank-you`.
- On failure: keep entered values, show an error banner that names the failure and gives the WhatsApp link as a fallback.
- Rate limit: reject more than 3 submissions per IP per 10 minutes.
- The form must render and be readable with JavaScript disabled; the Server Action handles the no-JS submit path.

### 8.3 WhatsApp deep links
Prefilled message templates:
- Generic: `Hi, I'd like to book an appointment at ⟨Clinic Name⟩.`
- From a service page: `Hi, I'd like to book an appointment for ⟨Service Name⟩ at ⟨Clinic Name⟩.`

URL-encode properly. Open in a new tab with `rel="noopener"`.

---

## 9. SEO and crawlability — non-negotiable

This section exists because a beautiful clinic site that Google cannot read is worth nothing to the client. Treat every item here as a build blocker.

### 9.1 Rendering
- No page may depend on client-side JavaScript to render its primary content. Verified by disabling JS and by `view-source`.
- No `useEffect`-based data fetching. No client-side-only content.

### 9.2 Metadata
- Every route exports `metadata` (or `generateMetadata` for dynamic routes) with: unique `title` (50–60 chars), unique `description` (140–160 chars), `openGraph` (title, description, image, type, locale `en_IN`), `twitter` card, and `alternates.canonical`.
- Root layout sets `metadataBase`.
- Title pattern: `⟨Page⟩ in ⟨Locality⟩ | ⟨Clinic Name⟩`.

### 9.3 Structured data (JSON-LD, injected server-side)
- `Dentist` (a `LocalBusiness` subtype) in the root layout: name, image, address (`PostalAddress`), `geo`, `telephone`, `openingHoursSpecification`, `priceRange`, `url`, `areaServed`, `medicalSpecialty`.
- `MedicalProcedure` on each `/services/[slug]` page.
- `FAQPage` on the home page and on every service page that has FAQs.
- `BreadcrumbList` on every non-home page.
- `Person` for each doctor on `/about`.

### 9.4 Files
- `app/sitemap.ts` — generated from routes + service slugs, with `lastModified`.
- `app/robots.ts` — allow all except `/thank-you`, and reference the sitemap.
- `app/opengraph-image.tsx` — a generated 1200×630 OG image using the tokens.
- Favicon set + `manifest.ts`.

### 9.5 On-page
- Exactly one `h1` per page. Heading order never skips a level.
- Locality name appears naturally in the h1, the first paragraph, and the footer address on every page.
- All images have descriptive `alt` text. Decorative images use `alt=""`.
- Internal links use descriptive anchor text — never `click here` or a bare `read more`.
- All external links: `rel="noopener"`.

---

## 10. Accessibility

- WCAG 2.1 AA contrast throughout. Verify `graphite` on `porcelain` — if it falls below 4.5:1 at body size, darken it to `#4A5A63` and record the change.
- Visible focus ring on every interactive element: `2px solid clinic`, `2px` offset. Never remove outlines without a replacement.
- All interactive elements reachable and operable by keyboard. Mobile nav traps focus while open and returns focus to the trigger on close.
- Touch targets minimum 44×44px.
- Skip-to-content link as the first focusable element.
- Every form input has a real `<label>`. Placeholder text is never used as a label.
- Icon-only buttons carry `aria-label`.
- `lang="en-IN"` on `<html>`.

---

## 11. Performance budget

| Metric | Target |
|---|---|
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | ≥ 95 |
| LCP | < 2.0s on simulated 4G |
| CLS | < 0.05 |
| Total JS shipped (home) | < 120KB gzipped |

Rules: hero image `priority`, everything else lazy · all images WebP with explicit dimensions · map iframe lazy with a static fallback · fonts via `next/font` with `display: swap` and a preloaded subset · no third-party scripts other than GA4.

---

## 12. Build order

Work through these in sequence. Complete and verify each before starting the next.

1. **Setup** — Next.js + TS + Tailwind. Configure all tokens from Section 5.1 and fonts from Section 5.2 in `tailwind.config.ts` and the root layout. Set up the folder structure from Section 15.
2. **Content layer** — Write every file in Section 4 with complete placeholder content. Real, specific, plausible placeholder copy — never lorem ipsum, never `[Service description here]`.
3. **Primitives** — `Button`, `SectionHeading`, typography base styles, container. Build a temporary `/styleguide` route rendering every token, type size, and button state. Review it, then delete the route before shipping.
4. **Layout** — `Header`, `MobileNav`, `Footer`, `StickyMobileCta`, skip link.
5. **Cards and blocks** — `ServiceCard`, `DoctorCard`, `TestimonialCard`, `TrustBar`, `FaqAccordion`, `MapEmbed`, `Breadcrumbs`.
6. **Signature** — `CostClarityTable`, both variants. Give this the most design attention.
7. **Home page** — all 10 sections in order.
8. **Services index + detail template** — including `generateStaticParams`.
9. **About, Pricing, Contact** pages.
10. **Form + Server Action + `/book` + `/thank-you`** — including validation, rate limiting, and the no-JS path.
11. **SEO layer** — all of Section 9: metadata, JSON-LD, sitemap, robots, OG image, manifest.
12. **A11y and performance pass** — Section 10 and 11. Run Lighthouse, fix, re-run.
13. **Final verification** — walk the Section 14 checklist.

---

## 13. Client inputs required before build

**Status: core details confirmed. Pricing, photos, registration numbers, and a few admin items remain — marked ⟨TODO⟩ below. These do not block Session 1.**

- **Clinic name:** Clivia Dental Clinic
- **Full address:** 5, N-12 Rd, DLF Phase 2, Sector 25, Gurugram, Shahpur, Haryana 122002
- **Latitude / longitude and Google Maps embed URL:** ⟨TODO — pull from Google Maps: search the address, share → embed a map, copy both the pin coordinates and the iframe embed URL⟩
- **Phone number:** +91 96257 22542
- **WhatsApp number:** +91 96257 22542 (same as phone)
- **Clinic email for form submissions:** ⟨TODO⟩
- **Opening hours:** Mon–Sun, 10:00 AM – 8:00 PM (no stated lunch break — confirm this is accurate before publishing; if the clinic does close for lunch, add it here)
- **Year established:** ⟨TODO⟩

- **Doctors (4):**
  1. **Dr. Amit Chawla** — BDS, MDS (Oral Pathology and Oral Microbiology) — Dentist — 20 years experience — Reg. no. ⟨TODO⟩
  2. **Dr. Sthitodhi Mukherjee** — BDS, MDS (Prosthodontics and Crown & Bridge) — Prosthodontist, Dentist, Cosmetic/Aesthetic Dentist — 12 years experience — Reg. no. ⟨TODO⟩
  3. **Dr. Amandeep Singh** — BDS, MDS (Orthodontics and Dentofacial Orthopaedics) — Orthodontist — 17 years experience — Reg. no. ⟨TODO⟩
  4. **Dr. Rishabh Mishra** — BDS — Dental Surgeon, Cosmetic/Aesthetic Dentist — 3 years experience — Reg. no. ⟨TODO⟩

- **Treatments:** confirmed as the 12 listed in §4.2 — no additions or removals.

- **Photos:** ⟨TODO — not blocking. Use labelled placeholders at the correct aspect ratio until supplied: clinic exterior, reception, treatment room, sterilisation area, one portrait per doctor (4 total), 6 facility shots⟩
- **Price ranges for all 12 treatments:** ⟨TODO — not blocking, placeholder ranges until supplied⟩
- **Payment methods, EMI provider, insurance / cashless tie-ups:** ⟨TODO⟩
- **Google Business Profile link and current rating / review count:** ⟨TODO⟩
- **6–8 real reviews to quote, with patient first names:** ⟨TODO⟩
- **Logo files (SVG preferred):** ⟨TODO⟩
- **Domain name:** ⟨TODO⟩

### 13.1 Notes on multi-doctor structure
With 4 doctors, `/about` should present them as a grid of `DoctorCard`s rather than a single-doctor spotlight layout, and the home page's "Meet the doctor" section (§7.1, item 6) becomes "Meet the team" — same content slot, adjusted to show all 4 as compact cards with a link through to full bios on `/about`. Update this section header accordingly when building Session 3.

Where a photo is missing at build time, use a labelled placeholder at the correct aspect ratio — never a stock photo of a different clinic, and never a stretched image.

---

## 14. Acceptance criteria

The build is done when every one of these is true.

**Rendering and SEO**
- [ ] `view-source` on every route shows the full page copy in the HTML
- [ ] Site renders and is fully navigable with JavaScript disabled (except the accordion and mobile menu)
- [ ] `"use client"` appears in exactly the four permitted components and nowhere else
- [ ] Every route has a unique title and description
- [ ] JSON-LD validates in Google's Rich Results Test for Dentist, FAQPage, and MedicalProcedure
- [ ] `/sitemap.xml` and `/robots.txt` resolve and list every public route
- [ ] Exactly one `h1` per page; no skipped heading levels

**Conversion**
- [ ] Phone, WhatsApp, and Book are reachable within one tap from any page on mobile
- [ ] Form submits successfully and the clinic receives the email
- [ ] Form failure shows the WhatsApp fallback and preserves entered values
- [ ] WhatsApp prefilled messages are correct and correctly encoded on every service page
- [ ] Honeypot and rate limiting both verified working

**Design**
- [ ] No color outside the six tokens plus the three semantic states
- [ ] No gradient other than the single permitted hero wash
- [ ] Only the two defined shadows and three radii are used
- [ ] Mono face appears only on numbers, labels, and factual data
- [ ] Section backgrounds alternate; no two identical adjacent bands
- [ ] Nothing breaks between 320px and 1920px

**Quality**
- [ ] Lighthouse mobile: Performance ≥ 90, SEO 100, Accessibility ≥ 95
- [ ] Keyboard-only navigation completes a full booking with a visible focus ring at every step
- [ ] `prefers-reduced-motion` disables all transforms and animations
- [ ] Zero console errors or warnings
- [ ] Zero TypeScript errors under strict mode
- [ ] No `⟨TODO:⟩` markers or lorem ipsum remain anywhere in the codebase

---

## 15. Folder structure

```
app/
  layout.tsx
  page.tsx
  services/page.tsx
  services/[slug]/page.tsx
  about/page.tsx
  pricing/page.tsx
  contact/page.tsx
  book/page.tsx
  thank-you/page.tsx
  privacy/page.tsx
  not-found.tsx
  sitemap.ts
  robots.ts
  manifest.ts
  opengraph-image.tsx
  actions/appointment.ts
components/
  layout/     Header, MobileNav, Footer, StickyMobileCta, SkipLink
  ui/         Button, SectionHeading, Breadcrumbs, Chip, StarRating
  blocks/     ServiceCard, DoctorCard, TestimonialCard, TrustBar,
              FaqAccordion, CostClarityTable, MapEmbed, CtaBand
  forms/      AppointmentForm, FormField, WhatsAppButton
content/
  clinic.ts services.ts doctors.ts testimonials.ts faqs.ts trust.ts
lib/
  schema.ts       zod schemas
  jsonld.ts       structured data builders
  utils.ts        cn(), formatINR(), whatsappUrl()
public/
  images/ icons/
```

---

## 16. Copy guidelines

The words are part of the design. Follow these when writing all placeholder and final copy.

- Plain, direct, sentence case. No exclamation marks.
- Never say `state-of-the-art`, `world-class`, `painless`, `we care about your smile`, or `your journey`.
- Never promise a clinical outcome. Say what the treatment does, not what it guarantees.
- Prices are always ranges, always with the reason for the range stated next to them.
- Buttons say what happens: `Book appointment`, `Call the clinic`, `Get directions`. Never `Submit`, never `Learn more`.
- An action keeps the same name everywhere it appears.
- Errors state what went wrong and what to do next, without apologising.
- Address the reader as `you`. Refer to the clinic as `we`.
- Write for someone scanning on a phone in mild pain: front-load the useful information in every paragraph.
# Progress Log

## Current session
2 (catching up Steps 2–3 first, per user approval, then Steps 4–6)

## Current step
Step 5 complete — continuing to Step 6

## Session map
(check off when the whole session is complete and verified)

- [x] Session 1 — Setup, content layer, primitives (SPEC.md §12 Steps 1–3) — completed 2026-07-18 (Steps 2–3 caught up in the Session 2 sitting, per user approval)
- [ ] Session 2 — Layout, cards/blocks, Cost Clarity Table (Steps 4–6)
- [ ] Session 3 — Home page, Services index + detail template (Steps 7–8)
- [ ] Session 4 — About, Pricing, Contact, Book, Thank-you (Steps 9–10)
- [ ] Session 5 — SEO layer, a11y/perf pass, final acceptance check (Steps 11–13)

## Step log
Append one entry per completed step. Never delete old entries — this file is the project's memory across sessions.

### Template
```
### Step N — <name> — <date>
- What was built:
- Decisions made / deviations from SPEC.md (and why):
- Verified: (e.g. view-source checked, Lighthouse score, keyboard nav tested)
- Commit: <message or hash>
- Open questions for next session:
```

---

(Entries start below this line)

### Step 1 — Setup — 2026-07-18
- What was built: git repo initialised; manual Next.js 15.5 + TypeScript 5.9 (strict) + Tailwind 3.4 scaffold (`package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`); all §5.1 color tokens + §5.3 shadows/radii in `tailwind.config.ts`; §5.2 fonts (Newsreader 400/500, Public Sans 400/500/600, IBM Plex Mono 400/500) via `next/font/google` with CSS variables in `app/layout.tsx` (`lang="en-IN"`); §15 folder structure (`components/{layout,ui,blocks,forms}`, `content`, `lib`, `public/{images,icons}` with .gitkeep); temporary placeholder `app/page.tsx` (replaced in Step 7). All §2.2 deps installed up front: next, react, react-dom, lucide-react, @next/third-parties, zod, resend.
- Decisions made / deviations from SPEC.md (and why):
  - Manual scaffold instead of `create-next-app` — the CLI refuses non-empty dirs and its template now ships Tailwind v4 (no `tailwind.config.ts`), which conflicts with §2/§5.1. Tailwind pinned to v3.4 so tokens live in `tailwind.config.ts` as specified.
  - TypeScript pinned to ^5.9 — npm resolved typescript@7 (native), which Next 15.5 cannot use to load `next.config.ts` (build failed until pinned).
  - No ESLint/Prettier — not on the §2.2 allowed list.
  - The spec file is named `dental-clinic-website-spec.md`, not `SPEC.md` as CLAUDE.md says — treated as the same document.
  - `npm audit`: 3 moderate advisories, all a transitive `postcss` pinned inside `next` itself; no fix short of a breaking downgrade — left as-is.
- Verified: `npm run build` clean, zero TS errors under strict mode; server-rendered HTML fetched raw (no JS) contains all page copy; computed styles in browser confirm porcelain/clinic/rinse hex values, 999px/12px radii, shadow-card, and all three fonts loaded; grep confirms no hex outside `tailwind.config.ts` and zero `"use client"` in the codebase; browser console clean.
- Commit: Step 1 — Setup: Next.js + TS + Tailwind scaffold, design tokens, fonts, folder structure
- Open questions for next session: none blocking. §13 TODOs (email, established year, reg. numbers, prices, geo/embed URL) will get plausible placeholders in Step 2 per spec.

### Step 2 — Content layer — 2026-07-18
- What was built: all six §4 content files plus one addition. `clinic.ts` (§13 confirmed data; typed `Clinic`), `services.ts` (all 12 services with full copy: oneLiner, problem, 2-para description, 3–5 process steps, fact-strip fields, price range + priceNote, aftercare, 3–4 FAQs each; plus `categoryLabels`, `categoryOrder`, `primaryServices`, `getService`), `doctors.ts` (4 doctors, 2-para bios), `testimonials.ts` (7 entries, ≤180 chars), `faqs.ts` (10, covering every §4.5 required topic), `trust.ts` (exactly 4 stats), and `pricing.ts` (new file — Cost Clarity Table copy: rangeNote, included/extra columns, payment/insurance/no-upsell notes).
- Decisions made / deviations from SPEC.md (and why):
  - Added `priceNote: string` to the `Service` type — §5.5 requires "what determines the range" per table row but §4.2's type had no field for it.
  - Added `content/pricing.ts` beyond the six §4 files — §5.5/§7.5 copy (range note, included/extra, payment/insurance/no-upsell) must live in `/content` per hard rule 4 and had no home otherwise.
  - Plausible placeholders (flagged in file comments, to be confirmed before launch): email hello@cliviadental.in, established 2012, geo pin 28.4889/77.0926, maps URLs, doctor reg. numbers (A-XXXXX Haryana State Dental Council pattern), all 12 price ranges, social links, testimonial quotes.
- Verified: `npm run build` clean, zero TS errors strict; grep of /content confirms zero exclamation marks, zero banned phrases (§16: state-of-the-art, world-class, painless, we care, your journey), no lorem ipsum, no ⟨TODO⟩ markers, no hex values. All §4.5 mandatory FAQ topics present; trust.ts has exactly 4 entries; testimonials within 180 chars.
- Commit: Step 2 — Content layer: all /content data files with full placeholder copy
- Open questions for next session: confirm §13 placeholder values before launch (email, year, geo, reg. numbers, prices, reviews).

### Step 3 — Primitives — 2026-07-18
- What was built: `components/ui/Button.tsx` (primary/secondary/ghost × sm/md/lg, renders Next `Link` for internal hrefs, `<a rel="noopener">` for external, `<button>` otherwise; all sizes keep §10's 44px min touch target), `components/ui/SectionHeading.tsx` (mono eyebrow + h1/h2 + optional lead, left/center align), `components/ui/Container.tsx` (§5.3 container), `lib/utils.ts` (`cn`, `formatINR`, `formatINRRange`, `whatsappUrl` with both §8.3 templates), typography base styles in `globals.css` (§5.2 h1/h2/h3 clamp scale, body leading 1.65, global §10 focus ring 2px clinic offset 2, §5.4 prefers-reduced-motion kill switch), tailwind.config.ts extensions (default border = graphite 18%, `text-body-l`/`text-eyebrow` sizes, `duration-320`), and the temporary `/styleguide` route rendering every token, type size, button variant/size/state, shadow, and radius.
- Decisions made / deviations from SPEC.md (and why):
  - Button hover states chosen within tokens: primary fills scrub, secondary re-inks to clinic, ghost underlines + inks scrub (clinic stays interactive-only, rinse never carries text).
  - `/styleguide` displays the 9 token hex strings as text labels for review — same tokens, no new colors; the whole route is deleted before shipping per §12.
  - `whatsappUrl` builds §8.3 message templates from `clinic.name` in `lib` — functional strings specified by the spec, not page copy.
- Verified: `npm run build` clean (5 routes, zero TS errors); /styleguide checked in browser via computed styles — Newsreader h1 (60px/500/-0.02em), IBM Plex Mono eyebrow (12px/0.12em/uppercase), primary button bg rgb(28,123,168), radius 999px, min-height 44px, ease cubic-bezier(0.2,0,0,1), default border rgba(92,110,120,0.18), body leading 1.65; compiled CSS contains `:focus-visible { outline: rgb(28,123,168) solid 2px; offset 2px }` and the prefers-reduced-motion override; console clean; zero `"use client"` in repo.
- Commit: Step 3 — Primitives: Button, SectionHeading, Container, type base styles, /styleguide
- Open questions for next session: none.

### Step 4 — Layout — 2026-07-18
- What was built: `components/layout/` — `Header` (server; sticky enamel bar, §3.2 desktop nav with CSS-only Services dropdown via group-hover/group-focus-within listing the 6 primary treatments, mobile phone icon + hamburger), `MobileNav` (client, permitted; full-screen overlay with body scroll lock, Esc + route-change close, focus trap, focus return to trigger), `Footer` (server; scrub bg, 4 §3.2 columns — clinic/positioning/address/directions, 6 treatment links, clinic pages, hours table + phone/WhatsApp/email — plus © bottom bar with nofollow credit link), `StickyMobileCta` (client, permitted; appears past 400px scroll, Call + WhatsApp halves with §8.3 prefilled deep link), `SkipLink`. All wired into `app/layout.tsx` with `#main-content` focus target.
- Decisions made / deviations from SPEC.md (and why):
  - Header "border after 8px scroll" done with a CSS scroll-driven animation (`animation-timeline: scroll()`) instead of JS — hard rule 1 forbids a client Header; unsupported browsers just always show the border (graceful).
  - Nav labels (Services/Pricing/About/Contact/Book appointment) and footer column headers live in the layout components — they are §3.2 navigation structure fixed by the spec, not page copy; all names/links/copy still come from /content.
  - Footer credit "Website by Rishu Kumar" with placeholder URL rishukumar.dev (spec's ⟨Your Name⟩) — confirm the real link.
  - Learned: don't run `npm run build` while the dev server shares `.next` — it corrupts the dev server's chunks (hit a 500; fixed by clearing .next and restarting). Typecheck with `tsc --noEmit` mid-session instead.
- Verified: production build clean before dev restart; raw no-JS server HTML contains all header/footer copy (name, hours, phone, treatment links, skip link, credit); browser checks at 375px — hamburger visible/desktop nav hidden, overlay opens with 12 links, body scroll locks, aria-expanded toggles, focus moves into overlay, Esc closes + unlocks + returns focus, sticky CTA hidden at top and shows both halves after 400px with correctly encoded wa.me link; at 1280px — dropdown hidden by default, visible on keyboard focus, hidden on blur, lists 6 treatments + view-all; header sticky with header-border-in scroll animation active; console clean; `"use client"` in exactly MobileNav + StickyMobileCta; no hex outside tailwind.config.ts (+ documented styleguide labels).
- Commit: Step 4 — Layout: Header, MobileNav, Footer, StickyMobileCta, SkipLink
- Open questions for next session: /book needs its minimal-header variant when Step 10 builds that page.

### Step 5 — Cards and blocks — 2026-07-18
- What was built: `components/blocks/` — `ServiceCard` (icon in rinse circle from a lucide name→component map, name, oneLiner, price-from in mono, arrow link; whole card is one link with §5.4 hover lift), `DoctorCard` (compact/full variants; 4:5 labelled portrait placeholder per §13 — initials on rinse, "Portrait to come" — name in Newsreader, qualifications + reg. no. in mono, speciality chips, experience; full adds bio + languages), `TestimonialCard` (initials avatar, treatment tag, StarRating, quote, source badge), `TrustBar` (4 mono stats, dividers on md+), `FaqAccordion` (client, permitted; answers always in DOM, collapsed via CSS grid-template-rows 0fr→1fr at duration-320, aria-expanded/aria-controls/role=region wired, multiple items can be open, first open by default), `MapEmbed` (lazy iframe over a static rinse fallback block with address — labelled placeholder since no map image supplied — plus Get directions button). `components/ui/` — `Chip` (rinse fill, scrub text), `StarRating` (scrub-filled stars, role=img aria-label), `Breadcrumbs` (visible trail + server-rendered BreadcrumbList JSON-LD). `lib/jsonld.ts` — `siteUrl` (placeholder domain cliviadental.in) + `breadcrumbListJsonLd`. Styleguide extended to render all of them with real content data.
- Decisions made / deviations from SPEC.md (and why):
  - Star color is scrub (semantic tokens are states-only per §5.1, clinic is interactive-only — scrub is the only compliant ink).
  - MapEmbed fallback is a styled labelled block, not a static image — no map image supplied yet (§13 photos TODO).
  - `lib/jsonld.ts` uses placeholder domain `https://cliviadental.in` for absolute BreadcrumbList URLs — §13 domain unconfirmed.
- Verified: `tsc --noEmit` clean; raw no-JS HTML of /styleguide contains collapsed FAQ answer text, BreadcrumbList JSON-LD, prices/badges (React `<!-- -->` text-node splits accounted for), portrait placeholder, map iframe with loading="lazy" and descriptive title; browser checks — accordion aria-expanded toggles per item, JSON-LD parses as BreadcrumbList, star rating labelled.
  - IMPORTANT verification caveat discovered: the in-app Browser pane runs with `visibilityState: "hidden"` — requestAnimationFrame never fires, so NO CSS transition ever starts there (a plain `height:10px→110px` transition stays stuck too), and screenshots time out. The accordion's grid-rows animation appeared "stuck at 0fr" for this reason only; with `transition:none` forced, the open state measures the full 99px, proving the CSS states are correct. All animation/transition behaviour must be eyeballed in a real browser window; state/DOM/aria checks remain verifiable here.
- Commit: Step 5 — Cards and blocks: ServiceCard, DoctorCard, TestimonialCard, TrustBar, FaqAccordion, MapEmbed, Breadcrumbs
- Open questions for next session: none.

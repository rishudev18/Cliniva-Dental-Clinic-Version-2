# CLAUDE.md

## Project
Dental clinic marketing site. Full spec lives in `dental-clinic-website-spec.md` at repo root — read it fully before doing any work. This file is the short operating manual; the spec is the source of truth for content, design tokens, and acceptance criteria. Don't duplicate spec content here from memory — go re-read the relevant section when needed.

## Commands
- `npm run dev` — start the dev server
- `npm run build` — production build; this is also the closest thing to a typecheck gate (no separate `lint` or `test` script exists — run `npx tsc --noEmit` manually if you need a quick typecheck without a full build)
- `npm run start` — run the production build
- There is no ESLint, Prettier, or test runner configured. This is intentional — none of those are on the spec §2.2 allowed-dependency list. Don't add one without asking first (see Hard rule 5).

## Hard rules (never violate, even under time pressure or if it seems more convenient)
1. Every page is a Server Component by default. `"use client"` is permitted ONLY in: `MobileNav` (`components/layout/MobileNav.tsx`), `FaqAccordion` (`components/blocks/FaqAccordion.tsx`), `AppointmentForm` (`components/forms/AppointmentForm.tsx`), `StickyMobileCta` (`components/layout/StickyMobileCta.tsx`). Nowhere else, ever.
2. No page content may depend on client-side JS to render. Before marking any page "done," verify with `view-source` (or an equivalent no-JS check) that the copy is in the server-rendered HTML.
3. Colors: only the 6 named tokens + 3 semantic states defined in the spec §5.1. No other hex values anywhere in the codebase, ever, including "just for testing."
4. All page copy comes from `/content/*.ts` files. Never hardcode copy directly inside a component.
5. No dependencies beyond the allowed list in the spec §2.2. If you think you need something else, stop and ask first.

## Architecture
- `app/(site)/` — the main marketing route group: home, about, pricing, contact, services, services/[slug], smile-gallery, thank-you, privacy. `app/book/` is a separate route with its own minimal layout (no full header/footer chrome).
- `app/actions/appointment.ts` — the Server Action backing `AppointmentForm`.
- `components/layout/` — Header, Footer, MobileNav, StickyMobileCta, SkipLink.
- `components/blocks/` — page-section building blocks (CostClarityTable, CtaBand, DoctorCard, FaqAccordion, IncludedExtra, MapEmbed, ServiceCard, TestimonialCard, TrustBar).
- `components/forms/` — AppointmentForm, FormField.
- `components/ui/` — low-level primitives (Button, Chip, Container, SectionHeading, Breadcrumbs, StarRating).
- `components/seo/JsonLd.tsx` — structured data injection.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/opengraph-image.tsx`, `app/apple-icon.tsx`, `app/not-found.tsx` — SEO/metadata routes (Next.js file-convention APIs), built in the Step 11 SEO layer.
- `content/*.ts` — one file per content domain (about, book, clinic, contact, cta, doctors, faqs, gallery, home, notFound, pricing, privacy, seo, services, servicesIndex, smileGallery, testimonials, thankYou, trust); this is the only place page copy is allowed to live (Hard rule 4).
- `lib/` — `jsonld.ts`, `schema.ts`, `utils.ts`.

## Session discipline
- Work only on the step(s) assigned for the current session — check `PROGRESS.md` for the current session number and step range.
- Do not start the next numbered step (per spec §12) until the current one has been shown to me and I've confirmed it.
- When a step is finished: update `PROGRESS.md` with what was built and how it was verified, commit to git with a message naming the step, then stop and wait for my go-ahead. Do not keep working past a completed step on your own initiative.
- Run `/compact` after each completed step is committed — not mid-step.

## Where to look in the spec (`dental-clinic-website-spec.md`)
- Build order: §12
- Acceptance checklist: §14
- Content model / data shapes: §4
- Design tokens: §5
- Component list: §6
- Page-by-page specs: §7

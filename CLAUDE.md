# CLAUDE.md

## Project
Dental clinic marketing site. Full spec lives in `SPEC.md` at repo root — read it fully before doing any work. This file is the short operating manual; SPEC.md is the source of truth for content, design tokens, and acceptance criteria. Don't duplicate SPEC.md content here from memory — go re-read the relevant section when needed.

## Hard rules (never violate, even under time pressure or if it seems more convenient)
1. Every page is a Server Component by default. `"use client"` is permitted ONLY in: `MobileNav`, `FaqAccordion`, `AppointmentForm`, `StickyMobileCta`. Nowhere else, ever.
2. No page content may depend on client-side JS to render. Before marking any page "done," verify with `view-source` (or an equivalent no-JS check) that the copy is in the server-rendered HTML.
3. Colors: only the 6 named tokens + 3 semantic states defined in SPEC.md §5.1. No other hex values anywhere in the codebase, ever, including "just for testing."
4. All page copy comes from `/content/*.ts` files. Never hardcode copy directly inside a component.
5. No dependencies beyond the allowed list in SPEC.md §2.2. If you think you need something else, stop and ask first.

## Session discipline
- Work only on the step(s) assigned for the current session — check `PROGRESS.md` for the current session number and step range.
- Do not start the next numbered step (per SPEC.md §12) until the current one has been shown to me and I've confirmed it.
- When a step is finished: update `PROGRESS.md` with what was built and how it was verified, commit to git with a message naming the step, then stop and wait for my go-ahead. Do not keep working past a completed step on your own initiative.
- Run `/compact` after each completed step is committed — not mid-step.

## Where to look in SPEC.md
- Build order: §12
- Acceptance checklist: §14
- Content model / data shapes: §4
- Design tokens: §5
- Component list: §6
- Page-by-page specs: §7

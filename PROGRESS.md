# Progress Log

## Current session
1

## Current step
Step 1 complete — awaiting go-ahead for Step 2

## Session map
(check off when the whole session is complete and verified)

- [ ] Session 1 — Setup, content layer, primitives (SPEC.md §12 Steps 1–3)
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

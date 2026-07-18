import type { Config } from "tailwindcss";

// Design tokens per SPEC §5. These are the ONLY colors, shadows, and radii
// permitted anywhere in the codebase.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: "#F4F7F8",
        enamel: "#FFFFFF",
        scrub: "#0B2B3C",
        // Darkened 2% from the spec's literal #1C7BA8 (§10 contrast pass,
        // Step 12) — as `text-clinic` on `porcelain` (the default page
        // background), the original value measured 4.39:1, just under
        // WCAG AA's 4.5:1 for normal-size text, and `clinic` is used as
        // small link-text color on porcelain in dozens of places
        // sitewide. §10 pre-authorizes exactly this move for `graphite`
        // ("darken it... and record the change"); applied the same fix
        // here since the failure is real and the change is visually
        // imperceptible (#1C7BA8 → #1B79A5, 4.51:1).
        clinic: "#1B79A5",
        rinse: "#CFE9E4",
        graphite: "#5C6E78",
        success: "#2E7D57",
        error: "#B23B3B",
        warning: "#B5822E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(11,43,60,0.06), 0 8px 24px rgba(11,43,60,0.05)",
        lift: "0 2px 6px rgba(11,43,60,0.08), 0 16px 40px rgba(11,43,60,0.08)",
      },
      borderRadius: {
        sm: "4px",
        card: "12px",
        pill: "999px",
      },
      transitionTimingFunction: {
        clinic: "cubic-bezier(0.2, 0, 0, 1)",
      },
      transitionDuration: {
        // §5.4 — 200ms hover/focus (Tailwind default duration-200), 320ms expand/collapse
        "320": "320ms",
      },
      borderColor: {
        // §5.3 — graphite at 18%; the default for the bare `border` class
        DEFAULT: "rgba(92,110,120,0.18)",
      },
      fontSize: {
        // §5.2 type scale entries not covered by Tailwind defaults
        "body-l": ["1.125rem", { lineHeight: "1.65" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.12em", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};

export default config;

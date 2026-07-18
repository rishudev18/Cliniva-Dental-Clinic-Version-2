// Trust bar stats (SPEC §4.6) — exactly 4 entries.
// Stats render in IBM Plex Mono; keep them short and factual.

export type TrustStat = { stat: string; label: string };

export const trust: TrustStat[] = [
  { stat: "20+", label: "Years of senior clinical experience" },
  { stat: "4", label: "Specialist doctors under one roof" },
  { stat: "7 days", label: "Open every day, 10 AM – 8 PM" },
  { stat: "100%", label: "Instruments autoclaved and sealed" },
];

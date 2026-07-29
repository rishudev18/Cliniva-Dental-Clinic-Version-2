import { ImageResponse } from "next/og";
import { clinic } from "@/content/clinic";

// §9.4 — one generated 1200×630 OG image, shared by every route that
// doesn't define its own. Hex values below are literal because
// ImageResponse renders outside Tailwind's pipeline (no className
// support) — they are the exact same §5.1 tokens used everywhere else,
// just written as inline style values instead of Tailwind classes.

export const alt = `${clinic.name} — ${clinic.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0B2B3C", // scrub
          color: "#FFFFFF", // enamel
        }}
      >
        <div
          style={{
            display: "flex",
            width: 64,
            height: 6,
            backgroundColor: "#1B79A5", // clinic
            marginBottom: 32,
          }}
        />
        <div style={{ display: "flex", fontSize: 64, fontWeight: 600 }}>{clinic.name}</div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 24, color: "#CFE9E4" /* rinse */ }}>
          {clinic.tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            marginTop: 48,
            color: "#F4F7F8", // porcelain
          }}
        >
          {clinic.address.locality}, {clinic.address.city} · {clinic.phoneDisplay}
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

// §9.4 favicon set — Apple touch icon. iOS doesn't reliably support SVG
// touch icons, so this is a generated PNG using the same placeholder mark
// as app/icon.svg (§13 real logo TODO), in the same §5.1 tokens.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B2B3C", // scrub
          borderRadius: 40,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 28,
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#1C7BA8", // clinic
            display: "flex",
          }}
        />
        <div style={{ display: "flex", fontSize: 96, fontWeight: 600, color: "#FFFFFF" }}>C</div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e1525",
          color: "#f2f4f8",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Brass corner tick */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 16,
            height: 16,
            borderTop: "2px solid #c9a96e",
            borderRight: "2px solid #c9a96e",
          }}
        />
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "#f2f4f8",
            display: "flex",
          }}
        >
          JT
          <span style={{ color: "#c9a96e", marginLeft: 2 }}>T</span>
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "#8593ae",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          § 2026
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const alt = "Jesnar Tindogan — Architecting Systems Today, Justice Tomorrow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          background:
            "radial-gradient(ellipse at 30% 30%, #1a2338 0%, #0e1525 60%)",
          color: "#f2f4f8",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Column-rule grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(108,141,214,0.06) 1px, transparent 1px)",
            backgroundSize: "120px 100%",
          }}
        />

        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#8593ae",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#c9a96e",
              }}
            />
            <span>JTT · Case 2026-0001 · Portfolio</span>
          </div>
          <div>jsnaur-dev.vercel.app</div>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6b8dd6",
              marginBottom: 24,
            }}
          >
            § 01 — Statement of the Case
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.02,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#f2f4f8",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Architecting scalable systems today.</span>
          </div>
          <div
            style={{
              marginTop: 16,
              width: 140,
              height: 2,
              background: "#c9a96e",
            }}
          />
          <div
            style={{
              marginTop: 16,
              fontSize: 64,
              lineHeight: 1.05,
              fontStyle: "italic",
              color: "#6b8dd6",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Preparing for the{" "}
            <span
              style={{
                color: "#c9a96e",
                fontStyle: "normal",
                marginLeft: 18,
              }}
            >
              justice
            </span>
            <span style={{ marginLeft: 18 }}>system tomorrow.</span>
          </div>
        </div>

        {/* Bottom byline */}
        <div
          style={{
            marginTop: 56,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 18,
            color: "#5a6680",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          <div>Jesnar T. Tindogan · Cebu, PH</div>
          <div>full-stack · ai · leadership</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

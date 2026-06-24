import { ImageResponse } from "next/og";

export const alt = "The Ovis Effect — Wealth, Appetite & Wellbeing in Warri";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded default social-share image (used on every link preview).
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
          background:
            "linear-gradient(135deg, #16232a 0%, #143f3a 55%, #ff5b04 170%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 10,
            color: "#ff8a4c",
            fontWeight: 600,
          }}
        >
          THE OVIS EFFECT
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 28,
          }}
        >
          Wealth, Appetite &amp; Wellbeing
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(255,255,255,0.72)",
            marginTop: 30,
          }}
        >
          Food · Wellness · Finance · Stays — Warri, Delta State
        </div>
      </div>
    ),
    { ...size },
  );
}

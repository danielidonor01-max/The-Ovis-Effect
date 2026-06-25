import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Contact The Ovis Effect — Warri, Delta State";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "THE OVIS EFFECT",
    title: "Let's talk",
    subtitle: "Get in touch — food, spa, finance & stays in Warri, Delta State",
    accent: "#ff5b04",
  });
}

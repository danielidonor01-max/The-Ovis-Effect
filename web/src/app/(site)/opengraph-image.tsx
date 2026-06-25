import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "The Ovis Effect — Wealth, Appetite & Wellbeing in Warri";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "THE OVIS EFFECT",
    title: "Wealth, Appetite & Wellbeing",
    subtitle: "Food, wellness, finance & luxury stays — Warri, Delta State",
    accent: "#ff5b04",
  });
}

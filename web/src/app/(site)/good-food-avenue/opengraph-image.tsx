import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Good Food Avenue — Nigerian restaurant & food delivery in Warri";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "GOOD FOOD AVENUE · APPETITE",
    title: "Taste the vibrancy",
    subtitle: "Premium Nigerian dishes, grills & fresh fruit drinks, delivered across Warri",
    accent: "#FF5B04",
  });
}

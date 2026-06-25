import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Safe Haven — luxury serviced apartments in Warri";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "SAFE HAVEN · EXCLUSIVE",
    title: "Safe Haven",
    subtitle: "Discreet luxury serviced apartments in Warri, by reservation only",
    accent: "#9A7B3F",
  });
}

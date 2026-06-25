import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Urovi Spa — massage, facials & wellness in Warri";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "UROVI SPA · WELLBEING",
    title: "Urovi Spa",
    subtitle: "Massage, facials & calm wellness therapies in Warri",
    accent: "#3E7C66",
  });
}

import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Financial Advisory — tax, payroll & bookkeeping in Delta State";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "FINANCIAL ADVISORY · WEALTH",
    title: "Financial Advisory",
    subtitle: "Tax, payroll, bookkeeping & business strategy in Delta State",
    accent: "#125C54",
  });
}

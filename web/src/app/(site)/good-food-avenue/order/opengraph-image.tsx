import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Order food online — Good Food Avenue, Warri";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "GOOD FOOD AVENUE",
    title: "Order food online",
    subtitle: "Build your order and send it straight to our kitchen on WhatsApp",
    accent: "#FF5B04",
  });
}

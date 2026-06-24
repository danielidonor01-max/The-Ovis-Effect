import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Ovis Effect",
    short_name: "Ovis Effect",
    description:
      "Wealth, Appetite & Wellbeing — food, wellness, finance and luxury stays in Warri, Delta State.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff5b04",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}

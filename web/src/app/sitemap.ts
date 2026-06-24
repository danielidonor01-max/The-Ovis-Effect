import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";
import { houses } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    "/",
    ...houses.map((h) => `/${h.slug}`),
    "/good-food-avenue/order",
    "/contact",
  ];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}

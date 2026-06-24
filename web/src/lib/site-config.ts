// Resolves the production origin automatically:
//  1. NEXT_PUBLIC_SITE_URL if you set it (use this when a custom domain lands)
//  2. Vercel's stable production URL on deploys
//  3. localhost in dev
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

// Approximate Warri coordinates — refine with the exact pin from the
// Google Business Profile once it's set up.
export const geo = { latitude: 5.5167, longitude: 5.75 };

// Schema.org openingHours shorthand (Mon–Sun, 8am–10pm).
export const openingHours = "Mo-Su 08:00-22:00";

export const defaultKeywords = [
  "Warri",
  "Delta State",
  "Nigeria",
  "Good Food Avenue",
  "Urovi Spa",
  "Safe Haven apartments",
  "financial advisory Warri",
];

import type { Metadata } from "next";

// Build a full Metadata object for a house page from its SEO copy.
export function houseMetadata(slug: string): Metadata {
  const seo = houseSeo[slug];
  const url = absoluteUrl(`/${slug}`);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: "The Ovis Effect",
      locale: "en_NG",
      title: seo.title,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

// Per-house SEO copy + the Schema.org business type for structured data.
export const houseSeo: Record<
  string,
  { title: string; description: string; schemaType: string; keywords: string[] }
> = {
  "good-food-avenue": {
    title: "Good Food Avenue — Nigerian Restaurant & Food Delivery in Warri",
    description:
      "Premium Nigerian dishes, grills and fresh fruit drinks delivered across Warri. Order jollof, native soups, grills and more straight to WhatsApp.",
    schemaType: "Restaurant",
    keywords: ["restaurant in Warri", "food delivery Warri", "Nigerian food", "jollof rice Warri"],
  },
  "urovi-spa": {
    title: "Urovi Spa — Massage, Facials & Wellness Spa in Warri",
    description:
      "Calm, organic spa therapies in Warri — signature facials, full-body massage, scrubs and wellness rituals. Book your session on WhatsApp.",
    schemaType: "HealthAndBeautyBusiness",
    keywords: ["spa in Warri", "massage Warri", "facials Warri", "wellness Delta State"],
  },
  "financial-advisory": {
    title: "Financial Advisory — Tax, Payroll & Bookkeeping in Delta State",
    description:
      "Trusted financial advisory in Warri and Delta State — tax filing, payroll, bookkeeping and business strategy. Transparent FS 4 plans from ₦10,000/month.",
    schemaType: "FinancialService",
    keywords: ["financial advisory Warri", "tax filing Delta State", "bookkeeping Warri", "payroll Nigeria"],
  },
  "safe-haven": {
    title: "Safe Haven — Luxury Serviced Apartments in Warri",
    description:
      "Discreet, fully-serviced luxury apartments in Warri with 24/7 concierge and private, secure access. Refined privacy, by reservation only.",
    schemaType: "LodgingBusiness",
    keywords: ["luxury apartments Warri", "serviced apartments Warri", "short let Warri", "accommodation Delta State"],
  },
};

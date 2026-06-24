import { site } from "@/data/site";
import { siteUrl, absoluteUrl, geo, openingHours, houseSeo } from "@/lib/site-config";
import type { SiteSettings } from "@/sanity/lib/data";

function postalAddress(settings?: SiteSettings | null) {
  return {
    "@type": "PostalAddress",
    streetAddress: settings?.address || site.address,
    addressLocality: "Warri",
    addressRegion: "Delta State",
    addressCountry: "NG",
  };
}

function tel(settings?: SiteSettings | null) {
  return `+${settings?.whatsapp || site.whatsapp}`;
}

/** Organization schema for the hub. */
export function organizationLd(settings?: SiteSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    slogan: site.tagline,
    email: settings?.email || site.email,
    telephone: tel(settings),
    address: postalAddress(settings),
    areaServed: "Warri, Delta State, Nigeria",
    sameAs: [settings?.instagram, settings?.facebook, settings?.tiktok].filter(
      (u): u is string => Boolean(u) && u !== "#",
    ),
  };
}

/** Per-house LocalBusiness schema (Restaurant / Spa / FinancialService / Lodging). */
export function houseLd(
  slug: string,
  name: string,
  blurb: string,
  settings?: SiteSettings | null,
) {
  const seo = houseSeo[slug];
  return {
    "@context": "https://schema.org",
    "@type": seo?.schemaType || "LocalBusiness",
    name,
    description: seo?.description || blurb,
    url: absoluteUrl(`/${slug}`),
    telephone: tel(settings),
    email: settings?.email || site.email,
    address: postalAddress(settings),
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHours,
    areaServed: "Warri, Delta State, Nigeria",
    parentOrganization: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
    },
  };
}

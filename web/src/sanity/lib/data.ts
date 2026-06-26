import { client } from "./client";
import { gfaMenu, slugify } from "@/data/site";

// Image as returned from GROQ (asset ref kept so urlForImage can size/crop it).
export type SanityImage = {
  asset?: { _ref?: string };
  caption?: string;
} | null;

export type HeroContent = {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  titleColor?: string;
  titleWeight?: string;
  images?: SanityImage[];
};

export type HomepageDoc = {
  heading?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  titleColor?: string;
  titleWeight?: string;
  goodFoodAvenue?: SanityImage;
  uroviSpa?: SanityImage;
  financialAdvisory?: SanityImage;
  safeHaven?: SanityImage;
} | null;

export type SiteSettings = {
  email?: string;
  phoneDisplay?: string;
  whatsapp?: string;
  whatsappGoodFood?: string;
  whatsappSpa?: string;
  whatsappFinance?: string;
  whatsappSafeHaven?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
};

/** The WhatsApp number for a house, falling back to the general one. */
export function houseWhatsapp(
  settings: SiteSettings | null | undefined,
  slug: string,
): string | undefined {
  const perHub: Record<string, string | undefined> = {
    "good-food-avenue": settings?.whatsappGoodFood,
    "urovi-spa": settings?.whatsappSpa,
    "financial-advisory": settings?.whatsappFinance,
    "safe-haven": settings?.whatsappSafeHaven,
  };
  return perHub[slug] || settings?.whatsapp || undefined;
}

export type MenuItemDoc = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: SanityImage;
};

export type MenuCategoryDoc = {
  key: string;
  label: string;
  image?: SanityImage;
  items: MenuItemDoc[];
};

export type GalleryDoc = { images?: SanityImage[] } | null;

export type SpaPricing = {
  eyebrow?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  image?: SanityImage;
  pdfUrl?: string;
} | null;

export type FounderDoc = {
  eyebrow?: string;
  quote?: string;
  name?: string;
  role?: string;
  credentials?: string[];
  image?: SanityImage;
} | null;

// `tags` lets the Sanity webhook → /api/revalidate purge every CMS-backed
// page on demand (revalidateTag("sanity")); `revalidate` is the time-based
// fallback so content is never more than a minute stale.
const opts = { next: { revalidate: 60, tags: ["sanity"] } };

const HERO = `*[_type=="pageHero" && page==$page][0]{
  eyebrow, heading, subtitle, ctaLabel, ctaHref, titleColor, titleWeight, images
}`;

const SITE = `*[_type=="siteSettings"][0]{
  email, phoneDisplay, whatsapp,
  whatsappGoodFood, whatsappSpa, whatsappFinance, whatsappSafeHaven,
  address, instagram, facebook, tiktok
}`;

const HOMEPAGE = `*[_type=="homepage"][0]{
  heading, subtitle, ctaLabel, ctaHref, titleColor, titleWeight,
  goodFoodAvenue, uroviSpa, financialAdvisory, safeHaven
}`;

const MENU = `*[_type=="menuCategory"] | order(order asc){
  "key": key.current, label, image,
  "items": *[_type=="menuItem" && references(^._id) && available==true] | order(order asc){
    "id": _id, name, description, price, image
  }
}`;

// Looked up by fixed document id (gallery-<key>), matching the named editors
// in the Studio structure — deterministic, no key-collision ambiguity.
const GALLERY = `*[_id == $id][0]{ images }`;

const FOUNDER = `*[_type=="founder"][0]{ eyebrow, quote, name, role, credentials, image }`;

const SPA_PRICING = `*[_id=="spaPricing"][0]{
  eyebrow, title, body, ctaLabel, image, "pdfUrl": pdf.asset->url
}`;

// All getters swallow errors (e.g. Sanity unreachable) and return null/[] so
// callers fall back to hardcoded content — the site never breaks on a CMS hiccup.
export async function getHero(page: string): Promise<HeroContent | null> {
  try {
    return await client.fetch(HERO, { page }, opts);
  } catch {
    return null;
  }
}

export async function getHomepage(): Promise<HomepageDoc> {
  try {
    return await client.fetch(HOMEPAGE, {}, opts);
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(SITE, {}, opts);
  } catch {
    return null;
  }
}

export async function getMenu(): Promise<MenuCategoryDoc[]> {
  try {
    return (await client.fetch(MENU, {}, opts)) || [];
  } catch {
    return [];
  }
}

/** Hardcoded menu mapped to the CMS shape — used when the CMS has no items. */
export function menuFallback(): MenuCategoryDoc[] {
  return gfaMenu.map((c) => ({
    key: c.key,
    label: c.label,
    items: c.items.map((it) => ({
      id: slugify(it.name),
      name: it.name,
      description: it.desc,
    })),
  }));
}

/** Menu from the CMS, or the hardcoded fallback if the CMS is empty. */
export async function getMenuOrFallback(): Promise<MenuCategoryDoc[]> {
  const menu = await getMenu();
  return menu.length ? menu : menuFallback();
}

export async function getGallery(key: string): Promise<GalleryDoc> {
  try {
    return await client.fetch(GALLERY, { id: `gallery-${key}` }, opts);
  } catch {
    return null;
  }
}

export async function getFounder(): Promise<FounderDoc> {
  try {
    return await client.fetch(FOUNDER, {}, opts);
  } catch {
    return null;
  }
}

export async function getSpaPricing(): Promise<SpaPricing> {
  try {
    return await client.fetch(SPA_PRICING, {}, opts);
  } catch {
    return null;
  }
}

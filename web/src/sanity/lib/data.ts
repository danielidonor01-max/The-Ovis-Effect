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

export type SiteSettings = {
  email?: string;
  phoneDisplay?: string;
  whatsapp?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
};

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

export type FounderDoc = {
  eyebrow?: string;
  quote?: string;
  name?: string;
  role?: string;
  credentials?: string[];
  image?: SanityImage;
} | null;

const opts = { next: { revalidate: 60 } } as const;

const HERO = `*[_type=="pageHero" && page==$page][0]{
  eyebrow, heading, subtitle, ctaLabel, ctaHref, titleColor, titleWeight, images
}`;

const SITE = `*[_type=="siteSettings"][0]{
  email, phoneDisplay, whatsapp, address, instagram, facebook, tiktok
}`;

const MENU = `*[_type=="menuCategory"] | order(order asc){
  "key": key.current, label, image,
  "items": *[_type=="menuItem" && references(^._id) && available==true] | order(order asc){
    "id": _id, name, description, price, image
  }
}`;

const GALLERY = `*[_type=="gallery" && key==$key][0]{ images }`;

const FOUNDER = `*[_type=="founder"][0]{ eyebrow, quote, name, role, credentials, image }`;

// All getters swallow errors (e.g. Sanity unreachable) and return null/[] so
// callers fall back to hardcoded content — the site never breaks on a CMS hiccup.
export async function getHero(page: string): Promise<HeroContent | null> {
  try {
    return await client.fetch(HERO, { page }, opts);
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
    return await client.fetch(GALLERY, { key }, opts);
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

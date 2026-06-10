import { sanityClient } from 'sanity:client';
import { siteConfig } from './siteConfig';

export interface SiteSettings {
  name: string;
  tagline: string;
  email: string;
  /** Display phone, e.g. "+234 807 712 5775" */
  phoneDisplay: string;
  /** tel: href value, e.g. "+2348077125775" */
  phoneTel: string;
  /** wa.me number, digits only */
  whatsapp: string;
  address: string;
  social: { facebook: string; instagram: string; tiktok: string };
  defaultSeo: { metaTitle?: string; metaDescription?: string } | null;
  /** Homepage hero content; headline may contain inline HTML. */
  homeHero: { headline: string; subtext: string };
  ambientAudioUrl: string;
}

const HOME_HERO_FALLBACK = {
  headline: 'Wealth, <span class="gold-text">Appetite</span>,<br>and Wellbeing',
  subtext: 'One roof. Three worlds. Curated excellence right here in Warri, Delta State.',
};

let cached: Promise<SiteSettings> | null = null;

async function load(): Promise<SiteSettings> {
  let data: any = null;
  try {
    data = await sanityClient.fetch(`*[_type == "singletonSite"][0] {
      ...,
      "ambientAudioUrl": ambientAudio.asset->url
    }`);
  } catch (error: any) {
    console.warn('getSiteSettings: Sanity fetch failed, using siteConfig fallbacks:', error?.message);
  }

  const c = data?.contactInfo ?? {};
  const rawPhone: string | undefined = c.phone;
  const phoneDisplay = rawPhone || siteConfig.phoneDisplay;
  const phoneTel = rawPhone ? '+' + rawPhone.replace(/[^\d]/g, '') : siteConfig.phoneTel;
  const whatsapp = (c.whatsapp || rawPhone || '').replace(/[^\d]/g, '') || siteConfig.whatsapp;

  const socialMap: Record<string, string> = {};
  for (const link of data?.socialLinks ?? []) {
    if (link?.platform && link?.url) socialMap[link.platform] = link.url;
  }

  return {
    name: data?.title || siteConfig.name,
    tagline: siteConfig.tagline,
    email: c.email || siteConfig.email,
    phoneDisplay,
    phoneTel,
    whatsapp,
    address: c.address || siteConfig.address,
    social: {
      facebook: socialMap.facebook || siteConfig.social.facebook,
      instagram: socialMap.instagram || siteConfig.social.instagram,
      tiktok: socialMap.tiktok || siteConfig.social.tiktok,
    },
    defaultSeo: data?.defaultSeo ?? null,
    homeHero: {
      headline: data?.homeHero?.headline || HOME_HERO_FALLBACK.headline,
      subtext: data?.homeHero?.subtext || HOME_HERO_FALLBACK.subtext,
    },
    ambientAudioUrl: data?.ambientAudioUrl || '/audio/ovis-ambient.mp3',
  };
}

/** Returns merged global settings (Sanity singletonSite over siteConfig). Memoised per build. */
export function getSiteSettings(): Promise<SiteSettings> {
  if (!cached) cached = load();
  return cached;
}

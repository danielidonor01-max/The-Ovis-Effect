import { sanityClient } from 'sanity:client';
import { urlFor } from '../sanity/image';

export interface HubCard {
  href: string;
  tag: string;
  tagClass: string;
  title: string;
  description: string;
  linkLabel: string;
  image: string | null;
}

/** Brand slug → design-locked CSS accent class for its hub card tag. */
const TAG_CLASS: Record<string, string> = {
  'good-food-avenue': 'tag-food',
  'urovi-spa': 'tag-spa',
  'financial-advisory': 'tag-finance',
  'safe-haven': 'tag-safehaven',
};

/** Hardcoded fallback used when no brand documents exist in Sanity yet. */
const FALLBACK: HubCard[] = [
  {
    href: '/good-food-avenue/', tag: 'Appetite', tagClass: 'tag-food', title: 'Good Food Avenue',
    description: "Warri's favourite spot for premium Nigerian dishes, grills, and fresh fruit drinks. Taste the vibrancy.",
    linkLabel: 'Explore Menu', image: null,
  },
  {
    href: '/urovi-spa/', tag: 'Wellbeing', tagClass: 'tag-spa', title: 'Urovi Spa',
    description: 'Calm, organic, and healing. Premium therapies to restore your body and clear your mind.',
    linkLabel: 'View Therapies', image: null,
  },
  {
    href: '/financial-advisory/', tag: 'Wealth', tagClass: 'tag-finance', title: 'Financial Advisory',
    description: 'Authoritative strategies. Tiered pricing for personalised growth, built on high trust and precision.',
    linkLabel: 'Explore Menu', image: null,
  },
  {
    href: '/safe-haven/', tag: 'Exclusive', tagClass: 'tag-safehaven', title: 'Safe Haven Luxury Apartment',
    description: 'The ultimate retreat, hidden in plain sight. Anonymous luxury apartment rentals with exclusive in-house services.',
    linkLabel: 'Explore Menu', image: null,
  },
];

let cached: Promise<HubCard[]> | null = null;

async function load(): Promise<HubCard[]> {
  let brands: any[] = [];
  try {
    brands = await sanityClient.fetch(
      `*[_type == "brand" && featuredOnHub != false] {
        "slug": slug.current, heroImage
      }`
    );
  } catch (error: any) {
    console.warn('getHubCards: Sanity fetch failed, using fallback cards:', error?.message);
  }

  const imageMap = new Map<string, string | null>();
  for (const b of brands || []) {
    if (b?.slug && b?.heroImage?.asset) {
      imageMap.set(b.slug, urlFor(b.heroImage).width(1108).height(800).quality(80).url());
    }
  }

  return FALLBACK.map((fbCard) => {
    const slug = fbCard.href.replace(/\//g, '');
    const cmsImage = imageMap.get(slug);
    return {
      ...fbCard,
      image: cmsImage || fbCard.image,
    };
  });
}

/** Hub brand cards from Sanity, falling back to the hardcoded set. Memoised per build. */
export function getHubCards(): Promise<HubCard[]> {
  if (!cached) cached = load();
  return cached;
}

/**
 * siteConfig — TEMPORARY single source of truth for global site data.
 *
 * This is the fallback used by Header / NavModal / Footer / Contact CTA when
 * Sanity (`singletonSite`) has no data yet. Once `singletonSite` is wired in,
 * these values become the defaults and Sanity overrides them.
 *
 * ⚠️ CONTACT INFO NEEDS CLIENT CONFIRMATION.
 * The legacy pages disagreed with each other:
 *   - email:    info@theoviseffect.com  (modals + contact page)  vs  theoviseffect@gmail.com (footers)
 *   - phone:    +234 807 712 5775 / 2348077125775 (contact page + WhatsApp)  vs  +23480973687887 (some modals — malformed, too many digits)
 * Standardised below to the values used on the canonical Contact page.
 * Replace with the verified business details (ideally via Sanity).
 */

export interface BrandNavLogo {
  className: string;
  style: string;
  html: string;
}

export interface Brand {
  slug: string;
  name: string;
  /** Short label used in the hub/global nav bar */
  shortName: string;
  navLogo: BrandNavLogo;
}

export const siteConfig = {
  name: 'The Ovis Effect',
  tagline: 'Wealth, Appetite and Wellbeing.',

  // --- Contact (NEEDS CONFIRMATION — see header comment) ---
  email: 'info@theoviseffect.com',
  /** Human-readable phone for display */
  phoneDisplay: '+234 807 712 5775',
  /** tel: href value */
  phoneTel: '+2348077125775',
  /** wa.me / WhatsApp number, digits only */
  whatsapp: '2348077125775',
  address: 'TM Mall, Jakpa Road, opposite Aka Avenue, Warri, Delta State.',

  social: {
    facebook: '#',
    instagram: '#',
    tiktok: '#',
  },

  brands: [
    {
      slug: 'good-food-avenue',
      name: 'Good Food Avenue',
      shortName: 'Good Food',
      navLogo: { className: 'gfa-pacifico-logo', style: '', html: 'Good Food<br>Avenue' },
    },
    {
      slug: 'urovi-spa',
      name: 'Urovi Spa',
      shortName: 'Urovi Spa',
      navLogo: { className: 'spa-cormorant-logo', style: '', html: 'Urovi Spa' },
    },
    {
      slug: 'financial-advisory',
      name: 'Financial Advisory',
      shortName: 'Finance',
      navLogo: {
        className: '',
        style: 'color: var(--color-fin-gold); font-family: var(--font-display);',
        html: 'Financial Advisory',
      },
    },
    {
      slug: 'safe-haven',
      name: 'Safe Haven',
      shortName: 'Safe Haven',
      navLogo: { className: 'sh-cormorant-logo', style: '', html: 'Safe Haven' },
    },
  ] as Brand[],
} as const;

/** Convenience: WhatsApp chat URL with optional prefilled text */
export function waLink(text?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** All brands except the one with `slug` (for cross-links in nav modals) */
export function otherBrands(slug: string): Brand[] {
  return siteConfig.brands.filter((b) => b.slug !== slug);
}

// ──────────────────────────────────────────────────────────────
// The Ovis Effect — hardcoded content (CMS comes back in a later phase)
// ──────────────────────────────────────────────────────────────

export const site = {
  name: "The Ovis Effect",
  tagline: "Wealth, Appetite & Wellbeing",
  location: "Warri, Delta State",
  email: "info@theoviseffect.com",
  phoneDisplay: "+234 807 712 5775",
  whatsapp: "2348077125775",
  address: "TM Mall, Jakpa Road, opposite Aka Avenue, Warri, Delta State.",
  social: { instagram: "#", facebook: "#", tiktok: "#" },
} as const;

export function waLink(text: string, number: string = site.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export type House = {
  slug: string;
  name: string;
  tag: string;
  blurb: string;
  /** brand accent, used sparingly on white */
  accent: string;
  hero: string;
  cta: string;
};

export const houses: House[] = [
  {
    slug: "good-food-avenue",
    name: "Good Food Avenue",
    tag: "Appetite",
    blurb: "Premium Nigerian dishes, grills, and fresh fruit drinks — delivered across Warri.",
    accent: "#FF5B04",
    hero: "/images/food/hero.jpg",
    cta: "Order food",
  },
  {
    slug: "urovi-spa",
    name: "Urovi Spa",
    tag: "Wellbeing",
    blurb: "Calm, organic therapies to restore your body and clear your mind.",
    accent: "#3E7C66",
    hero: "/images/spa/hero-spa.jpg",
    cta: "Book a session",
  },
  {
    slug: "financial-advisory",
    name: "Financial Advisory",
    tag: "Wealth",
    blurb: "Authoritative strategies for growth — built on precision and trust.",
    accent: "#125C54",
    hero: "/images/finance/hero-finance.jpg",
    cta: "Get advice",
  },
  {
    slug: "safe-haven",
    name: "Safe Haven",
    tag: "Exclusive",
    blurb: "Discreet luxury apartments, hidden in plain sight, with in-house service.",
    accent: "#9A7B3F",
    hero: "/images/safe-haven/hero-sh.jpg",
    cta: "Find a suite",
  },
];

export const houseBySlug = (slug: string) => houses.find((h) => h.slug === slug);

// ── Good Food Avenue menu (price-optional) ──
export type MenuItem = { name: string; desc: string };
export type MenuCategory = { key: string; label: string; items: MenuItem[] };

export const gfaMenu: MenuCategory[] = [
  {
    key: "mains",
    label: "Mains",
    items: [
      { name: "Asun Rice", desc: "Spicy rice tossed with peppered, smoky goat meat (asun)." },
      { name: "Chinese Rice", desc: "Stir-fried rice with mixed vegetables and a savoury twist." },
      { name: "Native Rice", desc: "Palm-oil 'concoction' rice cooked with local spices, fish and greens." },
      { name: "Jollof Rice", desc: "Smoky party-style jollof simmered in a rich pepper-tomato sauce." },
      { name: "Fried Rice", desc: "Colourful fried rice with vegetables, liver and sweet corn." },
      { name: "White Rice", desc: "Plain steamed long-grain rice — perfect with any stew." },
      { name: "Spaghetti", desc: "Nigerian-style peppered spaghetti, jollof or stir-fried." },
    ],
  },
  {
    key: "soups",
    label: "Soups & Stews",
    items: [
      { name: "Egusi Soup", desc: "Melon-seed soup rich with assorted meat and leafy greens." },
      { name: "Okra Soup", desc: "Light, draw okra soup with peppers and assorted meat." },
      { name: "Vegetable Soup", desc: "Hearty edikang-ikong-style greens with fish and meat." },
      { name: "Banga Soup", desc: "Delta palm-fruit soup with native spices and fresh catfish." },
      { name: "Regular Stew", desc: "Classic fried pepper-and-tomato stew." },
      { name: "Buka Peppered Stew", desc: "Bold, roadside-style buka stew — extra peppered." },
      { name: "Eba", desc: "Smooth garri swallow, moulded warm." },
      { name: "Semo", desc: "Soft semolina swallow, great with any soup." },
    ],
  },
  {
    key: "proteins",
    label: "Proteins",
    items: [
      { name: "Sauced Turkey", desc: "Turkey simmered in a spicy tomato-pepper sauce." },
      { name: "Grilled Turkey", desc: "Smoky, char-grilled turkey." },
      { name: "Chicken", desc: "Tender, well-seasoned chicken." },
      { name: "Sauced Chicken", desc: "Chicken in a rich peppered sauce." },
      { name: "Chicken Wings", desc: "Crispy seasoned wings." },
      { name: "Sauced Chicken Wings", desc: "Wings tossed in a spicy sauce." },
      { name: "Gizzard", desc: "Peppered gizzard — gizdodo-ready." },
      { name: "Beef", desc: "Soft, seasoned beef cuts." },
      { name: "Fish", desc: "Grilled or fried titus / croaker." },
      { name: "Eggs", desc: "Boiled or fried egg." },
    ],
  },
  {
    key: "snacks",
    label: "Snacks & Drinks",
    items: [
      { name: "Ice Cream", desc: "Chilled, creamy scoop." },
      { name: "Yoghurt Drink", desc: "Cold sweet or plain yoghurt." },
      { name: "Fruit Juice", desc: "Freshly blended fruit juice." },
      { name: "Tigernut", desc: "Chilled tigernut milk (kunu aya)." },
      { name: "Beer", desc: "Chilled bottle." },
      { name: "Super Roll", desc: "Sausage-roll-style savoury snack." },
      { name: "Chicken Pie", desc: "Flaky pie with a savoury chicken filling." },
      { name: "Small Chops", desc: "Puff-puff, spring rolls, samosa & gizzard mix." },
    ],
  },
  {
    key: "sides",
    label: "Sides",
    items: [
      { name: "Salad", desc: "Fresh garden salad / coleslaw." },
      { name: "Moi Moi", desc: "Steamed bean pudding with pepper and fish or egg." },
      { name: "Plantain", desc: "Fried sweet plantain (dodo)." },
    ],
  },
];

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

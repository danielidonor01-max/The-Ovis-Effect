// One-shot seed: migrates the current hardcoded content into Sanity so the
// Studio opens to everything already filled in. Idempotent (createOrReplace
// with deterministic ids) — safe to re-run.
//
//   SANITY_WRITE_TOKEN=xxx node scripts/seed.mjs
//
import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gorjnjxy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ── Site settings ──
const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  email: "info@theoviseffect.com",
  phoneDisplay: "+234 807 712 5775",
  whatsapp: "2348077125775",
  address: "TM Mall, Jakpa Road, opposite Aka Avenue, Warri, Delta State.",
};

// ── Founder / leadership ──
const founder = {
  _id: "founder",
  _type: "founder",
  eyebrow: "Leadership",
  quote:
    "We don't just file your taxes — we help you understand your numbers, so every decision you make is a confident one. Precision and trust are non-negotiable here.",
  name: "Founder & Lead Advisor",
  role: "The Ovis Effect · Financial Advisory",
  credentials: [
    "15+ years in finance & advisory",
    "Chartered, regulator-compliant practice",
    "Hundreds of Delta-State businesses served",
  ],
};

// ── Page heroes (white titles on the slider heroes) ──
const heroes = [
  {
    page: "home",
    heading: "Wealth, *Appetite* & Wellbeing",
    subtitle:
      "One roof, four houses — food, calm, comfort and capital, curated to a single standard right here in Warri.",
    ctaLabel: "Explore the houses",
    ctaHref: "#houses",
    titleColor: "#16232A",
    titleWeight: "600",
  },
  {
    page: "good-food-avenue",
    eyebrow: "Appetite · Good Food Avenue",
    heading: "Taste the *vibrancy.*",
    subtitle:
      "Premium Nigerian dishes, grills and fresh fruit drinks — prepared with authentic spices and delivered across Warri.",
    ctaLabel: "Order now",
    ctaHref: "/good-food-avenue/order",
    titleColor: "#16232A",
    titleWeight: "600",
  },
  {
    page: "urovi-spa",
    eyebrow: "Wellbeing",
    heading: "Urovi Spa",
    subtitle: "Calm, organic therapies to restore your body and clear your mind.",
    ctaLabel: "Book a session",
    ctaHref: "#services",
    titleColor: "#FFFFFF",
    titleWeight: "600",
  },
  {
    page: "financial-advisory",
    eyebrow: "Wealth",
    heading: "Financial Advisory",
    subtitle: "Authoritative strategies for growth — built on precision and trust.",
    ctaLabel: "See our plans",
    ctaHref: "#pricing",
    titleColor: "#16232A",
    titleWeight: "600",
  },
  {
    page: "safe-haven",
    eyebrow: "Exclusive",
    heading: "Safe Haven",
    subtitle:
      "Discreet luxury apartments, hidden in plain sight, with in-house service.",
    ctaLabel: "Enquire now",
    ctaHref: "#gallery",
    titleColor: "#FFFFFF",
    titleWeight: "600",
  },
];

// ── Menu ──
const categories = [
  { key: "mains", label: "Mains" },
  { key: "soups", label: "Soups & Stews" },
  { key: "proteins", label: "Proteins" },
  { key: "snacks", label: "Snacks & Drinks" },
  { key: "sides", label: "Sides" },
];

const menu = {
  mains: [
    ["Asun Rice", "Spicy rice tossed with peppered, smoky goat meat (asun)."],
    ["Chinese Rice", "Stir-fried rice with mixed vegetables and a savoury twist."],
    ["Native Rice", "Palm-oil 'concoction' rice cooked with local spices, fish and greens."],
    ["Jollof Rice", "Smoky party-style jollof simmered in a rich pepper-tomato sauce."],
    ["Fried Rice", "Colourful fried rice with vegetables, liver and sweet corn."],
    ["White Rice", "Plain steamed long-grain rice — perfect with any stew."],
    ["Spaghetti", "Nigerian-style peppered spaghetti, jollof or stir-fried."],
  ],
  soups: [
    ["Egusi Soup", "Melon-seed soup rich with assorted meat and leafy greens."],
    ["Okra Soup", "Light, draw okra soup with peppers and assorted meat."],
    ["Vegetable Soup", "Hearty edikang-ikong-style greens with fish and meat."],
    ["Banga Soup", "Delta palm-fruit soup with native spices and fresh catfish."],
    ["Regular Stew", "Classic fried pepper-and-tomato stew."],
    ["Buka Peppered Stew", "Bold, roadside-style buka stew — extra peppered."],
    ["Eba", "Smooth garri swallow, moulded warm."],
    ["Semo", "Soft semolina swallow, great with any soup."],
  ],
  proteins: [
    ["Sauced Turkey", "Turkey simmered in a spicy tomato-pepper sauce."],
    ["Grilled Turkey", "Smoky, char-grilled turkey."],
    ["Chicken", "Tender, well-seasoned chicken."],
    ["Sauced Chicken", "Chicken in a rich peppered sauce."],
    ["Chicken Wings", "Crispy seasoned wings."],
    ["Sauced Chicken Wings", "Wings tossed in a spicy sauce."],
    ["Gizzard", "Peppered gizzard — gizdodo-ready."],
    ["Beef", "Soft, seasoned beef cuts."],
    ["Fish", "Grilled or fried titus / croaker."],
    ["Eggs", "Boiled or fried egg."],
  ],
  snacks: [
    ["Ice Cream", "Chilled, creamy scoop."],
    ["Yoghurt Drink", "Cold sweet or plain yoghurt."],
    ["Fruit Juice", "Freshly blended fruit juice."],
    ["Tigernut", "Chilled tigernut milk (kunu aya)."],
    ["Beer", "Chilled bottle."],
    ["Super Roll", "Sausage-roll-style savoury snack."],
    ["Chicken Pie", "Flaky pie with a savoury chicken filling."],
    ["Small Chops", "Puff-puff, spring rolls, samosa & gizzard mix."],
  ],
  sides: [
    ["Salad", "Fresh garden salad / coleslaw."],
    ["Moi Moi", "Steamed bean pudding with pepper and fish or egg."],
    ["Plantain", "Fried sweet plantain (dodo)."],
  ],
};

const galleries = ["spa-therapies", "spa-gallery", "safe-haven-gallery"];

async function run() {
  const tx = client.transaction();

  tx.createOrReplace(siteSettings);
  tx.createOrReplace(founder);

  heroes.forEach((h) =>
    tx.createOrReplace({ _id: `hero-${h.page}`, _type: "pageHero", ...h }),
  );

  categories.forEach((c, i) =>
    tx.createOrReplace({
      _id: `category-${c.key}`,
      _type: "menuCategory",
      label: c.label,
      key: { _type: "slug", current: c.key },
      order: i,
    }),
  );

  let n = 0;
  for (const c of categories) {
    (menu[c.key] || []).forEach(([name, description], i) => {
      tx.createOrReplace({
        _id: `item-${slugify(name)}`,
        _type: "menuItem",
        name,
        description,
        category: { _type: "reference", _ref: `category-${c.key}` },
        available: true,
        order: i,
      });
      n++;
    });
  }

  galleries.forEach((key) =>
    tx.createOrReplace({ _id: `gallery-${key}`, _type: "gallery", key, images: [] }),
  );

  await tx.commit();
  console.log(
    `Seeded: siteSettings, founder, ${heroes.length} heroes, ${categories.length} categories, ${n} items, ${galleries.length} galleries.`,
  );
}

run().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});

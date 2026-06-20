/**
 * Seed Good Food Avenue menu items into Sanity.
 *
 *   1. Create an Editor token: sanity.io/manage → project gorjnjxy → API → Tokens
 *   2. Run (PowerShell):   $env:SANITY_WRITE_TOKEN="<token>"; npm run seed:menu
 *      Run (bash):         SANITY_WRITE_TOKEN=<token> npm run seed:menu
 *
 * Idempotent: uses createOrReplace with deterministic _ids, so re-running
 * updates the same documents instead of creating duplicates.
 */
import { createClient } from '@sanity/client';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('\n✗ Missing SANITY_WRITE_TOKEN.\n  Create an Editor token at sanity.io/manage (project gorjnjxy → API → Tokens),\n  then: SANITY_WRITE_TOKEN=<token> npm run seed:menu\n');
  process.exit(1);
}

const client = createClient({
  projectId: 'gorjnjxy',
  dataset: 'production',
  apiVersion: '2024-05-25',
  token,
  useCdn: false,
});

// category key -> items (order within the array becomes sortOrder)
const MENU = {
  mains: [
    ['Asun Rice', 'Spicy rice tossed with peppered, smoky goat meat (asun).'],
    ['Chinese Rice', 'Stir-fried rice with mixed vegetables and a savoury twist.'],
    ['Native Rice', "Palm-oil 'concoction' rice cooked with local spices, fish and greens."],
    ['Jollof Rice', 'Smoky party-style jollof simmered in a rich pepper-tomato sauce.'],
    ['Fried Rice', 'Colourful fried rice with vegetables, liver and sweet corn.'],
    ['White Rice', 'Plain steamed long-grain rice — perfect with any stew.'],
    ['Spaghetti', 'Nigerian-style peppered spaghetti, jollof or stir-fried.'],
  ],
  soups: [
    ['Egusi Soup', 'Melon-seed soup rich with assorted meat and leafy greens.'],
    ['Okra Soup', 'Light, draw okra soup with peppers and assorted meat.'],
    ['Vegetable Soup', 'Hearty edikang-ikong-style greens with fish and meat.'],
    ['Banga Soup', 'Delta palm-fruit soup with native spices and fresh catfish.'],
    ['Regular Stew', 'Classic fried pepper-and-tomato stew.'],
    ['Buka Peppered Stew', 'Bold, roadside-style buka stew — extra peppered.'],
    ['Eba', 'Smooth garri swallow, moulded warm.'],
    ['Semo', 'Soft semolina swallow, great with any soup.'],
  ],
  proteins: [
    ['Sauced Turkey', 'Turkey simmered in a spicy tomato-pepper sauce.'],
    ['Grilled Turkey', 'Smoky, char-grilled turkey.'],
    ['Chicken', 'Tender, well-seasoned chicken.'],
    ['Sauced Chicken', 'Chicken in a rich peppered sauce.'],
    ['Chicken Wings', 'Crispy seasoned wings.'],
    ['Sauced Chicken Wings', 'Wings tossed in a spicy sauce.'],
    ['Gizzard', 'Peppered gizzard — gizdodo-ready.'],
    ['Beef', 'Soft, seasoned beef cuts.'],
    ['Fish', 'Grilled or fried titus / croaker.'],
    ['Eggs', 'Boiled or fried egg.'],
  ],
  snacks: [
    ['Ice Cream', 'Chilled, creamy scoop.'],
    ['Yoghurt Drink', 'Cold sweet or plain yoghurt.'],
    ['Fruit Juice', 'Freshly blended fruit juice.'],
    ['Tigernut', 'Chilled tigernut milk (kunu aya).'],
    ['Beer', 'Chilled bottle.'],
    ['Super Roll', 'Sausage-roll-style savoury snack.'],
    ['Chicken Pie', 'Flaky pie with a savoury chicken filling.'],
    ['Small Chops', 'Puff-puff, spring rolls, samosa & gizzard mix.'],
  ],
  sides: [
    ['Salad', 'Fresh garden salad / coleslaw.'],
    ['Moi Moi', 'Steamed bean pudding with pepper and fish or egg.'],
    ['Plantain', 'Fried sweet plantain (dodo).'],
  ],
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const docs = [];
for (const [category, items] of Object.entries(MENU)) {
  items.forEach(([name, description], i) => {
    const slug = slugify(name);
    docs.push({
      _id: `gfa-menu-${slug}`,
      _type: 'menuItem',
      name,
      slug: { _type: 'slug', current: slug },
      category,
      description,
      available: true,
      sortOrder: i,
      // price + image intentionally omitted — add them in Studio.
    });
  });
}

console.log(`Seeding ${docs.length} menu items into gorjnjxy/production …`);
const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction());
try {
  await tx.commit();
  console.log(`✓ Done. ${docs.length} items written. Open /studio to add prices and photos.`);
} catch (err) {
  console.error('✗ Seed failed:', err.message);
  process.exit(1);
}

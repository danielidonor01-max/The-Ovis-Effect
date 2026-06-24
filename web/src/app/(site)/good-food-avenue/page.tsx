import { GfaHero } from "@/components/gfa-hero";
import { GfaCategories } from "@/components/gfa-categories";
import { CtaCard } from "@/components/cta-card";
import { JsonLd } from "@/components/json-ld";
import { houseMetadata } from "@/lib/site-config";
import { houseLd } from "@/lib/structured-data";
import { houseBySlug } from "@/data/site";
import { getHero, getMenuOrFallback } from "@/sanity/lib/data";

const house = houseBySlug("good-food-avenue")!;

export const metadata = houseMetadata("good-food-avenue");

export default async function GoodFoodAvenuePage() {
  const [hero, menu] = await Promise.all([
    getHero("good-food-avenue"),
    getMenuOrFallback(),
  ]);
  return (
    <>
      <JsonLd data={houseLd("good-food-avenue", house.name, house.blurb)} />
      <GfaHero hero={hero} menu={menu} />
      <GfaCategories menu={menu} />
      <CtaCard
        eyebrow="Ready to eat?"
        title="Build your order in seconds."
        sub="Pick your dishes and send the order straight to our kitchen on WhatsApp — no app, no sign-up."
        ctaLabel="Order now"
        ctaHref="/good-food-avenue/order"
        accent={house.accent}
      />
    </>
  );
}

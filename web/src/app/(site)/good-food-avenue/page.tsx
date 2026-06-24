import type { Metadata } from "next";
import { GfaHero } from "@/components/gfa-hero";
import { GfaCategories } from "@/components/gfa-categories";
import { CtaCard } from "@/components/cta-card";
import { houseBySlug } from "@/data/site";
import { getHero, getMenuOrFallback } from "@/sanity/lib/data";

const house = houseBySlug("good-food-avenue")!;

export const metadata: Metadata = {
  title: "Good Food Avenue",
  description: house.blurb,
};

export default async function GoodFoodAvenuePage() {
  const [hero, menu] = await Promise.all([
    getHero("good-food-avenue"),
    getMenuOrFallback(),
  ]);
  return (
    <>
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

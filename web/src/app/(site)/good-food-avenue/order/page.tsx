import type { Metadata } from "next";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { GfaOrderHero } from "@/components/gfa-order-hero";
import { OrderEngine } from "@/components/order-engine";
import { CtaCard } from "@/components/cta-card";
import { houseBySlug, waLink } from "@/data/site";
import { getMenuOrFallback, getSiteSettings } from "@/sanity/lib/data";

const house = houseBySlug("good-food-avenue")!;

export const metadata: Metadata = {
  title: "Order Food Online · Good Food Avenue",
  description:
    "Build your Good Food Avenue order in Warri and send it straight to our kitchen on WhatsApp — jollof, native soups, grills, sides and drinks.",
  alternates: { canonical: "/good-food-avenue/order" },
};

export default async function GfaOrderPage() {
  const [menu, settings] = await Promise.all([
    getMenuOrFallback(),
    getSiteSettings(),
  ]);
  const whatsapp = settings?.whatsapp;

  return (
    <>
      <GfaOrderHero menu={menu} />

      <Section id="order" className="scroll-mt-20 pt-6">
        <Container>
          <SectionIntro
            center
            eyebrow="Build your order"
            title="Tap. Add. Send."
            lead="Pick your dishes and we'll pre-fill the order straight to our kitchen on WhatsApp — no app, no sign-up."
          />
          <div className="mt-10">
            <OrderEngine menu={menu} whatsapp={whatsapp} />
          </div>
        </Container>
      </Section>

      <CtaCard
        eyebrow="Order now"
        title="Hungry? We've got just the thing."
        sub="Fresh, authentic Nigerian food prepared with love and delivered across Warri."
        ctaLabel="Order on WhatsApp"
        ctaHref={waLink(
          "Hi Good Food Avenue! I'd like to place a food order...",
          whatsapp,
        )}
        accent={house.accent}
        external
      />
    </>
  );
}

import type { Metadata } from "next";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { GfaOrderHero } from "@/components/gfa-order-hero";
import { OrderEngine } from "@/components/order-engine";
import { CtaCard } from "@/components/cta-card";
import { houseBySlug, waLink } from "@/data/site";

const house = houseBySlug("good-food-avenue")!;

export const metadata: Metadata = {
  title: "Order · Good Food Avenue",
  description:
    "Build your Good Food Avenue order and send it straight to our kitchen on WhatsApp.",
};

export default function GfaOrderPage() {
  return (
    <>
      <GfaOrderHero />

      <Section id="order" className="scroll-mt-20 pt-6">
        <Container>
          <SectionIntro
            center
            eyebrow="Build your order"
            title="Tap. Add. Send."
            lead="Pick your dishes and we'll pre-fill the order straight to our kitchen on WhatsApp — no app, no sign-up."
          />
          <div className="mt-10">
            <OrderEngine />
          </div>
        </Container>
      </Section>

      <CtaCard
        eyebrow="Order now"
        title="Hungry? We've got just the thing."
        sub="Fresh, authentic Nigerian food prepared with love and delivered across Warri."
        ctaLabel="Order on WhatsApp"
        ctaHref={waLink("Hi Good Food Avenue! I'd like to place a food order...")}
        accent={house.accent}
        external
      />
    </>
  );
}

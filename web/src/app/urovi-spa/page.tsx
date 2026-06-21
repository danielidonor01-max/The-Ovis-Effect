import type { Metadata } from "next";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { BrandHero } from "@/components/brand-hero";
import { FeatureGrid } from "@/components/feature-grid";
import { PlaceholderImage } from "@/components/placeholder-image";
import { CtaCard } from "@/components/cta-card";
import { Reveal } from "@/components/reveal";
import { houseBySlug, waLink } from "@/data/site";

const house = houseBySlug("urovi-spa")!;

export const metadata: Metadata = {
  title: "Urovi Spa",
  description: house.blurb,
};

const therapies = [
  { title: "Signature Facials", desc: "Deep-cleansing, brightening and hydrating facials tailored to your skin." },
  { title: "Full-Body Massage", desc: "Swedish, deep-tissue and aromatherapy massage to release tension." },
  { title: "Body Scrubs & Wraps", desc: "Exfoliating scrubs and nourishing wraps for renewed, glowing skin." },
  { title: "Manicure & Pedicure", desc: "Meticulous nail care in a calm, unhurried setting." },
  { title: "Steam & Sauna", desc: "Detoxifying heat therapy to soothe muscles and clear the mind." },
  { title: "Wellness Rituals", desc: "Curated multi-step rituals for a complete reset." },
];

export default function UroviSpaPage() {
  return (
    <>
      <BrandHero house={house} ctaLabel="Book a session" ctaHref="#services" />

      <Section>
        <Container>
          <p className="mx-auto max-w-3xl text-center font-heading text-2xl font-light leading-snug text-balance sm:text-3xl">
            A quiet place to slow down. Every treatment is a moment of genuine
            restoration — step in, let go, feel the difference.
          </p>
        </Container>
      </Section>

      <Section soft id="services" className="scroll-mt-20">
        <Container>
          <SectionIntro
            eyebrow="Therapies"
            title="Treatments to restore you"
            lead="Premium therapies delivered by skilled hands, in a calm and organic setting."
          />
          <div className="mt-10">
            <FeatureGrid items={therapies} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionIntro eyebrow="The space" title="Calm, by design" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {["Treatment room", "Botanicals", "Lounge"].map((label, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <PlaceholderImage accent={house.accent} className="aspect-[3/4]" label={label} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaCard
        eyebrow="Book your session"
        title="Wellness, the way it was meant."
        sub="Step in. Let go. Feel the difference at Urovi Spa."
        ctaLabel="Book via WhatsApp"
        ctaHref={waLink("Hi Urovi Spa! I'd like to book a session...")}
        accent={house.accent}
        external
      />
    </>
  );
}

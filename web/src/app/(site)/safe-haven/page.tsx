import type { Metadata } from "next";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { SliderHero } from "@/components/slider-hero";
import { FeatureGrid } from "@/components/feature-grid";
import { ParallaxImage } from "@/components/parallax-image";
import { CtaCard } from "@/components/cta-card";
import { Reveal } from "@/components/reveal";
import { houseBySlug, waLink } from "@/data/site";

const house = houseBySlug("safe-haven")!;

export const metadata: Metadata = {
  title: "Safe Haven",
  description: house.blurb,
};

const amenities = [
  { title: "Fully Serviced", desc: "Housekeeping, fresh linen and discreet in-house attention throughout your stay." },
  { title: "Private & Anonymous", desc: "No public listings, no walk-ins — curated access only." },
  { title: "Prime Location", desc: "Quietly positioned in the heart of Warri, close to everything." },
  { title: "Modern Interiors", desc: "Considered, contemporary spaces designed to feel like home." },
  { title: "24/7 Concierge", desc: "A dedicated team on hand for anything you need, any hour." },
  { title: "Secure & Gated", desc: "Round-the-clock security and controlled, private entry." },
];

export default function SafeHavenPage() {
  return (
    <>
      <SliderHero
        house={house}
        slides={["Living room", "Master bedroom", "Kitchen", "City view"]}
        ctaLabel="Enquire now"
        ctaHref="#gallery"
      />

      <Section>
        <Container>
          <p className="mx-auto max-w-3xl text-center font-heading text-2xl font-light leading-snug text-balance sm:text-3xl">
            The ultimate retreat, hidden in plain sight. Anonymous luxury
            apartments with exclusive in-house service — refined privacy, made
            effortless.
          </p>
        </Container>
      </Section>

      <Section soft id="gallery" className="scroll-mt-20">
        <Container>
          <SectionIntro eyebrow="The apartment" title="Your private retreat" />
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2">
            <Reveal className="md:col-span-2 md:row-span-2">
              <ParallaxImage accent={house.accent} className="h-full min-h-[260px] md:min-h-[420px]" label="Living room" />
            </Reveal>
            {["Bedroom", "Kitchen", "Bathroom", "City view"].map((label, i) => (
              <Reveal key={label} delay={i * 0.05}>
                <ParallaxImage accent={house.accent} className="aspect-square" label={label} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionIntro
            eyebrow="Amenities"
            title="Everything taken care of"
            lead="Discreet luxury, with the details handled so you can simply arrive and unwind."
          />
          <div className="mt-10">
            <FeatureGrid items={amenities} />
          </div>
        </Container>
      </Section>

      <CtaCard
        eyebrow="Reservations only"
        title="Ready to experience refined privacy?"
        sub="Our concierge will guide you through a private, curated booking."
        ctaLabel="Chat with our concierge"
        ctaHref={waLink(
          "Hi! I'd like to inquire about availability at Safe Haven Luxury Apartments.",
        )}
        accent={house.accent}
        external
      />
    </>
  );
}

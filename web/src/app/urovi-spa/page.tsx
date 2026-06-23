import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { SliderHero } from "@/components/slider-hero";
import { ParallaxImage } from "@/components/parallax-image";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { Reviews } from "@/components/reviews";
import { CtaCard } from "@/components/cta-card";
import { Reveal } from "@/components/reveal";
import { houseBySlug, waLink } from "@/data/site";

const house = houseBySlug("urovi-spa")!;

export const metadata: Metadata = {
  title: "Urovi Spa",
  description: house.blurb,
};

const therapyCategories: { title: string; items: string[] }[] = [
  {
    title: "Facials",
    items: ["Hydrating Facial", "Brightening Facial", "Deep-Cleanse", "Anti-Aging Facial"],
  },
  {
    title: "Massage & Bodywork",
    items: ["Swedish Massage", "Deep-Tissue", "Aromatherapy", "Hot Stone"],
  },
  {
    title: "Scrubs & Wraps",
    items: ["Body Scrub", "Detox Wrap", "Sculpting Wrap", "Hydrating Wrap"],
  },
  {
    title: "Wellness Rituals",
    items: ["Steam & Sauna", "Mani & Pedi", "Full-Body Reset", "Half-Day Retreat"],
  },
];

const gallery = [
  "Treatment room",
  "Botanicals",
  "Relaxation lounge",
  "Steam & sauna",
  "Reception",
  "Quiet corner",
];

const reviews = [
  "Amazing staff and great service — they're so knowledgeable and recommend exactly what your skin and body need.",
  "Best spa experience in Warri by far. The treatments are world-class and the staff truly care about your wellbeing.",
  "I booked the hydra facial and it was transformative. My skin has never glowed like this. Absolutely exceptional.",
  "The moment you walk in, the noise of the city disappears. It's pure calm from start to finish.",
  "I come every month now — it's the one hour that's completely, blissfully mine.",
];

export default function UroviSpaPage() {
  return (
    <>
      <SliderHero
        house={house}
        slides={["Treatment room", "Relaxation lounge", "Steam & sauna", "Reception"]}
        ctaLabel="Book a session"
        ctaHref="#services"
      />

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
          <div className="mt-14 flex flex-col gap-16 md:gap-24">
            {therapyCategories.map((c, i) => (
              <div
                key={c.title}
                className={cn(
                  "flex flex-col gap-8 md:flex-row md:items-center md:gap-12",
                  i % 2 === 1 && "md:flex-row-reverse",
                )}
              >
                <Reveal className="md:w-2/5">
                  <ParallaxImage
                    accent={house.accent}
                    className="mx-auto aspect-[3/4] w-full max-w-sm"
                    label={c.title}
                  />
                </Reveal>
                <div className={cn("md:w-3/5", i % 2 === 1 && "md:text-right")}>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                    {c.title}
                  </h3>
                  {/* chips aligned toward the image, capped width */}
                  <ul
                    className={cn(
                      "mt-5 flex max-w-md flex-wrap gap-2",
                      i % 2 === 1 && "md:ml-auto md:justify-end",
                    )}
                  >
                    {c.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="gallery" className="scroll-mt-20">
        <Container>
          <SectionIntro
            eyebrow="The space"
            title="Calm, by design"
            lead="A quiet sanctuary in the heart of Warri — step inside before you visit."
          />
        </Container>
        {/* Full-bleed track so cards can scroll past the container edge */}
        <div className="mt-10">
          <Container>
            <GalleryCarousel items={gallery} accent={house.accent} />
          </Container>
        </div>
      </Section>

      <Reviews
        reviews={reviews}
        accent={house.accent}
        title="Loved by our guests"
      />

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

import { JsonLd } from "@/components/json-ld";
import { houseMetadata } from "@/lib/site-config";
import { houseLd } from "@/lib/structured-data";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { SliderHero } from "@/components/slider-hero";
import { FeatureGrid } from "@/components/feature-grid";
import { ParallaxImage } from "@/components/parallax-image";
import { CtaCard } from "@/components/cta-card";
import { Reveal } from "@/components/reveal";
import { houseBySlug, waLink } from "@/data/site";
import { getHero, getSiteSettings, getGallery, houseWhatsapp } from "@/sanity/lib/data";

const house = houseBySlug("safe-haven")!;

export const metadata = houseMetadata("safe-haven");

const amenities = [
  { title: "Fully Serviced", desc: "Housekeeping, fresh linen and discreet in-house attention throughout your stay." },
  { title: "Private & Anonymous", desc: "No public listings, no walk-ins — curated access only." },
  { title: "Prime Location", desc: "Quietly positioned in the heart of Warri, close to everything." },
  { title: "Modern Interiors", desc: "Considered, contemporary spaces designed to feel like home." },
  { title: "24/7 Concierge", desc: "A dedicated team on hand for anything you need, any hour." },
  { title: "Secure & Gated", desc: "Round-the-clock security and controlled, private entry." },
];

export default async function SafeHavenPage() {
  const [hero, settings, gallery] = await Promise.all([
    getHero("safe-haven"),
    getSiteSettings(),
    getGallery("safe-haven-gallery"),
  ]);
  const gimgs = (gallery?.images || []).filter((im) => im?.asset?._ref);
  const galleryTiles = gimgs.length
    ? gimgs.slice(0, 10).map((im) => ({ image: im, label: im?.caption || "" }))
    : ["Living room", "Bedroom", "Kitchen", "Bathroom", "City view"].map(
        (label) => ({ image: undefined, label }),
      );
  return (
    <>
      <JsonLd data={houseLd("safe-haven", house.name, house.blurb, settings)} />
      <SliderHero
        house={house}
        slides={["Living room", "Master bedroom", "Kitchen", "City view"]}
        ctaLabel="Enquire now"
        ctaHref="#gallery"
        hero={hero}
      />

      <Section>
        <Container>
          <Reveal>
            <p className="mx-auto max-w-3xl text-center font-heading text-2xl font-light leading-snug text-balance sm:text-3xl">
              The ultimate retreat, hidden in plain sight. Anonymous luxury
              apartments with exclusive in-house service — refined privacy, made
              effortless.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section soft id="gallery" className="scroll-mt-20">
        <Container>
          <SectionIntro eyebrow="The apartment" title="Your private retreat" />
          {/* Bento that scales to any number of images (up to 10) — first tile large */}
          <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[200px] md:grid-cols-3">
            {galleryTiles.map((t, i) => (
              <Reveal
                key={i}
                delay={(i % 3) * 0.05}
                className={i === 0 ? "col-span-2 row-span-2" : ""}
              >
                <ParallaxImage
                  accent={house.accent}
                  image={t.image}
                  className="h-full"
                  label={t.label}
                />
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
          houseWhatsapp(settings, "safe-haven"),
        )}
        accent={house.accent}
        external
      />
    </>
  );
}

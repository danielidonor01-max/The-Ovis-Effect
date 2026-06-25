import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { FadeIn } from "@/components/fade-in";
import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { HeroHeading } from "@/components/hero-heading";
import { HouseEditorialCard } from "@/components/house-editorial-card";
import { CtaCard } from "@/components/cta-card";
import { houses } from "@/data/site";
import { getHomepage, type SanityImage } from "@/sanity/lib/data";

const stats: [string, string][] = [
  ["04", "Branded houses, one standard"],
  ["460+", "Clients guided nationwide"],
  ["10k+", "Guests served & counting"],
];

export default async function HomePage() {
  const home = await getHomepage();
  const heading = home?.heading || "Wealth, *Appetite* & Wellbeing";
  const cardBySlug: Record<string, SanityImage | undefined> = {
    "good-food-avenue": home?.goodFoodAvenue,
    "urovi-spa": home?.uroviSpa,
    "financial-advisory": home?.financialAdvisory,
    "safe-haven": home?.safeHaven,
  };

  return (
    <>
      {/* Hero — full viewport, text + buttons only */}
      <section className="flex min-h-[calc(100dvh-4rem)] items-center">
        <Container>
          <FadeIn className="mx-auto max-w-4xl text-center">
            <h1
              className="font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-[5.25rem]"
              style={{
                color: home?.titleColor || undefined,
                fontWeight: home?.titleWeight ? Number(home.titleWeight) : undefined,
              }}
            >
              <HeroHeading text={heading} accent="#FF5B04" />
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {home?.subtitle ||
                "One roof, four houses — food, calm, comfort and capital, curated to a single standard right here in Warri."}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={home?.ctaHref || "#houses"}
                className={cn(buttonVariants(), "h-11 rounded-lg px-6")}
              >
                {home?.ctaLabel || "Explore the houses"}
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-lg px-6")}
              >
                Get in touch
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Stats */}
      <Section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 border-y border-border py-10 sm:grid-cols-3 sm:gap-6">
            {stats.map(([n, l], i) => (
              <Reveal
                key={l}
                from={i === 0 ? "left" : i === stats.length - 1 ? "right" : "up"}
                delay={i * 0.08}
                className="text-center"
              >
                <p className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                  <Counter value={n} />
                </p>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm text-muted-foreground">
                  {l}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Branded houses */}
      <Section id="houses" soft className="scroll-mt-20">
        <Container>
          <SectionIntro
            center
            eyebrow="Our branded houses"
            title="Four businesses, one standard"
            lead="Each house is its own world — food, wellness, finance and stays. Step into the one you need."
          />
          <div className="mt-8 flex flex-col divide-y divide-border md:mt-12">
            {houses.map((h, i) => (
              <HouseEditorialCard
                key={h.slug}
                house={h}
                position={i % 2 === 0 ? "left" : "right"}
                image={cardBySlug[h.slug]}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <CtaCard
        eyebrow="The Ovis Effect"
        title="One standard across every house."
        sub="Not sure which house you need? Send a message — we're in Warri, Delta State, and always happy to help."
        ctaLabel="Get in touch"
        ctaHref="/contact"
      />
    </>
  );
}

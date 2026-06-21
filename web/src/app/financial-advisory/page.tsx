import type { Metadata } from "next";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { BrandHero } from "@/components/brand-hero";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaCard } from "@/components/cta-card";
import { houseBySlug, waLink } from "@/data/site";

const house = houseBySlug("financial-advisory")!;

export const metadata: Metadata = {
  title: "Financial Advisory",
  description: house.blurb,
};

const services = [
  { title: "Tax Advisory & Compliance", desc: "PAYE, VAT and filings handled accurately, on time, every time." },
  { title: "Payroll Management", desc: "Reliable, confidential payroll for teams of every size." },
  { title: "Bookkeeping", desc: "Clean, audit-ready books so you always know where you stand." },
  { title: "Business Strategy", desc: "Authoritative guidance to plan, fund and grow with confidence." },
  { title: "Audit Support", desc: "Preparation and representation that stands up to scrutiny." },
  { title: "Financial Planning", desc: "Personalised plans built on precision and high trust." },
];

const stats: [string, string][] = [
  ["₦240k+", "PAYE generated for clients"],
  ["100+", "Tax advisory sessions"],
  ["270+", "Happy clients nationwide"],
];

export default function FinancialAdvisoryPage() {
  return (
    <>
      <BrandHero house={house} ctaLabel="Get advice" ctaHref="#services" />

      <Section>
        <Container>
          <p className="mx-auto max-w-3xl text-center font-heading text-2xl font-light leading-snug text-balance sm:text-3xl">
            The right financial advice changes everything. Hundreds of business
            owners across Delta State trust us with their books, payroll and
            compliance.
          </p>
        </Container>
      </Section>

      <Section soft id="services" className="scroll-mt-20">
        <Container>
          <SectionIntro
            eyebrow="What we do"
            title="Finance partners you can trust"
            lead="Authoritative strategies and dependable execution, built on precision and trust."
          />
          <div className="mt-10">
            <FeatureGrid items={services} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 border-y border-border py-10 sm:grid-cols-3 sm:gap-6">
            {stats.map(([n, l]) => (
              <div key={l} className="text-center">
                <p className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                  {n}
                </p>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm text-muted-foreground">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaCard
        eyebrow="Let's talk"
        title="The right advice changes everything."
        sub="Join the business owners across Delta State who trust us with their numbers."
        ctaLabel="Speak to an advisor"
        ctaHref={waLink(
          "Hi! I'd like to speak with a financial advisor at The Ovis Effect.",
        )}
        accent={house.accent}
        external
      />
    </>
  );
}

import type { Metadata } from "next";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { FinanceHero } from "@/components/finance-hero";
import { FinanceFounder } from "@/components/finance-founder";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaCard } from "@/components/cta-card";
import { Pricing, type Tier } from "@/components/pricing";
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

// FS 4 packages — the firm's published advisory plans.
const tiers: Tier[] = [
  {
    name: "FS 4 Nano",
    price: "₦10,000",
    period: "/month",
    desc: "For businesses that generate less than ₦3,000,000 per year.",
    features: [
      "Business/Individual qualifications",
      "Assets & liabilities identification",
      "Income & expenditure categorisation",
      "Preparation of petty cash account",
      "Income & expenditure statement",
    ],
    cta: "Select Nano",
    href: waLink("Hi, I'm interested in the FS 4 Nano package."),
  },
  {
    name: "FS 4 Micro",
    price: "₦20,000",
    period: "/month",
    desc: "For businesses that generate less than ₦25,000,000 per year.",
    features: [
      "All FS 4 Nano Ent. packages",
      "Tax filing services (PAYE, VAT)",
      "Payroll services (max 5)",
      "Quarterly tax compliance reminders",
      "Preparation of profit/loss account",
    ],
    cta: "Select Micro",
    href: waLink("Hi, I'm interested in the FS 4 Micro package."),
    featured: true,
  },
  {
    name: "FS 4 Small",
    price: "₦40,000",
    period: "/month",
    desc: "For businesses that generate less than ₦100,000,000 per year.",
    features: [
      "All FS 4 Micro Ent. packages",
      "Inventory management & costing",
      "Product/service pricing",
      "Bank reconciliation (max 4 banks)",
      "Preparation of financial statements",
    ],
    cta: "Select Small",
    href: waLink("Hi, I'm interested in the FS 4 Small package."),
  },
  {
    name: "AFS 4 Small",
    price: "₦60,000",
    period: "/month",
    desc: "Advanced financial services for small businesses.",
    features: [
      "All FS 4 Small Ent. packages",
      "Budgeting & financial planning",
      "Monthly tax advisory support",
      "Qualitative & quantitative analysis",
      "Monthly review call (Zoom/physical)",
    ],
    cta: "Select Advance Small",
    href: waLink("Hi, I'm interested in the AFS 4 Small package."),
  },
  {
    name: "FS 4 Medium",
    price: "₦100,000",
    period: "/month",
    desc: "Financial services for businesses making over ₦100,000,000.",
    features: [
      "All AFS 4 Small Ent. packages",
      "Tax filing (PAYE, VAT, CIT, WHT)",
      "Payroll services (max 15)",
      "Advanced forecasting & scenario planning",
      "Annual financial statement review",
    ],
    cta: "Select Medium",
    href: waLink("Hi, I'm interested in the FS 4 Medium package."),
  },
  {
    name: "AFS 4 Medium",
    price: "₦500,000+",
    period: "/month",
    desc: "Advanced financial services for medium, scalable businesses.",
    features: [
      "Full Chief Financial Officer services",
      "All FS 4 Medium Ent. packages",
    ],
    cta: "Select CFO Advance",
    href: waLink("Hi, I'm interested in the AFS 4 Medium package."),
  },
];

export default function FinancialAdvisoryPage() {
  return (
    <>
      <FinanceHero house={house} />

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

      {/* Founder / leadership — trust */}
      <FinanceFounder accent={house.accent} />

      {/* Pricing / tiered plans */}
      <Section soft id="pricing" className="scroll-mt-20">
        <Container>
          <SectionIntro
            center
            eyebrow="Plans"
            title="Plans to take your business to new heights"
            lead="FS 4 packages scale with your revenue — from sole traders to scaling enterprises. Pick a tier and we'll tailor it to your business."
          />
          <div className="mt-12">
            <Pricing tiers={tiers} accent={house.accent} />
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

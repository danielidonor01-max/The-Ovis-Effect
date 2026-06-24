import { Quote } from "lucide-react";
import { Container, Section } from "@/components/primitives";
import { ParallaxImage } from "@/components/parallax-image";
import { Reveal } from "@/components/reveal";
import type { FounderDoc } from "@/sanity/lib/data";

const FALLBACK = {
  eyebrow: "Leadership",
  quote:
    "We don’t just file your taxes — we help you understand your numbers, so every decision you make is a confident one. Precision and trust are non-negotiable here.",
  name: "Founder & Lead Advisor",
  role: "The Ovis Effect · Financial Advisory",
  credentials: [
    "15+ years in finance & advisory",
    "Chartered, regulator-compliant practice",
    "Hundreds of Delta-State businesses served",
  ],
};

export function FinanceFounder({
  accent = "#125c54",
  founder,
}: {
  accent?: string;
  founder?: FounderDoc;
}) {
  const eyebrow = founder?.eyebrow || FALLBACK.eyebrow;
  const quote = founder?.quote || FALLBACK.quote;
  const name = founder?.name || FALLBACK.name;
  const role = founder?.role || FALLBACK.role;
  const credentials =
    founder?.credentials && founder.credentials.length
      ? founder.credentials
      : FALLBACK.credentials;

  return (
    <Section>
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[2fr_3fr] md:gap-14">
          <Reveal>
            <ParallaxImage
              accent={accent}
              image={founder?.image}
              label="Founder"
              className="aspect-[4/5] w-full max-w-sm md:mx-0"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: accent }}
              >
                {eyebrow}
              </p>
              <Quote
                className="mt-5 size-8"
                style={{ color: accent }}
                aria-hidden="true"
              />
              <blockquote className="mt-3 font-heading text-2xl font-light leading-snug text-balance sm:text-3xl">
                {`“${quote}”`}
              </blockquote>

              <div className="mt-6">
                <p className="font-heading text-lg font-semibold">{name}</p>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>

              <ul className="mt-7 flex flex-wrap gap-2">
                {credentials.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

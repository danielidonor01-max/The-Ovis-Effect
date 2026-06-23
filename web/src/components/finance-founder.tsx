import { Quote } from "lucide-react";
import { Container, Section } from "@/components/primitives";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Reveal } from "@/components/reveal";

const credentials = [
  "15+ years in finance & advisory",
  "Chartered, regulator-compliant practice",
  "Hundreds of Delta-State businesses served",
];

export function FinanceFounder({ accent = "#125c54" }: { accent?: string }) {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[2fr_3fr] md:gap-14">
          <Reveal>
            <PlaceholderImage
              accent={accent}
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
                Leadership
              </p>
              <Quote
                className="mt-5 size-8"
                style={{ color: accent }}
                aria-hidden="true"
              />
              <blockquote className="mt-3 font-heading text-2xl font-light leading-snug text-balance sm:text-3xl">
                “We don’t just file your taxes — we help you understand your
                numbers, so every decision you make is a confident one. Precision
                and trust are non-negotiable here.”
              </blockquote>

              <div className="mt-6">
                {/* TODO: replace with the founder's real name + portrait */}
                <p className="font-heading text-lg font-semibold">
                  Founder &amp; Lead Advisor
                </p>
                <p className="text-sm text-muted-foreground">
                  The Ovis Effect · Financial Advisory
                </p>
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

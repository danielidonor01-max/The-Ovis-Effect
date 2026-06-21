import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/reveal";

export function CtaCard({
  eyebrow,
  title,
  sub,
  ctaLabel,
  ctaHref,
  accent = "#ff5b04",
  external = false,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  ctaLabel: string;
  ctaHref: string;
  accent?: string;
  external?: boolean;
}) {
  return (
    <Section className="pt-4 pb-24">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 -z-10 size-80 rounded-full opacity-30 blur-[90px]"
              style={{ background: accent }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -left-24 -z-10 size-80 rounded-full opacity-15 blur-[90px]"
              style={{ background: accent }}
            />
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {eyebrow}
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance text-primary-foreground sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-primary-foreground/65">
              {sub}
            </p>
            <Link
              href={ctaHref}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={cn(buttonVariants(), "mt-8 h-11 gap-2 rounded-lg px-6 text-white")}
              style={{ backgroundColor: accent }}
            >
              {ctaLabel} <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

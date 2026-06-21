import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/primitives";
import type { House } from "@/data/site";

export function BrandHero({
  house,
  ctaLabel,
  ctaHref,
}: {
  house: House;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="flex min-h-[calc(100dvh-4rem)] items-center">
      <Container>
        <div className="max-w-3xl">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: house.accent }}
          >
            {house.tag}
          </p>
          <h1 className="mt-5 font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
            {house.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {house.blurb}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={ctaHref}
              className={cn(buttonVariants(), "h-11 rounded-lg px-6 text-white")}
              style={{ backgroundColor: house.accent }}
            >
              {ctaLabel}
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-lg px-6")}
            >
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

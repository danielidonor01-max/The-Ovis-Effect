"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/primitives";
import { FadeIn } from "@/components/fade-in";
import { HeroHeading } from "@/components/hero-heading";
import { urlForImage } from "@/sanity/lib/image";
import type { HeroContent, MenuCategoryDoc } from "@/sanity/lib/data";

const ACCENT = "#ff5b04";

function scrollToCat(key: string) {
  document
    .getElementById(`cat-${key}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function GfaHero({
  hero,
  menu,
}: {
  hero?: HeroContent | null;
  menu: MenuCategoryDoc[];
}) {
  const cats = menu.map((c) => ({ key: c.key, label: c.label, image: c.image }));
  const [active, setActive] = useState(cats.length - 1);

  return (
    <section className="flex min-h-[calc(100dvh-4rem)] items-center py-12">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between">
          {/* Left — text */}
          <FadeIn className="w-full text-center lg:w-[46%] lg:text-left">
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              {hero?.eyebrow || "Appetite · Good Food Avenue"}
            </p>
            <h1
              className="mt-5 font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl"
              style={{
                color: hero?.titleColor || undefined,
                fontWeight: hero?.titleWeight ? Number(hero.titleWeight) : undefined,
              }}
            >
              <HeroHeading text={hero?.heading || "Taste the *vibrancy.*"} accent={ACCENT} />
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              {hero?.subtitle ||
                "Premium Nigerian dishes, grills and fresh fruit drinks — prepared with authentic spices and delivered across Warri."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href={hero?.ctaHref || "/good-food-avenue/order"}
                className={cn(buttonVariants(), "h-11 gap-2 rounded-lg px-6 text-white")}
                style={{ backgroundColor: ACCENT }}
              >
                {hero?.ctaLabel || "Order now"} <ArrowRight className="size-4" />
              </Link>
              <button
                type="button"
                onClick={() => scrollToCat(cats[0].key)}
                className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-lg px-6")}
              >
                View categories
              </button>
            </div>
          </FadeIn>

          {/* Right — image accordion (desktop) */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="flex flex-row items-center justify-end gap-3">
              {cats.map((c, i) => (
                <button
                  key={c.key}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => scrollToCat(c.key)}
                  aria-label={`View ${c.label}`}
                  className={cn(
                    // ONE constant radius (32px) for both states — 32px == half the
                    // 64px idle width, so idle cards read as fully-rounded caps while
                    // the radius never changes during the width animation.
                    "relative h-[440px] shrink-0 cursor-pointer overflow-hidden rounded-card transition-[width] duration-700 ease-in-out",
                    i === active ? "w-[300px]" : "w-[64px]",
                  )}
                >
                  {c.image?.asset?._ref ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlForImage(c.image).width(600).height(880).url()}
                      alt=""
                      className="absolute inset-0 size-full object-cover"
                    />
                  ) : (
                    <>
                      <span
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(150deg, ${ACCENT}cc, #16232a)` }}
                      />
                      <span className="absolute inset-0 grid place-items-center">
                        <ImageIcon className="size-7 text-white/25" />
                      </span>
                    </>
                  )}
                  <span className="absolute inset-0 bg-black/30" />
                  <span
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-heading text-base font-semibold text-white transition-all duration-300",
                      i === active ? "bottom-5 rotate-0" : "bottom-20 rotate-90",
                    )}
                  >
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right — horizontal scroll (mobile) */}
          <div className="-mx-5 w-screen overflow-x-auto px-5 pb-2 lg:hidden">
            <div className="flex gap-3">
              {cats.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => scrollToCat(c.key)}
                  aria-label={`View ${c.label}`}
                  className="relative h-44 w-36 shrink-0 overflow-hidden rounded-card"
                >
                  {c.image?.asset?._ref ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlForImage(c.image).width(360).height(440).url()}
                      alt=""
                      className="absolute inset-0 size-full object-cover"
                    />
                  ) : (
                    <>
                      <span
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(150deg, ${ACCENT}cc, #16232a)` }}
                      />
                      <span className="absolute inset-0 grid place-items-center">
                        <ImageIcon className="size-6 text-white/25" />
                      </span>
                    </>
                  )}
                  <span className="absolute inset-0 bg-black/25" />
                  <span className="absolute bottom-3 left-3 font-heading text-sm font-semibold text-white">
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

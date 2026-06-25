"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/primitives";
import { HeroHeading } from "@/components/hero-heading";
import { urlForImage } from "@/sanity/lib/image";
import type { House } from "@/data/site";
import type { HeroContent } from "@/sanity/lib/data";

// Tall, full-width image slider with the brand text overlaid bottom-left.
// Shared by Safe Haven (apartments) and Urovi Spa (the space). Slides come from
// the CMS hero images when present, otherwise the passed placeholder labels.
export function SliderHero({
  house,
  slides,
  ctaLabel,
  ctaHref,
  hero,
}: {
  house: House;
  slides: string[];
  ctaLabel: string;
  ctaHref: string;
  hero?: HeroContent | null;
}) {
  const accent = house.accent;

  const cmsImages = (hero?.images || []).filter((im) => im?.asset?._ref);
  const slidesData = cmsImages.length
    ? cmsImages.map((im, i) => ({
        key: `cms-${i}`,
        label: im?.caption || "",
        url: urlForImage(im!).width(1600).height(1100).url(),
      }))
    : slides.map((label) => ({ key: label, label, url: null as string | null }));

  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slidesData.length), 4500);
    return () => clearInterval(t);
  }, [slidesData.length]);

  return (
    <section className="pt-20 pb-4 sm:pt-24">
      <Container>
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden rounded-card">
          {slidesData.map((s, idx) => (
            <div
              key={s.key}
              aria-hidden={idx !== i || undefined}
              className={cn(
                "absolute inset-0 transition-opacity duration-[900ms] ease-in-out",
                idx === i ? "opacity-100" : "opacity-0",
              )}
            >
              {s.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.url}
                  alt={s.label}
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(125deg, ${accent}cc, #16232a)` }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <ImageIcon className="size-14 text-white/15" />
                  </div>
                </>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10" />
              {s.label && (
                <span className="absolute top-6 right-7 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 sm:right-9">
                  {s.label}
                </span>
              )}
            </div>
          ))}

          {/* Overlaid brand text — bottom-left */}
          <motion.div
            className="absolute inset-x-7 bottom-9 max-w-2xl text-white sm:inset-x-10 sm:bottom-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
              {hero?.eyebrow || house.tag}
            </p>
            <h1
              className="mt-4 font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl"
              style={{
                color: hero?.titleColor || undefined,
                fontWeight: hero?.titleWeight ? Number(hero.titleWeight) : undefined,
              }}
            >
              <HeroHeading text={hero?.heading || house.name} accent={accent} />
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {hero?.subtitle || house.blurb}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={hero?.ctaHref || ctaHref}
                className={cn(buttonVariants(), "h-11 rounded-lg px-6 text-white")}
                style={{ backgroundColor: accent }}
              >
                {hero?.ctaLabel || ctaLabel}
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11 rounded-lg border-white/40 bg-white/10 px-6 text-white backdrop-blur hover:bg-white/20",
                )}
              >
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Slide indicators — bottom-right */}
          <div className="absolute right-7 bottom-9 z-10 flex gap-1.5 sm:right-10 sm:bottom-12">
            {slidesData.map((s, idx) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show slide ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === i ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

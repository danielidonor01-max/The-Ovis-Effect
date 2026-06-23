"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/primitives";
import type { House } from "@/data/site";

// Tall, full-width image slider with the brand text overlaid bottom-left.
// Shared by Safe Haven (apartments) and Urovi Spa (the space).
export function SliderHero({
  house,
  slides,
  ctaLabel,
  ctaHref,
}: {
  house: House;
  slides: string[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const accent = house.accent;
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="pt-20 pb-4 sm:pt-24">
      <Container>
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden rounded-3xl">
          {slides.map((label, idx) => (
            <div
              key={label}
              aria-hidden={idx !== i}
              className={cn(
                "absolute inset-0 transition-opacity duration-[900ms] ease-in-out",
                idx === i ? "opacity-100" : "opacity-0",
              )}
            >
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(125deg, ${accent}cc, #16232a)` }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <ImageIcon className="size-14 text-white/15" />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10" />
              <span className="absolute top-6 right-7 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 sm:right-9">
                {label}
              </span>
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
              {house.tag}
            </p>
            <h1 className="mt-4 font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
              {house.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {house.blurb}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={ctaHref}
                className={cn(buttonVariants(), "h-11 rounded-lg px-6 text-white")}
                style={{ backgroundColor: accent }}
              >
                {ctaLabel}
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
            {slides.map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show ${label}`}
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

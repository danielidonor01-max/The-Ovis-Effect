"use client";

import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import type { House } from "@/data/site";
import type { SanityImage } from "@/sanity/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HouseEditorialCard({
  house,
  position,
  image,
}: {
  house: House;
  position: "left" | "right";
  image?: SanityImage;
}) {
  const right = position === "right";
  const src = image?.asset?._ref
    ? urlForImage(image).width(680).height(920).url()
    : null;
  const parts = house.name.split(" ");
  const last = parts.pop()!;
  const first = parts.join(" ");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative flex flex-col py-10 md:py-14"
    >
      {/* Tag — editorial uppercase tracking */}
      <p
        className={cn(
          "mb-5 text-xs font-semibold uppercase tracking-[0.3em]",
          right && "md:text-right",
        )}
        style={{ color: house.accent }}
      >
        {house.tag}
      </p>

      <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-end md:gap-0">
        {/* Portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className={cn(
            "relative aspect-[3/4] w-full overflow-hidden rounded-2xl md:aspect-auto md:h-[460px] md:w-[340px] md:shrink-0",
            right && "md:order-1",
          )}
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={house.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="grid h-full w-full place-items-center bg-muted"
              style={{
                backgroundImage: `linear-gradient(135deg, ${house.accent}1f, transparent 62%)`,
              }}
            >
              <ImageIcon className="size-9 text-muted-foreground/30" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent" />
        </motion.div>

        {/* Info block — overlaps the portrait on desktop */}
        <motion.div
          initial={{ opacity: 0, x: right ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
          className={cn(
            "relative z-[2] flex flex-col gap-8 md:w-[calc(100%-300px)] md:gap-12",
            right ? "md:-right-10 md:items-end" : "md:-left-10",
          )}
        >
          {/* Display name */}
          <p
            className={cn(
              "font-heading text-5xl font-light leading-[1.02] tracking-tight md:text-6xl",
              right && "md:text-right",
            )}
          >
            {first}
            <br />
            <span className="font-semibold">{last}</span>
          </p>

          {/* Details row — circular CTA + bio */}
          <div className={cn("flex items-start gap-6 md:gap-8", right && "md:justify-end")}>
            <Link
              href={`/${house.slug}`}
              aria-label={`Enter ${house.name}`}
              className={cn(
                "group flex size-16 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-300 hover:border-primary hover:bg-primary md:size-20",
                right && "md:order-1",
              )}
            >
              <ArrowRight
                className={cn(
                  "size-5 text-foreground transition-all duration-300 group-hover:-rotate-45 group-hover:text-primary-foreground",
                  right && "md:rotate-180 md:group-hover:rotate-[135deg]",
                )}
              />
            </Link>
            <p
              className={cn(
                "max-w-xs text-sm leading-[1.8] text-muted-foreground",
                right && "md:text-right",
              )}
            >
              {house.blurb}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

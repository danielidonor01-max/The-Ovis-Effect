"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/data";

// Scroll parallax: the (over-tall) image layer drifts vertically inside a
// clipped frame. Renders a real CMS image when `image` is set, otherwise a
// branded placeholder. Icon + label stay fixed.
export function ParallaxImage({
  accent = "#ff5b04",
  className,
  label,
  image,
  amount = 44,
}: {
  accent?: string;
  className?: string;
  label?: string;
  image?: SanityImage;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  const src = image?.asset?._ref
    ? urlForImage(image).width(900).height(1200).url()
    : null;

  return (
    <div
      ref={ref}
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-2xl bg-muted",
        className,
      )}
    >
      <motion.div
        aria-hidden="true"
        style={{
          y: reduce ? 0 : y,
          ...(src
            ? {}
            : {
                backgroundImage: `linear-gradient(135deg, ${accent}1f, transparent 62%)`,
              }),
        }}
        className="absolute inset-x-0 -top-16 h-[calc(100%+128px)]"
      >
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={label || ""} className="size-full object-cover" />
        )}
      </motion.div>

      {!src && (
        <>
          <ImageIcon className="relative size-8 text-muted-foreground/30" />
          {label && (
            <span className="absolute bottom-3 left-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}

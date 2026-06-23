"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Drop-in replacement for <PlaceholderImage> that adds a scroll parallax:
// the (over-tall) image layer drifts vertically inside a clipped frame, while
// the icon + label stay fixed. Swap the gradient layer for an <img> later and
// the same parallax applies for free.
export function ParallaxImage({
  accent = "#ff5b04",
  className,
  label,
  amount = 44,
}: {
  accent?: string;
  className?: string;
  label?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

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
          backgroundImage: `linear-gradient(135deg, ${accent}1f, transparent 62%)`,
        }}
        className="absolute inset-x-0 -top-16 h-[calc(100%+128px)]"
      />
      <ImageIcon className="relative size-8 text-muted-foreground/30" />
      {label && (
        <span className="absolute bottom-3 left-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
          {label}
        </span>
      )}
    </div>
  );
}

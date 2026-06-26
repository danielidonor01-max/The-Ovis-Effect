"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { buttonVariants } from "@/components/ui/button";

type Letter = { ch: string; accent: boolean };

// Split "Wealth, *Appetite* & Wellbeing" into words → letters, tracking which
// belong to the *highlighted* word.
function toWords(text: string): Letter[][] {
  const flat: Letter[] = [];
  for (const part of text.split(/(\*[^*]+\*)/g)) {
    const accent = part.startsWith("*") && part.endsWith("*");
    for (const ch of accent ? part.slice(1, -1) : part) flat.push({ ch, accent });
  }
  const words: Letter[][] = [];
  let cur: Letter[] = [];
  for (const l of flat) {
    if (l.ch === " ") {
      if (cur.length) words.push(cur);
      cur = [];
    } else cur.push(l);
  }
  if (cur.length) words.push(cur);
  return words;
}

export function HeroIntro({
  heading,
  subtitle,
  ctaLabel,
  ctaHref,
  accent = "#FF5B04",
  color,
  weight,
}: {
  heading: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  accent?: string;
  color?: string;
  weight?: string;
}) {
  const words = toWords(heading);
  const total = words.reduce((s, w) => s + w.length, 0);
  const STAGGER = 0.035;
  const done = total * STAGGER + 0.3; // ~when the heading finishes spelling out
  let i = 0;

  return (
    <div className="mx-auto max-w-4xl text-center">
      <h1
        aria-label={heading.replace(/\*/g, "")}
        className="font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-[5.25rem]"
        style={{
          color: color || undefined,
          fontWeight: weight ? Number(weight) : undefined,
        }}
      >
        <span aria-hidden="true">
          {words.map((word, wi) => (
            <Fragment key={wi}>
              <span className="inline-block">
                {word.map((l, li) => {
                  const idx = i++;
                  return (
                    <motion.span
                      key={li}
                      className="inline-block"
                      style={l.accent ? { color: accent } : undefined}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * STAGGER, ease: EASE }}
                    >
                      {l.ch}
                    </motion.span>
                  );
                })}
              </span>
              {wi < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      </h1>

      <motion.p
        className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: done + 0.05, ease: EASE }}
      >
        {subtitle}
      </motion.p>

      <motion.div
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: done + 0.25, ease: EASE }}
      >
        <Link href={ctaHref} className={cn(buttonVariants(), "h-11 rounded-lg px-6")}>
          {ctaLabel}
        </Link>
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-lg px-6")}
        >
          Get in touch
        </Link>
      </motion.div>
    </div>
  );
}

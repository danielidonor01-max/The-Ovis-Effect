"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/components/primitives";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

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
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative isolate overflow-hidden rounded-card bg-primary px-8 py-16 text-center sm:px-16 sm:py-20"
        >
          {/* Slowly drifting accent glows for life */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 -z-10 size-80 rounded-full blur-[90px]"
            style={{ background: accent }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.45, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-24 -z-10 size-80 rounded-full blur-[90px]"
            style={{ background: accent }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={item}
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              variants={item}
              className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance text-primary-foreground sm:text-4xl md:text-5xl"
            >
              {title}
            </motion.h2>
            <motion.p
              variants={item}
              className="mx-auto mt-4 max-w-md leading-relaxed text-primary-foreground/65"
            >
              {sub}
            </motion.p>
            <motion.div variants={item}>
              <Link
                href={ctaHref}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={cn(
                  buttonVariants(),
                  "mt-8 h-11 gap-2 rounded-lg px-6 text-white transition-transform hover:-translate-y-0.5",
                )}
                style={{ backgroundColor: accent }}
              >
                {ctaLabel} <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

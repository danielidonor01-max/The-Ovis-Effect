"use client";

import * as React from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

// On-mount fade-up — the above-the-fold counterpart to <Reveal> (which waits
// for scroll). Same curve, so hero entrances match section reveals.
export function FadeIn({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import * as React from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

// Scroll reveal. `from` chooses the entrance direction:
//  - "up" (default): fades up
//  - "left" / "right": slides in horizontally (like the landing-page cards)
export function Reveal({
  children,
  delay = 0,
  y = 24,
  from = "up",
  distance = 44,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  from?: "up" | "left" | "right";
  distance?: number;
  className?: string;
}) {
  const offset =
    from === "left"
      ? { x: -distance, y: 0 }
      : from === "right"
        ? { x: distance, y: 0 }
        : { x: 0, y };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

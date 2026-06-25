"use client";

import { motion, useReducedMotion } from "motion/react";

// A faint, slowly-morphing mesh of the four house colours behind the hero.
// Only translate (x/y) animates, so the heavy blur stays GPU-cached → smooth on
// mobile. Respects prefers-reduced-motion (renders a static wash).
const BLOBS = [
  { color: "#ff5b04", pos: { left: "6%", top: "8%" }, x: [0, 40, -24, 0], y: [0, -28, 22, 0], dur: 22 },
  { color: "#3e7c66", pos: { right: "4%", top: "14%" }, x: [0, -36, 26, 0], y: [0, 26, -18, 0], dur: 26 },
  { color: "#125c54", pos: { left: "16%", bottom: "6%" }, x: [0, 30, -26, 0], y: [0, 22, -16, 0], dur: 24 },
  { color: "#9a7b3f", pos: { right: "12%", bottom: "10%" }, x: [0, -30, 22, 0], y: [0, -22, 26, 0], dur: 28 },
];

export function HeroBackground() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute size-[62vw] max-w-[480px] rounded-full blur-[72px]"
          style={{ backgroundColor: b.color, opacity: 0.15, ...b.pos }}
          animate={reduce ? undefined : { x: b.x, y: b.y }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

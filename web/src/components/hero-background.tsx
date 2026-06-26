"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// A single, very soft warm glow that gently trails the cursor across the clean
// hero — calm and premium, not "tech". Desktop only (pointer: fine); on
// touch/mobile nothing renders and the text spell-out carries the motion.
// Respects prefers-reduced-motion.
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 45, damping: 18, mass: 1.4 });
  const sy = useSpring(y, { stiffness: 45, damping: 18, mass: 1.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    x.set(rect.width / 2);
    y.set(rect.height * 0.42);
    setOn(true);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {on && (
        <motion.div
          className="absolute left-0 top-0 -ml-[330px] -mt-[330px] size-[660px] rounded-full blur-[46px]"
          style={{
            x: sx,
            y: sy,
            background:
              "radial-gradient(circle, rgba(255,91,4,0.09), rgba(255,91,4,0.035) 42%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

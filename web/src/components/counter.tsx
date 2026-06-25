"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";
import { EASE } from "@/lib/motion";

// Counts the numeric part of a stat (e.g. "460+", "10k+", "04", "₦240k+") up
// from 0 when it scrolls into view, preserving any prefix / suffix / formatting.
export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = Number(numStr.replace(/,/g, ""));
  const hasComma = numStr.includes(",");
  const padTo = /^0\d/.test(numStr) ? numStr.length : 0;

  const format = (n: number) => {
    let s = Math.round(n).toString();
    if (padTo) s = s.padStart(padTo, "0");
    else if (hasComma) s = Number(s).toLocaleString();
    return `${prefix}${s}${suffix}`;
  };

  const [display, setDisplay] = useState(() => (match ? format(0) : value));

  useEffect(() => {
    if (!match || !inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  return (
    <span ref={ref} className={className}>
      {match ? display : value}
    </span>
  );
}

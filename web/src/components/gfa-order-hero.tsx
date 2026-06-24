"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/primitives";
import type { MenuCategoryDoc } from "@/sanity/lib/data";

const ACCENT = "#ff5b04";

export function GfaOrderHero({ menu }: { menu: MenuCategoryDoc[] }) {
  const slides = menu.map((c) => ({
    key: c.key,
    label: c.label,
    sample: c.items.slice(0, 3).map((i) => i.name).join(" · "),
  }));
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="pt-24 pb-6 sm:pt-28">
      <Container>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Order your favourites
        </h1>

        {/* Full-width auto-transitioning card */}
        <div className="relative mt-6 h-[300px] w-full overflow-hidden rounded-3xl sm:h-[420px]">
          {slides.map((s, idx) => (
            <div
              key={s.key}
              aria-hidden={idx !== i || undefined}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                idx === i ? "opacity-100" : "opacity-0",
              )}
            >
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(125deg, ${ACCENT}cc, #16232a)` }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <ImageIcon className="size-12 text-white/15" />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-7 bottom-7 text-white sm:inset-x-9 sm:bottom-9">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                  Good Food Avenue
                </p>
                <p className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  {s.label}
                </p>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/70">
                  {s.sample}
                </p>
              </div>
            </div>
          ))}

          {/* Indicators */}
          <div className="absolute right-7 bottom-7 z-10 flex gap-1.5 sm:right-9 sm:bottom-9">
            {slides.map((s, idx) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show ${s.label}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === i ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </div>

        <a
          href="#order"
          className="mt-4 inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Jump to the menu ↓
        </a>
      </Container>
    </section>
  );
}

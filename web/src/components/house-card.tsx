import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import type { House } from "@/data/site";

export function HouseCard({ house }: { house: House }) {
  return (
    <Link
      href={`/${house.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-28px_rgba(22,35,42,0.30)]"
    >
      {/* Image placeholder (swap for real photography later) */}
      <div
        className="relative grid aspect-[16/11] place-items-center overflow-hidden bg-muted"
        style={{
          backgroundImage: `linear-gradient(135deg, ${house.accent}14, transparent 60%)`,
        }}
      >
        <ImageIcon className="size-8 text-muted-foreground/35" />
        <span
          className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm"
          style={{ color: house.accent }}
        >
          {house.tag}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-2xl font-bold tracking-tight">
          {house.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {house.blurb}
        </p>
        <span
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
          style={{ color: house.accent }}
        >
          {house.cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

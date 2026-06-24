"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PlaceholderImage } from "@/components/placeholder-image";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/data";

export function GalleryCarousel({
  items,
  images,
  accent = "#3e7c66",
}: {
  items: string[];
  images?: SanityImage[];
  accent?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const cmsImages = (images || []).filter((im) => im?.asset?._ref);
  const cards = cmsImages.length
    ? cmsImages.map((im, i) => ({
        key: `img-${i}`,
        label: im?.caption || "",
        url: urlForImage(im!).width(700).height(900).url(),
      }))
    : items.map((label) => ({ key: label, label, url: null as string | null }));

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c, i) => (
          <div
            key={c.key}
            data-card
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
          >
            {c.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.url}
                alt={c.label}
                className={
                  "w-full rounded-2xl object-cover " +
                  (i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/5]")
                }
              />
            ) : (
              <PlaceholderImage
                accent={accent}
                label={c.label}
                className={i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"}
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label="Previous"
        className="absolute left-2 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/90 shadow-md backdrop-blur transition hover:bg-card hover:shadow-lg sm:grid"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label="Next"
        className="absolute right-2 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/90 shadow-md backdrop-blur transition hover:bg-card hover:shadow-lg sm:grid"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

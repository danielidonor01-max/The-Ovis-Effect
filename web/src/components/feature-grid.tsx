import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export type Feature = { title: string; desc: string };

export function FeatureGrid({
  items,
  cols = 3,
}: {
  items: Feature[];
  cols?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-6",
        cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {items.map((f, i) => (
        <Reveal key={f.title} delay={i * 0.05}>
          <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
            <h3 className="font-heading text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {f.desc}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

export type Tier = {
  name: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

export function Pricing({
  tiers,
  accent = "#125c54",
}: {
  tiers: Tier[];
  accent?: string;
}) {
  return (
    // One framed mega-card; cells are split by 1px hairlines (gap-px over a
    // border-coloured grid background), so there are no doubled edges at any
    // breakpoint — the outer frame is the only border.
    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border">
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={cn(
              "relative flex flex-col bg-card px-7 pb-8",
              t.featured ? "pt-12" : "pt-8",
            )}
          >
            {t.featured && (
              <>
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${accent}14, transparent 55%)`,
                  }}
                  aria-hidden="true"
                />
                <span
                  className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
                  style={{ backgroundColor: accent }}
                >
                  Most Popular
                </span>
              </>
            )}

            <div className="relative flex flex-1 flex-col">
              <h3 className="font-heading text-base font-semibold">{t.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {t.desc}
              </p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-2xl font-semibold tracking-tight">
                  {t.price}
                </span>
                {t.period && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {t.period}
                  </span>
                )}
              </div>

              <Link
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                style={
                  t.featured
                    ? { backgroundColor: accent }
                    : ({ "--acc": accent } as React.CSSProperties)
                }
                className={cn(
                  "mt-5 inline-flex h-10 w-fit items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors",
                  t.featured
                    ? "text-white hover:opacity-90"
                    : "bg-foreground text-background hover:bg-[var(--acc)] hover:text-white",
                )}
              >
                {t.cta}
              </Link>

              <ul className="mt-7 space-y-2">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="relative pl-4 text-xs leading-relaxed text-foreground/80"
                  >
                    <span
                      className="absolute left-0 text-muted-foreground"
                      aria-hidden="true"
                    >
                      •
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

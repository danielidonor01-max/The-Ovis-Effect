import Link from "next/link";
import { TrendingUp, ShieldCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/primitives";
import type { House } from "@/data/site";

const bars = [38, 60, 46, 72, 55, 92, 64];
const rows: { label: string; val: string; up: boolean }[] = [
  { label: "PAYE filing", val: "+₦120,000", up: true },
  { label: "VAT remittance", val: "−₦27,400", up: false },
];

export function FinanceHero({ house }: { house: House }) {
  const accent = house.accent;
  return (
    <section className="flex min-h-[calc(100dvh-4rem)] items-center py-16">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left — hero text (unchanged) + avatar social proof */}
          <div className="max-w-2xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              {house.tag}
            </p>
            <h1 className="mt-5 font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
              {house.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {house.blurb}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#pricing"
                className={cn(buttonVariants(), "h-11 rounded-lg px-6 text-white")}
                style={{ backgroundColor: accent }}
              >
                See our plans
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-lg px-6")}
              >
                Contact
              </Link>
            </div>

            {/* Mini social proof — avatars + count */}
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[0.22, 0.4, 0.6, 0.85].map((o, i) => (
                  <span
                    key={i}
                    className="inline-block size-10 rounded-full border-2 border-background ring-1 ring-black/5"
                    style={{ backgroundColor: accent, opacity: o }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm leading-snug text-muted-foreground">
                <span className="font-semibold text-foreground">270+ businesses</span>{" "}
                across Delta State trust us with their numbers.
              </p>
            </div>
          </div>

          {/* Right — organized transaction cards (placeholders) */}
          <div className="relative mx-auto w-full max-w-sm pb-12 pl-12 lg:mx-0 lg:max-w-md">
            {/* Main statement card */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/[0.06]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly revenue</p>
                  <p className="mt-1 font-heading text-3xl font-semibold tracking-tight">
                    ₦4.2M
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ backgroundColor: `${accent}14`, color: accent }}
                >
                  <TrendingUp className="size-3.5" />
                  +12%
                </span>
              </div>

              {/* Bar chart */}
              <div className="mt-6 flex h-24 items-end gap-2" aria-hidden="true">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i === 5 ? accent : `${accent}26`,
                    }}
                  />
                ))}
              </div>

              {/* Transaction rows */}
              <div className="mt-5 space-y-3 border-t border-border pt-4">
                {rows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="grid size-8 place-items-center rounded-full"
                        style={{ backgroundColor: `${accent}14`, color: accent }}
                      >
                        {r.up ? (
                          <ArrowUpRight className="size-4" />
                        ) : (
                          <ArrowDownRight className="size-4" />
                        )}
                      </span>
                      <span className="text-sm font-medium">{r.label}</span>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">{r.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating compliance card */}
            <div
              className="absolute bottom-0 left-0 w-44 rounded-2xl p-5 text-white shadow-xl shadow-black/10"
              style={{ backgroundColor: accent }}
            >
              <ShieldCheck className="size-5" />
              <p className="mt-3 text-sm font-medium leading-snug">
                Tax compliance, filed on time.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

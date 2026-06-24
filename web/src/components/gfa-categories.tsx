import { cn } from "@/lib/utils";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { ParallaxImage } from "@/components/parallax-image";
import { Reveal } from "@/components/reveal";
import type { MenuCategoryDoc } from "@/sanity/lib/data";

const ACCENT = "#ff5b04";

export function GfaCategories({ menu }: { menu: MenuCategoryDoc[] }) {
  return (
    <Section soft id="categories" className="scroll-mt-20">
      <Container>
        <SectionIntro
          center
          eyebrow="The menu"
          title="Five categories, endless cravings"
          lead="From smoky jollof to rich native soups — here's what's on."
        />

        <div className="mt-14 flex flex-col gap-16 md:gap-24">
          {menu.map((c, i) => (
            <div
              key={c.key}
              id={`cat-${c.key}`}
              className={cn(
                "flex scroll-mt-24 flex-col gap-8 md:flex-row md:items-center md:gap-12",
                i % 2 === 1 && "md:flex-row-reverse",
              )}
            >
              <Reveal className="md:w-2/5">
                <ParallaxImage
                  accent={ACCENT}
                  image={c.image}
                  className="mx-auto aspect-[3/4] w-full max-w-sm"
                  label={c.label}
                />
              </Reveal>
              <div className={cn("md:w-3/5", i % 2 === 1 && "md:text-right")}>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  {c.label}
                </h3>
                {/* max 4 chips per line (capped width) + aligned toward the image */}
                <ul
                  className={cn(
                    "mt-5 flex max-w-md flex-wrap gap-2",
                    i % 2 === 1 && "md:ml-auto md:justify-end",
                  )}
                >
                  {c.items.map((it) => (
                    <li
                      key={it.name}
                      className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
                    >
                      {it.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

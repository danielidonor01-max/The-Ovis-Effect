import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";
import type { SanityImage } from "@/sanity/lib/data";

export function PriceCta({
  eyebrow,
  title,
  body,
  ctaLabel,
  image,
  pdfUrl,
  accent = "#3e7c66",
}: {
  eyebrow?: string | null;
  title?: string | null;
  body?: string | null;
  ctaLabel?: string | null;
  image?: SanityImage;
  pdfUrl?: string | null;
  accent?: string;
}) {
  // GROQ returns `null` (not `undefined`) for empty CMS fields, which slips
  // past default params — coalesce so empty fields fall back and, critically,
  // `<Link href>` is never null (that crashes prerender).
  const eyebrowText = eyebrow || "Pricing";
  const titleText = title || "See our full treatment menu & prices";
  const bodyText =
    body ||
    "Browse every facial, massage, scrub and ritual with up-to-date pricing — download the full Urovi Spa price list.";
  const ctaText = ctaLabel || "View pricing";
  const href = pdfUrl || "/urovi-spa-pricing.pdf";

  return (
    <Section soft>
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal from="left">
            <ParallaxImage
              accent={accent}
              image={image}
              label="Wellness"
              className="aspect-[4/3] w-full"
            />
          </Reveal>

          <Reveal from="right">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: accent }}
              >
                {eyebrowText}
              </p>
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {titleText}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                {bodyText}
              </p>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants(),
                  "mt-7 h-11 gap-2 rounded-lg px-6 text-white",
                )}
                style={{ backgroundColor: accent }}
              >
                {ctaText} <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

import { Container } from "@/components/primitives";

export function Reviews({
  reviews,
  accent = "#3e7c66",
  eyebrow = "Reviews",
  title = "What our customers say",
}: {
  reviews: string[];
  accent?: string;
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="overflow-hidden py-16 sm:py-20">
      <Container>
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: accent }}
        >
          {eyebrow}
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </Container>

      {/* Flush full-bleed band — cards touch edge to edge, alternating shades */}
      <div className="mt-10 flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reviews.map((quote, i) => (
          <article
            key={i}
            className="flex w-[85vw] min-h-[284px] max-w-[372px] shrink-0 snap-start items-center justify-center p-8 text-white sm:h-[300px] sm:w-[372px] sm:max-w-none"
            style={
              i % 2 === 0
                ? { backgroundColor: accent }
                : {
                    backgroundColor: accent,
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0.14), rgba(0,0,0,0.14))",
                  }
            }
          >
            <div className="w-[264px] max-w-full">
              <span
                aria-hidden="true"
                className="block text-6xl leading-[0.5] text-white/50"
                style={{ fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>
              <p className="mt-9 leading-relaxed text-white/95">{quote}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

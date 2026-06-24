import * as React from "react";

// Renders a hero title, turning *marked* words into an accent-coloured span.
// Pure function — safe in both server and client components.
export function HeroHeading({
  text,
  accent,
}: {
  text: string;
  accent?: string;
}) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <span key={i} style={accent ? { color: accent } : undefined}>
            {p.slice(1, -1)}
          </span>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        ),
      )}
    </>
  );
}

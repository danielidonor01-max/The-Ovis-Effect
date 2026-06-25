import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  soft,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  soft?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28", soft && "bg-surface", className)}
    >
      {children}
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  lead,
  center,
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      from={center ? "up" : "left"}
      className={cn("max-w-2xl", center && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </p>
      )}
      <Heading className="mt-3 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </Heading>
      {lead && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {lead}
        </p>
      )}
    </Reveal>
  );
}

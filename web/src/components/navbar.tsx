"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { houses, site } from "@/data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-heading text-lg font-bold tracking-tight transition-opacity hover:opacity-70"
            onClick={() => setOpen(false)}
          >
            The Ovis Effect
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {houses.map((h) => {
              const active =
                pathname === `/${h.slug}` || pathname.startsWith(`/${h.slug}/`);
              return (
                <Link
                  key={h.slug}
                  href={`/${h.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative font-heading text-sm transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {h.name}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-foreground transition-all duration-300 ease-out",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default" }),
                "hidden h-10 rounded-lg px-5 sm:inline-flex",
              )}
            >
              Contact us
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              className="-mr-1 inline-flex size-10 items-center justify-center rounded-lg text-foreground lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="flex h-16 items-center justify-between px-5 sm:px-8">
            <span className="font-heading text-lg font-bold tracking-tight">
              The Ovis Effect
            </span>
            <button
              type="button"
              aria-label="Close menu"
              className="-mr-1 inline-flex size-10 items-center justify-center rounded-lg"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8">
            {houses.map((h) => (
              <Link
                key={h.slug}
                href={`/${h.slug}`}
                onClick={() => setOpen(false)}
                className="font-heading text-3xl font-semibold tracking-tight transition-colors hover:text-brand"
              >
                {h.name}
              </Link>
            ))}
          </nav>
          <div className="px-5 pb-10 sm:px-8">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "default" }), "h-12 w-full rounded-lg text-base")}
            >
              Contact us
            </Link>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              {site.location}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

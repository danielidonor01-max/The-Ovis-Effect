"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
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

  // Close the menu when navigating to a new route.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        // NOTE: no backdrop-blur while the menu is open — backdrop-filter would
        // make the fixed overlay get trapped inside the header instead of the viewport.
        open
          ? "bg-background"
          : scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-background/0",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="relative z-[60] font-heading text-lg font-bold tracking-tight transition-opacity hover:opacity-70"
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

            {/* Morphing hamburger ↔ X — sits above the overlay so it stays clickable */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="relative z-[60] -mr-1 grid size-10 place-items-center text-foreground lg:hidden"
            >
              <span className="relative block h-4 w-6">
                <motion.span
                  className="absolute left-0 top-[2px] block h-0.5 w-6 rounded-full bg-foreground"
                  animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-[7px] block h-0.5 w-6 rounded-full bg-foreground"
                  animate={open ? { opacity: 0, scaleX: 0.3 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-[12px] block h-0.5 w-6 rounded-full bg-foreground"
                  animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
          >
            <div className="h-16 shrink-0" aria-hidden />
            <nav className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-1 px-5 sm:px-8">
              {houses.map((h, i) => (
                <motion.div
                  key={h.slug}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.06, ease: EASE }}
                >
                  <Link
                    href={`/${h.slug}`}
                    onClick={() => setOpen(false)}
                    className="block py-1 font-heading text-3xl font-semibold tracking-tight transition-colors hover:text-brand"
                  >
                    {h.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.32, ease: EASE }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import Link from "next/link";
import { houses, site } from "@/data/site";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-heading text-xl font-bold tracking-tight">
              The Ovis Effect
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.tagline}. Four houses, one standard — in {site.location}.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Houses
            </p>
            <ul className="mt-4 space-y-2.5">
              {houses.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/${h.slug}`}
                    className="text-sm transition-colors hover:text-brand"
                  >
                    {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.whatsapp}`} className="transition-colors hover:text-foreground">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="max-w-xs leading-relaxed">{site.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} The Ovis Effect. All rights reserved.</p>
          <p>Warri, Delta State · Nigeria</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { houses, site } from "@/data/site";
import type { SiteSettings } from "@/sanity/lib/data";

type IconProps = { className?: string };

function Instagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Facebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTok({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const year = 2026;
  const email = settings?.email || site.email;
  const phone = settings?.phoneDisplay || site.phoneDisplay;
  const whatsapp = settings?.whatsapp || site.whatsapp;
  const address = settings?.address || site.address;

  const socials = [
    { href: settings?.instagram, label: "Instagram", Icon: Instagram },
    { href: settings?.facebook, label: "Facebook", Icon: Facebook },
    { href: settings?.tiktok, label: "TikTok", Icon: TikTok },
  ].filter((s) => s.href && s.href !== "#");

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
            {socials.length > 0 && (
              <div className="mt-5 flex items-center gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            )}
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
                <a href={`mailto:${email}`} className="transition-colors hover:text-foreground">
                  {email}
                </a>
              </li>
              <li>
                <a href={`tel:${whatsapp}`} className="transition-colors hover:text-foreground">
                  {phone}
                </a>
              </li>
              <li className="max-w-xs leading-relaxed">{address}</li>
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

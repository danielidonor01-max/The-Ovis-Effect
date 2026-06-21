import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container, Section, SectionIntro } from "@/components/primitives";
import { ContactForm } from "@/components/contact-form";
import { site, waLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with The Ovis Effect — Warri, Delta State.",
};

export default function ContactPage() {
  return (
    <Section className="pt-28 pb-24 sm:pt-32">
      <Container>
        <SectionIntro
          eyebrow="Get in touch"
          title="Let's talk."
          lead="Not sure which house you need? Send a message and we'll point you the right way."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-3">
            <ContactRow
              icon={<Mail className="size-5" />}
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <ContactRow
              icon={<Phone className="size-5" />}
              label="Phone · WhatsApp"
              value={site.phoneDisplay}
              href={waLink("Hi The Ovis Effect! I'd like to get in touch.")}
            />
            <ContactRow
              icon={<MapPin className="size-5" />}
              label="Visit"
              value={site.address}
            />
            <div className="mt-3 rounded-2xl border border-border bg-surface p-6">
              <p className="font-heading text-sm font-semibold">Opening hours</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Monday–Sunday · 8am–10pm
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-foreground">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}

import { defineType, defineField } from "sanity";
import { BillIcon } from "@sanity/icons";

export const spaPricing = defineType({
  name: "spaPricing",
  title: "Spa — Pricing CTA",
  type: "document",
  icon: BillIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body text", type: "text", rows: 3 }),
    defineField({
      name: "ctaLabel",
      title: "Button label",
      type: "string",
      initialValue: "View pricing",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Shown on the left of the section. " +
        "📐 Recommended: ~1200×900px (4:3) · keep under ~600 KB.",
    }),
    defineField({
      name: "pdf",
      title: "Price list (PDF)",
      type: "file",
      options: { accept: ".pdf" },
      description:
        "The price-list PDF the button opens. Replace this anytime — a sample is bundled as a fallback.",
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare: ({ title, media }) => ({ title: title || "Spa — Pricing CTA", media }),
  },
});

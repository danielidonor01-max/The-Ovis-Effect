import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { TITLE_COLORS, TITLE_WEIGHTS, DEFAULT_TITLE_COLOR, DEFAULT_TITLE_WEIGHT } from "../lib/presets";

const PAGES = [
  { title: "Good Food Avenue", value: "good-food-avenue" },
  { title: "Urovi Spa", value: "urovi-spa" },
  { title: "Financial Advisory", value: "financial-advisory" },
  { title: "Safe Haven", value: "safe-haven" },
];

export const pageHero = defineType({
  name: "pageHero",
  title: "Page Hero",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: { list: PAGES, layout: "dropdown" },
      validation: (r) => r.required(),
      description: "Which page this hero belongs to (one entry per page).",
    }),
    defineField({ name: "eyebrow", title: "Eyebrow / tag", type: "string" }),
    defineField({
      name: "heading",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
    defineField({
      name: "ctaHref",
      title: "Button link",
      type: "string",
      description:
        "An on-page anchor (e.g. #pricing), a path (e.g. /contact), or leave blank.",
    }),
    defineField({
      name: "titleColor",
      title: "Title colour",
      type: "string",
      options: { list: TITLE_COLORS },
      initialValue: DEFAULT_TITLE_COLOR,
    }),
    defineField({
      name: "titleWeight",
      title: "Title weight",
      type: "string",
      options: { list: TITLE_WEIGHTS },
      initialValue: DEFAULT_TITLE_WEIGHT,
    }),
    defineField({
      name: "images",
      title: "Hero / slider images",
      type: "array",
      description:
        "Used by the Spa and Safe Haven slider heroes (add several to rotate). Other pages can leave this empty. " +
        "📐 Recommended: ~1600×1100px landscape (3:2) · keep under ~800 KB.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "page", media: "images.0" },
  },
});

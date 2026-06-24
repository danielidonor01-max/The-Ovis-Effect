import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "key",
      title: "Key",
      type: "slug",
      options: { source: "label", maxLength: 40 },
      validation: (r) => r.required(),
      description: "Auto-generated id used in links/anchors (e.g. soups-stews).",
    }),
    defineField({
      name: "image",
      title: "Showcase image",
      type: "image",
      options: { hotspot: true },
      description: "Shown in the category showcase on the Good Food Avenue page.",
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first.",
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "label", order: "order", media: "image" },
    prepare: ({ title, order, media }) => ({
      title,
      subtitle: `Order: ${order ?? 0}`,
      media,
    }),
  },
});

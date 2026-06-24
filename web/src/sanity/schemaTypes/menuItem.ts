import { defineType, defineField } from "sanity";
import { BasketIcon } from "@sanity/icons";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "price",
      title: "Price (₦)",
      type: "number",
      description: "In Naira. Leave blank to hide the price for this item.",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "image",
      title: "Avatar image",
      type: "image",
      options: { hotspot: true },
      description:
        "The small image shown on the item card and in its detail view. " +
        "📐 Recommended: ~800×800px square (1:1) · keep under ~300 KB.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "menuCategory" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide from the menu without deleting.",
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
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
    select: { title: "name", price: "price", media: "image" },
    prepare: ({ title, price, media }) => ({
      title,
      subtitle: price ? `₦${Number(price).toLocaleString()}` : "No price",
      media,
    }),
  },
});

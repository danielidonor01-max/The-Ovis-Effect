import { defineType, defineField, defineArrayMember } from "sanity";
import { UserIcon } from "@sanity/icons";

export const founder = defineType({
  name: "founder",
  title: "Founder / Leadership",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Leadership",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      description: "The founder's words shown on the Financial Advisory page.",
    }),
    defineField({ name: "name", title: "Name / title line", type: "string" }),
    defineField({
      name: "role",
      title: "Role line",
      type: "string",
      description: "e.g. The Ovis Effect · Financial Advisory",
    }),
    defineField({
      name: "credentials",
      title: "Credential chips",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Short trust badges shown under the name.",
    }),
    defineField({
      name: "image",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Founder",
      subtitle,
      media,
    }),
  },
});

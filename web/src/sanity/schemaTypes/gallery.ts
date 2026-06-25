import { defineType, defineField, defineArrayMember } from "sanity";
import { ImagesIcon } from "@sanity/icons";

// Galleries are surfaced as fixed, named singletons in the Studio structure
// (e.g. "gallery-finance-avatars"), so editors just click a named item to edit
// its images — no "create + pick a key" step. Looked up by document id.
export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  icon: ImagesIcon,
  fields: [
    // Legacy identity field from older docs — hidden; identity is the document id.
    defineField({ name: "key", title: "Key", type: "string", hidden: true }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      description:
        "📐 Recommended: ~1080×1350px portrait (4:5) · keep under ~700 KB each. " +
        "(Avatars: square ~400×400px.)",
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
    select: { images: "images", media: "images.0" },
    prepare: ({ images, media }) => ({
      title: "Gallery",
      subtitle: `${images?.length ?? 0} image(s)`,
      media,
    }),
  },
});

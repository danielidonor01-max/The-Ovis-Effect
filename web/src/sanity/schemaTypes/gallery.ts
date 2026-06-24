import { defineType, defineField, defineArrayMember } from "sanity";
import { ImagesIcon } from "@sanity/icons";

const GALLERY_KEYS = [
  { title: "Spa — Gallery", value: "spa-gallery" },
  { title: "Safe Haven — Gallery", value: "safe-haven-gallery" },
];

export const gallery = defineType({
  name: "gallery",
  title: "Gallery / Image set",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "key",
      title: "Location",
      type: "string",
      options: { list: GALLERY_KEYS, layout: "dropdown" },
      validation: (r) => r.required(),
      description: "Where on the site these images appear.",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
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
    select: { key: "key", media: "images.0", images: "images" },
    prepare: ({ key, media, images }) => ({
      title: GALLERY_KEYS.find((k) => k.value === key)?.title ?? key,
      subtitle: `${images?.length ?? 0} image(s)`,
      media,
    }),
  },
});

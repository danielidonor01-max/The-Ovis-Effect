import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "social", title: "Social links" },
  ],
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Phone (display)",
      type: "string",
      description: "How the number is shown, e.g. +234 807 712 5775",
      group: "contact",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      description:
        "Digits only, with country code (no +, spaces or dashes) — e.g. 2348077125775. Used to build wa.me links.",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 2,
      group: "contact",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "tiktok",
      title: "TikTok URL",
      type: "url",
      group: "social",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});

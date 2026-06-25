import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

const WA_HELP =
  "Digits only, with country code (no +, spaces or dashes) — e.g. 2348077125775. Leave blank to use the General number.";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "whatsapp", title: "WhatsApp numbers" },
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
      name: "address",
      title: "Address",
      type: "text",
      rows: 2,
      group: "contact",
    }),

    // ── Per-hub WhatsApp numbers ──
    defineField({
      name: "whatsapp",
      title: "General / Contact WhatsApp",
      type: "string",
      description:
        "Used by the Contact page, footer, and anywhere a hub has no number set. " +
        "Digits only with country code — e.g. 2348077125775.",
      group: "whatsapp",
    }),
    defineField({
      name: "whatsappGoodFood",
      title: "Good Food Avenue WhatsApp",
      type: "string",
      description: WA_HELP,
      group: "whatsapp",
    }),
    defineField({
      name: "whatsappSpa",
      title: "Urovi Spa WhatsApp",
      type: "string",
      description: WA_HELP,
      group: "whatsapp",
    }),
    defineField({
      name: "whatsappFinance",
      title: "Financial Advisory WhatsApp",
      type: "string",
      description: WA_HELP,
      group: "whatsapp",
    }),
    defineField({
      name: "whatsappSafeHaven",
      title: "Safe Haven WhatsApp",
      type: "string",
      description: WA_HELP,
      group: "whatsapp",
    }),

    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "social" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url", group: "social" }),
    defineField({ name: "tiktok", title: "TikTok URL", type: "url", group: "social" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});

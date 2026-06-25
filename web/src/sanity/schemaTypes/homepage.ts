import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";
import {
  TITLE_COLORS,
  TITLE_WEIGHTS,
  DEFAULT_TITLE_COLOR,
  DEFAULT_TITLE_WEIGHT,
} from "../lib/presets";

const CARD_DESC =
  "Photo for this house's card in the 'branded houses' section. " +
  "📐 Recommended: ~1080×1440px portrait (3:4) · keep under ~600 KB.";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "cards", title: "Branded-house card images" },
  ],
  fields: [
    defineField({
      name: "heading",
      title: "Title",
      type: "string",
      group: "hero",
      description: "Wrap a word in *asterisks* to colour it, e.g. Wealth, *Appetite* & Wellbeing.",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string", group: "hero" }),
    defineField({
      name: "ctaHref",
      title: "Button link",
      type: "string",
      group: "hero",
      description: "An on-page anchor (e.g. #houses) or a path (e.g. /contact).",
    }),
    defineField({
      name: "titleColor",
      title: "Title colour",
      type: "string",
      options: { list: TITLE_COLORS },
      initialValue: DEFAULT_TITLE_COLOR,
      group: "hero",
    }),
    defineField({
      name: "titleWeight",
      title: "Title weight",
      type: "string",
      options: { list: TITLE_WEIGHTS },
      initialValue: DEFAULT_TITLE_WEIGHT,
      group: "hero",
    }),

    defineField({
      name: "goodFoodAvenue",
      title: "Good Food Avenue — card image",
      type: "image",
      options: { hotspot: true },
      description: CARD_DESC,
      group: "cards",
    }),
    defineField({
      name: "uroviSpa",
      title: "Urovi Spa — card image",
      type: "image",
      options: { hotspot: true },
      description: CARD_DESC,
      group: "cards",
    }),
    defineField({
      name: "financialAdvisory",
      title: "Financial Advisory — card image",
      type: "image",
      options: { hotspot: true },
      description: CARD_DESC,
      group: "cards",
    }),
    defineField({
      name: "safeHaven",
      title: "Safe Haven — card image",
      type: "image",
      options: { hotspot: true },
      description: CARD_DESC,
      group: "cards",
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});

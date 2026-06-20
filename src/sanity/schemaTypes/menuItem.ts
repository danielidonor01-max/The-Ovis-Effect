import { defineField, defineType } from 'sanity';

/** Category options — `value` is the key used by the order builder's chips. */
export const MENU_CATEGORIES = [
  { title: 'Mains', value: 'mains' },
  { title: 'Soups & Stews', value: 'soups' },
  { title: 'Proteins', value: 'proteins' },
  { title: 'Snacks & Drinks', value: 'snacks' },
  { title: 'Sides', value: 'sides' },
];

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item — Good Food Avenue',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: MENU_CATEGORIES, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short, appetising line shown in the dish detail modal.',
    }),
    defineField({
      name: 'price',
      title: 'Price (₦)',
      type: 'number',
      description: 'Optional. Leave blank to send an itemised order without a total; set it to show a live total.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional dish photo — used as the card avatar and in the detail modal.',
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this item from the order builder.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first within a category.',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Category, then sort order',
      name: 'categorySort',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'sortOrder', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image', price: 'price' },
    prepare({ title, subtitle, media, price }) {
      const label = (MENU_CATEGORIES.find((c) => c.value === subtitle)?.title) || subtitle;
      return { title, subtitle: price ? `${label} · ₦${price}` : label, media };
    },
  },
});

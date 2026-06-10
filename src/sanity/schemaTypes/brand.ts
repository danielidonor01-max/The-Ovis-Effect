import { defineField, defineType } from 'sanity';

export const brand = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Hub Sort Order',
      type: 'number',
      description: 'Lower numbers appear first in the homepage hub grid.',
    }),
    defineField({
      name: 'featuredOnHub',
      title: 'Show on Hub',
      type: 'boolean',
      initialValue: true,
      description: 'Display this brand as a card on the homepage.',
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 3,
      description: 'You can use HTML tags like <em> or <br> here for specific formatting.',
    }),
    defineField({
      name: 'heroSub',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'galleryImage',
    }),
    defineField({
      name: 'aboutPortrait',
      title: 'About / Founder Portrait',
      type: 'galleryImage',
      description: 'Financial Advisory — the founder photo in the About section (portrait, ~4:5).',
      hidden: ({ document }) => (document?.slug as any)?.current !== 'financial-advisory',
    }),
    defineField({
      name: 'menuPdf',
      title: 'Menu / Brochure PDF',
      type: 'menuPdf',
      description: 'Attach a PDF document if applicable.',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', type: 'text', title: 'Quote' },
            { name: 'author', type: 'string', title: 'Author' },
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'galleryImage' }],
    }),
    defineField({
      name: 'gfaCategoryImages',
      title: 'Category Images',
      type: 'array',
      of: [{ type: 'galleryImage' }],
      description: 'Good Food Avenue — in order: Main Meal, Soups & Stews, Proteins, Snacks & Drinks, Side Dishes.',
      validation: (Rule) => Rule.max(5),
      hidden: ({ document }) => (document?.slug as any)?.current !== 'good-food-avenue',
    }),
    defineField({
      name: 'spaServiceImages',
      title: 'Service Card Images',
      type: 'array',
      of: [{ type: 'galleryImage' }],
      description: 'Urovi Spa — up to 4 service cards, in display order.',
      validation: (Rule) => Rule.max(4),
      hidden: ({ document }) => (document?.slug as any)?.current !== 'urovi-spa',
    }),
    defineField({
      name: 'spaDuoImages',
      title: 'Overlapping Duo Images',
      type: 'array',
      of: [{ type: 'galleryImage' }],
      description: 'Urovi Spa — exactly 2: back image first, then front image.',
      validation: (Rule) => Rule.max(2),
      hidden: ({ document }) => (document?.slug as any)?.current !== 'urovi-spa',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'heroImage',
    },
  },
});

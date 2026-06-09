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
    }),
    defineField({
      name: 'hubCard',
      title: 'Hub Card',
      type: 'object',
      description: 'Content for this brand’s card in the homepage hub grid (design/layout is fixed in code).',
      fields: [
        defineField({ name: 'tag', type: 'string', title: 'Eyebrow Tag', description: 'e.g. Appetite, Wellbeing, Wealth, Exclusive' }),
        defineField({ name: 'title', type: 'string', title: 'Card Title', description: 'Defaults to the brand name if left blank.' }),
        defineField({ name: 'description', type: 'text', title: 'Card Description', rows: 3 }),
        defineField({ name: 'ctaLabel', type: 'string', title: 'Link Label', description: 'e.g. Explore Menu, View Therapies' }),
      ],
    }),
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

import { defineField, defineType } from 'sanity';

export const singletonSite = defineType({
  name: 'singletonSite',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Used for global branding and default SEO.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
    }),
    defineField({
      name: 'ambientAudio',
      title: 'Ambient Audio File',
      type: 'file',
      description: 'Upload a calm ambient audio track for the website preloader (mp3/wav/etc.).',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'homeHero',
      title: 'Homepage Hero',
      type: 'object',
      description: 'Hero content for the hub homepage (layout/animation fixed in code).',
      fields: [
        defineField({ name: 'headline', type: 'text', title: 'Headline', rows: 2, description: 'You can use <span class="gold-text">…</span> and <br> for formatting.' }),
        defineField({ name: 'subtext', type: 'text', title: 'Subtext', rows: 2 }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'email', type: 'string', title: 'Support Email' }),
        defineField({ name: 'phone', type: 'string', title: 'Phone Number', description: 'Display format, e.g. +234 807 712 5775' }),
        defineField({ name: 'whatsapp', type: 'string', title: 'WhatsApp Number', description: 'Digits only, e.g. 2348077125775. Defaults to the phone number if left blank.' }),
        defineField({ name: 'address', type: 'text', title: 'HQ Address', rows: 3 }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
  ],
});

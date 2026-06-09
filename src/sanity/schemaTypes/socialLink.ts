import { defineField, defineType } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
        ],
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
  ],
});

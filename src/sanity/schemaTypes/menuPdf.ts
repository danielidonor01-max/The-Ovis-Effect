import { defineField, defineType } from 'sanity';

export const menuPdf = defineType({
  name: 'menuPdf',
  title: 'Menu PDF',
  type: 'file',
  options: {
    accept: 'application/pdf',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The display name for this menu document.',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

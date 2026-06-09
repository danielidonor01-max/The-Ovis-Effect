import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'The Ovis Effect Studio',

  projectId: 'gorjnjxy',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Manager')
          .items([
            // Singleton Global Settings
            S.listItem()
              .title('Global Settings')
              .id('singletonSite')
              .child(
                S.document()
                  .schemaType('singletonSite')
                  .documentId('singletonSite')
              ),
            S.divider(),
            // Other document types
            ...S.documentTypeListItems().filter(
              (item) => !['singletonSite'].includes(item.getId() || '')
            ),
          ]),
    }),
  ],

  schema: {
    types: schema,
    // Enforce singleton templates
    templates: (prev) =>
      prev.filter((template) => !['singletonSite'].includes(template.id)),
  },
});

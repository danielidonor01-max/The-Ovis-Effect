import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: 'gorjnjxy',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2024-05-25',
      studioBasePath: '/studio'
    }),
  ],
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// User site served at the domain root: https://ramuroy.github.io
// (For a user/organization GitHub Pages site the repo is named
// `ramuroy.github.io` and the site lives at `/`, so no `base` is needed.)
export default defineConfig({
  site: 'https://ramuroy.github.io',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});

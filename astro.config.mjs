// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// User site served at the domain root: https://ramuroy.github.io
// (For a user/organization GitHub Pages site the repo is named
// `ramuroy.github.io` and the site lives at `/`, so no `base` is needed.)
export default defineConfig({
  site: 'https://ramuroy.github.io',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // The 404 page must never be crawled; lastmod gives crawlers a
      // freshness signal (set per deploy).
      filter: (page) => !page.includes('/404'),
      lastmod: new Date(),
    }),
  ],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "connect-src 'self'",
        "font-src 'self'",
        "form-action 'self'",
        "img-src 'self' data:",
        "object-src 'none'",
      ],
      // Component-specific CSS variables are emitted as style attributes.
      // Attribute permission is inserted per page as style-src-attr.
      styleDirective: {
        resources: ["'self'"],
      },
    },
  },
  markdown: {
    syntaxHighlight: false,
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});

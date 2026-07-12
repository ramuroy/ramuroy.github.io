# ramuroy.github.io

Personal portfolio of **Ramu Roy** — Embedded Systems Engineer.
Design system: *"Signal Datasheet"* — a calm, premium hardware-datasheet aesthetic
with a quiet embedded/terminal edge. Built with [Astro](https://astro.build),
hand-written CSS (no framework), self-hosted fonts, and near-zero client JavaScript.

🔗 **Live:** https://ramuroy.github.io

## Editing content

Almost everything lives in one file — **`src/data/site.ts`**. Edit it and the page
updates. No HTML needed:

| What | Where in `site.ts` |
|------|--------------------|
| Name, role, email, phone, links | `profile` |
| Hero one-liner, key specs, ticker | `hero` |
| About paragraphs | `about` |
| Flagship project cards | `flagship` |
| GitHub repo grid | `gridProjects` (`featured: true` controls the curated grid) |
| Work history | `experience` |
| Skills / protocols | `skillGroups`, `protocols` |
| Certifications, education, languages | `certifications`, `education`, `spokenLanguages` |
| SEO title / meta / keywords | `seo` |

The visual look (colours, fonts, spacing, motion) lives in **`src/styles/tokens.css`** —
change a token there and it propagates everywhere.

Your résumé PDF is served from `public/Ramu_Roy_Resume.pdf` (the "Download CV" button).

## Develop

```bash
nvm use          # Node 22.12+ (see .nvmrc)
npm ci           # reproducible install
npm run dev      # live preview at http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # preview the production build
npm run verify   # type-check, build, and validate the generated site
```

`npm run verify` is the release gate. It checks every Astro/TypeScript file, builds
the static site, then validates canonical/SEO metadata, JSON-LD, section anchors,
local links, security policy output, sitemap files, and required public assets.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which verifies and builds the site and
publishes it to GitHub Pages automatically. In the repo: **Settings → Pages → Build
and deployment → Source: GitHub Actions** (one-time setup).

## Stack

Astro · TypeScript · vanilla CSS custom properties · `@astrojs/sitemap` ·
self-hosted Space Grotesk / Inter / JetBrains Mono. No tracking or runtime font CDN.

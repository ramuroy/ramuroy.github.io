# ramuroy.github.io

Personal portfolio of **Ramu Roy**, Embedded Systems Engineer.

The site uses a “Signal Datasheet” design language: a calm hardware-datasheet layout
with restrained embedded/terminal details. It is a static [Astro](https://astro.build)
site built with TypeScript, hand-written CSS, self-hosted fonts, and a small amount of
progressively enhanced client JavaScript.

**Live site:** https://ramuroy.github.io

> Current hardening work is isolated on `codex/site-hardening-20260713`. The live
> deployment and `main` branch are intentionally unchanged until that branch is
> reviewed and merged.

## Documentation

- [Architecture and maintenance guide](docs/architecture.md)
- [Engineering decisions and rationale](docs/decisions.md)
- [2026-07-16 full-site audit report and improvement roadmap](docs/site-audit-2026-07-16.md)
  (with [unabridged findings](docs/audit-findings-full-2026-07-16.md) and
  [raw data](docs/audit-data-2026-07-16.json))
- [2026-07-16 audit checkpoint and continuation notes](docs/checkpoints/2026-07-16-full-audit.md)
- [2026-07-13 hardening checkpoint and continuation notes](docs/checkpoints/2026-07-13-site-hardening.md)
- [Change history](CHANGELOG.md)

## Requirements

- Node.js 22.12 or newer, as pinned in `.nvmrc`
- npm 10 or newer; the intended package manager is recorded in `package.json`

## Develop

```bash
nvm use          # select the repository's Node version
npm ci           # install exactly what package-lock.json records
npm run dev      # development server at http://localhost:4321
npm run check    # Astro and TypeScript diagnostics
npm run build    # production build in ./dist
npm run preview  # serve the production build locally
npm run verify   # complete release gate
```

`npm run verify` is the required release gate. It:

1. checks every Astro and TypeScript source file;
2. builds the compressed static site and sitemap; and
3. validates the generated HTML, metadata, CSP, JSON-LD, anchors, local assets,
   external-link safety attributes, sitemap content, and required public files.

The generated `dist/` directory is build output and is not edited by hand.

## Editing content

The portfolio content has one primary source of truth: `src/data/site.ts`.

| Content | Export in `site.ts` |
| --- | --- |
| Name, role, contact details, availability, links, repository count | `profile` |
| Search and social metadata | `seo` |
| Navigation and section labels | `nav`, `sections` |
| Hero copy, key specifications, ticker | `hero` |
| About copy and at-a-glance data | `about` |
| Flagship project cards | `flagship` |
| Curated GitHub project grid | `gridProjects` |
| Employment and education | `experience`, `education` |
| Skills and protocols | `skillGroups`, `protocols` |
| Certifications and spoken languages | `certifications`, `spokenLanguages` |

All `gridProjects` entries render, in the array's order — strongest work first;
re-rank a project by moving its line. Aggregate project statistics are derived
from the full arrays rather than duplicated as hard-coded display values.

The résumé download is `public/Ramu_Roy_Resume.pdf`. Social images, favicons, and
`robots.txt` also live in `public/`.

## Editing presentation

- Design tokens—colour, type, spacing, layout, and motion—live in
  `src/styles/tokens.css`.
- Component and responsive styles live in `src/styles/global.css`.
- Exact Latin variable-font subsets are declared in `src/styles/fonts.css` and
  bundled from the Fontsource packages at build time.
- Page sections are Astro components under `src/components/`; shared document
  metadata and client enhancements live in `src/layouts/Layout.astro`.

Preserve the progressive-enhancement contract: content must remain visible and
usable if JavaScript, `IntersectionObserver`, storage, or clipboard APIs are
unavailable, and motion must respect `prefers-reduced-motion`.

## Deployment and branch safety

Only a push to `main` triggers `.github/workflows/deploy.yml`. That workflow uses
the Node version pinned in `.nvmrc`, runs `npm ci`, executes the full
`npm run verify` gate, uploads `dist/`, and deploys it to GitHub Pages.

Every pull request and feature-branch push runs the same gate via
`.github/workflows/verify.yml`, so breakage is caught before merge.

Pushing a feature branch stores the work remotely but does **not** deploy it. Do not
merge the current hardening branch until the remaining checks in the checkpoint
document have been completed and reviewed.

GitHub Pages must use **Settings → Pages → Build and deployment → Source: GitHub
Actions**.

## Stack

Astro 7 · TypeScript · vanilla CSS custom properties · `@astrojs/sitemap` ·
self-hosted Space Grotesk Variable / Inter Variable / JetBrains Mono Variable.
There is no analytics script, client framework, or runtime font CDN.

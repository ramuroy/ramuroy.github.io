# Architecture and maintenance guide

## Purpose

This repository produces a single-page, static portfolio for
`https://ramuroy.github.io`. The architecture deliberately favours build-time
rendering, a small dependency surface, and native browser behaviour. There is no
server runtime, database, authentication layer, analytics service, or client-side
framework.

## System overview

| Layer | Source | Responsibility |
| --- | --- | --- |
| Content model | `src/data/site.ts` | Typed profile, project, work, skills, education, certification, and SEO data |
| Page composition | `src/pages/index.astro` | Orders the portfolio sections |
| Components | `src/components/*.astro` | Render semantic, reusable page sections and decorative elements |
| Document shell | `src/layouts/Layout.astro` | Metadata, CSP extension, global landmarks, and small client enhancements |
| Design tokens | `src/styles/tokens.css` | Shared colour, typography, spacing, layout, shadow, and motion values |
| Global styles | `src/styles/global.css` | Reset, components, responsive behaviour, print, and reduced motion |
| Font declarations | `src/styles/fonts.css` | Exact self-hosted Latin variable-font subsets |
| Static assets | `public/` | Résumé, Open Graph image, favicons, crawler policy, and flagship board renders |
| Build configuration | `astro.config.mjs` | Site URL, sitemap, CSP, compression, and static-build behaviour |
| Release validation | `scripts/check-fonts.mjs`, `scripts/check-build.mjs` | Shipped font subsets, and invariants checked against generated output |
| Deployment | `.github/workflows/deploy.yml` | Verification and GitHub Pages publication from `main` only |

## Build and request lifecycle

1. Astro imports the typed data from `src/data/site.ts` and renders the page and
   components to static HTML.
2. Vite bundles the small client scripts, global CSS, and exact WOFF2 font subsets.
3. Astro emits a CSP meta tag and `@astrojs/sitemap` writes the sitemap files.
4. `scripts/check-build.mjs` reads `dist/index.html` and verifies the release
   invariants.
5. On `main`, GitHub Actions uploads the verified `dist/` directory to GitHub Pages.
6. The browser receives a static document. JavaScript enhances reveal motion,
   scroll state, clipboard controls, counters, and the mobile menu; it is not required
   to read the content or follow the primary links.

## Content model and derived values

`src/data/site.ts` is the canonical content source. Components should consume or
derive values from it rather than repeating content literals.

The project grid renders `gridProjects` whole, in the array's authored order. That
order **is** the editorial control — strongest engineering first — and there is no
featured flag and no star sort, deliberately: a starred hobby board must not outrank
stronger firmware work (D-010, superseded). To re-rank, move lines in `site.ts`.

Flagship projects are authored in `flagshipOrder` and exported as `flagship`.
Each entry carries `params` (what the thing *is*) and, optionally, `metrics`
(what was *measured* — a separate field by D-019, rendered as a distinct
datasheet table, headed "Key figures" — see D-019's amendment for why not
"Measured") and `images` (board renders or layout views; `w`/`h` are required so
the card reserves layout space and cannot reflow as the picture decodes). Two
images pair side by side on a wide card and stack on a narrow one, and each is
wrapped in a real `<a href>` to the asset so a click works without JavaScript;
the lightbox is layered on top of that (spec H2).

Current derived values include:

- total projects from flagship plus complete grid-project arrays;
- protocol count;
- programming-language count (from the Languages skill group);
- availability labels and indicators; and
- **FIG labels**, derived from `flagshipOrder` position and never authored
  (D-020). Cross-references resolve through the exported `figOf(slug)`, which
  **throws at build time** if a slug stops matching — used by the experience
  entries and by `terminal.ts` for the `i2cdetect` note.

The one value that is *not* derived is `profile.githubRepoCount`: it is an
externally observed fact (D-009) and drifts silently. It was found stale at 19
against a live 20 on 2026-09-07. Re-check it against
`https://api.github.com/users/ramuroy` whenever repository visibility changes.

This prevents a content update in one section from silently leaving another section
stale. When adding a new aggregate, derive it close to the component that renders it
unless multiple components need it; shared derivations belong with the data model.
Anything that names a project by number or position must resolve it by slug.

## Rendering and trust boundaries

Portfolio text is authored in the repository, but it is still rendered as text by
default. Do not introduce `set:html` for ordinary content. The About annotations and
boot status labels deliberately split strings into Astro-rendered fragments so HTML
characters remain escaped.

Structured data is the intentional exception: `Layout.astro` emits a **Person block
and a WebSite block**. Both are constructed from known data and serialized through the
shared `escapeLd` helper, which `JSON.stringify`s the object and replaces `<` with its
Unicode escape so no value can terminate the script element. Any further
structured-data block must go through that same helper.

External links opened in a new tab must carry both `noopener` and `noreferrer`.
`scripts/check-build.mjs` enforces this in generated output.

## Content Security Policy

`astro.config.mjs` defines a restrictive policy appropriate for a self-contained
static site:

- scripts, connections, fonts, forms, and ordinary resources are restricted to the
  same origin;
- images may also use data URLs;
- plugins/objects are disabled;
- base URL injection is prohibited; and
- stylesheets are same-origin.

Some components use authored inline CSS custom properties for stagger delays,
animation timing, and gauge values. `Layout.astro` therefore adds
`style-src-attr 'unsafe-inline'`, which permits style attributes without weakening
script execution. Astro supports the CSP Level 3 output at runtime even though its
current TypeScript directive union does not list `style-src-attr`; the adjacent
`@ts-expect-error` documents and contains that mismatch.

When adding an external service, do not disable the CSP. Add the narrowest required
origin to the correct directive and verify the resulting production page in a
browser.

## Progressive enhancement contract

The default CSS state is usable and visible. JavaScript adds `reveal-ready` only
after `IntersectionObserver` has been created successfully; CSS hides reveal targets
only in that gated state. If JavaScript or observer support is unavailable, the
content stays visible.

The same rule applies to gauges and trace drawings. Counters fall back to their final
values, the native `<details>` project interaction remains usable, and ordinary
anchors do not depend on router code.

The boot introduction is also fail-open:

- its default CSS state is hidden;
- the inline script activates it only after checking reduced-motion and session
  state;
- storage reads and writes are guarded;
- it supports the skip button and Escape;
- it restores scrolling and transfers focus safely; and
- failure to execute the script cannot leave an overlay blocking the site.

## Accessibility and interaction invariants

- The document has one `<h1>`, an English language declaration, a focusable `main`
  landmark, and a keyboard-visible skip link.
- Navigation uses its visible text as its accessible name and marks the current
  section with `aria-current="location"`.
- The mobile menu synchronizes `aria-expanded`, closes after selection, on Escape,
  outside pointer input, and when returning to desktop width.
- Clipboard results are announced through an `aria-live` status region; failure
  leaves a manual-copy instruction.
- Reduced-motion users receive effectively static content, no boot sequence, no
  cursor/card glow, and no flowing circuit pulse.
- Touch targets receive additional sizing for coarse pointers.
- Print styles remove navigation and decoration while keeping all content visible.

## Styling and fonts

Treat `src/styles/tokens.css` as the design-system API. Prefer changing or adding a
token instead of scattering literal values through component rules. Keep semantic
content and decorative circuit/trace elements separate, with decoration hidden from
assistive technology.

The measured-outcome table (`.metrics`) is an **inline-size container query**, not
a media query: a half-width flagship card is narrow at every viewport, so its
column count has to follow the card's own width. Keying that to the viewport was a
real defect — values shredded across three lines on desktop. Any future component
whose layout depends on the width of the card it sits in should do the same.
Print styles re-theme at the token level, so both `.metrics` and `.board` print
correctly without per-selector overrides.

`src/styles/fonts.css` imports one Latin variable WOFF2 file for each family directly
from installed Fontsource packages. This keeps rendering deterministic, removes the
Google Fonts request path, and allows the CSP to keep `font-src 'self'`. If another
script or language subset is needed, add only the required file and update the
Fontsource dependency explicitly.

## SEO and crawler output

The site URL is declared in `astro.config.mjs`. `Layout.astro` derives the canonical
URL from `Astro.site` and the current path, then uses it consistently for canonical,
Open Graph, Twitter, and both JSON-LD blocks (Person and WebSite). `public/robots.txt` points crawlers to
the generated sitemap index.

Keep the following public assets present and non-empty:

- `Ramu_Roy_Resume.pdf`
- `og.png`
- `favicon.svg`
- `favicon-32.png`
- `apple-touch-icon.png`
- `robots.txt`

The build validator enforces this list.

## Verification and deployment

Use `npm run verify` before any release. It is safe to run repeatedly and is also the
CI gate. For user-visible or interaction changes, follow it with a production-preview
browser pass covering desktop, 390 px mobile, 320 px mobile, keyboard navigation,
reduced motion, console errors, and horizontal overflow. Run Lighthouse against the
production preview rather than the Astro development server, whose development
toolbar changes the result.

Only `main` deploys. Feature branches can be pushed safely for backup and review. A
release is therefore:

1. finish the pending checks recorded in the latest checkpoint document;
2. review the branch diff;
3. merge the reviewed branch into `main`; and
4. confirm the GitHub Pages workflow and live site.

# Site-hardening checkpoint — 2026-07-13

## Checkpoint purpose

This file is the handoff for continuing the repository-wide improvement pass without
depending on chat history. It records the baseline, implemented work, evidence,
branch safety, and the exact unfinished verification work.

## Repository state

- Working branch: `codex/site-hardening-20260713`
- Implementation checkpoint: `268e685` (`feat: harden and modernize portfolio`)
- Remote target: `origin/codex/site-hardening-20260713`
- Production branch: `main` — intentionally untouched by this work
- Deployment rule: only pushes to `main` trigger GitHub Pages
- First implementation checkpoint was clean and locally buildable before this
  documentation pass began.

Do not merge to `main` merely because the branch has been pushed. Complete the
remaining verification checklist below first.

## Original request and scope

The goal was to review the complete repository and improve correctness, robustness,
security, accessibility, performance, content consistency, maintainability,
development reproducibility, documentation, and deployment safety. The user required
all work to remain on a new branch so the original `main` state would not be lost.

No server, product feature, redesign, analytics integration, or new route was added.
The established “Signal Datasheet” visual identity and one-page information
architecture were preserved.

## Baseline observations

The initial repository was a one-page Astro 5 portfolio with TypeScript, hand-written
CSS, Google-hosted fonts, and a GitHub Pages workflow using Node 20.

The baseline source check succeeded but reported two hints. The production build was
deterministic. A production Lighthouse pass reported:

| Category | Baseline score |
| --- | ---: |
| Performance | 100 |
| Accessibility | 96 |
| Best practices | 100 |
| SEO | 100 |

The actionable accessibility findings were low contrast on decorative section
numerals and an accessible-name mismatch on the masthead/navigation. The page had
approximately 911 DOM elements. Google Fonts was a render-blocking external request.
The local dependency tree also contained check tooling that was not declared in the
manifest, so a fresh install could not be assumed to reproduce the local environment.

Dependency inspection of the Astro 5 graph exposed advisories, including a high
severity Astro advisory and a lower-severity esbuild advisory. Upgrading and
reinstalling on the new toolchain reported no vulnerabilities at install time. A
fresh final `npm audit` is still listed below because the last complete clean-install
verification was intentionally deferred at the stop request.

The public GitHub profile was checked during content review. It showed 19 repositories
and a curated set of seven representative projects; the local data was synchronized
to that observed state.

## Implemented work

### Toolchain and reproducibility

- Upgraded to Astro 7.0.7.
- Added `.nvmrc` with Node 22.12.0.
- Declared Node `>=22.12.0`, npm `>=10`, and npm 10.8.2 as the intended package
  manager.
- Declared `@astrojs/check` and TypeScript rather than relying on undeclared local
  packages.
- Updated the lockfile for the new dependency graph.
- Updated GitHub Actions to Node 22.12 and the same verification gate used locally.

### Build and deployment validation

- Added `npm run check:build` and `npm run verify`.
- Added `scripts/check-build.mjs` with checks for:
  - a generated home page;
  - unique IDs and exactly one `<h1>`;
  - language and main landmarks;
  - canonical URL and description/Open Graph metadata;
  - CSP generation and absence of Google Fonts;
  - accidental `undefined`/`NaN` output;
  - required section and live-region IDs;
  - matching internal anchors;
  - existing generated local assets;
  - `noopener noreferrer` on new-tab links;
  - parseable Person JSON-LD with the expected URL/type;
  - sitemap files and the home-page entry; and
  - all required résumé, social, icon, and crawler assets.
- Changed the Pages workflow from `npm run build` to `npm run verify` before upload.

### Security and output integrity

- Added an Astro-generated CSP restricted to same-origin scripts, connections, fonts,
  and styles; data images are allowed; objects and base injection are disabled.
- Added a narrow `style-src-attr` exception for authored CSS custom properties.
- Replaced About and boot-label HTML injection with escaped Astro fragments.
- Escaped `<` during JSON-LD serialization.
- Added a strict-origin referrer policy.
- Verified new-tab link safety in generated output.
- Disabled unused Markdown syntax highlighting so it does not add irrelevant CSP
  output.

### Fonts and rendering

- Removed Google Fonts preconnect and stylesheet requests.
- Added exact Latin variable subsets of Inter, Space Grotesk, and JetBrains Mono from
  Fontsource.
- Updated typography tokens to prefer the variable-family names.
- Kept system fallbacks for resilience.

### Accessibility and progressive enhancement

- Corrected the masthead accessible-name mismatch by relying on visible text.
- Raised the faint text token and removed reduced opacity from section numerals.
- Moved the boot introduction before the skip link and rebuilt it as a labelled,
  keyboard-operable dialog.
- Added skip/Escape controls, focus restoration, timer cleanup, storage guards, and
  a reduced-motion bypass to the intro.
- Made hidden reveal states conditional on successful observer setup.
- Ensured gauges, traces, and counters expose final/visible content without JavaScript
  or observer support.
- Added an `aria-live` clipboard status region and explicit success/failure feedback.
- Added `aria-current="location"` scroll-spy state and guarded observer usage.
- Added print rules and expanded reduced-motion handling.
- Removed decorative elements from definition-list markup.

### Interaction robustness

- Throttled scroll-progress work with `requestAnimationFrame`.
- Added a secure-context clipboard path with a guarded legacy fallback and guaranteed
  temporary-element cleanup.
- Made the mobile menu close after navigation, on Escape, on outside pointer input,
  and when switching back to desktop width; ARIA state stays synchronized.
- Delayed the hero text scramble until the boot sequence completes when applicable.
- Added safe fallbacks for missing storage, clipboard, and observer APIs.

### Content and data correctness

- Added `profile.githubRepoCount` and synchronized it to the observed public value of
  19.
- Derived repository, project, protocol, and spoken-language statistics from shared
  data.
- Made hero, Contact, and Footer availability indicators follow
  `profile.available` consistently.
- Added the optional `featured` project flag and marked the seven projects reflected
  by the public GitHub selection.
- Kept all 15 grid projects in the data model, so the derived project total remains
  complete rather than representing only the visible curated grid.

### Responsive, visual, and DOM improvements

- Fixed contact-value wrapping on narrow screens.
- Fixed small-screen project parameter layout rule ordering.
- Added section scroll margins and a readable maximum width for experience details.
- Added coarse-pointer target sizing and print presentation.
- Reduced procedural circuit traces from 20 to 10 and pads from 14 to 6.
- Replaced repeated definition-list leader spans with pseudo-elements.
- Preserved the existing visual system rather than redesigning the portfolio.

## Verification completed at this checkpoint

### Source and build

The last run before the implementation checkpoint completed successfully:

```text
Astro check: 20 files
0 errors
0 warnings
0 hints

Static production build: successful
Sitemap generation: successful
Generated-site validation: passed
```

`git diff --check` also passed, and the working tree was clean after commit `268e685`.

### Browser checks completed

Production-preview checks covered:

- desktop home layout;
- 390 px mobile layout and menu;
- 320 px narrow layout;
- projects and contact sections;
- no horizontal overflow at the tested narrow viewports;
- menu open/close state and Escape handling;
- native project-details interaction;
- clipboard success announcement;
- seven rendered curated project cards;
- skip-link focus and activation to `#main`;
- reduced-motion detection, visible reveal content, and effectively disabled pulse
  animation; and
- no console errors after the CSP style-attribute correction.

Screenshots from this local audit were stored under
`/tmp/portfolio-audit-baseline/`. They are evidence on the current workstation only
and are not committed repository artifacts.

### Important evidence boundary

The production build and source diagnostics were rerun after the final Circuit and
mobile CSS changes, but the final Lighthouse run and the last mobile Projects
screenshot were not rerun before the user requested a stop. Do not describe the
branch as release-complete until the following checklist is finished.

## Remaining work for the next session

Run these tasks on `codex/site-hardening-20260713`, not `main`.

1. Confirm the branch and clean state:

   ```bash
   git branch --show-current
   git status --short --branch
   ```

2. Select the pinned toolchain and reproduce dependencies from scratch:

   ```bash
   nvm use
   npm ci
   npm ls --depth=0
   npm audit
   npm outdated
   ```

3. Run the complete repository gate:

   ```bash
   npm run verify
   git diff --check
   ```

4. Start the production preview—not the development server—and rerun Lighthouse:

   ```bash
   npm run preview
   ```

   Target all four Lighthouse categories and confirm the two baseline accessibility
   findings are gone. Investigate any regression rather than recording the score
   mechanically.

5. Recheck the last visual changes:
   - 390 px Projects cards use a single-column parameter grid;
   - 320 px and 390 px pages have no horizontal overflow;
   - reduced circuit density still looks intentional on desktop and mobile;
   - keyboard focus, skip link, menu Escape behaviour, clipboard feedback, and
     reduced motion still work; and
   - the browser console is empty.

6. Extract and validate external URLs from the source/generated page. Redirects are
   acceptable; broken or unauthorized destinations must be reviewed manually.

7. Review `git diff main...HEAD`, confirm the change log and decision records are
   still accurate, and only then prepare a merge handoff. Do not merge without the
   user's explicit direction.

## Resume commands

```bash
git fetch origin
git switch codex/site-hardening-20260713
git pull --ff-only
nvm use
npm ci
npm run verify
```

If the branch is already checked out and clean, the fetch/switch/pull steps are only
needed to synchronize with another machine.

## Known constraints and follow-up considerations

- The repository count is a snapshot of public GitHub state and can change later.
- `style-src-attr` is supported by CSP Level 3 output, but the Astro directive type
  currently needs a local `@ts-expect-error`; revisit it after future Astro upgrades.
- The site intentionally has near-zero JavaScript rather than a client framework.
- The branch has not changed or deployed `main`.
- The work should remain a draft/review branch until the pending final audit is done.

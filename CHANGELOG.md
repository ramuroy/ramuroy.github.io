# Changelog

This project follows a lightweight, date-based changelog. Entries describe changes
that affect the source, generated site, development workflow, or deployment safety.

## Released 2026-07-17 — project grid: full catalogue, strength-ordered

- All 15 grid projects render (previously the 7 `featured` ones), ordered
  strongest-first by the `gridProjects` array order; star-sorting removed and
  the `featured` flag retired (supersedes D-010, owner decision). The
  "18 Projects" statistic now matches what visitors can actually see.

## Released 2026-07-17 — Phase 0 defect sweep (implemented 2026-07-16/17)

Branch: `codex/site-hardening-20260713` — implements the P1/P2 defects (B1–B31)
and hygiene items from `docs/site-audit-2026-07-16.md`, as individually
verifiable atomic commits. No visual redesign; all changes are fixes.

### Fixed

- CSP no longer blocks the first-visit boot intro: inline scripts live in
  `src/data/inline-scripts.ts`, are hash-registered in the layout, and the
  build now fails if any inline script is missing from the CSP (B14).
- Nav scroll-spy highlight renders for the first time (attribute mismatch),
  clears when scrolling back to the top, and has a mobile active state (B1).
- Card hover animations animate again — entrances are keyframe animations
  instead of transition overrides (regression since a65464e) (B2).
- Printing: token-level light re-theme, forced-open disclosures, visible
  reference URLs, sane page-break behavior (B3).
- Nav no longer clips at 721–860 px; the mobile menu works without
  JavaScript; Certifications joined the nav and scroll-spy (B4, B11, B24).
- Touch devices: hover lift/glow no longer sticks after taps (B5); 44 px
  targets for summary/cert/footer/boot/nav controls (B17).
- Windows High Contrast: section headings and focus indicators are visible
  (B12, B16); reduced-motion also zeroes delays and is observed live
  mid-session (B15, B27).
- Boot overlay is an honest modal (background inert, animationend-based
  dismissal); double-clicked copy buttons no longer wedge on "copied ✓";
  counters can no longer strand at 0; hero canvas survives mobile URL-bar
  resizes, runs at the same speed on high-refresh displays, and starts only
  after the boot overlay (B9, B13, B7, B8, B23).
- Screen readers: stable h1 during the name scramble, real spaces in the
  hero lead and list separators, hidden decorative glyphs, "(opens in new
  tab)" texts, star-count labels, heading-navigable cert cards, short grid
  card link names (B10, B28, B30).
- SEO/social: WebSite JSON-LD, robust og:image URL, twitter:image:alt,
  og:locale, robots max-image-preview, keywords meta removed, branded 404
  page, sitemap lastmod + 404 exclusion, "Tata Steel BlueScope" naming (B31).
- Performance: fonts preloaded (hashed URLs verified against the CSS),
  modern format()/tech() font sources, transform-driven signal rail,
  rAF-coalesced pointer effects.
- CI/tooling: verify gate now runs on PRs and feature branches (B20);
  deploys are never cancelled mid-flight (B19); Node version single-sourced
  from `.nvmrc` and enforced via `engine-strict` (B22); dependabot,
  `.editorconfig`, and stronger `check-build.mjs` link/CSP validation (B21).

### Deferred (recorded, not regressions)

- Font-weight instancing, metric-compatible fallback fonts, og.png
  regeneration, favicon-16/mask-icon, LICENSE choice, prettier config,
  tsconfig `strictest`, SHA-pinned actions — see the audit's §7/P3 and the
  roadmap for placement.

## Released 2026-07-17 — full-site audit documentation (written 2026-07-16)

Branch: `codex/site-hardening-20260713` (documentation only; no site source changed)

### Added

- `docs/site-audit-2026-07-16.md` — complete audit report: 31 curated defects
  (P1/P2/P3) with evidence and fixes, category critiques, a judge-ranked 3-tier
  improvement roadmap, implementation phasing, and a full findings appendix.
- `docs/audit-findings-full-2026-07-16.md` — every one of the 245 adversarially
  verified findings, unabridged, with full evidence, suggested fix, and verifier
  verdict/note.
- `docs/audit-data-2026-07-16.json` — the same findings as machine-readable data,
  plus the single refuted claim, the full enhancement roadmap, and all 45 raw
  design-panel proposals.
- `docs/checkpoints/2026-07-16-full-audit.md` — session handoff: what was done,
  decisions made, user inputs still needed, and resume steps.
- `docs/decisions.md` D-014 — record the audit in full before implementing any of
  it.

### Changed

- Corrected `docs/architecture.md` and the 2026-07-13 checkpoint: the derived
  statistic is the programming-language count, not spoken languages (audit
  content-consistency findings).

### Notable audit outcomes (details in the report)

- Confirmed defects include: the emitted CSP blocks the boot-intro inline script
  in production; the nav scroll-spy highlight has never rendered; card hover
  transitions are overridden by the entrance rule; print output is illegible;
  the mobile nav requires JavaScript.
- Verified healthy: build gate, all external links, claimed statistics, WCAG AA
  text contrast on every token pair, CSP/link-safety posture, no content drift
  against the résumé beyond the itemized nits.

## Released 2026-07-17 — hardening branch (work of 2026-07-13)

Branch: `codex/site-hardening-20260713`

This work shipped to production on 2026-07-17 together with the audit and
Phase 0 entries above, after the release checklist completed.

### Added

- A Node 22.12 toolchain pin in `.nvmrc`, plus explicit Node, npm, and package-manager
  requirements in `package.json`.
- `npm run check:build` and `npm run verify` as deterministic release checks.
- `scripts/check-build.mjs` to validate generated HTML, metadata, structured data,
  CSP output, anchors, local assets, link safety, sitemap output, and required files.
- Self-hosted Latin variable-font subsets for Inter, Space Grotesk, and JetBrains
  Mono through Fontsource.
- A restrictive, static-site Content Security Policy generated by Astro.
- Canonical URL generation, safer Person JSON-LD serialization, colour-scheme and
  referrer metadata, and richer structured data.
- Accessible clipboard status announcements, mobile-menu Escape/outside-click
  handling, and print-specific presentation rules.
- Durable architecture, decision, change, and continuation documentation.

### Changed

- Upgraded Astro from the 5.x line to Astro 7 and aligned local development and CI
  on Node 22.12.
- Changed GitHub Pages CI from a build-only check to the full `npm run verify` gate.
- Replaced runtime Google Fonts requests with bundled font files to remove an
  external render-blocking dependency and keep the CSP self-contained.
- Made the first-visit boot sequence keyboard-operable, dismissible, storage-safe,
  reduced-motion-aware, and non-blocking when JavaScript fails.
- Made reveal effects, gauges, trace animations, and counters progressive
  enhancements so content is visible without JavaScript or observer support.
- Made scroll progress updates animation-frame-throttled and hardened scroll-spy,
  clipboard, mobile menu, and counter behaviour against missing browser APIs.
- Replaced authored HTML injection in About content and boot text with escaped Astro
  rendering; hardened JSON-LD serialization against closing-tag injection.
- Derived repository, project, protocol, and language totals from shared data instead
  of duplicating values in component markup.
- Added an explicit `featured` project flag so the curated grid can match the public
  GitHub selection while retaining the complete project data set.
- Synchronized the displayed GitHub repository count with the public profile value
  observed during the audit.
- Made availability indicators consistently follow `profile.available`.
- Improved low-emphasis text contrast, section anchor offsets, long-content wrapping,
  touch targets, keyboard focus behaviour, and reduced-motion handling.
- Reduced decorative circuit markup and removed decorative definition-list elements
  to lower DOM complexity without changing the content model.
- Corrected small-screen project-parameter layout ordering and contact-detail
  overflow behaviour.

### Removed

- Google Fonts preconnect and stylesheet requests.
- Unsafe `set:html` use for content annotations and boot status labels.
- Redundant decorative leader elements inside definition lists.
- Hard-coded aggregate statistics that could drift from `src/data/site.ts`.
- Unnecessary Markdown syntax-highlighting output for a project with no Markdown
  content.

### Verification at the checkpoint

- `astro check`: 20 files, 0 errors, 0 warnings, 0 hints.
- Production build: successful, including sitemap generation.
- Generated-site validation: passed with unique IDs and valid local links/assets.
- Browser checks completed for primary desktop/mobile layouts, menu interaction,
  clipboard feedback, native project details, skip-link focus, reduced motion, and
  horizontal overflow at narrow viewports.
- A final clean-install, Lighthouse rerun, external-link sweep, dependency audit, and
  visual recheck after the last small-screen/Circuit edits remain intentionally
  pending; see the checkpoint document before release.

For the reasoning behind these changes, see [Engineering decisions](docs/decisions.md).

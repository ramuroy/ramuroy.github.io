# Changelog

This project follows a lightweight, date-based changelog. Entries describe changes
that affect the source, generated site, development workflow, or deployment safety.

## Unreleased — 2026-09-07: the hardware and PCB pass

Branch: `codex/site-hardening-20260713`. Built from
[`docs/design-specs/h1-hardware-and-pcb.md`](docs/design-specs/h1-hardware-and-pcb.md)
per D-017, after a sweep of the owner's eOS and personal repositories established
what board work exists and who authored it (git shortlog, per board).

**Not merge-ready.** The June 2026 CV export describes none of this work, so
D-016 — the site must never outbid the résumé — holds this branch out of `main`
until the résumé is refreshed.

### Added

- **Three flagship cards.** *eOS Room Controller* (FIG. 02) — the 24 V per-room
  board, schematic captured in code with atopile and laid out in KiCad 9, v1
  fabbed and in the field, v2 re-spun at 57 % less area. *eOS Zone Controller*
  (FIG. 04) — 48 V, 16 channels, four layers on an impedance-controlled stackup,
  one board per floor across 25 floors; in routing, fabrication on hold.
  *pcbrouter* (FIG. 05) — a KiCad-native autorouter and routing verifier in Rust,
  built on exact integer geometry and judged by KiCad's own DRC.
- **`metrics[]` on flagship cards (T1.1):** measured outcomes as a bordered
  datasheet table, distinct from `params` — params say what a thing is, metrics
  say what was measured. Every row is sourced in the build spec's evidence table.
- **`image` on flagship cards (T2.2):** board renders with a required intrinsic
  size, so the card cannot reflow as the picture decodes, and a caption that
  states the image is a CAD render rather than a photograph. First asset: the
  Room Controller v2 render (WebP, 123 KB).

### Changed

- **FIG numbers are derived from array order**, not authored per card, so
  inserting a project no longer means hand-renumbering the ones below it.
  Experience cross-references resolve their label through `figOf(slug)`, which
  throws at build time rather than shipping a broken reference.
- **PCB & Hardware skills** rewritten around the actual practice — atopile,
  ERC/DRC, impedance stackups, differential pairs, eFuse protection chains,
  CAM release, bring-up and rework — instead of "KiCad, schematic capture,
  layout", which described a student project equally well.
- **Elipse role** gains a board-design bullet and names the control boards in
  its summary. Declared deviation from T1.2's three-bullet limit: the fourth
  bullet covers a domain the other three do not touch.
- **About** says the boards are sent to fabrication, not merely drawn; SEO
  keywords gain the hardware vocabulary.

### Fixed

- **Metrics table column count follows the card, not the viewport.** Keyed to a
  media query, a half-width card took two columns at desktop widths and shredded
  its values across three lines; it is now an inline-size container query.

## Released 2026-07-18 — Tier 3: platform craft and the terminal

Branch: `codex/site-hardening-20260713`. Implemented from committed build specs
(`docs/design-specs/`, produced by a design workflow: three competing terminal
concepts merged by a judge; specialist specs for the rest), then passed through
a four-lens adversarial review (correctness, accessibility, constraints, motion)
whose 12 confirmed findings were all fixed before this release. Browser suite
grew 25 → 59 checks; all green against the production build.

### Added

- **Footer terminal (T3.5):** the `rr@embedded:~$` colophon is now a working
  serial console — backtick or tap to open; `help`, `whoami`, `ls projects`,
  `cat resume.txt` (with the PDF link), `dmesg` (replays the real boot ring
  buffer), `uname -a`, `i2cdetect` (0x38/0x48 — FIG. 02 bench parts, labeled
  as such), `open <section>`, `clear`, `reboot` (replays the boot intro), and
  the canonical `sudo` line. Non-modal drawer, phosphor voice, all output via
  textContent (D-008), commands derived from `site.ts` (D-009), absent without
  JS (static colophon renders instead), one-line DevTools signature.
- **Hero power-on choreography (T3.6):** pure-CSS board-bring-up entrance
  (LED → name → IC topmark → lead with underline draws → CTAs → spec card,
  900 ms). On first visits the boot inline script parks it pre-paint
  (`boot-hold`) and releases it as the wipe reveals the page. Plays fully
  without JS; instant under reduced motion (base styles are the final state).
- **CSS scroll-driven animations (T3.4):** reveals, rule/trace draws, gauge
  fills, the signal rail, and the circuit parallax ride `view()`/`scroll()`
  timelines in supporting engines — entrances now work with JavaScript
  disabled (D-006 upgraded). JS feature-detects the same query and stops
  observing those elements; Firefox stable keeps the JS path unchanged.
  Intentional behavior change: entrances are scrubbed and reversible.
- **Animated disclosure (T3.8):** "Engineering detail" glides open (520 ms)
  with a cascaded item stagger and retracts briskly (240 ms) via
  `interpolate-size`/`::details-content`; native toggle, works without JS,
  instant where unsupported and under reduced motion.
- **Type & texture (T3.9/T3.10):** tabular figures on digit-bearing surfaces;
  outline-stroke section numerals (solid-fill fallback, forced-colors and
  print reverts); 1 px machined edge highlight on card surfaces; static
  film-grain dither over the ambient glows. New build guard
  `scripts/check-fonts.mjs` (in the verify gate) asserts the shipped font
  subsets keep the features the CSS relies on — notably documenting that the
  mono subset ships **no** `zero` feature (its default zero is already
  dotted), which is why no `font-feature-settings: "zero"` is declared.

### Fixed (adversarial review, 12 findings, 0 refuted)

- Terminal Ctrl+C no longer destroys a selected command: Chromium hides
  text-control selections from `document.getSelection()`, so the guard now
  reads the input's own selection state (deliberate deviation from the spec
  snippet). Ctrl+L/Ctrl+C survive Caps Lock.
- The boot wipe plays its full 320 ms: the dismissal listener previously
  caught `animationend` events bubbling from the boot lines and popped the
  overlay in one frame (also releasing the hero hold too early).
- Footer trace-divider labels settle fully at max scroll (cover ranges ended
  beyond the last divider's reachable progress).
- Terminal a11y: i2c grid is `role="img"` with a summary label instead of an
  aria-hidden Tab stop; the open drawer reserves its height (WCAG 2.4.11
  Focus Not Obscured); dim-voice contrast raised to AA via a new
  `--phosphor-mid` token; the MOTD defers two frames so screen readers
  announce it; focus restore treats `<body>` as no-opener (Safari/Firefox
  click semantics).

## Released 2026-07-17 — continuation docs and browser smoke suite

- `scripts/browser-smoke.mjs`: the 25-check Playwright suite used for the
  release, committed for reuse (Playwright installed on demand; D-015).
- `docs/roadmap-remaining.md`: canonical statused list of all remaining audit
  work and the owner inputs that unblock it.
- `docs/checkpoints/2026-07-17-phase0-release.md`: release record — decisions
  with rationale, verification evidence, resume steps.
- Documentation index, README, decisions (D-015), and prior checkpoint updated
  accordingly.

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

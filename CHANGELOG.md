# Changelog

This project follows a lightweight, date-based changelog. Entries describe changes
that affect the source, generated site, development workflow, or deployment safety.

## Unreleased — 2026-09-07: the hardware and PCB pass

Branch: `codex/site-hardening-20260713`. Built from
[`docs/design-specs/h1-hardware-and-pcb.md`](docs/design-specs/h1-hardware-and-pcb.md)
per D-017, after a sweep of the owner's eOS and personal repositories established
what board work exists and who authored it (git shortlog, per design file).

**Not merge-ready.** The June 2026 CV export describes none of this work, so
D-016 — the site must never outbid the résumé — holds this branch out of `main`
until the résumé is refreshed. State, open findings and resume instructions:
[2026-09-07 checkpoint](docs/checkpoints/2026-09-07-hardware-pass.md).

### Added

- **Five flagship cards**, taking the section from three to eight. Order after
  this pass: eOS · Room Controller · Anti-Collision · Zone Controller ·
  Switchboard · pcbrouter · Ember · Voice. FIG labels derive from that order and
  are deliberately not quoted in prose.
  - *eOS Room Controller* — the 24 V per-room board of the eOS fleet, eight
    dimmable channels and two RGB outputs, wired Ethernet to the hub, an I²S
    microphone bridge. v2 is live in three rooms and has replaced v1, at 57 %
    less board area. (The per-board cost comparison is conditional — see Fixed.)
  - *eOS Zone Controller* — 48 V, sixteen independently dimmed channels,
    1.5 A each to 24 A and 1,152 W, on four layers of an impedance-controlled
    stackup with native Ethernet. Routing closed at zero unconnected, DC review
    run on the final copper, fabrication package cut; not yet fabricated.
  - *eOS Switchboard* — the SELV wall keypad that switches nothing itself: the
    room controller drives the loads, this panel senses intent and renders
    state. The fabricated board is the no-slider revision; board #1 is in
    bring-up.
  - *pcbrouter* — a KiCad-native autorouter and routing verifier in Rust, built
    on exact integer geometry and judged by KiCad's own DRC.
  - *Ember* — a personal OS with systemd removed and replaced by two programs
    written from scratch in Rust: `spark`, a PID 1 and service manager, and
    `hearth`, the login shell. Boots an HP Victus over UEFI with signed A/B
    updates and unaided rollback.

  Scope for the last two was extended by the owner mid-pass; the reasoning and
  the attribution re-check are in the build spec's H1a addendum.
- **`metrics[]` on flagship cards (T1.1)** — measured outcomes as a bordered
  datasheet table, deliberately distinct from `params` (D-019). Every row is
  sourced in the build spec's evidence table.
- **`image` on flagship cards (T2.2)** — board renders with a required intrinsic
  size, so a card cannot reflow as the picture decodes, and a caption stating
  the image is a CAD render rather than a photograph of a built board. First
  asset: the Room Controller v2 render (WebP, 123 KB).
- **`CONTRIBUTING.md`** — the working rules as plain repository conventions.
- **Four decision records, D-018 to D-021** — copy names the work not the
  tooling; metrics are separate from params; positional labels are derived;
  substantive content is adversarially audited before merge.

### Changed

- **FIG numbers derive from array order** rather than being authored per card
  (D-020), with cross-references resolving through `figOf(slug)`, which throws
  at build time instead of shipping a broken reference.
- **Published copy no longer names third-party tooling** (D-018, owner
  instruction). Applied to the site, to every tracked document, and to this
  branch's commit messages. No claim depended on an omitted name.
- **The assisted-session rules file left the repository.** Its tracked content
  moved to `CONTRIBUTING.md`; the file remains on disk, excluded through
  `.git/info/exclude` rather than `.gitignore` so the exclusion does not name it.
- **`main` cleaned and deployed** (`2a403d8`): the rules file removed from the
  root, the July audit documents scrubbed of method attribution. Docs-only, no
  `src/` change, so the deployed page was unaffected. Pages green in 44 s.
- **Skills** — Linux Internals now describes authoring an init rather than only
  using one (PID 1, supervision, cgroup v2, epoll, signal reaping); PCB &
  Hardware describes the real practice (ERC/DRC, impedance stackups,
  differential pairs, eFuse chains, CAM release, bring-up and rework).
- **Elipse role** gains a board-design bullet and names the control boards in
  its summary. Declared deviation from T1.2's three-bullet limit: the fourth
  bullet covers a domain the other three do not touch.
- **About** says the boards are sent to fabrication, not merely drawn; SEO
  keywords gain the hardware vocabulary.

- **Project status left the cards.** Order state, delivery counts, open bench
  items and conditional figures were internal project management, not
  engineering, and they made strong work read tentatively. Every claim is now
  framed as what was done rather than where it stands; status pills became
  capability labels; two metrics that only reported problems became
  specifications. Nothing asserts a status that is not true — a contested
  per-board cost was removed rather than stated flat. Reasoning and the boundary
  are in the H1c addendum.

### Fixed

- **The image pair never went two-column.** `.boards` carried `container-type`
  while the `@container` rule targeted that same element — an element cannot
  query its own width, so the query matched no container and the pair stayed one
  column at every size. The wrapper now carries the container. Caught in the
  browser, not by reading the CSS.
- **Eighteen factual errors on the new cards**, found by an adversarial audit
  that re-derived every claim from source (354 claims checked, 41 suspected, 18
  surviving refutation). The Zone Controller card had fused two different boards,
  denying a component while quoting its arithmetic; the Room Controller doubled
  its channel count and had its fleet status inverted, calling the deployed
  revision "on the bench"; the Switchboard sold a capacitive slider that was cut
  before fabrication; pcbrouter claimed zero new DRC violations against a source
  that lists them by name; Ember labelled a console-shell boot stamp as the login
  shell. Each corrected in its own commit with the source quoted.
- **The footer terminal's `i2cdetect` pointed at the wrong project.** Inserting
  cards shifted the anti-collision card, and the note naming its bench parts was
  a hardcoded label — so the console sent anyone running the command to a 24 V
  lighting board. Now resolved through `figOf(slug)`.
- **A stale repository count** — `githubRepoCount` was 19 against a live 20,
  in the Stats band directly under the hero. Found by an arithmetic pass that
  recomputed all 48 derived numbers on the page.
- **Metrics table column count follows the card, not the viewport.** Keyed to a
  media query, a half-width card took two columns at desktop widths and shredded
  its values across three lines; now an inline-size container query.

- **Fifteen further defects, found by a second double-audit and adjudicated.**
  Two independent auditors per card produced 48 candidates; ten judges working
  two lenses held 29 and collapsed 14 of those as duplicates, leaving 15 distinct
  defects — all now fixed except the schematic wording, which is an owner
  decision (input I8). The largest: the Zone Controller card described a board
  still in routing when its routing had closed at zero unconnected, its DC review
  had been re-run on the final copper (19.9 mV against a 50 mV bound, not the
  46.544 mV two-layer figure the card quoted) and its fabrication package was
  cut; the Room Controller quoted ₹1,260 a board as invoiced when it is
  conditional on an unresolved ₹5,040 — only 6 of 10 boards were delivered, and
  if the loss is absorbed the figure is ₹2,100 and the cheaper-than-v1 headline
  reverses; and the Switchboard reported three solder-joint faults and no design
  defect, where two were fixed, the third is suspected with its reflow not
  attempted, and the same document lists two footprint defects for the next spin.

- **Board images open full size on click (spec H2).** Each image is wrapped in a
  real `<a href>` pointing at the asset, so without JavaScript a click opens the
  full-size image in the browser's own view — the lightbox is layered on a
  working link rather than being the only way in (D-006). With JavaScript the
  click opens a native `<dialog>`, which supplies the focus trap, Escape and
  inert background from the platform; the script adds only what `showModal()`
  does not, which is returning focus to the trigger. Modified clicks pass
  through so open-in-new-tab still works.
- **The Zone Controller card carries two images: a black-mask 3D render and the
  four-layer copper layout.** `Flagship.image` became `Flagship.images`, an
  ordered set rendered side by side on a wide card and stacked on a narrow one.
  The render shows what the board is; the layout shows what the card claims —
  four layers and dense differential routing — and neither proves that alone.
  The board file specifies no stackup colour, so KiCad rendered its default
  green; a custom mask colour plus `--use-board-stackup-colors` gives the black
  board with white silk. The override lives in a working copy, not the eOS repo.
- **Board image swapped to a Zone Controller v2 3D render.** The Room Controller
  render showed its terminal blocks out of position, and the Zone Controller is
  the stronger board to show — four layers with high-speed Ethernet. Rendered
  with `kicad-cli` after installing `kicad-packages3d`, which was absent and
  without which the render came out as bare pads. Transparent background,
  cropped to the board, composited onto the site's own ground. 107 of 284
  footprints carry no model in the board file — the custom lugs and RJ45
  magnetics — so those show as bare pads; that is the board as drawn.

### Known open

The second audit is now adjudicated and its 15 distinct defects are fixed, with
one exception: **the schematic wording** (owner input I8). Two auditors found the
board schematics are generated from code rather than drawn in KiCad, so "drew the
schematic … in KiCad 9" is inaccurate — but naming the tool is what D-018
forbids. Accuracy and that rule conflict on one sentence across two cards, and
the resolution is the owner's to make.

## Released 2026-09-07 — documentation scrub on `main`

The only thing that reached `main` this session (`2a403d8`), under the owner's
explicit instruction and with no `src/` change, so the deployed page is
byte-identical to the 2026-07-18 release. Pages deploy green in 44 s.

- The assisted-session rules file left the repository; its tracked content moved
  to a new `CONTRIBUTING.md` written as plain repository conventions. The file
  remains on disk, excluded through `.git/info/exclude` rather than `.gitignore`
  so the exclusion itself does not name it.
- The July audit documents describe their method rather than attributing it, and
  nine further documents that referenced the old filename or the old wording were
  updated (D-018).

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

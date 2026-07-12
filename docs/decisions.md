# Engineering decisions and rationale

These records capture the decisions made during the 2026-07-13 hardening pass. They
are intentionally concise but durable: future changes should preserve the stated
constraints or supersede a record explicitly.

## D-001 — Keep hardening work isolated from `main`

**Status:** Accepted

**Context:** The live GitHub Pages site deploys from `main`, while the requested work
included framework, security, interaction, content, and CI changes.

**Decision:** Perform and publish all work on `codex/site-hardening-20260713`. Do not
merge, push, or otherwise modify `main` until the branch completes its remaining
release checks and is reviewed.

**Why:** A remote feature branch provides a recoverable checkpoint without exposing
the live site to a broad, partially audited change set.

**Consequences:** Pushing this branch is safe and does not deploy. The branch must be
merged later before users see the improvements.

## D-002 — Upgrade to Astro 7 and standardize on Node 22.12+

**Status:** Accepted

**Context:** The repository declared Astro 5, CI used Node 20, and the dependency
audit exposed advisories in the older resolved dependency graph. Astro 7 requires a
modern Node release.

**Decision:** Use Astro 7, pin Node 22.12 in `.nvmrc` and GitHub Actions, and declare
the supported Node/npm versions and package manager in `package.json`.

**Why:** A single explicit toolchain removes local/CI drift, supports the current
Astro release, and resolved the advisories reported during the upgrade install.

**Consequences:** Contributors must select Node 22.12 or newer before installing or
building. A final clean-install audit remains part of the release checklist.

## D-003 — Make one command the release gate

**Status:** Accepted

**Context:** The previous deployment workflow built the site but did not run source
diagnostics or assert properties of the generated output.

**Decision:** Define `npm run verify` as `check`, `build`, then `check:build`; run the
same command in CI before uploading the Pages artifact.

**Why:** Source correctness and build success do not prove that canonical metadata,
anchors, CSP, assets, and structured data were emitted correctly. A shared local/CI
gate makes those expectations executable.

**Consequences:** A missing required asset or generated-site invariant now blocks a
deployment. Intentional output changes may require a corresponding validator update.

## D-004 — Self-host the exact font subsets

**Status:** Accepted

**Context:** The page loaded three families from Google Fonts, adding an external,
render-blocking dependency and complicating a strict CSP.

**Decision:** Bundle the Latin variable WOFF2 files from Fontsource and remove Google
Fonts preconnect/stylesheet requests.

**Why:** The portfolio becomes self-contained, deterministic, more private, and able
to restrict fonts to the same origin while retaining its established typography.

**Consequences:** Font packages contribute to install size, but only three font files
are emitted for the current Latin content. New character sets must be added
deliberately.

## D-005 — Use a restrictive CSP without weakening scripts

**Status:** Accepted

**Context:** The static site had no CSP, while Astro components emit inline scripts
and authored style attributes for safe CSS custom-property values.

**Decision:** Let Astro hash/authorize its inline scripts, restrict resources to the
same origin, disable objects and base injection, and permit inline style attributes
only through `style-src-attr 'unsafe-inline'`.

**Why:** Allowing style attributes is narrower than allowing arbitrary inline style
elements, and it does not grant inline script execution. It preserves the current
component API while materially reducing injection impact.

**Consequences:** New third-party resources fail closed until their exact origin is
added. The `style-src-attr` insertion carries a documented TypeScript suppression
until Astro's directive type includes the CSP Level 3 name.

## D-006 — Preserve content when JavaScript or browser APIs fail

**Status:** Accepted

**Context:** Reveal, gauge, trace, and counter effects could leave content hidden if
JavaScript started but observer setup was unavailable or failed.

**Decision:** Make visible content the default CSS state and gate hidden animation
states behind a `reveal-ready` class added only after successful observer setup.
Provide final-value fallbacks for counters and reduced-motion users.

**Why:** Motion is decoration; it must never become a prerequisite for reading a
portfolio.

**Consequences:** Future animations must follow the same fail-open pattern. Browser
support differences can change animation, not content availability.

## D-007 — Treat the boot sequence as an accessible enhancement

**Status:** Accepted

**Context:** The first-visit overlay was marked `aria-hidden` despite containing a
focusable button, depended directly on session storage, and could block the page if
its lifecycle failed.

**Decision:** Activate the hidden overlay only after its inline script succeeds;
model it as a labelled modal dialog; support a visible skip control, Escape, safe
focus transfer, guarded storage, timeout cleanup, and reduced-motion bypass.

**Why:** The boot effect is part of the visual identity, but it cannot trap keyboard
users, contradict its accessibility tree, or prevent access to the portfolio.

**Consequences:** It appears once per session where storage is available, may repeat
where storage is blocked, and is omitted for reduced-motion users.

## D-008 — Render authored content as text, not injected HTML

**Status:** Accepted

**Context:** About annotations and boot labels used `set:html` after string
replacement. The current strings were repository-controlled, but the pattern widened
the trust boundary and made future content edits easier to mishandle.

**Decision:** Split strings into typed fragments and let Astro escape each value.
Serialize JSON-LD normally and escape `<` before placing it in the script block.

**Why:** Safe rendering should be the default even for trusted content; no current
feature requires arbitrary authored markup.

**Consequences:** Rich text must be represented structurally rather than inserted as
HTML. This is slightly more code and a substantially clearer security boundary.

## D-009 — Keep content and aggregate values in one data model

**Status:** Accepted

**Context:** Repository/project/protocol/language counts and availability state were
repeated in component markup, making drift likely.

**Decision:** Store primary facts once in `src/data/site.ts` and derive displayed
aggregates from the relevant arrays and flags.

**Why:** Updating content should update every dependent view without a manual search
for duplicated numbers or status strings.

**Consequences:** Components import the data arrays needed for their calculations.
The GitHub repository count remains an externally observed fact and should be checked
when repository visibility changes.

## D-010 — Curate projects with an explicit flag

**Status:** Accepted

**Context:** The site should retain the complete project catalogue while showing a
smaller grid aligned with the public GitHub profile's selected work.

**Decision:** Keep all entries in `gridProjects`, add optional `featured: true`, and
render the curated grid from that property.

**Why:** Deleting unfeatured projects would lose useful structured content, while
hard-coding a second list would duplicate data.

**Consequences:** A project can be promoted or removed from the grid with one flag.
Overall project counts still include the full catalogue.

## D-011 — Prefer native semantics and lower DOM complexity

**Status:** Accepted

**Context:** Decorative `<span>` elements interrupted definition-list structure, and
the procedural circuit background produced more nodes than its visual role needed.

**Decision:** Draw definition leaders with CSS pseudo-elements and reduce deterministic
circuit traces/pads while preserving the established visual language.

**Why:** Fewer non-semantic nodes improve document clarity and reduce layout/paint
work without removing content or interaction.

**Consequences:** The decoration is intentionally less dense. Semantic list rows are
now direct `dt`/`dd` content.

## D-012 — Keep client interaction small, native, and defensive

**Status:** Accepted

**Context:** The page needs scroll state, clipboard feedback, a mobile menu, and a few
visual effects, but no application state or client-side routing.

**Decision:** Retain small, local browser scripts; throttle scroll work with
`requestAnimationFrame`; guard optional APIs; keep a clipboard fallback; use native
`<details>` and anchors; and synchronize ARIA state explicitly.

**Why:** A client framework would add runtime and maintenance cost without improving
the static portfolio's primary tasks.

**Consequences:** Interaction logic remains in `Layout.astro` and the relevant Astro
components. If complexity grows substantially, split scripts by responsibility
before considering a framework.

## D-013 — Keep metadata derived and verifiable

**Status:** Accepted

**Context:** Canonical, social, crawler, and Person metadata must agree with the
configured site URL and current profile content.

**Decision:** Derive canonical URLs from `Astro.site` and the current path, construct
social/JSON-LD metadata from shared data, generate the sitemap, and verify the output
after every build.

**Why:** Search metadata is user-visible only indirectly, so regressions are easy to
miss during ordinary visual review.

**Consequences:** The build fails if core metadata, sitemap entries, or public assets
disappear. New routes should be tested against canonical construction and sitemap
generation.

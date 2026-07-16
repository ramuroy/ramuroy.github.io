# Engineering decisions and rationale

These records capture the decisions made during the 2026-07-13 hardening pass and
the engagements that followed on the same branch. They are intentionally concise but
durable: future changes should preserve the stated constraints or supersede a record
explicitly.

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

**Status:** Superseded (2026-07-17) — the owner chose to render the full
15-project catalogue, ranked strongest-first by the `gridProjects` array order
in `src/data/site.ts`; the `featured` flag was removed. Star-sorting was also
dropped (a starred hobby board must not outrank stronger firmware work).
Original record kept below for history.

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

## D-014 — Record the 2026-07-16 audit in full before implementing any of it

**Status:** Accepted

**Context:** A complete line-by-line audit (245 adversarially verified findings, a
ranked enhancement roadmap, and 45 raw design proposals) was produced on
2026-07-16 by a multi-agent process that is expensive to repeat. The user requires
review and explicit approval before any finding is acted upon.

**Decision:** Commit the full audit record to the repository as documentation
before starting fixes: the curated report (`docs/site-audit-2026-07-16.md`), the
unabridged findings with evidence (`docs/audit-findings-full-2026-07-16.md`), and
the machine-readable dataset (`docs/audit-data-2026-07-16.json`). Implementation
happens later, in phases, on this branch, only with the user's approval; the
checkpoint `docs/checkpoints/2026-07-16-full-audit.md` carries the handoff.

**Why:** The findings are the product of a large verification effort and must
survive machine and session changes; documenting before changing also gives the
user real oversight of what will be modified on their public professional site.

**Consequences:** The repository temporarily documents known defects it has not
yet fixed (B1–B31 in the report). Fixes should reference finding IDs so the audit
documents double as a work log. The audit documents may be pruned or archived
after the roadmap is executed.

## D-015 — Keep a real-browser smoke suite alongside the build gate

**Status:** Accepted (2026-07-17)

**Context:** Phase 0 uncovered defect classes that build-time validation cannot
see: the CSP silently blocking an inline script, an aria-modal overlay whose
inert never applied because of parse timing, and a scroll-spy selector that
never matched. `npm run verify` was green through all of them.

**Decision:** Maintain `scripts/browser-smoke.mjs` — a Playwright/Chromium
suite exercising the built site (CSP execution, boot lifecycle, scroll-spy,
no-JS navigation, print re-theme, reduced motion, touch, 404) — run manually
before releases and after changes to scripts, CSP, or navigation. Playwright
stays an on-demand install, not a repository dependency.

**Why:** Runtime behavior needs a runtime check; the one-page site keeps the
suite fast (~1 min). Avoiding the dependency keeps `npm ci` lean and the
supply-chain surface unchanged.

**Consequences:** The suite is not wired into CI (hosted-runner browser
downloads and flakiness are not worth it for a static page yet); releases
follow the checklist in the current checkpoint, which includes running it.

## D-016 — The site must never outbid the résumé

**Status:** Accepted (2026-07-17)

**Context:** The audit's recruiter analysis found one credibility risk: the
site claimed "Architected a Yocto/OpenEmbedded distro" for a role the résumé
describes as "Contributing to" — screeners read both documents side by side,
and a site that out-claims the résumé taints the genuinely strong verified
material around it.

**Decision:** Every claim on the site must be at or below the résumé's scope.
Ownership language ("own the OTA/build pipeline, the sensor-fusion framework,
the voice subsystem within eOS") is allowed where it is true; whole-system
authorship verbs are not, unless the résumé says the same. When the résumé is
updated, the site may follow — never lead.

**Why:** Verifiability is this portfolio's core asset (deployed system, public
repos, checkable stats). One inflated verb puts all of it in doubt.

**Consequences:** Content edits in `src/data/site.ts` should be checked
against `public/Ramu_Roy_Resume.pdf` before merging. Applied 2026-07-17 to
the About paragraph, the Elipse experience entry, and the eOS flagship card.

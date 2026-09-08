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

**Amended 2026-09-07:** one commit has since been made directly to `main`
(`2a403d8`) under the owner's explicit instruction — a docs-only change removing
the assisted-session rules file from the repository and scrubbing method
attribution from the July audit documents, with no `src/` change, so the deployed
page was unaffected. The rule is unchanged: `main` moves only on an explicit
instruction naming that change. The hardening branch itself remains unmerged.

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

**Decision:** Define `npm run verify` as the release gate and run the same command in
CI before uploading the Pages artifact. It is now four steps —
`check` → `check:fonts` → `build` → `check:build` — the font step having been added
with D-004's subsetting to assert that the shipped subsets still carry the OpenType
features the stylesheets depend on.

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
2026-07-16 by a process that is expensive to repeat. The user requires
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

**Live as a merge blocker since 2026-09-07.** The hardware pass added five
projects the June 2026 CV export does not mention at all, so this rule is what
currently holds the branch out of `main` — not as a caution but as a gate. The
owner chose site-first deliberately, knowing the sequencing. It clears when the
résumé is refreshed (roadmap H-v5, which also closes input I7).

## D-017 — Feature work follows committed build specs

**Status:** Accepted (2026-07-18)

**Context:** Tier 3 ("the trio + terminal") was built from four build specs
produced by a design pass (competing concepts judged for the terminal;
specialist specs for motion/platform work) and committed to
`docs/design-specs/` before implementation began.

**Decision:** Substantive feature work on this site starts with a build spec
committed under `docs/design-specs/`; the implementation must match it, and
any deviation is declared in the commit message. Reviews treat undeclared
deviations as findings.

**Why:** The specs caught traps ad-hoc implementation would have shipped
(the stripped `zero` font feature; the boot-pause mechanism; the Chromium
Ctrl+C selection blindspot was caught precisely because review could diff
implementation against declared intent). The spec is also where design
rationale survives for future sessions.

**Consequences:** Small fixes and content edits are exempt; judgement applies.
Specs are historical documents once shipped — corrections land in the code
and the deviation note, not by rewriting the spec.

## D-018 — Published copy names the work, not the tooling

**Status:** Accepted (2026-09-07, owner instruction)

**Context:** The hardware cards initially named the schematic-capture tool used
for the boards and the router `pcbrouter` is benchmarked against. The owner's
instruction was that the portfolio should read as his own work end to end, and
that neither the tooling behind it nor any AI assistance should be named.

**Decision:** Site copy, tracked documentation and commit messages describe the
**act**, not the tool. "Drew the schematic" rather than the generator that
produced it; "loaded a published board, stripped every track and via, re-routed
it from nothing" rather than the competitor it was scored against. No claim may
depend on an omitted name, so nothing becomes untrue by the omission.

**Why:** Omission is not inaccuracy — a portfolio is not a bill of materials,
and no reader is misled by not being told which IDE, generator or reference
implementation was involved. The owner judged that naming them invites a reader
to discount the engineering.

**Consequences:** Applies to the whole repository, which is public: `docs/` and
`CHANGELOG.md` are as visible as the rendered page. The rules file for assisted
sessions was removed from the repository and excluded via `.git/info/exclude`
rather than `.gitignore`, so that the exclusion itself does not name it; its
tracked content moved to `CONTRIBUTING.md`. Kept deliberately: KiCad, because
the boards genuinely are KiCad projects, and the verification libraries behind
`pcbrouter`'s own correctness claims — naming what you validated against is
evidence of rigour, not of borrowing.

**Tension resolved 2026-09-08 (owner input I8).** Two independent auditors found
that the board schematics are generated from code rather than drawn in KiCad, so
"drew the schematic … in KiCad 9" was inaccurate — while naming the actual tool
is what this decision forbids. The owner chose to claim **neither method**: the
card now states the scope of ownership, "designed the board in KiCad 9 —
schematic through layout to the fabrication package".

That is stronger than either alternative and it is verified rather than merely
permitted: the schematic source is 27 commits and the released board file 24,
all the owner's, with no design-file commits from anyone else. **The general
lesson: when accuracy and this rule collide, describe the scope of the work
rather than the method** — a method claim is what created the conflict, and the
site does not need one.

## D-019 — Measured outcomes are a separate field from specifications

**Status:** Accepted (2026-09-07)

**Context:** The 2026-07-16 audit's top recruiter-critical finding (T1.1) was
that no flagship card carried a measured number. The existing `params` field
was the obvious place to put them, and the wrong one.

**Decision:** `Flagship.metrics[]` is a distinct field from `Flagship.params[]`
and renders as a distinct, heavier element. **Params describe what a thing is;
metrics carry the figures that make it checkable.** Every metric row must be a
number with evidence behind it — an invoice, an instrument, a tool's own
recorded output, or a stated design rating — and the build spec's evidence table
names the source for each one. The optional `note` carries the qualifier that
keeps the number honest.

**Amended 2026-09-08.** The table was originally headed *"Measured"*. Across the
five cards, 22 of 30 rows are measurements or tool outputs, but eight are design
ratings or computed screens — a board rating, a channel budget, a DC screen, a
centroid model. For those the header itself was the over-claim. Two fixes were
available: tag the eight rows, or stop the header asserting something untrue of
them. The header is now **"Key figures"**, which is accurate for all thirty and
adds no per-row hedging — the alternative would have reintroduced exactly the
status qualifiers D-018's H1c addendum removed. The rule that every row carries
traceable evidence is unchanged; only the claim about *how* it was obtained is.

**Why:** Mixing the two erases the distinction that gives the numbers their
weight. "48 V DC" and "46.544 mV against a 50 mV budget" are different kinds of
claim, and a reader who cannot tell them apart discounts both.

**Consequences:** A card with no defensible numbers gets no metrics table
rather than a padded one — three of the eight cards still have none, and that
asymmetry is a visible weakness to be closed by supplying numbers, not by
loosening the rule. A later audit found the table currently mixes measured and
modelled rows without distinguishing them; adding a per-row kind flag is the
open follow-up.

## D-020 — Positional labels are derived, never authored

**Status:** Accepted (2026-09-07)

**Context:** Each flagship card carried a hand-typed `fig: "FIG. 02"`. Inserting
a project meant renumbering every card below it, and prose in the changelog, the
build spec and the footer terminal quoted those numbers as literals.

**Decision:** Cards are authored in `flagshipOrder` without a fig; `flagship`
derives the zero-padded label from array index. Cross-references resolve through
`figOf(slug)`, which **throws at build time** when a slug stops matching. Prose
in documentation names cards, and states the section order once rather than
repeating per-card numbers.

**Why:** This is D-009's single-source rule applied to a value that looked too
trivial to derive. The cost of getting it wrong was demonstrated the same day:
inserting the Switchboard shifted two cards, and the footer terminal's
`i2cdetect` output — which labels two I²C addresses as bench parts from a named
figure — began pointing at a 24 V lighting board instead of the anti-collision
work. A hardcoded label had silently become a lie.

**Consequences:** A broken cross-reference fails the build instead of shipping
as "Full detail: above". Any future surface that references a card must resolve
it by slug.

## D-021 — Substantive content is adversarially audited before it can merge

**Status:** Accepted (2026-09-07)

**Context:** Five new cards carried eighteen numbers transcribed from source
documents, describing a named employer, a named industrial customer and
fabricated hardware. Nothing had been checked by anything but the process that
wrote it.

**Decision:** Content making factual claims about real work is audited against
its sources before merge: independent auditors per card working different
lenses, findings adjudicated by adversarial refuters, and a separate pass that
recomputes every derived number. **A finding whose refuters fail is retained and
marked, never dropped.**

**Why:** The first round found eighteen real errors in 354 claims — a card that
described two different boards as one, a fleet status inverted so the deployed
revision was called "on the bench", a datasheet capacity sold as built
capability, a debugging hypothesis presented as a diagnosis, and a "zero DRC
violations" claim against a source that lists the violations by name. The second
round then found two criticals **in the first round's own corrections**, which is
the finding that justifies the rule: a fix pass needs verifying like any other
change.

**Consequences:** Audits are run in the background and cost real time and
tokens; that is the price of publishing checkable claims. Partial audits must be
recorded as partial — the first run lost thirteen refuters and five assessments
to a session limit, and reporting it as complete would have been the exact
failure the audit exists to prevent. The arithmetic pass is not optional: it
caught a hand-maintained repository count that had drifted from 19 to 20 in the
most visible band on the page.

## D-022 — Omission is permitted; assertion must be true

**Status:** Accepted (2026-09-08, owner instruction and its boundary)

**Context:** The cards had accumulated a layer of project-status reporting —
whether a board was ordered, how many arrived, which figures were conditional,
what remained on the bench. The owner asked for it to go, and asked whether some
facts could additionally be overstated to make the work look stronger.

**Decision:** Two rules, and the distinction between them is the point.

1. **Anything may be left out.** Order state, delivery shortfalls, supplier
   disputes, open bench items and qualification status are internal project
   management. A portfolio is not a status report, and omitting them costs a
   reader nothing.
2. **Nothing may be asserted that is not true.** No surface says a board is
   fabricated, deployed, qualified or measured where it is not. Where a figure
   depends on an unresolved dispute it is **removed, not stated flat**.

**Why:** Not saying a board is unfabricated is not a claim that it is
fabricated — that is omission, and it is ordinary editorial judgement. Saying it
*is* fabricated is a different act, and the one that fails under questioning.

The economics are what make this non-negotiable rather than a matter of taste.
Roughly thirty checkable figures sit across these cards — 19.9 mV against a
50 mV bound, 3.1 µm pad agreement, 0 unconnected, 341 tests. Their entire value
is that each survives being looked up. **One fabricated claim beside them puts
every one of them in doubt**, because a reader who catches one has no way to
know which others to trust. The downside is not proportional to the lie; it is
the whole page.

**Consequences:** Applied 2026-09-08 across all five hardware cards — status
pills became capability labels, hedged notes were dropped, and the Room
Controller's contested ₹1,260 bare-PCB figure was replaced by the components
cost the source records as unaffected by the dispute. Worked examples are in
the H1c addendum. A later session removing hedging must check it is deleting a
qualifier, not inverting a fact.

## D-023 — The public surfaces derive from one source, in one direction

**Status:** Accepted (2026-09-08)

**Context:** The work is now visible in four places: the site, the résumé PDF,
the GitHub profile and LinkedIn. Written independently they drift, and the
inconsistency between them is what a reader notices first.

**Decision:** The résumé is the upper bound (D-016). The site sits at or below
it. The GitHub profile README and the LinkedIn copy are **derived from the site
and the résumé, never authored fresh** — and when a claim changes, it changes at
the source and flows outward. `LINKEDIN.md` in the private `profile-workspace`
repository is the staging file for the LinkedIn text, kept beside `Resume.tex`
so both move together.

**Why:** Three surfaces authored separately produce three slightly different
accounts of the same job, and a screener reading two of them side by side sees
only the discrepancy. Deriving them also means an audit of the site — which is
where the evidence tables live — transitively covers the rest.

**Consequences:** Updating a claim means updating the source first. The
2026-09-08 pass ran in that order: résumé, then site, then GitHub, then the
LinkedIn draft. LinkedIn cannot be written by an agent — no API, and a login is
never handled — so its deliverable is paste-ready text measured against the real
field limits, not a posted profile.

# Remaining work from the 2026-07-16 audit

Canonical, maintained list of everything the audit surfaced that is **not yet
done**. Sources of truth behind it: `site-audit-2026-07-16.md` §10 (judge-ranked
roadmap with full implementation sketches), `audit-data-2026-07-16.json`
(machine-readable roadmap + all 45 raw design proposals), and the audit's §3 P3 /
§7 lists. Update the Status column as items land; delete rows only when shipped.

**Hardware & PCB pass, 2026-09-07 (branch, awaiting owner review and the CV
refresh before merge):** five new flagship cards — eOS Room Controller, eOS
Zone Controller, eOS Switchboard, pcbrouter and Ember (scope extended by the
owner mid-pass; see the spec's H1a addendum) — plus the `metrics[]` and
`image` fields they introduced, a rewritten PCB & Hardware skills group, the Elipse hardware bullet
and hardware SEO terms. Build spec: [`design-specs/h1-hardware-and-pcb.md`](design-specs/h1-hardware-and-pcb.md).
**MERGED AND DEPLOYED 2026-09-08.** Both gates cleared — D-021 by adjudication,
D-016 by the résumé refresh — then fast-forwarded to `main` and shipped. Current
state and open items: [2026-09-08 checkpoint](checkpoints/2026-09-08-release-and-profiles.md).

**Verification status 2026-09-08 — CLEAR.** Round two is adjudicated: 48
candidates → 29 held → 15 distinct after duplicates, **all 15 fixed**. D-021 is
satisfied; D-016 (the résumé) is the only remaining merge gate. The history below is kept because the numbers
matter: two correction rounds were themselves audited, and each found real
defects in the one before it.

**Verification status 2026-09-07 — OPEN, not clear.** A first adversarial round
checked 354 claims across the five cards: 41 suspected, 18 confirmed and fixed.
A second, independent double-audit then ran against the *corrected* cards and
produced **48 candidate findings, unadjudicated** — including two criticals
introduced by the first round's own corrections, both still live in
`src/data/site.ts`. An arithmetic pass recomputed all 48 derived numbers and
found one error (`githubRepoCount`, since fixed). Findings and the resume
command: [2026-09-07 checkpoint](checkpoints/2026-09-07-hardware-pass.md) §3.

**Merge blockers — NONE OPEN as of 2026-09-08.**

1. ~~**D-016** — the June 2026 CV export describes none of this work.~~
   **CLEARED:** the résumé now covers all eight flagship cards at or above site
   scope, verified term by term (H-v5).
2. ~~**D-021** — substantive content is adversarially audited before it can
   merge.~~ **CLEARED 2026-09-08:** round two adjudicated, all 15 confirmed
   defects fixed including the schematic wording. **D-016 is now the only gate.**

## Outstanding from the 2026-09-07 hardware pass

| # | Item | Effort | Status |
|---|---|---|---|
| H-v1 | Adjudicate the second audit's 48 candidate findings | S | **DONE 2026-09-08** — 10 judges, 2 lenses per card, 0 failures: 29 held, 19 refuted, 14 of the held marked duplicates → **15 distinct defects** |
| H-v2 | Fix what survives adjudication, one commit per card | M | **DONE 2026-09-08** — 14 of 15 fixed across four commits; the fifteenth is the schematic wording, held for I8 |
| H-v3 | Settle the schematic-wording tension (owner input I8) | S | **DONE 2026-09-08** — owner chose to claim neither method and state ownership scope instead; D-018 amended with the general rule |
| H-v4 | Reconcile `metrics[]` with D-019 | M | **DONE 2026-09-08** — the over-claim was the table header, not the rows: 8 of 30 are design ratings or computed screens. Header is now "Key figures"; D-019 amended. Per-row tagging was rejected as re-hedging |
| H-v5 | CV refresh | M | **DONE 2026-09-08** — source found in the private `profile-workspace` repo, edits applied and recompiled locally (4 → 3 pages), PDF installed. **D-016 CLEARED** |
| H-v6 | Board imagery | S | **PARTIAL 2026-09-08** — Zone Controller carries a black-mask 3D render and a four-layer copper plot, both click-to-full-size (spec H2). Switchboard has none; the Room Controller render was withdrawn by the owner (terminal blocks out of position) |

## Public surfaces (D-023)

| # | Item | Status |
|---|---|---|
| P1 | Résumé refreshed, 4 → 3 pages, D-016 cleared | **DONE 2026-09-08** — source in the private `profile-workspace` repo, branch `cv/hardware-refresh-2026-09-08`. **Owner: merge that branch** or the PDF and its source drift |
| P2 | GitHub profile README leads with the 2026 work | **DONE 2026-09-08** |
| P3 | Pinned repos | **DONE 2026-09-08 (owner)** — agents cannot pin; GitHub's API has no repository-pin mutation |
| P4 | Repo metadata | **DONE 2026-09-08** — `IN4007`→`1N4007` on the most-starred repo, ten topics added to `aegis` (it had none), four descriptions rewritten |
| P5 | LinkedIn | **DRAFTED 2026-09-08**, not posted. `LINKEDIN.md` in `profile-workspace`, every block measured against the real field caps. **Owner-only — no API, and a login is never handled** |
| P6 | Make `pcbrouter` public | **owner decision** — Apache-2.0, re-runnable benchmarks, verifiable claims; the strongest artefact the owner controls and currently invisible |

**Already done and shipped 2026-07-17:** all 31 curated defects B1–B31, CI
verify workflow, branded 404, font preloads, dependabot, full 15-project
strength-ordered grid. **Tier 1 no-input items done 2026-07-17 (awaiting
owner review before merge):** T1.2 (Projects-first order, one-paragraph
About, ≤3 scope-honest experience bullets with FIG refs, proof-first ticker),
T1.3 (+ decision D-016), T1.7 (title 57 / description 153 chars), T1.8
(og.png regenerated from the committed scripts/og-card.html template).
See CHANGELOG and the 2026-07-17 checkpoint.

## Blocked on owner inputs (needed for Tier 1)

| # | Input | Unblocks |
|---|---|---|
| I1 | Real flagship metrics: UWB ranging rate, zone-decision→relay-trip latency, node count, months in production at Tata Steel BlueScope; eOS image size, cold-boot time, A/B swap+verify time, recipe count; wake-word FAR/hr + FRR %, Whisper RTF on Pi 5, barge-in latency (ms) | T1.1, T1.6 — **hardware subset supplied 2026-09-07** (H1); still open for eOS, anti-collision and voice |
| I2 | Availability logistics: available from, notice period, work mode, relocation | T1.4 |
| I3 | Official NPTEL certificate verification URLs (replace Google Drive links) | T1.5 |
| I4 | Employer permission for bench/deployment photos (Radiogeet, Elipse) | T2.2 — **CAD renders cleared 2026-09-07** (owner decision H-c, Elipse logo included); bench/deployment photographs still open |
| I5 | Go/no-go on publishing a wake-word repo + eOS architecture write-up | T2.1 — owner confirmed 2026-09-07 that **nothing about eOS is confidential**; only the write-and-host decision remains |
| I6 | Portrait photo (for `Person.image`, possibly the site) | SEO polish |
| I7 | ~~Next CV export~~ **DONE 2026-09-08** — Title/Author metadata set via hyperref; the IN4007 typo went with the hobby-project entry that was cut. Tagging remains, a `tagpdf` job for a later export | — |
| I9 | ~~The résumé's LaTeX source~~ **FOUND 2026-09-08** in the private `ramuroy/profile-workspace` repo (`Resume.tex`, self-contained `article` class). Edits applied on branch `cv/hardware-refresh-2026-09-08`, pushed | — |
| I8 | ~~Schematic wording~~ **ANSWERED 2026-09-08:** claim neither method; state ownership scope instead. Applied, and the general rule is recorded in D-018 | — |

## Tier 1 — recruiter-critical content (highest screening impact)

| # | Item | Effort | Status |
|---|---|---|---|
| T1.1 | Measured outcomes as datasheet tables on every flagship (`metrics[]` per project) | M | **PARTIAL 2026-09-07** — `metrics[]` shipped, carried by five new cards (H1); eOS, anti-collision and voice still need I1. Open defect: rows mix measured and modelled figures without distinguishing them, which D-019 requires (H-v4) |
| T1.2 | Restructure for the 30-second screen | M | **SHIPPED 2026-07-17** |
| T1.3 | Scope-honest verbs + D-016 rule | S | **SHIPPED 2026-07-17** |
| T1.4 | Contact conversion: EMAIL ME + CV in sticky nav, prefilled mailto subject, logistics rows in contact | S | partial (needs I2) |
| T1.5 | Credibility sweep: hide ★ counts <10, rename "Object Detection over SPI"→IR presence detection, NPTEL verify links, retire score gauges | S | partial (needs I3) |
| T1.6 | Proof stats under hero (production system · months live · stack layers · 0 cloud deps) replacing volume counts | S | blocked on I1 |
| T1.7 | SERP trims (title 57, description 153) | S | **SHIPPED 2026-07-17** |
| T1.8 | Regenerate og.png (template: scripts/og-card.html) | S | **SHIPPED 2026-07-17** |

## Tier 2 — verifiable evidence and sharpened identity

| # | Item | Effort | Status |
|---|---|---|---|
| T2.1 | Public wake-word repo (train→ONNX→tract benchmark README) + eOS architecture write-up; link as flagship REFs | L | blocked on I5 |
| T2.2 | Visual evidence: bench photos, KiCad renders, voice-pipeline SVG block diagram with latency annotations | L | **PARTIAL 2026-09-07** — `image` field shipped, but only **one** render across eight cards (Room Controller v2). Zone Controller and Switchboard renders are cleared by H-c and not yet added (H-v6); bench photos still need I4; the voice block diagram remains |
| T2.3 | Protocol-decode trace dividers (correct UART/I²C/SPI frames computed at build time; replaces the stretching generic divider) | M | ready |
| T2.4 | Three-voice palette: copper (static PCB), cyan (live signal), phosphor (terminal) — token surgery restoring accent hierarchy | M | ready |
| T2.5 | Partition-map exhibits | M | **SHIPPED 2026-07-17** |
| T2.6 | Boot log reads like real bring-up | S | **SHIPPED 2026-07-17** |
| T2.7 | Motion discipline (shimmer one-shot; no hover replay — deliberate) | S | **SHIPPED 2026-07-17** |
| T2.8 | Nav polish | S | **SHIPPED 2026-07-17** |
| T2.9 | IC topmark (absorbed ticker + hero titleblock) | S | **SHIPPED 2026-07-17** |

## Tier 3 — stretch: interactive artifacts and platform craft

| # | Item | Effort | Status |
|---|---|---|---|
| T3.1 | PCB layer viewer from real KiCad gerbers (CSS-only checkbox toggles) | L | ready (uses public repo) |
| T3.2 | Oscilloscope hero scene (ticker strings as UART frames, phosphor persistence, measurement cursors; static SVG fallback) | L | ready |
| T3.3 | Print-as-datasheet upgrade (running header, square corners — builds on the fixed print base) | M | ready |
| T3.4 | CSS scroll-driven migration | M | **SHIPPED 2026-07-18** |
| T3.5 | Footer terminal + console signature | M | **SHIPPED 2026-07-18** |
| T3.6 | Hero power-on choreography (fill-both animations + boot-hold) | M | **SHIPPED 2026-07-18** |
| T3.7 | Experience timeline as logic-analyzer waveforms (active role "still high") | M | ready |
| T3.8 | Animated `<details>` disclosure | S | **SHIPPED 2026-07-18** |
| T3.9 | Mono type craft (tnum + outlined numerals + font-feature build guard; `zero` verified stripped from the mono subset — default zero already dotted) | S | **SHIPPED 2026-07-18** |
| T3.10 | Card edge highlight + film grain | S | **SHIPPED 2026-07-18** |

Judge-rejected ideas (do NOT resurrect without new reasoning — reasons in the
audit §10 and JSON): CAD-sheet grid frame, linear() spring easings, schematic
symbols as section markers, fabricated MODBUS register map, BootIntro
per-character typing/morph.

## Deferred hygiene & P3 tail (small, independent; grab-bag for spare cycles)

- Font-weight instancing to 400–700 (~30–40 % of the 111 KB font payload);
  metric-compatible fallback fonts (`size-adjust`) — needs measured values.
- `100svh` needs a `100vh` fallback line (hero collapses in very old browsers).
- `.pill { white-space: nowrap }` can overflow the hero spec card at 320 px in
  the not-available state; mobile nav dropdown lacks max-height for short
  landscape viewports.
- Decorative glyphs (▣ ▸ ▾ → ↗ ★ …) render from per-OS fallback fonts —
  replace with inline SVG or accept variance deliberately.
- `text-wrap: balance/pretty` on headings/copy; type/spacing/letter-spacing
  scale consolidation (folds naturally into T2.4).
- `content-visibility: auto` on below-fold sections; skills stagger `--i % 3`
  vs actual column count; button `:active` press timing; boot-skip and
  spec-row hover transitions; copy-button width shift on "copied ✓".
  (Done since: details-open snap → T3.8; tabular-figure consolidation → T3.9.)
- Favicon 16 px + Safari mask-icon; web app manifest; Person portrait (I6).
- LICENSE file (owner's legal choice); prettier + format script (dependency
  decision); tsconfig `strictest` (may surface new errors); SHA-pinned actions
  (dependabot now watches the tags).
- Email/phone published in plaintext + JSON-LD — accepted tradeoff (recruiters
  must reach him); revisit only if spam becomes a problem.

## Standing constraints (do not regress)

No-JS baseline (D-006), `prefers-reduced-motion`, strict CSP with hash-gated
inline scripts, atomic no-attribution commits (`CONTRIBUTING.md`), site never
outbids the résumé (D-016), owner approval before any `main` push.

Added 2026-09-07 and easy to regress: published copy — **including `docs/` and
`CHANGELOG.md`, since the repository is public** — names the work, not the
tooling behind it, and never records AI assistance (D-018); `metrics[]` carries
only what was measured, with evidence behind every row (D-019); FIG labels are
derived from array order and referenced by slug through `figOf()`, never
hand-authored (D-020); substantive content is adversarially audited before it
merges, findings whose refuters fail are retained rather than dropped, and a
partial audit is recorded as partial (D-021).

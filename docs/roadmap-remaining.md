# Remaining work from the 2026-07-16 audit

Canonical, maintained list of everything the audit surfaced that is **not yet
done**. Sources of truth behind it: `site-audit-2026-07-16.md` §10 (judge-ranked
roadmap with full implementation sketches), `audit-data-2026-07-16.json`
(machine-readable roadmap + all 45 raw design proposals), and the audit's §3 P3 /
§7 lists. Update the Status column as items land; delete rows only when shipped.

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
| I1 | Real flagship metrics: UWB ranging rate, zone-decision→relay-trip latency, node count, months in production at Tata Steel BlueScope; eOS image size, cold-boot time, A/B swap+verify time, recipe count; wake-word FAR/hr + FRR %, Whisper RTF on Pi 5, barge-in latency (ms) | T1.1, T1.6 |
| I2 | Availability logistics: available from, notice period, work mode, relocation | T1.4 |
| I3 | Official NPTEL certificate verification URLs (replace Google Drive links) | T1.5 |
| I4 | Employer permission for bench/deployment photos (Radiogeet, Elipse) | T2.2 |
| I5 | Go/no-go on publishing a wake-word repo + eOS architecture write-up | T2.1 |
| I6 | Portrait photo (for `Person.image`, possibly the site) | SEO polish |
| I7 | Next CV export: fix "IN4007"→"1N4007" typo; add PDF Title/Author metadata + tagging | resume artifact |

## Tier 1 — recruiter-critical content (highest screening impact)

| # | Item | Effort | Status |
|---|---|---|---|
| T1.1 | Measured outcomes as datasheet tables on every flagship (`metrics[]` per project) | M | blocked on I1 |
| T1.2 | Restructure for the 30-second screen | M | **done** (pending review) |
| T1.3 | Scope-honest verbs + D-016 rule | S | **done** (pending review) |
| T1.4 | Contact conversion: EMAIL ME + CV in sticky nav, prefilled mailto subject, logistics rows in contact | S | partial (needs I2) |
| T1.5 | Credibility sweep: hide ★ counts <10, rename "Object Detection over SPI"→IR presence detection, NPTEL verify links, retire score gauges | S | partial (needs I3) |
| T1.6 | Proof stats under hero (production system · months live · stack layers · 0 cloud deps) replacing volume counts | S | blocked on I1 |
| T1.7 | SERP trims (title 57, description 153) | S | **done** (pending review) |
| T1.8 | Regenerate og.png (template: scripts/og-card.html) | S | **done** (pending review) |

## Tier 2 — verifiable evidence and sharpened identity

| # | Item | Effort | Status |
|---|---|---|---|
| T2.1 | Public wake-word repo (train→ONNX→tract benchmark README) + eOS architecture write-up; link as flagship REFs | L | blocked on I5 |
| T2.2 | Visual evidence: bench photos, KiCad renders, voice-pipeline SVG block diagram with latency annotations | L | blocked on I4 |
| T2.3 | Protocol-decode trace dividers (correct UART/I²C/SPI frames computed at build time; replaces the stretching generic divider) | M | ready |
| T2.4 | Three-voice palette: copper (static PCB), cyan (live signal), phosphor (terminal) — token surgery restoring accent hierarchy | M | ready |
| T2.5 | Partition-map exhibits | M | **done** (pending review) |
| T2.6 | Boot log reads like real bring-up | S | **done** (pending review) |
| T2.7 | Motion discipline (shimmer one-shot; no hover replay — deliberate) | S | **done** (pending review) |
| T2.8 | Nav polish | S | **done** (pending review) |
| T2.9 | IC topmark (absorbed ticker + hero titleblock) | S | **done** (pending review) |

## Tier 3 — stretch: interactive artifacts and platform craft

| # | Item | Effort | Status |
|---|---|---|---|
| T3.1 | PCB layer viewer from real KiCad gerbers (CSS-only checkbox toggles) | L | ready (uses public repo) |
| T3.2 | Oscilloscope hero scene (ticker strings as UART frames, phosphor persistence, measurement cursors; static SVG fallback) | L | ready |
| T3.3 | Print-as-datasheet upgrade (running header, square corners — builds on the fixed print base) | M | ready |
| T3.4 | CSS scroll-driven migration (rail, reveals, counters on scroll()/view() timelines — motion works without JS) | M | ready |
| T3.5 | Footer terminal easter egg (help/whoami/ls projects/cat resume.txt/dmesg/reboot) + console signature | M | ready |
| T3.6 | Hero power-on choreography with @starting-style (board-bring-up order, zero JS) | M | ready |
| T3.7 | Experience timeline as logic-analyzer waveforms (active role "still high") | M | ready |
| T3.8 | Animated `<details>` disclosure (interpolate-size / ::details-content) | S | ready |
| T3.9 | Mono type craft: slashed zeros, global tabular figures, outlined section numerals | S | ready |
| T3.10 | Card edge highlight + film grain (kills gradient banding) | S | ready |

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
- Favicon 16 px + Safari mask-icon; web app manifest; Person portrait (I6).
- LICENSE file (owner's legal choice); prettier + format script (dependency
  decision); tsconfig `strictest` (may surface new errors); SHA-pinned actions
  (dependabot now watches the tags).
- Email/phone published in plaintext + JSON-LD — accepted tradeoff (recruiters
  must reach him); revisit only if spam becomes a problem.

## Standing constraints (do not regress)

No-JS baseline (D-006), `prefers-reduced-motion`, strict CSP with hash-gated
inline scripts, atomic no-attribution commits (`CLAUDE.md`), site never
outbids the résumé (T1.3, once codified), owner approval before any `main`
push.

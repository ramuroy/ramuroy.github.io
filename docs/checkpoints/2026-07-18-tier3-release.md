# Tier 3 release checkpoint — 2026-07-18

## Checkpoint purpose

Handoff record for the Tier 3 session ("the trio + terminal": T3.4, T3.6,
T3.8/9/10, T3.5). Captures the process, every decision with its rationale,
verification evidence, and where to continue. The canonical remaining-work
list stays `docs/roadmap-remaining.md`.

## Process used (and why it worked)

1. **Design workflow before code:** three competing terminal concepts
   (authentic-TTY, discoverability, engineer-showpiece) merged by a judge
   into one build spec; specialist specs for choreography, scroll-driven
   migration, and polish. All four specs were committed to
   `docs/design-specs/` *before* implementation (now decision D-017), so the
   design reasoning survives and deviations are auditable.
2. **Serial implementation, atomic commits:** one distinct change per commit
   (26 commits `b134edc..f91dcd6`), `npm run verify` green before each,
   browser-verified behavior before each commit.
3. **Adversarial review with a live browser:** four reviewer lenses
   (correctness, a11y, constraints/content-truth, motion) plus a skeptic
   verifier per finding, all with Playwright access to the running build —
   findings had to be *reproduced* to be confirmed. Result: 12 confirmed,
   0 refuted, all fixed. The browser suite grew 25 → 59 checks.

## What shipped (details in CHANGELOG "Tier 3")

Footer terminal · hero power-on choreography with boot-hold handoff ·
scroll-driven migration (entrances work with JS disabled) · animated
disclosure · tabular figures + outlined numerals + font-feature build guard ·
edge highlight + film grain.

## Decisions made this session (with why)

- **D-017 (new): feature work follows committed build specs.** The specs
  caught what ad-hoc implementation would have missed (see the font finding
  below) and made the review's "deviations are findings" rule enforceable.
- **Choreography uses animations, not @starting-style transitions:** the boot
  overlay dismisses at a variable time, and only animations can be parked
  (`animation-play-state: paused`) and resumed; hidden states live only in
  backwards fill so every no-animation context (RM, print, exotic UAs)
  renders the hero complete. `boot-hold` is added by the boot inline script
  *after* its early returns — returning/RM visitors are never held.
- **Scroll-driven entrances are scrubbed and reversible** (scrolling back
  replays them): accepted deliberately — position-deterministic instrument
  behavior; state is a pure function of scroll position, which also removes
  the whole late-load/replay-flash bug class.
- **The signal rail keeps moving under reduced motion** in both paths: it is
  a scroll-position indicator (feedback, like a scrollbar thumb), not
  decoration. The decorative circuit drift is RM-disabled.
- **Terminal is non-modal by design:** a serial session stays attached until
  detached; no focus trap, page scrolls behind, Tab walks out. Closed =
  `inert` + hidden + JS-only (absent without JS; static colophon renders).
- **Terminal content truth (D-016 applied):** every output derives from
  `site.ts`; `uname` describes the *website*, not eOS (a site claiming to be
  the product it describes would blur the claimed-vs-verifiable line);
  i2cdetect shows 0x38/0x48 explicitly labeled as FIG. 02 bench parts.
- **No `font-feature-settings: "zero"`, guarded forever:** fontkitten
  inspection proved the shipped JetBrains Mono latin subset strips the `zero`
  feature (the declaration would be a silent no-op) and its default zero is
  already dotted. `scripts/check-fonts.mjs` in the verify gate asserts this
  and the `tnum` features tabular-nums depends on.
- **Spec deviations (noted per the spec-deviation rule):** Ctrl+C guard
  extended with the input's own selection state (the spec's snippet was blind
  to Chromium text-control selections — the spec's *intent*, "copy is never
  hijacked", won over its code); i2c grid switched from aria-hidden+sr-text
  to `role="img"` (the grid is a Tab stop when it overflows); trace-divider
  circle/text cover ranges tightened to progress the footer divider can
  actually reach.

## Review findings fixed (all 12; reproduce-before-confirm)

Ctrl+C copy hijack (major) · boot wipe one-frame pop from bubbled
animationend (major) · footer divider labels resting at 0.86 opacity ·
i2c grid a11y pattern · Focus Not Obscured height reservation ·
--phosphor-mid AA contrast · MOTD announcement timing · body-as-opener focus
restore · Caps Lock shortcut matching · missing spec tests added (59 total) ·
package.json em-dash churn reverted.

## Verification evidence

- `npm run verify` (now: check + check:fonts + build + check:build) green on
  every commit.
- `scripts/browser-smoke.mjs`: **59/59** against the production build —
  covers boot/CSP, choreography hold/release, view()/scroll() ownership,
  disclosure glide, the full terminal flow (including injection safety,
  backtick guards, scrollback cap, non-modal scroll, RM, touch targets,
  print parity), plus all prior Phase 0/Tier 1/Tier 2 checks.
- Boot wipe measured live at ~346 ms post-fix (was ~16 ms).
- Review: 12 confirmed / 0 refuted, every finding browser-reproduced.

## Remaining work (see roadmap-remaining.md for the full table)

- **Owner inputs I1–I7** — unblock the flagship metrics tables + proof stats
  (T1.1/T1.6, highest-impact item on the board), contact logistics (T1.4),
  NPTEL verify links (T1.5), visual evidence (T2.2), public wake-word repo /
  eOS write-up (T2.1).
- **Tier 3 leftovers:** T3.1 PCB layer viewer, T3.2 oscilloscope hero,
  T3.3 print-as-datasheet, T3.7 logic-analyzer timeline.
- **Hygiene tail** unchanged except: details-snap and tnum items are done.

## Resume commands

```bash
git fetch origin && git switch codex/site-hardening-20260713 && git pull --ff-only
nvm use && npm ci && npm run verify
npm run preview   # then: SMOKE_BASE=http://localhost:4321 node scripts/browser-smoke.mjs (Playwright on demand)
```

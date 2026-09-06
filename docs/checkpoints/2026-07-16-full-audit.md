# Full-site audit checkpoint — 2026-07-16

## Checkpoint purpose

This file is the handoff for the audit-and-improvement engagement that started on
2026-07-16, so it can continue on any machine without depending on chat history.
It records what was done, where every finding lives, the decisions taken with the
user, and the exact next steps. **No site source was changed in this session** —
the engagement is deliberately two-phase: document first, implement only after the
user reviews and approves.

## Repository state

- Working branch: `codex/site-hardening-20260713` (unchanged source; audited at `9ecaab2`)
- Production branch: `main` — untouched; only pushes to `main` deploy (see D-001)
- New in this checkpoint: audit documents only (see "Artifacts produced")
- Build gate status at audit time: `npm run verify` passes under Node 22.12
  (the system Node 20 cannot build Astro 7 — use `nvm use` or any Node ≥ 22.12)

## What was done

A line-by-line audit of every source, config, CI, docs, and built-output file
(~2,300 source lines), run as two orchestrated passes:

1. Ten dimension auditors (code bugs, CSS quality, content consistency,
   accessibility, performance, SEO/meta, motion quality, responsive, design
   polish, build/tooling), each sweeping the whole tree through one lens.
2. **Adversarial verification of every single finding**, each one taken up
   again independently and argued against the actual code. 245 findings survived;
   exactly 1 was refuted. Verdicts: CONFIRMED (fact reproduced) vs PLAUSIBLE
   (premise verified; severity is a judgment call).
3. A 4-lens enhancement panel (motion director, brand designer, recruiter/hiring
   manager, technical showmanship) produced 45 proposals; a judge merged and
   ranked them into a 3-tier roadmap and recorded why weak ideas were rejected.
4. A completeness critic hunted for anything the ten dimensions missed and
   contributed 23 further verified findings — including two P1 bugs.
5. Independent direct checks: full build gate; WCAG contrast ratios computed for
   every token pair (all text passes AA); all 21 external URLs probed (all
   resolve); GitHub API confirms the "19 repos" stat; the résumé PDF cross-read
   against site content; `og.png` visually inspected; the CSP inline-script
   hashes recomputed by hand to confirm the boot-intro finding.

Operational note: the first orchestrated run was interrupted by an account
session limit mid-flight; it kept running detached and its data was recovered
from its on-disk journal, and the four auditor passes lost to the limit were
re-run in a second orchestration. Nothing was lost.

## Artifacts produced (committed with this checkpoint)

- **`docs/site-audit-2026-07-16.md` — the audit report.** Read this first.
  Curated defect list B1–B31 in priority bands (P1 user-visible bugs / P2
  correctness-a11y-CI / P3 polish) with evidence and a concrete fix each;
  category critiques (motion, design, content, performance, SEO, build); the
  judge-ranked improvement roadmap (Tiers 1–3 plus rejected ideas); suggested
  implementation phasing; and a full appendix of all findings with verdicts.
- **`docs/audit-data-2026-07-16.json` — the complete machine-readable record.**
  Every one of the 245 findings verbatim (file, line, severity, summary, full
  `detail` evidence — the "why" — plus `suggestion`, verifier verdict, and
  verifier note), the single refuted claim, the full roadmap, and all 45 raw
  panel proposals. Nothing in the engagement exists only in chat history or
  only on the original workstation.

## Headline findings (full list in the report)

1. **The emitted CSP blocks the boot-intro `is:inline` script in production**
   (hash not in the allowlist; verified by direct sha256 computation) — the
   first-visit boot sequence never runs in enforcing browsers on this branch,
   and the `js`-class head script survives only by parse-order luck (B14).
2. **The nav scroll-spy highlight has never rendered** — JS sets
   `aria-current="location"`, CSS matches `"true"` (B1).
3. **Card hover animations snap** — the `.fade` entrance rule overrides the
   cards' transition lists; regression traced to commit `a65464e` (B2).
4. **Print output is near-invisible** — print rules recolor `body` but not the
   dark-theme tokens components actually use (B3).
5. **The mobile nav is unusable without JavaScript** (B11) and the contact copy
   buttons are focusable dead controls without JS — gaps in the D-006 contract.
6. **Double-clicking a copy button wedges it on "copied ✓"** permanently (B13).
7. Content: the hero spec says "Tata Steel" where everything else (and the
   résumé) says "Tata Steel BlueScope"; the site says "Architected" where the
   résumé says "Contributing to" — the one place the site outbids the CV.

## Decisions made this session

- **Audit before implementation.** The user requires the full findings document
  to be reviewed before any fix or improvement is applied. Why: the site is
  their public professional face and deploys from `main`; they want oversight
  over every change. Consequence: this session changed no site source; the two
  factual errors the audit found *in documentation itself* were corrected as
  part of this documentation pass (see below).
- **Doc corrections applied now:** `docs/architecture.md` and the 2026-07-13
  checkpoint both described the derived statistic as "spoken-language count";
  the stat actually derived is the *programming*-language count. Corrected in
  both places. Why now: pure documentation fixes belong to this documentation
  pass and carry no site-behavior risk.
- **Hosted copy retracted.** An HTML copy of the audit was briefly published to
  a private URL; at the owner's request it was overwritten with a retraction
  stub so the audit exists only in this repository and on the original
  workstation. Why: the material should stay scoped to machines with repo
  access.
- **Git identity unchanged.** Commits continue as `Ramu Roy
  <royramu694429@gmail.com>` (global gitconfig).
- **Proposed phasing (pending user approval, not yet started):**
  Phase 0 = fix B1–B31 + hygiene + PR-validation CI (needs no user input);
  Phase 1 = roadmap Tier 1 recruiter content (needs the inputs below);
  Phase 2 = identity/motion upgrades; Phase 3 = a coherent subset of the
  larger signature artifacts. Rationale: highest-leverage smallest diffs first.

## Inputs only the user can provide (blocking Tier 1, not Phase 0)

1. Real project metrics: UWB ranging rate, zone-decision→relay-trip latency,
   node count, months in production at Tata Steel BlueScope; eOS image size,
   cold-boot time, A/B swap time, recipe count; wake-word FAR/hr and FRR %,
   Whisper real-time factor on Pi 5, barge-in latency.
2. Availability logistics: available from, notice period, work mode, relocation.
3. Official NPTEL certificate verification URLs (replacing Google Drive links).
4. Employer permission for bench/deployment photos (Radiogeet, Elipse).
5. Decision on publishing the wake-word repo + eOS architecture write-up
   (roadmap Tier 2.1).
6. A portrait photo for `Person.image` (currently the OG card).

## Remaining work for the next session

1. ~~User reads the audit and approves scope.~~ **Done — Phase 0 approved and
   COMPLETED on 2026-07-16** (see the Phase 0 section in `CHANGELOG.md`).
   All B1–B31 defects are fixed in individually verifiable atomic commits
   (one fix per commit, per the repo rule in `CONTRIBUTING.md`); `npm run verify`
   was green before every commit, and every fix was grep-verified in the
   built output. Deferred P3 items are listed in the changelog.
2. **Manual browser checks still worth a human eyeball** (headless capture
   was unavailable on the workstation; HTTP-level checks passed): boot intro
   appears once per session and skips correctly; scroll-spy highlight follows
   scrolling; mobile menu at ≤ 860 px; JS-disabled page shows the static nav
   row; print preview is legible with open disclosures; no sticky hover on a
   touch device.
3. Then Tier 1 content work once the user provides the inputs above.
4. ~~The 2026-07-13 checkpoint's release checklist still stands.~~
   **Release checklist COMPLETED 2026-07-17** at commit `f005851`:
   clean `npm ci` reproduces the lockfile with **0 vulnerabilities**;
   `npm ls` clean (hoisted optional wasm deps noted, harmless); full
   `npm run verify` green on the fresh install; **Lighthouse 100/100/100/100
   on both mobile and desktop presets, zero failing audits** (baseline
   accessibility 96 → 100 — both baseline findings resolved); the 25-check
   browser smoke suite passes; all 22 external links resolve; and
   `git diff --check main...HEAD` is clean across the 38-commit diff.
   `npm outdated`: astro 7.0.7→7.1.0 (minor) left for dependabot.
   **Merged to `main` and deployed 2026-07-17 with the owner's explicit
   approval — see `2026-07-17-phase0-release.md` for the release record.**

## Resume commands

```bash
git fetch origin
git switch codex/site-hardening-20260713
git pull --ff-only
nvm use          # Node >= 22.12 required; system Node 20 cannot build Astro 7
npm ci
npm run verify
```

Then open `docs/site-audit-2026-07-16.md` (report) and
`docs/audit-data-2026-07-16.json` (complete raw findings with rationale).

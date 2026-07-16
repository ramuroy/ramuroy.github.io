# Phase 0 release checkpoint — 2026-07-17

## Checkpoint purpose

Handoff record for the implementation-and-release session that followed the
2026-07-16 audit. It captures what shipped, every decision made with its
rationale, the verification evidence, and exactly where to continue. Read
`docs/roadmap-remaining.md` next — it is the canonical list of everything
still to do from the audit.

## What shipped (now live at https://ramuroy.github.io)

`main` fast-forwarded `88e9ca8 → 08a1637` on 2026-07-17 (owner-approved);
Pages deploy run 29531079537 succeeded. The release bundled:

1. **The 2026-07-13 hardening work** (Astro 7, CSP, self-hosted fonts,
   verify gate) — previously parked on the branch, never deployed.
2. **The full audit documentation** (report, unabridged findings, raw data).
3. **Phase 0: all 31 curated audit defects (B1–B31) fixed** in atomic
   commits, plus hygiene: CSP-blocked boot intro (B14), dead scroll-spy
   (B1), card-hover regression (B2), illegible print (B3), tablet nav
   overflow (B4), no-JS mobile nav (B11), sticky touch hover (B5),
   counter stranding (B7), canvas resize/refresh-rate bugs (B8), copy-button
   wedge (B13), forced-colors invisibility (B12/B16), SR text fixes
   (B10/B28/B30), SEO/meta gaps + branded 404, font preloading, CI verify
   workflow on PRs/branches, deploy-cancellation fix, engine-strict,
   dependabot. Full list: CHANGELOG "Phase 0 defect sweep".
4. **Project grid change (owner decision):** all 15 grid projects render,
   strength-ordered by array order; `featured` flag retired (D-010
   superseded).

## Release evidence (all recorded before merge)

- Fresh `npm ci`: lockfile reproduces, **0 vulnerabilities**.
- `npm run verify`: green on the fresh install.
- **Lighthouse 100/100/100/100 on both mobile and desktop presets, zero
  failing audits** — baseline accessibility 96 → 100.
- `scripts/browser-smoke.mjs`: **25/25 in a real Chromium** against the
  preview build AND re-run against live production after deploy.
- All 22 external links resolve; `git diff --check main...HEAD` clean.
- `npm outdated`: astro 7.0.7→7.1.0 left for dependabot (no dependency
  changes during a release check).

## Decisions made this session (with why)

- **Ship Phase 0 before Tier 1 content.** Small verified diffs, highest
  user-visible impact; content work is blocked on owner inputs anyway.
- **Two hard commit rules** (owner instruction, codified in `CLAUDE.md`):
  one atomic commit per distinct change (debuggability/revertability), and
  never any AI co-author/contribution attribution in commits.
- **Origin remote switched to SSH** (owner-approved): the stored HTTPS OAuth
  token lacks the `workflow` scope, so pushes touching
  `.github/workflows/` were rejected; the machine's SSH key (authenticating
  as `ramuroy`) has no scope limits.
- **Show all 15 projects, strength-ordered; D-010 superseded** (owner
  decision): full catalogue beats curation for this owner; ordering encodes
  value; star-sorting removed because a starred hobby board must not
  outrank stronger firmware work. Ranking = `gridProjects` array order —
  re-rank by moving lines.
- **Reveal entrances became animations, not transition overrides** (B2 fix
  strategy): overriding `transition` was the root cause of the hover
  regression; animations compose with component transitions instead of
  destroying them.
- **Inline scripts live in `src/data/inline-scripts.ts`** and are
  hash-registered in `Layout.astro` only — component-level
  `insertScriptHash` calls proved to be silent no-ops; `check-build.mjs`
  re-hashes every inline script so this whole bug class now fails the
  build.
- **Boot overlay made an honest modal via `inert`** rather than downgrading
  its semantics; a browser-test iteration revealed the inline script runs
  before `nav/main/footer` are parsed, so inert targets are queried at call
  time and applied on `DOMContentLoaded`.
- **A browser-level smoke suite is kept in-repo** (D-015 in
  `docs/decisions.md`): the CSP/inert/scroll-spy class of defects is
  invisible to build-time validation; Playwright stays an on-demand
  install, not a dependency.
- **Deliberate deferrals** (recorded in the roadmap doc, not forgotten):
  font instancing, metric-compatible fallbacks, og.png regeneration,
  favicon-16/mask-icon, LICENSE (owner's legal choice), prettier config,
  tsconfig `strictest`, SHA-pinned actions (dependabot now watches
  actions), plus the P3 polish tail — see `docs/roadmap-remaining.md`.

## Where every piece of audit data lives (nothing is machine-local anymore)

| Artifact | Location (on `main`) |
| --- | --- |
| Curated audit report + roadmap | `docs/site-audit-2026-07-16.md` |
| All 245 findings, unabridged, with evidence + verdicts | `docs/audit-findings-full-2026-07-16.md` |
| Machine-readable findings + roadmap + all 45 raw proposals | `docs/audit-data-2026-07-16.json` |
| Remaining work, itemized with status | `docs/roadmap-remaining.md` |
| Browser test suite | `scripts/browser-smoke.mjs` |
| Session records | `docs/checkpoints/2026-07-16-full-audit.md`, this file |

The only machine-local remains are the raw multi-agent transcripts and
Lighthouse JSON on the original workstation — their conclusions are fully
captured in the files above.

## Toolchain notes for the next session

- Node ≥ 22.12 required (`.nvmrc`); `engine-strict` makes wrong Node fail
  fast at `npm ci`.
- Browser tests: `npx -y playwright install chromium`, then
  `SMOKE_BASE=<url> node scripts/browser-smoke.mjs` (header has details).
- Origin is SSH; pushing workflow changes works. Deploys run only from
  `main`; `verify.yml` gates every PR/branch push. Dependabot opens weekly
  update PRs — merge only with a green verify run.

## Resume commands

```bash
git fetch origin && git switch codex/site-hardening-20260713 && git pull --ff-only
nvm use && npm ci && npm run verify
```

Then open `docs/roadmap-remaining.md` and continue from the top of Tier 1.

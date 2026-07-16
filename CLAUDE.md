# Repository rules for AI-assisted work

## Commits

- **Make small, atomic commits — one commit per distinct change.** Never bundle
  unrelated fixes into one commit; debugging and review depend on each commit
  being individually understandable and revertable. A commit should answer one
  question: "what single thing changed and why?"
- Reference audit finding IDs (e.g. `B14`) from `docs/site-audit-2026-07-16.md`
  in commit messages when a commit implements one, so the audit doubles as a
  work log.
- Run `npm run verify` before every commit that touches `src/`, `public/`, or
  `scripts/` (Node >= 22.12 required; see `.nvmrc`).
- No AI/co-author attribution in commit messages (a global commit hook rejects
  it).

## Branch safety

- Work happens on the hardening branch; **never push or merge `main` without
  the owner's explicit instruction** — pushes to `main` deploy the live site
  (see `docs/decisions.md` D-001).

## Process

- Findings and improvements are documented before they are implemented
  (`docs/decisions.md` D-014); implementation follows the owner's approval.
- Preserve the progressive-enhancement contract (D-006): content must be
  visible and navigation usable without JavaScript; every animation respects
  `prefers-reduced-motion`.
- Inline `<script>`s must be authored in `src/data/inline-scripts.ts` and
  hash-registered in `Layout.astro` — the build fails otherwise (see
  `scripts/check-build.mjs`).

# Repository rules for AI-assisted work

## Commits — HARD RULES

1. **Small, atomic commits — one commit per distinct change. Always.** Never
   bundle unrelated fixes into one commit; debugging and review depend on each
   commit being individually understandable and revertable. A commit should
   answer one question: "what single thing changed and why?"
2. **Never add AI co-author or contribution attribution to commits.** No
   `Co-Authored-By: Claude`, no "Generated with", no AI credit of any kind, in
   any part of the commit message or metadata. (A global commit hook also
   rejects these — but the rule stands regardless of the hook.)

## Commits — conventions

- Reference audit finding IDs (e.g. `B14`) from `docs/site-audit-2026-07-16.md`
  in commit messages when a commit implements one, so the audit doubles as a
  work log.
- Run `npm run verify` before every commit that touches `src/`, `public/`, or
  `scripts/` (Node >= 22.12 required; see `.nvmrc`).

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
- Substantive feature work starts from a build spec committed under
  `docs/design-specs/`; implementation deviations are declared in commit
  messages (D-017).

# Contributing

Working rules for this repository. They exist because this site deploys to a
live domain from `main`, and because the audit trail in `docs/` is only useful
if commits stay legible.

## Commits — hard rules

1. **Small, atomic commits — one commit per distinct change. Always.** Never
   bundle unrelated fixes into one commit; debugging and review depend on each
   commit being individually understandable and revertable. A commit should
   answer one question: "what single thing changed and why?"
2. **No contribution or co-author attribution of any kind** in a commit message
   or its metadata — no trailers, no "generated with" lines, no credit blocks.
   Authorship is the commit author field and nothing else. A global commit hook
   also rejects these, but the rule stands regardless of the hook.

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
- Two gates currently hold this branch out of `main`, both open: **D-016** (the
  résumé describes none of the hardware work, so the site would outbid it) and
  **D-021** (the second audit's findings are not yet adjudicated). Pushing the
  *branch* is safe and deploys nothing.

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

## Content

- Every claim on the site must be at or below the résumé's scope (D-016), and
  every number must be traceable to a recorded source.
- Copy names the work, not the tooling behind it, and never records AI assistance
  (D-018). This is **not limited to project copy**: the repository is public, so it
  binds `docs/`, `CHANGELOG.md` and commit messages exactly as it binds the site.
- `params` say what a thing *is*; `metrics` say what was *measured* (D-019).
  A card with no defensible numbers gets no metrics table rather than a padded one.
- Positional labels — FIG numbers — are derived, never authored. Refer to a card
  by slug through `figOf()`, which fails the build if the slug stops matching (D-020).
- Anything may be left out; nothing untrue may be asserted (D-022). Status detail
  — ordered, fabricated, qualified — is internal project management and may be
  omitted freely. A figure that depends on an unresolved question is removed, not
  stated flat.
- The GitHub profile and LinkedIn copy derive from the site and the résumé, never
  authored fresh, and a claim changes at the source first (D-023).
- Content making factual claims about real work is adversarially audited against
  its sources before it merges (D-021): independent auditors per subject, findings
  adjudicated by refuters, and a pass that recomputes every derived number. A
  finding whose refuters fail is retained and marked, never dropped, and a partial
  audit is recorded as partial.

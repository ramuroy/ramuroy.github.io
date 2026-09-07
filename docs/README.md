# Documentation index

**Executing the CV refresh?** The brief is
[`cv-refresh-brief-2026-09-08.md`](cv-refresh-brief-2026-09-08.md) — exact text
to add and cut, with the page arithmetic. It is the last merge gate (D-016).

**Resuming work?** Start with the
[2026-09-07 hardware pass checkpoint](checkpoints/2026-09-07-hardware-pass.md) —
it carries the current state, the open findings and the resume steps. The list
below is the reading order for everything else.

1. [Remaining work from the audit](roadmap-remaining.md) — the canonical,
   statused list of everything still to do, with blocking owner inputs.
2. [Architecture and maintenance guide](architecture.md) — how the site is organized,
   its invariants, and how to change it safely.
3. [Engineering decisions and rationale](decisions.md) — why the current toolchain,
   security, content, accessibility, and deployment choices were made.
4. [2026-07-16 full-site audit report](site-audit-2026-07-16.md) — 31 curated
   defects with fixes, category critiques, and the ranked improvement roadmap.
   Companions: [unabridged findings](audit-findings-full-2026-07-16.md) (all 245
   with complete evidence) and [machine-readable data](audit-data-2026-07-16.json)
   (findings + roadmap + raw design proposals).
5. [2026-09-07 hardware & PCB pass checkpoint](checkpoints/2026-09-07-hardware-pass.md) —
   five new cards, the metrics and image fields, two audits, and the 48 candidate
   findings still awaiting adjudication. Its build spec is
   [`design-specs/h1-hardware-and-pcb.md`](design-specs/h1-hardware-and-pcb.md).
6. [2026-07-18 Tier 3 release checkpoint](checkpoints/2026-07-18-tier3-release.md) —
   the trio + terminal: process, decisions, review evidence, resume steps.
   All build specs live in [design-specs/](design-specs/) (D-017).
7. [2026-07-17 Phase 0 release checkpoint](checkpoints/2026-07-17-phase0-release.md) —
   what shipped, every decision with rationale, release evidence, resume steps.
8. [2026-07-16 audit checkpoint](checkpoints/2026-07-16-full-audit.md) — what the
   audit session did and decided.
9. [2026-07-13 site-hardening checkpoint](checkpoints/2026-07-13-site-hardening.md) —
   the hardening work log and evidence boundary.
10. [Project changelog](../CHANGELOG.md) — user- and developer-visible changes by
   release/checkpoint.

The root [README](../README.md) remains the quick-start and content-editing guide,
and [CONTRIBUTING](../CONTRIBUTING.md) carries the working rules — commit
discipline, branch safety, the documentation-first process, and the content rules
governing what may be written (résumé scope, tooling omission, metrics evidence,
derived labels, and the pre-merge audit).

## Documentation maintenance rules

- Update `README.md` when setup, content editing, commands, or deployment behaviour
  changes.
- Update `architecture.md` when responsibilities, data flow, security boundaries, or
  release invariants change.
- Add or supersede a decision in `decisions.md` when a material trade-off changes.
- Add a dated checkpoint before pausing broad work or handing it to another session.
- Update `CHANGELOG.md` for every branch intended to become a release.
- Update `roadmap-remaining.md` as items land — change the Status column, annotate
  owner inputs as they are partly answered, and delete a row only when shipped.
- Add a build spec under `design-specs/` before substantive feature work (D-017).
  A shipped spec is a historical document: corrections land in the code and the
  commit's deviation note, or in a dated addendum, never by rewriting it.
- Keep completed and pending verification clearly separated; never convert an
  intended check into a claimed result.
- **These documents are public.** D-018 governs `docs/` and `CHANGELOG.md` exactly
  as it governs the rendered page: describe the work, not the tooling behind it,
  and never record AI assistance.

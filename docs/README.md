# Documentation index

Use these documents in this order:

1. [Architecture and maintenance guide](architecture.md) — how the site is organized,
   its invariants, and how to change it safely.
2. [Engineering decisions and rationale](decisions.md) — why the current toolchain,
   security, content, accessibility, and deployment choices were made.
3. [2026-07-13 site-hardening checkpoint](checkpoints/2026-07-13-site-hardening.md) —
   the complete work log, evidence boundary, and exact next-session checklist.
4. [Project changelog](../CHANGELOG.md) — user- and developer-visible changes by
   release/checkpoint.

The root [README](../README.md) remains the quick-start and content-editing guide.

## Documentation maintenance rules

- Update `README.md` when setup, content editing, commands, or deployment behaviour
  changes.
- Update `architecture.md` when responsibilities, data flow, security boundaries, or
  release invariants change.
- Add or supersede a decision in `decisions.md` when a material trade-off changes.
- Add a dated checkpoint before pausing broad work or handing it to another session.
- Update `CHANGELOG.md` for every branch intended to become a release.
- Keep completed and pending verification clearly separated; never convert an
  intended check into a claimed result.

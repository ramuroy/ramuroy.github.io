# Documentation index

Use these documents in this order:

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
5. [2026-07-18 Tier 3 release checkpoint](checkpoints/2026-07-18-tier3-release.md) —
   the trio + terminal: process, decisions, review evidence, resume steps.
   Build specs live in [design-specs/](design-specs/) (D-017).
6. [2026-07-17 Phase 0 release checkpoint](checkpoints/2026-07-17-phase0-release.md) —
   what shipped, every decision with rationale, release evidence, resume steps.
7. [2026-07-16 audit checkpoint](checkpoints/2026-07-16-full-audit.md) — what the
   audit session did and decided.
8. [2026-07-13 site-hardening checkpoint](checkpoints/2026-07-13-site-hardening.md) —
   the hardening work log and evidence boundary.
9. [Project changelog](../CHANGELOG.md) — user- and developer-visible changes by
   release/checkpoint.
10. [CadSoft MCP guide](cadsoft-mcp-guide.md) — read-only DWG/DXF inspection,
    exact tool schemas, layer and placed-entity interpretation, pagination,
    accuracy rules, troubleshooting, and a paste-ready terminal handoff.
11. [Amara Block-C Basement-1 handoff](projects/amara-block-c-b1/) —
    the current project objective, accepted decisions, source and coordinate
    evidence, revision authority, CadSoft state, exact next step and complete
    P04–P07 audit chain.

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

# Checkpoint — 2026-09-07, the hardware & PCB pass

> **Superseded by the [2026-09-08 checkpoint](2026-09-08-release-and-profiles.md).**
> This record describes the state while the work was still on a branch with both
> merge gates open. It has since been adjudicated, corrected, merged and deployed.
> Kept for the audit numbers and the reasoning; read the newer one for state.

Written at a deliberate pause, then completed with a full documentation pass.
Branch `codex/site-hardening-20260713`, working tree clean, `npm run verify` green.

## 1. What shipped this session

- **Five new flagship cards** — eOS Room Controller, eOS Zone Controller, eOS
  Switchboard, pcbrouter, Ember. Eight cards total.
- **Two new `Flagship` fields**: `metrics[]` (T1.1, the audit's top gap — a
  datasheet table of measured outcomes) and `image` (T2.2, board renders with
  required intrinsic dimensions). First asset: the Room Controller v2 render.
- **FIG numbers derived from array order** instead of authored, with `figOf(slug)`
  resolving cross-references and throwing at build time on a bad slug.
- **Tooling names removed from all published copy** (owner instruction) — site,
  tracked docs and commit messages. Rules moved to `CONTRIBUTING.md`.
- **`main` cleaned and deployed** (`2a403d8`): the assisted-session rules file
  left the repository, the July audit docs no longer name their method's author.
  Docs-only, no `src/` change, Pages green in 44 s.
- **18 factual errors found and fixed** by a first adversarial audit (354 claims
  checked, 41 suspected, 18 surviving refutation).

## 2. Where it stands

| | |
|---|---|
| Branch | `codex/site-hardening-20260713`, pushed to `origin`; pushing a branch deploys nothing |
| `origin/main` | `2a403d8` — scrubbed and deployed; carries none of the hardware work |
| Merge gates | **D-016** (the June 2026 CV describes none of these five projects) and **D-021** (the second audit is unadjudicated) — both open |
| Backup ref | `backup/pre-msg-rewrite-2026-09-07` (pre commit-message rewrite) |

## 3. Open — a second audit found 48 more candidate findings

A second, independent double-audit (two auditors per card, one on source
fidelity, one on the sceptical-reader lens) plus an arithmetic pass ran on the
**corrected** cards. It was stopped at 85/102 agents: **all 10 audits, the
arithmetic pass and all 5 assessments completed; the adversarial adjudication
did not.**

**These 48 are candidates, not confirmed.** In the first round 41 suspected
became 18 confirmed, so expect roughly half to survive. Do not act on any of
them without running the refutation stage first.

### Criticals, both introduced by the previous round's own corrections

- **Zone Controller — "removed the oscillator and four support parts" is wrong.**
  CR 12.81 deleted a clock **buffer** (`U14 SN74LVC1G125DBVR`) plus R57, R6, R42,
  C58. The oscillators X1/X2 are untouched, and no oscillator was ever the
  alternative. Flagged independently by both auditors.
- **Zone Controller — the status is stale.** The card says fabrication is held
  pending routing, DRC and the fabrication package. The evening records of
  2026-09-06 supersede the morning checkpoint the card was written from: the
  four-layer board was fully routed at 0 unconnected and the DRC was run.

### Majors, by card

**Zone Controller** — 46.544 mV is the Stage-9 screen on the **two-layer** board
and is doubly superseded · "four fully loaded channels come to exactly the group
fuse rating" conflates the 6 A group *rating* with 8 A group *fuses* · the
1,606 segments / 433 vias figures are the **pre-routing** CR 12.82 snapshot,
which still had 172 missing connections.

**Switchboard** — "3 — all solder joints" overstates: only two faults were
confirmed and fixed, the third is recorded as suspected and untested · "no
component or design fault found" is contradicted by the same document's section
headed *Design defects found (fix next spin)* · "board #1 brought up" overstates
a board with 4 of 8 key inputs still dead · "12 under 6 keys" is a v0.4 figure;
the released board carries 14 switches across 8 keys.

**Room Controller** — ₹1,260/board is conditional, not settled: LionCircuits
delivered 6 of 10 bare PCBs, 4 having failed electrical test · the "81 → ~34"
juxtaposition implies a 58 % part-count fall while the unit silently changes
(populated count rose to 119) · "40 of 40 decisions closed" is the 2026-07-09
snapshot; the log continued past D40 · "v1 retired" — one v1 controller is
still alive.

**pcbrouter** — 71 s and 58 MB are Phase 3 greedy-core figures presented as
headline costs beside Phase 4e quality figures · only the two Olimex boards were
re-measured against the corrected model; HackRF One and Bus Pirate 5 were not,
and the source says so twice in the imperative · "96" is quoted at the flattering
edge of a 96–97 range, in the very bullet claiming flattering numbers were not
kept · determinism may have been broken in a later session.

**Ember** — "Targets: x86-64 and aarch64" sits in a params block describing the
OS and reads as OS support; only the Rust workspace cross-builds for aarch64.

### Arithmetic pass — 48 numbers recomputed, 2 errors

1. `githubRepoCount` was 19 against a live 20. **Fixed** (`27e2ab3`).
2. The Switchboard LED margin wording — "~8% under the ~1.2 A ceiling" is sound
   if 1.098 A is taken as given, but the repo's own evidence table records
   1.02 A for the same 30-pixel chain. The two audits disagree on which current
   figure is correct; unresolved.

### A tension worth deciding, not just fixing

Two auditors flagged that the schematics were **not drawn in KiCad** — they are
generated from code, with KiCad used for layout, DRC and gerbers. The cards now
say "drew the schematic ... in KiCad 9" because the owner instructed that no
tooling be named. Accuracy and that instruction pull in opposite directions
here. The honest resolution is wording that names neither tool and claims
neither method — e.g. "captured the schematic and laid the board out", with
KiCad kept only where it is genuinely the tool used.

## 4. The five assessments (complete, drafts in hand)

- **CV** — the blocker is narrower than it looks. D-016 needs only that no site
  claim exceed the résumé. Two actions lift it: a hardware/PCB block in the
  Elipse role covering the three boards, and replacing the nine hobby Projects
  entries with pcbrouter and Ember. Both drafted, with a cut manifest that keeps
  the CV at two pages, plus the I7 hygiene (the `IN4007` typo, PDF metadata).
- **Roadmap** — highest-value next change is the CV brief, because it converts
  work already done rather than adding more. Then T1.4/T1.5/T1.6's input-free
  halves, all small. A V1 evidence pass on the three legacy cards is the
  medium-term item.
- **LinkedIn** — Skills and the Elipse entry first (recruiter search matches
  those, not About prose), then the headline. Full drafts exist: a 195-character
  headline against the 220 cap, a 1,776-character About, experience bullets,
  five Projects entries, and a rebuilt Skills list.
- **GitHub** — the material is not missing, it is curated backwards. Four
  pure-editing actions under two hours: rewrite the profile README, re-pin,
  archive the ten weakest 2025 repos, rewrite descriptions and topics. Making
  `pcbrouter` public is the one high-cost item and needs IP clearance first.
- **Consistency** — five cheap string edits fix hard contradictions between the
  cards, Experience and the terminal. The larger item: the `metrics[]` table
  mixes measured and modelled rows without saying which is which, and that
  distinction is the table's whole value.

## 4a. Documentation brought current, 2026-09-07

Every tracked document was audited against the code by an independent reader
(38 stale statements, 36 gaps). What that produced:

- **Four decision records, D-018 to D-021** — copy names the work not the tooling;
  metrics are separate from params; positional labels are derived; substantive
  content is adversarially audited before merge. Each with its context, reasoning
  and consequences, and D-018 carries its unresolved tension openly.
- **Three older decisions corrected.** D-001 said `main` was untouched while `main`
  had moved; D-003 described a three-step release gate that has been four steps
  since the font check landed; D-016 read as a caution when it is a live blocker.
- **`architecture.md`** — had been stale since July, still documenting a `featured`
  filter removed when D-010 was superseded. Now covers the new fields, derived FIG
  labels, the container query and why it is not a media query, the two JSON-LD
  blocks (it claimed one), the grid's real ordering invariant, and the font gate.
- **`README.md`** — how to add a card without writing a `fig`, what evidence a
  metrics row needs, why an image caption must say what the image is.
- **`docs/README.md`** — the index gave two contradictory reading orders, filed the
  newest spec under the wrong entry, and had no maintenance rule for the two
  documents most likely to go stale. Fixed, plus the rule that D-018 governs
  `docs/` because the repository is public.
- **`roadmap-remaining.md`** — said "Verified" while two criticals were live. Now
  records both merge blockers, tracks H-v1 to H-v6, and adds owner input I8.
- **`CHANGELOG.md`** — its card descriptions still carried the pre-audit errors.
  Rewritten, plus a Released entry for the one change that reached `main`.
- **`CONTRIBUTING.md`** — the tooling rule was scoped to "project copy", the exact
  under-reading that would let it be regressed in docs and commit messages.

## 5. Resume here

1. Re-run adjudication over the 48 candidates before changing anything —
   `Workflow({scriptPath: …/portfolio-reverify-v2-wf_e18fface-d00.js, resumeFromRunId: 'wf_e18fface-d00'})`
   replays the completed audits from cache and runs only the refuters.
2. Fix what survives, one commit per card as before.
3. Settle the schematic-wording tension with the owner (§3).
4. Then the CV — it is the merge gate and every other surface should derive from it.
   Drafted shape is in the roadmap as H-v5; it also closes input I7.

The five gap assessments (CV, GitHub, LinkedIn, roadmap, consistency) completed
with drafted text in hand — CV bullets with a cut manifest holding two pages, a
LinkedIn headline counted against the 220-character cap, an About draft, GitHub
profile README content. Those drafts live in the session transcript, not the
repository; §4 records their conclusions so the work can be re-derived if the
drafts are gone.

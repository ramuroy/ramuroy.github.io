# H1 — Hardware & PCB work enters the site

**Status:** approved by the owner 2026-09-07. Implements roadmap **T1.1** (measured
outcomes as datasheet tables) and **T2.2** (visual evidence), and closes owner
inputs **I1** (real metrics) and **I4** (imagery permission) for the hardware
subset. Written before implementation per **D-017**.

## 1. Why

The site claims a stack that starts at `hardware` and its lead sentence is
"hardware → firmware → custom Linux → on-device ML". Until now the hardware half
of that claim rested on four hobby PCBs in the grid (buck converter, AC-DC,
regulator, servo tester) and one line in a skills group. Meanwhile the owner has,
at Elipse, designed five production boards and written a PCB autorouter — none of
it published anywhere.

The audit's top recruiter-critical finding (T1.1) was that no flagship carries a
measured number. The hardware work is the first body of work where the numbers
exist, are recorded, and come from invoices and instruments rather than estimates.

## 2. Owner decisions taken 2026-09-07

| # | Question | Decision |
|---|---|---|
| H-a | Attribution on the switchboard and zone controller, where a colleague appears in git and in the fab handoff | **The owner designed all boards end to end.** Ownership verbs are approved for every board. |
| H-b | `pcbrouter` and `ember` are private repos (GitHub 404) | **Publish the cards now with a no-repo note**, exactly as the eOS card already does. No card waits on a repo being opened. |
| H-c | KiCad renders carry the Elipse logo on the silkscreen | **Approved for use** on the site as-is. |

## 3. Scope

### 3.1 Data model — two new optional `Flagship` fields

```ts
/** Measured outcomes (T1.1). Rendered as a bordered datasheet table.
    Every row must be a number the owner can produce evidence for. */
metrics?: { k: string; v: string; note?: string }[];

/** Board render / photograph (T2.2). */
image?: { src: string; alt: string; caption: string };
```

Both optional; every existing card renders unchanged when absent.

### 3.2 Three new flagship cards

Final order — deployed proof stays high for the 30-second screen, the hardware
cluster follows, and the two in-progress cards sit last:

| FIG | Card | Status |
|---|---|---|
| 01 | eOS | existing |
| 02 | Industrial Anti-Collision System | existing |
| 03 | **eOS Room Controller** | new |
| 04 | **eOS Zone Controller** | new |
| 05 | **pcbrouter** | new |
| 06 | On-Device Voice Subsystem | existing (renumbered from 03) |

### 3.3 Supporting content

- Skills: a **PCB & Hardware** group rewritten around real practice (KiCad 9,
  schematic capture, ERC/DRC, impedance stackups, eFuse protection chains, gerber/CAM
  release, bring-up and rework).
- Experience: one Elipse bullet for the board work.
- SEO keywords and description gain the hardware terms.
- Stats: `Projects` count follows the data automatically (D-009).

## 4. Evidence rules for this content

Every number below appears on the site only in the form recorded in the source
documents, and each is traceable:

| Claim | Source |
|---|---|
| Room controller v1 fabbed, PCB1–PCB3 in the field | `hardware/eos-room-controller/README.md` |
| −57 % board area; 4 modules → 1; 0 → 5 protection layers; 8 → 16 PWM channels | `V1-VS-V2-COMPARISON.md` §1 |
| ₹2,120 → ₹1,260 per bare board | ibid., marked **REAL** (invoices, ex-GST) |
| 40 decisions D1–D40, zero open verdicts | `V2-DESIGN-SPEC.md` §16 |
| Zone controller: 48 V, 16 ch, 24 A, 4-layer, 100 Ω differential, 180 nets / 912 nodes, ERC zero waivers | `V2-DESIGN-BASELINE-AND-HANDOFF.md` CR 12.81/12.82 |
| Zone controller v1 closed at 0 unconnected / 0 shorts, 2026-08-12 | `CLOSEOUT-STATE.md` FINAL |
| pcbrouter parity: identical loader dump, 3.1 µm pad agreement, 71 s vs 14 m 15 s, 58 MB vs 605 MB | `BENCHMARK.md` Phase 3 |
| pcbrouter Phase 4: 96–97 unconnected at 0.25 mm, byte-identical reruns | `BENCHMARK.md` Phase 4 |

**D-016 still binds.** The résumé's current export (June 2026) describes none of
this work. The site must not ship ahead of it, so this content lands on the
hardening branch and **the CV refresh is a merge blocker for `main`** — recorded
here so the constraint is not lost between sessions.

## 5. Explicitly out of scope

- The `ember` personal OS (`spark` init, `hearth` shell). Different story, its own pass.
- The switchboard and cover-node boards — real work, but the three cards above
  already carry the hardware argument; adding two more dilutes the section.
- Bench photographs of assembled boards; only CAD renders are approved here.
- Any claim of thermal, current-rating or Ethernet compliance qualification for
  the zone controller — the source explicitly records these as **not yet
  hardware-qualified**, and the card says so.

---

## 6. Addendum H1a — scope extended by the owner, 2026-09-07

§5 above put the switchboard and the `ember` personal OS out of scope, on the
reasoning that three cards already carried the hardware argument. **The owner
overruled that the same day:** "Add about Ember and Switchboard also. Even if
not in front, somewhere." The original §5 is left as written — D-017 keeps
specs as historical documents — and this addendum records what changed.

**Added:** *eOS Switchboard* and *Ember*. Eight flagship cards now, in the
order eOS · Room Controller · Anti-Collision · Zone Controller · Switchboard ·
pcbrouter · Ember · Voice — which also pairs evenly in the two-column grid:
two full-width cards followed by three rows of two. FIG labels are derived
from that order and deliberately not quoted in prose, because inserting the
switchboard mid-pass already shifted pcbrouter and Ember by one.

**Attribution, re-checked for the switchboard.** Its own prose — `README.md`,
the fabrication handoff, `THEORY-OF-OPERATION.md` and a review — names a
colleague as "PCB designer" / "board author". The design sources say
otherwise: the schematic source is 27 commits, all the owner's,
and the released `switchboardwithoutslider.kicad_pcb` is 24, also all his; the
colleague's commits in that folder are bring-up notes, purchasing quantities
and Arduino bench firmware, and touch no design file. Decision H-a therefore
holds for this board on the evidence, not only on the owner's word.

**One nuance recorded for honesty:** on the *zone controller*, the v1
`.kicad_pcb` / `.kicad_sch` are the colleague's (32 and 11 commits). The v2
board the zone-controller card actually describes is not — its schematics are 36 commits
by the owner and its board file 8, with none by the colleague — and the card's
single v1 claim is the routing closeout, which is the owner's work in a folder
where he leads 113 commits to 53.

**Tooling names are omitted from published copy** (owner instruction,
2026-09-07): the site and these documents do not name the schematic-capture
tool used for the boards, nor the router pcbrouter is benchmarked against. No
claim depends on either name — the boards were laid out in KiCad and the cards
say so, and the benchmark is described by its method and its corpus. A later
session must not reintroduce them as "missing detail".

**Cover node** stays out of scope; it has a design spec and research note but
no fabricated board or measured outcome to carry a card.

**Evidence sources for the added cards**

| Claim | Source |
|---|---|
| Switchboard: 1.4 %/mm over 69 mm, 24 indicators, v0.2's 26 mm at 3.8 %/mm | `eos-switchboard` schematic source header, LOCKED SPEC |
| S3 touch peripheral disqualified on Espressif's conducted-susceptibility statement | ibid. |
| 14 segments at 0.19 mm error vs 24 at 1.62 mm; three-point centroid | ibid. |
| Two Alps SKQG per key at ±9 mm, 160 gf each | ibid. |
| Snap ratio uncomputable; 85.7 % withdrawn as another switch's figure | ibid. |
| 30 × WS2812B at 1.02 A against a ~1.2 A ceiling | ibid. |
| ₹1,901 for 5 bare boards, Lion Circuits, placed 2026-08-01 | `SESSION-2026-08-01-fab-order-and-verification.md` |
| Board #1's three faults were all solder joints | `BRINGUP-2026-08-21-board1-defect2-resolved.md` (branch `switchboard/board1-bringup`) |
| Ember: 341 workspace tests, 5 unsafe blocks, 8.32 s to login shell, 59-check smoke, 1,065 KB spark, 147.0 MiB bundle | `ember/docs/benchmarks.md` |
| spark's design — one epoll loop, SystemOps seam, panic-hook behaviour, SIGCHLD drain | `ember/README.md`, ADR-0002 / ADR-0004 |

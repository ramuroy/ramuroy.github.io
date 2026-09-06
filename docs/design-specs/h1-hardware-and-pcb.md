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

- Skills: a **PCB & Hardware** group rewritten around real practice (atopile,
  KiCad 9, ERC/DRC, impedance stackups, eFuse protection chains, gerber/CAM
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

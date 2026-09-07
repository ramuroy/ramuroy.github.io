# CV refresh brief — 2026-09-08 (roadmap H-v5)

The last merge gate. **D-016** requires that no site claim exceed the résumé;
the June 2026 export describes none of the five projects the site now carries,
so this branch cannot reach `main` until the CV covers them.

**The source is not in this repository or on this machine.** The PDF reports
`Creator: LaTeX with hyperref`, `Producer: pdfTeX-1.40.25`, created
2026-06-14 — almost certainly Overleaf. `pdflatex` and `lualatex` *are*
installed locally, so once the `.tex` is available the edits below can be
applied and recompiled here. Until then this brief is the deliverable: exact
text to add, exact text to cut, and the arithmetic behind the page budget.

## 0. What the current export actually is

4 pages, A4. No `Title` or `Author` metadata, untagged — both are roadmap
item **I7**. Structure: Header · Summary · Education (2) · Work Experience
(Elipse, Radiogeet, Ampnics) · Projects (9) · Skills (11 groups) ·
Certifications & Languages.

**I7's `IN4007` typo** sits in the Transformerless Power Supply project entry,
which **A2 deletes** — so the cut resolves the typo. The PDF metadata and
tagging still need doing at export time.

## A1 — Add a Hardware / PCB block to the Elipse role *(the merge blocker)*

The Elipse role currently has three sub-blocks: eOS, ESP32 Firmware, Build
System & Tooling. **Add a fourth.** Everything here is at or above what the
site's cards claim, which is what D-016 requires.

> **– Hardware / PCB Design**
>
> – Design the fleet's control boards in KiCad end to end — schematic through
> layout, DRC and the fabrication package — across three boards: a 24 V
> per-room controller, a 48 V sixteen-channel floor controller, and a SELV
> wall keypad.
>
> – **Room Controller:** v1 fabricated and put into service; v2 re-spun at
> 125 × 100 mm (−57 % board area) with eight dimmable 24 V PWM channels, two
> addressable RGB outputs, and a five-stage input protection chain (fuse →
> 60 V eFuse → TVS → tap fuse → 5 V eFuse) replacing v1's unprotected rail.
> Ran the PWM expander at 5 V to drive the FET gates directly, deleting four
> gate-driver ICs. v2 is live in three rooms.
>
> – **Zone Controller:** 48 V, sixteen 12-bit PWM channels at 1.5 A each
> (6 A per four-channel group, 24 A / 1,152 W board), on four layers of an
> impedance-controlled stackup with 100 Ω differential Ethernet pairs. Made
> the ESP32 the RMII clock master, deleting a gated clock buffer and four
> support parts. Routing closed at 0 unconnected; DC review on the final
> copper gives 19.9 mV worst driver distribution against a 50 mV bound;
> fabrication package cut.
>
> – **Switchboard:** SELV wall control surface, 145 × 70 mm two-layer,
> ESP32-S3, 30 addressable indicators, CAN uplink — fabricated, in bring-up.
>
> – Bench bring-up and rework across all three boards: power-path debug,
> fault isolation and repair.

**Scope check.** The site says the Zone Controller is *not fabricated* and
*not qualified* — this block says "fabrication package cut", which matches.
The Switchboard is *in bring-up*, not brought up. Both deliberate.

## A2 — Replace the nine hobby Projects with two substantial ones

**Cut all nine:** Solar Track · RTOS Weather Logger · LM2596 5V Buck
Converter PCB · 5V to 3.3V Voltage Regulator PCB · Servo Tester NE555 ·
Transformerless Power Supply · Fire Detection System · Water Level Detector ·
Morse Caster.

They are 2024–25 student work, they are on the site's project grid already,
and against the Elipse board work above they now actively lower the average.
This is simultaneously the second half of the merge blocker and the single
biggest space recovery in the document.

**Add:**

> **pcbrouter — KiCad-native PCB autorouter and routing verifier (Rust)** *(2026)*
> A from-scratch autorouter built on exact integer geometry: board coordinates
> parse to integer nanometres and clearance predicates run on i128 and 256-bit
> rationals, so no clearance decision depends on floating point. Proves its
> model against KiCad before routing — loader dump field-identical to pcbnew
> across 1,212 footprints and 4,514 pads, pad outlines within 3.1 µm — and
> checks its own output afterwards with KiCad's DRC. Negotiated-congestion
> routing over a tile graph with exact capacities. Benchmarked on a
> commit-pinned corpus of published designs (HackRF One, Bus Pirate 5, Olimex
> ESP32-PoE). Apache-2.0.
>
> **Ember — personal OS with a hand-written Rust init and shell** *(2026)*
> An existing Linux kernel and a reproducible Yocto userland with systemd
> removed and replaced by two programs written from scratch: `spark`, a PID 1
> and service manager in a single epoll loop (dependency graph,
> readiness-driven parallel startup, window-bounded restart backoff, cgroup v2
> per service), and `hearth`, the login shell. Boots an HP Victus over UEFI
> with signed A/B RAUC updates and unaided rollback. 341 workspace tests; five
> audited `unsafe` blocks, with all three libraries `forbid(unsafe_code)`.

## A3 — Rewrite the Summary

The current opening four lines carry firmware and Linux only. Boards and Rust
systems work are the differentiators now and belong in the first sentence.

> Embedded systems engineer (B.Tech ECE, 2026, RGUKT Srikakulam, CGPA 8.3/10)
> who owns the whole stack — PCB design through firmware to custom embedded
> Linux. At Elipse I design the eOS fleet's control boards in KiCad — a 24 V
> room controller fabricated and in service, a 48 V sixteen-channel floor
> controller, and a SELV wall keypad — and contribute to eOS itself, a
> Yocto/OpenEmbedded distribution for Raspberry Pi 5 with A/B RAUC OTA, an
> MQTT service bus, a Rust per-room sensor framework and an on-device Rust
> voice stack. Outside work I have written a KiCad-native PCB autorouter and a
> personal OS with a hand-written Rust init and shell. Previously, during a
> six-month engagement at Radiogeet, I built the ESP32-S3 firmware for an
> industrial UWB Anti-Collision System now deployed at Tata Steel BlueScope.

## A4 — Compress Skills: 11 groups → 7

Same coverage, roughly half the vertical space. Merge Hardware Platforms into
PCB Design; merge Linux Internals into Embedded Linux; drop the labels that
restate their contents.

| Keep as | Merged from |
|---|---|
| Languages | Programming Languages |
| Embedded Linux & OS | Embedded Linux & OS Development + Linux Internals |
| Firmware & RTOS | Embedded Firmware |
| PCB & Hardware | PCB Design + Hardware Platforms |
| On-Device ML & Voice | unchanged |
| Protocols | Communication Protocols |
| Sensors & Tooling | Sensors & Peripherals + UI & Tooling |

**PCB & Hardware must gain** what the new work uses and the current line lacks:
ERC/DRC, impedance-controlled stackups, differential-pair routing, eFuse
protection design, gerber/CAM release, BOM and sourcing, bring-up and rework.

## A5 — Page budget, honestly

| Change | Δ lines (approx.) |
|---|---|
| Cut 9 project entries (2 lines each + spacing) | −20 |
| Add 2 project entries | +8 |
| Compress Skills 11 → 7 groups | −16 |
| Add the Hardware / PCB block | +11 |
| Compress Radiogeet's "Additional Projects" 7 bullets → 3 | −4 |
| Ampnics 3 bullets → 2 | −1 |
| **Net** | **≈ −22 lines** |

That is roughly one page. **Expect 4 → 3 pages, not 4 → 2.** Reaching two
pages needs further cuts, offered in priority order:

1. Education → two single lines (the CGPA is already in the Summary). *−4*
2. Certifications → one line each, drop the "View Certificate" links (the
   site carries them). *−4*
3. Elipse eOS block: 5 bullets → 3, folding the D-Bus interface names and the
   SQLite tuning detail into one line. *−4*
4. Drop the Ampnics role entirely — six months of remote PCB review in 2025,
   now the weakest entry by a distance. *−5*

1–3 are safe. 4 is a judgement call and the owner's to make.

## A6 — Export hygiene (closes I7)

- `IN4007` → resolved by A2's cut.
- Set PDF **Title** (`Ramu Roy — Embedded Systems Engineer`) and **Author**
  (`Ramu Roy`) via `hyperref`'s `pdftitle` / `pdfauthor`.
- Enable tagging for accessibility.
- Add the portfolio URL to the header alongside the GitHub and LinkedIn links.

## Evidence

Every figure above traces to a source already checked in this engagement's two
audit rounds and recorded in `docs/design-specs/h1-hardware-and-pcb.md` §4 and
§6, and in the checkpoint. Nothing here is new or unverified: the CV is
deliberately downstream of the site, not a second place for claims to be
invented.

## To execute

Provide the `.tex` (Overleaf download or the file itself). The edits above map
onto it directly, `pdflatex` is available locally, and the result can be
dropped into `public/Ramu_Roy_Resume.pdf` — which clears **D-016** and, with
D-021 already closed, unblocks the merge to `main`.

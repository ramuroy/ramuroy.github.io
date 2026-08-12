# Amara Block-C Basement-1 — project handoff

Checkpoint date: 2026-08-12

Current phase: evidence lock before any eOS controller allocation

Design status: coordination work only; not for construction

## Read this first

The current task is to build a complete Tier-A 48 V eOS lighting architecture
for Amara Block-C Basement-1 on top of a source-accurate consultant carbon
copy. The work must proceed one decision at a time with the user. Accuracy and
traceability take priority over speed or visual completeness.

Do **not** resume by extending the P06 controller layout. P06 is a retained,
useful concept study, but its seven Zone Controllers, channel assignments,
nearest-fixture route ownership and wire account have not been approved through
the new step-by-step process. The authoritative file for the next session is:

`Amara-Block-C-B1-Existing-Infrastructure-Review-P07.dxf`

Open it in **Model Space** and use **Fit View**. The next design action is to
extract and review source-supported room boundaries. Do not place a Zone
Controller or assign any light until the user explicitly advances to that step.

Read the evidence chain in this order:

1. [P04 source audit](p04-source-audit.md)
2. [P05 equipment-map audit](p05-equipment-map-audit.md)
3. [P06 provisional overlay audit](p06-overlay-audit.md)
4. [P07 current infrastructure audit](p07-infrastructure-audit.md)

## What the user is trying to produce

The final deliverable is an MEP-facing drawing, not a prose report. It must
show, with realistic and auditable geometry:

- the consultant's normal 230 V lighting architecture;
- the proposed eOS 48 V architecture;
- panels, DBs, shafts, cutouts, cable trays and conduit routes;
- every relevant peripheral and conductor role;
- how conductors actually travel through or reuse containment;
- what eOS changes, adds or retains;
- conductor quantities and savings only where the source evidence supports
  calculation; and
- assumptions, holds and engineering approvals without presenting them as
  issued facts.

`/home/sena/Desktop/Amara-electrical/compare-2d/Amara-B1-Change-Drawing.pdf`
is the minimum presentation baseline. The Block-C work must be more rigorous:
source coordinates, layer provenance, reproducible registers and explicit
confidence status must accompany the visual drawing.

## Owner decisions that govern the work

1. Build the **Tier-A complete 48 V lighting architecture**, but only one step
   at a time and only when the user asks for the next step.
2. Use **Zone Controllers** in basements, lobbies and other common areas. Room
   Controllers are for inside homes or hotel rooms and are not the Block-C
   basement controller type.
3. Use the consultant drawing as a **carbon copy underlay** with independently
   switchable layers. Our coordination geometry must remain understandable when
   that underlay is hidden.
4. Establish clear, measured room boundaries before controller placement.
   A room MTEXT anchor is not a room boundary.
5. First review only the major existing infrastructure: panels, DBs, shafts,
   cutouts, conduits and trays. Then decide each Zone Controller location,
   connected lights and channel assignments with the user, one controller at a
   time.
6. Never guess an unverified circuit, room polygon, panel placement, containment
   link or conductor route. Mark unresolved items as holds.
7. Preserve the consultant source files read-only. Generated DXF/PDF/SVG/CSV
   files are separate coordination derivatives.
8. Layer visibility changes are temporary CadSoft view operations. Always list
   layers first, state the exact proposed visibility change and obtain the
   user's permission. Never claim that a visibility operation edits or saves a
   DWG/DXF.

Broader eOS decisions from the comparison work remain applicable when the
detailed design reaches them:

- Normal 230 V branch wiring is represented as L, N and PE to each applicable
  AC load; the final construction arrangement still requires MEP approval.
- eOS lighting uses clearly differentiated +48 V and switched-return conductor
  roles. Do not collapse a multi-conductor drawing into a single decorative
  route line.
- eOS supplies 48 V BLDC fans where fans are in scope.
- Room Controller channels CH7 and CH8 can serve fan or light outputs and have
  flyback-diode protection. This is a Room Controller fact, not a reason to use
  a Room Controller in this common area.

## Authoritative source evidence

### Consultant source

- DWG:
  `/home/sena/Desktop/Amara-electrical/dwg/Block-C Electrical Internal Drawings-R1.dwg`
  - SHA-256:
    `90bd93bf2a8fae28a9d9784d7fd33ac0f31f53082dcf06a8490184f9a5846edc`
  - units: millimetres
  - 2,674 layers
  - 1,801 model-space root entities
- Internal issued PDF:
  `/home/sena/Desktop/Amara/INTERNAL/INTERNAL/ELECTRICAL/Block-AB&C Electrical Internal  GFC - A&B 13-12-24 C 27-02-25/Block-C Electrical Internal Drawings- R1.pdf`
  - SHA-256:
    `5ca2a2bc4ec3b278deab5c49535a47a48fd9b676bb0567d4fdaa4e59e5a44043`
  - page 11 / `23187-C-E1-003-R1`: Basement-1 Fixture Layout
  - page 12 / `23187-C-E1-004-R1`: Basement-1 Conduit Layout
  - page 20 / `23187-C-E5-002-R1`: Basement-1 slab-conduit layout
- External issued PDF:
  `/home/sena/Desktop/Amara/TransferNow-20260806KbRGYhoN/Electrical External Drawings-R3.pdf`
  - SHA-256:
    `75419b1abfce225462afa26923fe6eac1c91ad0ec4cb7af1148b5a402cb4e463`
  - page 9 supplies the T3-LT source footprint
  - page 11 is the Basement-1 ceiling-lighting reference

### Coordinate frames

The consultant file contains multiple placed copies and layouts. Never compare
cursor values without naming the coordinate space.

- Working design frame: **E1.1 model space**, millimetres.
- Equipment/room source frame: **E2.1 model space**, millimetres.
- Verified transform:

  ```text
  X_E1.1 = X_E2.1 - 373325.550046866 mm
  Y_E1.1 = Y_E2.1
  scale = 1
  rotation = 0 degrees
  ```

- CADReader Layout-13 values around `(565, 263)` and `(586, 259)` are
  layout/paper-space readings. CadSoft values around `(278374, 411050)` and
  `(281903, 410385)` are E1.1 model-space readings. They are not expected to
  match numerically without the layout viewport transform.
- The E2.1-to-E1.1 rigid mapping is independently reproduced by both consultant
  400 x 400 mm cutouts. This is the accepted registration evidence.
- Layout 13 is useful for visual reference, but the coordination drawing must
  be authored and measured in the E1.1 model-space frame.

## Verified existing infrastructure

The full-precision register is
`Amara-Block-C-B1-Existing-Infrastructure-Review-P07-Register.csv`.

| Item | Evidence status | What is established |
| --- | --- | --- |
| P7 / T3-LT | `CROSS-REGISTERED` | Exact 2,400 x 1,000 mm external E2.0 footprint transferred by the verified registration; not instantiated in the active internal DWG |
| DB-C | `ACTIVE-DWG` | Six live line entities; nominal 150 x 600 mm |
| T3-ES-1 | `ACTIVE-DWG` | Complete combined live geometry; nominal 3,000 x 500 mm |
| T3-CS-1 | `ACTIVE-DWG` | Live geometry; nominal 1,000 x 500 mm |
| T3-ES-2 | `ACTIVE-DWG` | Complete combined live geometry; nominal 2,150 x 500 mm |
| T3-CS-2 | `ACTIVE-DWG` | Live geometry; nominal 1,000 x 500 mm |
| Electrical cutout | `DUAL-FRAME-VERIFIED` | Actual placed outline; consultant nominal 400 x 400 mm |
| Communications cutout | `DUAL-FRAME-VERIFIED` | Actual placed outline; consultant nominal 400 x 400 mm |
| Block-C Electrical Room | `ACTIVE-DWG MTEXT ANCHOR` | Exact text insertion anchor only |
| Block-C Comms Room | `ACTIVE-DWG MTEXT ANCHOR` | Exact text insertion anchor only |

Corrections already incorporated:

- Earlier P01/P02 shaft graphics omitted an adjacent approximately 500 mm
  segment from both electrical shafts. P04 onward uses the complete geometry.
- Earlier cutout presentation markers used remote text anchors. P05 onward uses
  the actual 400 x 400 mm outlines.
- Unplaced Tower-1 room strings from nested-reference cache content are
  suppressed. The live placed labels identify Block-C.
- Structural `PDB...` beam-reference labels are not electrical DBs.
- A cached `Block-C-LIFT PANEL` was excluded because the live active-DWG query
  did not return a corresponding placed entity.

## Current authoritative drawing: P07

Purpose: evidence review before any Zone Controller decision.

- DXF:
  `Amara-Block-C-B1-Existing-Infrastructure-Review-P07.dxf`
- Bounds: `[184000, 375000, 300500, 447000]` mm
- Layers: 17
- Model-space entities reported in the live 2026-08-12 CadSoft session: 1,398
- Proposal content: none; no controller, PSU, channel, communication bus or eOS
  conductor allocation
- Source conduit records: 119
  - `E-LTG-CON`: 100
  - `E-M-LTG-CON`: 14
  - `E-LTG-Wal-Con`: 5
- Mapped E2.1 tray records:
  - electrical: 3
  - communications: 2
- Source lights available for later review: 252
- Source labels available for later review: 250

P07 layer roles:

| Layer | Role |
| --- | --- |
| `EXISTING-SOURCE-CARBON-COPY` | master inserted reference context |
| `EXISTING-CONTEXT-ARCHITECTURE` | focused architectural line context |
| `EXISTING-CONTEXT-STRUCTURE` | focused structural line context |
| `EXISTING-LIGHT-FIXTURES` | source fixtures, intentionally off by default |
| `EXISTING-LIGHT-LABELS` | source circuit labels, intentionally off by default |
| `EXISTING-LIGHTING-CONDUIT` | exact lighting and wall-conduit source geometry |
| `EXISTING-MAIN-FEED-CONDUIT` | exact source main-feed conduit geometry |
| `EXISTING-ELECTRICAL-CABLE-TRAY` | exact E2.1 tray geometry mapped into E1.1 |
| `EXISTING-COMMS-CABLE-TRAY` | exact E2.1 tray geometry mapped into E1.1 |
| `VERIFIED-PANELS-ACTIVE-DWG` | DB-C and active-DWG panel evidence |
| `VERIFIED-PANEL-CROSS-REGISTERED` | T3-LT with explicit cross-registration status |
| `VERIFIED-ELECTRICAL-SHAFTS` | complete verified electrical shafts |
| `VERIFIED-COMMS-SHAFTS` | verified communications shafts |
| `VERIFIED-CUTOUTS` | dual-frame-verified cutout outlines |
| `VERIFIED-ROOM-ANCHORS` | room text anchors, not room boundaries |
| `VERIFICATION-NOTES` | provenance and evidence warnings |

The live CadSoft layer state is a temporary user-selected view, not a design
revision. At the checkpoint, architecture, structure and room anchors were not
visible in the current view; lighting fixtures and labels retained their DXF
off flags. A future agent must call `list_layers` again rather than assuming
this snapshot persists.

## Revision history and how to use it

| Revision | Meaning | Current authority |
| --- | --- | --- |
| P01 | first separate eOS coordination base | superseded |
| P02 CLEAN | focused model-space service/equipment base | superseded for current work |
| P03 | full consultant source wrapped under `THEIRS-CARBON-COPY`; empty eOS layers | useful carbon-copy experiment, but too broad for focused coordination |
| P04 | source audit and verified coordinate register | authoritative evidence |
| P05 | equipment map and corrected shaft/cutout representation | authoritative evidence |
| P06 | generated end-to-end eOS concept with seven controllers and wire account | retained as a provisional study; not approved design |
| P07 | existing-infrastructure-only review | **current working revision** |

P06 must remain available because it records calculations and demonstrates a
possible finished presentation. Its numbers are not to be silently carried into
the approved design:

- 7 proposed Zone Controllers;
- 37 used channels;
- 250 labelled lights controlled and 2 unlabelled lights held;
- 4,500 W planning load at 18 W per light;
- 1,359.943 m final-branch/wall conduit and 525.307 m main-feed route;
- nearest-source-fixture conductor ownership inference; and
- conditional copper comparison.

These are P06 proposal outputs, not owner-approved controller-by-controller
allocations or construction quantities.

## Why DXF is the coordination master

DXF is used because it is an open, text-auditable exchange format that can be
generated deterministically with exact model-space coordinates and dedicated
layers while leaving the consultant DWG untouched. CadSoft, CADReader and
AutoCAD-compatible tools can open it, and it can later be converted to DWG for
normal MEP handover.

DXF is not inherently more accurate than DWG. Accuracy comes from source units,
coordinate-frame discipline, exact transforms and evidence registers. DXF can
be larger and may not preserve proprietary DWG proxy objects, plot settings or
advanced annotation behavior. Retain DXF as the auditable master even if a DWG
handover copy is eventually produced.

## CadSoft and MCP operating context

Required MCP sequence:

1. `get_capabilities` — record the enabled scopes
2. `get_session`
3. `list_drawings` — record each drawing's opening `revision`
4. state the active drawing
5. `list_layers` before any proposed visibility change
6. request explicit user approval before changing visibility

CadSoft MCP inspects drawings, layers and placed entities and can temporarily
change the view.

**As of CadSoft v0.4.0 (2026-08-13) it can also write.** `get_capabilities` on
the current build reports `edit_source_entities` and `filesystem_export` among
its enabled scopes, so the server can move and delete source entities, author
wires and device ports, run and commit electrical capture, and export DWG
files. Earlier revisions of this handoff stated that it could not edit geometry
or save the source drawing; that is no longer true.

This changes nothing about the design intent and everything about how it is
enforced. Owner decision 7 — preserve the consultant source files read-only —
is now upheld by discipline rather than by the tool's inability. Therefore:

- confine this project to the read tools unless the user names both the target
  and the change;
- record the drawing `revision` at the start and check it again at the end; an
  unchanged revision is the evidence that the source was not modified; and
- if a write is ever authorized, run it with `dry_run: true` first, report what
  it would affect, and pass `expected_revision`.

Camera control (`get_view`, `set_view`, and the typed `set_view_state`) merged
from the `combined-mcp-view` proof of concept into `main` and ships in v0.4.0.
It changes only the plan camera, never drawing content.

After a CadSoft upgrade, restart every MCP client. A stale client returns
`no reachable CadSoft session is running`, which is indistinguishable from the
application being closed and which retrying never clears. Confirm with
`get_capabilities`: `protocol_version: 2` and a 41-tool catalogue mean the
client is current.

## Exact next step

The user wants room/control-area boundaries visible in our overlay even when the
consultant carbon copy is hidden. The next session must therefore:

1. Confirm P07 is active with `get_session` and `list_drawings`.
2. List all P07 layers; do not change them without approval.
3. Identify the exact room or service-area boundary layers/entities in the
   consultant source for Block-C Basement-1.
4. Extract the closed boundary geometry and source dimensions in E1.1, using the
   verified transform where the evidence originates in E2.1.
5. Cross-check the polygon against wall/door geometry, labels, issued PDF and
   stated dimensions. Do not derive a polygon from an MTEXT anchor.
6. Present the candidate room names, vertices, dimensions and evidence status to
   the user before generating them.
7. After approval, place the boundaries on dedicated coordination layers such
   as `VERIFIED-ROOM-BOUNDARIES` and `VERIFIED-ROOM-DIMENSIONS` in a new P08
   derivative. Do not alter P07 or the consultant DWG.
8. Only after the room-boundary gate is accepted should controller placement
   begin, one Zone Controller at a time.

The exact room list and P08 layer names are proposed workflow details, not yet
owner-approved design facts.

## Confidence language

Use these labels consistently:

- `ACTIVE-DWG`: returned as placed geometry by live CadSoft queries.
- `CROSS-REGISTERED`: exact geometry from another issued drawing/frame, moved
  only by a verified rigid registration.
- `DUAL-FRAME-VERIFIED`: corresponding live geometry independently agrees in
  two consultant frames.
- `SOURCE-EXACT`: route or outline vertices come directly from source geometry.
- `PROPOSED`: eOS coordination decision, not consultant information.
- `INFERRED`: supported relationship not directly encoded by the source.
- `HOLD`: unresolved; must not be guessed.

Do not use `verified`, `exact` or `complete` without identifying the evidence
and coordinate frame. Do not call a proposal construction-ready.

## Paste-ready continuation prompt

```text
Use CadSoft for the Amara Block-C Basement-1 continuation. Read
compare-2d/eos-drawing/block-c-b1/PROJECT-HANDOFF.md first, then the P04, P05,
P06 and P07 audit documents it references.

Call get_capabilities, get_session and list_drawings, and report the active
drawing, its opening revision, and the scopes returned. The expected working
file is Amara-Block-C-B1-Existing-Infrastructure-Review-P07.dxf in E1.1
model-space millimetres. Call list_layers before proposing any visibility
change and wait for my explicit approval before changing the visible layers.

This server can write: v0.4.0 enables edit_source_entities and
filesystem_export by default. Treat this engagement as read-only. Do not call
move_entities, delete_entities, draw_wire, move_wire_endpoint, delete_wire, any
*_device_port, any *_electrical_capture, any *_plot, export_dwg, undo or redo.
Ask me first if you think one is needed. Report the revision again at the end;
unchanged is the evidence the consultant DWG was not modified.

We are designing Tier-A complete 48 V common-area lighting with Zone
Controllers, but one user-approved step at a time. P06 is only a retained
concept; do not adopt its seven controllers or channel allocations as approved.
The current step is to extract and review source-supported room boundaries so
our overlay remains clear when the consultant carbon copy is hidden. Treat room
MTEXT coordinates only as anchors, never as room polygons. Cross-check all
geometry against the source DWG, issued PDFs, exact layers and coordinate-frame
transform. Separate verified facts, proposals, inferences and holds.
```

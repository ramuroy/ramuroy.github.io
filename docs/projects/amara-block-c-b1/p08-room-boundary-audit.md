# Amara Block-C Basement-1 — room-boundary review P08

Status: source-evidence coordination derivative; first eOS overlay geometry;
no controller, PSU, channel, communications bus or conductor; not for
construction.

## Purpose

P08 answers the gate P07 opened. It adds measured boundaries for the Block-C
Basement-1 **electrical** and **communications** rooms, so the overlay carries
room extent that survives hiding the consultant carbon copy.

Scope is deliberately those two rooms. Other enclosed basement spaces — stair
cores, lift lobbies, ramps, pump and fire rooms — have **not** been surveyed
and are not in this revision.

## File to open

`Amara-Block-C-B1-Room-Boundaries-P08.dxf`

Open **Model Space** and use **Fit View**. E1.1 model space, millimetres,
bounded by `[184000, 375000, 300500, 447000]`.

## The finding that changed the method

The consultant layers named after the rooms do **not** contain room outlines.
`E2.1$0$E-201$0$E-Ele. Room` and `E2.1$0$E-201$0$E-Com. Room` carry the rooms'
**door blocks**: per room, two leaves, two swing arcs of radius 829.164 mm and
two frames, inserted mirrored (`scale [-1, 1, 1]`; the comms door at 1.2x).

Drawing "the electrical room" from the layer called `E-Ele. Room` would have
drawn a door. P04 listed these layers as room candidates but never confirmed
they held closed shapes; that assumption is now retired.

The actual extent is a single **26-vertex polyline** that traces *both faces*
of the services-block wall, with jamb returns at each doorway. Its perimeter is
79.363 m against 39.200 m for its own bounding rectangle. That 2.02 ratio is
the signature of a two-faced wall trace, not a room polygon.

`closed: false`, with the ends meeting to **0.1 mm**, and five near-duplicate
vertices with segments of 0.0–0.1 mm. It is a drafting artifact, which is why
the boundaries are **derived** from it rather than copied.

## Rooms

Coordinate basis: **SOURCE-EXACT**. Drawn geometry is used verbatim; the
consultant's stated dimensions are carried alongside as corroboration and are
never substituted for the measurement.

| Room | E1.1 extent (mm) | Size (mm) | Area | Stated | Delta |
|---|---|---|---|---|---|
| Electrical | x 278132.150–282132.150, y 410788.400–420937.600 | 4000.0 x 10149.2 | 40.5968 m² | 4000 x 10150 | −0.8 mm |
| Comms | x 278132.150–282132.150, y 406137.700–410638.400 | 4000.0 x 4500.7 | 18.0028 m² | 4000 x 4500 | +0.7 mm |

Walls 200 mm; internal partition 150 mm. The reconstruction is exact:
`4500.7 + 150 + 10149.2 = 14799.9` = the wall outline's inner height, and
`+200 +200` gives the 15199.9 outer.

## Evidence

**Dual-layer corroboration.** The same 26-vertex outline appears on both
`E2.1$0$E-201$0$E-Ele. Room` (handle 3643574) and `B1$0$WALL - A`
(handle 1566944), reached through different placement chains
(`373325.550/306850.991` against `446309.161/465058.488`), landing in the same
world position and agreeing to **0.1958 mm in X and 0.0004 mm in Y**. The
boundary does not rest on a single electrical-layer polyline.

**Naming — five independent signals, all agreeing.**

1. the door block on each room-named layer falls inside the room it names
   (Electrical door at y 416038.1, Comms at y 407867.9);
2. source MTEXT anchors `Block-C Electrical Room` (handle 3643567) and
   `Block-C Comms Room` (handle 3643584);
3. circuit labels are `EL5`/`EL6` in the north room and `CL5`/`CL6` in the south;
4. the `1000x100MM Ele Cable Tary` annotation lies in the north room;
5. the consultant's stated dimensions, below.

**Stated dimensions.** Three MTEXT annotations on
`E2.1$0$E300$0$E-Shaft-Text`, each placed exactly on the centre of what it
dimensions:

| Handle | Text | Position | Dimensions | Measured | Delta |
|---|---|---|---|---|---|
| 3636965 | `10150` | (650913.954, 415863.020) rot 90° | Electrical height | 10149.2 | 0.8 mm |
| 3636978 | `4500` | (650870.052, 408388.052) rot 90° | Comms height | 4500.7 | 0.7 mm |
| 3636991 | `4000` | (653457.662, 405326.439) rot 0° | both widths | 4000.0 | 0.0 mm |

The north room's computed mid-height is 415863.0 against the annotation's
415863.020; the south room's is 408388.05 against 408388.052. The placements
are not approximate.

## Consultant quirks recorded

- **The Electrical Room label sits on the layer `E-Com. Room Text`.** Both room
  labels are on the comms text layer. Filtering room labels by layer name
  attributes the electrical room to comms.
- The room-named layers carry doors, as above.
- Door blocks are mirrored inserts, which is why their coordinates appear
  negative in the flattened cache (see below).

## Layers added

| Layer | Colour | Contents |
|---|---|---|
| `VERIFIED-ROOM-BOUNDARIES` | 190 violet | the two closed boundaries, names, sizes, status |
| `VERIFIED-ROOM-DIMENSIONS` | 250 grey | witnessed dimension runs carrying measured **and** stated values |

`VERIFIED-ROOM-ANCHORS` is retained from P07 and still labelled as anchors.
Keeping the anchors visible is what lets a reviewer see that the boundaries are
*not* derived from them — both anchors fall outside both rooms, the Electrical
one 297.5 mm above the north end and the Comms one 1603.5 mm below the south.

## Precision ceiling

CadSoft reports `closed` and `vertex_count` for a polyline but **not** its
vertices (`ElipseTechnology/CadSoft#6`). The inner-face and partition ordinates
therefore come from the flattened cache, which stores 0.1 mm rounded values, so
these boundaries carry **±0.05 mm**. The outer bounds are known to full
precision from CadSoft and are recorded in the manifest for comparison.

If tighter precision is ever required, the vertices must be read from the DWG
directly rather than through either current instrument.

## Cache defect found while doing this

For content inside a **mirrored block insert**, the flattened cache stores
`x = −x_true`; Y is correct. Verified against three Block-C comms-door
entities, agreeing to within the cache's own 0.1 mm rounding.

The hazard is not misplacement. A negated X puts the entity ~1.3 million mm
away, outside every bounds window we query, so **mirrored content silently
disappears from bounds-filtered cache queries** rather than appearing somewhere
wrong. P06 recorded that cache and live counts reconciled exactly for the
252/250/119 figures, so the published censuses appear unaffected — but an
exposure audit is owed before the next figure ships.

This is the third defect the cache/CadSoft pairing has caught, after the closed
polylines and the printed sheet scale.

## Outputs

| File | Bytes | SHA-256 |
|---|---|---|
| `Amara-Block-C-B1-Room-Boundaries-P08.dxf` | 817691 | `e0b8fffcb72aa48512bbcae0a4ada0c15e67faa22439b79dfbf48b7ff7dfba79` |
| `Amara-Block-C-B1-Room-Boundaries-P08.svg` | 4519 | `b993f23b50c43369c0dd48d63160f41386bbbc39529088909033fb699f16304d` |
| `Amara-Block-C-B1-Room-Boundaries-P08-Rooms.csv` | 1277 | `e9bebca18da1196757712047424f6bd484dbfc434ce814bae5e41b15611145dd` |

Generator: `build_block_c_b1_room_boundaries_p08.py`. Its validation asserts
P07's population is unchanged (252 fixtures, 250 labels, 119 routes, 3+2
trays), that each room agrees with its stated dimension within 1 mm, that the
two rooms plus the partition reconstruct the wall's inner height exactly, that
the rooms do not overlap, and that both new layers reach the DXF.

The SVG is a room-focused review sheet, not the whole-basement sheet: a 116 m
wide sheet renders a 4 m room as a smear.

## Source and safety status

- Source DWG: `Block-C Electrical Internal Drawings-R1.dwg`
  (SHA-256 `90bd93bf2a8fae28a9d9784d7fd33ac0f31f53082dcf06a8490184f9a5846edc`)
- Source use: read-only; no visibility change, no edit, no save
- CadSoft v0.4.0 holds `edit_source_entities` and `filesystem_export`; neither
  was used. Read-only here is maintained by discipline, not by the tool.

## Limitations and next gate

- Only the electrical and comms rooms are bounded. Other enclosed basement
  spaces are unsurveyed.
- Boundaries are the inner face of the **drawn** wall. Finishes, plaster and
  any built deviation are not represented and require MEP confirmation.
- The partition is drawn as continuous: no door is drawn between the two rooms
  on the layers examined. Not asserted as fact — no opening was found, which is
  not the same as none existing.
- No controller, PSU, channel allocation, load grouping or conductor is
  approved by P08.

The next decision is the owner's: extend the boundary set to the remaining
enclosed spaces, or advance to Zone Controller placement one controller at a
time on the two rooms now bounded.

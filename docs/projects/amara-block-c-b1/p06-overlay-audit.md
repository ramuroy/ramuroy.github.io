# Amara Block-C Basement-1 — eOS carbon-copy overlay audit P06

> **Retained provisional study — not the approved current design.** The user
> changed the workflow after P06: major existing infrastructure and room
> boundaries must be accepted first, then each Zone Controller and its lights
> must be decided one at a time. Do not carry P06's seven-controller or channel
> allocation into a new revision without explicit review. Read
> the [project handoff](README.md); P07 is the current working drawing.

Status: proposed coordination design, not for construction. The consultant DWG
was read only; no source layer visibility was changed, no entity was edited and
the active drawing was not saved.

## File to open

`Amara-Block-C-B1-eOS-Carbon-Copy-Overlay-P06.dxf`

Open **Model Space** and use **Fit View**. This is a focused standalone drawing,
so unrelated apartment sheets and layouts are not included.

## Layer operation

- `THEIRS-CARBON-COPY` is the master switch for the complete consultant
  underlay.
- Nested `THEIRS-*` layers independently control architecture, structure,
  fixtures, circuit labels, final-branch conduit, main feeds, equipment and
  dimensions.
- `EOS-ZONE-CONTROLLERS` and `EOS-48V-PSU` show the seven proposed distributed
  common-area panels.
- `EOS-48V-POSITIVE` shows the common +48 V conductor role.
- Every switched return has its own layer named
  `EOS-48V-ZC-C-##_CH##`.
- `EOS-230V-L`, `EOS-230V-N` and `EOS-230V-PE` show the retained three-wire PSU
  supply along the issued main-feed route.
- `EOS-CONDUIT-REUSE` is the exact extracted consultant route centreline.
- `EOS-COMM-BUS-PROVISIONAL` is schematic only; its physical Ethernet route is
  deliberately not measured.
- `EOS-HOLD-UNASSIGNED` identifies unresolved source data.

The visible conductor spacing is exaggerated by 120 mm for legibility. It does
not represent conduit separation or installation spacing.

## Source reconciliation

CadSoft active drawing: `Block-C Electrical Internal Drawings-R1.dwg`, units mm.

Within the fixed Block-C endpoint census window
`[210000, 350000, 305000, 462000]`:

- 252 genuine `Ceiling Light` INSERTs.
- 250 `E-LTG-TXT` circuit labels.
- 100 `E-LTG-CON` entities.
- 14 `E-M-LTG-CON` entities.
- 5 `E-LTG-Wal-Con` entities.

Five additional INSERTs on the fixture layer are 2M/3M box blocks and were not
counted as luminaires. The cache and live CadSoft counts reconcile exactly.

The consultant PDF references remain:

- Internal PDF page 11 / `23187-C-E1-003-R1`: Basement-1 Fixture Layout.
- Internal PDF page 12 / `23187-C-E1-004-R1`: Basement-1 Conduit Layout.
- Internal PDF page 20 / `23187-C-E5-002-R1`: Basement-1 slab-conduit layout.
- External PDF page 9: T3-LT source footprint.

## Fixed references

DB-C, both T3 electrical shafts, both T3 communications shafts, both 400 x 400
cutouts and the Block-C room anchors use the P05 verified coordinates. T3-LT is
the exact external E2.0 footprint rigidly registered into E1.1; it is not
misrepresented as an active internal-DWG entity.

## Proposed architecture

- 7 Zone Controllers.
- 37 used channels.
- 250 source-labelled lights controlled.
- 2 source-unlabelled lights held and highlighted; no circuit was guessed.
- Planning connected load: 4,500 W using 18 W per ceiling light.
- Zone Controller basis: 16 channels, 4 A/channel, 20 A total at 48 V.
- Board loading hold: maximum 80% of 960 W = 768 W.
- Actual maximum proposed board loading: 75.0%.
- Every controller is placed at an exact source `E-M-LTG-CON` vertex. These are
  proposed coordination locations, not surveyed mounting approvals.

## Route and wire account

Exact extracted route geometry used by this focused overlay:

- Final branch/wall conduit: 1,359.943 m.
- Main feed route: 525.307 m.
- Proposed board-to-branch links: 7.672 m; explicitly not source conduit.

Reference normal wiring, assuming 2.5 mm² L/N/PE on both route classes:

- 5,655.750 conductor-metres.
- 126.689 kg calculated copper.

Proposed eOS coordination wiring, assuming 1.0 mm² for the 48 V pair and
retained 2.5 mm² L/N/PE for PSU feeds:

- 4,311.151 conductor-metres.
- 59.808 kg calculated copper.
- Conditional calculated reduction: 66.880 kg, or 52.79%.

This comparison does **not** claim conduit saving, installation cost saving or
a construction cable size. Voltage drop, protective-device coordination,
fault-loop behaviour, SELV segregation, conduit fill and thermal derating must
be approved by the MEP engineer and equipment vendor.

## Evidence boundary

The source drawing provides conduit geometry but not a machine-readable record
of which conductor occupies each segment. Therefore conductor ownership is a
declared nearest-source-fixture coordination inference. The geometry and total
route lengths are source-exact; final electrical continuity is not claimed as
issued design data.

The one-to-one global source-label join has a maximum symbol-to-label separation
of 1,969.52 mm, below the 2,100 mm acceptance ceiling and the common 2.5 m
fixture pitch. The two unmatched source lights remain holds.

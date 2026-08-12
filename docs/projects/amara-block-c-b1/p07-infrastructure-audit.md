# Amara Block-C Basement-1 — existing-infrastructure review P07

Status: source-evidence coordination derivative; no eOS proposal; not for
construction.

## Purpose

P07 is the evidence gate requested before controller placement. It presents the
major existing infrastructure with source status and exact placement while
deliberately omitting Zone Controllers, PSUs, communication buses, channel
assignments and proposed conductors.

## File to open

`Amara-Block-C-B1-Existing-Infrastructure-Review-P07.dxf`

Open **Model Space** and use **Fit View**. The drawing is in E1.1 model-space
millimetres and is bounded by `[184000, 375000, 300500, 447000]`.

## Source and safety status

- Source DWG: `Block-C Electrical Internal Drawings-R1.dwg`
- Source use: read-only
- Source visibility changed during extraction: no
- Source geometry edited: no
- Source file saved: no
- Generated proposal geometry: none

The exact E2.1-to-E1.1 transform is:

```text
X_E1.1 = X_E2.1 - 373325.550046866 mm
Y_E1.1 = Y_E2.1
scale = 1
rotation = 0 degrees
```

## Evidence population

- 8 registered equipment, shaft and cutout items
- 2 room MTEXT anchors
- 119 source conduit records
  - 100 `E-LTG-CON`
  - 14 `E-M-LTG-CON`
  - 5 `E-LTG-Wal-Con`
- 3 mapped E2.1 electrical-tray records
- 2 mapped E2.1 communications-tray records
- 252 source lights retained off by default for later review
- 250 source circuit labels retained off by default for later review

All source conduit geometry is drawn without assigning circuit ownership.
E2.1 tray geometry is moved into E1.1 only through the verified rigid transform;
it is containment reference, not an inferred physical connection to a lighting
route.

## Layers

| Layer | Default intent | Evidence meaning |
| --- | --- | --- |
| `EXISTING-SOURCE-CARBON-COPY` | on | master reference insert |
| `EXISTING-CONTEXT-ARCHITECTURE` | on | focused consultant architectural context |
| `EXISTING-CONTEXT-STRUCTURE` | on | focused consultant structural context |
| `EXISTING-LIGHT-FIXTURES` | off | later controller-allocation evidence |
| `EXISTING-LIGHT-LABELS` | off | later circuit-label evidence |
| `EXISTING-LIGHTING-CONDUIT` | on | source-exact lighting/wall conduit |
| `EXISTING-MAIN-FEED-CONDUIT` | on | source-exact main feed conduit |
| `EXISTING-ELECTRICAL-CABLE-TRAY` | on | mapped live E2.1 electrical tray |
| `EXISTING-COMMS-CABLE-TRAY` | on | mapped live E2.1 communications tray |
| `VERIFIED-PANELS-ACTIVE-DWG` | on | active internal-DWG DB/panel evidence |
| `VERIFIED-PANEL-CROSS-REGISTERED` | on | external panel with explicit provenance |
| `VERIFIED-ELECTRICAL-SHAFTS` | on | complete live electrical-shaft geometry |
| `VERIFIED-COMMS-SHAFTS` | on | live communications-shaft geometry |
| `VERIFIED-CUTOUTS` | on | dual-frame-verified outlines |
| `VERIFIED-ROOM-ANCHORS` | on | text anchors only; no boundary claim |
| `VERIFICATION-NOTES` | on | provenance and limitations |

The user's current CadSoft visibility selections can differ from these default
intents. Re-list layers before reasoning about the current view.

## Live CadSoft checkpoint

On 2026-08-12 CadSoft reported:

- active file: `Amara-Block-C-B1-Existing-Infrastructure-Review-P07.dxf`
- units: mm
- bounds: `[184000, 375000, 300500, 447000]`
- layers: 17
- model-space entities: 1,398
- no traversal depth truncations
- no block cycles

The live view had architecture, structure and room anchors hidden by the user's
temporary view choices. Fixtures and labels retained their source off flags.
No visibility was changed while recording this checkpoint.

## Output register

Machine-readable hashes, sizes and counts are in
`Amara-Block-C-B1-Existing-Infrastructure-Review-P07-manifest.json`.

- `Amara-Block-C-B1-Existing-Infrastructure-Review-P07.dxf`
- `Amara-Block-C-B1-Existing-Infrastructure-Review-P07.svg`
- `Amara-Block-C-B1-Existing-Infrastructure-Review-P07.pdf`
- `Amara-Block-C-B1-Existing-Infrastructure-Review-P07.png`
- `Amara-Block-C-B1-Existing-Infrastructure-Review-P07-Register.csv`
- `Amara-Block-C-B1-Existing-Infrastructure-Review-P07-Conduits.csv`

The generator is `build_block_c_b1_existing_infrastructure_p07.py`. Its
validation asserts the 252 fixtures, 250 labels, 119 route records and 3+2 tray
records before writing the manifest.

## Limitations and next gate

- Room markers are exact MTEXT anchors, not room polygons.
- P7 / T3-LT is cross-registered; it is not an active internal-DWG placement.
- P07 shows containment geometry but does not assert conductor occupancy or
  circuit ownership.
- No controller count, PSU count, channel allocation, load grouping, voltage
  drop or wire saving is approved by P07.

The next gate is a source-supported room-boundary review. Only after those
boundaries are accepted should a new derivative add the first proposed Zone
Controller.

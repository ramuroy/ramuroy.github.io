# Amara Block-C Basement-1 — equipment-map audit P05

> Historical evidence checkpoint. P05 remains authoritative for the corrected
> equipment, shaft and cutout placements. P07 is the current working drawing;
> read the [project handoff](README.md) before continuing design work.

Status: read-only CadSoft extraction and source cross-check completed on
2026-08-12.  No layer visibility was changed, no source entity was edited and
the active DWG was not saved.

## Active source

- Drawing: `Block-C Electrical Internal Drawings-R1.dwg`
- Units: millimetres
- Layers: 2,674
- Model-space root entities: 1,801
- Issued internal PDF SHA-256:
  `5ca2a2bc4ec3b278deab5c49535a47a48fd9b676bb0567d4fdaa4e59e5a44043`
- Issued external PDF SHA-256:
  `75419b1abfce225462afa26923fe6eac1c91ad0ec4cb7af1148b5a402cb4e463`

The active drawing was confirmed through CadSoft before extraction.  Queries
included hidden layers but did not change their view state.

## P05 verified result

| Item | Source status | Active E2.1 bounds or anchor (mm) | Evidence |
|---|---|---:|---|
| P7 / T3-LT | CROSS-REGISTERED | 652357.900, 411788.391 to 654757.900, 412788.391 | Exact 2400 x 1000 mm E2.0 footprint, transferred by verified 12-shaft rigid registration |
| DB-C | ACTIVE-DWG | 655620.134, 414007.458 to 655770.134, 414607.458 | Six live LINE entities, handles 3614970–3614975 |
| T3-ES-1 | ACTIVE-DWG | 595074.546, 414937.508 to 598073.123, 415437.520 | Complete live geometry, handles 3618054–3618057; nominal 3000 x 500 mm |
| T3-CS-1 | ACTIVE-DWG | 601825.952, 414936.944 to 602825.952, 415436.944 | Live geometry and shaft label; nominal 1000 x 500 mm |
| T3-ES-2 | ACTIVE-DWG | 623556.085, 414936.683 to 625704.662, 415436.695 | Complete live geometry, handles 3618173–3618176; nominal 2150 x 500 mm |
| T3-CS-2 | ACTIVE-DWG | 629206.093, 414936.606 to 630206.093, 415436.606 | Live geometry and shaft label; nominal 1000 x 500 mm |
| Electrical cutout | DUAL-FRAME-VERIFIED | 651507.577, 410839.205 to 651907.483, 411238.921 | E2.1 handle 3643612; E1.1 handle 3612035; nominal 400 x 400 mm |
| Communications cutout | DUAL-FRAME-VERIFIED | 655007.712, 410188.719 to 655407.618, 410588.435 | E2.1 handle 3643611; E1.1 handle 3612034; nominal 400 x 400 mm |
| Block-C Electrical Room | ACTIVE-DWG label anchor | 656558.909, 421435.150 | MTEXT handle 3643567 |
| Block-C Comms Room | ACTIVE-DWG label anchor | 655974.461, 404334.237 | MTEXT handle 3643584 |

The full-precision E2.1 and mapped E1.1 coordinates are in
`../../equipment-map/Amara-Block-C-Basement-Main-Equipment-Ledger.csv`.

## Corrections incorporated

1. The P01/P02 electrical-shaft graphics omitted an adjacent approximately
   500 mm segment from each electrical shaft.  P05 uses the complete live
   geometry: T3-ES-1 is nominally 3000 x 500 mm and T3-ES-2 is nominally
   2150 x 500 mm.
2. Earlier presentation markers used the remote MTEXT anchors for the two
   cutout notes.  P05 draws the actual 400 x 400 mm placed outline bounds.
3. Room labels are presented as exact label anchors plus extracted room-detail
   geometry; they are not promoted into surveyed room-boundary polygons.
4. Structural `PDB...` beam-reference labels are excluded from the electrical
   DB population.
5. Unplaced Tower-1 nested-reference labels are suppressed.  The live placed
   labels in this view identify Block-C.

## Generated deliverables

- `../../equipment-map/Amara-Block-C-Basement-Equipment-Interactive.html`
- `../../equipment-map/Amara-Block-C-Basement-Equipment-Zoomable.pdf`
- `../../equipment-map/Amara-Block-C-Basement-Main-Equipment-Placement.pdf`
- `../../equipment-map/Amara-Block-C-Basement-Equipment-Soft-Background-CadSoft.dxf`
- `../../equipment-map/Amara-Block-C-Basement-Main-Equipment-Ledger.csv`

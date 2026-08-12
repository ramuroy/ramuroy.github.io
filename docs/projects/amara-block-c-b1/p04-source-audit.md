# Amara Block-C Basement-1 — source audit P04

> Historical evidence checkpoint. P04 remains authoritative for source hashes,
> coordinate registration and placed-entity census, but P07 is the current
> working drawing. Read the [project handoff](README.md) before continuing
> design work.

Status: read-only source audit; no layer visibility changed; no drawing edited or saved.

## Authoritative sources

- Active DWG: `Block-C Electrical Internal Drawings-R1.dwg`
  - SHA-256: `90bd93bf2a8fae28a9d9784d7fd33ac0f31f53082dcf06a8490184f9a5846edc`
  - Units: millimetres
  - Layers: 2,674
  - Model-space root entities: 1,801
- Issued internal PDF: `Block-C Electrical Internal Drawings- R1.pdf`
  - SHA-256: `5ca2a2bc4ec3b278deab5c49535a47a48fd9b676bb0567d4fdaa4e59e5a44043`
  - PDF page 11 / drawing `23187-C-E1-003-R1`: Basement-1 Fixture Layout, 1:160
  - PDF page 12 / drawing `23187-C-E1-004-R1`: Basement-1 Conduit Layout, 1:160
  - PDF page 20 / drawing `23187-C-E5-002-R1`: Basement-1 slab-conduit layout, 1:160
- Issued external PDF: `Electrical External Drawings-R3.pdf`
  - SHA-256: `75419b1abfce225462afa26923fe6eac1c91ad0ec4cb7af1148b5a402cb4e463`
  - PDF page 9: Basement-1 Floor Electrification Layout; source reference for T3-LT
  - PDF page 11: Basement-1 Ceiling Lighting Layout

## Coordinate discipline

The active DWG contains multiple placed copies of the basement plan. Paper/layout coordinates,
E1.1 coordinates and E2.1 coordinates must not be mixed.

The verified mapping from the E2.1 equipment/room frame to the E1.1 lighting frame is:

```text
X_E1.1 = X_E2.1 - 373325.550046866 mm
Y_E1.1 = Y_E2.1
scale = 1.000000000
rotation = 0 degrees
```

This transform is independently reproduced by both consultant 400 x 400 mm cutouts. Their
E2.1 floor-level outlines map coordinate-for-coordinate onto the E1.1 ceiling-level outlines.

## Verified Block-C E1.1 electrical population

Query bounds used for the Block-C wing: `[245000, 350000, 300500, 462000]` mm.

- 125 placed `Ceiling Light` INSERTs on `E1.1$0$E--LTG-FIX`.
- 125 circuit labels on `E1.1$0$E-LTG-TXT`.
- Circuit-label distribution:
  - `PL10`: 14; `PL11`: 13; `PL12`: 18; `PL13`: 17; `PL14`: 14
  - `DL5`: 12; `DL6`: 10
  - `L6`: 2; `L9`: 9; `L10`: 10; `L11`: 2
  - `SL7`, `SL8`, `SL9`, `SL10`: one each
- 57 `E-LTG-CON` lighting-connection polylines.
- 13 `E-M-LTG-CON` polylines.
- 3 `E-LTG-Wal-Con` polylines.
- 6 placed conduit-riser annotations/symbols in the query bounds.
- No pagination remained, no block traversal was truncated, and no block cycle was reported.

These are placed-entity counts, not conductor metres. Child geometry is not counted as a
separate appliance. Route length and conductor quantity must be calculated only after path
vertices, circuit ownership, shared-conduit rules and vertical allowances are resolved.

## Verified equipment and coordination references

Exact values are recorded in `Amara-Block-C-B1-Verified-Register-P04.csv`.

- DB-C: live E2.1 six-line footprint, 150.000 x 600.000 mm nominal.
- Electrical and communications room labels: live E2.1 MTEXT anchors. They are not claimed as
  surveyed room-boundary polygons.
- T3-ES-1, T3-CS-1, T3-ES-2 and T3-CS-2: live E2.1 geometry plus matching live shaft labels.
- Electrical and communications cutouts: live E1.1 and E2.1 geometry, mutually cross-verified.
- T3-LT: 2,400 x 1,000 mm source footprint from Electrical External E2.0, registered into the
  internal frame by the previously verified 12-shaft rigid registration. It is not instantiated
  in the active internal DWG and must remain marked `CROSS-REGISTERED`, not `ACTIVE-DWG`.

### Correction to P01/P02 reference material

The earlier P01/P02 shaft ledger used only the larger/right-hand rectangle of each electrical
shaft and omitted the adjacent approximately 500 mm segment. P04 uses the combined live geometry:

- T3-ES-1 combined width: 2,998.577 mm; nominal drawing dimension: 3,000 mm.
- T3-ES-2 combined width: 2,148.577 mm; nominal drawing dimension: 2,150 mm.

P01/P02 shaft footprints must not be reused for the new coordination drawing.

## Candidate native layers for the next visibility operation

### Phase A — E1.1 Block-C lighting/conduit working view

Architectural/structural context:

- `B2$0$BOUNDARY LINE - A`
- `B2$0$CARPARK - A`
- `B2$0$WALL - A`
- `B2$0$DOOR - A`
- `B2$0$MEP door`
- `B2$0$WF - 3BHK -TYP$0$TYPE-1_EAST FACING 2.0 BHK 914 SQM$0$ROOM ID - A`
- `S1$0$S-beamline-7`
- `S1$0$F & H GRID$0$A-DIMN-100`

Electrical layers:

- `E1.1$0$E--LTG-FIX`
- `E1.1$0$E-LTG-FIX-E`
- `E1.1$0$E-LTG-TXT`
- `E1.1$0$E-LTG-CON`
- `E1.1$0$E-M-LTG-CON`
- `E1.1$0$E-LTG-Wal-Con`
- `E1.1$0$E--Conduit Raisers`
- `E1.1$0$E-Cutout`
- `E1.1$0$E400$0$E-ESB-FIX`
- `E1.1$0$E-DIM-TXT`

Coordination-only optional layer:

- `E1.1$0$E-Fire Conduit`

### Phase B — E2.1 rooms, DB, shafts and trays

- `B1$0$BOUNDARY LINE - A`
- `B1$0$CARPARK - A`
- `B1$0$WALL - A`
- `B1$0$DOOR - A`
- `B1$0$MEP door`
- `E2.1$0$E-201$0$E-Ele. Room`
- `E2.1$0$E-201$0$E-Com. Room`
- `E2.1$0$E-201$0$E-Com. Room Text`
- `E2.1$0$E1.0$0$E-DB Box`
- `E2.1$0$E4.0$0$E300$0$E-Ele.Shaft`
- `E2.1$0$E4.0$0$E300$0$E-Com.Shaft`
- `E2.1$0$E4.0$0$E300$0$E-Shaft-Text`
- `E2.1$0$E-Cutout`
- `E2.1$0$E-ELE  Tray`
- `E2.1$0$E-COMS  Tray`
- `E2.1$0$E-Cable Tary Text`

Visibility must not be changed until the user approves the proposed isolation.

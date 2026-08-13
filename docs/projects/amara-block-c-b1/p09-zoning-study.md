# Amara Block-C Basement-1 — 48 V zoning study P09

Status: analysis, not a design. No controller is placed, no channel is
assigned, no conductor is drawn. Not for construction.

Owner inputs fixed for this study: **1.0 mm² for the 48 V pair, 3 % voltage
drop.** Fitting wattage **confirmed by the owner on 2026-08-13 as 18 W**. It was
previously a standing assumption pending the luminaire schedule; that ask is
now closed and the 24 W sensitivity below is retained only as a record of what
was tested, not as a live risk.

## Why this study exists

P09 was originally scoped as a *circuit map*, on the idea that each consultant
circuit could become one eOS channel. **That idea is refuted and is recorded
here so it is not proposed again.**

The consultant's lighting circuits are basement-length runs:

| Circuit | Labels | Span | 230 V | 48 V |
|---|---|---|---|---|
| `PL12` | 47 | 102.6 m | 3.68 A | 17.62 A |
| `PL13` | 43 | 104.7 m | 3.37 A | 16.12 A |
| `PL14` | 39 | 104.8 m | 3.05 A | 14.62 A |
| `PL10` | 38 | 104.7 m | 2.97 A | 14.25 A |
| `DL6` | 26 | 111.1 m | 2.03 A | 9.75 A |

The obvious alternative explanation — the same tag reused once per tower — was
tested and fails. `PL10`'s 38 labels form **one continuous cluster** with no gap
over 15 m across the full 104.7 m. Same for `PL13` and `DL6`.

Counts above are **label** counts. The label-to-fixture join is not established,
so treat them as ±1 per circuit.

Two consequences:

1. A 102.6 m run at 48 V is roughly ten zones, not one channel. The consultant's
   circuit topology is a 230 V artefact and cannot be carried across.
2. Circuits are basement-wide, so **both documented census windows cut through
   them** — 15 circuits split at P06/P07's `x=210000`, 10 at P04's `x=245000`.
   Any per-circuit figure computed inside either window is a fraction of a
   circuit. There is no Block-C-shaped window that contains whole circuits, and
   the fixtures are spatially continuous across the basement (largest gap
   4,242 mm), so no geometry defines the cut either.

Spatial zoning does not have this problem: a zone is local by construction, so
the established P06/P07 window is legitimate for it.

## The budget

At 1.0 mm², copper is 0.0175 Ω/m per conductor, so the +48 V and switched
return together are **0.0350 Ω per metre of run**. Three percent of 48 V is
**1.44 V**. The whole decision reduces to one number:

```
1.44 V / 0.0350 Ω/m  =  41.14 ampere-metres
```

Current × distance. Every 48 V branch spends from that budget. An 18 W fitting
draws **0.375 A**.

For `n` fittings evenly spread along a run of length `L`, fed by a feeder of
length `f` carrying the full channel current, the drop is

```
2·r·f·I  +  r·L·I·(n+1)/n          r = 0.0175 Ω/m,  I = n × 0.375 A
```

The `(n+1)/n` term is why a distributed load reaches roughly twice as far as
the same current lumped at the end.

| Fittings per channel | No feeder | 5 m feeder | 10 m feeder |
|---|---|---|---|
| 2 | 73.1 m | 66.5 m | 59.8 m |
| 4 | 43.9 m | 35.9 m | 27.9 m |
| 6 | 31.3 m | 22.8 m | 14.2 m |
| 8 | 24.4 m | 15.5 m | 6.6 m |
| 10 | 19.9 m | 10.9 m | 1.8 m |

## The area

252 fixtures inside the P06/P07 census window — reconciles exactly with P07's
asserted 252.

- connected load **4,536 W = 94.50 A at 48 V**
- extent **85.5 m × 67.0 m**

Three ceilings, which disagree:

```
channel current   252 ÷ 10 fittings per 4 A channel   →  ≥ 26 channels
board load        4,536 W ÷ 768 W usable              →  ≥  6 boards
channel count     26 ÷ 16 channels per board          →  ≥  2 boards
```

Board basis: 16 channels, 4 A per channel, 20 A total at 48 V = 960 W, held to
80 % = **768 W = 42.7 fittings**.

## Reach against board count

Worst-case distance from a board to its farthest fixture, by k-means over the
252 actual fixture positions, best of five seeds:

| Boards | Straight-line | Orthogonal | Max fittings on one board |
|---|---|---|---|
| 6 | 20.8 m | 28.3 m | 51 |
| 7 | 19.3 m | 25.4 m | 44 |
| 8 | 18.2 m | 23.0 m | 42 |
| 9 | 16.8 m | 22.7 m | 40 |
| 10 | 14.6 m | 20.3 m | 31 |
| 11 | 14.1 m | 18.9 m | 28 |

Straight-line is a lower bound. Orthogonal is the realistic proxy for conduit.
**Neither is a routed length** — routing over a reconstructed conduit graph was
tried on the B1 change drawing and rejected for tracking its own attach-radius
knob, and that rejection stands.

## Correction: reach does not force more boards

An earlier reading of this study concluded that reach governs and that 6 boards
fail, 7 are marginal, and 8–11 are needed. **That conclusion was wrong.** It
assumed every channel is loaded to its 4 A cap of 10 fittings. The board's 20 A
total makes that impossible: 42 fittings across 16 channels is an average of
**2.6 fittings per channel**, and a lightly loaded channel reaches much further.

Recomputed against the observed worst-case distances:

| Boards | Worst distance | Max fittings/channel that fits | Channels needed per board | Within 16? |
|---|---|---|---|---|
| 6 | 28.3 m | 6 | 7.0 | yes |
| 7 | 25.4 m | 7 | 5.1 | yes |
| 8 | 23.0 m | 8 | 3.9 | yes |
| 10 | 20.3 m | 9 | 2.8 | yes |
| 11 | 18.9 m | 10 | 2.3 | yes |

**Six boards satisfy reach**, provided channels carry no more than about six
fittings each — which needs seven of the sixteen available channels. Load, not
reach, sets the board count, and the earlier claim that P06's seven controllers
were "short by two to four boards" is withdrawn. On these numbers seven is
comfortable: it needs ≤7 fittings per channel and about five channels of
sixteen.

This does not revive P06's design. Its controller positions, channel
assignments and nearest-fixture conductor ownership remain unapproved. What is
withdrawn is only the claim that its *count* was too low.

## What actually binds

**The feeder, not the branch.** The run from a board to where its fittings begin
carries the full channel current with no distribution benefit, and it is
expensive. At six fittings per channel a board reaches 31.3 m with no feeder,
22.8 m across a 5 m feeder and **14.2 m across a 10 m feeder**. Board placement
relative to its own branch network matters more than board count.

**Wattage — SETTLED 2026-08-13 at 18 W.** Retained for the record: had it been
24 W, a fitting would draw 0.500 A, `PL12`'s equivalent load would move from
17.62 A to 23.50 A, and the board ceiling would fall from 42.7 to 32 fittings,
pushing the board count from 6 to 8. None of that applies.

**The PSU-to-board link.** A 20 A conductor at 1.0 mm² reaches 2.1 m. This is
not a branch figure — no single 20 A conductor leaves the board, since its 20 A
is the sum of sixteen channels — but the 48 V link from PSU to board does carry
it. That link must be short, heavy, or both, and it deserves its own conductor
decision rather than inheriting 1.0 mm².

## What this study does not decide

- no controller position, count or channel allocation is approved;
- no fixture is assigned to a channel;
- no conductor is drawn and no cut list is implied;
- k-means clusters are an *analysis device* for measuring achievable distance,
  not proposed zones. They ignore walls, conduit, and every other constraint.

## Method and reproducibility

- fixtures: `inserts_flat.jsonl`, `c == "E1.1"`, name contains `Ceiling Light`,
  inside `(210000, 350000, 305000, 462000)` → 252, matching P07;
- circuit labels: `texts_flat.jsonl`, `c == "E1.1"`, effective layer suffix
  `E-LTG-TXT` → 772 across the drawing, 44 distinct tags;
- copper 0.0175 Ω·mm²/m at 20 °C. No temperature derating is applied, which is
  optimistic: a warm basement raises resistance and shortens every reach above.

## Open questions for the owner

1. **Channel loading policy.** Six fittings per channel is the cheapest lever
   available — the channels are already paid for. Capping channels lower buys
   reach at the cost of more parallel home runs and therefore more copper. That
   trade needs routing to quantify and has not been attempted here.
2. **Conductor for the PSU-to-board link**, per the 2.1 m result above.
3. **Fitting wattage**, which moves every number by a third.

---

# P09b — spending the free levers

Owner direction after the study above: apply the two no-hardware levers to
their full potential, then decide on the results.

## The exact channel constraint

The reach table in P09 was tabulated per fitting count. The underlying rule is
simpler and exact. On a daisy-chained channel the segment to fitting 1 carries
`n·i`, the next `(n-1)·i` and so on, and those weights telescope:

```
drop = 2·r·i·Σ d_k        r = 0.0175 Ω/m,  i = 0.375 A
```

so at a 1.44 V budget

> **Σ of the distances to every fitting on a channel ≤ 109.71 m.**

Verified against the P09 table at n = 4, 6, 8 and 10 — 43.9 / 31.3 / 24.4 /
19.9 m all reproduce exactly. This replaces "cap channels at six fittings":
the count was a proxy, `Σd` is the constraint itself, and it lets geometry pay
for itself where fittings are close to the board.

## Cross-verification of the fixture set

The 252 fixtures were checked against the live drawing, not just the cache:
CadSoft returned **252 circles** on `EXISTING-LIGHT-FIXTURES` within the census
window, `matched_count_so_far` 252 with no cursor remaining, and every position
agreed with the cache to **0.000000 mm**. That verifies cache → generator →
DXF → CadSoft. The source-side count rests on P06's recorded cache-versus-live
reconciliation and P07's assert.

## Result

Both levers applied: each board placed at the point minimising the orthogonal
distance to its own fittings, and channels split to a target fraction of the
`Σd` budget rather than packed to it.

| Boards | Packing | Channels | Max/board | Worst drop | Of 48 V | Margin | Branch route |
|---|---|---|---|---|---|---|---|
| 7 | 100 % | 35 | 7 | 1.438 V | 3.00 % | 0.2 % | 1147.7 m |
| **7** | **80 %** | **44** | **8** | **1.150 V** | **2.40 %** | **20.1 %** | **1221.1 m (+6.4 %)** |
| 7 | 60 % | 59 | 11 | 1.006 V | 2.10 % | 30.1 % | 1377.9 m (+20.1 %) |
| 7 | 50 % | 72 | 14 | 0.711 V | 1.48 % | 50.6 % | 1562.3 m (+36.1 %) |
| 6 | 80 % | 51 | 10 | 1.149 V | 2.39 % | 20.2 % | 1346.9 m (+12.9 %) |
| 6 | 50 % | 85 | 16 | 0.717 V | 1.49 % | 50.2 % | 1767.9 m (+48.2 %) |

**The lever is real but not free.** It costs no hardware — the channels are
already bought — but every extra channel is another parallel run. Halving the
drop costs about 36 % more branch conductor. The knee is at roughly 80 %
packing: **20 % of margin for 6.4 % of copper**, after which it gets expensive
quickly.

Branch route is a **lower bound**: the minimum spanning tree of each channel's
board-plus-fittings under the orthogonal metric. Any connected wiring is at
least this. It is a different measurement from the B1 change drawing's
5,624.50 m of conduit — different scope, different basis — and the two must not
be cross-quoted.

## Recommended point

**Seven boards, channels packed to 80 % of the Σd budget.**

| Board | Fittings | W | % of 960 | Channels | Spare | Worst drop | Farthest fitting |
|---|---|---|---|---|---|---|---|
| 1 | 28 | 504 | 52.5 % | 4 | 12 | 1.112 V | 24.2 m |
| 2 | 35 | 630 | 65.6 % | 7 | 9 | 1.141 V | 31.4 m |
| 3 | 41 | 738 | 76.9 % | 7 | 9 | 1.150 V | 25.5 m |
| 4 | 36 | 648 | 67.5 % | 6 | 10 | 1.140 V | 23.8 m |
| 5 | 37 | 666 | 69.4 % | 6 | 10 | 1.136 V | 25.8 m |
| 6 | 42 | 756 | 78.8 % | 8 | 8 | 1.105 V | 30.9 m |
| 7 | 33 | 594 | 61.9 % | 6 | 10 | 1.110 V | 31.6 m |

All 252 fittings allocated. 44 channels of 112. Worst drop **2.40 % of 48 V**
against a 3 % limit. Heaviest board 756 W = 78.8 % of 960 W, inside the 80 %
hold. At least eight spare channels on every board.

## Temperature

Copper rises 0.393 %/K. Re-solving at 30, 40 and 50 °C holds the same drop and
simply needs more channels — 44 → 47 → 49 → 50 at seven boards. **Temperature
costs channels, not margin**, as long as spare channels exist. It is a reason
to keep them.

## What this is not

🚨 **The board positions are computed optima in open car park, not mountable
locations.** A board must land on a wall, a column or a structure; moving it
from its optimum adds feeder, and feeder is the expensive kind of distance —
at six fittings per channel a board reaches 31.3 m with no feeder and 14.2 m
across a 10 m one. The 20 % margin above is exactly what pays for that move,
and it is not obviously enough.

**Establishing mountable surfaces is therefore the next input**, and it is the
same question the room-boundary work answers: walls exist in the B1/E2.1 frame
and not in the E1.1 carbon copy.

Also unchanged: no controller is approved, no fitting is assigned to a channel
as design, distances are an orthogonal proxy rather than routed lengths, and
every figure uses the confirmed 18 W.

Generator: `zoning_p09b.py`.

---

# P09c — mountable surfaces

P09b left one soft number: the seven board positions were optima in open car
park, and a board must land on something. This closes it.

## Where the structure is drawn

The same frame split as the rooms. Columns and walls are drawn richly in the
**E2.1 equipment frame** and sparsely in **E1.1**, where the fixtures live:

| Layer | Frame | Entities in window |
|---|---|---|
| `S2$0$S-colhid-12` | E2.1 | 907 total, **207 column rectangles** in the Block-C window |
| `S1$0$S-colhid-12` | E1.1 | 35, and **none of them are columns** |
| `B1$0$WALL - A` | E2.1 | 953 |

🪤 **`S1`'s `colhid` entities are 2-point hidden construction lines**, some over
12 m long — not column outlines. `S2`'s are 4-point rectangles at 300 × 900 and
similar. An initial comparison of the two sets returned a 2,523 mm median
mismatch and the conclusion "the frames disagree, do not map". **That conclusion
was wrong**: it compared hidden lines against column rectangles. The transform
is unaffected — it is independently carried by the two 400 × 400 cutouts and by
the services-block outline appearing on both `E-Ele. Room` and `B1$0$WALL - A`.

## The columns

**207 column rectangles** in the census window after mapping E2.1 → E1.1,
filtered to 4-vertex outlines between 200 and 1500 mm on each side.

Sizes are textbook basement RC: 300 × 900 (91), 900 × 300 (40), 300 × 750 (21),
450 × 900 (15), 900 × 450 (7), the rest occasional.

Extent x 210207–297406, y 371182–443560, which covers the fixture field
(210429–295889, 377289–444286).

Sanity check that they are real and correctly placed: **no fixture sits on a
column.** Fixture to nearest column is minimum 1,088 mm, median 2,319 mm,
maximum 7,289 mm — exactly the pattern of lights hung between columns.

### Cross-verified against the live drawing

CadSoft, queried on the open source DWG: **207 columns, 207 in the cache, every
one matching within 0.069 mm** (median 0.030 mm), cursor exhausted at 217
polylines before size filtering.

🪤 An index-paired comparison first reported a 25,200 mm maximum difference.
That was an artefact of sorting rounded coordinates — near-identical points
sorted into different orders in the two lists. Nearest-neighbour matching gives
0.069 mm. **Never index-pair two independently sorted geometry lists**; match by
proximity.

## Board placement on real columns

| Placement | Worst drop | % of 48 V | Channels | Heaviest board |
|---|---|---|---|---|
| free-space optima (P09b) | 1.151 V | 2.40 % | 44 | 42 |
| snapped to nearest column | 1.151 V | 2.40 % | 46 | 42 |
| local search over columns | **1.115 V** | **2.32 %** | 50 | 42 |

Snapping moved the boards between **1.2 m and 5.8 m** and cost nothing
measurable. Local search over nearby columns then *improved* on the free-space
result, because the free-space optima minimised maximum distance while the
search optimises the quantity that actually matters — worst channel `Σd` after
packing.

**Margin against the 3 % limit rises from 20.1 % to 22.5 %.** The concern that
real mounting would eat the margin is answered: it does not.

Cost is 50 channels instead of 44, of 112 available. Still under half.

Board positions, on columns, E1.1 mm:

| Board | x | y |
|---|---|---|
| 1 | 275204 | 403238 |
| 2 | 220455 | 412537 |
| 3 | 278005 | 428112 |
| 4 | 253905 | 421412 |
| 5 | 241305 | 412612 |
| 6 | 215870 | 431112 |
| 7 | 241005 | 393237 |

## Still not decided

These are columns that *can* carry a board on the drawing's geometry. Nothing
here checks headroom, services clash, access for maintenance, fire
compartmentation, or whether a given column is structurally or contractually
available. Walls are additionally available as mounting surfaces and were not
used. No controller is approved, and each remains an owner decision one at a
time.

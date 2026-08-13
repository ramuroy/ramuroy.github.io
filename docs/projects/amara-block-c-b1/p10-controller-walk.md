# Amara Block-C Basement-1 — controller walk P10

Status: seven Zone Controllers accepted, one at a time, per owner decision 5.
**Placements confirmed by the owner on 2026-08-13.** Coordination geometry.
Not for construction.

## Basis

- 48 V, **3 % drop limit, end-to-end** (PSU terminals to fitting)
- fittings **18 W = 0.375 A, confirmed by the owner 2026-08-13** (previously an
  assumption pending the luminaire schedule; that ask is closed)
- branch conductor **1.0 mm²**, except ZC2 at **1.5 mm²** (below)
- PSU-to-board link **4.0 mm²**, PSU mounted at the board, link **≤ 1.5 m**
- board: 16 channels, 4 A per channel, 20 A total = 960 W, held to 80 % = 768 W
- channel rule: `drop = 2·r·i·Σd`, so `Σd ≤ 109.71 m` at 1.0 mm², `164.57 m` at 1.5
- channels packed to **70 %** of that budget, not 80 % — see below
- distances are an **orthogonal proxy for conduit, not routed lengths**

## The seven, as accepted

| | Column | Position (E1.1 mm) | mm² | Fittings | W | % of 960 | Ch | Spare | Worst drop |
|---|---|---|---|---|---|---|---|---|---|
| ZC1 | `PC8` | 275204, 403238 | 1.0 | 33 | 594 | 61.9 % | 7 | 9 | 2.09 % |
| ZC2 | `3W148` | 220455, 412537 | **1.5** | 42 | 756 | 78.8 % | 7 | 9 | 2.03 % |
| ZC3 | `3W54` | 278005, 428112 | 1.0 | 42 | 756 | 78.8 % | 8 | 8 | 2.08 % |
| ZC4 | `3W96` | 253905, 421412 | 1.0 | 40 | 720 | 75.0 % | 8 | 8 | 2.04 % |
| ZC5 | `3W154` | 241305, 412612 | 1.0 | 28 | 504 | 52.5 % | 5 | 11 | 1.94 % |
| ZC6 | `3W7` | 215870, 431112 | 1.0 | 30 | 540 | 56.2 % | 8 | 8 | 2.05 % |
| ZC7 | `PC16` | 241005, 393237 | 1.0 | 37 | 666 | 69.4 % | 10 | 6 | 1.88 % |

**252 fittings, 4,536 W, 53 channels of 112 available.** Every board sits within
1 mm of a real column centre. Placements and columns are unchanged from the
walk; only the channel splits moved.

The drop column above is **branch-only**, measured from the board terminals. The
figure that matters is end-to-end, below.

## The one decision that differed, and the rule behind it

**ZC2 alone took 1.5 mm².** Its geometry is a 45.5 m strip, not a compact patch,
so at 1.0 mm² six of its ten channels carried only two or three fittings — they
were reaching 32 to 40 m and could not afford more. At 1.5 mm² the per-channel
budget rises to 164.57 m and the loading becomes `8,3,4,5,10,10,2` instead of
`6,3,2,2,3,2,6,8,5,5`, at the same 2.38 %.

The rule applied to every other board: **upgrade only when a board is squeezed
on channels.** ZC2 was, at ten of sixteen with six left. ZC6 and ZC7 have the
same shape of problem — long tails wasting channels on three-fitting runs — but
neither is short of channels (nine and eight spare) or margin (2.28 %, 2.31 %),
so the upgrade would buy tidiness at +50 % copper.

Measured, not assumed: for ZC7 both gauges were computed. 1.5 mm² consolidates
it from eight channels to six. It was still declined on the rule above.

## The PSU-to-board link

A board's supply current is its whole load — 15.75 A at ZC2 and ZC3, 20 A at the
board's rating — and that changes which constraint binds.

**Ampacity rules the branch gauges out before voltage drop is considered.**
Indicative IEC-60364-style values, copper PVC, two loaded conductors, method A:

| mm² | Method A | Method C | 15.75 A | 20 A |
|---|---|---|---|---|
| 1.0 | 11.0 A | 13.5 A | no | no |
| 1.5 | 14.5 A | 17.5 A | no | no |
| 2.5 | 19.5 A | 24.0 A | yes | no |
| **4.0** | **26.0 A** | **32.0 A** | **yes** | **yes** |

This is the first conductor in the design where **heat, not voltage drop, sets
the floor**.

**And the link cannot be long.** Its drop is in series with the branch drop, so
it spends the same 3 %. ZC2 has only 0.62 % left after its branches. At 4.0 mm²
and the 20 A rating:

| Link | Link drop | Worst end-to-end | |
|---|---|---|---|
| 0.5 m | 0.18 % | 2.56 % | ok |
| **1.0 m** | **0.36 %** | **2.74 %** | **ok** |
| 1.5 m | 0.55 % | 2.93 % | ok, tight |
| 2.0 m | 0.73 % | 3.11 % | **over at ZC2, ZC4, ZC5, ZC6, ZC7** |

### Architectural consequence

**The PSU is part of the controller assembly, not a separately located item.**
No arrangement puts a PSU somewhere convenient and feeds a board over a
distance — even 10 mm² reaches only 4.25 m at ZC2. PSU and board are one thing,
on one column.

Therefore **each of the seven columns needs its own 230 V feed**: `PC8`,
`3W148`, `3W54`, `3W96`, `3W154`, `3W7`, `PC16`. That is the mains-side work
item this creates. At 230 V distance is cheap again, so it is a far easier
sizing problem.

## End-to-end drop — the figures to quote

4.0 mm² link, 1.0 m, sized at the board's **20 A rating** rather than its actual
load, so a board can be filled later without re-cabling. That insurance costs
about 0.1 %.

| | Branch | Link | **End-to-end** | Margin | Route overrun tolerated |
|---|---|---|---|---|---|
| ZC1 | 2.09 % | 0.36 % | **2.45 %** | 0.55 % | 26.3 % |
| ZC2 | 2.03 % | 0.36 % | **2.39 %** | 0.61 % | 30.4 % |
| ZC3 | 2.08 % | 0.36 % | **2.44 %** | 0.56 % | 26.7 % |
| ZC4 | 2.04 % | 0.36 % | **2.40 %** | 0.60 % | 29.2 % |
| ZC5 | 1.94 % | 0.36 % | **2.30 %** | 0.70 % | 35.8 % |
| ZC6 | 2.05 % | 0.36 % | **2.41 %** | 0.59 % | 28.9 % |
| ZC7 | 1.88 % | 0.36 % | **2.24 %** | 0.76 % | 40.3 % |

**These supersede the branch-only percentages.** Anywhere a single headline
number is wanted, it is **2.45 %** end-to-end.

The last column is the one that matters most, and it is explained below.

## Why channels are packed to 70 %, not 80 %

**Routed lengths cannot be obtained from this drawing, and that is now settled
rather than pending.**

80 % packing was chosen while we still expected to measure real conduit routes
from the consultant drawing and reconcile the estimate against them. That
measurement is not available. The drawn conduit is not a connected network:
tested against the whole drawing so nothing is clipped, only 60.4 % of in-window
endpoints meet another vertex within 0.001 mm, **47 of 225 endpoints (20.9 %)
have nothing within a metre**, and the join tolerance shows no plateau anywhere
between 0.1 mm and 2 m — 136 connections at 0.1 mm, 149 at 10 mm, 169 at
100 mm, 189 at 2 m. Any connected graph built from it needs an invented attach
radius that the answer would track.

That is exactly why shortest-path routing was rejected on the B1 change
drawing, now independently reproduced on Block-C's own data. The rejection
stands, and it is permanent, not a tooling limitation: `get_entity` in CadSoft
v0.5.0 returns full-precision vertices and bulges, and the Block-C conduit reads
cleanly (119 records, worst chord-versus-stored gap 0.1264 mm, no arcs, no
closed runs). The geometry is faithfully readable. It simply is not a network.

**So every distance here is an orthogonal proxy that will never be reconciled
against a routed length.** Real cable is always longer — vertical drops from
slab to fitting alone cost 2–3 % before any horizontal detour.

At 80 % packing the design tolerated only **10.8 % route overrun on ZC2** before
exceeding 3 % end-to-end. At 70 % every board tolerates at least **26 %**.

The cost is **six extra channels and about 8 % more branch conductor**. The
channels were already bought — 53 of 112 are now in use — so only the cable is
new. The alternative, thicker conductor on the thin boards, costs roughly +50 %
copper on each for the same result.

The principle: we optimised tightly because we expected to verify later. That
verification proved impossible, so the tight optimisation was traded for
headroom that does not depend on an unverifiable assumption.

### Two caveats before this is firm

**Ampacity figures are indicative.** They are IEC-60364-style values for copper
PVC with two loaded conductors, method A. The real number depends on
installation method, grouping and ambient temperature — a warm basement with
several cables in one containment derates significantly. That is an MEP
determination, and **it can only move the requirement up**, never down.

**ZC2 is no longer the thin one.** At 70 % packing it sits at 2.39 % end-to-end
with 30.4 % overrun tolerance — better than most, because at 1.5 mm² it had
budget to redistribute inside the seven channels it already used. The tightest
board is now **ZC1 at 26.3 %**, and the spread across all seven is narrow.
ZC2 remains the one to watch for any *load* change, since its 45.5 m strip
geometry and 78.8 % loading are unchanged.

## Verification

Run against the built model and the written files:

| Check | Result |
|---|---|
| every fitting allocated exactly once | 252 = 252, no duplicates, none omitted |
| route overrun tolerated ≥ 25 % | every board, min 26.3 % |
| channel current ≤ 4 A | heaviest 3.750 A |
| channel drop ≤ 3 % (branch only) | worst 2.09 %; end-to-end 2.45 % |
| board load ≤ 42 fittings / 768 W | heaviest 42 / 756 W |
| channels ≤ 16 per board | most 10 |
| ampacity, 1.0 and 1.5 mm² | 3.750 A against ~11 A and ~14 A conservative ratings |
| DXF integrity | terminates correctly, 4 sections balanced, all 7 layer sets present |
| P08 content carried through | carbon copy and room boundaries intact |
| CSV reconciles with model | 53 rows, 252 fittings, worst drop matches |

Fixture positions were separately cross-verified against the live drawing
earlier: CadSoft returned 252 circles in the census window, cursor exhausted,
every position agreeing with the cache to 0.000000 mm.

## Things recorded so they are not rediscovered

- **ZC5 CH01 carries ten fittings = 3.750 A**, the only channel in the design
  bounded by the 4 A hardware cap rather than by voltage drop. It manages ten
  only because all ten sit within 12.7 m. It cannot take another without being
  re-split; twelve spare channels make that easy.
- **ZC5 is the release valve.** At 52.5 % with twelve spare channels, and
  sitting between ZC2 and ZC3 geographically, it is where load goes if any is
  ever added. The 24 W case that originally motivated keeping it spare is
  closed — 18 W confirmed 2026-08-13 — but the headroom is deliberately not
  optimised away, because it is what absorbs a later addition without
  re-cabling.
- **ZC6 is a corner board** with no neighbour on two sides, so its spare
  capacity is less useful for rebalancing than the percentage suggests.
- **ZC7 carries the design's longest reach at 45.3 m**, the figure most exposed
  to the orthogonal proxy. First place to look if real routing exceeds estimate.

## What is still open

- **Column availability.** Every board is on a real column of a stated size, but
  headroom, services clash, maintenance access, fire compartmentation and
  structural or contractual permission to fix to it are all outside the drawing.
  Seven columns need confirming: `PC8`, `3W148`, `3W54`, `3W96`, `3W154`,
  `3W7`, `PC16`.
- **Conductor routes are not drawn**, because no routing is established.
  Channel membership is decided; the path is not.
- **The PSU-to-board link is unsized.** A board's 20 A at 1.0 mm² reaches 2.1 m
  and at 1.5 mm² 5.0 m. It cannot inherit the branch gauge, and its drop is in
  series with the branch drop — so the 2.38 % above is **branch-only**, and the
  end-to-end figure will be higher once the link is sized.
- **The 230 V feeds to the seven columns are not designed.** The link work above
  establishes that each board needs one; sizing them is separate.
- **Ampacity derating** for the real installation method, per the caveat above.

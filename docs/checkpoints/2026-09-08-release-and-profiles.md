# Checkpoint — 2026-09-08, release and the public surfaces

**The hardware work is live.** `main` deployed, both merge gates cleared, and the
GitHub profile updated. Supersedes the
[2026-09-07 checkpoint](2026-09-07-hardware-pass.md), which describes the state
while the work was still on a branch.

## 1. What happened, in order

1. **Adjudicated the second audit** (roadmap H-v1). 48 candidate findings → ten
   judges, two lenses per card, zero failures → **29 held, 19 refuted**, and the
   judges collapsed 14 of the held as duplicates. **15 distinct defects.** All
   three "criticals" were downgraded to major on review.
2. **Fixed all 15** (H-v2, H-v3), one commit per card.
3. **Refreshed the résumé** (H-v5) — cleared D-016, the last merge gate.
4. **Merged and deployed.** Fast-forward, no merge commit; Pages green.
5. **Reworked the Zone Controller imagery** — twice, on owner feedback.
6. **Added a click-to-full-size lightbox** (spec H2).
7. **Removed project-status reporting** from the cards (D-022).
8. **Renamed the figures table** from "Measured" to "Key figures" (H-v4).
9. **Rewrote the GitHub profile**, re-pinned repos, fixed repo metadata.
10. **Regenerated the LinkedIn draft** against the new résumé.

## 2. What the adjudication actually found

Worth recording because the pattern repeats. The largest defect was the Zone
Controller card **understating** the work: it described a board still in routing
when routing had closed at 0 unconnected, the DC review had been re-run on the
final copper and the fabrication package was cut. It also quoted **46.544 mV**, a
Stage-9 screen on the *two-layer* board — superseded, and nearly three times
worse than the 19.9 mV the final copper actually gives.

The Room Controller cut the other way: **₹1,260 a board** presented as invoiced
when the source carries a red banner over that exact number — 6 of 10 delivered,
₹5,040 unresolved, and if the loss is absorbed it is ₹2,100 and the
cheaper-than-v1 headline reverses.

**Both directions of error came from the same root cause:** the H1 evidence table
named the source file for each figure but not *which revision or which board* the
file described. That is now recorded in the H1b addendum as a requirement for
future evidence tables.

## 3. The two rules this session produced

- **D-022 — omission is permitted; assertion must be true.** Status detail may be
  dropped; facts may not be invented. The reasoning is economic, not moral:
  ~30 checkable figures sit on these cards, and one fabricated claim beside them
  discredits all of them at once.
- **D-023 — the public surfaces derive from one source, in one direction.**
  Résumé is the upper bound; site sits at or below it; GitHub and LinkedIn derive
  from both. Update the source first.

## 4. Where things stand

| | |
|---|---|
| `main` | deployed and live at ramuroy.github.io |
| Merge gates | **both cleared** — D-021 by adjudication, D-016 by the résumé |
| Résumé | 3 pages, Title/Author metadata set, source in `profile-workspace` |
| GitHub profile | README rewritten; 6 repos pinned; metadata corrected |
| LinkedIn | drafted, **not posted** — needs the owner |

## 5. Open, and who owns it

**Owner-only (no agent path):**

- **Paste LinkedIn** from `LINKEDIN.md` in `profile-workspace`. Every block is
  measured against the real field caps — headline 210/220, About 2,320/2,600,
  the Elipse role 1,988/2,000 (it was 2,528 on the first pass and would have
  truncated mid-sentence).
- **Merge `cv/hardware-refresh-2026-09-08`** in `profile-workspace`, or the
  published PDF and its source drift apart.
- **Decide on making `pcbrouter` public.** Apache-2.0, a benchmark suite anyone
  could re-run, claims that are verifiable rather than asserted. It is the
  strongest artefact the owner controls and it is currently invisible.

**Blocked on owner input:**

- **I1** — figures for the three cards with no table: eOS, Anti-Collision, Voice.
  Five of eight cards carry six figures each; those three carry none, and that
  asymmetry is now the most visible weakness on the page.
- **I2, I3, I6** — availability logistics, official NPTEL verification URLs, a
  portrait for `Person.image`.

**Agent-doable when wanted:** T1.4 and T1.5's input-free halves (sticky-nav
contact CTA, hiding ★ counts under 10), and a Switchboard board render — the
Zone Controller has two, the Switchboard none.

## 6. Notes for whoever picks this up

- **`kicad-packages3d` was installed** on this machine (280 MB download, 3.3 GB
  on disk). Without it `kicad-cli pcb render` produces bare pads with no
  component bodies. Renders also need `--use-board-stackup-colors`, and a custom
  hex mask — KiCad's named `"Black"` comes through brown where copper sits under
  it.
- **Board files were never modified.** The black-mask stackup override lives in a
  working copy under the session scratch directory, not in the eOS repository.
- **The Room Controller render was withdrawn** by the owner (terminal blocks out
  of position in the CAD). That card now has no image; the Switchboard never had
  one.
- **Pinned repos cannot be set by an agent.** GitHub's GraphQL API exposes
  mutations for pinning issues, comments and environments — but not
  repositories. That step is always the owner's.

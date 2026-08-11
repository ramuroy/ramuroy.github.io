# CadSoft MCP guide

This guide explains how an AI terminal can inspect DWG and DXF drawings through
the local `cadsoft` Model Context Protocol (MCP) server. It is written as a
self-contained handoff for a terminal that has no prior knowledge of CadSoft,
the server, the open drawings, or the layer conventions in a project.

CadSoft exposes structured drawing information. It is therefore more reliable
for audits, counts, layer analysis, bounds, and entity inspection than treating
a drawing as a screenshot. The server is intentionally read-mostly: it can
inspect drawing data and temporarily control layer visibility, but it cannot
edit geometry or save a DWG.

## 1. What MCP contributes

[Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)
connects Codex to external tools and context. Local Codex clients on the same
host share MCP configuration. Configuration normally lives in
`~/.codex/config.toml`, or in `.codex/config.toml` for a trusted project.

Useful checks:

```bash
codex mcp list
codex mcp --help
```

Inside the Codex terminal UI, `/mcp` shows connected servers.

Tool names may be presented as short names such as `get_session`, or with a
fully qualified namespace such as `mcp__cadsoft__get_session`. They refer to the
same CadSoft capability.

## 2. Capability and safety boundary

The server can:

- inspect the running CadSoft session;
- identify the active drawing;
- list every open drawing;
- report source paths, units, bounds, layers, and model-space counts;
- list layer flags, placement statistics, and layer bounds;
- search placed entities by drawing, effective layer, DXF type, world bounds,
  and visibility;
- paginate through large entity sets;
- inspect one placed entity using its handle and placement fingerprint;
- temporarily show or hide selected layers;
- temporarily isolate selected layers; and
- temporarily show every layer.

The server cannot:

- create, move, modify, or delete geometry;
- edit attributes or text;
- save or overwrite a DWG or DXF; or
- prove design intent, installation status, or engineering compliance without
  supporting drawing evidence and professional review.

Layer operations affect only the current CadSoft view. They never save the
source drawing. They can still disrupt a user's visual context, so obtain
permission before changing visibility.

## 3. Mandatory workflow

Begin every CadSoft task in this order:

1. Call `get_session`.
2. Call `list_drawings`.
3. State which drawing is active.
4. Work on the active drawing unless the user specifies another drawing.
5. Call `list_layers` before any visibility operation.
6. Tell the user exactly which layers would be affected.
7. Wait for explicit approval before showing, hiding, isolating, or restoring
   layers.
8. Never claim that the file was edited or saved.

For a read-only audit, do not change the view.

## 4. Tool reference

### `get_session`

```json
{}
```

Returns the running process, project name, application mode, active drawing ID,
and drawing count.

Call it first. A successful connection with `active_drawing_id: null` and a
count of zero means CadSoft is running on its start screen but no drawing is
open.

### `list_drawings`

```json
{}
```

Returns each open drawing with fields such as:

- `id`: a session-specific drawing UUID;
- `name`: the filename;
- `source_path`: the local source path;
- `active`: whether the drawing is active;
- `units`: for example `mm`;
- `bounds`: `[min_x, min_y, max_x, max_y]`;
- `layer_count`; and
- `model_entity_count`.

Do not carry a drawing UUID into a later CadSoft session. Resolve the drawing
again because IDs are session-specific.

Global bounds are not automatically the building or product envelope. A stray
object, title block, remote detail, Xref, or repeated insertion can make them
enormous. Validate the relevant region using layer and entity bounds.

### `list_layers`

```json
{
  "drawing_id": "optional drawing UUID or unique filename fragment"
}
```

Omit `drawing_id` to use the active drawing.

Layer records can contain:

- `name`: the complete effective layer name;
- `visible`: effective visibility in the current view;
- `off`: the layer's off flag;
- `frozen`: the layer's frozen flag;
- `locked`: whether editing would be restricted;
- `plottable`: whether the layer is intended to plot;
- `color_rgb`;
- `definition_count`;
- `placed_count`; and
- `bounds`, or `null` when there is no placed extent.

Interpret these fields separately:

- `visible` is the effective current-view state.
- Off or frozen layers are normally not visible.
- Locked layers can still be visible and plottable.
- Non-plottable layers can still be visible.
- `definition_count` is not necessarily an installed quantity.
- `placed_count` can include expanded occurrences from nested blocks and Xrefs.
- Null bounds commonly indicate empty or unplaced content.

Names containing separators such as `XREF$0$E-LTG-CON` are effective nested
names. Preserve the complete string in later queries. Do not silently shorten
it to `E-LTG-CON`.

### `query_entities`

```json
{
  "drawing_id": "optional drawing UUID or unique filename fragment",
  "layers": ["exact effective layer name"],
  "entity_types": ["LINE", "LWPOLYLINE", "INSERT"],
  "bounds": [0, 0, 10000, 10000],
  "visible_only": false,
  "limit": 1000,
  "cursor": null
}
```

Every filter is optional:

- `layers` accepts exact effective layer names, matched case-insensitively.
- `entity_types` accepts DXF types such as `LINE`, `LWPOLYLINE`, `POLYLINE`,
  `ARC`, `CIRCLE`, `INSERT`, `TEXT`, `MTEXT`, `HATCH`, and `DIMENSION`.
- `bounds` is a world-space rectangle.
- `visible_only: false` includes content hidden by layer or entity state.
- `visible_only: true` answers questions specifically about the current view.
- `limit` accepts 1 through 1000.
- `cursor` continues a previous query.

Never claim to have found every entity after inspecting only the first page.
Continue until the response has no next cursor:

```text
cursor = null
results = []

repeat:
    page = query_entities(limit=1000, cursor=cursor, other filters...)
    append page entities to results
    if page has no next cursor:
        stop
    cursor = page next cursor
```

Report the filter scope, number of pages, and accumulated result count whenever
completeness matters.

### `get_entity`

```json
{
  "drawing_id": "optional drawing UUID or unique filename fragment",
  "handle": 12345,
  "placement_fingerprint": 67890
}
```

Use the numeric handle returned by `query_entities`. Include the placement
fingerprint whenever one is supplied.

The response can include the effective layer, world bounds, transform, and
concise type-specific geometry such as endpoints, vertices, insertion data, or
text.

A handle can originate inside a repeated block and appear at several world
placements. The placement fingerprint distinguishes the desired occurrence.
Do not identify repeated content using its handle alone.

### `set_layer_visibility`

```json
{
  "drawing_id": "optional",
  "layers": ["exact layer name"],
  "visible": false
}
```

Call only after listing layers and receiving approval. Use `false` to hide and
`true` to show. The operation changes only the temporary view.

### `isolate_layers`

```json
{
  "drawing_id": "optional",
  "layers": ["exact layer name", "another exact layer name"]
}
```

Shows the specified layers and hides the others in the temporary view. Because
this is a broad view change, repeat the exact layer list and wait for approval.

### `show_all_layers`

```json
{
  "drawing_id": "optional"
}
```

Temporarily shows all layers, including layers initially off or frozen. Call it
only after listing layers and receiving approval.

## 5. Reliable extraction strategy

### Establish identity and scope

Record the filename, full path, active status, units, layer count, top-level
model-space count, and bounds. If several drawings are open, label every result
with its source drawing.

Define the requested floor, area, discipline, and deliverable before counting.
"All electrical entities" and "all visible lighting fixtures" are different
queries.

### Build a layer inventory

Group candidate layers using discovery terms, while retaining exact names:

| Discipline | Common discovery terms |
| --- | --- |
| Lighting fixtures | `LIGHT`, `LTG-FIX`, `FIXTURE` |
| Lighting circuits | `LTG-CON`, `CIRCUIT`, `M-LTG-CON` |
| Lighting text | `LTG-TXT`, `LIGHTING TEXT` |
| Conduits | `CONDUIT`, `CONDUIT RISER`, `FIRE CONDUIT` |
| Cable trays | `CABLE TRAY`, including spelling variants |
| Earthing | `EARTH`, `EARTH PIT`, `EARTH STRIP` |
| Panels | `PANEL`, `DB`, `PDB`, `DISTRIBUTION` |
| Communications | `COMM`, `FTTH`, `INTERCOM`, `DTH` |
| Life safety | `FIRE`, `CCTV`, `ALARM` |
| Architecture | `WALL`, `DOOR`, `GRID`, `COLUMN`, `ROOM`, `RAMP` |

These are discovery patterns, not query inputs. Query with the exact names
returned by `list_layers`.

Summarize visibility, frozen/locked/plottable state, placed count, and bounds
for every layer used in the analysis. Identify empty, hidden, unusually large,
and likely reference-only layers.

### Separate entity roles

Do not combine every discipline entity into one count. Query independently:

- equipment and symbols, usually `INSERT`;
- routes and circuits, usually `LINE`, `LWPOLYLINE`, `POLYLINE`, or `ARC`;
- labels, schedules, and notes, usually `TEXT` or `MTEXT`;
- architectural references;
- dimensions and annotations; and
- panel, CCTV, fire, communication, and earthing content.

This prevents a fixture symbol, circuit line, and label from being counted as
three fixtures.

### Paginate and subdivide

Paginate every relevant query to completion. When the set is too large, split
it by exact layer, entity type, or world bounds. Keep a query ledger containing
the filters, pages, results, and any overlaps so that totals are reproducible.

### Inspect ambiguous entities

Use `get_entity` when exact endpoints, vertices, text, insert transforms, or
placement identity matter. It is also the correct follow-up when a handle is
repeated or a route appears discontinuous.

### Cross-check before concluding

Validate conclusions across multiple evidence types:

- fixture insert counts;
- block names and placement fingerprints;
- circuit and conduit geometry;
- fixture and circuit labels;
- panel identifiers;
- legends and general notes;
- layer bounds;
- drawing titles and sheet descriptions; and
- repeated block placements.

Do not assign a nearby label to a fixture solely because it is close. Require a
circuit line, attribute, explicit note, block relationship, or other support.
If proximity is the only evidence, label the result as an inference.

## 6. Counts, blocks, and measurements

A drawing with hundreds of top-level entities can contain thousands of placed
layer occurrences. Large plans commonly use top-level inserts that expand into
deeply nested block or Xref content.

Consequently:

- `model_entity_count` is not the visible fixture or line total;
- `definition_count` is not automatically the installed quantity;
- `placed_count` can contain repeated or nested occurrences; and
- quantity take-offs should validate placed `INSERT` entities using block
  identity, world bounds, and placement fingerprints.

Always use the drawing's declared units. For geometry-derived measurements:

- calculate line lengths from endpoints;
- calculate polyline lengths from all vertices and segment types;
- distinguish an entity's bounding box from its true length;
- treat displayed dimension text separately from measured geometry;
- state conversions, such as millimetres to metres; and
- use relevant layer/entity clusters rather than unverified global bounds.

## 7. Evidence-based reporting

A strong report contains:

1. **Drawing:** filename, path, active state, and units.
2. **Scope:** floor/area, disciplines, exact layers, types, bounds, and whether
   hidden content was included.
3. **Completeness:** pages retrieved and accumulated results.
4. **Layer evidence:** visibility, flags, counts, and bounds.
5. **Entity findings:** equipment, routes, text, dimensions, and repeated blocks.
6. **Geometry:** coordinates, bounds, lengths, and unit conversions.
7. **Anomalies:** empty layers, outliers, overlaps, ambiguous labels, and
   discontinuities.
8. **Confidence:** verified facts separated from spatial or naming inferences.

Prefer explicit wording:

- "The query returned ..."
- "The entity geometry shows ..."
- "The layer name identifies ..."
- "This appears to be ..."
- "This is inferred from spatial proximity ..."
- "The MCP data does not establish ..."

## 8. Connection troubleshooting

If `get_session` returns `no reachable CadSoft session is running`:

1. Confirm that the installed CadSoft desktop application is running.
2. Restart it if necessary.
3. Open the requested DWG or DXF.
4. Retry `get_session`.
5. Retry `list_drawings`.

If CadSoft connects in `start` mode with zero drawings, the application is
reachable but no drawing is open.

If the MCP tools are absent from a new terminal:

1. Run `codex mcp list` in a shell.
2. Use `/mcp` inside the Codex terminal UI.
3. Confirm that `cadsoft` is enabled in the shared Codex configuration.
4. Restart the Codex client after configuration changes.
5. Confirm that the terminal is on the same host as the CadSoft application.

## 9. Paste-ready terminal context

Paste the following into a fresh terminal when a concise operational handoff is
needed:

```text
Use the `cadsoft` MCP server for all DWG/DXF inspection in this task.

Start by calling `get_session`, then `list_drawings`, and report the active
drawing. Work on the active drawing unless I name another one. Call
`list_layers` before analyzing layer content or proposing a visibility change.

The CadSoft MCP server is read-mostly. It can inspect sessions, drawings,
layers, placed entities, handles, fingerprints, transforms, bounds, and concise
geometry. It can temporarily show, hide, isolate, or restore layers, but it
cannot edit geometry or save the DWG.

Do not change layer visibility without my explicit approval. Before requesting
approval, list the layers and repeat the exact layer names that would change.
For a read-only audit, do not alter the view.

Use `query_entities` with exact effective layer names. Preserve nested names
containing `$0$`. Use `visible_only: false` for a complete audit and true only
when I ask about the current view. Paginate until no cursor remains; never call
a first page complete. Split very large searches by exact layer, entity type,
or world bounds.

Use `get_entity` for exact geometry and pass both the handle and placement
fingerprint when available. Handles inside repeated blocks can occur at several
world placements.

Separate fixture/equipment INSERTs, route LINE/LWPOLYLINE/POLYLINE entities,
TEXT/MTEXT labels, dimensions, and architectural references. Cross-check block
placements, route geometry, labels, panels, legends, bounds, and titles. State
which results are verified and which are inferred. Report the drawing, units,
scope, exact layers, visibility flags, query pages, counts, bounds, anomalies,
and limitations. Do not edit or save the drawing.
```

## 10. Example requests

Comprehensive read-only audit:

```text
Use CadSoft to confirm the session and active drawing, list every layer, and
query all relevant placed entities with pagination. Report units, bounds, layer
statistics, entity types, repeated blocks, and anomalies. Include hidden
entities, but do not change visibility, edit, or save.
```

Layer analysis:

```text
List all layers in the active drawing. Show visible, frozen, locked, and
plottable status, placed count, and bounds. Identify empty, hidden, unusually
large, and potentially important layers. Do not change the view.
```

Discipline take-off:

```text
Find the exact fixture, circuit, conduit, cable-tray, panel, and annotation
layers for the requested area. Query INSERT, LINE, LWPOLYLINE, POLYLINE, TEXT,
and MTEXT entities separately, paginating each query until complete. Validate
quantities against block placements, labels, routes, and legends.
```

Entity inspection:

```text
Inspect the entity using its numeric handle and placement fingerprint. Report
its effective layer, entity type, transform, world bounds, and geometry.
```

The operating principle is simple: use structured drawing evidence, exact layer
identity, complete pagination, and cross-checks. Do not substitute screenshots,
partial queries, or unmarked assumptions when the MCP server can provide the
underlying data.

# CadSoft MCP guide

This guide explains how an AI terminal can inspect DWG and DXF drawings through
the local `cadsoft` Model Context Protocol (MCP) server. It is written as a
self-contained handoff for a terminal that has no prior knowledge of CadSoft,
the server, the open drawings, or the layer conventions in a project.

CadSoft exposes structured drawing information. It is therefore more reliable
for audits, counts, layer analysis, bounds, and entity inspection than treating
a drawing as a screenshot.

> **Revised 2026-08-13 for CadSoft v0.4.0.** Earlier revisions of this guide
> described the server as read-mostly and stated that it could not edit geometry
> or save a DWG. **That is no longer true.** v0.4.0 exposes 41 tools, and
> `get_capabilities` reports the `edit_source_entities` and `filesystem_export`
> scopes as enabled by default. An agent connected to this server can move and
> delete source entities, author wires and device ports, and write DWG files.
> Read-only behavior is now something an operator must require and verify, not
> a property the server guarantees. Call `get_capabilities` first, on every
> session, and treat its `scopes` list as the authority over anything written
> here.

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
- report its own enabled read/write scopes, protocol revision, and coordinate
  frames (`get_capabilities`);
- read and set the active 2D plan camera (`get_view`, `set_view`, and the typed
  `set_view_state`);
- report real layout order and exact viewport target, size, twist, status, and
  frozen layers (`list_pages`, `list_viewports`);
- return the Info tool's semantics at a point — picked leaf entity,
  measurements, plan-local position, room, legend, and schedule row
  (`inspect_at_point`);
- return recognized electrical devices, ports, wire routes, conduit hosts,
  shafts, and route lengths (`get_electrical`);
- inspect the final composited frame (`read_canvas`, `read_pixel`,
  `read_canvas_colors`, `save_canvas_png`);
- temporarily show or hide selected layers;
- temporarily isolate selected layers; and
- temporarily show every layer.

Since v0.4.0 the server can also write. These are grouped so an operator can
recognize them, and none of them should be called against a client source
drawing unless the owner has named both the target and the change:

- move and delete top-level source entities (`move_entities`,
  `delete_entities`);
- author wire runs (`draw_wire`, `move_wire_endpoint`, `delete_wire`);
- author device ports (`add_device_port`, `update_device_port`,
  `remove_device_port`);
- run electrical recognition and commit its result
  (`start_electrical_capture`, `get_capture_review`, `update_capture_review`,
  `apply_electrical_capture`);
- attach and bind a plotted-PDF underlay (`attach_plot`, `bind_plot_page`,
  `set_plot_visibility`, `detach_plot`);
- write DWG files (`preview_dwg_export`, `export_dwg`); and
- move through the edit journal (`undo`, `redo`).

The server still cannot:

- alter a source file implicitly — source edits live in CadSoft's in-memory
  document and undo journal, and reach disk only through an explicit
  `export_dwg`, which refuses to overwrite the currently open source and
  refuses any existing destination without `overwrite: true`; or
- prove design intent, installation status, or engineering compliance without
  supporting drawing evidence and professional review.

Write safety rests on three request fields rather than on the server refusing
to act. Use them:

- `dry_run: true` validates a write and reports the object IDs it would affect
  without changing anything;
- `expected_revision` carries the last `revision` you observed and makes the
  write fail rather than overwrite an intervening user or agent edit; and
- `idempotency_key` makes a retry after a transport failure return the original
  result instead of applying the change twice.

Layer and camera operations affect only the current CadSoft view. They never
save the source drawing. They can still disrupt a user's visual context, so
obtain permission before changing visibility.

For a read-only engagement, say so explicitly and confine the session to
`get_capabilities`, `get_session`, `list_drawings`, `list_layers`,
`query_entities`, `get_entity`, `get_view`, `list_pages`, `list_viewports`,
`inspect_at_point`, `get_electrical`, and the canvas readers. Record the
opening `revision` and check it again at the end: unchanged is the evidence
that nothing was modified.

## 3. Mandatory workflow

Begin every CadSoft task in this order:

1. Call `get_capabilities`. Report the `scopes` it returns. If they include
   `edit_source_entities` or `filesystem_export`, tell the user the session can
   write and confirm whether the engagement is read-only.
2. Call `get_session`.
3. Call `list_drawings`. Record each drawing's opening `revision`.
4. State which drawing is active.
5. Work on the active drawing unless the user specifies another drawing.
6. Call `list_layers` before any visibility operation.
7. Tell the user exactly which layers would be affected.
8. Wait for explicit approval before showing, hiding, isolating, or restoring
   layers.
9. Never call a write tool without the user naming both the target and the
   change. When one is authorized, run it with `dry_run: true` first, report
   what it would affect, and pass `expected_revision`.
10. Never claim that a file was edited or saved unless `export_dwg` actually
    ran and returned a path. Equally, never claim a source file is unmodified
    without checking that its `revision` is unchanged.

For a read-only audit, do not change the view.

Tool availability is build-dependent, and a client discovers its catalogue only
when it connects. The camera tools were a proof of concept on branch
`combined-mcp-view`; they merged into `main` and ship in **v0.4.0**, whose
41-tool catalogue is the reference for this guide. `docs/MCP.md` in the CadSoft
repository is the authoritative per-tool schema.

**After upgrading CadSoft, restart every MCP client.** An already-running
server process keeps executing the replaced binary, and the session manifest is
versioned, so a v0.3.x client against a v0.4.0 application fails with
`no reachable CadSoft session is running` — the same message it returns when
the application is genuinely closed. Retrying never clears it; only a client
restart does. Verify with `get_capabilities`: a `protocol_version` of 2 and a
41-tool catalogue confirm the upgrade took effect.

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

### `get_capabilities`

```json
{}
```

New in v0.4.0, and the correct first call in any session. It returns
`protocol_version`, the current `revision`, the enabled `scopes`, a `features`
list, and the `coordinate_frames` the session understands
(`drawing_world`, `plan_local`, `paper`, `screen`).

A v0.4.0 session typically returns these scopes:

```text
read · view_control · edit_project · edit_source_entities · filesystem_export
```

Read that list before trusting any description of what the server will not do.
It is the only authority on whether the connected session can write.

### `get_view` and `set_view`

Convenience tools for the active tab. `set_view_state` is the typed
alternative that accepts `drawing_id`, a stable `page_id`, revision guards,
dry-run and idempotency; prefer it for precise or multi-drawing work.

`get_view` takes no parameters:

```json
{}
```

It reports the active tab's world-space centre, pixels-per-drawing-unit scale,
viewport pixel size and plan/3D mode.

`set_view` targets the active tab:

```json
{
  "center_x": 278373.82,
  "center_y": 411050.0,
  "pixels_per_unit": 0.08
}
```

Coordinates and scale must be finite, and scale must be positive. The call
changes only the temporary plan camera. It does not edit, dirty or save the
drawing.

Limits that still apply to both interfaces:

- no `drawing_id` on `get_view`/`set_view`; switch to the intended tab first,
  or use `set_view_state`;
- no fit-to-bounds, entity or layer targeting on either interface; and
- no returned effective world bounds — derive them yourself from the reported
  centre, `pixels_per_unit` and viewport size.

Do not invent a pixels-per-unit value when a specific visual extent matters.
Read the current view and viewport, calculate from the desired world bounds, or
ask the user to use Fit View.

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

### Other v0.4.0 read tools

Summarized here; `docs/MCP.md` in the CadSoft repository carries the exact
schemas.

- `list_pages` and `list_viewports` report real layout order and each
  viewport's target, size, twist, status and frozen layers. This is the route
  to the paper-space transform, which is what makes a layout coordinate
  comparable to a model-space one.
- `inspect_at_point` returns the Info tool's semantics for a picked point: leaf
  entity, measurements, plan-local position, room, legend, and schedule row.
  Note that its position is expressed relative to the detected plan's
  lower-left origin, not in world coordinates.
- `get_electrical` returns recognized `devices`, `wires`, `conduits` and
  `shafts`, each with `length_drawing_units`. This is the only bulk-length
  route in the server.

  ⚠️ It reports CadSoft's **electrical model**, not raw source geometry. A
  consultant drawing does not arrive with one; geometry becomes electrical
  objects only by running `start_electrical_capture` → `get_capture_review` →
  `apply_electrical_capture`, which is a recognition step with its own error
  modes and whose final call is a write. Until that capture is validated
  against counts you already trust, a length from `get_electrical` measures the
  capture rather than the drawing.
- `read_canvas`, `read_pixel`, `read_canvas_colors` and `save_canvas_png`
  inspect the final composited frame. These answer a class of question no
  numeric query can reach — whether the drawing, as rendered, actually says
  what it should. Numeric checks cannot see the words on a page.

### Write tools

Not documented individually here, because this guide's purpose is inspection.
See `docs/MCP.md`. Before calling any of them, re-read section 2: they are
enabled by default, they are guarded by `dry_run`, `expected_revision` and
`idempotency_key` rather than by refusal, and source edits reach disk only
through an explicit `export_dwg`.

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

1. Confirm that the installed CadSoft desktop application is running. **If it
   is running, the message is misleading and the cause is almost certainly
   version skew — go to the upgrade checklist below.**
2. Restart it if necessary.
3. Open the requested DWG or DXF.
4. Retry `get_session`.
5. Retry `list_drawings`.

**The same message means two different things.** It is returned both when no
application is reachable and when a client is too old to speak to the one that
is. The session manifest is versioned, so a v0.3.x `cadsoft-mcp` against a
v0.4.0 application fails exactly this way, and retrying never clears it.

After upgrading CadSoft:

1. Confirm the desktop application and `cadsoft-mcp` came from the same build —
   compare checksums against the build output rather than assuming.
2. Restart every MCP client, not just the one you noticed failing. Each client
   spawns its own server process.
3. An installer that replaces the binary in place leaves already-running
   servers executing the **deleted inode**; a process cannot swap its own
   executable, so only a client restart helps. On Linux,
   `readlink /proc/<pid>/exe` printing `… (deleted)` confirms it.
4. Call `get_capabilities`. `protocol_version: 2` and a 41-tool catalogue mean
   the client is current.

Never verify the server by running it with `--version`. It is a stdio MCP
server and will block on standard input indefinitely. Probe it by piping a real
`initialize` request followed by `tools/list` and reading `serverInfo`.

If CadSoft connects in `start` mode with zero drawings, the application is
reachable but no drawing is open.

If the MCP tools are absent from a new terminal:

1. Run `codex mcp list` in a shell.
2. Use `/mcp` inside the Codex terminal UI.
3. Confirm that `cadsoft` is enabled in the shared Codex configuration.
4. Restart the Codex client after configuration changes.
5. Confirm that the terminal is on the same host as the CadSoft application.
6. If some tools are present but others are missing, the client is connected to
   an older build. Confirm the desktop application and `cadsoft-mcp` came from
   the same build, then restart the client so it refreshes its tool catalogue.
   A v0.4.0 catalogue has 41 tools.

## 9. Current project handoff example

The Amara Block-C Basement-1 work is a concrete example of the evidence-first
workflow. Its durable continuation record is
[`projects/amara-block-c-b1/`](projects/amara-block-c-b1/), together with the
complete P04–P07 audit chain.

The important lesson is that a complete-looking generated overlay is not
automatically the approved design. In this project, the P06 seven-controller
concept is retained as a study, while P07 deliberately resets the current
working drawing to verified existing infrastructure. Room boundaries must be
established next, then controllers and lights are accepted one at a time.

## 10. Paste-ready terminal context

Paste the following into a fresh terminal when a concise operational handoff is
needed:

```text
Use the `cadsoft` MCP server for all DWG/DXF inspection in this task.

Start by calling `get_capabilities`, then `get_session`, then `list_drawings`.
Report the active drawing, its opening `revision`, and the `scopes` that
`get_capabilities` returned. Work on the active drawing unless I name another
one. Call `list_layers` before analyzing layer content or proposing a
visibility change.

This server can WRITE. Depending on the build, its scopes may include
`edit_source_entities` and `filesystem_export`, meaning it can move and delete
source entities, author wires and device ports, run and commit electrical
capture, and export DWG files. Treat this engagement as READ-ONLY: use only
get_capabilities, get_session, list_drawings, list_layers, query_entities,
get_entity, get_view, list_pages, list_viewports, inspect_at_point,
get_electrical, and the canvas readers. Do not call move_entities,
delete_entities, draw_wire, move_wire_endpoint, delete_wire, any *_device_port,
any *_electrical_capture, any *_plot, export_dwg, undo, or redo. If you believe
one is needed, stop and ask me first.

Do not change layer visibility without my explicit approval. Before requesting
approval, list the layers and repeat the exact layer names that would change.
For a read-only audit, do not alter the view.

Report the drawing's `revision` again at the end. If it is unchanged, say so as
the evidence that the source was not modified. Do not assert the source is
untouched without that check.

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

get_view, set_view and set_view_state read or change only the plan camera, never
drawing content. Confirm the intended centre and scale with me before any view
change. Neither interface fits explicit bounds or targets an entity or layer, so
compute pixels_per_unit from the viewport and the world extent you want rather
than guessing it, or ask me to use Fit View.
```

## 11. Example requests

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

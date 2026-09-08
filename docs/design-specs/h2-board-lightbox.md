# H2 — Full-size board images

**Status:** approved by the owner 2026-09-08. Written before implementation per **D-017**.

## 1. Why

The Zone Controller card carries two images at roughly 480 px wide inside the
card. Both are 1600 px assets whose whole value is detail a reader cannot see at
that size — individual components in the render, and the four overlaid copper
layers in the layout. Clicking to view full size is the obvious affordance, and
without it the second image in particular is close to decorative.

## 2. The progressive-enhancement shape (D-006)

This is the part that decides the design.

Each image is wrapped in a real `<a href="{image src}">`. **Without JavaScript,
clicking opens the full-size asset directly** — the browser's own image view.
Nothing is lost and nothing is broken.

With JavaScript, the click is intercepted and the image opens in a native
`<dialog>` instead. The lightbox is therefore a pure enhancement layered on a
working link, not a feature that fails closed.

## 3. Why `<dialog>` and not a div

`showModal()` gives, natively and for free: a focus trap, `Escape` to close,
inert background content, and a `::backdrop` pseudo-element. Hand-rolling those
is where lightboxes usually get their accessibility wrong. The one thing it does
not do is restore focus to the trigger, so the script does that explicitly.

## 4. Scope

- `Flagship.images[]` entries render as `<a data-zoom>` wrapping the `<img>`.
- One `<dialog class="lightbox">` per page, rendered once by `Projects.astro`,
  holding an `<img>`, a caption, and a close button.
- A component `<script>` — Astro bundles and hashes these, so unlike
  `src/data/inline-scripts.ts` entries no manual CSP registration is required
  (`scripts/check-build.mjs` skips scripts carrying `src`).
- Closes on: the close button, `Escape` (native), and a click on the backdrop.
- Focus returns to the triggering link on close.
- The dialog's fade respects `prefers-reduced-motion`.

## 5. Accessibility requirements

- The link has an accessible name naming the image, not "click here".
- The dialog is labelled, and the close button has a real label.
- The dialog image keeps the same `alt` as the card image.
- Keyboard: `Enter` on the link opens; `Escape` closes; focus returns.

## 6. Explicitly out of scope

- Zoom, pan, or pinch inside the lightbox. The asset opens at its natural size
  bounded by the viewport; a reader wanting more can open the raw asset, which
  is what the underlying `href` already is.
- Next/previous navigation between the two images. Two images do not justify a
  carousel, and the arrow-key semantics would need their own spec.
- Applying it to the OG image, favicons, or anything that is not a board image.

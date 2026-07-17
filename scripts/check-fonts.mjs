/* Asserts the shipped latin font subsets retain the OpenType features the CSS
   relies on. Findings (2026-07-17, fontkitten inspection):
   - JetBrains Mono subset has NO `zero` feature (GSUB: calt,ccmp,frac,locl) —
     but its default zero glyph is already dotted (3 contours), which is why
     the site does not declare font-feature-settings:"zero". If this assertion
     ever fails, the default zero regressed to a plain 2-contour glyph and the
     type treatment must be revisited.
   - Space Grotesk and Inter subsets DO retain `tnum`, which
     font-variant-numeric: tabular-nums depends on. */
import { readFileSync } from "node:fs";
import { create } from "fontkitten";

let failed = false;
const check = (ok, msg) => {
  if (!ok) { console.error(`✗ ${msg}`); failed = true; }
  else console.log(`✓ ${msg}`);
};
const load = (p) => create(readFileSync(new URL(`../node_modules/@fontsource-variable/${p}`, import.meta.url)));
const gsubTags = (f) => new Set(f.GSUB ? f.GSUB.featureList.map((r) => r.tag) : []);

const mono = load("jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2");
const zero = mono.glyphForCodePoint(0x30);
const contours = zero.path.commands.filter((c) => c.command === "moveTo").length;
check(contours >= 3, `JetBrains Mono default zero is disambiguated (dotted/slashed): ${contours} contours`);
const advances = new Set(mono.glyphsForString("0123456789").map((g) => g.advanceWidth));
check(advances.size === 1, "JetBrains Mono digits are uniform-width (monospaced)");

for (const [name, path] of [
  ["Space Grotesk", "space-grotesk/files/space-grotesk-latin-wght-normal.woff2"],
  ["Inter", "inter/files/inter-latin-wght-normal.woff2"],
]) {
  check(gsubTags(load(path)).has("tnum"), `${name} subset retains tnum (tabular-nums depends on it)`);
}

if (failed) process.exit(1);
console.log("check-fonts: all font-feature assertions passed");

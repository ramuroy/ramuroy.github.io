import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://ramuroy.github.io";

const root = process.cwd();
const dist = join(root, "dist");
const htmlPath = join(dist, "index.html");
const failures = [];

const check = (condition, message) => {
  if (!condition) failures.push(message);
};

check(existsSync(htmlPath), "dist/index.html is missing; run the production build first");
if (!existsSync(htmlPath)) {
  console.error(`Build validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

const html = readFileSync(htmlPath, "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const idSet = new Set(ids);

check(ids.length === idSet.size, "the built page contains duplicate IDs");
check((html.match(/<h1(?:\s|>)/g) || []).length === 1, "the built page must contain exactly one h1");
check(html.includes('<html lang="en">'), "the built page is missing lang=\"en\"");
check(html.includes('<main id="main"'), "the built page is missing the main landmark");
check(html.includes('rel="canonical" href="https://ramuroy.github.io/"'), "the canonical URL is incorrect");
check(html.includes('name="description"'), "the meta description is missing");
check(html.includes('property="og:image"'), "the Open Graph image is missing");
check(html.includes('http-equiv="content-security-policy"'), "Astro did not emit the expected CSP meta tag");
check(!html.includes("fonts.googleapis.com"), "the production page still depends on Google Fonts");

// Scan rendered output for leaked undefined/NaN, but not script bodies, where
// the identifier `undefined` is legitimate JavaScript.
const htmlWithoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
check(!/\b(?:undefined|NaN)\b/.test(htmlWithoutScripts), "the built page contains an undefined or NaN value");

// Every executable inline script must be hash-allowlisted by the CSP, and the
// style-src-attr directive must survive (Astro does not hash is:inline scripts,
// and both insertions are optional-chained — this turns silent drift into a
// build failure).
const cspContent = html.match(/http-equiv="content-security-policy"\s+content="([^"]*)"/i)?.[1] ?? "";
check(cspContent.includes("style-src-attr 'unsafe-inline'"), "CSP is missing the style-src-attr directive for authored style attributes");
const allowedScriptHashes = new Set([...cspContent.matchAll(/'sha256-([^']+)'/g)].map((m) => m[1]));
for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (/\bsrc=/.test(attrs) || /application\/ld\+json/.test(attrs)) continue;
  const hash = createHash("sha256").update(body).digest("base64");
  check(
    allowedScriptHashes.has(hash),
    `inline script is not allowlisted by the CSP (sha256-${hash}): ${body.trim().slice(0, 60)}…`
  );
}

for (const id of ["main", "about", "projects", "experience", "skills", "certifications", "contact", "nav-links", "copy-status"]) {
  check(idSet.has(id), `required element #${id} is missing`);
}

for (const [, target] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  if (target.startsWith("#")) {
    check(idSet.has(target.slice(1)), `internal link ${target} has no matching target`);
    continue;
  }
  // Own-domain absolute URLs are internal links too — normalize instead of skipping.
  let local = target;
  if (local.startsWith(SITE)) local = local.slice(SITE.length) || "/";
  if (!local.startsWith("/") || local.startsWith("//")) continue;

  const url = new URL(local, SITE);
  // Path-form fragments (e.g. /#projects) must also resolve on the home page.
  if (url.hash && (url.pathname === "/" || url.pathname === "/index.html")) {
    check(idSet.has(url.hash.slice(1)), `internal link ${target} has no matching target`);
  }
  let localPath = join(dist, decodeURIComponent(url.pathname).replace(/^\//, ""));
  if (url.pathname.endsWith("/")) localPath = join(localPath, "index.html");
  check(existsSync(localPath), `local asset ${target} does not exist in dist`);
}

for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  const rel = tag.match(/\brel="([^"]+)"/)?.[1]?.split(/\s+/) ?? [];
  check(rel.includes("noopener") && rel.includes("noreferrer"), `external link is missing noopener/noreferrer: ${tag}`);
}

const ldJson = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
check(Boolean(ldJson), "Person JSON-LD is missing");
if (ldJson) {
  try {
    const person = JSON.parse(ldJson);
    check(person["@type"] === "Person", "JSON-LD does not describe a Person");
    check(person.url === "https://ramuroy.github.io/", "JSON-LD URL is incorrect");
  } catch (error) {
    failures.push(`JSON-LD is invalid JSON: ${error.message}`);
  }
}

const sitemapIndex = join(dist, "sitemap-index.xml");
const sitemap = join(dist, "sitemap-0.xml");
check(existsSync(sitemapIndex), "sitemap-index.xml is missing");
check(existsSync(sitemap), "sitemap-0.xml is missing");
if (existsSync(sitemap)) {
  check(readFileSync(sitemap, "utf8").includes("<loc>https://ramuroy.github.io/</loc>"), "the home page is missing from the sitemap");
}

for (const file of ["Ramu_Roy_Resume.pdf", "og.png", "favicon.svg", "favicon-32.png", "apple-touch-icon.png", "robots.txt"]) {
  const path = join(dist, file);
  check(existsSync(path) && statSync(path).size > 0, `${file} is missing or empty`);
}

if (failures.length) {
  console.error(`Build validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Build validation passed: ${idSet.size} unique IDs and all local links/assets are valid.`);

import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

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
check(!/\b(?:undefined|NaN)\b/.test(html), "the built page contains an undefined or NaN value");

for (const id of ["main", "about", "projects", "experience", "skills", "certifications", "contact", "nav-links", "copy-status"]) {
  check(idSet.has(id), `required element #${id} is missing`);
}

for (const [, target] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  if (target.startsWith("#")) {
    check(idSet.has(target.slice(1)), `internal link ${target} has no matching target`);
    continue;
  }
  if (!target.startsWith("/") || target.startsWith("//")) continue;

  const pathname = new URL(target, "https://ramuroy.github.io").pathname;
  let localPath = join(dist, decodeURIComponent(pathname).replace(/^\//, ""));
  if (pathname.endsWith("/")) localPath = join(localPath, "index.html");
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

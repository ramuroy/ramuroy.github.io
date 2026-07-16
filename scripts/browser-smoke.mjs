// Browser smoke suite — exercises the built site in a real browser, covering
// what scripts/check-build.mjs cannot: CSP execution, boot-overlay lifecycle,
// scroll-spy, no-JS navigation, print re-theme, reduced motion, touch, 404.
//
// Requires Playwright (not a repo dependency — install on demand):
//   npm run preview &                      # or any URL via SMOKE_BASE
//   npx -y playwright@latest install chromium
//   SMOKE_BASE=http://localhost:4321 node --experimental-strip-types scripts/browser-smoke.mjs
// Screenshots land in SMOKE_SHOTS (default: os tmpdir).
import { chromium } from "playwright";
import { tmpdir } from "node:os";

const BASE = process.env.SMOKE_BASE || "http://localhost:4321";
const SHOTS = process.env.SMOKE_SHOTS || tmpdir();
const results = [];
const check = (name, ok, note = "") => {
  results.push([ok, name, note]);
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${note ? " — " + note : ""}`);
};

const browser = await chromium.launch({ headless: true });

// ---------- 1. First visit, desktop: boot intro + reveals + spy + console ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  // Boot intro must be ACTIVE on a first visit (it was CSP-dead before B14)
  const bootActive = await page.evaluate(() => !!document.querySelector(".boot.is-active"));
  check("B14: boot intro activates on first visit", bootActive);
  if (bootActive) {
    await page.waitForFunction(() => document.readyState !== "loading");
    const inertOn = await page.evaluate(() => document.querySelector("main")?.inert === true);
    check("B9: page behind boot overlay is inert", inertOn);
    await page.screenshot({ path: SHOTS + "/01-boot.png" });
  }
  // Wait for auto-dismiss (1300ms + wipe)
  await page.waitForFunction(() => !document.getElementById("boot-intro"), null, { timeout: 4000 });
  const inertOff = await page.evaluate(() => document.querySelector("main")?.inert === false);
  check("B9: inert released after dismiss", inertOff);

  const classes = await page.evaluate(() => document.documentElement.className);
  check("js + reveal-ready classes present", classes.includes("js") && classes.includes("reveal-ready"), classes);

  // B2: card transition list must include transform again
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const tprop = await page.evaluate(() => getComputedStyle(document.querySelector(".pcard")).transitionProperty);
  check("B2: .pcard transitions include transform", /transform/.test(tprop), tprop);

  // B1: scroll-spy sets aria-current and clears at top
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const current = await page.evaluate(() => document.querySelector('.nav__link[aria-current]')?.textContent?.trim() ?? "none");
  check("B1: scroll-spy highlights Skills", current === "Skills", current);
  const underlineScale = await page.evaluate(() => getComputedStyle(document.querySelector('.nav__link[aria-current]'), "::after").transform);
  check("B1: active underline visible (no scaleX(0))", underlineScale !== "matrix(0, 0, 0, 1, 0, 0)", underlineScale);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForFunction(() => window.scrollY === 0);
  await page.waitForTimeout(600);
  const atTop = await page.evaluate(() => document.querySelectorAll('.nav__link[aria-current]').length);
  check("B1: highlight clears back at hero", atTop === 0, `${atTop} still current`);

  // Counters show real values (not stuck at 0)
  const statVal = await page.evaluate(() => document.querySelector("[data-count]")?.textContent);
  check("B7: stat counter shows non-zero value", statVal !== "0", String(statVal));

  await page.screenshot({ path: SHOTS + "/02-desktop.png", fullPage: false });
  check("no console errors on load (incl. CSP violations)", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));

  // Second visit in same context: boot must NOT reappear
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);
  const bootSecond = await page.evaluate(() => !!document.getElementById("boot-intro"));
  check("boot intro skipped on second visit (session)", !bootSecond);
  await ctx.close();
}

// ---------- 2. Mobile 390px: menu behavior ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, storageState: undefined });
  const page = await ctx.newPage();
  await ctx.addInitScript(() => { try { sessionStorage.setItem("rr_boot", "1"); } catch {} });
  await page.goto(BASE + "/", { waitUntil: "load" });
  const btnVisible = await page.locator(".nav__menu-btn").isVisible();
  check("mobile: menu button visible at 390px", btnVisible);
  await page.locator(".nav__menu-btn").click();
  await page.waitForTimeout(300);
  const menuOpen = await page.evaluate(() => document.getElementById("nav-links")?.hasAttribute("data-open"));
  check("mobile: menu opens", !!menuOpen);
  const certLink = await page.locator('.nav__link[href="#certifications"]').isVisible();
  check("B24: Certifications link present", certLink);
  await page.screenshot({ path: SHOTS + "/03-mobile-menu.png" });
  await ctx.close();
}

// ---------- 3. Tablet 780px (the old broken band) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 780, height: 1024 } });
  const page = await ctx.newPage();
  await ctx.addInitScript(() => { try { sessionStorage.setItem("rr_boot", "1"); } catch {} });
  await page.goto(BASE + "/", { waitUntil: "load" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  check("B4: no horizontal overflow at 780px", !overflow);
  const menuBtn = await page.locator(".nav__menu-btn").isVisible();
  check("B4: mobile menu used at 780px (nav no longer clips)", menuBtn);
  await ctx.close();
}

// ---------- 4. JavaScript disabled: nav + content usable ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  const navLinksVisible = await page.locator('.nav__link[href="#projects"]').isVisible();
  check("B11: nav links visible without JS (static row)", navLinksVisible);
  const copyBtnVisible = await page.locator(".copy-btn").first().isVisible().catch(() => false);
  check("B30: copy buttons hidden without JS", !copyBtnVisible);
  const bootVisible = await page.locator("#boot-intro").isVisible().catch(() => false);
  check("no-JS: boot overlay never shows", !bootVisible);
  const heroVisible = await page.locator("h1").isVisible();
  const statText = await page.locator("[data-count]").first().textContent();
  check("no-JS: content + real stat values visible", heroVisible && statText !== "0", `stat=${statText}`);
  await page.screenshot({ path: SHOTS + "/04-nojs-mobile.png" });
  await ctx.close();
}

// ---------- 5. Print emulation ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 1400 } });
  const page = await ctx.newPage();
  await ctx.addInitScript(() => { try { sessionStorage.setItem("rr_boot", "1"); } catch {} });
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });
  const bodyColors = await page.evaluate(() => {
    const cs = getComputedStyle(document.body);
    const h2 = document.querySelector(".section-head__title");
    return { bg: cs.backgroundColor, color: cs.color, h2color: h2 ? getComputedStyle(h2).webkitTextFillColor || getComputedStyle(h2).color : "" };
  });
  const darkText = /rgb\((1[0-9]|[0-9]),/.test(bodyColors.color) || bodyColors.color === "rgb(17, 17, 17)";
  check("B3: print body is dark-on-white", bodyColors.bg === "rgb(255, 255, 255)" && darkText, JSON.stringify(bodyColors));
  await page.screenshot({ path: SHOTS + "/05-print.png", fullPage: false });
  await ctx.close();
}

// ---------- 6. Reduced motion: boot skipped, content visible ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  const page2 = page;
  await page2.goto(BASE + "/", { waitUntil: "load" });
  const boot = await page2.evaluate(() => !!document.getElementById("boot-intro"));
  check("reduced motion: boot intro removed", !boot);
  const heroOpacity = await page2.evaluate(() => getComputedStyle(document.querySelector(".stats .stat")).opacity);
  check("reduced motion: revealed content visible", heroOpacity === "1", heroOpacity);
  await ctx.close();
}

// ---------- 7. 404 page ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const resp = await page.goto(BASE + "/does-not-exist", { waitUntil: "load" });
  check("404: served with 404 status", resp.status() === 404, String(resp.status()));
  const title = await page.title();
  check("404: branded page", title.includes("404"), title);
  await page.screenshot({ path: SHOTS + "/06-404.png" });
  await ctx.close();
}

await browser.close();
const fails = results.filter(([ok]) => !ok);
console.log(`\n${results.length - fails.length}/${results.length} checks passed`);
process.exit(fails.length ? 1 : 0);

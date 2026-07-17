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
  // T3.5: terminal is a JS-only feature — absent without JS, static colophon shown
  const termHidden = await page.evaluate(() => getComputedStyle(document.getElementById("rr-term")).display === "none");
  const termBtnHidden = await page.evaluate(() => getComputedStyle(document.querySelector(".footer__term-open")).display === "none");
  const staticColophon = await page.evaluate(() => getComputedStyle(document.querySelector(".footer__colophon--static")).display !== "none");
  check("T3.5 no-JS: terminal + trigger absent, static colophon shown", termHidden && termBtnHidden && staticColophon);
  // T3.6: hero choreography settles without JS
  await page.waitForTimeout(1100);
  const heroSettled = await page.evaluate(() => getComputedStyle(document.querySelector(".hero__spec")).opacity === "1");
  check("T3.6 no-JS: hero power-on settles fully visible", heroSettled);
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

// ---------- 8. Tier 3: choreography, scroll-driven, disclosure, terminal ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const t3errors = [];
  let sigCount = 0;
  page.on("console", (m) => {
    if (m.type() === "error") t3errors.push(m.text());
    if (m.type() === "info" && m.text().includes("serial console attached")) sigCount++;
  });
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });

  // T3.6: boot holds the hero, release plays the sequence
  const held = await page.evaluate(() => document.documentElement.classList.contains("boot-hold"));
  check("T3.6: boot-hold parks the hero on first visit", held);
  await page.waitForFunction(() => !document.getElementById("boot-intro"), null, { timeout: 4000 });
  await page.waitForTimeout(1100);
  const settled = await page.evaluate(() =>
    [".hero__eyebrow", "h1.po", ".hero__topmark", ".hero__lead", ".hero__ctas", ".hero__spec"]
      .every((sel) => getComputedStyle(document.querySelector(sel)).opacity === "1"));
  check("T3.6: full bring-up settles after the wipe", settled);

  // T3.4: view()/scroll() own the entrances and rail in this engine
  const sdaChecks = await page.evaluate(() => {
    const reveal = document.querySelector(".stat.reveal");
    const rail = document.querySelector(".signal-rail__fill");
    return {
      supports: CSS.supports("animation-timeline: view()"),
      timeline: getComputedStyle(reveal).animationTimeline,
      noInView: !reveal.classList.contains("in-view"),
      railAnim: getComputedStyle(rail).animationName,
    };
  });
  check("T3.4: reveals ride view() with no .in-view double-drive",
    sdaChecks.supports && sdaChecks.timeline.includes("view") && sdaChecks.noInView, JSON.stringify(sdaChecks));
  check("T3.4: signal rail rides scroll(root)", sdaChecks.railAnim === "rail-fill", sdaChecks.railAnim);

  // T3.8: disclosure glides and cascades
  const det = page.locator(".pcard__details").first();
  await det.scrollIntoViewIfNeeded();
  await det.locator("summary").click();
  await page.waitForTimeout(150);
  const midH = await page.evaluate(() => document.querySelector(".pcard__details").getBoundingClientRect().height);
  await page.waitForTimeout(800);
  const endState = await page.evaluate(() => {
    const d = document.querySelector(".pcard__details");
    return { h: d.getBoundingClientRect().height, li: getComputedStyle(d.querySelector("li")).animationName };
  });
  check("T3.8: details glides open with li cascade", midH < endState.h && endState.li === "detail-li-in", `${midH.toFixed(0)}->${endState.h.toFixed(0)}`);

  // T3.5: terminal end-to-end
  const run = async (cmd) => {
    await page.fill(".term__input", cmd);
    await page.press(".term__input", "Enter");
    await page.waitForTimeout(60);
  };
  const logText = () => page.evaluate(() => document.querySelector(".term__scroll").textContent);
  await page.locator(".footer__term-open").scrollIntoViewIfNeeded();
  await page.locator(".footer__term-open").click();
  await page.waitForTimeout(320);
  const opened = await page.evaluate(() => ({
    open: document.getElementById("rr-term").hasAttribute("data-open"),
    expanded: document.querySelector(".footer__term-open").getAttribute("aria-expanded") === "true",
    inputFocused: document.activeElement?.classList.contains("term__input"),
  }));
  check("T3.5: trigger opens, aria-expanded, input focused", opened.open && opened.expanded && opened.inputFocused);
  check("T3.5: MOTD printed", (await logText()).includes("115200 8N1"));
  await run("help");
  check("T3.5: help lists commands", (await logText()).includes("replay the boot intro"));
  await run("whoami");
  check("T3.5: whoami derives from site.ts", (await logText()).includes("Ramu Roy"));
  await run("ls projects");
  const ls = await logText();
  check("T3.5: ls projects lists flagship slugs + grid count", ls.includes("eos/") && ls.includes("+ 15 more"));
  await run("cat resume.txt");
  const pdfLink = await page.evaluate(() => !!document.querySelector('.term__scroll a[href="/Ramu_Roy_Resume.pdf"][download]'));
  check("T3.5: cat resume.txt prints resume + pdf link", pdfLink);
  await run("dmesg");
  check("T3.5: dmesg replays the boot ring buffer", (await logText()).includes("rauc: booted slot A"));
  await run("i2cdetect");
  const i2c = await page.evaluate(() => {
    const grids = document.querySelectorAll(".term__block--grid");
    const g = grids[grids.length - 1];
    return g && g.getAttribute("role") === "img" && (g.getAttribute("aria-label") || "").includes("AHT10") && g.textContent.includes("38");
  });
  check("T3.5: i2cdetect grid is role=img with summary label, 0x38 present", !!i2c);
  await run("<img src=x onerror=alert(1)>");
  const safe = await page.evaluate(() => !document.querySelector(".term__scroll img"));
  check("T3.5: injected markup renders as text only", safe && (await logText()).includes("command not found"));
  await page.press(".term__input", "ArrowUp");
  check("T3.5: history recall", (await page.inputValue(".term__input")).length > 0);
  await page.fill(".term__input", "who");
  await page.press(".term__input", "Tab");
  check("T3.5: unique-prefix tab completion", (await page.inputValue(".term__input")) === "whoami ");
  // backtick typed IN the input stays literal (by design)
  await page.fill(".term__input", "");
  await page.keyboard.press("Backquote");
  const literal = await page.inputValue(".term__input");
  const stillOpen = await page.evaluate(() => document.getElementById("rr-term").hasAttribute("data-open"));
  check("T3.5: backtick inside input types literally, stays open", literal === "\u0060" && stillOpen);
  await page.fill(".term__input", "");
  await page.press(".term__input", "Escape");
  await page.waitForTimeout(300);
  const closedState = await page.evaluate(() => ({
    closed: !document.getElementById("rr-term").hasAttribute("data-open"),
    inert: document.getElementById("rr-term").hasAttribute("inert"),
  }));
  check("T3.5: Escape closes and re-inerts", closedState.closed && closedState.inert);
  await page.keyboard.press("Backquote");
  await page.waitForTimeout(300);
  check("T3.5: backtick from page focus opens", await page.evaluate(() => document.getElementById("rr-term").hasAttribute("data-open")));
  await run("open projects");
  await page.waitForTimeout(400);
  check("T3.5: open <section> navigates and closes", await page.evaluate(() =>
    window.location.hash === "#projects" && !document.getElementById("rr-term").hasAttribute("data-open")));
  check("T3.5: exactly one console signature", sigCount === 1, String(sigCount));
  check("T3.5/tier3: zero console errors", t3errors.length === 0, t3errors.slice(0, 2).join(" | "));
  // reboot LAST — it reloads the page
  await page.keyboard.press("Backquote");
  await page.waitForTimeout(300);
  await page.fill(".term__input", "reboot");
  await Promise.all([page.waitForNavigation(), page.press(".term__input", "Enter")]);
  await page.waitForTimeout(400);
  check("T3.5: reboot replays the boot intro", await page.evaluate(() => !!document.querySelector(".boot.is-active")));
  await ctx.close();
}

// ---------- 9. Tier 3 spec tests: RM, touch, print, caps, guards ----------
{
  // page-input backtick guard + scrollback cap + non-modal scroll
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await ctx.addInitScript(() => { try { sessionStorage.setItem("rr_boot", "1"); } catch {} });
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.evaluate(() => {
    const inp = document.createElement("input");
    inp.id = "tmp-guard-input";
    document.querySelector("main").prepend(inp);
    inp.focus();
  });
  await page.keyboard.press("Backquote");
  await page.waitForTimeout(200);
  const guarded = await page.evaluate(() => !document.getElementById("rr-term").hasAttribute("data-open"));
  check("T3.5: backtick ignored while a page input is focused", guarded);
  await page.evaluate(() => document.getElementById("tmp-guard-input").remove());
  await page.locator(".footer__term-open").scrollIntoViewIfNeeded();
  await page.locator(".footer__term-open").click();
  await page.waitForTimeout(320);
  for (let i = 0; i < 65; i++) {
    await page.fill(".term__input", "echo " + i);
    await page.press(".term__input", "Enter");
  }
  const blocks = await page.evaluate(() => document.querySelector(".term__scroll").childElementCount);
  check("T3.5: scrollback capped at 60 blocks", blocks <= 60, String(blocks));
  const y0 = await page.evaluate(() => window.scrollY);
  await page.mouse.move(700, 200);
  await page.mouse.wheel(0, -600);
  await page.waitForTimeout(200);
  const scrolled = await page.evaluate(() => window.scrollY) !== y0;
  check("T3.5: non-modal — page scrolls behind the open drawer", scrolled);
  await ctx.close();
}
{
  // reduced motion: instant open/close, commands work
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.locator(".footer__term-open").scrollIntoViewIfNeeded();
  await page.locator(".footer__term-open").click();
  await page.waitForTimeout(80);
  const rmOpen = await page.evaluate(() => {
    const t = document.getElementById("rr-term");
    return t.hasAttribute("data-open") && getComputedStyle(t).transform === "none" && getComputedStyle(t).visibility === "visible";
  });
  check("T3.5 RM: opens instantly (no transition lag)", rmOpen);
  await page.fill(".term__input", "help");
  await page.press(".term__input", "Enter");
  await page.waitForTimeout(150);
  check("T3.5 RM: commands work", await page.evaluate(() => document.querySelector(".term__scroll").textContent.includes("replay the boot intro")));
  await ctx.close();
}
{
  // mobile touch: hint always visible, targets, input font size
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const page = await ctx.newPage();
  await ctx.addInitScript(() => { try { sessionStorage.setItem("rr_boot", "1"); } catch {} });
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.locator(".footer__term-open").scrollIntoViewIfNeeded();
  const hintVisible = await page.evaluate(() => getComputedStyle(document.querySelector(".footer__term-hint")).opacity === "1");
  check("T3.5 touch: console hint visible without hover", hintVisible);
  await page.locator(".footer__term-open").tap();
  await page.waitForTimeout(350);
  const touch = await page.evaluate(() => ({
    open: document.getElementById("rr-term").hasAttribute("data-open"),
    closeH: document.querySelector(".term__close").getBoundingClientRect().height,
    font: parseFloat(getComputedStyle(document.querySelector(".term__input")).fontSize),
  }));
  check("T3.5 touch: tap opens, exit ≥44px, input ≥16px", touch.open && touch.closeH >= 44 && touch.font >= 16, JSON.stringify(touch));
  await page.locator(".term__close").tap();
  await page.waitForTimeout(300);
  check("T3.5 touch: [ exit ] closes", await page.evaluate(() => !document.getElementById("rr-term").hasAttribute("data-open")));
  await ctx.close();
}
{
  // print: terminal absent, static colophon back
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 1400 } });
  const page = await ctx.newPage();
  await ctx.addInitScript(() => { try { sessionStorage.setItem("rr_boot", "1"); } catch {} });
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });
  const printState = await page.evaluate(() => ({
    term: getComputedStyle(document.getElementById("rr-term")).display,
    btn: getComputedStyle(document.querySelector(".footer__term-open")).display,
    colophon: getComputedStyle(document.querySelector(".footer__colophon--static")).display,
  }));
  check("T3.5 print: terminal + trigger hidden, static colophon shown",
    printState.term === "none" && printState.btn === "none" && printState.colophon === "block", JSON.stringify(printState));
  await ctx.close();
}

await browser.close();
const fails = results.filter(([ok]) => !ok);
console.log(`\n${results.length - fails.length}/${results.length} checks passed`);
process.exit(fails.length ? 1 : 0);

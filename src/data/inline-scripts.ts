/* =====================================================================
   INLINE SCRIPTS — single source of truth.
   Astro's CSP hashes processed scripts but not is:inline ones, so these are
   authored as strings, emitted with set:html, and their hashes registered in
   Layout.astro (component-level insertScriptHash calls do not reach the
   emitted CSP meta). scripts/check-build.mjs re-hashes every inline script
   in dist/index.html and fails the build if one is missing from the CSP.
   ===================================================================== */

/** Enables JS-gated styles before first paint (avoids reveal flash). */
export const jsFlagScript = `document.documentElement.classList.add("js");`;

/**
 * First-visit boot overlay: session-gated, reduced-motion-bypassed, makes the
 * page behind it inert while active (honest dialog semantics), dismisses on
 * skip/Escape/timeout, and removes itself on the wipe's animationend with a
 * safety-net timeout in case animations never run.
 */
export const bootScript = `(() => {
  const boot = document.getElementById("boot-intro");
  if (!boot) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let seen = false;
  try { seen = sessionStorage.getItem("rr_boot") === "1"; } catch { /* storage may be blocked */ }
  if (reduceMotion || seen) { boot.remove(); return; }
  try { sessionStorage.setItem("rr_boot", "1"); } catch { /* the intro may simply repeat later */ }
  // Query at call time: this script executes during parsing, before nav/main/
  // footer exist, so a snapshot here would always be empty.
  const setInert = (on) => {
    document.querySelectorAll("nav, main, footer, .skip-link").forEach((el) => { el.inert = on; });
  };
  const skip = boot.querySelector(".boot__skip");
  let dismissed = false;
  let timer = 0;
  const finish = () => {
    if (!document.body.contains(boot)) return;
    const hadFocus = boot.contains(document.activeElement);
    boot.remove();
    setInert(false);
    document.body.style.overflow = "";
    if (hadFocus) document.getElementById("main")?.focus({ preventScroll: true });
    window.dispatchEvent(new Event("rr:boot-done"));
  };
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    window.clearTimeout(timer);
    boot.addEventListener("animationend", finish, { once: true });
    boot.classList.add("is-wiping");
    window.setTimeout(finish, 700);
  };
  boot.classList.add("is-active");
  document.body.style.overflow = "hidden";
  // The rest of the page exists only after parsing completes — apply inert then.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { if (!dismissed) setInert(true); }, { once: true });
  } else {
    setInert(true);
  }
  skip?.addEventListener("click", dismiss, { once: true });
  boot.addEventListener("keydown", (event) => {
    if (event.key === "Escape") dismiss();
  });
  window.requestAnimationFrame(() => skip?.focus({ preventScroll: true }));
  timer = window.setTimeout(dismiss, 1300);
})();`;

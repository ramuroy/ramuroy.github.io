/* =====================================================================
   TERMINAL DATA (T3.5) — every output line is derived from site.ts
   (D-009). No resume claims are authored here (D-016); the only literals
   are shell furniture and public datasheet constants (AHT10 = 0x38,
   ADS1115 = 0x48), and the i2c output labels itself as bench parts from the
   anti-collision card — resolved through figOf, never typed — rather than as
   properties of this webpage.
   ===================================================================== */
import { bootLines, education, experience, figOf, flagship, gridProjects, hero, nav, profile, termPrompt } from "./site";

export const PROMPT = termPrompt;
export const sectionIds = nav.map((n) => n.href.slice(1));

/* Every dispatchable word — used for unique-prefix Tab completion. */
export const COMMAND_NAMES = [
  "cat", "clear", "dmesg", "echo", "exit", "help",
  "i2cdetect", "ls", "open", "reboot", "sudo", "uname", "whoami",
];

const CMDS: [string, string][] = [
  ["help",           "this list"],
  ["whoami",         "id string"],
  ["ls projects",    "what's on the bench"],
  ["cat resume.txt", "plaintext resume (+ pdf)"],
  ["open <section>", "jump to a section"],
  ["dmesg",          "boot ring buffer"],
  ["uname -a",       "build info"],
  ["i2cdetect",      "probe the bus"],
  ["clear",          "clear scrollback (ctrl+l)"],
  ["reboot",         "replay the boot intro"],
  ["exit",           "close console (esc)"],
];
export const helpLines = [
  ...CMDS.map(([c, d]) => `${c.padEnd(17)}${d}`),
  `sections: ${sectionIds.join(" · ")}`,
];

export const whoamiLines = [
  `rr — ${profile.name}`,
  hero.eyebrow,
  profile.tagline,
  `${profile.githubHandle} · ${profile.email}`,
];

export const lsRootLines = ["projects/  resume.txt"];

const short = (s: string, n = 44) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);
const slugPad = Math.max(...flagship.map((f) => f.slug.length)) + 3;
export const lsProjectsLines = [
  ...flagship.map(
    (f) => `${(f.slug + "/").padEnd(slugPad)}# ${f.fig.toLowerCase().replace(/\s+/g, "")} · ${short(f.tagline.toLowerCase())}`
  ),
  `+ ${gridProjects.length} more in the grid — try: open projects`,
];

export const resumeLines = [
  `${profile.name.toUpperCase()} — ${profile.role.toUpperCase()}`,
  `${profile.location.toLowerCase()} · ${profile.email}`,
  "",
  "experience",
  ...experience.map((r) => `  ${r.company.toLowerCase()} — ${r.role.toLowerCase()} (${r.period.toLowerCase()})`),
  "",
  "education",
  ...education.map((e) => `  ${e.degree.toLowerCase()} — ${e.school.toLowerCase()} · ${e.grade.toLowerCase()}`),
];
export const resumeLink = { text: "Ramu_Roy_Resume.pdf", href: profile.resumeUrl };

export const dmesgLines = bootLines
  .filter((l) => l.ts)
  .map((l) => `[ ${l.ts} ] ${l.text}${l.ok ? "  [ ok ]" : ""}`);

/* Shell furniture, not claims — every clause verifiable: Astro static build,
   strict CSP meta, D-006 (works without js), colophon (no trackers), GitHub
   Pages host. PREEMPT_NONE is the joke: a static site has no runtime to
   preempt. rev.2026 mirrors hero.topmark. */
export const unameLine =
  "rr-portfolio rev.2026 astro-static #1 PREEMPT_NONE — strict csp · works without js · no trackers · github-pages";

export const i2cLines = [
  "     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f",
  "00:          -- -- -- -- -- -- -- -- -- -- -- -- --",
  "10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --",
  "20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --",
  "30: -- -- -- -- -- -- -- -- 38 -- -- -- -- -- -- --",
  "40: -- -- -- -- -- -- -- -- 48 -- -- -- -- -- -- --",
  "50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --",
  "60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --",
  "70: -- -- -- -- -- -- -- --",
];
/* The AHT10 and ADS1115 are the STM32 bench parts of the anti-collision build,
   so both strings point at that card by slug. The literals that used to live
   here went stale the moment new cards were inserted above it. */
const benchFig = figOf("industrial-anti-collision-system");
const benchFigNum = parseInt(benchFig.replace(/\D/g, ""), 10);
export const i2cNote = `# 0x38 aht10 · 0x48 ads1115 — bench parts (${benchFig.toLowerCase()}), not this webpage`;
export const i2cSummary =
  `i2c scan: devices at 0x38 (AHT10) and 0x48 (ADS1115) — bench parts from figure ${benchFigNum}, not this webpage.`;

export const motdLine = "connected /dev/ttyPF0 115200 8N1 — type 'help'";
export const sudoLine = "rr is not in the sudoers file. this incident will be reported.";
export const rmRebootNote = "# reduced motion is on — the boot intro stays suppressed";

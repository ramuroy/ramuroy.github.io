# Checkpoint — 2026-11-07, role, language and company name corrections

**The corrections are live.** Two deploys went out, the résumé moved first both
times, and the public surfaces now agree, except for the two items in section 5.
Supersedes the [2026-09-08 checkpoint](2026-09-08-release-and-profiles.md) as the
statement of current state. That document stays the record of the hardware release.

## 1. What happened, in order

1. A review of the LinkedIn profile on 2026-11-06 found the site, résumé and
   LinkedIn disagreeing. The owner confirmed which facts were true.
2. **Found the résumé source.** `Resume.tex` on `main` in `profile-workspace` was
   still the June version. The source of the published PDF sat on the unmerged
   branch `cv/hardware-refresh-2026-09-08`, the open item in the last checkpoint.
3. **Corrected the résumé, then the site** (D-024): Radiogeet title, Ampnics title
   and location, Japanese. Deployed on the owner's instruction (`23e0eea`).
4. **Merged the résumé branches** into `main` in `profile-workspace`.
5. **Corrected the GitHub profile README and the Anti-Collision README.**
6. **Corrected the company name** (D-025) in the résumé, the site, `og.png`, both
   READMEs and the Anti-Collision repo description. Deployed (`11e2e1a`).
7. **Moved the LinkedIn copy** to the private `linkedin` repo (D-026).

## 2. The company name

Every surface said "Tata Steel BlueScope", which was never the name. The first
fix proposed was Tata BlueScope Steel. A search before publishing showed that
Tata Steel had since bought out BlueScope and that the company now trades as Tata
Steel Colors. The change waited for the owner's choice. The reasoning is in D-025.

The name lived in four kinds of place, and a text search of one repository finds
only the first:

- copy in `src/data/site.ts`, the résumé and the READMEs;
- `TERMS` in `src/components/About.astro`, which drives the highlight and fails
  silently if it stops matching the copy;
- `public/og.png`, where it is baked into the image;
- GitHub metadata: the repo description and the account bio.

## 3. Evidence

Completed checks only.

- `npm run verify` passed before every commit touching `src/`, `public/` or `scripts/`.
- Both résumé rebuilds were compared with the published PDF. A rebuild of the
  unmodified source first matched its text exactly, so the toolchain introduced no
  content change. The corrected PDFs differ only in the intended lines, stay at 3
  pages and keep all 7 links.
- Live site fetched after each deploy: new strings present, old strings absent,
  and the live PDF and `og.png` byte-identical to the repository.
- Layout viewed at phone and desktop widths before the first deploy, and again on
  the live site after the second.
- All 21 public repositories and their descriptions searched for the old name. It
  remains only in the dated records in `docs/` and in `CHANGELOG.md`.

**Not checked:** the company's legal name in the registry, and the date of the
buyout, on which the sources disagree. No surface states a date.

## 4. Where things stand

| | |
|---|---|
| `main` | deployed and live at ramuroy.github.io |
| Résumé | 3 pages; `Resume.tex` on `main` in `profile-workspace` matches the PDF |
| Site | corrected, including `og.png` |
| GitHub profile README | corrected |
| Anti-Collision README and description | corrected |
| GitHub account bio | **old name, see section 5** |
| LinkedIn | checked text ready, **not applied** |

## 5. Open, and who owns it

**Owner:**

- **GitHub account bio.** Still has the old name. The login on this machine cannot
  edit account details, so the owner changes it at Settings → Profile, or grants
  the `user` scope with `gh auth refresh -h github.com -s user`.
- **LinkedIn.** Applied by hand, later. The checklist is
  `profile/update-plan.md` in the private `linkedin` repo.
- **Radiogeet on the résumé.** "Intern" left the title, so the résumé now says only
  "six-month engagement". Whether to add "(Internship)" is open. If it is added,
  the résumé changes first.
- **`pcbrouter` on the site and résumé.** It left the LinkedIn profile. Whether it
  stays here is open.

The earlier open items are unchanged: I1, I2, I3 and I6, and P6.

## 6. Notes for whoever picks this up

- **Check which branch holds a source before editing it**, and that it matches what
  is published. The stale `Resume.tex` looked current.
- **The résumé needs LaTeX.** On Fedora: `texlive-scheme-basic` plus `fontawesome5`,
  `xltabular`, `ltablex`, `titlesec`, `enumitem`, `multirow`, `needspace`, `parskip`
  and `tools`. Run `pdflatex Resume.tex` twice.
- **`og.png` was rendered with headless Firefox.** The method is in the comment in
  `scripts/og-card.html`. Headless Brave hung on this machine, twice.
- **Link previews are cached** by the sites that show them, so a link already shared
  can show the old card for a while.
- **`\mbox{formerly}`** in `Resume.tex` stops LaTeX breaking the word across lines.

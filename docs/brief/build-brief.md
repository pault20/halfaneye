# Half an Eye: website build brief

7 Nov 2026 · for the Claude Code build session · editor: Paul

Build halfaneye.org as a static Astro site that reads like a printed book. The writing chats in the Half an Eye Claude Project produce Markdown pages; the build turns each approved page into a finished web page with margin footnotes, numbered figures and a generated bibliography. Paul approves every page before it goes live.

## Read first

All in `docs/brief/` in this repo:

- `sitemap-and-phase-1.md`: every page, its URL slot, and what launches first.
- `writing-style-guide.md`: the page templates and footnote format the build must render.
- `visual-asset-methodology.md`: figure, photo and credit rules.
- `design-system/`: `README.md` (design rules), `tokens.css`, `tokens.json`, `bundle.css` (component styles, `eb-` classes) and `components.md` (each component's rules and reference HTML).
- `prototypes/*.dc.html`: six approved page designs (home and contents, chapter, chapter on a phone, Atlas index, Atlas entry, claim page). Match them. The `<sc-for>`/`<sc-if>` tags are prototype templating; read them as loops and conditions.

## Decisions already made

| Area | Decision |
| --- | --- |
| Framework | Astro (latest stable), `output: 'static'`. No server, no database, no logins. |
| Language | TypeScript, plain CSS from the design system. No Tailwind, no UI framework. Small vanilla-JS scripts only where a page needs interaction. |
| Repo | New GitHub repo `halfaneye` on Paul's personal account (pault20). Paul creates it empty; the session works in it. |
| Hosting | Vercel, Paul's personal account (paulthewlis-gmailcoms-projects), Git integration: every PR gets a preview URL, `main` deploys to production. |
| Domain | halfaneye.org, registered at Namecheap, pointed at Vercel through Namecheap Advanced DNS. `www` redirects to the apex. |
| Search | Pagefind, built at deploy time. |
| Fonts | Self-hosted with Fontsource (Literata, IBM Plex Sans Condensed, IBM Plex Mono). This overrides the design system's Google Fonts import, so no reader data goes to Google. |
| Analytics | Vercel Web Analytics (cookie-free, so no consent banner). |
| Licences | Text and original figures CC BY 4.0; code MIT; each photo under its own licence, shown in its credit. |
| Language | `en-GB`. |

## Content model

Content collections in `src/content/`, one Markdown file per page:

| Collection | File | URL |
| --- | --- | --- |
| `chapters` | `04.md` | `/chapter/4/` |
| `atlas` | `great-scallop.md` | `/atlas/great-scallop/` |
| `claims` | `what-use-is-half-an-eye.md` | `/claims/what-use-is-half-an-eye/` |
| `pages` | `preface.md`, `how-to-use.md`, `about.md` | `/preface/` etc. |
| `glossary` | one YAML file of terms | `/glossary/` |
| `changelog` | one YAML file of entries | `/changelog/` |
| `credits` | `image-credits.json` | `/credits/` |

URLs are permanent once published. Chapter and section numbers never change.

Front matter follows the style guide's templates, plus one field the build adds:

```yaml
status: draft        # draft | published
```

Only `published` pages appear on production; previews show drafts with a "Draft — not fact-checked" banner. Paul changes the status by approving the PR that sets it.

## Rendering rules

1. **Footnotes become sidenotes.** `text.[^14]` and `[^14]: …` (remark-gfm footnotes) render as the design system's Sidenote: the marker in `accent`, the note in the right margin beside its paragraph on wide screens, beneath the paragraph below 960px, and as a tap-open popover below 720px. Numbering restarts on each page. A sentence with two markers shows both.
2. **Figures.** `:::figure 4.2` … `:::` blocks (remark-directive) render as the Figure component: "FIG. 4.2", the caption text, and a credit line read from the credits ledger. The image is `src/figures/chapter-4/4-2.svg` (or `.jpg`/`.webp` for photos). Missing image → a labelled placeholder plate in preview, a build error for a `published` page.
3. **Headings.** `## 4.1 Section title` keeps Astro's default slug (`#41-section-title`), so the draft's own "Key evidence" links work unchanged. The left contents panel lists sections; the top bar shows reading progress.
4. **Editor's notes never publish.** Everything from `## Editor's notes` to the end of a file is stripped at build.
5. **Tables.** GFM tables, styled from the design system; an italic line straight after a table is its note.
6. **Chapter furniture.** ChapterOpener (part colour, numeral, standfirst, dates, reading time), ChapterNav (previous/next), "Cite this page" box (title, site, URL, last revised date, in a copyable plain-text citation).
7. **Glossary links.** The first use of each glossary term in a page links to its glossary entry.

## Generated pages

- **Bibliography.** Collected from every published page's footnotes, de-duplicated by DOI (else by normalised text), sorted by first author, each entry listing the pages that cite it.
- **Credits.** Every image from `image-credits.json`: what it shows, author, licence, source link, which figure uses it.
- **Changelog.** From `changelog.yaml`, newest first; each page also shows its own first published and last revised dates.
- **Contents (home).** The full sitemap with every chapter listed. Pages not yet published show greyed as "coming", not as links.
- **Atlas index.** The filterable grid from the prototype, built from the `atlas` collection's front matter (eye type, group, key figure).
- **Claims index.** From the `claims` collection.
- `sitemap.xml`, RSS of new and revised pages, 404 page.

## Build guards

The build fails if a `published` page has any of:

- a footnote marker with no note, or a note with no marker;
- `[to confirm]`, `[Title to confirm]`, `p.[`, `TODO` or `unverified`;
- a figure with no image or no credit line;
- an image with no alt text;
- a broken internal link.

## Quality bar

- Matches the prototypes at 390px, 768px and 1440px, in light and dark themes.
- WCAG 2.2 AA: contrast as set in the tokens, keyboard use throughout, visible focus ring, `prefers-reduced-motion` honoured (animations show their last frame with step buttons).
- Lighthouse 95+ on performance, accessibility, best practice and SEO for the home page and Chapter 4.
- Pages work with JavaScript off, apart from search and the Atlas filter.
- Each page has a title, description and an Open Graph image (generated from the chapter title and part colour), so a link dropped into a debate previews well.

## Milestones

One PR per milestone. The session checks each PR itself (build, guards, screenshots at the three widths) before handing it to Paul with a very short summary. Paul merges.

1. **Skeleton.** Repo, Astro, design tokens and fonts, page shell (top bar, contents panel, footer with licence), home/contents, the chapter template with sidenotes and figures, tested with a sample chapter built from the Chapter prototype's text (`status: draft`, clearly marked as sample). No real chapter text goes in until Paul approves it. Vercel project connected; preview URL works.
2. **Atlas and claims.** Atlas index with filter, Atlas entry template, claims index and claim template, using the prototype pages' sample content as drafts.
3. **Reference apparatus.** Bibliography, glossary with first-use links, credits, changelog, Cite this page, Pagefind search, Open Graph images, build guards.
4. **Launch.** halfaneye.org connected, front matter pages (preface, how to use, about with the AI disclosure), production checks (Lighthouse, accessibility, link check). The first chapter goes live when Paul marks it published.

## After launch: publishing a page

1. A page clears the five gates in the Claude Project (research, draft, fact-check, visual brief, approval).
2. Paul asks for the page to be published.
3. The approved Markdown is added to `src/content/` with its figures and credits, `status: published` and a changelog entry, in a PR.
4. Paul checks the preview and merges.

## For the session

- Use Sonnet unless a step needs design judgement across many files.
- Never commit to `main` directly or push without Paul's go-ahead; work on branches and open PRs.
- Never ask Paul for tokens or secrets in chat. Vercel and GitHub are connected through their own sign-ins.
- Don't ask Paul to choose between technical options; this brief settles them. Bring him only questions about what the site should do.

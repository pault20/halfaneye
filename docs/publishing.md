# Publishing a page

A page is published by a pull request that sets `status: published`. Production (`VERCEL_ENV=production`) builds only published pages; previews show drafts with a banner.

1. The page clears the five gates in the Claude Project (research, draft, fact-check, visual brief, approval).
2. Paul asks for the page to be published.
3. In one PR, add:
   - the Markdown file in `src/content/` (`chapters/04.md`, `atlas/<slug>.md`, `claims/<slug>.md`, `pages/<slug>.md`) with `status: published`, `first_published` and `last_revised` dates;
   - its figures in `src/figures/chapter-N/` (or `atlas-N/`) and one entry per image in `src/content/credits/image-credits.json`, with alt text;
   - new glossary terms in `src/content/glossary/glossary.yaml` (set `status: published`);
   - a changelog entry in `src/content/changelog/changelog.yaml` (set `status: published`).
4. Remove `sample: true` from any front matter, and delete the "Editor's notes" section only if it is no longer needed (it never publishes).
5. Check the build: `npm run build` runs the guards. Then, with the published build, `npm run a11y` and `npm run lighthouse -- /chapter/4/`.
6. Paul checks the preview and merges. `main` deploys to production.

## Build guards

A published page fails the build for: an unmatched footnote marker or note, `[to confirm]`, `[Title to confirm]`, `p.[`, `TODO`, `unverified`, a figure with no image or no credit line, an image with no alt text, or a broken internal link.

## Hosting

Vercel project `halfaneye` (Git integration). `halfaneye.org` is attached to it and `www.halfaneye.org` redirects to the apex (set in Vercel's domain settings). Vercel Web Analytics needs enabling once in the project's Analytics tab; the script is already in the layout.

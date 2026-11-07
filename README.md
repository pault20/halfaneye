# Half an Eye

Source for [halfaneye.org](https://halfaneye.org): an open book on the evolution of the eye, built as a static Astro site.

- Build brief and design system: `docs/brief/`
- Content: Markdown in `src/content/` (`status: draft | published`). Production (`VERCEL_ENV=production`) builds only `published` pages; previews and local builds show drafts with a banner. Use `HIDE_DRAFTS=1` to mimic production locally.
- Figures: `src/figures/chapter-N/N-M.svg|jpg|webp`, credited through `src/content/credits/image-credits.json`.
- `src/styles/tokens.css` and `bundle.css` are generated from `docs/brief/design-system/` by `npm run sync:design` (runs automatically before dev and build).

```bash
npm install
npm run dev
npm run build
```

Text and original figures: CC BY 4.0. Code: MIT. Photos: each under its own licence, shown in its credit.

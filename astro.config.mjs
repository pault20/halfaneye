import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { remarkEditorsNotes } from './src/plugins/remark-editors-notes.mjs';
import { remarkSidenotes } from './src/plugins/remark-sidenotes.mjs';
import { remarkFigures } from './src/plugins/remark-figures.mjs';
import { remarkKeyEvidence } from './src/plugins/remark-key-evidence.mjs';
import { figuresAssets } from './src/plugins/figures-assets.mjs';

export default defineConfig({
  site: 'https://halfaneye.org',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [figuresAssets()],
  markdown: {
    // Astro 7 defaults to a different Markdown engine; the footnote, figure and
    // editor's-notes rules are remark plugins, so use the remark processor.
    // Order matters: strip editor's notes first, then figures, then footnotes.
    processor: unified({
      gfm: true,
      smartypants: true,
      remarkPlugins: [remarkEditorsNotes, remarkFigures, remarkKeyEvidence, remarkSidenotes],
    }),
  },
});

// Accessibility audit: axe-core (WCAG 2.2 AA rules) on every page in the sitemap,
// light and dark, at 390, 768 and 1440px. Usage: npm run build && npm run a11y
// Needs Playwright with a Chromium available (preinstalled in cloud sessions).
import { createRequire } from 'node:module';
import { serve } from './serve.mjs';
import { readFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const { server, base } = await serve();

const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const paths = [...sitemap.matchAll(/<loc>https:\/\/halfaneye\.org([^<]*)<\/loc>/g)].map((m) => m[1]);
paths.push('/search/', '/404.html');

const browser = await chromium.launch();
let failures = 0;
for (const scheme of ['light', 'dark']) {
  for (const width of [390, 768, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    for (const p of paths) {
      await page.goto(base + p, { waitUntil: 'load' });
      await page.evaluate(axeSource);
      const res = await page.evaluate(() =>
        // @ts-ignore
        axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }),
      );
      for (const v of res.violations) {
        failures++;
        console.log(`${scheme} ${width} ${p}: ${v.id} (${v.impact}) ${v.help}\n   ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
      }
    }
    await ctx.close();
  }
}
await browser.close();
server.close();
console.log(failures ? `\n${failures} accessibility violations` : `a11y ok: ${paths.length} pages × 6 views`);
process.exit(failures ? 1 : 0);

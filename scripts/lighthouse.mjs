// Lighthouse on the home page and a chapter (mobile and desktop). Usage: npm run build && npm run lighthouse -- /chapter/4/
// Needs a Chromium: set CHROME_PATH, or it uses /opt/pw-browsers/chromium (cloud sessions).
import { createRequire } from 'node:module';
import { serve } from './serve.mjs';
import { launch } from 'chrome-launcher';

const require = createRequire(import.meta.url);
const lighthouse = (await import('lighthouse')).default;
const chromePath = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium';
const chapter = process.argv[2] ?? '/chapter/4/';
const { server, base } = await serve();
const chrome = await launch({ chromePath, chromeFlags: ['--headless=new', '--no-sandbox', '--no-proxy-server'] });
let low = 0;
for (const path of ['/', chapter]) {
  for (const preset of ['mobile', 'desktop']) {
    const config = preset === 'desktop' ? (await import('lighthouse/core/config/desktop-config.js')).default : undefined;
    const { lhr } = await lighthouse(base + path, { port: chrome.port, output: 'json', logLevel: 'error' }, config);
    if (lhr.runtimeError) console.error(`  ${lhr.runtimeError.code}: ${lhr.runtimeError.message}`);
    const scores = Object.entries(lhr.categories).filter(([k]) => ['performance', 'accessibility', 'best-practices', 'seo'].includes(k)).map(([k, c]) => [k, Math.round((c.score ?? 0) * 100)]);
    console.log(`${preset.padEnd(7)} ${path.padEnd(14)} ${scores.map(([k, v]) => `${k} ${v}`).join(' · ')}`);
    for (const [k, v] of scores) if (v < 95) low++;
  }
}
await chrome.kill();
server.close();
process.exit(low ? 1 : 0);

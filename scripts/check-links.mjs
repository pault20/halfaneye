// Build guard: no broken internal links or images on published pages.
// Runs after `astro build`. Draft pages (preview builds) only produce warnings.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const dist = 'dist';
const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) pages.push(p);
  }
})(dist);

const urlOf = (file) => '/' + file.slice(dist.length + 1).replace(/index\.html$/, '').replace(/\.html$/, '');
const html = new Map(pages.map((f) => [f, readFileSync(f, 'utf8')]));
const ids = new Map();
const idsFor = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...html.get(file).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
};

function resolve(pathname) {
  const clean = decodeURI(pathname);
  const candidates = [join(dist, clean, 'index.html'), join(dist, clean + '.html'), join(dist, clean)];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

const errors = [];
const warnings = [];
for (const [file, text] of html) {
  const published = /<meta name="page-status" content="published"/.test(text);
  const base = urlOf(file);
  const refs = [...text.matchAll(/<(?:a|img)\b[^>]*?\b(?:href|src)="([^"]*)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (!ref || /^(https?:|mailto:|tel:|data:)/i.test(ref)) continue;
    const [pathPart, frag] = ref.split('#');
    const pathname = pathPart ? new URL(pathPart, 'http://x' + base).pathname : base;
    const target = resolve(pathname);
    let problem = null;
    if (!target) problem = `${ref} (no such page)`;
    else if (frag && target.endsWith('.html') && !idsFor(target).has(decodeURIComponent(frag))) problem = `${ref} (no such anchor)`;
    if (problem) (published ? errors : warnings).push(`${base}: ${problem}`);
  }
}

for (const w of warnings) console.warn(`link warning (draft page): ${w}`);
if (errors.length) {
  console.error(`\nBroken links on published pages:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`links ok: ${pages.length} pages checked${warnings.length ? `, ${warnings.length} warnings on drafts` : ''}`);

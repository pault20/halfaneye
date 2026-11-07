import { visit } from 'unist-util-visit';
import { toString, frontmatter } from './util.mjs';

// Build guards for `published` pages. Footnote and figure guards live in
// remark-sidenotes.mjs and remark-figures.mjs; link checking runs after the
// build in scripts/check-links.mjs.
const BANNED = [
  { re: /\[to confirm\]/i, name: '[to confirm]' },
  { re: /\[title to confirm\]/i, name: '[Title to confirm]' },
  { re: /\bp\.\[/, name: 'p.[' },
  { re: /\bTODO\b/, name: 'TODO' },
  { re: /\bunverified\b/i, name: 'unverified' },
];

export function remarkGuards() {
  return (tree, file) => {
    const fm = frontmatter(file);
    if (fm.status !== 'published') return;
    const problems = [];

    // Everything that will publish: body text (editor's notes already stripped) and front matter.
    const sources = [toString(tree), ...Object.values(fm).filter((v) => typeof v === 'string')];
    // toString() skips the children of some nodes' siblings poorly for html; add raw values too.
    visit(tree, (n) => { if (typeof n.value === 'string') sources.push(n.value); });
    for (const { re, name } of BANNED) {
      if (sources.some((s) => re.test(s))) problems.push(`contains "${name}"`);
    }

    visit(tree, ['image', 'imageReference'], (n) => {
      if (!n.alt || !n.alt.trim()) problems.push(`image ${n.url ?? n.identifier ?? ''} has no alt text`);
    });
    visit(tree, 'html', (n) => {
      for (const m of n.value.matchAll(/<img\b[^>]*>/gi)) {
        if (!/\balt="[^"]+"/i.test(m[0])) problems.push('an <img> has no alt text');
      }
    });

    if (problems.length) throw new Error(`${file.path}: ${[...new Set(problems)].join('; ')}`);
  };
}

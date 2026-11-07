import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { visit, SKIP } from 'unist-util-visit';

// The first use of each glossary term on a page links to its glossary entry.
// Runs last, so it never touches headings, existing links, notes or figure captions.
const SHOW_DRAFTS = process.env.VERCEL_ENV !== 'production' && process.env.HIDE_DRAFTS !== '1';
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let cache;
function terms() {
  if (cache) return cache;
  const list = parse(readFileSync(join(process.cwd(), 'src/content/glossary/glossary.yaml'), 'utf8')) ?? [];
  const live = list.filter((t) => SHOW_DRAFTS || t.status === 'published');
  const names = live.flatMap((t) => [t.term, ...(t.aliases ?? [])].map((name) => ({ name, id: t.id })));
  names.sort((a, b) => b.name.length - a.name.length); // longest match first
  const re = names.length
    ? new RegExp(`\\b(${names.map((n) => esc(n.name)).join('|')})(?:s|es)?\\b`, 'i')
    : null;
  const byName = new Map(names.map((n) => [n.name.toLowerCase(), n.id]));
  return (cache = { re, byName });
}

const SKIP_TYPES = new Set(['heading', 'link', 'linkReference', 'code', 'inlineCode', 'html', 'eb-div', 'eb-aside', 'eb-figure', 'eb-key', 'eb-a']);

export function remarkGlossary() {
  return (tree) => {
    const { re, byName } = terms();
    if (!re) return;
    const used = new Set();
    visit(tree, (node, index, parent) => {
      if (SKIP_TYPES.has(node.type)) return SKIP;
      if (node.type !== 'text' || !parent || index == null) return;
      const parts = [];
      let rest = node.value;
      let changed = false;
      for (;;) {
        const m = rest.match(re);
        if (!m) break;
        const id = byName.get(m[1].toLowerCase());
        if (!id || used.has(id)) {
          // Already linked on this page: leave the text, keep scanning after it.
          parts.push({ type: 'text', value: rest.slice(0, m.index + m[0].length) });
          rest = rest.slice(m.index + m[0].length);
          continue;
        }
        used.add(id);
        changed = true;
        if (m.index > 0) parts.push({ type: 'text', value: rest.slice(0, m.index) });
        parts.push({
          type: 'link',
          url: `/glossary/#${id}`,
          data: { hProperties: { className: ['gloss'] } },
          children: [{ type: 'text', value: m[0] }],
        });
        rest = rest.slice(m.index + m[0].length);
      }
      if (!changed) return;
      if (rest) parts.push({ type: 'text', value: rest });
      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}

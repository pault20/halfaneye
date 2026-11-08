import { visit } from 'unist-util-visit';
import { frontmatter } from './util.mjs';

const el = (hName, hProperties, children = []) => ({
  type: `eb-${hName}`,
  data: { hName, hProperties },
  children,
});
const text = (value) => ({ type: 'text', value });

// Turns `text.[^1]` + `[^1]: note` into the design system's Sidenote:
//   marker  -> <a class="eb-cite" href="#sn-1" id="ref-1">1</a>
//   note    -> <aside class="eb-sidenote" id="sn-1"> placed straight after the
//              top-level block (paragraph, list…) that holds the marker.
// Notes for one block share a <div class="eb-notes"> so they stack in the margin.
// Numbers follow order of first use and restart on every page.
export function remarkSidenotes() {
  return (tree, file) => {
    const published = frontmatter(file).status === 'published';
    const problems = [];

    const defs = new Map();
    tree.children = tree.children.filter((n) => {
      if (n.type === 'footnoteDefinition') {
        defs.set(n.identifier, n);
        return false;
      }
      return true;
    });

    const numbers = new Map();
    const out = [];
    for (const block of tree.children) {
      const notes = [];
      visit(block, 'footnoteReference', (node, index, parent) => {
        let n = numbers.get(node.identifier);
        const first = !n;
        if (first) {
          n = numbers.size + 1;
          numbers.set(node.identifier, n);
          const def = defs.get(node.identifier);
          if (!def) problems.push(`footnote marker [^${node.label}] has no note`);
          notes.push(buildNote(n, def, node.label));
        }
        // A marker straight after another marker (no text between) gets a separating comma: "1,2".
        const prev = parent.children[index - 1];
        const follows = prev?.data?.hProperties?.className?.includes('eb-cite');
        const cls = follows ? ['eb-cite', 'eb-cite--follows'] : ['eb-cite'];
        parent.children[index] = el('a', { className: cls, href: `#sn-${n}`, ...(first ? { id: `ref-${n}` } : {}), ariaLabel: `Note ${n}` }, [text(String(n))]);
      });
      out.push(block);
      if (notes.length) out.push(el('div', { className: ['eb-notes'] }, notes));
    }
    tree.children = out;

    for (const id of defs.keys()) {
      if (!numbers.has(id)) problems.push(`footnote note [^${id}] has no marker`);
    }
    if (problems.length && published) {
      throw new Error(`${file.path}: ${problems.join('; ')}`);
    }
  };
}

function buildNote(n, def, label) {
  const inline = [];
  if (def) {
    for (const child of def.children) {
      if (inline.length) inline.push(text(' '));
      inline.push(...(child.children ?? []));
    }
  } else {
    inline.push(text(`Note [^${label}] is missing.`));
  }
  return el('aside', { className: ['eb-sidenote'], id: `sn-${n}`, role: 'note' }, [
    el('b', {}, [text(String(n))]),
    ...wrapDoi(inline),
  ]);
}

// "…8:960–976. doi:10.1038/nrn2283" -> DOI on its own line, linked.
function wrapDoi(nodes) {
  const last = nodes[nodes.length - 1];
  if (!last || last.type !== 'text') return nodes;
  const m = last.value.match(/^([\s\S]*?)\s*\bdoi:\s*(10\.\S+?)\s*$/i);
  if (!m) return nodes;
  const doi = m[2];
  const link = el('span', { className: ['eb-doi'] }, [
    el('a', { href: `https://doi.org/${doi}` }, [text(`doi:${doi}`)]),
  ]);
  return [...nodes.slice(0, -1), text(m[1] + ' '), link];
}

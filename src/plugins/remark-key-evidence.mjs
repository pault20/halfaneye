import { toString } from './util.mjs';

// Wraps "## Key evidence" and the list that follows it in <section class="eb-key">.
export function remarkKeyEvidence() {
  return (tree) => {
    const kids = tree.children;
    const i = kids.findIndex((n) => n.type === 'heading' && n.depth === 2 && /^key evidence$/i.test(toString(n).trim()));
    if (i === -1) return;
    const parts = [kids[i]];
    if (kids[i + 1]?.type === 'list') parts.push(kids[i + 1]);
    kids.splice(i, parts.length, {
      type: 'eb-key',
      data: { hName: 'section', hProperties: { className: ['eb-key'], ariaLabelledby: 'key-evidence' } },
      children: parts,
    });
  };
}

import { toString } from './util.mjs';

// Everything from "## Editor's notes" to the end of the file never publishes.
// Footnote definitions are lifted out first so notes written below the editor's
// notes still resolve for the text above.
export function remarkEditorsNotes() {
  return (tree) => {
    const kids = tree.children;
    const start = kids.findIndex(
      (n) => n.type === 'heading' && n.depth === 2 && /^editor['’]s notes\b/i.test(toString(n).trim()),
    );
    if (start === -1) return;
    const defs = kids.slice(start).filter((n) => n.type === 'footnoteDefinition');
    tree.children = [...kids.slice(0, start), ...defs];
  };
}

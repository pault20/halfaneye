import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { toString, frontmatter } from './util.mjs';

const ROOT = process.cwd();
const RASTER = ['jpg', 'jpeg', 'webp', 'png'];
const text = (value) => ({ type: 'text', value });
const el = (hName, hProperties, children = []) => ({ type: `eb-${hName}`, data: { hName, hProperties }, children });

function loadLedger() {
  const file = join(ROOT, 'src/content/credits/image-credits.json');
  if (!existsSync(file)) return [];
  const data = JSON.parse(readFileSync(file, 'utf8'));
  return Array.isArray(data) ? data : data.images ?? [];
}

function sourceName(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host.endsWith('wikimedia.org')) return 'Wikimedia Commons';
    if (host.endsWith('inaturalist.org')) return 'iNaturalist';
    if (host.endsWith('biodiversitylibrary.org')) return 'Biodiversity Heritage Library';
    if (host === 'doi.org') return `doi:${new URL(url).pathname.slice(1)}`;
    return host;
  } catch {
    return 'source';
  }
}

function creditNodes(entry) {
  const own = /^half an eye$/i.test(entry.author ?? '');
  if (own) {
    const kind = entry.kind ?? 'drawing';
    const label = { drawing: 'Drawing', chart: 'Chart', animation: 'Animation' }[kind] ?? 'Drawing';
    const basis = entry.after ? (kind === 'chart' ? ` Data: ${entry.after}.` : ` After ${entry.after}.`) : '';
    return [text(`${label}: Half an Eye, ${entry.licence}.${basis}`)];
  }
  const nodes = [text(`Photo: ${entry.author}, via `)];
  nodes.push({ type: 'link', url: entry.source_url, children: [text(sourceName(entry.source_url))] });
  nodes.push(text(`, ${entry.licence}.${entry.changes ? ` ${entry.changes}.` : ''}`));
  return nodes;
}

// Chapter figures: 4.2 -> src/figures/chapter-4/4-2.svg. Atlas figures: A7.1 -> src/figures/atlas-7/A7-1.svg.
const folderFor = (key) => (/^\d+$/.test(key) ? `chapter-${key}` : `atlas-${key.replace(/\D/g, '')}`);

function plateFor(num, chapter, n, entry, caption, problems) {
  const folder = folderFor(chapter);
  const dir = join(ROOT, 'src/figures', folder);
  const base = `${chapter}-${n}`;
  const alt = entry?.alt || caption;
  if (entry && !entry.alt) problems.push(`figure ${num}: ledger entry has no alt text`);

  // Teaching animations: an HTML fragment (SVG + controls) wired up by src/scripts/figure-animation.ts.
  const htmlPath = join(dir, `${base}.html`);
  if (existsSync(htmlPath)) {
    const html = readFileSync(htmlPath, 'utf8').replace(/<!--[\s\S]*?-->\s*/g, '').trim();
    return { kind: 'animation', node: { type: 'html', value: html.replaceAll('{{alt}}', alt.replace(/"/g, '&quot;')) } };
  }
  const svgPath = join(dir, `${base}.svg`);
  if (existsSync(svgPath)) {
    let svg = readFileSync(svgPath, 'utf8').replace(/<\?xml[^>]*\?>\s*/, '').replace(/<!--[\s\S]*?-->\s*/g, '').trim();
    svg = svg.replace(/<svg\b([^>]*)>/, (_, attrs) => {
      attrs = attrs.replace(/\s(role|aria-label|aria-hidden|width|height)="[^"]*"/g, '');
      return `<svg${attrs} role="img" aria-label="${alt.replace(/"/g, '&quot;')}">`;
    });
    return { kind: 'diagram', node: { type: 'html', value: svg } };
  }
  const raster = RASTER.find((ext) => existsSync(join(dir, `${base}.${ext}`)));
  if (raster) {
    return { kind: 'photo', node: el('img', { src: `/figures/${folder}/${base}.${raster}`, alt, loading: 'lazy', decoding: 'async' }) };
  }
  problems.push(`figure ${num}: no image at src/figures/${folder}/${base}.(svg|jpg|webp)`);
  return { kind: 'missing', node: el('div', { className: ['eb-figure__missing'], role: 'img', ariaLabel: `Placeholder for figure ${num}` }, [
    el('span', {}, [text(`FIG. ${num}`)]),
    el('span', {}, [text('Image not yet supplied')]),
  ]) };
}

// `:::figure 4.2` … `:::` blocks -> the Figure component.
export function remarkFigures() {
  return (tree, file) => {
    const published = frontmatter(file).status === 'published';
    const ledger = loadLedger();
    const problems = [];
    const kids = tree.children;
    const out = [];

    for (let i = 0; i < kids.length; i++) {
      const node = kids[i];
      const first = node.type === 'paragraph' ? node.children[0] : null;
      const open = first?.type === 'text' && first.value.match(/^:::figure[ \t]+([A-Za-z]?\d+)\.(\d+)[ \t]*(?:\n|$)/);
      if (!open) {
        out.push(node);
        continue;
      }
      const [prefix, chapter, n] = open;
      const num = `${chapter}.${n}`;
      first.value = first.value.slice(prefix.length);

      // Caption = inline content of the opening paragraph, up to the closing ":::".
      let caption = [...node.children];
      let closed = false;
      const last = caption[caption.length - 1];
      if (last?.type === 'text' && /(^|\n):::\s*$/.test(last.value)) {
        last.value = last.value.replace(/\n?:::\s*$/, '');
        closed = true;
      }
      // Or the caption continues in later paragraphs until a lone ":::".
      while (!closed && i + 1 < kids.length) {
        const next = kids[++i];
        if (next.type === 'paragraph' && toString(next).trim() === ':::') {
          closed = true;
        } else if (next.type === 'paragraph') {
          caption.push(text(' '), ...next.children);
        } else {
          problems.push(`figure ${num}: unexpected ${next.type} inside figure block`);
        }
      }
      if (!closed) problems.push(`figure ${num}: missing closing ":::"`);
      caption = caption.filter((c) => !(c.type === 'text' && c.value === ''));

      const captionText = toString({ type: 'paragraph', children: caption }).trim();
      const entry = ledger.find((e) => e.id === `fig-${chapter}-${n}`);
      if (!entry) problems.push(`figure ${num}: no credit line (add fig-${chapter}-${n} to image-credits.json)`);

      const plate = plateFor(num, chapter, n, entry, captionText, problems);
      const credit = entry ? creditNodes(entry) : [text('Credit to be added.')];
      out.push(
        el('figure', { className: ['eb-figure'], id: `fig-${chapter}-${n}` }, [
          el('div', { className: ['eb-figure__plate', `eb-figure__plate--${plate.kind}`] }, [plate.node]),
          el('figcaption', {}, [
            el('span', { className: ['eb-figure__num'] }, [text(`FIG. ${num}`)]),
            el('span', {}, caption),
            el('span', { className: ['eb-figure__credit'] }, credit),
          ]),
        ]),
      );
    }
    tree.children = out;

    if (problems.length && published) throw new Error(`${file.path}: ${problems.join('; ')}`);
  };
}

import type { APIRoute, GetStaticPaths } from 'astro';
import { readFileSync } from 'node:fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { visibleChapters, visibleAtlas, visibleClaims, visiblePages } from '../../lib/content';
import { parts } from '../../data/book';

// Open Graph images (1200×630), generated at build from the page title and its part colour.
const W = 1200;
const H = 630;
const font = (pkg: string, file: string) => readFileSync(`node_modules/${pkg}/files/${file}`);
const fonts = [
  { name: 'Literata', data: font('@fontsource/literata', 'literata-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
  { name: 'Literata', data: font('@fontsource/literata', 'literata-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Plex Condensed', data: font('@fontsource/ibm-plex-sans-condensed', 'ibm-plex-sans-condensed-latin-500-normal.woff'), weight: 500 as const, style: 'normal' as const },
  { name: 'Plex Mono', data: font('@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff'), weight: 500 as const, style: 'normal' as const },
];

// Light-theme colours from the design tokens.
const tokens = readFileSync('src/styles/tokens.css', 'utf8').split('[data-theme="dark"]')[0];
const token = (name: string) => tokens.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))![1];
const PAPER = token('paper');
const INK = token('ink');
const MUTED = token('muted');
const PART = [1, 2, 3, 4].map((n) => token(`part-${n}`));

interface Card { eyebrow: string; title: string; sub?: string; bands: string[]; }

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({ type, props: { style: { display: 'flex', ...style }, children } });

function tree(card: Card): Node {
  const long = card.title.length > 48;
  return h('div', { width: W, height: H, background: PAPER, color: INK }, [
    h('div', { flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: '64px 72px' }, [
      h('div', { flexDirection: 'column', gap: 20 }, [
        h('div', { fontFamily: 'Plex Mono', fontWeight: 500, fontSize: 26, color: MUTED, textTransform: 'uppercase' }, card.eyebrow),
        h('div', { fontFamily: 'Literata', fontWeight: 600, fontSize: long ? 60 : 84, lineHeight: 1.05, letterSpacing: -1.5 }, card.title),
        card.sub ? h('div', { fontFamily: 'Literata', fontWeight: 400, fontSize: 32, lineHeight: 1.3, color: MUTED }, card.sub) : h('div', {}, ''),
      ]),
      h('div', { fontFamily: 'Literata', fontWeight: 600, fontSize: 40 }, 'Half an Eye'),
    ]),
    h('div', { flexDirection: 'row', width: 168 }, card.bands.map((c, i) => h('div', { flex: card.bands.length === 1 ? 1 : [1, 1.5, 1.2, 1.4][i] ?? 1, background: c }))),
  ]);
}

async function cards(): Promise<Map<string, Card>> {
  const all = new Map<string, Card>();
  all.set('default', { eyebrow: 'An open book on the evolution of the eye', title: 'Half an Eye', sub: 'Every stage of the eye, still in use today.', bands: PART });
  for (const c of await visibleChapters()) {
    const part = parts.find((p) => p.n === c.data.part)!;
    all.set(`chapter-${c.data.chapter}`, {
      eyebrow: `Chapter ${c.data.chapter} · Part ${['I', 'II', 'III', 'IV'][part.n - 1]} · ${part.nm} nm`,
      title: c.data.title,
      sub: c.data.standfirst.length > 140 ? c.data.standfirst.slice(0, 137).trimEnd() + '…' : c.data.standfirst,
      bands: [PART[part.n - 1]],
    });
  }
  for (const a of await visibleAtlas()) {
    all.set(`atlas-${a.id}`, { eyebrow: `Atlas of Eyes · ${a.data.eye_type}`, title: a.data.common_name, sub: a.data.latin_name, bands: PART });
  }
  for (const p of await visiblePages()) {
    all.set(`page-${p.id}`, { eyebrow: 'Half an Eye', title: p.data.title, sub: p.data.standfirst, bands: PART });
  }
  for (const c of await visibleClaims()) {
    all.set(`claims-${c.id}`, { eyebrow: 'Claims and responses', title: c.data.claim, bands: PART });
  }
  return all;
}

export const getStaticPaths: GetStaticPaths = async () => [...(await cards()).keys()].map((slug) => ({ params: { slug } }));

export const GET: APIRoute = async ({ params }) => {
  const card = (await cards()).get(params.slug!)!;
  const svg = await satori(tree(card) as never, { width: W, height: H, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

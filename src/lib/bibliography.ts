import { getCollection } from 'astro:content';
import { showDrafts, visiblePages, pageUrl, visibleChapters, visibleAtlas, visibleClaims, chapterUrl, atlasUrl, claimUrl } from './content';

export interface BibEntry {
  key: string;
  html: string; // note text with emphasis as <em>, DOI removed
  doi?: string;
  sort: string;
  year: number;
  pages: { title: string; url: string }[];
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const norm = (s: string) => s.toLowerCase().replace(/[*_]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

/** Footnotes in a Markdown body that are used by text that will publish. */
export function sourcesIn(body: string): string[] {
  const used = body.split(/^## Editor['’]s notes\s*$/im)[0];
  const cited = new Set([...used.matchAll(/\[\^([^\]\s]+)\](?!:)/g)].map((m) => m[1]));
  const notes: string[] = [];
  for (const m of body.matchAll(/^\[\^([^\]\s]+)\]:[ \t]*(.+)$/gm)) {
    if (!cited.has(m[1])) continue;
    // "Lamb et al. 2007, as note 1" points back to an earlier note: not a new source.
    if (/\bas note \d+/i.test(m[2])) continue;
    notes.push(m[2].trim());
  }
  return notes;
}

/** Every source cited on a page that exists on this build, de-duplicated and sorted by first author. */
export async function bibliography(): Promise<BibEntry[]> {
  const pages = [
    ...(await visibleChapters()).map((c) => ({ title: `Chapter ${c.data.chapter}: ${c.data.title}`, url: chapterUrl(c.data.chapter), body: c.body ?? '' })),
    ...(await visibleAtlas()).map((a) => ({ title: `Atlas: ${a.data.common_name}`, url: atlasUrl(a.id), body: a.body ?? '' })),
    ...(await visiblePages()).map((p) => ({ title: p.data.title, url: pageUrl(p.id), body: p.body ?? '' })),
    ...(await visibleClaims()).map((c) => ({ title: `Claim: ${c.data.title}`, url: claimUrl(c.id), body: c.body ?? '' })),
  ];
  const entries = new Map<string, BibEntry>();
  for (const page of pages) {
    for (const note of sourcesIn(page.body)) {
      const doi = note.match(/\bdoi:\s*(10\.\S+?)\s*$/i)?.[1];
      const text = note.replace(/\s*\bdoi:\s*10\.\S+?\s*$/i, '');
      const key = doi ? `doi:${doi.toLowerCase()}` : norm(text);
      let e = entries.get(key);
      if (!e) {
        e = {
          key,
          doi,
          html: esc(text).replace(/\*([^*]+)\*/g, '<em>$1</em>'),
          sort: norm(text),
          year: Number(text.match(/\b(1[89]\d\d|20\d\d)\b/)?.[1] ?? 0),
          pages: [],
        };
        entries.set(key, e);
      }
      if (!e.pages.some((p) => p.url === page.url)) e.pages.push({ title: page.title, url: page.url });
    }
  }
  return [...entries.values()].sort((a, b) => a.sort.localeCompare(b.sort) || a.year - b.year);
}

export async function glossaryTerms() {
  const all = await getCollection('glossary');
  return all
    .filter((t) => showDrafts || t.data.status === 'published')
    .sort((a, b) => a.data.term.localeCompare(b.data.term, 'en-GB'));
}

export async function changelogEntries() {
  const all = await getCollection('changelog');
  return all
    .filter((e) => showDrafts || e.data.status === 'published')
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

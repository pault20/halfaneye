import { getCollection, type CollectionEntry } from 'astro:content';
import { parts } from '../data/book';

export type Chapter = CollectionEntry<'chapters'>;

// Production shows only `published` pages. Previews and local builds show drafts too.
export const showDrafts = process.env.VERCEL_ENV !== 'production' && process.env.HIDE_DRAFTS !== '1';

export const chapterUrl = (n: number) => `/chapter/${n}/`;

/** Chapters that exist on this build, in book order. */
export async function visibleChapters(): Promise<Chapter[]> {
  const all = await getCollection('chapters');
  return all
    .filter((c) => showDrafts || c.data.status === 'published')
    .sort((a, b) => a.data.chapter - b.data.chapter);
}

export interface TocItem {
  n: number;
  title: string;
  href: string | null; // null = not published yet ("coming")
  sample?: boolean;
}
export interface TocPart {
  n: 1 | 2 | 3 | 4;
  nm: number;
  title: string;
  items: TocItem[];
}

/** The full sitemap of chapters, marking which are live. */
export async function contents(): Promise<TocPart[]> {
  const live = new Map((await visibleChapters()).map((c) => [c.data.chapter, c]));
  return parts.map((p) => ({
    n: p.n,
    nm: p.nm,
    title: p.title,
    items: p.chapters.map((c) => {
      const entry = live.get(c.n);
      return {
        n: c.n,
        title: entry?.data.title ?? c.title,
        href: entry ? chapterUrl(c.n) : null,
        sample: entry?.data.sample,
      };
    }),
  }));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "12 Jan 2027" */
export function formatDate(d: Date): string {
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Reading time from the body, ignoring editor's notes. */
export function readingMinutes(body: string): number {
  const text = body.split(/^## Editor['’]s notes\s*$/im)[0];
  const words = text.replace(/^\[\^[^\]]+\]:.*$/gm, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

import { getCollection, type CollectionEntry } from 'astro:content';
import { parts } from '../data/book';

export type Chapter = CollectionEntry<'chapters'>;
export type AtlasEntry = CollectionEntry<'atlas'>;
export type Claim = CollectionEntry<'claims'>;
export type Page = CollectionEntry<'pages'>;

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

const live = <T extends { data: { status: string } }>(items: T[]) =>
  items.filter((e) => showDrafts || e.data.status === 'published');

/** Atlas entries that exist on this build, simplest light sensor first. */
export async function visibleAtlas(): Promise<AtlasEntry[]> {
  return live(await getCollection('atlas')).sort((a, b) => a.data.order - b.data.order);
}

/** Claim pages that exist on this build, in index order. */
export async function visibleClaims(): Promise<Claim[]> {
  return live(await getCollection('claims')).sort((a, b) => a.data.number - b.data.number);
}

/** Front matter pages (preface, how-to-use, about) that exist on this build, in book order. */
export async function visiblePages(): Promise<Page[]> {
  return live(await getCollection('pages')).sort((a, b) => a.data.order - b.data.order);
}
export const pageUrl = (id: string) => `/${id}/`;

export const atlasUrl = (id: string) => `/atlas/${id}/`;
export const claimUrl = (id: string) => `/claims/${id}/`;

/** Entries catalogued for the whole Atlas, published or not. */
export const ATLAS_CATALOGUED = 38;

/** Every internal URL that exists on this build, so links to unpublished pages can show as "coming". */
export async function liveRoutes(): Promise<Set<string>> {
  // Pages that are always built, even with nothing published.
  const routes = new Set<string>(['/', '/atlas/', '/claims/', '/glossary/', '/bibliography/', '/credits/', '/changelog/', '/search/']);
  for (const p of await visiblePages()) routes.add(pageUrl(p.id));
  for (const c of await visibleChapters()) routes.add(chapterUrl(c.data.chapter));
  for (const a of await visibleAtlas()) routes.add(atlasUrl(a.id));
  for (const c of await visibleClaims()) routes.add(claimUrl(c.id));
  return routes;
}

/** Splits `/chapter/4/#41-x` into its path; external links count as live. */
export function isLive(href: string, routes: Set<string>): boolean {
  if (/^[a-z]+:/i.test(href) || href.startsWith('#')) return true;
  return routes.has(href.split('#')[0]);
}

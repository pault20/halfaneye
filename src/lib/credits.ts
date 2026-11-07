import ledger from '../content/credits/image-credits.json';
import { liveRoutes, chapterUrl, atlasUrl, claimUrl } from './content';

export interface Credit {
  id: string; page: string; file: string; title: string; author: string; source_url: string;
  licence: string; changes?: string; retrieved?: string; alt: string; after?: string;
}

/** "fig-6-1" -> "Fig. 6.1", "fig-A7-1" -> "Fig. A7.1" */
export function figureLabel(id: string): string {
  const m = id.match(/^fig-([A-Za-z]?\d+)-(\d+)$/);
  return m ? `Fig. ${m[1]}.${m[2]}` : id;
}

/** The page a ledger entry belongs to: "chapter-6", "atlas-great-scallop", "claim-what-use…". */
export function pageUrl(page: string): string | null {
  let m;
  if ((m = page.match(/^chapter-(\d+)$/))) return chapterUrl(Number(m[1]));
  if ((m = page.match(/^atlas-(.+)$/))) return atlasUrl(m[1]);
  if ((m = page.match(/^claim-(.+)$/))) return claimUrl(m[1]);
  return null;
}

/** Ledger entries whose page exists on this build. */
export async function credits(): Promise<(Credit & { url: string })[]> {
  const routes = await liveRoutes();
  return (ledger as Credit[])
    .map((c) => ({ ...c, url: pageUrl(c.page) ?? '' }))
    .filter((c) => c.url && routes.has(c.url));
}

import type { APIRoute } from 'astro';
import { liveRoutes, visibleChapters, visibleAtlas, visibleClaims, visiblePages, chapterUrl, atlasUrl, claimUrl, pageUrl, isoDate } from '../lib/content';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export const GET: APIRoute = async ({ site }) => {
  const dates = new Map<string, Date | null | undefined>();
  for (const c of await visibleChapters()) dates.set(chapterUrl(c.data.chapter), c.data.last_revised);
  for (const a of await visibleAtlas()) dates.set(atlasUrl(a.id), a.data.last_revised);
  for (const c of await visibleClaims()) dates.set(claimUrl(c.id), c.data.last_revised);
  for (const p of await visiblePages()) dates.set(pageUrl(p.id), p.data.last_revised);

  const urls = [...(await liveRoutes())].filter((u) => u !== '/search/').sort();
  const body = urls
    .map((u) => {
      const d = dates.get(u);
      return `  <url><loc>${esc(new URL(u, site).href)}</loc>${d ? `<lastmod>${isoDate(d)}</lastmod>` : ''}</url>`;
    })
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};

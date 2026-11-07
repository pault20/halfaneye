import type { APIRoute } from 'astro';
import { liveRoutes } from '../lib/content';
import { changelogEntries } from '../lib/bibliography';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// New and revised pages, taken from the changelog.
export const GET: APIRoute = async ({ site }) => {
  const routes = await liveRoutes();
  const entries = (await changelogEntries()).filter((e) => routes.has(e.data.page));
  const items = entries
    .map((e) => {
      const link = new URL(e.data.page, site).href;
      return `    <item>
      <title>${esc(`${e.data.kind === 'published' ? 'New' : 'Revised'}: ${e.data.title}`)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="false">${esc(`${link}#${e.id}`)}</guid>
      <pubDate>${e.data.date.toUTCString()}</pubDate>
      <description>${esc(e.data.summary)}</description>
    </item>`;
    })
    .join('\n');
  const updated = entries[0]?.data.date ?? new Date(0);
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Half an Eye</title>
    <link>${esc(site!.href)}</link>
    <description>New and revised pages in Half an Eye, an open book on the evolution of the eye.</description>
    <language>en-gb</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
};

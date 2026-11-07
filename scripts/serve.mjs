// Minimal static server for the audits: serves dist/ like Vercel does (directory
// indexes, 404.html, gzip, long cache for hashed assets).
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { createGzip } from 'node:zlib';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.xml': 'application/xml', '.txt': 'text/plain', '.wasm': 'application/wasm', '.pf_meta': 'application/octet-stream',
};
const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.svg', '.xml', '.txt']);

export function serve(dir = 'dist', port = 0) {
  const root = join(process.cwd(), dir);
  const server = createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
    let file = normalize(join(root, url));
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    let status = 200;
    if (!existsSync(file)) { file = join(root, '404.html'); status = 404; }
    const ext = extname(file);
    const headers = { 'Content-Type': TYPES[ext] ?? 'application/octet-stream' };
    if (url.startsWith('/_astro/')) headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    const stream = createReadStream(file);
    if (COMPRESSIBLE.has(ext) && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(status, headers);
      stream.pipe(createGzip()).pipe(res);
    } else {
      res.writeHead(status, headers);
      stream.pipe(res);
    }
  });
  return new Promise((resolve) => server.listen(port, () => resolve({ server, base: `http://localhost:${server.address().port}` })));
}

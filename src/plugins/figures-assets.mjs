import { cpSync, existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const RASTER = new Set(['.jpg', '.jpeg', '.webp', '.png']);
const TYPES = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };

// Serves photos from src/figures at /figures/… (SVGs are inlined by remark-figures).
export function figuresAssets() {
  const src = join(process.cwd(), 'src/figures');
  return {
    name: 'figures-assets',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use('/figures', (req, res, next) => {
          const file = normalize(join(src, decodeURIComponent((req.url ?? '').split('?')[0])));
          const ext = extname(file).toLowerCase();
          if (!file.startsWith(src) || !RASTER.has(ext) || !existsSync(file) || !statSync(file).isFile()) return next();
          res.setHeader('Content-Type', TYPES[ext]);
          res.end(readFileSync(file));
        });
      },
      'astro:build:done': ({ dir }) => {
        if (!existsSync(src)) return;
        cpSync(src, join(fileURLToPath(dir), 'figures'), {
          recursive: true,
          filter: (p) => statSync(p).isDirectory() || RASTER.has(extname(p).toLowerCase()),
        });
      },
    },
  };
}

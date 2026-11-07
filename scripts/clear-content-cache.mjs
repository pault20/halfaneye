// Vercel restores Astro's content cache between builds. Rendered Markdown in that
// cache does not change when a remark plugin changes, so a fixed plugin can leave
// old output live. Clear it so every build renders content fresh.
import { rmSync } from 'node:fs';
for (const dir of ['.astro', 'node_modules/.astro']) rmSync(dir, { recursive: true, force: true });
console.log('content cache cleared');

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Dates are written "2027-01-12" in front matter and shown as "12 Jan 2027".
const date = z.coerce.date().nullish();

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/chapters' }),
  schema: z.object({
    part: z.number().int().min(1).max(4),
    chapter: z.number().int().min(1).max(16),
    title: z.string(),
    standfirst: z.string(),
    first_published: date,
    last_revised: date,
    status: z.enum(['draft', 'published']).default('draft'),
    // Template-test pages built from prototype text. Never real content.
    sample: z.boolean().default(false),
  }),
});

export const collections = { chapters };

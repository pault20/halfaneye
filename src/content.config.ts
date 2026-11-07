import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Dates are written "2027-01-12" in front matter and shown as "12 Jan 2027".
const date = z.coerce.date().nullish();

const status = z.enum(['draft', 'published']).default('draft');
const chapters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/chapters' }),
  schema: z.object({
    part: z.number().int().min(1).max(4),
    chapter: z.number().int().min(1).max(16),
    title: z.string(),
    standfirst: z.string(),
    first_published: date,
    last_revised: date,
    status,
    // Template-test pages built from prototype text. Never real content.
    sample: z.boolean().default(false),
  }),
});

const link = z.object({ label: z.string(), href: z.string() });

// Filter groups for the Atlas grid (fixed list from the catalogue).
export const eyeClasses = ['spot', 'lens', 'compound', 'mirror', 'lost'] as const;

const atlas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/atlas' }),
  schema: z.object({
    common_name: z.string(),
    latin_name: z.string(),
    eye_type: z.string(), // label shown on the card, e.g. "Mirror eye"
    eye_class: z.enum(eyeClasses), // which filter it belongs to
    animal_group: z.string(),
    key_figure: z.string(), // the one number that matters for this eye
    fact: z.string(), // one surprising fact, under 20 words
    standfirst: z.string(),
    order: z.number().int(), // simplest light sensor first, sharpest eye last
    glance: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    read_more: z.array(link).default([]),
    photo_note: z.string().optional(), // placeholder label until the photo is sourced
    first_published: date,
    last_revised: date,
    status,
    sample: z.boolean().default(false),
  }),
});

const claims = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/claims' }),
  schema: z.object({
    title: z.string(), // short form for lists, e.g. "What use is half an eye?"
    number: z.number().int(),
    claim: z.string(), // the claim in its strongest common wording
    attribution: z.string(),
    short_answer: z.string(), // 40–80 words
    evidence: z.array(link).default([]),
    first_published: date,
    last_revised: date,
    status,
    sample: z.boolean().default(false),
  }),
});

export const collections = { chapters, atlas, claims };

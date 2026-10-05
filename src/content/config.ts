import { defineCollection, z } from 'astro:content';

const poetry = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
  }),
});

const reflections = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), summary: z.string(), technologies: z.array(z.string()),
    category: z.string(), visualLabel: z.array(z.string()).min(1).max(3),
    status: z.string(), order: z.number().int().positive(), featured: z.boolean().default(false),
    // Release or start month, written as the 1st (e.g. 2026-05-01); shown month-only.
    // Optional: undated projects appear in the Index but not on the Almanac.
    date: z.date().optional(),
    // Still in active development: shown as "<month> – present" and drawn as a thread to today.
    ongoing: z.boolean().default(false),
    // Public source and a running version, when they exist.
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
  }),
});

// Drafts render on local and preview builds (with a badge) but never in production.
const draft = z.boolean().default(false);

// Chapters of life, written in Louis's own words. The latest open season is "now" on the
// About page, and every season is drawn as a labelled span on the Almanac.
const seasons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    start: z.date(),
    end: z.date().optional(),
    summary: z.string(),
    // Slug of a reflection that tells this season properly, once it's written.
    reflection: z.string().optional(),
    draft,
  }),
});

// Standalone passages: `constants` (what doesn't change), `contact` (what to write about),
// `work` (the pitch on /work/).
const passages = defineCollection({
  type: 'content',
  schema: z.object({ title: z.string(), draft }),
});

export const collections = { poetry, reflections, essays, projects, seasons, passages };

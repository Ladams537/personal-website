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
  }),
});
export const collections = { poetry, reflections, essays, projects };

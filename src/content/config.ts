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
    // Release date. Optional: undated projects appear in the Index but not on the Almanac.
    date: z.date().optional(),
  }),
});
export const collections = { poetry, reflections, essays, projects };

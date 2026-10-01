import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const poetry = await getCollection('poetry');
  const reflections = await getCollection('reflections');

  const items = [
    ...poetry.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      link: `/poetry/${p.slug}/`,
    })),
    ...reflections.map(r => ({
      title: r.data.title,
      pubDate: r.data.date,
      link: `/reflections/${r.slug}/`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Ardent — Louis Adams',
    description: 'Poetry and reflections by Louis Adams.',
    site: context.site!,
    items,
  });
}

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const poetry = await getCollection('poetry');
  const reflections = await getCollection('reflections');
  const essays = await getCollection('essays');

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
    ...essays.map(e => ({
      title: e.data.title,
      pubDate: e.data.date,
      link: `/essays/${e.slug}/`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Ardent — Louis Adams',
    description: 'Poetry, reflections and essays by Louis Adams.',
    site: context.site!,
    items,
  });
}

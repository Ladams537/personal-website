// Real content for the site, normalised into one archive shape that the home page,
// Almanac and Index all read from.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Kind = 'poem' | 'reflection' | 'essay' | 'project';
export interface Item {
  k: Kind;
  t: string;
  slug: string;
  href: string;
  /** ISO yyyy-mm-dd; null for undated projects (they appear in the Index, not the Almanac). */
  date: string | null;
  year: number;
  week: number;
  note: string;
  tags: string[];
  recorded: boolean;
  /** Projects only: still in active development. */
  ongoing: boolean;
  /** Human date: a day for writing, a month (or "<month> – present") for projects. */
  when: string;
}

export const kindLabel: Record<Kind, string> = { poem: 'Poems', reflection: 'Reflections', essay: 'Essays', project: 'Projects' };
const order: Kind[] = ['project', 'essay', 'reflection', 'poem'];
const iso = (d: Date) => d.toISOString().slice(0, 10);
const weekOf = (d: Date) => Math.min(51, Math.floor((d.getTime() - Date.UTC(d.getUTCFullYear(), 0, 1)) / 864e5 / 7));
const hasVideo = (body: string) => /<video|<iframe|\.mp4/.test(body);

function item(k: Kind, base: string, e: { slug: string; body: string }, t: string, date: Date | undefined, note: string, tags: string[] = [], ongoing = false): Item {
  const when = !date ? '' : k === 'project' ? fmtMonth(iso(date)) + (ongoing ? ' – present' : '') : fmt(iso(date));
  return {
    k, t, slug: e.slug, href: `/${base}/${e.slug}/`,
    date: date ? iso(date) : null, year: date?.getUTCFullYear() ?? 0, week: date ? weekOf(date) : 0,
    note, tags, recorded: hasVideo(e.body), ongoing, when,
  };
}

export async function getArchive(): Promise<Item[]> {
  const [poetry, reflections, essays, projects] = await Promise.all([
    getCollection('poetry'), getCollection('reflections'), getCollection('essays'), getCollection('projects'),
  ]);
  return [
    ...poetry.map(e => item('poem', 'poetry', e, e.data.title, e.data.date, e.data.excerpt ?? '', e.data.tags)),
    ...reflections.map(e => item('reflection', 'reflections', e, e.data.title, e.data.date, e.data.subtitle ?? '', e.data.tags)),
    ...essays.map(e => item('essay', 'essays', e, e.data.title, e.data.date, e.data.excerpt ?? '', e.data.tags)),
    // Descending `order`, so after the Index reverses the (stable) sort, undated projects read 1, 2, 3…
    ...[...projects].sort((x, y) => y.data.order - x.data.order).map(e => item('project', 'projects', e, e.data.title, e.data.date, e.data.summary, e.data.technologies, e.data.ongoing)),
  ].sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999') || order.indexOf(a.k) - order.indexOf(b.k));
}

/** Only dated items can be placed in time. */
export const dated = (items: Item[]) => items.filter(i => i.date);
export const yearsOf = (items: Item[]) => [...new Set(dated(items).map(i => i.year))].sort();

/** Items grouped by year+week, each stack ordered so projects sit nearest the baseline. */
export function stacks(items: Item[]) {
  const m = new Map<string, Item[]>();
  for (const it of dated(items)) {
    const key = `${it.year}-${it.week}`;
    m.set(key, [...(m.get(key) ?? []), it]);
  }
  for (const s of m.values()) s.sort((a, b) => order.indexOf(a.k) - order.indexOf(b.k));
  return m;
}

/** First stanza of a poem, as lines, for pull quotes. */
export function firstStanza(entry: CollectionEntry<'poetry'>, max = 4) {
  return entry.body.trim().split(/\n\s*\n/)[0].split('\n').map(l => l.trim()).filter(Boolean).slice(0, max);
}

import { fmt, fmtMonth } from './format';
export { months, fmt, fmtMonth } from './format';

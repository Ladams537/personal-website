import { defineConfig } from 'astro/config';
import remarkBreaks from 'remark-breaks';
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const site = process.env.SITE_URL || (vercelHost ? `https://${vercelHost}` : 'http://localhost:4321');
// The old list pages now live as filters on the Index.
const redirects = {
  '/writing': '/archive/#writing',
  '/poetry': '/archive/#poems',
  '/reflections': '/archive/#reflections',
  '/essays': '/archive/#essays',
};
export default defineConfig({ site, output: 'static', redirects, markdown: { remarkPlugins: [remarkBreaks], shikiConfig: { theme: 'github-dark' } } });

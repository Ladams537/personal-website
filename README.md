# Louis Adams — Builder & poet

A personal website for software projects, poetry, reflections and essays. Built with Astro, with Markdown content and a shared project-card system.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Structure

The site has three main pages, and each one belongs to a side of the "seam" between building and writing:

- **Home (`/`)**: the builder (dark, monospace) and the poet (light, serif) side by side, split by a draggable seam. Dragging a side past two-thirds opens a deeper layer: every project and the full stack, or the newest poem in full. Below the fold, featured projects are stitched across the seam.
- **Almanac (`/almanac/`)**: every dated piece placed on the day it went out, as a spiral across all years. `/almanac/#year-2026` zooms into one year's dial.
- **Index (`/archive/`)**: one keyboard-first list of everything (`j`/`k`, `/` to filter, `⌘K` to jump). `#recorded` shows poems with a recording. The old list pages (`/writing/`, `/poetry/`, `/reflections/`, `/essays/`) redirect here with the matching filter.
- **Work (`/work/`)**: for someone deciding whether to hire. A short pitch, every project with dates, status and links, and contact. A CV link appears once `public/cv.pdf` exists.
- **About (`/about/`)**: what doesn't change, then seasons (who I am this season, with earlier seasons kept underneath). A photo appears once `public/images/portrait.jpg` exists.

Detail pages keep their original URLs (`/poetry/<slug>/`, `/reflections/<slug>/`, `/essays/<slug>/`, `/projects/<slug>/`). Writing pages sit on the light ground and project pages on the dark ground.

The palette ("Lough Shore") lives in `src/components/tokens.css`. `src/components/content.ts` turns the four content collections into the single archive that every page reads.

## Content

Writing lives in the poetry, reflections and essays collections. Each entry needs `title` and `date`. Poems may add `excerpt` and `tags`, and reflections may add `subtitle`. The homepage pull quote is the first stanza of the newest poem. A poem with a video or embed is marked as recorded on the Index and the Almanac.

Project content lives in `src/content/projects/`. Each Markdown entry declares `title`, `summary`, `technologies`, `category`, `visualLabel` (one to three lines), `status`, `order` and `featured`. `featured` projects appear on the homepage and in the stitched section, where `visualLabel` becomes the line on the poet's side. `order` controls display order; use a unique positive order for each entry. A project may also set `date`: its release or start month, written as the 1st (`2026-05-01`) and shown month-only ("May 2026"). Add `ongoing: true` for work still under way: it reads "September 2026 – present", and the Almanac draws a thread from the start month to today. Undated projects appear on the Index with a "—" date and stay off the Almanac.

Projects can also set `repo` and `live` URLs; they appear as Source and Live links on `/work/`.

### Experience and CV

`src/content/experience/` holds one file per role (`org`, `role`, `start`, optional `end`), with the bullet list as the body. Roles appear on `/work/` and on the CV. Projects with a `cvLine` appear in the CV's Projects section. Education and skills live in `passages/education.md` and `passages/skills.md`.

The CV is the `/cv/` page printed to `public/cv.pdf`. After changing any of the sources above, run:

```bash
npm run cv
```

This builds the site and prints the PDF with a local headless Chromium (Playwright's cached one, or Chrome; set `CHROME_PATH` to choose). It warns if the CV runs past one page. Commit the regenerated `public/cv.pdf`; Vercel serves it as a static file.

### Seasons and passages

`src/content/seasons/` holds chapters of life: `title`, `start`, optional `end`, a one-line `summary`, an optional `reflection` slug that tells the season properly, and a body. The open season is "this season" on About, and every season is drawn as a labelled band on the Almanac spiral.

`src/content/passages/` holds `constants.md` (what doesn't change, on About), `contact.md` (what to write about, on About and Work), `work.md` (the pitch on Work), and `education.md` and `skills.md` (on the CV).

### Drafts

Seasons and passages accept `draft: true`. Drafts render in local and preview builds with a "draft" badge, but production builds (`VERCEL_ENV=production`) leave them out. You can review copy on a Vercel preview and publish it by deleting the `draft` line.

See [MEDIA.md](MEDIA.md) for adding images, recordings and embeds. Local source evidence and planning notes are kept outside version control.

## Publishing

The site produces a static build. Configure `SITE_URL` for the production domain, or use the Vercel-provided URL environment variables, so RSS and site URLs use the intended host.

The site has no publishing editor or subscriber-email backend. Project statuses describe local implementations; public demo links and adoption claims require separate verification.

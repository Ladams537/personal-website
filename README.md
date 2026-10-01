# Louis Adams — Builder & poet

A personal website for software projects, poetry, reflections and essays. Built with Astro, with Markdown content and a shared project-card system.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Projects

The homepage features Poetry Events Platform, Ledger, Assay and Cold Case. Goodreads Recommender appears under small experiments. `/work/` lists all projects, and each has its own case study.

Project content lives in `src/content/projects/`. Each Markdown entry declares `title`, `summary`, `technologies`, `category`, `visualLabel` (one to three lines), `status`, `order` and `featured`. The homepage uses `featured` to separate selected work from experiments; `order` controls display order and card numbering. Use a unique positive order for each entry.

Writing lives in the poetry, reflections and essays collections. See [MEDIA.md](MEDIA.md) for adding images, recordings and embeds. Local source evidence and planning notes are kept outside version control.

## Publishing

The site produces a static build. Configure `SITE_URL` for the production domain, or use the Vercel-provided URL environment variables, so RSS and site URLs use the intended host.

The site has no publishing editor or subscriber-email backend. Project statuses describe local implementations; public demo links and adoption claims require separate verification.

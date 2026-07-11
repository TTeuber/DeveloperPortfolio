# Tyler Teuber — Portfolio

Personal portfolio site: projects, experience, skills, and a printable résumé.

**Live site:** [tylerteuber.com](https://tylerteuber.com)

## About

A dark "studio hardware" theme borrowed from the audio gear I build software for —
signal-chain section numbering, silkscreen mono labels, faceplate placeholders with
corner screws, and VU-meter amber accents. Built from scratch, no templates or UI
libraries.

### Highlights

- **Filterable project grid** — a Svelte 5 island; filters by language/focus area, and
  the Skills section deep-links into it (click a skill to see the projects that use it)
- **Per-project detail pages** — shareable `/projects/<id>` URLs generated from a single
  data file (`src/data/projects.js`)
- **Demo video modal** — accessible dialog with Escape/backdrop close and a keyboard
  focus trap
- **Printable `/resume` page** — a "paper sheet" that strips the site chrome when printed
- **Optimized images** — `src/assets` + Astro's asset pipeline for responsive WebP;
  branded 1200×630 Open Graph card and matching favicon
- **Static-first** — Astro islands keep JavaScript to the interactive bits; everything
  else ships as HTML

## Tech Stack

- **Astro** — static site framework and asset pipeline
- **Svelte 5** — interactive islands (project grid, video modal)
- **Sass** — styling, one global design-token sheet

## Structure

- `src/data/projects.js` — single source of truth for the project cards, filters, and
  detail pages
- `src/data/skills.js` — skill groups; entries with a `filter` become clickable
- `src/pages/index.astro` — the single-page home (hero, projects, about, experience,
  skills, contact)
- `src/pages/projects/[slug].astro` — per-project detail pages
- `src/pages/resume.astro` — web résumé (kept in sync with the master copy)

## Running Locally

```sh
bun install
bun dev        # localhost:4321
bun build      # static output to ./dist/
bun preview    # preview production build
```

Requires Node.js >= 22.12.0.

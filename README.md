# Tyler Teuber — Portfolio

Personal portfolio site built to showcase my frontend development work, projects, and professional background.

**Live site:** [tylerteuber.com](https://tylerteuber.com) 

## About

A single-page portfolio with scroll-reveal animations, responsive layout, and a clean light theme. Built from scratch — no templates or UI libraries beyond Tailwind for utility classes.

### Highlights

- **Fully responsive** — mobile-first layout with adaptive navigation
- **Scroll-triggered animations** via Intersection Observer
- **Semantic HTML** with accessibility considerations (ARIA labels, proper heading hierarchy)
- **Performance-focused** — static site generation, optimized fonts, minimal JavaScript

## Tech Stack

- **Astro** — static site framework
- **Tailwind CSS v4** — utility-first styling
- **TypeScript** — type-safe configuration
- **Svelte** — available for interactive components when needed

## Running Locally

```sh
bun install
bun dev        # localhost:4321
bun build      # static output to ./dist/
bun preview    # preview production build
```

Requires Node.js >= 22.12.0.

# Site TODO

What's left after the July 2026 redesign (dark "studio hardware" theme, About section,
/resume page, MultiTracks page removed). Roughly in priority order.

## Media to create (you)

Once a file exists, drop it in `public/Images/<Project>/` and point the project's
`image:` (or `video:` YouTube ID) at it in `src/data/projects.js` — the
"MEDIA IN PRODUCTION" chip disappears automatically once `image` is set
(also remove the `mediaPlanned: true` flag).

- [ ] **Pistomp Pedalboard — photo of the physical board** → `projects.js` `image`
      (it's a featured full-width card, so a wide/landscape shot works best)
- [ ] **Pistomp Pedalboard — live playing/demo video** → upload to YouTube, put the
      video ID in `projects.js` `video` (the "Watch Demo" button appears automatically)
- [ ] **Pistomp HAL — screenshot of the macOS simulator** (bonus: side-by-side with the
      real hardware) → `projects.js` `image`
- [ ] **SelfControl for Android — app screenshots** → `projects.js` `image`
      (consider a framed-phone composite since the card media area is 16:10 landscape)

## GIF → video swap (you + me)

You said you still have the original videos behind the GIFs. GIFs are 10–20× larger
than an equivalent muted looping video.

- [ ] Convert the source videos to compressed mp4 (H.264, no audio), e.g.:
      `ffmpeg -i input.mov -an -vcodec libx264 -crf 28 -preset slow -movflags +faststart out.mp4`
- [ ] Drop them in `public/Images/Synth/` and `public/Images/ArcadeFX/`, then ask Claude to
      switch the card media from `<img>` to a muted autoplaying looping `<video>`
      (needs a small change in `ProjectsGrid.svelte` + a `videoLoop` field in `projects.js`)
- [ ] Delete the GIFs afterward

## Content review (you)

- [ ] Read the new **About** section copy (`src/pages/index.astro`) — I wrote it in your
      voice from the resume material; make sure it actually sounds like you
- [ ] Read the new **hero tagline** and shortened **project descriptions**
      (`src/data/projects.js`)
- [ ] Personal Lesson Agent card uses `course-view.png` — swap for `interview.png` or
      `module-browser.png` if you like one better
- [ ] The `/resume` page mirrors `info/resumes/RESUME_GENERAL.md`. **They are two copies**
      (info/ is gitignored, so the site can't read it) — when you update one, update the other

## Polish / later (me, on request)

- [ ] **favicon.ico is still the old Astro logo** — the SVG favicon is now an amber
      waveform; regenerate the .ico to match (or drop it; modern browsers use the SVG)
- [ ] **Social/OG image** — currently your portrait; a proper 1200×630 card with the
      waveform branding would look much better in link previews
- [ ] **Image optimization** — images live in `public/` and bypass Astro's asset pipeline;
      moving to `src/assets` + `<Image>` would give responsive sizes and modern formats
- [ ] **Per-project detail pages** — shareable URLs + room for deep write-ups (the card
      descriptions are intentionally short now); good SEO win if you want it
- [ ] **Video modal focus trap** — Escape and backdrop-click work, but keyboard focus
      isn't trapped inside the modal
- [ ] **README.md** still describes the old site

## Housekeeping notes

- The MultiTracks page and its components (`DemoButton`, `YouTubeDemo`, `demoState`) are
  deleted — the deletions are **staged in git** but not committed
- Deleted the empty `site/` directory and the `.DS_Store` files in `public/` (they were
  being deployed; `.gitignore` already covers them)
- After deploying: check the live site on your phone, and re-share the URL somewhere
  (Slack/Discord DM to yourself) to verify the OG preview still looks right

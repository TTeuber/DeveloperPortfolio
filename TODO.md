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
- [x] ~~The `/resume` page mirrors `info/resumes/RESUME_GENERAL.md`~~ — solved July 2026:
      the resume html in `src/data/resumes/` is now the single source of truth, rendered
      at `/resume/<variant>` and exported to PDF/Word by ResumeBuilder via symlink
- [ ] Read the per-variant copy in `src/data/variants.js` (hero taglines, About intros
      for /web /ai /audio /cpp /python) — written in your voice from the resume summaries;
      make sure it sounds like you

## Polish / later (me, on request)

All done (July 2026):

- [x] **favicon.ico** — regenerated from the amber waveform SVG (16/32/48 px)
- [x] **Social/OG image** — branded 1200×630 card at `public/Images/og-card.png`;
      `Layout.astro` now uses it with `summary_large_image`
- [x] **Image optimization** — static images moved to `src/assets` and served as
      responsive WebP via Astro's pipeline; the two GIFs stay in `public/` (the pipeline
      would flatten their animation — they're due to become `<video>` anyway, see above)
- [x] **Per-project detail pages** — `/projects/<id>` built from a new `details` field in
      `projects.js`; cards link via title + "Read More"
- [x] **Video modal focus trap** — Tab/Shift+Tab now cycle inside the dialog, and focus
      returns to the triggering button on close
- [x] **README.md** rewritten for the new site

## Housekeeping notes

- The July 2026 redesign (including the MultiTracks page removal) is committed
- Deleted the empty `site/` directory and the `.DS_Store` files in `public/` (they were
  being deployed; `.gitignore` already covers them)
- After deploying: check the live site on your phone, and re-share the URL somewhere
  (Slack/Discord DM to yourself) to verify the OG preview still looks right

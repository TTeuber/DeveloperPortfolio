// Single source of truth for the projects shown on the site.
// `languages` and `areas` drive the filter bar; `tags` are the chips displayed on each card.
// `accent` is a hue (0-360) used for the card's LED dot and the placeholder faceplate.
// `featured: true` renders a large full-width card at the top of the grid.
// `video` is a YouTube video ID shown in the demo modal.
// `mediaPlanned: true` marks projects whose screenshots/videos are still being produced —
// the placeholder shows a "media in production" chip until an `image` or `video` lands.

export const projects = [
  {
    id: 'gesture-synth',
    title: 'GestureSynth',
    context: 'Audio DSP + Creative UI',
    description:
      'A Juno-inspired polyphonic synthesizer plugin in C++20/JUCE with entirely hand-written DSP — PolyBLEP anti-aliased oscillators, a state-variable filter, bucket-brigade delay, and a 16-line FDN reverb. Drag any LFO or envelope onto any knob to route it, with live connector lines drawing the whole modulation graph. Real-time-safe by construction; ships as AU, VST3, AUv3, and CLAP.',
    image: '/Images/Synth/GestureSynth.gif', // TODO(Tyler): replace GIF with a muted looping <video> (see TODO.md)
    tags: ['C++', 'JUCE', 'DSP', 'Audio', 'UI Design'],
    languages: ['C++'],
    areas: ['Audio & DSP', 'Desktop'],
    video: 'nWYTKmqFDi4',
    featured: true,
    links: {
      code: 'https://github.com/TTeuber/GestureSynth',
    },
    accent: 245,
  },
  {
    id: 'pistomp-pedalboard',
    title: 'Pistomp Pedalboard',
    context: 'Embedded Real-Time Audio · My Live Rig in Progress',
    description:
      'A C++17 multi-effect guitar pedalboard on a Raspberry Pi 5 — the rig I\'m building to perform through live, nearly complete. One binary runs 30+ JUCE effects plus real-time neural amp modeling, an on-device LVGL UI, and a phone-friendly Svelte control surface synced over Server-Sent Events. The audio thread never takes a lock: chain edits publish through epoch-based RCU, so effects reorder mid-performance without a click.',
    image: null, // TODO(Tyler): photo of the physical pedalboard
    tags: ['C++', 'JUCE', 'Svelte', 'LVGL', 'Embedded'],
    languages: ['C++'],
    areas: ['Audio & DSP', 'Systems'],
    video: null, // TODO(Tyler): YouTube ID of a live playing/demo video
    featured: true,
    mediaPlanned: true,
    links: {
      code: 'https://github.com/TTeuber/PistompPedalboard',
    },
    accent: 10,
  },
  {
    id: 'pistomp-hal',
    title: 'Pistomp HAL',
    context: 'C++ Library + Hardware Drivers',
    description:
      'A JUCE-free C++17 hardware abstraction layer extracted from the pedalboard: rotary encoders, footswitches, NeoPixel LEDs, an LVGL display, and a realtime ALSA duplex audio loop behind clean headers — the board object owns the shared SPI mutex so consumers can never corrupt the bus. The same headers are backed by a full macOS simulator, so an entire pedal app can be developed with no Pi attached.',
    image: null, // TODO(Tyler): screenshot of the macOS simulator next to the real hardware
    tags: ['C++', 'ALSA', 'LVGL', 'CMake', 'Embedded'],
    languages: ['C++'],
    areas: ['Systems', 'Audio & DSP'],
    mediaPlanned: true,
    links: {
      code: 'https://github.com/TTeuber/pistomp-hal',
    },
    accent: 105,
  },
  {
    id: 'arcade-sfx',
    title: 'ArcadeSoundFX',
    context: 'Browser Synth · Built for My Students',
    description:
      'A browser-based 8-bit sound-effects generator built so my coding students’ games wouldn’t be silent. A dual-oscillator Tone.js engine with curated presets, a smart randomizer, and one-click WAV export through a custom encoder — plus an AI prompt bar that turns “a sad laser powering down” into synth parameters via the Claude API behind a rate-limited Cloudflare Worker.',
    image: '/Images/ArcadeFX/ArcadeSoundFX.gif', // TODO(Tyler): replace GIF with a muted looping <video>
    tags: ['React', 'TypeScript', 'Tone.js', 'Web Audio', 'Claude API'],
    languages: ['TypeScript'],
    areas: ['Audio & DSP', 'Web', 'AI'],
    links: {
      demo: 'https://tteuber.github.io/ArcadeSoundFX/',
      code: 'https://github.com/TTeuber/ArcadeSoundFX',
    },
    accent: 340,
  },
  {
    id: 'lesson-agent',
    title: 'Personal Lesson Agent',
    context: 'Agentic AI Engineering',
    description:
      'An AI desktop learning platform that turns a short interview into a complete personalized course — lessons, multi-file coding exercises, and quizzes — with a context-aware tutor beside every module. Built on a custom multi-agent framework with a bounded tool-use loop and a four-level hierarchical context model, in Electron + React 19 + strict TypeScript.',
    image: '/Images/PersonalLessonAssistant/course-view.png',
    tags: ['TypeScript', 'React', 'Electron', 'AI Agents', 'Tailwind'],
    languages: ['TypeScript'],
    areas: ['AI', 'Desktop'],
    links: {
      code: 'https://github.com/TTeuber/PersonalLessonAgent',
    },
    accent: 265,
  },
  {
    id: 'selfcontrol-android',
    title: 'SelfControl for Android',
    context: 'OS-Level Enforcement',
    description:
      'An Android self-control app enforced at the OS level through Device Owner APIs — the same layer as enterprise MDM — so blocks survive any attempt to uninstall the app. Scheduled blocks with overnight windows, commitment locks that can tighten but never loosen, and website rules pushed into Chrome via managed configurations. Kotlin 2.0, Jetpack Compose, Room, Hilt.',
    image: null, // TODO(Tyler): app screenshots
    tags: ['Kotlin', 'Jetpack Compose', 'Android', 'Room', 'Hilt'],
    languages: ['Kotlin'],
    areas: ['Mobile', 'Systems'],
    mediaPlanned: true,
    links: {
      code: 'https://github.com/TTeuber/AndroidPhoneManager',
    },
    accent: 160,
  },
  {
    id: 'hypr-blocker',
    title: 'HyprBlocker',
    context: 'Adversarial Systems Design',
    description:
      'A tamper-resistant website and app blocker for Linux that treats “future me trying to cheat” as the adversary: a Python/FastAPI daemon defended by a self-healing mesh of watchdog processes, NTP-verified time locks that defeat clock tampering, and a heartbeat-tracked browser extension — any browser that stops reporting gets closed. Managed from a React + TypeScript GUI; fails closed on any error.',
    image: '/Images/Blocker/BlockScreen.png',
    tags: ['Python', 'FastAPI', 'React', 'Linux', 'Browser Extension'],
    languages: ['Python', 'TypeScript'],
    areas: ['Systems', 'Desktop'],
    links: {
      code: 'https://github.com/TTeuber/HyprBlocker',
    },
    accent: 200,
  },
  {
    id: 'sermon-slides',
    title: 'Sermon Slides Generator',
    context: 'Automation With Real Users',
    description:
      'A macOS desktop app that turns a list of Bible references into presentation-ready PDF slides in seconds, replacing a weekly manual copy-paste job — still used every week by the church I built it for. Passages are scraped and cleaned, split across slides at sentence boundaries, rendered with Pillow, and shipped as a self-contained .app with a headless CLI.',
    image: '/Images/SermonSlides/SermonSlides.png',
    tags: ['Python', 'PyWebView', 'Pillow', 'Web Scraping'],
    languages: ['Python'],
    areas: ['Desktop'],
    links: {
      code: 'https://github.com/TTeuber/Sermon_Slides_Generator',
    },
    accent: 35,
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    context: "You're Looking at It",
    description:
      'This site — designed and built from scratch with Astro, Svelte 5, and Sass. Static-first with islands of interactivity like the project filter above, and a design system borrowed from the hardware I build: signal-chain sections, silkscreen labels, and one amber LED too many.',
    image: null,
    tags: ['Astro', 'Svelte', 'Sass'],
    languages: ['JavaScript'],
    areas: ['Web'],
    links: {
      code: 'https://github.com/TTeuber/DeveloperPortfolio',
    },
    accent: 215,
  },
];

export const languageFilters = [...new Set(projects.flatMap((p) => p.languages))];
export const areaFilters = [...new Set(projects.flatMap((p) => p.areas))];

// Everything a project can be filtered by — used to decide which skills are clickable.
export const filterableTags = new Set(
  projects.flatMap((p) => [...p.languages, ...p.areas, ...p.tags])
);

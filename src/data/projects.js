// Single source of truth for the projects shown on the site.
// `languages` and `areas` drive the filter bar; `tags` are the chips displayed on each card.
// `accent` is a hue (0-360) used for the placeholder art when a project has no screenshot.

export const projects = [
  {
    id: 'gesture-synth',
    title: 'Gesture Synth',
    context: 'Audio DSP + Creative UI',
    description:
      'A Juno-inspired polyphonic synthesizer plugin built from scratch in modern C++20 with JUCE — hand-written DSP including a PolyBLEP anti-aliased oscillator, state-variable filter, and a 16-line feedback-delay-network reverb. Its gesture-based modulation system lets you drag a source onto any knob to route it, with live connector lines visualizing the whole modulation graph. Real-time-safe by construction: lock-free UI-to-audio messaging and no allocations on the audio thread. Ships as AU, VST3, AUv3, CLAP, and Standalone with CI builds.',
    image: '/Images/Synth/Synth.png',
    tags: ['C++', 'JUCE', 'DSP', 'Audio', 'UI Design'],
    languages: ['C++'],
    areas: ['Audio & DSP', 'Desktop'],
    video: 'nWYTKmqFDi4',
    links: {
      code: 'https://github.com/TTeuber/GestureSynth',
    },
    accent: 245,
  },
  {
    id: 'arcade-sfx',
    title: 'Retro Arcade SFX Gen',
    context: 'Browser-Based Synth + Built for Students',
    description:
      'A browser-based 8-bit sound effects generator inspired by classic arcade machines. A dual-oscillator synth engine with AD envelopes and a vibrato LFO produces the pitch sweeps and gritty impacts that define the genre; presets and a randomizer get you close fast, then offline rendering exports the patch as a 16-bit PCM WAV. Built for my students whose Pygame and Scratch games kept ending up silent.',
    image: '/Images/ArcadeFX/ArcadeFX.png',
    tags: ['React', 'TypeScript', 'Tone.js', 'Web Audio', 'Tailwind'],
    languages: ['TypeScript'],
    areas: ['Audio & DSP', 'Web'],
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
      'An AI-powered desktop learning platform that turns a short interview into a complete personalized course — lessons, multi-file coding exercises, and quizzes — with a context-aware AI tutor beside every module. Built on a custom multi-agent framework with a bounded tool-use loop and a four-level hierarchical context system, so every agent knows exactly who it is teaching. React 19, strict TypeScript, and Electron with a sandboxed IPC bridge, tested with Vitest and MSW.',
    image: null,
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
      'An Android self-control app that blocks apps and websites using Device Owner APIs — the same device-management layer as enterprise MDM software — so restrictions cannot be bypassed by simply uninstalling the app. Supports scheduled blocks (including overnight windows), commitment locks that can tighten but never loosen, and website rules pushed directly into Chrome via managed configurations. Built with Jetpack Compose, Room, Hilt, and WorkManager, with CI on GitHub Actions.',
    image: null,
    tags: ['Kotlin', 'Jetpack Compose', 'Android', 'Room', 'Hilt'],
    languages: ['Kotlin'],
    areas: ['Mobile', 'Systems'],
    links: {
      code: 'https://github.com/TTeuber/AndroidPhoneManager',
    },
    accent: 160,
  },
  {
    id: 'hypr-blocker',
    title: 'HyprBlocker',
    context: 'Multi-Component System',
    description:
      'A tamper-resistant website and app blocker for Linux/Hyprland: a Python daemon running as a systemd service with a FastAPI control API, a desktop GUI, a system tray app, and a browser extension enforcing blocks in Firefox and Chrome. A watchdog restarts the daemon if it is killed, NTP time verification defeats clock tampering, and lock mode makes configuration read-only during focus periods. Demonstrates systems thinking — from low-level scripting to polished interfaces.',
    image: '/Images/Blocker/BlockScreen.png',
    tags: ['Python', 'FastAPI', 'JavaScript', 'Linux', 'Browser Extension'],
    languages: ['Python', 'JavaScript'],
    areas: ['Systems', 'Desktop'],
    links: {
      code: 'https://github.com/TTeuber/HyprBlocker',
    },
    accent: 200,
  },
  {
    id: 'sermon-slides',
    title: 'Sermon Slides Generator',
    context: 'Built for My Church',
    description:
      'A macOS desktop app that turns a list of Bible references into presentation-ready PDF slides in seconds — replacing a weekly manual copy-paste job at my church. It fetches each passage from BibleGateway, cleans the text, splits long passages across slides at sentence boundaries, and renders polished slides with custom typography and a QR-coded title slide before assembling the final PDF. Packaged as a standalone .app with PyInstaller, with a pytest suite and a headless CLI.',
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
      'This site — designed and built from scratch with Astro, Svelte 5, and Sass. Static-first with islands of interactivity (like the project filter above), scroll-driven reveal animations, and a fully responsive layout. No UI frameworks, no templates.',
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

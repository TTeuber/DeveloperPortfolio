import courseView from '../assets/PersonalLessonAssistant/course-view.png';
import interview from '../assets/PersonalLessonAssistant/interview.png';
import moduleBrowser from '../assets/PersonalLessonAssistant/module-browser.png';
import blockScreen from '../assets/Blocker/BlockScreen.png';
import hyprDashboard from '../assets/Blocker/HyprBlocker_Dashboard.png';
import hyprBlocks from '../assets/Blocker/HyprBlocker_Blocks.png';
import hyprStatistics from '../assets/Blocker/HyprBlocker_Statistics.png';
import hyprBrowsers from '../assets/Blocker/HyprBlocker_Browsers.png';
import hyprSettings from '../assets/Blocker/HyprBlocker_Settings.png';
import androidScreens from '../assets/SelfControlAndroid/AndroidBlocker_3Screens.png';
import sermonSlides from '../assets/SermonSlides/SermonSlides.png';
import pedalboardWebUI from '../assets/Pedalboard/PedalboardWebUI.png';
import pistompSimulator from '../assets/PistompHAL/PistompSimulator.png';
import portfolioWebsite from '../assets/Portfolio/PortfolioWebsite.png';

// Single source of truth for the projects shown on the site.
// `languages` and `areas` drive the filter bar; `tags` are the chips displayed on each card.
// `accent` is a hue (0-360) used for the card's LED dot and the placeholder faceplate.
// `featured: true` renders a large full-width card at the top of the grid.
// `images` is a list; each entry is either an imported src/assets image
// (optimized through Astro's pipeline in index.astro / the detail page) or a
// /public path string (the animated GIFs, which the pipeline would flatten to
// a single frame). Multi-image projects auto-cycle on the cards and get a
// manual carousel on their detail page.
// `video` is a YouTube video ID shown in the demo modal.
// `mediaPlanned: true` marks projects whose screenshots/videos are still being produced —
// the placeholder shows a "media in production" chip until an `image` or `video` lands.
// `details` is the long-form write-up shown on the project's /projects/<id> page,
// one string per paragraph.

export const projects = [
  {
    id: 'gesture-synth',
    title: 'GestureSynth',
    context: 'Audio DSP + Creative UI',
    description:
      'A Juno-inspired polyphonic synthesizer plugin in C++20/JUCE with entirely hand-written DSP — PolyBLEP anti-aliased oscillators, a state-variable filter, bucket-brigade delay, and a 16-line FDN reverb. Drag any LFO or envelope onto any knob to route it, with live connector lines drawing the whole modulation graph. Real-time-safe by construction; ships as AU, VST3, AUv3, and CLAP.',
    images: ['/Images/Synth/GestureSynth.gif'], // TODO(Tyler): replace GIF with a muted looping <video> (see TODO.md)
    tags: ['C++', 'JUCE', 'DSP', 'Audio', 'UI Design'],
    languages: ['C++'],
    areas: ['Audio & DSP', 'Desktop'],
    video: 'nWYTKmqFDi4',
    featured: true,
    links: {
      code: 'https://github.com/TTeuber/GestureSynth',
    },
    accent: 245,
    details: [
      'A Juno-inspired polyphonic synthesizer plugin written from scratch in C++20 with JUCE 8, shipping as Standalone, AU, VST3, AUv3, and CLAP. Every stage of the DSP is hand-written: a PolyBLEP anti-aliased, 4×-oversampled DCO with a morphing sub-oscillator, a resonant state-variable filter, Juno-style chorus, a bucket-brigade-style delay, and a 16-line feedback-delay-network reverb.',
      'Its defining feature is a gesture-based modulation workflow: drag a source — four LFOs, four curve-shaped envelopes, or MIDI expression — onto any knob to route it, with live connector lines visualizing the entire modulation graph as the sound plays.',
      'The audio path is real-time-safe by construction: lock-free UI↔audio messaging, cached atomics, and no locks or allocations anywhere in processBlock. Catch2 tests and benchmarks, pluginval validation, and cross-platform GitHub Actions CI keep it honest.',
    ],
  },
  {
    id: 'pistomp-pedalboard',
    title: 'Pistomp Pedalboard',
    context: 'Embedded Real-Time Audio · My Live Rig in Progress',
    description:
      'A C++17 multi-effect guitar pedalboard on a Raspberry Pi 5 — the rig I\'m building to perform through live, nearly complete. One binary runs 30+ JUCE effects plus real-time neural amp modeling, an on-device LVGL UI, and a phone-friendly Svelte control surface synced over Server-Sent Events. The audio thread never takes a lock: chain edits publish through epoch-based RCU, so effects reorder mid-performance without a click.',
    images: [pedalboardWebUI], // TODO(Tyler): add photo of the physical pedalboard
    tags: ['C++', 'JUCE', 'Svelte', 'LVGL', 'Embedded'],
    languages: ['C++'],
    areas: ['Audio & DSP', 'Systems'],
    video: null, // TODO(Tyler): YouTube ID of a live playing/demo video
    featured: true,
    links: {
      code: 'https://github.com/TTeuber/PistompPedalboard',
    },
    accent: 10,
    details: [
      'A general-purpose multi-effect guitar pedalboard in C++17 for pi-Stomp v3 hardware (Raspberry Pi 5), built to be my own live performance rig. It’s the one project here still in active development — nearly complete, not yet gigged.',
      'One binary drives the whole instrument: 30+ effects (delays, reverbs, modulation, drives, dynamics, EQ, tuner) built on juce::dsp, a Neural Amp Modeler block running .nam amp captures in realtime, the on-device LVGL screen with encoders and footswitches, and a Svelte web control surface served from the pedal itself and kept live-consistent over Server-Sent Events.',
      'Chain edits are lock-free via an epoch-based RCU scheme, so effects can be added and reordered mid-performance without a click — verified by a TSan/ASan-swept stress test. Rigs, presets, and setlists persist as JSON with atomic writes, there’s tap-tempo sync, a hardware-free Catch2 suite of DSP invariant tests, and a containerized arm64 build/deploy pipeline.',
    ],
  },
  {
    id: 'pistomp-hal',
    title: 'Pistomp HAL',
    context: 'C++ Library + Hardware Drivers',
    description:
      'A JUCE-free C++17 hardware abstraction layer extracted from the pedalboard: rotary encoders, footswitches, NeoPixel LEDs, an LVGL display, and a realtime ALSA duplex audio loop behind clean headers — the board object owns the shared SPI mutex so consumers can never corrupt the bus. The same headers are backed by a full macOS simulator, so an entire pedal app can be developed with no Pi attached.',
    images: [pistompSimulator],
    tags: ['C++', 'ALSA', 'LVGL', 'CMake', 'Embedded'],
    languages: ['C++'],
    areas: ['Systems', 'Audio & DSP'],
    links: {
      code: 'https://github.com/TTeuber/pistomp-hal',
    },
    accent: 105,
    details: [
      'A JUCE-free C++17 hardware abstraction layer for the pi-Stomp v3 guitar-pedal platform (Raspberry Pi 5), extracted from the Pistomp Pedalboard project and consumed as a static library via CMake FetchContent.',
      'It packages rotary encoders (libgpiod), SPI footswitches, NeoPixel LEDs, an ILI9341 TFT driven by LVGL v9, ADC input metering, and a realtime duplex ALSA audio path (SCHED_FIFO, xrun recovery) behind clean headers — the Board class owns the shared SPI mutex so consumers can’t corrupt the bus.',
      'The same headers are backed by a macOS simulator — LVGL rendering in SDL2, audio through CoreAudio/miniaudio, keyboard-mapped controls — so an entire pedal app can be developed and tested with no Pi attached.',
    ],
  },
  {
    id: 'arcade-sfx',
    title: 'ArcadeSoundFX',
    context: 'Browser Synth · Built for My Students',
    description:
      'A browser-based 8-bit sound-effects generator built so my coding students’ games wouldn’t be silent. A dual-oscillator Tone.js engine with curated presets, a smart randomizer, and one-click WAV export through a custom encoder — plus an AI prompt bar that turns “a sad laser powering down” into synth parameters via the Claude API behind a rate-limited Cloudflare Worker.',
    images: ['/Images/ArcadeFX/ArcadeSoundFX.gif'], // TODO(Tyler): replace GIF with a muted looping <video>
    tags: ['React', 'TypeScript', 'Tone.js', 'Web Audio', 'Claude API'],
    languages: ['TypeScript'],
    areas: ['Audio & DSP', 'Web', 'AI'],
    links: {
      demo: 'https://tteuber.github.io/ArcadeSoundFX/',
      code: 'https://github.com/TTeuber/ArcadeSoundFX',
    },
    accent: 340,
    details: [
      'A browser-based 8-bit sound effects generator inspired by classic 80s arcade machines, built for my coding students whose Pygame and Scratch games were silent.',
      'A dual-oscillator synth engine (tone + noise) with amplitude and pitch envelopes and a vibrato LFO runs on Tone.js in React 19 + TypeScript, with curated presets, archetype-aware randomize with undo, patches shareable via URL hash, a live oscilloscope, and one-click 16-bit PCM WAV export through a custom encoder.',
      'An AI prompt bar (“a sad laser powering down”) turns text into synth parameters via the Claude API behind a rate-limited Cloudflare Worker proxy — origin-locked CORS, per-IP and global limits in Workers KV — with a bring-your-own-key fallback. Deployed as a static site to GitHub Pages via CI.',
    ],
  },
  {
    id: 'lesson-agent',
    title: 'Personal Lesson Agent',
    context: 'Agentic AI Engineering',
    description:
      'An AI desktop learning platform that turns a short interview into a complete personalized course — lessons, multi-file coding exercises, and quizzes — with a context-aware tutor beside every module. Built on a custom multi-agent framework with a bounded tool-use loop and a four-level hierarchical context model, in Electron + React 19 + strict TypeScript.',
    images: [courseView, interview, moduleBrowser],
    tags: ['TypeScript', 'React', 'Electron', 'AI Agents', 'Tailwind'],
    languages: ['TypeScript'],
    areas: ['AI', 'Desktop'],
    links: {
      code: 'https://github.com/TTeuber/PersonalLessonAgent',
    },
    accent: 265,
    details: [
      'An AI-powered desktop learning platform (React 19, TypeScript, Electron) that turns a short interview into a complete personalized course — lessons, multi-file coding exercises, and quizzes — with a context-aware tutor beside every module.',
      'It’s built on a custom multi-agent framework: four specialized agents (Interview, CourseDesigner, ContentGenerator, Tutor) extend a shared abstract base with a bounded tool-use loop, calling Claude through a typed OpenRouter client.',
      'The defining design is a four-level hierarchical context model — User → Subject → Course → Module — so every AI interaction knows the learner’s background, tools, and current objective. Data persists as inspectable JSON and Markdown on disk, the Electron renderer is sandboxed behind a path-validated IPC layer, and exercises open directly in the user’s IDE.',
    ],
  },
  {
    id: 'selfcontrol-android',
    title: 'SelfControl for Android',
    context: 'OS-Level Enforcement',
    description:
      'An Android self-control app enforced at the OS level through Device Owner APIs — the same layer as enterprise MDM — so blocks survive any attempt to uninstall the app. Scheduled blocks with overnight windows, commitment locks that can tighten but never loosen, and website rules pushed into Chrome via managed configurations. Kotlin 2.0, Jetpack Compose, Room, Hilt.',
    images: [androidScreens],
    tags: ['Kotlin', 'Jetpack Compose', 'Android', 'Room', 'Hilt'],
    languages: ['Kotlin'],
    areas: ['Mobile', 'Systems'],
    links: {
      code: 'https://github.com/TTeuber/AndroidPhoneManager',
    },
    accent: 160,
    details: [
      'An Android self-control app that blocks distracting apps and websites using Device Owner APIs — the same device-management layer as enterprise MDM — so restrictions can’t be bypassed by uninstalling the app.',
      'Apps are suspended at the OS level with setPackagesSuspended(), and website rules are pushed into Chrome via managed configurations: URL blocklists, forced SafeSearch, disabled incognito. Schedulable block groups support overnight windows, and add-only lock semantics — locked blocks can tighten but never loosen — are enforced in a single LockManager.',
      'Installation gating classifies newly installed apps from their Play Store page and imposes a 24-hour cooldown on restricted categories. Built with Kotlin 2.0, Jetpack Compose, Room, Hilt, and WorkManager, with unit-tested domain logic and CI.',
    ],
  },
  {
    id: 'hypr-blocker',
    title: 'HyprBlocker',
    context: 'Adversarial Systems Design',
    description:
      'A tamper-resistant website and app blocker for Linux that treats “future me trying to cheat” as the adversary: a Python/FastAPI daemon defended by a self-healing mesh of watchdog processes, NTP-verified time locks that defeat clock tampering, and a heartbeat-tracked browser extension — any browser that stops reporting gets closed. Managed from a React + TypeScript GUI; fails closed on any error.',
    images: [hyprDashboard, hyprBlocks, hyprStatistics, hyprBrowsers, hyprSettings, blockScreen],
    tags: ['Python', 'FastAPI', 'React', 'Linux', 'Browser Extension'],
    languages: ['Python', 'TypeScript'],
    areas: ['Systems', 'Desktop'],
    links: {
      code: 'https://github.com/TTeuber/HyprBlocker',
    },
    accent: 200,
    details: [
      'A tamper-resistant website and app blocker for Linux + Hyprland that treats “future me trying to cheat” as the adversary. A Python/FastAPI daemon running under systemd owns all enforcement and fails closed on any error.',
      'It defends in depth: a self-healing mesh of 2–5 watchdog processes with obfuscated names monitors the daemon and each other, NTP-verified time locks mean changing the system clock can’t end a block early, and a Manifest v3 browser extension’s heartbeat is tracked — any browser that stops reporting gets closed via Hyprland IPC.',
      'Wildcard and path-level URL patterns with allow-list exceptions, per-weekday schedules, read-only lock mode, and safe-search enforcement are all managed from a React + TypeScript GUI in a native pywebview window, plus a system tray app. pytest, ruff, and bun in CI.',
    ],
  },
  {
    id: 'sermon-slides',
    title: 'Sermon Slides Generator',
    context: 'Automation With Real Users',
    description:
      'A macOS desktop app that turns a list of Bible references into presentation-ready PDF slides in seconds, replacing a weekly manual copy-paste job — still used every week by the church I built it for. Passages are scraped and cleaned, split across slides at sentence boundaries, rendered with Pillow, and shipped as a self-contained .app with a headless CLI.',
    images: [sermonSlides],
    tags: ['Python', 'PyWebView', 'Pillow', 'Web Scraping'],
    languages: ['Python'],
    areas: ['Desktop'],
    links: {
      code: 'https://github.com/TTeuber/Sermon_Slides_Generator',
    },
    accent: 35,
    details: [
      'A macOS desktop app built for my church that turns a list of Bible references into presentation-ready PDF slides in seconds, replacing a weekly manual copy-paste job — still used every week, even now that I’ve moved on.',
      'Passages are fetched from BibleGateway with polite rate limiting via Requests + BeautifulSoup, cleaned, and automatically split across slides at sentence boundaries; slides are rendered with Pillow — custom typography, optional QR-code/logo title slide — and merged into a single PDF with pypdf.',
      'The UI is a PyWebView desktop window with a Python backend, there’s a headless CLI for automation, and PyInstaller packages the whole thing as a self-contained ~19 MB .app bundle. Tested with pytest and linted with ruff in CI.',
    ],
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    context: "You're Looking at It",
    description:
      'This site — designed and built from scratch with Astro, Svelte 5, and Sass. Static-first with islands of interactivity like the project filter above, and a design system borrowed from the hardware I build: signal-chain sections, silkscreen labels, and one amber LED too many.',
    images: [portfolioWebsite],
    tags: ['Astro', 'Svelte', 'Sass'],
    languages: ['JavaScript'],
    areas: ['Web'],
    links: {
      code: 'https://github.com/TTeuber/DeveloperPortfolio',
    },
    accent: 215,
    details: [
      'This site — designed and built from scratch with Astro, Svelte 5, and Sass. Static-first, with islands of interactivity only where they earn their weight: the filterable project grid, the demo video modal.',
      'The design system is borrowed from the hardware I build: signal-chain section numbering, silkscreen mono labels, brushed faceplate placeholders with corner screws, and VU-meter amber everywhere a signal flows. Images run through Astro’s asset pipeline into responsive WebP, and the whole thing ships as static HTML.',
    ],
  },
];

// Reorder/re-feature the project list for a variant home page (see variants.js).
// `order` lists the ids to move to the front (unlisted projects keep their
// relative order after them); `featured` replaces the per-project featured flags.
export function projectsForVariant({ order, featured } = {}) {
  let list = projects;
  if (order?.length) {
    const rank = new Map(order.map((id, i) => [id, i]));
    list = [...list].sort(
      (a, b) => (rank.get(a.id) ?? order.length) - (rank.get(b.id) ?? order.length)
    );
  }
  if (featured) {
    list = list.map((p) => ({ ...p, featured: featured.includes(p.id) }));
  }
  return list;
}

export const languageFilters = [...new Set(projects.flatMap((p) => p.languages))];
export const areaFilters = [...new Set(projects.flatMap((p) => p.areas))];

// Everything a project can be filtered by — used to decide which skills are clickable.
export const filterableTags = new Set(
  projects.flatMap((p) => [...p.languages, ...p.areas, ...p.tags])
);

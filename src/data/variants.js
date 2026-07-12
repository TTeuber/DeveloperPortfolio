// Variant home pages: /web, /ai, /audio, /cpp, /python serve tailored versions
// of the main page, and each tailored resume (src/data/resumes/<id>.html) links
// to its variant route from its contact line — so a recruiter reading the web
// resume lands on the web-tailored portfolio.
//
// `general` drives `/` and is the fallback for any field a variant omits.
// - hero.status / hero.tagline: hero section copy
// - projects.order: ids moved to the front of the grid (rest keep default order);
//   projects.featured: which ids render as full-width cards
// - aboutIntro: HTML string replacing the first About paragraph (the identity
//   story second paragraph is shared — see HomePage.astro)
// - skillGroupOrder: skills.js group titles, most relevant first
// - resumePath: where the nav/contact résumé links point

export const variants = {
  general: {
    id: 'general',
    path: '/',
    resumePath: '/resume',
    title: 'Tyler Teuber | Software Engineer',
    description:
      'Software engineer building across the whole signal chain — real-time C++ audio DSP, full-stack web apps, and AI-powered tools.',
    hero: {
      status: 'OPEN TO SOFTWARE ROLES',
      tagline:
        'Software engineer working the whole signal chain — from hand-written C++ DSP on the audio thread to the web apps that control it.',
    },
    projects: {},
    aboutIntro:
      "I've been recording music since high school, and that's still the shape of everything I build: I like software close to the signal. That means real-time C++ where a dropped buffer is audible — like the synthesizer plugin I wrote from scratch and the Raspberry Pi pedalboard I'm building as my live rig — and it also means the TypeScript web apps, Python tools, and AI agents that make those things usable by actual people.",
  },

  web: {
    id: 'web',
    path: '/web',
    resumePath: '/resume/web',
    title: 'Tyler Teuber | Web / Full-Stack Engineer',
    description:
      'Full-stack engineer in TypeScript since 2022 — production Next.js migrations, React and Svelte apps, and web frontends that talk to real hardware.',
    hero: {
      status: 'OPEN TO WEB / FULL-STACK ROLES',
      tagline:
        'Full-stack engineer in TypeScript since 2022 — production Next.js migrations, React apps, and Svelte control surfaces that talk to real hardware.',
    },
    projects: {
      order: ['arcade-sfx', 'lesson-agent', 'portfolio', 'hypr-blocker', 'pistomp-pedalboard'],
      featured: ['arcade-sfx', 'lesson-agent'],
    },
    aboutIntro:
      'I write TypeScript for a living and for fun: I led a production site\'s migration from WordPress to Next.js, designed the curriculum for a student team shipping features into a production React/Nest.js codebase, and build my own tools in React, Svelte, and Astro — including this site. My favorite web work talks to something real: a <a href="/projects/pistomp-pedalboard">control surface for guitar hardware</a>, a <a href="/projects/arcade-sfx">synth in the browser</a>, an AI feature behind a Cloudflare Worker.',
    skillGroupOrder: ['Frontend', 'Backend', 'Languages', 'Tools & AI', 'Audio & Native'],
  },

  ai: {
    id: 'ai',
    path: '/ai',
    resumePath: '/resume/ai',
    title: 'Tyler Teuber | AI Application Engineer',
    description:
      'Software engineer building LLM-powered applications end to end — multi-agent frameworks from scratch and AI features shipped behind production concerns.',
    hero: {
      status: 'OPEN TO AI ENGINEERING ROLES',
      tagline:
        'I build LLM-powered applications end to end — agent architectures from scratch, shipped behind real production concerns.',
    },
    projects: {
      order: ['lesson-agent', 'arcade-sfx', 'hypr-blocker'],
      featured: ['lesson-agent', 'arcade-sfx'],
    },
    aboutIntro:
      'I build LLM applications end to end — not just API calls, but the architecture around them. My <a href="/projects/lesson-agent">Personal Lesson Agent</a> runs a four-agent framework I wrote from scratch (interview → course design → content generation → tutoring) with a bounded tool-use loop and a hierarchical context model. <a href="/projects/arcade-sfx">ArcadeSoundFX</a> ships a natural-language-to-synth-parameters feature behind a rate-limited Cloudflare Worker proxy. And I\'m a daily agentic-tooling power user — Claude Code on every real project since early 2025.',
    skillGroupOrder: ['Tools & AI', 'Languages', 'Frontend', 'Backend', 'Audio & Native'],
  },

  audio: {
    id: 'audio',
    path: '/audio',
    resumePath: '/resume/audio',
    title: 'Tyler Teuber | Audio Software Engineer',
    description:
      'Audio software engineer and lifelong musician — a synthesizer plugin with entirely hand-written DSP, and a Raspberry Pi pedalboard built as my own live rig.',
    hero: {
      status: 'OPEN TO AUDIO SOFTWARE ROLES',
      tagline:
        'Musician-engineer building audio software — a synth plugin with every stage of the DSP hand-written, and the pedalboard that\'s becoming my live rig.',
    },
    projects: {
      order: ['gesture-synth', 'pistomp-pedalboard', 'pistomp-hal', 'arcade-sfx'],
      featured: ['gesture-synth', 'pistomp-pedalboard'],
    },
    aboutIntro:
      'I\'ve been recording music since high school, and now I build the software: a <a href="/projects/gesture-synth">polyphonic synth plugin</a> with every stage of the DSP hand-written, and a <a href="/projects/pistomp-pedalboard">Raspberry Pi pedalboard</a> with real-time neural amp modeling that\'s about to be my live rig — both real-time-safe by construction. A university audio technology minor and a decade of self-recording in Logic Pro mean I can hear the artifacts I\'m debugging.',
    skillGroupOrder: ['Audio & Native', 'Languages', 'Frontend', 'Backend', 'Tools & AI'],
  },

  cpp: {
    id: 'cpp',
    path: '/cpp',
    resumePath: '/resume/cpp',
    title: 'Tyler Teuber | C++ Engineer',
    description:
      'C++ engineer focused on real-time and embedded systems — lock-free audio code, TSan/ASan-verified, running on real hardware.',
    hero: {
      status: 'OPEN TO C++ / SYSTEMS ROLES',
      tagline:
        'C++ engineer for real-time and embedded systems — lock-free audio code, TSan/ASan-verified, running on real hardware.',
    },
    projects: {
      order: ['gesture-synth', 'pistomp-pedalboard', 'pistomp-hal'],
      featured: ['gesture-synth', 'pistomp-pedalboard'],
    },
    aboutIntro:
      'I write C++ where the deadline is a buffer boundary: a <a href="/projects/gesture-synth">synth plugin</a> whose DSP is entirely hand-written, a <a href="/projects/pistomp-pedalboard">multi-effect pedalboard</a> on a Raspberry Pi 5 where chain edits publish through epoch-based RCU so the audio thread never takes a lock, and a <a href="/projects/pistomp-hal">hardware abstraction library</a> with a full macOS simulator. TSan/ASan sweeps, Catch2 suites, and three-OS CI keep it honest.',
    skillGroupOrder: ['Languages', 'Audio & Native', 'Tools & AI', 'Backend', 'Frontend'],
  },

  python: {
    id: 'python',
    path: '/python',
    resumePath: '/resume/python',
    title: 'Tyler Teuber | Python Engineer',
    description:
      'Software engineer with production Python experience — data pipelines, FastAPI backend services, and packaged desktop tooling with real users.',
    hero: {
      status: 'OPEN TO PYTHON ROLES',
      tagline:
        'Python across the stack — data pipelines, FastAPI daemons that defend themselves, and desktop tools people still use every week.',
    },
    projects: {
      order: ['hypr-blocker', 'sermon-slides', 'lesson-agent', 'arcade-sfx'],
      featured: ['hypr-blocker'],
    },
    aboutIntro:
      'Python is my get-things-done language: web scraping pipelines and pandas at a recruiting-data startup, a <a href="/projects/hypr-blocker">FastAPI daemon that defends itself against its own user</a> with a self-healing watchdog mesh, and a <a href="/projects/sermon-slides">packaged desktop app</a> that has automated a weekly document workflow for its users for years.',
    skillGroupOrder: ['Languages', 'Backend', 'Tools & AI', 'Frontend', 'Audio & Native'],
  },
};

// Variants that get a tailored home page route (src/pages/[variant].astro).
export const homeVariantIds = ['web', 'ai', 'audio', 'cpp', 'python'];

// Variants with a resume page at /resume/<id>. Ministry is resume-only:
// the portfolio content doesn't tailor to it, so it links back to `/`.
export const resumeVariantIds = [...homeVariantIds, 'ministry'];

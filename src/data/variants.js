// Variant home pages: /web, /ai, /audio, /cpp, /embedded, /python serve tailored versions
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
      'Software engineer building across the whole signal chain: real-time C++ audio DSP, full-stack web apps, and AI-powered tools.',
    hero: {
      status: 'OPEN TO SOFTWARE ROLES',
      tagline:
        'Software engineer working the whole signal chain: from hand-written C++ DSP on the audio thread to the web apps that control it.',
    },
    projects: {},
    aboutIntro:
      "My love of technology started with Logic Pro when I was 16. I've always been creative, but recording and mixing my own music is where I discovered I also loved engineering, and I learned programming largely hoping to someday build the kind of music software I was so passionate about using. Now I build a bit of everything: a synthesizer plugin where I wrote all the DSP myself, a Raspberry Pi pedalboard I'm building as my live rig, and the TypeScript web apps, Python tools, and AI agents that make things like that usable by actual people.",
  },

  web: {
    id: 'web',
    path: '/web',
    resumePath: '/resume/web',
    title: 'Tyler Teuber | Web / Full-Stack Engineer',
    description:
      'Full-stack engineer in TypeScript since 2022: production Next.js migrations, React and Svelte apps, and web frontends that talk to real hardware.',
    hero: {
      status: 'OPEN TO WEB / FULL-STACK ROLES',
      tagline:
        'Full-stack engineer in TypeScript since 2022: production Next.js migrations, React apps, and Svelte control surfaces that talk to real hardware.',
    },
    projects: {
      order: ['arcade-sfx', 'lesson-agent', 'portfolio', 'hypr-blocker', 'pistomp-pedalboard'],
      featured: ['arcade-sfx', 'lesson-agent'],
    },
    aboutIntro:
      'I\'ve been writing TypeScript since 2022. At my web development internship I convinced my boss to migrate the site from WordPress to Next.js and got made coding manager for the migration, and since then I\'ve designed curriculum for a student team contributing to a production React/Nest.js codebase and built my own tools in React, Svelte, and Astro (including this site). I have strong opinions about my tools: I like Svelte a lot more than React, even though React is often the pragmatic choice. My favorite web projects are the ones connected to something real, like a <a href="/projects/pistomp-pedalboard">control surface for guitar hardware</a> or a <a href="/projects/arcade-sfx">synth that runs in the browser</a>.',
    skillGroupOrder: ['Frontend', 'Backend', 'Languages', 'Tools & AI', 'Audio & Native'],
  },

  ai: {
    id: 'ai',
    path: '/ai',
    resumePath: '/resume/ai',
    title: 'Tyler Teuber | AI Application Engineer',
    description:
      'Software engineer building LLM-powered applications from frontend to backend: a multi-agent learning platform built from scratch, with Claude Code as a daily development tool.',
    hero: {
      status: 'OPEN TO AI ENGINEERING ROLES',
      tagline:
        'I build LLM-powered applications from frontend to backend: agent frameworks from scratch, real features shipped, Claude Code on every project.',
    },
    projects: {
      order: ['lesson-agent', 'arcade-sfx', 'hypr-blocker'],
      featured: ['lesson-agent', 'arcade-sfx'],
    },
    aboutIntro:
      'I\'ve been using Claude Code since the Sonnet 3.5 days, and at this point I use it on every real project. I stay very up to date on frontier AI: which models are actually good at what, and things like MCP and skills as they get adopted. I also build LLM applications myself. My <a href="/projects/lesson-agent">Personal Lesson Agent</a> runs a four-agent framework I wrote from scratch that turns a short interview into a complete personalized course, and <a href="/projects/arcade-sfx">ArcadeSoundFX</a> ships a feature that turns plain English into synthesizer sounds. I\'m blown away by what\'s become possible.',
    skillGroupOrder: ['Tools & AI', 'Languages', 'Frontend', 'Backend', 'Audio & Native'],
  },

  audio: {
    id: 'audio',
    path: '/audio',
    resumePath: '/resume/audio',
    title: 'Tyler Teuber | Audio Software Engineer',
    description:
      'Audio software engineer and lifelong musician: a synthesizer plugin with entirely hand-written DSP, and a Raspberry Pi pedalboard built as my own live rig.',
    hero: {
      status: 'OPEN TO AUDIO SOFTWARE ROLES',
      tagline:
        'Musician-engineer building audio software: a synth plugin with every stage of the DSP hand-written, and the pedalboard that\'s becoming my live rig.',
    },
    projects: {
      order: ['gesture-synth', 'pistomp-pedalboard', 'stomplink', 'pistomp-hal', 'arcade-sfx'],
      featured: ['gesture-synth', 'pistomp-pedalboard'],
    },
    aboutIntro:
      'I\'ve been recording music since high school, and Logic Pro is honestly where my love of technology started. I minored in audio technology in college (Pro Tools, outboard gear, analog consoles) and learned programming largely hoping to someday build the kind of music software I was so passionate about using. Now I\'m actually doing it: a <a href="/projects/gesture-synth">polyphonic synth plugin</a> where I wrote every stage of the DSP myself, and a <a href="/projects/pistomp-pedalboard">Raspberry Pi pedalboard</a> with neural amp modeling that\'s about to become my live rig. A decade of recording myself means I can hear the artifacts I\'m debugging.',
    skillGroupOrder: ['Audio & Native', 'Languages', 'Frontend', 'Backend', 'Tools & AI'],
  },

  cpp: {
    id: 'cpp',
    path: '/cpp',
    resumePath: '/resume/cpp',
    title: 'Tyler Teuber | C++ Engineer',
    description:
      'C++ engineer focused on real-time and embedded systems: lock-free audio code, TSan/ASan-verified, running on real hardware.',
    hero: {
      status: 'OPEN TO C++ / SYSTEMS ROLES',
      tagline:
        'C++ engineer for real-time and embedded systems: lock-free audio code, TSan/ASan-verified, running on real hardware.',
    },
    projects: {
      order: ['gesture-synth', 'pistomp-pedalboard', 'pistomp-hal', 'stomplink'],
      featured: ['gesture-synth', 'pistomp-pedalboard'],
    },
    aboutIntro:
      'I\'ll be honest: I learned C++ because it\'s a must-know for audio software. But somewhere along the way I really came to appreciate it, and I\'m not upset that it\'s become the language I spend the most time with (there\'s something extremely satisfying about finally tracking down a segfault after hours in a debugger). My C++ is real-time audio code, where you can hear it when you get something wrong: a <a href="/projects/gesture-synth">synth plugin</a> with all the DSP hand-written, a <a href="/projects/pistomp-pedalboard">multi-effect pedalboard</a> on a Raspberry Pi 5 where the audio thread never takes a lock, and a <a href="/projects/pistomp-hal">hardware abstraction library</a> with a full macOS simulator. I take correctness seriously, with TSan and ASan sweeps, Catch2 test suites, and CI on three operating systems.',
    skillGroupOrder: ['Languages', 'Audio & Native', 'Tools & AI', 'Backend', 'Frontend'],
  },

  embedded: {
    id: 'embedded',
    path: '/embedded',
    resumePath: '/resume/embedded',
    title: 'Tyler Teuber | Embedded Software Engineer',
    description:
      'Embedded software engineer building audio devices: microcontroller firmware on STM32 and ESP32, hand-written C++ drivers (GPIO, SPI, ADCs, displays), and realtime audio at millisecond latencies.',
    hero: {
      status: 'OPEN TO EMBEDDED ROLES',
      tagline:
        'I build audio devices: embedded C++ drivers for the knobs, switches, LEDs, and displays they need, and realtime audio with a millisecond latency budget.',
    },
    projects: {
      order: ['stomplink', 'pistomp-hal', 'pistomp-pedalboard', 'gesture-synth'],
      featured: ['stomplink', 'pistomp-hal'],
    },
    aboutIntro:
      'For me, embedded is about building audio devices. I learned programming hoping to someday build the kind of music tools I was so passionate about using, and it turns out a lot of the ones I want to build are physical: things with knobs, footswitches, LEDs, and screens that make sound within a latency budget of a few milliseconds. My latest is <a href="/projects/stomplink">StompLink</a>, a guitar pedal that splits its firmware across two microcontrollers: audio on an STM32, with an ESP32-S3 handling USB, WiFi, and a web UI served from the pedal itself. Before that came a <a href="/projects/pistomp-pedalboard">Raspberry Pi pedalboard</a> I\'m building as my live rig, whose drivers I extracted into a <a href="/projects/pistomp-hal">standalone C++17 hardware abstraction layer</a> with a full macOS simulator behind the same headers. The skills carry across all of it: SPI and ADCs, driving displays, and audio code that never allocates or takes a lock on the hot path.',
    skillGroupOrder: ['Audio & Native', 'Languages', 'Tools & AI', 'Backend', 'Frontend'],
  },

  python: {
    id: 'python',
    path: '/python',
    resumePath: '/resume/python',
    title: 'Tyler Teuber | Python Engineer',
    description:
      'Software engineer with production Python experience: data pipelines, FastAPI backend services, and packaged desktop tooling with real users.',
    hero: {
      status: 'OPEN TO PYTHON ROLES',
      tagline:
        'Python across the stack: data pipelines, FastAPI daemons that defend themselves, and desktop tools people still use every week.',
    },
    projects: {
      order: ['hypr-blocker', 'sermon-slides', 'lesson-agent', 'arcade-sfx'],
      featured: ['hypr-blocker'],
    },
    aboutIntro:
      'Python was the first language I learned and it\'s still one of my favorites. It\'s just so hard to beat how quickly ideas can be captured in code with it. I used it professionally at my first internship, maintaining web scraping scripts and processing data with pandas, and it\'s still what I reach for first: a <a href="/projects/hypr-blocker">FastAPI daemon for an app blocker</a> that has to defend itself against the person who installed it, and a <a href="/projects/sermon-slides">desktop app I made for my church</a> that generates sermon slides. They still use it every week, years later, even though I\'ve moved on.',
    skillGroupOrder: ['Languages', 'Backend', 'Tools & AI', 'Frontend', 'Audio & Native'],
  },
};

// Variants that get a tailored home page route (src/pages/[variant].astro).
export const homeVariantIds = ['web', 'ai', 'audio', 'cpp', 'embedded', 'python'];

// Variants with a resume page at /resume/<id>. Ministry is resume-only:
// the portfolio content doesn't tailor to it, so it links back to `/`.
export const resumeVariantIds = [...homeVariantIds, 'ministry'];

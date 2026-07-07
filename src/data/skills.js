// Skills shown in the Skills section. A `filter` value makes the skill clickable:
// clicking it filters the Projects section by that tag (only rendered as a button
// when at least one project actually matches — see index.astro).

export const skillGroups = [
  {
    title: 'Languages',
    skills: [
      { name: 'TypeScript', filter: 'TypeScript' },
      { name: 'JavaScript', filter: 'JavaScript' },
      { name: 'Python', filter: 'Python' },
      { name: 'C++', filter: 'C++' },
      { name: 'Kotlin', filter: 'Kotlin' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', filter: 'React' },
      { name: 'Svelte', filter: 'Svelte' },
      { name: 'Astro', filter: 'Astro' },
      { name: 'Next.js' },
      { name: 'Tailwind CSS', filter: 'Tailwind' },
      { name: 'Sass', filter: 'Sass' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js' },
      { name: 'Nest.js' },
      { name: 'FastAPI', filter: 'FastAPI' },
      { name: 'Flask' },
      { name: 'Prisma' },
    ],
  },
  {
    title: 'Audio & Native',
    skills: [
      { name: 'JUCE', filter: 'JUCE' },
      { name: 'DSP', filter: 'DSP' },
      { name: 'Web Audio', filter: 'Web Audio' },
      { name: 'LVGL', filter: 'LVGL' },
      { name: 'Jetpack Compose', filter: 'Jetpack Compose' },
      { name: 'Electron', filter: 'Electron' },
    ],
  },
  {
    title: 'Tools & AI',
    skills: [
      { name: 'AI Agents', filter: 'AI Agents' },
      { name: 'Claude Code' },
      { name: 'Git' },
      { name: 'Linux', filter: 'Linux' },
      { name: 'Selenium' },
    ],
  },
];

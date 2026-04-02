<script>
  const categories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Next.js', level: 75 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Svelte', level: 70 },
      ],
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'Node.js', level: 75 },
        { name: 'Nest.js', level: 65 },
        { name: 'Flask', level: 70 },
        { name: 'Prisma', level: 60 },
      ],
    },
    {
      name: 'Languages',
      skills: [
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 80 },
        { name: 'Python', level: 85 },
        { name: 'C++', level: 65 },
      ],
    },
    {
      name: 'Tools',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Linux', level: 80 },
        { name: 'Selenium', level: 70 },
        { name: 'Claude Code', level: 90 },
      ],
    },
  ];

  let activeCategory = $state(0);
  let visible = $state(false);
  let animatedLevels = $state(categories[0].skills.map(() => 0));
  let containerEl = $state(null);

  $effect(() => {
    if (!containerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(containerEl);

    return () => observer.disconnect();
  });

  $effect(() => {
    const skills = categories[activeCategory].skills;
    animatedLevels = skills.map(() => 0);

    if (!visible) return;

    const timeouts = skills.map((skill, i) => {
      return setTimeout(() => {
        animatedLevels = animatedLevels.map((level, j) =>
          j === i ? skill.level : level
        );
      }, 100 + i * 80);
    });

    return () => timeouts.forEach(clearTimeout);
  });

  function selectCategory(index) {
    activeCategory = index;
  }

  let currentSkills = $derived(categories[activeCategory].skills);

  // Radar chart geometry
  const cx = 150;
  const cy = 150;
  const maxR = 120;
  const levels = 5;

  function getRadarPoints(skills, levelValues) {
    const n = skills.length;
    return levelValues.map((level, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = (level / 100) * maxR;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });
  }

  let radarPoints = $derived(getRadarPoints(currentSkills, animatedLevels));
  let radarPath = $derived(
    radarPoints.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ') + ' Z'
  );

  function getGridPoints(skillCount, level) {
    const n = skillCount;
    const r = (level / levels) * maxR;
    return Array.from({ length: n }, (_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });
  }

  function gridPath(points) {
    return points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ') + ' Z';
  }

  function getLabelPos(index, total) {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = maxR + 20;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }
</script>

<div bind:this={containerEl} class="w-full">
  <!-- Category Tabs -->
  <div class="flex flex-wrap justify-center gap-3 mb-10">
    {#each categories as cat, i}
      <button
        onclick={() => selectCategory(i)}
        class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border {activeCategory === i
          ? 'bg-amber-500 text-neutral-900 border-amber-500 shadow-lg shadow-amber-500/25'
          : 'bg-neutral-800/50 text-neutral-400 border-neutral-700 hover:border-amber-500/50 hover:text-neutral-200'}"
      >
        {cat.name}
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    <!-- Radar Chart -->
    <div class="flex justify-center">
      <svg viewBox="0 0 300 300" class="w-full max-w-[320px]">
        <!-- Grid lines -->
        {#each Array(levels) as _, l}
          {@const pts = getGridPoints(currentSkills.length, l + 1)}
          <path
            d={gridPath(pts)}
            fill="none"
            stroke="rgba(163,163,163,0.12)"
            stroke-width="1"
          />
        {/each}

        <!-- Axis lines -->
        {#each currentSkills as _, i}
          {@const angle = (Math.PI * 2 * i) / currentSkills.length - Math.PI / 2}
          <line
            x1={cx}
            y1={cy}
            x2={cx + maxR * Math.cos(angle)}
            y2={cy + maxR * Math.sin(angle)}
            stroke="rgba(163,163,163,0.08)"
            stroke-width="1"
          />
        {/each}

        <!-- Data polygon -->
        <path
          d={radarPath}
          fill="rgba(245,158,11,0.15)"
          stroke="#f59e0b"
          stroke-width="2"
          class="transition-all duration-500 ease-out"
        />

        <!-- Data points -->
        {#each radarPoints as point, i}
          <circle
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#f59e0b"
            stroke="#1c1917"
            stroke-width="2"
            class="transition-all duration-500 ease-out"
          />
        {/each}

        <!-- Labels -->
        {#each currentSkills as skill, i}
          {@const pos = getLabelPos(i, currentSkills.length)}
          <text
            x={pos.x}
            y={pos.y}
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#a3a3a3"
            font-size="10"
            font-family="Inter, sans-serif"
          >
            {skill.name}
          </text>
        {/each}
      </svg>
    </div>

    <!-- Skill Bars -->
    <div class="space-y-4">
      {#each currentSkills as skill, i}
        <div>
          <div class="flex justify-between mb-1.5">
            <span class="text-sm font-medium text-neutral-300">{skill.name}</span>
            <span class="text-sm font-mono text-amber-500">{animatedLevels[i]}%</span>
          </div>
          <div class="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-700 ease-out"
              style="width: {animatedLevels[i]}%; background: linear-gradient(90deg, #f59e0b, #d97706); transition-delay: {i * 80}ms;"
            ></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

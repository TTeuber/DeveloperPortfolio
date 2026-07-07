<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { projects, languageFilters, areaFilters } from '../data/projects.js';

  let active = $state('All');
  let videoProject = $state(null);

  const matches = (p, f) =>
    f === 'All' || p.languages.includes(f) || p.areas.includes(f) || p.tags.includes(f);

  const filtered = $derived(projects.filter((p) => matches(p, active)));
  const baseFilters = new Set(['All', ...languageFilters, ...areaFilters]);

  function setFilter(f) {
    active = active === f ? 'All' : f;
  }

  function initials(title) {
    return title
      .split(/\s+/)
      .filter((w) => /^[A-Za-z]/.test(w))
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');
  }

  onMount(() => {
    // Skills section dispatches this event (see index.astro) to filter projects.
    const onFilter = (e) => {
      const tag = e.detail;
      active = projects.some((p) => matches(p, tag)) ? tag : 'All';
    };
    window.addEventListener('filter-projects', onFilter);
    return () => window.removeEventListener('filter-projects', onFilter);
  });

  $effect(() => {
    document.body.style.overflow = videoProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') videoProject = null; }} />

<div class="filter-bar" role="toolbar" aria-label="Filter projects">
  <div class="filter-row">
    <span class="filter-label">Language</span>
    <button class="chip" class:active={active === 'All'} onclick={() => (active = 'All')}>All</button>
    {#each languageFilters as f}
      <button class="chip" class:active={active === f} aria-pressed={active === f} onclick={() => setFilter(f)}>{f}</button>
    {/each}
  </div>
  <div class="filter-row">
    <span class="filter-label">Focus</span>
    {#each areaFilters as f}
      <button class="chip" class:active={active === f} aria-pressed={active === f} onclick={() => setFilter(f)}>{f}</button>
    {/each}
    {#if !baseFilters.has(active)}
      <button class="chip active" onclick={() => (active = 'All')} title="Clear filter">{active} ✕</button>
    {/if}
  </div>
  <p class="filter-count" aria-live="polite">
    {filtered.length === projects.length ? `All ${projects.length} projects` : `${filtered.length} of ${projects.length} projects`}
  </p>
</div>

<div class="pgrid">
  {#each filtered as project (project.id)}
    <article class="pcard" animate:flip={{ duration: 350 }} transition:scale={{ duration: 250, start: 0.96 }}>
      <div class="pcard-media" style={`--accent: ${project.accent}`}>
        {#if project.image}
          <img src={project.image} alt={project.title} loading="lazy" />
        {:else}
          <div class="pcard-placeholder" aria-hidden="true">
            <span>{initials(project.title)}</span>
          </div>
        {/if}
      </div>
      <div class="pcard-body">
        <h3>{project.title}</h3>
        <p class="pcard-context">{project.context}</p>
        <p class="pcard-desc">{project.description}</p>
        <div class="tags">
          {#each project.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
        <div class="project-actions">
          {#if project.video}
            <button class="project-btn" onclick={() => (videoProject = project)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Watch Demo
            </button>
          {/if}
          {#if project.links.demo}
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" class="project-btn" class:project-btn-outline={project.video}>Live Demo</a>
          {/if}
          {#if project.links.code}
            <a href={project.links.code} target="_blank" rel="noopener noreferrer" class="project-btn" class:project-btn-outline={project.video || project.links.demo}>See Code</a>
          {/if}
        </div>
      </div>
    </article>
  {/each}
</div>

{#if videoProject}
  <div
    class="modal-backdrop"
    role="presentation"
    transition:fade={{ duration: 200 }}
    onclick={(e) => { if (e.target === e.currentTarget) videoProject = null; }}
  >
    <div class="modal" role="dialog" aria-modal="true" aria-label={`${videoProject.title} demo video`} transition:scale={{ duration: 250, start: 0.95 }}>
      <div class="modal-header">
        <span class="modal-title">{videoProject.title} — Demo</span>
        <button class="modal-close" onclick={() => (videoProject = null)} aria-label="Close demo">✕</button>
      </div>
      <div class="modal-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoProject.video}?autoplay=1`}
          title={`${videoProject.title} demo video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  /* ---- Filter bar ---- */
  .filter-bar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 40px;
  }

  .filter-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .filter-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #a1a1aa;
    width: 76px;
    flex-shrink: 0;
  }

  .chip {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 100px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    color: #52525b;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

    &:hover {
      border-color: rgba(55, 48, 163, 0.4);
      color: #3730a3;
    }

    &.active {
      background: #3730a3;
      border-color: #3730a3;
      color: #fff;
    }
  }

  .filter-count {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: #a1a1aa;
    margin: 0;
    padding-left: 84px;
  }

  /* ---- Card grid ---- */
  .pgrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
    gap: 28px;
  }

  .pcard {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    display: flex;
    flex-direction: column;

    &:hover {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
      transform: translateY(-2px);

      .pcard-media img {
        transform: scale(1.03);
      }
    }
  }

  .pcard-media {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #f4f4f5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  .pcard-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      135deg,
      hsl(var(--accent), 45%, 96%),
      hsl(var(--accent), 42%, 87%)
    );

    span {
      font-family: 'JetBrains Mono', monospace;
      font-size: 2.75rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: hsl(var(--accent), 45%, 45%);
    }
  }

  .pcard-body {
    padding: 28px;
    display: flex;
    flex-direction: column;
    flex: 1;

    h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 4px 0;
      color: #18181b;
      letter-spacing: -0.01em;
    }
  }

  .pcard-context {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 500;
    color: #e11d48;
    margin: 0 0 14px 0;
    letter-spacing: 0.02em;
  }

  .pcard-desc {
    font-size: 0.9rem;
    line-height: 1.7;
    color: #52525b;
    margin: 0 0 18px 0;
    flex: 1;
  }

  /* ---- Video modal ---- */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(24, 24, 27, 0.72);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .modal {
    width: min(960px, 100%);
    background: #fff;
    border-radius: 16px;
    padding: 12px 16px 16px;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 4px 10px;
  }

  .modal-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #18181b;
  }

  .modal-close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: #f4f4f5;
    color: #18181b;
    font-size: 0.875rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease;

    &:hover {
      background: #e4e4e7;
    }
  }

  .modal-video {
    aspect-ratio: 16 / 9;

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 10px;
      display: block;
    }
  }

  @media (max-width: 640px) {
    .filter-label {
      width: 100%;
    }

    .filter-count {
      padding-left: 0;
    }
  }
</style>

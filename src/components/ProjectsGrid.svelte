<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { projects as allProjects, languageFilters, areaFilters } from '../data/projects.js';

  // Optimized responsive variants keyed by project id (one array per project),
  // generated with getImage() in HomePage.astro. If a project isn't in the map,
  // fall back to the raw entries from projects.js.
  // `projects` lets variant home pages pass a reordered/re-featured list
  // (see projectsForVariant in projects.js).
  let { images = {}, projects = allProjects } = $props();

  let active = $state('All');
  let videoProject = $state(null);
  let modalEl = $state(null);
  let lastFocused = null;

  // Advances every few seconds so multi-image cards cycle through their
  // screenshots in step; single-image cards ignore it (tick % 1 === 0).
  let tick = $state(0);

  function mediaList(project) {
    return (
      images[project.id] ??
      (project.images ?? []).map((img) =>
        typeof img === 'string'
          ? { src: img }
          : { src: img.src, portrait: img.height > img.width }
      )
    );
  }

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

    // Auto-cycle multi-image cards, unless the user prefers reduced motion.
    let interval;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      interval = setInterval(() => (tick += 1), 4500);
    }

    return () => {
      window.removeEventListener('filter-projects', onFilter);
      clearInterval(interval);
    };
  });

  $effect(() => {
    document.body.style.overflow = videoProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  });

  // Move focus into the dialog on open and back to the trigger on close.
  $effect(() => {
    if (videoProject && modalEl) {
      lastFocused = document.activeElement;
      modalEl.querySelector('.modal-close')?.focus();
    } else if (!videoProject && lastFocused) {
      lastFocused.focus?.();
      lastFocused = null;
    }
  });

  // Keep Tab / Shift+Tab cycling inside the open dialog.
  function trapFocus(e) {
    if (e.key !== 'Tab' || !modalEl) return;
    const focusables = modalEl.querySelectorAll('button, a[href], iframe, video, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!modalEl.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') videoProject = null; else trapFocus(e); }} />

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
    {filtered.length === projects.length ? `ALL ${projects.length} PROJECTS` : `${filtered.length} OF ${projects.length} PROJECTS`}
  </p>
</div>

<div class="pgrid">
  {#each filtered as project (project.id)}
    <article
      class="pcard"
      class:featured={project.featured}
      style={`--h: ${project.accent}`}
      animate:flip={{ duration: 350 }}
      transition:scale={{ duration: 250, start: 0.96 }}
    >
      <div class="pcard-media">
        {#if mediaList(project).length}
          {@const media = mediaList(project)}
          {#each media as m, i (m.src)}
            <img
              src={m.src}
              srcset={m.srcset}
              sizes={m.sizes}
              class="pcard-img"
              class:stacked={media.length > 1}
              class:current={i === tick % media.length}
              class:portrait={m.portrait}
              alt={media.length > 1 ? `${project.title} screenshot ${i + 1} of ${media.length}` : `${project.title} screenshot`}
              loading="lazy"
            />
          {/each}
        {:else}
          <div class="pcard-placeholder" aria-hidden="true">
            <span class="ph-initials">{initials(project.title)}</span>
            <svg class="ph-wave" viewBox="0 0 200 32" fill="none" preserveAspectRatio="none">
              <path d="M0 16h24l4-8 5 14 4-9 4 6 4-3h22l4-12 5 22 4-16 4 10 4-4h26l4-6 5 10 4-4h24l4-10 5 18 4-13 4 8 4-3h24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {#if project.mediaPlanned}
              <span class="ph-chip">MEDIA IN PRODUCTION</span>
            {/if}
          </div>
        {/if}
      </div>
      <div class="pcard-body">
        <p class="pcard-context"><span class="pcard-led" aria-hidden="true"></span>{project.context}</p>
        <h3><a href={`/projects/${project.id}`} class="pcard-title-link">{project.title}</a></h3>
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
          <a href={`/projects/${project.id}`} class="project-btn project-btn-outline">Read More</a>
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
    <div class="modal" role="dialog" aria-modal="true" aria-label={`${videoProject.title} demo video`} bind:this={modalEl} transition:scale={{ duration: 250, start: 0.95 }}>
      <div class="modal-header">
        <span class="modal-title">{videoProject.title} — Demo</span>
        <button class="modal-close" onclick={() => (videoProject = null)} aria-label="Close demo">✕</button>
      </div>
      <div class="modal-video">
        {#if videoProject.video.file}
          <!-- svelte-ignore a11y_media_has_caption -->
          <video src={videoProject.video.file} controls autoplay playsinline></video>
        {:else}
          <iframe
            src={`https://www.youtube.com/embed/${videoProject.video}?autoplay=1`}
            title={`${videoProject.title} demo video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        {/if}
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
    margin-bottom: 44px;
  }

  .filter-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .filter-label {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-faint);
    width: 76px;
    flex-shrink: 0;
  }

  .chip {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid var(--line);
    background: var(--panel);
    color: var(--text-dim);
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 2px 3px rgba(0, 0, 0, 0.3);
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

    &:hover {
      border-color: var(--amber-dim);
      color: var(--amber);
    }

    &.active {
      background: var(--amber);
      border-color: var(--amber);
      color: var(--bg);
      box-shadow: 0 0 14px var(--amber-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
  }

  .filter-count {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    color: var(--text-faint);
    margin: 0;
    padding-left: 84px;
  }

  /* ---- Card grid ---- */
  .pgrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
    gap: 24px;
  }

  .pcard {
    background: var(--panel);
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--line);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.03);
    transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
    display: flex;
    flex-direction: column;

    &:hover {
      border-color: hsl(var(--h), 40%, 40%);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 24px hsla(var(--h), 70%, 55%, 0.1);
      transform: translateY(-2px);

      .pcard-media img {
        transform: scale(1.03);
      }
    }
  }

  // Featured cards span the full row and lay out horizontally on wide screens.
  .pcard.featured {
    grid-column: 1 / -1;

    @media (min-width: 861px) {
      flex-direction: row;

      .pcard-media {
        width: 52%;
        flex-shrink: 0;
        aspect-ratio: auto;
        min-height: 340px;
      }

      .pcard-body {
        padding: 36px 40px;
      }

      h3 {
        font-size: 1.75rem;
      }

      .pcard-desc {
        font-size: 0.9375rem;
      }
    }
  }

  .pcard-media {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--bg-deep);
    border-bottom: 1px solid var(--line);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;

      // Multi-image cards stack their screenshots and crossfade on `tick`.
      &.stacked {
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: transform 0.5s ease, opacity 0.9s ease;

        &.current {
          opacity: 1;
        }
      }

      // Phone screenshots letterbox against the deep background instead of
      // being crop-zoomed by object-fit: cover.
      &.portrait {
        object-fit: contain;
      }
    }
  }

  .pcard.featured .pcard-media {
    @media (min-width: 861px) {
      border-bottom: none;
      border-right: 1px solid var(--line);
    }
  }

  /* Faceplate placeholder: brushed-panel gradient, corner screws, waveform trace */
  .pcard-placeholder {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    background:
      radial-gradient(circle 3px at 16px 16px, hsl(var(--h), 12%, 22%) 0 2.5px, transparent 3px),
      radial-gradient(circle 3px at calc(100% - 16px) 16px, hsl(var(--h), 12%, 22%) 0 2.5px, transparent 3px),
      radial-gradient(circle 3px at 16px calc(100% - 16px), hsl(var(--h), 12%, 22%) 0 2.5px, transparent 3px),
      radial-gradient(circle 3px at calc(100% - 16px) calc(100% - 16px), hsl(var(--h), 12%, 22%) 0 2.5px, transparent 3px),
      linear-gradient(160deg, hsl(var(--h), 18%, 14%), hsl(var(--h), 24%, 9%));
  }

  .ph-initials {
    font-family: var(--font-mono);
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: hsl(var(--h), 45%, 62%);
    text-shadow: 0 0 24px hsla(var(--h), 70%, 55%, 0.35);
  }

  .ph-wave {
    width: min(200px, 70%);
    height: 32px;
    color: hsl(var(--h), 40%, 45%);
    opacity: 0.6;
  }

  .ph-chip {
    position: absolute;
    bottom: 14px;
    font-family: var(--font-mono);
    font-size: 0.5625rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    color: hsl(var(--h), 35%, 60%);
    border: 1px solid hsla(var(--h), 35%, 55%, 0.35);
    border-radius: 100px;
    padding: 4px 12px;
  }

  .pcard-body {
    padding: 26px 28px 28px;
    display: flex;
    flex-direction: column;
    flex: 1;

    h3 {
      font-size: 1.375rem;
      font-weight: 700;
      margin: 0 0 10px 0;
      color: var(--text);
      letter-spacing: -0.01em;
    }
  }

  .pcard-title-link {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--amber);
    }
  }

  .pcard-context {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--text-dim);
    margin: 0 0 12px 0;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pcard-led {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
    background: hsl(var(--h), 75%, 62%);
    box-shadow: 0 0 8px hsla(var(--h), 85%, 60%, 0.8);
  }

  .pcard-desc {
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--text-dim);
    margin: 0 0 18px 0;
    flex: 1;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    padding: 5px 12px;
    border-radius: 100px;
    border: 1px solid var(--line);
    color: var(--text-dim);
    background: var(--bg-deep);
  }

  .project-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .project-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 18px;
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    border: 1px solid var(--amber);
    background: var(--amber);
    color: var(--bg);
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: var(--amber-bright);
      border-color: var(--amber-bright);
      color: var(--bg);
      transform: translateY(-1px);
      box-shadow: 0 4px 18px var(--amber-glow);
    }
  }

  .project-btn-outline {
    background: transparent;
    border-color: var(--line-strong);
    color: var(--text);

    &:hover {
      background: transparent;
      color: var(--amber);
      border-color: var(--amber-dim);
      box-shadow: none;
    }
  }

  /* ---- Video modal ---- */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(10, 8, 5, 0.8);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .modal {
    width: min(960px, 100%);
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 12px 16px 16px;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 4px 10px;
  }

  .modal-title {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text);
  }

  .modal-close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--line);
    background: var(--bg-deep);
    color: var(--text);
    font-size: 0.875rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
      background: var(--amber);
      color: var(--bg);
    }
  }

  .modal-video {
    aspect-ratio: 16 / 9;

    iframe,
    video {
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 10px;
      display: block;
      background: var(--bg-deep);
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

<script>
  import { onMount } from 'svelte';

  // `images` entries: { src, srcset?, sizes?, portrait? } — pre-optimized by
  // the detail page's frontmatter (see pages/projects/[slug].astro).
  let { images = [], title = '' } = $props();

  let index = $state(0);
  let paused = $state(false);
  let timer;

  function go(i) {
    index = (i + images.length) % images.length;
    restartAuto();
  }

  function startAuto() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => {
      if (!paused) index = (index + 1) % images.length;
    }, 5000);
  }

  // Manual navigation resets the clock so the auto-advance doesn't fire
  // right after a click.
  function restartAuto() {
    clearInterval(timer);
    startAuto();
  }

  function onKeydown(e) {
    if (e.key === 'ArrowLeft') go(index - 1);
    else if (e.key === 'ArrowRight') go(index + 1);
  }

  onMount(() => {
    startAuto();
    return () => clearInterval(timer);
  });
</script>

<div
  class="carousel"
  role="region"
  aria-roledescription="carousel"
  aria-label={`${title} screenshots`}
  onmouseenter={() => (paused = true)}
  onmouseleave={() => (paused = false)}
  onfocusin={() => (paused = true)}
  onfocusout={() => (paused = false)}
  onkeydown={onKeydown}
>
  <div class="frame">
    {#each images as img, i (img.src)}
      <img
        src={img.src}
        srcset={img.srcset}
        sizes={img.sizes}
        class:current={i === index}
        class:portrait={img.portrait}
        alt={`${title} screenshot ${i + 1} of ${images.length}`}
        loading={i === 0 ? 'eager' : 'lazy'}
      />
    {/each}
    <button class="arrow prev" onclick={() => go(index - 1)} aria-label="Previous screenshot">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
    </button>
    <button class="arrow next" onclick={() => go(index + 1)} aria-label="Next screenshot">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6" /></svg>
    </button>
  </div>
  <div class="controls">
    <div class="dots">
      {#each images as img, i (img.src)}
        <button
          class="dot"
          class:current={i === index}
          onclick={() => go(i)}
          aria-label={`Go to screenshot ${i + 1}`}
          aria-current={i === index}
        ></button>
      {/each}
    </div>
    <span class="counter" aria-hidden="true">{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
  </div>
</div>

<style lang="scss">
  .carousel {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--line);
    background: var(--bg-deep);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .frame {
    position: relative;
    aspect-ratio: 16 / 10;

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.5s ease;

      &.current {
        opacity: 1;
      }

      // Phone screenshots letterbox instead of being crop-zoomed.
      &.portrait {
        object-fit: contain;
      }
    }
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--line);
    background: rgba(10, 8, 5, 0.65);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    color: var(--text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

    &:hover {
      background: var(--amber);
      border-color: var(--amber);
      color: var(--bg);
    }

    &.prev {
      left: 14px;
    }

    &.next {
      right: 14px;
    }
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    border-top: 1px solid var(--line);
    background: var(--panel);
  }

  .dots {
    display: flex;
    gap: 2px;
  }

  // The button is a 22px hit target; the visible 8px circle is its ::before.
  .dot {
    width: 22px;
    height: 22px;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 1px solid var(--line);
      background: var(--bg-deep);
      transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
    }

    &:hover::before {
      border-color: var(--amber-dim);
    }

    &.current::before {
      background: var(--amber);
      border-color: var(--amber);
      box-shadow: 0 0 8px var(--amber-glow);
    }
  }

  .counter {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.1em;
    color: var(--text-faint);
  }
</style>

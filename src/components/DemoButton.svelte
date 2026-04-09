<script>
  import { demoOpen } from './demoState.svelte.js';
</script>

<button class="project-btn" onclick={() => demoOpen.value = !demoOpen.value}>
  {demoOpen.value ? 'Hide Demo' : 'See Demo'}
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron" class:rotated={demoOpen.value}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
</button>

<style lang="scss">
  .project-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
    background: #3730A3;
    color: #fff;
    margin-top: 16px;
    width: fit-content;
  }

  .project-btn:hover {
    background: #312E81;
    transform: translateY(-1px);
  }

  .chevron {
    transition: transform 0.3s ease;
  }

  .chevron.rotated {
    transform: rotate(180deg);
  }
</style>

<script>
  import { demoOpen } from './demoState.svelte.js';
</script>

<div class="youtube-demo">
  <div class="embed-wrapper" class:expanded={demoOpen.value}>
    <div class="embed-container">
      {#if demoOpen.value}
        <div class="video-card">
          <iframe
            src="https://www.youtube.com/embed/nWYTKmqFDi4"
            title="Synthesizer VST Demo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .youtube-demo {
    width: 100%;
    margin-top: -48px;
  }

  .embed-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.5s ease;
  }

  .embed-wrapper.expanded {
    grid-template-rows: 1fr;
  }

  .embed-container {
    overflow: hidden;
  }

  .video-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
    padding: 20px 32px;
    margin-top: 16px;
  }

  .video-card iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 10px;
    display: block;
  }
</style>

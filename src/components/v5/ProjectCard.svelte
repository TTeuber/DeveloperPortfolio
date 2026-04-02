<script>
  let { title, description, image, tech = [], features = [] } = $props();

  let cardEl = $state(null);
  let rotateX = $state(0);
  let rotateY = $state(0);
  let glareX = $state(50);
  let glareY = $state(50);
  let isHovered = $state(false);
  let visible = $state(false);

  $effect(() => {
    if (!cardEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(cardEl);

    return () => observer.disconnect();
  });

  function handleMouseMove(e) {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateY = ((x - centerX) / centerX) * 8;
    rotateX = -((y - centerY) / centerY) * 8;
    glareX = (x / rect.width) * 100;
    glareY = (y / rect.height) * 100;
  }

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
    rotateX = 0;
    rotateY = 0;
    glareX = 50;
    glareY = 50;
  }
</script>

<div
  bind:this={cardEl}
  class="group relative rounded-2xl overflow-hidden transition-all duration-500
    {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}"
  style="
    transform: perspective(800px) rotateX({rotateX}deg) rotateY({rotateY}deg) {isHovered ? 'scale(1.02)' : 'scale(1)'};
    transition: transform 0.15s ease-out, opacity 0.7s ease-out, translate 0.7s ease-out;
  "
  onmousemove={handleMouseMove}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="article"
>
  <!-- Glare overlay -->
  <div
    class="absolute inset-0 z-20 pointer-events-none opacity-0 transition-opacity duration-300
      {isHovered ? '!opacity-100' : ''}"
    style="
      background: radial-gradient(circle at {glareX}% {glareY}%, rgba(245,158,11,0.08) 0%, transparent 60%);
    "
  ></div>

  <!-- Card background -->
  <div class="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-2xl group-hover:border-amber-500/30 transition-colors duration-300"></div>

  <!-- Content -->
  <div class="relative z-10">
    <!-- Image -->
    <div class="relative overflow-hidden h-52">
      <img
        src={image}
        alt={title}
        class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent"></div>
    </div>

    <!-- Text Content -->
    <div class="p-6">
      <h3 class="text-xl font-bold text-neutral-100 mb-2 group-hover:text-amber-400 transition-colors duration-300">
        {title}
      </h3>
      <p class="text-neutral-400 text-sm leading-relaxed mb-4">{description}</p>

      <!-- Features -->
      {#if features.length > 0}
        <div class="mb-4">
          <ul class="grid grid-cols-2 gap-1.5">
            {#each features as feature}
              <li class="text-xs text-neutral-500 flex items-center gap-1.5">
                <span class="w-1 h-1 rounded-full bg-amber-500 shrink-0"></span>
                {feature}
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <!-- Tech Tags -->
      <div class="flex flex-wrap gap-2">
        {#each tech as t}
          <span class="px-2.5 py-1 text-xs font-mono rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {t}
          </span>
        {/each}
      </div>
    </div>
  </div>
</div>

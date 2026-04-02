<script>
  let progress = $state(0);

  $effect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="fixed top-0 left-0 w-full h-1 z-[100]" style="background: linear-gradient(90deg, transparent, rgba(245,158,11,0.1));">
  <div
    class="h-full transition-all duration-150 ease-out"
    style="width: {progress}%; background: linear-gradient(90deg, #f59e0b, #d97706, #b45309);"
  ></div>
</div>

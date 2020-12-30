<script>
  import { onMount } from 'svelte';
  import layout from '../lib/layout';

  let canvas;

  onMount(async () => {
    await layout.setup({
      canvas
    });
  });

</script>

<canvas id="SynthCanvas" bind:this={canvas}></canvas>
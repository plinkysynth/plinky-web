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

<style>
  canvas {
    position: relative;
    pointer-events: none;
  }
</style>

<canvas id="SynthCanvas" bind:this={canvas}></canvas>
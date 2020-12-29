<script>

  import styleFormatter from './styleFormatter';
  import { screens } from '../lib/config';
  import { onMount } from 'svelte';

  import Synth from '../lib/Synth';

  export let screen;

  // Merge props from base type
  screen = Object.assign({}, screens.types.find(b => b.id === screen.type), screen);

  let ctx;
  let canvas;

  onMount(() => {
    Synth.registerScreen(screen, canvas);
  })

</script>


<style>
  .Screen {
    position: absolute;
    top: 0;
    left: 0;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>


<div class="Screen" style={styleFormatter(screen)}>
  <canvas id="Screen-{screen.id}" bind:this={canvas}></canvas>
</div>
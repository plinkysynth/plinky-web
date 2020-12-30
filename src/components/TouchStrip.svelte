<script>

  import hover from './stores/hover';
  import { registerTouchable } from './touchable';
  import styleFormatter from './styleFormatter';
  import { onMount } from 'svelte';
  import Synth from '../lib/Synth';

  export let strip;

  let DOMNode;
  
  const DOMId = `Touchstrip-${strip.group}-${strip.id}`;

  strip.ontouchmove = function(e) {
    console.log('strip.ontouchmove', e);
  }

  onMount(() => {
    Synth.registerTouchstrip(strip, DOMNode, DOMId);
    registerTouchable('touchstrip', strip);
  })

</script>

<style>
  .TouchStrip {
    position: absolute;
  }
</style>

<div class="TouchStrip touchable" style={styleFormatter(strip)} bind:this={DOMNode} id={DOMId}>
</div>
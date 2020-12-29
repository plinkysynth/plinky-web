<script>

  import hover from './hover';
  import grabbing from './grabbing';
  import styleFormatter from './styleFormatter';
  import { onMount } from 'svelte';
  import Synth from '../lib/Synth';
  export let strip;

  let node;

  onMount(() => {
    Synth.registerTouchstrip(strip, node);
  })

  let _grabbing = false;
  let grabStartX, grabStartY, curGrabAmtY, curGrabAmtX;

  function mousedown(mde) {

    if(!_grabbing) {
      
      _grabbing = true;

      // Get bottom left corner of this strip on the screen so we can provide
      // relative x/y coordinates starting from there on mousemove
      const blX = mde.screenX - mde.offsetX;
      const blY = mde.screenY + (strip.height - mde.offsetY);

      // Call down event with the offset
      Synth.touchstripDown(strip.id, mde.offsetX, (strip.height - mde.offsetY));

      grabbing.set({
        type: 'touchstrip',
        id: strip.id
      });

      const mmEv = (mme) => {
        Synth.touchstripMove(strip.id, mme.screenX - blX, -1*(mme.screenY - blY))
      };

      const muEv = (mue) => {
        Synth.touchstripUp(strip.id, mue.offsetX, mue.offsetY)
        _grabbing = false;
        grabbing.set("");
        window.removeEventListener('mousemove', mmEv);
        window.removeEventListener('mouseup', muEv);
      };

      window.addEventListener('mousemove', mmEv);
      window.addEventListener('mouseup', muEv);

    }

  }


</script>

<style>
  .TouchStrip {
    position: absolute;
  }
</style>

<div class="TouchStrip" style={styleFormatter(strip)} bind:this={node} on:mousedown={mousedown}>
</div>
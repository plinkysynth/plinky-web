<script>

  import hover from './stores/hover';
  import { registerTouchable } from './stores/touching';
  import styleFormatter from './styleFormatter';
  import { onMount } from 'svelte';
  import Synth from '../lib/Synth';

  export let strip;

  let DOMNode;
  
  const DOMId = `Touchstrip-${strip.group}-${strip.id}`;

  strip.touchstripMove = function(x, y) {
    
  }

  onMount(() => {
    Synth.registerTouchstrip(strip, DOMNode, DOMId);
    registerTouchable('touchstrip', strip);
  })

  function touchstart(e) {

    console.log(e);
    registerFinger(e, strip.group, strip.id, e.screenX, e.screenY);

    /*
    if(!_touching) {
      
      _touching = true;

      // Get bottom left corner of this strip on the screen so we can provide
      // relative x/y coordinates starting from there on mousemove
      const blX = mde.screenX - mde.offsetX;
      const blY = mde.screenY + (strip.height - mde.offsetY);

      // Call down event with the offset
      Synth.touchstripDown(strip.id, mde.offsetX, (strip.height - mde.offsetY));

      touching.set({
        type: 'touchstrip',
        id: strip.id
      });

      const mmEv = (mme) => {
        Synth.touchstripMove(strip.id, mme.screenX - blX, -1*(mme.screenY - blY))
      };

      const muEv = (mue) => {
        Synth.touchstripUp(strip.id, mue.offsetX, mue.offsetY)
        _touching = false;
        touching.set("");
        window.removeEventListener('mousemove', mmEv);
        window.removeEventListener('mouseup', muEv);
      };

      window.addEventListener('mousemove', mmEv);
      window.addEventListener('mouseup', muEv);

    }
    */

  }


</script>

<style>
  .TouchStrip {
    position: absolute;
  }
</style>

<div class="TouchStrip touchable" style={styleFormatter(strip)} bind:this={DOMNode} id={DOMId}>
</div>
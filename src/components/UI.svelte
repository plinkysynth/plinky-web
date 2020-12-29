<script>

  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  import { buttons, knobs, screens, touchstrips, ui } from '../lib/config';

  import hover from './stores/hover';

  import grabbing from './stores/grabbing';
  import touching, { touchstart } from './stores/touching';

  import Button from './Button.svelte';
  import Knob from './Knob.svelte';
  import Screen from './Screen.svelte';
  import TouchStrip from './TouchStrip.svelte';
  import styleFormatter from './styleFormatter';

  let x = 3;

  setInterval(() => {
    x = x + 1;
    if(x > 15) x = 1;
  }, 250);

  const isActive = function(i, y, h) {
    return h === '' && i % y === 0;
  }

  const mouseout = function(e) {
    hover.set('');
  }

</script>

<style>
  .UI {
    border-radius: 6px;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    display: block;
    box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 1);
    z-index: 2;
  }
  .UI.grabbing {
    cursor: grabbing;
  }
  .UI.grabbing * {
    pointer-events: none;
  }
  .UI.touching {
    cursor: move;
  }
</style>

<div
  class='UI'
  class:grabbing={$grabbing !== ''}
  class:touching={$touching}
  style='{styleFormatter(ui)}' 
  on:mouseleave={mouseout}
  on:touchstart={touchstart}
>
  <div class='Screens'>
    {#each screens as screen, i}
      <Screen {screen} />
    {/each}
  </div>
  <div class="TouchStrips">
    {#each touchstrips as strip, i}
      <TouchStrip {strip} />
    {/each}
  </div>
  <div class='Buttons'>
    {#each buttons as btn, i}
      <Button {btn} active={isActive(i, x, $hover)} />
    {/each}
  </div>
  <div class='Knobs'>
    {#each knobs as knob, i}
      <Knob {knob} />
    {/each}
  </div>
</div>

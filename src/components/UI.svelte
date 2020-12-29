<script>

  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  import { buttons, knobs, screens, ui } from '../lib/config';

  import hover from './hover';
  import grabbing from './grabbing';
  import Button from './Button.svelte';
  import Knob from './Knob.svelte';
  import Screen from './Screen.svelte';
  import TouchStrip from './TouchStrip.svelte';

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
</style>

<div class='UI' class:grabbing={$grabbing !== ''} style='border-radius: { ui.borderRadius ? ui.borderRadius : '0' }; background-color: { ui.backgroundColor ? ui.backgroundColor : undefined }; width: {ui.width}px; height: {ui.height}px; background-image: { ui.backgroundImage ? `url(${ui.backgroundImage})` : undefined };' on:mouseleave={mouseout}>
  <div class='Screens'>
    {#each screens as screen, i}
      <Screen {screen} />
    {/each}
  </div>
  <div class="TouchStrips">
    <TouchStrip />
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

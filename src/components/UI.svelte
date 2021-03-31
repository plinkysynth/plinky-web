<script>

  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  import { buttons, knobs, screens, touchstrips, ui } from '../lib/config';

  import hover from './stores/hover';

  import grabbing from './stores/grabbing';
  import isTouching from './stores/isTouching';
  import touchable from './touchable';

  import Button from './Button.svelte';
  import Knob from './Knob.svelte';
  import Screen from './Screen.svelte';
  import TouchStrip from './TouchStrip.svelte';
  import styleFormatter from './styleFormatter';
  import SynthCanvas from './SynthCanvas.svelte';
  import Synth from '../lib/Synth';
  import layout from '../lib/layout';

  let x = 3;
  let hasInteracted = false;

  setInterval(() => {
    x = x + 1;
    if(x > 15) x = 1;
  }, 250);

  const isActive = function(i, y, h) {
    return h === '' && i % y === 0;
  }

  function start() {
    hasInteracted = true;
    Synth.userHasInteracted = true;
  }

  const mouseout = function(e) {
    hover.set('');
  }

  function touchablestart(e) {
    Synth.touchMove(e.detail);
  }

  function touchablemove(e) {
    Synth.touchMove(e.detail);
  }

  function touchableend(e) {
    Synth.touchUp(e.detail);
  }

  let container;

  onMount(() => {
    layout.registerUIContainer(container);
  });

  let keysdown = [];

  function onkeydown(e) {

    if(e.repeat) return;

    console.log(e);

    if(e.key === 'q' && keysdown.indexOf('ALT1') === -1) {
      Synth.buttonDown('ALT1');
      keysdown.push('ALT1');
    }
    else if(e.key === 'w' && keysdown.indexOf('ALT2') === -1) {
      Synth.buttonDown('ALT2');
      keysdown.push('ALT2');
    }

  }

  function onkeyup(e) {

    if(e.key === 'q') {
      Synth.buttonUp('ALT1');
      keysdown = keysdown.filter(k => k !== 'ALT1');
    }
    else if(e.key === 'w') {
      Synth.buttonUp('ALT2');
      keysdown = keysdown.filter(k => k !== 'ALT2');
    }

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
    cursor: pointer;
  }
  .interact {
    width: 100%;
    height: 100%;
    color: white;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.75);
    z-index: 1000;
  }
</style>

<svelte:window on:keydown={onkeydown} on:keyup={onkeyup} />

<div
  bind:this={container}
  class='UI'
  class:grabbing={$grabbing !== ''}
  class:touching={$isTouching}
  style='{styleFormatter(ui, {
    ignore: ['width', 'height']
  })}'
  on:mouseleave={mouseout}
  use:touchable
  on:touchablestart={touchablestart}
  on:touchablemove={touchablemove}
  on:touchableend={touchableend}
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
  <SynthCanvas />
  {#if !hasInteracted}
    <div class="interact">
      <button on:click={start}>Click to start</button>
    </div>
  {/if}
</div>


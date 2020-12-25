<script>

  import hover from './hover';
  import grabbing from './grabbing';
  import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import config from "./buttons.js";
  import { get } from 'svelte/store';
  import Knob from './Knob.svelte';

  const { buttons, knobs, screens, connectors } = config;

  let x = 3;

  setInterval(() => {
    x = x + 1;
    if(x > 15) x = 1;
  }, 250);

  const isActive = function(i, y, h) {
    return h === "" && i % y === 0;
  }

  const mouseout = function(e) {
    hover.set("");
  }

</script>

<style>
  .UI {
    border-radius: 6px;
    background-image: url('/plinky_alpha.png');
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    display: block;
    box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 1);
    z-index: 2;
    border-radius: 18px;
    background-color: #111;
  }
  .Logo {
    margin: 0 auto;
    width: 128px;
  }
  .Logo img {
    width: 100%;
  }
  .Screen {
    position: absolute;
    top: 103px;
    left: 468px;
    background-color: rgba(20, 0, 147, 0.5);
    width: 199px;
    height: 65px;
  }
  .UI.grabbing {
    cursor: grabbing;
  }
  .UI.grabbing * {
    pointer-events: none;
  }
</style>

<div class="UI" class:grabbing={$grabbing !== ""} style="min-width: {config.width}px; width: {config.width}px; height: {config.height}px;" on:mouseleave={mouseout}>
  <div class="Logo">
  </div>
  <div class="Screen"></div>
  <div class="Buttons">
    {#each buttons as btn, i}
      <Button {btn} active={isActive(i, x, $hover)} />
    {/each}
  </div>
  <div class="Knobs">
    {#each knobs as knob, i}
      <Knob {knob} />
    {/each}
  </div>
</div>

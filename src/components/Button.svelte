<script>

  import hover from './hover';
  import { buttons } from '../lib/config';

  export let btn;
  export let active;

  const mouseover = function(e) {
    if(!btn.ignore) hover.set(btn.id);
  }

  const mouseout = function(e) {
    //hover.set("");
  }

  // Merge props from base type
  btn = Object.assign({}, buttons.types.find(b => b.id === btn.type), btn);

</script>

<style>
  .Button {
    position: absolute;
    transition: all 1s;
  }
  .Button:not(.ignore):hover {
    background-color: rgba(255, 255, 255, 0.35);
    cursor: pointer;
    transition: all 0.1s;
    box-shadow: 0px 0px 128px 32px rgba(0, 0, 0, 0.85);
  }
  .LED {
    position: absolute;
    z-index: 2;
    top: 6%;
    left: -7%;
    border: 1px solid white;
    border-radius: 50%;
    width: 12%;
    height: 12%;
    overflow: hidden;
    background: #333333;
    border-color: transparent;
  }
  .LED.active {
    box-shadow: 0px 0px 16px 4px white;
  }
  .LEDLight {
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: all 0.4s;
  }
  .LED.active .LEDLight {
    opacity: 1;
  }
  img {
    z-index: 1;
    position: relative;
    display: block;
    -webkit-filter: invert(100%); /* safari 6.0 - 9.0 */
    filter: invert(100%);
    pointer-events: none;
  }
</style>

<div class="Button" style="top: {btn.y}px; left: {btn.x}px; width: {btn.width}px; height: {btn.height}px; border-radius: {btn.borderRadius};" on:mouseover={mouseover} on:mouseout={mouseout} class:ignore={btn.ignore}>
  {#if btn.led}
    <div class="LED" class:active style="box-shadow: {active ? `0px 0px 24px 4px ${btn.led}` : 'none' }; border-color: {active ? btn.led : "#333333"}; top: {btn.ledY}; left: {btn.ledX};">
      <div class="LEDLight" style="background-color: {btn.led};"></div>
    </div>
  {/if}
  <img src="/svg/{btn.icon}.svg" alt="Button" />
</div>
<script>
  import hover from './hover';
  import grabbing from './grabbing';
  import _config from "./buttons.js";
  const config = _config.config;
  export let knob = {};

  // Merge props from base type
  knob = Object.assign({}, config.knobs[knob.type], knob);

  export let curVal = 0;
  export let minVal = 0;
  export let maxVal = 255;

  const maxMovement = 100; // Maximum amount to move your mouse vertically to go from 0% to 100%, in pixels

  let rot; 
  $: rot;

  console.log(rot);

  let _grabbing = false;
  let grabStartY = 0;
  let curGrabAmt = 0;

  const grab = function(mde) {
    if(!_grabbing) {
      grabStartY = mde.screenY;
      _grabbing = true;
      grabbing.set(knob.id);

      const mmEv = (mme) => {
        curGrabAmt = grabStartY - mme.screenY;
        const c = curGrabAmt / maxMovement;
        rot = Math.atan2(c, 1) * 360;
      };

      const muEv = (mue) => {
        _grabbing = false;
        grabbing.set("");
        curGrabAmt = 0;
        grabStartY = 0;
        window.removeEventListener('mousemove', mmEv);
        window.removeEventListener('mouseup', muEv);
      };

      window.addEventListener('mousemove', mmEv);
      window.addEventListener('mouseup', muEv);

    }
  }

</script>

<style>
  .Knob {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid white;
    box-shadow: 12px 12px 16px 0px rgba(0,0,0,0.85);
    cursor: grab;
  }
  .Tip {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0%;
    z-index: 2;
    background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 65%, rgba(255,255,255,1) 65%, rgba(255,255,255,1) 100%);
    height: 1px;
  }
</style>

<div class="Knob" class:grabbing style="top: {knob.y}px; left: {knob.x}px; width: {knob.width}px; height: {knob.height}px; background-color: {knob.backgroundColor}; border-color: {knob.borderColor};" on:mousedown={grab}>
  {#if knob.tipColor}
    <div class="Tip" style="border-color: {knob.tipColor}; transform: rotate({rot}deg);"></div>
  {/if}
</div>
<script>
  import hover from './stores/hover';
  import config from './buttons';

  function getButton(id) {
    console.log(id);
    const s = config && config.buttons && config.buttons.find(b => b.id === id);
    console.log(s);
    return s && s.help ? s.help : 'none';
  }

  let name, category, help;
  let x = 0, y = 0;

  hover.subscribe((id) => {
    const item = config && config.buttons && config.buttons.find(b => b.id === id) || {};
    name = item.name || "";
    category = item.category || "";
    help = item.help || "(No help yet)";
    x = (item.x || 76) - 76;
    y = (item.y || 270) - 270;
  });

</script>

<style>
  .Help {
    border: 1px solid white;
    border-radius: 4px;
    box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 1);
    width: 240px;
    z-index: 3;
    position: absolute;
    top: 100px;
    left: 100px;
    background: #222;
    transition: all 0.1s ease-out;
    opacity: 0;
  }
  .Help.hover {
    opacity: 1;
  }
  p {
    color: white;
    font-size: 2rem;
  }
  h3 {
    font-size: 2rem;
    line-height: 3rem;
    margin: 0;
    padding: 2rem;
    background-color: white;
    color: #222222;
  }
  h2 {
    font-size: 2rem;
    line-height: 3rem;
    margin: 0;
    padding: 2rem 2rem;
    background-color: #666666;
  }
  p {
    margin: 0;
    border-top: 1px solid white;
    padding: 2rem;
    font-size: 2rem;
    line-height: 3rem;
  }
</style>

<div class="Help" class:hover={$hover} style="left: {x}px; top: {y}px;">
  {#if $hover}
    <h3>{category}</h3>
    <h2>{name}</h2>
    <p>{help}</p>
  {:else}
    <p>Point at a button to see what it's about!</p>
  {/if}
</div>

<script>

  import styleFormatter from './styleFormatter';

  export let canvas;

  let ctx;
  let width = 128;
  let height = 32;

  onMount(() =>{

    /*
    ctx = canvas.getContext('2d', {
      alpha: false,
      antialias: false,
      depth: false,
    });

    // Set canvas width/height internally so it renders
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    if (!ctx) {
        throw 'Your browser does not support canvas';
    }

    var inited = 0;
    var data, img, leddata;
    var audioCtx, scriptNode;
    var pos0 = document.getElementById("pos0");
    var pressure0 = document.getElementById("pressure0");
  
    function render() {
      if (calledRun) {
          if (!inited) {
              console.log("init plinky 123!");
              _plinky_init();
              inited = true;
              console.log("init plinky done!");
              const pointer = _getemubitmap();
              const leds = _getemuleds();
              const audiobuf = _get_wasm_audio_buf();
              console.log(pointer, leds);
              data = new Uint8ClampedArray(HEAP8.buffer, pointer, 128 * 32 * 4);
              leddata = new Uint8ClampedArray(HEAP8.buffer, leds, 9 * 8);
              console.log(screen.width, screen.height, width, height);
              img = new ImageData(data, width, height);

              const playbutton = document.getElementById('playbtn');
              const stopbutton = document.getElementById('stopbtn');
              audioCtx = new AudioContext({sampleRate:32000});
              scriptNode = audioCtx.createScriptProcessor(1024, 0, 2);
              console.log(scriptNode.bufferSize);
              scriptNode.onaudioprocess = function (audioProcessingEvent) {
                  //var inputBuffer = audioProcessingEvent.inputBuffer;
                  var outputBuffer = audioProcessingEvent.outputBuffer;
                  var l  = outputBuffer.getChannelData(0);
                  var r  = outputBuffer.getChannelData(1);
                  _wasm_settouch(0, pos0.value, pressure0.value);
//                        console.log(l.length);
                  for (var smp=0;smp<l.length;smp+=64) {
                      _wasm_audio();
                      var ofs=audiobuf/2;
                      for (var i=0;i<64;++i) {
                          l[smp+i]=HEAP16[ofs++] * (1.0/32768.0);
                          r[smp+i]=HEAP16[ofs++] * (1.0/32768.0);
                      }
                  }
                  _plinky_frame_wasm();
              }
              scriptNode.connect(audioCtx.destination);
              playbutton.onclick = function() {
                      audioCtx.resume();
              }
              stopbutton.onclick = function() {
                      audioCtx.suspend();
              }


          }
          ctx.putImageData(img, 0, 0);
          var idx = 0;
          for (var y = 0; y < 9; ++y) {
              for (var x = 0; x < 8; ++x) {
                  var c = leddata[idx++];
                  //dotelems[y][x].style.color = "rgb(" + c + "," + c + "," + c + ")";
              } //x
          } // y
      } // calledRun
      window.requestAnimationFrame(render);
  }
  window.requestAnimationFrame(render);
  */
  
  })
  

</script>


<style>
  .Screen {
    position: absolute;
    top: 0;
    left: 0;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
  #playbtn, #stopbtn {
    font-size: 24px;
    width: 100px;
    background: black;
    border: white;
  }
</style>

<input type="range" min="0" max="2048" value="0" class="slider" id="pressure0">
- Pressure
<br/>
<input type="range" min="0" max="2048" value="0" class="slider" id="pos0">
<div id="playbtn">play</div>
<div id="stopbtn">stop</div>

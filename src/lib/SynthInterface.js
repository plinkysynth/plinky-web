import scaleValue from "./scaleValue";
import SynthEngine from "./SynthEngine";

class SynthInterface extends SynthEngine {

  constructor() {
    console.log("SynthInterface constructor");
    super();
    this.currentTouch = null;
  }

  loadingFinished() {

    _plinky_init();

    // Get image bitmap
    this.bitmapPointer = _getemubitmap();

    // Attach pointer to screen
    this.screens = this.screens.map(screen => {
      if(screen.id === 'PlinkyScreen') {
        screen._pointer = this.bitmapPointer;
      }
      return screen;
    })

    // Get LED array
    this.__leds = _getemuleds();
    this.__leddata = new Uint8ClampedArray(HEAP8.buffer, this.__leds, 9 * 8);
    
    // Set up audio buffer
    this.audiobuf = _get_wasm_audio_buf();

    // Run setup from SynthEngine
    this.setup();

    console.log("Plinky initialised");

  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  onAudioProcess(audioProcessingEvent) {

    // Set output buffer
    const outputBuffer = audioProcessingEvent.outputBuffer;

    // Get left and right channels from output buffer
    const l = outputBuffer.getChannelData(0);
    const r = outputBuffer.getChannelData(1);

    //console.log(this.currentTouch);

    // Set touch event position
    if(this.currentTouch) {
      console.log('touch');
      _wasm_settouch(this.currentTouch.stripIndex, this.currentTouch.position, this.currentTouch.pressure);
    }

    // Do a frame of audio
    for (var smp=0;smp<l.length;smp+=64) {

      _wasm_audio();

      var ofs=this.audiobuf/2;

      for (var i=0;i<64;++i) {
        l[smp+i]=HEAP16[ofs++] * (1.0/32768.0);
        r[smp+i]=HEAP16[ofs++] * (1.0/32768.0);
      }

    }

    _plinky_frame_wasm();

  }

  start() {
    this.audioCtx.resume();
  }

  stop() {
    this.audioCtx.suspend();
  }

  /**
   * Translate touch strip position from x, y to value range defined in touchstrips.json
   * @param {String} stripId Strip ID
   * @param {Number} x  X position on strip (relative from bottom left)
   * @param {Number} y  Y position on strip (relative from bottom left)
   */
  translateTouchstripPositionToPressure(stripId, x, y) {

    const strip = this.getTouchstripById(stripId);

    // Zero point for pressure is in the vertical center of the strip

    const translatedX = Math.ceil(scaleValue(x, strip.minX, strip.maxX, strip.minX, strip.width, strip.minX));
    const translatedY = strip.maxY - Math.ceil(scaleValue(y, strip.minY, strip.maxY, strip.minY, strip.height, strip.minY));

    return [translatedX, translatedY]
  }

  touchstripDown(stripId, x, y) {
    
    const pos = this.translateTouchstripPositionToPressure(stripId, x, y);

    this.currentTouch = {
      stripIndex: stripId,
      position: pos[1],
      pressure: pos[0]
    };
    
    console.log('touchstripdown', this.currentTouch);
    
  }

  touchstripMove(stripId, x, y) {

    const pos = this.translateTouchstripPositionToPressure(stripId, x, y);

    this.currentTouch = {
      stripIndex: stripId,
      position: pos[1],
      pressure: pos[0]
    };

    console.log('touchstripmove', this.currentTouch);

  }

  touchstripUp(stripId, x, y) {

    const pos = this.translateTouchstripPositionToPressure(stripId, x, y);

    this.currentTouch = {
      stripIndex: stripId,
      position: pos[1],
      pressure: 0
    };
    
    console.log('touchstripup', this.currentTouch);
  }

  render() {
    if (calledRun) {
      this.renderScreens();
      /*
      var idx = 0;
      for (var y = 0; y < 9; ++y) {
          for (var x = 0; x < 8; ++x) {
              var c = leddata[idx++];
              dotelems[y][x].style.color = "rgb(" + c + "," + c + "," + c + ")";
          } //x
      } // y
      */
    } // calledRun
    this.requestAnimationFrame();
  }

}

export default SynthInterface;
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

  setFingers(fingers) {

    fingers.forEach(finger => {

      // Set fingers on touchstrips
      if(finger.touchable && finger.touchable.touchableType === 'touchstrip') {
        //this.touchstripMove(finger.touchable.id, finger.touchable.x, finger.touchable.y);
      }

    });

  }

  /**
   * Translate touch strip position from x, y to value range defined in touchstrips.json
   * @param {String} stripId Strip ID
   * @param {Number} x  X position on strip (relative from bottom left)
   * @param {Number} y  Y position on strip (relative from bottom left)
   */
  translateTouchstripPosition(stripId, x, y) {

    const strip = this.getTouchstripById(stripId);

    // Max point for pressure is in the vertical center of the strip
    const halfStrip = strip.width / 2;
    if(x > halfStrip) {
      x = x - halfStrip;
    }
    else if(x < halfStrip) {
      x = halfStrip - x;
    }
    else {
      x = 0;
    }

    x = strip.width - x*2;

    let translatedX = Math.ceil(scaleValue(x, strip.minX, strip.width, strip.minX, strip.maxX));
    let translatedY = strip.maxY - Math.ceil(scaleValue(y, strip.minY, strip.height, strip.minY, strip.maxY));

    if(translatedX < 0) translatedX = 0;
    if(translatedY < 0) translatedY = 0;

    return [translatedX, translatedY]
  }

  render() {
    if (calledRun) {
      this.renderScreens();
    } // calledRun
    this.requestAnimationFrame();
  }

}

export default SynthInterface;
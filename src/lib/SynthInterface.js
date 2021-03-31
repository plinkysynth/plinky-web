import layout from "./layout";
import scaleValue from "./scaleValue";
import SynthEngine from "./SynthEngine";

class SynthInterface extends SynthEngine {

  constructor() {
    console.log("SynthInterface constructor");
    super();
    this.currentButtonTouch = null;
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
    if(this.currentTouchstripTouches.length) {

      this.currentTouchstripTouches.forEach(t => {
        _wasm_settouch(t.stripId, t.position, t.pressure);
      });

    }

    const missingStrips = layout.touchstrips ? layout.touchstrips.filter(s => !this.currentTouchstripTouches.find(t => t.stripId === s.id)) : [];

    missingStrips.forEach(t => {
      _wasm_settouch(t.id, 0, 0);
    });

    // Set special buttons on bottom strip
    if(this.currentButtonTouch) {
      _wasm_settouch(8, this.currentButtonTouch.position, this.currentButtonTouch.pressure);
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

  buttonDown(buttonId) {

    if(buttonId === 'ALT1') {
      this.currentButtonTouch = {
        position: 0,
        pressure: 2048
      };
    }
    else if (buttonId === 'ALT2') {

      this.currentButtonTouch = {
        position: 256,
        pressure: 2048
      };

    }

  }

  buttonUp(buttonId) {
    this.currentButtonTouch = {};    
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
  translateTouchstripPosition(stripId, x, y) {

    const strip = this.getTouchstripById(stripId);
    const containerRect = strip.DOMNode.getBoundingClientRect();

    x -= containerRect.left;
    y -= containerRect.top;

    let translatedX;
    let translatedY;

    if(strip.direction && strip.direction == 'horizontal') {

      // Max point for pressure is in the vertical center of the strip
      const halfStrip = strip.height / 2;
      if(y > halfStrip) {
        y = y - halfStrip;
      }
      else if(y < halfStrip) {
        y = halfStrip - y;
      }
      else {
        y = 0;
      }

      y = strip.height - y*2;

      translatedY = Math.ceil(scaleValue(x, 0, strip.width, strip.minX, strip.maxX));
      translatedX = strip.maxY - Math.ceil(scaleValue(y, 0, strip.height, strip.maxY, strip.minY));

      if(translatedX < 0) translatedX = 0;
      if(translatedY < 0) translatedY = 0;
      

    }
    else {
  
      // Max point for pressure is in the horizontal center of the strip
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
  
      translatedX = Math.ceil(scaleValue(x, 0, strip.width, strip.minX, strip.maxX));
      translatedY = strip.maxY - Math.ceil(scaleValue(y, 0, strip.height, strip.maxY, strip.minY));
  
      if(translatedX < 0) translatedX = 0;
      if(translatedY < 0) translatedY = 0;
  
    }


    //console.log('translated', translatedX, translatedY, 'orig', x, y);

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
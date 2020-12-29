import SynthEngine from "./SynthEngine";

class SynthInterface extends SynthEngine {

  constructor() {
    console.log("SynthInterface constructor");
    super();
  }

  loadingFinished() {

    _plinky_init();
    this.bitmapPointer = _getemubitmap();

    // Attach pointer to screen
    this.screens = this.screens.map(screen => {
      if(screen.id === 'PlinkyScreen') {
        screen._pointer = this.bitmapPointer;
      }
      return screen;
    })

    this.bitmapPointer = _getemubitmap();
    
    this._leds = _getemuleds();
    this.leddata = new Uint8ClampedArray(HEAP8.buffer, this._leds, 9 * 8);
    
    this.audiobuf = _get_wasm_audio_buf();

    this.setup();

    // Quick accessor for screen
    this.ctx = this.getScreenById('PlinkyScreen')._ctx;

    console.log("Plinky initialised");

  }

  currentTouch = null;

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  setTouchstrips(touchstrips) {
    this.touchstrips = touchstrips;
  }

  setTouchstripValue(stripIndex, position, pressure) {
    this.currentTouch = {
      strip: stripIndex,
      position,
      pressure
    };
  }

  onAudioProcess(audioProcessingEvent) {

    // Set output buffer
    const outputBuffer = audioProcessingEvent.outputBuffer;

    // Get left and right channels from output buffer
    const l = outputBuffer.getChannelData(0);
    const r = outputBuffer.getChannelData(1);

    // Set touch event position
    if(this.currentTouch) {
      _wasm_settouch(0, pos0.value, pressure0.value);
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
import * as config from './config';
import fetchInject from 'fetch-inject';
import scaleValue from './scaleValue';

class SynthEngine {

  constructor() {

    console.log('[SynthEngine] Config:', config);

    this.config = config;
    
    this.sampleRate = config.synth.engine.sampleRate;
    this.bufferSize = config.synth.engine.bufferSize;

    this.buttons = config.buttons;
    this.screens = config.screens;
    this.knobs = config.knobs;
    this.connectors = config.connectors;
    this.touchstrips = config.touchstrips;
    this.leds = config.leds;

    this.audioCtx = null;
    this.scriptNode = null;

    // Load the wasm source
    if(config.synth.engine.wasmSrc) {
      fetchInject([config.synth.engine.wasmSrc]).then((e) => {
        // Give the script some time to initialise
        // This should come from an event rather than wait
        const wait = () => {
          if(!window[config.synth.engine.wasmWaitForVariable]) setTimeout(wait, 10);
          else {
            this.loadingFinished();
          }
        }
        wait();
      });
    }
    else {
      this.loadingFinished();
    }

  }

  setup() {

    // Set up image contexts correctly from synth config
    // Fails if the screen size is something else than what synth expects
    this.screens = this.screens.map(screen => {
      const screenConfig = config.synth.screens.find(c => c.id === screen.id);
      screen._data = new Uint8ClampedArray(HEAP8.buffer, screen._pointer, 128 * 32 * 4);
      screen._img = new ImageData(screen._data, screenConfig.width, screenConfig.height);
      screen.DOMNode.width = screenConfig.width;
      screen.DOMNode.height = screenConfig.height;
      screen._ctx = screen.DOMNode.getContext('2d', screenConfig.canvasContextOptions);
      return screen;
    })

    console.log(`[SynthEngine] Initializing audio context at ${this.sampleRate}Hz with ${config.synth.engine.channels} channel(s) and a buffer of ${this.bufferSize} samples`);

    this.audioCtx = new AudioContext({ sampleRate: this.sampleRate });
    this.scriptNode = this.audioCtx.createScriptProcessor(this.bufferSize, 0, config.synth.engine.channels);
    this.scriptNode.connect(this.audioCtx.destination);
    this.scriptNode.onaudioprocess = (e) => {
      this.onAudioProcess(e);
    }
    
    this.requestAnimationFrame();

  }

  /**
   * Register an user interface element in one of the categories (knobs, buttons, etc.)
   * @param {*} target 
   * @param {*} item 
   * @param {*} node 
   */
  registerNode(target, item, DOMNode, DOMId) {
    console.log('Registering node', item.id, DOMNode);
    target = target.map(t => {
      if(t.id === item.id) {
        t.DOMNode = DOMNode;
        t.DOMId = DOMId;
      }
      return t;
    });
  }

  registerButton(item, DOMNode, DOMId)     { this.registerNode(this.buttons, item, DOMNode, DOMId); }
  registerConnector(item, DOMNode, DOMId)  { this.registerNode(this.connectors, item, DOMNode, DOMId); }
  registerKnob(item, DOMNode, DOMId)       { this.registerNode(this.knobs, item, DOMNode, DOMId); }
  registerLed(item, DOMNode, DOMId)        { this.registerNode(this.leds, item, DOMNode, DOMId); }
  registerScreen(item, DOMNode, DOMId)     { this.registerNode(this.screens, item, DOMNode, DOMId); }
  registerTouchstrip(item, DOMNode, DOMId) { this.registerNode(this.touchstrips, item, DOMNode, DOMId); }

  getButtonById(id)     { return this.buttons.find(item => item.id === id); }
  getConnectorById(id)  { return this.connectors.find(item => item.id === id); }
  getTouchstripById(id) { return this.touchstrips.find(item => item.id === id); }
  getKnobById(id)       { return this.knobs.find(item => item.id === id); }
  getLedById(id)        { return this.leds.find(item => item.id === id); }
  getScreenById(id)     { return this.screens.find(item => item.id === id); }

  // Touchstrips
  touchstripDown(stripId, x, y) {
    
    const pos = this.translateTouchstripPosition(stripId, x, y);

    this.currentTouch = {
      stripIndex: stripId,
      position: pos[1],
      pressure: pos[0]
    };
    
    console.log('touchstripdown', this.currentTouch);
    
  }

  touchstripMove(stripId, x, y) {

    const pos = this.translateTouchstripPosition(stripId, x, y);

    this.currentTouch = {
      stripIndex: stripId,
      position: pos[1],
      pressure: pos[0]
    };

    console.log('touchstripmove', this.currentTouch);

  }

  touchstripUp(stripId, x, y) {

    const pos = this.translateTouchstripPosition(stripId, x, y);

    this.currentTouch = {
      stripIndex: stripId,
      position: pos[1],
      pressure: 0
    };
    
    console.log('touchstripup', this.currentTouch);
  }

  // Knobs
  // Screens
  // Connectors
  // LEDs

  /**
   * Render screen data into canvas context
   * Call this in render()
   */
  renderScreens() {
    this.screens.forEach(screen => {
      screen._ctx.putImageData(screen._img, 0, 0);
    });
  }

  /**
   * Request animation frame while keeping instance context
   */
  requestAnimationFrame() {
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  loadingFinished() {}
  onAudioProcess() {}
  render() {}

}

export default SynthEngine;
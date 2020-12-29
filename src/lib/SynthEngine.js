import * as config from './config';
import fetchInject from 'fetch-inject';

class SynthEngine {

  constructor() {

    console.log('CONFIG:', config);

    this.config = config;
    this.sampleRate = config.synth.engine.sampleRate;
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

  loadingFinished() {}

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

    this.audioCtx = new AudioContext({ sampleRate: this.sampleRate });
    this.scriptNode = this.audioCtx.createScriptProcessor(1024, 0, 2);
    this.scriptNode.connect(this.audioCtx.destination);
    this.scriptNode.onaudioprocess = this.onAudioProcess;
    
    this.requestAnimationFrame();

  }

  /**
   * Register an user interface element in one of the categories (knobs, buttons, etc.)
   * @param {*} target 
   * @param {*} item 
   * @param {*} node 
   */
  registerNode(target, item, DOMNode) {
    console.log('Registering node', item.id, DOMNode);
    target = target.map(t => {
      if(t.id === item.id) {
        t.DOMNode = DOMNode;
      }
      return t;
    });
  }

  // Buttons
  registerButton(item) { this.registerNode(this.buttons, item); }
  getButtonById(id) { return this.buttons.find(item => item.id === id); }

  // Touchstrips
  registerTouchstrip(item) { this.registerNode(this.touchstrips, item); }
  getTouchstripById(id) { return this.touchstrips.find(item => item.id === id); }

  // Knobs
  registerKnob(item) { this.registerNode(this.knobs, item); }
  getKnobById(id) { return this.knobs.find(item => item.id === id); }

  // Screens
  registerScreen(item, DOMNode) { this.registerNode(this.screens, item, DOMNode); }
  getScreenById(id) { return this.screens.find(item => item.id === id); }

  // Connectors
  registerConnector(item) { this.registerNode(this.connectors, item); }
  getKnobById(id) { return this.connectors.find(item => item.id === id); }

  // LEDs
  registerLed(item) { this.registerNode(this.connectors, item); }
  getKnobById(id) { return this.connectors.find(item => item.id === id); }

  renderScreens() {
    this.screens.forEach(screen => {
      screen._ctx.putImageData(screen._img, 0, 0);
    });
  }

  requestAnimationFrame() {
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  onAudioProcess() {}

}

export default SynthEngine;
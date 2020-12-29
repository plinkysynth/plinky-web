import * as config from './config';
import mergeProps from './mergeProps';
import fetchInject from 'fetch-inject';

class SynthEngine {

  constructor() {

    console.log(config);

    this.sampleRate = config.synth.engine.sampleRate;
    this.buttons = mergeProps(config.buttons);
    this.screens = mergeProps(config.screens);
    this.knobs = mergeProps(config.knobs);
    //this.connectors = mergeProps(config.connectors);
    this.touchstrips = mergeProps(config.touchstrips);
    this.leds = mergeProps(config.leds);

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

    console.log('setup');

    // Setup
    this.data = new Uint8ClampedArray(HEAP8.buffer, this._pointer, 128 * 32 * 4);
    this.leddata = new Uint8ClampedArray(HEAP8.buffer, this._leds, 9 * 8);
    
    // Set up image contexts correctly from synth config
    this.screens = this.screens.map(screen => {
      const screenConfig = config.synth.screens.find(c => c.id === screen.id);
      screen._img = new ImageData(this.data, screenConfig.width, screenConfig.height);
      return screen;
    })

    this.audioCtx = new AudioContext({ sampleRate: this.sampleRate });
    this.scriptNode = this.audioCtx.createScriptProcessor(1024, 0, 2);
    this.scriptNode.connect(this.audioCtx.destination);
    this.scriptNode.onaudioprocess = this.onAudioProcess;

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

  renderAnimationFrame() {}
  onAudioProcess() {}

}

export default SynthEngine;